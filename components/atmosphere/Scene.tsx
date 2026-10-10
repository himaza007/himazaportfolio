'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Imperative lighting setup
function Lighting() {
  const { scene } = useThree();

  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);

    scene.add(ambientLight);
    scene.add(directionalLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      ambientLight.dispose();
      directionalLight.dispose();
    };
  }, [scene]);

  return null;
}

// Starfield Particle Field
function Starfield({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const turquoise = new THREE.Color('#99E1D9');
    const purple = new THREE.Color('#3A1C5C');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      const seed1 = (Math.sin(i * 3 + 1) * 10000) % 1;
      const seed2 = (Math.sin(i * 3 + 2) * 10000) % 1;
      const seed3 = (Math.sin(i * 3 + 3) * 10000) % 1;

      pos[i * 3] = (Math.abs(seed1) - 0.5) * 28;
      pos[i * 3 + 1] = (Math.abs(seed2) - 0.5) * 28;
      pos[i * 3 + 2] = (Math.abs(seed3) - 0.5) * 16 - 2;

      let c = white;
      if (Math.abs(seed1) < 0.45) c = turquoise;
      else if (Math.abs(seed1) < 0.75) c = purple;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// Fixed Curated Grid Floating Planes
function FloatingPlanes() {
  const groupRef = useRef<THREE.Group>(null!);

  const imagePaths = useMemo(
    () => Array.from({ length: 9 }, (_, i) => `/floating/${i + 1}.jpg`),
    []
  );

  const textures = useTexture(imagePaths);

  // Fix image color saturation by setting sRGB color space
  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [textures]);

  const planeGeo = useMemo(() => new THREE.PlaneGeometry(2.2, 1.4), []);

  const materials = useMemo(() => {
    return textures.map(
      (tex) =>
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
        })
    );
  }, [textures]);

  // Clean, structured coordinates framing the central terminal window
  const planesData = useMemo(() => [
    { position: [-6.8, 3.2, -1.2], rotation: [0, 0, -0.06], scale: 1.0, speed: 0.2 },  // 1. Top Left
    { position: [6.8, 3.2, -1.2], rotation: [0, 0, 0.06], scale: 1.0, speed: 0.22 },   // 2. Top Right
    { position: [-7.2, 0.0, -0.8], rotation: [0, 0, 0.04], scale: 1.1, speed: 0.18 },   // 3. Mid Left
    { position: [7.2, 0.0, -0.8], rotation: [0, 0, -0.04], scale: 1.1, speed: 0.25 },  // 4. Mid Right
    { position: [-6.4, -3.2, -1.5], rotation: [0, 0, -0.05], scale: 1.0, speed: 0.2 },  // 5. Bottom Left
    { position: [6.4, -3.2, -1.5], rotation: [0, 0, 0.05], scale: 1.0, speed: 0.23 },   // 6. Bottom Right
    { position: [0.0, 4.2, -2.5], rotation: [0, 0, 0.02], scale: 0.9, speed: 0.15 },    // 7. Top Center
    { position: [-3.2, -4.2, -2.0], rotation: [0, 0, 0.03], scale: 0.9, speed: 0.19 },  // 8. Bottom Center-Left
    { position: [3.2, -4.2, -2.0], rotation: [0, 0, -0.03], scale: 0.9, speed: 0.21 },  // 9. Bottom Center-Right
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const data = planesData[i];
        if (data) {
          child.position.y = data.position[1] + Math.sin(t * data.speed + i) * 0.15;
          child.rotation.z = data.rotation[2] + Math.cos(t * data.speed * 0.5) * 0.02;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((_, i) => (
        <mesh
          key={i}
          geometry={planeGeo}
          material={materials[i]}
          position={planesData[i].position}
          rotation={planesData[i].rotation}
          scale={planesData[i].scale}
        />
      ))}
    </group>
  );
}

function CanvasContent() {
  return (
    <>
      <Lighting />
      <Starfield count={800} />
      <FloatingPlanes />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <CanvasContent />
      </Suspense>
    </Canvas>
  );
}