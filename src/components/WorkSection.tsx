"use client";

import React, { useEffect, useState } from "react";
import { WORK_COPY } from "@/data/site";
import { EnvelopeWireframe, MetricCube, PixelQuote } from "@/components/PixelGraphics";

interface ModalData {
  title: string;
  problem: string;
  architecture: string;
  outcomes: string[];
  stack: string[];
}

export function WorkSection() {
  const [modal, setModal] = useState<ModalData | null>(null);
  const { featured, secondary } = WORK_COPY;

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <section
      id="work"
      data-band="light"
      className="border-t border-[#121518]/10 bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.03em]">
              {WORK_COPY.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[50ch] text-sm leading-[1.65] text-[#121518]/70 sm:text-[15px]">
              {WORK_COPY.intro}
            </p>
          </div>
        </div>

        <div className="mt-14 border border-dashed border-[#121518]/24">
          {/* Row 1: Featured */}
          <div className="grid border-b border-dashed border-[#121518]/24 lg:grid-cols-12">
            <div className="flex flex-col justify-center gap-3 border-b border-dashed border-[#121518]/24 bg-[#ebe6db] p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
              {featured.metrics.map((m) => (
                <MetricCube key={m.label} value={m.value} label={m.label} />
              ))}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8 lg:p-10">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-normal tracking-tight">{featured.client}</h3>
                  <PixelQuote className="h-5 w-7 shrink-0 text-[#121518]/70" />
                </div>
                <blockquote className="mt-5 max-w-[56ch] text-[15px] leading-[1.7] text-[#121518]/80">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#121518]/20 pt-5">
                <span className="text-sm text-[#585f5e]">{featured.attribution}</span>
                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      title: featured.client,
                      problem: featured.problem,
                      architecture: featured.architecture,
                      outcomes: featured.outcomes,
                      stack: featured.stack,
                    })
                  }
                  className="cursor-pointer text-sm text-[#121518] underline decoration-[#121518]/30 underline-offset-4 hover:decoration-[#b8680c]"
                >
                  Read case study ↗
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Secondary + CTA */}
          <div className="grid lg:grid-cols-12">
            <div className="grid gap-5 border-b border-dashed border-[#121518]/24 p-6 sm:grid-cols-12 sm:items-center sm:p-8 lg:col-span-6 lg:border-r lg:border-b-0">
              <div className="sm:col-span-4">
                <div className="font-pixel text-5xl font-bold leading-none">{secondary.headlineStat}</div>
                <div className="mt-2 text-xs text-[#585f5e]">{secondary.statLabel}</div>
              </div>
              <div className="border-t border-dashed border-[#121518]/20 pt-4 sm:col-span-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                <p className="text-sm leading-[1.65] text-[#121518]/80">&ldquo;{secondary.quote}&rdquo;</p>
                <div className="mt-3 text-xs text-[#585f5e]">{secondary.attribution}</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 bg-[#0b0e11] p-6 text-[#e8e4d8] sm:p-8 lg:col-span-6">
              <div>
                <h3 className="text-2xl font-normal tracking-tight">Have a product to ship?</h3>
                <a
                  href="#contact"
                  className="mt-5 inline-block bg-[#f2efe7] px-5 py-2.5 text-sm text-[#121518] transition-colors hover:bg-[#f0b765]"
                >
                  Get in touch
                </a>
              </div>
              <EnvelopeWireframe className="hidden h-20 w-24 shrink-0 text-[#e8e4d8] sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0e11]/70 p-4 backdrop-blur-xs"
          onClick={() => setModal(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto border border-[#121518]/20 bg-[#f2efe7] p-6 text-[#121518] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#121518]/20 pb-4">
              <h3 className="text-2xl font-normal tracking-tight">{modal.title}</h3>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="cursor-pointer border border-[#121518]/20 px-2.5 py-1 text-xs hover:bg-[#121518] hover:text-[#f2efe7]"
              >
                Close ×
              </button>
            </div>
            <div className="mt-5 space-y-5 text-sm leading-relaxed">
              <div>
                <h4 className="font-medium">Context</h4>
                <p className="mt-1 text-[#121518]/75">{modal.problem}</p>
              </div>
              <div>
                <h4 className="font-medium">Architecture</h4>
                <p className="mt-1 text-[#121518]/75">{modal.architecture}</p>
              </div>
              <div>
                <h4 className="font-medium">Outcomes</h4>
                <ul className="mt-1.5 space-y-1.5 text-[#121518]/80">
                  {modal.outcomes.map((o) => (
                    <li key={o}>— {o}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-dashed border-[#121518]/20 pt-4">
                {modal.stack.map((s) => (
                  <span key={s} className="border border-[#121518]/16 px-2.5 py-0.5 font-mono text-xs text-[#121518]/75">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
