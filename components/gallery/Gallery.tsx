'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

// 20 Images mapped to /floating/1.jpg through /floating/20.jpg
const galleryImages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/floating/${i + 1}.jpg`,
  aspect: i % 3 === 0 ? 'aspect-[3/4]' : i % 2 === 0 ? 'aspect-square' : 'aspect-[4/3]',
}));

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="gallery" className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 overflow-hidden">
      
      {/* TURQUOISE TRACER SVG PATH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1000 2000" fill="none">
          <motion.path
            d="M 100 0 Q 900 400 200 800 T 800 1600 T 100 2000"
            stroke="url(#turquoiseGradient)"
            strokeWidth="3"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="turquoiseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#99E1D9" stopOpacity="0" />
              <stop offset="50%" stopColor="#99E1D9" stopOpacity="1" />
              <stop offset="100%" stopColor="#1E122E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* HEADING */}
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
        <span className="text-xs font-mono text-[#99E1D9] uppercase tracking-widest">
          04 / GALLERY
        </span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Visual Archives</h2>
          <p className="text-sm md:text-base text-neutral-400 mt-2 font-mono">// Memories & milestones.</p>
        </div>
      </div>

      {/* MASONRY GRID */}
      <div className="relative z-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveImage(img.src)}
            className={`relative ${img.aspect} rounded-2xl overflow-hidden border border-white/10 bg-[#1E122E]/60 backdrop-blur-xl group cursor-pointer hover:border-[#99E1D9]/60 hover:shadow-[0_0_30px_rgba(153,225,217,0.2)] transition-all duration-500`}
          >
            <Image
              src={img.src}
              alt={`Gallery image ${img.id}`}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0512]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

            <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9] animate-pulse" />
              <span className="text-[10px] font-mono text-neutral-200 tracking-wider">
                FRAME #{String(img.id).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeImage && (
        <div onClick={() => setActiveImage(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden border border-white/20">
            <Image src={activeImage} alt="Expanded gallery view" fill className="object-contain" />
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Gallery;