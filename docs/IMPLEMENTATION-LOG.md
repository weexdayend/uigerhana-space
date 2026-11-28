# Implementation Log

## 2026-11-28 — Portfolio proof: System Atlas case-study rework

**Branch:** portfolio-proof/system-atlas-case-study

### Delivered

- Reframed the public UI Gerhana case study around the current System Atlas identity and the actual four-route visitor journey.
- Added a visual route map linking the homepage, work index, case-study detail, and résumé.
- Replaced the outdated Obsidian / Geist / Pixelify description with the selected Basalt / Limestone / Sea Glass / Signal Copper direction and Manrope / Plus Jakarta Sans pairing.
- Updated the contribution breakdown, source-architecture view, and technology map to reflect the current implementation.
- Removed procedural renderer studies from this case-study narrative so generated artwork is not used as a substitute for product evidence.

### Evidence boundaries

- The project remains in progress.
- The public case study continues to describe this personal platform only.
- Three deeper project records remain draft-only pending contribution, evidence, status, and disclosure review.
- No business outcome, client attribution, or production deployment parity is claimed.


## 2026-11-26 — Portfolio case-study foundation

**Branch:** work/uigerhana-personal-identity-v1

### Delivered

- Added a typed case-study contract with explicit publication status and project status.
- Added a public selector that renders only case studies marked approved.
- Added a reusable case-study card.
- Added the selected-work index at /work.
- Added the dynamic detail route at /work/[slug], with unknown or unapproved slugs returning not found.
- Added one approved, in-progress case study for the owner's personal website.
- Connected the homepage work section to the case-study system.
- Added a review inventory for résumé-backed workstreams, including required evidence and disclosure checks.

### Publication safeguards

- Résumé-backed third-party workstreams remain out of the public case-study data.
- No client names, testimonials, unsupported metrics, or confidential architecture details were introduced.
- The UI Gerhana case study is explicitly labelled in progress; no completed launch or business outcome is claimed.

## 2026-11-26 — Visual storytelling and CI repair

**Branch:** work/uigerhana-personal-identity-v1

### Delivered

- Added a code-architecture map showing shared typed content, App Router pages, and reusable presentation layers.
- Added a contribution breakdown that lists workstreams without invented percentage or effort estimates.
- Added a visual gallery using actual generated Bayer-renderer artwork and studies from the repository.
- Explicitly labelled generated visuals as visual assets/studies rather than screenshots of a shipped product.
- Added a technology map grouped by the role each technology plays in the site.
- Expanded the case-study data contract to carry visual, architecture, contribution, and technology details.

### Quality workflow repair

- The earlier CI run stopped at typecheck because Next.js route-aware helper types were not generated before `tsc --noEmit`.
- Updated the typecheck script to run `next typegen` before TypeScript checking.

### Verification

The GitHub Actions run for commit `648e3d7ce148b0b651c09a8359d54aa5034435e5` completed successfully:

- Dependency installation: passed.
- Next.js route type generation and TypeScript typecheck: passed.
- ESLint: passed.
- Next.js production build: passed.
- Static routes included /, /cv, /work, and /work/uigerhana-space.

### Remaining review

- Inspect /, /work, /work/uigerhana-space, and /cv at desktop and mobile sizes.
- Verify an unapproved or unknown case-study slug returns not found.
- Review print pagination and save-to-PDF output in a browser.
- Continue collecting evidence and disclosure decisions for the résumé-backed case-study candidates.

## 2026-11-26 — Résumé-backed project evidence register

### Delivered

- Reopened and reviewed the complete owner-provided five-page résumé, including page-level source references.
- Added a machine-readable evidence register for 15 workstreams described in the résumé.
- Generalized client, institution, product, and brand labels in the public repository pending disclosure approval.
- Preserved the résumé's stated contribution verbs and did not upgrade "contributed" to ownership or end-to-end delivery.
- Recorded only project-specific technologies that the résumé explicitly associates with a workstream.
- Marked every item `review-required`, with project status unconfirmed and attribution not cleared.
- Added a human-readable review table with source pages, contribution language, and publication gates.
- Kept the register out of public rendering and separate from approved case studies.

### Source integrity

- The résumé's overall skills list is not treated as a per-project technology stack.
- No client screenshots, production URLs, testimonials, outcome metrics, dates, or project statuses were invented.
- Infrastructure and security workstreams include additional sanitization/security-review requirements.
- The PDF's personal contact details are not copied into the repository.

### Remaining work

- Gather owner-approved project labels and disclosure permission.
- Collect real screenshots or sanitized artifacts for selected workstreams.
- Confirm status, timeframes, individual contribution, and team context.
- Promote projects individually only after evidence and owner approval.


## 2026-11-26 — Public-repository disclosure sanitization

- Reviewed the public repository for client, customer, product, and institution names copied from résumé-backed workstreams.
- Replaced unapproved third-party project labels in the master brief with generalized workstream descriptions.
- Generalized independent/private product candidate names in the public implementation brief.
- Removed the assistant product label and specific network device family names from public experience copy.
- Kept employer names and owner-approved public identity information separate from third-party project attribution.
- Retained exact project/source detail only in the owner's original résumé, not in new public repository artifacts.

- Final disclosure scan removed remaining device-family labels from public review documentation; network infrastructure details stay generalized pending security review.


## 2026-11-26 — Publication gate enforcement

- Added `npm run verify:content` to the quality scripts.
- Added a CI step that fails if public app/components import the review-only project evidence register.
- Added a CI assertion that all evidence records remain in review-required state until owner review.
- Added a CI assertion that public case studies are selected exclusively through the explicit approved-publication filter.

- Tightened the publication-gate checker to count record object fields only, excluding TypeScript interface declarations.

- Corrected the checker expression to match object-record fields (four-space indentation), not just its original generic declaration text.


## 2026-11-26 — Final validation: project evidence and publication gates

**Validated commit:** `a4c7448cd0427ffa581621a380cf54e252c15625`  
**GitHub Actions:** successful.

- Dependency installation: passed.
- Next.js route type generation and TypeScript: passed.
- Content publication gates: passed.
- ESLint: passed.
- Next.js production build: passed.

