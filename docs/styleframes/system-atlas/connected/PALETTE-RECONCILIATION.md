# System Atlas — palette and contrast reconciliation

**Status:** Static token audit and targeted contrast fixes completed · 2026-11-27  
**Scope:** Connected SVG design studies only  
**Owner token acceptance:** Open; no production token freeze

## Audit outcome

The existing base palette remains unchanged. Review of the ten Chromium-rendered artboards found small Signal Copper text on light surfaces in three route examples:

| Artboard | Text | Surface | Original ratio | Correction | New ratio |
|---|---|---|---:|---|---:|
| Work index | `02 / WORK DOMAINS` | Inset light `#E8E6DC` | 1.90:1 | Light Secondary Text `#53645E` | 5.01:1 |
| Work index | Domain indices `01–04` | Limestone `#F1F0E8` | 2.08:1 | Light Secondary Text `#53645E` | 5.48:1 |
| Case study | `STATUS · IN PROGRESS` | Limestone `#F1F0E8` | 2.08:1 | Light Secondary Text `#53645E` | 5.48:1 |
| Résumé | `2021 — PRESENT`, `2017 — PRESENT` | Paper `#F8F6F0` | 2.20:1 | Light Secondary Text `#53645E` | 5.80:1 |

Copper accents, CTA fills, waypoint markers, and labels on dark surfaces remain unchanged. The work-index card accent rail still provides the warm signal while the index text itself is readable without color emphasis.

## Scoped colors

The connected artboards use the following additional values beyond the ten base palette roles:

| Value | Scoped role | Permitted specimen |
|---|---|---|
| `#E8E6DC` | Inset light surface | Connected page/card studies |
| `#C6C8BE` | Light boundary candidate | Decorative separators only |
| `#DFDED5` | Résumé preview canvas | `resume.svg` |
| `#F8F6F0` | Résumé paper surface | `resume.svg` |
| `#C98B5D` | Pressed Copper state | `interaction-states-desktop.svg` |
| `#E2E1D8` | Disabled light state | `interaction-states-desktop.svg` |

The résumé-specific pair is document chrome, not a new general page palette. Pressed/disabled tones are interaction-state variants, not decorative accents. The base palette itself has not expanded.

## Post-fix browser evidence

The exact code SHA `900df7b3442627eeb1caff2f47e88846b4ff232a` passed GitHub Actions [run #196](https://github.com/weexdayend/uigerhana-space/actions/runs/45904204824):
- Typecheck, content/publication checks, static styleframe integrity, lint, and production build: passed.
- Runtime visual/accessibility job: passed.
- Playwright: **32 passed, 0 failed**.
- The [post-palette browser QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45904204824/artifacts/15157900713) contains the updated work-index, case-study, and résumé PNG captures plus the ten-artboard geometry report.

## Regression coverage

`scripts/verify-system-atlas-styleframes.mjs` now:
- rejects any authored SVG fill/stroke color not present in the documented palette or scoped candidates;
- restricts résumé-specific and interaction-state-only colors to their intended SVGs;
- verifies the foreground token for the small labels corrected above;
- recalculates the relevant static contrast ratios and requires at least 4.5:1.

The existing Chromium/Playwright suite continues to test font loading, text geometry, text collisions, and the three layout contracts recorded in [VISUAL-REVIEW.md](./VISUAL-REVIEW.md).

## Boundaries

This is a design-study contrast reconciliation, not an axe-core certification of the SVGs or final UI. It does not approve:
- the token set globally;
- actual opacity, overlays, focus-ring adjacency, or rendered state contrast in production;
- changes to application CSS, routes, runtime fonts, public content, or deployment.

Owner review remains necessary before final token acceptance and any implementation phase.
