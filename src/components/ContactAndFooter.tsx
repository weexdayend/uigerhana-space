import { PROFILE } from "@/data/profile";
import { SITE_META } from "@/data/site";
import { PUBLIC_PROFILES } from "@/data/writing";

export function ContactAndFooter() {
  return (
    <footer className="atlas-contact-footer" data-band="dark">
      <section
        id="contact"
        className="atlas-contact"
        aria-labelledby="contact-title"
      >
        <div className="atlas-contact__container">
          <div className="atlas-contact__content">
            <div className="atlas-contact__copy">
              <p className="atlas-contact__eyebrow">
                <span>07 /</span>
                Next — Conversation
              </p>
              <h2 id="contact-title" className="atlas-contact__title">
                Good work starts with a clear understanding of the problem.
              </h2>
            </div>

            <div className="atlas-contact__invitation">
              <p className="atlas-contact__introduction">
                I’m interested in thoughtful conversations around product
                development, enterprise workflows, software architecture, and
                technical collaboration.
              </p>

              <div className="atlas-contact__actions">
                <a className="atlas-contact__action atlas-contact__action--primary" href="/cv">
                  Review my résumé
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="atlas-contact__action atlas-contact__action--secondary" href="#work">
                  Explore work
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="atlas-contact__footer">
            <div className="atlas-contact__identity">
              <a
                className="atlas-contact__brand"
                href="#top"
                aria-label={SITE_META.brand + " home"}
              >
                GERHANA
                <span aria-hidden="true">↗</span>
              </a>
              <p>
                {PROFILE.displayName}
                <span aria-hidden="true"> · </span>
                {PROFILE.positioning}
                <span aria-hidden="true"> · </span>
                {SITE_META.location}
              </p>
            </div>

            <nav
              className="atlas-contact__navigation"
              aria-label="Public profiles and site links"
            >
              {PUBLIC_PROFILES.map((profile) => (
                <a
                  className="atlas-contact__profile-link"
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.label + " " + profile.handle + " (opens in a new tab)"}
                >
                  <span>{profile.label}</span>
                  <span className="atlas-contact__profile-handle">{profile.handle}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a className="atlas-contact__profile-link" href="/cv">
                <span>Résumé</span>
                <span aria-hidden="true">↗</span>
              </a>
            </nav>

            <p className="atlas-contact__availability">
              No direct public contact channel is listed.
            </p>
            <a className="atlas-contact__back-to-top" href="#top">
              Back to top ↑
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
