/**
 * Flat, editorial-style SVG motifs used to compose period scenes.
 * Every motif is drawn around its own origin: x = centre, y = 0 = ground line,
 * with negative y going up. Scenes place them with translate/scale.
 */
import type { ReactElement } from 'react';

export const C = {
  ink: '#1B2A41',
  ink2: '#3C4A5E',
  ink3: '#5F6B7A',
  bronze: '#8C6A3F',
  bronzeLight: '#C9AE84',
  sand: '#E4D6BC',
  adobe: '#B98F64',
  water: '#C9D5DE',
  waterDark: '#AFC0CD',
  light: '#F6F1E7',
  green: '#5E7A62',
};

type M = () => ReactElement;

const roof = (y: number, w: number, h = 6, color = C.ink) => (
  <path d={`M${-w / 2 - 6} ${y} Q${-w / 2} ${y - 2} ${-w / 2 + 2} ${y - h} L${w / 2 - 2} ${y - h} Q${w / 2} ${y - 2} ${w / 2 + 6} ${y} Z`} fill={color} />
);

/* ───────────── Europe ───────────── */
const florenceDome: M = () => (
  <g>
    <rect x={-46} y={-18} width={60} height={18} fill={C.ink2} />
    <path d="M-46 -18 L-16 -30 L14 -18 Z" fill={C.ink2} />
    <rect x={-15} y={-36} width={30} height={18} fill={C.ink} />
    <path d="M-15 -36 Q-15 -62 0 -68 Q15 -62 15 -36 Z" fill={C.bronze} />
    <path d="M-7 -36 Q-7 -60 0 -67 M7 -36 Q7 -60 0 -67" stroke={C.light} strokeWidth={0.8} fill="none" opacity={0.7} />
    <rect x={-2.5} y={-76} width={5} height={8} fill={C.ink} />
    <path d="M-2.5 -76 L0 -82 L2.5 -76 Z" fill={C.ink} />
    <rect x={20} y={-64} width={10} height={64} fill={C.ink} />
    <rect x={18} y={-68} width={14} height={4} fill={C.ink} />
  </g>
);

const cityTower: M = () => (
  <g fill={C.ink}>
    <rect x={-22} y={-40} width={44} height={40} />
    {[-22, -14, -6, 2, 10, 18].map((x) => <rect key={x} x={x} y={-44} width={4} height={4} />)}
    <rect x={-5} y={-84} width={10} height={44} />
    <rect x={-7} y={-94} width={14} height={10} fill={C.ink2} />
    <path d="M-7 -94 L0 -104 L7 -94 Z" />
    {[-12, 0, 12].map((x) => <rect key={x} x={x - 2} y={-30} width={4} height={8} fill={C.light} opacity={0.5} />)}
  </g>
);

const printingPress: M = () => (
  <g fill={C.ink2}>
    <rect x={-16} y={-46} width={5} height={46} />
    <rect x={11} y={-46} width={5} height={46} />
    <rect x={-20} y={-50} width={40} height={6} fill={C.ink} />
    <rect x={-2} y={-44} width={4} height={14} fill={C.bronze} />
    <rect x={-10} y={-30} width={20} height={4} fill={C.ink} />
    <rect x={-24} y={-18} width={48} height={4} fill={C.ink} />
    <path d="M2 -38 L22 -34" stroke={C.ink} strokeWidth={2} />
  </g>
);

const telescope: M = () => (
  <g stroke={C.ink} strokeWidth={2} fill="none" strokeLinecap="round">
    <path d="M0 -28 L-10 0 M0 -28 L10 0 M0 -28 L0 0" />
    <rect x={-22} y={-36} width={40} height={6} fill={C.bronze} stroke="none" transform="rotate(-24 0 -30)" />
  </g>
);

