"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type VisualKind = "workflow" | "interface" | "architecture" | "production";

type StoryBeat = {
  index: string;
  label: string;
  title: string;
  description: string;
  focus: string;
  visual: VisualKind;
  visualLabel: string;
};

const STORY_BEATS: StoryBeat[] = [
  {
    index: "01",
    label: "Product thinking",
    title: "Understand the work before shaping the software.",
    description:
      "Start with the people, decisions, data, and constraints around a problem. A useful product begins with a clear view of the workflow it needs to support.",
    focus: "Problem framing · Workflow mapping · Product logic",
    visual: "workflow",
    visualLabel: "From context to product logic",
  },
  {
    index: "02",
    label: "Interface design",
    title: "Make complexity feel clear.",
    description:
      "Research, information architecture, and interaction design connect complex rules to interfaces people can understand, navigate, and use with confidence.",
    focus: "Research · Information architecture · Interaction design",
    visual: "interface",
    visualLabel: "Conceptual interface study · not a product screenshot",
  },
  {
    index: "03",
    label: "Software engineering",
    title: "Build the system behind the experience.",
    description:
      "Bring frontend, backend, data models, integrations, and intelligent capabilities into one coherent product architecture—with clear boundaries and maintainable decisions.",
    focus: "Application architecture · Data · Integrations",
    visual: "architecture",
    visualLabel: "A connected product architecture",
  },
  {
    index: "04",
    label: "Production thinking",
    title: "Think beyond the moment it ships.",
    description:
      "Consider security, deployment, monitoring, and long-term maintainability as part of the product itself. The interface is only one layer of a working system.",
    focus: "Reliability · Security · Operations",
    visual: "production",
    visualLabel: "Designed to operate, observe, and improve",
  },
];

function StoryVisual({ kind, label }: { kind: VisualKind; label: string }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 100;
    const y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 100;
    event.currentTarget.style.setProperty("--pointer-x", x + "%");
    event.currentTarget.style.setProperty("--pointer-y", y + "%");
  };

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
  };

  return (
    <div
      className={"motion-story__visual motion-story__visual--" + kind}
      data-story-reveal
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="motion-story__visual-grid" aria-hidden="true" />
      <div className="motion-story__visual-meta">
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </div>

      {kind === "workflow" ? (
        <div className="story-flow" aria-hidden="true">
          <div className="story-node">
            <span className="story-node__index">01</span>
            <span>Context</span>
          </div>
          <div className="story-node">
            <span className="story-node__index">02</span>
            <span>Decisions</span>
          </div>
          <div className="story-node">
            <span className="story-node__index">03</span>
            <span>Data</span>
          </div>
          <div className="story-node story-node--accent">
            <span className="story-node__index">04</span>
            <span>Product</span>
          </div>
          <div className="story-flow__caption">The workflow shapes the system.</div>
        </div>
      ) : null}

      {kind === "interface" ? (
        <div className="story-ui" aria-hidden="true">
          <div className="story-ui__window">
            <div className="story-ui__topbar">
              <span />
              <span />
              <span />
              <div />
            </div>
            <div className="story-ui__body">
              <div className="story-ui__sidebar">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="story-ui__content">
                <div className="story-ui__heading">
                  <span />
                  <span />
                </div>
                <div className="story-ui__metrics">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="story-ui__chart">
                  <div className="story-ui__chart-lines" />
                  <div className="story-ui__bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="story-ui__footer">
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>
          <span className="story-ui__annotation">A considered interface</span>
        </div>
      ) : null}

      {kind === "architecture" ? (
        <div className="story-architecture" aria-hidden="true">
          <div className="story-architecture__orbit story-architecture__orbit--outer" />
          <div className="story-architecture__orbit story-architecture__orbit--inner" />
          <div className="story-architecture__core">Product</div>
          <div className="story-architecture__node story-architecture__node--top">Interface</div>
          <div className="story-architecture__node story-architecture__node--right">API</div>
          <div className="story-architecture__node story-architecture__node--bottom">Data</div>
          <div className="story-architecture__node story-architecture__node--left">Domain</div>
          <div className="story-architecture__node story-architecture__node--corner">Integrations</div>
        </div>
      ) : null}

      {kind === "production" ? (
        <div className="story-production" aria-hidden="true">
          <div className="story-production__signal">
            <span />
            <span />
            <span />
            <div className="story-production__core">
              <b />
              <b />
              <b />
              <b />
            </div>
          </div>
          <div className="story-production__list">
            <span><i /> Security</span>
            <span><i /> Observability</span>
            <span><i /> Maintainability</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function MotionNarrativeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]", track);
      const segmentCount = Math.max(1, panels.length - 1);
      const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=49",
          end: () => "+=" + Math.max(getDistance(), window.innerWidth),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!progress) return;
            progress.style.transform = "scaleX(" + self.progress + ")";
            progress.setAttribute("aria-valuenow", String(Math.round(self.progress * 100)));
          },
        },
      });

      timeline.to(
        track,
        {
          x: () => -getDistance(),
          duration: segmentCount,
          ease: "none",
        },
        0
      );

      panels.forEach((panel, index) => {
        const elements = panel.querySelectorAll<HTMLElement>("[data-story-reveal]");
        const enterAt = index === 0 ? 0.02 : index - 0.42;

        timeline.fromTo(
          elements,
          { opacity: 0.62, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
          },
          enterAt
        );

        if (index < panels.length - 1) {
          timeline.to(
            elements,
            {
              opacity: 0.72,
              y: -18,
              duration: 0.22,
              ease: "power1.in",
            },
            index + 0.62
          );
        }
      });

      ScrollTrigger.refresh();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-band="dark"
      aria-label="From product thinking to production"
      className="motion-story"
    >
      <div className="motion-story__viewport">
        <div ref={trackRef} className="motion-story__track">
          {STORY_BEATS.map((beat) => (
            <article
              key={beat.index}
              data-story-panel
              className="motion-story__panel"
              aria-label={beat.index + " " + beat.label}
            >
              <div className="motion-story__copy" data-story-reveal>
                <p className="motion-story__eyebrow">
                  <span>{beat.index}</span>
                  <span aria-hidden="true">/</span>
                  <span>{beat.label}</span>
                </p>
                <h2>{beat.title}</h2>
                <p className="motion-story__description">{beat.description}</p>
                <p className="motion-story__focus">{beat.focus}</p>
                {beat.index === "04" ? (
                  <a href="#work" className="motion-story__link">
                    Explore selected work <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
              <StoryVisual kind={beat.visual} label={beat.visualLabel} />
            </article>
          ))}
        </div>
      </div>

      <div className="motion-story__hint" aria-hidden="true">
        <span className="motion-story__hint-desktop">Scroll to move through the story</span>
        <span className="motion-story__hint-mobile">Swipe to explore the story</span>
        <span>04 chapters</span>
      </div>

      <div className="motion-story__progress">
        <span
          ref={progressRef}
          role="progressbar"
          aria-label="Story progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        />
      </div>
    </section>
  );
}
