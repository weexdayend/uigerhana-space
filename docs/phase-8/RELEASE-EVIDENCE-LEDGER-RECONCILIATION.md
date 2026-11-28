# Phase 8.17 — Release Evidence Ledger Reconciliation

**Status:** Reconciled against the verified `main` merge commit `369ad07c7928e7e52660fbfac44bd57471fec840` on 2026-11-28.  
**Release decision:** NO-GO / NOT RELEASE-READY. This slice reconciles evidence records; it does not authorize deployment or close owner-only gates.

## 1. Authoritative verification anchor

- The `main` branch points to merge commit `369ad07c7928e7e52660fbfac44bd57471fec840`, which merges PR #40 (`feat: expose verified build revision provenance`).
- PR #40 head `7211972ffa47847ad728a8552d08154a92a3cab6` was merged at 2026-11-28 08:38:22 UTC. The merge commit is the exact reviewed source revision for the post-merge run.
- Post-merge push workflow [CI #46126760208](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208) completed with conclusion `success` on exact `main` SHA `369ad07c7928e7e52660fbfac44bd57471fec840`.
- Both jobs completed successfully: **Typecheck, lint, and build** and **Runtime visual and accessibility QA**.
- The quality job passed typecheck, content/source integrity checks, production-parity audit syntax, physical-device validator tests, release-evidence evaluator tests, manual audit workflow contract tests, build-revision provenance contract tests, lint, and production build.
- The runtime job completed **339 passed / 15 skipped / 0 failed** across its configured browser projects. The build-revision route assertion is part of the release-readiness suite. The Phase 8.8 mobile-class performance test passed once in Chromium; Firefox and WebKit skipped that Chromium-specific lab case.
- The exact-main browser artifact is [`portfolio-browser-qa-369ad07c7928e7e52660fbfac44bd57471fec840`, artifact #15255838687](https://github.com/weexdayend/uigerhana-space/actions/runs/46126760208/artifacts/15255838687). GitHub reports SHA-256 `8e305451ef576991bca5ff278ef12d25c365ca6b56bd5cb1c7043fac096b5c75`, created 2026-11-28 08:43:39 UTC, and expires 2026-12-12 08:43:37 UTC.

## 2. Ledger reconciliation

| Evidence area | Reconciled state | What this establishes |
|---|---|---|
| Main exact head | PASS — `369ad07c7928e7e52660fbfac44bd57471fec840` | The current branch ref and merge commit were checked directly |
| PR #40 build revision provenance | PASS — merged and exact-main CI green | The build-time SHA contract and route assertion are covered by PR and post-merge CI |
| Release evaluator and audit workflow contracts | PASS — exact-main regression tests | The evaluator and workflow preflight contracts pass automated tests |
| Source audit execution | NOT RUN / NOT EVIDENCED IN THIS LEDGER | External, production-parity, and physical-device source reports still need exact-commit workflow runs |
| Mobile-class performance lab | PASS — one Chromium lab execution on exact main | A controlled emulated lab sample was collected; this is not field CWV, INP, or physical-device evidence |
| Production commit parity | NOT VERIFIED | No trusted deployment-side revision injection and live audit result are established |
| Owner acceptance | OPEN | Human review and explicit go/no-go are still required |

The successful CI checks for audit orchestration, timestamps, attempt-aware artifacts, and artifact expiry are regression coverage for the implementation. They are **not** substitutes for dispatching the three source audits, collecting their exact-commit artifacts, and evaluating the resulting evidence package.

## 3. Gates deliberately kept open

- External destination reachability and owner review of destination identity, content, suitability, and privacy.
- Live production route/TLS/deployment-record inspection and proof that the actual production build injects its exact source SHA; production commit parity remains NOT VERIFIED.
- Physical Android and iOS sessions with retained, hash-verified evidence attachments.
- Literal 200% desktop browser zoom, native OS text scaling, and native print-dialog / Save as PDF acceptance.
- Exact assistive-technology combinations and findings; category-level attestations are not a completed device/AT matrix.
- Representative-device and field performance review, including INP; mobile-class browser emulation does not satisfy this gate.
- Owner freshness policy for evidence and the final explicit release go/no-go.

No deployment, production configuration change, DNS change, cache purge, or public release is authorized by this reconciliation.

## 4. Next evidence sequence

1. Select one reviewed full commit SHA and dispatch the external-destination and production-parity read-only workflows against that exact SHA.
2. Supply the real Android and iOS session records and attachments, then run the physical-device evidence workflow against the exact commit containing those files.
3. Dispatch the consolidated release evidence gate with the three source run IDs; review the report and provenance manifest, including attempt, artifact ID, digest, timestamps, and expiry.
4. Complete the separate native browser/OS/print, field-performance, destination-content, and assistive-technology owner checks.
5. Record an explicit owner NO-GO or GO decision. The automated evaluator remains owner-review-only and never sets release approval to true.

See [the release evidence register](RELEASE-EVIDENCE-REGISTER.md), [the Phase 8 QA record](PHASE-8-QA-AND-RELEASE-READINESS.md), and [the build revision provenance contract](BUILD-REVISION-PROVENANCE.md).