const stPeters: M = () => (
  <g>
    <rect x={-46} y={-26} width={92} height={26} fill={C.ink2} />
    <path d="M-20 -26 L0 -36 L20 -26 Z" fill={C.ink2} />
    {[-40, -30, -20, -10, 0, 10, 20, 30, 40].map((x) => <rect key={x} x={x - 1} y={-24} width={2} height={20} fill={C.light} opacity={0.35} />)}
    <rect x={-22} y={-52} width={44} height={14} fill={C.ink} />
    {[-18, -10, -2, 6, 14].map((x) => <rect key={x} x={x} y={-50} width={2.5} height={10} fill={C.light} opacity={0.4} />)}
    <path d="M-22 -52 Q-22 -84 0 -92 Q22 -84 22 -52 Z" fill={C.bronze} />
    <rect x={-3} y={-100} width={6} height={8} fill={C.ink} />
    <path d="M-3 -100 L0 -106 L3 -100 Z" fill={C.ink} />
  </g>
);

/* ───────────── Ships ───────────── */
const hull = (w: number, color = C.ink) => <path d={`M${-w / 2} -10 Q${-w / 2 + 6} 0 ${-w / 2 + 14} 0 L${w / 2 - 10} 0 Q${w / 2 - 2} 0 ${w / 2 + 4} -12 Z`} fill={color} />;

const caravel: M = () => (
  <g>
    {hull(56)}
    <rect x={-26} y={-18} width={12} height={8} fill={C.ink} />
    <path d="M-6 -10 L-6 -52 M12 -10 L12 -40" stroke={C.ink} strokeWidth={1.5} />
    <path d="M-6 -50 L-22 -14 L10 -14 Z" fill={C.light} stroke={C.ink2} strokeWidth={0.8} />
    <path d="M12 -38 L2 -14 L24 -14 Z" fill={C.light} stroke={C.ink2} strokeWidth={0.8} />
    <path d="M-12 -40 L-8 -36" stroke={C.bronze} strokeWidth={0} />
  </g>
);

const galleon: M = () => (
  <g>
    {hull(76)}
    <rect x={-38} y={-24} width={16} height={14} fill={C.ink} />
    <path d="M-14 -10 L-14 -66 M8 -10 L8 -58 M26 -10 L26 -40" stroke={C.ink} strokeWidth={1.5} />
    {[
      [-14, -62, 22, 16],
      [-14, -40, 26, 20],
      [8, -54, 20, 14],
      [8, -34, 24, 18],
    ].map(([x, y, w, h]) => (
      <path key={`${x}${y}`} d={`M${x - w / 2} ${y} Q${x} ${y + 3} ${x + w / 2} ${y} L${x + w / 2 - 1} ${y + h} Q${x} ${y + h + 4} ${x - w / 2 + 1} ${y + h} Z`} fill={C.light} stroke={C.ink2} strokeWidth={0.8} />
    ))}
    <path d="M26 -38 L18 -14 L34 -14 Z" fill={C.light} stroke={C.ink2} strokeWidth={0.8} />
    <path d="M-14 -66 L-14 -72 L-6 -69 Z" fill={C.bronze} />
  </g>
);

const junk: M = () => (
  <g>
    <path d="M-34 -14 Q-28 0 -18 0 L24 0 Q32 -2 36 -18 L28 -12 L-26 -12 Z" fill={C.ink} />
    <path d="M-6 -12 L-6 -62 M16 -12 L16 -48" stroke={C.ink} strokeWidth={1.5} />
    {[
      [-6, 28, 46],
      [16, 20, 32],
    ].map(([x, w, h]) => (
      <g key={x}>
        <path d={`M${x - w / 2} ${-14 - h} L${x + w / 2} ${-16 - h + 4} L${x + w / 2} -16 L${x - w / 2} -14 Z`} fill={C.bronzeLight} />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1={x - w / 2} x2={x + w / 2} y1={-14 - (h * (i + 1)) / 6} y2={-14 - (h * (i + 1)) / 6} stroke={C.bronze} strokeWidth={0.8} />
        ))}
      </g>
    ))}
  </g>
);

const dhow: M = () => (
  <g>
    <path d="M-28 -12 Q-22 0 -12 0 L18 0 Q26 -2 32 -14 Z" fill={C.ink} />
    <path d="M0 -12 L-2 -44" stroke={C.ink} strokeWidth={1.4} />
    <path d="M-24 -50 L20 -14 L-6 -14 Z" fill={C.light} stroke={C.ink2} strokeWidth={0.8} />
  </g>
);

