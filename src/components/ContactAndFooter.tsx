import { PROFILE } from "@/data/profile";
import { SITE_META } from "@/data/site";

export function ContactAndFooter() {
  return (
    <footer data-band="dark" className="bg-[#0b0e11] text-[#e8e4d8]">
      <section id="contact" className="mx-auto grid max-w-[1360px] gap-10 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#f0b765]">Next / Conversation</p>
          <h2 className="mt-4 max-w-[15ch] text-[clamp(2.1rem,4vw,4rem)] font-normal leading-[1.02] tracking-[-0.055em]">
            Good work starts with a clear understanding of the problem.
          </h2>
        </div>
        <div className="flex flex-col items-start justify-end lg:col-span-5">
          <p className="max-w-[48ch] text-sm leading-[1.8] text-[#e8e4d8]/65 sm:text-base">
            I’m interested in thoughtful conversations around product development, enterprise workflows, software architecture, and technical collaboration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/cv" className="bg-[#f2efe7] px-5 py-3 text-sm text-[#121518] transition-colors hover:bg-[#f0b765]">Review my résumé ↗</a>
            <a href="#work" className="border border-[#e8e4d8]/25 px-5 py-3 text-sm transition-colors hover:border-[#f0b765] hover:text-[#f0b765]">Explore work</a>
          </div>
        </div>
      </section>
      <div className="dither-band-dark h-1.5" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-10">
        <div>
          <p className="font-pixel text-xl font-bold">{SITE_META.brand}</p>
          <p className="mt-1 text-xs text-[#e8e4d8]/45">{PROFILE.displayName} · {PROFILE.positioning} · {SITE_META.location}</p>
        </div>
        <div className="flex items-center gap-5 text-xs text-[#e8e4d8]/55">
          <a href="#top" className="transition-colors hover:text-[#e8e4d8]">Back to top ↑</a>
          <a href="/cv" className="transition-colors hover:text-[#e8e4d8]">Résumé ↗</a>
        </div>
      </div>
    </footer>
  );
}
