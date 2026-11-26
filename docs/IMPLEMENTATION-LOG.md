# Implementation Log

## 2026-11-26 — Portfolio case-study foundation

**Branch:** work/uigerhana-personal-identity-v1  
**Status:** Implemented in branch; CI execution not yet verified.

### Delivered

- Added a typed case-study contract with explicit publication status and project status.
- Added a public selector that renders only case studies marked approved.
- Added a reusable case-study card.
- Added the selected-work index at /work.
- Added the dynamic detail route at /work/[slug], with unknown or unapproved slugs returning not found.
- Added one approved, in-progress case study for the owner's personal website.
- Connected the homepage work section to the case-study system.
- Added a review inventory for résumé-backed workstreams, including required evidence and disclosure checks.
- Updated README route and content architecture documentation.

### Publication safeguards

- Résumé-backed third-party workstreams remain out of the public case-study data.
- No client names, testimonials, unsupported metrics, or confidential architecture details were introduced.
- The UI Gerhana case study is explicitly labelled in progress; no completed launch or business outcome is claimed.

### Verification still required

- Run npm ci.
- Run npm run typecheck.
- Run npm run lint.
- Run npm run build.
- Inspect /, /work, /work/uigerhana-space, and /cv on desktop and mobile.
- Verify an unapproved or unknown case-study slug returns not found.
