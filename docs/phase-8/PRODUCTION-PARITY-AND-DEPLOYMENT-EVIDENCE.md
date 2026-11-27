# Phase 8.7 — Production Parity & Deployment Evidence

**Status:** Instrumented; the workflow has not yet been dispatched.  
**Base:** Phase 8.6 branch phase-8/external-destination-reachability; no production change is included.

## Source review findings

The current application declares https://uigerhana.space as its canonical site origin. The repository does not contain a deployment workflow or a documented production deployment contract. The application also does not currently emit a build-time commit revision header or meta marker.

Therefore, production commit parity cannot honestly be inferred from a successful GitHub build, a GitHub deployment record, or matching page content alone.

## Audit method

Run .github/workflows/production-parity-audit.yml manually with the full 40-character commit SHA being evaluated.

The workflow checks out that exact commit and performs read-only inspection:

1. **TLS:** certificate authorization, certificate subject/issuer, SAN, validity window, and fingerprint from the runner network path.
2. **HTTP:** whether plain HTTP redirects to the canonical HTTPS origin.
3. **Public routes:** homepage, work index, approved case study, and résumé. It records HTTP status, redirects, title, description, main H1, canonical URL, robots directives, response timing, and selected response headers.
4. **Indexing:** robots.txt and sitemap.xml, including the expected public route set.
5. **GitHub deployment record:** latest production deployment record and latest status, using read-only GitHub API permission.
6. **Served revision marker:** looks only for the explicit X-UI-Gerhana-Revision response header or ui-gerhana-revision meta marker.

The report is uploaded as production-parity-audit.json and retained for 90 days.

## Interpretation

| Evidence | What it establishes | What it does not establish |
|---|---|---|
| TLS + HTTP | Certificate and transport behavior observed at audit time | End-to-end security certification |
| Public routes + metadata | Current availability and public route/metadata contract | The exact source commit serving those pages |
| GitHub production deployment record | Commit and status recorded by GitHub for the environment | What a CDN or app server currently serves |
| Served revision marker matching SHA | The live response declares the expected build revision | Trustworthiness unless the deployment process injects the marker from the actual build commit |

The outcome distinguishes deploymentRecordParity from productionCommitParity. A matching GitHub deployment record with no served revision marker is **not verifiable**, not a pass. A marker mismatch is reported as a mismatch. If every route declares the expected SHA, the report says marker-match—not verified—because an owner must still confirm that the deployment process injects the marker from the exact source commit used to build the running application. The workflow's own green status means the audit executed and saved evidence; it is not a production release pass.

## Current limitations and next prerequisite

- There is no documented deployment workflow or known host-specific deployment integration in this repository.
- There is no trusted served commit marker in the current application.
- This slice intentionally does not add a marker by guessing the hosting provider or inventing an environment variable. That would require a verified deployment contract and a controlled implementation in the actual build pipeline.
- No deploy, DNS change, environment change, cache purge, secret access, or production mutation is performed.
- The external inspection path used during this bake could not retrieve the live domain directly; the manual GitHub Actions runner audit is the next evidence collection path.

**Current production commit parity: NOT VERIFIED.** The source has no evidence mechanism yet that binds the live response to a Git SHA. Even a future marker match remains a review item until its build/deployment provenance is confirmed.
