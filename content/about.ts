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
  portrait: '/about/Himaza_Sitting.jpeg',

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
