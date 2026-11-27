# Phase 8.12 — Audit Execution Preflight

**Status:** Instrumented; PR CI pending.  
**Scope:** Fix and regression-test the manual audit entry points and source-run provenance checks. This slice does not dispatch audits or claim live/physical acceptance.

## Findings

The merged physical-device workflow contained escaped GitHub expression sequences in its checkout ref, input environment values, and artifact path/name. The workflow therefore could not reliably resolve the selected commit and inputs as designed.

The release evidence gate also used a workflow path prefix comparison. It should require the exact expected workflow file path for each source run.

## Changes

- Restore active GitHub expressions in the physical-device workflow.
- Require a lowercase full 40-character SHA and compare it to the actual checked-out `github.sha`.
- Resolve the evidence JSON and evidence root via `realpath -e`; reject missing files, traversal, and symlinks that resolve outside the evidence root.
- Preserve the physical-device report artifact even when the validator returns an incomplete/failed evidence result, so the consolidator can report a blocker instead of treating a missing run as acceptance.
- Require exact workflow path equality in source-run provenance validation.
- Keep audit workflows manually dispatched with read-only permissions.
- Add eight Node built-in contract tests to ordinary quality CI.

## Execution boundary

The workflow dispatch action is intentionally not automatic. External reachability and production parity require an explicit owner-selected reviewed commit. Physical-device acceptance requires real Android/iOS sessions and attachments; no simulated evidence is created here. The consolidated gate remains owner-review-only.

## Verification

Run `npm run test:release-workflows` locally. CI also runs the eight checks during the quality job. The physical-device report path and source-run provenance are checked again at workflow runtime.
