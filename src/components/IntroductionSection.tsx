"use client";

import { DitherBandCanvas } from "@/components/DitherBandCanvas";
import { PixelArrowNW, PixelMark } from "@/components/PixelGraphics";
import { PROFILE } from "@/data/profile";
import { SITE_META } from "@/data/site";

export function IntroductionSection() {
  return (
    <>
      <section id="top" data-band="light" className="bg-[#f2efe7] text-[#121518]">
        <div
          id="about"
          className="mx-auto grid min-h-[min(680px,calc(100svh-49px))] max-w-[1360px] items-end gap-12 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24"
        >
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#585f5e]">
              <PixelMark className="h-4 w-4 text-[#b8680c]" />
              <span>{PROFILE.positioning}</span>
              <span aria-hidden="true">·</span>
              <span>{SITE_META.location}</span>
            </div>

            <h1 className="max-w-[12ch] text-[clamp(3.4rem,8.6vw,8.3rem)] font-normal leading-[0.88] tracking-[-0.075em]">
              From pixel
              <br />
              <span className="font-pixel text-[0.82em] tracking-[-0.07em]">to production.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#b8680c]">
              Independent · Founder · Product Builder
            </p>
            <h2 className="mt-4 text-2xl font-normal leading-tight tracking-[-0.04em] sm:text-3xl">
              {PROFILE.headline}
            </h2>
            <p className="mt-5 max-w-[48ch] text-sm leading-[1.75] text-[#121518]/75 sm:text-base">
              {PROFILE.introduction}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-3 bg-[#0b0e11] px-5 py-3 text-sm text-[#e8e4d8] transition-colors hover:bg-[#b8680c]"
              >
                Explore selected work <span aria-hidden="true">↗</span>
              </a>
              <a
                href="/cv"
                className="inline-flex items-center gap-3 border border-[#121518]/25 px-5 py-3 text-sm transition-colors hover:bg-[#121518]/[0.05]"
              >
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#585f5e]">
              <span>{PROFILE.experienceLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{SITE_META.timezone}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        data-band="dark"
        aria-label="Product engineering visual"
        className="border-y border-[#e8e4d8]/15 bg-[#0b0e11] text-[#e8e4d8]"
      >
        <div className="mx-auto grid max-w-[1360px] lg:grid-cols-12">
          <div className="min-h-[260px] border-b border-[#e8e4d8]/15 sm:min-h-[340px] lg:col-span-8 lg:border-r lg:border-b-0">
            <DitherBandCanvas
              art="eclipse-horizon"
              palette="eclipse"
              baseBlock={4}
              className="h-[260px] w-full sm:h-[340px] lg:h-[440px]"
            />
          </div>
          <div className="flex flex-col justify-between gap-12 p-6 sm:p-9 lg:col-span-4 lg:p-10">
            <PixelArrowNW className="h-10 w-10 text-[#e8e4d8]/75" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#f0b765]">
                Product · Design · Engineering
              </p>
              <p className="mt-4 max-w-[28ch] text-xl leading-snug tracking-[-0.03em] sm:text-2xl">
                {PROFILE.philosophy}
              </p>
              <a
                href="#experience"
                className="mt-8 inline-flex items-center gap-3 text-sm text-[#e8e4d8]/65 transition-colors hover:text-[#f0b765]"
              >
                Explore my experience <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
