'use client';

import { motion } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/sections';

interface PillNavProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export function PillNav({ activeSection = 'home', onNavigate }: PillNavProps) {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <nav className="flex items-center gap-1 p-1.5 rounded-full bg-[#231B20]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {NAV_SECTIONS.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate?.(section.id)}
              className="relative px-4 py-1.5 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-[#99E1D9]/20 border border-[#99E1D9]/50"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-[#99E1D9] font-bold' : 'text-neutral-400 hover:text-white'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default PillNav;