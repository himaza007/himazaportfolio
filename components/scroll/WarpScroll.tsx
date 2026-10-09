'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { sceneState } from '@/lib/scene-state';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll → camera plunge.
 * Pins #home and scrubs sceneState.warp 0 → 1 while the HUD recedes.
 * CameraRig turns warp into camera Z / FOV; WarpTunnel reads camera velocity for streaks.
 */
export function WarpScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { reduce } = ctx.conditions as { motion: boolean; reduce: boolean };

        if (reduce) {
          // No pinning or flashy exit: warp simply follows the hero's scroll-out.
          gsap.to(sceneState, {
            warp: 1,
            ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
          });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Plain wrappers only: Framer Motion animates their children, so nothing fights.
        // No CSS filter here: it would kill the card's backdrop blur.
        tl.to(sceneState, { warp: 1, duration: 1 }, 0)
          .to('[data-hero-cue]', { autoAlpha: 0, duration: 0.08 }, 0)
          .to(
            '[data-hero-hud]',
            { scale: 0.82, yPercent: -8, autoAlpha: 0, duration: 0.35, ease: 'power2.in' },
            0.06,
          )
          .to('[data-atmosphere]', { opacity: 0.35, duration: 1 }, 0);

        // About content emerges from the tunnel
        gsap.fromTo(
          '[data-about-reveal]',
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: '#about', start: 'top 80%', end: 'top 35%', scrub: 1 },
          },
        );
      },
    );

    // Re-measure pins once web fonts have settled the layout
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}