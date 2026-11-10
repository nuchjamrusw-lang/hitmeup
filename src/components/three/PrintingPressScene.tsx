import { createContext, useContext, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { pressParts, type PressPartId, type PressStep } from '@/data/printingPress';

const Highlight = createContext<{ active: Set<PressPartId>; select: (id: PressPartId) => void }>({ active: new Set(), select: () => {} });

const WOOD = '#B4966A';
const WOOD_DARK = '#8E7350';
const METAL = '#5E636B';
const BRONZE = '#8C6A3F';

function Mat({ part, color, metal = false }: { part: PressPartId; color: string; metal?: boolean }) {
  const { active } = useContext(Highlight);
  const on = active.has(part);
  return (
    <meshStandardMaterial
      color={color}
      roughness={metal ? 0.45 : 0.85}
      metalness={metal ? 0.55 : 0}
      emissive={on ? BRONZE : '#000000'}
      emissiveIntensity={on ? 0.45 : 0}
    />
  );
}

function Part({ id, children }: { id: PressPartId; children: ReactNode }) {
  const { select } = useContext(Highlight);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        select(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      {children}
    </group>
  );
}

const B = ({ p, s, part, color = WOOD, metal }: { p: [number, number, number]; s: [number, number, number]; part: PressPartId; color?: string; metal?: boolean }) => (
  <mesh position={p} castShadow receiveShadow>
    <boxGeometry args={s} />
    <Mat part={part} color={color} metal={metal} />
  </mesh>
);

function Press({ pose }: { pose: PressStep['pose'] }) {
  const carriage = useRef<THREE.Group>(null);
  const tympan = useRef<THREE.Group>(null);
  const platen = useRef<THREE.Group>(null);
  const bar = useRef<THREE.Group>(null);
  const inkballs = useRef<THREE.Group>(null);
  const sheetOnTympan = useRef<THREE.Mesh>(null);
  const sheetDrying = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, dt) => {
    const k = 1 - Math.pow(0.002, dt); // frame-rate independent smoothing
    if (carriage.current) carriage.current.position.z = THREE.MathUtils.lerp(carriage.current.position.z, pose.carriage, k);
    if (tympan.current) tympan.current.rotation.x = THREE.MathUtils.lerp(tympan.current.rotation.x, pose.tympan, k);
    if (platen.current) platen.current.position.y = THREE.MathUtils.lerp(platen.current.position.y, 1.2 - 0.17 * pose.platen, k);
    if (bar.current) bar.current.rotation.y = THREE.MathUtils.lerp(bar.current.rotation.y, -0.9 * pose.bar, k);
    if (inkballs.current) {
      const target = pose.ink ? new THREE.Vector3(0.12, 1.08 + Math.abs(Math.sin(clock.elapsedTime * 3)) * 0.06, 0.85) : new THREE.Vector3(1.2, 1.0, 0.6);
      inkballs.current.position.lerp(target, k);
    }
    if (sheetOnTympan.current) sheetOnTympan.current.visible = pose.sheet === 1;
    if (sheetDrying.current) sheetDrying.current.visible = pose.sheet === 2;
  });

  return (
    <group>
      {/* Frame */}
      <Part id="frame">
        <B part="frame" p={[-0.55, 1.0, 0]} s={[0.14, 2.0, 0.22]} />
        <B part="frame" p={[0.55, 1.0, 0]} s={[0.14, 2.0, 0.22]} />
        <B part="frame" p={[0, 1.9, 0]} s={[1.3, 0.2, 0.26]} color={WOOD_DARK} />
        <B part="frame" p={[0, 1.42, 0]} s={[1.24, 0.08, 0.2]} color={WOOD_DARK} />
        <B part="frame" p={[-0.55, 0.05, 0.2]} s={[0.22, 0.1, 1.0]} color={WOOD_DARK} />
        <B part="frame" p={[0.55, 0.05, 0.2]} s={[0.22, 0.1, 1.0]} color={WOOD_DARK} />
      </Part>

      {/* Screw */}
      <Part id="screw">
        <mesh position={[0, 1.55, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.55, 20]} />
          <Mat part="screw" color={WOOD_DARK} />
        </mesh>
        {[1.38, 1.46, 1.54, 1.62, 1.7, 1.78].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.058, 0.009, 6, 20]} />
            <Mat part="screw" color={WOOD} />
          </mesh>
        ))}
      </Part>

      {/* Bar */}
      <group ref={bar} position={[0, 1.33, 0]}>
        <Part id="bar">
          <mesh position={[0.38, 0, 0.12]} rotation={[0, -0.3, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.022, 0.026, 0.8, 12]} />
            <Mat part="bar" color={METAL} metal />
          </mesh>
          <mesh position={[0.76, 0, 0.24]}>
            <sphereGeometry args={[0.04, 12, 10]} />
            <Mat part="bar" color={WOOD_DARK} />
          </mesh>
        </Part>
      </group>

      {/* Platen */}
      <group ref={platen} position={[0, 1.2, 0]}>
        <Part id="platen">
          <B part="platen" p={[0, 0, 0]} s={[0.62, 0.07, 0.46]} color={WOOD_DARK} />
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.08, 12]} />
            <Mat part="platen" color={METAL} metal />
          </mesh>
        </Part>
      </group>

      {/* Rails (fixed) */}
      <Part id="carriage">
        <B part="carriage" p={[-0.26, 0.8, 0.55]} s={[0.07, 0.05, 1.6]} color={WOOD_DARK} />
        <B part="carriage" p={[0.26, 0.8, 0.55]} s={[0.07, 0.05, 1.6]} color={WOOD_DARK} />
        {[-0.15, 1.3].map((z) => (
          <group key={z}>
            <B part="carriage" p={[-0.26, 0.4, z]} s={[0.07, 0.8, 0.07]} color={WOOD_DARK} />
            <B part="carriage" p={[0.26, 0.4, z]} s={[0.07, 0.8, 0.07]} color={WOOD_DARK} />
          </group>
        ))}
        {/* Rounce */}
        <mesh position={[0.36, 0.86, 0.75]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 18]} />
          <Mat part="carriage" color={WOOD} />
        </mesh>
        <B part="carriage" p={[0.42, 0.86, 0.75]} s={[0.12, 0.02, 0.02]} color={METAL} metal />
      </Part>

      {/* Moving carriage with forme and tympan */}
      <group ref={carriage} position={[0, 0, 0.85]}>
        <Part id="carriage">
          <B part="carriage" p={[0, 0.86, 0]} s={[0.7, 0.06, 0.62]} />
        </Part>
        <Part id="forme">
          <B part="forme" p={[0, 0.905, 0]} s={[0.54, 0.03, 0.46]} color={METAL} metal />
          {Array.from({ length: 12 }, (_, i) => (
            <mesh key={i} position={[-0.13, 0.922, -0.18 + i * 0.033]}>
              <boxGeometry args={[0.22, 0.006, 0.018]} />
              <meshStandardMaterial color="#2A2D33" roughness={0.6} />
            </mesh>
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <mesh key={`r${i}`} position={[0.13, 0.922, -0.18 + i * 0.033]}>
              <boxGeometry args={[0.22, 0.006, 0.018]} />
              <meshStandardMaterial color="#2A2D33" roughness={0.6} />
            </mesh>
          ))}
        </Part>
        <group ref={tympan} position={[0, 0.94, 0.3]} rotation={[1.9, 0, 0]}>
          <Part id="tympan">
            <mesh position={[0, 0, -0.27]}>
              <boxGeometry args={[0.58, 0.018, 0.54]} />
              <Mat part="tympan" color={WOOD} />
            </mesh>
            <mesh position={[0, 0.011, -0.27]}>
              <boxGeometry args={[0.5, 0.004, 0.46]} />
              <meshStandardMaterial color="#EDE3CC" roughness={1} />
            </mesh>
            <mesh ref={sheetOnTympan} position={[0, 0.016, -0.27]} visible={false}>
              <boxGeometry args={[0.44, 0.003, 0.4]} />
              <meshStandardMaterial color="#FFFFFF" roughness={1} />
            </mesh>
          </Part>
        </group>
      </group>

      {/* Ink block & ink balls (side table) */}
      <B part="inkballs" p={[1.2, 0.45, 0.6]} s={[0.5, 0.9, 0.5]} color={WOOD_DARK} />
      <group ref={inkballs} position={[1.2, 1.0, 0.6]}>
        <Part id="inkballs">
          {[-0.09, 0.09].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.02, 0]} castShadow>
                <sphereGeometry args={[0.075, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <Mat part="inkballs" color="#4A3B2C" />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.015, 0.018, 0.24, 8]} />
                <Mat part="inkballs" color={WOOD} />
              </mesh>
            </group>
          ))}
        </Part>
      </group>

      {/* Type case on a stand */}
      <Part id="typecase">
        <B part="typecase" p={[-1.3, 0.5, 0.55]} s={[0.08, 1.0, 0.08]} color={WOOD_DARK} />
        <B part="typecase" p={[-1.3, 0.5, 0.25]} s={[0.08, 1.0, 0.08]} color={WOOD_DARK} />
        <group position={[-1.3, 1.08, 0.42]} rotation={[0, Math.PI / 2, 0.45]}>
          <mesh>
            <boxGeometry args={[0.7, 0.05, 0.42]} />
            <Mat part="typecase" color={WOOD} />
          </mesh>
          {Array.from({ length: 7 }, (_, i) => (
            <mesh key={i} position={[-0.3 + i * 0.1, 0.03, 0]}>
              <boxGeometry args={[0.008, 0.02, 0.4]} />
              <meshStandardMaterial color={WOOD_DARK} />
            </mesh>
          ))}
          {[-0.1, 0.06].map((z) => (
            <mesh key={z} position={[0, 0.03, z]}>
              <boxGeometry args={[0.68, 0.02, 0.008]} />
              <meshStandardMaterial color={WOOD_DARK} />
            </mesh>
          ))}
        </group>
      </Part>

      {/* Drying line */}
      {[-1.0, -0.2].map((x) => (
        <mesh key={x} position={[x, 1.15, 1.0]}>
          <cylinderGeometry args={[0.015, 0.015, 2.3, 8]} />
          <meshStandardMaterial color={WOOD_DARK} />
        </mesh>
      ))}
      <mesh position={[-0.6, 2.25, 1.0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.8, 6]} />
        <meshStandardMaterial color="#6B5B45" />
      </mesh>
      <mesh ref={sheetDrying} position={[-0.6, 2.05, 1.0]} visible={false}>
        <boxGeometry args={[0.44, 0.38, 0.004]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
    </group>
  );
}

