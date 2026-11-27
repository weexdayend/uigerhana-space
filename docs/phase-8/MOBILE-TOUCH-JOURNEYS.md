# Phase 8.9 — Mobile Touch Journeys

**Status:** Instrumented; exact-head CI evidence pending.  
**Base:** Phase 8.8 mobile-performance-lab branch.  
**Scope:** Chromium mobile/touch emulation against the local production build.

## Automated journeys

### 1. Primary navigation by tap

The test creates a 390 × 844 CSS viewport with DPR 3, `isMobile`, and `hasTouch`. It performs the following actions using Playwright touchscreen taps:

1. Open the mobile navigation.
2. Choose Work and verify the menu closes while the page moves to the selected-work anchor.
3. Tap Explore all work to open `/work`.
4. Tap Read case study to open the currently approved public case study at `/work/uigerhana-space`.

For each control it records the bounding rectangle and requires a minimum 24 × 24 CSS-pixel target. It also records the current route, menu expanded state, final viewport geometry, and uncaught page errors.

Artifact: `mobile-touch-navigation-journey.json`; screenshot: `mobile-touch-case-study.png`.

### 2. Product Journey horizontal swipes

The test uses CDP touch input (`Input.dispatchTouchEvent`) to send actual browser touch-start/move/end sequences against the horizontal `Product journey` region. It records each gesture's coordinates, scroll offset before/after, most visible panel, and per-panel visibility.

The exit condition verifies that the last panel becomes substantially visible, the browser viewport remains free of page-level horizontal overflow, and there are no uncaught page errors.

Artifact: `mobile-touch-product-journey-swipe.json`; screenshot: `mobile-touch-product-journey-final-panel.png`.

## CI and platform boundaries

- Runs once in Chromium; the test is skipped in Firefox and WebKit because the CDP touch dispatch is Chromium-specific.
- The rest of the existing three-engine suite continues to run as before.
- The 24 × 24 CSS-pixel minimum is the explicit automated sample threshold, not a full certification of touch usability.
- Playwright/Chromium touch emulation is not a physical iOS or Android touchscreen, native OS gesture recognizer, screen reader, or mobile assistive-technology test.
- Native edge-swipe/back gestures, device safe areas, browser chrome behavior, haptics, real touch latency, and physical-device OS scaling remain manual.

No physical-device, field performance, INP, or native assistive-technology claim is made by this slice.
