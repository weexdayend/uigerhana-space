"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  OrganicModularCanvas,
  type OrganicModularCanvasHandle,
  type OrganicMorphControl,
} from "@/components/OrganicModularCanvas";
import { PROFILE } from "@/data/profile";

export function IntroductionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<OrganicModularCanvasHandle | null>(null);
  const morphControl = useRef<OrganicMorphControl>({ value: 0.72 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const morph = morphControl.current;
    const invalidate = () => canvasRef.current?.invalidate();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      morph.value = 0.72;
      invalidate();
      return;
    }

    morph.value = 0;
    invalidate();

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          "[data-hero-title]",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.95 },
          0.12
        )
        .fromTo(
          "[data-hero-byline]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          0.36
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          0.5
        )
        .fromTo(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          0.7
        )
        .fromTo(
          "[data-hero-art]",
          { autoAlpha: 0, x: 48, scale: 0.97 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 1.3 },
          0
        )
        .to(
          morph,
          {
            value: 1,
            duration: 2.35,
            ease: "power2.inOut",
            onUpdate: invalidate,
          },
          0.12
        )
        .to(
          morph,
          {
            value: 0.78,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: invalidate,
          },
          2.28
        );
    }, section);

    return () => {
      context.revert();
      morph.value = 0.78;
      invalidate();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-band="dark"
      className="hero-organic"
    >
      <div className="hero-organic__inner">
        <div id="about" className="hero-organic__copy">
          <h1 data-hero-title className="hero-organic__title">
            <span className="hero-organic__title-line">From pixel</span>
            <span className="hero-organic__title-second">
              <span>to </span>
              <span className="hero-organic__title-accent">production.</span>
            </span>
          </h1>

          <p data-hero-byline className="hero-organic__byline">
            {PROFILE.displayName}
            <span className="hero-organic__byline-divider" aria-hidden="true">—</span>
            {PROFILE.positioning}
          </p>

          <p data-hero-copy className="hero-organic__description">
            {PROFILE.introduction}
          </p>

          <div data-hero-actions className="hero-organic__actions">
            <a href="#work" className="hero-organic__primary-link">
              Explore selected work
              <span aria-hidden="true">↗</span>
            </a>
            <a href="/cv" className="hero-organic__secondary-link">
              View résumé
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div data-hero-art className="hero-organic__art">
          <OrganicModularCanvas ref={canvasRef} control={morphControl} />
        </div>
      </div>
    </section>
  );
}
