import { useMemo, type ReactNode } from 'react';
import type { IllustrationId } from '@/types';
import { landPath, defaultPalette } from '@/components/globe/landData';
import { polityCentres } from '@/data/polityCentres';

/**
 * Hand-built SVG illustrations. They are diagrams made for ATLAS (not
 * reproductions of artworks), so they load offline and stay legible on
 * low-powered school devices.
 */

const INK = '#1B2A41';
const SOFT = '#5F6B7A';
const BRONZE = '#8C6A3F';
const WASH = '#F4EDE2';
const LINE = '#E7E2D9';

/* ---------- Small map helper (equirectangular, Natural Earth coastlines) ---------- */
const MW = 1000;
const MH = 500;
const px = (lon: number) => ((lon + 180) / 360) * MW;
const py = (lat: number) => ((90 - lat) / 180) * MH;

function MiniMap({ west, east, south, north, children, label }: { west: number; east: number; south: number; north: number; children: (u: number) => ReactNode; label: string }) {
  const d = useMemo(() => landPath(MW, MH), []);
  const x = px(west);
  const y = py(north);
  const w = px(east) - x;
  const h = py(south) - y;
  const u = w / 100; // 1 "unit" = 1% of the map width, used for text and stroke sizes
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} className="h-auto w-full" role="img" aria-label={label}>
      <rect x={x} y={y} width={w} height={h} fill={defaultPalette.ocean} />
      <path d={d} fill={defaultPalette.land} stroke={defaultPalette.coast} strokeWidth={u * 0.18} fillRule="evenodd" />
      {children(u)}
    </svg>
  );
}

function City({ lat, lon, name, sub, u, anchor = 'start', dx = 1.4, dy = 0.6, strong }: { lat: number; lon: number; name: string; sub?: string; u: number; anchor?: 'start' | 'end' | 'middle'; dx?: number; dy?: number; strong?: boolean }) {
  const s = anchor === 'end' ? -1 : anchor === 'middle' ? 0 : 1;
  return (
    <g>
      <circle cx={px(lon)} cy={py(lat)} r={u * (strong ? 0.9 : 0.65)} fill={strong ? INK : BRONZE} stroke="#fff" strokeWidth={u * 0.2} />
      <text x={px(lon) + s * u * dx} y={py(lat) + u * dy} fontSize={u * 2.6} fill={INK} textAnchor={anchor} fontWeight={600} style={{ paintOrder: 'stroke', stroke: '#F5F1E8', strokeWidth: u * 0.6 }}>
        {name}
      </text>
      {sub && (
        <text x={px(lon) + s * u * dx} y={py(lat) + u * (dy + 3)} fontSize={u * 2.1} fill={SOFT} textAnchor={anchor} fontStyle="italic" style={{ paintOrder: 'stroke', stroke: '#F5F1E8', strokeWidth: u * 0.5 }}>
          {sub}
        </text>
      )}
    </g>
  );
}

/* ---------- Diagrams ---------- */

function Box({ x, y, w, h, title, lines = [], tone = 'plain' }: { x: number; y: number; w: number; h: number; title: string; lines?: string[]; tone?: 'plain' | 'wash' | 'ink' }) {
  const fill = tone === 'ink' ? INK : tone === 'wash' ? WASH : '#fff';
  const fg = tone === 'ink' ? '#fff' : INK;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={tone === 'ink' ? INK : LINE} />
      <text x={x + 12} y={y + 22} fontSize={12.5} fontWeight={600} fill={fg}>{title}</text>
      {lines.map((l, i) => (
        <text key={l} x={x + 12} y={y + 40 + i * 16} fontSize={11} fill={tone === 'ink' ? '#D9DEE6' : SOFT}>{l}</text>
      ))}
    </g>
  );
}

const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <g stroke={BRONZE} strokeWidth={1.5} fill="none">
    <line x1={x1} y1={y1} x2={x2} y2={y2} />
    <path d={`M${x2 - 6} ${y2 - 4} L${x2} ${y2} L${x2 - 6} ${y2 + 4}`} transform={`rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI} ${x2} ${y2})`} />
  </g>
);

