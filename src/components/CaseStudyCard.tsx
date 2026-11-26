import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group flex min-h-[280px] flex-col justify-between border border-[#121518]/18 bg-[#f2efe7] p-6 transition-colors hover:bg-[#ebe6db] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8a5a20]">
          {study.eyebrow}
        </span>
        <span className="h-2 w-2 shrink-0 bg-[#b8680c]" aria-hidden="true" />
      </div>
      <div className="mt-12">
        <h3 className="max-w-[18ch] text-2xl font-normal leading-tight tracking-[-0.04em]">
          {study.title}
        </h3>
        <p className="mt-3 max-w-[54ch] text-sm leading-[1.7] text-[#121518]/70">
          {study.summary}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#121518]/18 pt-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#585f5e]">
          {study.context}
        </span>
        <Link
          href={"/work/" + study.slug}
          className="shrink-0 text-sm underline decoration-[#121518]/30 underline-offset-4 transition-colors hover:text-[#8a5a20] hover:decoration-[#8a5a20]"
        >
          Read case study ↗
        </Link>
      </div>
    </article>
  );
}
