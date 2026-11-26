import { WORK_DOMAINS } from "@/data/projects";

export function WorkSection() {
  return (
    <section
      id="work"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#b8680c]">
              Selected work / domains
            </p>
            <h2 className="mt-4 max-w-[15ch] text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              Engineering across complex operational domains.
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm leading-[1.75] text-[#121518]/70 sm:text-base lg:col-span-5 lg:justify-self-end">
            My work spans intelligent automation, transaction data, enterprise
            platforms, network systems, and operational software. These themes
            summarize areas represented in my professional experience; individual
            case studies will carry their own project context and verified details.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-[#121518]/18 bg-[#121518]/18 sm:grid-cols-2">
          {WORK_DOMAINS.map((domain) => (
            <article
              key={domain.id}
              className="flex min-h-[230px] flex-col justify-between bg-[#f2efe7] p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-pixel text-3xl text-[#121518]/25">
                  {domain.index}
                </span>
                <span className="mt-2 h-2 w-2 bg-[#b8680c]" aria-hidden="true" />
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-normal tracking-tight sm:text-2xl">
                  {domain.title}
                </h3>
                <p className="mt-3 max-w-[58ch] text-sm leading-[1.7] text-[#121518]/70">
                  {domain.description}
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8a5a20]">
                  {domain.context}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
