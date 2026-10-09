'use client';

import { motion, type Variants } from 'framer-motion';
import type { MouseEvent, PointerEvent } from 'react';
import { scrollToSection } from '@/lib/scroll';

const EASE = [0.22, 1, 0.36, 1] as const;

const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: EASE, staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const riseBlur: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
};

const METRICS = [
  { value: '4+', label: 'Fullstack' },
  { value: '3+', label: 'Creator' },
  { value: '5+', label: 'Volunteer' },
];

export function Hero() {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="home"
      data-section="home"
      className="relative flex min-h-[100svh] items-center justify-center px-4 pb-16 pt-28"
    >
      {/* GSAP target (plain div). Framer animates the child only. */}
      <div data-hero-hud className="w-full max-w-xl will-change-transform md:max-w-2xl">
        <motion.div
          variants={card}
          initial="hidden"
          animate="show"
          onPointerMove={onPointerMove}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E122E]/70 shadow-[0_0_50px_rgba(153,225,217,0.12)] backdrop-blur-2xl transition-[border-color,box-shadow] duration-700 hover:border-[#99E1D9]/40 hover:shadow-[0_0_60px_rgba(153,225,217,0.25)]"
        >
          {/* Cursor-tracked turquoise edge reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              padding: 1,
              background:
                'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(153,225,217,0.55), transparent 45%)',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <div className="relative p-6 sm:p-8 md:p-10">
            {/* Status row */}
            <motion.div
              variants={rise}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#99E1D9] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#99E1D9] shadow-[0_0_8px_rgba(153,225,217,0.9)]" />
                </span>
                System: Operational
              </span>
              <span aria-hidden className="text-white/15">|</span>
              <span>API: 200 OK</span>
            </motion.div>

            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white md:text-5xl">
              {['Himaza', 'Zahara'].map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-[0.08em] pr-[0.22em] align-bottom">
                  <motion.span variants={maskUp} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p variants={riseBlur} className="mt-3 text-base text-neutral-300">
              Fullstack Developer <span className="text-[#99E1D9]">&amp;</span> Brand Strategist
            </motion.p>

            <motion.p variants={riseBlur} className="mt-2 font-mono text-xs text-neutral-400">
              {'Bridging high-performance fullstack engineering with strategic brand growth'}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3">
              <motion.a
                href="#projects"
                onClick={go('projects')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group/cta relative inline-flex"
              >
                <span
                  aria-hidden
                  className="absolute -inset-1.5 rounded-full bg-[#99E1D9]/50 opacity-0 blur-xl transition-opacity duration-500 group-hover/cta:opacity-100"
                />
                <span className="relative inline-flex items-center gap-2 rounded-full bg-[#99E1D9] px-6 py-3 text-sm font-black text-[#0B0512]">
                  View Work
                  <span className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                onClick={go('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white outline-none backdrop-blur-xl transition-colors duration-300 hover:border-[#99E1D9]/50 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#99E1D9]"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Metrics footer */}
          <motion.ul
            variants={rise}
            className="relative grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.02]"
          >
            {METRICS.map((m) => (
              <li
                key={m.label}
                className="flex flex-col items-start gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:gap-2 sm:px-6"
              >
                <span className="text-xl font-black tracking-tight text-white md:text-2xl">{m.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                  Yrs <span className="text-[#99E1D9]">•</span> {m.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div data-hero-cue className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:text-white"
        >
          Scroll to dive
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gradient-to-b from-transparent to-[#99E1D9]" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;