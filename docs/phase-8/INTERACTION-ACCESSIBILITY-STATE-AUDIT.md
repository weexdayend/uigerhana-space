# Phase 8.4 — Interaction Accessibility State Audit

**Status:** PASS — automated state and target-geometry checks passed on exact-head push and PR workflows.
**Stack base:** PR #28 / `phase-8/interaction-accessibility-states`.
**Scope:** Browser-observable interaction states for the currently approved public routes. No UI redesign or production behavior changes are included.

## 1. Why this slice exists

The existing suite already covers:
- Keyboard traversal and focus order across public routes.
- Mobile navigation keyboard operation, Escape, and focus return.
- Reduced-motion document flow and pinned-story content reachability.
- Axe WCAG A/AA, WCAG 2.1/2.2 AA, and best-practice scans.
- Responsive and 200% CSS root-text reflow.
- Styleframe typography/layout geometry.

The remaining automation gap is state-specific evidence for focus-visible appearance, pointer hover feedback, and minimum hit-area geometry on primary controls. A passing default-state axe scan does not by itself prove that these non-default states visibly change or that the primary hit area is large enough.

## 2. Automated checks

The new `tests/e2e/interaction-accessibility.spec.ts` adds:

1. **Keyboard focus-visible appearance** — Tab traversal reaches representative header, hero, contact, case-study, and résumé controls across the four public routes. Each sampled focus state must expose a non-none outline, at least 2 CSS px width, a non-transparent color, and a positive outline offset.
2. **Mobile menu focus** — after keyboard activation, the mobile navigation links retain the visible focus treatment.
3. **Primary target geometry** — primary menu, CTA, and print controls must measure at least 24 × 24 CSS px at a 390px mobile viewport. Inline prose links are excluded from this minimum-target sample; they are not reclassified as standalone controls.
4. **Pointer hover delta** — representative menu, hero, case-study, contact, and résumé actions must change the CSS property authored for hover. This is recorded once in Chromium to avoid redundant engine measurements.
5. **Pointer menu activation** — the mobile menu opens and closes by pointer activation with its `aria-expanded` state and navigation visibility synchronized.

Focus and target geometry run in Chromium, Firefox, and WebKit. Pointer-state measurements run once in Chromium. The test writes machine-readable JSON evidence into the browser QA artifact.

## 3. Interpretation and limits

- The 24 × 24 check is scoped to primary standalone controls and CTAs. It is not a blanket requirement for inline text links.
- A measured CSS hit area does not prove behavior on a physical touch device or with OS display scaling.
- The hover delta checks prove that the declared state visibly changes a selected computed property; they do not by themselves certify color contrast. Axe scans remain a separate automated check.
- Playwright WebKit is not installed Safari. No claim is made about a specific real browser/OS assistive-technology combination.
- Focus-ring geometry in automation does not close the native screen-reader, OS text scaling, literal browser zoom, or owner-operated acceptance gates.

## 4. Exit criteria

- New focus-state and target-size checks pass in Chromium, Firefox, and WebKit on the exact PR head.
- Chromium pointer hover and mobile menu pointer activation checks pass.
- JSON evidence is uploaded with the matching CI artifact.
- Any failure is traced to either a real UI defect or a demonstrated test-contract issue; assertions must not be weakened only to force a green run.

## 5. Exact-head validation

- PR Actions [#46066904014](https://github.com/weexdayend/uigerhana-space/actions/runs/46066904014) and push Actions [#46066883235](https://github.com/weexdayend/uigerhana-space/actions/runs/46066883235) both completed successfully.
- Both runtime jobs: 327 passed, 6 skipped, 0 failed.
- Artifacts: [PR #15230689950](https://github.com/weexdayend/uigerhana-space/actions/runs/46066904014/artifacts/15230689950) and [push #15230759858](https://github.com/weexdayend/uigerhana-space/actions/runs/46066883235/artifacts/15230759858).

## 6. Release boundary

This slice is test and evidence only. Native browser 200% zoom, native OS text scaling, the actual print dialog/Save as PDF flow, physical-device behavior, external link reachability, production commit parity, and final owner release acceptance remain separate gates. Release remains NO-GO until all required evidence and owner approval exist.
