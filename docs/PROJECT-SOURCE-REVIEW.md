# Independent Product Source Review

**Review date:** 26 November 2026  
**Source class:** owner-controlled private repository, inspected read-only  
**Portfolio state:** draft; not approved for public rendering  
**Public repository policy:** no product name, private source URL, customer names, partner references, deployment hosts, or sensitive operational topology are reproduced here.

## 1. Source material reviewed

The read-only review covered:

- Owner-approved product strategy.
- Domain and module architecture.
- Production-grade delivery roadmap.
- Repository README and engineering agreements.
- Current API and web application source tree.
- Validation, release, backup, recovery, and operating documentation.

The source repository itself remains private. This portfolio review intentionally does not link to it.

## 2. Source-backed facts

### Product direction

The product strategy defines a Professional Services Automation platform for IT services providers. Its intended scope connects commercial work, project delivery, finance, and ongoing service operations through one operating model.

The product direction is full-lifecycle and production-grade, delivered through incremental vertical slices. This is a statement of product mandate, not proof that the entire lifecycle has shipped.

### Architecture

The reviewed architecture specifies:

- Go modular monolith.
- Next.js, React, and TypeScript web application.
- PostgreSQL as the authoritative transactional data store.
- Contract-first HTTP API using OpenAPI.
- PgBouncer for API transaction pooling.

The architecture explicitly avoids treating every business module as an independently deployed microservice by default.

### Current implementation evidence

The reviewed source tree contains:

- Identity and account/session foundations.
- Passkey enrollment/authentication and recovery-related application flows.
- Tenant and organization access foundations, including invitation-related source.
- A server-side browser handoff/BFF boundary.
- An authenticated web application shell with account, organization, and security areas.
- API, migration, worker, and notification-related source areas.

This inventory establishes source presence. It does not independently prove that every path is enabled in production, generally available, or accepted as a complete business workflow.

### Target versus implementation

The product strategy and roadmap define a broader commercial-to-service lifecycle. The domain architecture distinguishes that target module map from the current platform and identity foundations.

The portfolio must not claim that the complete CRM, estimation, quotation, contract, project delivery, acceptance, finance, project profitability, and IT service-management lifecycle is shipped as one end-to-end product.

### Operational evidence boundary

The source repository contains validation and release tooling plus backup, recovery, and operating records. These must be reported as separate evidence types:

- Source/configuration presence.
- Manual repository validation.
- Exact-SHA CI evidence, where enabled.
- Release-image evidence.
- Runtime validation.
- Backup and external recovery evidence.
- Owner acceptance.

The source records retain open recovery/acceptance follow-ups. The presence of runbooks or deployment files must not be represented as complete disaster-recovery acceptance.

## 3. Safe draft narrative

A connected operating platform for IT services, designed to bring commercial work, delivery, finance, and ongoing service operations into one coherent system.

The platform is being developed as a Go modular monolith with a Next.js application and PostgreSQL foundation. Current source evidence centers on platform, identity, and tenant-access foundations. Business-domain capabilities are delivered incrementally and remain separately governed by their roadmap and acceptance gates.

## 4. Evidence classification

| Claim | State | Meaning |
|---|---|---|
| Product direction | Source-backed | Present in the owner-approved product strategy |
| High-level architecture | Source-backed | Present in architecture documentation and current source configuration |
| Identity and tenant foundation | Source-backed | Relevant code and route areas exist in the reviewed tree |
| Full business lifecycle | Target-only | Defined in strategy/roadmap; not established as shipped end-to-end |
| Complete operational recovery | Acceptance open | Some procedures/evidence exist; remaining recovery and owner gates are not closed |
| Public project identity and screenshots | Publication pending | Private source; no public product attribution or visual package approved in this review |
| Measured customer/business outcomes | Not evidenced | No attributable outcomes or metrics were approved in the reviewed source material |

## 5. Required publication review

- [ ] Clear the public product name and public URL, or retain a generalized title.
- [ ] Confirm exact personal contribution and team boundaries.
- [ ] Choose one implemented vertical slice for the first public deep dive.
- [ ] Reconcile every shown capability with current code and acceptance evidence.
- [ ] Capture owner-approved screenshots or a reproducible sanitized demo.
- [ ] Remove tenant, customer, partner, financial, identity, and infrastructure details.
- [ ] Keep source, tests, CI, runtime, recovery, and owner-acceptance claims separate.
- [ ] Approve the final copy and visual materials.

Until these checks are complete, the case study remains a draft and is excluded from the public work index and detail routes.
