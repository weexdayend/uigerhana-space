import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PUBLIC_CASE_STUDIES } from "@/data/case-studies";
import { WORK_DOMAINS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Selected product and engineering work by Irvan Gerhana, Product Engineer.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] text-[#121518]">
      <header className="border-b border-[#121518]/18">
        <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-10">
          <Link href="/" className="text-sm text-[#585f5e] transition-colors hover:text-[#8a5a20]">
            ← UI Gerhana
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-5 py-16 sm:px-10 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">
          Portfolio / Selected work
        </p>
        <h1 className="mt-5 max-w-[15ch] text-[clamp(2.8rem,7vw,6rem)] font-normal leading-[0.94] tracking-[-0.065em]">
          Work shaped by real problems.
        </h1>
        <p className="mt-7 max-w-[62ch] text-base leading-[1.8] text-[#121518]/70">
          A selection of product and engineering work, presented with context
          around the problem, approach, implementation, and current state.
          Project-specific details are published only when they are ready to be
          shared.
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {PUBLIC_CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#121518]/18 bg-[#ebe6db]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-10 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">
            Work domains
          </p>
          <h2 className="mt-4 max-w-[15ch] text-3xl font-normal leading-tight tracking-[-0.045em] sm:text-4xl">
            Areas I have worked across.
          </h2>
          <div className="mt-10 grid gap-0 border-t border-[#121518]/18 sm:grid-cols-2">
            {WORK_DOMAINS.map((domain) => (
              <article key={domain.id} className="border-b border-[#121518]/18 py-6 sm:px-5">
                <span className="font-pixel text-2xl text-[#8a5a20]">{domain.index}</span>
                <h3 className="mt-3 text-xl font-normal tracking-tight">{domain.title}</h3>
                <p className="mt-2 max-w-[54ch] text-sm leading-[1.7] text-[#121518]/70">{domain.description}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8a5a20]">{domain.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1180px] flex-col justify-between gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:px-10">
        <span className="text-[#585f5e]">Irvan Gerhana · Product Engineer</span>
        <Link href="/cv" className="transition-colors hover:text-[#8a5a20]">View résumé ↗</Link>
      </footer>
    </main>
  );
}
