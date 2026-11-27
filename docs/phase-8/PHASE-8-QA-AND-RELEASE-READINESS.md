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
- Exact-main run #46054077202 is fully green. PR #25 exact-head run #46054485925 is fully green, and PR #26 remediation head `fb4de1234ad75d87d34a1f544847ef96a6f95845` is green in both [PR Actions #46055899645](https://github.com/weexdayend/uigerhana-space/actions/runs/46055899645) and [push Actions #46055893632](https://github.com/weexdayend/uigerhana-space/actions/runs/46055893632). Both #26 runs passed quality and three-engine runtime QA.

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

The existing suite is the base; Phase 8 improves evidence quality, remediates only confirmed residual defects, and makes release decisions auditable.

## 3. Prioritized findings

### ROOT-01 — 200% root-text reflow across public routes

**Status:** AUTOMATED CSS ROOT-TEXT GATE PASS on PR #26 exact head. Native browser zoom and OS text scaling remain separate manual gates.

**Historical evidence:** Earlier exact-head diagnostics recorded document widths of 429px on `/`, 390px on `/work` (heading clipping without page overflow), 469px on `/work/uigerhana-space`, and 442px on `/cv` under 200% CSS root-font-size stress at a 390px viewport.

**Current reproduction and fix:** PR #26's current-head diagnostic found two residual case-study issues at 320px: the Technology map heading “Application” clipped due to card inset, and the Résumé utility link extended beyond the viewport. The fix stacks the header utility links and reduces only the narrow Technology map inset, without reducing the type scale or removing content.

**Exact-head evidence:** PR #26 head `fb4de1234ad75d87d34a1f544847ef96a6f95845` passed both [PR Actions #46055899645](https://github.com/weexdayend/uigerhana-space/actions/runs/46055899645) and [push Actions #46055893632](https://github.com/weexdayend/uigerhana-space/actions/runs/46055893632), including Chromium, Firefox, and WebKit. The reflow regression covers four public routes at 390px, 360px, and 320px, asserting page/body width, visible-heading clipping, and route-header link bounds.

**Remaining boundary:** This closes only the automated CSS root-font-size proxy. It does not prove literal browser zoom at 200% or native OS text scaling.

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

**Status:** Repeatable Chromium lab-baseline instrumentation added in PR #27; exact-head measurements pending.

**Method:** Run the production build on the local Playwright server. For each of the four public routes, collect one first view in an isolated browser context and two same-context repeat navigations. Record TTFB, FCP, LCP, CLS, DOMContentLoaded/load timing, resource counts and byte totals by resource category, long-task count/duration, console errors, page errors, and failed requests. Preserve all raw samples and per-route medians.

**Interpretation:** The initial run is a desktop Chromium lab sample at 1440 × 900. It is not field Core Web Vitals, INP, mobile-device performance, or a representative-user network profile. Do not set pass/fail performance budgets or claim Lighthouse scores from this initial dataset. Review medians and variance before proposing evidence-based budgets.

**Exit:** Exact-head CI produces a complete artifact with 12 HTTP 200 route samples and per-route summaries. A later representative-device/network and field-data review remains required before production performance acceptance.

### ROOT-06 — Route and link integrity

**Status:** Automated route, metadata, sitemap, robots, internal-link, fragment, and external-link-policy checks added in PR #27; exact-head CI pending.

**Automated scope:** All rendered anchors on `/`, `/work`, `/work/uigerhana-space`, and `/cv` are inventoried. Internal destinations must return HTTP 200 and internal fragments must resolve to an existing ID. Canonical metadata and sitemap URLs must match the approved public route set. The known unapproved draft case study must remain 404 and absent from the sitemap. External links must use HTTPS; new-tab links must include `noopener` or `noreferrer`.

**Limitation:** External third-party HTTP reachability is not probed by the local-origin CI check. The emitted inventory is the source for manual external-destination spot-checks. Avoid treating intentionally gated unpublished case studies as broken public routes.

**Exit:** No unexpected internal 4xx/5xx, missing fragments, empty/placeholder/javascript hrefs, accidental draft exposure, duplicate DOM IDs, mismatched canonical/sitemap entries, or unsafe new-tab external links.

### ROOT-07 — Accessibility and interaction audit

