# Phase 8.3 — Route, Link & Performance Baseline

**Status:** Automated release checks added; exact-head CI evidence pending.
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

## 4. Interpretation rules

This is a repeatable **lab baseline**, not field Core Web Vitals:
- It does not claim field LCP/CLS or real-user performance.
- Interaction to Next Paint (INP) is not measured by this run.
- The desktop 1440 × 900 Chromium runner is not a representative mobile device or network profile.
- No performance budget or Lighthouse score is invented from the first sample.
- Use the medians and variance to propose evidence-based budgets in a later slice; keep raw reports for comparison.

The test should remain observational until the baseline is reviewed. A green test means the production build loaded the intended route set and produced a complete timing/resource report; it does not mean those timings already meet a performance target.

## 5. Release gates still outside this slice

- Live external-link reachability and third-party destination content.
- Native browser 200% zoom.
- Native OS text scaling.
- Actual browser/OS print dialog and Save as PDF.
- Production commit parity and field performance.
- Owner release acceptance.

No deployment or production configuration change is part of this Phase 8.3 slice.
