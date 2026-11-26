export const ENGINEERING_PRINCIPLES = [
  {
    id: "workflow-first",
    index: "01",
    title: "Start with the workflow",
    description:
      "Understand the people, decisions, data, and constraints around a problem before choosing an implementation.",
  },
  {
    id: "make-complexity-legible",
    index: "02",
    title: "Make complexity legible",
    description:
      "Use clear information architecture, canonical data models, and thoughtful interfaces to make complicated systems easier to understand.",
  },
  {
    id: "ai-with-context",
    index: "03",
    title: "Build AI with context",
    description:
      "Treat AI as part of a larger system—with business context, integration boundaries, data governance, and explainable behavior.",
  },
  {
    id: "production-minded",
    index: "04",
    title: "Think beyond the interface",
    description:
      "Consider security, monitoring, deployment, maintainability, and operational behavior as part of the product itself.",
  },
] as const;
