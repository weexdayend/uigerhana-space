import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyContributionBreakdown({
  contributions,
}: {
  contributions: CaseStudy["contributions"];
}) {
  return (
    <section
      className="atlas-detail-section atlas-detail-contributions"
      aria-labelledby="case-study-contributions-title"
    >
      <div className="atlas-detail-section__layout">
        <header className="atlas-detail-section__intro">
          <p className="atlas-detail__section-kicker">
            01 / Contribution breakdown
          </p>
          <h2 id="case-study-contributions-title">
            The work behind the experience.
          </h2>
          <p>
            The responsibilities represented in this personal project. These
            are workstreams, not percentage or effort estimates.
          </p>
        </header>

        <ol className="atlas-detail-contributions__list">
          {contributions.map((item, index) => (
            <li key={item.area}>
              <span className="atlas-detail-contributions__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.area}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
