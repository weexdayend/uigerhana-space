# Case Study Review Inventory

**Purpose:** track the evidence and approval required before résumé-backed work becomes a public case study.  
**Rule:** draft inventory is not publishable content. Only records with publicationStatus set to approved may render on the public work index or detail routes.

## Public case study

### UI Gerhana — Personal professional platform

- **Status:** In progress.
- **Context:** Independent personal project.
- **Owner-confirmed scope:** personal identity, information architecture, design direction, content model, homepage, portfolio routes, and online résumé implementation.
- **Public visibility:** approved as the owner's own personal website.
- **Evidence in repository:** typed profile, experience, skills, work-domain, case-study, and approach modules; homepage sections; /work and /work/[slug] routes; /cv route; custom dither renderer.
- **Visual material:** the case-study gallery uses generated artwork/studies from the repository. It does not represent product screenshots or evidence of a completed launch.
- **Do not claim:** completed launch, user adoption, conversion, performance uplift, or business outcomes that have not been measured.

## Résumé-backed case-study candidates

The following are generalized candidate workstreams based on the supplied résumé. They are not public case studies yet. Project names, employer/client attribution, role boundaries, public disclosure rights, and supporting materials must be reviewed before creating a public detail page.

| Candidate workstream | Résumé evidence available | Required review before publication |
|---|---|---|
| Enterprise AI and intelligent reporting | AI reporting automation, intelligent assistant, NER, BERT, LLM integration | Exact project scope, contribution boundaries, approved diagrams/screenshots, disclosure |
| Transaction intelligence | Extraction of unstructured business/financial data into canonical structured data | Data examples must be sanitized; architecture and role confirmation |
| Public-service digital platform | Backend architecture and integration contribution | Organization/project disclosure approval and exact contribution |
| Infrastructure field reporting | Field reports for physical network infrastructure issues | Product status, user workflow, screenshots without sensitive infrastructure details |
| Network monitoring | SNMP-based network monitoring, live dashboards, and uptime/downtime alerts | Security review, topology sanitization, project attribution approval |
| Enterprise security and DLP | Secure internal systems and policy-driven DLP solutions | Security review and explicit approval; no sensitive implementation details |
| Hydropower reporting workflows | Automated extraction and reporting for hydropower operations | Project/client disclosure approval, role and data-scope review |
| Distribution monitoring | Monitoring dashboard and visualization for distribution logistics | Client disclosure, public data permission, screenshots and contribution review |
| Municipal waste-management application | Architecture and end-to-end delivery of a digital waste-management application | Project disclosure approval, role and delivery evidence |
| F&B POS platform | Core internal POS and management system architecture | Brand disclosure, ownership boundaries, product status, and screenshots |
| Retail distribution mapping | Geographic identification and mapping for retail distributors | Location/data sanitization and project disclosure approval |
| HRM, CRM, accounting and ERP | Internal enterprise platforms and modular ERP architecture | Separate project scope, architecture diagrams, delivery status, role boundaries |
| Analytics middleware | POS/ERP/CRM integration for business analytics | Data permission, integration detail, and measurable outcomes only if evidenced |
| AI UI/UX auditing | Bun-native audit framework with 14 parallel agents | Repository/demo evidence, exact evaluation scope, and status clarification |

## Required case-study record

Before changing a candidate to approved, complete and review:

- [ ] Public title and summary.
- [ ] Project status: in progress, completed, maintained, prototype, or experiment.
- [ ] Context and timeframe, if known.
- [ ] Employer, client, or product attribution approval.
- [ ] Irvan's exact role and personal contribution.
- [ ] Team contribution boundaries, if applicable.
- [ ] Problem and users/workflow.
- [ ] Product and UX decisions, where relevant.
- [ ] Architecture and technical decisions supported by evidence.
- [ ] Constraints and trade-offs.
- [ ] Deliverables and outcomes; metrics only when measured and attributable.
- [ ] Approved screenshots, diagrams, links, or sanitized artifacts.
- [ ] Technology list verified against that project.
- [ ] Disclosure and confidentiality review.
- [ ] Owner approval for public publication.

## Publication behavior

- Draft: never render publicly.
- Approved: eligible for the public work index and detail route.
- Unknown or missing slugs: return not found.
- Never generate a case-study page from résumé bullet points alone.
- Do not use anonymous client-quote cards or invented testimonials as substitutes for evidence.


## Independent product candidate — connected IT services platform

- **Publication state:** Draft only; not included in the public work index or public detail routes.
- **Project state:** In progress, based on the reviewed source tree and product roadmap.
- **Source class:** Owner-controlled private repository reviewed read-only on 26 November 2026. The product name, repository URL, deployment hosts, and external references are intentionally not reproduced here.
- **Source-backed product direction:** A Professional Services Automation platform for IT services providers, intended to connect commercial work, project delivery, finance, and ongoing service operations.
- **Source-backed architecture:** Go modular monolith, Next.js/React/TypeScript web application, PostgreSQL data foundation, contract-first OpenAPI API, and PgBouncer.
- **Current source evidence:** Identity, account/session, passkey, tenant-access, invitation, browser handoff, and authenticated web application foundations are present in the reviewed source tree.
- **Target-only capability:** The complete commercial-to-service lifecycle and its business-domain modules remain a product/roadmap target. The source architecture explicitly distinguishes that target module map from the current platform and identity foundations.
- **Operational boundary:** Validation/release and backup/operating documentation exist. Repository checks, runtime validation, external recovery, and owner acceptance are separate evidence states; do not collapse them into a single production-readiness claim.
- **Public visual evidence:** None approved in this review. Do not create substitute product screenshots or expose private UI/customer information.

