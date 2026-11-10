import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import type { EventCategory, HistoricalEvent, RegionGroup } from '@/types';
import { historicalEvents, eventById } from '@/data/historicalEvents';
import { DEFAULT_YEAR, regionById, regionGroups, YEAR_MAX, YEAR_MIN } from '@/data/regions';
import { clampYear, eventEnd, eventInWindow } from '@/utils/time';
import { YearSelector } from '@/components/shared/YearSelector';
import { EventDetail } from '@/components/shared/EventDetail';
import { categories, categoryMeta, CategoryTag } from '@/components/ui/Category';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const WINDOWS = [10, 25, 50, 100];
const pct = (y: number) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;
const groupOf = (e: HistoricalEvent): RegionGroup => regionById[e.region].group;

function Swimlanes({
  events,
  year,
  windowYears,
  selectedId,
  onSelect,
  onYear,
}: {
  events: HistoricalEvent[];
  year: number;
  windowYears: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onYear: (y: number) => void;
}) {
  const laneRef = useRef<HTMLDivElement>(null);
  const onLaneClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const el = laneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (ev.clientX - rect.left) / rect.width;
    onYear(clampYear(YEAR_MIN + ratio * (YEAR_MAX - YEAR_MIN)));
  };
  return (
    <div className="panel overflow-x-auto scrollbar-thin">
      <div className="min-w-[760px] p-4 sm:p-5">
        <div className="grid grid-cols-[96px_1fr] gap-x-3">
          <div />
          <div className="relative mb-2 h-4 text-[10px] tabular-nums text-ink-faint">
            {[1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700].map((y) => (
              <span key={y} className="absolute -translate-x-1/2" style={{ left: `${pct(y)}%` }}>{y}</span>
            ))}
          </div>
          {regionGroups.map((g) => {
            const lane = events.filter((e) => groupOf(e) === g);
            return (
              <div key={g} className="contents">
                <div className="flex items-center text-[12px] font-medium text-ink-soft">{g}</div>
                <div
                  ref={g === 'Europe' ? laneRef : undefined}
                  className="relative h-9 cursor-crosshair border-t border-line"
                  onClick={onLaneClick}
                  aria-hidden
                >
                  {/* window highlight */}
                  <div
                    className="absolute inset-y-0 bg-bronze-wash/70"
                    style={{ left: `${pct(Math.max(YEAR_MIN, year - windowYears))}%`, width: `${pct(Math.min(YEAR_MAX, year + windowYears)) - pct(Math.max(YEAR_MIN, year - windowYears))}%` }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 w-px bg-ink/70" style={{ left: `${pct(year)}%` }} />
                  {lane.map((e, i) => {
                    const span = eventEnd(e) - e.year;
                    const sel = e.id === selectedId;
                    const color = categoryMeta[e.category].color;
                    const top = 8 + (i % 3) * 7;
                    return (
                      <button
                        key={e.id}
                        type="button"
                        tabIndex={-1}
                        title={`${e.dateLabel} · ${e.title}`}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          onSelect(e.id);
                        }}
                        className={cn('absolute rounded-full transition-transform hover:scale-125', sel && 'ring-2 ring-ink ring-offset-1')}
                        style={{
                          left: `${pct(e.year)}%`,
                          top,
                          width: span > 3 ? `max(7px, ${pct(eventEnd(e)) - pct(e.year)}%)` : 7,
                          height: 7,
                          background: color,
                          opacity: e.approximate ? 0.55 : 0.95,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-ink-faint">
          Click a lane to jump to a year · bars show events lasting several years · faded marks are approximate dates.
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [params, setParams] = useSearchParams();
  const year = clampYear(Number(params.get('year') ?? DEFAULT_YEAR) || DEFAULT_YEAR);
  const windowYears = WINDOWS.includes(Number(params.get('range'))) ? Number(params.get('range')) : 25;
  const groupParam = params.get('group');
  const activeGroups: RegionGroup[] = groupParam ? (groupParam.split(',').filter((g) => regionGroups.includes(g as RegionGroup)) as RegionGroup[]) : regionGroups;
  const catParam = params.get('cat');
  const activeCats: EventCategory[] = catParam ? (catParam.split('|').filter((c) => categories.includes(c as EventCategory)) as EventCategory[]) : categories;
  const selectedId = params.get('event');
  const selected = selectedId ? eventById[selectedId] ?? null : null;

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) (v === null ? next.delete(k) : next.set(k, v));
    setParams(next, { replace: true });
  };

  const toggleGroup = (g: RegionGroup) => {
    const set = new Set(activeGroups);
    set.has(g) ? set.delete(g) : set.add(g);
    const list = regionGroups.filter((x) => set.has(x));
    update({ group: list.length === regionGroups.length || list.length === 0 ? null : list.join(',') });
  };
  const toggleCat = (c: EventCategory) => {
    const set = new Set(activeCats);
    set.has(c) ? set.delete(c) : set.add(c);
    const list = categories.filter((x) => set.has(x));
    update({ cat: list.length === categories.length || list.length === 0 ? null : list.join('|') });
  };

  const filtered = useMemo(
    () => historicalEvents.filter((e) => activeGroups.includes(groupOf(e)) && activeCats.includes(e.category)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groupParam, catParam],
  );
  const inWindow = useMemo(() => filtered.filter((e) => eventInWindow(e, year, windowYears)).sort((a, b) => a.year - b.year), [filtered, year, windowYears]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && update({ event: null });
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const chip = (on: boolean) =>
    cn('rounded-full border px-3 py-1 text-[12px] transition-colors', on ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink-soft hover:border-ink-faint');

  return (
    <div>
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow mb-2">Global Timeline</p>
        <h1 className="h-display">The World at a Glance</h1>
        <p className="mt-2 text-[15px] leading-7 text-ink-muted">
          Explore historical events across different regions and discover how the world was changing.
        </p>
      </header>

      <div className="space-y-4">
        <YearSelector year={year} onChange={(y) => update({ year: String(y) })} eventYears={historicalEvents.map((e) => e.year)} />
        <Swimlanes events={filtered} year={year} windowYears={windowYears} selectedId={selectedId} onSelect={(id) => update({ event: id })} onYear={(y) => update({ year: String(y) })} />

        <div className="panel space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Region</span>
            {regionGroups.map((g) => (
              <button key={g} type="button" className={chip(activeGroups.includes(g))} onClick={() => toggleGroup(g)} aria-pressed={activeGroups.includes(g)}>
                {g}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Category</span>
            {categories.map((c) => (
              <button key={c} type="button" className={chip(activeCats.includes(c))} onClick={() => toggleCat(c)} aria-pressed={activeCats.includes(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Range</span>
            {WINDOWS.map((w) => (
              <button key={w} type="button" className={chip(windowYears === w)} onClick={() => update({ range: String(w) })} aria-pressed={windowYears === w}>
                ±{w} years
              </button>
            ))}
            {(groupParam || catParam) && (
              <button type="button" onClick={() => update({ group: null, cat: null })} className="ml-auto text-[12px] font-medium text-bronze-dark hover:text-ink">
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={cn('mt-8 grid gap-6', selected && 'xl:grid-cols-[minmax(0,1fr)_420px]')}>
        <section aria-labelledby="same-time">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 id="same-time" className="h-section">
                {YEAR_MIN < year - windowYears ? year - windowYears : YEAR_MIN}–{Math.min(YEAR_MAX, year + windowYears)}: side by side
              </h2>
              <p className="mt-1 text-[13px] text-ink-muted">{inWindow.length} events · compare what was happening in each part of the world at about the same time.</p>
            </div>
          </div>

          {inWindow.length === 0 ? (
            <div className="panel p-8 text-center text-sm text-ink-muted">No events match these filters in this range. Try widening the range or clearing filters.</div>
          ) : (
            <div className={cn('grid gap-4 md:grid-cols-2', !selected && '2xl:grid-cols-3')}>
              {activeGroups.map((g) => {
                const list = inWindow.filter((e) => groupOf(e) === g);
                return (
                  <div key={g} className="panel p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-serif text-lg text-ink">{g}</h3>
                      <span className="text-[11px] text-ink-muted">{list.length}</span>
                    </div>
                    {list.length === 0 ? (
                      <p className="text-[13px] text-ink-faint">No events in this range.</p>
                    ) : (
                      <ol className="relative space-y-2 border-l border-line pl-4">
                        {list.map((e) => (
                          <li key={e.id} className="relative">
                            <span className="absolute -left-[21px] top-3 h-2 w-2 rounded-full border-2 border-surface" style={{ background: categoryMeta[e.category].color }} aria-hidden />
                            <button
                              type="button"
                              onClick={() => update({ event: e.id })}
                              className={cn('w-full rounded-lg border px-3 py-2.5 text-left transition-colors', selectedId === e.id ? 'border-ink bg-mist' : 'border-transparent hover:border-line hover:bg-paper')}
                              aria-pressed={selectedId === e.id}
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-semibold tabular-nums text-ink-soft">{e.dateLabel}</span>
                                {e.approximate && <Badge tone="warn">approx.</Badge>}
                              </div>
                              <span className="mt-0.5 block text-[14px] font-medium leading-snug text-ink">{e.title}</span>
                              <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-ink-muted">
                                <span>{e.location.name}</span>
                                <CategoryTag category={e.category} />
                              </span>
                              <span className="mt-1.5 line-clamp-2 block text-[12.5px] leading-5 text-ink-muted">{e.summary}</span>
                            </button>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {selected && (
          <>
            <div className="fixed inset-0 z-40 bg-ink/30 xl:hidden" onClick={() => update({ event: null })} aria-hidden />
            <aside
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[460px] overflow-y-auto bg-surface p-5 shadow-lift scrollbar-thin sm:p-6 xl:sticky xl:top-6 xl:z-auto xl:max-h-[calc(100vh-3rem)] xl:w-auto xl:max-w-none xl:rounded-xl xl:border xl:border-line xl:shadow-soft"
              aria-label="Event details"
            >
              <div className="mb-3 flex justify-end">
                <button type="button" onClick={() => update({ event: null })} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-mist hover:text-ink" aria-label="Close event details">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <EventDetail event={selected} onSelectEvent={(id) => update({ event: id })} context="timeline" />
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
