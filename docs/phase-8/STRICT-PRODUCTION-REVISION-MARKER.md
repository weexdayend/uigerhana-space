# Phase 8.18 — Exact Full-SHA Production Marker Enforcement

**Status:** Implemented on branch `phase-8/strict-production-revision-marker`; exact-head CI pending.  
**Base main at bake start:** `0dd152dc2c28bc5aec49b9f7564cb32f627dea16` (PR #41 merge).  
**Release decision:** NO-GO / NOT RELEASE-READY. The production/external source audits and owner evidence have not been collected by this code slice.

## Finding

The read-only production parity auditor accepted a 7–40-character hexadecimal prefix as a marker match. That was weaker than the build provenance contract, which requires the complete 40-character source commit SHA. The auditor also inspected only the first matching meta tag and selected the HTTP header in preference to metadata, so an additional conflicting marker could be hidden from the comparison.

## Changes

- Add a pure revision-marker comparator that requires both the expected commit and each exposed marker to be full 40-character hexadecimal SHAs.
- Compare exact normalized equality only; prefixes are `invalid-marker`, not matches.
- Inspect the HTTP `X-UI-Gerhana-Revision` header and every `ui-gerhana-revision` meta tag on each public route.
- Require all available marker sources on a route to agree. Conflicting header/meta or conflicting duplicate meta values become `mismatch`; repeated identical values remain an agreeing set. Malformed or abbreviated markers become `invalid-marker`.
- Emit one `servedRevisionMarkers` entry for each approved route, including routes with no marker. Missing markers remain `not-exposed` and cannot satisfy the exact-route evidence requirement.
- Add Node regression tests for exact matching, case/whitespace normalization, missing markers, abbreviated SHA, malformed/overlong values, mismatching full SHA, invalid expected SHA, and conflicting marker sources.
- Run the new test suite in the CI quality job.

## Source audit execution status

This PR does not fabricate source results. The external destination and production parity workflows are still manual `workflow_dispatch` audits and have not been executed by this branch. The physical-device directory still contains only the template; no real Android/iOS sessions or evidence attachments have been supplied.

Use [the Exact-Commit Source Audit Runbook](EXACT-COMMIT-SOURCE-AUDIT-RUNBOOK.md) after this change is merged. The source runs must use the same exact reviewed commit and their run IDs must be passed to the consolidated release evidence gate. Physical-device acceptance remains blocked until actual sessions and attachments are committed.

## Acceptance boundaries

- The new tests prove marker comparison behavior; they do not prove the live site exposes a marker.
- A full exact marker match is still only `marker-match`, not final production parity, until owner verifies actual build/deployment injection provenance.
- External reachability remains HTTP observation, not destination-content or privacy approval.
- Production parity remains NOT VERIFIED until an exact-commit read-only run is reviewed.
- Native zoom, OS text scaling, native print, field performance/INP, assistive-technology review, freshness policy, and final owner go/no-go remain open.
- No deploy, DNS/environment change, cache purge, production configuration mutation, or release authorization is performed.
