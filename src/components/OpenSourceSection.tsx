import React from "react";
import { OPENSOURCE_COPY, SITE_META } from "@/data/site";

export function OpenSourceSection() {
  return (
    <section
      id="open-source"
      data-band="dark"
      className="bg-[#0b0e11] py-20 text-[#e8e4d8] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.03em]">
              {OPENSOURCE_COPY.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[50ch] text-sm leading-[1.65] text-[#e8e4d8]/65 sm:text-[15px]">
              {OPENSOURCE_COPY.intro}
            </p>
          </div>
        </div>

        {/* Browser-window card with hatched drop shadow */}
        <div className="relative mt-14 pb-2.5 pl-2.5">
          <div
            aria-hidden="true"
            className="hatch-pattern pointer-events-none absolute inset-y-2.5 top-2.5 right-2.5 bottom-0 left-0 border border-[#e8e4d8]/20"
          />

          <div className="relative overflow-hidden border border-[#121518]/18 bg-[#f2efe7] text-[#121518]">
            <div className="flex">
              <div
                aria-hidden="true"
                className="hatch-pattern-light hidden w-8 shrink-0 border-r border-[#121518]/12 sm:block"
              />

              <div className="flex-1 p-5 sm:p-8">
                <div className="flex items-center justify-between border-b border-dashed border-[#121518]/16 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                      <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                      <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                    </div>
                    <a
                      href={SITE_META.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 font-mono text-sm text-[#121518] hover:underline"
                    >
                      github/irvangerhana
                    </a>
                  </div>
                  <span className="font-mono text-[11px] text-[#585f5e]">MIT</span>
                </div>

                <div className="relative mt-5 space-y-4 sm:pl-5">
                  <div
                    aria-hidden="true"
                    className="absolute top-1 bottom-1 left-0 hidden border-l border-dashed border-[#121518]/20 sm:block"
                  />

                  {OPENSOURCE_COPY.items.map((item) => (
                    <div
                      key={item.name}
                      className="relative grid items-center gap-3 border border-[#121518]/16 p-4 lg:grid-cols-12"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 -left-5 hidden w-5 border-t border-dashed border-[#121518]/20 sm:block"
                      />
                      <div className="lg:col-span-4">
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-[#121518] hover:underline"
                        >
                          {item.name}
                        </a>
                        <div className="mt-0.5 font-mono text-[11px] text-[#585f5e]">{item.docsNote}</div>
                      </div>
                      <p className="text-sm leading-relaxed text-[#121518]/75 lg:col-span-6">
                        {item.description}
                      </p>
                      <div className="flex justify-start lg:col-span-2 lg:justify-end">
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0b0e11] px-3.5 py-1.5 text-xs text-[#e8e4d8] transition-colors hover:bg-[#b8680c]"
                        >
                          View ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