**Status:** Automated axe/keyboard/reduced-motion baseline exists; manual owner evidence is partial/category-level only.
**Required work:** Preserve exact axe scopes; review semantics, accessible names, focus order, focus visibility, Escape behavior, pinned story reachability, horizontal story keyboard interaction, reduced-motion behavior, contrast in actual hover/focus/pressed/disabled states, and zoom interactions. Record actual AT combinations only when run.
**Exit:** No new automated violations; keyboard-only end-to-end flows work; owner/AT findings are recorded without inventing device matrices.

### ROOT-08 — Cross-engine / responsive integrity

**Status:** PR #26 exact-head CI green in Chromium, Firefox, and WebKit. PR #27 adds route/link integrity coverage across all three engines; the timing/resource baseline is intentionally Chromium-only.

**Required work:** Keep viewport matrix, font loading, console/runtime errors, overflow geometry, route/link status, and screenshot evidence. Clearly distinguish Playwright WebKit from installed Safari.

**Exit:** All required engine suites pass on the exact PR head; no Safari claim unless Safari itself was tested.

## 4. Evidence ledger

Use this table as the source of truth. Replace PENDING only with an exact evidence reference and result.

| Gate | Method | State | Evidence / owner |
|---|---|---|---|
| #24 merge | GitHub PR state + main ref | PASS | PR #24 merge commit `675eaed...` |
| #24 exact-main CI | Quality + cross-engine runtime | PASS | [Actions #46054077202](https://github.com/weexdayend/uigerhana-space/actions/runs/46054077202) |
| #25 QA foundation | Exact-head quality + runtime | PASS | [Actions #46054485925](https://github.com/weexdayend/uigerhana-space/actions/runs/46054485925) |
| #26 responsive remediation | Exact-head quality + Chromium/Firefox/WebKit | PASS | [PR Actions #46055899645](https://github.com/weexdayend/uigerhana-space/actions/runs/46055899645) and [push Actions #46055893632](https://github.com/weexdayend/uigerhana-space/actions/runs/46055893632) |
| ROOT-01 200% CSS root text | Four routes × 390/360/320px × three engines | PASS — automated proxy | PR #26 exact-head CI; native zoom/OS text scaling remain manual |
| Literal browser zoom 200% | Actual desktop browser | MANUAL / NOT RUN | Owner evidence required |
| OS text scaling | Native OS setting | MANUAL / NOT RUN | Record actual platform/settings |
| Native print dialog / Save PDF | Actual OS/browser dialog | MANUAL / NOT RUN | Headless Chromium PDF is only regression evidence |
| ROOT-06 route/link integrity | Rendered links, HTTP routes, fragments, canonical, sitemap, robots | PENDING PR #27 | [Route/link test](https://github.com/weexdayend/uigerhana-space/tree/phase-8/route-link-performance-baseline/tests/e2e/release-readiness.spec.ts) |
| ROOT-05 performance baseline | Chromium production-build lab sample | PENDING PR #27 | 12 samples / 4 routes; no budgets set before report review |
| External link reachability | Manual third-party spot-check | NOT VERIFIED | Use destination inventory from PR #27 artifact |
| Production parity | Non-invasive live verification | NOT VERIFIED | No deployment authority |
| Final release acceptance | Owner decision | OPEN | Owner sign-off |

## 5. Work sequence

1. #24 exact-main CI and #25/#26 stacked exact-head checks completed successfully.
2. ROOT-01 automated CSS root-text reflow proxy closed by PR #26; literal zoom and native OS scaling stay manual.
3. PR #27 implements route/link integrity and a repeatable Chromium performance baseline.
4. Review exact-head route/link and performance artifacts; only then decide any measured remediation or budget.
5. Complete accessibility/interaction delta audit and responsive/zoom regression.
6. Complete native zoom / OS text-scale / native print / desktop pinned-story owner runbook.
7. Verify production parity read-only and record external destination spot-checks.
8. Record explicit go/no-go. Keep release blocked while any required P1 or owner gate remains open.

## 6. Release decision

**Current decision: NO-GO / NOT RELEASE-READY.**

The automated 200% CSS root-text reflow proxy is now green on PR #26, but the following gates remain open:
- Literal browser zoom and native OS text scaling have not been accepted on a real browser/OS.
- Native browser print dialog and OS Save as PDF have not been accepted.
- PR #27 route/link and performance artifacts still require exact-head CI and review.
- External destination reachability is not covered by the local-origin link test.
- Production commit parity is not verified.
- Field/mobile performance and evidence-based performance budgets are not established.
- Final owner release acceptance remains open.

This is an evidence-based hold, not a claim that the site is unusable. No production deployment or release action is authorized.
