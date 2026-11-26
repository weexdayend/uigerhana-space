import { EXPERIENCE } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#b8680c]">
              Professional experience
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              Building across products, platforms, and systems.
            </h2>
          </div>
          <p className="max-w-[50ch] text-sm leading-[1.75] text-[#121518]/70 sm:text-base lg:col-span-6 lg:justify-self-end">
            My professional experience combines enterprise systems and
            cybersecurity engineering with co-founding and leading software
            engineering work. The roles below are shown with the overlapping
            dates stated in my résumé.
          </p>
        </div>

        <div className="mt-14 border-t border-[#121518]/20">
          {EXPERIENCE.map((role, index) => (
            <article
              key={role.id}
              className="grid gap-6 border-b border-[#121518]/20 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
            >
              <div className="lg:col-span-4">
                <span className="font-pixel text-2xl text-[#b8680c]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-[#585f5e]">
                  {role.period}
                </p>
                <h3 className="mt-2 text-2xl font-normal leading-tight tracking-[-0.035em]">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm text-[#585f5e]">
                  {role.organization}
                </p>
                <p className="mt-1 text-xs text-[#585f5e]">{role.location}</p>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-[66ch] text-base leading-[1.7] text-[#121518]/80">
                  {role.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="grid grid-cols-[12px_1fr] gap-3 text-sm leading-[1.7] text-[#121518]/75"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 bg-[#b8680c]" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
