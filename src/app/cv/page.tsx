import type { Metadata } from "next";
import Link from "next/link";
import { CvPrintButton } from "@/components/CvPrintButton";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { CERTIFICATIONS, SKILL_GROUPS } from "@/data/skills";
import { PUBLICATION_PROFILES } from "@/data/writing";
import { SITE_META } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Professional résumé of Irvan Gerhana, Product Engineer working across product thinking, interface design, software engineering, enterprise AI, and production systems.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <main className="resume-page" data-resume-route>
      <nav className="resume-chrome" aria-label="Résumé actions">
        <div className="resume-chrome__inner">
          <Link href="/" className="resume-back-link">
            <span aria-hidden="true">←</span>
            Back to uigerhana.space
          </Link>
          <CvPrintButton />
        </div>
      </nav>

      <article className="resume-document" data-resume-document aria-labelledby="resume-name">
        <header className="resume-header">
          <p className="resume-header__eyebrow">
            <span>{PROFILE.positioning}</span>
            <span aria-hidden="true">·</span>
            <span>{SITE_META.location}</span>
          </p>
          <h1 className="resume-header__name" id="resume-name">
            {PROFILE.displayName}
          </h1>
          <p className="resume-header__context">{PROFILE.context.join(" · ")}</p>
          <p className="resume-header__summary" data-resume-summary>
            {PROFILE.summary}
          </p>
        </header>

        <section
          className="resume-section resume-section--experience"
          id="experience"
          aria-labelledby="resume-experience-heading"
        >
          <h2 className="resume-section__heading" id="resume-experience-heading">
            Professional Experience
          </h2>
          <div className="resume-experience-list">
            {EXPERIENCE.map((role) => (
              <section
                className="resume-role"
                key={role.id}
                data-resume-role={role.id}
                aria-labelledby={"resume-role-" + role.id}
              >
                <div className="resume-role__header">
                  <h3 className="resume-role__title" id={"resume-role-" + role.id}>
                    {role.title}
                  </h3>
                  <span className="resume-role__period">{role.period}</span>
                </div>
                <p className="resume-role__organization">
                  {role.organization}
                  <span aria-hidden="true"> · </span>
                  {role.location}
                </p>
                <p className="resume-role__summary">{role.summary}</p>
                <ul className="resume-role__highlights">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section
          className="resume-section"
          id="skills"
          aria-labelledby="resume-skills-heading"
        >
          <h2 className="resume-section__heading" id="resume-skills-heading">
            Technical Skills
          </h2>
          <div className="resume-skills-list">
            {SKILL_GROUPS.map((group) => (
              <div
                className="resume-skill-row"
                key={group.id}
                data-resume-skill-group={group.id}
              >
                <h3 className="resume-skill-row__label">{group.title}</h3>
                <p className="resume-skill-row__skills">{group.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="resume-section"
          id="certifications"
          aria-labelledby="resume-certifications-heading"
        >
          <h2 className="resume-section__heading" id="resume-certifications-heading">
            Certification
          </h2>
          <ul className="resume-certifications-list">
            {CERTIFICATIONS.map((certification) => (
              <li className="resume-certification" key={certification.name}>
                <span className="resume-certification__name">{certification.name}</span>
                <span className="resume-certification__issuer">{certification.issuer}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="resume-section"
          id="publications"
          aria-labelledby="resume-publications-heading"
        >
          <h2 className="resume-section__heading" id="resume-publications-heading">
            Technical Leadership &amp; Publications
          </h2>
          <p className="resume-publications__summary">
            Focus areas include Enterprise AI Engineering, AI Governance, Context Engineering,
            Canonical Data Architecture, Agentic Systems, and Distributed Software Architecture.
          </p>
          <nav className="resume-publications__links" aria-label="Publication profiles">
            {PUBLICATION_PROFILES.map((profile) => (
              <a
                className="resume-publication-link"
                key={profile.id}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.platform + ": " + profile.handle + " (opens in a new tab)"}
              >
                <span>{profile.platform}</span>
                <span className="resume-publication-link__handle">{profile.handle}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </section>

        <footer className="resume-document-footer">
          <span>{PROFILE.displayName}</span>
          <span aria-hidden="true">·</span>
          <span>{PROFILE.positioning}</span>
          <span aria-hidden="true">·</span>
          <span>{SITE_META.timezone}</span>
        </footer>
      </article>
    </main>
  );
}
