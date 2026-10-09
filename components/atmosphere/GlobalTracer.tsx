'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function GlobalTracer() {
  const { scrollYProgress } = useScroll();

  // Snappy spring that settles quickly without extra frame renders
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const tracerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 0.95, 1],
    [0.35, 0.85, 0.75, 0.85, 0.4]
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden will-change-transform">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 6000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="globalTracerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#99E1D9" stopOpacity="0.2" />
            <stop offset="10%" stopColor="#99E1D9" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#80D0C8" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#99E1D9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1E122E" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Faint Background Track */}
        <path
          d="M 500 0 
             C 920 350, 960 750, 550 1050 
             C 80 1350, 40 1750, 500 2150 
             C 940 2550, 950 2950, 480 3350 
             C 60 3750, 80 4150, 520 4550 
             C 950 4950, 880 5350, 450 5750 
             C 250 5880, 350 5960, 500 6000"
          stroke="#1E122E"
          strokeWidth="2"
          strokeDasharray="6 8"
          vectorEffect="non-scaling-stroke"
          opacity="0.2"
        />

        {/* Live Hardware-Accelerated Glowing Line */}
        <motion.path
          d="M 500 0 
             C 920 350, 960 750, 550 1050 
             C 80 1350, 40 1750, 500 2150 
             C 940 2550, 950 2950, 480 3350 
             C 60 3750, 80 4150, 520 4550 
             C 950 4950, 880 5350, 450 5750 
             C 250 5880, 350 5960, 500 6000"
          stroke="url(#globalTracerGradient)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength,
            opacity: tracerOpacity,
            filter: 'drop-shadow(0px 0px 6px rgba(153, 225, 217, 0.7))',
          }}
        />
      </svg>
    </div>
  );
}

export default GlobalTracer;