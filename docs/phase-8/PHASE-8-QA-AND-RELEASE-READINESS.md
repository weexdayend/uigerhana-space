# Phase 8 — Quality Assurance & Release Readiness

**Status:** Active — evidence-led QA and release gate; no deployment authorization.
**Phase 8 starting baseline:** `main` / merge commit `675eaed00b8e06163c8df8b06474fd32cf2554f7` (PR #24).
**Current main head (2026-11-28):** `0dd152dc2c28bc5aec49b9f7564cb32f627dea16` (PR #41 merge; quality job passed and runtime QA is running in [exact-main CI #46128282652](https://github.com/weexdayend/uigerhana-space/actions/runs/46128282652)).
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

**Status:** INSTRUMENTED — read-only audit workflow, strict full-SHA marker comparison, and build-time marker contract exist; no live audit result is claimed yet. Production commit parity remains NOT VERIFIED.

**Source finding:** The repository declares `https://uigerhana.space` as the canonical origin but has no verified provider-specific deployment workflow/host contract. Phase 8.16 adds an optional build-time revision marker that is emitted only when the exact full source SHA is supplied through `UI_GERHANA_REVISION`. A GitHub deployment record or CI marker alone does not prove what the live CDN/application server currently serves.

**Automated method:** Manually dispatch `.github/workflows/production-parity-audit.yml` with the full 40-character expected commit SHA. The workflow checks out that commit, then performs unauthenticated GET checks for TLS certificate authorization/validity, HTTP-to-HTTPS redirect, the four public routes, title/description/H1/canonical/indexability metadata, robots.txt, and sitemap.xml. It also reads the latest GitHub `production` deployment record/status using `deployments: read`, and looks for an explicit `X-UI-Gerhana-Revision` header or `ui-gerhana-revision` meta marker. The full report is uploaded as a 90-day artifact.

**Interpretation:** The report keeps deployment-record parity separate from served-commit parity. If GitHub records the expected SHA but the live response exposes no revision marker, the result stays NOT VERIFIABLE. A matching revision marker on all four public routes is reported only as marker-match; owner review must still verify that the build/deployment process injects it from the commit that built the running application. The audit does not automatically convert marker-match into a release pass.

**Evidence:** `scripts/audit-production-parity.mjs`; `.github/workflows/production-parity-audit.yml`; [Phase 8.7 methodology](PRODUCTION-PARITY-AND-DEPLOYMENT-EVIDENCE.md).

**Boundary:** The workflow is GET-only and read-only. It does not deploy, change DNS/configuration/environment, purge caches, access application secrets, or invent a hosting-provider contract. The app emits a marker only when its production build is explicitly supplied the exact source SHA; no current provider integration is assumed. A successful workflow run means evidence was collected, not that production passed. Native/browser, field-performance, external-content, and owner release gates remain independent.

**Phase 8.18 hardening:** The auditor now requires exact full-40-character SHA equality and inspects all header/meta marker values per route. Prefixes and conflicting marker values cannot be treated as served-commit matches. The regression tests are pending exact-head CI; live production parity remains NOT VERIFIED.
 
### ROOT-05 — Runtime performance

**Status:** PASS — final exact-head Chromium production-build lab snapshot recorded in PR #27.

**Method:** Run the production build on the local Playwright server. For each of the four public routes, collect one first view in an isolated browser context and two same-context repeat navigations. Record TTFB, FCP, LCP, CLS, DOMContentLoaded/load timing, resource counts and byte totals by resource category, long-task count/duration, console errors, page errors, and failed requests. Preserve all raw samples and per-route medians.

**Interpretation:** The initial run is a desktop Chromium lab sample at 1440 × 900. It is not field Core Web Vitals, INP, mobile-device performance, or a representative-user network profile. Do not set pass/fail performance budgets or claim Lighthouse scores from this initial dataset. Review medians and variance before proposing evidence-based budgets.

**Final exact-head evidence:** PR Actions [#46061556961](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961), artifact [#15228823778](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961/artifacts/15228823778), recorded 12 HTTP 200 Chromium samples across the four public routes. Median FCP/LCP: home 144 ms, work 84 ms, case study 84 ms, CV 120 ms; median CLS was 0 on every route. No console/page/failed-request errors were recorded; individual long tasks remain visible in raw navigation samples. These are local desktop lab values, not budgets, field CWV, mobile performance, or INP.
**Exit:** The final exact-head rerun and raw artifact are recorded. Representative-device/network and field-data review remain required before production performance acceptance.

### ROOT-06 — Route and link integrity

**Status:** PASS — final exact-head route, metadata, sitemap, robots, unpublished-route UI/noindex, internal-link/fragment, and external-link-policy checks completed across Chromium, Firefox, and WebKit.

**Automated scope:** All rendered anchors on `/`, `/work`, `/work/uigerhana-space`, and `/cv` are inventoried. Internal destinations must return HTTP 200 and internal fragments must resolve to an existing ID. Canonical metadata and sitemap URLs must match the approved public route set. Each known unpublished draft slug must render not-found UI, omit `[data-case-study-detail]`, and carry a `noindex` robots directive; the slug must also remain absent from the sitemap. The observed response status is recorded as 200 or 404 because Next.js can stream a not-found UI with HTTP 200. External links must use HTTPS; new-tab links must include `noopener` or `noreferrer`.

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

### ROOT-09 — Interaction-state and primary-target audit

**Status:** PASS — Phase 8.4 automated interaction-state and primary-target checks passed on both exact-head push and pull-request workflows.

**Method:** Tab to representative primary controls across the four public routes and assert visible focus-ring geometry; open the mobile menu and audit its link focus states; measure 24 × 24 CSS-pixel minimum hit areas for primary controls/CTAs only; verify representative pointer-hover states change their authored computed style; verify pointer activation keeps the mobile menu's `aria-expanded` and rendered navigation synchronized.

**Scope boundary:** Inline prose links are not classified as standalone controls for the target-size sample. Pointer-state measurement runs once in Chromium; focus and target geometry are checked in Chromium, Firefox, and WebKit. This automation does not claim physical touch-device behavior, exact contrast ratios for every hover palette, native browser/OS focus rendering, or assistive-technology acceptance.

**Evidence:** `tests/e2e/interaction-accessibility.spec.ts`; PR Actions [#46066904014](https://github.com/weexdayend/uigerhana-space/actions/runs/46066904014) and push Actions [#46066883235](https://github.com/weexdayend/uigerhana-space/actions/runs/46066883235); artifacts [#15230689950](https://github.com/weexdayend/uigerhana-space/actions/runs/46066904014/artifacts/15230689950) and [#15230759858](https://github.com/weexdayend/uigerhana-space/actions/runs/46066883235/artifacts/15230759858); [Phase 8.4 methodology](INTERACTION-ACCESSIBILITY-STATE-AUDIT.md). Both runtime runs completed with 327 passed, 6 skipped, 0 failed.

**Exit:** All state checks pass on both exact-head triggers and the matching browser-QA artifacts are retained. Keyboard/focus/target checks cover Chromium, Firefox, and WebKit; hover-state and pointer activation measurements are Chromium-only. Owner-native AT, OS scaling, browser zoom, and physical-device checks remain manual.


### ROOT-10 — Focus-indicator and hover-text contrast

**Status:** PASS — PR #29 merged; exact-head push and PR quality/runtime checks passed.
**Finding:** The résumé publication link inherited the same `--sea-glass` focus ring as controls on the dark résumé chrome. Against the résumé document paper surface `#f8f6f0`, that color measures approximately 2.40:1, below the 3:1 non-text contrast threshold used for focus indicators.
**Remediation:** Keep the sea-glass ring on the dark résumé back/print controls; use `--atlas-ink` for the publication link on the light paper surface. No type, layout, or interaction behavior is changed.
**Method:** Tab to the three résumé controls, resolve their solid adjacent surface, and measure focus-indicator contrast; pointer-hover representative résumé controls and the contact action, resolving the composited solid background before measuring normal-text contrast. Non-solid image/gradient backdrops are outside this automated method and must not be represented as measured passes.
**Standards boundary:** The 3:1 adjacent-surface check is scoped to WCAG 2.2 SC 1.4.11 Non-text Contrast (Level AA); it is not a SC 2.4.13 Focus Appearance (Level AAA) certification because the test does not calculate the complete focus perimeter area or compare the same pixels between focused and unfocused states. Hover normal-text checks use SC 1.4.3.
**Evidence:** PR #29 head `acc25faae7575b19293cae5fffef96aecaa64215`; push Actions [#46068569732](https://github.com/weexdayend/uigerhana-space/actions/runs/46068569732), PR Actions [#46068576358](https://github.com/weexdayend/uigerhana-space/actions/runs/46068576358), and browser evidence artifact [#15231449634](https://github.com/weexdayend/uigerhana-space/actions/runs/46068576358/artifacts/15231449634). Both quality and runtime jobs passed on the exact head; PR #29 merged as `3444f4898859f524c562fc85ba0f246ec3bf1586`.
**Exit:** Focus indicators reach at least 3:1, sampled normal hover text reaches at least 4.5:1, and machine-readable JSON is retained in the matching artifact. Full-site contrast certification, gradients/images, every disabled/pressed state, and native platform rendering remain outside this slice.

### ROOT-11 — External destination reachability

**Status:** INSTRUMENTED — optional manual-dispatch audit; no destination result claimed until it is run and reviewed.
**Method:** The dedicated workflow builds the selected repository commit, scans rendered anchors on all four approved public routes, deduplicates external HTTPS destinations, and issues bounded GET requests (15-second timeout, up to eight redirects, three concurrent requests). JSON records the source route/label, status, final URL, content type, duration, and classification.
**Classification:** 2xx/3xx = reachable; 404/410 = unavailable at probe time; 401/403/405/407/429 = restricted; 408/425/5xx = transient; request/TLS/time-out exceptions = network-error; other statuses = inconclusive.
**Evidence:** `tests/e2e/release-readiness.spec.ts` (opt-in test) and `.github/workflows/external-destination-audit.yml`. Run manually with `workflow_dispatch` against the exact reviewed branch/commit and retain `external-destination-reachability.json`.
**Boundary:** This audits links from the reviewed local production build, not the live site. A reachable HTTP response does not establish content correctness, currentness, safety, privacy approval, or owner acceptance. Restricted and transient responses are not counted as broken links; the workflow is observational and does not gate ordinary CI.

### ROOT-12 — Mobile-class performance lab

**Status:** RECORDED — PR exact-head evidence plus post-merge exact-main browser QA passed. The mobile-class lab test passed once in Chromium on `369ad07c7928e7e52660fbfac44bd57471fec840`; Firefox/WebKit skipped that Chromium-specific lab case.
**Method:** Chromium local production-build emulation on a 390 × 844 CSS viewport, device scale factor 3, mobile layout/touch mode, 4× CPU throttle, and controlled cellular-4G-like network (150 ms RTT, 1.6 Mbps down, 750 Kbps up). Two navigations are collected for each of the four approved routes: one isolated-context first view and one same-context repeat.
**Metrics:** TTFB, FCP, LCP/element, CLS, DOMContentLoaded/load timing, resource and byte totals/categories, long tasks, viewport/scroll widths, and navigation console/page/request errors. Raw JSON and per-route medians are retained.
**Evidence:** `tests/e2e/mobile-performance-lab.spec.ts`; [Phase 8.8 methodology and observed medians](MOBILE-PERFORMANCE-LAB.md); PR Actions [#46072238941](https://github.com/weexdayend/uigerhana-space/actions/runs/46072238941); artifact [#15234410023](https://github.com/weexdayend/uigerhana-space/actions/runs/46072238941/artifacts/15234410023). PR runtime passed 334 tests / 11 skipped / 0 failed; the new mobile lab test passed once in Chromium.
**Boundary:** This is mobile-class Chromium emulation, not physical Android/iOS, field CWV, real carrier variability, or INP. It sets no performance budget. `P8-PERF-02` remains NOT VERIFIED until representative physical-device and field data are reviewed.

### ROOT-13 — Mobile touch navigation and horizontal story gestures

**Status:** PASS — exact-head PR CI completed on PR #33 head `9cf1351605dea92f776319ebeb32b5040da865c0`; 336 passed / 15 skipped. Both mobile touch journeys passed in Chromium. Physical-device and native OS gesture acceptance remain manual.
**Method:** Chromium touch-device emulation at 390 × 844 CSS px / DPR 3. The automated journey opens mobile navigation by tap, selects the Work anchor, opens the work index, and follows the approved case-study CTA. A separate CDP touch-dispatch test sends start/move/end swipe sequences through the horizontal Product Journey scroller and records scroll movement and panel visibility.
**Evidence:** `tests/e2e/mobile-touch-journeys.spec.ts`; [Phase 8.9 methodology](MOBILE-TOUCH-JOURNEYS.md); artifacts `mobile-touch-navigation-journey.json` and `mobile-touch-product-journey-swipe.json`.
**Boundary:** Chromium-only emulated touch, not a physical device or native OS gesture recognizer. It does not certify every device, native edge-swipe/back behavior, assistive technology, or field touch latency. Existing three-engine tests remain independently required.

### ROOT-14 — Physical-device evidence intake and validation

**Status:** PASS — validator and exact-head CI completed on PR #34 head `8d99e5d3f6ebe8288b02a6b6cde62c6bbd827252`; 8/8 validator tests passed. No physical-device session data has been supplied.
**Method:** A versioned JSON contract requires one physical Android and one physical iOS session. Each session captures exact device/OS/browser/viewport/network metadata and pass/fail/not-run outcomes for public routes, touch navigation, Product Journey swipes, native/browser back, OS text scaling, reduced motion, and assistive technology. Every passing scenario must reference a retained evidence attachment whose SHA-256 is verified from a path contained within the evidence directory.
**Evidence:** `scripts/validate-physical-device-evidence.mjs`; `scripts/validate-physical-device-evidence.test.mjs`; [contract and owner instructions](PHYSICAL-DEVICE-EVIDENCE.md); [session template](../../evidence/physical-device/physical-device-session.template.json); [read-only manual workflow](../../.github/workflows/physical-device-acceptance.yml).
**Decision boundary:** The validator can report evidence-complete, incomplete, acceptance-failed, or invalid. It always sets `releaseApproved: false` and requires a separate owner go/no-go. No real device evidence is claimed yet.

### ROOT-15 — Consolidated release evidence orchestration

**Status:** IMPLEMENTED — exact-main CI regression passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); manual source audits and their exact-commit artifacts are still required.
**Method:** The release evidence gate accepts the run IDs of the external-destination, production-parity, and physical-device workflows. It validates each run's workflow path, manual-dispatch event, completed state, exact head SHA, and artifact name before downloading the artifacts from those specific runs. A provenance manifest binds each JSON report to its run metadata and SHA-256.
**Evaluation:** The evaluator validates the four public-route observations and external destination classifications, production TLS/route/deployment/served-marker evidence, and the physical-device validator result. It rejects path traversal/symlink escape, report digest mismatch, source-run SHA mismatch, unexpected workflow provenance, reused run IDs, and internally inconsistent evidence.
**Decision boundary:** The result is `invalid`, `blocked`, or `owner-review-required`. Even complete technical evidence always emits `releaseApproved: false` and `releaseDecision: "owner-review-required"`. Human review of destination content and revision-marker provenance, native browser zoom, native OS scaling, native print, field mobile performance/INP, and explicit owner go/no-go remain mandatory.
**Evidence:** `scripts/evaluate-release-evidence.mjs`; `scripts/evaluate-release-evidence.test.mjs`; `.github/workflows/release-evidence-gate.yml`; [Phase 8.11 operating guide](RELEASE-EVIDENCE-ORCHESTRATION.md).

### ROOT-16 — Manual audit workflow execution preflight

**Status:** PASS — exact-main workflow-contract regression passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); this does not mean a source audit was dispatched.  
**Finding:** The physical-device manual workflow contained escaped GitHub expression markers in checkout, input environment, and artifact naming. The consolidated gate also accepted a workflow path prefix instead of requiring the exact expected workflow file path.  
**Remediation:** Use active GitHub expressions, enforce a lowercase full SHA equal to the actual checkout, resolve the evidence JSON with realpath and require it beneath the physical-device evidence root, and require exact workflow path equality when validating source run provenance.  
**Regression coverage:** Eight Node built-in contract tests inspect expression rendering, exact-SHA checkout, evidence-root containment, artifact naming, explicit source run IDs, read-only permissions, manual-dispatch boundaries, and exact workflow path provenance.  
**Evidence:** `.github/workflows/physical-device-acceptance.yml`; `.github/workflows/release-evidence-gate.yml`; `scripts/verify-release-workflow-contracts.test.mjs`.

### ROOT-17 — Source-run report timestamp provenance

**Status:** PASS — exact-main timestamp-provenance regression passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); owner freshness policy remains open.  
**Finding:** The release evidence manifest verified source run IDs, exact workflow paths, event, conclusion, commit SHA, artifact name, and report digest, but it did not prove that the embedded report was generated during the workflow run being referenced.  
**Remediation:** Capture each GitHub Actions run's `created_at` and `updated_at`; require external/production `checkedAt` and physical-device `validatedAt` to fall within that run window; require the provenance manifest to be generated after all source runs have completed.  
**Boundary:** This binds a report to its specific source run but does not impose a maximum evidence age. The owner must define the acceptable freshness window before release. Release approval remains false and owner review remains mandatory.  
**Regression coverage:** Release evaluator fixtures reject out-of-window reports, manifests generated before source-run completion, and physical reports without validation timestamps. Workflow contract tests verify the metadata wiring and validator timestamp.  
**Evidence:** `docs/phase-8/EVIDENCE-TIME-PROVENANCE.md`; `scripts/evaluate-release-evidence.mjs`; `scripts/validate-physical-device-evidence.mjs`; `.github/workflows/release-evidence-gate.yml`.

### ROOT-18 — Attempt-aware source audit artifacts

**Status:** PASS — exact-main attempt-aware artifact regression passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); source audit evidence is still required.  
**Finding:** GitHub Actions reruns keep the original workflow `run_id` while incrementing `run_attempt`. Commit-only artifact names did not distinguish the report package uploaded by each attempt.  
**Remediation:** Name every source audit artifact with the reviewed commit SHA and `github.run_attempt`; read and validate `run_attempt` from the referenced source run metadata; download by explicit run ID and attempt-specific artifact name; store the attempt in the manifest; reject invalid attempt numbers or mismatched artifact names.  
**Boundary:** This prevents ambiguous artifact selection across reruns. It does not prove the truth of physical-device attestations or served-marker provenance. Machine evidence remains owner-review-only.  
**Regression coverage:** Evaluator tests reject invalid attempts and wrong attempt-bound artifact names. Workflow contract tests assert attempt-specific upload/download names and manifest metadata.  
**Evidence:** [Phase 8.14 artifact identity contract](ATTEMPT-AWARE-AUDIT-ARTIFACTS.md); `.github/workflows/release-evidence-gate.yml`; and the three source audit workflows.

### ROOT-19 — Evidence artifact retention and expiry

**Status:** PASS — exact-main artifact-expiry regression passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); source audit evidence is still required.  
**Finding:** Commit + attempt-specific names prevent cross-attempt ambiguity, but the release evaluator did not independently establish that the selected artifact still existed, remained unexpired, or would remain available through evaluation.  
**Remediation:** Query paginated artifact metadata from each exact source run; require exactly one matching name, positive artifact ID, non-empty size, `expired=false`, and a future effective `expires_at`; download only that exact artifact from its explicit run ID; retain artifact ID, creation/expiry timestamps, expiry state, and size in the manifest.  
**Evaluation:** Reject duplicate artifact IDs, artifact creation outside the source run window, expired/unknown expiry state, and expiry at or before manifest/evaluation time.  
**Boundary:** The actual API `expires_at` is authoritative because repository/organization retention limits may shorten requested upload retention. No minimum days-remaining or arbitrary evidence-age policy is invented; freshness policy stays owner-controlled. The machine gate never approves release.  
**Regression coverage:** Evaluator tests cover expired artifacts, expiry before evaluation, out-of-window artifact creation, duplicate artifact IDs, and output metadata. Workflow contract tests inspect exact run-artifact lookup and fail-closed expiry handling.  
**Evidence:** `docs/phase-8/EVIDENCE-ARTIFACT-EXPIRY.md`; `.github/workflows/release-evidence-gate.yml`; `scripts/evaluate-release-evidence.mjs`.

