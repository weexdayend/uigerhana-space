"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import gsap from "gsap";
import { PROFILE } from "@/data/profile";
import { SITE_META } from "@/data/site";

function HeroSystemArtwork() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 100;
    const y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 100;
    event.currentTarget.style.setProperty("--light-x", x + "%");
    event.currentTarget.style.setProperty("--light-y", y + "%");
  };

  const resetPointer = () => {
    stageRef.current?.style.setProperty("--light-x", "58%");
    stageRef.current?.style.setProperty("--light-y", "46%");
  };

  return (
    <div
      ref={stageRef}
      className="hero-system-art"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <svg
        viewBox="0 0 760 700"
        role="img"
        aria-labelledby="hero-system-title hero-system-description"
        className="hero-system-art__svg"
      >
        <title id="hero-system-title">The layers behind a digital product</title>
        <desc id="hero-system-description">
          A conceptual cutaway illustration. A product interface sits above connected
          layers of domain logic, data, and runtime, showing the systems behind the
          experience people see.
        </desc>

        <defs>
          <radialGradient id="hero-system-glow" cx="58%" cy="46%" r="58%">
            <stop offset="0%" stopColor="#b8680c" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#b8680c" stopOpacity="0.055" />
            <stop offset="100%" stopColor="#0b0e11" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-screen-surface" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2efe7" />
            <stop offset="100%" stopColor="#d9d4c8" />
          </linearGradient>
          <linearGradient id="hero-layer-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#343c3e" />
            <stop offset="100%" stopColor="#20282a" />
          </linearGradient>
          <linearGradient id="hero-layer-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222a2c" />
            <stop offset="100%" stopColor="#121719" />
          </linearGradient>
          <filter id="hero-screen-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="18" />
            <feOffset dy="22" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.34" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-amber-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <ellipse cx="438" cy="360" rx="330" ry="300" fill="url(#hero-system-glow)" />

        <g data-art-trace fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M54 382 C112 357 158 318 204 277 C244 242 263 222 300 218 C356 212 367 331 408 372 C449 414 411 462 458 511 C495 550 545 557 635 590"
            stroke="#f0b765"
            strokeWidth="2.4"
            strokeOpacity="0.92"
            strokeDasharray="1100"
            strokeDashoffset="1100"
          />
          <path
            d="M54 382 C112 357 158 318 204 277 C244 242 263 222 300 218"
            stroke="#f0b765"
            strokeWidth="10"
            strokeOpacity="0.18"
            filter="url(#hero-amber-glow)"
          />
        </g>

        <g data-art-pixels fill="#f0b765">
          <rect x="34" y="367" width="12" height="12" opacity="0.9" />
          <rect x="56" y="342" width="8" height="8" opacity="0.48" />
          <rect x="75" y="391" width="7" height="7" opacity="0.7" />
          <rect x="94" y="365" width="15" height="15" opacity="0.95" />
          <rect x="112" y="328" width="6" height="6" opacity="0.42" />
          <rect x="126" y="350" width="10" height="10" opacity="0.75" />
          <rect x="145" y="385" width="5" height="5" opacity="0.4" />
          <rect x="157" y="324" width="9" height="9" opacity="0.62" />
          <rect x="171" y="347" width="13" height="13" opacity="0.88" />
          <rect x="188" y="303" width="7" height="7" opacity="0.5" />
          <rect x="201" y="282" width="8" height="8" opacity="0.8" />
          <rect x="215" y="262" width="5" height="5" opacity="0.62" />
          <rect x="231" y="247" width="8" height="8" opacity="0.82" />
          <rect x="249" y="231" width="6" height="6" opacity="0.52" />
        </g>

        <g data-art-stack>
          <g data-art-layer>
            <path d="M178 538 L454 454 L706 550 L429 646 Z" fill="url(#hero-layer-top)" stroke="#667071" strokeOpacity="0.72" />
            <path d="M178 538 L429 646 L429 676 L178 567 Z" fill="url(#hero-layer-side)" stroke="#465052" strokeOpacity="0.62" />
            <path d="M429 646 L706 550 L706 580 L429 676 Z" fill="#151c1e" stroke="#465052" strokeOpacity="0.62" />
            <path d="M217 545 L429 635 L666 553" fill="none" stroke="#8a9693" strokeOpacity="0.22" strokeWidth="1.2" />
            <text x="490" y="594" fill="#c9c5b9" fontSize="12" letterSpacing="2.4">RUNTIME</text>
            <circle cx="640" cy="566" r="4" fill="#f0b765" />
          </g>

          <g data-art-layer>
            <path d="M190 470 L466 386 L718 482 L442 578 Z" fill="url(#hero-layer-top)" stroke="#74807e" strokeOpacity="0.8" />
            <path d="M190 470 L442 578 L442 607 L190 500 Z" fill="url(#hero-layer-side)" stroke="#4c5758" strokeOpacity="0.68" />
            <path d="M442 578 L718 482 L718 511 L442 607 Z" fill="#182022" stroke="#4c5758" strokeOpacity="0.68" />
            <path d="M230 476 L442 566 L678 485" fill="none" stroke="#a3aaa1" strokeOpacity="0.22" strokeWidth="1.2" />
            <text x="494" y="520" fill="#c9c5b9" fontSize="12" letterSpacing="2.4">DATA &amp; INTEGRATIONS</text>
            <circle cx="655" cy="495" r="4" fill="#f0b765" />
          </g>

          <g data-art-layer>
            <path d="M202 402 L478 318 L730 414 L454 510 Z" fill="url(#hero-layer-top)" stroke="#89918a" strokeOpacity="0.84" />
            <path d="M202 402 L454 510 L454 539 L202 431 Z" fill="url(#hero-layer-side)" stroke="#566061" strokeOpacity="0.72" />
            <path d="M454 510 L730 414 L730 443 L454 539 Z" fill="#1a2325" stroke="#566061" strokeOpacity="0.72" />
            <path d="M242 408 L454 498 L690 417" fill="none" stroke="#c0bcae" strokeOpacity="0.24" strokeWidth="1.2" />
            <text x="511" y="451" fill="#e0dbcf" fontSize="12" letterSpacing="2.4">DOMAIN LOGIC</text>
            <circle cx="676" cy="427" r="4" fill="#f0b765" />
          </g>
        </g>

        <g data-art-connectors fill="none" stroke="#f0b765" strokeOpacity="0.55" strokeWidth="1.5">
          <path d="M348 338 L348 407" />
          <path d="M514 326 L514 388" />
          <path d="M620 300 L620 354" />
          <path d="M348 430 L348 475" strokeOpacity="0.34" />
          <path d="M514 450 L514 483" strokeOpacity="0.34" />
          <circle cx="348" cy="407" r="4" fill="#f0b765" stroke="none" />
          <circle cx="514" cy="388" r="4" fill="#f0b765" stroke="none" />
          <circle cx="620" cy="354" r="4" fill="#f0b765" stroke="none" />
          <circle cx="348" cy="475" r="3" fill="#f0b765" stroke="none" opacity="0.5" />
          <circle cx="514" cy="483" r="3" fill="#f0b765" stroke="none" opacity="0.5" />
        </g>

        <g data-art-interface filter="url(#hero-screen-shadow)" transform="rotate(-7 466 194)">
          <rect x="210" y="65" width="510" height="270" rx="12" fill="url(#hero-screen-surface)" stroke="#fbf8ef" strokeOpacity="0.88" />
          <path d="M210 112 H720" stroke="#b7b1a4" strokeOpacity="0.8" />
          <rect x="232" y="84" width="7" height="7" fill="#b8680c" />
          <rect x="246" y="84" width="7" height="7" fill="#b9b2a5" />
          <rect x="260" y="84" width="7" height="7" fill="#b9b2a5" />
          <rect x="660" y="84" width="35" height="6" rx="3" fill="#b9b2a5" />

          <text x="239" y="148" fill="#202729" fontSize="22" fontWeight="500" letterSpacing="-0.7">Product experience</text>
          <text x="239" y="169" fill="#74766f" fontSize="10" letterSpacing="0.7">A clear surface for complex work</text>

          <rect x="239" y="188" width="136" height="51" rx="5" fill="#e3ded2" />
          <rect x="389" y="188" width="136" height="51" rx="5" fill="#e3ded2" />
          <rect x="539" y="188" width="151" height="51" rx="5" fill="#e3ded2" />
          <rect x="252" y="201" width="58" height="5" rx="2.5" fill="#8b8b82" />
          <rect x="252" y="216" width="91" height="9" rx="2" fill="#414a49" />
          <rect x="402" y="201" width="68" height="5" rx="2.5" fill="#8b8b82" />
          <rect x="402" y="216" width="82" height="9" rx="2" fill="#414a49" />
          <rect x="552" y="201" width="71" height="5" rx="2.5" fill="#8b8b82" />
          <rect x="552" y="216" width="96" height="9" rx="2" fill="#414a49" />

          <rect x="239" y="252" width="451" height="60" rx="5" fill="#e3ded2" />
          <path d="M251 268 H678 M251 283 H678 M251 298 H678" stroke="#b9b6ac" strokeOpacity="0.8" strokeWidth="1" />
          <path d="M255 295 C300 286 321 292 352 274 S407 281 438 265 S485 282 521 262 S580 274 613 257 S654 264 675 249" fill="none" stroke="#b8680c" strokeWidth="2.7" strokeLinecap="round" />
          <path d="M255 295 C300 286 321 292 352 274 S407 281 438 265 S485 282 521 262 S580 274 613 257 S654 264 675 249" fill="none" stroke="#b8680c" strokeOpacity="0.25" strokeWidth="10" filter="url(#hero-amber-glow)" />
        </g>

        <g data-art-signal>
          <circle cx="300" cy="218" r="12" fill="#f0b765" opacity="0.16" filter="url(#hero-amber-glow)" />
          <circle cx="300" cy="218" r="5" fill="#f0b765" />
          <circle cx="635" cy="590" r="10" fill="#f0b765" opacity="0.16" filter="url(#hero-amber-glow)" />
          <circle cx="635" cy="590" r="3.5" fill="#f0b765" />
        </g>
      </svg>
      <p className="hero-system-art__caption">
        The interface is visible. The system makes it work.
      </p>
    </div>
  );
}

