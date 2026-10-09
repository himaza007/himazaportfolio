'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '@/lib/scene-state';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uWarp;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float core = pow(max(1.0 - d, 0.0), 2.6);
    float halo = pow(max(1.0 - d, 0.0), 1.2) * 0.25;
    float pulse = 0.85 + 0.15 * sin(uTime * 0.6);
    float a = (core + halo) * pulse * (0.55 + uWarp * 0.8);
    gl_FragColor = vec4(uColor * a, a);
  }
`;

/** In-world volumetric glow at the center depth. The warp flies straight through it. */
export function CrimsonCore() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarp: { value: 0 },
      uColor: { value: new THREE.Color('#8b0000').multiplyScalar(1.6) },
    }),
    [],
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uWarp.value = sceneState.warp;
  });

  return (
    <mesh position={[0, 0, -14]} scale={36} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}