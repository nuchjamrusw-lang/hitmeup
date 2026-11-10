import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { periodMarkers, YEAR_MAX, YEAR_MIN } from '@/data/regions';
import { clampYear, periodName } from '@/utils/time';
import { cn } from '@/utils/cn';

interface Props {
  year: number;
  /** Immediate change (dragging, ±1, typing). */
  onChange: (y: number) => void;
  /** Animated jump (±10, period markers). Falls back to onChange. */
  onJump?: (y: number) => void;
  compact?: boolean;
  /** Optional: years that have events, drawn as small ticks. */
  eventYears?: number[];
}

const pct = (y: number) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;

export function YearSelector({ year, onChange, onJump, compact, eventYears = [] }: Props) {
  const set = (y: number) => onChange(clampYear(y));
  const jump = (y: number) => (onJump ?? onChange)(clampYear(y));
  const stepBtn = 'inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface text-ink-soft hover:bg-mist hover:text-ink disabled:opacity-40';

  return (
    <div className={cn('w-full', compact ? '' : 'panel p-4 sm:p-5')}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <label htmlFor="year-range" className="eyebrow">
            Selected year
          </label>
          <output htmlFor="year-range" className="font-serif text-[28px] leading-none tabular-nums text-ink" aria-live="polite">
            {year}
          </output>
          <span className="hidden text-xs text-ink-muted sm:inline">{periodName(year)}</span>
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Change year">
          <button type="button" className={stepBtn} onClick={() => jump(year - 10)} disabled={year <= YEAR_MIN} aria-label="Back 10 years">
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button type="button" className={stepBtn} onClick={() => set(year - 1)} disabled={year <= YEAR_MIN} aria-label="Previous year">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <input
            type="number"
            min={YEAR_MIN}
            max={YEAR_MAX}
            value={year}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v) && v >= YEAR_MIN && v <= YEAR_MAX) set(v);
            }}
            className="h-8 w-[72px] rounded-md border border-line bg-surface px-2 text-center text-sm tabular-nums"
            aria-label="Type a year between 1300 and 1700"
          />
          <button type="button" className={stepBtn} onClick={() => set(year + 1)} disabled={year >= YEAR_MAX} aria-label="Next year">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" className={stepBtn} onClick={() => jump(year + 10)} disabled={year >= YEAR_MAX} aria-label="Forward 10 years">
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-4 px-[9px]">
        {/* event density ticks */}
        <div className="pointer-events-none absolute inset-x-[9px] top-[-6px] h-2" aria-hidden>
          {eventYears.map((y, i) => (
            <span key={i} className="absolute top-0 h-1.5 w-px bg-bronze-light" style={{ left: `${pct(y)}%` }} />
          ))}
        </div>
        <input
          id="year-range"
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={1}
          value={year}
          onChange={(e) => set(Number(e.target.value))}
          className="range-atlas relative -mx-[9px] w-[calc(100%+18px)]"
          aria-valuetext={`${year}, ${periodName(year)}`}
        />
        {/* century ticks */}
        <div className="relative mt-1 h-4 text-[10px] tabular-nums text-ink-faint" aria-hidden>
          {[1300, 1400, 1500, 1600, 1700].map((y) => (
            <span key={y} className="absolute -translate-x-1/2" style={{ left: `${pct(y)}%` }}>
              {y}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Major period markers">
        {periodMarkers.map((m) => (
          <button
            key={m.year}
            type="button"
            onClick={() => jump(m.year)}
            className={cn(
              'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
              year === m.year ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-soft hover:border-ink-faint hover:text-ink',
            )}
          >
            <span className="tabular-nums">{m.year}</span> · {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
