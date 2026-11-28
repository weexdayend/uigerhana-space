# Phase 8.7 — Production Parity & Deployment Evidence

**Status:** Instrumented; the workflow has not yet been dispatched.  
**Base:** Phase 8.6 branch phase-8/external-destination-reachability; no production change is included.

## Source review findings

The current application declares https://uigerhana.space as its canonical site origin. The repository does not contain a provider-specific deployment workflow or a verified production deployment contract. Phase 8.16 adds an optional, host-agnostic build-time meta marker: a build supplied with `UI_GERHANA_REVISION` as a full commit SHA emits `<meta name="ui-gerhana-revision">` on every public route. GitHub CI supplies the exact checked-out commit SHA and verifies the rendered marker.

The marker is omitted when the variable is absent, and invalid/abbreviated values fail the build. The code does not infer a SHA from a branch name, GitHub deployment record, runtime environment, or current repository HEAD.

Therefore, production commit parity still cannot honestly be inferred from a successful GitHub build, a GitHub deployment record, or matching page content alone. The real deployment build must explicitly receive the SHA of the source revision it is building, and the live audit must observe that marker.

## Audit method

Run .github/workflows/production-parity-audit.yml manually with the full 40-character commit SHA being evaluated.

The workflow checks out that exact commit and performs read-only inspection:

1. **TLS:** certificate authorization, certificate subject/issuer, SAN, validity window, and fingerprint from the runner network path.
2. **HTTP:** whether plain HTTP redirects to the canonical HTTPS origin.
3. **Public routes:** homepage, work index, approved case study, and résumé. It records HTTP status, redirects, title, description, main H1, canonical URL, robots directives, response timing, and selected response headers.
4. **Indexing:** robots.txt and sitemap.xml, including the expected public route set.
5. **GitHub deployment record:** latest production deployment record and latest status, using read-only GitHub API permission.
6. **Served revision marker:** looks only for the explicit X-UI-Gerhana-Revision response header or ui-gerhana-revision meta marker.

**Marker acceptance rule:** A served marker is accepted only when it contains the complete 40-character hexadecimal SHA and equals the expected commit after trimming and lowercase normalization. Abbreviated 7–39 character prefixes are invalid, not matches. The auditor inspects the response header and every matching meta marker on each route; every exposed value must agree. Duplicate or cross-source disagreement is a mismatch. Missing markers remain not-verifiable. The JSON report retains a per-route comparison even when no marker is exposed, so incomplete evidence cannot masquerade as a complete marker set.


The comparison implementation is covered by [`scripts/compare-revision-marker.test.mjs`](../../scripts/compare-revision-marker.test.mjs) and runs in the CI quality job. See [Phase 8.18](STRICT-PRODUCTION-REVISION-MARKER.md) for the regression contract and [the source audit runbook](EXACT-COMMIT-SOURCE-AUDIT-RUNBOOK.md) for exact-commit dispatch steps.

The report is uploaded as production-parity-audit.json and retained for 90 days.

## Interpretation

| Evidence | What it establishes | What it does not establish |
|---|---|---|
| TLS + HTTP | Certificate and transport behavior observed at audit time | End-to-end security certification |
| Public routes + metadata | Current availability and public route/metadata contract | The exact source commit serving those pages |
| GitHub production deployment record | Commit and status recorded by GitHub for the environment | What a CDN or app server currently serves |
| Served revision marker matching SHA | The live response declares the expected build revision | Trustworthiness unless the deployment process injects the marker from the actual build commit |

The outcome distinguishes deploymentRecordParity from productionCommitParity. A marker can produce `marker-match` only when every exposed value on every approved route is an exact full-SHA match; prefixes and conflicting duplicates cannot pass. A matching GitHub deployment record with no served revision marker is **not verifiable**, not a pass. A marker mismatch is reported as a mismatch. If every route declares the expected SHA, the report says marker-match—not verified—because an owner must still confirm that the deployment process injects the marker from the exact source commit used to build the running application. The workflow's own green status means the audit executed and saved evidence; it is not a production release pass.

## Current limitations and next prerequisite

- There is no documented deployment workflow or known host-specific deployment integration in this repository.
- The application now supports a trusted-format build marker when the build input is explicitly supplied and validated; see [Phase 8.16 build revision provenance](BUILD-REVISION-PROVENANCE.md).
- No production deployment pipeline currently wires `UI_GERHANA_REVISION` to the exact source commit. That provider-neutral deployment integration must be verified before a live marker can be trusted.
- No deploy, DNS change, environment change, cache purge, secret access, or production mutation is performed.
- The external inspection path used during this bake could not retrieve the live domain directly; the manual GitHub Actions runner audit is the next evidence collection path.

**Current production commit parity: NOT VERIFIED.** The source now has an opt-in build-time evidence marker, but the production build pipeline has not been shown to inject the exact source SHA and no fresh live audit result has been collected. A future marker match remains a review item until its build/deployment provenance is confirmed.
