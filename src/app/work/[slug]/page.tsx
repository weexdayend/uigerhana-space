import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArchitecture } from "@/components/CaseStudyArchitecture";
import { CaseStudyContributionBreakdown } from "@/components/CaseStudyContributionBreakdown";
import { CaseStudyEvidenceMap } from "@/components/CaseStudyEvidenceMap";
import { CaseStudyTechnologyMap } from "@/components/CaseStudyTechnologyMap";
import { CaseStudyWorkflowMap } from "@/components/CaseStudyWorkflowMap";
import { CaseStudyVisualGallery } from "@/components/CaseStudyVisualGallery";
import { getPublicCaseStudy, PUBLIC_CASE_STUDIES } from "@/data/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const STATUS_LABELS = {
  "in-progress": "In progress",
  completed: "Completed",
  maintained: "Maintained",
} as const;

export function generateStaticParams() {
  return PUBLIC_CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getPublicCaseStudy(slug);

  if (!study) return { title: "Work" };

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: "/work/" + study.slug },
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
    },
  };
}

function ContentSection({
  id,
  heading,
  paragraphs,
  bullets,
}: {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}) {
  return (
    <section className="atlas-detail-story__section" aria-labelledby={id}>
      <h3 className="atlas-detail-story__heading" id={id}>
        {heading}
      </h3>
      <div className="atlas-detail-story__copy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {bullets && (
          <ul className="atlas-detail-story__list">
            {bullets.map((bullet) => (
              <li key={bullet}>
                <span aria-hidden="true">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getPublicCaseStudy(slug);

  if (!study) notFound();

  const storySections = [
    study.challenge,
    study.approach,
    study.implementation,
    study.currentState,
  ];

  return (
    <main className="atlas-detail" data-case-study-detail>
      <header className="atlas-detail__header">
        <nav
          className="atlas-detail__header-inner"
          aria-label="Case study navigation"
        >
          <Link className="atlas-detail__nav-link" href="/work">
            <span aria-hidden="true">←</span>
            <span>All work</span>
          </Link>
          <Link className="atlas-detail__resume-link" href="/cv">
            Résumé <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <section className="atlas-detail__hero" aria-labelledby="case-study-title">
        <div className="atlas-detail__container">
          <div className="atlas-detail__hero-meta">
            <p className="atlas-detail__eyebrow">{study.eyebrow}</p>
            <span
              className="atlas-detail__status"
              data-project-status={study.projectStatus}
            >
              <span className="atlas-detail__status-mark" aria-hidden="true" />
              {STATUS_LABELS[study.projectStatus]}
            </span>
          </div>

          <h1 className="atlas-detail__title" id="case-study-title">
            {study.title}
          </h1>
          <p className="atlas-detail__summary">{study.summary}</p>

          <dl className="atlas-detail__metadata">
            <div className="atlas-detail__metadata-item">
              <dt>Context</dt>
              <dd>{study.context}</dd>
            </div>
            <div className="atlas-detail__metadata-item">
              <dt>Role</dt>
              <dd>{study.role}</dd>
            </div>
          </dl>
        </div>
      </section>

      <article>
        <div className="atlas-detail__container">
          <CaseStudyContributionBreakdown contributions={study.contributions} />
        </div>

        <CaseStudyArchitecture diagram={study.architectureDiagram} />

        <div className="atlas-detail__container">
          {study.workflowDiagram && (
            <CaseStudyWorkflowMap workflow={study.workflowDiagram} />
          )}
          {study.evidenceMap && (
            <CaseStudyEvidenceMap evidence={study.evidenceMap} />
          )}
          {study.visualStudies.length > 0 && (
            <CaseStudyVisualGallery visuals={study.visualStudies} />
          )}

          <section
            className="atlas-detail-story"
            aria-labelledby="case-study-story-title"
          >
            <div className="atlas-detail-story__intro">
              <p className="atlas-detail__section-kicker">03 / Project story</p>
              <h2 id="case-study-story-title">From the problem to the current state.</h2>
            </div>
            <div className="atlas-detail-story__sections">
              {storySections.map((section, index) => (
                <ContentSection
                  key={section.heading}
                  id={"case-study-story-" + String(index + 1).padStart(2, "0")}
                  {...section}
                />
              ))}
            </div>
          </section>

          <CaseStudyTechnologyMap groups={study.technologyGroups} />
        </div>
      </article>

      <footer className="atlas-detail__footer">
        <div className="atlas-detail__footer-inner">
          <Link className="atlas-detail__footer-link" href="/work">
            <span aria-hidden="true">←</span>
            <span>Explore more work</span>
          </Link>
          <Link className="atlas-detail__footer-home" href="/">
            UI Gerhana <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
