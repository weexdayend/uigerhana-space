# The System Atlas — semantic token proposal

**Status:** Initial token proposal for owner review · 2026-11-27  
**Not:** a frozen production token contract

This proposal translates the selected visual direction into semantic roles. Previously owner-selected values remain explicit; all other values are proposals for review.

## 1. Color roles

### Selected palette

| Semantic token | Value | Intended use |
|---|---|---|
| `--atlas-ink` | `#10191B` | Main dark surface; primary text on light surface |
| `--deep-mineral` | `#172426` | Secondary dark band |
| `--raised-mineral` | `#1E2D30` | Elevated dark panel within a dark band |
| `--limestone` | `#F1F0E8` | Main light surface and text on dark |
| `--fog` | `#B4BFB8` | Body/supporting text on dark |
| `--sage-graphite` | `#81908A` | Muted metadata on Atlas Ink only |
| `--sea-glass` | `#86A89B` | Atlas route and secondary signal |
| `--signal-copper` | `#D99B68` | Primary action and rare emphasis |
| `--contour-line` | `#3C4A49` | Hairline boundaries on dark |
| `--light-secondary-text` | `#53645E` | Supporting text on Limestone |

### Additional surface and state candidates

The connected specimens use supporting neutrals and interaction-only tones beyond the selected base palette. These are scoped study roles, not new global palette colors:

| Semantic role candidate | Value | Current specimen usage | Scope |
|---|---|---|---|
| `--inset-light` | `#E8E6DC` | Inset light content surface | Connected page/card studies |
| `--light-inset-border` | `#C6C8BE` | Hairline page/card separators | Decorative boundaries only |
| `--resume-preview-canvas` | `#DFDED5` | Outer canvas around the document sheet | `resume.svg` only |
| `--resume-paper` | `#F8F6F0` | Résumé document surface | `resume.svg` only |
| `--signal-copper-pressed` | `#C98B5D` | Pressed primary-action fill | Desktop state specimen only |
| `--light-disabled-surface` | `#E2E1D8` | Disabled action fill on light surface | Desktop state specimen only |

The résumé canvas/paper pair is local to the document study; it does not redefine the general light page surface. Pressed and disabled tones are state-only variants and must not become decorative palette accents. The static verifier restricts these scoped values to their intended SVGs.

All values remain candidates pending owner review. Do not treat this table as a global token freeze.

## 2. Contrast and semantic restrictions

The palette pass found small Signal Copper labels on light surfaces in the work index, case-study status, and résumé date metadata. They were changed to Light Secondary Text. Copper remains available for dark-surface labels, CTA fills, waypoint accents, and non-text emphasis.

| Foreground | Background | Calculated ratio | Intended specimen use |
|---|---|---:|---|
| Light Secondary Text `#53645E` | Limestone `#F1F0E8` | 5.48:1 | Small labels and secondary text |
| Light Secondary Text `#53645E` | Inset light `#E8E6DC` | 5.01:1 | Section labels and card indices |
| Light Secondary Text `#53645E` | Résumé paper `#F8F6F0` | 5.80:1 | Date metadata and supporting copy |
| Atlas Ink `#10191B` | Pressed Copper `#C98B5D` | 6.23:1 | Pressed primary-action label |
| Light Secondary Text `#53645E` | Disabled light `#E2E1D8` | 4.77:1 | Disabled action label |
| Light inset border `#C6C8BE` | Résumé paper `#F8F6F0` | 1.57:1 | Decorative page boundary only |

These are static WCAG relative-luminance calculations using authored hex values. They do not validate opacity, overlays, anti-aliasing, font weight, or final browser states. `#C6C8BE` remains decorative and must never be the sole boundary of an interactive control.


Static pair calculations already recorded in the art-direction specification are retained as reference only. They do not validate opacity, overlays, focus indicators, interaction states, or final browser rendering.

- Fog is suitable for supporting text on Atlas Ink based on the documented pair calculation.
- Sage Graphite is muted metadata on Atlas Ink; do not use it for body copy.
- Use Atlas Ink / Light Secondary Text on light surfaces.
- Do not use Sea Glass or Signal Copper for small text on Limestone.
- Signal Copper is a primary action/waypoint color, not a generic decorative fill.
- Always pair status color with visible text.
- Use a contextual focus treatment: Signal Copper against dark surfaces; Atlas Ink against light surfaces. Verify rendered outline and offset in browser.
- No opacity-only state should be used to reduce essential text contrast.

## 3. Typography roles

Owner-selected families:
- Display and headings: **Manrope** (600–700).
- Body and interface: **Plus Jakarta Sans** (400–700).
- Technical metadata: platform monospace stack only.

| Semantic token | Initial responsive value | Role |
|---|---|---|
| `--type-display` | `clamp(2.75rem, 5vw, 4rem)` | Hero / major statement |
| `--type-section` | `clamp(2rem, 3.5vw, 3rem)` | Section headings |
| `--type-subheading` | `clamp(1.25rem, 2vw, 1.5rem)` | Card and group headings |
| `--type-body` | `1rem` | Paragraphs and long-form content |
| `--type-supporting` | `0.875rem` | Summaries and secondary descriptions |
| `--type-metadata` | `0.6875rem` | Compact mono metadata, use sparingly |

Line-height proposal:
- Display: 1.02–1.08.
- Headings: 1.08–1.2.
- Body: 1.65–1.75.
- Metadata: 1.35–1.5.

Type sizes and line breaks need real-font browser review before any values are frozen.

## 4. Spacing and inset API

Owner-selected base gutter: `1rem`.

Owner-selected spacing scale:

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

Owner-selected paired inset roles:

| Component role | `--py` | `--px` |
|---|---:|---:|
| Compact | `0.5rem` | `0.75rem` |
| Control | `0.75rem` | `1.25rem` |
| Card | `1.5rem` | `1.5rem` |
| Panel | `2rem` | `2.5rem` |

Component-local override is allowed when justified, using rem values only. Hairline strokes can remain 1 CSS px; the rem constraint applies to spacing, not border thickness.

## 5. Layout and shape proposals

- Base page gutter: `1rem`.
- Wide layout: centered 12-column grid.
- Main content max-width candidate: `85rem`; review at real 1440px and wide-desktop browser sizes.
- Long-form reading measure candidate: `64–72ch`.
- Border: one-pixel hairlines only where they clarify grouping.
- Shadow: none by default.
- Radius: square or subtly rounded; candidate range `0.125rem–0.25rem`, not yet owner-approved.
- Avoid literal px spacing values in padding, margin, gaps, and insets.

## 6. Draft CSS translation (not implemented)

```css
:root {
  /* Selected palette roles */
  --atlas-ink: #10191b;
  --deep-mineral: #172426;
  --raised-mineral: #1e2d30;
  --limestone: #f1f0e8;
  --fog: #b4bfb8;
  --sage-graphite: #81908a;
  --sea-glass: #86a89b;
  --signal-copper: #d99b68;
  --contour-line: #3c4a49;
  --light-secondary-text: #53645e;

  /* Owner-selected layout */
  --gutter: 1rem;
  --inset-control-y: 0.75rem;
  --inset-control-x: 1.25rem;
  --inset-card-y: 1.5rem;
  --inset-card-x: 1.5rem;
  --inset-panel-y: 2rem;
  --inset-panel-x: 2.5rem;

  /* Proposed typography */
  --type-display: clamp(2.75rem, 5vw, 4rem);
  --type-section: clamp(2rem, 3.5vw, 3rem);
  --type-body: 1rem;
}
```

This example is documentation only. No application stylesheet or runtime token has been modified.
