# Phase 8.3 — Route, Link & Performance Baseline

**Status:** Route/link and performance automation added. The sitemap assertion is fixed; draft publication validation now checks streamed not-found UI and `noindex` rather than HTTP status alone.
**Stack base:** `phase-8/root-01-text-reflow` / PR #26 head `fb4de1234ad75d87d34a1f544847ef96a6f95845`.
**Public origin:** `https://uigerhana.space`.

## 1. Public route boundary

The currently approved public route inventory is:

- `/` — homepage
- `/work` — public work index
- `/work/uigerhana-space` — approved public case study
- `/cv` — online résumé

Case-study pages are public only through `PUBLIC_CASE_STUDIES`. An unapproved draft must not render the case-study detail, must show not-found UI with a `noindex` robots directive, and must stay out of the sitemap. The test explicitly checks `/work/professional-services-automation-platform`, `/work/passwordless-team-invitations`, and `/work/verifiable-backup-and-recovery-operations`. Next.js may return HTTP 200 for a streamed `notFound()` response; that status alone does not mean draft content rendered. See the [Next.js not-found behavior](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) and [streaming status-code guidance](https://nextjs.org/docs/app/api-reference/file-conventions/loading).

The route test verifies, on the rendered production build:
- HTTP 200 for every approved public route.
- A visible primary heading, non-empty document title and meta description.
- One canonical URL per route pointing to the approved public origin.
- No duplicate DOM IDs.
- Sitemap entries exactly match the approved public route set.
- `robots.txt` permits the public site and points to the same sitemap.
- Each known unpublished draft route renders not-found UI, does not render `[data-case-study-detail]`, and carries `meta[name=robots]` with `noindex`. The observed response status is recorded as either 200 (streamed not-found) or 404 (non-streamed not-found).

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

## 4. Exact-head CI evidence snapshots

### Initial Phase 8.3 run

The first PR workflow run on head `25c024a78bbaed796f90ca8b8bb201084a3c4f17` completed the quality job and produced [Actions run #46057514836](https://github.com/weexdayend/uigerhana-space/actions/runs/46057514836).

- Browser job result: 302 passed, 3 failed, 4 skipped.
- All three failures were a test-only sitemap comparison mismatch: the sitemap serialized the homepage as `https://uigerhana.space`, while the assertion expected `https://uigerhana.space/`. The comparison now normalizes each location with the URL parser.
- The rendered-link integrity test completed successfully in all three engines.
- The Chromium performance test recorded 12 HTTP 200 samples. Its initial artifact is [#15227537484](https://github.com/weexdayend/uigerhana-space/actions/runs/46057514836/artifacts/15227537484).

### Sitemap-normalized rerun

The rerun on head `64a8a5e1fe18e92e589ba0e846f028448dee0f79` completed the quality job and produced [PR Actions run #46058407707](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707).

- Browser job result: 303 passed, 1 failed, 1 flaky, 4 skipped.
- Sitemap and approved-route metadata checks passed; the first cross-engine failure moved to the draft-route status assertion.
- The HTTP-only assertion expected 404 for all draft slugs. Chromium received 200 for an unknown slug, and Firefox's first attempt also received 200; its retry produced the expected not-found outcome. WebKit passed. This was not evidence that draft case-study detail rendered: Next.js documents that a streamed `notFound()` UI may carry HTTP 200 while injecting `<meta name="robots" content="noindex" />`. The framework's [not-found convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) and [streaming guidance](https://nextjs.org/docs/app/api-reference/file-conventions/loading) explain this status behavior.
- The route selects content only from `PUBLIC_CASE_STUDIES`; unknown/draft slugs call `notFound()`. The new independent per-slug browser checks assert the actual publication boundary: not-found UI visible, no `[data-case-study-detail]` element, and a `noindex` robots directive. They record the observed HTTP status instead of treating streamed 200 as a content leak.
- `dynamicParams = false` is intentionally not used: this repository enables `cacheComponents: true`, and current Next.js route-segment config options are disabled with Cache Components. See [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config).

The rerun artifact is [browser QA artifact #15227981742](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707/artifacts/15227981742), SHA-256 `981ee360b6dea550642678ee31a9cb7654552af880b4e78a7b24aa776d1c48f1`. It includes:
- `phase-8-performance-baseline.json`: 12 Chromium production-build samples, all HTTP 200.
- `rendered-link-integrity-inventory.json`: separate inventories for Chromium, Firefox, and WebKit.
- Public-route/indexing JSON for the browser projects whose route test completed through the draft loop. Chromium's report did not reach the final attachment because the HTTP-only assertion failed.

The three-engine rendered-link inventories each recorded 36 anchors (26 internal, 10 external), four unique internal destinations returning HTTP 200 with valid fragments, and six unique HTTPS external destinations. External-host reachability was not probed.

### Latest available performance snapshot

Chromium `159.0.8154.6`, 1440 × 900, 12 samples, three navigations per route. The report combines one isolated-context first view and two same-context repeats.

| Route | Median TTFB | Median FCP / LCP | Median CLS | Median transfer bytes | Median resources |
|---|---:|---:|---:|---:|---:|
| `/` | 2.5 ms | 164 / 164 ms | 0 | 0 B | 15 |
| `/work` | 1.6 ms | 96 / 96 ms | 0 | 23,798 B | 22 |
| `/work/uigerhana-space` | 2.0 ms | 124 / 124 ms | 0 | 10,430 B | 19 |
| `/cv` | 2.0 ms | 68 / 68 ms | 0 | 9,122 B | 18 |

All 12 samples had HTTP 200 with no recorded console errors, page errors, or failed requests. A 131 ms aggregate of long tasks (maximum 72 ms) appeared on the first homepage view, and one 51 ms long task appeared on the first case-study view; the other samples recorded none. Transfer medians mix first-view and warm-repeat navigations and are not cold-cache transfer budgets. These are local desktop Chromium lab observations, not field CWV or mobile/network results.

The follow-up run writes route/indexing and rendered-link JSON into `test-results`; each unpublished slug also receives its own `draft-route-publication-boundary.json` evidence attachment.

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
