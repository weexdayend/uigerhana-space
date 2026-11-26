# Implementation Log

## 2026-11-26 — Portfolio case-study foundation

**Branch:** work/uigerhana-personal-identity-v1

### Delivered

- Added a typed case-study contract with explicit publication status and project status.
- Added a public selector that renders only case studies marked approved.
- Added a reusable case-study card.
- Added the selected-work index at /work.
- Added the dynamic detail route at /work/[slug], with unknown or unapproved slugs returning not found.
- Added one approved, in-progress case study for the owner's personal website.
- Connected the homepage work section to the case-study system.
- Added a review inventory for résumé-backed workstreams, including required evidence and disclosure checks.

### Publication safeguards

- Résumé-backed third-party workstreams remain out of the public case-study data.
- No client names, testimonials, unsupported metrics, or confidential architecture details were introduced.
- The UI Gerhana case study is explicitly labelled in progress; no completed launch or business outcome is claimed.

## 2026-11-26 — Visual storytelling and CI repair

**Branch:** work/uigerhana-personal-identity-v1

### Delivered

- Added a code-architecture map showing shared typed content, App Router pages, and reusable presentation layers.
- Added a contribution breakdown that lists workstreams without invented percentage or effort estimates.
- Added a visual gallery using actual generated Bayer-renderer artwork and studies from the repository.
- Explicitly labelled generated visuals as visual assets/studies rather than screenshots of a shipped product.
- Added a technology map grouped by the role each technology plays in the site.
- Expanded the case-study data contract to carry visual, architecture, contribution, and technology details.

### Quality workflow repair

- The earlier CI run stopped at typecheck because Next.js route-aware helper types were not generated before `tsc --noEmit`.
- Updated the typecheck script to run `next typegen` before TypeScript checking.

### Verification

The GitHub Actions run for commit `648e3d7ce148b0b651c09a8359d54aa5034435e5` completed successfully:

- Dependency installation: passed.
- Next.js route type generation and TypeScript typecheck: passed.
- ESLint: passed.
- Next.js production build: passed.
- Static routes included /, /cv, /work, and /work/uigerhana-space.

### Remaining review

- Inspect /, /work, /work/uigerhana-space, and /cv at desktop and mobile sizes.
- Verify an unapproved or unknown case-study slug returns not found.
- Review print pagination and save-to-PDF output in a browser.
- Continue collecting evidence and disclosure decisions for the résumé-backed case-study candidates.

## 2026-11-26 — Résumé-backed project evidence register

### Delivered

- Reopened and reviewed the complete owner-provided five-page résumé, including page-level source references.
- Added a machine-readable evidence register for 15 workstreams described in the résumé.
- Generalized client, institution, product, and brand labels in the public repository pending disclosure approval.
- Preserved the résumé's stated contribution verbs and did not upgrade "contributed" to ownership or end-to-end delivery.
- Recorded only project-specific technologies that the résumé explicitly associates with a workstream.
- Marked every item `review-required`, with project status unconfirmed and attribution not cleared.
- Added a human-readable review table with source pages, contribution language, and publication gates.
- Kept the register out of public rendering and separate from approved case studies.

### Source integrity

- The résumé's overall skills list is not treated as a per-project technology stack.
- No client screenshots, production URLs, testimonials, outcome metrics, dates, or project statuses were invented.
- Infrastructure and security workstreams include additional sanitization/security-review requirements.
- The PDF's personal contact details are not copied into the repository.

### Remaining work

- Gather owner-approved project labels and disclosure permission.
- Collect real screenshots or sanitized artifacts for selected workstreams.
- Confirm status, timeframes, individual contribution, and team context.
- Promote projects individually only after evidence and owner approval.


## 2026-11-26 — Public-repository disclosure sanitization

