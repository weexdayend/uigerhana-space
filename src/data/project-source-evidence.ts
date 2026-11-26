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
  {
    id: "passwordless-team-invitations",
    title: "Role-aware invitations and passkey-first joining",
    sourceClass: "owner-controlled-private-repository",
    sourceVisibility: "private",
    reviewedOn: "2026-11-26",
    reviewedArtifacts: [
      "S1.3 tenant authorization and membership lifecycle slice specification",
      "Go tenant invitation domain and identity BFF handlers",
      "PostgreSQL invitation migration and integration tests",
      "Next.js team manager and invitation acceptance pages",
      "S1.3 patch 3 local validation and checkpoint record",
    ],
    sourceBacked: [
      "The invitation UI, BFF, Go domain logic, and persistence are recorded as implemented locally, not released.",
      "Member invitations are available to owners and admins; elevated-role invitations are owner-only and require fresh passkey evidence.",
      "The invitation uses a seven-day lifetime, a daily organization limit, and stores a digest rather than the readable token.",
      "An existing account must prove the matching invited email; a new account creates a passkey and membership through a separate path.",
      "The new-account transaction includes the account, confirmed address, passkey credential, membership, and audit record, and opens no session.",
      "Invitation creation and notification outbox intent are committed transactionally.",
    ],
    testedLocally: [
      "PostgreSQL 17 migration up/down/up and Goose execution.",
      "Invitation integration tests with row-level security enabled and disabled.",
      "Twenty-three deliberate break cases, with follow-up tests added for two initial gaps and secondary guards for four conditions.",
      "Fresh-database Go tests and local browser review of invite/list/accept/ended-link states and mobile overflow.",
    ],
    notVerified: [
      "Real passkey creation in a browser on the intended authenticator origin.",
      "Delivery to an actual recipient mailbox or inbox placement.",
      "Manual repository validator and race detector.",
      "Production release, runtime validation, and owner acceptance of this vertical slice.",
    ],
    publicationPending: [
      "Product name and public URL.",
      "Exact personal contribution and team boundaries.",
      "Owner-approved real application screenshots or sanitized demo.",
      "External customer outcomes, if any exist and can be attributed.",
    ],
    projectStatus: "in-progress",
    attributionDisclosure: "not-cleared",
    publicationState: "review-required",
  },
] as const;
