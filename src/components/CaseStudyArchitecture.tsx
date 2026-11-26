import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyArchitecture({
  diagram,
}: {
  diagram: CaseStudy["architectureDiagram"];
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Architecture map
          </p>
          <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            {diagram.title}
          </h2>
          <p className="mt-4 text-sm leading-[1.75] text-[#121518]/65">
            {diagram.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-8 lg:flex-row lg:items-stretch">
          {diagram.stages.map((stage, index) => (
            <div key={stage.label} className="contents">
              {index > 0 && (
                <>
                  <span className="py-0.5 text-center font-mono text-lg text-[#b8680c] lg:hidden" aria-hidden="true">
                    ↓
                  </span>
                  <span className="hidden self-center px-1 font-mono text-lg text-[#b8680c] lg:block" aria-hidden="true">
                    →
                  </span>
                </>
              )}
              <article className="flex-1 border border-[#121518]/18 bg-[#ebe6db] p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a5a20]">
                  Layer 0{index + 1}
                </p>
                <h3 className="mt-3 text-lg font-normal tracking-tight">
                  {stage.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#121518]/55">
                  {stage.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[#121518]/15 pt-4">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs leading-[1.6] text-[#121518]/75">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-[#b8680c]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
