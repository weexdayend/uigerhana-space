"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OrganicModularCanvas, type OrganicMorphControl } from "@/components/OrganicModularCanvas";
import { PROFILE } from "@/data/profile";
import styles from "./IntroductionSection.module.css";

export function IntroductionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const morphControl = useRef<OrganicMorphControl>({ value: 0.72 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      morphControl.current.value = 0.72;
      morphControl.current.invalidate?.();
      return;
    }

    morphControl.current.value = 0;
    morphControl.current.invalidate?.();

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          "[data-hero-art]",
          { autoAlpha: 0, x: 34, scale: 0.985 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 1.25 },
          0
        )
        .fromTo(
          "[data-hero-title]",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.95 },
          0.18
        )
        .fromTo(
          "[data-hero-byline]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          0.42
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          0.56
        )
        .fromTo(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          0.76
        )
        .to(
          morphControl.current,
          {
            value: 1,
            duration: 2.15,
            ease: "power2.inOut",
            onUpdate: () => morphControl.current.invalidate?.(),
          },
          0.12
        )
        .to(
          morphControl.current,
          {
            value: 0.72,
            duration: 0.82,
            ease: "power2.out",
            onUpdate: () => morphControl.current.invalidate?.(),
          },
          2.18
        );
    }, section);

    return () => {
      context.revert();
      morphControl.current.value = 0.72;
      morphControl.current.invalidate?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-band="dark"
      className={styles.root}
    >
      <div className={styles.inner}>
        <div id="about" className={styles.copy}>
          <h1 data-hero-title className={styles.title}>
            <span className={styles.titleLine}>From pixel</span>
            <span className={styles.titleSecond}>
              <span>to </span>
              <span className={styles.titleAccent}>production.</span>
            </span>
          </h1>

          <p data-hero-byline className={styles.byline}>
            {PROFILE.displayName}
            <span className={styles.bylineDivider}>—</span>
            {PROFILE.positioning}
          </p>

          <p data-hero-copy className={styles.description}>
            {PROFILE.introduction}
          </p>

          <div data-hero-actions className={styles.actions}>
            <a href="#work" className={styles.primaryLink}>
              Explore selected work
              <span aria-hidden="true">↗</span>
            </a>
            <a href="/cv" className={styles.secondaryLink}>
              View résumé
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div data-hero-art className={styles.art}>
          <OrganicModularCanvas control={morphControl} />
        </div>
      </div>
    </section>
  );
}
