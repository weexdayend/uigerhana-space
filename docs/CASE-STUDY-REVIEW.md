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
