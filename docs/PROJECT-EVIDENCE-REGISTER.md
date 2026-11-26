# Project Evidence Register

**Status:** review inventory, not public portfolio copy  
**Source:** owner-provided five-page résumé  
**Disclosure rule:** this repository is public. Client, customer, institution, brand, and product names have been generalized until the owner explicitly clears each attribution for publication.

This register records what the résumé states and what still needs evidence. It does not convert résumé bullet points into approved case studies.

## Evidence ledger

| ID | Generalized workstream | CV page | Contribution wording in source | Disclosure / evidence gate |
|---|---|---:|---|---|
| `ai-operational-reporting` | AI-assisted reporting and conversational assistant | 3 | Engineered the reporting platform and assistant; implemented the extraction pipeline | Confirm whether one or two projects; approve AI/data details and artifacts |
| `transaction-data-extraction` | Transaction extraction and canonicalization | 3 | Architected the extraction system | Confirm sanitized data model and diagrams |
| `public-sector-platform-integration` | Public-sector platform integration | 3 | Contributed to backend architecture and integration | Confirm attribution; preserve contribution wording |
| `network-infrastructure-field-reporting` | Field reporting for network infrastructure | 3 | Developed the field-reporting system | Security review; remove topology, site, and asset details |
| `network-monitoring-alerting` | Network monitoring and alerting | 3 | Designed and deployed monitoring platforms, dashboards, and alerts | Security review; use synthetic topology |
| `internal-security-dlp` | Internal security and DLP | 3 | Developed secure internal systems and DLP solutions | Explicit security review; no controls or gaps disclosed |
| `hydropower-data-workflows` | Hydropower data extraction and reporting | 3 | Designed and implemented pipelines and workflows | Confirm client disclosure and sanitized operational data |
| `distribution-logistics-monitoring` | Distribution logistics monitoring | 3 | Developed dashboard and visualization ecosystem | Confirm client attribution and data permission |
| `municipal-waste-operations` | Municipal waste-management application | 4 | Led architecture and end-to-end delivery | Confirm municipal attribution, team, and ownership |
| `food-beverage-pos` | F&B point-of-sale platform | 4 | Architected core system and oversaw technical foundation and scalability | Confirm brand and product disclosure |
| `retail-distribution-mapping` | Retail distributor mapping | 4 | Developed geographic identification and mapping platform | Confirm location and distributor-data disclosure |
| `business-operations-platforms` | HRM, CRM, and accounting platforms | 4 | Engineered the internal platforms | Confirm scope; potentially split after evidence review |
| `analytics-integration-middleware` | Analytics middleware for POS/ERP/CRM | 4 | Developed pipeline and integration tool | Confirm integrations; evidence any savings claim |
| `modular-erp-architecture` | Modular ERP architecture | 4 | Led the technical design | Confirm deployed vs design status and shareable architecture |
| `ai-interface-auditing` | AI-assisted interface auditing | 4 | Engineered an automated auditing framework | Confirm prototype/tool status and verify 14-agent claim |

## Technology evidence present in the résumé

Only list a technology on a project page when the source explicitly associates it with that work or the implementation evidence confirms it.

| Workstream | Explicit source-level technology evidence |
|---|---|
| AI-assisted reporting and assistant | NER, BERT, LLMs |
| Network monitoring and alerting | SNMP |
| Modular ERP architecture | Microservices architecture (described as standalone services and distinct databases) |
| AI-assisted interface auditing | Bun; 14 parallel agents stated in the résumé |
| Other workstreams | No project-specific technology list is supplied by the résumé |

General résumé skills are not automatically project stacks. Do not copy all listed languages/frameworks into every project.

## Common evidence needed before publication

- [ ] Owner confirms the project can be represented publicly.
- [ ] Exact project/product/client label is approved, or remains generalized.
- [ ] Project timeframe and status are confirmed.
- [ ] Personal contribution is separated from team contribution.
- [ ] A real screenshot, approved demo, or sanitized artifact is available.
- [ ] Architecture and workflow material has been checked for confidential details.
- [ ] Project-specific technologies are verified.
- [ ] Outcomes are supported by evidence; unsupported metrics are omitted.
- [ ] Public case-study copy is reviewed by the owner.

## Implementation rule

The machine-readable register is in `src/data/project-evidence.ts`. It is intentionally not imported by public routes. Its entries use the fixed state `review-required`; the public case-study system remains separate. Never auto-generate an approved case study from this register.

The existing public work page may continue to show generalized work domains. It must not render this evidence register or expose draft records.


## Additional independent product source review

| ID | Generalized workstream | Source | Evidence established | Publication state |
|---|---|---|---|---|
| `independent-it-services-platform` | Connected operating platform for IT services | Owner-controlled private repository; product strategy, domain architecture, roadmap, source tree, and operating documentation reviewed read-only | Product direction, documented Go modular-monolith / Next.js / PostgreSQL architecture, and identity/tenant platform foundations; full PSA business lifecycle remains target-only | `review-required`; project in progress; attribution and public visuals not cleared |

The private product name, source repository URL, deployment hosts, and customer/partner references are intentionally omitted from this public repository. See `docs/PROJECT-SOURCE-REVIEW.md` for the sanitized source review and publication boundary.
