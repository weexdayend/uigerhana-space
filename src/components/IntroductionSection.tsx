import { PROFILE } from "@/data/profile";
import { SystemAtlasRoute } from "@/components/SystemAtlasRoute";

export function IntroductionSection() {
  return (
    <section
      id="top"
      data-band="dark"
      className="hero-atlas"
      aria-labelledby="hero-title"
    >
      <div className="hero-atlas__inner">
        <div id="about" className="hero-atlas__copy">
          <p className="hero-atlas__eyebrow">
            PRODUCT ENGINEERING
            <span aria-hidden="true"> / </span>
            {PROFILE.location.toUpperCase()}
          </p>

          <h1 id="hero-title" data-hero-title className="hero-atlas__title">
            {PROFILE.headline}
          </h1>

          <p data-hero-byline className="hero-atlas__byline">
            <span>{PROFILE.displayName}</span>
            <span className="hero-atlas__byline-divider" aria-hidden="true">—</span>
            <span>{PROFILE.positioning}</span>
          </p>

          <p className="hero-atlas__brand-line">{PROFILE.brandLine}</p>

          <p data-hero-copy className="hero-atlas__description">
            {PROFILE.introduction}
          </p>

          <div data-hero-actions className="hero-atlas__actions">
            <a href="#work" className="hero-atlas__primary-link">
              Explore selected work
              <span aria-hidden="true">↗</span>
            </a>
            <a href="/cv" className="hero-atlas__secondary-link">
              View résumé
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <SystemAtlasRoute />
      </div>
    </section>
  );
}