function MedievalRenaissance() {
  return (
    <svg viewBox="0 0 640 230" className="h-auto w-full" role="img" aria-label="Diagram comparing continuities from the Middle Ages with new emphases in the Renaissance">
      <Box x={10} y={10} w={290} h={210} title="Continued from the Middle Ages" lines={['Christian faith and the Church', 'Universities and Latin learning', 'Guilds and craft workshops', 'Aristotle in philosophy', 'Manuscripts, many preserved in', 'Byzantine and Islamic libraries']} />
      <Arrow x1={306} y1={115} x2={334} y2={115} />
      <Box x={340} y={10} w={290} h={210} tone="wash" title="New emphases in the Renaissance" lines={['Classical texts read in the original', 'Naturalism and perspective in art', 'Individual achievement, civic life', 'Wider study of Greek', 'Printing with movable type (c. 1450)', 'Patronage by merchant families']} />
    </svg>
  );
}

function ItalianCityStates() {
  return (
    <MiniMap west={5.5} east={19.5} south={36.5} north={47.5} label="Map of major Italian city-states around 1450">
      {(u) => (
        <>
          <City u={u} lat={45.46} lon={9.19} name="Milan" sub="Duchy of Milan" anchor="end" />
          <City u={u} lat={45.44} lon={12.33} name="Venice" sub="Republic of Venice" />
          <City u={u} lat={44.41} lon={8.93} name="Genoa" sub="Republic of Genoa" anchor="end" dy={2.5} />
          <City u={u} lat={43.77} lon={11.25} name="Florence" sub="Republic of Florence" strong />
          <City u={u} lat={43.32} lon={11.33} name="Siena" sub="Republic of Siena" anchor="end" dy={2.2} />
          <City u={u} lat={41.9} lon={12.5} name="Rome" sub="Papal States" anchor="end" />
          <City u={u} lat={40.85} lon={14.27} name="Naples" sub="Kingdom of Naples" />
        </>
      )}
    </MiniMap>
  );
}

function Humanism() {
  const subjects = ['Grammar', 'Rhetoric', 'Poetry', 'History', 'Moral philosophy'];
  return (
    <svg viewBox="0 0 640 200" className="h-auto w-full" role="img" aria-label="The five subjects of the humanist curriculum leading to the goal of eloquent, virtuous citizens">
      <text x={10} y={20} fontSize={11} fill={SOFT} letterSpacing="1.5">STUDIA HUMANITATIS</text>
      {subjects.map((s, i) => (
        <g key={s}>
          <rect x={10} y={32 + i * 32} width={180} height={26} rx={6} fill="#fff" stroke={LINE} />
          <text x={22} y={49 + i * 32} fontSize={12} fill={INK}>{s}</text>
          <Arrow x1={194} y1={45 + i * 32} x2={262} y2={100} />
        </g>
      ))}
      <rect x={270} y={60} width={160} height={80} rx={8} fill={WASH} stroke="#E8DCC8" />
      <text x={350} y={88} fontSize={12} fill={INK} textAnchor="middle" fontWeight={600}>Read classical</text>
      <text x={350} y={104} fontSize={12} fill={INK} textAnchor="middle" fontWeight={600}>authors in the</text>
      <text x={350} y={120} fontSize={12} fill={INK} textAnchor="middle" fontWeight={600}>original language</text>
      <Arrow x1={434} y1={100} x2={466} y2={100} />
      <rect x={472} y={55} width={160} height={90} rx={8} fill={INK} />
      <text x={552} y={86} fontSize={12} fill="#fff" textAnchor="middle" fontWeight={600}>Goal:</text>
      <text x={552} y={104} fontSize={12} fill="#E6D8BF" textAnchor="middle">eloquent, virtuous</text>
      <text x={552} y={120} fontSize={12} fill="#E6D8BF" textAnchor="middle">and active citizens</text>
    </svg>
  );
}