- Reviewed the public repository for client, customer, product, and institution names copied from résumé-backed workstreams.
- Replaced unapproved third-party project labels in the master brief with generalized workstream descriptions.
- Generalized independent/private product candidate names in the public implementation brief.
- Removed the assistant product label and specific network device family names from public experience copy.
- Kept employer names and owner-approved public identity information separate from third-party project attribution.
- Retained exact project/source detail only in the owner's original résumé, not in new public repository artifacts.

- Final disclosure scan removed remaining device-family labels from public review documentation; network infrastructure details stay generalized pending security review.


## 2026-11-26 — Publication gate enforcement

- Added `npm run verify:content` to the quality scripts.
- Added a CI step that fails if public app/components import the review-only project evidence register.
- Added a CI assertion that all evidence records remain in review-required state until owner review.
- Added a CI assertion that public case studies are selected exclusively through the explicit approved-publication filter.

- Tightened the publication-gate checker to count record object fields only, excluding TypeScript interface declarations.

- Corrected the checker expression to match object-record fields (four-space indentation), not just its original generic declaration text.


## 2026-11-26 — Final validation: project evidence and publication gates

**Validated commit:** `a4c7448cd0427ffa581621a380cf54e252c15625`  
**GitHub Actions:** successful.

- Dependency installation: passed.
- Next.js route type generation and TypeScript: passed.
- Content publication gates: passed.
- ESLint: passed.
- Next.js production build: passed.

The evidence register contains 15 résumé-derived workstreams. All 15 remain review-required, status-unconfirmed, and attribution-not-cleared. Public routes do not import the register. The public case-study selector continues to require explicit approved status.

The public repository's brief, experience copy, and review documentation use generalized project labels until the owner clears attribution. No personal phone/email, client screenshots, client names from draft workstreams, or unsupported project outcomes were added in this pass.

This validates source checks and the production build only; browser-based desktop/mobile inspection and résumé print-output review remain open.


## 2026-11-26 — First repository-backed project deep dive

### Delivered

- Reviewed one owner-controlled private product repository in read-only mode.
- Added a generalized, draft-only case study for an IT-services professional services automation platform; omitted product name, private repository URL, deployment hosts, and external references.
- Added an evidence maturity map that distinguishes source-backed architecture/foundations from roadmap targets, open operational acceptance, and publication-pending material.
- Added a contribution breakdown that describes source-backed workstreams without invented percentages or claims that every target module is implemented.
- Added a high-level architecture map that separates the product model, platform foundation, and incremental vertical delivery.
- Added a technology map limited to technologies explicitly present in the reviewed architecture source.
- Left the private-project visual gallery empty because no owner-approved product screenshots or demo assets were part of this review.
- Added a sanitized source-review document with explicit claim boundaries.
- Added a machine-readable private-source evidence record; it remains review-required and is not imported by public routes.
- Extended the content publication gate to protect the new source evidence and require the new deep dive to remain draft-only.

### Source-backed versus target-only

- Source-backed: product mandate, documented high-level architecture, and identity/tenant application foundations.
- Target-only: the complete commercial-to-service business lifecycle and its future domain modules.
- Acceptance open: complete external recovery and operational/owner acceptance follow-ups.
- Publication pending: product identity, private source link, approved screenshots, precise contribution/team boundaries, and measurable outcomes.

### Verification boundary

- The new case study is not included in `PUBLIC_CASE_STUDIES`; public index and detail routes continue to show approved records only.
- No private product name, source URL, customer/partner name, host, topology, secret, or customer data was added.
- The next GitHub Actions run must validate typecheck, publication gates, lint, and production build on the resulting exact SHA.

- Corrected a missing JSX brace in the conditional visual-gallery render discovered by exact-SHA typecheck.
- Added an explicit publication-gate assertion that the private-source IT-services deep dive remains draft-only until owner approval.


## 2026-11-26 — Passwordless team-invitation vertical slice

### Delivered

