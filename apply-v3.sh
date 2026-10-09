#!/usr/bin/env bash
# Portfolio v3: About & Projects
# Run from the project root (the folder containing package.json):
#   bash apply-v3.sh
set -euo pipefail

if [ ! -f package.json ] || [ ! -d app ]; then
  echo "✗ Run this from your himaza-portfolio folder (where package.json is)."
  exit 1
fi

echo "→ Creating folders"
mkdir -p content components/ui components/about components/projects public/about public/projects

if [ -f app/page.tsx ]; then
  cp app/page.tsx app/page.tsx.bak
  echo "→ Backed up app/page.tsx → app/page.tsx.bak"
fi

# ─────────────────────────────────────────────
echo "→ content/about.ts"
cat > content/about.ts <<'EOF'
export interface Experience {
  role: string;
  org: string;
  period: string;
  type?: string;
  current?: boolean;
  highlights: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export const about = {
  name: 'Himaza Zahara',
  portrait: '/about/portrait.jpg',

  // DRAFT: your short intro, shown large
  intro: 'I engineer the systems behind the screen, and the experiences on it.',

  // DRAFT: written only from the experience and awards you shared. Edit freely.
  bio: [
    "I'm Himaza Zahara, a fullstack developer and brand strategist, working where engineering, design and strategy meet. I am passionate in making immersive 3D web experiences.",
    "As Digital Solutions Head at Mawkish Technologies, I led web and software projects end to end, from architecture and stack decisions through to delivery, across the Mawkish group's creative, enterprise and internal platforms. Before that, I built a real-time AI based tariff analysis platform at MAS Intimates, and ran Meta ad campaigns and lead-generation funnels at Somizu.",
    'Beyond client work, I was recognised as the Most Outstanding President 2025/26 in Rotaract in RID 3220, while reading Computer Science at the University of Westminster.',
  ],

  location: 'Sri Lanka · GMT+5:30', // DRAFT
  currently: 'Product Owner at Editoz Club (contract)', // DRAFT

  // DRAFT: grouped from the tools in your experience and projects
  skills: [
    { group: 'Frontend & 3D', items: ['React', 'Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'GSAP'] },
    { group: 'Backend & Data', items: ['Node.js', 'Express.js', 'ASP.NET', '.NET', 'Firebase', 'MySQL'] },
    { group: 'Languages', items: ['JavaScript', 'TypeScript', 'C#', 'Python', 'Java', 'C++', 'Kotlin', 'Go', 'Dart'] },
    { group: 'Cloud & Mobile', items: ['Microsoft Azure', 'Vercel', 'Flutter'] },
    { group: 'Strategy & Growth', items: ['Product ownership', 'Digital strategy', 'Meta Suite', 'ManyChat funnels', 'SEO', 'Campaign analytics'] },
  ] satisfies SkillGroup[],

  experience: [
    {
      role: 'Product Owner',
      org: 'Editoz Club',
      period: 'Present',
      type: 'Contract',
      current: true,
      highlights: [], // TODO: add 2–4 highlights
    },
    {
      role: 'Digital Solutions Head',
      org: 'Mawkish Group',
      period: '2026',
      highlights: [
        'Led web and software projects end to end, from strategy and architecture to delivery.',
        'Built immersive web platforms across internal, external and Mawkish group projects.',
        'Managed the full project lifecycle: requirements, planning, deployment and support.',
        'Aligned developers, designers and stakeholders around brand and business goals.',
        'Set development standards and workflows to boost delivery speed and consistency.',
        'Chose tech stacks per project based on scope, performance and client needs.',
      ],
    },
    {
      role: 'Junior Social Media Manager',
      org: 'Somizu',
      period: '2025',
      highlights: [
        'Developed and executed social media strategies and content planning across platforms.',
        'Built lead-generation pipelines and funnels with ManyChat and Meta Ads to drive engagement and conversions.',
        'Ran and optimised Meta ad campaigns to support brand growth and audience acquisition.',
        'Applied SEO practices to improve content visibility and organic reach.',
        'Analysed campaign performance and engagement metrics to refine content and targeting.',
        'Coordinated with the design and content team to plan and schedule posts in line with brand goals.',
      ],
    },
    {
      role: 'Digitalization & Strategy Intern',
      org: 'MAS Intimates',
      period: 'Apr – Oct 2025',
      highlights: [
        'Worked with .NET technologies, Microsoft Azure and digital strategy initiatives.',
        'Assisted in process digitalization and workflow optimisation projects.',
        'Collaborated with teams to improve operational efficiency and execution.',
      ],
    },
  ] satisfies Experience[],

  education: [
    { title: 'BSc Computer Science', org: 'University of Westminster', status: 'Reading' },
    { title: "Diplôme d'Études en Langue Française (DELF)", org: 'Alliance Française, Colombo', status: 'Completed' },
  ],

  awards: [
    { title: 'Most Outstanding President 2025/26', org: 'Rotaract, RID 3220 (Sri Lanka & Maldives)' },
    { title: "3rd Place, 'Tech Minds' Challenge", org: 'Cutting Edge, Informatics Institute of Technology' },
    { title: 'All-Island Winner, Verse Speaking', org: 'British Lanka Festival for Performing Arts' },
    { title: 'Most Outstanding Student of the Year, English Literature', org: 'École Maillard Middle School, Canada' },
  ],
};
EOF

# ─────────────────────────────────────────────
echo "→ content/projects.ts"
cat > content/projects.ts <<'EOF'
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year?: string;
  client?: string;
  tech: string[];
  images: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
  award?: string;
  internal?: boolean;
}

/** /projects/<slug>/1.jpg … n.jpg */
const shots = (slug: string, count: number, ext = 'jpg') =>
  Array.from({ length: count }, (_, i) => `/projects/${slug}/${i + 1}.${ext}`);

// Order is deliberate: featured cards take 2 columns; this order fills the grid gap-free.
export const projects: Project[] = [
  {
    slug: 'mawkish-creates',
    title: 'Mawkish Creates',
    summary: 'Immersive 3D website for a creative agency.',
    description:
      'The official website for Mawkish Creates, a creative agency offering a range of design and production services. Built with an immersive 3D interface using Three.js and React Three Fiber, with Firebase for data and Node.js handling backend logic.',
    year: '2026',
    tech: ['Three.js', 'React Three Fiber', 'Node.js', 'Firebase'],
    images: shots('mawkish-creates', 5),
    live: 'https://mawkishcreates.com/',
    featured: true,
  },
  {
    slug: 'mawkish-erp',
    title: 'Mawkish Creates ERP',
    summary: 'Internal ERP for people, projects and performance.',
    description:
      'An internal ERP system built to manage staff relationships, track project progress, and maintain a results-driven, performance-monitored work environment.',
    year: '2026',
    tech: ['React', 'Node.js', 'Firebase'],
    images: shots('mawkish-erp', 5),
    internal: true,
    // The link you shared is a private Vercel dashboard (visitors would hit a login), so it's omitted.
  },
  {
    slug: 'physioconnect',
    title: 'PhysioConnect',
    summary: 'Real-time physiotherapy app built around a 2D body model.',
    description:
      'A real-time physiotherapy application centred on an interactive 2D body model, with pain monitoring, progress tracking and a nearby-facility locator. AR features are planned as a future enhancement.',
    year: '2024',
    tech: ['Flutter', 'Node.js', 'Express.js', 'MySQL'],
    images: shots('physioconnect', 5),
  },
  {
    slug: 'mawkish-technologies',
    title: 'Mawkish Technologies',
    summary: 'Corporate site for a business transformation partner.',
    description:
      'The official website for Mawkish Technologies, a business transformation partner helping organisations achieve measurable outcomes through SAP, Salesforce, Odoo and other enterprise technologies.',
    year: '2026',
    tech: ['React', 'Node.js', 'Firebase'],
    images: shots('mawkish-technologies', 5),
    live: 'https://mawkish-tecnologies.vercel.app/', // check spelling: "tecnologies"
    featured: true,
  },
  {
    slug: 'tariff-calculator',
    title: 'Real-Time Tariff Calculator',
    summary: 'Global tariff analysis for international trade.',
    description:
      'A real-time tariff analysis platform developed for MAS Intimates to compare products against global tariff rates and calculate export and import costs across international branches. The system provided global trade insights and supported data-driven pricing and strategic decisions.',
    year: '2025',
    client: 'MAS Intimates',
    tech: ['C#', '.NET', 'ASP.NET', 'Microsoft Azure', 'JavaScript'],
    images: shots('tariff-calculator', 1),
    internal: true,
    featured: true,
  },
  {
    slug: 'raciit-blog',
    title: 'RACIIT Blog',
    summary: 'Blog platform for RACIIT.',
    description: 'The blog platform for RACIIT, publishing club stories and updates.', // TODO: expand
    tech: [], // TODO
    images: shots('raciit-blog', 5),
    live: 'https://blog.raciit.info/',
  },
  {
    slug: 'raciit-annual-report',
    title: 'RACIIT Annual Report',
    summary: 'Web-based annual report for the 2025–26 term.',
    description: "A web-based annual report presenting RACIIT's 2025–26 term.", // TODO: expand
    year: '2025–26',
    tech: [], // TODO
    images: shots('raciit-annual-report', 5),
  },
  {
    slug: 'raciit-main',
    title: 'RACIIT Website',
    summary: 'Award-winning official website for RACIIT.',
    description: 'The official website of RACIIT, recognised with a Bronze award at the Rotaract District Assembly.', // TODO: expand
    year: '2025–26',
    tech: [], // TODO
    images: shots('raciit-main', 5),
    live: 'https://www.raciit.info/',
    award: 'Bronze · Rotaract District Assembly',
    featured: true,
  },
];
EOF

# ─────────────────────────────────────────────
echo "→ components/ui/Reveal.tsx"
cat > components/ui/Reveal.tsx <<'EOF'
'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Fades and lifts content in once when it scrolls into view. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/ui/SectionHeading.tsx"
cat > components/ui/SectionHeading.tsx <<'EOF'
import type { ReactNode } from 'react';

export function SectionHeading({
  index,
  label,
  title,
  kicker,
}: {
  index: string;
  label: string;
  title: ReactNode;
  kicker?: ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
        <span aria-hidden className="h-px w-8 bg-red-700" />
        {index} / {label}
      </p>
      <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      {kicker && <p className="mt-5 max-w-2xl text-neutral-400">{kicker}</p>}
    </div>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/about/About.tsx"
cat > components/about/About.tsx <<'EOF'
'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { about, type Experience } from '@/content/about';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;
const PANEL = 'rounded-2xl border border-white/10 bg-black/45 backdrop-blur-2xl';

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
      <span className="text-red-700">●</span> {children}
    </p>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span aria-hidden className="mt-[10px] h-px w-2.5 shrink-0 bg-red-700" />
      <span>{children}</span>
    </li>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${PANEL} group relative aspect-[4/5] overflow-hidden`}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/10">
          HZ
        </div>
      ) : (
        <Image
          src={about.portrait}
          alt={`Portrait of ${about.name}`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          onError={() => setFailed(true)}
          className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-0"
        style={{ background: 'radial-gradient(circle at 70% 20%, rgba(139,0,0,0.7), transparent 60%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
        {about.name}
      </div>
    </div>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  const [open, setOpen] = useState(false);
  const shown = item.highlights.slice(0, 2);
  const extra = item.highlights.slice(2);

  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full border ${
          item.current
            ? 'border-red-600 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.9)]'
            : 'border-white/30 bg-[#070707]'
        }`}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-base font-semibold text-white md:text-lg">{item.role}</h4>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">{item.period}</span>
      </div>
      <p className="mt-0.5 text-sm text-red-400/80">
        {item.org}
        {item.type && <span className="text-neutral-500"> · {item.type}</span>}
      </p>

      {shown.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-neutral-400">
          {shown.map((h) => (
            <Bullet key={h}>{h}</Bullet>
          ))}
        </ul>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden text-sm leading-relaxed text-neutral-400"
          >
            {extra.map((h) => (
              <div key={h} className="pt-1.5">
                <Bullet>{h}</Bullet>
              </div>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {extra.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-red-400"
        >
          {open ? '− Show less' : `+ ${extra.length} more`}
        </button>
      )}
    </li>
  );
}

export function About() {
  return (
    <section id="about" data-section="about" className="relative px-4 pb-32 pt-40 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* GSAP (WarpScroll) reveals this block as the warp lands */}
        <div data-about-reveal>
          <SectionHeading index="02" label="About" title={about.intro} />
        </div>

        {/* Portrait + bio */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Portrait />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className={`${PANEL} flex h-full flex-col p-6 md:p-10`}>
              <PanelLabel>Profile</PanelLabel>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-neutral-300 md:text-base">
                {about.bio.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <dl className="mt-auto grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
                {[
                  { k: 'Currently', v: about.currently },
                  { k: 'Based in', v: about.location },
                ].map(({ k, v }) => (
                  <div key={k} className="pt-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{k}</dt>
                    <dd className="mt-1.5 text-sm text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal className="mt-5">
          <div className={`${PANEL} p-6 md:p-10`}>
            <PanelLabel>Stack & capabilities</PanelLabel>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {about.skills.map((g) => (
                <div key={g.group}>
                  <h3 className="text-sm font-semibold text-white">{g.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-neutral-300 transition-colors duration-300 hover:border-red-800/50 hover:text-white"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Experience + Education/Awards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className={`${PANEL} h-full p-6 md:p-10`}>
              <PanelLabel>Experience</PanelLabel>
              <ol className="relative mt-8 space-y-9 border-l border-white/10 pl-6">
                {about.experience.map((e) => (
                  <ExperienceItem key={`${e.role}-${e.org}`} item={e} />
                ))}
              </ol>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal delay={0.1}>
              <div className={`${PANEL} p-6 md:p-8`}>
                <PanelLabel>Education</PanelLabel>
                <ul className="mt-6 space-y-5">
                  {about.education.map((e) => (
                    <li key={e.title}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/80">{e.status}</p>
                      <h4 className="mt-1 font-semibold text-white">{e.title}</h4>
                      <p className="text-sm text-neutral-400">{e.org}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="flex-1">
              <div className={`${PANEL} h-full p-6 md:p-8`}>
                <PanelLabel>Recognition</PanelLabel>
                <ol className="mt-6 space-y-5">
                  {about.awards.map((a, i) => (
                    <li key={a.title} className="flex gap-4">
                      <span className="font-mono text-[10px] text-red-600">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className="text-sm font-semibold leading-snug text-white">{a.title}</h4>
                        <p className="mt-0.5 text-sm text-neutral-400">{a.org}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/projects/ProjectImage.tsx"
cat > components/projects/ProjectImage.tsx <<'EOF'
'use client';

import Image from 'next/image';
import { useState } from 'react';

/** next/image that falls back to a crimson-glass placeholder if the file is missing. */
export function ProjectImage({
  src,
  alt,
  title,
  sizes,
  priority,
  className = '',
}: {
  src: string;
  alt: string;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Placeholder title={title} />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function Placeholder({ title }: { title: string }) {
  const initials = title
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(139,0,0,0.45), transparent 60%), linear-gradient(135deg, #0d0d0d, #050505)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <span className="relative text-5xl font-black tracking-tight text-white/80">{initials}</span>
    </div>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/projects/ProjectCard.tsx"
cat > components/projects/ProjectCard.tsx <<'EOF'
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
  const [armed, setArmed] = useState(false); // load extra screenshots only after first hover
  const [frame, setFrame] = useState(0);
  const count = project.images.length;

  // Cycle screenshots while hovered
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

  const visible = project.images.slice(0, armed ? count : 1);
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
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/45 text-left backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-[0_0_40px_rgba(139,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
      >
        {/* Media */}
        <div className={`relative w-full overflow-hidden ${project.featured ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          {visible.map((src, i) => (
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
          ))}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em]">
            {project.year && (
              <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-neutral-200 backdrop-blur-md">
                {project.year}
              </span>
            )}
            {project.award && (
              <span className="rounded-full border border-red-700/50 bg-red-950/60 px-2.5 py-1 text-red-200 backdrop-blur-md">
                ★ {project.award}
              </span>
            )}
            {project.internal && (
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
                    i === frame ? 'w-4 bg-red-600' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          {project.client && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/80">{project.client}</p>
          )}
          <h3 className="mt-1 text-lg font-bold tracking-tight text-white md:text-xl">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{project.summary}</p>

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
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-300 group-hover:text-white">
              View <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/projects/ProjectModal.tsx"
cat > components/projects/ProjectModal.tsx <<'EOF'
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
      className="relative z-10 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/85 shadow-[0_0_80px_rgba(139,0,0,0.25)] backdrop-blur-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        <span>
          <span className="text-red-600">●</span> Project {position}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1.5 text-neutral-300 transition-colors hover:border-red-800/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
        >
          Close ✕
        </button>
      </div>

      <div className="overflow-y-auto">
        {/* Viewer */}
        <div className="relative aspect-video w-full bg-black">
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
                  } flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-red-800/60 hover:bg-black/70`}
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
                  i === img ? 'border-red-600 opacity-100' : 'border-white/10 opacity-50 hover:opacity-90'
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
            <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              {project.year && <span>{project.year}</span>}
              {project.client && <span className="text-red-400/80">{project.client}</span>}
              {project.internal && <span>Internal system</span>}
            </p>
            <h3 id="project-modal-title" className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-neutral-300">{project.description}</p>
            {project.award && (
              <p className="mt-5 inline-flex rounded-full border border-red-700/50 bg-red-950/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-red-200">
                ★ {project.award}
              </p>
            )}
          </div>

          <aside className="space-y-6">
            {project.tech.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Stack</p>
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:shadow-[0_0_30px_rgba(139,0,0,0.6)]"
                >
                  Visit live site ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:border-red-800/50"
                >
                  Source code
                </a>
              )}
              {!project.live && !project.repo && (
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  {project.internal ? 'Private: available on request' : 'Link coming soon'}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Project navigation */}
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        <button type="button" onClick={() => onStep(-1)} className="text-neutral-500 transition-colors hover:text-white">
          ← Prev project
        </button>
        <button type="button" onClick={() => onStep(1)} className="text-neutral-500 transition-colors hover:text-white">
          Next project →
        </button>
      </div>
    </motion.article>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ components/projects/Projects.tsx"
cat > components/projects/Projects.tsx <<'EOF'
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
    <section id="projects" data-section="projects" className="relative px-4 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              index="03"
              label="Projects"
              title={
                <>
                  Selected work, <span className="text-neutral-500">shipped.</span>
                </>
              }
              kicker="From immersive 3D brand sites to internal ERPs and enterprise tooling."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
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
EOF

# ─────────────────────────────────────────────
echo "→ app/page.tsx"
cat > app/page.tsx <<'EOF'
import { SceneLoader } from '@/components/three/SceneLoader';
import { Atmosphere } from '@/components/atmosphere/Atmosphere';
import { PillNav } from '@/components/nav/PillNav';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Projects } from '@/components/projects/Projects';
import { WarpScroll } from '@/components/scroll/WarpScroll';
import { NAV_SECTIONS } from '@/lib/sections';

const BUILT = new Set(['home', 'about', 'projects']);
const LATER = NAV_SECTIONS.filter((s) => !BUILT.has(s.id));

export default function Page() {
  return (
    <>
      <SceneLoader />
      <Atmosphere />
      <PillNav />
      <WarpScroll />

      <div id="smooth-wrapper">
        <main id="smooth-content" className="relative z-10">
          <Hero />
          <About />
          <Projects />

          {/* Placeholders: Volunteering, Gallery, Contact (next round) */}
          {LATER.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              data-section={s.id}
              className="relative flex min-h-[100svh] items-center justify-center px-6"
            >
              <div className="text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  {String(i + 4).padStart(2, '0')} / {s.label}
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{s.label}</h2>
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}
EOF

# ─────────────────────────────────────────────
echo "→ Packaging portfolio-v3-changes.zip"
zip -rq portfolio-v3-changes.zip \
  content \
  components/ui \
  components/about \
  components/projects \
  app/page.tsx

echo ""
echo "✓ Done. 11 files written."
echo "  Backup of your old page: app/page.tsx.bak"
echo "  Zip of the changes:      portfolio-v3-changes.zip"
echo "  Next: npm run dev"