"use client";

import React, { useEffect, useState } from "react";
import { NOTES_COPY, type NoteArticle } from "@/data/site";
import { DitherArtThumbnail } from "@/components/PixelGraphics";

export function NotesSection() {
  const [activeNote, setActiveNote] = useState<NoteArticle | null>(null);
  const [featured, ...rest] = NOTES_COPY.articles;

  useEffect(() => {
    if (!activeNote) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveNote(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeNote]);

  return (
    <section
      id="notes"
      data-band="light"
      className="border-t border-[#121518]/12 bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        {/* Two-column header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.03em]">
              {NOTES_COPY.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[52ch] text-base leading-[1.65] text-[#121518]/75">
              {NOTES_COPY.intro}
            </p>
          </div>
        </div>

        {/* Asymmetric 4-col x 2-row Editorial Bento Grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {/* Featured 2x2 Card */}
          <button
            type="button"
            onClick={() => setActiveNote(featured)}
            className="group flex cursor-pointer flex-col border border-[#121518]/22 bg-[#f2efe7] text-left transition-colors hover:border-[#121518] lg:col-span-2 lg:row-span-2"
          >
            <div className="h-[220px] w-full border-b border-[#121518]/22 sm:h-[260px]">
              <DitherArtThumbnail art={featured.art} featured />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <h3 className="text-xl font-normal leading-snug tracking-tight text-[#121518] group-hover:underline sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#121518]/75">
                  {featured.excerpt}
                </p>
              </div>
              <span className="mt-6 text-xs text-[#585f5e]">
                {featured.readTime} ↗
              </span>
            </div>
          </button>

          {/* 4 Secondary Cards */}
          {rest.map((note) => (
            <button
              key={note.slug}
              type="button"
              onClick={() => setActiveNote(note)}
              className="group flex cursor-pointer flex-col border border-[#121518]/22 bg-[#f2efe7] text-left transition-colors hover:border-[#121518]"
            >
              <div className="h-[135px] w-full border-b border-[#121518]/22">
                <DitherArtThumbnail art={note.art} />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <h3 className="text-base font-normal leading-snug text-[#121518] group-hover:underline">
                  {note.title}
                </h3>
                <span className="mt-4 text-xs text-[#585f5e]">
                  {note.readTime}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeNote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0e11]/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto border border-[#121518]/25 bg-[#f2efe7] p-6 text-[#121518] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#121518]/25 pb-4">
              <div>
                <h3 id="note-modal-title" className="text-2xl font-normal leading-snug tracking-tight">
                  {activeNote.title}
                </h3>
                <div className="mt-1 text-xs text-[#585f5e]">
                  {activeNote.readTime}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveNote(null)}
                aria-label="Close note"
                className="cursor-pointer border border-[#121518]/25 px-2.5 py-1 text-xs hover:bg-[#121518] hover:text-[#f2efe7]"
              >
                Close ×
              </button>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-[1.7] text-[#121518]/85">
              {activeNote.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
