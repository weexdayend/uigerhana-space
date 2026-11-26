export interface WorkDomain {
  id: string;
  index: string;
  title: string;
  description: string;
  context: string;
}

/**
 * Generalized work domains derived from the owner-provided résumé.
 * Named client/project case studies remain out of public rendering until
 * project role, status, evidence, and disclosure permission are reviewed.
 */
export const WORK_DOMAINS: WorkDomain[] = [
  {
    id: "enterprise-ai",
    index: "01",
    title: "Enterprise AI & intelligent workflows",
    description:
      "AI-assisted reporting, intelligent assistants, and extraction workflows that turn unstructured operational and financial information into usable data.",
    context: "AI engineering · Automation · Data extraction",
  },
  {
    id: "transaction-intelligence",
    index: "02",
    title: "Transaction & operational intelligence",
    description:
      "Structured data pipelines, canonical modeling, monitoring, and reporting systems for business and operational workflows.",
    context: "Data architecture · Integration · Operational systems",
  },
  {
    id: "digital-platforms",
    index: "03",
    title: "Digital platforms & business systems",
    description:
      "Software for public services, distribution, logistics, point-of-sale operations, ERP, and internal business processes.",
    context: "Enterprise platforms · ERP · POS",
  },
  {
    id: "network-security",
    index: "04",
    title: "Network systems & information security",
    description:
      "Infrastructure reporting, SNMP-based network monitoring, operational alerts, and policy-driven information-protection systems.",
    context: "Infrastructure · Monitoring · Cybersecurity",
  },
];
