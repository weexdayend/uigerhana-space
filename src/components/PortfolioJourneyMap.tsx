import Link from "next/link";

const ROUTE_STAGES = [
  {
    label: "01 / Orient",
    href: "/",
    route: "Homepage",
    title: "Understand the person and the point of view.",
    description:
      "The Product Engineer positioning, working principles, and narrative establish one coherent introduction.",
  },
  {
    label: "02 / Explore",
    href: "/work",
    route: "Selected work",
    title: "See the problem spaces and public evidence.",
    description:
      "The work index separates the approved public case study from generalized experience domains.",
  },
  {
    label: "03 / Inspect",
    href: "/work/uigerhana-space",
    route: "Case study",
    title: "Follow a project from intent to implementation.",
    description:
      "The detail view connects context, contribution, source structure, current state, and technical choices.",
  },
  {
    label: "04 / Continue",
    href: "/cv",
    route: "Résumé",
    title: "Review professional depth and history.",
    description:
      "The online résumé brings together source-backed experience, capabilities, certifications, and publications.",
  },
] as const;

export function PortfolioJourneyMap() {
  return (
    <section className="atlas-project-map" aria-labelledby="atlas-project-map-title">
      <div className="atlas-project-map__inner">
        <div className="atlas-project-map__layout">
          <header className="atlas-project-map__intro">
            <p className="atlas-project-map__kicker">01 / The visitor route</p>
            <h2 className="atlas-project-map__title" id="atlas-project-map-title">
              One identity. A connected route through the work.
            </h2>
            <p className="atlas-project-map__description">
              The platform is organized around the questions a visitor needs
              answered: who is behind the work, what has been built, how the
              work is approached, and where to understand the professional
              background in more depth.
            </p>
          </header>

          <ol className="atlas-project-map__sequence">
            {ROUTE_STAGES.map((stage) => (
              <li className="atlas-project-map__stage" key={stage.href}>
                <span className="atlas-project-map__node" aria-hidden="true" />
                <div className="atlas-project-map__stage-content">
                  <div className="atlas-project-map__stage-meta">
                    <p className="atlas-project-map__stage-index">{stage.label}</p>
                    <Link className="atlas-project-map__route" href={stage.href}>
                      {stage.route} ↗
                    </Link>
                  </div>
                  <h3 className="atlas-project-map__stage-title">{stage.title}</h3>
                  <p className="atlas-project-map__stage-description">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="atlas-project-map__note">
            Current public surface · Four connected routes · One approved public case study
          </p>
        </div>
      </div>
    </section>
  );
}
