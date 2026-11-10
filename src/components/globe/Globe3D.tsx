import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { HistoricalEvent, RegionId } from '@/types';
import { regions } from '@/data/regions';
import type { PolityCentre } from '@/data/polityCentres';
import { latLonToVec3, regionAt } from '@/utils/geo';
import { paintLandCanvas } from './landData';

export interface GlobeCommand {
  kind: 'zoom-in' | 'zoom-out' | 'reset';
  n: number;
}

export interface GlobeProps {
  events: HistoricalEvent[];
  selectedRegion: RegionId | null;
  selectedEventId: string | null;
  focus: { lat: number; lon: number } | null;
  polities: PolityCentre[];
  showEvents: boolean;
  showPolities: boolean;
  command: GlobeCommand | null;
  onSelectRegion: (id: RegionId) => void;
  onSelectEvent: (id: string) => void;
}

const BRONZE = new THREE.Color('#8C6A3F');
const INK = new THREE.Color('#1B2A41');

function Earth({ onPick }: { onPick: (lat: number, lon: number) => void }) {
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(paintLandCanvas(2048, 1024));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    // Ignore clicks that were really drags.
    if (e.delta > 5 || !e.uv) return;
    e.stopPropagation();
    const lon = e.uv.x * 360 - 180;
    const lat = e.uv.y * 180 - 90;
    onPick(lat, lon);
  };

  return (
    <mesh onClick={handleClick}>
      <sphereGeometry args={[1, 96, 64]} />
      <meshStandardMaterial map={texture} roughness={1} metalness={0} />
    </mesh>
  );
}

/** HTML label that fades out when it is on the far side of the globe. */
function SurfaceLabel({
  lat,
  lon,
  children,
  radius = 1.02,
  minDot = 0.15,
  maxCameraDistance = Infinity,
}: {
  lat: number;
  lon: number;
  children: React.ReactNode;
  radius?: number;
  minDot?: number;
  /** Hide the label when the camera is further away than this (declutters dense areas). */
  maxCameraDistance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMemo(() => new THREE.Vector3(...latLonToVec3(lat, lon, radius)), [lat, lon, radius]);
  const normal = useMemo(() => pos.clone().normalize(), [pos]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    if (!ref.current) return;
    const dot = tmp.copy(camera.position).normalize().dot(normal);
    const visible = dot > minDot && camera.position.length() <= maxCameraDistance;
    ref.current.style.opacity = visible ? String(Math.min(1, (dot - minDot) * 4)) : '0';
    ref.current.style.pointerEvents = visible ? 'auto' : 'none';
  });
  return (
    <Html position={pos} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
      <div ref={ref} style={{ transition: 'opacity 120ms linear' }}>
        {children}
      </div>
    </Html>
  );
}

