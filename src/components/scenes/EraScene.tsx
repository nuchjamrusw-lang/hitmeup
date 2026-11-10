import { AnimatePresence, motion } from 'framer-motion';
import type { RegionId } from '@/types';
import { sceneFor, type Backdrop, type SceneDef } from '@/data/scenes';
import { regionById } from '@/data/regions';
import { C, motifs } from './motifs';
import { cn } from '@/utils/cn';

const W = 480;
const H = 200;
const GROUND = 172;

/** Sky tones shift gently from warm parchment (early) to cooler light (late). */
const skyFor = (from: number) => (from < 1450 ? '#F4ECDD' : from < 1550 ? '#EFEEE7' : '#E9EDEF');

function BackdropLayer({ kind }: { kind: Backdrop }) {
  switch (kind) {
    case 'mountains':
      return (
        <g>
          <path d="M0 150 L60 70 L110 120 L170 55 L240 125 L300 60 L360 115 L420 75 L480 130 L480 200 L0 200 Z" fill="#DDD5C6" />
          <path d="M0 165 L80 110 L150 150 L230 100 L320 150 L400 115 L480 155 L480 200 L0 200 Z" fill="#D2C8B5" />
        </g>
      );
    case 'mesa':
      return (
        <g>
          <path d="M0 150 L30 150 L44 104 L130 104 L146 150 L330 150 L344 112 L420 112 L436 150 L480 150 L480 200 L0 200 Z" fill="#DCC4A6" />
        </g>
      );
    case 'desert':
      return (
        <g>
          <path d="M0 160 Q80 130 160 152 Q240 172 320 146 Q400 124 480 150 L480 200 L0 200 Z" fill="#E6D7BA" />
        </g>
      );
    case 'forest':
      return (
        <g fill="#B9C2AE">
          {Array.from({ length: 24 }, (_, i) => {
            const x = i * 21 + (i % 2) * 6;
            const h = 34 + ((i * 37) % 22);
            return <path key={i} d={`M${x - 11} ${GROUND - 2} L${x} ${GROUND - 2 - h} L${x + 11} ${GROUND - 2} Z`} />;
          })}
        </g>
      );
    case 'hills':
      return <path d="M0 150 Q70 112 150 138 Q230 160 310 126 Q390 98 480 134 L480 200 L0 200 Z" fill="#DDD5C6" />;
    default:
      return <path d="M0 160 Q120 150 240 158 Q360 166 480 156 L480 200 L0 200 Z" fill="#E1DACB" />;
  }
}

export function SceneSvg({ scene }: { scene: SceneDef }) {
  const sunX = scene.from < 1450 ? 400 : scene.from < 1550 ? 70 : 250;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full" role="img" aria-label={`Illustration: ${scene.title}. ${scene.caption}`} preserveAspectRatio="xMidYMax slice">
      <rect width={W} height={H} fill={skyFor(scene.from)} />
      <circle cx={sunX} cy={46} r={18} fill="#EAD9B8" />
      <BackdropLayer kind={scene.backdrop} />
      {/* ground */}
      <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#CFC3AC" />
      {scene.waterFrom !== undefined && (
        <g>
          <path d={`M${scene.waterFrom} ${GROUND - 6} Q${scene.waterFrom + 20} ${GROUND - 9} ${scene.waterFrom + 40} ${GROUND - 6} L${W} ${GROUND - 6} L${W} ${H} L${scene.waterFrom - 20} ${H} Z`} fill={C.water} />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${scene.waterFrom! + 20 + i * 36} ${GROUND + 8 + (i % 2) * 8} q6 -3 12 0 q6 3 12 0`} stroke={C.waterDark} strokeWidth={1.2} fill="none" />
          ))}
        </g>
      )}
      {scene.items.map((it, i) => {
        const Motif = motifs[it.m];
        const y = it.water ? GROUND + 2 : GROUND;
        return (
          <g key={`${it.m}-${i}`} transform={`translate(${it.x} ${y}) scale(${it.s ?? 1})`}>
            <Motif />
          </g>
        );
      })}
    </svg>
  );
}

interface Props {
  region: RegionId;
  year: number;
  className?: string;
  /** compact: no caption block, title overlaid. */
  variant?: 'full' | 'compact';
}

/** Period illustration for a region, cross-fading when the era changes. */
export function EraScene({ region, year, className, variant = 'full' }: Props) {
  const scene = sceneFor(region, year);
  return (
    <figure className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
      <div className="relative aspect-[12/5] w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <SceneSvg scene={scene} />
          </motion.div>
        </AnimatePresence>
        <span className="absolute left-2 top-2 rounded bg-surface/85 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-ink-soft">
          {regionById[region].name} · {scene.from}–{scene.to}
        </span>
      </div>
      {variant === 'full' ? (
        <figcaption className="border-t border-line bg-paper px-3 py-2.5">
          <p className="font-serif text-[15px] leading-snug text-ink">{scene.title}</p>
          <p className="mt-0.5 text-[12px] leading-5 text-ink-muted">{scene.caption}</p>
        </figcaption>
      ) : (
        <figcaption className="border-t border-line bg-paper px-3 py-1.5 text-[11.5px] leading-4 text-ink-muted" title={scene.caption}>
          <span className="font-medium text-ink-soft">{scene.title}</span>
        </figcaption>
      )}
    </figure>
  );
}
