'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
});

export function Atmosphere() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden">
      <Scene />
    </div>
  );
}

export default Atmosphere;