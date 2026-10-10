import { Atmosphere } from '@/components/atmosphere/Atmosphere';
import { PillNav } from '@/components/nav/PillNav';
import { WarpScroll } from '@/components/scroll/WarpScroll';
import { GlobalTracer } from '@/components/atmosphere/GlobalTracer';
import { Hero } from '@/components/hero/Hero';
import { TypewriterTransition } from '@/components/ui/TypewriterTransition';
import { About } from '@/components/about/About';
import { Projects } from '@/components/projects/Projects';
import { BeyondScreens } from '@/components/volunteering/BeyondScreens';
import { Gallery } from '@/components/gallery/Gallery';
import { Contact } from '@/components/contact/Contact';

export default function Page() {
  return (
    <>
      {/* Fixed 3D Canvas rendering floating background images */}
      <Atmosphere />
      <PillNav />
      <WarpScroll />

      <div id="smooth-wrapper" className="bg-transparent">
        <main id="smooth-content" className="relative z-10 pointer-events-auto bg-transparent">
          {/* Continuous tracer line spanning entire page */}
          <GlobalTracer />

          <Hero />
          <TypewriterTransition />
          <About />
          <Projects />
          <BeyondScreens />
          <Gallery />
          <Contact />
        </main>
      </div>
    </>
  );
}