# System Atlas — static artboard visual review

**Review state:** Post-fix Chromium render and visual inspection passed · 2026-11-27  
**Validated code SHA:** 7c2b7008271c597ad48ac9f6363766c0950d7cc2  
**Owner acceptance:** Still open  
**Scope:** Static SVG studies only; production application is unchanged

This review inspects all ten connected System Atlas artboards from the real Chromium PNG captures, with Manrope and Plus Jakarta Sans loaded. It records layout defects that were visible in the rendered specimens, the corrections made, and the remaining approval boundaries. It is not a production-site visual QA report.

## Findings corrected

| Artboard | Rendered issue | Correction | Regression contract |
|---|---|---|---|
| Homepage tablet · 834 × 5200 | The route illustration crossed the hero headline. | Compressed and shifted the route group into the right-side visual field. | Route bounding box remains at least 24 px clear of the headline. |
| Interaction states desktop · 1440 × 1660 | The first dark panel painted over the second line of the introductory paragraph. | Moved the first panel and its contents down 40 px while preserving the following panel position. | Intro copy retains at least 16 px clearance above the panel. |
| Component library · 1440 × 2180 | The “READ CASE STUDY” action exceeded the content card's right inset. | Right-aligned the label within the existing 40 px visual inset. | Action label remains inside the card's 32 px content inset. |

These cases were not caught by the earlier text-only checks: one involved a text-to-panel overlap, one involved text-to-card containment, and one involved a route path crossing headline text. They now have explicit Playwright layout contracts.

## Post-fix browser result

