# The System Atlas — art direction and visual system proposal

**Decision date:** 2026-11-27  
**Owner-selected concept:** A — The System Atlas  
**Status:** art direction refinement for owner review; not a production token freeze  
**Parent identity:** `docs/BRAND-IDENTITY-SPEC.md`

## 1. Direction

The owner selected **The System Atlas** as the visual direction to develop. The identity remains **Irvan Gerhana — Product Engineer**, with the approved line **From pixel to production.**

The Atlas is a visual metaphor for making complex work legible: one continuous route, a small number of meaningful waypoints, and quiet contour lines that suggest context and depth. The route must support the person and message; it must never become a dashboard, network diagram, map UI, sci-fi HUD, or decorative data visualization.

The experience should feel **grounded** (calm mineral surfaces), **precise** (deliberate spacing), **human** (readable typography and warm signal), and **systems-aware** (a route connecting understanding, shaping, engineering, and operating).

## 2. Typography

**Owner-selected pairing: Manrope + Plus Jakarta Sans.**

| Role | Family | Usage |
|---|---|---|
| Display / headings | **Manrope** | Hero headline, section headings, short editorial statements, brand wordmark treatment |
| Body / interface | **Plus Jakarta Sans** | Paragraphs, navigation, controls, buttons, card copy, long-form reading |
| Technical metadata | Native system monospace stack | Small technical labels, timestamps, compact IDs only; never body copy |

Recommended initial weights: Manrope 600–700 for display; Plus Jakarta Sans 400 for body, 500 for navigation, 600–700 for actions and emphasis. Keep body line-height generous (around 1.65–1.75); keep display line-height close (around 0.98–1.08) and use restrained negative tracking. All responsive type sizes should use `rem` and `clamp()`, not fixed pixel type sizes.

When production implementation is authorized, load Manrope and Plus Jakarta Sans through `next/font/google` and expose semantic CSS variables. Do not add a third downloaded font simply for metadata; use the platform monospace stack. The SVG styleframes declare the selected families but do not embed font files, so final metrics and line breaks must be checked in the browser with the real font assets.

## 3. Palette — delegated selection

The owner delegated palette selection. This proposal is chosen to express a thoughtful, technical, craft-conscious product engineer without leaning on neon, cyberpunk, or a generic blue SaaS palette.

**Palette name: Basalt / Limestone / Sea Glass / Signal Copper.**

| Token | Hex | Role |
|---|---|---|
| Atlas Ink | `#10191B` | Primary dark canvas and high-contrast text on light surfaces |
| Deep Mineral | `#172426` | Secondary dark surface |
| Raised Mineral | `#1E2D30` | Raised dark surface; pair with the primary light text |
| Limestone | `#F1F0E8` | Primary light text and light content surface |
| Fog | `#B4BFB8` | Secondary text on dark surfaces |
| Sage Graphite | `#81908A` | Muted metadata on Atlas Ink |
| Sea Glass | `#86A89B` | Atlas route, active waypoint, quiet visual signal |
| Signal Copper | `#D99B68` | Primary action, final waypoint, rare emphasis |
| Contour Line | `#3C4A49` | Fine boundaries on dark surfaces |
| Light Secondary Text | `#53645E` | Secondary text on Limestone surfaces |

### Usage rules

- Start with Atlas Ink / Deep Mineral and Limestone. Keep the majority of the interface neutral.
- Sea Glass is the main route color and secondary signal; reserve it for the atlas line, selected waypoints, and small accents.
- Signal Copper is the decisive signal: primary CTA, one terminal waypoint, or one small highlight. Do not use it as a general decorative fill.
- Fog is readable supporting text on dark surfaces. Sage Graphite is for muted metadata on Atlas Ink, not body text.
- On light surfaces, use Atlas Ink for primary text and Light Secondary Text for secondary copy. Do not use Sea Glass or Signal Copper for small text on Limestone.
- Keep contour lines low contrast and subordinate to the route. Never communicate state by color alone.

### Contrast checks

Static WCAG contrast-ratio calculations for the proposed pairs:

| Foreground | Background | Ratio |
|---|---|---:|
| Limestone | Atlas Ink | 15.61:1 |
| Fog | Atlas Ink | 9.42:1 |
| Sage Graphite | Atlas Ink | 5.34:1 |
| Sea Glass | Atlas Ink | 6.87:1 |
| Signal Copper | Atlas Ink | 7.51:1 |
| Atlas Ink | Signal Copper | 7.51:1 |
| Light Secondary Text | Limestone | 5.48:1 |

These are color-pair calculations, not a substitute for checking actual states, opacity, typography, images, focus indicators, and rendered components in browser QA.

## 4. Layout, gutter, spacing and inset rules

**Owner-selected base gutter: `1rem`** (16 CSS pixels when the browser root size is 16 pixels). Use it as the minimum page-edge inset and the default grid gutter. A 12-column desktop grid may sit inside a centered max-width container; mobile keeps the same `1rem` page-edge gutter.

Use a rem-based spacing scale. Do not express spacing as literal `8px`, `12px`, or `16px` values in padding, margin, gap, or inset declarations. The underlying browser default may resolve rem values to those pixel measurements, but the design system remains root-relative.

