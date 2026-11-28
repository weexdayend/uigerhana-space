# Phase 8 — Exact-Commit Source Audit Runbook

**Purpose:** Collect source reports that can be bound by the consolidated Phase 8 release evidence gate.  
**Execution model:** Manual GitHub Actions dispatches, read-only production observation, and owner-supplied physical-device evidence.  
**Release boundary:** Audit workflow success is not a release pass. The consolidated evaluator always remains owner-review-only.

## 1. Freeze the reviewed commit

After the code/documentation PR that contains the intended release candidate is merged:

1. Open the repository's `main` branch and copy its full 40-character lowercase commit SHA.
2. Record that SHA as `EXPECTED_COMMIT` for this collection cycle.
3. Keep the source-audit dispatch refs pinned to that same commit. The release gate checks each source run's `head_sha`; a run from a different ref or later-moving branch is rejected.
4. Do not start a new code bake or move the selected ref during collection. If the reviewed commit changes, start a new collection cycle on the new SHA.

Current baseline at the start of Phase 8.18: `0dd152dc2c28bc5aec49b9f7564cb32f627dea16`. This is a reference point only; after Phase 8.18 merges, use the new merged `main` SHA.

## 2. External destination audit

1. Open **Actions → External destination audit**.
2. Choose **Run workflow** and select the ref whose resolved head SHA is exactly `EXPECTED_COMMIT`.
3. Dispatch the workflow; it has no additional input fields.
4. Wait for the run to complete. Preserve the run ID and the attempt-specific artifact named `external-destination-audit-<sha>-<attempt>`.
5. Inspect `external-destination-reachability.json`, not just the workflow conclusion.

The audit builds the selected repository revision and probes unique external HTTPS destinations rendered on `/`, `/work`, `/work/uigerhana-space`, and `/cv`. Requests are unauthenticated GETs with no cookies, a 15-second timeout, up to eight redirects, and concurrency of three. It does not prove destination identity, content correctness, safety, currentness, privacy approval, or owner acceptance. Restricted, transient, and runner/network errors must be reviewed or retried; they are not proof that a destination is universally broken.

## 3. Production parity audit

1. Open **Actions → Production parity audit**.
2. Choose **Run workflow** and select the same ref resolving to `EXPECTED_COMMIT`.
3. Set `expected_commit` to the full lowercase `EXPECTED_COMMIT`.
4. Dispatch the workflow; preserve the run ID and artifact named `production-parity-audit-<sha>-<attempt>`.
5. Inspect `production-parity-audit.json` and the Step Summary.

The workflow performs unauthenticated GET requests to the canonical public routes, robots.txt, sitemap.xml, HTTP origin, TLS endpoint, and read-only GitHub production deployment endpoints. It does not deploy or mutate production. A green workflow only means the report was produced. Route availability, GitHub deployment-record parity, and served-commit parity are distinct results.

**Revision marker interpretation:** A marker is accepted only as a complete 40-character hexadecimal SHA, equal to the expected SHA after trimming and lowercase normalization. An abbreviated prefix is invalid. Every exposed marker source on each route (HTTP header and all matching meta tags) must agree. A duplicate or conflicting marker prevents `marker-match`. Even four exact route matches are owner-review evidence until the real build/deployment process is proven to inject the SHA that built the running application.

## 4. Physical Android and iOS evidence

Do not dispatch this workflow with the checked-in template as if it were real evidence. The current template intentionally contains placeholders and `not-run` states.

Before dispatch:

1. Conduct real acceptance sessions on one physical Android device and one physical iOS device. Desktop emulation and simulators do not qualify.
2. Complete every required scenario in [the physical-device evidence contract](PHYSICAL-DEVICE-EVIDENCE.md).
3. Add one evidence attachment for each of the seven scenarios on each platform; compute SHA-256 only after each attachment is final.
4. Copy the template to `evidence/physical-device/session.json`, replace placeholders, set both `physicalDeviceConfirmed` values only after actual testing, and include the exact `sourceCommit`.
5. Commit the JSON and attachments. The evidence-containing commit becomes the reviewed SHA for the collection cycle.
6. Open **Actions → Physical Device Acceptance Audit**, choose the ref whose head is that exact commit, enter the same full lowercase `expected_commit`, and provide the committed evidence JSON path.
7. Preserve the run ID and `physical-device-acceptance-<sha>-<attempt>` artifact. Inspect the validator report for `evidence-complete`; schema validity alone is not enough.

Avoid serial numbers, IMEI, UDID, advertising IDs, account details, GPS coordinates, personal messages, unrelated notifications, or unredacted personal content in evidence attachments.

## 5. Consolidated release evidence gate

Only after all three source workflows have completed on the same SHA:

1. Open **Actions → Release evidence gate**.
2. Enter the full lowercase `EXPECTED_COMMIT`.
3. Enter the external destination, production parity, and physical-device source run IDs.
4. Dispatch the gate and preserve both `release-gate-report.json` and the provenance manifest.
5. Inspect report status, blockers, errors, each gate's source artifact metadata, and the owner-review list. A successful Actions conclusion alone is not sufficient.

The gate verifies exact workflow path, manual-dispatch event, run completion, same commit, current `run_attempt`, one exact attempt-specific artifact, artifact ID, checksum, and effective expiry. Evidence generated outside the referenced run window, missing/expired artifacts, reused source run IDs, or inconsistent report contents fail closed.

Possible machine outcomes are `invalid`, `blocked`, or `owner-review-required`. It always emits `releaseApproved: false`; it never authorizes a deployment or release.

## 6. Independent owner gates remain separate

Even after a technically complete evidence package, separately record:
- Destination identity, content, suitability, safety, and privacy review.
- Proof of production build/deployment SHA injection and served-marker provenance.
- Literal desktop browser zoom at 200%, native OS text scaling, and native print dialog / Save as PDF.
- Exact assistive-technology combinations and results.
- Representative physical-device and field CWV/INP review.
- Owner-defined evidence freshness policy.
- Explicit final owner go/no-go.

No source audit or CI job closes these independent acceptance gates by itself.
