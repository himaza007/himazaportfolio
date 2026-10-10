'use client';

import { useState } from 'react';
import { projects } from '@/content/projects';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

const pad = (n: number) => String(n).padStart(2, '0');

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openIndex = projects.findIndex((p) => p.slug === openSlug);

  const step = (dir: 1 | -1) =>
    setOpenSlug((slug) => {
      const i = projects.findIndex((p) => p.slug === slug);
      return projects[(i + dir + projects.length) % projects.length].slug;
    });

  return (
    <section 
      id="projects" 
      data-section="projects" 
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 z-10 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <Reveal>
            <SectionHeading
              index="03"
              label="Projects"
              title={
                <>
                  Selected work, <span className="text-neutral-400 font-light">shipped.</span>
                </>
              }
              kicker="From immersive 3D brand sites to internal ERPs and enterprise tooling."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#99E1D9]/80 shrink-0">
              {pad(projects.length)} projects
            </p>
          </Reveal>
        </div>

        {/* Responsive Grid: 1 col on mobile -> 2 cols on tablet -> 3 cols on desktop */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setOpenSlug} />
          ))}
        </div>
      </div>

      {/* Fullscreen Responsive Lightbox Modal */}
      <ProjectModal
        project={openIndex >= 0 ? projects[openIndex] : null}
        position={`${pad(openIndex + 1)} / ${pad(projects.length)}`}
        onClose={() => setOpenSlug(null)}
        onStep={step}
      />
    </section>
  );
}

export default Projects;