const canoe: M = () => (
  <g>
    <path d="M-16 -4 Q0 2 16 -4 L14 0 L-14 0 Z" fill={C.ink} />
    <path d="M2 -14 L4 -4" stroke={C.ink} strokeWidth={1.4} />
    <circle cx={2} cy={-17} r={2.4} fill={C.ink} />
    <path d="M6 -10 L14 4" stroke={C.ink2} strokeWidth={1} />
  </g>
);

/* ───────────── Middle East ───────────── */
const minaret = (x: number, h: number, color = C.ink) => (
  <g fill={color}>
    <rect x={x - 2.2} y={-h} width={4.4} height={h} />
    <rect x={x - 3.4} y={-h * 0.72} width={6.8} height={2} />
    <rect x={x - 3.4} y={-h * 0.45} width={6.8} height={2} />
    <path d={`M${x - 2.6} ${-h} L${x} ${-h - 14} L${x + 2.6} ${-h} Z`} />
  </g>
);

const ottomanMosque: M = () => (
  <g>
    <rect x={-40} y={-20} width={80} height={20} fill={C.ink2} />
    <path d="M-34 -20 Q-34 -32 -20 -34 Q-12 -32 -10 -20 Z M10 -20 Q12 -32 20 -34 Q34 -32 34 -20 Z" fill={C.ink} />
    <rect x={-20} y={-28} width={40} height={8} fill={C.ink} />
    <path d="M-20 -28 Q-20 -50 0 -54 Q20 -50 20 -28 Z" fill={C.bronze} />
    <path d="M0 -54 L0 -62" stroke={C.ink} strokeWidth={1.5} />
    {minaret(-48, 78)}
    {minaret(48, 78)}
  </g>
);

const mamlukCairo: M = () => (
  <g>
    <rect x={-30} y={-26} width={36} height={26} fill={C.ink2} />
    <rect x={-24} y={-32} width={24} height={6} fill={C.ink} />
    <path d="M-24 -32 Q-24 -52 -12 -58 Q0 -52 0 -32 Z" fill={C.bronze} />
    {[-20, -16, -12, -8, -4].map((x) => <path key={x} d={`M${x} -32 Q${x} -50 -12 -57`} stroke={C.light} strokeWidth={0.6} fill="none" opacity={0.6} />)}
    <g fill={C.ink}>
      <rect x={14} y={-46} width={12} height={46} />
      <rect x={16} y={-66} width={8} height={20} />
      <rect x={17.5} y={-80} width={5} height={14} />
      <ellipse cx={20} cy={-84} rx={4} ry={5} />
      <rect x={12} y={-48} width={16} height={2} />
      <rect x={14} y={-68} width={12} height={2} />
    </g>
  </g>
);

const persianIwan: M = () => (
  <g>
    <rect x={-30} y={-46} width={18} height={10} fill={C.ink} />
    <path d="M-28 -46 Q-34 -72 -2 -82 Q30 -72 24 -46 Z" fill="#2F6273" />
    <rect x={-48} y={-22} width={96} height={22} fill={C.ink2} />
    <rect x={-20} y={-62} width={40} height={62} fill={C.ink} />
    <path d="M-12 0 L-12 -40 Q-12 -52 0 -56 Q12 -52 12 -40 L12 0 Z" fill="#2F6273" />
    {minaret(-24, 76, C.ink)}
    {minaret(24, 76, C.ink)}
  </g>
);

const camel: M = () => (
  <g>
    <g stroke={C.ink2} strokeWidth={2.2} strokeLinecap="round">
      <line x1={-8} y1={-12} x2={-9} y2={0} />
      <line x1={-4} y1={-12} x2={-4} y2={0} />
      <line x1={5} y1={-12} x2={5} y2={0} />
      <line x1={8} y1={-12} x2={9} y2={0} />
    </g>
    <ellipse cx={0} cy={-16} rx={12} ry={6} fill={C.ink2} />
    <ellipse cx={-1} cy={-21} rx={6} ry={5} fill={C.ink2} />
    <path d="M10 -18 Q16 -22 17 -30" stroke={C.ink2} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    <ellipse cx={20} cy={-30} rx={4} ry={2.2} fill={C.ink2} />
  </g>
);

