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

## Exact-head CI observation

The PR-triggered workflow on PR #32 head `1fa7ab1cdccbba0717bb0fc43432e87d36cb6e75` completed the new Chromium mobile-lab test and the wider browser suite:

- PR quality job: passed in [Actions #46072238941](https://github.com/weexdayend/uigerhana-space/actions/runs/46072238941).
- PR browser QA: **334 passed, 11 skipped, 0 failed** in [Actions #46072238941](https://github.com/weexdayend/uigerhana-space/actions/runs/46072238941).
- New mobile-lab test executed once in Chromium and passed in 14.5 seconds. It was intentionally skipped in Firefox and WebKit; those engines ran the existing suite.
- Evidence artifact: [#15234410023](https://github.com/weexdayend/uigerhana-space/actions/runs/46072238941/artifacts/15234410023).
- Test artifact source commit (GitHub PR merge ref): `d6b7548430ec2665a53c2634a50cfab77c2d2c44`; PR head: `1fa7ab1cdccbba0717bb0fc43432e87d36cb6e75`.
- Browser version: Chromium `159.0.8154.6`.

### Observed initial profile

All eight route navigations returned HTTP 200. Median values below combine one isolated-context first view and one same-context repeat; they are not cold-cache performance budgets.

| Route | Median TTFB | Median FCP / LCP | Median CLS | Median transfer bytes | Median long-task total |
|---|---:|---:|---:|---:|---:|
| `/` | 150.1 ms | 872 / 872 ms | 0 | 163,221 B | 198 ms |
| `/work` | 150.1 ms | 686 / 686 ms | 0 | 140,776 B | 67 ms |
| `/work/uigerhana-space` | 150.0 ms | 732 / 732 ms | 0 | 140,094 B | 84 ms |
| `/cv` | 150.0 ms | 736 / 736 ms | 0 | 143,712 B | 74 ms |

No horizontal overflow was recorded in any of the eight samples at 390 CSS px. No console errors or uncaught page errors were recorded.

The repeat navigations captured `net::ERR_ABORTED` for a small number of chunk requests on `/work` and `/cv`; these occurred during a page reload and remain visible in the raw `failedRequests` list. The test does not interpret these cancellations as a performance pass/fail and does not prove their cause. Review raw samples before treating them as application request failures.

The observed lab values are an initial constrained-profile baseline only. The transfer medians mix isolated-context first views and warm same-context repeats; FCP/LCP are two-navigation medians; no budget or field result is inferred. Push-triggered browser QA was still running when this evidence note was written.
