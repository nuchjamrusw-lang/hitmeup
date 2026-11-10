import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="h-display mt-2">This page is not on the map</h1>
      <p className="mt-3 text-ink-muted">The page you were looking for does not exist or has moved.</p>
      <ButtonLink to="/" className="mt-6">Back to Overview</ButtonLink>
    </div>
  );
}
