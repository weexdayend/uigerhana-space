# The System Atlas — state and responsive review

**Status:** Static visual specimen package prepared for owner review · 2026-11-27  
**Scope:** Design proposals only; no browser or assistive-technology pass claimed

## Desktop specimen

[Open desktop interaction-state board](./interaction-states-desktop.svg)

Shows primary action default, hover, focus-visible, pressed, and disabled states; secondary/tertiary actions; and the distinction between decorative card borders and real focus targets.

## Mobile specimen

[Open mobile navigation and component board](./interaction-states-mobile.svg)

Shows header disclosure closed/open, stacked primary and secondary actions, focus treatment, selected-case-study card, and a one-column article preview.

## Contrast findings

| Pair | Ratio | Intended use |
|---|---:|---|
| Copper / Atlas Ink | 7.51:1 | Primary action label on Copper; focus on dark |
| Copper / Deep Mineral | 6.71:1 | Accent on secondary dark |
| Copper / Limestone | 2.08:1 | Not small text or sole control boundary on light |
| Sea Glass / Atlas Ink | 6.87:1 | Route/secondary signal on dark |
| Sea Glass / Deep Mineral | 6.14:1 | Dark outlined-control boundary candidate |
| Sea Glass / Limestone | 2.27:1 | Decorative only on light |
| Fog / Atlas Ink | 9.42:1 | Supporting copy on dark |
| Fog / Deep Mineral | 8.42:1 | Supporting copy on secondary dark |
| Atlas Ink / Limestone | 15.61:1 | Text, boundary, and focus candidate on light |
| Atlas Ink / inset light | 14.26:1 | Text and focus candidate |
| Light Secondary / Limestone | 5.48:1 | Supporting text on light |
| Contour / Atlas Ink | 1.93:1 | Decorative separator only |
| Contour / Deep Mineral | 1.72:1 | Decorative separator only |
| Contour / Raised Mineral | 1.54:1 | Decorative separator only |
| Inset border / Limestone | 1.48:1 | Decorative separator only |
| Inset border / inset light | 1.35:1 | Decorative separator only |

### Consequences

- Dark secondary controls use Sea Glass boundaries; light secondary controls use Atlas Ink boundaries.
- Copper primary buttons on light use an Atlas Ink boundary because Copper against Limestone alone is only 2.08:1.
- Copper and Sea Glass are not small text on Limestone.
- Contour Line is a decorative divider, not the only edge of an interactive component.
- Focus uses Copper on dark and Atlas Ink on light; proposed 2px width and 0.1875rem offset.
- Color is paired with words, underlining, border shape, or another visible cue.

## Owner review checklist

- [ ] Desktop specimens feel consistent with connected full-page styleframes.
- [ ] Mobile menu remains a disclosure, not a modal; Escape closes and restores focus to trigger.
- [ ] Primary action precedes secondary action in mobile reading order.
- [ ] No content or action is hover-exclusive.
- [ ] Focus ring belongs to the actual target and is not clipped.
- [ ] Pressed feedback does not create layout shift.
- [ ] Disabled buttons use native semantics; nonexistent links render as plain text.
- [ ] Status text remains meaningful without color.
- [ ] Actual rendered contrast and boundaries are checked after implementation.
- [ ] Keyboard, touch, reduced-motion, browser zoom, OS text scaling, and cross-browser tests are recorded separately.

## Limitations

These SVGs do not prove real font metrics, responsive CSS reflow, browser zoom, keyboard/AT/touch behavior, contrast after opacity/overlays, native print behavior, or deployed parity. They are design review aids, not runtime QA artifacts. Production implementation remains out of scope.
