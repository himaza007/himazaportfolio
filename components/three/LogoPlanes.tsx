'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const floatingImages = Array.from(
  { length: 12 },
  (_, i) => `/floating/${i + 1}.jpg`
);

// Balanced 3D ring layout floating around the hero HUD card
const startPositions: [number, number, number][] = [
  [-4.8, 2.5, -1.2],
  [4.8, 2.2, -0.8],
  [-5.2, -0.8, -0.5],
  [5.2, -1.2, -1.5],
  [-3.2, 3.4, -2.0],
  [3.5, 3.2, -1.8],
  [-4.2, -3.0, -1.0],
  [4.0, -3.2, -0.5],
  [0.0, 3.8, -2.5],
  [-2.5, -3.8, -1.8],
  [2.2, -3.8, -2.2],
  [-5.8, 1.0, -2.2],
];

export function LogoPlanes() {
  const textures = useTexture(floatingImages);
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 1.2;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      scrollRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aspectRatios = useMemo(() => {
    return textures.map((tex) => {
      if (tex.image && tex.image.width && tex.image.height) {
        return tex.image.width / tex.image.height;
      }
      return 1.4;
    });
  }, [textures]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = scrollRef.current; // 0 at hero, 1 as you scroll into about

    // Fades out completely by 35% scroll
    const opacity = THREE.MathUtils.clamp(1 - p / 0.35, 0, 1);

    groupRef.current.children.forEach((child, i) => {
      const startPos = startPositions[i % startPositions.length];

      // THE DIVE EFFECT: Photos shoot outward (X, Y) and fly past camera (Z increases towards +10)
      const targetX = startPos[0] * (1 + p * 2.8);
      const targetY = startPos[1] * (1 + p * 2.8);
      const targetZ = startPos[2] + p * 12;

      // Gentle floating animation when standing still at hero
      const floatY = Math.sin(time * 0.8 + i) * 0.15 * (1 - p);
      const floatX = Math.cos(time * 0.6 + i) * 0.08 * (1 - p);

      child.position.x = THREE.MathUtils.lerp(child.position.x, targetX + floatX, 0.08);
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY + floatY, 0.08);
      child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 0.08);

      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.transparent = true;
        mat.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => {
        const aspect = aspectRatios[index];
        const baseHeight = 1.1;
        const width = baseHeight * aspect;

        return (
          <mesh key={index} position={startPositions[index % startPositions.length]}>
            <planeGeometry args={[width, baseHeight]} />
            <meshBasicMaterial
              map={texture}
              side={THREE.DoubleSide}
              transparent={true}
              opacity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default LogoPlanes;