### Claims permitted in a future approved case study

- The product strategy defines a connected IT-services PSA lifecycle.
- The reviewed architecture specifies a Go modular monolith with a Next.js application and PostgreSQL.
- The current source tree contains identity and tenant-access foundations.
- Business-domain delivery is incremental and slice-gated.

### Claims not permitted without additional evidence

- The entire PSA lifecycle is implemented or generally available.
- All target business modules have production data, APIs, or customer-facing workflows.
- Measured customer adoption, revenue, time savings, conversion, performance, or service-level outcomes.
- Named product, customer, vendor, or partner attribution.
- Exact personal/team contribution boundaries beyond what the owner confirms.
- Production disaster-recovery or service-level acceptance beyond the source acceptance records.

### Required before publication

- [ ] Owner clears the public product name and URL, or explicitly chooses a generalized title.
- [ ] Owner confirms role, personal contribution, and team boundaries.
- [ ] Select one implemented vertical slice and map it to exact source evidence.
- [ ] Confirm current shipped/preview/roadmap status for each capability shown.
- [ ] Capture owner-approved screenshots or a reproducible sanitized demo.
- [ ] Redact tenant, customer, partner, financial, identity, and infrastructure details.
- [ ] Reconcile source, test, manual-validation, CI, runtime, and acceptance evidence independently.
- [ ] Owner approves the final public copy and visual materials.


## Vertical slice candidate — passwordless team invitations

- **Publication state:** Draft only; excluded from the public selector and public work index.
- **Source state:** S1.3 patches 1–3 are recorded as implemented locally, not released.
- **Workflow:** owner/admin creates an invitation → invitation and notification intent persist transactionally → the link opens in read-only mode → existing-account or new-passkey-account path → invitation acceptance and active membership.
- **Authorization:** owners and admins may invite members; only owners may invite admins or owners. Inviting an elevated role requires fresh passkey evidence.
- **Invitation controls:** seven-day lifetime, twenty per organization per day, token digest storage, resend replacement, cancellation, expiry and one-use handling.
- **New-account path:** display name and passkey registration with user verification; account, confirmed address, passkey, membership and audit commit in one transaction; no session is opened by joining.
- **Recorded local validation:** PostgreSQL 17, migration up/down/up and Goose, fresh-database Go tests, row-level security enabled/disabled, concurrency/negative cases, and local browser review.
- **Negative-case evidence:** 23 deliberate break cases were recorded. 17 failed as expected in the first pass, two missing test cases were added and caught, and four conditions were covered by a secondary guard.
- **Local browser evidence:** invitation creation, already-member refusal, invitation listing, invitation page fields, ended-link state, and mobile layout without horizontal overflow.
- **Not verified:** real passkey creation on the intended origin, actual recipient mailbox delivery/inbox placement, manual validator, race detector, production release/runtime, and slice owner acceptance.

### Publication guardrails

Do not say "production-ready", "released", or "generally available". Do not imply that real-world passkey ceremonies, inbox placement, manual validator, race detector, or production acceptance passed. The workflow map is derived from source and checkpoint records; it is not an application screenshot. The product identity, screenshots, and exact personal/team contribution remain pending owner clearance.


## Operational case-study candidate — verifiable backup and recovery workflow

- **Publication state:** Draft only; excluded from the public work index and detail routes.
- **Source class:** Owner-controlled private repository; S0.10 and S0.11 acceptance/runtime records reviewed read-only.
- **S0.10:** Explicitly owner-accepted and closed on 12 November 2026. The accepted evidence reports a readable PostgreSQL 17.11 archive, matching off-host workstation copy, and successful isolated restore with 2/2 schemas and 9/9 relations.
- **S0.11:** The 14 November runtime addendum records a natural scheduled backup invocation, successful service completion, remote snapshot listing and archive/checksum-sidecar read-back, a delivered success notification, and one guarded local retention apply retaining the two newest local groups.
- **Important distinction:** The S0.10 workstation copy was off-host but not geographic/cloud off-site storage. S0.11 later added remote object storage, but remote byte read-back does not prove an external PostgreSQL restore.
- **Still open:** No dedicated external recovery environment or external restore drill was recorded; approved 24-hour RPO/RTO objectives remain unmeasured; explicit S0.11 owner acceptance remains outstanding; remote snapshot pruning was not performed.
- **Public material:** No approved product screenshots, public product identity, or precise personal/team contribution statement were included in the private source review. Keep the workflow graphic labelled as source-derived, not an application screenshot.

### Permitted claims

- S0.10 isolated restore was owner-accepted and closed.
- S0.11 scheduled backup, remote object read-back, alert delivery, and guarded local retention had runtime evidence in the 14 November addendum.
- The backup archive/checksum/manifest and isolated restore were separate parts of the operational design.
- Remote read-back is not the same as an external restore drill.

### Claims not permitted

- S0.11 is closed or fully owner-accepted.
- External disaster recovery was rehearsed successfully.
- 24-hour RPO/RTO targets were achieved or measured.
- Remote snapshot pruning was applied.
- The S0.10 workstation copy was geographic/cloud off-site.
- Public customer outcomes or metrics without additional evidence.
