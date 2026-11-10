import { ExternalLink } from 'lucide-react';
import { sourceById } from '@/data/sources';

export function SourceList({ ids, compact }: { ids: string[]; compact?: boolean }) {
  const list = ids.map((id) => sourceById[id]).filter(Boolean);
  if (!list.length) return null;
  return (
    <ul className={compact ? 'space-y-1' : 'space-y-1.5'}>
      {list.map((s) => (
        <li key={s.id} className="text-xs leading-5 text-ink-muted">
          <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-ink">
            <span>
              <span className="text-ink-soft">{s.publisher}</span> — “{s.title}”
            </span>
            <ExternalLink className="mt-1 h-3 w-3 shrink-0" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
