/**
 * Single swap point for smooth scrolling.
 * When Lenis or GSAP ScrollSmoother is added, replace the body with
 * lenis.scrollTo(el) / smoother.scrollTo(el, true). Callers stay untouched.
 */
const NAV_OFFSET = 96;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top =
    id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
}