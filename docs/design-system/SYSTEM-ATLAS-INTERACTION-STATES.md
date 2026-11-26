# The System Atlas — interaction-state contract

**Status:** State proposal for owner review · 2026-11-27  
**Scope:** Visual and behavioral contract for a future separately approved implementation

## 1. State principles

- Interactions are discoverable without animation.
- Keyboard focus is always visible and never replaced by hover styling.
- Color reinforces state but never carries meaning alone.
- Motion does not delay content or actions.
- Touch targets remain comfortably operable.
- A component must not advertise a behavior it does not perform.

## 2. State matrix

| Component | Default | Hover | Focus-visible | Pressed / active | Disabled |
|---|---|---|---|---|---|
| Primary action | Signal Copper fill, Atlas Ink label | Keep contrast; arrow may shift subtly | Contextual 2px outline with offset | Tiny visual compression; no layout shift | Native disabled semantics where button; no action for anchor |
| Secondary action | Transparent fill, one-pixel boundary | Surface tint/border emphasis | Contextual 2px outline with offset | Small inset/position cue | Native disabled semantics where button |
| Text link | Underline or clear arrow cue | Emphasize text/underline, not color alone | Same visible outline system | No layout shift | Use plain text when no destination |
| Navigation item | Neutral label and clear target | Subtle surface/text emphasis | Visible outline; current item also has non-color cue | Immediate navigation | Not disabled as an anchor |
| Case-study card | All essential content visible | Inset surface shift; strengthen action affordance | Focus the actual link, not a decorative wrapper | Avoid whole-card scale | Not applicable; keep unapproved items out of selector |
| Article card | Metadata/title/summary visible | Title underline and restrained surface response | Focus title link | No layout shift | Not applicable |
| Mobile menu | Closed disclosure state | Native control hover | Visible focus on menu button | Expanded state updates immediately | Native button disabled only if genuinely unavailable |
| Print action | Native button | Subtle background/arrow response | Visible outline | Short press response | Native disabled only while an actual operation is unavailable |

## 3. Focus appearance

Candidate rules for review:
- Outline thickness: `2px` (stroke thickness, not spacing).
- Outline offset: `0.1875rem`.
- Dark surfaces: Signal Copper outline.
- Light surfaces: Atlas Ink outline.
- Focus ring must not be clipped by overflow, card boundaries, sticky header, or scroll containers.
- Do not remove native outlines without an equally visible replacement.
- Keyboard focus and pointer hover are separate states; do not leave a hover-only visual after keyboard navigation.

The proposed contextual outline pairings have strong base-color contrast references in the art-direction spec, but the actual offset, adjacent surfaces, alpha, and focus-visible rendering still require browser review.

## 4. Pointer, touch, and target size

- Minimum control height candidate: `2.75rem` (44px at a 16px root size).
- Prefer larger targets for primary hero and mobile menu controls.
- Do not make tiny metadata or decorative waypoint markers interactive.
- A target can include visible text and surrounding whitespace; it does not need a pill or oversized icon button.
- Hover is enhancement only. No information or action is hover-exclusive.

## 5. Navigation behavior

- Use native anchors for page/section navigation and native buttons for state changes.
- Header menu button exposes `aria-expanded` and `aria-controls`.
- Escape closes the mobile disclosure and restores focus to its trigger.
- Activating a menu link closes the disclosure.
- Do not implement a focus trap for a non-modal disclosure.
- Section destinations require a real ID and a clear label.
- Sticky-header offsets must not obscure focused headings or anchor targets.
- External destinations use clear link text and appropriate safe target/rel behavior.

## 6. Reduced-motion behavior

When `prefers-reduced-motion: reduce`:
- render complete route and waypoint geometry immediately;
- remove route drawing, reveal stagger, large translate, and scroll-triggered movement;
- preserve all labels, content, and actions;
- replace animated state transitions with immediate state changes;
- never add a delayed fade as a substitute gate.

If JavaScript or GSAP fails, the page must remain understandable and operable in its static state.

## 7. Status, evidence, and unavailable actions

