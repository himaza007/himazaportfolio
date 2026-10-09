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

export default Scene;