'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function TypewriterTransition() {
  const ref = useRef<HTMLDivElement>(null);
  // Triggers typing right as the element enters the viewport so you actually see it type
  const isInView = useInView(ref, { amount: 0.4 });
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Wanna know more about me?";

  useEffect(() => {
    if (!isInView) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    // 60ms pacing provides a clear, satisfying CLI typewriter rhythm
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section 
      ref={ref} 
      className="relative flex flex-col items-center justify-center px-4 pt-32 sm:pt-48 pb-80 sm:pb-[32rem] z-10 pointer-events-auto"
    >
      <div className="flex items-center justify-center text-center">
        <span className="font-mono text-[#99E1D9] text-base sm:text-xl md:text-2xl font-bold mr-3">
          &gt;
        </span>
        <p className="font-mono text-lg sm:text-2xl md:text-3xl font-light tracking-wide text-white flex items-center min-h-[2rem]">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            className="inline-block w-2.5 h-5 sm:h-6 ml-1.5 bg-[#99E1D9] shadow-[0_0_10px_#99E1D9]"
          />
        </p>
      </div>
    </section>
  );
}

export default TypewriterTransition;