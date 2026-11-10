import { Loader2 } from 'lucide-react';

export function PageLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-ink-muted" role="status">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function SceneLoading({ label = 'Preparing 3D view…' }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-paper/70 text-sm text-ink-muted" role="status">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
      {label}
    </div>
  );
}
