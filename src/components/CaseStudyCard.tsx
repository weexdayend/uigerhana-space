import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
  headingLevel?: 2 | 3;
}

export function CaseStudyCard({
  study,
  headingLevel = 3,
}: CaseStudyCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      data-case-study-card={study.slug}
      data-project-status={study.projectStatus}
      aria-labelledby={`case-study-${study.slug}-title`}
      className="atlas-case-study"
    >
      <div className="atlas-case-study__topline">
        <p className="atlas-case-study__eyebrow">{study.eyebrow}</p>
        <span className="atlas-case-study__status" aria-hidden="true" />
      </div>

      <div className="atlas-case-study__main">
        <div className="atlas-case-study__story">
          <Heading
            id={`case-study-${study.slug}-title`}
            className="atlas-case-study__title"
          >
            {study.title}
          </Heading>
          <p className="atlas-case-study__summary">{study.summary}</p>
          <Link
            href={"/work/" + study.slug}
            className="atlas-work__action atlas-case-study__action"
          >
            Read case study <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <dl className="atlas-case-study__metadata">
          <div className="atlas-case-study__metadata-row">
            <dt>Context</dt>
            <dd>{study.context}</dd>
          </div>
          <div className="atlas-case-study__metadata-row">
            <dt>Role</dt>
            <dd>{study.role}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
