import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PUBLIC_CASE_STUDIES } from "@/data/case-studies";
import { WORK_DOMAINS } from "@/data/projects";

export function WorkSection() {
  return (
    <section
      id="work"
      data-band="light"
      aria-labelledby="selected-work-title"
      className="atlas-work atlas-work-section"
    >
      <div className="atlas-work__container">
        <header className="atlas-work__intro">
          <div className="atlas-work__intro-copy">
            <p className="atlas-work__eyebrow">02 / Selected work</p>
            <h2 id="selected-work-title" className="atlas-work__section-title">
              Engineering across complex operational domains.
            </h2>
          </div>
          <p className="atlas-work__intro-description">
            Project stories focus on context, decisions, implementation, and
            current state. Only work with reviewed facts and publication approval
            becomes a public case study.
          </p>
        </header>

        <div className="atlas-work__featured">
          <p className="atlas-work__eyebrow">01 / Public case study</p>
          <div className="atlas-work__featured-list">
            {PUBLIC_CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>

        <section
          className="atlas-work-domains"
          aria-labelledby="work-domains-title"
        >
          <header className="atlas-work-domains__intro">
            <div>
              <p className="atlas-work__eyebrow">Work domains / broader experience</p>
              <h3 id="work-domains-title" className="atlas-work-domains__title">
                Areas I have worked across.
              </h3>
            </div>
            <p className="atlas-work-domains__description">
              Generalized summaries derived from professional experience.
            </p>
          </header>

          <div className="atlas-work-domains__grid">
            {WORK_DOMAINS.map((domain) => (
              <article key={domain.id} className="atlas-work-domain">
                <span className="atlas-work-domain__index">{domain.index}</span>
                <div className="atlas-work-domain__body">
                  <h4 className="atlas-work-domain__title">{domain.title}</h4>
                  <p className="atlas-work-domain__description">{domain.description}</p>
                  <p className="atlas-work-domain__context">{domain.context}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="atlas-work-domains__disclosure">
            Generalized work domains; not separate public case studies.
          </p>
        </section>

        <div className="atlas-work__closing">
          <p>More evidence will appear here when its role, status, and disclosure are approved.</p>
          <Link href="/work" className="atlas-work__closing-link">
            Explore all work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