| Token | Value |
|---|---:|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.375rem` |
| `--space-3` | `0.5rem` |
| `--space-4` | `0.75rem` |
| `--space-5` | `1rem` |
| `--space-6` | `1.25rem` |
| `--space-7` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-9` | `2.5rem` |
| `--space-10` | `3rem` |
| `--space-11` | `4rem` |
| `--space-12` | `5rem` |
| `--space-13` | `6rem` |

### Paired inset API

Use a local `--py` / `--px` pair for each component. The Y and X values are intentionally independent, so a control can be compact vertically but comfortable horizontally. Set both from rem tokens; do not copy raw pixel values from a screenshot.

```css
:root {
  --gutter: 1rem;

  --inset-compact-y: 0.5rem;
  --inset-compact-x: 0.75rem;
  --inset-control-y: 0.75rem;
  --inset-control-x: 1.25rem;
  --inset-card-y: 1.5rem;
  --inset-card-x: 1.5rem;
  --inset-panel-y: 2rem;
  --inset-panel-x: 2.5rem;
}

.atlas-control {
  --py: var(--inset-control-y);
  --px: var(--inset-control-x);
  padding-block: var(--py);
  padding-inline: var(--px);
}

.atlas-card {
  --py: var(--inset-card-y);
  --px: var(--inset-card-x);
  padding: var(--py) var(--px);
}
```

For a component requiring a different proportion, override only its local pair, for example `--py: 1rem; --px: 0.5rem;`. Prefer `padding-block` and `padding-inline` where writing-mode behavior matters. Hairline borders may remain one CSS pixel; the rem-only rule applies to spacing, not stroke thickness.

## 5. Composition and graphic language

- Desktop: copy-led left field and one spatial atlas on the right. Identity, role, headline, introduction, and CTAs are the first read.
- Mobile: preserve the copy-first order. The route becomes a compact horizontal passage after the introduction; actions follow the visual and remain easy to reach.
- The route is one continuous, unbranched line. Waypoints are meaningful stages, not data points.
- Contour lines suggest terrain and context; keep them low contrast and sparse.
- Use square or subtly rounded geometry. Avoid floating pills, excessive cards, tiny labels, fake coordinates, pseudo-metrics, orbit rings, and dense grids.
- Retain the approved shared copy verbatim. The styleframe does not approve replacement headline or new biography.

## 6. Motion — GSAP

**Owner-selected motion engine: GSAP.** The repository already uses GSAP 3.15.1 and ScrollTrigger in the motion narrative. No additional motion dependency is proposed.

| Sequence | Behavior | Initial timing |
|---|---|---|
| Hero copy | Short opacity and vertical settle, in reading order | 0.55–0.75s; `power2.out` |
| Atlas route | Draw the single route from origin to destination | 0.9–1.15s; `power2.inOut` |
| Waypoints | Reveal only after the route reaches each point | 0.18–0.24s each; 0.08–0.12s stagger |
| Section atlas | Unpinned waypoint/contour reveal when the section enters view | 0.45–0.65s; `power2.out` |

Implementation constraints:

- Use one coherent GSAP timeline rather than unrelated effects. The route draw is the primary motion signature.
- Keep the page and all content understandable in the static state. Never rely on animation to reveal identity, copy, navigation, or actions.
- Do not pin or lock the hero, intercept normal scrolling, use a mandatory preloader, or run a perpetual background loop.
- Do not add parallax as a required interaction; pointer response remains optional and touch has an equivalent static experience.
- Honor `prefers-reduced-motion`: show the complete route and all waypoints immediately, with no large translation or scroll-driven movement.
- Use `gsap.context()` / scoped selectors and clean up timelines and ScrollTriggers on unmount. Register ScrollTrigger once at the appropriate client boundary.
- Prefer transform, opacity, and SVG stroke-dash offset. Avoid continuous filters, layout animation, and expensive blur.
- Initial content must remain visible if JavaScript fails or loads late.

The timing values above are an initial choreography proposal, not a license to animate every section. Motion must remain subordinate to reading and navigation.

## 7. Responsive review frames

- [Desktop — 1440 × 900](../styleframes/system-atlas/desktop.svg)
- [Mobile — 390 × 844](../styleframes/system-atlas/mobile.svg)
- [Small mobile — 360 × 800](../styleframes/system-atlas/small-mobile.svg)
- [Visual preview index](../styleframes/system-atlas/README.md)

The frames use the exact approved name, role, headline, introduction, brand line, and CTA labels. They are editable SVG design studies. SVG viewBox coordinates describe the artboard; production CSS spacing remains rem-based. The SVGs declare the chosen font families but do not embed font files.

## 8. Approval and implementation boundary

Owner direction is clear for the concept, type pairing, GSAP engine, and base gutter/inset approach. The palette is a designer selection made under owner delegation. The complete color roles, actual typography metrics, visual hierarchy, and motion choreography still need owner review against these frames.

This package does **not** change `src/`, `app/`, CSS, runtime dependencies, routes, profile data, public copy, or publication state. Phase 1 remains open. Production implementation, token freeze, and site-wide application remain gated by the roadmap and a separate implementation authorization.
