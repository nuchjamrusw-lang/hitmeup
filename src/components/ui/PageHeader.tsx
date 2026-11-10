import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, subtitle, actions }: { eyebrow?: string; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="h-display">{title}</h1>
        {subtitle && <p className="mt-3 text-[15px] leading-7 text-ink-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function SectionTitle({ title, kicker, action }: { title: string; kicker?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {kicker && <p className="eyebrow mb-1">{kicker}</p>}
        <h2 className="h-section">{title}</h2>
      </div>
      {action}
    </div>
  );
}