The evidence register contains 15 résumé-derived workstreams. All 15 remain review-required, status-unconfirmed, and attribution-not-cleared. Public routes do not import the register. The public case-study selector continues to require explicit approved status.

The public repository's brief, experience copy, and review documentation use generalized project labels until the owner clears attribution. No personal phone/email, client screenshots, client names from draft workstreams, or unsupported project outcomes were added in this pass.

This validates source checks and the production build only; browser-based desktop/mobile inspection and résumé print-output review remain open.


## 2026-11-26 — First repository-backed project deep dive

### Delivered

- Reviewed one owner-controlled private product repository in read-only mode.
- Added a generalized, draft-only case study for an IT-services professional services automation platform; omitted product name, private repository URL, deployment hosts, and external references.
- Added an evidence maturity map that distinguishes source-backed architecture/foundations from roadmap targets, open operational acceptance, and publication-pending material.
- Added a contribution breakdown that describes source-backed workstreams without invented percentages or claims that every target module is implemented.
- Added a high-level architecture map that separates the product model, platform foundation, and incremental vertical delivery.
- Added a technology map limited to technologies explicitly present in the reviewed architecture source.
- Left the private-project visual gallery empty because no owner-approved product screenshots or demo assets were part of this review.
- Added a sanitized source-review document with explicit claim boundaries.
- Added a machine-readable private-source evidence record; it remains review-required and is not imported by public routes.
- Extended the content publication gate to protect the new source evidence and require the new deep dive to remain draft-only.

### Source-backed versus target-only

- Source-backed: product mandate, documented high-level architecture, and identity/tenant application foundations.
- Target-only: the complete commercial-to-service business lifecycle and its future domain modules.
- Acceptance open: complete external recovery and operational/owner acceptance follow-ups.
- Publication pending: product identity, private source link, approved screenshots, precise contribution/team boundaries, and measurable outcomes.

### Verification boundary

- The new case study is not included in `PUBLIC_CASE_STUDIES`; public index and detail routes continue to show approved records only.
- No private product name, source URL, customer/partner name, host, topology, secret, or customer data was added.
- The next GitHub Actions run must validate typecheck, publication gates, lint, and production build on the resulting exact SHA.

- Corrected a missing JSX brace in the conditional visual-gallery render discovered by exact-SHA typecheck.
- Added an explicit publication-gate assertion that the private-source IT-services deep dive remains draft-only until owner approval.


## 2026-11-26 — Passwordless team-invitation vertical slice

### Delivered

- Added a separate draft case study for the role-aware invitation and passkey-first joining workflow.
- Added a source-derived workflow map showing the invitation lifecycle and the existing-account / new-account branches.
- Added a detailed evidence map separating locally built, locally tested, not verified, not released, and publication-pending states.
- Kept the contribution and team attribution explicitly pending owner review.
- Added sanitized source evidence and review documentation for the S1.3 invitation slice.
- Left the real product screenshot gallery empty; no owner-approved image was present in the reviewed source.

### Evidence represented

- Source records identify S1.3 patches 1–3 as implemented locally, not released.
- PostgreSQL 17 migration and Go test evidence, including row-level security on/off and deliberate failure probes.
- Local browser evidence for invitation creation/listing, already-member refusal, ended-link state, and mobile overflow.
- Explicit gaps for real-origin passkey creation, actual mailbox placement, manual validator, race detector, production release/runtime and owner acceptance.

### Publication and claim boundary

- The new invitation deep dive remains `draft`, excluded from `PUBLIC_CASE_STUDIES`.
- Its diagram is an implementation-derived workflow illustration, not a browser screenshot.
- No product name, private source URL, customer reference, deployment host, credential, or operational topology was added.


## 2026-11-27 — Verifiable backup and recovery case study

### Delivered

- Added a third private-source case-study draft focused on PostgreSQL backup integrity, isolated restore, scheduled off-site copies, and guarded retention.
- Reused the workflow map with a configurable branch heading so it can present operational paths rather than only identity paths.
- Extended evidence status labels to distinguish owner-accepted work from runtime-verified operations.
- Added a source-derived workflow and an architecture map separating remote-copy verification from isolated database restore.
- Recorded S0.10's owner-accepted and closed restore drill independently from S0.11's runtime-verified scheduled/off-site operations.
- Added S0.11 open gates for external restore, measured RPO/RTO, and explicit owner acceptance.
- Left the product visual gallery empty because no owner-approved operational screenshot was available in the source review.
- Added sanitized source evidence, review requirements, and a third draft-only CI publication assertion.

### Claim boundaries

- S0.10 owner acceptance does not close S0.11.
- Remote archive/checksum read-back is not an external PostgreSQL restore.
- The S0.10 workstation copy was off-host but not geographic/cloud off-site.
- No RPO/RTO achievement, remote prune, public customer outcome, or S0.11 owner acceptance is claimed.

- Updated the repository README to enumerate all private-source draft categories without exposing product identity or private references.


## 2026-11-27 — Writing, public profiles, and discoverability

### Delivered

- Verified the public DEV Community profile and Medium profile before adding outbound links.
- Selected three owner-authored public articles covering engineering knowledge, enterprise reconciliation, and canonical data architecture.
- Added a responsive Writing section to the homepage and a Writing anchor in desktop/mobile navigation.
- Added verified GitHub, DEV Community, and Medium profile links to the footer; made publication profiles clickable in the online résumé.
- Added a generated Open Graph image aligned with the Obsidian / Stone / Amber identity.
- Added canonical homepage metadata, explicit Open Graph/Twitter image references, and a Person JSON-LD identity record.
- Added sitemap and robots metadata routes. Sitemap entries are generated only for approved public case studies.
- Extended the content publication gate to retain all three public profile links and at least three featured writing links.

### Verification boundary

- The exact-SHA CI run must confirm typecheck, publication gates, lint, and production build.
- The live domain and deployment status were not verified in this pass because the site endpoint did not return a readable page from the available inspection path.
- Browser-based visual review, keyboard/mobile interaction review, print pagination, and runtime accessibility checks remain open; a successful build is not a substitute for those checks.
- No unverified email address, client attribution, private project screenshot, or case-study approval was introduced.


