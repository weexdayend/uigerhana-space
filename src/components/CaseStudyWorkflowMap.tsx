import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyWorkflowMap({
  workflow,
}: {
  workflow: NonNullable<CaseStudy["workflowDiagram"]>;
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Workflow / source-derived
          </p>
          <h2 className="mt-3 max-w-[18ch] text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            {workflow.title}
          </h2>
        </div>
        <p className="max-w-[52ch] text-sm leading-[1.75] text-[#121518]/65">
          {workflow.description}
        </p>
      </div>

      <ol className="mt-8 grid gap-3 lg:grid-cols-4">
        {workflow.stages.map((stage, index) => (
          <li key={stage.title} className="relative border border-[#121518]/18 bg-[#f7f4ed] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a5a20]">
                Stage {String(index + 1).padStart(2, "0")}
              </span>
              {index < workflow.stages.length - 1 && (
                <span className="hidden text-[#8a5a20]/70 lg:block" aria-hidden="true">→</span>
              )}
            </div>
            <h3 className="mt-5 text-base font-medium tracking-tight">{stage.title}</h3>
            <p className="mt-2 text-sm leading-[1.7] text-[#121518]/65">{stage.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a5a20]">
          {workflow.branchHeading ?? "Workflow paths"}
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {workflow.branches.map((branch) => (
            <article key={branch.title} className="border border-[#121518]/18 p-5 sm:p-6">
              <h3 className="text-lg font-medium tracking-tight">{branch.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-[#121518]/65">{branch.description}</p>
              <ol className="mt-5 space-y-3">
                {branch.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[24px_1fr] gap-3 text-sm leading-[1.6]">
                    <span className="flex h-6 w-6 items-center justify-center border border-[#8a5a20]/40 font-mono text-[10px] text-[#8a5a20]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-[#121518]/15 pt-4 text-sm leading-[1.7] text-[#43634c]">
                {branch.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-[#121518]/18 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a5a20]">
          Guardrails and edge cases
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {workflow.safeguards.map((item) => (
            <li key={item} className="grid grid-cols-[10px_1fr] gap-3 text-sm leading-[1.7] text-[#121518]/70">
              <span className="mt-[9px] h-1.5 w-1.5 bg-[#8a5a20]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
