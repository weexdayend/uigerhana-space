"use client";

export function CvPrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="no-print inline-flex items-center gap-2 border border-[#121518]/25 px-4 py-2.5 text-sm transition-colors hover:bg-[#121518] hover:text-[#f2efe7]">
      <span aria-hidden="true">↓</span> Print / Save PDF
    </button>
  );
}
