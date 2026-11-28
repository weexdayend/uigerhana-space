# Phase 8.16 — Build Revision Provenance Marker

**Status:** Implemented in the Phase 8.16 branch; exact-head CI and deployment-side adoption are pending.  
**Release boundary:** This change adds an application contract only. It does not deploy, alter production configuration, or claim live commit parity.

## Problem

The read-only production parity audit can compare a live revision marker with the expected Git commit, but the application previously emitted no build-time marker. A GitHub deployment record is not proof of the revision currently served by a CDN or application server.

## Contract

- A build may receive `UI_GERHANA_REVISION`.
- When present, the value must be a full 40-character hexadecimal Git commit SHA. Abbreviated SHAs, branch names, labels, and malformed values are rejected.
- The app normalizes the SHA to lowercase and emits `<meta name="ui-gerhana-revision" content="<full-sha>">` through root metadata. Next.js applies the root metadata to every public route.
- When the variable is missing or blank, the marker is omitted. The app does not guess from `HEAD`, a branch name, a deployment record, or a runtime environment.
- The SHA is public build provenance, not a secret. No token or other deployment credential is exposed.

## CI verification

Both GitHub Actions production builds receive the exact `github.sha` for the commit checked out by that workflow. The following checks protect the contract:

1. Node built-in unit tests cover absent input, lowercase normalization, whitespace trimming, and rejection of abbreviated/non-hex values.
2. Playwright verifies that every approved public route serves exactly one marker matching the build SHA.
3. The marker check runs in the Chromium, Firefox, and WebKit projects alongside the existing release route checks.

## Deployment requirement

A production deployment process must set `UI_GERHANA_REVISION` to the full SHA of the exact source revision used for that production build, before `npm run build` (or its equivalent) executes.

This repository does not identify or assume a deployment provider, add a provider-specific deployment workflow, or wire a production environment variable. Until the actual build/deployment process is shown to provide the correct SHA, the live marker is not trusted and production commit parity remains **NOT VERIFIED**.

## Audit interpretation

The existing read-only audit recognizes the `ui-gerhana-revision` meta marker on each public route. A complete match is reported as `marker-match`, not as a final release pass. Owner review must still establish the variable's provenance in the real deployment pipeline. A missing marker remains `not-verifiable`; a malformed or different marker remains a review/mismatch observation.

No native-device, browser-zoom, OS-scaling, print-dialog, field-performance, external-content, or owner go/no-go gate is changed by this slice.
