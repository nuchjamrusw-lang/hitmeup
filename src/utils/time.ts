import type { HistoricalEvent } from '@/types';
import { YEAR_MAX, YEAR_MIN } from '@/data/regions';

export const clampYear = (y: number) => Math.min(YEAR_MAX, Math.max(YEAR_MIN, Math.round(y)));

export const eventEnd = (e: HistoricalEvent) => e.endYear ?? e.year;

/** True when an event overlaps [year - window, year + window]. */
export function eventInWindow(e: HistoricalEvent, year: number, window: number) {
  return e.year <= year + window && eventEnd(e) >= year - window;
}

/** Distance in years between an event and a year (0 when it spans that year). */
export function yearDistance(e: HistoricalEvent, year: number) {
  if (year < e.year) return e.year - year;
  if (year > eventEnd(e)) return year - eventEnd(e);
  return 0;
}

/** Events in other regions that overlap the given event's time span ± margin. */
export function meanwhile(event: HistoricalEvent, all: HistoricalEvent[], margin = 25) {
  const from = event.year - margin;
  const to = eventEnd(event) + margin;
  return all
    .filter((e) => e.id !== event.id && e.region !== event.region && e.year <= to && eventEnd(e) >= from)
    .sort((a, b) => Math.abs(a.year - event.year) - Math.abs(b.year - event.year));
}

/** Describes the selected year in the unit's own vocabulary. */
export function periodName(year: number) {
  if (year < 1400) return 'Early Renaissance in Italy';
  if (year < 1490) return 'Renaissance & the age of print';
  if (year < 1550) return 'High Renaissance & oceanic voyages';
  if (year < 1620) return 'Reformations & global trade';
  return 'Scientific Revolution & empires';
}
