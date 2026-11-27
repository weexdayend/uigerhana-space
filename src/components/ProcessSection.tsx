import { ENGINEERING_PRINCIPLES } from "@/data/approach";

export function ProcessSection() {
  return (
    <section
      id="approach"
      data-band="dark"
      aria-labelledby="approach-title"
      className="atlas-approach"
    >
      <div className="atlas-approach__container">
        <header className="atlas-approach__header">
          <div className="atlas-approach__heading">
            <p className="atlas-approach__eyebrow">
              <span>05</span>
              <span aria-hidden="true">/</span>
              <span>Engineering approach</span>
            </p>
            <h2 id="approach-title">How I think about building software.</h2>
          </div>
          <p className="atlas-approach__introduction">
            Principles shaped by working with enterprise data, operational
            workflows, user interfaces, intelligent automation, and production
            systems.
          </p>
        </header>

        <div className="atlas-approach__route-heading">
          <p>Four connected principles</p>
          <span aria-hidden="true">01 — 04</span>
        </div>

        <ol className="atlas-approach__principles" aria-label="Four engineering principles">
          {ENGINEERING_PRINCIPLES.map((principle) => (
            <li key={principle.id} className="atlas-approach__principle">
              <article aria-labelledby={`approach-${principle.id}`}>
                <div className="atlas-approach__waypoint">
                  <span>{principle.index}</span>
                  <i aria-hidden="true" />
                </div>
                <div className="atlas-approach__principle-copy">
                  <h3 id={`approach-${principle.id}`}>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
