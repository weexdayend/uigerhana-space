export interface ExperienceRole {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

export const EXPERIENCE: ExperienceRole[] = [
  {
    id: "saptakarya",
    title: "Co-Founder & Lead Software Engineer",
    organization: "Saptakarya",
    location: "Bandung, Indonesia",
    period: "2021 — Present",
    summary:
      "Co-founded and led software engineering work across enterprise data workflows, operational platforms, and business applications.",
    highlights: [
      "Designed automated data-extraction and reporting workflows for hydropower operations.",
      "Developed monitoring and data-visualization systems for distribution and logistics workflows.",
      "Led architecture and end-to-end delivery for a municipal waste-management application, and architected the core system for an F&B point-of-sale platform.",
      "Engineered business platforms spanning HRM, CRM, accounting journals, ERP, and analytics middleware.",
      "Designed modular ERP architecture with distinct business domains, services, and databases.",
      "Built an AI-assisted UI/UX auditing framework on Bun, orchestrating 14 parallel agents for layout analysis and heuristic reasoning.",
    ],
  },
  {
    id: "infomedia",
    title: "Information Systems & Cybersecurity Engineer",
    organization: "Infomedia Nusantara (Telkom Group)",
    location: "Bandung, Indonesia",
    period: "2017 — Present",
    summary:
      "Worked across enterprise information systems, cybersecurity, network monitoring, data operations, and intelligent automation.",
    highlights: [
      "Engineered AI-assisted data-reporting automation and an intelligent ChatAI assistant using NER, BERT, and LLM integrations.",
      "Developed transaction-intelligence workflows that transform unstructured business and financial data into structured canonical data.",
      "Contributed to backend architecture and integrations for a public-sector digital platform in West Java.",
      "Built field-reporting workflows for identifying, logging, and resolving physical network infrastructure issues.",
      "Designed SNMP-based monitoring platforms for Metro and OLT devices, with real-time dashboards and uptime/downtime alerts.",
      "Developed secure internal systems and policy-driven Data Loss Prevention (DLP) solutions.",
    ],
  },
];