/* ───────────── East Asia ───────────── */
const chineseGate: M = () => (
  <g>
    <rect x={-60} y={-26} width={120} height={26} fill={C.ink2} />
    {Array.from({ length: 15 }, (_, i) => <rect key={i} x={-60 + i * 8} y={-30} width={5} height={4} fill={C.ink2} />)}
    <path d="M-9 0 L-9 -12 Q-9 -20 0 -20 Q9 -20 9 -12 L9 0 Z" fill={C.light} opacity={0.55} />
    <rect x={-26} y={-44} width={52} height={14} fill="#7A3B2E" />
    {roof(-44, 56, 7)}
    <rect x={-18} y={-56} width={36} height={6} fill="#7A3B2E" />
    {roof(-56, 40, 7)}
  </g>
);

const wallY = (x: number) => -10 - 16 * Math.sin(((x + 90) / 180) * Math.PI * 1.6);
const greatWall: M = () => {
  const xs = Array.from({ length: 37 }, (_, i) => -90 + i * 5);
  const top = xs.map((x) => `${x} ${wallY(x) - 6}`).join(' L');
  const bottom = [...xs].reverse().map((x) => `${x} ${wallY(x) + 3}`).join(' L');
  return (
    <g>
      <path d={`M${xs[0]} 0 L${xs.map((x) => `${x} ${wallY(x) + 3}`).join(' L')} L90 0 Z`} fill="#CFC3AC" />
      <path d={`M${top} L${bottom} Z`} fill={C.ink2} />
      {xs.filter((_, i) => i % 2 === 0).map((x) => <rect key={x} x={x - 1.2} y={wallY(x) - 8.5} width={2.4} height={3} fill={C.ink2} />)}
      {[-66, -2, 62].map((x) => {
        const y = wallY(x) - 5;
        return (
          <g key={x}>
            <rect x={x - 5} y={y - 11} width={10} height={12} fill={C.ink} />
            <g transform={`translate(${x} 0)`}>{roof(y - 11, 10, 4, C.ink)}</g>
          </g>
        );
      })}
    </g>
  );
};

const japaneseCastle: M = () => (
  <g>
    <path d="M-36 0 L-30 -18 L30 -18 L36 0 Z" fill={C.ink3} />
    {[
      [44, -18],
      [34, -30],
      [24, -42],
      [14, -54],
    ].map(([w, y]) => (
      <g key={y}>
        <rect x={-w / 2} y={y - 12} width={w} height={12} fill={C.light} stroke={C.ink2} strokeWidth={0.6} />
        {roof(y - 9, w, 5)}
      </g>
    ))}
    <path d="M-4 -66 L0 -72 L4 -66 Z" fill={C.bronze} />
  </g>
);

/* ───────────── South & Southeast Asia ───────────── */
const gopuram: M = () => (
  <g>
    {[
      [44, 0],
      [38, -12],
      [32, -22],
      [26, -32],
      [20, -42],
      [14, -52],
    ].map(([w, y]) => (
      <rect key={y} x={-w / 2} y={y - 12} width={w} height={12} fill={y === 0 ? C.ink2 : C.adobe} stroke={C.ink2} strokeWidth={0.6} />
    ))}
    <path d="M-14 -64 Q-14 -72 0 -72 Q14 -72 14 -64 Z" fill={C.bronze} />
    {[-8, 0, 8].map((x) => <path key={x} d={`M${x - 1.5} -72 L${x} -78 L${x + 1.5} -72 Z`} fill={C.bronze} />)}
    <path d="M-7 0 L-7 -8 Q0 -14 7 -8 L7 0 Z" fill={C.light} opacity={0.5} />
  </g>
);

const palm: M = () => (
  <g>
    <path d="M0 0 Q-4 -24 4 -48" stroke={C.ink2} strokeWidth={3} fill="none" />
    {[
      'M4 -48 Q-12 -54 -20 -44',
      'M4 -48 Q18 -56 26 -44',
      'M4 -48 Q-6 -62 -14 -60',
      'M4 -48 Q14 -64 22 -60',
      'M4 -48 Q4 -60 2 -64',
    ].map((d) => <path key={d} d={d} stroke={C.green} strokeWidth={3} fill="none" strokeLinecap="round" />)}
  </g>
);

