# Connected styleframes — design QA and owner review

**Status:** Review checklist prepared; visual acceptance not recorded  
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
- [ ] Owner visual acceptance of the connected direction remains open.

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

Owner-confirmed real-device and assistive-technology checks from 2026-11-27 remain recorded at category level only; exact devices, OS/browser versions, AT combinations, scenarios, and results were not supplied. Do not infer them from these artboards.

## Review boundary

A positive review of one SVG or one hero does not approve the whole connected system. Phase 5 requires owner acceptance of the connected journey and responsive compositions. Phase 1 remains open for the browser, print, deployment-parity, contact-channel, and prioritized-finding gates recorded in `docs/BRAND-IDENTITY-PLAN.md`.

No production runtime, CSS, route, content data, dependency, or publication state is changed by this review package.


## Cross-engine acceptance bake — findings and boundaries

- [x] Added Playwright projects for Chromium, Firefox, and WebKit; CI installs all three engines.
- [x] Expanded responsive smoke coverage to ten viewport samples across all four existing public routes.
- [x] Added 200% CSS root-font-size diagnostics and split print-media assertions from Chromium-only A4 PDF generation.
- [x] All ten System Atlas static SVG artboards rendered in all three engines with Manrope and Plus Jakarta Sans loaded; geometry, text containment, and targeted layout contracts passed.
- [ ] **ROOT-01 · P1:** current application homepage heading clips under 200% root-font-size stress (435px document width at 390px viewport) in all three engines. This remains an open production-app finding and is not fixed in the static-styleframe PR.
- [ ] Native OS text scaling, literal browser 200% zoom, actual Safari, native print dialog, and owner visual acceptance remain manual.
- [ ] Production/deployed-commit parity remains blocked; this branch is not approved for deployment.

The first three-engine run [#45912275133](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133) reported 204 passed / 4 failed / 2 skipped. The Firefox 768px overlap item was a test-geometry false positive due to the artboard's transparent mask and is corrected in the next test revision. See [responsive acceptance matrix](./RESPONSIVE-ACCEPTANCE-MATRIX.md), [visual review](./VISUAL-REVIEW.md), and [manual acceptance runbook](./MANUAL-ACCEPTANCE-RUNBOOK.md).
