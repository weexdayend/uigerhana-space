# The System Atlas — responsive acceptance matrix

**Status:** Acceptance contract prepared for owner review · 2026-11-27  
**Scope:** Connected static styleframes and a future separately approved implementation  
**Implementation:** Not authorized by this document

This matrix turns the responsive direction into observable outcomes and failure criteria. It is a test plan, not a record that these checks have been executed.

## 1. How to use this matrix

The viewport widths below are **sampling points**, not declarations of CSS breakpoints. Do not infer that the design changes at exactly 1024px, 834px, 768px, or any other listed width. Choose actual transition thresholds only after testing content and component fit between samples.

Keep three evidence classes separate:

1. **Static design review:** compare the connected SVG artboards with intended hierarchy, order, and density. This can identify composition issues, but cannot prove responsive CSS behavior.
2. **Automated runtime checks:** run against the exact proposed application SHA and retain screenshots, browser traces, accessibility output, and test results.
3. **Manual owner/browser checks:** inspect real font loading, literal browser zoom, OS text scaling, native print dialogs, and behavior automation does not faithfully represent.

Use these result labels when recording a test: PASS, FAIL, BLOCKED, NOT RUN, or N/A. Every PASS needs a dated evidence link or screenshot and the tested commit. A green build alone is not a responsive acceptance result.

## 2. Viewport sampling matrix

| ID | CSS viewport | Device/context | Primary purpose | Compare with |
|---|---:|---|---|---|
| VP-01 | 1440 × 900 | Wide desktop | Full-width grid, hero balance, section rhythm, long-form measure | Homepage desktop artboard |
| VP-02 | 1280 × 800 | Laptop | Heading wraps, header fit, card density, navigation and section transitions | Desktop artboard, tighter width |
| VP-03 | 1024 × 768 | Compact desktop / landscape tablet | Find collisions before the desktop-to-compact navigation transition | Desktop and tablet compositions |
| VP-04 | 834 × 1112 | Tablet portrait | Validate the authored tablet composition and content order | Homepage tablet artboard |
| VP-05 | 768 × 1024 | Narrow tablet portrait | Stress two-column components and navigation fit | Tablet artboard, then mobile behavior where needed |
| VP-06 | 430 × 932 | Large phone | Validate generous mobile width and long labels | Mobile artboard |
| VP-07 | 390 × 844 | Mobile reference | Match the authored mobile homepage composition | Homepage mobile and mobile interaction artboards |
| VP-08 | 360 × 800 | Small phone | Catch action wrapping, inset pressure, and clipped focus | Mobile artboard with reduced width |
| VP-09 | 320 × 800 | Narrow reflow stress | Confirm content remains available without page-level horizontal scrolling | Mobile composition under constrained width |
| VP-10 | 390 × 667 | Short phone | Check header, first-screen actions, and compact vertical space | Mobile artboard |

The authored homepage artboards are 1440px, 834px, and 390px wide. VP-01, VP-04, and VP-07 are the direct width comparisons; other widths are intentional stress samples. Use the same source content and a consistent browser/device scale when comparing captures. Record browser chrome and device-pixel ratio separately.

### Expected viewport behavior

- **Wide desktop (VP-01):** preserve the 12-column editorial grid proposal, clear copy-first hero hierarchy, and a restrained atlas route. The content measure must remain comfortable; the route cannot compete with the H1 or actions.
- **Laptop (VP-02):** do not reduce type merely to retain a desktop composition. Allow columns and graphic area to contract before copy, labels, or controls become cramped.
- **Transition samples (VP-03 / VP-05):** navigation, grids, and action groups must change as a complete composition. No component may collide while waiting for a breakpoint. Record the actual transition width chosen during browser review; do not assume the artboard width is the breakpoint.
- **Tablet portrait (VP-04):** compare to the authored 834px frame. Validate reading order and the relationship between route, copy, selected work, and repeated content—not just the hero.
- **Phone (VP-06 / VP-07):** use one-column reading order where content width requires it. Keep identity and copy before decoration; actions remain obvious and reachable.
- **Small/narrow phone (VP-08 / VP-09):** preserve the 1rem page-edge gutter as the starting rule, but allow justified component-local inset adjustments. Wrap long labels; reduce decorative area before reducing readable body text or hiding controls.
- **Short phone (VP-10):** no sticky header, route graphic, or oversized hero treatment may obscure the next meaningful action. Scrolling must remain ordinary and predictable.

