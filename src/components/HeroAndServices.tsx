"use client";

import React, { useEffect, useRef, useState } from "react";
import { HERO_COPY, SERVICES_COPY } from "@/data/site";
import { DitherBandCanvas } from "@/components/DitherBandCanvas";
import { Pixel3DStack, PixelArrowNW } from "@/components/PixelGraphics";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* ── Shared services layout (used by both desktop expanded surface and mobile flow) ── */

function ServicesContent({
  activeStep,
  serviceProgress,
  onStepClick,
  staggered,
}: {
  activeStep: number;
  serviceProgress: number;
  onStepClick: (i: number) => void;
  staggered: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-10">
      {/* Two-column header — heading left, intro right, no eyebrow */}
      <div className="grid items-end gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="max-w-[16ch] text-[clamp(1.85rem,3.3vw,2.85rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[#e8e4d8]">
            {SERVICES_COPY.heading}
          </h2>
        </div>
        <div className="lg:col-span-6">
          <p className="max-w-[50ch] text-sm leading-[1.65] text-[#e8e4d8]/65 sm:text-[15px]">
            {SERVICES_COPY.intro}
          </p>
        </div>
      </div>

      {/* Service cards (left) + Pixel 3D Stack (right) */}
      <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
        <div className="border border-[#e8e4d8]/18 lg:col-span-6">
          {SERVICES_COPY.items.map((svc, i) => {
            const active = !staggered || i === activeStep;
            const unlocked = !staggered || i <= activeStep;
            return (
              <div
                key={svc.id}
                onClick={() => staggered && onStepClick(i)}
                role={staggered ? "button" : undefined}
                tabIndex={staggered ? 0 : undefined}
                onKeyDown={
                  staggered
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onStepClick(i);
                        }
                      }
                    : undefined
                }
                className={`transition-all duration-200 ${
                  i < SERVICES_COPY.items.length - 1
                    ? "border-b border-[#e8e4d8]/18"
                    : ""
                } ${staggered ? "cursor-pointer" : ""} ${
                  active
                    ? "bg-[#131920] p-6 sm:p-7"
                    : unlocked
                      ? "bg-transparent p-5 opacity-65 hover:opacity-100"
                      : "bg-transparent p-5 opacity-30 hover:opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-1.5 w-1.5 shrink-0 ${
                      active
                        ? "bg-[#f0b765]"
                        : unlocked
                          ? "bg-[#e8e4d8]/35"
                          : "bg-[#e8e4d8]/12"
                    }`}
                  />
                  <h3 className="text-lg font-normal tracking-tight">
                    {svc.title}
                  </h3>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    active
                      ? "mt-3 max-h-44 opacity-100"
                      : staggered
                        ? "max-h-0 opacity-0"
                        : "mt-2 max-h-44 opacity-80"
                  }`}
                >
                  <p className="text-sm leading-[1.6] text-[#e8e4d8]/65">
                    {svc.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#f0b765]/80">
                      {svc.deliverable}
                    </span>
                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="border border-[#e8e4d8]/28 px-3.5 py-1.5 text-xs text-[#e8e4d8] transition-colors hover:border-[#f0b765] hover:bg-[#f0b765] hover:text-[#0b0e11]"
                    >
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center justify-center lg:flex lg:col-span-6">
          <Pixel3DStack
            activeStep={activeStep}
            progress={serviceProgress}
            className="w-full max-w-[420px]"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */

export function HeroAndServices() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setIsLg(mq.matches && !rm.matches);
    sync();
    mq.addEventListener("change", sync);

    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = runwayRef.current;
      if (!el || !mq.matches || rm.matches) return;
      const rect = el.getBoundingClientRect();
      const off = 49;
      const total = Math.max(1, el.offsetHeight - window.innerHeight + off);
      setProgress(clamp((off - rect.top) / total, 0, 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Phase derivations ── */
  // 0.00 → 0.12  hero static
  // 0.12 → 0.25  right panel expands to fullscreen (clip-path)
  // 0.25 → 1.00  services stagger with 3D stack
  const expandRaw = isLg ? clamp((progress - 0.12) / 0.13, 0, 1) : 0;
  const expand = expandRaw * expandRaw * (3 - 2 * expandRaw); // smoothstep
  const heroOp = isLg ? clamp(1 - expandRaw * 2, 0, 1) : 1;
  const svcOp = isLg ? clamp((progress - 0.22) / 0.06, 0, 1) : 1;
  const svcP = isLg ? clamp((progress - 0.25) / 0.75, 0, 1) : 0;
  const step = isLg
    ? Math.min(SERVICES_COPY.items.length - 1, Math.floor(svcP * SERVICES_COPY.items.length))
    : 0;

  // Clip-path: reveals from bottom-right corner toward full viewport
  const clipTop = (1 - expand) * 40; // %
  const clipLeft = (1 - expand) * 66; // %

  const jumpToStep = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const off = 49;
    const total = Math.max(1, el.offsetHeight - window.innerHeight + off);
    const target = 0.25 + ((i + 0.15) / SERVICES_COPY.items.length) * 0.75;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elTop - off + target * total, behavior: "smooth" });
  };

  const scrollToServices = (e: React.MouseEvent) => {
    if (!isLg || !runwayRef.current) return;
    e.preventDefault();
    const el = runwayRef.current;
    const off = 49;
    const total = Math.max(1, el.offsetHeight - window.innerHeight + off);
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elTop - off + total * 0.28, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Scroll Runway (tall on desktop, natural height on mobile) ── */}
      <div ref={runwayRef} className="relative lg:h-[520vh]" id="top">
        <div className="lg:sticky lg:top-[49px] lg:h-[calc(100svh-49px)] lg:overflow-hidden">
          {/* ── Hero Layer ── */}
          <div
            className={`flex flex-col ${isLg ? "absolute inset-0" : ""}`}
            style={isLg ? { opacity: heroOp } : undefined}
          >
            {/* Stone top band */}
            <div data-band="light" className="bg-[#f2efe7] text-[#121518]">
              <div className="mx-auto max-w-[1360px] px-5 pt-10 pb-8 sm:px-10 lg:pt-14 lg:pb-10">
                <div className="grid items-end gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <h1 className="text-[clamp(2.6rem,5.4vw,4.65rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                      {HERO_COPY.headlineLine1}
                      <br />
                      {HERO_COPY.headlineLine2}
                    </h1>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="max-w-[44ch] text-base leading-[1.6] text-[#121518]/75 sm:text-[17px]">
                      {HERO_COPY.intro}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Obsidian bottom band — fills remaining hero viewport */}
            <div
              data-band="dark"
              className="flex flex-1 flex-col border-t border-[#e8e4d8]/18 bg-[#0b0e11] text-[#e8e4d8]"
            >
              <div className="mx-auto grid w-full max-w-[1360px] flex-1 lg:grid-cols-12">
                {/* Left: dither canvas */}
                <div className="border-b border-[#e8e4d8]/18 lg:col-span-8 lg:border-r lg:border-b-0">
                  <DitherBandCanvas
                    art="eclipse-horizon"
                    palette="eclipse"
                    baseBlock={4}
                    className="h-[220px] w-full sm:h-[270px] lg:h-full"
                  />
                </div>

                {/* Right: trust + arrow + CTA (the panel that visually "expands") */}
                <div className="flex flex-col lg:col-span-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#e8e4d8]/18 px-6 py-3.5 text-xs text-[#e8e4d8]/65 sm:px-8">
                    {HERO_COPY.trustPoints.map((p, i) => (
                      <React.Fragment key={p}>
                        <span>{p}</span>
                        {i < HERO_COPY.trustPoints.length - 1 && (
                          <span className="text-[#f0b765]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <PixelArrowNW className="h-10 w-10 text-[#e8e4d8]/80" />
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <a
                        href="#services"
                        onClick={scrollToServices}
                        className="text-sm text-[#e8e4d8]/60 transition-colors hover:text-[#e8e4d8]"
                      >
                        Services ↓
                      </a>
                      <a
                        href="#contact"
                        className="bg-[#f2efe7] px-5 py-2.5 text-sm text-[#121518] transition-colors hover:bg-[#f0b765]"
                      >
                        Get in touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Expanding Obsidian Surface (desktop only) ── */}
          {/* Clip-path reveals from bottom-right corner (matching right panel position) to fullscreen */}
          {isLg && expandRaw > 0 && (
            <div
              data-band="dark"
              className="absolute inset-0 z-10 flex items-center bg-[#0b0e11]"
              style={{ clipPath: `inset(${clipTop}% 0% 0% ${clipLeft}%)` }}
            >
              <div className="w-full" style={{ opacity: svcOp }}>
                <ServicesContent
                  activeStep={step}
                  serviceProgress={svcP}
                  onStepClick={jumpToStep}
                  staggered
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Anchor for hash navigation ── */}
      <div id="services" className="scroll-mt-[49px]" />

      {/* ── Mobile Services (normal flow, no expansion) ── */}
      <section
        data-band="dark"
        className="border-t border-[#e8e4d8]/18 bg-[#0b0e11] py-16 text-[#e8e4d8] sm:py-20 lg:hidden"
      >
        <ServicesContent
          activeStep={0}
          serviceProgress={1}
          onStepClick={() => {}}
          staggered={false}
        />
      </section>
    </>
  );
}