- Use visible status wording such as **In progress**; a copper marker can reinforce but cannot replace text.
- An unavailable destination is plain text, not a disabled-looking fake link.
- A draft-only project does not appear as a disabled public card; it remains outside the public selector.
- No direct contact form, email, booking, or “Hire me” action may appear until the destination and operating process are approved.
- Do not use “loading” indicators unless a real asynchronous operation exists.

## 8. Validation still required

- Keyboard-only review of all real controls after implementation.
- Visible focus check on every surface band and over card boundaries.
- 200% browser zoom and OS-level text scaling.
- Touch-target review on real devices.
- Screen-reader/assistive-technology announcement of menu, status, and action names.
- Reduced-motion runtime check on desktop and mobile.
- Browser contrast check for default, hover, focus, pressed, and disabled states.
- Cross-browser checks beyond Chromium.
- Native print-dialog behavior on the résumé route.

This contract is proposed behavior. None of these component states has been implemented or runtime-tested in this design-only bake.


## 9. Surface-specific contrast and boundary decisions

Ratios below were calculated from the authored hex colors using the WCAG relative-luminance formula. These are base color-pair calculations, not rendered-state validation.

| Foreground / boundary | Background | Ratio | Design decision |
|---|---|---:|---|
| Signal Copper | Atlas Ink | 7.51:1 | Accent text and focus candidate on dark |
| Signal Copper | Deep Mineral | 6.71:1 | Accent text on secondary dark |
| Signal Copper | Limestone | 2.08:1 | Not small text or sole control boundary on light |
| Sea Glass | Atlas Ink | 6.87:1 | Route and secondary signal on dark |
| Sea Glass | Deep Mineral | 6.14:1 | Outlined-control boundary candidate on dark |
| Sea Glass | Limestone | 2.27:1 | Decorative only on light |
| Fog | Atlas Ink | 9.42:1 | Supporting copy on dark |
| Fog | Deep Mineral | 8.42:1 | Supporting copy on secondary dark |
| Atlas Ink | Limestone | 15.61:1 | Primary text, control boundary, and focus candidate on light |
| Atlas Ink | inset light `#E8E6DC` | 14.26:1 | Primary text and focus candidate |
| Light Secondary | Limestone | 5.48:1 | Supporting text on light |
| Contour Line | Atlas Ink | 1.93:1 | Decorative separator only |
| Contour Line | Deep Mineral | 1.72:1 | Decorative separator only |
| Contour Line | Raised Mineral | 1.54:1 | Decorative separator only |
| Inset border `#C6C8BE` | Limestone | 1.48:1 | Decorative separator only |
| Inset border `#C6C8BE` | inset light `#E8E6DC` | 1.35:1 | Decorative separator only |

### Component pairing rules

- Dark surface: Copper primary fill with Atlas Ink label; Sea Glass secondary-control boundary with Fog or Limestone label; Copper focus ring.
- Light surface: Copper primary fill with Atlas Ink label and Atlas Ink one-pixel boundary; Atlas Ink secondary-control boundary and focus ring.
- Text links use Fog/Limestone on dark and Atlas Ink on light, plus underline or another non-color cue. Do not use Copper or Sea Glass as small link text on light.
- Status always includes readable text such as “In progress”; color is supplemental.
- Contour Line and Inset border group content but are never the only visible boundary of an interactive control.
- A disabled button uses native disabled semantics. An anchor without a real destination is plain text.

## 10. Focus-ring proposal

- Width: `2px`; offset: `0.1875rem` candidate.
- Dark surface ring: Signal Copper.
- Light surface ring: Atlas Ink.
- Keep the ring unclipped and separate from decorative borders.
- Avoid glow, pulse, or motion as the only focus indication.
- Validate against the actual adjacent surface, including inset cards, sticky headers, and scroll-container edges.

[Desktop interaction-state specimen](../styleframes/system-atlas/connected/interaction-states-desktop.svg) · [Mobile component specimen](../styleframes/system-atlas/connected/interaction-states-mobile.svg).

These calculations do not constitute an axe-core or browser visual pass.