export function IntroductionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          "[data-hero-art]",
          { autoAlpha: 0, y: 24, scale: 0.975 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.05 },
          0
        )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 108 },
          { yPercent: 0, duration: 0.92, stagger: 0.12 },
          0.12
        )
        .fromTo(
          "[data-hero-intro]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          0.58
        )
        .fromTo(
          "[data-hero-brand]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.62 },
          0.72
        )
        .fromTo(
          "[data-hero-links]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.58 },
          0.86
        )
        .fromTo(
          "[data-hero-identity]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.55 },
          1.02
        )
        .fromTo(
          "[data-art-layer]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.13, ease: "power2.out" },
          0.2
        )
        .fromTo(
          "[data-art-interface]",
          { autoAlpha: 0, y: 20, rotate: -10 },
          { autoAlpha: 1, y: 0, rotate: -7, duration: 0.95, ease: "power2.out" },
          0.42
        )
        .to(
          "[data-art-trace] path:first-child",
          { strokeDashoffset: 0, duration: 1.55, ease: "power1.inOut" },
          0.48
        )
        .fromTo(
          "[data-art-pixels] rect",
          { autoAlpha: 0, scale: 0.35, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.38, stagger: 0.025, ease: "back.out(1.5)" },
          0.62
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-band="dark"
      className="hero-shell"
    >
      <div id="about" className="hero-shell__inner">
        <div className="hero-shell__copy">
          <h1 className="hero-shell__title">
            <span className="hero-shell__title-mask">
              <span data-hero-line>The interface</span>
            </span>
            <span className="hero-shell__title-mask">
              <span data-hero-line>is only the</span>
            </span>
            <span className="hero-shell__title-mask hero-shell__title-mask--accent">
              <span data-hero-line>beginning.</span>
            </span>
          </h1>

          <p data-hero-intro className="hero-shell__intro">
            I’m {PROFILE.displayName}, a {PROFILE.positioning}. {PROFILE.introduction}
          </p>

          <p data-hero-brand className="hero-shell__brand">
            {PROFILE.brandLine}
          </p>

          <div data-hero-links className="hero-shell__links">
            <a href="#work" className="hero-link hero-link--primary">
              Explore selected work <span aria-hidden="true">↗</span>
            </a>
            <a href="/cv" className="hero-link hero-link--secondary">
              View résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div data-hero-identity className="hero-shell__identity">
            <span>{PROFILE.displayName}</span>
            <span className="hero-shell__identity-divider" aria-hidden="true" />
            <span>{SITE_META.location}</span>
            <span className="hero-shell__identity-spacer" />
            <a href="#story">Scroll to explore <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div data-hero-art className="hero-shell__art">
          <HeroSystemArtwork />
        </div>
      </div>
    </section>
  );
}
