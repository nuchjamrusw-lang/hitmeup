import { useMemo, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Region, DevelopmentDomain } from '@/types';
import { historicalEvents } from '@/data/historicalEvents';
import { eventInWindow, yearDistance } from '@/utils/time';
import { Badge } from '@/components/ui/Badge';
import { CategoryTag } from '@/components/ui/Category';
import { EraScene } from '@/components/scenes/EraScene';

const domainOrder: DevelopmentDomain[] = ['Art', 'Science', 'Trade', 'Culture'];

export function RegionPanel({
  region,
  year,
  window,
  onSelectEvent,
}: {
  region: Region;
  year: number;
  window: number;
  onSelectEvent: (id: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const era = region.eras.find((e) => year >= e.from && year <= e.to) ?? region.eras[region.eras.length - 1];
  const polities = region.polities.filter((p) => year >= p.from && year <= p.to);
  const people = region.people.filter((p) => p.activeFrom <= year + window && p.activeTo >= year - window);
  const devs = region.developments.filter((d) => year >= d.from - 10 && year <= d.to + 10);

  const regionEvents = useMemo(
    () => historicalEvents.filter((e) => e.region === region.id).sort((a, b) => a.year - b.year),
    [region.id],
  );
  const nearby = regionEvents.filter((e) => eventInWindow(e, year, window)).sort((a, b) => yearDistance(a, year) - yearDistance(b, year));
  const otherEvents = regionEvents.filter((e) => !nearby.includes(e));

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Region · around {year}</p>
        <h2 className="mt-1 font-serif text-[26px] leading-tight text-ink">{region.name}</h2>
        <p className="mt-1 flex items-start gap-1.5 text-xs text-ink-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          Modern geographic area used for navigation: {region.modernScope}.
        </p>
      </div>

      <EraScene region={region.id} year={year} />

      <section>
        <h3 className="eyebrow mb-2">Historical overview · {era.from}–{era.to}</h3>
        <p className="body-copy">{era.overview}</p>
      </section>

      <section>
        <h3 className="eyebrow mb-2">Political powers in {year}</h3>
        {polities.length === 0 ? (
          <p className="text-sm text-ink-muted">No major polities recorded for this year in the dataset.</p>
        ) : (
          <ul className="divide-y divide-line rounded-lg border border-line">
            {polities.map((p) => (
              <li key={p.name} className="px-3 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-medium text-ink">{p.name}</span>
                  <Badge tone={p.type === 'Colonial territory' ? 'warn' : p.type === 'City-state' || p.type === 'Republic' ? 'bronze' : 'neutral'}>{p.type}</Badge>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-ink-muted">{p.note}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-[11px] leading-4 text-ink-faint">
          Historical powers are labelled by type (empire, kingdom, dynasty, city-state…). They should not be confused with modern countries.
        </p>
      </section>

      <section>
        <h3 className="eyebrow mb-2">Major events within ±{window} years</h3>
        {nearby.length === 0 ? (
          <p className="text-sm text-ink-muted">No events in the dataset for this region within ±{window} years. Try another year or widen the range.</p>
        ) : (
          <ul className="space-y-2">
            {nearby.map((e) => (
              <li key={e.id}>
                <button type="button" onClick={() => onSelectEvent(e.id)} className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-left transition-colors hover:border-ink-faint">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium tabular-nums text-ink-muted">{e.dateLabel}</span>
                    <CategoryTag category={e.category} />
                  </div>
                  <span className="mt-0.5 block text-[14px] font-medium leading-snug text-ink">{e.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {otherEvents.length > 0 && (
          <div className="mt-2">
            <button type="button" onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-1 text-xs font-medium text-bronze-dark hover:text-ink" aria-expanded={showAll}>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} aria-hidden />
              {showAll ? 'Hide' : 'Show'} {otherEvents.length} other events in this region (1300–1700)
            </button>
            {showAll && (
              <ul className="mt-2 space-y-1">
                {otherEvents.map((e) => (
                  <li key={e.id}>
                    <button type="button" onClick={() => onSelectEvent(e.id)} className="flex w-full gap-3 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-mist">
                      <span className="w-[86px] shrink-0 tabular-nums text-ink-muted">{e.dateLabel}</span>
                      <span className="text-ink">{e.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {people.length > 0 && (
        <section>
          <h3 className="eyebrow mb-2">Important people</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {people.map((p) => (
              <li key={p.name} className="rounded-lg bg-paper px-3 py-2">
                <span className="block text-[13px] font-medium text-ink">{p.name}</span>
                <span className="block text-[11px] text-ink-muted">{p.dates} · {p.role}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {devs.length > 0 && (
        <section>
          <h3 className="eyebrow mb-2">Developments in art, science, trade & culture</h3>
          <dl className="space-y-2.5">
            {domainOrder
              .map((d) => [d, devs.filter((x) => x.domain === d)] as const)
              .filter(([, list]) => list.length)
              .map(([d, list]) => (
                <div key={d} className="grid grid-cols-[72px_1fr] gap-3">
                  <dt className="pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-bronze-dark">{d}</dt>
                  <dd className="space-y-1 text-[13px] leading-5 text-ink-soft">
                    {list.map((x) => <p key={x.text}>{x.text}</p>)}
                  </dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      <div className="border-t border-line pt-4">
        <Link to={`/timeline?year=${year}&group=${encodeURIComponent(region.group)}`} className="text-[13px] font-medium text-bronze-dark hover:text-ink">
          See {region.group} on the global timeline →
        </Link>
      </div>
    </div>
  );
}
