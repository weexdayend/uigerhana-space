"use client";

export function CvPrintButton() {
  return (
    <button
      className="resume-print-button"
      type="button"
      onClick={() => window.print()}
    >
      <span aria-hidden="true">↓</span>
      Print / Save PDF
    </button>
  );
}
