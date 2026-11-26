# Runtime QA Baseline — UI Gerhana

**Date:** 2026-11-27  
**Validated commit:** `d7c130d87c44162c4aef82d227cfb3edbdfa7f48`  
**Automated status:** <badge>passed</badge> 28 Playwright tests passed in Chromium; axe reported no violations in its declared scan scope.  
**Human review status:** Six homepage viewport captures and the final mobile story collision fixes have been reviewed. Full manual accessibility and production sign-off remain open.

## 1. Correction to the previous audit status

The original experience audit was based on repository/source inspection only. It did **not** execute the rendered website in a browser, run axe, exercise keyboard interactions, test screen readers, or test 200% zoom. Its responsive and accessibility notes were implementation observations, not completed QA.

A follow-up runtime suite now executes the production Next.js build in Chromium in GitHub Actions. This is real browser validation of the branch build—not verification of the live production domain. The live domain was not accessible from the inspection environment in this session, so deployment parity remains unverified.

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
- Mobile navigation open/close, Escape handling, and focus return.
- Skip-to-content behavior and keyboard scrolling of the horizontal story region.
- Desktop reduced-motion layout: all four story chapters remain in document flow and the animated progress indicator is removed.
- axe-core scans tagged for WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and axe best practices across four routes × two viewports (eight scans).
- Hero viewport screenshots wait for the entrance animation to settle.
- Full-page desktop/mobile captures use reduced-motion layout so the pinned desktop story does not create a misleading blank region.
- Separate captures cover all four desktop pinned-story states and all four mobile horizontal-story panels.
- Playwright traces, failure screenshots, and HTML reports are uploaded as GitHub Actions artifacts.

## 3. Runtime findings and corrections

The first browser run on `fed623273efcf7536abf7c06aeaec66b94c6af6b` (run [45880651981](https://github.com/weexdayend/uigerhana-space/actions/runs/45880651981)) returned 15 passing, 9 failing, and 1 flaky result. The failures were retained and investigated rather than suppressed.

Axe identified low-contrast labels in the story, section eyebrows, decorative indices, footer metadata, and case-study diagrams. It also found a heading-order issue on `/work`. The initial responsive test also used an ambiguous hero CTA locator.

A subsequent passing run exposed further issues during human review of its screenshots:

- On mobile, the story's conceptual-UI metadata collided visually with the interface artwork.
- On mobile, the software-architecture diagram's absolute-positioned nodes overlapped.
- At 768px tablet portrait, the hero still used a cramped two-column desktop layout; the artwork entered the copy/CTA area.

The corrective changes now in the branch:

- Increased contrast for the specific reported text classes and removed opacity modulation from story reveal text.
- Added a screen-reader-visible H2 before the selected case-study cards on `/work`.
- Made the hero CTA test selector unique and wait for the hero entrance to settle.
- Separated viewport screenshots, reduced-motion full-page screenshots, desktop pinned-story stage captures, and mobile swipe-panel captures.
- Shortened and repositioned mobile story metadata.
- Rebuilt the mobile architecture diagram into a responsive grid and added a Playwright geometry assertion for node collisions.
- Added a stacked tablet-portrait hero layout for 768–820px and a Playwright geometry assertion for copy/art overlap.

## 4. Exact-SHA automated result

Final validated commit: `d7c130d87c44162c4aef82d227cfb3edbdfa7f48`

GitHub Actions run: [45882720414](https://github.com/weexdayend/uigerhana-space/actions/runs/45882720414)

- Application quality job: typecheck, content publication gates, lint, and production build passed.
- Browser QA job: e2e TypeScript check, Chromium install, production build, and runtime suite passed.
- Playwright result: **28 passed (28.7s), 0 failed, 0 flaky**.
- axe-core result: no violations across the eight declared route/viewport scans.
- Responsive geometry assertions passed for the tablet portrait hero, mobile visual metadata, and mobile architecture nodes.

### Human screenshot review

The final run's artifact was opened and reviewed for all six homepage viewport captures. Four desktop pinned-story states and the mobile story-panel captures were also reviewed; the final mobile interface-label and architecture screenshots were re-opened after their fixes.

That review drove and then rechecked the mobile collision repairs and tablet-portrait layout change. This is a human review of the supplied Chromium screenshots, not a full design approval or a substitute for interactive device testing.

Artifacts: `portfolio-browser-qa-d7c130d87c44162c4aef82d227cfb3edbdfa7f48` (GitHub Actions run 45882720414).

## 5. Accessibility corrections included

1. Added a visible-on-focus skip link to the homepage and a focus target on the main landmark.
2. Made the horizontal product-journey region programmatically focusable, named, and keyboard-scrollable on touch layouts; added a dedicated focus-visible indicator.
3. Added Escape-to-close behavior to the mobile navigation and returned focus to its trigger.
4. Increased contrast for the nodes flagged by axe and removed animated text opacity reduction.
5. Added a semantic H2 to restore heading order on `/work`.

These are targeted usability/accessibility repairs, not a visual redesign or brand concept selection.

## 6. What automated tests and screenshot review do not prove

- Whether the entire visual composition is polished against an approved design reference; no pixel-diff reference exists.
- Real-device Safari/WebKit or Firefox behavior.
- Physical touch-device interaction.
- A complete manual keyboard audit beyond the covered flows.
- Screen-reader usability with VoiceOver, NVDA, or TalkBack.
- A genuine browser 200% zoom/text-scaling review.
- Résumé print pagination or saved-PDF output.
- Production deployment health or whether the live domain serves this validated commit.

Axe is an automated detector, not a substitute for assistive-technology testing or manual review.

## 7. Remaining manual sign-off matrix

- [x] Inspect all six final homepage viewport screenshots (desktop, laptop, tablet landscape, tablet portrait, mobile, and small mobile).
- [x] Review all four desktop pinned-story stage captures and mobile story-panel captures; recheck the final mobile collision fixes.
- [ ] Manually operate desktop ScrollTrigger pinning, progress feedback, and final-panel reachability in a browser.
- [ ] Complete a full keyboard pass: focus order, visible focus, Escape behavior, no traps, and route navigation.
- [ ] Manually review reduced motion at desktop and mobile sizes.
- [ ] Test on a physical touch device.
- [ ] Test at 200% browser zoom/text scaling without loss of content or function.
- [ ] Test at least one screen reader (VoiceOver or NVDA) for landmarks, headings, navigation, story region, and CV controls.
- [ ] Review CV print preview and saved PDF.
- [ ] Verify the deployed production domain and its commit.
- [ ] Confirm the preferred direct public contact channel and complete owner acceptance.

## 8. Pass criteria

The **automated runtime gate** is complete for commit `d7c130d87c44162c4aef82d227cfb3edbdfa7f48`: its exact-SHA CI run is green, its declared axe scans report no violations, and the screenshot captures have been reviewed.

The broader **Phase 1 experience and accessibility sign-off remains open** until the outstanding manual checks, production verification, and owner decisions above are recorded.

**Build success is not runtime QA. Automated runtime success is not full accessibility or design sign-off.**
