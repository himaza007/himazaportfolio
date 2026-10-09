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
    <section id="projects" data-section="projects" className="relative px-4 py-32 md:px-8 z-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              {pad(projects.length)} projects
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setOpenSlug} />
          ))}
        </div>
      </div>

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