### ROOT-20 — Build-time revision provenance marker

**Status:** IMPLEMENTED — PR #40 and exact-main CI passed in [run #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); live production injection and parity remain NOT VERIFIED.  
**Contract:** A build may receive `UI_GERHANA_REVISION`, which must be a full 40-character hexadecimal Git SHA. The app normalizes it to lowercase and emits `<meta name="ui-gerhana-revision" content="...">` through root metadata on every public route. Missing input omits the marker; invalid or abbreviated input fails rather than emitting ambiguous provenance.  
**CI acceptance:** GitHub Actions supplies the checked-out `github.sha` to both production builds. Node unit tests cover absence, normalization, and invalid values; Playwright checks the rendered marker on all four public routes in Chromium, Firefox, and WebKit.  
**Boundary:** This does not configure a hosting provider or prove that production has received the variable. The deployment process must pass the SHA of the exact source revision it builds. A live marker match remains owner-review evidence, not automatic production parity or release approval.  
**Evidence:** [Phase 8.16 build revision provenance](BUILD-REVISION-PROVENANCE.md); `src/lib/build-revision.js`; `src/app/layout.tsx`; `tests/e2e/release-readiness.spec.ts`; `.github/workflows/ci.yml`.

## 4. Evidence ledger

Use this table as the source of truth. Replace PENDING only with an exact evidence reference and result.

