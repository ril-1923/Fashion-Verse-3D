import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { DesignConfig } from '@/types';

interface OrbitControlsLike {
  reset: () => void;
}

type AnyRef = React.MutableRefObject<unknown>;
import { resolveColorHex } from '@/types';
import { buildGarment } from '@/three/garments';
import { createGarmentMaterial, disposeMaterial } from '@/three/materials';

interface Props {
  config: DesignConfig;
  resetSignal: number;
  rotateSignal: number;
}

const MANNEQUIN_COLOR = '#d9d2c5';

function Mannequin() {
  return (
    <group>
      {/* head */}
      <mesh position={[0, 2.55, 0]} castShadow>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.3, 16]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* torso */}
      <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.7, 0.6]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* hips */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.6, 0.62]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* arms */}
      <mesh position={[-0.95, 1.25, 0]} rotation={[0, 0, Math.PI / 2.4]} castShadow>
        <capsuleGeometry args={[0.16, 1.3, 6, 12]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      <mesh position={[0.95, 1.25, 0]} rotation={[0, 0, -Math.PI / 2.4]} castShadow>
        <capsuleGeometry args={[0.16, 1.3, 6, 12]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* legs */}
      <mesh position={[-0.34, -1.0, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.5, 6, 12]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      <mesh position={[0.34, -1.0, 0]} castShadow>
        <capsuleGeometry args={[0.2, 1.5, 6, 12]} />
        <meshStandardMaterial color={MANNEQUIN_COLOR} roughness={0.6} />
      </mesh>
      {/* base pole */}
      <mesh position={[0, -2.0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -2.28, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.08, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Garment({ config }: { config: DesignConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const [parts, setParts] = useState<ReturnType<typeof buildGarment> | null>(
    null
  );
  const [material, setMaterial] = useState<THREE.MeshStandardMaterial | null>(
    null
  );

  const baseHex = useMemo(
    () => resolveColorHex(config.color, config.customColor),
    [config.color, config.customColor]
  );

  // rebuild garment geometry when garment type changes
  useEffect(() => {
    const built = buildGarment(config.garment);
    setParts(built);
    return () => {
      built.meshes.forEach((m) => m.geometry.dispose());
    };
  }, [config.garment]);

  // rebuild material when color/material/pattern changes
  useEffect(() => {
    const mat = createGarmentMaterial(config.material, config.pattern, baseHex);
    setMaterial(mat);
    return () => disposeMaterial(mat);
  }, [config.material, config.pattern, baseHex]);

  if (!parts || !material) return null;

  return (
    <primitive
      ref={groupRef}
      object={parts.group}
      position={[0, 1.05, 0.02]}
    >
      {parts.meshes.map((mesh, i) => {
        mesh.material = material;
        return <primitive key={i} object={mesh} />;
      })}
    </primitive>
  );
}

function SceneContent({
  controlsRef,
  autoRotate,
}: {
  controlsRef: AnyRef;
  autoRotate: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#c9a24b" />
      <spotLight
        position={[0, 9, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.6}
        color="#fff3d6"
      />

      <Mannequin />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.32, 0]} receiveShadow>
        <circleGeometry args={[12, 48]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* backdrop ring */}
      <mesh position={[0, 1.5, -6]} receiveShadow>
        <planeGeometry args={[30, 16]} />
        <meshStandardMaterial color="#121212" roughness={0.9} />
      </mesh>

      <OrbitControls
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={controlsRef as any}
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0.8, 0]}
        autoRotate={autoRotate}
        autoRotateSpeed={2.2}
      />
    </>
  );
}

export default function GarmentScene({ config, resetSignal, rotateSignal }: Props) {
  const controlsRef = useRef<OrbitControlsLike | null>(null);
  const controlsAnyRef = controlsRef as unknown as AnyRef;
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    try {
      const test = document.createElement('canvas');
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl');
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  // reset camera when resetSignal changes
  useEffect(() => {
    if (!controlsRef.current) return;
    const c = controlsRef.current;
    c.reset();
  }, [resetSignal]);

  // auto-rotate for ~4s when rotateSignal changes
  useEffect(() => {
    if (rotateSignal === 0) return;
    setAutoRotate(true);
    const t = window.setTimeout(() => setAutoRotate(false), 4000);
    return () => window.clearTimeout(t);
  }, [rotateSignal]);

  if (webglOk === false) {
    return (
      <div className="fv-fallback">
        <i
          className="bi bi-cpu"
          style={{ fontSize: '3rem', color: 'var(--fv-gold)', marginBottom: 12 }}
        />
        <h3 style={{ color: 'var(--fv-cream)', marginBottom: 6 }}>
          3D preview unavailable
        </h3>
        <p style={{ maxWidth: 380, margin: '0 auto' }}>
          Your browser does not support WebGL. You can still customize your
          garment with the panel — colors, materials, and patterns are shown in
          the preview swatch below.
        </p>
        <div
          style={{
            marginTop: 18,
            width: 120,
            height: 120,
            borderRadius: 16,
            background: resolveColorHex(config.color, config.customColor),
            border: '1px solid var(--fv-border)',
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.2, 1.6, 5.5], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 12, 22]} />
      <SceneContent controlsRef={controlsAnyRef} autoRotate={autoRotate} />
    </Canvas>
  );
}
