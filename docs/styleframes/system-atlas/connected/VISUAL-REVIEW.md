# System Atlas — static artboard visual review

**Review state:** Post-fix Chromium render and visual inspection passed · 2026-11-27  
**Validated code SHA:** a615ad41286dc85381d063823f7a56bac8f3c500  
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

GitHub Actions run [#190 · 45902670980](https://github.com/weexdayend/uigerhana-space/actions/runs/45902670980) completed successfully on the validated code SHA.

- Typecheck, lint, static copy/SVG integrity, and production build: passed.
- Runtime visual and accessibility QA job: passed.
- Playwright: **32 passed, 0 failed**.
- Chromium loaded both selected font families before measuring the SVG text.
- All ten artboards reported zero text boxes outside their viewBox, zero text-node intersections, and zero failures in the targeted layout contracts.

[Open the post-fix browser QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45902670980/artifacts/15155194933) — ten System Atlas PNG captures, geometry/font JSON report, and the broader portfolio browser QA evidence.

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
