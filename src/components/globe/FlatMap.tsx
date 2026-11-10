import { useMemo, useRef, useState } from 'react';
import type { HistoricalEvent, RegionId } from '@/types';
import { regions } from '@/data/regions';
import type { PolityCentre } from '@/data/polityCentres';
import { regionAt, projectEquirect } from '@/utils/geo';
import { defaultPalette, landPath } from './landData';
import { cn } from '@/utils/cn';

const W = 1000;
const H = 500;

interface Props {
  events?: HistoricalEvent[];
  selectedRegion: RegionId | null;
  selectedEventId?: string | null;
  polities?: PolityCentre[];
  showRegionLabels?: boolean;
  onSelectRegion: (id: RegionId) => void;
  onSelectEvent?: (id: string) => void;
  /** Crop to the inhabited latitudes for a less distorted view. */
  crop?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Equirectangular 2D map. Serves as the fallback when WebGL is unavailable
 * and as the answer surface for map-based worksheet questions.
 */
export default function FlatMap({
  events = [],
  selectedRegion,
  selectedEventId,
  polities = [],
  showRegionLabels = true,
  onSelectRegion,
  onSelectEvent,
  crop = true,
  className,
  ariaLabel = 'World map',
}: Props) {
  const d = useMemo(() => landPath(W, H), []);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const viewBox = crop ? `0 ${H * (90 - 75) / 180} ${W} ${H * (150 / 180)}` : `0 0 ${W} ${H}`;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    const lon = (p.x / W) * 360 - 180;
    const lat = 90 - (p.y / H) * 180;
    const r = regionAt(lat, lon);
    if (r) onSelectRegion(r);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      className={cn('h-full w-full select-none', className)}
      role="group"
      aria-label={ariaLabel}
      onClick={handleClick}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={W} height={H} fill={defaultPalette.ocean} />
      {Array.from({ length: 13 }, (_, i) => -180 + i * 30).map((lon) => (
        <line key={`m${lon}`} x1={((lon + 180) / 360) * W} x2={((lon + 180) / 360) * W} y1={0} y2={H} stroke={defaultPalette.grid} strokeWidth={0.6} />
      ))}
      {[-60, -30, 0, 30, 60].map((lat) => (
        <line key={`p${lat}`} x1={0} x2={W} y1={((90 - lat) / 180) * H} y2={((90 - lat) / 180) * H} stroke={defaultPalette.grid} strokeWidth={lat === 0 ? 1 : 0.6} />
      ))}
      <path d={d} fill={defaultPalette.land} stroke={defaultPalette.coast} strokeWidth={0.7} fillRule="evenodd" className="cursor-pointer" />

      {polities.map((p) => {
        const [x, y] = projectEquirect(p.lat, p.lon, W, H);
        return (
          <text key={p.name} x={x} y={y} fontSize={8.5} textAnchor="middle" fill="#6E5130" fontStyle="italic" fontFamily="Source Serif 4, Georgia, serif" pointerEvents="none" style={{ paintOrder: 'stroke', stroke: '#F5F1E8', strokeWidth: 2.5 }}>
            {p.name}
          </text>
        );
      })}

      {events.map((e) => {
        const [x, y] = projectEquirect(e.location.lat, e.location.lon, W, H);
        const sel = e.id === selectedEventId;
        return (
          <g
            key={e.id}
            transform={`translate(${x} ${y})`}
            className="cursor-pointer"
            onClick={(ev) => {
              ev.stopPropagation();
              onSelectEvent?.(e.id);
            }}
            onMouseEnter={() => setHover(e.id)}
            onMouseLeave={() => setHover(null)}
            role="button"
            tabIndex={0}
            aria-label={`${e.dateLabel}: ${e.title}`}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                onSelectEvent?.(e.id);
              }
            }}
          >
            <circle r={9} fill="transparent" />
            {sel && <circle r={8} fill="none" stroke="#1B2A41" strokeWidth={1.2} opacity={0.6} />}
            <circle r={sel ? 4.5 : 3.5} fill={sel ? '#1B2A41' : '#8C6A3F'} stroke="#fff" strokeWidth={1} />
            {hover === e.id && (
              <g pointerEvents="none">
                <rect x={8} y={-11} width={Math.min(260, 7 + (e.dateLabel.length + e.title.length) * 4.6)} height={18} rx={4} fill="#fff" stroke="#E7E2D9" />
                <text x={13} y={2} fontSize={9.5} fill="#1B2A41">
                  {e.dateLabel} · {e.title.length > 48 ? e.title.slice(0, 46) + '…' : e.title}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {showRegionLabels &&
        regions.map((r) => {
          const [x, y] = projectEquirect(r.center.lat, r.center.lon, W, H);
          const sel = selectedRegion === r.id;
          const w = r.name.length * 5.6 + 16;
          return (
            <g
              key={r.id}
              transform={`translate(${x} ${y})`}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-pressed={sel}
              aria-label={`Select ${r.name}`}
              onClick={(ev) => {
                ev.stopPropagation();
                onSelectRegion(r.id);
              }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  onSelectRegion(r.id);
                }
              }}
            >
              <rect x={-w / 2} y={-10} width={w} height={20} rx={10} fill={sel ? '#1B2A41' : '#fff'} stroke={sel ? '#1B2A41' : '#D9D2C5'} />
              <text textAnchor="middle" y={3.5} fontSize={10} fontWeight={500} fill={sel ? '#fff' : '#1B2A41'}>
                {r.name}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
