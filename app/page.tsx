import { SceneLoader } from '@/components/three/SceneLoader';
import { Scene } from '@/components/three/Scene';
import { Atmosphere } from '@/components/atmosphere/Atmosphere';
import { GlobalTracer } from '@/components/atmosphere/GlobalTracer';
import { PillNav } from '@/components/nav/PillNav';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Projects } from '@/components/projects/Projects';
import { BeyondScreens } from '@/components/volunteering/BeyondScreens';
import { Gallery } from '@/components/gallery/Gallery';
import { Contact } from '@/components/contact/Contact';
import { WarpScroll } from '@/components/scroll/WarpScroll';

export default function Page() {
  return (
    <>
      <SceneLoader />
      <Scene />
      <Atmosphere />
      <PillNav />
      <WarpScroll />

      <div id="smooth-wrapper">
        <main id="smooth-content" className="relative z-10 pointer-events-auto">
          {/* Continuous tracer line spanning entire page */}
          <GlobalTracer />

          <Hero />
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