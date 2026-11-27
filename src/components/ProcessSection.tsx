"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENGINEERING_PRINCIPLES } from "@/data/approach";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const routeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    if (!section || !route) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 60.001rem) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          route,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              once: true,
            },
          }
        );
      }, section);

      return () => context.revert();
    });

    media.add("(max-width: 42rem) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          route,
          { scaleY: 0, transformOrigin: "center top" },
          {
            scaleY: 1,
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              once: true,
            },
          }
        );
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      data-band="dark"
      aria-labelledby="approach-title"
      className="atlas-approach"
    >
      <div className="atlas-approach__container">
        <header className="atlas-approach__header">
          <div className="atlas-approach__heading">
            <p className="atlas-approach__eyebrow">
              <span>05</span>
              <span aria-hidden="true">/</span>
              <span>Engineering approach</span>
            </p>
            <h2 id="approach-title">How I think about building software.</h2>
          </div>
          <p className="atlas-approach__introduction">
            Principles shaped by working with enterprise data, operational
            workflows, user interfaces, intelligent automation, and production
            systems.
          </p>
        </header>

        <div className="atlas-approach__route-heading">
          <p>Four connected principles</p>
          <span aria-hidden="true">01 — 04</span>
        </div>

        <div className="atlas-approach__principles-frame">
          <span
            ref={routeRef}
            className="atlas-approach__route"
            aria-hidden="true"
          />
          <ol className="atlas-approach__principles" aria-label="Four engineering principles">
            {ENGINEERING_PRINCIPLES.map((principle) => (
              <li key={principle.id} className="atlas-approach__principle">
                <article aria-labelledby={`approach-${principle.id}`}>
                  <div className="atlas-approach__waypoint">
                    <span>{principle.index}</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="atlas-approach__principle-copy">
                    <h3 id={`approach-${principle.id}`}>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
