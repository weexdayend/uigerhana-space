# Phase 8.15 — Evidence Artifact Retention & Expiry Enforcement

**Status:** Instrumented; exact-head CI pending.
**Scope:** Verify that the exact source-run artifact still exists and has not expired before it is downloaded or evaluated. This uses GitHub's actual artifact metadata instead of assuming the configured retention request is the effective expiry.

## Contract

For each of the three source workflow runs, the release gate queries the run's artifact metadata and requires exactly one artifact matching the previously validated `commit SHA + run_attempt` name. It records the artifact's immutable numeric ID, name, creation time, expiry time, expired flag, and byte size.

Before download, the gate fails closed when the artifact is missing, duplicated, marked expired, empty, malformed, or already past its `expires_at` timestamp. It downloads from the supplied source run ID using the exact attempt-specific artifact name.

The consolidated evaluator independently revalidates the downloaded artifact metadata recorded in the manifest:

1. Artifact IDs must be positive and unique across evidence sources.
2. The artifact must explicitly be marked `expired: false` and have a non-zero byte size.
3. Its `created_at` must fall within the corresponding source workflow run window.
4. Its `expires_at` must be later than both the manifest creation time and the actual evaluation time.
5. The attempt-specific artifact name, report digest, and report-to-run timestamp provenance must still match.

## Retention semantics

The source workflows request retention periods in their upload-artifact steps (30 days for external-destination evidence; 90 days for production-parity and physical-device evidence). GitHub may apply repository/organization retention limits. Therefore, the workflow does not treat `retention-days` as proof of the effective expiry: the run's artifact API response `expires_at` is authoritative for each artifact.

No arbitrary minimum number of days remaining is introduced. The gate requires the artifact to remain available at preflight, download, and evaluation time. A separate owner-defined freshness policy for the age of the underlying audit evidence remains open.

## Failure behavior

- Missing or ambiguous artifact metadata: source run rejected before download.
- Expired or imminently elapsed artifact: source run rejected before download.
- Artifact deleted or expiring between preflight and retrieval: explicit download fails closed.
- Expired before evaluation: evaluator returns `invalid` and preserves `releaseApproved: false`.
- No latest-artifact fallback and no cross-run artifact lookup is used.

## Boundaries

This protects evidence-package availability and provenance. It does not establish that the observations are true, that physical devices were genuine, that production served the intended commit, or that destination content is approved. Machine evaluation remains `releaseApproved: false` and `releaseDecision: "owner-review-required"`.

## Regression coverage

Evaluator fixtures reject expired artifacts, expiry before the evaluation time, artifact timestamps outside the source run, and duplicate artifact IDs. Workflow contract tests require paginated run-artifact inspection, exact attempt-specific artifact selection, expiry-state and timestamp checks, and manifest retention metadata.