export function PerspectiveDiagram({ vpX = 320, vpY = 120, interactive = false }: { vpX?: number; vpY?: number; interactive?: boolean }) {
  const W = 640;
  const H = 300;
  const floorY = H - 10;
  const lines = Array.from({ length: 11 }, (_, i) => (i * W) / 10);
  // Horizontal floor lines spaced with diminishing gaps toward the horizon.
  const rows = Array.from({ length: 7 }, (_, i) => vpY + (floorY - vpY) * Math.pow(0.68, i));
  const boxNear = { x: 120, y: 200, w: 120, h: 90 };
  const k = 0.45;
  const toVP = (x: number, y: number) => [x + (vpX - x) * k, y + (vpY - y) * k];
  const [a1x, a1y] = toVP(boxNear.x, boxNear.y);
  const [a2x, a2y] = toVP(boxNear.x + boxNear.w, boxNear.y);
  const [a3x, a3y] = toVP(boxNear.x + boxNear.w, boxNear.y + boxNear.h);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Linear perspective: orthogonal lines meeting at a vanishing point on the horizon">
      <rect width={W} height={H} fill="#FBF9F5" />
      <rect y={vpY} width={W} height={H - vpY} fill="#F2ECE1" />
      {lines.map((x) => (
        <line key={x} x1={x} y1={floorY} x2={vpX} y2={vpY} stroke={BRONZE} strokeOpacity={0.45} strokeWidth={1} />
      ))}
      {rows.map((y) => (
        <line key={y} x1={0} y1={y} x2={W} y2={y} stroke={BRONZE} strokeOpacity={0.3} strokeWidth={1} />
      ))}
      <line x1={0} y1={vpY} x2={W} y2={vpY} stroke={INK} strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={10} y={vpY - 8} fontSize={11} fill={SOFT}>Horizon line (eye level)</text>
      {/* a box drawn in perspective */}
      <g stroke={INK} strokeWidth={1.4} fill="#fff" fillOpacity={0.85}>
        <polygon points={`${boxNear.x},${boxNear.y} ${a1x},${a1y} ${a2x},${a2y} ${boxNear.x + boxNear.w},${boxNear.y}`} fill="#E9E1D3" />
        <polygon points={`${boxNear.x + boxNear.w},${boxNear.y} ${a2x},${a2y} ${a3x},${a3y} ${boxNear.x + boxNear.w},${boxNear.y + boxNear.h}`} fill="#DCD2C1" />
        <rect x={boxNear.x} y={boxNear.y} width={boxNear.w} height={boxNear.h} />
      </g>
      <g stroke={INK} strokeOpacity={0.35} strokeDasharray="3 3">
        <line x1={a1x} y1={a1y} x2={vpX} y2={vpY} />
        <line x1={a2x} y1={a2y} x2={vpX} y2={vpY} />
        <line x1={a3x} y1={a3y} x2={vpX} y2={vpY} />
      </g>
      <circle cx={vpX} cy={vpY} r={interactive ? 9 : 5} fill={INK} stroke="#fff" strokeWidth={2} />
      <text x={vpX + 12} y={vpY + 18} fontSize={11.5} fill={INK} fontWeight={600}>Vanishing point</text>
    </svg>
  );
}

function Patronage() {
  return (
    <svg viewBox="0 0 640 150" className="h-auto w-full" role="img" aria-label="The flow of a Renaissance art commission from patron to public display">
      <Box x={5} y={20} w={142} h={110} tone="ink" title="Patron" lines={['Church, guild,', 'city government,', 'merchant family']} />
      <Arrow x1={150} y1={75} x2={168} y2={75} />
      <Box x={170} y={20} w={142} h={110} title="Contract" lines={['Subject & size', 'Materials, e.g.', 'ultramarine blue', 'Price & deadline']} />
      <Arrow x1={315} y1={75} x2={333} y2={75} />
      <Box x={335} y={20} w={142} h={110} title="Workshop" lines={['Master artist', 'Assistants and', 'apprentices']} />
      <Arrow x1={480} y1={75} x2={496} y2={75} />
      <Box x={498} y={20} w={137} h={110} tone="wash" title="Display" lines={['Chapel, palace', 'or public square:', 'wealth, piety', 'and power']} />
    </svg>
  );
}

function Dome() {
  return (
    <svg viewBox="0 0 640 280" className="h-auto w-full" role="img" aria-label="Simplified cross-section of Brunelleschi's double-shell dome">
      <rect x={130} y={220} width={380} height={40} fill="#EFE8DC" stroke={LINE} />
      <text x={320} y={245} fontSize={11} fill={SOFT} textAnchor="middle">Octagonal drum (built earlier)</text>
      {/* outer shell */}
      <path d="M140 220 Q140 70 300 52 L340 52 Q500 70 500 220" fill="none" stroke={INK} strokeWidth={6} />
      {/* inner shell */}
      <path d="M170 220 Q172 100 300 84 L340 84 Q468 100 470 220" fill="none" stroke={BRONZE} strokeWidth={11} />
      {/* ribs */}
      {[200, 250, 390, 440].map((x) => (
        <line key={x} x1={x} y1={x < 320 ? 220 - (x - 170) * 0.9 : 220 - (470 - x) * 0.9} x2={x < 320 ? x - 20 : x + 20} y2={x < 320 ? 220 - (x - 140) * 0.9 - 8 : 220 - (500 - x) * 0.9 - 8} stroke={SOFT} strokeWidth={1.2} />
      ))}
      <rect x={302} y={14} width={36} height={38} fill="#fff" stroke={INK} />
      <path d="M302 14 L320 2 L338 14" fill="none" stroke={INK} />
      <text x={350} y={30} fontSize={11.5} fill={INK}>Lantern (completed later)</text>
      <text x={515} y={120} fontSize={11.5} fill={INK}>Outer shell: thinner,</text>
      <text x={515} y={135} fontSize={11.5} fill={INK}>protects from weather</text>
      <text x={20} y={140} fontSize={11.5} fill={BRONZE} fontWeight={600}>Inner shell:</text>
      <text x={20} y={155} fontSize={11.5} fill={BRONZE}>thicker, structural</text>
      <text x={20} y={185} fontSize={11} fill={SOFT}>Herringbone brick</text>
      <text x={20} y={199} fontSize={11} fill={SOFT}>courses lock the</text>
      <text x={20} y={213} fontSize={11} fill={SOFT}>masonry as it rises</text>
    </svg>
  );
}

