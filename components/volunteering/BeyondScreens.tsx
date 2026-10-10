'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const positions = [
  { role: 'District Club Service Director', org: 'Rotaract District 3220', period: '2026 - 2027' },
  { role: 'President', org: 'Rotaract Club of IIT', period: '2025 - 2026' },
  { role: 'Director of Club Service', org: 'Rotaract Club of IIT', period: '2024 - 2025' },
  { role: 'Industry Outreach Lead', org: 'IIT RAS (Robotics & Automation Society)', period: '2024 - 2025' },
  { role: 'Student Union Committee', org: 'Informatics Institute of Technology (IIT)', period: '2023 - 2024' },
  { role: 'President', org: 'Student Relations Society • Vancouver, Canada', period: '2021 - 2022' },
];

const passions = [
  { label: '(Retired) Relay Runner' },
  { label: 'Swimmer' },
  { label: 'Cycler' },
  { label: 'Violinist' },
  { label: 'F1 Addict' },
];

export function BeyondScreens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} id="volunteering" className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
        <span className="text-xs font-mono text-[#99E1D9] uppercase tracking-widest">
          03 / BEYOND THE SCREENS
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 max-w-4xl">
        Apart from qualifications on paper.
      </h2>
      <p className="text-lg md:text-xl text-neutral-400 font-light mb-12 max-w-2xl">
        Beyond the screens and academics.
      </p>

      {/* PHILOSOPHY QUOTE CARD */}
      <div className="relative mb-16 p-8 md:p-10 rounded-2xl backdrop-blur-xl bg-[#231B20]/60 border border-[#99E1D9]/30 hover:border-[#99E1D9]/60 transition-all duration-500 shadow-[0_0_40px_rgba(153,225,217,0.1)]">
        <div className="absolute top-4 right-6 text-6xl font-serif text-[#99E1D9]/20 pointer-events-none select-none">“</div>

        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          </h3>
        </div>

      <blockquote className="space-y-4 text-base md:text-lg text-neutral-200 leading-relaxed font-light">
        <p>
          I volunteer mostly to adapt, grow, and learn to delegate. As a leader,
          my vision has always been simple: <span className="text-white font-medium underline decoration-[#99E1D9]/80 decoration-2 underline-offset-4">to bring the people alongside me forward with me.</span>
        </p>
        <p className="text-neutral-400 text-sm md:text-base">
          Volunteering brings a sense of peace no other environment can match.
          Expecting nothing tangible in return is the best part, you know everyone there is driven solely by purpose and passion, nothing else. This is what volunteering truly means to me, and a lifelong commitment I will always cherish far beyond just my school or university.
        </p>
      </blockquote>
      </div>

      {/* LEADERSHIP & PASSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEADERSHIP ROLES */}
        <div className="lg:col-span-7 p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              POSITIONS HELD
            </h3>
          </div>

          <div className="space-y-4">
            {positions.map((item, idx) => (
              <div
                key={idx}
                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#99E1D9]/40 transition-all duration-300 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm md:text-base font-bold text-white group-hover:text-[#99E1D9] transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.org}</p>
                </div>
                <span className="text-[10px] font-mono text-[#99E1D9] bg-[#99E1D9]/10 border border-[#99E1D9]/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PASSIONS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                BEYOND ACADEMICS — I ALSO AM A
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {passions.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#99E1D9]/50 hover:bg-[#99E1D9]/10 transition-all duration-300 group flex items-center gap-2 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9]/60 group-hover:bg-[#99E1D9] group-hover:scale-125 transition-all" />
                  <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BeyondScreens;