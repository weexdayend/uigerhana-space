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