| Gate | Method | State | Evidence / owner |
|---|---|---|---|
| #24 merge | GitHub PR state + main ref | PASS | PR #24 merge commit `675eaed...` |
| #24 exact-main CI | Quality + cross-engine runtime | PASS | [Actions #46054077202](https://github.com/weexdayend/uigerhana-space/actions/runs/46054077202) |
| #25 QA foundation | Exact-head quality + runtime | PASS | [Actions #46054485925](https://github.com/weexdayend/uigerhana-space/actions/runs/46054485925) |
| #26 responsive remediation | Exact-head quality + Chromium/Firefox/WebKit | PASS | [PR Actions #46055899645](https://github.com/weexdayend/uigerhana-space/actions/runs/46055899645) and [push Actions #46055893632](https://github.com/weexdayend/uigerhana-space/actions/runs/46055893632) |
| PR #40 build revision provenance / exact main | Build-time SHA contract + cross-engine route assertion | PASS | [PR #40](https://github.com/weexdayend/uigerhana-space/pull/40); [post-merge Actions #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); [artifact #15255838687](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208/artifacts/15255838687) |
| ROOT-01 200% CSS root text | Four routes × 390/360/320px × three engines | PASS — automated proxy | PR #26 exact-head CI; native zoom/OS text scaling remain manual |
| Literal browser zoom 200% | Actual desktop browser | MANUAL / NOT RUN | Owner evidence required |
| OS text scaling | Native OS setting | MANUAL / NOT RUN | Record actual platform/settings |
| Native print dialog / Save PDF | Actual OS/browser dialog | MANUAL / NOT RUN | Headless Chromium PDF is only regression evidence |
| ROOT-06 route/link integrity | Rendered links, fragments, canonical, sitemap, robots and unpublished-route behavior | PASS — AUTOMATED FINAL HEAD | [PR Actions #46061556961](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961); [artifact #15228823778](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961/artifacts/15228823778) | 314 passed / 4 skipped / 0 failed; unpublished route boundary checks use not-found UI, no detail, and noindex rather than assuming streamed response status must be 404 |
| ROOT-09 interaction-state and target audit | Focus-visible, hover delta, mobile menu pointer state, and 24 × 24 CSS px primary targets | PASS — AUTOMATED EXACT HEAD | PR Actions #46066904014; push Actions #46066883235; artifacts #15230689950 / #15230759858 | 327 passed / 6 skipped / 0 failed on both runtime jobs; native AT and physical-device acceptance remain manual |
| ROOT-10 interaction-state contrast | Focus indicator 3:1 and sampled hover text 4.5:1 on solid surfaces | PASS — EXACT HEAD | PR #29 head `acc25faae7575b19293cae5fffef96aecaa64215`; push Actions #46068569732; PR Actions #46068576358; artifact #15231449634 | Both exact-head quality/runtime checks passed; scope remains sampled controls/solid surfaces only |
| ROOT-11 external destination reachability | Bounded GET probes from reviewed local production build | READY — NOT RUN | `.github/workflows/external-destination-audit.yml`; `tests/e2e/release-readiness.spec.ts` | Manual dispatch required; results classify restricted/transient separately and do not gate CI |
| ROOT-12 mobile-class performance lab | Controlled Chromium mobile emulation | RECORDED — EXACT-MAIN TEST PASS | [Post-merge Actions #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208); [browser artifact #15255838687](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208/artifacts/15255838687); `tests/e2e/mobile-performance-lab.spec.ts` | One Chromium lab execution passed on exact main; Firefox/WebKit skip the Chromium-specific test; no field CWV, INP, or physical-device claim |
| ROOT-05 performance baseline | Chromium production-build lab sample | RECORDED — FINAL EXACT HEAD | [PR Actions #46061556961](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961); artifact #15228823778 | 12 HTTP 200 samples / 4 routes; median FCP/LCP home 144 ms, work 84 ms, case study 84 ms, CV 120 ms; median CLS 0; no console/page/request errors; individual long tasks retained; no budgets set |
| External link reachability | Manual third-party spot-check | NOT VERIFIED | Use destination inventory from PR #27 artifact |
| Production parity | Non-invasive live verification | NOT VERIFIED | No deployment authority |
| Final release acceptance | Owner decision | OPEN | Owner sign-off |

## 5. Work sequence

1. #24 exact-main CI and #25/#26 stacked exact-head checks completed successfully.
2. ROOT-01 automated CSS root-text reflow proxy closed by PR #26; literal zoom and native OS scaling stay manual.
3. PR #27 route/link integrity and Chromium performance instrumentation passed exact-head CI on both push and PR triggers (314 passed, 4 skipped, 0 failed); final JSON and visual evidence is retained in artifacts #15229531062 and #15228823778.
4. Phase 8.4 interaction-state and primary-target checks passed both exact-head CI triggers (327 passed, 6 skipped, 0 failed); PR #28 retains the matching artifacts.
5. Phase 8.5 contrast remediation passed exact-head CI and merged as PR #29; Phase 8.6 added the opt-in external-destination audit; Phase 8.7 added read-only production parity/deployment evidence instrumentation.
6. Phase 8.8 adds a mobile-class Chromium performance lab profile; its PR-triggered exact-head artifact is recorded separately from physical-device/field performance.
7. Phase 8.9 adds Chromium touch-emulated navigation/swipe journeys; PR #33 exact-head runtime passed 336 tests / 15 skipped, including both mobile touch journeys in Chromium.
8. Phase 8.10 adds a physical-device evidence contract, SHA-verified attachment validator, self-tests, and a read-only manual audit workflow; PR #34 passed 8/8 validator tests, but no physical sessions are claimed until owner evidence is supplied.
9. Phase 8.11 adds exact-commit source-run orchestration, cross-run artifact verification, and a release evidence report that remains owner-review-only.
10. Review exact-head route/link and performance artifacts; only then decide any measured remediation or budget.
11. Complete accessibility/interaction delta audit and responsive/zoom regression.
12. Complete native zoom / OS text-scale / native print / desktop pinned-story owner runbook.
13. Verify production parity read-only and record external destination spot-checks.
14. Phase 8.17 reconciles the release ledger to exact main `369ad07c7928e7e52660fbfac44bd57471fec840`; see [the reconciliation record](RELEASE-EVIDENCE-LEDGER-RECONCILIATION.md). Automated source-audit contracts are green, but source audit dispatches and owner acceptance remain outstanding.
15. Phase 8.18 rejects abbreviated and conflicting served revision markers, adds regression tests, and documents exact-commit source audit collection; see [the Phase 8.18 record](STRICT-PRODUCTION-REVISION-MARKER.md) and [dispatch runbook](EXACT-COMMIT-SOURCE-AUDIT-RUNBOOK.md).
16. Record explicit go/no-go. Keep release blocked while any required P1 or owner gate remains open.

## 6. Release decision

**Current decision: NO-GO / NOT RELEASE-READY.**

The automated 200% CSS root-text reflow proxy is now green on PR #26, but the following gates remain open:
- Literal browser zoom and native OS text scaling have not been accepted on a real browser/OS.
- Native browser print dialog and OS Save as PDF have not been accepted.
- Native zoom / OS text scale / print-dialog acceptance, live external-link reachability, production parity, field/mobile/INP performance, and explicit owner go/no-go remain open.
- External destination reachability is now instrumented as an opt-in manual-dispatch audit, but remains NOT VERIFIED until the workflow runs and its JSON evidence is reviewed. The local-origin link test alone does not probe third-party hosts.
- Production commit parity is not verified.
- Field/mobile performance and evidence-based performance budgets are not established.
- Final owner release acceptance remains open.

This is an evidence-based hold, not a claim that the site is unusable. No production deployment or release action is authorized.
