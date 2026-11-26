import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyTechnologyMap({
  groups,
}: {
  groups: CaseStudy["technologyGroups"];
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Technology map
          </p>
          <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            Tools mapped to their role.
          </h2>
          <p className="mt-4 text-sm leading-[1.75] text-[#121518]/65">
            Technologies are grouped by the part of the website they support,
            rather than shown as an undifferentiated logo wall.
          </p>
        </div>

        <div className="grid gap-px border border-[#121518]/18 bg-[#121518]/18 sm:grid-cols-2 lg:col-span-8">
          {groups.map((group, index) => (
            <article key={group.category} className="bg-[#f2efe7] p-5 sm:p-6">
              <span className="font-pixel text-2xl text-[#b8680c]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-normal tracking-tight">
                {group.category}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#121518]/55">
                {group.purpose}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="border border-[#121518]/18 px-2.5 py-1.5 font-mono text-[10px] text-[#121518]/75"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