const tajMahal: M = () => (
  <g>
    <rect x={-56} y={-6} width={112} height={6} fill={C.ink3} />
    <rect x={-26} y={-36} width={52} height={30} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    <path d="M-8 -6 L-8 -24 Q0 -32 8 -24 L8 -6 Z" fill={C.ink3} opacity={0.6} />
    <rect x={-12} y={-42} width={24} height={6} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    <path d="M-12 -42 Q-24 -58 0 -72 Q24 -58 12 -42 Z" fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    <path d="M0 -72 L0 -80" stroke={C.bronze} strokeWidth={1.5} />
    {[-20, 20].map((x) => (
      <path key={x} d={`M${x - 4} -36 Q${x - 5} -44 ${x} -46 Q${x + 5} -44 ${x + 4} -36 Z`} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    ))}
    {[-48, 48].map((x) => (
      <g key={x}>
        <rect x={x - 2} y={-58} width={4} height={52} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
        <path d={`M${x - 3} -58 Q${x} -64 ${x + 3} -58 Z`} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
      </g>
    ))}
  </g>
);

const candiBentar: M = () => {
  const half = 'M-30 0 L-30 -14 L-26 -14 L-26 -26 L-22 -26 L-22 -38 L-18 -38 L-18 -50 L-14 -50 L-14 -62 L-8 -62 L-8 0 Z';
  return (
    <g fill="#9B4F35">
      <path d={half} />
      <path d={half} transform="scale(-1 1)" />
      <rect x={-34} y={-4} width={68} height={4} fill={C.ink2} />
    </g>
  );
};

const malayMosque: M = () => (
  <g>
    <rect x={-26} y={-14} width={52} height={14} fill={C.ink2} />
    <path d="M-34 -14 L-20 -28 L20 -28 L34 -14 Z" fill={C.ink} />
    <path d="M-24 -28 L-12 -40 L12 -40 L24 -28 Z" fill={C.ink} />
    <path d="M-14 -40 L0 -54 L14 -40 Z" fill={C.ink} />
    <path d="M0 -54 L0 -60" stroke={C.bronze} strokeWidth={2} />
  </g>
);

const prang: M = () => (
  <g>
    <path d="M-20 0 L-16 -10 L16 -10 L20 0 Z" fill={C.ink3} />
    <path d="M-10 -10 L-10 -36 Q-10 -60 0 -72 Q10 -60 10 -36 L10 -10 Z" fill={C.adobe} />
    {[-20, -30, -40, -50].map((y) => <line key={y} x1={-10} x2={10} y1={y} y2={y} stroke={C.ink2} strokeWidth={0.8} />)}
    <path d="M0 -72 L0 -82" stroke={C.ink} strokeWidth={1.5} />
  </g>
);

const chedi: M = () => (
  <g fill={C.ink3}>
    <rect x={-18} y={-6} width={36} height={6} />
    <rect x={-14} y={-12} width={28} height={6} />
    <path d="M-12 -12 Q-12 -32 0 -36 Q12 -32 12 -12 Z" fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    <path d="M-3 -36 L0 -70 L3 -36 Z" fill={C.ink2} />
  </g>
);

/* ───────────── Africa ───────────── */
const sahelMosque: M = () => (
  <g>
    <path d="M-46 0 L-40 -30 L40 -30 L46 0 Z" fill={C.adobe} />
    {[-30, 0, 30].map((x) => (
      <g key={x}>
        <path d={`M${x - 7} -30 L${x - 5} -50 Q${x} -54 ${x + 5} -50 L${x + 7} -30 Z`} fill={C.adobe} />
        {[-36, -44].map((y) => <line key={y} x1={x - 9} x2={x + 9} y1={y} y2={y} stroke={C.ink2} strokeWidth={1.2} />)}
      </g>
    ))}
    {[-38, -22, -8, 8, 22, 38].map((x) => <line key={x} x1={x} x2={x} y1={-20} y2={-26} stroke={C.ink2} strokeWidth={1.4} />)}
    <rect x={-46} y={-2} width={92} height={2} fill={C.ink2} opacity={0.4} />
  </g>
);