## 3. Page and component acceptance

| Surface | Required behavior across widths | Failure criteria |
|---|---|---|
| Page shell and grid | Centered content; stable alignment; 1rem base edge gutter; long-form measure remains around the proposed 64–72ch when space allows | Page-level horizontal overflow, inconsistent edge alignment, or text stretched across an unreadable measure |
| Header / navigation | Wordmark and navigation remain legible; compact disclosure appears before desktop links collide; disclosure exposes expanded state and closes on Escape; focus returns to its trigger | Overlapping links, clipped menu, inaccessible hidden items, focus loss, or a menu that unexpectedly traps focus |
| Hero | Approved identity and copy lead; actions follow the copy; atlas route is supporting visual structure; text wraps naturally | H1 clipped, key copy pushed below an excessive decoration block, CTA labels broken ambiguously, or identity only understandable after motion |
| Action group | Primary action precedes secondary action; groups wrap or stack without changing semantic order; control inset stays balanced | Controls shrink below usable size, overlap, become hover-only, or reorder visually against keyboard/reading order |
| Selected case study | Status, title, source-backed summary, and destination remain readable without hover; focus targets the actual link | Status only indicated by color, essential text hidden until hover, or decorative wrapper receives misleading focus |
| Generalized work domains | Rows/grid reflow to a clear one-column sequence where needed; title and description precede metadata on narrow screens | Domain summaries look like unpublished case studies, metadata overtakes the title, or descriptions become too narrow |
| Capabilities | Two columns only while labels and explanations remain comfortable; single-column reading order when width is insufficient | Skill names shrink to force a row, wrap into collisions, or imply unapproved proficiency levels |
| Experience | Preserve résumé dates and intentional overlap; period/role lead on mobile, with organization and explanatory copy following | Dates disappear, overlap is hidden, or timeline decoration becomes necessary to understand chronology |
| Principles / approach | Four-column desktop may reduce to two columns and then one; each principle remains complete without animation | Truncated supporting copy, uneven reading order, or an animated reveal that is required to see a principle |
| Writing cards | Three columns only when each card has a readable measure; move to two or one based on actual content fit | Narrow title columns, clamped essential titles, or duplicated/ambiguous link targets |
| Résumé surface | Document-like reading hierarchy; readable measure; print-specific rules do not remove on-screen content | Content clipped in the document, controls mixed into print output, missing page sections, or print-only omissions |
| Footer / contact | Existing approved destinations remain distinct and legible; no direct contact route is invented | Decorative control with no destination, invented contact details, or essential links hidden in a hover state |

### Composition rules

- The base gutter is 1rem. Approved paired inset roles remain compact 0.5rem / 0.75rem, control 0.75rem / 1.25rem, card 1.5rem / 1.5rem, and panel 2rem / 2.5rem. Local rem-based adjustment is allowed when evidence shows the component needs it.
- Use content fit—not device labels—to decide when columns stack. Do not create a tablet breakpoint just because a device is called a tablet.
- A component must not become a floating card solely to fill a grid cell. Keep hairlines and surfaces subordinate to hierarchy.
- Keep all status and action meaning in text. Color and the atlas route are supporting cues.
- No content may be removed simply to preserve a composition at a narrower width.

## 4. Interaction and input-state checks

