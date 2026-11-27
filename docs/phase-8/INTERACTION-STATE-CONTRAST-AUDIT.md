# Phase 8.5 — Interactive State Contrast Audit

**Status:** Automated regression added; exact-head CI pending.
**Stack base:** PR #28 / `phase-8/interaction-accessibility-states`.
**Scope:** Focus-indicator contrast on the résumé route and representative hover-text contrast on solid surfaces. This is a targeted regression, not a full-site contrast certification.

## 1. Verified finding

The résumé chrome controls and the résumé publication links previously shared one focus rule:

- `.resume-back-link`
- `.resume-print-button`
- `.resume-publication-link`

The first two sit on dark chrome (`#10191b`), while the publication link sits on the light résumé paper (`#f8f6f0`). The shared `--sea-glass` outline (`#86a89b`) measures approximately **2.40:1** against the paper surface. That is below the 3:1 focus-indicator contrast target.

## 2. Remediation

The rule is now split by surface:

- Back and print controls retain `--sea-glass` on dark chrome.
- Publication links use `--atlas-ink` on the light paper surface.

No content, layout, typography, motion, or activation behavior changes.

## 3. Automated coverage

`tests/e2e/interaction-contrast.spec.ts` adds:

1. **Focus-indicator contrast** — keyboard Tab traversal to the back link, print button, and first publication link. The test checks visible outline style, at least 2 CSS px width, at least 2 CSS px offset, and at least 3:1 contrast against the resolved solid parent surface.
2. **Hover-text contrast** — pointer hover on the résumé back link, résumé print action, résumé publication link, and homepage contact secondary action. Computed normal-text color must reach at least 4.5:1 against the composited solid background.

The test writes `focus-indicator-contrast-audit.json` and `hover-text-contrast-audit.json` to `test-results/` and attaches the same JSON to the Playwright report. The updated Phase 8.4 interaction tests also write their focus, mobile-nav, target-size, and hover evidence JSON directly into `test-results/`.

## 4. Measurement method and limits

- Colors are read from browser-computed CSS styles.
- Semi-transparent solid background colors are composited from the target/parent chain to the nearest opaque solid background.
- A background image or gradient encountered before an opaque solid surface is treated as unresolved; the test does not guess a color or report a false pass.
- Focus outline contrast uses the resolved parent surface because the outline is offset outside the control's border box.
- Hover text contrast includes the hovered element's own background and its ancestor surfaces.
- The test does not inspect pseudo-element overlays, image pixels, anti-aliasing, every link/component/state, pressed/disabled states, or physical-device behavior. Those are not claimed as covered.
- Browser automation does not replace native screen-reader, OS scaling, literal browser zoom, native print, or owner acceptance.

## 5. Exit criteria

- All focus samples expose the intended outline geometry and reach at least 3:1.
- All sampled hover text reaches at least 4.5:1.
- JSON evidence is present in the exact-head CI artifact.
- Chromium, Firefox, and WebKit pass the same assertions. Playwright WebKit is not represented as Safari.

Release remains NO-GO until the outstanding native-owner, production-parity, external-destination, field-performance, and final approval gates close with evidence.
