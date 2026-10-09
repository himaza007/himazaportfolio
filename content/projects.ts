export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  images: string[];
  year?: string;
  client?: string;
  featured?: boolean;
  internal?: boolean;
  confidential?: boolean; // <-- Add this line
  award?: string;
  live?: string;
  repo?: string;
}


/** /projects/<slug>/1.jpeg … n.jpeg */
const shots = (slug: string, count: number, ext = 'jpeg') =>
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
    slug: 'physioconnect',
    title: 'PhysioConnect',
    summary: 'Healthcare management and patient scheduling platform.',
    description: 'Streamlined appointment booking, patient health records, and practitioner workflow management system.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
    images: ['/projects/physioconnect/1.jpeg', '/projects/physioconnect/2.jpeg', '/projects/physioconnect/3.jpeg'],
    year: '2025',
    featured: false, // Ensures small 1-column card size
  },
  {
    slug: 'tariff-calculator',
    title: 'Tariff Calculator',
    summary: 'Enterprise utility cost estimation and rate structure calculator.',
    description: 'Internal financial tool developed for real-time tariff modeling and multi-variable cost analysis.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    images: [], // Empty array for no pictures
    year: '2025',
    internal: true,
    confidential: true, // Triggers confidential NDA placeholder
    featured: false, // Ensures small 1-column card size
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