- Added a separate draft case study for the role-aware invitation and passkey-first joining workflow.
- Added a source-derived workflow map showing the invitation lifecycle and the existing-account / new-account branches.
- Added a detailed evidence map separating locally built, locally tested, not verified, not released, and publication-pending states.
- Kept the contribution and team attribution explicitly pending owner review.
- Added sanitized source evidence and review documentation for the S1.3 invitation slice.
- Left the real product screenshot gallery empty; no owner-approved image was present in the reviewed source.

### Evidence represented

- Source records identify S1.3 patches 1–3 as implemented locally, not released.
- PostgreSQL 17 migration and Go test evidence, including row-level security on/off and deliberate failure probes.
- Local browser evidence for invitation creation/listing, already-member refusal, ended-link state, and mobile overflow.
- Explicit gaps for real-origin passkey creation, actual mailbox placement, manual validator, race detector, production release/runtime and owner acceptance.

### Publication and claim boundary

- The new invitation deep dive remains `draft`, excluded from `PUBLIC_CASE_STUDIES`.
- Its diagram is an implementation-derived workflow illustration, not a browser screenshot.
- No product name, private source URL, customer reference, deployment host, credential, or operational topology was added.


## 2026-11-27 — Verifiable backup and recovery case study

### Delivered

- Added a third private-source case-study draft focused on PostgreSQL backup integrity, isolated restore, scheduled off-site copies, and guarded retention.
- Reused the workflow map with a configurable branch heading so it can present operational paths rather than only identity paths.
- Extended evidence status labels to distinguish owner-accepted work from runtime-verified operations.
- Added a source-derived workflow and an architecture map separating remote-copy verification from isolated database restore.
- Recorded S0.10's owner-accepted and closed restore drill independently from S0.11's runtime-verified scheduled/off-site operations.
- Added S0.11 open gates for external restore, measured RPO/RTO, and explicit owner acceptance.
- Left the product visual gallery empty because no owner-approved operational screenshot was available in the source review.
- Added sanitized source evidence, review requirements, and a third draft-only CI publication assertion.

### Claim boundaries

- S0.10 owner acceptance does not close S0.11.
- Remote archive/checksum read-back is not an external PostgreSQL restore.
- The S0.10 workstation copy was off-host but not geographic/cloud off-site.
- No RPO/RTO achievement, remote prune, public customer outcome, or S0.11 owner acceptance is claimed.

- Updated the repository README to enumerate all private-source draft categories without exposing product identity or private references.


## 2026-11-27 — Writing, public profiles, and discoverability

### Delivered

- Verified the public DEV Community profile and Medium profile before adding outbound links.
- Selected three owner-authored public articles covering engineering knowledge, enterprise reconciliation, and canonical data architecture.
- Added a responsive Writing section to the homepage and a Writing anchor in desktop/mobile navigation.
- Added verified GitHub, DEV Community, and Medium profile links to the footer; made publication profiles clickable in the online résumé.
- Added a generated Open Graph image aligned with the Obsidian / Stone / Amber identity.
- Added canonical homepage metadata, explicit Open Graph/Twitter image references, and a Person JSON-LD identity record.
- Added sitemap and robots metadata routes. Sitemap entries are generated only for approved public case studies.
- Extended the content publication gate to retain all three public profile links and at least three featured writing links.

### Verification boundary

- The exact-SHA CI run must confirm typecheck, publication gates, lint, and production build.
- The live domain and deployment status were not verified in this pass because the site endpoint did not return a readable page from the available inspection path.
- Browser-based visual review, keyboard/mobile interaction review, print pagination, and runtime accessibility checks remain open; a successful build is not a substitute for those checks.
- No unverified email address, client attribution, private project screenshot, or case-study approval was introduced.


## 2026-11-27 — Cinematic hero and horizontal motion narrative

**Branch:** work/uigerhana-motion-narrative-v1

### Delivered

