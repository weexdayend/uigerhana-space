import { SKILL_GROUPS } from "@/data/skills";

const DISCIPLINE_LABELS = [
  "Professional expertise",
  "Technical capability",
  "Technical capability",
  "Technical capability",
  "Technical capability",
] as const;

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      data-band="dark"
      aria-labelledby="expertise-title"
      className="atlas-expertise"
    >
      <div className="atlas-expertise__container">
        <header className="atlas-expertise__header">
          <div className="atlas-expertise__heading">
            <p className="atlas-expertise__eyebrow">
              <span>02</span>
              <span aria-hidden="true">/</span>
              <span>Expertise & capabilities</span>
            </p>
            <h2 id="expertise-title">
              Connected disciplines.
              <br />
              <span>One product mindset.</span>
            </h2>
          </div>
          <p className="atlas-expertise__introduction">
            Product thinking, interface craft, and software engineering meet
            across the systems I work on. This is a map of the disciplines and
            tools I draw from—not a claim of equal depth or a list of shipped
            client projects.
          </p>
        </header>

        <div className="atlas-expertise__legend" aria-label="Capability classification">
          <span>
            <i aria-hidden="true" data-kind="expertise" />
            Professional expertise
          </span>
          <span>
            <i aria-hidden="true" data-kind="capability" />
            Technical capability
          </span>
        </div>

        <ol className="atlas-expertise__groups">
          {SKILL_GROUPS.map((group, index) => (
            <li key={group.id} className="atlas-expertise__group">
              <article aria-labelledby={`expertise-${group.id}`}>
                <div className="atlas-expertise__group-index" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="atlas-expertise__index-line" />
                  <span className="atlas-expertise__index-node" />
                </div>

                <div className="atlas-expertise__group-content">
                  <div className="atlas-expertise__group-heading">
                    <p className="atlas-expertise__kind">
                      <span aria-hidden="true" data-kind={index === 0 ? "expertise" : "capability"} />
                      {DISCIPLINE_LABELS[index]}
                    </p>
                    <h3 id={`expertise-${group.id}`}>{group.title}</h3>
                    <p className="atlas-expertise__description">{group.description}</p>
                  </div>

                  <ul className="atlas-expertise__skills" aria-label={`${group.title} skills and tools`}>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className="atlas-expertise__disclosure">
          Representative skills and technologies are drawn from the existing
          skills record. Their appearance here does not imply a separate
          published project, certification, or quantified proficiency level.
        </p>
      </div>
    </section>
  );
}