## 2026-11-27 — Cinematic hero and horizontal motion narrative

**Branch:** work/uigerhana-motion-narrative-v1

### Delivered

- Reworked the homepage introduction into a full-viewport hero while retaining the approved Product Engineer positioning, brand line, typography, Obsidian / Stone / Amber palette, and existing Bayer-dithered artwork.
- Added a four-part narrative sequence covering product thinking, interface design, engineering, and production-minded delivery. The copy describes working principles and focus areas; it does not assign unverified outcomes to individual projects.
- Added a desktop GSAP + ScrollTrigger pinned horizontal sequence with sequenced copy/visual reveals and a scroll progress indicator.
- Kept the small-screen experience native and swipeable instead of forcing a pinned scroll interaction.
- Added a vertical, non-pinned presentation for users who prefer reduced motion.
- Added subtle pointer-responsive visual treatment and restrained hover/focus feedback.
- Preserved the selected-work, expertise, experience, philosophy, writing, contact, résumé, and publication-gate architecture.

### Implementation notes

- Added GSAP 3.15.1 as a runtime dependency and recorded it in the npm lockfile.
- GSAP animations are scoped to component lifecycle and are only activated for desktop layouts when reduced motion is not requested.
- The narrative artwork is conceptual interface/architecture visualization, not a product screenshot.

### Verification boundary

- Repository source and branch ancestry were inspected before implementation. The working branch starts from the verified `main` merge commit `f759f6e7c1466ce6aeb89ac817e109441b8c8419`.
- The execution environment could not resolve GitHub from the local terminal, so `npm ci`, typecheck, content gates, lint, production build, and browser QA could not be run locally in this pass.
- The exact-SHA GitHub Actions result must be inspected before treating the implementation as validated. No PR was opened and no merge or deployment was performed.


## 2026-11-27 — Hero art-direction reset

**Branch:** work/uigerhana-hero-art-direction-v2  
**Scope:** homepage hero only

### Direction

- Reframed the hero around one central idea: the interface is only the beginning of a digital product.
- Replaced the previous two-column dither panel and eyebrow-led hierarchy with a direct editorial headline and a single explanatory introduction.
- Removed the decorative eyebrow, top labels, duplicate headline, and extra visual chrome from the hero.
- Designed one conceptual cutaway illustration: a visible product interface above the domain-logic, data/integration, and runtime layers that support it.
- Kept the approved Product Engineer positioning, owner-approved profile copy, and the existing Obsidian / Stone / Amber identity.
- Reduced motion to one entrance sequence that reveals the headline, connected system layers, and signal path in the same narrative order.
- Added a subtle pointer-following light treatment to the artwork; it does not move the page or compete with reading.
- Preserved keyboard focus states and a static composition for reduced-motion preferences.
- Left the existing story section and all sections after the hero unchanged; this iteration is intentionally limited to hero art direction.

### Illustration and claim boundary

- The system cutaway is a conceptual visual, not an actual product screenshot or a claim about one named project.
- Layer labels describe general product-engineering concerns and do not disclose private architecture.
- No client attribution, metrics, testimonial, or unapproved project material was added.

### Verification boundary

- The new branch starts from the verified main merge commit 6076a6c069af865ac10b91cb5a2b2f6893eae158.
- Typecheck, content publication gates, lint, and production build must pass on this branch's exact SHA before the hero is considered implementation-validated.
- Desktop/mobile browser inspection remains necessary to assess actual composition, visual weight, and motion timing.

## 2026-11-27 — Organic-to-modular pixel hero

**Branch:** work/uigerhana-organic-to-modular-hero  
**Scope:** homepage hero and compact primary navigation

### Direction

- Replaced the superseded conceptual system-cutaway hero with the owner-selected Organic to Modular visual direction.
- Established one continuous Bayer-dithered pixel material that moves from an organic flowing form toward structured modular geometry.
- Restored the approved “From pixel to production.” headline and the Product Engineer identity, using the shared profile content.
- Applied the Obsidian / Stone / Amber palette with restrained amber emphasis, generous negative space, and no decorative eyebrow, HUD, or framed artwork panel.
- Simplified the primary navigation to Work, About, and Notes while retaining the résumé link.
- Kept the existing motion-narrative and all other homepage sections unchanged.

### Motion and accessibility

- Added a dedicated canvas renderer for crisp Bayer 4×4 dithering and the organic-to-modular morphology.
- Added a sequenced GSAP intro that reveals the artwork and copy while progressing through the morph.
- Added restrained pointer-responsive deformation on the artwork.
- Added a reduced-motion path that presents the resolved visual without the cinematic sequence.
- Adapted the composition for narrow viewports instead of shrinking the desktop layout.

### Verification

- Exact-SHA GitHub Actions run for `c8316af8641e5126ccc066b0e4ef8bec2290b5e8` passed dependency installation, typecheck, content publication gates, ESLint, and Next.js production build.
- Browser-based visual QA and direct desktop/mobile runtime inspection remain to be completed.
- No PR or deployment was performed as part of this implementation commit.

## 2026-11-27 — Gerhana brand identity foundation

**Scope:** identity, perception, experience, visual governance, and roadmap documentation  
**Status:** strategic foundation approved; creative concept and visual implementation remain open

### Delivered

- Added `docs/BRAND-IDENTITY-SPEC.md` as the source of truth for durable Gerhana identity, positioning, audience perception, visitor experience, verbal identity, visual principles, motion, accessibility, and evidence guardrails.
- Defined the identity around Irvan Gerhana as a Product Engineer and product-minded systems builder, connecting product thinking, interface craft, software engineering, and production-minded systems work.
- Kept “From pixel to production.” as the approved brand line while separating it from any mandatory pixel-art treatment.
- Explicitly separated brand identity from visual styles such as anime, cyberpunk, urban environments, literal studios, pixel/dither graphics, and 3D illustration.
- Added `docs/BRAND-IDENTITY-PLAN.md` with phased work from current-state audit and concept exploration through verbal identity, visual system, connected styleframes, hero vertical slice, site-wide integration, and production QA.
- Updated the README and Master Implementation Brief so older visual assumptions are historical implementation direction, not permanent brand requirements.

