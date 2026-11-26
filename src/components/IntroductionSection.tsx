"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DitherBandCanvas } from "@/components/DitherBandCanvas";
import { PixelArrowNW, PixelMark } from "@/components/PixelGraphics";
import { PROFILE } from "@/data/profile";
import { SITE_META } from "@/data/site";

export function IntroductionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(
          "[data-hero-mark]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0
        )
        .fromTo(
          "[data-hero-title]",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.95 },
          0.12
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.28
        )
        .fromTo(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          0.48
        )
        .fromTo(
          "[data-hero-art]",
          { autoAlpha: 0, y: 24, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.05 },
          0.2
        )
        .fromTo(
          "[data-hero-meta]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          0.78
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-band="light"
      className="hero-shell relative overflow-hidden bg-[#f2efe7] text-[#121518]"
    >
      <div
        id="about"
        className="relative mx-auto grid min-h-[calc(100svh-49px)] max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-16"
      >
        <div className="relative z-10 lg:col-span-7">
          <div
            data-hero-mark
            className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#585f5e]"
          >
            <PixelMark className="h-4 w-4 text-[#b8680c]" />
            <span>{PROFILE.positioning}</span>
            <span aria-hidden="true">·</span>
            <span>{SITE_META.location}</span>
          </div>

          <h1
            data-hero-title
            className="max-w-[11ch] text-[clamp(4rem,9.1vw,9.2rem)] font-normal leading-[0.84] tracking-[-0.085em]"
          >
            From pixel
            <br />
            <span className="font-pixel text-[0.78em] font-normal tracking-[-0.075em]">
              to production.
            </span>
          </h1>

          <div data-hero-copy className="mt-9 max-w-[48ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-[#8a5a20]">
              {PROFILE.context.join(" · ")}
            </p>
            <h2 className="mt-3 text-xl font-normal leading-tight tracking-[-0.035em] sm:text-2xl">
              {PROFILE.headline}
            </h2>
            <p className="mt-4 text-sm leading-[1.8] text-[#121518]/70 sm:text-base">
              {PROFILE.introduction}
            </p>
          </div>

          <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-[#0b0e11] px-5 py-3 text-sm text-[#e8e4d8] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#b8680c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8680c] active:translate-y-0"
            >
              Explore selected work
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
            <a
              href="/cv"
              className="inline-flex items-center gap-3 border border-[#121518]/25 px-5 py-3 text-sm transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#121518]/50 hover:bg-[#121518]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8680c] active:translate-y-0"
            >
              View résumé
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            data-hero-meta
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#585f5e]"
          >
            <span>{PROFILE.experienceLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{SITE_META.timezone}</span>
            <span className="hidden h-px w-8 bg-[#121518]/25 sm:block" aria-hidden="true" />
            <a href="#story" className="group inline-flex items-center gap-2 transition-colors hover:text-[#8a5a20]">
              Enter the story
              <span className="transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div
          data-hero-art
          className="relative lg:col-span-5"
        >
          <div className="hero-art-frame">
            <div className="absolute inset-0">
              <DitherBandCanvas
                art="eclipse-horizon"
                palette="eclipse"
                baseBlock={4}
                className="h-full min-h-[300px] w-full sm:min-h-[380px] lg:min-h-[min(62svh,640px)]"
              />
            </div>
            <div className="hero-art-frame__topline">
              <span>Visual study / 01</span>
              <span>Pixel → system</span>
            </div>
            <div className="hero-art-frame__caption">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f0b765]">
                  Product · Design · Engineering
                </p>
                <p className="mt-2 max-w-[24ch] text-lg leading-snug tracking-[-0.03em] text-[#e8e4d8] sm:text-xl">
                  Good software is more than what people see.
                </p>
              </div>
              <PixelArrowNW className="h-8 w-8 shrink-0 text-[#e8e4d8]/75" />
            </div>
          </div>
          <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-[#585f5e]">
            Bayer-dithered artwork · interactive visual study
          </p>
        </div>
      </div>
    </section>
  );
}
