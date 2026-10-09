'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/projects';
import { ProjectImage } from './ProjectImage';

const EASE = [0.22, 1, 0.36, 1] as const;
const noopSubscribe = () => () => {};

interface ModalProps {
  project: Project | null;
  position: string;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

export function ProjectModal({ project, position, onClose, onStep }: ModalProps) {
  // Client-only portal (avoids SSR/hydration issues)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const isOpen = project !== null;

  // Lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-md"
          />
          {/* key → gallery state resets when switching projects */}
          <ModalBody key={project.slug} project={project} position={position} onClose={onClose} onStep={onStep} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ModalBody({ project, position, onClose, onStep }: ModalProps & { project: Project }) {
  const [img, setImg] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project.images.length;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') setImg((i) => (i + 1) % count);
      else if (e.key === 'ArrowLeft') setImg((i) => (i - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, onClose]);

  const step = (d: number) => setImg((i) => (i + d + count) % count);

  return (
    <motion.article
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative z-10 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1E122E]/90 shadow-[0_0_80px_rgba(153,225,217,0.15)] backdrop-blur-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        <span>
          <span className="text-[#99E1D9]">●</span> Project {position}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1.5 text-neutral-300 transition-colors hover:border-[#99E1D9]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99E1D9]"
        >
          Close ✕
        </button>
      </div>

      <div className="overflow-y-auto">
        {/* Viewer */}
        <div className="relative aspect-video w-full bg-[#0B0512]">
          <AnimatePresence initial={false}>
            <motion.div
              key={project.images[img]}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectImage
                src={project.images[img]}
                alt={`${project.title} screenshot ${img + 1}`}
                title={project.title}
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => step(d)}
                  aria-label={d < 0 ? 'Previous image' : 'Next image'}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    d < 0 ? 'left-3' : 'right-3'
                  } flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-[#99E1D9]/60 hover:bg-black/70`}
                >
                  {d < 0 ? '←' : '→'}
                </button>
              ))}
              <span className="absolute bottom-3 right-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur-md">
                {String(img + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {count > 1 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10 p-3">
            {project.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setImg(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === img}
                className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border transition ${
                  i === img ? 'border-[#99E1D9] opacity-100' : 'border-white/10 opacity-50 hover:opacity-90'
                }`}
              >
                <ProjectImage src={src} alt="" title={project.title} sizes="96px" />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="grid gap-8 p-6 md:grid-cols-[1fr_240px] md:p-10">
          <div>
            <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
              {project.year && <span>{project.year}</span>}
              {project.client && <span className="text-[#99E1D9]/80">{project.client}</span>}
              {project.internal && <span>Internal system</span>}
            </p>
            <h3 id="project-modal-title" className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-neutral-300">{project.description}</p>
            {project.award && (
              <p className="mt-5 inline-flex rounded-full border border-[#99E1D9]/30 bg-[#99E1D9]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#99E1D9]">
                ★ {project.award}
              </p>
            )}
          </div>

          <aside className="space-y-6">
            {project.tech.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-neutral-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#99E1D9] px-5 py-2.5 text-sm font-black text-[#0B0512] transition hover:shadow-[0_0_30px_rgba(153,225,217,0.4)]"
                >
                  Visit live site ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#99E1D9]/50"
                >
                  Source code
                </a>
              )}
              {!project.live && !project.repo && (
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                  {project.internal ? 'Private: available on request' : 'Link coming soon'}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Project navigation */}
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        <button type="button" onClick={() => onStep(-1)} className="text-neutral-400 transition-colors hover:text-white">
          ← Prev project
        </button>
        <button type="button" onClick={() => onStep(1)} className="text-neutral-400 transition-colors hover:text-white">
          Next project →
        </button>
      </div>
    </motion.article>
  );
}