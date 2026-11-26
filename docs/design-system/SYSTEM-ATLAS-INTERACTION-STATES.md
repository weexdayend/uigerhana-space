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
