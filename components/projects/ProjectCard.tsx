'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/content/projects';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectImage } from './ProjectImage';

const MAX_CHIPS = 4;

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const [armed, setArmed] = useState(false);
  const [frame, setFrame] = useState(0);
  const count = project.images?.length || 0;

  useEffect(() => {
    if (!hover || count < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % count), 1100);
    return () => clearInterval(id);
  }, [hover, count]);

  const enter = () => {
    setHover(true);
    setArmed(true);
  };
  const leave = () => {
    setHover(false);
    setFrame(0);
  };

  const visible = project.images ? project.images.slice(0, armed ? count : 1) : [];
  const extraChips = project.tech.length - MAX_CHIPS;

  return (
    <Reveal delay={(index % 3) * 0.08} className={project.featured ? 'md:col-span-2' : ''}>
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={enter}
        onBlur={leave}
        aria-label={`Open ${project.title}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1E122E]/70 text-left backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[#99E1D9]/50 hover:shadow-[0_0_40px_rgba(153,225,217,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99E1D9]"
      >
        {/* Media / Confidential Placeholder */}
        <div className={`relative w-full overflow-hidden ${project.featured ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          {count > 0 ? (
            visible.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-700 ${i === frame ? 'opacity-100' : 'opacity-0'}`}
              >
                <ProjectImage
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  title={project.title}
                  sizes={
                    project.featured
                      ? '(min-width: 1024px) 760px, 100vw'
                      : '(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw'
                  }
                  className="scale-[1.02] transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                />
              </div>
            ))
          ) : (
            /* Confidential NDA Placeholder */
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#0B0512] p-6 text-center">
              <span className="mb-2 rounded-full border border-[#99E1D9]/30 bg-[#99E1D9]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#99E1D9]">
                🔒 CONFIDENTIAL / NDA
              </span>
              <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Media Restricted by Client Agreement
              </p>
            </div>
          )}

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0512]/80 via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em]">
            {project.year && (
              <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-neutral-200 backdrop-blur-md">
                {project.year}
              </span>
            )}
            {project.confidential && (
              <span className="rounded-full border border-[#99E1D9]/30 bg-[#99E1D9]/10 px-2.5 py-1 text-[#99E1D9] backdrop-blur-md">
                Confidential
              </span>
            )}
            {project.internal && !project.confidential && (
              <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-neutral-400 backdrop-blur-md">
                Internal
              </span>
            )}
          </div>

          {/* Frame dots */}
          {count > 1 && (
            <div aria-hidden className="absolute bottom-3 right-4 flex gap-1">
              {project.images.map((src, i) => (
                <span
                  key={src}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === frame ? 'w-4 bg-[#99E1D9]' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          {project.client && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#99E1D9]/80">{project.client}</p>
          )}
          <h3 className="mt-1 text-lg font-bold tracking-tight text-white md:text-xl">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">{project.summary}</p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <ul className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, MAX_CHIPS).map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-neutral-300"
                >
                  {t}
                </li>
              ))}
              {extraChips > 0 && (
                <li className="px-1 py-1 font-mono text-[10px] text-neutral-500">+{extraChips}</li>
              )}
            </ul>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition-colors duration-300 group-hover:text-[#99E1D9]">
              View <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}