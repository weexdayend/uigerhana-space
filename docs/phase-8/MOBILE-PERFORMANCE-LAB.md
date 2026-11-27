# Phase 8.8 — Mobile-Class Performance Lab

**Status:** Instrumented; exact-head CI evidence pending.  
**Base:** Phase 8.7 production-parity-audit branch.  
**Scope:** Local production-build lab emulation only; this is not field performance acceptance.

## Method

The Chromium-only Playwright test `tests/e2e/mobile-performance-lab.spec.ts` creates a fresh context for each approved public route:

- `/`
- `/work`
- `/work/uigerhana-space`
- `/cv`

Each context uses a 390 × 844 CSS viewport, device scale factor 3, mobile layout mode, and touch capability. Chrome DevTools Protocol applies 4× CPU throttling and a controlled cellular-4G-like network profile (150 ms RTT, 1.6 Mbps download, 750 Kbps upload).

For each route the test records one first view in an isolated context and one repeat navigation in the same context. That produces eight navigation samples in total.

## Captured evidence

- TTFB, FCP, LCP and the LCP element where available.
- CLS, DOMContentLoaded and load-event timing.
- Resource count, transfer/encoded/decoded bytes, and transfer bytes grouped by scripts, stylesheets, images, fonts, and other resources.
- Long-task count, total duration, and maximum duration.
- Viewport width/height, device pixel ratio, document scroll width, and body scroll width.
- Console errors, page errors, and failed requests.
- Per-route medians and all raw samples.

The artifact is `phase-8-mobile-performance-lab.json`, uploaded with the normal Playwright browser-QA artifact.

## Interpretation and limits

This is an **emulated lab profile**, not a physical device result. It does not claim:

- Real Android or iOS performance.
- Field Core Web Vitals, representative-user networks, or INP.
- Physical battery, thermal, GPU, memory, or radio behavior.
- Real carrier/network variability or geographic CDN/server conditions.

No pass/fail performance budgets are set from this first sample. The assertions only prove that the intended route set loaded successfully and the requested mobile emulation profile was active. Timing values remain observational and must be reviewed alongside repeated measurements and physical-device/field evidence.

## Release gate relationship

- `P8-PERF-03` tracks the mobile-class lab artifact and exact-head CI.
- `P8-PERF-02` (field/mobile/INP acceptance) remains **NOT VERIFIED** until representative physical-device and field evidence is reviewed.
- Native zoom, OS text scaling, native print, production commit parity, external destination reachability/content, and owner go/no-go remain separate gates.
