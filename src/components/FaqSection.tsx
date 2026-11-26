"use client";

import React, { useState } from "react";
import { FAQ_COPY } from "@/data/site";

export function FaqSection() {
  const [openKey, setOpenKey] = useState<string | null>("01-0");

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <section
      id="faq"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        {/* Two-column header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.03em]">
              {FAQ_COPY.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[52ch] text-base leading-[1.65] text-[#121518]/75">
              {FAQ_COPY.intro}
            </p>
          </div>
        </div>

        {/* Categorized 1px-Bordered Accordion Blocks */}
        <div className="mt-14 space-y-6">
          {FAQ_COPY.groups.map((group) => (
            <div
              key={group.index}
              className="grid border border-[#121518]/22 lg:grid-cols-12"
            >
              {/* Left 28%: Pixel Numeral + Category */}
              <div className="flex items-baseline justify-between gap-4 border-b border-[#121518]/22 p-6 sm:p-8 lg:col-span-4 lg:flex-col lg:justify-start lg:border-r lg:border-b-0">
                <span className="font-pixel text-3xl font-bold leading-none text-[#121518]">
                  {group.index}
                </span>
                <h3 className="text-lg font-normal text-[#121518] lg:mt-4">
                  {group.category}
                </h3>
              </div>

              {/* Right 72%: Dashed Question Rows */}
              <div className="lg:col-span-8">
                {group.items.map((item, idx) => {
                  const key = `${group.index}-${idx}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={item.question}
                      className={
                        idx < group.items.length - 1
                          ? "border-b border-dashed border-[#121518]/22"
                          : ""
                      }
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggle(key)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-[#121518]/[0.03] sm:px-8"
                      >
                        <span className="text-base font-normal text-[#121518]">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-mono text-lg leading-none text-[#121518]/70"
                        >
                          {isOpen ? "×" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-sm leading-[1.7] text-[#121518]/80 sm:px-8">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