| ID | Scenario | Expected result | Fail when |
|---|---|---|---|
| IN-01 | Keyboard through desktop header | Logical tab order; every destination reachable; visible focus on the actual target | Focus disappears, skips a destination, or is clipped |
| IN-02 | Mobile disclosure open / close | Native button semantics, correct expanded state, Escape closes, focus returns to trigger | Menu cannot be closed by keyboard or focus is stranded |
| IN-03 | Primary and secondary actions | Reading and focus order match visual order; touch targets remain comfortably operable | Visual order diverges or action is difficult to activate |
| IN-04 | Card and article links | Essential content is visible at rest; title/link is the actual target | Hover reveals the only content or focus lands on a decorative container |
| IN-05 | Hover, focus, pressed, disabled | State remains understandable on light and dark surfaces; pressed feedback causes no layout shift; disabled controls cannot activate | State relies only on color, focus ring clips, or opacity makes text unreadable |
| IN-06 | Touch, no hover | All essential affordances work without hover; no accidental horizontal page scroll | A required action exists only on hover or swipe steals ordinary vertical navigation |
| IN-07 | Reduced motion | Route and all waypoints are immediately visible; no stagger/pin/scroll choreography is required | Content is hidden until an animation or scroll trigger fires |
| IN-08 | Font unavailable / late loading | Fallback fonts preserve order and avoid overlap; content remains visible while fonts load | Layout collapses, controls shift over copy, or content is withheld |

The proposed focus treatment is 2px with a 0.1875rem offset: Signal Copper on dark surfaces and Atlas Ink on light surfaces. This is a design candidate; check the rendered ring against adjacent colors, clipping, sticky regions, overlays, and all interaction states. Prior static hex-pair calculations are not a substitute for state-by-state rendered contrast review.

## 5. Text, zoom, and content stress

Run these independently; they are not interchangeable:

- **Long-content pass:** use the actual approved headline, introduction, longest navigation label, longest case-study title, longest article title, and realistic paragraph lengths. Confirm line wrapping, spacing, and CTA separation.
- **Literal browser zoom:** set the browser to 200% and inspect desktop and route-level content. Record browser, OS, physical display size, zoom level, and resulting CSS viewport. Do not substitute a manually resized window for browser zoom.
- **OS text scaling:** change the operating-system text/display scaling independently of browser zoom. Record the OS setting and inspect navigation, buttons, metadata, cards, and the résumé.
- **Narrow reflow:** run VP-09 at 320 CSS pixels. Confirm all information and actions remain available without page-level horizontal scrolling. A deliberately scrollable component must be separately identified, operable, and must not trap the visitor.
- **Text expansion:** test a longer-than-usual string in navigation, status, button, date, and metadata positions. No label may overlap an icon or escape its component boundary.
- **Fallback type:** disable or delay Manrope / Plus Jakarta Sans in a controlled browser session. Confirm fallback typography remains legible and the page does not depend on exact font metrics to avoid collisions.

A viewport resize, a 200% browser zoom setting, and OS text scaling are three distinct test conditions. Passing one does not close the others.

## 6. Browser, print, and route coverage

| Area | Minimum coverage | Evidence to retain |
|---|---|---|
| Chromium | Automated responsive/interactions/accessibility suite plus manual visual inspection | Exact-SHA CI link, screenshots, traces, browser version |
| Safari / WebKit | Manual inspection of typography, disclosure, focus, scrolling, and print | OS/browser version, viewport, screenshots, defects |
| Firefox | Manual inspection of typography, focus, grid wrapping, and print | Browser version, viewport, screenshots, defects |
| Route coverage | Homepage, work index, approved in-progress case study, résumé | Route list and per-route result |
| Print / Save as PDF | Native browser print dialog on résumé, color and grayscale, page breaks, links, and all content | Browser/OS, paper size, margins, output PDF, page count |
| Deployment parity | Compare deployed production domain and reported commit with the reviewed release SHA | URL, timestamp, response/commit evidence; never infer from CI |

Print acceptance: hide only navigation and non-document controls; preserve all résumé content, meaningful links, role/date context, and readable grayscale contrast. Avoid forced page counts or blank trailing pages. The static résumé artboard is not proof of native print behavior.

## 7. Test-case register

The following register is ready for execution. Initial state is deliberately NOT RUN unless an evidence link is recorded.

