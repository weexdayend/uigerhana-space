import { ENGINEERING_PRINCIPLES } from "@/data/approach";

export function ProcessSection() {
  return (
    <section
      id="approach"
      data-band="dark"
      className="bg-[#0b0e11] py-20 text-[#e8e4d8] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#f0b765]">
              Engineering philosophy
            </p>
            <h2 className="mt-4 max-w-[13ch] text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              How I think about building software.
            </h2>
          </div>
          <p className="max-w-[50ch] text-sm leading-[1.75] text-[#e8e4d8]/65 sm:text-base lg:col-span-6 lg:justify-self-end">
            Principles shaped by working with enterprise data, operational
            workflows, user interfaces, intelligent automation, and production
            systems.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-[#e8e4d8]/18 bg-[#e8e4d8]/18 sm:grid-cols-2 lg:grid-cols-4">
          {ENGINEERING_PRINCIPLES.map((principle) => (
            <article
              key={principle.id}
              className="flex min-h-[240px] flex-col bg-[#0b0e11] p-6 sm:p-7"
            >
              <span className="font-pixel text-3xl text-[#f0b765]">
                {principle.index}
              </span>
              <div className="mt-auto pt-12">
                <h3 className="text-xl font-normal tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#e8e4d8]/60">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
