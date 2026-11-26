# The System Atlas — motion storyboard

**Engine:** existing GSAP 3.15.1 + ScrollTrigger  
**Status:** Initial static choreography proposal for owner review  
**Dependency change:** None

## Motion thesis

One continuous, unbranched route is the signature motion. It represents a progression through work—understand, shape, engineer, operate—not a data visualization. Motion should clarify sequence and spatial continuity without delaying identity, copy, evidence, navigation, or actions.

## Hero sequence

| Order | Element | Proposed timing | Behavior |
|---|---|---:|---|
| 1 | Hero artwork | 1.30s | Subtle opacity and horizontal settle; no scale spectacle |
| 2 | Headline | 0.55–0.75s | Opacity + short vertical settle |
| 3 | Name and role | 0.55–0.75s | Follow the headline in reading order |
| 4 | Introduction | 0.55–0.75s | Short opacity/vertical settle |
| 5 | Actions | 0.55–0.65s | Appear after the supporting copy |
| 6 | Atlas route | 0.90–1.15s | Draw a single SVG stroke from origin to terminal waypoint |
| 7 | Waypoints | 0.18–0.24s each | Reveal at the route's progression points |

The times are starting ranges from the art-direction proposal, not a commitment to animate every element. Keep the timeline coherent and restrained.

## Section transitions

Use a single unpinned reveal when a section enters view. A small opacity/position change or contour line progression is enough. The content is already present in the document and remains readable if JavaScript is unavailable or delayed.

Do not:
- pin or lock the hero or any content panel;
- intercept or hijack native scrolling;
- require parallax or pointer movement;
- add an always-running background loop or mandatory preloader;
- animate layout dimensions or use expensive continuous blur/filter effects;
- hide text or route waypoints until animation completes.

## Reduced motion and failure behavior

When `prefers-reduced-motion: reduce` is active:
- render the full route and every waypoint immediately;
- skip the route-draw timeline, stagger, large translation, and scroll-triggered movement;
- keep all content and actions in their final visible state;
- do not replace motion with a delayed fade that still gates information.

If JavaScript or GSAP fails, the static route and all page content must remain visible.

## Implementation constraints for a separately approved phase

- Use `gsap.context()` and scoped selectors at the client boundary.
- Clean up timelines and ScrollTriggers on unmount.
- Register ScrollTrigger once at the appropriate client boundary.
- Prefer transforms, opacity, and SVG stroke-dash offset.
- Avoid layout reflow and persistent compositing-heavy effects.
- Do not add a new animation dependency; GSAP 3.15.1 is already present in the repository.

The storyboard is a design proposal. It has not been implemented or tested in the browser as part of this package.
