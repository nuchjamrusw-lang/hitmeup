import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Box, Map as MapIcon, Minus, Plus, RotateCcw } from 'lucide-react';
import type { RegionId } from '@/types';
import { historicalEvents, eventById } from '@/data/historicalEvents';
import { DEFAULT_YEAR, regionById, regions } from '@/data/regions';
import { polityCentres } from '@/data/polityCentres';
import { clampYear, eventInWindow } from '@/utils/time';
import { useWebGL } from '@/hooks/useWebGL';
import { useProgress } from '@/hooks/useProgress';
import { YearSelector } from '@/components/shared/YearSelector';
import { EventDetail } from '@/components/shared/EventDetail';
import { RegionPanel } from '@/components/globe/RegionPanel';
import FlatMap from '@/components/globe/FlatMap';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SceneLoading } from '@/components/ui/Loading';
import type { GlobeCommand } from '@/components/globe/Globe3D';
import { cn } from '@/utils/cn';

const Globe3D = lazy(() => import('@/components/globe/Globe3D'));

const WINDOWS = [10, 25, 50];

export default function ExploreWorld() {
  const [params, setParams] = useSearchParams();
  const webgl = useWebGL();
  const { dispatch } = useProgress();

  const year = clampYear(Number(params.get('year') ?? DEFAULT_YEAR) || DEFAULT_YEAR);
  const regionParam = params.get('region') as RegionId | null;
  const region = regionParam && regionById[regionParam] ? regionById[regionParam] : null;
  const eventParam = params.get('event');
  const event = eventParam ? eventById[eventParam] ?? null : null;
  const windowYears = WINDOWS.includes(Number(params.get('range'))) ? Number(params.get('range')) : 25;

  const [mode, setMode] = useState<'3d' | '2d'>(webgl ? '3d' : '2d');
  const [failed3d, setFailed3d] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showPolities, setShowPolities] = useState(false);
  const [command, setCommand] = useState<GlobeCommand | null>(null);
  const effectiveMode = failed3d || !webgl ? '2d' : mode;

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params);
      for (const [k, v] of Object.entries(patch)) {
        if (v === null) next.delete(k);
        else next.set(k, v);
      }
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const visibleEvents = useMemo(() => historicalEvents.filter((e) => eventInWindow(e, year, windowYears)), [year, windowYears]);
  const visiblePolities = useMemo(() => polityCentres.filter((p) => year >= p.from && year <= p.to), [year]);
  const eventYears = useMemo(() => historicalEvents.map((e) => e.year), []);

  useEffect(() => {
    if (region) dispatch({ type: 'exploreRegion', regionId: region.id });
  }, [region, dispatch]);

  const focus = useMemo(() => {
    if (event) return { lat: event.location.lat, lon: event.location.lon };
    if (region) return region.center;
    return null;
  }, [event, region]);

  const selectRegion = (id: RegionId) => update({ region: id, event: null });
  const selectEvent = (id: string) => {
    const e = eventById[id];
    update({ event: id, region: e.region });
  };

  const toolBtn = 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[12px] font-medium transition-colors';

  return (
    <div>
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-2">Explore the World</p>
          <h1 className="h-display">The World in {year}</h1>
          <p className="mt-2 text-[15px] leading-7 text-ink-muted">
            Rotate the globe, choose a year, and select a region to see the powers, people and events of that moment.
          </p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
        {/* Visualisation column */}
        <div className="space-y-4">
          <div className="panel overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
              <div className="flex items-center gap-1 rounded-lg bg-mist p-0.5" role="group" aria-label="View mode">
                <button
                  type="button"
                  className={cn(toolBtn, effectiveMode === '3d' ? 'bg-surface text-ink shadow-soft' : 'text-ink-muted hover:text-ink')}
                  onClick={() => setMode('3d')}
                  disabled={!webgl || failed3d}
                  aria-pressed={effectiveMode === '3d'}
                  title={!webgl || failed3d ? '3D is not available on this device' : undefined}
                >
                  <Box className="h-3.5 w-3.5" aria-hidden /> Globe
                </button>
                <button
                  type="button"
                  className={cn(toolBtn, effectiveMode === '2d' ? 'bg-surface text-ink shadow-soft' : 'text-ink-muted hover:text-ink')}
                  onClick={() => setMode('2d')}
                  aria-pressed={effectiveMode === '2d'}
                >
                  <MapIcon className="h-3.5 w-3.5" aria-hidden /> Flat map
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-ink-soft">
                <label className="inline-flex cursor-pointer items-center gap-1.5">
                  <input type="checkbox" checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)} className="accent-[#1B2A41]" />
                  Events
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5">
                  <input type="checkbox" checked={showPolities} onChange={(e) => setShowPolities(e.target.checked)} className="accent-[#1B2A41]" />
                  Historical powers
                </label>
                {effectiveMode === '3d' && (
                  <div className="flex items-center gap-0.5" role="group" aria-label="Zoom">
                    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-mist" onClick={() => setCommand({ kind: 'zoom-in', n: Date.now() })} aria-label="Zoom in">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-mist" onClick={() => setCommand({ kind: 'zoom-out', n: Date.now() })} aria-label="Zoom out">
                      <Minus className="h-4 w-4" />
                    </button>
                    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-mist" onClick={() => setCommand({ kind: 'reset', n: Date.now() })} aria-label="Reset view">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={cn('relative w-full', effectiveMode === '3d' ? 'aspect-[4/3] max-h-[620px] sm:aspect-[16/11]' : 'aspect-[2/1]')}>
              {effectiveMode === '3d' ? (
                <ErrorBoundary
                  onError={() => setFailed3d(true)}
                  fallback={null}
                >
                  <Suspense fallback={<SceneLoading label="Preparing the globe…" />}>
                    <Globe3D
                      events={visibleEvents}
                      selectedRegion={region?.id ?? null}
                      selectedEventId={event?.id ?? null}
                      focus={focus}
                      polities={visiblePolities}
                      showEvents={showEvents}
                      showPolities={showPolities}
                      command={command}
                      onSelectRegion={selectRegion}
                      onSelectEvent={selectEvent}
                    />
                  </Suspense>
                </ErrorBoundary>
              ) : (
                <FlatMap
                  events={showEvents ? visibleEvents : []}
                  polities={showPolities ? visiblePolities : []}
                  selectedRegion={region?.id ?? null}
                  selectedEventId={event?.id ?? null}
                  onSelectRegion={selectRegion}
                  onSelectEvent={selectEvent}
                  ariaLabel="World map: select a region or an event"
                />
              )}
              {effectiveMode === '3d' && (
                <p className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-ink-faint">Drag to rotate · scroll or pinch to zoom · click land to choose a region</p>
              )}
            </div>
            {(failed3d || !webgl) && (
              <p className="border-t border-line bg-paper px-3 py-2 text-xs text-ink-muted">
                3D graphics are not available on this device, so a flat map is shown instead. All features still work.
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-[11px] text-ink-muted">
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-bronze" /> Event (±{windowYears} yrs)</span>
                {showPolities && <span className="font-serif italic text-bronze-dark">Italic labels: approximate centres of historical powers, not borders</span>}
              </span>
              <span>Coastlines: Natural Earth (modern physical geography)</span>
            </div>
          </div>

          <YearSelector year={year} onChange={(y) => update({ year: String(y) })} eventYears={eventYears} />

          <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-muted">
            <span>Show events within</span>
            {WINDOWS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => update({ range: String(w) })}
                className={cn('rounded-md border px-2 py-1', windowYears === w ? 'border-ink bg-ink text-white' : 'border-line bg-surface hover:bg-mist')}
                aria-pressed={windowYears === w}
              >
                ±{w} years
              </button>
            ))}
            <span className="ml-1">· {visibleEvents.length} events shown</span>
          </div>
        </div>

        {/* Information column */}
        <aside className="panel max-h-none p-5 sm:p-6 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto scrollbar-thin" aria-live="polite">
          {event ? (
            <div>
              <button type="button" onClick={() => update({ event: null })} className="mb-4 inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted hover:text-ink">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to {regionById[event.region].name}
              </button>
              <EventDetail event={event} onSelectEvent={selectEvent} context="globe" />
            </div>
          ) : region ? (
            <div>
              <button type="button" onClick={() => update({ region: null })} className="mb-4 inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted hover:text-ink">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All regions
              </button>
              <RegionPanel region={region} year={year} window={windowYears} onSelectEvent={selectEvent} />
            </div>
          ) : (
            <div>
              <p className="eyebrow">Start exploring</p>
              <h2 className="mt-1 font-serif text-[24px] text-ink">Choose a region</h2>
              <p className="mt-2 body-copy">
                Select a region on the globe or from the list below. Regions are modern geographic areas used for navigation; inside each one you will find the
                kingdoms, empires, dynasties and city-states of the time.
              </p>
              <ul className="mt-5 divide-y divide-line rounded-lg border border-line">
                {regions.map((r) => {
                  const count = visibleEvents.filter((e) => e.region === r.id).length;
                  return (
                    <li key={r.id}>
                      <button type="button" onClick={() => selectRegion(r.id)} className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-mist">
                        <span className="text-[14px] text-ink">{r.name}</span>
                        <span className="text-[11px] text-ink-muted">{count} {count === 1 ? 'event' : 'events'} near {year}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 rounded-lg bg-paper p-3 text-xs leading-5 text-ink-muted">
                <span className="font-medium text-ink-soft">About borders.</span> Political frontiers between 1300 and 1700 were often fluid, overlapping or
                contested. Rather than drawing uncertain borders, ATLAS shows approximate centres of power — turn on “Historical powers” to see them.
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
