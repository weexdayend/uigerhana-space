# Phase 8.14 — Attempt-Aware Audit Artifact Identity

**Status:** Instrumented; exact-head CI pending.
**Scope:** Prevent workflow reruns from making source audit artifacts ambiguous. No audit is executed here and no release approval is granted.

## Failure mode

GitHub Actions reruns retain the original workflow `run_id` while incrementing `run_attempt`. A commit-only artifact name can therefore be reused across executions associated with one run ID. The release gate previously identified the source run ID but did not identify which attempt produced the downloaded artifact.

## Contract

Each source audit artifact is now named with both the reviewed commit and the current GitHub Actions attempt:

- `external-destination-audit-<commit>-<run_attempt>`
- `production-parity-audit-<commit>-<run_attempt>`
- `physical-device-acceptance-<commit>-<run_attempt>`

The release gate reads `run_attempt` from the exact source run API response, rejects missing/invalid values, exposes the attempt as a step output, and downloads only the artifact with that exact attempt-specific name from the supplied run ID. The provenance manifest records `runAttempt`, and the evaluator checks that the artifact name is the expected prefix + full commit SHA + run attempt.

## Retry behavior

When a source workflow is rerun, the new attempt receives a different artifact name while the run ID remains stable. The release gate therefore cannot silently select the prior attempt's artifact by relying on a generic commit-only name. If the expected artifact is missing or has expired, the explicit download fails closed. Phase 8.15 adds a pre-download inspection of the run's actual artifact ID, expiry state, creation timestamp, and effective `expires_at`; see [Evidence Artifact Expiry](EVIDENCE-ARTIFACT-EXPIRY.md).

## Boundaries

- The run ID remains mandatory and unique across the three evidence sources.
- Existing exact workflow path, manual dispatch, completion, conclusion, exact head SHA, timestamp window, report SHA-256, and path-containment checks remain active.
- This does not verify that an Android/iOS owner attestation is truthful or that a production deployment marker is trustworthy.
- Evidence freshness maximum age remains an owner policy decision.
- Machine evaluation remains owner-review-only: `releaseApproved: false` and `releaseDecision: "owner-review-required"`.

## Regression coverage

Evaluator tests reject invalid run attempts and artifact names bound to a different attempt. Workflow contract tests inspect all three source artifact names, source-run attempt extraction, manifest attempt fields, and evaluator binding.