const fort: M = () => (
  <g fill={C.light} stroke={C.ink2} strokeWidth={0.8}>
    <rect x={-44} y={-24} width={70} height={24} />
    {[-44, -36, -28, -20, -12, -4, 4, 12, 20].map((x) => <rect key={x} x={x} y={-28} width={4} height={4} />)}
    <rect x={26} y={-38} width={16} height={38} />
    {[26, 32, 38].map((x) => <rect key={x} x={x} y={-42} width={4} height={4} />)}
    <path d="M34 -42 L34 -56" stroke={C.ink} />
    <path d="M34 -56 L44 -53 L34 -50 Z" fill={C.bronze} stroke="none" />
    <path d="M-12 0 L-12 -10 Q-6 -16 0 -10 L0 0 Z" fill={C.ink2} stroke="none" />
  </g>
);

const gondar: M = () => (
  <g>
    <rect x={-26} y={-36} width={52} height={36} fill={C.adobe} />
    {[-26, -18, -10, -2, 6, 14].map((x) => <rect key={x} x={x} y={-40} width={5} height={4} fill={C.adobe} />)}
    {[-30, 30].map((x) => (
      <g key={x}>
        <rect x={x - 7} y={-46} width={14} height={46} fill="#A07A52" />
        <path d={`M${x - 7} -46 Q${x} -58 ${x + 7} -46 Z`} fill={C.ink2} />
      </g>
    ))}
    {[-14, 0, 14].map((x) => <path key={x} d={`M${x - 3} -14 L${x - 3} -22 Q${x} -26 ${x + 3} -22 L${x + 3} -14 Z`} fill={C.ink2} />)}
  </g>
);

const stoneWalls: M = () => (
  <g>
    <path d="M-60 0 Q-58 -30 -10 -32 Q40 -32 60 -12 L60 0 Z" fill={C.ink3} />
    <path d="M-50 0 Q-48 -22 -10 -24 Q30 -24 50 -10 L50 0 Z" fill={C.sand} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-60} x2={60} y1={-5 - i * 5} y2={-5 - i * 5} stroke={C.ink2} strokeWidth={0.4} opacity={0.5} />)}
    <path d="M10 -24 L10 -50 Q16 -54 22 -50 L22 -22 Z" fill={C.ink3} />
  </g>
);

/* ───────────── Americas ───────────── */
const pueblo: M = () => (
  <g fill={C.adobe} stroke="#8E6A47" strokeWidth={0.6}>
    {[-48, -24, 0, 24].map((x) => <rect key={x} x={x} y={-18} width={24} height={18} />)}
    {[-36, -12, 12].map((x) => <rect key={x} x={x} y={-34} width={24} height={16} />)}
    <rect x={-20} y={-48} width={22} height={14} />
    {[-40, -16, 8, 32, -28, 0].map((x, i) => <rect key={i} x={x} y={i < 4 ? -12 : -28} width={5} height={5} fill={C.ink2} stroke="none" />)}
    <path d="M28 -14 L32 -40 M34 -14 L38 -40 M29 -20 L35 -20 M30 -28 L36 -28 M31 -36 L37 -36" stroke={C.ink2} strokeWidth={1} fill="none" />
  </g>
);

const longhouse: M = () => (
  <g>
    <path d="M-44 0 L-44 -16 Q-44 -30 -30 -30 L30 -30 Q44 -30 44 -16 L44 0 Z" fill="#8E7350" />
    {[-30, -15, 0, 15, 30].map((x) => <path key={x} d={`M${x} 0 L${x} -30`} stroke={C.ink2} strokeWidth={0.6} opacity={0.6} />)}
    <rect x={-48} y={-10} width={6} height={10} fill={C.ink} />
    <path d="M-4 -30 L-2 -36 L2 -36 L4 -30" fill="none" stroke={C.ink3} strokeWidth={1} />
  </g>
);

