import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PUBLIC_CASE_STUDIES } from "@/data/case-studies";
import { WORK_DOMAINS } from "@/data/projects";

export function WorkSection() {
  return (
    <section
      id="work"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">
              Selected work / case studies
            </p>
            <h2 className="mt-4 max-w-[15ch] break-words text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              Engineering across complex operational domains.
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm leading-[1.75] text-[#121518]/70 sm:text-base lg:col-span-5 lg:justify-self-end">
            Project stories focus on context, decisions, implementation, and
            current state. Only work with reviewed facts and publication approval
            becomes a public case study.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {PUBLIC_CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[#121518]/18 pt-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8a5a20]">
                Work domains
              </p>
              <h3 className="mt-3 break-words text-2xl font-normal tracking-tight sm:text-3xl">
                Areas I have worked across.
              </h3>
            </div>
            <Link
              href="/work"
              className="hidden shrink-0 text-sm underline decoration-[#121518]/30 underline-offset-4 transition-colors hover:text-[#8a5a20] sm:inline"
            >
              Explore all work ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px border border-[#121518]/18 bg-[#121518]/18 sm:grid-cols-2">
            {WORK_DOMAINS.map((domain) => (
              <article
                key={domain.id}
                className="flex min-w-0 min-h-[190px] flex-col justify-between bg-[#f2efe7] p-6 sm:p-8"
              >
                <span className="font-pixel text-3xl text-[#686863]">{domain.index}</span>
                <div className="mt-8">
                  <h4 className="break-words text-xl font-normal tracking-tight">{domain.title}</h4>
                  <p className="mt-3 max-w-[58ch] break-words text-sm leading-[1.7] text-[#121518]/70">{domain.description}</p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8a5a20]">{domain.context}</p>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm underline decoration-[#121518]/30 underline-offset-4 transition-colors hover:text-[#8a5a20] sm:hidden"
          >
            Explore all work ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