function Orbit({ cx, cy, r, label, body, color = INK, angle = -40 }: { cx: number; cy: number; r: number; label: string; body: number; color?: string; angle?: number }) {
  const a = (angle * Math.PI) / 180;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={LINE} strokeWidth={1.2} />
      <circle cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={body} fill={color} />
      <text x={cx + r * Math.cos(a) + body + 3} y={cy + r * Math.sin(a) + 4} fontSize={10.5} fill={SOFT}>{label}</text>
    </g>
  );
}

function Heliocentric() {
  return (
    <svg viewBox="0 0 640 270" className="h-auto w-full" role="img" aria-label="Comparison of the geocentric and heliocentric models">
      <text x={160} y={20} fontSize={12.5} fontWeight={600} fill={INK} textAnchor="middle">Geocentric (Ptolemy)</text>
      <circle cx={160} cy={145} r={10} fill="#3F6E8C" />
      <text x={160} y={170} fontSize={10.5} fill={SOFT} textAnchor="middle">Earth</text>
      <Orbit cx={160} cy={145} r={30} label="Moon" body={3.5} color="#9AA3AE" angle={-60} />
      <Orbit cx={160} cy={145} r={52} label="Mercury" body={3} angle={200} />
      <Orbit cx={160} cy={145} r={72} label="Venus" body={4} angle={-120} />
      <Orbit cx={160} cy={145} r={94} label="Sun" body={8} color="#C9A24A" angle={-25} />
      <text x={160} y={262} fontSize={10.5} fill={SOFT} textAnchor="middle">Further spheres: Mars, Jupiter, Saturn, stars</text>

      <line x1={320} y1={30} x2={320} y2={250} stroke={LINE} />

      <text x={480} y={20} fontSize={12.5} fontWeight={600} fill={INK} textAnchor="middle">Heliocentric (Copernicus, 1543)</text>
      <circle cx={480} cy={145} r={12} fill="#C9A24A" />
      <text x={480} y={172} fontSize={10.5} fill={SOFT} textAnchor="middle">Sun</text>
      <Orbit cx={480} cy={145} r={34} label="Mercury" body={3} angle={-70} />
      <Orbit cx={480} cy={145} r={54} label="Venus" body={4} angle={160} />
      <Orbit cx={480} cy={145} r={76} label="Earth" body={5} color="#3F6E8C" angle={-35} />
      <Orbit cx={480} cy={145} r={98} label="Mars" body={4} color="#9A5B2E" angle={110} />
    </svg>
  );
}

