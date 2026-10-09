'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TECH_COUNT = 14;
const techImages = Array.from(
  { length: TECH_COUNT },
  (_, i) => `/tech/${i + 1}.png`
);

// Balanced positions keeping the central corridor clear
const startPositions: [number, number, number][] = [
  [-5.2, 2.5, -12],
  [5.2, 2.2, -14],
  [-5.8, -0.8, -10],
  [5.8, -1.0, -13],
  [-3.8, 3.5, -15],
  [3.8, 3.5, -11],
  [-4.8, -3.2, -12],
  [4.8, -3.2, -10],
  [-2.8, 4.0, -14],
  [2.8, 4.0, -13],
  [-2.8, -4.0, -12],
  [2.8, -4.0, -15],
  [-6.2, 1.2, -16],
  [6.2, 1.0, -14],
];

export function TechNodes() {
  const textures = useTexture(techImages);
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
      const maxScroll = window.innerHeight * 1.8;
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
      return 1;
    });
  }, [textures]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = scrollRef.current;

    // STAGED TIMING:
    // p < 0.25 : 0 opacity (Hidden while photos fly away)
    // 0.25 -> 0.45 : Fades in cleanly
    // 0.45 -> 0.70 : Fully visible floating tech stack
    // 0.70 -> 0.90 : Fades out as About section enters
    let opacity = 0;
    if (p >= 0.25 && p < 0.45) {
      opacity = (p - 0.25) / 0.2;
    } else if (p >= 0.45 && p < 0.70) {
      opacity = 1;
    } else if (p >= 0.70 && p <= 0.90) {
      opacity = 1 - (p - 0.70) / 0.2;
    }

    groupRef.current.children.forEach((child, i) => {
      const startPos = startPositions[i % startPositions.length];

      // Fly forward during the dive phase
      const diveProgress = THREE.MathUtils.clamp((p - 0.25) / 0.45, 0, 1);
      const targetZ = startPos[2] + diveProgress * 8;

      const floatY = Math.sin(time * 1.2 + i) * 0.12;
      const floatX = Math.cos(time * 0.8 + i) * 0.08;

      child.position.x = THREE.MathUtils.lerp(child.position.x, startPos[0] + floatX, 0.08);
      child.position.y = THREE.MathUtils.lerp(child.position.y, startPos[1] + floatY, 0.08);
      child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 0.08);

      child.rotation.y = Math.sin(time * 0.5 + i) * 0.1;

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
        const baseSize = 0.85;
        const width = aspect >= 1 ? baseSize * aspect : baseSize;
        const height = aspect >= 1 ? baseSize : baseSize / aspect;

        return (
          <mesh key={index} position={startPositions[index % startPositions.length]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
              map={texture}
              transparent={true}
              side={THREE.DoubleSide}
              opacity={0} // Starts completely invisible on page load
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default TechNodes;