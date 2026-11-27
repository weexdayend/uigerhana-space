import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyWorkflowMap({
  workflow,
}: {
  workflow: NonNullable<CaseStudy["workflowDiagram"]>;
}) {
  return (
    <section
      className="atlas-detail-section atlas-detail-workflow"
      aria-labelledby="case-study-workflow-title"
    >
      <div className="atlas-detail-workflow__heading">
        <header className="atlas-detail-section__intro">
          <p className="atlas-detail__section-kicker">
            Workflow / source-derived
          </p>
          <h2 id="case-study-workflow-title">{workflow.title}</h2>
        </header>
        <p className="atlas-detail-workflow__description">
          {workflow.description}
        </p>
      </div>

      <ol className="atlas-detail-workflow__stages">
        {workflow.stages.map((stage, index) => (
          <li key={stage.title}>
            <p>Stage {String(index + 1).padStart(2, "0")}</p>
            <h3>{stage.title}</h3>
            <span>{stage.description}</span>
          </li>
        ))}
      </ol>

      <div className="atlas-detail-workflow__branches">
        <p className="atlas-detail__section-kicker">
          {workflow.branchHeading ?? "Workflow paths"}
        </p>
        <div>
          {workflow.branches.map((branch) => (
            <article key={branch.title}>
              <h3>{branch.title}</h3>
              <p className="atlas-detail-workflow__branch-description">
                {branch.description}
              </p>
              <ol>
                {branch.steps.map((step, index) => (
                  <li key={step}>
                    <span>{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="atlas-detail-workflow__outcome">{branch.outcome}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="atlas-detail-workflow__guardrails">
        <p className="atlas-detail__section-kicker">
          Guardrails and edge cases
        </p>
        <ul>
          {workflow.safeguards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
