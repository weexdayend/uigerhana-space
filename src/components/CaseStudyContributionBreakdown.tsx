import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyContributionBreakdown({
  contributions,
}: {
  contributions: CaseStudy["contributions"];
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Contribution breakdown
          </p>
          <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            The work behind the experience.
          </h2>
          <p className="mt-4 text-sm leading-[1.75] text-[#121518]/65">
            The responsibilities represented in this personal project. These
            are workstreams, not percentage or effort estimates.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t border-[#121518]/18">
            {contributions.map((item, index) => (
              <li
                key={item.area}
                className="grid gap-3 border-b border-[#121518]/18 py-5 sm:grid-cols-[54px_190px_1fr] sm:gap-5"
              >
                <span className="font-pixel text-2xl text-[#b8680c]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium tracking-tight">
                  {item.area}
                </h3>
                <p className="text-sm leading-[1.7] text-[#121518]/70">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
