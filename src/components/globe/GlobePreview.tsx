import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { historicalEvents } from '@/data/historicalEvents';
import { latLonToVec3 } from '@/utils/geo';
import { eventInWindow } from '@/utils/time';
import { paintLandCanvas } from './landData';

function Spinning() {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(paintLandCanvas(1024, 512));
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const dots = useMemo(() => historicalEvents.filter((e) => eventInWindow(e, 1500, 25)), []);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={group} rotation={[0.35, -1.9, 0]}>
      <mesh>
        <sphereGeometry args={[1, 64, 48]} />
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>
      {dots.map((e) => (
        <mesh key={e.id} position={latLonToVec3(e.location.lat, e.location.lon, 1.006)}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshBasicMaterial color="#8C6A3F" />
        </mesh>
      ))}
    </group>
  );
}

/** Decorative, non-interactive preview used on the Overview page. */
export default function GlobePreview() {
  return (
    <Canvas camera={{ position: [0, 0, 2.9], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'low-power' }} aria-hidden>
      <ambientLight intensity={2.3} />
      <directionalLight position={[3, 2, 4]} intensity={0.7} />
      <Spinning />
    </Canvas>
  );
}
