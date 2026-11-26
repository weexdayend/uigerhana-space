import type { CaseStudy, CaseStudyEvidenceStatus } from "@/data/case-studies";

const STATUS_LABELS: Record<CaseStudyEvidenceStatus, string> = {
  "source-backed": "Source-backed",
  "target-only": "Target only",
  "acceptance-open": "Acceptance open",
  "publication-pending": "Publication pending",
  "built-local": "Built locally",
  "tested-local": "Tested locally",
  "not-verified": "Not verified",
  "not-released": "Not released",
};

const STATUS_STYLES: Record<CaseStudyEvidenceStatus, string> = {
  "source-backed": "border-[#52745c]/35 text-[#43634c]",
  "target-only": "border-[#8a5a20]/30 text-[#8a5a20]",
  "acceptance-open": "border-[#8a5a20]/30 text-[#8a5a20]",
  "publication-pending": "border-[#121518]/20 text-[#585f5e]",
  "built-local": "border-[#8a5a20]/30 text-[#8a5a20]",
  "tested-local": "border-[#52745c]/35 text-[#43634c]",
  "not-verified": "border-[#8a5a20]/30 text-[#8a5a20]",
  "not-released": "border-[#121518]/20 text-[#585f5e]",
};

export function CaseStudyEvidenceMap({
  evidence,
}: {
  evidence: NonNullable<CaseStudy["evidenceMap"]>;
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Evidence and maturity
          </p>
          <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            What is proven, planned, and still open.
          </h2>
          <p className="mt-4 text-sm leading-[1.75] text-[#121518]/65">
            Each statement is classified by its source and maturity. A documented
            target is not treated as an implemented feature, and source presence
            is not the same as production acceptance.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="border-t border-[#121518]/18">
            {evidence.map((item) => (
              <li key={item.id} className="grid gap-3 border-b border-[#121518]/18 py-5 sm:grid-cols-[minmax(0,1fr)_150px] sm:gap-5">
                <div>
                  <h3 className="text-base font-medium tracking-tight">{item.claim}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-[#121518]/65">{item.explanation}</p>
                </div>
                <div className="sm:justify-self-end">
                  <span className={"inline-flex border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.07em] " + STATUS_STYLES[item.status]}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
