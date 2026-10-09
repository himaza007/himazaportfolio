export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number]['id'];
export const NAV_IDS: readonly SectionId[] = NAV_SECTIONS.map((s) => s.id);