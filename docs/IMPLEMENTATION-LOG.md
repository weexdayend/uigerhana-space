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
