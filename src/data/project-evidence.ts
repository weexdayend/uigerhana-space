/**
 * Source-grounded project evidence register.
 *
 * This file is intentionally NOT imported by public routes.
 * The repository is public, so client/product names and sensitive attribution
 * are omitted until the owner confirms disclosure permission.
 *
 * These are résumé-derived claims, not independently verified case studies.
 * No entry is publishable from this register alone.
 */
export type ProjectEvidenceContext =
  | "enterprise-engineering-role"
  | "co-founder-engineering-role";

export type ProjectEvidencePublicationState = "review-required";

export interface ProjectEvidenceSource {
  source: "owner-provided-resume";
  pages: number[];
  section: "Professional Experience";
  role: string;
  period: string;
}

export interface ProjectEvidenceRecord {
  id: string;
  title: string;
  context: ProjectEvidenceContext;
  source: ProjectEvidenceSource;
  sourceSummary: string;
  contributionAsStated: string;
  technologyEvidence: string[];
  projectStatus: "not-confirmed";
  attributionDisclosure: "not-cleared";
  publicationState: ProjectEvidencePublicationState;
  evidenceRequired: string[];
  reviewNotes: string[];
}

const COMMON_EVIDENCE_REQUIRED = [
  "Confirm the exact project timeframe and current/completed/prototype status.",
  "Confirm the owner's personal contribution and distinguish it from team delivery.",
  "Confirm which project name, client/brand attribution, and organization details may be disclosed.",
  "Provide an approved screenshot, demo, or sanitized artifact that can be shown publicly.",
  "Provide an architecture or workflow diagram that has been reviewed for confidential details.",
  "Substantiate any outcome or metric before using it; omit metrics when evidence is unavailable.",
] as const;

/**
 * All 15 workstreams below are abstracted from the supplied résumé.
 * Names of customers, products, public institutions, and brands have been
 * intentionally generalized in this public repository pending disclosure review.
 *
 * Keep these entries as review records. Do not derive public case studies
 * automatically from résumé statements.
 */
