# Runtime QA Baseline — UI Gerhana

**Date:** 2026-11-27  
**Validated commit:** `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a`  
**Automated status:** 31 Playwright tests passed in Chromium on both push and pull-request runs; 0 failed, 0 flaky. Axe reported no violations in its declared scan scope.  
**Human review status:** Six homepage viewport captures, desktop/mobile story stages, final mobile collision fixes, and the final two-page A4 CV PDF have been reviewed. On 2026-11-27, the owner confirmed completion of real-device checks and assistive-technology checks. Literal browser zoom/text scaling, native print-dialog behavior, production parity, and remaining owner decisions are still open.

## Owner-confirmed manual checks — 2026-11-27

The owner reports that real-device checks and assistive-technology checks have been completed. This repository update records that confirmation at category level only. No device model, OS/browser version, assistive-technology product/version, tested routes or workflows, or detailed findings were included in the handoff; none are inferred here. This confirmation closes the corresponding physical-device and assistive-technology items in the manual matrix below, but it does not establish cross-browser coverage, literal 200% zoom, OS-level text scaling, native print-dialog behavior, or production deployment parity.

## 1. Correction to the previous audit status

The original experience audit was based on repository/source inspection only. It did **not** execute the rendered site in a browser, run axe, exercise keyboard interactions, test screen readers, or test 200% zoom. Its responsive and accessibility notes were source observations, not completed QA.

The follow-up suite executes the production Next.js build in Chromium in GitHub Actions. This is real browser validation of the repository build—not verification of the live production domain. The domain `https://uigerhana.space` was not accessible to the inspection path in this session, so deployment parity remains unverified.

Keep the original source audit as a historical inventory; use this document for the current runtime QA status.

## 2. Runtime harness

The branch adds a production-build browser suite using:

- Playwright Test `1.65.1`
- `@axe-core/playwright` `4.14.1`
- Chromium in GitHub Actions
- A production Next.js server started through Playwright's `webServer` configuration

Test dependencies are installed ephemerally at pinned versions; application runtime dependencies and the npm lockfile are not changed.

### Viewport matrix

| Name | CSS viewport |
|---|---:|
| Wide desktop | 1440 × 900 |
| Laptop | 1280 × 800 |
| Tablet landscape | 1024 × 768 |
| Tablet portrait | 768 × 1024 |
| Mobile | 390 × 844 |
| Small mobile | 360 × 800 |

### Automated runtime coverage

- Homepage H1 and primary-action visibility at all six viewport sizes.
- Document/body horizontal overflow and hero title-line overflow.
- Hero copy/art non-overlap at the tablet-portrait breakpoint (768–820px).
- Route response, main landmark, H1, and horizontal overflow for `/`, `/work`, `/work/uigerhana-space`, and `/cv` at desktop and mobile sizes.
- Mobile navigation keyboard open/close, Escape handling, accessible-name changes, `aria-expanded`, and focus return.
- Keyboard traversal on all four routes using the actual Chromium Tab sequence: focus-visible on every visited control, no positive `tabindex`, key destination coverage, and no keyboard trap.
- Skip-to-content and keyboard scrolling of the horizontal story region.
- Reduced-motion desktop **and mobile** layout: all four story chapters remain in normal document flow, with no horizontal scroll/pinning and the progress indicator removed.
- axe-core scans tagged for WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and axe best practices across four routes × desktop/mobile (eight scans).
- An additional effective 200%-zoom reflow simulation at a 720 × 450 CSS viewport for all four routes, including overflow checks and axe scans (four more scans).
- CV print media: controls and non-print footer are hidden, an A4 PDF is generated from the production browser build, and the PDF page count is asserted to be exactly two.
- Hero viewport screenshots wait for the entrance animation to settle.
- Full-page desktop/mobile captures use reduced-motion layout so the pinned desktop story does not create a misleading blank region.
- Separate captures cover all four desktop pinned-story states and all four mobile horizontal-story panels.
- Playwright traces, failure screenshots, PDF, and HTML reports are uploaded as GitHub Actions artifacts.

**Zoom boundary:** 720 × 450 CSS pixels approximates the effective layout viewport of a 1440 × 900 desktop at 200% zoom. This checks responsive reflow and accessibility at the equivalent width. It does **not** operate the browser's actual zoom control, emulate OS text scaling, or replace a manual zoom test.

## 3. Runtime findings and corrections

The first production-browser run identified low-contrast story labels, section eyebrows, decorative indices, footer metadata, and case-study diagram descriptions. Axe also found a heading-order issue on `/work`. Those findings were fixed at their source; no axe rule was disabled.

Human review of subsequent captures found and drove fixes for:
- Mobile story metadata colliding with the interface artwork.
- Mobile software-architecture nodes overlapping.
- The tablet-portrait hero using a cramped two-column composition at 768px.

A subsequent keyboard test found its locator was unstable because the mobile menu trigger changes its accessible name when open. The test now locates the same button via `aria-controls` and verifies its accessible name and expanded state across both transitions.

The keyboard traversal test was also corrected after it initially treated every element with a CSS layout box as a required Tab stop. The final version follows Chromium's actual Tab sequence, verifies focus visibility and required controls on each route, and rejects keyboard traps. Route-specific expected controls are grounded in each route's actual structure rather than assuming that every page contains the homepage header.