### Decisions and boundaries

- Public positioning remains Product Engineer.
- Current shared-profile content and the existing source-of-truth hierarchy remain authoritative until new public copy is explicitly approved.
- The proposed headline “I build digital products that make complex work feel clear.” remains a candidate, not an approved content change.
- Previous hero experiments and visual references are exploration material only; none is selected automatically.
- No website UI, code behavior, portfolio claim, project status, client attribution, or deployment configuration was changed.

### Next step

Begin Phase 1 of the brand identity plan: audit the current website experience, content, and section relationships before exploring new visual concepts. No visual implementation should begin until the owner approves a connected style direction.

## 2026-11-27 — Current experience and content audit

**Scope:** source-based audit of the existing website and visitor journey  
**Status:** repository inspection complete; browser and owner validation remain open

### Delivered

- Added `docs/CURRENT-EXPERIENCE-AUDIT.md` covering routes, homepage order, navigation, hero, narrative, work evidence, capabilities, experience, writing, contact, résumé, responsive rules, motion, accessibility signals, delivery checks, and prioritized opportunities.
- Recorded that the public work selector currently exposes one approved self-platform case study and keeps three deeper case-study records in draft.
- Identified the missing direct contact action, the About navigation anchor targeting the hero copy container, and overlap between the four-beat motion narrative and engineering principles.
- Documented the responsive story behavior: desktop ScrollTrigger pinning, smaller-screen horizontal swipe, and a vertical reduced-motion fallback.
- Updated the identity roadmap with the Phase 1 source-audit status and remaining browser/owner review gates.

### Validation boundary

- Findings are based on the exact `main` source baseline `b487d0529220eff1e5022fe9a625155e52857f23`.
- The public site could not be inspected in a rendered browser during this audit. Desktop/mobile screenshots, keyboard-only review, reduced-motion runtime behavior, touch behavior, and zoom testing remain open.
- No application code, public copy, contact details, project status, disclosure state, or deployment configuration changed.

### Next step

Complete the browser validation matrix and confirm the preferred public contact channel. Then begin creative concept exploration using consistent content and hierarchy across all concept studies.

## 2026-11-27 — Creative concept exploration brief

**Scope:** preparatory Phase 2 strategy documentation  
**Status:** four territories prepared; no concept selected and no implementation authorized

### Delivered

- Added `docs/CREATIVE-CONCEPT-EXPLORATION.md` with four distinct concept territories:
  - The System Atlas
  - The Editorial Instrument
  - Material to Meaning
  - The Product Field Notes
- Established one shared copy baseline from the current approved `PROFILE` record and current hero actions.
- Defined consistent desktop, laptop, mobile, and small-mobile frames for fair comparison.
- Documented visual grammar, hero composition, motion potential, site-wide extension, risks, and proof tests for each territory.
- Recommended studying A, B, and D first, while retaining C as an expressive challenger—not as a selected direction.
- Updated the roadmap and README with the new exploration brief.

### Boundaries

- No visual direction, palette, typography, motif, or animation system was selected.
- No profile copy, public case-study status, contact information, application code, or UI was changed.
- Phase 1 remains source-audit complete with browser and owner validation pending.
- The live website could not be inspected through the available browser path; rendered desktop/mobile QA is not claimed complete.

### Next step

Complete the Phase 1 browser/owner validation, then create comparable static styleframes for the four concept territories using identical copy and viewport dimensions. Obtain owner approval before any implementation.


## 2026-11-27 — Runtime visual and accessibility QA foundation

**Branch:** `qa/runtime-visual-accessibility-gates`  
**Baseline:** `d1cfdce622908c5706a167c8f848bb79e0fe6258`

### Delivered in this change

- Added a production-build Playwright runtime suite covering six desktop/tablet/mobile viewport sizes.
- Added route smoke coverage for `/`, `/work`, `/work/uigerhana-space`, and `/cv` at desktop and mobile sizes.
- Added axe-core WCAG A/AA and best-practice scans for the same routes.
- Added browser interactions for mobile menu Escape/focus return, skip-to-content, keyboard scrolling of the mobile story, and desktop reduced motion.
- Added screenshot, trace, and HTML-report artifacts to the CI browser job.
- Added a homepage skip link, explicit main-content focus target, global focus-visible treatment, and keyboard access to the horizontally scrollable story region.
- Added Escape-to-close behavior to the mobile navigation and restored focus to its trigger.
- Corrected the audit/roadmap language: prior responsive/accessibility notes were source inspection only, not executed browser or assistive-technology QA.

### Verification boundary

At authoring time, the exact-SHA runtime CI result and manual screenshot review are pending. The live domain was not accessible to the browser retrieval environment in this session. No claim is made that rendered visual QA, screen-reader testing, 200% zoom review, real-device testing, or production verification has passed.

See `docs/RUNTIME-QA-BASELINE.md` for the actual test scope, limitations, and open manual sign-off matrix.


## 2026-11-27 — First production-browser QA findings and correction