function PrintingSpread() {
  const mainz = { lat: 50.0, lon: 8.27 };
  const cities = [
    { name: 'Strasbourg', d: 'c. 1460', lat: 48.58, lon: 7.75, a: 'start' as const, dy: 2.6 },
    { name: 'Cologne', d: 'c. 1465', lat: 50.94, lon: 6.96, a: 'end' as const, dy: -1.2 },
    { name: 'Subiaco / Rome', d: '1465–67', lat: 41.9, lon: 12.5, a: 'start' as const },
    { name: 'Venice', d: '1469', lat: 45.44, lon: 12.33, a: 'start' as const },
    { name: 'Paris', d: '1470', lat: 48.86, lon: 2.35, a: 'end' as const },
    { name: 'Kraków', d: 'c. 1473', lat: 50.06, lon: 19.94, a: 'start' as const },
    { name: 'Westminster', d: '1476', lat: 51.5, lon: -0.13, a: 'end' as const },
  ];
  return (
    <MiniMap west={-9} east={27} south={38} north={57} label="Map of the spread of printing from Mainz to other European cities, c. 1460 to 1476">
      {(u) => (
        <>
          {cities.map((c) => (
            <line key={c.name} x1={px(mainz.lon)} y1={py(mainz.lat)} x2={px(c.lon)} y2={py(c.lat)} stroke={BRONZE} strokeWidth={u * 0.25} strokeDasharray={`${u} ${u * 0.6}`} />
          ))}
          {cities.map((c) => (
            <City key={c.name} u={u} lat={c.lat} lon={c.lon} name={c.name} sub={c.d} anchor={c.a} dy={'dy' in c ? c.dy : 0.6} />
          ))}
          <City u={u} lat={mainz.lat} lon={mainz.lon} name="Mainz, c. 1450" strong dy={-1.2} />
        </>
      )}
    </MiniMap>
  );
}

function Anatomy() {
  const steps = [
    { t: 'Dissection', l: ['Direct observation', 'of the human body'] },
    { t: 'Drawing', l: ['Artists record', 'what is seen'] },
    { t: 'Woodblock', l: ['Images carved for', 'printing'] },
    { t: 'Printed book', l: ['Fabrica (Basel,', '1543): many copies'] },
  ];
  return (
    <svg viewBox="0 0 640 130" className="h-auto w-full" role="img" aria-label="From dissection to printed anatomy book">
      {steps.map((s, i) => (
        <g key={s.t}>
          <Box x={5 + i * 160} y={15} w={140} h={100} tone={i === 3 ? 'ink' : i === 0 ? 'wash' : 'plain'} title={`${i + 1}. ${s.t}`} lines={s.l} />
          {i < 3 && <Arrow x1={147 + i * 160} y1={65} x2={163 + i * 160} y2={65} />}
        </g>
      ))}
    </svg>
  );
}

function TradeRoutes() {
  const route = (pts: [number, number][]) => pts.map(([lat, lon], i) => `${i ? 'L' : 'M'}${px(lon)} ${py(lat)}`).join('');
  return (
    <MiniMap west={-20} east={128} south={-30} north={56} label="Map of major trade routes c. 1400 to 1500: Indian Ocean, Silk Roads and trans-Saharan routes">
      {(u) => (
        <>
          {/* Indian Ocean */}
          <path d={route([[-8.96, 39.51], [-3.2, 40.1], [5, 50], [12.8, 45.0], [18, 60], [11.25, 75.78], [6, 80], [5.5, 95], [2.19, 102.25], [10, 109], [24.9, 118.6]])} fill="none" stroke="#2F6273" strokeWidth={u * 0.35} />
          <path d={route([[11.25, 75.78], [20, 66], [27.1, 56.3]])} fill="none" stroke="#2F6273" strokeWidth={u * 0.3} />
          {/* Silk Roads */}
          <path d={route([[41.0, 28.98], [38.08, 46.29], [36.3, 59.6], [39.65, 66.96], [39.5, 76], [40.1, 94.7], [36.06, 103.8], [39.9, 116.4]])} fill="none" stroke={BRONZE} strokeWidth={u * 0.35} strokeDasharray={`${u} ${u * 0.6}`} />
          {/* Trans-Saharan */}
          <path d={route([[16.77, -3.0], [23, -5], [34.03, -5.0]])} fill="none" stroke="#9A5B2E" strokeWidth={u * 0.3} strokeDasharray={`${u * 0.4} ${u * 0.5}`} />
          <path d={route([[16.77, -3.0], [20, 10], [27, 20], [30.04, 31.24]])} fill="none" stroke="#9A5B2E" strokeWidth={u * 0.3} strokeDasharray={`${u * 0.4} ${u * 0.5}`} />
          {/* Mediterranean */}
          <path d={route([[45.44, 12.33], [38, 20], [35, 26], [31.2, 29.9]])} fill="none" stroke={INK} strokeWidth={u * 0.25} />

          <City u={u} lat={-8.96} lon={39.51} name="Kilwa" anchor="end" />
          <City u={u} lat={12.8} lon={45.0} name="Aden" anchor="end" />
          <City u={u} lat={27.1} lon={56.3} name="Hormuz" />
          <City u={u} lat={11.25} lon={75.78} name="Calicut" anchor="end" />
          <City u={u} lat={2.19} lon={102.25} name="Melaka" anchor="end" />
          <City u={u} lat={24.9} lon={118.6} name="Quanzhou" anchor="end" />
          <City u={u} lat={39.9} lon={116.4} name="Beijing" anchor="end" />
          <City u={u} lat={39.65} lon={66.96} name="Samarkand" />
          <City u={u} lat={41.0} lon={28.98} name="Constantinople" anchor="end" dy={-1} />
          <City u={u} lat={45.44} lon={12.33} name="Venice" anchor="end" />
          <City u={u} lat={30.04} lon={31.24} name="Cairo" />
          <City u={u} lat={16.77} lon={-3.0} name="Timbuktu" anchor="end" />

          <g fontSize={u * 2.2} fill={SOFT}>
            <rect x={px(-18)} y={py(-12)} width={u * 26} height={u * 13} fill="#fff" fillOpacity={0.9} stroke={LINE} strokeWidth={u * 0.15} />
            <line x1={px(-16.5)} x2={px(-11)} y1={py(-15)} y2={py(-15)} stroke="#2F6273" strokeWidth={u * 0.35} />
            <text x={px(-10)} y={py(-15) + u * 0.8}>Indian Ocean sea lanes</text>
            <line x1={px(-16.5)} x2={px(-11)} y1={py(-20)} y2={py(-20)} stroke={BRONZE} strokeWidth={u * 0.35} strokeDasharray={`${u} ${u * 0.6}`} />
            <text x={px(-10)} y={py(-20) + u * 0.8}>Silk Roads (overland)</text>
            <line x1={px(-16.5)} x2={px(-11)} y1={py(-25)} y2={py(-25)} stroke="#9A5B2E" strokeWidth={u * 0.3} strokeDasharray={`${u * 0.4} ${u * 0.5}`} />
            <text x={px(-10)} y={py(-25) + u * 0.8}>Trans-Saharan caravans</text>
          </g>
        </>
      )}
    </MiniMap>
  );
}

