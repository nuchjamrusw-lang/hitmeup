import { ExternalLink } from 'lucide-react';
import { sources } from '@/data/sources';
import { historicalEvents } from '@/data/historicalEvents';
import { lessons } from '@/data/lessons';
import { PageHeader } from '@/components/ui/PageHeader';

export default function References() {
  const usage = (id: string) =>
    historicalEvents.filter((e) => e.sources.includes(id)).length + lessons.filter((l) => l.sources.includes(id)).length;
  const groups = [...new Set(sources.map((s) => s.publisher))];
  return (
    <div className="max-w-[880px]">
      <PageHeader
        eyebrow="Unit resources"
        title="References"
        subtitle="The historical content in ATLAS was written using these reference works. Follow the links to read further and to check the details for yourself."
      />
      <section className="mb-10 rounded-xl border border-line bg-surface p-5 text-[14px] leading-6 text-ink-soft">
        <h2 className="font-serif text-lg text-ink">How to read the dates and claims in ATLAS</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><strong className="text-ink">“c.”</strong> (circa) means “about”. Events marked <em>Approximate date</em> are scholarly estimates.</li>
          <li>Figures such as death tolls are given as ranges or estimates because historians disagree about them.</li>
          <li>Regions on the globe are modern geographic areas used only for navigation. Historical powers are labelled by type (empire, kingdom, dynasty, city-state) and shown as approximate centres rather than borders.</li>
          <li>Coastlines come from Natural Earth (public domain) and show modern physical geography.</li>
          <li>Illustrations are diagrams made for ATLAS; the two worksheet sources are redrawings, labelled as such.</li>
          <li>Links marked as search results open the publisher’s own search for that article title.</li>
        </ul>
      </section>
      {groups.map((g) => (
        <section key={g} className="mb-8">
          <h2 className="eyebrow mb-3">{g}</h2>
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {sources.filter((s) => s.publisher === g).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] text-ink hover:text-bronze-dark">
                  {s.title}
                  <ExternalLink className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <span className="shrink-0 text-[11px] text-ink-faint">
                  {s.url.includes('/search?') ? 'search · ' : ''}cited {usage(s.id)}×
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mb-8">
        <h2 className="eyebrow mb-3">Data</h2>
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface text-[14px]">
          <li className="px-4 py-3">
            <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer" className="text-ink hover:text-bronze-dark">Natural Earth — 1:110m land polygons (public domain)</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