**Branch:** `qa/runtime-visual-accessibility-gates`  
**First browser-test SHA:** `fed623273efcf7536abf7c06aeaec66b94c6af6b`  
**GitHub Actions:** [run 45880651981](https://github.com/weexdayend/uigerhana-space/actions/runs/45880651981)

### Actual runtime findings

- The first production-build Playwright run executed in Chromium and produced 15 passing, 9 failing, and 1 flaky result.
- axe-core flagged text contrast in the story sequence, light-surface section labels and decorative indices, footer metadata, and descriptions inside case-study diagrams.
- axe-core found a heading-order issue on `/work`: the case-study card headings started at H3 without a preceding H2.
- The responsive test locator matched both the hero and story CTAs, so its strict-mode failure was a test-selector defect rather than a confirmed layout defect.
- Initial full-page screenshots were not adequate evidence for the pinned desktop story: a browser full-page capture does not naturally represent the story's different ScrollTrigger scroll states. Some captures were also taken before the hero's GSAP intro completed.

### Corrective changes

- Increased text contrast for every reported source class rather than excluding axe rules.
- Removed opacity modulation from story reveal text, preserving positional movement without lowering text contrast during the pinned transition.
- Added an H2 label for the selected case-study group on the standalone `/work` page.
- Made the hero CTA selector unique and wait for the intro state before capturing.
- Split screenshot evidence into regular viewport frames, full-page reduced-motion pages, four desktop pinned-story states, and four mobile horizontal-story states.

### Verification boundary

The repair run is pending. The initial runtime run is a failed run and must remain recorded as such. No visual sign-off, screen-reader sign-off, 200% zoom sign-off, real-device approval, or production-domain verification is claimed. See `docs/RUNTIME-QA-BASELINE.md` for the remaining manual checklist.


## 2026-11-27 — Exact-SHA runtime QA and visual review

**Branch:** `qa/runtime-visual-accessibility-gates`  
**Validated commit:** `d7c130d87c44162c4aef82d227cfb3edbdfa7f48`  
**GitHub Actions:** [run 45882720414](https://github.com/weexdayend/uigerhana-space/actions/runs/45882720414)

### Automated result

- Application quality job passed typecheck, content publication gates, lint, and production build.
- Browser job passed e2e TypeScript checking, Chromium installation, production build, and the runtime suite.
- Playwright: **28 passed (28.7s), 0 failed, 0 flaky**.
- axe-core: no violations across the declared eight route/viewport scans (four routes × desktop/mobile) for WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and best-practice tags.
- Homepage layout checks cover six viewport sizes; route smoke checks cover `/`, `/work`, `/work/uigerhana-space`, and `/cv`.

### Human screenshot review and fixes discovered

- Reviewed the six homepage viewport screenshots, four desktop pinned-story stage captures, and mobile story panel captures.
- Found and fixed a mobile story metadata/art collision and a mobile architecture diagram with overlapping nodes. Added test assertions so both defects fail the suite if reintroduced.
- Found and fixed a cramped two-column hero at 768px tablet portrait by switching to a stacked copy/art layout for 768–820px; added a geometry assertion that checks the two regions do not overlap.
- Reopened the final tablet-portrait and mobile story-stage screenshots after the fixes; no copy/art or diagram-node collisions remained in those reviewed states.

### Remaining validation boundary

This exact-SHA pass establishes the declared Chromium automated scope, not full design or accessibility approval. Manual full-keyboard testing, VoiceOver/NVDA, physical touch devices, real Safari/WebKit/Firefox, 200% zoom, CV print output, production-domain verification, and owner acceptance remain open. The live domain was not accessible from this inspection environment, so no production deployment claim is made.

See `docs/RUNTIME-QA-BASELINE.md` for the full viewport matrix, automated scope, first-run failures, final result, artifact details, and manual sign-off checklist.


## 2026-11-27 — Phase 1 keyboard, reflow, and CV print QA

**Branch:** `qa/phase1-manual-accessibility-automation`  
**Validated commit:** `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a`  
**GitHub Actions:** [push run 45886068015](https://github.com/weexdayend/uigerhana-space/actions/runs/45886068015) · [PR run 45886076242](https://github.com/weexdayend/uigerhana-space/actions/runs/45886076242)

### Automated result

- Both application quality jobs passed typecheck, publication gates, lint, and production build.
- Both browser jobs passed e2e typecheck, Chromium install, production build, and runtime suite.
- Playwright: **31 passed (27.7s push / 25.0s PR), 0 failed, 0 flaky**.
- Axe-core reported no violations across 12 route/viewport scans.
- Keyboard traversal followed the actual Chromium Tab sequence on all four routes, verified required controls and visible focus, rejected positive tabindex, and confirmed the sequence ended without a keyboard trap.
- Mobile navigation verified keyboard open, Tab to Work, Escape close, accessible-name and `aria-expanded` changes, and focus return.
- Reduced-motion checks passed at desktop and mobile sizes.
- Effective 200%-width reflow/axe checks passed on all four routes at 720 × 450 CSS pixels.

### CV print result and correction

- The first generated CV PDF had three pages, with the final page nearly empty.
- Added `no-print` to the nonessential CV footer.
- Added a PDF page-count assertion requiring exactly two A4 pages.
- The final PDF was extracted from the exact-SHA CI artifact, verified at two A4 pages, rendered into page images, and visually reviewed. The blank trailing page no longer appears.

### Verification boundary

The effective-width test is not a literal browser zoom-control or OS text-scaling test. CI does not replace VoiceOver/NVDA/TalkBack, physical touch-device review, Safari/WebKit/Firefox, native print-dialog behavior, production-domain parity, or owner acceptance. The live domain remained inaccessible through the available inspection path; no production deployment claim is made.

See `docs/RUNTIME-QA-BASELINE.md` for the exact test scope and remaining manual sign-off matrix.

## 2026-11-27 — Owner confirmation: real-device and assistive-technology checks

**Scope:** Phase 1 manual QA status correction and Phase 2 handoff  
**Status:** owner-reported real-device and assistive-technology checks complete; Phase 1 overall sign-off remains open

### Owner-confirmed

- The owner confirmed that real-device checks are complete.
- The owner confirmed that assistive-technology checks are complete.
- These are recorded as category-level owner attestations dated 2026-11-27.

### Evidence boundary

- No device models, OS/browser versions, assistive-technology products/versions, tested routes or workflows, or detailed findings were provided in this handoff.
- No specific browser matrix, WCAG conformance claim, or complete accessibility sign-off is inferred from the confirmation.
- Literal browser 200% zoom/OS text scaling, native print-dialog behavior, desktop pinned-story interaction, production-domain/commit parity, public contact-channel selection, and owner acceptance of prioritized findings remain open.
- The live production domain and deployed commit were not verified in this documentation update.

### Roadmap handoff

- Updated the Phase 1 status in the roadmap, runtime QA baseline, current-experience audit, and creative-concept brief.
- Allowed four static concept styleframes to proceed as non-binding exploration in parallel.
- Preserved the prohibition on concept selection, permanent token approval, public-copy changes, and application UI implementation before the remaining Phase 1 gates and explicit owner approval.

No application code, website UI, public copy, contact details, project evidence, publication state, or deployment configuration changed.


## 2026-11-27 — Phase 7.1 System Atlas Selected Work & Work Index

**Branch:** `phase-7/selected-work-atlas`  
**Feature implementation SHA validated:** `2cf2b1a070c95e5a322591e45f261a7315f6ba85`  
**GitHub Actions:** [run 45962951609](https://github.com/weexdayend/uigerhana-space/actions/runs/45962951609)

### Delivered

- Rebuilt the homepage Selected Work section around the accepted System Atlas connected styleframe.
- Reworked `/work` with the same visual hierarchy, responsive rhythm, navigation surface, and editorial typography.
- Consolidated the featured case-study presentation into one reusable component with context, role, explicit status, and a direct case-study destination.
- Kept public case-study rendering on `PUBLIC_CASE_STUDIES` only; the single public project remains explicitly **In progress**.
- Kept generalized `WORK_DOMAINS` separate from individually-approved case studies, with a visible disclosure explaining that distinction.
- Scoped the new work-index presentation styles and used the System Atlas semantic surface roles, 1rem page gutter, and rem-based inset values.
- Updated the identity roadmap and connected-styleframe review docs to reflect owner acceptance of the visual foundation and the Phase 6 merge.

### Validation

- Typecheck, content publication gates, static System Atlas copy/SVG integrity, lint, and production build: passed.
- Runtime visual and accessibility QA: passed in Chromium, Firefox, and WebKit.
- Playwright: **214 passed, 2 skipped, 0 failed**.
- Axe-core WCAG A/AA and configured best-practice scans: no violations across the homepage, work index, approved case-study detail, and résumé at desktop/mobile; the effective 200% reflow route matrix also passed.
- Added regression tests for one approved public case study, explicit In-progress status, generalized-domain disclosure, and 200% root-text reflow on 390/360/320px for homepage and work index.
- The first QA run exposed one contrast issue: the “More to come” footer eyebrow used a light-surface secondary color on a dark surface. It was corrected to the Fog dark-surface text role and the full three-engine suite passed afterward.

### Boundaries

- No public profile copy, case-study evidence, project publication status, client attribution, résumé content, or contact channel was changed.
- No draft case study was exposed.
- The `/work/[slug]` detail route remains a separate follow-on slice.
- No production deployment was performed.
- The successful run above validates the feature implementation SHA shown above; a subsequent documentation-only log update is being included in this review branch and will receive its own exact-head CI run.

## 2026-11-27 — Phase 7.2 System Atlas Case Study Detail

**Branch:** `phase-7/case-study-detail-atlas`  
**Code SHA validated:** `a111e696bd73f32cd211d8f760a39114609d0c94`  
**GitHub Actions:** [run 46002185883](https://github.com/weexdayend/uigerhana-space/actions/runs/46002185883)

### Delivered

- Rebuilt `/work/[slug]` as a System Atlas editorial case-study experience with an explicit project-status marker, summary, Context / Role metadata, and a clear return path to the work index.
- Reworked contribution breakdown, architecture, workflow, evidence, visual-study gallery, project narrative, and technology map into a cohesive detail-page system.
- Kept public rendering gated through `PUBLIC_CASE_STUDIES`; the only approved public project remains **In progress**.
- Preserved existing case-study copy and project evidence. No draft study, client attribution, outcome metric, or new project claim was promoted.
- Marked the architecture view as a source-structure illustration, not deployment or infrastructure topology; retained clear disclosure that visual gallery items are generated studies, not screenshots of a separate shipped product.
- Added responsive detail-route and 200% root-font-size regression checks. Corrected accessibility findings for contrast on decorative numerals and the footer's keyboard-accessible home link; accepted valid cached `304 Not Modified` responses in the route test.

### Validation

- Typecheck, browser-test typecheck, content publication gates, System Atlas static integrity, lint, and production builds: passed.
- Runtime visual and accessibility QA across Chromium, Firefox, and WebKit: passed.
- Playwright: **220 passed, 2 skipped, 0 failed**.
- axe-core WCAG A/AA and configured best-practice audits: passed across the configured desktop/mobile route matrix, including the case-study detail route.
- Responsive route checks and effective-width / root-font 200% reflow checks: passed.
- The first runtime run exposed low contrast on the large decorative numerals; those were changed to the Deep Mineral text role. The rerun also exposed a footer label mismatch and a cached 304 assertion in the new route test; both were corrected before the final green run.

### Boundaries

- PR #18 remains open and stacked on PR #17; neither PR was merged by this slice.
- No deployment was performed.
- Validation above applies to the code SHA shown here. This log entry is a documentation-only follow-up.

## 2026-11-27 — Phase 7.3 System Atlas Expertise & Capabilities

**Branch:** `phase-7/expertise-capabilities-atlas`  
**Base:** `phase-7/case-study-detail-atlas`

### Source and content audit

- Retained the five existing `SKILL_GROUPS` as the sole capability content source: Product & experience, Frontend engineering, Backend & data architecture, AI & data engineering, and Infrastructure & security.
- Classified Product & experience as professional expertise and the remaining four groups as technical capabilities; the taxonomy describes the content's role in this section and does not imply equal proficiency.
- Kept the four generalized `WORK_DOMAINS` records separate from capability groups and individually approved public case studies.
- Added an explicit disclosure that representative technologies are not proof of separate published projects, certifications, or quantified proficiency.
- No new seniority, years-of-experience, project outcome, client attribution, contribution, or proficiency claim was introduced.

### Delivered

- Rebuilt the homepage expertise section with System Atlas editorial hierarchy, numbered route markers, restrained contour treatment, semantic capability classification, and a compact skills index.
- Added responsive two-column and single-column layouts, root-relative spacing, semantic landmarks/lists, and a reduced-motion-safe CSS contract.
- Added Playwright regression coverage for the five source groups, generalized-domain separation, 200% root-font reflow at narrow widths, keyboard-safe static content, and axe WCAG A/AA plus configured best-practice scans.
- Added a dedicated source-integrity script and CI step to protect the five-group content contract and ensure capability UI does not import work domains or project/experience narratives.

### Validation boundary

- Repository-level source review and GitHub Actions are the authoritative validation paths for this stacked slice.
- Local package installation, Next.js dependency-guide inspection, and local browser execution were not available in the editing environment; no local typecheck, lint, production build, browser screenshots, or assistive-technology run is claimed.
- CI is expected to validate typecheck, content/styleframe gates, the new expertise contract, lint, production build, and Chromium/Firefox/WebKit runtime tests on the exact PR head.
- No merge or deployment is included.

## 2026-11-28 — Phase 7.4 System Atlas Professional Experience

**Branch:** `phase-7/professional-experience-atlas`  
**Base:** `phase-7/expertise-capabilities-atlas` after the Phase 7.3 regression-locator correction.

### Source and content audit

- Kept `src/data/experience.ts` as the single public experience source.
- Preserved both role titles, organizations, locations, periods, summaries, and all 12 existing highlight statements verbatim.
- Retained the overlapping date ranges: Saptakarya `2021 — Present` and Infomedia Nusantara `2017 — Present`; the section explicitly states that the periods overlap.
- Kept role history separate from the five expertise groups, four generalized work domains, public case studies, and engineering principles.
- No sequential-career implication, new ownership attribution, seniority claim, outcome metric, or client disclosure was added.

### Delivered

- Rebuilt the homepage Professional Experience section in the connected System Atlas visual language.
- Added a two-column editorial role layout on wide screens and a single-column stack at narrower widths, with Manrope display, Plus Jakarta Sans body copy, monospace date metadata, Limestone surfaces, and Signal Copper route markers.
- Preserved complete role details and semantic article/list structure without adding inert or unnecessary controls.
- Added 200% root-text reflow, role-source, reduced-motion, keyboard-neutrality, and axe WCAG A/AA plus configured best-practice regression coverage.
- Added a dedicated experience source-integrity script and CI step.

### Validation boundary

- GitHub Actions must validate typecheck, publication/styleframe gates, expertise and experience source integrity, lint, production build, and Chromium/Firefox/WebKit runtime checks on the exact PR head.
- Local Next.js dependency-guide inspection and local browser execution were not available in this editing environment; no local test, screenshot, or assistive-technology result is claimed.
- The stacked base includes a correction to the Phase 7.3 generalized-domain test locators; the parent CI result must be rechecked independently.
- No merge or deployment is included.

## 2026-11-28 — Phase 7.5 System Atlas Engineering Approach

**Branch:** `phase-7/engineering-approach-atlas`  
**Base:** `phase-7/professional-experience-atlas` after the Phase 7.4 contrast correction.

### Source and content audit

- Kept `src/data/approach.ts` and `ENGINEERING_PRINCIPLES` as the only principle source.
- Preserved all four principle IDs, indices, titles, and descriptions in their existing order.
- Kept the approach separate from résumé-backed experience, the five skills groups, generalized work domains, and public case studies.
- No new delivery claims, project outcomes, personal contribution statements, seniority claims, metrics, or client attributions were introduced.

### Delivered

- Rebuilt the existing homepage `ProcessSection` as the System Atlas Engineering Approach section; no parallel section or new route was created.
- Added a semantic ordered principle map with one editorial introduction, four waypoints, a connected horizontal route on wide layouts, and a vertical route on narrow mobile layouts.
- Applied Atlas Ink / Deep Mineral / Limestone / Fog / Sea Glass / Signal Copper semantic roles with Manrope headings, Plus Jakarta Sans body copy, and monospace metadata.
- Added responsive two-column and single-column compositions, root-relative inset spacing, and a GSAP draw-once route reveal using ScrollTrigger without pinning or scroll-lock. The route remains fully visible without JavaScript and under reduced motion; it is visual context, not an interactive control or a prerequisite for understanding.
- Added Playwright coverage for source order/content, 200% root-text reflow at narrow widths, keyboard-neutrality, reduced motion, and axe WCAG A/AA plus configured best-practice checks.
- Added an engineering-approach source-integrity script and CI gate.

### Validation boundary

- The Phase 7.4 axe finding was traced to Signal Copper used as small text on Limestone; that index now uses Deep Mineral (calculated contrast approximately 13.95:1 against Limestone). The Phase 7.4 exact-head CI rerun must confirm this fix independently.
- GitHub Actions must validate typecheck, content/styleframe gates, expertise/experience/approach integrity, lint, production build, and Chromium/Firefox/WebKit runtime tests on this PR's exact head.
- The editing environment does not expose an installed `node_modules/next/dist/docs` tree or local browser runtime; no local Next.js guide inspection, typecheck, browser screenshot, or assistive-technology run is claimed.
- No merge or deployment is included.


## 2026-11-28 — Phase 7.6 System Atlas Writing & Publication

**Branch:** phase-7/writing-publication-atlas  
**Base:** phase-7/engineering-approach-atlas at 5cda24982011cecbcb574dbb01809ce8645e8a08

### Source and content audit

- Kept src/data/writing.ts as the only source for featured public writing and publication-profile destinations.
- Preserved exactly three existing Medium articles, including their IDs, titles, summaries, URLs, categories, publication dates, labels, and reading times.
- Preserved the existing DEV Community and Medium profile handles and destinations.
- Kept article records separate from GitHub identity links, résumé history, engineering principles, work domains, and public case-study records.
- No article, byline, publication date, topic claim, external destination, audience metric, or publication frequency was invented or added.

### Delivered

- Rebuilt the existing homepage Writing section as a System Atlas editorial archive without introducing a new route or duplicating publication data.
- Implemented the connected styleframe hierarchy: 06 / Writing & notes, the existing editorial heading and introduction, three source-driven article cards, and the two publication-profile links.
- Applied the Limestone / inset-light surfaces, Deep Mineral / Atlas Ink text roles, Manrope display typography, Plus Jakarta Sans body copy, and monospace publication metadata.
- Added a responsive three-column desktop, two-column tablet, and single-column mobile composition with root-relative card insets and 200% root-text reflow coverage.
- Kept all external article and profile links explicit, keyboard reachable, and safe for new-tab navigation.
- Added a dedicated writing source-integrity gate and CI step, plus Playwright checks for source order, publication metadata, link destinations, responsive layout, 200% text reflow, reduced motion, keyboard access, and axe WCAG A/AA plus configured best-practice checks.

### Validation boundary

- The writing source and component structure were reviewed against the accepted connected styleframes and provenance notes.
- GitHub Actions must validate the exact PR head through typecheck, publication/styleframe and feature-integrity gates, lint, production build, and Chromium/Firefox/WebKit runtime tests.
- Local Next.js dependency-guide inspection and local browser execution are not available in this editing environment; no local typecheck, lint, build, screenshot, or assistive-technology result is claimed.
- Browser visual, layout, and axe results remain pending until the exact proposed commit finishes CI.
- The public contact-channel decision and résumé route remain separate follow-on slices.
- No merge or deployment is included.


## 2026-11-28 — Phase 7.7 System Atlas Contact & Footer

**Branch:** phase-7/contact-footer-atlas  
**Base:** phase-7/writing-publication-atlas at 73f4f0f7ac88f254c480fcae6bb8ba61bbd5b5f9

### Source and content audit

- Kept src/data/profile.ts, src/data/site.ts, and src/data/writing.ts as the only identity, site-metadata, and public-profile sources.
- Preserved the existing conversation heading and invitation copy from ContactAndFooter.
- Preserved the existing résumé destination (/cv), work destination (#work), top destination (#top), public-profile handles, and profile URLs.
- Preserved the existing display name, Product Engineer positioning, and Bandung location from approved source records.
- Kept direct contact intentionally absent. No email address, phone number, form submission endpoint, messaging account, or unverified availability claim was added.

### Delivered

- Rebuilt the closing conversation section and footer in the connected System Atlas visual language.
- Implemented the approved two-column desktop conversation composition and stacked tablet/mobile reading order.
- Replaced the legacy dither strip and pixel treatment with semantic Deep Mineral / Atlas Ink surfaces, Limestone headings, Fog body copy, Sea Glass interaction roles, Manrope display type, Plus Jakarta Sans interface copy, and monospace metadata.
- Kept two clear actions: Review my résumé and Explore work.
- Rendered all three existing public profiles (GitHub, DEV Community, Medium), plus the existing résumé route and a home/top link.
- Added an explicit note that no direct public contact channel is listed.
- Added root-text 200% reflow, responsive layout, keyboard, reduced-motion, and axe WCAG A/AA plus configured best-practice runtime coverage.
- Added a dedicated source-integrity script and quality CI step.

### Validation boundary

- The component and design references were reviewed against the connected System Atlas homepage frames and content-provenance notes.
- GitHub Actions must validate the exact PR head through typecheck, publication/styleframe and feature-integrity gates, lint, production build, and Chromium/Firefox/WebKit runtime tests.
- The editing environment does not expose the installed Next.js dependency documentation or a local browser runtime; no local typecheck, lint, build, screenshots, or assistive-technology result is claimed.
- Browser visual, reflow, keyboard, and axe results remain pending until exact-head CI completes.
- The public contact-channel decision remains an owner gate; résumé route alignment and print verification remain a separate follow-on slice.
- No merge or deployment is included.


## 2026-11-28 — Phase 7.6 Exact-Head Responsive Hardening

**Parent:** PR #22 · \`phase-7/writing-publication-atlas\`  
**Validated head:** \`fd9686f671dfa5aca696f341517ac848247f604a\`  
**GitHub Actions PR-check:** [run 46047733496](https://github.com/weexdayend/uigerhana-space/actions/runs/46047733496)

- Constrained and stretched the Writing publication directory at narrow widths so DEV / Medium profile links wrap within the available mobile column.
- Allowed the expertise classification label to wrap at 200% root text without widening its card.
- Allowed article date and reading-time metadata to wrap independently when the text scale increases.
- Kept all source article, profile, and expertise content unchanged.

### Validation

- Quality job: typecheck, publication/content/styleframe/feature integrity, lint, and production build all passed on the exact head.
- Chromium, Firefox, and WebKit Playwright runtime: **271 passed, 2 skipped, 0 failed**.
- Configured axe WCAG A/AA and best-practice checks passed in the browser matrix.
- Browser evidence upload completed.
- PR #22 remains open and unmerged; no deployment was performed.


## 2026-11-28 — Phase 7.8 System Atlas Résumé & A4 Print Alignment

**Branch:** phase-7/resume-print-atlas  
**Parent:** PR #23 · phase-7/contact-footer-atlas  
**Base head:** 7139b51e60c29a4a608aef57e3d810959e30531e

### Source and content audit

- Retained PROFILE.summary, PROFILE.context, PROFILE.positioning, SITE_META.location, and SITE_META.timezone as the identity/document sources.
- Retained both existing EXPERIENCE roles and their overlapping periods, with all 12 source highlights.
- Retained the five SKILL_GROUPS, the existing Binar Academy certification, and both PUBLICATION_PROFILES URLs.
- Kept the existing page metadata and canonical /cv route.
- Did not introduce education history, language proficiency, phone/email details, metrics, new titles, or new career claims.

### Delivered

- Rebuilt the résumé screen composition using the connected System Atlas résumé artboard: dark utility bar, Limestone document surface, editorial Manrope heading, Plus Jakarta Sans reading text, and monospace metadata.
- Aligned role/date hierarchy, experience highlights, skill rows, certification, publication profile links, and document footer.
- Added responsive wrapping for toolbar, role periods, skill labels, and publication handles.
- Replaced legacy utility-only print styling with an explicit A4 portrait contract and 16mm / 14mm margins.
- Hide only browser navigation/print controls in print; preserve the résumé sections, role/date context, publication links, and document footer.
- Added verify:resume source/print integrity gate and connected it to CI.
- Retained the Chromium two-page A4 PDF regression and extended cross-engine route/reflow/print-media coverage.

### Validation boundary

- Exact-head typecheck, integrity, lint, production build, Chromium/Firefox/WebKit runtime, axe, and A4 PDF results are pending until GitHub Actions completes on the PR head.
- The editing environment does not expose the installed Next.js documentation under node_modules/next/dist/docs/ or a local browser runtime. No local typecheck, lint, build, screenshot, PDF, or native print-dialog result is claimed.
- Headless Chromium PDF generation is a regression check only. Native system print dialog / Save as PDF and installed Safari review remain separate manual owner gates.
- No merge or deployment is included.