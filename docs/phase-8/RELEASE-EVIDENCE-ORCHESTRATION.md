# Phase 8.11 — Release Evidence Orchestration

**Status:** Instrumented; source audit runs and retained evidence are required before evaluation.  
**Release boundary:** The evaluator never approves, deploys, changes production, or overrides an owner decision.

## Purpose

The Phase 8 source audits run independently because they measure different things. This slice binds their reports into one exact-commit evidence package and produces a deterministic release-gate report:

1. External destination reachability from the reviewed local production build.
2. Read-only production route, TLS, deployment-record, and served-revision observations.
3. Physical Android and iOS evidence validation.

The evaluator verifies source workflow provenance, artifact naming, report SHA-256, JSON consistency, and the same full lowercase commit SHA across every input.

## Required source runs

Run each workflow manually against the same exact reviewed commit. Select the branch/ref whose head_sha is the intended commit:

- **External destination audit** — .github/workflows/external-destination-audit.yml
- **Production parity audit** — .github/workflows/production-parity-audit.yml; set expected_commit to the same full SHA.
- **Physical Device Acceptance Audit** — .github/workflows/physical-device-acceptance.yml; use the exact commit containing the evidence JSON and attachments.

Each source run must be a completed workflow_dispatch, have the same head_sha, and retain the expected immutable artifact name. Source runs with a failure conclusion may still be evaluated only when their evidence artifact was actually uploaded; the report content, not the workflow conclusion alone, determines whether the gate is blocked. If a report was not produced, artifact download fails closed.

## Run the consolidated gate

After the three source workflows have completed:

1. Open **Actions → Release evidence gate**.
2. Supply the lowercase full 40-character reviewed commit SHA.
3. Supply the run ID for each of the three source workflows.
4. Dispatch the evaluator and review release-gate-report.json plus the matching provenance manifest artifact.

The workflow checks the GitHub Actions run metadata (workflow_dispatch, workflow path, exact head SHA, and completed status) before downloading the named artifacts from those specific run IDs. It uses read-only actions: read and contents: read permissions.

Cross-run artifact retrieval uses the official actions/download-artifact action with an explicit repository, token, run ID, and artifact name. It does not select the latest artifact implicitly.

## Interpretation

The evaluator reports one of:

- **invalid**: provenance, path containment, checksum, schema, or internal report consistency failed.
- **blocked**: one or more evidence sources do not meet their machine-verifiable conditions.
- **owner-review-required**: all three report packages are internally consistent and technically observed; human review remains mandatory.

The consolidated report always has:

- releaseApproved: false
- releaseDecision: owner-review-required

In particular:

- Reachable links are only HTTP observations. Owners must still review destination identity, content, suitability, and privacy.
- A served revision marker that matches the expected SHA is not proof of marker provenance. Owners must verify the deployment pipeline injects that marker from the build's actual source commit.
- Physical-device evidence remains an owner attestation. The validator verifies schema, scenario coverage, path containment, and attachment hashes; it cannot independently prove a physical handset was used.
- Native 200% browser zoom, native OS text scaling, native print/Save as PDF, field mobile performance/INP, and explicit final owner go/no-go remain separate acceptance tasks.

A successful evaluator workflow means only that it produced a report. A blocked report can be uploaded by a successful workflow run; inspect the report's status, errors, and blockers, not only the Actions conclusion.

## Local evaluation

The same evaluator can be run against an extracted evidence bundle:

~~~bash
node scripts/evaluate-release-evidence.mjs \
  evidence-input/manifest.json \
  artifacts/release-gate-report.json
~~~

The manifest must refer to three report files relative to its own directory. Every input includes its workflow run metadata, exact artifact name, relative report path, and SHA-256 digest. The evaluator rejects path traversal and symlink escape.

## CI coverage

npm run test:release-evidence tests complete evidence, unreachable destinations, unverified production markers, incomplete physical-device evidence, artifact digest mismatch, source-run SHA mismatch, path escape, inconsistent summary counters, attempted machine approval, and reused run IDs.

No source audit is dispatched by ordinary CI. No deployment or production configuration is changed by this workflow.