| Test | Coverage | Initial status |
|---|---|---|
| RA-01 | VP-01 desktop hierarchy and 12-column composition | NOT RUN |
| RA-02 | VP-02 laptop density and natural title wrapping | NOT RUN |
| RA-03 | VP-03 / VP-05 transition collision check | NOT RUN |
| RA-04 | VP-04 tablet artboard composition | NOT RUN |
| RA-05 | VP-06 / VP-07 mobile copy-first order and action reachability | NOT RUN |
| RA-06 | VP-08 / VP-09 narrow mobile wrapping and overflow | NOT RUN |
| RA-07 | VP-10 short viewport and first-screen action visibility | NOT RUN |
| RA-08 | Navigation disclosure, Escape, and focus restoration | NOT RUN |
| RA-09 | Keyboard, focus-visible, pressed, disabled, and no-hover behavior | NOT RUN |
| RA-10 | Reduced-motion static visibility and route/waypoint availability | NOT RUN |
| RA-11 | Literal browser 200% zoom | NOT RUN |
| RA-12 | OS text scaling and font fallback | NOT RUN |
| RA-13 | Rendered contrast across actual states and surfaces | NOT RUN |
| RA-14 | Safari/WebKit and Firefox route coverage | NOT RUN |
| RA-15 | Native print dialog / Save as PDF for résumé | NOT RUN |
| RA-16 | Production-domain and reviewed-commit parity | NOT RUN |

For each executed case, append:

Test ID · PASS/FAIL/BLOCKED · date/time · commit SHA · browser/version · OS/device · viewport/scale · route/component · evidence URL · defect/owner

Do not overwrite a failed result when a fix is made; record the retest as a new dated entry linked to the original finding.

## 8. Acceptance and severity

A connected-styleframe review is accepted only when:

- the owner has reviewed desktop, tablet, and mobile as one visitor journey—not just the hero;
- every viewport row has a recorded disposition, including an explicit reason for any N/A;
- no P0 or P1 defect remains open;
- key copy, case-study state, article metadata, and destination labels remain source-backed;
- the same action order and reading order are preserved across compositions;
- the visual system remains understandable without motion, hover, or color alone.

Suggested severity:

- **P0 — Blocker:** content or primary navigation inaccessible; critical identity/evidence claim becomes false; page cannot be operated.
- **P1 — High:** important content/action clipped, overlapping, or unavailable at a target width; keyboard focus invisible; meaningful reflow failure.
- **P2 — Medium:** local spacing, wrapping, or visual-rhythm defect that does not block understanding or operation.
- **P3 — Polish:** minor visual inconsistency with no meaningful impact on comprehension or interaction.

Owner acceptance of the static frames does not authorize implementation. Implementation still requires a separate explicit decision and a later browser-rendered comparison against the accepted frames.

## 9. Evidence and current status

- Latest PR exact-HEAD CI for f7c5bb9ff11951a774552a6cfe135d36043b7f23 completed successfully in both **Typecheck, lint, and build** and **Runtime visual and accessibility QA** jobs.
- The runtime job installed Chromium and completed its responsive, interaction, and accessibility check step; it uploaded a browser-QA evidence artifact. This is evidence for the repository's existing runtime test target at that SHA—not a browser rendering of these static SVG artboards with Manrope and Plus Jakarta Sans loaded.
- The owner confirmed real-device and assistive-technology checks on 2026-11-27 at category level. Exact device/OS/browser and AT versions, scenarios, and detailed outcomes were not supplied. Preserve the attestation; do not invent missing specifics or ask for the same category check again without a demonstrated gap.
- Literal browser 200% zoom, OS text scaling, native print-dialog behavior, deployed production-domain/commit parity, direct contact-channel decision, and owner acceptance of remaining prioritized findings stay separate open gates in the roadmap/audit.
- Browser-rendered font metrics and final visual acceptance of the proposed System Atlas SVGs remain unverified.

This document is an acceptance contract and test register only. It does not close Phase 1, approve the palette/token freeze, establish browser compatibility, or authorize production implementation.
