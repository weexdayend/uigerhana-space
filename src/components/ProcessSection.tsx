import React from "react";
import { PROCESS_COPY } from "@/data/site";
import { ProcessIcon } from "@/components/PixelGraphics";

export function ProcessSection() {
  return (
    <section
      id="process"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.03em]">
              {PROCESS_COPY.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[50ch] text-sm leading-[1.65] text-[#121518]/70 sm:text-[15px]">
              {PROCESS_COPY.intro}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-[#121518]/16 bg-[#121518]/16 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_COPY.steps.map((step) => (
            <div key={step.id} className="flex flex-col bg-[#f2efe7] p-6">
              <div className="flex items-center justify-between">
                <ProcessIcon id={step.id} />
                <span className="font-pixel text-xl font-bold text-[#121518]/20">
                  {String(PROCESS_COPY.steps.indexOf(step) + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-normal tracking-tight text-[#121518]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-[#121518]/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
