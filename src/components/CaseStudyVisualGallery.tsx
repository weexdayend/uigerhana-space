import { DitherArtThumbnail } from "@/components/PixelGraphics";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyVisualGallery({
  visuals,
}: {
  visuals: CaseStudy["visualStudies"];
}) {
  return (
    <section className="border-t border-[#121518]/18 py-10 sm:py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a5a20]">
            Visual language / generated studies
          </p>
          <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
            A visual system with its own grammar.
          </h2>
        </div>
        <p className="max-w-[48ch] text-xs leading-[1.7] text-[#121518]/60">
          Generated visual assets and renderer studies from this website. These
          are not screenshots of a separate shipped product.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {visuals.map((visual, index) => (
          <figure
            key={visual.id}
            className="overflow-hidden border border-[#121518]/18 bg-[#0b0e11]"
          >
            <div className="aspect-[16/10] border-b border-[#e8e4d8]/15">
              <DitherArtThumbnail art={visual.art} featured={index === 0} />
            </div>
            <figcaption className="bg-[#f2efe7] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-normal tracking-tight">
                  {visual.title}
                </h3>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-[#8a5a20]">
                  {visual.label}
                </span>
              </div>
              <p className="mt-2 text-xs leading-[1.7] text-[#121518]/65">
                {visual.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
