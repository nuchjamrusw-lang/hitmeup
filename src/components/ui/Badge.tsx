import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'neutral' | 'bronze' | 'ok' | 'warn' | 'ink';
const tones: Record<Tone, string> = {
  neutral: 'bg-mist text-ink-soft border-line',
  bronze: 'bg-bronze-wash text-bronze-dark border-[#E8DCC8]',
  ok: 'bg-[#EAF1EC] text-ok border-[#D3E3D8]',
  warn: 'bg-[#F7ECE3] text-warn border-[#EBD7C6]',
  ink: 'bg-ink text-white border-ink',
};

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-4', tones[tone], className)}>
      {children}
    </span>
  );
}
