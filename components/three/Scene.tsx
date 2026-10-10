'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { LogoPlanes } from './LogoPlanes';
import { WarpTunnel } from './WarpTunnel';
import { Starfield } from './Starfield';

export function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          {/* Starfield background */}
          <Starfield />

          {/* Crimson warp tunnel */}
          <WarpTunnel />

          {/* Hero floating photo cloud */}
          <LogoPlanes />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* In your Three.js Canvas Wrapper */
<Canvas
  dpr={[1, Math.min(2, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.5 : 2)]}
  camera={{ position: [0, 0, 8], fov: 60 }}
>
  {/* 3D Scene components */}
</Canvas>

export default Scene;