CV print inspection found a nearly empty trailing page. The CV footer is now hidden in print, and the browser test counts PDF page objects and rejects anything other than two pages.

## 4. Exact-SHA automated result

Final validated commit: `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a`

GitHub Actions:
- Push run: [45886068015](https://github.com/weexdayend/uigerhana-space/actions/runs/45886068015)
- Pull-request run: [45886076242](https://github.com/weexdayend/uigerhana-space/actions/runs/45886076242)

Both runs passed the application quality job (typecheck, content publication gates, lint, production build) and the browser QA job (e2e TypeScript check, Chromium install, production build, runtime suite).

- Playwright result: **31 passed, 0 failed, 0 flaky** on both runs.
- axe-core result: no violations across the 12 declared route/viewport scans (four routes × desktop/mobile plus four routes at the 720 × 450 effective reflow viewport).
- Responsive geometry assertions passed for the tablet-portrait hero, mobile story metadata, and mobile architecture nodes.
- Keyboard traversal and mobile-navigation tests passed.
- Reduced-motion desktop/mobile checks passed.
- CV print test generated a valid **two-page A4 PDF**.

### Human screenshot and PDF review

The six final homepage viewport screenshots, four desktop pinned-story stages, and four mobile story panels were reviewed. The mobile metadata/diagram collision fixes and tablet-portrait layout were rechecked in the final artifacts.

The final CV PDF was extracted from the exact-SHA CI artifact, verified as two A4 pages, rendered to page images, and visually reviewed. The previous nearly empty third page is gone. Page 1 retains some lower-page whitespace because the next experience block moves to page 2; it is not an orphaned blank page.

Artifact: `portfolio-browser-qa-1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a` (push run 45886068015).

## 5. Accessibility and print corrections included

1. Added a visible-on-focus skip link to the homepage and a focus target on the main landmark.
2. Made the horizontal product-journey region programmatically focusable, named, and keyboard-scrollable on touch layouts; added a dedicated focus-visible indicator.
3. Added Escape-to-close behavior to mobile navigation and returned focus to its trigger.
4. Increased contrast for the nodes flagged by axe and removed animated text opacity reduction.
5. Added a semantic H2 to restore heading order on `/work`.
6. Added automated route-wide keyboard traversal and effective 200%-width reflow coverage.
7. Hid the non-print CV footer and asserted a two-page A4 print result.

These are targeted usability/accessibility repairs, not a visual redesign or brand concept selection.

## 6. What automated tests and screenshot review do not prove

- Whether the entire visual composition is polished against an approved design reference; no pixel-diff reference exists.
- Cross-browser Safari/WebKit or Firefox behavior beyond the owner's unspecified real-device checks; no browser/platform matrix is recorded here.
- A full manual keyboard review in the owner's day-to-day browser environment.
- Literal browser 200% zoom, OS-level text scaling, or high-contrast modes.
- Native browser print dialog and operating-system Save as PDF behavior on the owner's device.
- Production deployment health or whether the live domain serves this validated commit.

Axe and scripted keyboard tests are not substitutes for assistive-technology testing or manual review. The owner has separately confirmed assistive-technology and real-device checks are complete; this baseline records that as an owner attestation rather than a reproducible device/AT test matrix.

## 7. Remaining manual sign-off matrix

- [x] Inspect all six final homepage viewport screenshots (desktop, laptop, tablet landscape, tablet portrait, mobile, and small mobile).
- [x] Review all four desktop pinned-story stage captures and mobile story-panel captures; recheck the final mobile collision fixes.
- [x] Exercise Chromium Tab traversal on all four routes; verify required controls, visible focus, no positive tabindex, and no keyboard trap.
- [x] Check reduced-motion document flow at desktop and mobile sizes in Chromium.
- [x] Run four-route axe and reflow checks at the effective 720 × 450 CSS viewport.
- [x] Generate, count, and visually review the two-page A4 CV PDF from the production browser build.
- [ ] Manually operate desktop ScrollTrigger pinning, progress feedback, and final-panel reachability in the owner's interactive browser.
- [x] Complete real-device checks (owner-confirmed 2026-11-27; device/browser matrix and detailed results were not supplied).
- [ ] Test literal 200% browser zoom / text scaling on the owner's browser and OS.
- [x] Complete assistive-technology checks (owner-confirmed 2026-11-27; exact AT product/version, workflows, and detailed results were not supplied).
- [ ] Review native browser print/Save PDF flow on the owner's device.
- [ ] Verify the deployed production domain and its commit.
- [ ] Confirm the preferred direct public contact channel and complete owner acceptance.

## 8. Pass criteria

The **automated Chromium runtime gate** is complete for commit `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a`: both exact-SHA CI triggers are green, all 31 Playwright tests pass without retries/flakiness, declared axe scans report no violations, and the final screenshots/PDF have been reviewed.

The broader **Phase 1 experience and accessibility sign-off remains open** until the remaining literal zoom/text-scaling, native print-dialog, production-domain/commit-parity, contact-channel, desktop interaction, cross-browser (where required), and owner-acceptance checks above are recorded. The real-device and assistive-technology categories are owner-confirmed complete, with no detailed matrix supplied.

**Build success is not runtime QA. Automated runtime success is not full accessibility or design sign-off.**
