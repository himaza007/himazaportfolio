/**
 * Shared, mutable, non-React state for the WebGL layer.
 * GSAP writes `warp`; useFrame hooks read it every frame, with zero React renders.
 */
export const sceneState = {
  /** 0 → 1: hero at rest → parked deep inside the particle tunnel (About). */
  warp: 0,
  pointer: { x: 0, y: 0 },
  reducedMotion: false,
};

export const CAMERA = {
  startZ: 10,
  /** Ends at z ≈ -85: past every logo plane, inside the warp tunnel (-20 … -175). */
  travel: 95,
  fov: 45,
  warpFovBoost: 32,
  parallax: { x: 0.7, y: 0.4 },
  curve: (w: number) => Math.pow(w, 1.6),
} as const;