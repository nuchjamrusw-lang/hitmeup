import { scenes } from '@/data/scenes';
import { SceneSvg } from '@/components/scenes/EraScene';
import { regionById } from '@/data/regions';

/** Development-only page for reviewing every period illustration at once. */
export default function SceneGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {scenes.map((s) => (
        <figure key={s.id} className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="aspect-[12/5]"><SceneSvg scene={s} /></div>
          <figcaption className="p-2 text-[11px] text-ink-muted"><b className="text-ink">{regionById[s.region].name} {s.from}–{s.to}</b> · {s.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
