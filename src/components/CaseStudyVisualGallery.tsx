import { DitherArtThumbnail } from "@/components/PixelGraphics";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyVisualGallery({
  visuals,
}: {
  visuals: CaseStudy["visualStudies"];
}) {
  return (
    <section
      className="atlas-detail-section atlas-detail-gallery"
      aria-labelledby="case-study-gallery-title"
    >
      <div className="atlas-detail-gallery__heading">
        <header className="atlas-detail-section__intro">
          <p className="atlas-detail__section-kicker">
            Visual language / generated studies
          </p>
          <h2 id="case-study-gallery-title">
            A visual system with its own grammar.
          </h2>
        </header>
        <p>
          Generated visual assets and renderer studies from this website. These
          are not screenshots of a separate shipped product.
        </p>
      </div>

      <div className="atlas-detail-gallery__grid">
        {visuals.map((visual, index) => (
          <figure key={visual.id}>
            <div className="atlas-detail-gallery__art">
              <DitherArtThumbnail art={visual.art} featured={index === 0} />
            </div>
            <figcaption>
              <div>
                <h3>{visual.title}</h3>
                <span>{visual.label}</span>
              </div>
              <p>{visual.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
