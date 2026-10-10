'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

// 20 public floating assets (/public/floating/1.jpg - 20.jpg)
const GALLERY_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/floating/${i + 1}.jpg`,
  alt: `Visual Archive ${i + 1}`,
}));

export function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : (prev as number) - 1
    );
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : (prev as number) + 1
    );
  };

  return (
    <section
      id="gallery"
      data-section="gallery"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 z-10 overflow-hidden bg-[#0B0512]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <Reveal>
            <SectionHeading
              index="05"
              label="Visual Archives"
              title={
                <>
                  Behind the scenes, <span className="text-[#99E1D9]">captured.</span>
                </>
              }
              kicker="A continuous visual stream of design explorations, creative direction, and moments."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 shrink-0">
              {GALLERY_IMAGES.length} Archives
            </p>
          </Reveal>
        </div>

        {/* Responsive CSS Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, index) => (
            <Reveal key={img.id} delay={(index % 4) * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveImageIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1E122E]/50 backdrop-blur-md transition-all duration-300 hover:border-[#99E1D9]/50 hover:shadow-[0_0_20px_rgba(153,225,217,0.2)] break-inside-avoid"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0512]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#99E1D9]">
                    View #{String(img.id).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Touch-Friendly Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl select-none"
          >
            {/* Modal Glass Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[#99E1D9] hover:text-[#0B0512]"
              >
                ✕
              </button>

              {/* Displayed Image */}
              <img
                src={GALLERY_IMAGES[activeImageIndex].src}
                alt={GALLERY_IMAGES[activeImageIndex].alt}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] object-contain"
              />

              {/* Navigation Controls & Counter */}
              <div className="mt-4 flex items-center justify-between w-full max-w-xs font-mono text-xs text-neutral-400">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#99E1D9] hover:text-white transition-colors"
                >
                  ← Prev
                </button>
                <span>
                  {String(activeImageIndex + 1).padStart(2, '0')} / {String(GALLERY_IMAGES.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#99E1D9] hover:text-white transition-colors"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;