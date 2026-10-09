'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '@/lib/scene-state';

const COUNT = 700;
const Z_FAR = -175;
const SPAN = 155; // tunnel occupies z = -175 … -20

const vertex = /* glsl */ `
  uniform float uFlow;
  uniform float uStretch;
  attribute float aEnd;
  attribute float aSeed;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 p = position;
    // Perpetual flow toward the camera, wrapped inside the tunnel span
    p.z = ${Z_FAR.toFixed(1)} + mod(p.z - ${Z_FAR.toFixed(1)} + uFlow * (0.6 + aSeed * 0.8), ${SPAN.toFixed(1)});
    // Tail vertex trails away from the camera; length follows camera velocity
    p.z -= aEnd * uStretch * (0.4 + aSeed);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float depth = -mv.z;
    vAlpha = smoothstep(0.5, 6.0, depth) * smoothstep(90.0, 30.0, depth) * mix(1.0, 0.2, aEnd);
    vSeed = aSeed;
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 col = mix(vec3(1.0, 0.92, 0.92), vec3(0.75, 0.06, 0.06), step(0.55, vSeed));
    gl_FragColor = vec4(col, vAlpha * uOpacity);
  }
`;

/** Hyperspace streak tunnel: invisible at rest, rushes past during the plunge, idles in About. */
export function WarpTunnel() {
  const { positions, ends, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 2 * 3);
    const ends = new Float32Array(COUNT * 2);
    const seeds = new Float32Array(COUNT * 2);

    for (let i = 0; i < COUNT; i++) {
      const r = 2.2 + Math.pow(Math.random(), 0.7) * 9;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      const z = Z_FAR + Math.random() * SPAN;
      const seed = Math.random();

      for (let e = 0; e < 2; e++) {
        const idx = i * 2 + e;
        positions.set([x, y, z], idx * 3);
        ends[idx] = e;
        seeds[idx] = seed;
      }
    }
    return { positions, ends, seeds };
  }, []);

  const uniforms = useMemo(
    () => ({ uFlow: { value: 0 }, uStretch: { value: 0.35 }, uOpacity: { value: 0 } }),
    [],
  );
  const last = useMemo(() => ({ z: 10 }), []);

  useFrame(({ camera }, delta) => {
    const dt = Math.max(Math.min(delta, 1 / 30), 1e-3);
    const w = sceneState.warp;
    const velocity = Math.max(0, (last.z - camera.position.z) / dt);
    last.z = camera.position.z;

    uniforms.uStretch.value = THREE.MathUtils.damp(
      uniforms.uStretch.value,
      Math.min(velocity * 0.18, 16) + 0.35,
      6,
      dt,
    );
    uniforms.uOpacity.value = THREE.MathUtils.smoothstep(w, 0.2, 0.75) * 0.9;
    uniforms.uFlow.value += dt * (sceneState.reducedMotion ? 0 : w * w * 7);
  });

  return (
    <lineSegments frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aEnd" args={[ends, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}