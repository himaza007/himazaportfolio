'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hero & 3D floating ring textures to cache in GPU/browser memory
const CRITICAL_ASSETS = Array.from({ length: 12 }, (_, i) => `/floating/${i + 1}.jpg`);

export function SceneLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    const MIN_DISPLAY_TIME = 800; // Minimum duration to prevent quick flash on cached loads
    const SAFETY_TIMEOUT = 4000;   // Maximum fallback so app never locks if an asset fails

    const dismissLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      setTimeout(() => {
        if (isMounted) setIsVisible(false);
      }, remaining);
    };

    const preloadAllResources = async () => {
      try {
        // 1. DOM/Window Load
        const windowPromise = new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', () => resolve(), { once: true });
          }
        });

        // 2. WebFont Loading
        const fontPromise = 'fonts' in document ? document.fonts.ready : Promise.resolve();

        // 3. Preload Hero Floating Images
        const imagePromises = Promise.all(
          CRITICAL_ASSETS.map(
            (src) =>
              new Promise<void>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Resolve on error so app is not blocked
              })
          )
        );

        // Race asset loading against a safety timeout
        await Promise.race([
          Promise.all([windowPromise, fontPromise, imagePromises]),
          new Promise((resolve) => setTimeout(resolve, SAFETY_TIMEOUT)),
        ]);
      } catch (err) {
        console.warn('Resource preload warning:', err);
      } finally {
        dismissLoader();
      }
    };

    preloadAllResources();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0512] select-none pointer-events-none overflow-hidden"
        >
          {/* Ambient Purple & Turquoise Background Glow */}
          <div className="absolute w-[450px] h-[450px] bg-[#1E122E] rounded-full blur-[140px] pointer-events-none opacity-80" />
          <div className="absolute w-[250px] h-[250px] bg-[#99E1D9]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Minimal Glass Card Frame */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex items-center justify-center w-28 h-28 rounded-3xl bg-[#1E122E]/60 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(153,225,217,0.15)]"
          >
            {/* Hourglass Loader SVG */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_12px_rgba(153,225,217,0.6)]"
            >
              {/* Outer Hourglass Glass Contour */}
              <path
                d="M 16,10 L 48,10 L 34,28 C 33,29.5 33,34.5 34,36 L 48,54 L 16,54 L 30,36 C 31,34.5 31,29.5 30,28 Z"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Looping Top Chamber Stream */}
              <motion.path
                d="M 19,14 L 45,14 L 32,30 Z"
                fill="#99E1D9"
                animate={{ scaleY: [1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top center' }}
              />

              {/* Dripping Sand Stream */}
              <motion.line
                x1="32"
                y1="28"
                x2="32"
                y2="36"
                stroke="#99E1D9"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.15, 0.85, 1] }}
              />

              {/* Looping Bottom Chamber Filling Liquid */}
              <motion.path
                d="M 32,34 L 45,50 L 19,50 Z"
                fill="#99E1D9"
                animate={{ scaleY: [0, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: 'bottom center' }}
              />

              {/* Top & Bottom Accent Caps */}
              <line x1="14" y1="10" x2="50" y2="10" stroke="#99E1D9" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="54" x2="50" y2="54" stroke="#99E1D9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SceneLoader;