function EventMarker({ e, selected, onSelect }: { e: HistoricalEvent; selected: boolean; onSelect: () => void }) {
  const [hover, setHover] = useState(false);
  const pos = useMemo(() => new THREE.Vector3(...latLonToVec3(e.location.lat, e.location.lon, 1.004)), [e]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current && selected) {
      const s = 1 + 0.25 * Math.sin(clock.elapsedTime * 2.2);
      ring.current.scale.setScalar(s);
    }
  });
  const size = selected ? 0.016 : hover ? 0.014 : 0.011;
  return (
    <group position={pos} quaternion={quat}>
      <mesh
        onClick={(ev) => {
          ev.stopPropagation();
          onSelect();
        }}
        onPointerOver={(ev) => {
          ev.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = '';
        }}
      >
        <circleGeometry args={[size, 20]} />
        <meshBasicMaterial color={selected ? INK : BRONZE} />
      </mesh>
      {/* Larger invisible hit area for touch screens */}
      <mesh onClick={(ev) => { ev.stopPropagation(); onSelect(); }} visible={false}>
        <circleGeometry args={[0.03, 12]} />
        <meshBasicMaterial />
      </mesh>
      {selected && (
        <mesh ref={ring} position={[0, 0, 0.001]}>
          <ringGeometry args={[0.022, 0.026, 32]} />
          <meshBasicMaterial color={INK} transparent opacity={0.6} />
        </mesh>
      )}
      {hover && !selected && (
        <Html center position={[0, 0.045, 0]} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 text-[11px] text-ink shadow-soft">
            <span className="font-medium">{e.dateLabel}</span> · {e.title}
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraRig({ focus, command }: { focus: { lat: number; lon: number } | null; command: GlobeCommand | null }) {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls) as unknown as OrbitControlsImpl | null;
  const anim = useRef<{ from: THREE.Vector3; to: THREE.Vector3; t: number } | null>(null);

  const startTo = (dir: THREE.Vector3, dist: number) => {
    anim.current = { from: camera.position.clone(), to: dir.normalize().multiplyScalar(dist), t: 0 };
  };

  useEffect(() => {
    if (!focus) return;
    const dist = Math.min(camera.position.length(), 2.6);
    startTo(new THREE.Vector3(...latLonToVec3(focus.lat, focus.lon, 1)), dist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.lat, focus?.lon]);

  useEffect(() => {
    if (!command) return;
    const len = camera.position.length();
    if (command.kind === 'reset') startTo(new THREE.Vector3(...latLonToVec3(25, 20, 1)), 2.7);
    else startTo(camera.position.clone(), THREE.MathUtils.clamp(len * (command.kind === 'zoom-in' ? 0.8 : 1.25), 1.45, 4.2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command?.n]);

  useFrame((_, dt) => {
    const a = anim.current;
    if (!a) return;
    a.t = Math.min(1, a.t + dt / 0.8);
    const k = 1 - Math.pow(1 - a.t, 3); // ease-out cubic
    const fromLen = a.from.length();
    const toLen = a.to.length();
    const dir = a.from.clone().normalize().lerp(a.to.clone().normalize(), k).normalize();
    camera.position.copy(dir.multiplyScalar(THREE.MathUtils.lerp(fromLen, toLen, k)));
    camera.lookAt(0, 0, 0);
    controls?.update();
    if (a.t >= 1) anim.current = null;
  });
  return null;
}

function Globe3D(props: GlobeProps) {
  const { events, selectedRegion, selectedEventId, focus, polities, showEvents, showPolities, command, onSelectRegion, onSelectEvent } = props;
  const initial = useMemo(() => latLonToVec3(25, 20, 2.7), []);

  return (
    <Canvas
      camera={{ position: initial, fov: 40, near: 0.1, far: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: false }}
      onPointerMissed={() => undefined}
      aria-label="Interactive 3D globe"
      role="img"
    >
      <color attach="background" args={['#FAF8F4']} />
      <ambientLight intensity={2.3} />
      <directionalLight position={[3, 2, 4]} intensity={0.7} />
      <Earth
        onPick={(lat, lon) => {
          const r = regionAt(lat, lon);
          if (r) onSelectRegion(r);
        }}
      />

      {showEvents &&
        events.map((e) => <EventMarker key={e.id} e={e} selected={e.id === selectedEventId} onSelect={() => onSelectEvent(e.id)} />)}

      {regions.map((r) => (
        <SurfaceLabel key={r.id} lat={r.center.lat} lon={r.center.lon} radius={1.03}>
          <button
            type="button"
            onClick={() => onSelectRegion(r.id)}
            className={
              'whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-soft transition-colors ' +
              (selectedRegion === r.id ? 'border-ink bg-ink text-white' : 'border-line bg-surface/95 text-ink hover:border-ink-faint')
            }
          >
            {r.name}
          </button>
        </SurfaceLabel>
      ))}

      {showPolities &&
        polities.map((p) => (
          <SurfaceLabel key={p.name} lat={p.lat} lon={p.lon} radius={1.01} minDot={0.35} maxCameraDistance={p.minor ? 2.0 : Infinity}>
            <span className="block whitespace-nowrap font-serif text-[11px] italic text-bronze-dark" style={{ textShadow: '0 0 3px #F5F1E8, 0 0 3px #F5F1E8' }}>
              {p.name}
            </span>
          </SurfaceLabel>
        ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
        minDistance={1.45}
        maxDistance={4.2}
      />
      <CameraRig focus={focus} command={command} />
    </Canvas>
  );
}

// Memoised so that dragging the year slider does not re-render the 3D scene
// until the (deferred) list of events actually changes.
export default memo(Globe3D);
