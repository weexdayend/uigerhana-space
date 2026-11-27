import { EXPERIENCE } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-band="light"
      aria-labelledby="experience-title"
      className="atlas-experience"
    >
      <div className="atlas-experience__container">
        <header className="atlas-experience__header">
          <div className="atlas-experience__heading">
            <p className="atlas-experience__eyebrow">
              <span>04</span>
              <span aria-hidden="true">/</span>
              <span>Professional experience</span>
            </p>
            <h2 id="experience-title">
              Building across products,
              <br />
              platforms, and systems.
            </h2>
          </div>
          <p className="atlas-experience__introduction">
            My professional experience combines enterprise systems and
            cybersecurity engineering with co-founding and leading software
            engineering work. The two role periods overlap, matching the dates
            stated in my résumé.
          </p>
        </header>

        <div className="atlas-experience__route-note">
          <span aria-hidden="true" />
          <p>Two roles · overlapping periods · résumé-backed details</p>
        </div>

        <div className="atlas-experience__roles">
          {EXPERIENCE.map((role, index) => (
            <article
              key={role.id}
              className="atlas-experience__role"
              aria-labelledby={`experience-${role.id}`}
            >
              <div className="atlas-experience__role-topline">
                <span className="atlas-experience__role-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="atlas-experience__period">{role.period}</p>
              </div>

              <h3 id={`experience-${role.id}`} className="atlas-experience__role-title">
                {role.title}
              </h3>

              <div className="atlas-experience__organization">
                <p>{role.organization}</p>
                <p>{role.location}</p>
              </div>

              <p className="atlas-experience__summary">{role.summary}</p>

              <ul className="atlas-experience__highlights" aria-label={`${role.organization} role highlights`}>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
