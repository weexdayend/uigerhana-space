# Connected styleframes — design QA and owner review

**Status:** Owner visual acceptance recorded 2026-11-27; implementation QA remains route-specific  
**Scope:** Static SVG styleframes only

## What the artefacts cover

| Artefact | Artboard | Review focus |
|---|---:|---|
| Homepage desktop | 1440 × 5740 | Full journey, content rhythm, evidence hierarchy |
| Homepage tablet | 834 × 5200 | Reflow and route/copy order |
| Homepage mobile | 390 × 7850 | Copy-first order, stacked sections, action reachability |
| Work index | 1440 × 2580 | One approved case study vs generalized work domains |
| Case study | 1440 × 3920 | Status, role, contribution, architecture, current state |
| Résumé | 1440 × 2200 | Reading hierarchy and print-aware document surface |
| Motion storyboard | 1440 × 1500 | GSAP choreography and reduced-motion state |

The artboards are vector studies, not responsive browser implementations. Their declared dimensions do not validate reflow, text zoom, keyboard behavior, assistive technology, or production performance.

## Static copy-integrity review

A follow-up static QA pass found missing leading text in several editorial SVGs: engineering-principle labels/descriptions, article titles/summaries, work-domain descriptions, role labels/highlights, skill prefixes, and motion-storyboard captions. These were restored or reflowed against the existing typed source records. See [Static SVG copy-integrity review](./COPY-INTEGRITY-REVIEW.md). This was source/text validation only; browser font metrics, visual overflow, and owner acceptance remain open.

## Chromium static-artboard visual pass

- [x] All ten connected SVG artboards rendered in Chromium with Manrope and Plus Jakarta Sans loaded.
- [x] Text stays inside each SVG viewBox; no text-node bounding-box intersections remain.
- [x] Tablet hero route/headline clearance, desktop introduction/panel clearance, and component-card action inset have explicit regression assertions.
- [x] Exact-HEAD PR run [45904594136](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136) passed: 32 Playwright tests, typecheck, lint, content publication gates, static copy/SVG integrity, and production build. The styleframe test rendered all ten connected artboards with both selected fonts loaded; see the [29-file QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136/artifacts/15158165064).
- [x] Owner visual acceptance of the connected direction recorded 2026-11-27.

See [Static artboard visual review](./VISUAL-REVIEW.md) for the three corrected defects, exact-HEAD CI evidence, artboard-by-artboard notes, and remaining gates. The Chromium checks cover static SVG rendering; they do not prove production CSS reflow, zoom behavior, native print output, or live interactive semantics.

## Palette contrast reconciliation

- [x] Small Signal Copper text on light surfaces replaced with Light Secondary Text in the work index, case-study status, and résumé date metadata.
- [x] Corrected text pairs exceed 4.5:1 in static calculations on their authored surfaces.
- [x] Résumé document surfaces and pressed/disabled state colors documented as scoped candidates, not global palette additions.
- [x] Static verifier rejects undocumented SVG colors and out-of-scope use of specimen-only colors.
- [ ] Owner acceptance of the semantic palette and scoped surface/state candidates remains open.

See [Palette and contrast reconciliation](./PALETTE-RECONCILIATION.md) for audited values and regression boundaries.

## Owner review checklist

### Identity and hierarchy
- [ ] Name and Product Engineer positioning read before the visual metaphor.
- [ ] Approved headline and introduction remain verbatim.
- [ ] “From pixel to production.” supports the identity rather than replacing the headline.
- [ ] Primary CTA points to selected work; secondary CTA points to the résumé.
- [ ] The Atlas route remains secondary to copy and evidence.

### Content integrity
- [ ] The single public case study remains marked **In progress**.
- [ ] Generalized work domains are not styled or described as separate public case studies.
- [ ] The two experience roles preserve their résumé dates, including the overlap.
- [ ] Featured articles, publication dates, and reading times match the typed source.
- [ ] No unsupported outcome, metric, testimonial, client attribution, credential, or completed-launch claim appears.
- [ ] No direct contact address or channel is invented.

### Visual system
- [ ] Basalt / Limestone / Sea Glass / Signal Copper palette roles are reviewed in context.
- [ ] Manrope and Plus Jakarta Sans load as intended in an actual browser before type metrics are frozen.
- [ ] Fine contour lines remain subordinate and legible.
- [ ] CTA contrast, hover, focus, pressed, and disabled states are separately specified before implementation.
- [ ] Spacing is translated into the approved rem token and paired `--py` / `--px` system; SVG coordinates are not CSS spacing tokens.

### Responsive and accessibility review still required
- [ ] Real browser review at 1440, 1024, 834, 390, and 360 CSS-pixel widths.
- [ ] Literal browser 200% zoom and OS-level text scaling.
- [ ] Keyboard-only navigation and visible focus treatment on real controls.
- [ ] Screen-reader/assistive-technology reading order and landmark labels.
- [ ] `prefers-reduced-motion` with content and route visible immediately.
- [ ] Contrast in actual rendered states, not just static color-pair calculations.
- [ ] Native print dialog / Save as PDF behavior and page-break review.
- [ ] Safari/WebKit and Firefox coverage recorded in addition to Chromium.

Owner-confirmed real-device and assistive-technology checks from 2026-11-27 remain recorded at category level only; exact devices, OS/browser versions, AT combinations, scenarios, and results were not supplied. The owner also accepted the connected System Atlas visual direction. Do not infer platform-specific coverage from either acceptance.

## Review boundary

The connected journey and responsive compositions have owner acceptance. That approval permits staged implementation, not an automatic production release. Browser rendering, interaction, zoom, print, deployment parity, contact-channel, and prioritized-finding gates remain governed by `docs/BRAND-IDENTITY-PLAN.md` and exact-slice QA.

No production runtime, CSS, route, content data, dependency, or publication state is changed by this review package.


## Cross-engine acceptance bake — findings and boundaries

- [x] Added Playwright projects for Chromium, Firefox, and WebKit; CI installs all three engines.
- [x] Expanded responsive smoke coverage to ten viewport samples across all four existing public routes.
- [x] Added 200% CSS root-font-size diagnostics and split print-media assertions from Chromium-only A4 PDF generation.
- [x] All ten System Atlas static SVG artboards rendered in all three engines with Manrope and Plus Jakarta Sans loaded; geometry, text containment, and targeted layout contracts passed.
- [ ] **ROOT-01 · P1:** current application homepage heading clips under 200% root-font-size stress (435px document width at 390px viewport) in all three engines. This remains an open production-app finding and is not fixed in the static-styleframe PR.
- [ ] Native OS text scaling, literal browser 200% zoom, actual Safari, native print dialog, and owner visual acceptance remain manual.
- [ ] Production/deployed-commit parity remains blocked; this branch is not approved for deployment.

The initial run [#45912275133](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133) reported 204 passed / 4 failed / 2 skipped, exposing ROOT-01 and a Firefox test-measurement false positive. The exact-HEAD retest [#45912926554](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554) passed with 208 passed / 2 skipped, including the corrected Firefox 768px measurement and three expected ROOT-01 diagnostics. See the exact-HEAD [101-file artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554/artifacts/15160708872). See [responsive acceptance matrix](./RESPONSIVE-ACCEPTANCE-MATRIX.md), [visual review](./VISUAL-REVIEW.md), and [manual acceptance runbook](./MANUAL-ACCEPTANCE-RUNBOOK.md).


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
