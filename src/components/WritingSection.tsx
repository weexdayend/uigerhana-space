import { FEATURED_WRITING, PUBLICATION_PROFILES } from "@/data/writing";

export function WritingSection() {
  return (
    <section
      id="writing"
      data-band="light"
      className="bg-[#f2efe7] py-20 text-[#121518] sm:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">
              Writing / Notes in public
            </p>
            <h2 className="mt-4 max-w-[15ch] text-[clamp(2.1rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.055em]">
              Ideas behind the systems.
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm leading-[1.75] text-[#121518]/70 sm:text-base lg:col-span-5 lg:justify-self-end">
            Writing about engineering judgment, enterprise workflows, data
            architecture, and the context that makes intelligent systems useful.
          </p>
        </div>

        <div className="mt-10 grid gap-px border border-[#121518]/18 bg-[#121518]/18 lg:grid-cols-3">
          {FEATURED_WRITING.map((article, index) => (
            <article
              key={article.id}
              className="flex min-h-[310px] flex-col bg-[#f8f6f0] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8a5a20]">
                  {article.category}
                </span>
                <span className="font-pixel text-xl text-[#686863]">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#585f5e]">
                  {article.publication} · {article.readingTime}
                </p>
                <h3 className="mt-3 text-xl font-normal leading-snug tracking-[-0.035em] sm:text-2xl">
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#8a5a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8680c]"
                  >
                    {article.title}
                    <span className="ml-2 inline-block text-sm text-[#8a5a20]" aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p className="mt-4 text-sm leading-[1.75] text-[#121518]/70">
                  {article.summary}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#121518]/15 pt-5">
                <time dateTime={article.publishedAt} className="text-xs text-[#585f5e]">
                  {article.publishedLabel}
                </time>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a5a20]">
                  Read article
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#121518]/18 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#585f5e]">More writing and public notes</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {PUBLICATION_PROFILES.map((profile) => (
              <a
                key={profile.id}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline decoration-[#121518]/25 underline-offset-4 transition-colors hover:text-[#8a5a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8680c]"
              >
                {profile.platform} {profile.handle} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
