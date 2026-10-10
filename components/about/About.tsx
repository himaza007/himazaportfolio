'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

// 14 Tech Logos from public/tech/
const techLogos = Array.from({ length: 14 }, (_, i) => `/tech/${i + 1}.png`);

function TechItem({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.4, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1.05 }}
      viewport={{ margin: '-15% 0px -15% 0px', amount: 0.5 }}
      transition={{ duration: 0.3 }}
      className="relative w-12 h-12 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-[#99E1D9] hover:shadow-[0_0_20px_rgba(153,225,217,0.3)] transition-all duration-300 flex items-center justify-center group cursor-pointer"
    >
      <Image
        src={src}
        alt={`Tech Logo ${index + 1}`}
        width={36}
        height={36}
        className="object-contain w-8 h-8 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-300"
      />
    </motion.div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    
    <section id="about" className="relative min-h-screen pt-8 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
      
      {/* SECTION HEADING */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
        <span className="text-xs font-mono text-[#99E1D9] uppercase tracking-widest">
          02 / ABOUT
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-10 max-w-3xl">
        I engineer the systems behind the screen, and the experiences on it.
      </h2>

      {/* MAIN CONTENT + RIGHT STICKY TECH RAIL */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* MAIN COLUMN */}
        <div className="flex-1 w-full space-y-10">
          
          {/* PORTRAIT + BIO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* PORTRAIT PHOTO */}
            <div className="lg:col-span-5 relative min-h-[480px] lg:min-h-[540px] w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#231B20]/60 backdrop-blur-xl group shadow-2xl">
              <Image
                src="/about/Himaza_Sitting.jpeg"
                alt="Himaza Zahara"
                fill
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181216]/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
                <span className="text-[10px] font-mono text-neutral-200 tracking-wider uppercase">
                  HIMAZA ZAHARA
                </span>
              </div>
            </div>

            {/* BIO DESCRIPTION */}
            <div className="lg:col-span-7 p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10 hover:border-[#99E1D9]/40 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9]" />
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    PROFILE
                  </h3>
                </div>

                <p className="text-sm md:text-base text-neutral-200 leading-relaxed mb-4">
                  I’m Himaza Zahara, a fullstack developer and brand strategist, working where engineering, design and strategy meet. I am passionate in making immersive 3D web experiences.
                </p>

                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-4">
                  As Digital Solutions Head at Mawkish Technologies, I led web and software projects end to end, from architecture and stack decisions through to delivery, across the Mawkish group's creative, enterprise and internal platforms.
                </p>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  Beyond client work, I was recognised as the Most Outstanding President 2025/26 in Rotaract in RID 3220, while reading Computer Science at the University of Westminster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
                <div>
                  <span className="font-mono text-neutral-500 uppercase tracking-wider block text-[10px]">CURRENTLY</span>
                  <span className="text-white font-medium">Product Owner at Editoz Club</span>
                </div>
                <div>
                  <span className="font-mono text-neutral-500 uppercase tracking-wider block text-[10px]">BASED IN</span>
                  <span className="text-white font-medium">Sri Lanka • GMT+5:30</span>
                </div>
              </div>
            </div>

          </div>

          {/* EXPERIENCE & EDUCATION TIMELINE */}
          <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* EXPERIENCE LOG */}
            <div className="lg:col-span-7 relative p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10 hover:border-[#99E1D9]/40 transition-all duration-500">
              
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
                <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  EXPERIENCE
                </h3>
              </div>

              {/* TIMELINE CONTAINER WITH FIXED PADDING */}
              <div className="relative pl-12 space-y-10">
                
                {/* Background Track Line */}
                <div className="absolute left-3 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-neutral-800" />

                {/* Glowing Scroll Beam */}
                <motion.div
                  style={{ scaleY, transformOrigin: 'top' }}
                  className="absolute left-3 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#99E1D9] via-[#99E1D9]/80 to-transparent shadow-[0_0_12px_#99E1D9]"
                />

                {/* Experience Item 1 */}
                <div className="relative group/item">
                  <span className="absolute -left-[36px] top-[7px] w-3 h-3 rounded-full bg-[#99E1D9] ring-4 ring-[#181216] shadow-[0_0_10px_#99E1D9]" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white group-hover/item:text-[#99E1D9] transition-colors">
                      Product Owner
                    </h4>
                    <span className="text-xs font-mono text-neutral-500">PRESENT</span>
                  </div>
                  <p className="text-xs font-mono text-[#99E1D9] mt-0.5">Editoz Club • Contract</p>
                </div>

                {/* Experience Item 2 */}
                <div className="relative group/item">
                  <span className="absolute -left-[36px] top-[7px] w-3 h-3 rounded-full bg-neutral-900 border-2 border-neutral-600 group-hover/item:border-[#99E1D9] transition-colors" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white group-hover/item:text-[#99E1D9] transition-colors">
                      Digital Solutions Head
                    </h4>
                    <span className="text-xs font-mono text-neutral-500">2026</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">Mawkish Group</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-neutral-400 list-disc list-inside">
                    <li>Led web and software projects end-to-end, from strategy to delivery.</li>
                    <li>Built immersive web platforms across internal & client projects.</li>
                  </ul>
                </div>

                {/* Experience Item 3 */}
                <div className="relative group/item">
                  <span className="absolute -left-[36px] top-[7px] w-3 h-3 rounded-full bg-neutral-900 border-2 border-neutral-600 group-hover/item:border-[#99E1D9] transition-colors" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white group-hover/item:text-[#99E1D9] transition-colors">
                      Junior Social Media Manager
                    </h4>
                    <span className="text-xs font-mono text-neutral-500">2025</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">Somizu</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-neutral-400 list-disc list-inside">
                    <li>Executed social media strategies and content planning across platforms.</li>
                    <li>Built lead-generation pipelines and funnels with ManyChat and Meta Ads.</li>
                  </ul>
                </div>

                {/* Experience Item 4 */}
                <div className="relative group/item">
                  <span className="absolute -left-[36px] top-[7px] w-3 h-3 rounded-full bg-neutral-900 border-2 border-neutral-600 group-hover/item:border-[#99E1D9] transition-colors" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white group-hover/item:text-[#99E1D9] transition-colors">
                      Digitalization & Strategy Intern
                    </h4>
                    <span className="text-xs font-mono text-neutral-500">APR - OCT 2025</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">MAS Intimates</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-neutral-400 list-disc list-inside">
                    <li>Worked with .NET technologies, Microsoft Azure, and digital strategy initiatives.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* EDUCATION & RECOGNITION */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10 hover:border-[#99E1D9]/40 transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9]" />
                  <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    EDUCATION
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#99E1D9] uppercase tracking-wider">READING</span>
                    <h4 className="text-sm font-bold text-white">BSc Computer Science</h4>
                    <p className="text-xs text-neutral-400">University of Westminster</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">COMPLETED</span>
                    <h4 className="text-sm font-bold text-white">Diplôme d'Études en Langue Française</h4>
                    <p className="text-xs text-neutral-400">Alliance Française, Colombo</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl backdrop-blur-xl bg-[#231B20]/50 border border-white/10 hover:border-[#99E1D9]/40 transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9]" />
                  <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    RECOGNITION
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { id: '01', title: 'Most Outstanding President 2025/26', org: 'Rotaract, RID 3220' },
                    { id: '02', title: "3rd Place, 'Tech Minds' Challenge", org: 'Cutting Edge, IIT' },
                    { id: '03', title: 'All-Island Winner, Verse Speaking', org: 'British Lanka Festival' },
                    { id: '04', title: 'Most Outstanding Student of the Year', org: 'English Literature' },
                  ].map((award) => (
                    <div key={award.id} className="flex items-start gap-3 group/award p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-xs font-mono text-[#99E1D9] group-hover/award:text-[#99E1D9]">
                        {award.id}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover/award:text-[#99E1D9] transition-colors">
                          {award.title}
                        </h5>
                        <p className="text-[11px] text-neutral-400">{award.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR: TECH RAIL */}
        <div className="hidden lg:flex sticky top-28 flex-col items-center p-3 rounded-2xl backdrop-blur-xl bg-[#231B20]/60 border border-white/10 space-y-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#99E1D9] animate-pulse mb-1" />
          <div className="flex flex-col gap-2.5">
            {techLogos.map((src, index) => (
              <TechItem key={index} src={src} index={index} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

export default About;