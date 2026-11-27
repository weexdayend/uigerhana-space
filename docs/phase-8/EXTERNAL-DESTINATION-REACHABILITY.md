# Phase 8.6 — External Destination Reachability

**Status:** Instrumented; manual workflow dispatch has not yet been run.  
**Base:** current `main` merge commit `3444f4898859f524c562fc85ba0f246ec3bf1586` (PR #29).

## Purpose

The Phase 8.3 local-origin link inventory confirms that external anchors use HTTPS and safe new-tab policy, but it intentionally does not contact third-party hosts. This slice adds a repeatable, opt-in probe so the project can collect time-specific reachability evidence without turning third-party availability into a flaky pull-request gate.

## Method

1. Select the reviewed branch/commit in GitHub Actions and manually dispatch `.github/workflows/external-destination-audit.yml`.
2. The workflow installs the pinned browser-test dependencies, builds that exact checkout, and runs the opt-in Chromium test against the local production server.
3. The test visits `/`, `/work`, `/work/uigerhana-space`, and `/cv`, inventories rendered external HTTPS anchors, removes URL fragments, and deduplicates identical destinations.
4. It issues one unauthenticated GET per unique destination, with a 15-second timeout, up to eight redirects, and at most three concurrent requests.
5. The workflow uploads `external-destination-reachability.json` as a 30-day artifact.

## Result classification

| Observation | Classification | Interpretation |
|---|---|---|
| HTTP 2xx or 3xx | `reachable` | The URL returned an HTTP response after redirects |
| HTTP 404 or 410 | `unavailable` | The URL was not found / is gone at probe time; recheck before a conclusion |
| HTTP 401, 403, 405, 407, or 429 | `restricted` | Authentication, bot protection, method policy, or rate limiting may block the probe |
| HTTP 408, 425, or 5xx | `transient` | Temporary server or intermediary response; retry before a conclusion |
| DNS, connection, TLS, redirect, or timeout exception | `network-error` | The runner could not complete the request; not proof of universal unavailability |
| Other HTTP status | `inconclusive` | Requires human interpretation |

The report includes the reviewed source commit, check timestamp, browser/project, routes and statuses, source route and link labels, requested URL, final redirect URL, response status, content type, elapsed time, and classification.

## Boundaries

- This probes links rendered by the reviewed local production build. It does **not** check what the live production domain currently serves.
- A reachable response does not prove the destination content is current, accurate, safe, accessible, privacy-reviewed, or owner-approved.
- Restricted responses are not marked broken; transient and runner/network errors do not fail the test.
- The workflow does not gate ordinary CI and does not mutate application content or production configuration.
- Native browser/OS checks, live production parity, field/mobile performance, and owner release acceptance remain independent gates.

## Current result

**NOT RUN.** No external destination has been marked reachable or unavailable by this workflow yet. Record the workflow run and artifact here only after an actual dispatch.
