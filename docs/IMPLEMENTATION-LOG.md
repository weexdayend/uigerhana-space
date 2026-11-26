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
**Current implementation:** visual-storytelling pass committed; CI result pending.

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
- The next GitHub Actions run must confirm typecheck, lint, and production build.

### Remaining verification

- Confirm the newest GitHub Actions run completes successfully.
- Inspect /, /work, /work/uigerhana-space, and /cv at desktop and mobile sizes.
- Verify an unapproved or unknown case-study slug returns not found.
- Review print pagination and save-to-PDF output in a browser.
- Continue collecting evidence and disclosure decisions for the résumé-backed case-study candidates.
