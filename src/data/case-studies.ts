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
  | "not-released";

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
    title: "Building a personal professional platform",
    eyebrow: "Independent product · In progress",
    summary:
      "Reframing a personal website into a coherent professional identity, portfolio, and résumé experience.",
    publicationStatus: "approved",
    projectStatus: "in-progress",
    context: "Independent personal project",
    role:
      "Product direction, identity and content decisions, information architecture, visual direction, and implementation oversight.",
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "The initial concept had a strong visual signature, but its content was framed more like a software-services landing page than a personal professional platform.",
        "The project needed one narrative that could introduce a Product Engineer, provide credible evidence through work, and support both business conversations and professional opportunities.",
      ],
    },
    approach: {
      heading: "Product and experience approach",
      paragraphs: [
        "Reposition the experience around product thinking, interface design, software engineering, and production-minded work.",
        "Retain the Obsidian, Stone, and Amber palette, Geist typography, Pixelify Sans accents, editorial grids, and Bayer-dithered artwork while changing the information architecture.",
      ],
      bullets: [
        "Lead with a clear Product Engineer identity.",
        "Make work, expertise, experience, and engineering philosophy discoverable.",
        "Treat factual accuracy and project disclosure as part of the product experience.",
      ],
    },
    implementation: {
      heading: "Implementation",
      paragraphs: [
        "Create typed content modules for profile, experience, skills, work domains, and engineering principles.",
        "Build the homepage, portfolio, and online résumé from shared sources so professional facts are not manually duplicated.",
      ],
      bullets: [
        "Next.js App Router, React, and TypeScript.",
        "Tailwind CSS with Geist and Pixelify Sans.",
        "Custom Bayer-dithered canvas and SVG visuals.",
        "Print-oriented résumé page with browser Print / Save PDF support.",
        "Case-study publication gate based on explicit approval status.",
      ],
    },
    currentState: {
      heading: "Current state",
      paragraphs: [
        "The current implementation includes the identity foundation, homepage sections, typed professional content, an online résumé, and an evidence-led case-study route.",
        "The work is still in progress. The visual samples below are generated visual assets and studies from the site's own renderer, not screenshots of a completed product. Other professional project case studies remain gated until their role, evidence, and disclosure details are reviewed.",
      ],
    },
    contributions: [
      {
        area: "Product direction",
        description:
          "Defined the Product Engineer positioning, primary audience, website goals, and the story the platform should communicate.",
      },
      {
        area: "Information architecture",
        description:
          "Reshaped the site around introduction, selected work, expertise, experience, engineering philosophy, and résumé access.",
      },
      {
        area: "Visual direction",
        description:
          "Retained and applied the Obsidian, Stone, and Amber palette, editorial layout, pixel accents, and ordered-dither visual language.",
      },
      {
        area: "Content architecture",
        description:
          "Established typed, shared records for profile, experience, skills, work domains, case studies, and technical principles.",
      },
      {
        area: "Implementation oversight",
        description:
          "Directed the Next.js application structure, portfolio routes, online résumé, and quality workflow while the project remains in progress.",
      },
    ],
    architectureDiagram: {
      title: "How the site is put together",
      description:
        "A conceptual view of the current source organization: shared typed content feeds App Router pages, which are rendered through reusable presentation components. This is a code-architecture map, not a deployment or infrastructure topology.",
      stages: [
        {
          label: "Shared content",
          description: "Typed records under src/data",
          items: [
            "Profile & site metadata",
            "Experience & skills",
            "Work domains & case studies",
            "Engineering principles",
          ],
        },
        {
          label: "App routes",
          description: "Next.js App Router",
          items: [
            "/ — Homepage",
            "/work — Work index",
            "/work/[slug] — Case study",
            "/cv — Online résumé",
          ],
        },
        {
          label: "Presentation",
          description: "Reusable UI and visual primitives",
          items: [
            "Editorial page sections",
            "Case-study templates",
            "Résumé and print layout",
            "Canvas, SVG, and pixel visuals",
          ],
        },
      ],
    },
    visualStudies: [
      {
        id: "eclipse-horizon",
        art: "eclipse-horizon",
        title: "Eclipse horizon",
        label: "Used on homepage",
        caption:
          "The current hero artwork, rendered with the site's Bayer 4×4 dither palette.",
      },
      {
        id: "grid-waves",
        art: "grid-waves",
        title: "Ordered grid waves",
        label: "Renderer study",
        caption:
          "A procedural wave pattern exploring tonal depth within a restrained palette.",
      },
      {
        id: "isometric-cubes",
        art: "isometric-cubes",
        title: "Isometric volume",
        label: "Renderer study",
        caption:
          "A geometric luminance field exploring depth, repetition, and amber accents.",
      },
    ],
    technologyGroups: [
      {
        category: "Application",
        purpose: "Routing and page composition",
        technologies: ["Next.js 16 App Router", "React 19", "TypeScript"],
      },
      {
        category: "Interface system",
        purpose: "Layout, typography, and styling",
        technologies: ["Tailwind CSS 4", "Geist", "Pixelify Sans"],
      },
      {
        category: "Visual rendering",
        purpose: "Procedural artwork and crisp geometric details",
        technologies: ["Canvas 2D", "SVG", "Bayer 4×4 ordered dithering"],
      },
      {
        category: "Quality workflow",
        purpose: "Configured checks for the development branch",
        technologies: ["TypeScript", "ESLint", "GitHub Actions"],
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
,
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

];

export const PUBLIC_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => study.publicationStatus === "approved"
);

export function getPublicCaseStudy(slug: string) {
  return PUBLIC_CASE_STUDIES.find((study) => study.slug === slug);
}
