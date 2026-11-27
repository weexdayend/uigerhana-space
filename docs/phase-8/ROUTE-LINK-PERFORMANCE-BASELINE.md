# Phase 8.3 — Route, Link & Performance Baseline

**Status:** Initial CI evidence captured; sitemap URL normalization assertion patched and exact-head revalidation pending.
**Stack base:** `phase-8/root-01-text-reflow` / PR #26 head `fb4de1234ad75d87d34a1f544847ef96a6f95845`.
**Public origin:** `https://uigerhana.space`.

## 1. Public route boundary

The currently approved public route inventory is:

- `/` — homepage
- `/work` — public work index
- `/work/uigerhana-space` — approved public case study
- `/cv` — online résumé

Case-study pages are public only through `PUBLIC_CASE_STUDIES`. A draft case study must remain a 404 and must not appear in the sitemap. The test explicitly checks the current draft slugs `/work/professional-services-automation-platform`, `/work/passwordless-team-invitations`, and `/work/verifiable-backup-and-recovery-operations` to prevent accidental publication.

The route test verifies, on the rendered production build:
- HTTP 200 for every approved public route.
- A visible primary heading, non-empty document title and meta description.
- One canonical URL per route pointing to the approved public origin.
- No duplicate DOM IDs.
- Sitemap entries exactly match the approved public route set.
- `robots.txt` permits the public site and points to the same sitemap.

Adding an approved case study requires updating the expected public route inventory in the release test in the same change as the publication approval.

## 2. Rendered link inventory

The link-integrity test walks every rendered `a[href]` element on all public routes and records the source route, resolved destination, visible label, accessible label, target, and rel policy.

Automated gates:
- No empty, placeholder-only, or JavaScript href.
- Only HTTP(S), mailto, or tel destination schemes.
- Every internal destination returns HTTP 200 on the production build.
- Every rendered internal fragment points to an existing element ID.
- External HTTP destinations use HTTPS.
- External links opening a new tab include `noopener` or `noreferrer`.

**Explicit limitation:** this local-origin CI pass does not probe external hosts for current HTTP reachability. Third-party providers may block automated requests or rate-limit CI, so external URL status and content ownership remain a separate manual spot-check. The artifact provides the exact destination inventory for that review.

## 3. Performance baseline method

A dedicated Chromium-only test records three navigations for each public route using the Playwright production server:
- One first view in a newly isolated browser context.
- Two repeat navigations within that same context.

The resulting 12 samples record:
- Navigation TTFB.
- First Contentful Paint (FCP).
- Largest Contentful Paint (LCP), including the last reported LCP element when available.
- Cumulative Layout Shift (CLS).
- DOMContentLoaded and load-event timing.
- Resource count and transfer, encoded-body, and decoded-body bytes.
- Transfer bytes grouped into scripts, stylesheets, images, fonts, and other resources.
- Long-task count, total duration, and maximum duration.
- Console errors, page errors, and failed requests observed during each navigation.

The JSON artifact includes per-route medians and all raw samples. Record the exact commit, browser version, viewport, cache protocol, and CI runner context with the artifact.

## 4. Initial CI evidence snapshot

The first PR workflow run for branch head `25c024a78bbaed796f90ca8b8bb201084a3c4f17` completed the quality job successfully and produced browser evidence under [Actions run #46057514836](https://github.com/weexdayend/uigerhana-space/actions/runs/46057514836).

- Browser job result: 302 passed, 3 failed, 4 skipped.
- All three failures were the same test assertion in Chromium, Firefox, and WebKit: the sitemap serialized the homepage as `https://uigerhana.space`, while the expected string used `https://uigerhana.space/`. The four public routes and their page metadata were checked before this assertion. The implementation now normalizes sitemap locations through the URL parser before comparison.
- The rendered-link integrity test completed successfully in all three engines. External host reachability was intentionally not checked.
- The draft-route 404 assertions occur after the sitemap assertion and therefore remain pending the next exact-head run.

The Chromium performance test itself completed and emitted 12 HTTP 200 samples (three navigations per route). Its attached report is retained in artifact [`portfolio-browser-qa-3eb5785ba46d793dcb4a9ab4401208b08a9390a3`](https://github.com/weexdayend/uigerhana-space/actions/runs/46057514836/artifacts/15227537484), artifact ID `15227537484`, SHA-256 `5fbff9b31ea38157bd3b2e8bc69e3765caaf63d55b31aacb26d158972cba260a`. The archive includes `phase-8-performance-baseline.json`.

| Route | Median TTFB | Median FCP / LCP | Median CLS | Median transfer bytes | Median resources |
|---|---:|---:|---:|---:|---:|
| `/` | 4.1 ms | 164 / 164 ms | 0 | 0 B | 15 |
| `/work` | 2.3 ms | 92 / 92 ms | 0 | 23,801 B | 22 |
| `/work/uigerhana-space` | 2.5 ms | 84 / 84 ms | 0 | 10,433 B | 19 |
| `/cv` | 2.7 ms | 112 / 112 ms | 0 | 9,124 B | 18 |

Across those 12 samples there were no recorded console errors, page errors, or failed requests. One 55 ms long task was observed on the first `/cv` view; the other 11 samples recorded none. Transfer medians mix one isolated-context first view with two same-context repeats, so they must not be interpreted as cold-cache transfer budgets. These figures are local desktop Chromium lab observations, not field CWV or mobile/network results.

The next run writes the public-route metadata and rendered-link inventory JSON files directly into the uploaded browser-QA artifact, in addition to the Playwright report attachments.

## 5. Interpretation rules

This is a repeatable **lab baseline**, not field Core Web Vitals:
- It does not claim field LCP/CLS or real-user performance.
- Interaction to Next Paint (INP) is not measured by this run.
- The desktop 1440 × 900 Chromium runner is not a representative mobile device or network profile.
- No performance budget or Lighthouse score is invented from the first sample.
- Use the medians and variance to propose evidence-based budgets in a later slice; keep raw reports for comparison.

The test should remain observational until the baseline is reviewed. A green test means the production build loaded the intended route set and produced a complete timing/resource report; it does not mean those timings already meet a performance target.

## 6. Release gates still outside this slice

- Live external-link reachability and third-party destination content.
- Native browser 200% zoom.
- Native OS text scaling.
- Actual browser/OS print dialog and Save as PDF.
- Production commit parity and field performance.
- Owner release acceptance.

No deployment or production configuration change is part of this Phase 8.3 slice.