- Reworked the homepage introduction into a full-viewport hero while retaining the approved Product Engineer positioning, brand line, typography, Obsidian / Stone / Amber palette, and existing Bayer-dithered artwork.
- Added a four-part narrative sequence covering product thinking, interface design, engineering, and production-minded delivery. The copy describes working principles and focus areas; it does not assign unverified outcomes to individual projects.
- Added a desktop GSAP + ScrollTrigger pinned horizontal sequence with sequenced copy/visual reveals and a scroll progress indicator.
- Kept the small-screen experience native and swipeable instead of forcing a pinned scroll interaction.
- Added a vertical, non-pinned presentation for users who prefer reduced motion.
- Added subtle pointer-responsive visual treatment and restrained hover/focus feedback.
- Preserved the selected-work, expertise, experience, philosophy, writing, contact, résumé, and publication-gate architecture.

### Implementation notes

- Added GSAP 3.15.1 as a runtime dependency and recorded it in the npm lockfile.
- GSAP animations are scoped to component lifecycle and are only activated for desktop layouts when reduced motion is not requested.
- The narrative artwork is conceptual interface/architecture visualization, not a product screenshot.

### Verification boundary

- Repository source and branch ancestry were inspected before implementation. The working branch starts from the verified `main` merge commit `f759f6e7c1466ce6aeb89ac817e109441b8c8419`.
- The execution environment could not resolve GitHub from the local terminal, so `npm ci`, typecheck, content gates, lint, production build, and browser QA could not be run locally in this pass.
- The exact-SHA GitHub Actions result must be inspected before treating the implementation as validated. No PR was opened and no merge or deployment was performed.


## 2026-11-27 — Hero art-direction reset

**Branch:** work/uigerhana-hero-art-direction-v2  
**Scope:** homepage hero only

### Direction

- Reframed the hero around one central idea: the interface is only the beginning of a digital product.
- Replaced the previous two-column dither panel and eyebrow-led hierarchy with a direct editorial headline and a single explanatory introduction.
- Removed the decorative eyebrow, top labels, duplicate headline, and extra visual chrome from the hero.
- Designed one conceptual cutaway illustration: a visible product interface above the domain-logic, data/integration, and runtime layers that support it.
- Kept the approved Product Engineer positioning, owner-approved profile copy, and the existing Obsidian / Stone / Amber identity.
- Reduced motion to one entrance sequence that reveals the headline, connected system layers, and signal path in the same narrative order.
- Added a subtle pointer-following light treatment to the artwork; it does not move the page or compete with reading.
- Preserved keyboard focus states and a static composition for reduced-motion preferences.
- Left the existing story section and all sections after the hero unchanged; this iteration is intentionally limited to hero art direction.

### Illustration and claim boundary

- The system cutaway is a conceptual visual, not an actual product screenshot or a claim about one named project.
- Layer labels describe general product-engineering concerns and do not disclose private architecture.
- No client attribution, metrics, testimonial, or unapproved project material was added.

### Verification boundary

- The new branch starts from the verified main merge commit 6076a6c069af865ac10b91cb5a2b2f6893eae158.
- Typecheck, content publication gates, lint, and production build must pass on this branch's exact SHA before the hero is considered implementation-validated.
- Desktop/mobile browser inspection remains necessary to assess actual composition, visual weight, and motion timing.

## 2026-11-27 — Organic-to-modular pixel hero

**Branch:** work/uigerhana-organic-to-modular-hero  
**Scope:** homepage hero and compact primary navigation

### Direction

- Replaced the superseded conceptual system-cutaway hero with the owner-selected Organic to Modular visual direction.
- Established one continuous Bayer-dithered pixel material that moves from an organic flowing form toward structured modular geometry.
- Restored the approved “From pixel to production.” headline and the Product Engineer identity, using the shared profile content.
- Applied the Obsidian / Stone / Amber palette with restrained amber emphasis, generous negative space, and no decorative eyebrow, HUD, or framed artwork panel.
- Simplified the primary navigation to Work, About, and Notes while retaining the résumé link.
- Kept the existing motion-narrative and all other homepage sections unchanged.

### Motion and accessibility