function Hotspots({ selected, onSelect }: { selected: PressPartId | null; onSelect: (id: PressPartId) => void }) {
  return (
    <>
      {pressParts.map((p, i) => (
        <Html key={p.id} position={p.anchor} center zIndexRange={[20, 0]}>
          <button
            type="button"
            onClick={() => onSelect(p.id)}
            className={
              'flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold shadow-soft transition-colors ' +
              (selected === p.id ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink hover:border-ink')
            }
            aria-label={`${i + 1}. ${p.name}`}
            title={p.name}
          >
            {i + 1}
          </button>
        </Html>
      ))}
    </>
  );
}

export default function PrintingPressScene({
  pose,
  highlighted,
  selected,
  onSelect,
}: {
  pose: PressStep['pose'];
  highlighted: PressPartId[];
  selected: PressPartId | null;
  onSelect: (id: PressPartId) => void;
}) {
  const active = new Set<PressPartId>(highlighted);
  if (selected) active.add(selected);
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [2.5, 2.1, 3.3], fov: 38 }} gl={{ antialias: true, powerPreference: 'low-power' }} aria-label="3D model of a wooden hand printing press" role="img">
      <color attach="background" args={['#F6F2EA']} />
      <hemisphereLight args={['#ffffff', '#d9cdb8', 1.1]} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <Highlight.Provider value={{ active, select: onSelect }}>
        <Press pose={pose} />
      </Highlight.Provider>
      <Hotspots selected={selected} onSelect={onSelect} />
      <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={6} blur={2.4} far={2.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#EDE6D9" roughness={1} />
      </mesh>
      <OrbitControls makeDefault target={[0, 1.0, 0.4]} enablePan={false} minDistance={2.2} maxDistance={6} maxPolarAngle={Math.PI / 2.05} enableDamping />
    </Canvas>
  );
}
