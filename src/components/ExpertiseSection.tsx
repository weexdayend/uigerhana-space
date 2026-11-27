import { SKILL_GROUPS } from "@/data/skills";

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      data-band="dark"
      className="bg-[#0b0e11] py-20 text-[#e8e4d8] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#f0b765]">
              Capabilities / technical expertise
            </p>
            <h2 className="mt-4 max-w-[13ch] break-words text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              Connected disciplines. One product mindset.
            </h2>
          </div>
          <p className="max-w-[50ch] text-sm leading-[1.75] text-[#e8e4d8]/65 sm:text-base lg:col-span-6 lg:justify-self-end">
            A cross-disciplinary toolkit shaped by work across product
            experiences, enterprise applications, intelligent data workflows,
            infrastructure, and security.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-0 border-y border-[#e8e4d8]/18 lg:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => (
            <article
              key={group.id}
              className={`grid grid-cols-1 min-w-0 gap-5 border-b border-[#e8e4d8]/18 py-7 sm:grid-cols-12 sm:gap-8 lg:px-6 ${index % 2 === 0 ? "lg:border-r" : ""}`}
            >
              <div className="sm:col-span-5">
                <span className="font-mono text-xs text-[#f0b765]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 break-words text-xl font-normal tracking-tight">
                  {group.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-[#e8e4d8]/55">
                  {group.description}
                </p>
              </div>
              <div className="flex flex-wrap content-start gap-2 sm:col-span-7">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="min-w-0 max-w-full whitespace-normal break-words border border-[#e8e4d8]/20 px-3 py-1.5 font-mono text-xs text-[#e8e4d8]/80"
                  >
                    {skill}
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
