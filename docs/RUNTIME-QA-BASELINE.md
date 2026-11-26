# Runtime QA Baseline — UI Gerhana

**Date:** 2026-11-27  
**Baseline commit:** `d1cfdce622908c5706a167c8f848bb79e0fe6258`  
**Status:** Runtime QA harness added; first exact-SHA CI execution and human screenshot review are pending.

## 1. Correction to the previous audit status

The previous experience audit was based on repository/source inspection. It inventoried responsive CSS, motion branches, navigation, and semantic markup, but it did **not** execute the rendered site in a browser. It did not run axe, keyboard-only interaction, screen-reader checks, or a 200% zoom review.

Those source observations must not be described as completed desktop/mobile visual QA or accessibility runtime QA. The live site was not accessible to the browser retrieval environment during this work. No visual sign-off is claimed here.

The source audit remains useful as an inventory, but its browser/accessibility exit gate is still open.

## 2. Runtime harness

This branch adds a production-build browser suite using:

- Playwright Test `1.65.1`
- `@axe-core/playwright` `4.14.1`
- Chromium in GitHub Actions
- A production Next.js server started by Playwright's `webServer` configuration

Test dependencies are installed ephemerally in CI with exact versions; the application's runtime dependencies and lockfile are not changed.

### Viewport matrix

| Name | CSS viewport |
|---|---:|
| Wide desktop | 1440 × 900 |
| Laptop | 1280 × 800 |
| Tablet landscape | 1024 × 768 |
| Tablet portrait | 768 × 1024 |
| Mobile | 390 × 844 |
| Small mobile | 360 × 800 |

### Runtime coverage

- Homepage H1 and primary action visibility at all six viewports.
- Document/body horizontal overflow and hero title-line overflow.
- Route response, main landmark, H1, and horizontal overflow for `/`, `/work`, `/work/uigerhana-space`, and `/cv` at desktop and mobile sizes.
- Mobile navigation open/close behavior, Escape handling, and focus return.
- Skip-to-content behavior and keyboard scrolling of the horizontal story region.
- Reduced-motion desktop layout: all four story chapters remain in normal document flow and the animated progress indicator is removed.
- axe-core checks tagged for WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and axe best practices across the four routes at desktop and mobile sizes.
- Full-page homepage screenshots and Playwright traces/screenshots for failures are uploaded as GitHub Actions artifacts.

## 3. Accessibility corrections included

Source inspection exposed three gaps worth fixing before accepting the baseline:

1. Added a visible-on-focus skip link to the homepage and a focus target on the main landmark.
2. Made the horizontal product-journey region programmatically focusable, named, and keyboard-scrollable on touch layouts. Added a dedicated focus-visible indicator.
3. Added Escape-to-close behavior to the mobile navigation and returns focus to its trigger.

These are targeted interaction/accessibility repairs, not a visual redesign or brand concept selection.

## 4. What automated tests do not prove

Even when the CI job passes, it does not establish:

- Whether the visual composition feels balanced, intentional, or polished.
- Whether screenshots match an approved design reference; no pixel-diff baseline exists.
- Real-device Safari/WebKit or Firefox behavior.
- A physical touch-device review.
- A manual keyboard audit beyond the specific covered flows.
- Screen-reader usability with VoiceOver, NVDA, or TalkBack.
- A genuine browser 200% zoom/text-scaling review.
- Résumé print pagination or the saved-PDF output.
- Production deployment health or production-domain rendering.

Axe is an automated detector, not a substitute for assistive-technology testing or manual review.

## 5. Manual sign-off matrix — still open

- [ ] Inspect all six viewport screenshots; record visual defects and review date.
- [ ] Review desktop ScrollTrigger pinning, progress feedback, and final-panel reachability.
- [ ] Review tablet/mobile horizontal story behavior with touch and keyboard.
- [ ] Complete a full keyboard pass: focus order, visible focus, escape behavior, no traps, and route navigation.
- [ ] Review reduced motion at desktop and mobile sizes.
- [ ] Test at 200% browser zoom / text scaling without loss of content or function.
- [ ] Test at least one screen reader (VoiceOver or NVDA) for landmarks, headings, navigation, story region, and CV controls.
- [ ] Review CV print preview and saved PDF.
- [ ] Record the browser/OS/device and attach annotated screenshots for each defect.
- [ ] Owner accepts the rendered result.

## 6. Pass criteria

The runtime QA gate is not complete until:

1. The browser test job passes on the exact proposed commit SHA.
2. The axe audit reports no unresolved violations in its declared scope.
3. Screenshot artifacts have been opened and reviewed by a human at all required viewport sizes.
4. Manual accessibility checks are recorded rather than inferred from source or CI.
5. Any discovered defects are fixed and re-tested on the resulting exact SHA.

**Build success is not runtime QA. Runtime test success is not visual sign-off.** Keep Phase 1 open until the manual review items are genuinely completed.
