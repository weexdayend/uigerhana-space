# Phase 8 — Quality Assurance & Release Readiness

**Status:** Active — evidence-led QA and release gate; no deployment authorization.
**Baseline:** `main` / merge commit `675eaed00b8e06163c8df8b06474fd32cf2554f7` (PR #24).
**Scope:** Whole-site quality; fix verified defects only. Do not add decorative UI or silently expand public content.

## 1. Release principles

1. A green build is not a release sign-off.
2. Browser automation and headless PDF are not proof of native browser/OS behavior.
3. Every result must identify exact commit, browser/engine, viewport/device, route, method, and artifact where applicable.
4. Keep owner-only gates visibly open until the owner records the actual observation.
5. No deployment, public release, or production configuration change is authorized by this phase.

## 2. Baseline status at Phase 8 start

### Confirmed repository state

- PRs #17–#24 are merged sequentially into `main`.
- `main` points to `675eaed00b8e06163c8df8b06474fd32cf2554f7`, the merge commit for PR #24.
- PR #24 head: `5de0dcb9f4e04063a51eadbf3a0ce1924a946a7d`.
- Exact-main quality job for run [46054077202](https://github.com/weexdayend/uigerhana-space/actions/runs/46054077202) completed successfully: typecheck, all content/design integrity gates, lint, and production build.
- At the time this document was authored, that run's three-engine runtime QA job was still in progress. Do not describe the whole run as green until GitHub reports completion.

### Existing automated coverage (do not duplicate without reason)

The current Playwright suite already covers:
- Ten viewport samples, including 320px narrow reflow, across the homepage and public routes.
- Homepage hero visibility/geometry, selected-work and route smoke behavior.
- Actual Chromium keyboard traversal, mobile menu Escape/focus-return behavior, and keyboard story scrolling.
- Reduced-motion document flow.
- Axe WCAG A/AA, WCAG 2.1/2.2, and best-practice checks across declared route/viewports.
- Effective 200%-zoom viewport simulation (720 × 450 CSS px), not literal browser zoom.
- 200% root-font-size stress diagnostics.
- Print-media visibility, preservation of CV content, and exact two-page Chromium A4 PDF regression.
- Chromium, Firefox, and WebKit CI projects.

The existing suite is the base; Phase 8 should improve evidence quality, fix the known P1 regression, and make release decisions auditable.

## 3. Prioritized findings

### ROOT-01 — P1: homepage clips/overflows at 200% text scale

**Status:** OPEN at Phase 8 start.
**Evidence:** `docs/styleframes/system-atlas/connected/DESIGN-QA.md` records the production app homepage heading clipping and document overflow under 200% CSS root-font-size stress at 390px, reproduced in Chromium, Firefox, and WebKit. The diagnostic is preserved as an expected failure so it cannot be mistaken for a passing layout.
**Required work:**
- Reproduce on the current Phase 8 base before changing styles.
- Trace the exact overflowing element(s), computed dimensions, font metrics, and responsible layout constraints.
- Fix the source layout without hiding content, clipping text, reducing user text size, or introducing horizontal page scroll.
- Add a focused regression that fails before the fix and passes after it in all three engines.
- Preserve screenshots/diagnostic JSON and state exact engine versions.
**Exit:** 200% root-text stress at 390px (and existing 360/320 matrix) has no page-level overflow or clipped heading/action content in Chromium, Firefox, and WebKit. Any intended local horizontal scroller must remain independently operable and not expand the document.

### ROOT-02 — P1/P2: literal zoom and OS text scaling

**Status:** MANUAL OWNER GATE; not equivalent to CSS viewport or root-font test.
**Required evidence:** On an actual desktop browser, operate browser zoom to 200%; record browser/version, OS/version, route, viewport/device scale, result, and screenshots. Separately test OS text scaling/accessibility text settings where supported; record exact setting and limitations.
**Exit:** No loss of content, controls, keyboard access, or page-level horizontal scrolling on `/`, `/work`, case study, and `/cv`. Do not claim this gate closed from headless CSS simulation.

### ROOT-03 — Native print and Save as PDF

**Status:** MANUAL OWNER GATE.
**Automated baseline:** Headless Chromium emits exactly two A4 pages and checks print media.
**Required evidence:** Use the browser's actual Print dialog on the target OS; inspect default printer/PDF destination, paper size, portrait orientation, margins, background graphics policy, scaling, page breaks, link visibility, clipping, headers/footers, and final Save as PDF output. Capture dialog settings and rendered pages. Record browser/OS versions.
**Exit:** Actual native dialog and saved PDF are visually accepted; page count and legibility are recorded. Headless PDF alone cannot close this gate.

### ROOT-04 — Production parity / release integrity

**Status:** OPEN; no deployment is authorized.
**Required work:** Define a safe, non-invasive way to identify the currently served commit (build ID/response metadata or deployment record); compare live domain with the reviewed commit; inspect HTTP status, canonical/robots/sitemap, TLS, key routes, console/network failures, and cache behavior. Avoid modifying production.
**Exit:** Production is explicitly verified against the approved commit, or production remains marked NOT VERIFIED. No DNS, hosting, deploy, or config changes in this PR.

### ROOT-05 — Runtime performance

**Status:** OPEN.
**Required work:** Collect repeatable production-build performance evidence, not subjective guesses. Measure route-level Core Web Vitals where available (LCP, INP, CLS), navigation/resource timing, JS/CSS/font/image transfer sizes, long tasks, console errors, and scroll/motion behavior. Use cold/warm cache notes and representative network/device profiles. Do not fabricate a Lighthouse score or infer field CWV from lab runs.
**Exit:** Report route, engine/device profile, run count, median/variation, trace/report artifacts, and any regression thresholds. Performance budgets must be justified by the observed baseline, not invented after the test.

### ROOT-06 — Route and link integrity

**Status:** Existing route smoke tests present; whole-site link integrity needs auditable inventory.
**Required work:** Enumerate every internal link and public external destination from rendered public routes. Verify internal destinations resolve; external links are valid/intentional and use appropriate new-tab protections; anchors exist; sitemap/robots/canonical metadata align with intended public routes. Avoid treating intentionally gated unpublished case studies as broken routes.
**Exit:** No unexpected 4xx/5xx, missing anchors, accidental draft exposure, empty href, placeholder URL, or unsafe external-link target.

### ROOT-07 — Accessibility and interaction audit

**Status:** Automated axe/keyboard/reduced-motion baseline exists; manual owner evidence is partial/category-level only.
**Required work:** Preserve exact axe scopes; review semantics, accessible names, focus order, focus visibility, Escape behavior, pinned story reachability, horizontal story keyboard interaction, reduced-motion behavior, contrast in actual hover/focus/pressed/disabled states, and zoom interactions. Record actual AT combinations only when run.
**Exit:** No new automated violations; keyboard-only end-to-end flows work; owner/AT findings are recorded without inventing device matrices.

### ROOT-08 — Cross-engine / responsive integrity

**Status:** CI projects exist for Chromium, Firefox, and WebKit; current exact-main run is pending at baseline.
**Required work:** Require all three engine suites on the exact PR head. Keep viewport matrix, font loading, console/runtime errors, overflow geometry, and screenshot evidence. Clearly distinguish Playwright WebKit from installed Safari.
**Exit:** All required engine jobs pass exact head; no Safari claim unless Safari itself was tested.

## 4. Evidence ledger

Use this table as the source of truth. Replace PENDING only with an exact evidence reference and result.

| Gate | Method | State | Evidence / owner |
|---|---|---|---|
| #24 merge | GitHub PR state + main ref | PASS | PR #24 merge commit `675eaed...` |
| #24 quality job | Exact-main Actions | PASS | Run [46054077202](https://github.com/weexdayend/uigerhana-space/actions/runs/46054077202), quality job |
| #24 cross-engine runtime | Exact-main Actions | PENDING at Phase 8 authoring | Same run; runtime QA job |
| ROOT-01 200% root text | Chromium/Firefox/WebKit | OPEN — P1 | Design QA recorded reproduction; Phase 8 re-test required |
| Literal browser zoom 200% | Actual desktop browser | MANUAL / NOT RUN | Owner evidence required |
| OS text scaling | Native OS setting | MANUAL / NOT RUN | Owner evidence required |
| Native print dialog / Save PDF | Actual OS/browser dialog | MANUAL / NOT RUN | Owner evidence required |
| Route/link integrity | Automated crawl + route checks | PENDING | Phase 8 |
| Performance baseline | Lab + representative profile | PENDING | Phase 8 |
| Production parity | Non-invasive live verification | NOT VERIFIED | No deployment authority |
| Final release acceptance | Owner decision | OPEN | Owner sign-off |

## 5. Work sequence

1. Reconfirm #24 exact-main Actions and capture baseline artifacts.
2. ROOT-01 reproduction and focused fix, with cross-engine regression.
3. Route/link integrity and public metadata audit.
4. Runtime performance baseline and evidence; optimize only measured issues.
5. Accessibility/interaction delta audit and responsive/zoom regression.
6. Native zoom / OS text-scale / native print / desktop pinned-story manual runbook.
7. Production parity verification (read-only) and release checklist.
8. Record explicit go/no-go. Keep release blocked while any required P1 or owner gate remains open.

## 6. Release decision

**Initial Phase 8 decision: NO-GO / NOT RELEASE-READY.**

Reasons:
- ROOT-01 P1 clipping/overflow is known open.
- Literal browser zoom and native OS text scaling are not recorded.
- Native print dialog and OS Save as PDF are not accepted.
- Exact-main cross-engine job for PR #24 was in progress at authoring time.
- Production commit parity is not verified.
- Performance baseline and consolidated route/link audit are not complete.
- Final owner acceptance remains open.

This is an evidence-based hold, not a claim that the site is unusable. No production deployment or release action is authorized.