function ColumbianExchange() {
  const west = ['Maize', 'Potatoes', 'Tomatoes', 'Cacao', 'Tobacco'];
  const east = ['Horses and cattle', 'Wheat', 'Sugar cane', 'Smallpox, measles', 'Enslaved Africans (forced migration)'];
  return (
    <svg viewBox="0 0 640 210" className="h-auto w-full" role="img" aria-label="Examples of goods, animals, diseases and people exchanged between the Americas and Afro-Eurasia">
      <Box x={5} y={10} w={230} h={190} tone="wash" title="From the Americas" lines={west} />
      <Box x={405} y={10} w={230} h={190} title="From Afro-Eurasia" lines={east} />
      <Arrow x1={245} y1={80} x2={395} y2={80} />
      <text x={320} y={70} fontSize={11} fill={SOFT} textAnchor="middle">to Europe, Africa, Asia</text>
      <g transform="rotate(180 320 130)">
        <Arrow x1={245} y1={130} x2={395} y2={130} />
      </g>
      <text x={320} y={150} fontSize={11} fill={SOFT} textAnchor="middle">to the Americas</text>
    </svg>
  );
}

function ReformationMap() {
  const labels = [
    { lat: 61, lon: 14, t: 'Lutheran', c: '#3F6E4E' },
    { lat: 53, lon: 11.5, t: 'Lutheran / mixed', c: '#3F6E4E' },
    { lat: 52.4, lon: 5.3, t: 'Reformed (Calvinist)', c: '#6B4E7A' },
    { lat: 46.8, lon: 8.2, t: 'Reformed / Catholic', c: '#6B4E7A' },
    { lat: 56.5, lon: -4, t: 'Reformed (Scotland)', c: '#6B4E7A' },
    { lat: 52.3, lon: -1.6, t: 'Anglican', c: '#2F6273' },
    { lat: 46.6, lon: 2.4, t: 'Catholic (Huguenot minority)', c: '#8C6A3F' },
    { lat: 40.3, lon: -3.7, t: 'Catholic', c: '#8C6A3F' },
    { lat: 42.8, lon: 12.6, t: 'Catholic', c: '#8C6A3F' },
    { lat: 51.9, lon: 20.0, t: 'Catholic (diverse)', c: '#8C6A3F' },
    { lat: 48.2, lon: 15.5, t: 'Catholic / mixed', c: '#8C6A3F' },
    { lat: 55.8, lon: 33.0, t: 'Orthodox', c: '#5F6B7A' },
    { lat: 42.0, lon: 25.0, t: 'Ottoman rule: Muslim', c: '#5F6B7A' },
    { lat: 40.6, lon: 25.0, t: 'and Orthodox subjects', c: '#5F6B7A' },
  ];
  return (
    <MiniMap west={-11} east={40} south={36} north={64} label="Simplified pattern of religious majorities in Europe around 1600">
      {(u) => (
        <>
          {labels.map((l) => (
            <g key={l.t + l.lat}>
              <circle cx={px(l.lon)} cy={py(l.lat) - u * 0.8} r={u * 0.7} fill={l.c} />
              <text x={px(l.lon) + u * 1.3} y={py(l.lat)} fontSize={u * 2.3} fill={INK} fontWeight={500} style={{ paintOrder: 'stroke', stroke: '#F5F1E8', strokeWidth: u * 0.6 }}>
                {l.t}
              </text>
            </g>
          ))}
          <City u={u} lat={51.87} lon={12.65} name="Wittenberg" sub="1517" strong anchor="start" dy={-2.2} />
          <City u={u} lat={46.2} lon={6.15} name="Geneva" anchor="end" />
        </>
      )}
    </MiniMap>
  );
}