const palisade: M = () => (
  <g fill={C.ink2}>
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M${-48 + i * 6} 0 L${-48 + i * 6} -26 L${-45 + i * 6} -31 L${-42 + i * 6} -26 L${-42 + i * 6} 0 Z`} />
    ))}
  </g>
);

const templo: M = () => (
  <g>
    {[
      [96, 0],
      [80, -12],
      [64, -24],
      [48, -36],
    ].map(([w, y]) => (
      <rect key={y} x={-w / 2} y={y - 12} width={w} height={12} fill={C.adobe} stroke="#8E6A47" strokeWidth={0.6} />
    ))}
    <path d="M-16 0 L-12 -48 L-2 -48 L-2 0 Z M2 0 L2 -48 L12 -48 L16 0 Z" fill={C.light} opacity={0.45} />
    <rect x={-20} y={-62} width={14} height={14} fill="#7A3B2E" />
    <path d="M-22 -62 L-13 -70 L-4 -62 Z" fill="#7A3B2E" />
    <rect x={6} y={-62} width={14} height={14} fill="#2F6273" />
    {[6, 10, 14].map((x) => <rect key={x} x={x} y={-66} width={3} height={4} fill="#2F6273" />)}
  </g>
);

const colonialChurch: M = () => (
  <g>
    <rect x={-22} y={-40} width={44} height={40} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    <path d="M-22 -40 Q0 -54 22 -40 Z" fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
    {[-28, 28].map((x) => (
      <g key={x}>
        <rect x={x - 7} y={-62} width={14} height={62} fill={C.light} stroke={C.ink3} strokeWidth={0.8} />
        <path d={`M${x - 7} -62 Q${x} -72 ${x + 7} -62 Z`} fill={C.bronze} />
        <rect x={x - 2.5} y={-56} width={5} height={7} fill={C.ink2} />
      </g>
    ))}
    <path d="M-6 0 L-6 -14 Q0 -20 6 -14 L6 0 Z" fill={C.ink2} />
    <path d="M0 -50 L0 -60 M-3 -57 L3 -57" stroke={C.ink2} strokeWidth={1.2} />
  </g>
);

const machuPicchu: M = () => (
  <g>
    <path d="M10 -40 L30 -110 L46 -40 Z" fill={C.green} />
    <path d="M-80 0 L-40 -50 L-10 -60 L40 -40 L80 0 Z" fill="#7C8C6E" />
    {Array.from({ length: 6 }, (_, i) => (
      <path key={i} d={`M${-70 + i * 6} ${-6 - i * 8} L${60 - i * 6} ${-6 - i * 6}`} stroke={C.light} strokeWidth={1} opacity={0.6} />
    ))}
    {[-20, -10, 0, 10].map((x) => <rect key={x} x={x} y={-56} width={7} height={6} fill={C.ink3} />)}
  </g>
);

const chanChan: M = () => (
  <g>
    <rect x={-70} y={-20} width={140} height={20} fill={C.adobe} />
    <rect x={-50} y={-30} width={60} height={10} fill={C.adobe} />
    {Array.from({ length: 13 }, (_, i) => (
      <path key={i} d={`M${-66 + i * 10} -6 l3 -6 l3 6 l-3 -3 Z`} fill="#8E6A47" />
    ))}
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-46 + i * 10} y={-27} width={4} height={4} fill="#8E6A47" />)}
  </g>
);

const llama: M = () => (
  <g>
    <g stroke={C.ink2} strokeWidth={1.8} strokeLinecap="round">
      <line x1={-6} y1={-10} x2={-6} y2={0} />
      <line x1={-3} y1={-10} x2={-3} y2={0} />
      <line x1={4} y1={-10} x2={4} y2={0} />
      <line x1={7} y1={-10} x2={7} y2={0} />
    </g>
    <ellipse cx={0} cy={-13} rx={9} ry={5} fill={C.ink2} />
    <path d="M7 -14 L9 -28" stroke={C.ink2} strokeWidth={3.4} strokeLinecap="round" />
    <ellipse cx={11} cy={-29} rx={3.5} ry={2} fill={C.ink2} />
    <path d="M8 -31 L8 -34 M10 -31 L10 -34" stroke={C.ink2} strokeWidth={1} />
  </g>
);

const cerroRico: M = () => (
  <g>
    <path d="M-80 0 Q-30 -96 0 -100 Q30 -96 80 0 Z" fill="#A0624A" />
    {[
      [-20, -50],
      [6, -70],
      [24, -40],
      [-36, -24],
      [40, -18],
    ].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width={4} height={3} fill={C.ink} />)}
  </g>
);

const maize: M = () => (
  <g stroke={C.green} strokeWidth={2} fill="none" strokeLinecap="round">
    <path d="M0 0 L0 -30" />
    <path d="M0 -8 Q-10 -12 -12 -20 M0 -14 Q10 -18 12 -26 M0 -22 Q-8 -26 -9 -32" />
    <ellipse cx={3} cy={-18} rx={2} ry={4} fill={C.bronzeLight} stroke="none" />
  </g>
);

const florenceCathedral: M = () => (
  <g>
    <rect x={-46} y={-18} width={60} height={18} fill={C.ink2} />
    <path d="M-46 -18 L-16 -30 L14 -18 Z" fill={C.ink2} />
    <rect x={-15} y={-36} width={30} height={18} fill={C.ink} />
    {/* open octagon awaiting a dome, with scaffolding */}
    <path d="M-15 -36 L-15 -40 M15 -36 L15 -40 M-10 -36 L-10 -44 L10 -44 L10 -36" stroke={C.bronze} strokeWidth={1.2} fill="none" />
    <rect x={20} y={-64} width={10} height={64} fill={C.ink} />
    <rect x={18} y={-68} width={14} height={4} fill={C.ink} />
  </g>
);

const bulandDarwaza: M = () => (
  <g>
    <path d="M-50 0 L-46 -10 L46 -10 L50 0 Z" fill={C.ink3} />
    <rect x={-34} y={-62} width={68} height={52} fill="#A4573E" />
    <path d="M-16 -10 L-16 -40 Q-16 -54 0 -56 Q16 -54 16 -40 L16 -10 Z" fill={C.light} opacity={0.75} />
    <rect x={-34} y={-62} width={68} height={4} fill={C.light} opacity={0.5} />
    {[-26, -13, 0, 13, 26].map((x) => (
      <path key={x} d={`M${x - 4} -62 Q${x} -70 ${x + 4} -62 Z`} fill={C.light} stroke="#A4573E" strokeWidth={0.6} />
    ))}
    {[-38, 38].map((x) => <rect key={x} x={x - 3} y={-70} width={6} height={60} fill="#8E4A33" />)}
  </g>
);

const swahiliTown: M = () => (
  <g fill={C.light} stroke={C.ink3} strokeWidth={0.7}>
    <rect x={-50} y={-16} width={30} height={16} />
    <rect x={-20} y={-24} width={34} height={24} />
    <rect x={14} y={-14} width={34} height={14} />
    {[-10, 0].map((x) => <path key={x} d={`M${x - 5} -24 Q${x} -32 ${x + 5} -24 Z`} />)}
    {[-42, -32, -12, 2, 22, 34].map((x) => <rect key={x} x={x} y={-10} width={4} height={6} fill={C.ink3} stroke="none" />)}
    <path d="M-4 -24 L-4 -40 M-6 -36 L-2 -36" stroke={C.ink2} fill="none" />
  </g>
);

export const motifs = {
  florenceCathedral,
  bulandDarwaza,
  swahiliTown,
  florenceDome,
  cityTower,
  printingPress,
  telescope,
  stPeters,
  caravel,
  galleon,
  junk,
  dhow,
  canoe,
  ottomanMosque,
  mamlukCairo,
  persianIwan,
  camel,
  chineseGate,
  greatWall,
  japaneseCastle,
  gopuram,
  palm,
  tajMahal,
  candiBentar,
  malayMosque,
  prang,
  chedi,
  sahelMosque,
  fort,
  gondar,
  stoneWalls,
  pueblo,
  longhouse,
  palisade,
  templo,
  colonialChurch,
  machuPicchu,
  chanChan,
  llama,
  cerroRico,
  maize,
};

export type MotifId = keyof typeof motifs;
