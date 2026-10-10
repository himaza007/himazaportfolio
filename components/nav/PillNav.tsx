'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'beyond-screens', label: 'Impact' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export function PillNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto w-[92vw] sm:w-auto max-w-max">
      <nav className="flex items-center gap-0.5 sm:gap-1.5 rounded-full border border-white/10 bg-[#1E122E]/85 p-1 sm:p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-x-auto no-scrollbar max-w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScroll(item.id)}
              className={`relative shrink-0 rounded-full px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 font-mono text-[9px] sm:text-xs uppercase tracking-wider transition-colors duration-300 min-h-[34px] flex items-center justify-center ${
                isActive ? 'text-[#0B0512] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="pillNavActive"
                  className="absolute inset-0 rounded-full bg-[#99E1D9] shadow-[0_0_15px_rgba(153,225,217,0.5)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default PillNav;