import type { DitherArtKind } from "@/lib/dither";

export type CaseStudyPublicationStatus = "draft" | "approved";
export type CaseStudyProjectStatus = "in-progress" | "completed" | "maintained";
export type CaseStudyEvidenceStatus =
  | "source-backed"
  | "target-only"
  | "acceptance-open"
  | "publication-pending"
  | "built-local"
  | "tested-local"
  | "not-verified"
  | "not-released"
  | "owner-accepted"
  | "runtime-verified";

export interface CaseStudyEvidenceItem {
  id: string;
  claim: string;
  status: CaseStudyEvidenceStatus;
  explanation: string;
}

export interface CaseStudyWorkflowStage {
  title: string;
  description: string;
}

export interface CaseStudyWorkflowBranch {
  title: string;
  description: string;
  steps: string[];
  outcome: string;
}

export interface CaseStudyWorkflowDiagram {
  title: string;
  description: string;
  branchHeading?: string;
  stages: CaseStudyWorkflowStage[];
  branches: CaseStudyWorkflowBranch[];
  safeguards: string[];
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseStudyContribution {
  area: string;
  description: string;
}

export interface CaseStudyArchitectureStage {
  label: string;
  description: string;
  items: string[];
}

export interface CaseStudyVisualStudy {
  id: string;
  art: DitherArtKind;
  title: string;
  label: string;
  caption: string;
}

export interface CaseStudyTechnologyGroup {
  category: string;
  purpose: string;
  technologies: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  publicationStatus: CaseStudyPublicationStatus;
  projectStatus: CaseStudyProjectStatus;
  context: string;
  role: string;
  challenge: CaseStudySection;
  approach: CaseStudySection;
  implementation: CaseStudySection;
  currentState: CaseStudySection;
  contributions: CaseStudyContribution[];
  architectureDiagram: {
    title: string;
    description: string;
    stages: CaseStudyArchitectureStage[];
  };
  evidenceMap?: CaseStudyEvidenceItem[];
  workflowDiagram?: CaseStudyWorkflowDiagram;
  visualStudies: CaseStudyVisualStudy[];
  technologyGroups: CaseStudyTechnologyGroup[];
}

/**
 * Public case studies must be explicitly approved.
 * Draft entries stay out of public selectors until contribution, status,
 * evidence, and disclosure details have been reviewed by the owner.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "uigerhana-space",
    title: "Building a professional platform from identity to evidence",
    eyebrow: "Independent product · Professional platform · In progress",
    summary:
      "A personal platform connecting a Product Engineer's point of view to selected work, capabilities, experience, and a source-backed résumé—without presenting private projects as public proof.",
    publicationStatus: "approved",
    projectStatus: "in-progress",
    context: "Independent personal platform · Web",
    role:
      "Product direction, identity and content decisions, information architecture, visual direction, and implementation oversight.",
    challenge: {
      heading: "One identity, not a services landing page",
      paragraphs: [
        "The earlier website experience leaned toward a software-services presentation. It did not make the personal Product Engineer identity, the range of work, and the reasoning behind that work feel like one connected story.",
        "The platform needed to serve potential clients and professional peers without splitting into conflicting personas or using private project details as public proof.",
      ],
    },
    approach: {
      heading: "Make the system legible",
      paragraphs: [
        "The experience is organized as a route through four connected ideas: understand the person, explore relevant work, inspect how a project is shaped, and continue into professional depth.",
        "The current visual proposal uses a restrained Basalt / Limestone foundation, Sea Glass as the route signal, and Signal Copper for decisive emphasis. Manrope and Plus Jakarta Sans establish the display and reading hierarchy.",
      ],
      bullets: [
        "Lead with the owner-approved Product Engineer positioning and the line “From pixel to production.”",
        "Use one coherent visual language across the homepage, work index, case-study detail, and résumé.",
        "Keep source-backed professional content separate from private project evidence and publication-pending case studies.",
        "Use GSAP for purposeful route motion while preserving a complete static and reduced-motion experience.",
      ],
    },
    implementation: {
      heading: "A connected content and presentation system",
      paragraphs: [
        "Typed content modules provide shared records for the public profile, experience, skills, work domains, writing, engineering principles, and case studies.",
        "The App Router presents those records through a homepage, selected-work index, approved case-study detail route, and print-oriented résumé. Publication status is checked before a case study can enter the public selector or resolve as a public detail page.",
      ],
      bullets: [
        "Next.js 16 App Router, React 19, and TypeScript.",
        "Tailwind CSS 4 with Manrope display typography and Plus Jakarta Sans for body and interface text.",
        "GSAP and ScrollTrigger for the homepage's staged narrative, with reduced-motion behavior.",
        "Reusable case-study contribution, source-architecture, workflow, evidence, and technology views.",
        "A résumé route with browser print / Save PDF presentation.",
        "An explicit approved-only case-study publication boundary.",
      ],
    },
    currentState: {
      heading: "What exists today",
      paragraphs: [
        "The public platform currently connects four visitor routes: the homepage, work index, this case-study detail, and the online résumé. Its work index also presents four generalized work domains derived from the résumé.",
        "This self-platform story is the only approved public case study. Three deeper project records remain draft-only while their personal contribution, evidence, project status, and disclosure boundaries are reviewed. The platform remains in progress; no completed business outcome or verified production deployment is claimed.",
      ],
      bullets: [
        "The current contact section points visitors to the résumé and verified public profiles; a direct public contact destination has not yet been approved.",
        "Generated artwork is not presented as a screenshot of a shipped application.",
        "Private client and product identities remain generalized or unpublished.",
      ],
    },
    contributions: [
      {
        area: "Product direction",
        description:
          "Established the Product Engineer positioning, primary audiences, website goals, and the visitor journey that connects identity to evidence.",
      },
      {
        area: "Brand and visual direction",
        description:
          "Selected the System Atlas territory and shaped its route metaphor, Basalt / Limestone palette proposal, Manrope and Plus Jakarta Sans pairing, and restrained GSAP motion language.",
      },
      {
        area: "Experience architecture",
        description:
          "Connected the homepage, selected-work index, case-study detail, and résumé into one route system with shared navigation and content hierarchy.",
      },
      {
        area: "Content and evidence model",
        description:
          "Established typed shared records and an explicit publication gate that separates approved public case studies from draft-only project material.",
      },
      {
        area: "Frontend implementation",
        description:
          "Directed the Next.js application structure, reusable presentation components, responsive layouts, motion behavior, and print-oriented résumé experience.",
      },
    ],
    architectureDiagram: {
      title: "How the platform is assembled",
      description:
        "A source-structure view of the current application: typed content feeds App Router pages, which render through reusable interface components. This describes the codebase, not hosting or deployment topology.",
      stages: [
        {
          label: "Typed content",
          description: "Shared records under src/data",
          items: [
            "Profile, experience, and skills",
            "Work domains and approved case studies",
            "Writing and engineering principles",
            "Site identity and metadata",
          ],
        },
        {
          label: "Visitor routes",
          description: "Next.js App Router",
          items: [
            "/ — Homepage and narrative",
            "/work — Selected work and domains",
            "/work/[slug] — Approved case-study detail",
            "/cv — Online résumé and print view",
          ],
        },
        {
          label: "Presentation system",
          description: "Reusable React components and visual primitives",
          items: [
            "System Atlas route and section layouts",
            "Case-study contribution and evidence views",
            "Source-architecture and technology maps",
            "Résumé document and print controls",
          ],
        },
      ],
    },
    visualStudies: [],
    technologyGroups: [
      {
        category: "Application",
        purpose: "Routing, page composition, and rendering",
        technologies: ["Next.js 16.4.6 App Router", "React 19.3.0", "TypeScript"],
      },
      {
        category: "Interface system",
        purpose: "Responsive layout, typography, and visual tokens",
        technologies: ["Tailwind CSS 4.3.3", "Manrope", "Plus Jakarta Sans", "CSS custom properties"],
      },
      {
        category: "Motion and graphics",
        purpose: "Narrative transitions and the System Atlas route",
        technologies: ["GSAP 3.15.1", "ScrollTrigger", "SVG", "CSS motion states"],
      },
      {
        category: "Content architecture",
        purpose: "Shared professional facts and controlled publication",
        technologies: ["Typed TypeScript records", "Approved-only case-study selector", "App Router metadata"],
      },
    ],
  },
  {
    slug: "professional-services-automation-platform",
    title: "Designing a connected operating platform for IT services",
    eyebrow: "Independent product · In progress · Draft",
    summary:
      "An in-progress professional services automation platform designed to connect commercial work, project delivery, finance, and ongoing service operations in one coherent operating model.",
    publicationStatus: "draft",
    projectStatus: "in-progress",
    context: "Independent product initiative",
    role:
      "Product direction and platform engineering. Specific personal contribution boundaries, team context, and public attribution still require owner review.",
    challenge: {
      heading: "The problem space",
      paragraphs: [
        "The product strategy identifies a fragmented operating model across sales and presales, technical delivery, finance, and ongoing service operations.",
        "The intended product connects those workflows while preserving the history, approvals, evidence, and financial boundaries that each business process requires.",
      ],
    },
    approach: {
      heading: "Product and domain approach",
      paragraphs: [
        "Define one connected professional-services lifecycle and deliver it through incremental, production-grade vertical slices rather than treating the full product as a demo or narrow MVP.",
        "Keep customer-facing commercial records, internal cost models, supplier commitments, delivery evidence, finance records, and service operations as distinct domains with explicit relationships.",
      ],
      bullets: [
        "Model the full operating lifecycle as a product target, not as a claim that every stage has shipped.",
        "Separate provider, customer, and supplier responsibilities and access boundaries.",
        "Make auditability, authorization, data integrity, and operational behavior part of each vertical slice.",
      ],
    },
    implementation: {
      heading: "Platform implementation",
      paragraphs: [
        "The reviewed source architecture specifies a Go modular monolith, a Next.js and TypeScript web application, PostgreSQL as the authoritative store, and a contract-first API.",
        "The current source tree contains identity, passkey, session, tenant-access, invitation, browser handoff, and authenticated application foundations. These source records establish platform-foundation evidence, not completion of the full PSA lifecycle.",
      ],
      bullets: [
        "Go modular-monolith architecture.",
        "Next.js, React, and TypeScript web application.",
        "PostgreSQL data foundation and PgBouncer connection pooling.",
        "OpenAPI contract with generated Go and TypeScript artifacts.",
        "Repository-level validation, release, backup, and operating documentation.",
      ],
    },
    currentState: {
      heading: "Current state and boundaries",
      paragraphs: [
        "The project is in active development. The reviewed product strategy defines the complete IT-services PSA lifecycle, while the architecture and roadmap distinguish the existing platform and identity foundations from business-domain capabilities that remain future vertical slices.",
        "The full commercial-to-service lifecycle must not be described as shipped. No client-facing outcome metrics, external customer testimonials, or approved product screenshots were present in this source review.",
        "The source repository is private. This draft intentionally omits the product name, repository URL, deployment hosts, customer references, and operational topology until the owner clears the material for public disclosure.",
      ],
    },
    contributions: [
      {
        area: "Product strategy",
        description:
          "The owner-approved product strategy defines the target customer, operating model, complete PSA lifecycle, and an incremental production-grade delivery approach.",
      },
      {
        area: "Domain architecture",
        description:
          "Architecture documentation establishes boundaries between identity, tenant access, commercial work, project delivery, procurement, finance, acceptance, and ongoing service operations. These are target module boundaries, not proof that every module is implemented.",
      },
      {
        area: "Platform architecture",
        description:
          "The reviewed architecture specifies a Go modular monolith, PostgreSQL source of truth, contract-first API, and Next.js web application rather than defaulting to independently deployed microservices.",
      },
      {
        area: "Identity and tenant foundations",
        description:
          "The current source tree contains account, passkey, session, tenant membership, invitation, browser handoff, and authenticated web application foundations. Exact personal implementation and team contribution boundaries remain to be confirmed.",
      },
      {
        area: "Production engineering discipline",
        description:
          "The repository contains explicit validation, release, backup, recovery, and operating procedures. Repository checks, runtime evidence, recovery evidence, and owner acceptance are tracked as separate claims.",
      },
    ],
    architectureDiagram: {
      title: "From product mandate to implemented foundations",
      description:
        "This map separates the approved product target from the current platform foundation. The final business workflow layer remains roadmap scope and is not presented as a shipped capability.",
      stages: [
        {
          label: "Product model",
          description: "Owner-approved direction",
          items: [
            "Commercial and presales work",
            "Project delivery and acceptance",
            "Finance and reconciliation",
            "Ongoing service operations",
          ],
        },
        {
          label: "Platform foundation",
          description: "Architecture and source evidence",
          items: [
            "Go modular monolith",
            "Next.js and TypeScript web app",
            "PostgreSQL and API contracts",
            "Identity and tenant-access foundations",
          ],
        },
        {
          label: "Vertical delivery",
          description: "Incremental implementation",
          items: [
            "Slice-specific scope and evidence",
            "Authorization and data-integrity gates",
            "Validation and release procedures",
            "Business domains delivered incrementally",
          ],
        },
      ],
    },
    evidenceMap: [
      {
        id: "product-direction",
        claim: "Product mandate and target lifecycle",
        status: "source-backed",
        explanation:
          "Present in the owner-approved product strategy. This confirms product direction, not delivery of every lifecycle stage.",
      },
      {
        id: "platform-architecture",
        claim: "Backend, API, data, and web architecture",
        status: "source-backed",
        explanation:
          "Documented in the domain architecture and reflected by the current repository structure.",
      },
      {
        id: "identity-foundation",
        claim: "Identity and tenant-access foundations",
        status: "source-backed",
        explanation:
          "Relevant backend and web application source areas are present. Production and owner acceptance remain separate evidence categories.",
      },
      {
        id: "business-lifecycle",
        claim: "Complete commercial-to-service business workflow",
        status: "target-only",
        explanation:
          "Defined by strategy and roadmap. The source architecture explicitly distinguishes target business modules from current platform and identity foundations.",
      },
      {
        id: "operations-acceptance",
        claim: "Complete disaster-recovery and operational acceptance",
        status: "acceptance-open",
        explanation:
          "Operational procedures and partial runtime evidence exist, but external recovery and remaining owner-acceptance gates are still open in source records.",
      },
      {
        id: "public-proof",
        claim: "Public attribution, product screenshots, and measurable outcomes",
        status: "publication-pending",
        explanation:
          "The source repository is private and this review did not contain owner-approved public visuals, customer references, or attributable outcome metrics.",
      },
    ],
    visualStudies: [],
    technologyGroups: [
      {
        category: "Backend and API",
        purpose: "Domain services, API behavior, and background processing",
        technologies: ["Go", "OpenAPI 3.1"],
      },
      {
        category: "Web application",
        purpose: "Browser workflows and application experience",
        technologies: ["Next.js", "React", "TypeScript"],
      },
      {
        category: "Data platform",
        purpose: "Transactional persistence and connection pooling",
        technologies: ["PostgreSQL", "PgBouncer"],
      },
      {
        category: "Engineering workflow",
        purpose: "Source validation and controlled delivery",
        technologies: ["Generated API clients", "Docker Compose", "Release runbooks"],
      },
    ],
  },
  {
    slug: "passwordless-team-invitations",
    title: "Inviting a team with passwordless onboarding",
    eyebrow: "Platform foundation · Built locally · Draft",
    summary:
      "A role-aware invitation flow that lets an existing account join an organization or lets a new person create a passkey-first account as part of accepting an invitation.",
    publicationStatus: "draft",
    projectStatus: "in-progress",
    context: "Independent product initiative · S1.3 tenant authorization and membership lifecycle",
    role:
      "Product and engineering contribution in an owner-controlled codebase. Exact personal and team contribution boundaries remain to be confirmed before public attribution.",
    challenge: {
      heading: "The onboarding problem",
      paragraphs: [
        "An organization needs to add people without turning invitation links into open registration, weakening role boundaries, or activating membership for the wrong identity.",
        "The flow must support both people who already have an account and people who do not, while preserving a verifiable link between the invited address, the new authenticator, and the resulting organization membership.",
      ],
    },
    approach: {
      heading: "A controlled invitation model",
      paragraphs: [
        "Treat the invitation as a short-lived, single-use authorization to join one organization with one assigned role. Looking at the link is read-only; accepting it requires proof that the person controls the invited address.",
        "Keep existing-account acceptance separate from first-time account creation. New people create a passkey with user verification, and the account, confirmed address, credential, membership, and audit record are committed together.",
      ],
      bullets: [
        "Owners and admins can invite members; only owners can invite admins or owners.",
        "Inviting an elevated role requires fresh passkey evidence.",
        "The invitation token is represented by a stored digest, not a readable token.",
        "Resend replaces the previous invitation; cancel, expiry, and use end the link.",
      ],
    },
    implementation: {
      heading: "Implementation",
      paragraphs: [
        "The reviewed source contains a Go tenant invitation domain, server-side BFF handlers, a PostgreSQL migration, a team-management UI, and a dedicated invitation acceptance page.",
        "The new-person path verifies a passkey ceremony with user verification and then writes account, confirmed email, passkey, membership, and audit evidence in one database transaction. It does not create an application session; the person signs in after joining.",
      ],
      bullets: [
        "Go tenant and identity/BFF handlers.",
        "PostgreSQL invitation persistence and transaction boundaries.",
        "Next.js, React, and TypeScript team and invitation pages.",
        "Transactional notification outbox integration.",
        "Seven-day invitation lifetime and a limit of twenty invitations per organization per day.",
      ],
    },
    currentState: {
      heading: "Verification and current limits",
      paragraphs: [
        "The S1.3 source record classifies patches 1–3 as implemented locally and not released. The invitation slice is present in the reviewed source and has local database and browser evidence; this is not a production-release claim.",
        "The recorded database validation used PostgreSQL 17. Invitation rules were tested with row-level security both enabled and disabled, including authorization, duplicate and already-member cases, resend/cancel/expiry, cross-organization isolation, concurrent acceptance, and protection against token reuse. The record describes twenty-three deliberate break cases: seventeen were caught in the first pass, two additional missing test cases were added and caught, and four conditions were covered by a second guard.",
        "The local browser review covered sending an invitation, the already-a-member refusal, the invitation list, the invitation page with organization and name fields, an ended/unknown link, and a mobile layout without horizontal overflow.",
        "Still unverified: real passkey creation in a browser on the intended authenticator origin, delivery to an actual recipient mailbox, the manual repository validator, the race detector, and production release/runtime acceptance. The mail path was exercised through the outbox and mail server once in the recorded local test, but mailbox placement was not verified.",
      ],
    },
    contributions: [
      {
        area: "Invitation policy",
        description:
          "Defined a role-aware invitation contract with separate permissions for member invitations and elevated-role invitations, plus passkey step-up for privileged actions.",
      },
      {
        area: "Identity onboarding",
        description:
          "Connected existing-account acceptance to a matching signed-in identity and created a distinct first-time path based on passkey registration and invitation acceptance.",
      },
      {
        area: "Transactional integrity",
        description:
          "Kept new account creation, confirmed address, passkey credential, membership activation, and audit evidence inside one transaction.",
      },
      {
        area: "Application workflow",
        description:
          "Implemented team invitation management and a dedicated invitation page with resend, cancel, accept, and ended-link states in the reviewed source.",
      },
      {
        area: "Validation design",
        description:
          "Recorded database, negative-case, concurrency, migration, and local browser checks separately from release and production acceptance.",
      },
    ],
    architectureDiagram: {
      title: "Where the invitation flow lives",
      description:
        "A source-derived component view of the local implementation: the web application calls the server-side BFF, which coordinates identity, tenant policy, PostgreSQL, and the transactional notification outbox.",
      stages: [
        {
          label: "Web experience",
          description: "Next.js application",
          items: [
            "Team management",
            "Invitation form and list",
            "Dedicated accept page",
          ],
        },
        {
          label: "Application boundary",
          description: "Identity BFF and tenant module",
          items: [
            "Session and organization context",
            "Role and step-up checks",
            "Invitation lifecycle",
          ],
        },
        {
          label: "Transactional records",
          description: "PostgreSQL",
          items: [
            "Invitation digest and expiry",
            "Membership and audit event",
            "Notification outbox intent",
          ],
        },
      ],
    },
    workflowDiagram: {
      title: "From invite to active membership",
      branchHeading: "Identity paths",
      description:
        "Implementation-derived workflow map based on the reviewed source and S1.3 patch record. It is a technical flow illustration, not a screenshot of the application.",
      stages: [
        {
          title: "Create invitation",
          description:
            "An owner or admin enters an email and role. Elevated-role invitations require fresh passkey evidence.",
        },
        {
          title: "Persist and notify",
          description:
            "The invitation, audit entry, and notification outbox intent are committed together. The link can be inspected without consuming it.",
        },
        {
          title: "Prove the invitee",
          description:
            "The flow branches according to whether the invited email already belongs to an account.",
        },
        {
          title: "Activate membership",
          description:
            "The invitation is accepted only for the matching address; the membership and audit record are committed atomically.",
        },
      ],
      branches: [
        {
          title: "Existing account",
          description:
            "The invitee signs in as the invited, confirmed email address and reopens the invitation.",
          steps: [
            "Authenticate the existing account",
            "Match the signed-in email to the invitation",
            "Accept the invitation",
          ],
          outcome: "The existing identity becomes an active organization member.",
        },
        {
          title: "New account",
          description:
            "A person without an account supplies a display name and registers a passkey with user verification.",
          steps: [
            "Begin a challenge bound to this invitation",
            "Verify the passkey ceremony",
            "Create account, confirmed email, credential, membership, and audit in one transaction",
          ],
          outcome: "The person is asked to sign in normally; joining does not silently open a session.",
        },
      ],
      safeguards: [
        "Seven-day lifetime and twenty invitations per organization per day.",
        "Only a digest of the invitation token is stored.",
        "Resending supersedes the old link; cancellation ends an open invitation.",
        "Expired, cancelled, used, replaced, unknown, or wrong-address links resolve to one ended state.",
        "Opening the link does not consume it; duplicate membership and concurrent acceptance are guarded.",
      ],
    },
    evidenceMap: [
      {
        id: "invitation-implementation",
        claim: "Invitation UI, BFF, domain logic, and persistence",
        status: "built-local",
        explanation:
          "Present in the reviewed source tree and recorded as implemented locally in S1.3 patch 3. It has not been released to production.",
      },
      {
        id: "database-validation",
        claim: "PostgreSQL 17 migration and invitation rule tests",
        status: "tested-local",
        explanation:
          "The checkpoint records migration up/down/up and Goose execution, a fresh-database Go test run, and invitation tests with row-level security enabled and disabled.",
      },
      {
        id: "failure-probes",
        claim: "Deliberate negative-case and guard testing",
        status: "tested-local",
        explanation:
          "Twenty-three deliberate break cases were recorded: seventeen caught in the first pass, two missing test cases then added and caught, and four covered by a second guard.",
      },
      {
        id: "browser-checks",
        claim: "Local browser workflow and mobile layout",
        status: "tested-local",
        explanation:
          "The recorded browser checks covered invitation creation and listing, already-member refusal, the accept page, an ended link, and no horizontal overflow on a phone.",
      },
      {
        id: "passkey-browser",
        claim: "Real passkey registration on the intended origin",
        status: "not-verified",
        explanation:
          "The passkey prompt/creation ceremony was not tried in a real browser because the local host did not match the intended passkey domain.",
      },
      {
        id: "mailbox-delivery",
        claim: "Actual recipient mailbox delivery",
        status: "not-verified",
        explanation:
          "The outbox and mail-server path was exercised once in local testing, but a real recipient mailbox and inbox placement were not verified.",
      },
      {
        id: "release-acceptance",
        claim: "Manual validator, race detector, and production release",
        status: "not-released",
        explanation:
          "The checkpoint explicitly records these checks and production release/runtime acceptance as not completed for this slice.",
      },
      {
        id: "public-disclosure",
        claim: "Public project identity, screenshots, and personal attribution",
        status: "publication-pending",
        explanation:
          "The source repository is private. The public product label, approved real UI screenshots, and precise personal/team contribution boundaries are not cleared.",
      },
    ],
    visualStudies: [],
    technologyGroups: [
      {
        category: "Backend and domain",
        purpose: "Invitation policy and application workflows",
        technologies: ["Go", "PostgreSQL", "pgx"],
      },
      {
        category: "Web application",
        purpose: "Team management and invitation acceptance",
        technologies: ["Next.js", "React", "TypeScript"],
      },
      {
        category: "Authentication",
        purpose: "Passwordless first-time account creation",
        technologies: ["WebAuthn passkeys", "User verification"],
      },
      {
        category: "Messaging",
        purpose: "Transactional invitation notification",
        technologies: ["Transactional outbox", "Email adapter"],
      },
    ],
  },

  {
    slug: "verifiable-backup-and-recovery-operations",
    title: "Building a verifiable backup and recovery workflow",
    eyebrow: "Production engineering · Operational evidence · Draft",
    summary:
      "A PostgreSQL backup and recovery workflow that validates archive integrity, rehearses restore in an isolated disposable database, and adds scheduled off-site copies with controlled retention.",
    publicationStatus: "draft",
    projectStatus: "in-progress",
    context: "Independent product initiative · S0.10 backup integrity and isolated restore · S0.11 scheduled backup operations",
    role:
      "Engineering and operational workflow contribution represented in the owner acceptance and runtime records. Exact personal contribution boundaries and any team context remain subject to owner review.",
    challenge: {
      heading: "The reliability problem",
      paragraphs: [
        "A successful database dump is not enough to establish recoverability. An operational backup must be readable, checksummed, safely stored, and proven to restore without touching the production database.",
        "The workflow also needs to distinguish a verified backup from a verified recovery, and a remote object read-back from a complete external disaster-recovery drill.",
      ],
    },
    approach: {
      heading: "Integrity before retention",
      paragraphs: [
        "Treat every backup as an artifact set: a PostgreSQL custom-format archive, a checksum sidecar, and a non-secret manifest. Validate the local archive, copy it to remote object storage, read the exact artifact back, compare integrity evidence, and only then record the remote-copy marker.",
        "Keep restore rehearsal separate from production. Use a disposable PostgreSQL instance with no network and no published ports, restore the archive in a transaction, and verify the resulting schemas and relations before checking production service health.",
      ],
      bullets: [
        "Serialize backup, verification, upload, retention, and restore operations with a shared lock.",
        "Apply resource and health guards before backup/restore work.",
        "Require exact remote read-back before a local artifact becomes eligible for retention.",
        "Keep remote snapshot pruning and external recovery acceptance as independent gates.",
      ],
    },
    implementation: {
      heading: "Implementation",
      paragraphs: [
        "The reviewed source includes backup, verification, and isolated-restore scripts; a scheduled orchestrator; systemd service/timer units; off-site object-storage upload; Restic-backed snapshots; guarded local retention; and operational notifications.",
        "The accepted S0.10 restore used PostgreSQL 17.11 in an ephemeral container with networking disabled and no published ports. The restore ran with bounded CPU/memory and an anonymous temporary data volume.",
        "S0.11 adds scheduled operation and off-site object read-back. Its later runtime addendum records a natural scheduled invocation, remote archive/checksum read-back, a delivered success notification, and one guarded local retention apply.",
      ],
      bullets: [
        "PostgreSQL custom-format archive and pg_restore validation.",
        "SHA-256 sidecar and non-secret manifest.",
        "Docker-isolated restore execution.",
        "systemd scheduling and service lifecycle.",
        "Restic-backed remote object storage and read-back verification.",
        "Guarded retention and operational alerting.",
      ],
    },
    currentState: {
      heading: "Accepted restore, open disaster-recovery gate",
      paragraphs: [
        "S0.10 was explicitly owner-accepted and closed on 12 November 2026. Its evidence records a readable PostgreSQL 17.11 archive, a matching off-host workstation copy, and a successful isolated restore with two of two user schemas and nine of nine user relations restored, including the platform schema.",
        "S0.11's 14 November runtime addendum records the first natural scheduled backup invocation, successful service completion, off-site snapshot listing and archive/checksum read-back, a delivered operational success alert, and a local retention apply that removed one eligible older artifact group after final remote read-back while keeping the two newest local groups.",
        "The S0.10 workstation copy was off-host from the VPS, but it was not geographic or cloud off-site storage. S0.11 later adds remote object storage; remote read-back is still not an external PostgreSQL restore.",
        "The external disposable recovery environment has not been provisioned, no external restore drill has been completed, and the approved 24-hour RPO and 24-hour RTO objectives remain unmeasured. The current checkpoint still treats S0.11 as open, with explicit owner acceptance outstanding. No remote snapshot prune is claimed.",
      ],
    },
    contributions: [
      {
        area: "Backup integrity contract",
        description:
          "Defined the archive, checksum, and manifest as one verifiable backup artifact set, with readable-archive and integrity checks before it can be treated as valid.",
      },
      {
        area: "Isolated recovery rehearsal",
        description:
          "Designed a disposable PostgreSQL restore path with no network or published ports, bounded resources, ephemeral storage, and post-restore schema/relation verification.",
      },
      {
        area: "Off-site copy verification",
        description:
          "Added remote snapshot selection and exact artifact read-back so the remote copy is checked against local integrity evidence before its marker is recorded.",
      },
      {
        area: "Retention safety",
        description:
          "Separated local retention from remote pruning and required a final remote read-back before removing an eligible local artifact group.",
      },
      {
        area: "Operational visibility",
        description:
          "Added scheduled execution and lifecycle notifications while keeping successful backup execution distinct from restore and disaster-recovery acceptance.",
      },
    ],
    architectureDiagram: {
      title: "From database archive to recoverability evidence",
      description:
        "A source-derived view of the backup and restore controls. Remote copy verification and isolated PostgreSQL restore are separate evidence paths; neither is silently substituted for the other.",
      stages: [
        {
          label: "Database",
          description: "Production data source",
          items: [
            "Health and resource preflight",
            "Serialized operation",
            "FlowlessHub-scoped backup",
          ],
        },
        {
          label: "Integrity package",
          description: "Local artifact set",
          items: [
            "PostgreSQL archive",
            "SHA-256 sidecar",
            "Non-secret manifest",
          ],
        },
        {
          label: "Remote copy",
          description: "Object storage verification",
          items: [
            "Tagged snapshot",
            "Exact artifact read-back",
            "Checksum comparison",
          ],
        },
        {
          label: "Restore proof",
          description: "Isolated disposable database",
          items: [
            "No network / no ports",
            "Transactional restore",
            "Schema and relation checks",
          ],
        },
      ],
    },
    workflowDiagram: {
      title: "Backup, verify, and rehearse recovery",
      description:
        "The two operational paths share the same artifact-integrity contract but prove different things: remote-copy integrity and database restore capability.",
      branchHeading: "Operational paths",
      stages: [
        {
          title: "Preflight",
          description:
            "Check database health, host resources, runtime boundaries, and the shared operation lock before starting.",
        },
        {
          title: "Create archive",
          description:
            "Produce a custom-format PostgreSQL archive with a SHA-256 sidecar and non-secret manifest.",
        },
        {
          title: "Verify copy",
          description:
            "Read the exact remote artifact back and compare its integrity evidence before recording the remote-copy marker.",
        },
        {
          title: "Control retention",
          description:
            "Re-check local files and remote snapshot evidence before local deletion; keep remote pruning separately gated.",
        },
      ],
      branches: [
        {
          title: "Off-site backup path",
          description:
            "The scheduled service creates and verifies an archive, then proves the uploaded copy can be read back from the selected snapshot.",
          steps: [
            "Run the scheduled backup and local archive verifier",
            "Upload the artifact set to remote object storage",
            "Read the exact archive and checksum sidecar back",
            "Compare integrity evidence and record the verified-copy marker",
          ],
          outcome:
            "A remotely readable, checksum-matched backup copy is recorded. This is not an external PostgreSQL restore.",
        },
        {
          title: "Isolated restore path",
          description:
            "A disposable database validates that the backup can be restored without connecting to production or exposing a network endpoint.",
          steps: [
            "Start an ephemeral PostgreSQL 17.11 container with network disabled",
            "Restore with pg_restore --exit-on-error --single-transaction",
            "Verify user schemas, relations, and the platform schema",
            "Re-check production health and workload isolation",
          ],
          outcome:
            "S0.10 restore was owner-accepted with 2/2 schemas and 9/9 relations restored.",
        },
      ],
      safeguards: [
        "Never restore into the production database.",
        "The restore container had no network, no published ports, and an anonymous ephemeral data volume.",
        "CPU, memory, swap, host-health, and disk guards constrain operational work.",
        "A shared lock serializes backup, verification, off-site, retention, and restore operations.",
        "Local retention requires final remote read-back; remote snapshot pruning remains a separate gate.",
        "Production application color and unrelated workloads were preserved during the accepted S0.10 drill.",
      ],
    },
    evidenceMap: [
      {
        id: "s010-restore",
        claim: "S0.10 archive integrity and isolated PostgreSQL restore",
        status: "owner-accepted",
        explanation:
          "The owner accepted and closed S0.10 on 12 November 2026. The acceptance record reports a readable archive, matching off-host workstation copy, and successful isolated restore with 2/2 schemas and 9/9 relations.",
      },
      {
        id: "s011-scheduled-run",
        claim: "Natural scheduled backup invocation",
        status: "runtime-verified",
        explanation:
          "The 14 November runtime addendum records the timer as active/enabled and a natural timer-originated invocation completing successfully.",
      },
      {
        id: "s011-remote-readback",
        claim: "Off-site snapshot and remote artifact read-back",
        status: "runtime-verified",
        explanation:
          "The runtime addendum records the remote snapshot listing, archive/checksum-sidecar read-back, matching integrity evidence, and a written upload marker.",
      },
      {
        id: "s011-local-retention",
        claim: "Guarded local retention apply",
        status: "runtime-verified",
        explanation:
          "One eligible older local artifact group was removed only after final remote read-back; the two newest local groups were kept. No remote snapshot pruning was performed.",
      },
      {
        id: "s011-external-restore",
        claim: "External disposable restore and measured recovery objectives",
        status: "acceptance-open",
        explanation:
          "The external recovery environment was not provisioned, no external restore drill was completed, and the approved 24-hour RPO/RTO objectives remain unmeasured.",
      },
      {
        id: "s011-owner-acceptance",
        claim: "S0.11 explicit owner acceptance",
        status: "acceptance-open",
        explanation:
          "The current checkpoint keeps S0.11 open pending external recovery evidence and explicit owner acceptance.",
      },
      {
        id: "s011-publication",
        claim: "Public product attribution and approved operational visuals",
        status: "publication-pending",
        explanation:
          "The source repository is private. Product identity, exact personal/team contribution, and any public screenshot or sanitized evidence artifact remain uncleared.",
      },
    ],
    visualStudies: [],
    technologyGroups: [
      {
        category: "Database and archive",
        purpose: "Consistent backup and restore verification",
        technologies: ["PostgreSQL 17.11", "pg_dump / pg_restore", "SHA-256"],
      },
      {
        category: "Isolation and scheduling",
        purpose: "Disposable execution and controlled service lifecycle",
        technologies: ["Docker", "systemd", "Bash"],
      },
      {
        category: "Off-site storage",
        purpose: "Remote snapshots and artifact read-back",
        technologies: ["Restic", "S3-compatible object storage"],
      },
      {
        category: "Operations",
        purpose: "Retention safety and event notifications",
        technologies: ["Guarded retention", "Operational alerting"],
      },
    ],
  },

];

export const PUBLIC_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => study.publicationStatus === "approved"
);

export function getPublicCaseStudy(slug: string) {
  return PUBLIC_CASE_STUDIES.find((study) => study.slug === slug);
}
