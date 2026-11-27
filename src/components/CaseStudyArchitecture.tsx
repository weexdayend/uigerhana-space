import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyArchitecture({
  diagram,
}: {
  diagram: CaseStudy["architectureDiagram"];
}) {
  return (
    <section
      className="atlas-detail-architecture"
      aria-labelledby="case-study-architecture-title"
    >
      <div className="atlas-detail-architecture__inner">
        <header className="atlas-detail-architecture__intro">
          <p className="atlas-detail__section-kicker">
            02 / Code architecture view
          </p>
          <h2 id="case-study-architecture-title">{diagram.title}.</h2>
          <p>{diagram.description}</p>
        </header>

        <ol className="atlas-detail-architecture__stages">
          {diagram.stages.map((stage, index) => (
            <li key={stage.label}>
              <p className="atlas-detail-architecture__stage-index">
                Layer {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{stage.label}</h3>
              <p className="atlas-detail-architecture__stage-description">
                {stage.description}
              </p>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="atlas-detail-architecture__note">
          Source-structure illustration · Not deployment or infrastructure topology
        </p>
      </div>
    </section>
  );
}