GitHub Actions [PR run #198 · 45904594136](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136) completed successfully on the exact PR head shown above.

- Typecheck, lint, content publication gates, static copy/SVG integrity, and production build: passed.
- Runtime visual and accessibility QA job: passed.
- Playwright: **32 passed, 0 failed**.
- The CI runner used Playwright Chromium / Chrome for Testing **159.0.8154.6**.
- The styleframe test rendered all ten connected artboards with Manrope and Plus Jakarta Sans loaded; all ten reported zero text boxes outside their viewBox, zero text-node intersections, and zero failures in the targeted layout contracts.

[Open the exact-HEAD browser QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136/artifacts/15158165064) — the 29-file Playwright report and test-results bundle, including the ten System Atlas PNG captures and geometry/font report. The artifact is 6,326,849 bytes (SHA-256: `1e71347429965b017e8518580ad23ddbf23a32afb4cdbcebcbec3c06205fd094`). Its generated name includes the PR merge-checkout SHA; the validated PR branch HEAD is `7c2b7008271c597ad48ac9f6363766c0950d7cc2`.

This evidence closes the listed Chromium static-artboard regression check at that SHA only. It does not close owner acceptance, the separate viewport/zoom/OS-scaling/print/browser matrix, or production parity.

## Artboard inspection notes

| Artboard | Inspection outcome |
|---|---|
| Homepage desktop | Approved copy hierarchy remains primary; the Atlas route stays secondary to the headline and CTAs. |
| Homepage tablet | Hero route is separated from the headline; selected-work, capabilities, experience, and writing remain in the intended sequence. |
| Homepage mobile | Copy-first hero, stacked actions, and single-column content sequence remain intact at 390 px. |
| Work index | The single public case study remains distinct from generalized work domains. |
| Case study | “In progress” status remains visible; the architecture view is explicitly conceptual, not a deployment diagram. |
| Résumé | Role, skill, certification, and publication hierarchy remains intact in the static document specimen. |
| Component library | Semantic color, typography, action tiers, status, and card anatomy remain legible; the card action is now contained. |
| Interaction states desktop | Dark/light examples are preserved and the introductory copy is no longer obscured. |
| Interaction states mobile | Closed/open navigation, stacked actions, focus, case-study status, and article preview remain visible. |
| Motion storyboard | Four motion stages and the complete reduced-motion static route remain visible without animation. |

This inspection is a visual review of the exported static frames, not owner sign-off of the overall brand direction or an implementation acceptance.

## Palette contrast corrections

A palette pass found Signal Copper used as small text on light surfaces. The work-index eyebrow and domain indices, case-study status label, and résumé date metadata now use Light Secondary Text. Their static contrast ratios are 5.01:1 on inset light, 5.48:1 on Limestone, and 5.80:1 on résumé paper. Copper remains for CTA fills, dark-surface labels, waypoint accents, and restrained visual markers.

The connected studies also contain documented, scoped surface/state values. See [PALETTE-RECONCILIATION.md](./PALETTE-RECONCILIATION.md). This is a static color-pair review, not rendered-state or production accessibility certification.

## Remaining gates

- Owner visual acceptance of the connected System Atlas journey and responsive compositions.
- Literal browser 200% zoom and OS-level text scaling.
- Native print dialog / Save as PDF and page-break review.
- Safari/WebKit and Firefox review in addition to Chromium.
- Production/deployed-commit parity and validation of the live application's font loading; the app still uses its existing Geist setup.
- Contrast and focus behavior in actual implemented interaction states, not inferred from static SVG samples.

Owner-confirmed real-device and assistive-technology checks from 2026-11-27 remain recorded at category level in the project review notes. Exact device, OS/browser, AT combinations, scenarios, and results were not supplied here; this artifact does not claim to repeat or certify those checks.

No application routes, application CSS, public profile data, dependencies, publication state, or deployment behavior changed in this bake.


## Related cross-browser runtime findings (current app; separate from static SVG inspection)

The expanded Playwright suite ran the current application at ten viewport samples on all four routes in Chromium, Firefox, and WebKit. It also rendered all ten connected SVG artboards in all three engines with Manrope and Plus Jakarta Sans loaded.

- Run [#45912275133](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133) reported 204 passed, 4 failed, and 2 skipped. The ten-artboard static geometry/font regression passed in all three engines.
- **ROOT-01 · P1:** setting the CSS root font size to 200% at a 390px viewport produced a 435px document width in Chromium, Firefox, and WebKit and visibly clipped the homepage hero heading. This is a current-app diagnostic, not native OS text-scaling evidence. No production CSS is changed by this PR.
- One Firefox 768px hero-overlap failure was a measurement false positive: the test treated the transparent top portion of the art mask as visible content. The regression assertion is corrected to account for the 35% transparent mask region.
- The current suite's 720 × 450 viewport test is only an effective-layout-width proxy; native browser zoom, actual OS scaling, actual Safari, native print dialog, and production parity remain independent gates.

[Cross-browser runtime artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133/artifacts/15160233789) retains the failing screenshots/traces plus the three-engine artboard specimens and Chromium A4 PDF output.


### Exact-HEAD three-engine retest

The follow-up push workflow [#45912926554](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554) passed both jobs on commit `8a6e31fd57cc501efc5663e219cd7b40f0afd3d4`.

- Quality gates: typecheck, content publication gates, SVG/static copy integrity, lint, and production build — all passed.
- Runtime Visual and Accessibility QA — passed. Playwright executed **210 tests across Chromium, Firefox, and WebKit: 208 passed, 2 skipped**. The three 200% root-font-size diagnostics are intentionally marked as expected failures, one per engine, so ROOT-01 remains visible without masking unrelated regression results. No unexpected failures were reported.
- All **10 responsive viewport samples** were exercised on all **4 routes** per engine. The Firefox 768px hero overlap false positive is gone after the test began measuring the fully visible portion beneath the 35% transparent art mask.
- All **10 connected SVG artboards** rendered per engine with Manrope and Plus Jakarta Sans loaded; each geometry report recorded zero text out of the viewBox, zero text-node collisions, and zero targeted artboard contract failures. The JSON now records the actual Playwright browser name and version.
- Keyboard traversal/disclosure, reduced-motion, axe WCAG A/AA + best-practice checks, print-media checks, and the Chromium A4 two-page PDF test passed. The two non-Chromium PDF-generation cases are intentionally skipped because Playwright's `page.pdf()` is Chromium-only.
- Browser versions in the run logs: Chromium **159.0.8154.6**, Firefox **159.0**, WebKit **27.2**.

The [exact-HEAD browser QA artifact · 15160708872](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554/artifacts/15160708872) contains 101 files: responsive screenshots, three-engine static artboard captures and geometry reports, diagnostic JSON, accessibility/test results, and the Chromium PDF. Artifact size: 19,975,526 bytes; digest: `sha256:c5d3be96fddd5fcfe11ecca775e5df7ed92a4ca030b3975e343effadfe0d63fc`.

**ROOT-01 remains P1 and open:** the 200% CSS root-font-size diagnostic still reproduces the clipped hero/document overflow at 390px in all three engines. This retest preserves it as an expected failure with evidence; no production CSS was changed. Native OS scaling is still NOT RUN.
