import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyTechnologyMap({
  groups,
}: {
  groups: CaseStudy["technologyGroups"];
}) {
  return (
    <section
      className="atlas-detail-section atlas-detail-technology"
      aria-labelledby="case-study-technology-title"
    >
      <div className="atlas-detail-section__layout">
        <header className="atlas-detail-section__intro">
          <p className="atlas-detail__section-kicker">04 / Technology map</p>
          <h2 id="case-study-technology-title">Tools mapped to their role.</h2>
          <p>
            Technologies are grouped by the part of the website they support,
            rather than shown as an undifferentiated logo wall.
          </p>
        </header>

        <div className="atlas-detail-technology__grid">
          {groups.map((group, index) => (
            <article key={group.category}>
              <p className="atlas-detail-technology__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{group.category}</h3>
              <p className="atlas-detail-technology__purpose">{group.purpose}</p>
              <ul>
                {group.technologies.map((technologyName) => (
                  <li key={technologyName}>{technologyName}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