- Added a dedicated canvas renderer for crisp Bayer 4×4 dithering and the organic-to-modular morphology.
- Added a sequenced GSAP intro that reveals the artwork and copy while progressing through the morph.
- Added restrained pointer-responsive deformation on the artwork.
- Added a reduced-motion path that presents the resolved visual without the cinematic sequence.
- Adapted the composition for narrow viewports instead of shrinking the desktop layout.

### Verification

- Exact-SHA GitHub Actions run for `c8316af8641e5126ccc066b0e4ef8bec2290b5e8` passed dependency installation, typecheck, content publication gates, ESLint, and Next.js production build.
- Browser-based visual QA and direct desktop/mobile runtime inspection remain to be completed.
- No PR or deployment was performed as part of this implementation commit.

## 2026-11-27 — Gerhana brand identity foundation

**Scope:** identity, perception, experience, visual governance, and roadmap documentation  
**Status:** strategic foundation approved; creative concept and visual implementation remain open

### Delivered

- Added `docs/BRAND-IDENTITY-SPEC.md` as the source of truth for durable Gerhana identity, positioning, audience perception, visitor experience, verbal identity, visual principles, motion, accessibility, and evidence guardrails.
- Defined the identity around Irvan Gerhana as a Product Engineer and product-minded systems builder, connecting product thinking, interface craft, software engineering, and production-minded systems work.
- Kept “From pixel to production.” as the approved brand line while separating it from any mandatory pixel-art treatment.
- Explicitly separated brand identity from visual styles such as anime, cyberpunk, urban environments, literal studios, pixel/dither graphics, and 3D illustration.
- Added `docs/BRAND-IDENTITY-PLAN.md` with phased work from current-state audit and concept exploration through verbal identity, visual system, connected styleframes, hero vertical slice, site-wide integration, and production QA.
- Updated the README and Master Implementation Brief so older visual assumptions are historical implementation direction, not permanent brand requirements.

### Decisions and boundaries

- Public positioning remains Product Engineer.
- Current shared-profile content and the existing source-of-truth hierarchy remain authoritative until new public copy is explicitly approved.
- The proposed headline “I build digital products that make complex work feel clear.” remains a candidate, not an approved content change.
- Previous hero experiments and visual references are exploration material only; none is selected automatically.
- No website UI, code behavior, portfolio claim, project status, client attribution, or deployment configuration was changed.

### Next step

Begin Phase 1 of the brand identity plan: audit the current website experience, content, and section relationships before exploring new visual concepts. No visual implementation should begin until the owner approves a connected style direction.

## 2026-11-27 — Current experience and content audit

**Scope:** source-based audit of the existing website and visitor journey  
**Status:** repository inspection complete; browser and owner validation remain open

### Delivered

- Added `docs/CURRENT-EXPERIENCE-AUDIT.md` covering routes, homepage order, navigation, hero, narrative, work evidence, capabilities, experience, writing, contact, résumé, responsive rules, motion, accessibility signals, delivery checks, and prioritized opportunities.
- Recorded that the public work selector currently exposes one approved self-platform case study and keeps three deeper case-study records in draft.
- Identified the missing direct contact action, the About navigation anchor targeting the hero copy container, and overlap between the four-beat motion narrative and engineering principles.
- Documented the responsive story behavior: desktop ScrollTrigger pinning, smaller-screen horizontal swipe, and a vertical reduced-motion fallback.
- Updated the identity roadmap with the Phase 1 source-audit status and remaining browser/owner review gates.

### Validation boundary

- Findings are based on the exact `main` source baseline `b487d0529220eff1e5022fe9a625155e52857f23`.
- The public site could not be inspected in a rendered browser during this audit. Desktop/mobile screenshots, keyboard-only review, reduced-motion runtime behavior, touch behavior, and zoom testing remain open.
- No application code, public copy, contact details, project status, disclosure state, or deployment configuration changed.

### Next step

Complete the browser validation matrix and confirm the preferred public contact channel. Then begin creative concept exploration using consistent content and hierarchy across all concept studies.
