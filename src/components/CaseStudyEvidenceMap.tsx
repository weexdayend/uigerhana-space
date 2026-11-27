import type { CaseStudy, CaseStudyEvidenceStatus } from "@/data/case-studies";

const STATUS_LABELS: Record<CaseStudyEvidenceStatus, string> = {
  "source-backed": "Source-backed",
  "target-only": "Target only",
  "acceptance-open": "Acceptance open",
  "publication-pending": "Publication pending",
  "built-local": "Built locally",
  "tested-local": "Tested locally",
  "not-verified": "Not verified",
  "not-released": "Not released",
  "owner-accepted": "Owner accepted",
  "runtime-verified": "Runtime verified",
};

export function CaseStudyEvidenceMap({
  evidence,
}: {
  evidence: NonNullable<CaseStudy["evidenceMap"]>;
}) {
  return (
    <section
      className="atlas-detail-section atlas-detail-evidence"
      aria-labelledby="case-study-evidence-title"
    >
      <div className="atlas-detail-section__layout">
        <header className="atlas-detail-section__intro">
          <p className="atlas-detail__section-kicker">
            Evidence and maturity
          </p>
          <h2 id="case-study-evidence-title">
            What is proven, planned, and still open.
          </h2>
          <p>
            Each statement is classified by its source and maturity. A
            documented target is not treated as an implemented feature, and
            source presence is not the same as production acceptance.
          </p>
        </header>

        <ol className="atlas-detail-evidence__list">
          {evidence.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.claim}</h3>
                <p>{item.explanation}</p>
              </div>
              <span
                className="atlas-detail-evidence__status"
                data-evidence-status={item.status}
              >
                {STATUS_LABELS[item.status]}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
