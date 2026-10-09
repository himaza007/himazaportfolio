'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA, sceneState } from '@/lib/scene-state';

const { damp, clamp } = THREE.MathUtils;

/**
 * Owns the camera. Reads sceneState.warp (0..1) every frame:
 *   z   : startZ → startZ - travel   (plunge through the node field)
 *   fov : fov → fov + warpFovBoost  (hyperspace stretch)
 * Parallax fades out as the warp takes over.
 */
export function CameraRig() {
  const look = useMemo(() => new THREE.Vector3(), []);
  const smooth = useMemo(() => ({ x: 0, y: 0 }), []);

  useFrame(({ camera, clock }, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const dt = Math.min(delta, 1 / 30);
    const w = clamp(sceneState.warp, 0, 1);
    const plunge = CAMERA.curve(w);
    const parallax = sceneState.reducedMotion ? 0 : 1 - w * 0.85;

    smooth.x = damp(smooth.x, sceneState.pointer.x, 2.2, dt);
    smooth.y = damp(smooth.y, sceneState.pointer.y, 2.2, dt);

    cam.position.x = damp(cam.position.x, smooth.x * CAMERA.parallax.x * parallax, 3, dt);
    cam.position.y = damp(cam.position.y, smooth.y * CAMERA.parallax.y * parallax, 3, dt);
    cam.position.z = damp(cam.position.z, CAMERA.startZ - plunge * CAMERA.travel, 5, dt);

    const targetFov = CAMERA.fov + plunge * CAMERA.warpFovBoost;
    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = damp(cam.fov, targetFov, 5, dt);
      cam.updateProjectionMatrix();
    }

    look.set(cam.position.x * 0.25, cam.position.y * 0.25, cam.position.z - 12);
    cam.lookAt(look);
    // Subtle bank with the pointer, plus a faint turbulence shake at high warp
    cam.rotateZ(-smooth.x * 0.025 * parallax + Math.sin(clock.elapsedTime * 9) * 0.004 * w * w);
  });

  return null;
}