import { useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';
import { PerspectiveDiagram } from './Illustrations';

/**
 * Drag (or use arrow keys) to move the vanishing point and see how every
 * orthogonal line and the box re-align. A small, 2D interactive that makes
 * the geometry of linear perspective tangible.
 */
export function PerspectiveExplorer() {
  const [vp, setVp] = useState({ x: 320, y: 120 });
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 640;
    const y = ((clientY - r.top) / r.height) * 300;
    setVp({ x: Math.max(20, Math.min(620, x)), y: Math.max(30, Math.min(190, y)) });
  };

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div>
          <p className="eyebrow">Interactive</p>
          <h3 className="font-serif text-lg text-ink">Perspective explorer</h3>
        </div>
        <button type="button" onClick={() => setVp({ x: 320, y: 120 })} className="text-[12px] font-medium text-bronze-dark hover:text-ink">
          Reset
        </button>
      </div>
      <div
        ref={ref}
        className="relative cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          move(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX, e.clientY)}
        onPointerUp={() => (dragging.current = false)}
        tabIndex={0}
        role="slider"
        aria-label="Vanishing point position. Use arrow keys to move it."
        aria-valuetext={`Vanishing point at ${Math.round((vp.x / 640) * 100)}% across and ${Math.round((vp.y / 300) * 100)}% down`}
        onKeyDown={(e) => {
          const d = e.shiftKey ? 30 : 10;
          if (e.key === 'ArrowLeft') setVp((v) => ({ ...v, x: Math.max(20, v.x - d) }));
          else if (e.key === 'ArrowRight') setVp((v) => ({ ...v, x: Math.min(620, v.x + d) }));
          else if (e.key === 'ArrowUp') setVp((v) => ({ ...v, y: Math.max(30, v.y - d) }));
          else if (e.key === 'ArrowDown') setVp((v) => ({ ...v, y: Math.min(190, v.y + d) }));
          else return;
          e.preventDefault();
        }}
      >
        <PerspectiveDiagram vpX={vp.x} vpY={vp.y} interactive />
      </div>
      <div className="grid gap-3 border-t border-line px-4 py-3 text-[13px] text-ink-soft sm:grid-cols-[auto_1fr] sm:items-center">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted">
          <MousePointer2 className="h-3.5 w-3.5" aria-hidden /> Drag the vanishing point
        </span>
        <p>
          {vp.y < 90
            ? 'A high horizon makes us look down on the scene, as if from a balcony.'
            : vp.y > 160
              ? 'A low horizon makes the box and floor feel monumental, seen from a low viewpoint.'
              : 'At eye level, the horizon sits where the viewer’s eyes would be. Masaccio’s Holy Trinity (c. 1427) places its vanishing point at about the eye level of a person standing in the church.'}
        </p>
      </div>
    </div>
  );
}