function PowerShift() {
  const list = polityCentres.filter((p) => 1600 >= p.from && 1600 <= p.to && ['Empire', 'Dynasty'].includes(p.type));
  return (
    <MiniMap west={-20} east={145} south={-5} north={62} label="Approximate centres of major empires and dynasties around 1600">
      {(u) =>
        list.map((p) => (
          <g key={p.name}>
            <circle cx={px(p.lon)} cy={py(p.lat)} r={u * 0.55} fill={INK} />
            <text x={px(p.lon)} y={py(p.lat) - u * 1.2} fontSize={u * 1.9} fill="#6E5130" textAnchor="middle" fontStyle="italic" fontFamily="Source Serif 4, Georgia, serif" style={{ paintOrder: 'stroke', stroke: '#F5F1E8', strokeWidth: u * 0.5 }}>
              {p.name}
            </text>
          </g>
        ))
      }
    </MiniMap>
  );
}

/* ---------- Source images for worksheets ---------- */

export function CopernicusDiagram() {
  const rings = [
    { r: 150, t: 'I. Sphere of the fixed stars (unmoving)' },
    { r: 128, t: 'II. Saturn — 30 years' },
    { r: 107, t: 'III. Jupiter — 12 years' },
    { r: 87, t: 'IV. Mars — 2 years' },
    { r: 67, t: 'V. Earth, with the Moon — 1 year' },
    { r: 47, t: 'VI. Venus — 9 months' },
    { r: 29, t: 'VII. Mercury — 80 days' },
  ];
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" role="img" aria-label="Redrawing of Copernicus's diagram: the Sun at the centre, surrounded by the orbits of Mercury, Venus, Earth with the Moon, Mars, Jupiter, Saturn and the fixed stars">
      <rect width={420} height={340} fill="#F6F0E3" />
      <g transform="translate(210 170)">
        {rings.map((ring, i) => (
          <g key={ring.r}>
            <circle r={ring.r} fill="none" stroke="#3B2F22" strokeWidth={i === 0 ? 1.6 : 1} />
            <path id={`ring-${i}`} d={`M ${-ring.r + 9} 0 A ${ring.r - 9} ${ring.r - 9} 0 0 1 ${ring.r - 9} 0`} fill="none" />
            <text fontSize={i < 2 ? 9.5 : 8.5} fill="#3B2F22" fontFamily="Source Serif 4, Georgia, serif" fontStyle="italic">
              <textPath href={`#ring-${i}`} startOffset="50%" textAnchor="middle">{ring.t}</textPath>
            </text>
          </g>
        ))}
        {/* Earth with moon */}
        <circle cx={63} cy={22} r={4} fill="#3B2F22" />
        <circle cx={63} cy={22} r={9} fill="none" stroke="#3B2F22" strokeWidth={0.7} />
        <circle r={10} fill="#3B2F22" />
        <text y={24} fontSize={10} textAnchor="middle" fill="#3B2F22" fontFamily="Source Serif 4, Georgia, serif">Sun</text>
      </g>
    </svg>
  );
}

