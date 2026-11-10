import { cn } from '@/utils/cn';

export function ProgressBar({ value, className, tone = 'ink', label }: { value: number; className?: string; tone?: 'ink' | 'bronze' | 'ok'; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const color = tone === 'bronze' ? 'bg-bronze' : tone === 'ok' ? 'bg-ok' : 'bg-ink';
  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-mist', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      aria-label={label}
    >
      <div className={cn('h-full rounded-full transition-[width] duration-500', color)} style={{ width: `${v}%` }} />
    </div>
  );
}

/** Small circular progress ring used sparingly (header, objectives). */
export function ProgressRing({ value, size = 40, stroke = 3.5, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${Math.round(v)}% complete`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EFEAE2" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1B2A41"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - v / 100)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={size * 0.27} fontWeight={600} fill="#1B2A41">
        {Math.round(v)}
      </text>
    </svg>
  );
}
