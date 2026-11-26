# UI Gerhana — Master Implementation Brief

**Document version:** 1.0  
**Status:** Approved foundation; implementation brief  
**Prepared:** 2026-11-26  
**Repository:** \`weexdayend/uigerhana-space\`  
**Working branch:** \`work/uigerhana-personal-identity-v1\`  
**Base branch:** \`main\`  
**Base commit:** \`52abff0e783366fd7c73231d492ae3a9883908da\`

---

## 1. Purpose

This document is the implementation contract for reshaping **uigerhana.space** into Irvan Gerhana's personal professional platform: a coherent identity, portfolio, professional profile, and résumé experience.

This is not an agency rebrand and not a visual rewrite from zero. The existing visual language is a strong foundation. The work is primarily a narrative, information-architecture, content-integrity, and product-experience reconstruction, followed by targeted technical refinement.

The site must let a visitor understand:

1. Who Irvan Gerhana is and how he positions himself.
2. What kinds of digital products and systems he works on.
3. What he has actually contributed to and built.
4. How he thinks about product, design, software, and production.
5. How to explore his work, read his professional history, access his résumé, and start a conversation.

**Core principle:** The interface introduces the person. The work provides evidence. The story makes the professional identity memorable.

## 2. Source of truth and content governance

Content must be traceable to an explicit source. Use this precedence order when sources disagree:

1. **Latest owner-approved identity decisions in conversation** — authoritative for public positioning and preferred display identity.
2. **Owner-provided résumé** — factual source for employment history, project descriptions, stated skills, certification, and publications, subject to confirmation of public disclosure.
3. **Existing repository** — source for current implementation and existing design decisions, not proof that example content is factual.
4. **Prior project context** — a discovery source for additional project candidates, not automatic permission to publish or proof of outcomes.
5. **Editorial copy drafted for the website** — proposed language only until reviewed and approved by the owner.

### 2.1 Locked identity

| Field | Approved value |
|---|---|
| Public display identity | **Irvan Gerhana** |
| Primary professional positioning | **Product Engineer** |
| Current professional context | **Independent / Founder / Product Builder** |
| Primary audience | Potential clients and business partners |
| Website goals | Personal brand, professional opportunities, business opportunities, and credibility |
| Base location in existing profile | Bandung, Indonesia |
| Timezone in existing profile | WIB (UTC+7) |

The public positioning is **Product Engineer**. Do not replace it with agency, studio, freelancer marketplace, or generic full-stack developer positioning.

The résumé source uses the name **Irvan Gerhana Septiyana**, while the owner-approved public display identity is **Irvan Gerhana**. Preserve this distinction. Do not silently overwrite the approved display name or assume which form must appear on the public CV. The full-name treatment on the résumé requires owner confirmation before release.

The owner describes the current context as Independent / Founder / Product Builder. The résumé additionally records two ongoing professional roles with overlapping dates (see Section 5). Treat these facts as coexisting context; do not invent an employment transition or imply that one role replaced the other.

### 2.2 Explicitly unknown / not supplied

The current source material does not establish the following:

- Education history, institution, or qualification.
- Languages and proficiency levels.
- Exact month-level employment start dates.
- Public contact preference and which contact channels should be exposed.
- Confirmed public permission for every named client, institution, product, or project.
- Per-project public URLs, screenshots, source repositories, and deployment status.
- Independently verified performance or business-impact metrics.
- Team size, exact ownership boundaries, and complete contribution split for each project.
- Project dates beyond the year ranges stated in the résumé.

Do not fill these gaps with generic assumptions, generated statistics, inferred credentials, or fabricated biography. Keep unavailable fields absent or explicitly marked as awaiting owner input. Do not publish empty headings or fake content to make a page look complete.

### 2.3 Privacy and publication guardrails

The supplied résumé contains a personal phone number and email address. They are deliberately **not copied into this repository brief**. Before the website is public, the owner must select the contact details intended for public exposure. The existing \`hello@uigerhana.space\` value also requires verification; do not assume it is operational.

The résumé names organizations, institutions, and projects. Before publishing detailed case studies, screenshots, architecture diagrams, or implementation specifics, check whether each item is approved for public disclosure. A résumé entry is a source for the owner's stated experience, not blanket permission to disclose confidential client information. Because this GitHub repository is public, review-only documentation and data files must also use generalized client/product labels until attribution is cleared.

## 3. Brand and narrative

### 3.1 Positioning

**Product Engineer**

*Connecting product thinking, interface design, and software engineering to build meaningful digital products.*

This positioning brings four dimensions together:

- **Product thinking:** understanding problems, workflows, requirements, constraints, and business context.
- **Design and experience:** research, information architecture, interface systems, interaction design, and usability.
- **Software engineering:** frontend and backend implementation, APIs, data models, AI integration, and system architecture.
- **Production engineering:** deployment, infrastructure, monitoring, security, operational reliability, and maintainability.

Do not imply that every project includes all four dimensions. Describe only the responsibilities and contributions supported by the project record.

### 3.2 Narrative statement

The following is proposed website copy, derived from the approved positioning and résumé. It is not a claim of a specific client outcome:

> I'm Irvan Gerhana, a Product Engineer working across product thinking, interface design, and software engineering. I focus on turning ideas and complex workflows into meaningful digital products, connecting the details of user experience with the systems that power them.

### 3.3 Brand line

Retain the existing line:

**From pixel to production.**

Supporting editorial thought:

**Good software is more than what people see. It's everything that makes it work.**

Use this as a philosophy statement, not as a claim that every project was personally delivered end-to-end.

### 3.4 Voice and editorial style

- Clear, grounded, technically literate, and human.
- Confident without inflated superlatives.
- Specific about problems, decisions, constraints, responsibilities, and trade-offs.
- Explain technical work in language that potential clients and business partners can follow.
- Use first-person singular when describing Irvan's own contribution.
- Distinguish personal ownership from team contribution.
- Avoid generic agency language such as "your product, your code, your call" as the primary identity narrative.
- Avoid fabricated testimonials, invented client quotes, or unsupported claims such as "industry-leading", "nationally deployed", or "measurable impact" unless the page provides defensible evidence.

## 4. Audience and visitor outcomes

### Primary audience: potential clients and business partners

They should be able to determine:

- What kinds of problems and systems Irvan can work on.
- Whether his product, design, and engineering approach fits their needs.
- Which relevant projects demonstrate that capability.
- What his role was and what was actually delivered.
- How to initiate a conversation or collaboration.

### Secondary audience: professional peers, recruiters, and hiring managers

They should be able to find:

- A clear professional identity and summary.
- Technical capabilities grouped by discipline.
- Career history and responsibilities.
- Selected project evidence.
- A readable online résumé and a downloadable résumé.

These audiences share one identity. Do not build a separate agency persona and personal persona that contradict one another.

## 5. Verified résumé baseline

The following facts are transcribed from the owner-provided five-page résumé. Preserve the résumé's level of detail unless the owner approves an edit. These are owner-supplied claims, not independently audited facts.

### 5.1 Professional summary source facts

The résumé states:

- 8+ years of experience.
- Experience across backend engineering, frontend development, DevOps, and cloud-native platforms.
- Lifecycle coverage from UI/UX research and system architecture to infrastructure, data pipelines, and AI integration.
- Focus areas in Enterprise AI Engineering, AI-powered automation platforms, intelligent workflows, and agentic systems.
- Emphasis on explainable, maintainable, production-ready systems.
- Experience with enterprise systems, government digital-transformation initiatives, and data-driven operational platforms.

The website should lead with **Product Engineer** rather than copying the résumé's original headline ("Senior Full-Stack Architect and Software Engineer"). A revised CV summary may retain the 8+ years statement and relevant breadth, but must not introduce unverified superlatives or quantified outcomes.

### 5.2 Professional experience

#### Information Systems & Cybersecurity Engineer
**Infomedia Nusantara (Telkom Group)** — Bandung, Indonesia  
**2017 – Present** (as stated in the résumé)

Résumé-listed work, generalized here because client, product, and institution attribution has not yet been cleared for public disclosure:

- AI-assisted reporting and conversational assistant: reporting automation and an intelligent assistant; a continuous-learning pipeline combining NER, BERT, and LLMs to parse unstructured financial and operational data.
- Transaction data extraction: transforming unstructured business and financial pipelines into structured canonical data for enterprise tracking and validation.
- Public-sector digital platform: backend architecture and integration contribution to an e-government platform supporting digital business and public-service transformation across West Java.
- Network infrastructure field reporting: identifying, logging, and resolving physical network infrastructure issues on site.
- Network monitoring and alerting: SNMP-based monitoring, real-time dashboard visualization, and uptime/downtime alerts.
- Internal security and DLP: secure internal systems and Data Loss Prevention solutions using policy-driven controls.

#### Co-Founder & Lead Software Engineer
**Saptakarya** — Bandung, Indonesia  
**2021 – Present** (as stated in the résumé)

Résumé-listed work, with external client and product labels generalized pending disclosure review:

- Hydropower data workflows: automated data-extraction pipelines and reporting workflows for hydropower plants.
- Distribution logistics monitoring: monitoring dashboard and data-visualization ecosystem for fertilizer-distribution logistics across West Java.
- Municipal waste-management application: software architecture and end-to-end delivery for municipal logistics and operational processes.
- F&B point-of-sale platform: core internal POS and management system, including technical foundation and scalability.
- Retail distributor mapping: geographic identification and mapping for retail-goods distributors in two areas of West Java.
- Business operations platforms: HRM, CRM, and automated accounting-journal systems for business operations and financial reporting.
- Business-system analytics middleware: integration pipeline for extracting insights from existing POS, ERP, and CRM systems.
- Modular ERP architecture: business domains isolated into standalone services and distinct databases, with migration files and team layouts.
- AI-assisted UI/UX auditing: automated framework on Bun, orchestrating 14 parallel agents for layout analysis and heuristic reasoning.

Do not restore client, institution, or product names from the source résumé into this public repository until the owner explicitly approves each attribution.

### 5.3 Technical skills from the résumé

Keep the source categories recognizable. The website may present them in a more useful visual taxonomy, but do not add technologies merely because they appear in another project's stack.

| Source category | Résumé-listed skills |
|---|---|
| Languages & Runtimes | TypeScript, JavaScript, Go, Python, Node.js, Bun |
| Frontend & UI/UX | React, Next.js, Tailwind CSS, shadcn/ui, UI/UX Research & Layout Analysis |
| Backend & Database | Hono, REST APIs, Microservices Architecture, Supabase, Canonical Data Modeling |
| AI & Data Engineering | LLM Integration, NER, BERT, Agentic Platforms, Continuous-Learning Pipelines |
| DevOps & Infrastructure | Cloud-Native Deployments, SNMP Monitoring, Data Loss Prevention (DLP) |

Do not silently add PostgreSQL, Prisma, FastAPI, XGBoost, Prophet, Docker, or other technologies to the résumé skill list based only on other project context. They may be included in a specific project case study when that project's implementation supports the claim and the owner approves it.

### 5.4 Certification

- **UI/UX Research and Design — Binar Academy**

No certification date or credential ID is present in the supplied résumé. Do not invent either.

### 5.5 Technical leadership and publications

Résumé-listed focus areas:

- Enterprise AI Engineering
- AI Governance
- Context Engineering
- Canonical Data Architecture
- Agentic Systems
- Distributed Software Architecture

Résumé-listed publishing profiles:

- DEV Community: \`@uigerhana\`
- Medium: \`@weexdayend\`

Verify canonical profile URLs and select actual articles before adding live links or featured writing cards.

### 5.6 Education and languages

No education history or language section is supplied in the résumé. Omit these from the public CV until the owner provides accurate information. Do not infer an education path from a certification.

## 6. Project portfolio strategy

The portfolio is the primary evidence layer of the site. A project card must lead to a meaningful project story, not a fictitious testimonial or placeholder modal.

### 6.1 Project inventory from the résumé

The résumé describes 15 workstreams across the two roles above. The public repository intentionally stores only generalized descriptors until disclosure is approved:

**Enterprise engineering role**
- AI-assisted reporting and conversational assistant.
- Transaction data extraction and canonicalization.
- Public-sector platform integration.
- Network infrastructure field reporting.
- Network monitoring and alerting.
- Internal security and DLP.

**Co-founder / lead engineering role**
- Hydropower data extraction and reporting.
- Distribution logistics monitoring.
- Municipal waste-management application.
- F&B point-of-sale platform.
- Retail distributor mapping.
- HRM, CRM, and accounting platforms.
- Business-system analytics middleware.
- Modular ERP architecture.
- AI-assisted UI/UX auditing.

The detailed, machine-readable source-derived register is maintained in `src/data/project-evidence.ts` and summarized in `docs/PROJECT-EVIDENCE-REGISTER.md`. Those records are review-only and are not public case studies. The source résumé remains the factual basis; no client/product labels, timeframes, project status, screenshots, or outcomes should be inferred.

### 6.2 Additional project candidates from existing product context

The following independent product workstreams have appeared in prior project discussions and may be evaluated separately from résumé-listed employment projects. Their public names, current status, ownership, and disclosure are not established by this brief:

- An IT services PSA platform.
- A pet-retail ERP/POS workflow covering expiry-sensitive inventory and valuation.
- A creator platform with public discovery and administrative workspaces.
- An AI-assisted billing workflow/platform.
- UI Gerhana itself — the personal site and its custom visual system.

Do not infer that any of these are publicly launched, client engagements, or approved portfolio stories. Confirm ownership, status, public naming, URL, and which implementation evidence may be shown before adding a case study.

### 6.3 Case-study content contract

Every published project detail should use only applicable, supportable fields:

1. Project name and short description.
2. Context and problem.
3. Project status and relevant timeframe, if known.
4. Organization/client attribution, only when disclosure is permitted.
5. Irvan's role and responsibilities.
6. Team collaboration and ownership boundary, if known.
7. Product or UX decisions, where relevant.
8. Architecture and technical approach.
9. Constraints, trade-offs, and engineering challenges.
10. Confirmed deliverables and outcomes.
11. Technology used on that project.
12. Approved screenshots, diagrams, links, and repository references.
13. Lessons learned, where useful.

**Do not fabricate:** customer quotes, client testimonials, metrics, revenue impact, conversion uplift, latency, scale, user counts, launch dates, team size, production status, or ownership.

Outcomes may be qualitative when quantitative evidence is unavailable. Label planned capabilities as planned, prototypes as prototypes, and active development as in progress.

### 6.4 Featured-project selection

Do not rank projects only by visual appeal. Select featured work using:

- Relevance to Product Engineer positioning.
- Strength of the actual contribution.
- Depth of product and engineering decisions.
- Evidence and permission to publish.
- Clarity for potential clients and partners.

A smaller number of strong, substantiated case studies is preferable to a large catalogue of thin or unverified cards.

## 7. Information architecture

### 7.1 Primary navigation

Recommended navigation:

- About
- Work
- Expertise
- Experience
- Writing
- Résumé
- **Let's connect** (primary CTA)

Keep navigation compact and ensure mobile navigation exposes the same important destinations.

### 7.2 Target routes

| Route | Purpose |
|---|---|
| \`/\` | Personal homepage and narrative overview |
| \`/about\` | Background, product philosophy, and working approach |
| \`/work\` | Selected project index |
| \`/work/[slug]\` | Individual project case study |
| \`/experience\` | Professional timeline and responsibilities |
| \`/writing\` | Selected technical writing and notes |
| \`/writing/[slug]\` | Individual article |
| \`/cv\` | Readable, print-friendly online résumé |

Contact can remain a meaningful homepage section with a stable anchor. Add a dedicated contact route only if it serves a real use case.

Implement routes incrementally. Do not create empty routes just to satisfy the map.

## 8. Homepage narrative and page requirements

The homepage should tell one continuous story:

### 01 — Introduction

**Purpose:** identify the person and explain the positioning immediately.

Required content:
- Irvan Gerhana (approved display name).
- Product Engineer.
- A concise, first-person or first-person-adjacent introduction.
- Product / design / engineering focus.
- Bandung, Indonesia only if location remains approved for public display.
- Primary CTA to selected work.
- Secondary CTA to résumé.

Retain "From pixel to production" as the brand line, but make the professional positioning more explicit than the current agency-style hero.

### 02 — About / approach

Explain how product thinking, UX research and interface design, software engineering, and production concerns fit together. Use concrete principles, not an invented life story.

### 03 — Selected work

Show a small set of owner-approved projects. Each card should communicate the domain, problem space, contribution, and a useful next action. No fake metrics or testimonials.

### 04 — Expertise

Group skills into understandable capabilities rather than a wall of technology logos. Suggested groupings:

- Product and systems thinking.
- Interface and experience design.
- Full-stack and backend engineering.
- AI and data engineering.
- Infrastructure, security, and operations.

Use only the résumé's verified skill list or technology evidence from a reviewed project record. Distinguish demonstrated project use from self-described proficiency.

### 05 — Experience

Show the two résumé-listed professional roles and their year ranges without inventing month dates. Explain role responsibilities and attach related projects. Keep concurrent dates legible; do not imply one role succeeded the other.

### 06 — Engineering philosophy

Use a concise set of principles derived from demonstrated work, for example:
- Start with the workflow and domain, not a framework.
- Make data structures and system boundaries explicit.
- Design for explainability and maintainability.
- Treat security and operational reliability as product concerns.
- Keep interfaces clear as system complexity grows.

These are proposed editorial principles. The owner should review them before publication.

### 07 — Open source and writing

Only show specific repositories and articles with verified canonical URLs. A profile link is not a substitute for an individual repository link. Clearly separate public repositories, experiments, and writing.

### 08 — Contact

A direct and professional invitation to discuss a product, technical collaboration, or relevant opportunity. Publish only contact channels approved by the owner. Avoid implying an agency engagement model, fixed packages, or retainers unless the owner explicitly wants those offers.

## 9. Online résumé and downloadable CV

The résumé is a first-class part of the site, not a button with no supporting experience.

### 9.1 Online résumé

Build \`/cv\` as a clean, accessible, responsive professional document with:

1. Name and professional positioning.
2. Professional summary.
3. Professional experience.
4. Selected projects.
5. Technical skills.
6. Certification.
7. Publications / technical leadership.
8. Contact information approved for public display.

Education and languages must be omitted until supplied. Do not display an empty section.

### 9.2 Downloadable résumé

The web résumé and PDF must derive from the same structured content source to prevent drift. Use a deliberate print layout with sensible page breaks, selectable text, working links, and no UI-only controls in the printed result.

Do not overwrite the supplied résumé file. Treat it as source material. Do not redistribute its phone number or email until the owner selects which details should be public.

Before release:
- Confirm whether the résumé should display "Irvan Gerhana" or "Irvan Gerhana Septiyana".
- Confirm public email and phone policy.
- Confirm whether project/client names may be published.
- Confirm education and language details if the owner wants them included.

## 10. Visual direction and design constraints

### 10.1 Preserve the current visual foundation

The following should remain recognizable:

| Element | Existing direction |
|---|---|
| Primary dark | Obsidian \`#0b0e11\` |
| Primary light | Stone \`#f2efe7\` |
| Text on dark | Bone \`#e8e4d8\` |
| Accent | Amber \`#f0b765\` |
| Core sans | Geist |
| Monospace | Geist Mono |
| Pixel accent | Pixelify Sans |
| Visual signature | Bayer dithering, pixel geometry, and isometric graphics |
| Layout language | Editorial grids, deliberate borders, asymmetric composition, restrained surfaces |

Preserve high legibility and use pixel treatments as a signature, not as noise behind long-form reading content.

### 10.2 Visual behavior

- Keep light/dark polarity transitions intentional and readable.
- Use motion to support narrative and orientation, not as a requirement to consume content.
- Honor \`prefers-reduced-motion\`.
- Ensure touch users can access every interaction without pointer-only behavior.
- Maintain responsive behavior from small mobile through wide desktop.
- Avoid ornamental UI that competes with project evidence and professional content.

### 10.3 Existing scroll-driven hero

The current hero uses a tall desktop scroll runway, sticky positioning, a clip-path expansion, and staged service content. Review this interaction against the new personal narrative. Keep it only if it strengthens the introduction and does not hide, delay, or complicate access to the core content. A simpler hero is acceptable if it communicates the identity more clearly.

## 11. Content and data architecture

The current \`src/data/site.ts\` centralizes all marketing copy and example portfolio data. Refactor toward typed, separated content modules as the site grows.

Suggested conceptual separation:

- \`profile\`: display identity, positioning, location, approved contacts, summary.
- \`experience\`: roles, organizations, locations, years, responsibilities.
- \`projects\`: case studies, roles, status, technologies, evidence, disclosure state.
- \`skills\`: categories and evidence references.
- \`certifications\`: name, issuer, date only when known.
- \`writing\`: articles and verified external URLs.
- \`navigation\`: route labels and CTA configuration.

Keep TypeScript types close to the data contracts. Avoid duplicating CV facts manually across homepage, experience page, and PDF. Do not introduce a CMS or backend unless a real content-management requirement emerges.

For each project, maintain a publication state such as:
- \`draft\`
- \`needs-owner-confirmation\`
- \`needs-disclosure-review\`
- \`approved\`

Only \`approved\` content may render publicly.

## 12. Repository baseline and technical review

The inspected baseline is commit \`52abff0e783366fd7c73231d492ae3a9883908da\` on \`main\`.

Observed repository characteristics:
- Next.js App Router.
- Next.js \`16.4.6\`.
- React / React DOM \`19.3.0\`.
- TypeScript.
- Tailwind CSS \`4.3.3\`.
- ESLint 9 configuration.
- npm scripts and \`package-lock.json\`.
- Existing modular visual components under \`src/components\`.
- Existing shared page content in \`src/data/site.ts\`.
- Custom dither field generation in \`src/lib/dither.ts\`.

No build, lint, browser, or automated test execution is asserted by this document. These checks must be performed during implementation.

### 12.1 Existing issues to resolve

1. **Placeholder case studies:** \`Meridian Ledger\` and \`Selene Studio\` contain fictional blueprint-style names, testimonials, and quantitative outcomes. Remove them from public rendering and replace them only with approved real projects.
2. **Open-source links:** current items use generic profile URLs rather than verified individual repository URLs. Remove or replace these items after checking the actual repositories.
3. **Contact details:** the configured \`hello@uigerhana.space\` requires owner verification. Do not publish the personal phone/email from the résumé by default.
4. **Profile URLs:** validate GitHub, LinkedIn, and X canonical profiles. The current code uses \`irvangerhana\` links while the repository owner is \`weexdayend\`; do not assume they are interchangeable.
5. **Service-agency narrative:** replace the current founder/client/retainer-oriented positioning with personal professional narrative. A small collaboration CTA may remain.
6. **FAQ content:** current questions focus on agency engagements, pricing, and retainers. Remove or replace with authentic professional principles or useful project questions.
7. **Writing cards:** review each generated note and article body. Keep only writing the owner approves as their own publishable work; do not imply that a draft has already appeared on DEV or Medium.
8. **Modal accessibility:** add focus management, Escape handling, focus restoration, and appropriate dialog labelling. Ensure background content is not interactive while a modal is open.
9. **Service interaction semantics:** replace clickable non-semantic containers with native buttons or equivalent accessible controls. Ensure keyboard and touch operation.
10. **Dither canvas lifecycle:** review the perpetual animation-frame loop, reduced-motion behavior, offscreen work, resize handling, and cleanup. Static rendering should be possible when motion is reduced or not needed.
11. **Responsive/navigation behavior:** verify mobile menu closure, route anchors, sticky header offsets, and scroll interactions after the IA change.
12. **Metadata:** update title, description, canonical origin, Open Graph, social preview, author metadata, and page-specific metadata after the public domain is confirmed.
13. **Documentation and quality gates:** replace the starter README with project-specific setup and architecture notes; add reproducible checks and CI only after selecting the intended package-manager/deployment workflow.

### 12.2 Next.js-specific implementation constraint

The repository contains an \`AGENTS.md\` instruction requiring implementers to consult the installed Next.js documentation under \`node_modules/next/dist/docs/\` before changing Next.js APIs or conventions. Follow that instruction when working in a local checkout. Do not assume API behavior from older Next.js versions.

## 13. Accessibility, performance, and SEO acceptance

### Accessibility
- Semantic landmarks, heading hierarchy, descriptive links, and visible keyboard focus.
- Keyboard-operable navigation, menus, accordions, and dialogs.
- Correct accessible names and expanded/selected states.
- Dialog focus entry, containment, Escape behavior, and restoration.
- Reduced-motion support across all animation systems.
- Contrast and text scaling checks.
- Canvas artwork remains decorative unless an equivalent text description is needed to understand content.

### Performance
- Avoid unnecessary client components and hydration.
- Keep heavy visual effects scoped and lifecycle-safe.
- Lazy-load non-critical project imagery and below-the-fold content.
- Avoid continuously rendering offscreen visualizations.
- Optimize font and image loading.
- Verify the experience on realistic mobile devices and network conditions.

### SEO and sharing
- Unique page title and description.
- Canonical URLs on the confirmed domain.
- Open Graph and social sharing metadata.
- Structured data only where accurate and useful.
- Indexable text for profile, work, and résumé content.
- No private contact information or undisclosed project details in metadata.

## 14. Implementation phases and checkpoints

Work in the single branch \`work/uigerhana-personal-identity-v1\`. Do not open a pull request until explicitly requested.

### Phase 0 — Content integrity and inventory

- Preserve the current UI as a reference.
- Map all current copy to approved, draft, placeholder, or remove.
- Incorporate résumé facts from this brief.
- Create a project evidence and disclosure checklist.
- Remove fictional case studies and fake testimonials from public output.

**Exit criteria:** no unverified placeholder content is publicly rendered.

### Phase 1 — Information architecture and data contracts

- Define shared typed content for profile, experience, skills, projects, certification, and writing.
- Define publication-state rules for project content.
- Implement navigation and page shells.
- Ensure the public display name and CV name distinction is explicit.

**Exit criteria:** one maintainable source for repeated professional facts; no duplicated hand-maintained CV facts.

### Phase 2 — Homepage reconstruction

- Rebuild the narrative around Product Engineer.
- Reposition About, Selected Work, Expertise, Experience, Philosophy, Writing, and Contact.
- Retain the existing visual identity.
- Evaluate the scroll-driven hero against content clarity and accessibility.

**Exit criteria:** a visitor can identify Irvan, understand the positioning, discover relevant work, and find a next action without navigating a maze.

### Phase 3 — Project portfolio

- Create the work index and case-study template.
- Populate only owner-approved, disclosure-cleared project entries.
- Distinguish employer work, co-founder work, independent projects, and experiments.
- Add individual project links and visuals only after verification.

**Exit criteria:** each public case study has a clear contribution statement and no unsupported claims.

### Phase 4 — Experience and résumé

- Implement professional timeline.
- Implement responsive online CV.
- Build downloadable PDF from the same structured facts.
- Resolve public display-name and contact decisions.

**Exit criteria:** web and PDF résumé agree; unknown fields are omitted rather than invented.

### Phase 5 — Writing and open source

- Verify DEV and Medium URLs.
- Select actual articles.
- Verify each individual GitHub repository URL and README.
- Separate experiments from maintained/public projects.

**Exit criteria:** every outbound link resolves to the specific resource it describes.

### Phase 6 — Production readiness

- Accessibility review.
- Responsive browser review.
- Build and lint.
- Automated tests for key interactions and data contracts.
- Metadata and social-preview checks.
- Performance review.
- Deployment and domain verification.

**Exit criteria:** all checks have recorded results; no claim of production readiness is made without evidence.

## 15. Definition of Done

The reconstruction is complete when:

- [ ] The site consistently presents Irvan Gerhana as a Product Engineer.
- [ ] The professional story is coherent for potential clients and business partners.
- [ ] The visual identity remains recognizable and purposeful.
- [ ] No fictional client, fabricated testimonial, fake metric, or invented credential is publicly visible.
- [ ] Every public project has a reviewed role, status, contribution, and disclosure state.
- [ ] Experience dates and role names match the approved source.
- [ ] Skills are factual and distinguish résumé skills from project-specific evidence.
- [ ] Online CV and downloadable PDF share one source of truth.
- [ ] Unknown education, language, and contact details are not fabricated.
- [ ] Navigation, page routes, links, dialogs, and CTAs work on mobile and desktop.
- [ ] Accessibility, performance, SEO, build, and lint checks have been run and reviewed.
- [ ] README and implementation documentation describe the actual project.
- [ ] All changes remain on the designated working branch until the owner requests a PR.

## 16. Working agreement

- One working branch for this initiative: \`work/uigerhana-personal-identity-v1\`.
- Base is the inspected \`main\` commit listed at the top of this document.
- Do not push implementation changes to \`main\`.
- Do not open a PR unless the owner explicitly asks.
- Keep commits scoped and descriptive.
- Prefer vertical, reviewable increments over a large unreviewable rewrite.
- When a factual gap is found, mark it as missing and continue with supported content.
- Do not block all implementation on optional biography details; build the structure so missing information can be added later.
- Before any sensitive or client-specific content is made public, request owner confirmation.

---

**End of master brief — v1.0**