export function PrintingShop() {
  const wood = '#3B2F22';
  return (
    <svg viewBox="0 0 520 340" className="h-auto w-full" role="img" aria-label="Illustration of a printing workshop: a compositor setting type at a type case, a pressman inking the forme, and another pulling the bar of a wooden screw press; printed sheets hang to dry">
      <rect width={520} height={340} fill="#F6F0E3" />
      <g fill="none" stroke={wood} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        {/* floor and beams */}
        <line x1={0} y1={300} x2={520} y2={300} />
        <line x1={0} y1={40} x2={520} y2={40} />
        {/* drying sheets */}
        <line x1={20} y1={58} x2={500} y2={58} strokeWidth={1} />
        {[40, 80, 120, 160, 200].map((x) => <rect key={x} x={x} y={58} width={30} height={34} fill="#FBF8F1" />)}
        {/* type case on stand */}
        <rect x={30} y={170} width={110} height={40} fill="#EADFCB" />
        {Array.from({ length: 6 }, (_, i) => <line key={i} x1={30 + (i + 1) * 15.7} y1={170} x2={30 + (i + 1) * 15.7} y2={210} strokeWidth={0.8} />)}
        <line x1={30} y1={190} x2={140} y2={190} strokeWidth={0.8} />
        <line x1={45} y1={210} x2={40} y2={300} />
        <line x1={125} y1={210} x2={130} y2={300} />
        {/* compositor */}
        <circle cx={95} cy={118} r={11} fill="#EADFCB" />
        <path d="M95 129 L92 200 M92 200 L80 300 M92 200 L108 300 M94 145 L120 172 M94 145 L72 168" />
        <rect x={112} y={166} width={16} height={6} fill={wood} />
        {/* press frame */}
        <rect x={290} y={80} width={14} height={220} fill="#D8C7A6" />
        <rect x={420} y={80} width={14} height={220} fill="#D8C7A6" />
        <rect x={282} y={72} width={160} height={18} fill="#CDB892" />
        <rect x={282} y={140} width={160} height={14} fill="#CDB892" />
        {/* screw & platen */}
        <rect x={355} y={90} width={14} height={60} fill="#B79E73" />
        {[96, 104, 112, 120, 128, 136].map((y) => <line key={y} x1={355} y1={y} x2={369} y2={y + 4} strokeWidth={0.8} />)}
        <rect x={330} y={168} width={64} height={10} fill="#B79E73" />
        <line x1={362} y1={154} x2={362} y2={168} />
        {/* bar */}
        <line x1={369} y1={130} x2={250} y2={150} strokeWidth={3} />
        {/* carriage */}
        <rect x={280} y={196} width={190} height={12} fill="#CDB892" />
        <rect x={325} y={184} width={74} height={12} fill="#9B8460" />
        {/* tympan (open) */}
        <path d="M470 196 L505 150 L505 128 L470 174 Z" fill="#FBF8F1" />
        {/* pressman pulling */}
        <circle cx={230} cy={112} r={11} fill="#EADFCB" />
        <path d="M232 123 L236 200 M236 200 L222 300 M236 200 L256 300 M234 140 L252 150 M234 140 L250 156" />
        {/* inker with ink balls */}
        <circle cx={470} cy={230} r={0} />
        <circle cx={492} cy={198} r={10} fill="#EADFCB" />
        <path d="M492 208 L488 270 M488 270 L478 300 M488 270 L500 300 M490 222 L462 232 M490 222 L470 244" />
        <circle cx={456} cy={232} r={9} fill={wood} />
        <circle cx={466} cy={248} r={9} fill={wood} />
      </g>
      <text x={260} y={328} textAnchor="middle" fontSize={11} fill={wood} fontFamily="Source Serif 4, Georgia, serif" fontStyle="italic">
        Compositor at the type case · pressman at the bar · inker with ink balls
      </text>
    </svg>
  );
}

export function Illustration({ id }: { id: IllustrationId }) {
  switch (id) {
    case 'medieval-renaissance':
      return <MedievalRenaissance />;
    case 'italian-city-states':
      return <ItalianCityStates />;
    case 'humanism':
      return <Humanism />;
    case 'linear-perspective':
      return <PerspectiveDiagram />;
    case 'patronage':
      return <Patronage />;
    case 'dome':
      return <Dome />;
    case 'heliocentric':
      return <Heliocentric />;
    case 'printing-spread':
      return <PrintingSpread />;
    case 'anatomy':
      return <Anatomy />;
    case 'trade-routes':
      return <TradeRoutes />;
    case 'columbian-exchange':
      return <ColumbianExchange />;
    case 'reformation-map':
      return <ReformationMap />;
    case 'power-shift':
      return <PowerShift />;
    default:
      return null;
  }
}
