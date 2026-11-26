/**
 * Sanitized evidence record for one owner-controlled private product source.
 *
 * This file is not imported by public routes. It deliberately contains no
 * product name, private repository URL, customer/partner names, hostnames,
 * topology, secrets, or customer data.
 */
export const PROJECT_SOURCE_EVIDENCE = [
  {
    id: "independent-it-services-platform",
    title: "Connected operating platform for IT services",
    sourceClass: "owner-controlled-private-repository",
    sourceVisibility: "private",
    reviewedOn: "2026-11-26",
    reviewedArtifacts: [
      "Product strategy",
      "Domain and module architecture",
      "Production-grade delivery roadmap",
      "Current API and web application source tree",
      "Validation, release, backup, and operating documentation",
    ],
    sourceBacked: [
      "The product strategy defines a connected Professional Services Automation lifecycle for IT services providers.",
      "The architecture specifies a Go modular monolith, Next.js web application, PostgreSQL source of truth, contract-first API, and PgBouncer.",
      "The current source tree contains identity, passkey, session, tenant-access, invitation, browser handoff, and authenticated web application foundations.",
    ],
    targetOnly: [
      "The complete commercial-to-service business lifecycle.",
      "Future business-domain modules beyond the current platform and identity foundations.",
    ],
    acceptanceOpen: [
      "External recovery and remaining operational/owner acceptance follow-ups.",
      "Project-specific claims must be reconciled against exact code, tests, and acceptance records before publication.",
    ],
    publicationPending: [
      "Product name and public URL.",
      "Exact personal contribution and team boundaries.",
      "Approved screenshots or a reproducible sanitized demo.",
      "Attributable customer outcomes or metrics, if any exist.",
    ],
    projectStatus: "in-progress",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
  },
] as const;
