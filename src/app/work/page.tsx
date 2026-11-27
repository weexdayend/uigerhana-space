import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PUBLIC_CASE_STUDIES } from "@/data/case-studies";
import { WORK_DOMAINS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Selected product and engineering work by Irvan Gerhana, Product Engineer.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  return (
    <main className="atlas-work atlas-work-index">
      <header className="atlas-route-header">
        <div className="atlas-route-header__inner">
          <Link
            href="/"
            aria-label="UI Gerhana home"
            className="atlas-route-header__brand"
          >
            <span className="atlas-route-header__mark" aria-hidden="true" />
            <span>GERHANA</span>
          </Link>
          <nav aria-label="Page navigation" className="atlas-route-header__nav">
            <Link href="/" className="atlas-route-header__link">
              Home <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/cv" className="atlas-route-header__link atlas-route-header__resume">
              View résumé <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>

      <section className="atlas-work-index__intro">
        <div className="atlas-work__container">
          <div className="atlas-work-index__hero">
            <div>
              <p className="atlas-work__eyebrow">Portfolio / Selected work</p>
              <h1 className="atlas-work-index__title">
                Work shaped by real problems.
              </h1>
            </div>
            <p className="atlas-work-index__description">
              A selection of product and engineering work, presented with
              context around the problem, approach, implementation, and current
              state. Project-specific details are published only when they are
              ready to be shared.
            </p>
          </div>

          <section
            className="atlas-work-index__case-studies"
            aria-labelledby="work-case-studies-title"
          >
            <p className="atlas-work__eyebrow">01 / Public case study</p>
            <h2 id="work-case-studies-title" className="sr-only">
              Selected case studies
            </h2>
            <div className="atlas-work-index__case-study-list">
              {PUBLIC_CASE_STUDIES.map((study) => (
                <CaseStudyCard key={study.slug} study={study} headingLevel={2} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section
        className="atlas-work-index__domains-band"
        aria-labelledby="work-index-domains-title"
      >
        <div className="atlas-work__container">
          <header className="atlas-work-domains__intro">
            <div>
              <p className="atlas-work__eyebrow">02 / Work domains</p>
              <h2 id="work-index-domains-title" className="atlas-work-domains__title">
                Areas I have worked across.
              </h2>
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
                  <h3 className="atlas-work-domain__title">{domain.title}</h3>
                  <p className="atlas-work-domain__description">{domain.description}</p>
                  <p className="atlas-work-domain__context">{domain.context}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="atlas-work-domains__disclosure">
            Generalized work domains; not separate public case studies.
          </p>
        </div>
      </section>

      <footer className="atlas-work-index__footer">
        <div className="atlas-work__container atlas-work-index__footer-inner">
          <div>
            <p className="atlas-work__eyebrow">More to come</p>
            <p className="atlas-work-index__footer-title">
              More evidence will appear here when its role, status, and disclosure are approved.
            </p>
            <p className="atlas-work-index__footer-note">
              No draft-only project detail is represented as public work.
            </p>
          </div>
          <Link href="/" className="atlas-work-index__footer-link">
            Back to introduction <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