export const PROJECT_EVIDENCE_REGISTER: ProjectEvidenceRecord[] = [
  {
    id: "ai-operational-reporting",
    title: "AI-assisted operational reporting and conversational assistant",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes an AI-driven reporting automation platform and intelligent assistant intended to modernize traditional operational dashboards, with a continuous-learning pipeline for parsing unstructured financial and operational data.",
    contributionAsStated:
      "Engineered the reporting automation platform and assistant; implemented the stated extraction pipeline.",
    technologyEvidence: ["NER", "BERT", "LLMs"],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm whether both capabilities belong to one product story or should be documented separately.",
      "Review training-data, prompt, model, and financial/operational data details before disclosure.",
    ],
  },
  {
    id: "transaction-data-extraction",
    title: "Transaction data extraction and canonicalization",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes a transaction extraction system that transforms unstructured business and financial data pipelines into structured canonical data for enterprise tracking and validation.",
    contributionAsStated:
      "Architected the transaction extraction system.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm the canonical data model can be represented with synthetic or sanitized examples.",
      "Do not include customer transactions, financial records, or identifiers.",
    ],
  },
  {
    id: "public-sector-platform-integration",
    title: "Public-sector digital platform integration",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes a contribution to backend architecture and integration for an e-government platform supporting digital business and public-service transformation in West Java.",
    contributionAsStated:
      "Contributed significantly to backend architecture and integration.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm public attribution and the exact scope of the personal contribution.",
      "Do not imply sole ownership or end-to-end delivery; the source states a contribution.",
    ],
  },
  {
    id: "network-infrastructure-field-reporting",
    title: "Field reporting for physical network infrastructure",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes a field-reporting system for identifying, logging, and resolving physical network infrastructure issues on site.",
    contributionAsStated:
      "Developed the field-reporting system.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Sanitize all topology, site, location, asset, and infrastructure details.",
      "Avoid reproducing operationally sensitive examples from the source résumé.",
    ],
  },
  {
    id: "network-monitoring-alerting",
    title: "Network monitoring and operational alerting",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes network-monitoring platforms using SNMP, with real-time dashboard visualization and alerting for device uptime and downtime.",
    contributionAsStated:
      "Designed and deployed the monitoring platforms and implemented dashboard visualization and alert systems.",
    technologyEvidence: ["SNMP"],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Review with the relevant security owner before sharing device types, topology, monitoring targets, or alert behavior.",
      "Use a synthetic topology if an architecture illustration is approved.",
    ],
  },
  {
    id: "internal-security-dlp",
    title: "Internal security systems and data-loss prevention",
    context: "enterprise-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Information Systems & Cybersecurity Engineer",
      period: "2017 — Present",
    },
    sourceSummary:
      "The résumé describes secure internal systems and data-loss-prevention solutions using policy-driven controls to protect organizational information assets.",
    contributionAsStated:
      "Developed the internal systems and DLP solutions.",
    technologyEvidence: ["Data Loss Prevention (DLP)"],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Requires explicit security review. Do not disclose policies, detection rules, control gaps, or security architecture.",
    ],
  },
  {
    id: "hydropower-data-workflows",
    title: "Hydropower data extraction and reporting workflows",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes automated data-extraction pipelines and reporting workflows tailored for hydropower plants, for enterprise metric gathering and operational reporting.",
    contributionAsStated:
      "Designed and implemented the data-extraction pipelines and reporting workflows.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm client/project attribution permission and whether operational data can be represented with synthetic examples.",
    ],
  },
  {
    id: "distribution-logistics-monitoring",
    title: "Distribution logistics monitoring and data visualization",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [3],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes a monitoring dashboard and data-visualization ecosystem for tracking distribution logistics across West Java.",
    contributionAsStated:
      "Developed the monitoring dashboard and data-visualization ecosystem.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm public client attribution and permission to display distribution or location data.",
    ],
  },
  {
    id: "municipal-waste-operations",
    title: "Municipal waste-management operations application",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes a digital waste-management application intended to optimize municipal logistics and operational processes.",
    contributionAsStated:
      "Led the software architecture and end-to-end delivery.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm whether public attribution is allowed and clarify the delivery team and personal ownership boundaries.",
    ],
  },
  {
    id: "food-beverage-pos",
    title: "Food and beverage point-of-sale platform",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes an internal point-of-sale and management platform tailored for the Indonesian market, including its technical foundation and scalability.",
    contributionAsStated:
      "Architected the core internal system and oversaw its technical foundation and scalability.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm whether the product/brand can be named and whether the work is a client delivery or an internal product.",
    ],
  },
  {
    id: "retail-distribution-mapping",
    title: "Retail distributor identification and mapping",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes a geographic identification and mapping platform for retail-goods distributors across two areas in West Java, supporting local supply-chain routing and logistics.",
    contributionAsStated:
      "Developed the geographic identification and mapping platform.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm which geographic details may be disclosed; do not show customer or distributor locations without permission.",
    ],
  },
  {
    id: "business-operations-platforms",
    title: "Business operations platforms: HRM, CRM, and accounting",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes internal platforms for human-resource management, customer-relationship management, and automated accounting journals for business operations and financial reporting.",
    contributionAsStated:
      "Engineered the internal platforms.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Consider splitting this into multiple case studies only after scope, ownership, and evidence are confirmed for each system.",
    ],
  },
  {
    id: "analytics-integration-middleware",
    title: "Analytics middleware for existing business systems",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes a data-analytics pipeline and integration tool intended to extract insights from existing POS, ERP, and CRM systems without requiring platform upgrades.",
    contributionAsStated:
      "Developed the analytics pipeline and integration middleware.",
    technologyEvidence: [],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm supported integrations and show only sanitized data contracts or synthetic examples.",
      "Avoid claiming savings or business impact without measured evidence.",
    ],
  },
  {
    id: "modular-erp-architecture",
    title: "Modular enterprise-resource-planning architecture",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes a modular ERP design that isolates business domains into standalone services and distinct databases, with migration files and team layouts.",
    contributionAsStated:
      "Led the technical design of the modular ERP system.",
    technologyEvidence: ["Microservices architecture"],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm which architecture diagrams can be shared and whether this is a deployed system, an implementation, or a technical design.",
    ],
  },
  {
    id: "ai-interface-auditing",
    title: "AI-assisted interface auditing framework",
    context: "co-founder-engineering-role",
    source: {
      source: "owner-provided-resume",
      pages: [4],
      section: "Professional Experience",
      role: "Co-Founder & Lead Software Engineer",
      period: "2021 — Present",
    },
    sourceSummary:
      "The résumé describes an automated AI UI/UX auditing framework on a native Bun runtime, coordinating parallel agents for layout analysis and heuristic reasoning.",
    contributionAsStated:
      "Engineered the automated auditing framework.",
    technologyEvidence: ["Bun", "14 parallel agents"],
    projectStatus: "not-confirmed",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
    evidenceRequired: [...COMMON_EVIDENCE_REQUIRED],
    reviewNotes: [
      "Confirm whether the framework is a prototype, internal tool, or publicly demonstrable project.",
      "Verify the 14-agent orchestration claim against source code or a reproducible demo before using it in a public case study.",
    ],
  },
];
