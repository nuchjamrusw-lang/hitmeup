import { ArrowRight, CalendarDays, Globe2, MapPin, Users, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { HistoricalEvent } from '@/types';
import { historicalEvents } from '@/data/historicalEvents';
import { regionById } from '@/data/regions';
import { meanwhile } from '@/utils/time';
import { Badge } from '@/components/ui/Badge';
import { CategoryTag } from '@/components/ui/Category';
import { SourceList } from '@/components/ui/SourceList';
import { EraScene } from '@/components/scenes/EraScene';

interface Props {
  event: HistoricalEvent;
  onSelectEvent: (id: string) => void;
  /** Where "view on" links point: show globe link on the timeline, timeline link on the globe. */
  context: 'globe' | 'timeline';
  headingLevel?: 'h2' | 'h3';
}

export function EventDetail({ event, onSelectEvent, context, headingLevel = 'h2' }: Props) {
  const H = headingLevel;
  const others = meanwhile(event, historicalEvents, 25).slice(0, 6);
  const region = regionById[event.region];
  return (
    <article className="space-y-5">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CategoryTag category={event.category} />
          <span className="text-line">|</span>
          <span className="text-[11px] font-medium text-ink-muted">{region.name}</span>
        </div>
        <H className="font-serif text-[22px] leading-snug text-ink">{event.title}</H>
        <dl className="mt-3 grid gap-1.5 text-[13px] text-ink-soft">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Date</dt>
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
            <dd className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-ink">{event.dateLabel}</span>
              {event.approximate ? <Badge tone="warn">Approximate date</Badge> : <Badge tone="ok">Documented date</Badge>}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
            <dd>
              <span className="text-ink">{event.location.name}</span>
              <span className="text-ink-muted"> · today: {event.location.modernReference}</span>
            </dd>
          </div>
        </dl>
      </div>

      <EraScene region={event.region} year={event.year} variant="compact" />

      <p className="body-copy">{event.summary}</p>

      <div className="rounded-lg border-l-2 border-bronze bg-bronze-wash/60 px-4 py-3">
        <p className="eyebrow mb-1 text-bronze-dark">Historical significance</p>
        <p className="text-[14px] leading-6 text-ink-soft">{event.historicalSignificance}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {event.relatedPeople.length > 0 && (
          <div>
            <p className="eyebrow mb-1.5 flex items-center gap-1.5"><Users className="h-3.5 w-3.5" aria-hidden /> People</p>
            <ul className="space-y-0.5 text-[13px] text-ink-soft">
              {event.relatedPeople.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        )}
        <div>
          <p className="eyebrow mb-1.5 flex items-center gap-1.5"><Landmark className="h-3.5 w-3.5" aria-hidden /> Powers & peoples</p>
          <ul className="space-y-0.5 text-[13px] text-ink-soft">
            {event.relatedPolities.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {context === 'timeline' ? (
          <Link
            to={`/explore?event=${event.id}&region=${event.region}&year=${event.year}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink px-3.5 text-[13px] font-medium text-white hover:bg-[#24364F]"
          >
            <Globe2 className="h-4 w-4" aria-hidden /> Show on the globe
          </Link>
        ) : (
          <Link
            to={`/timeline?year=${event.year}&event=${event.id}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3.5 text-[13px] font-medium text-ink hover:bg-mist"
          >
            Open in timeline <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>

      <section aria-labelledby={`mw-${event.id}`} className="border-t border-line pt-5">
        <h3 id={`mw-${event.id}`} className="font-serif text-lg text-ink">Meanwhile around the world</h3>
        <p className="mt-0.5 text-xs text-ink-muted">
          Events in other regions within about 25 years of {event.dateLabel}. History did not happen in isolation.
        </p>
        {others.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No other events in the dataset fall within this window.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-surface">
            {others.map((o) => (
              <li key={o.id}>
                <button type="button" onClick={() => onSelectEvent(o.id)} className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-mist">
                  <span className="w-[74px] shrink-0 pt-0.5 text-[11px] font-medium tabular-nums text-ink-muted">{o.dateLabel}</span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium leading-snug text-ink">{o.title}</span>
                    <span className="block text-[11px] text-ink-muted">{regionById[o.region].name} · {o.location.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-line pt-4">
        <p className="eyebrow mb-1.5">Sources</p>
        <SourceList ids={event.sources} />
      </section>
    </article>
  );
}
