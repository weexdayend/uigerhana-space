# Gerhana — Current Experience & Content Audit

**Audit version:** 1.0  
**Date:** 2026-11-27  
**Audited baseline:** `main` at `b487d0529220eff1e5022fe9a625155e52857f23`  
**Scope:** routes, homepage narrative, navigation, content/evidence, interaction patterns, responsive rules, accessibility and technical delivery signals  
**Method:** repository source inspection; no application code changed

---

## 1. Executive summary

The current website already has a credible professional foundation: Irvan is identified as a Product Engineer, the content connects product thinking with interface design and software engineering, project publication is explicitly gated, and the site contains dedicated work, experience, writing, and résumé destinations.

The next identity phase should not start by replacing the current visual style. The higher-value work is to make the visitor journey more coherent and make the evidence layer stronger.

### Highest-priority findings

1. **The public work layer is thin.** The public selector currently exposes one case study, which is the personal website itself. Four generalized work domains add breadth, but they do not replace project-specific evidence. Three deeper project records remain drafts, correctly gated.
2. **The site explains the same four-part working model twice.** The horizontal narrative presents product thinking, interface design, software engineering, and production thinking. The later Engineering Philosophy section repeats related principles. The two sections can be complementary, but their separate jobs are not yet obvious.
3. **The Contact section has no direct contact action.** Its copy invites a conversation, but its two actions route to the résumé and work index. The footer links to public profiles, not a direct contact channel. A public contact destination still needs owner approval.
4. **The “About” navigation target is not a separate About section.** The `#about` ID is attached to the hero copy container. The label therefore points back to the introduction rather than to a distinct background or approach section.
5. **The current hero cannot be signed off from source alone.** Main contains the global `hero-organic` CSS and the custom Organic-to-Modular canvas after the corrective PR, but browser-rendered desktop/mobile visual QA has not been recorded after that fix.

### Overall assessment

The content and evidence safeguards are stronger than the current visitor journey. The next iteration should prioritize **proof, orientation, and purposeful section relationships** before visual reinvention.

This is a source-based audit. It is not a claim that every visual or interaction has been observed in a live browser.

---

## 2. Scope and confidence

### Inspected

- Homepage composition and section order.
- Desktop/mobile navigation markup and anchor destinations.
- Hero and horizontal narrative implementation.
- Work index, case-study selector, and public case-study route.
- Experience, expertise, engineering principles, writing, contact, and résumé content.
- Profile data, work-domain data, skill data, and publication links.
- Global styling and responsive/reduced-motion rules.
- SEO metadata, sitemap, publication gate, package scripts, and CI workflow.
- Brand Identity Specification and Roadmap.

### Original source-audit limitations and follow-up runtime validation

At the time of the original source audit, the public site at `https://uigerhana.space` was not accessible from the audit environment and no owner browser was available. Those original responsive/accessibility notes were source observations only; they were not runtime QA.

Follow-up production-build browser QA has now run against exact commit `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a` in both push and pull-request CI ([push run 45886068015](https://github.com/weexdayend/uigerhana-space/actions/runs/45886068015), [PR run 45886076242](https://github.com/weexdayend/uigerhana-space/actions/runs/45886076242)): **31 Playwright tests passed, 0 failed, 0 flaky** in both runs. The suite covers six homepage viewports, four routes at desktop/mobile, actual Chromium keyboard traversal, mobile menu keyboard behavior, reduced-motion desktop/mobile, axe scans across 12 route/viewport combinations, and a 720 × 450 CSS effective reflow simulation for desktop 200%-zoom width.

The final CV print preview was generated from the production build, verified as exactly two A4 pages, and visually reviewed. The nearly empty third page seen in an earlier run was fixed by hiding a non-print footer; the two-page assertion now prevents recurrence.

The earlier screenshot review also identified and led to fixes for mobile story metadata/art collision, overlapping architecture nodes, and the tablet-portrait hero. The final viewport/story captures were re-opened after those changes.

Still not verified by CI or this screenshot/PDF review:

- Live deployment version and whether production serves the validated commit (the domain was not accessible through this inspection path).
- Physical-device touch behavior and real Safari/WebKit or Firefox behavior.
- Manual testing with a real keyboard in the owner's browser and screen-reader announcement quality.
- Literal browser 200% zoom, OS-level text scaling, and native print/Save as PDF dialog behavior.
- Representative-device performance/network behavior and owner acceptance.

See `docs/RUNTIME-QA-BASELINE.md` for exact scope and remaining manual sign-off.
- Full visual polish against an approved design reference (no visual reference or pixel-diff baseline exists).

See `docs/RUNTIME-QA-BASELINE.md` for the exact runtime scope, results, and open manual sign-off matrix.

---

## 3. Current site map

### 3.1 Routes

| Route | Source | Current purpose | Audit note |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Personal homepage and narrative | Primary identity experience. |
| `/work` | `src/app/work/page.tsx` | Work index and generalized work domains | Lists approved studies plus domain summaries. |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | Individual case study | Static params and lookup use approved-only records. |
| `/cv` | `src/app/cv/page.tsx` | Online, print-oriented résumé | Uses browser Print / Save PDF. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Search discovery | Includes homepage, work, CV, and approved case studies. |
| `/robots.txt` | `src/app/robots.ts` | Crawl rules | Allows public crawling. |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | Social preview image | Generated text-led Obsidian graphic. |

No dedicated About, Experience, or Writing route currently exists. These topics are represented as homepage sections.

### 3.2 Homepage section order

The current `src/app/page.tsx` composition is:

1. `SiteHeader`
2. `IntroductionSection` — `#top`; the copy wrapper also has `#about`
3. `MotionNarrativeSection` — `#story`
4. `WorkSection` — `#work`
5. `ExpertiseSection` — `#expertise`
6. `ExperienceSection` — `#experience`
7. `ProcessSection` — `#approach`
8. `WritingSection` — `#writing`
9. `ContactAndFooter` — `#contact`

The current story is understandable at a structural level: introduction → how the work connects → work → capabilities → experience → principles → writing → contact.

The primary opportunity is not adding more sections. It is clarifying the distinct job of each section and ensuring that the sequence moves from proposition to evidence to deeper context without repeating itself.

---

## 4. Navigation and orientation audit

### Current navigation

Desktop and mobile navigation expose:

| Label | Destination | Finding |
|---|---|---|
| Work | `#work` | Correct and useful. |
| About | `#about` | The target is the hero copy container, not a dedicated About section. |
| Notes | `#writing` | Correct, though the content is presented as Writing / Notes in public copy. |
| Résumé | `/cv` | Clear secondary route. |

The header changes surface/text colors by inspecting the `data-band` section under a fixed 49px probe. Mobile navigation uses a button with `aria-expanded` and `aria-controls`, then closes after a navigation link is selected.

### Findings

- The About label promises more than its current anchor target delivers.
- Expertise, Experience, Approach, and Contact are not directly represented in the primary navigation. This may be intentional minimalism, but their discoverability should be tested rather than assumed.
- No explicit “Let's connect” action is present in the header.
- The homepage has compact navigation, but standalone `/work`, case-study, and `/cv` pages use their own local back/utility headers rather than a shared full site navigation. This may be suitable for document-like routes, but continuity should be considered during visual-system exploration.

### Recommendation

Keep navigation small, but make every label accurately describe its destination. Decide whether About becomes a real section, whether its label should change, and whether Contact deserves a direct route or a clear anchor/CTA.

---

## 5. Hero and first-impression audit

### Source-observed content

The hero currently uses:

- Brand line: **From pixel to production.**
- Name and role: **Irvan Gerhana — Product Engineer**.
- Introduction from `PROFILE.introduction`.
- Primary action: **Explore selected work**.
- Secondary action: **View résumé**.

The current `PROFILE.headline` is “I build digital products from product logic to production.” The rendered hero currently uses the brand line as its large H1 and the name/role as the byline.

### Source-observed visual behavior

- The section is marked as a dark band.
- The global `hero-organic` styling defines a dark surface and a two-column desktop composition.
- The hero uses `OrganicModularCanvas`, a custom canvas renderer with Bayer 4×4 thresholding and an organic-to-modular morph control.
- GSAP reveals the headline, byline, copy, actions, and artwork while animating the morph value.
- At widths up to 767px, the layout changes to a stacked composition.
- The hero canvas is decorative (`aria-hidden`) and should not be the only carrier of professional information.

### Findings

- The hero has a clear identity and a work/résumé path, but the exact relationship between the brand line and the value proposition still needs testing. The current H1 is memorable, but it does not independently explain the differentiator.
- The actual visual hierarchy after the corrective CSS change is not browser-verified.
- The current artwork expresses a specific visual treatment. Under the new identity specification, it is an optional visual experiment—not a permanent brand requirement.
- The copy should not be expanded with another paragraph or extra labels merely to explain every capability. The next step is to test a small set of message hierarchies against the same real content.

### Recommendation

Treat the hero as an orientation device, not a visual trailer. It must identify the person, explain the product-engineering value, and offer an obvious path to evidence without requiring animation to complete.

---

## 6. Narrative and section-purpose audit

### 6.1 Horizontal narrative — “From product thinking to production”

The current `MotionNarrativeSection` has four story beats:

1. Product thinking — understand the work before shaping software.
2. Interface design — make complexity feel clear.
3. Software engineering — build the system behind the experience.
4. Production thinking — think beyond the moment it ships.

Each beat includes an abstract CSS-built visual: workflow nodes, a conceptual interface, an architecture map, or a production/reliability graphic. The interface visual is explicitly labelled as conceptual, not a product screenshot.

### Responsive behavior in source

- At desktop widths (minimum 1024px) and when reduced motion is not requested, GSAP ScrollTrigger pins the section and moves the four panels horizontally in response to vertical scroll.
- At narrower widths, the section becomes a horizontal overflow region with scroll snapping and a “Swipe to explore the story” hint.
- When `prefers-reduced-motion: reduce` is active, the track becomes a normal vertical grid and the progress/hint controls are hidden.

### Findings

- The story is a useful explanation of the cross-disciplinary identity.
- The desktop scroll-pinned sequence is a high-attention interaction. It needs browser testing for pacing, page length, orientation, and whether visitors realize the page is still progressing vertically.
- The smaller-screen version relies on horizontal swipe. The hint helps, but there is no visible progress indicator in that mode; keyboard discoverability and scroll-container focus should be reviewed.
- The four beats describe the process/discipline model, but the later Engineering Philosophy section also explains how the work is approached. This creates a risk of repeating the same message in two formats.

### Recommendation

Keep one section responsible for explaining **how the disciplines connect**. Give the later principles section a different job—specific decision principles, trade-offs, or evidence from real projects—or consolidate it if it adds no new understanding.

### 6.2 Selected work

The homepage and `/work` index show `PUBLIC_CASE_STUDIES` and four generalized work domains.

Current publication state in `src/data/case-studies.ts`:

| Record | Publication state | Project state | Public behavior |
|---|---|---|---|
| UI Gerhana personal platform | Approved | In progress | Public case study |
| IT-services PSA platform | Draft | In progress | Excluded from public selector/routes |
| Passwordless team invitations | Draft | In progress | Excluded from public selector/routes |
| Backup and recovery operations | Draft | In progress | Excluded from public selector/routes |

The public selector filters explicitly for `publicationStatus === "approved"`. The route lookup resolves only from that selector. The content publication gate also checks that review-only evidence registers are not imported by public UI and that the three deeper studies remain drafts.

Only one case study is currently public: **Building a personal professional platform**. It is a story about this website itself, not an independent client/product case.

The four public work domains are:

- Enterprise AI & intelligent workflows.
- Transaction & operational intelligence.
- Digital platforms & business systems.
- Network systems & information security.

### Findings

- Evidence governance is strong and should be preserved.
- The public work surface currently has more breadth than project-specific depth. Work domains communicate range, but visitors cannot yet inspect multiple approved project stories.
- The only public case study is self-referential and in progress. It cannot carry the burden of proving the full breadth of the professional identity.
- The self-platform case study still describes the earlier Obsidian/Stone/Amber, Geist, Pixelify, and Bayer-dither direction as something to retain. That statement should be reviewed when the eventual identity direction is selected; it should not silently dictate the new brand.
- The deeper project records should remain draft until status, role, contribution, evidence, and disclosure are explicitly reviewed.

### Recommendation

Do not weaken the publication gate to create the appearance of a larger portfolio. Instead, identify the strongest evidence-backed candidate stories and complete their review. In concept exploration, use truthful generalized work examples where public proof is not yet available.

---

## 7. Capabilities, experience, and principles

### 7.1 Expertise

The current section groups skills into five categories:

- Product & experience.
- Frontend engineering.
- Backend & data architecture.
- AI & data engineering.
- Infrastructure & security.

This provides a readable taxonomy and is preferable to a flat wall of technology names. Skills are source-backed by the résumé categories maintained in `src/data/skills.ts`.

**Opportunity:** capabilities should explain what kind of product problem each discipline helps solve. Technology names should remain supporting detail.

### 7.2 Experience

The current timeline contains two résumé-backed roles:

- Co-Founder & Lead Software Engineer — Saptakarya, 2021–Present.
- Information Systems & Cybersecurity Engineer — Infomedia Nusantara (Telkom Group), 2017–Present.

The overlapping periods are intentional and are explained in the section introduction. The component displays role summary and selected responsibilities, without inventing month-level dates.

**Opportunity:** connect a role to the relevant evidence-backed work where publication is permitted, rather than making experience a separate block of résumé bullets only.

### 7.3 Engineering philosophy

The four principles in `src/data/approach.ts` are:

1. Start with the workflow.
2. Make complexity legible.
3. Build AI with context.
4. Think beyond the interface.

These are useful and aligned with the identity specification. The issue is placement and overlap, not the principles themselves.

**Recommendation:** test whether these are strongest as a concise method section, annotations within case studies, or the concluding perspective after work evidence. Avoid repeating the same four-stage narrative twice.

---

## 8. Writing, contact, and résumé

### 8.1 Writing

The homepage features three Medium articles:

- “What Leaves When an Engineer Leaves” — 1 July 2026.
- “Why Payment Gateways Don’t Solve Enterprise Reconciliation” — 26 June 2026.
- “The Hidden Layer Every AI Agent Needs: Canonical Data Architecture” — 24 June 2026.

It also links to DEV Community and Medium profiles. The footer links to GitHub, DEV, and Medium.

**Opportunity:** writing is credible supporting material for the thinking behind the work. It should feel like part of the same narrative, not a separate article-card catalogue.

The current source audit confirms configured URLs; it does not verify that every external destination remains live or that the articles are still accessible.

### 8.2 Contact

The Contact section says it welcomes thoughtful conversations about product development, enterprise workflows, software architecture, and technical collaboration.

However, its two explicit actions are:
- Review my résumé → `/cv`.
- Explore work → `#work`.

The footer provides public profile links, but there is no direct email link, contact form, scheduling path, or dedicated contact route in the inspected component.

**Finding: high priority.** The section promises a conversation but does not provide a direct conversation action. Do not invent or expose personal contact details. Resolve the owner's preferred public contact channel before design implementation.

### 8.3 Résumé

The `/cv` page is a structured document-style route with:
- Professional summary.
- Professional experience.
- Technical skills.
- Certification.
- Technical leadership and publications.
- Browser Print / Save PDF control.

The supplied source does not establish education or language details, and the current CV appropriately omits those sections. Public contact details are not included.

**Opportunity:** keep the résumé document-like and highly readable even if the broader site adopts a more expressive visual direction. Brand consistency does not require turning the CV into a campaign page.

---

## 9. Design-system and technical observations

### 9.1 Current visual implementation

The codebase currently contains:
- Obsidian / Stone / Amber color values.
- Geist, Geist Mono, and Pixelify Sans font variables.
- Bayer-dithered canvas rendering and pixel graphics.
- A custom Organic-to-Modular hero.
- CSS-built conceptual diagrams in the story section.
- Light/dark section bands and editorial grid layouts.

These are facts about the current implementation. They are not permanent identity requirements under `docs/BRAND-IDENTITY-SPEC.md`.

There are also legacy `.hero-shell` and `.hero-art-frame` style selectors in the root stylesheet. Their current usage should be checked before visual cleanup; this audit does not assume they are unused.

### 9.2 Interaction and accessibility signals

Positive source signals:
- Semantic sections, headings, links, and buttons are present.
- Mobile navigation exposes `aria-expanded` and `aria-controls`.
- The motion narrative has a reduced-motion vertical layout.
- The hero canvas is decorative and hidden from assistive technology.
- Interactive text links expose focus-visible styles in several sections.
- CV print-only behavior is separated from on-screen controls.

Items to verify:
- Keyboard access to the horizontal story panels on smaller screens.
- Focus visibility across all header, footer, and route navigation links.
- 200% zoom and long-text wrapping in hero and story layouts.
- Contrast of muted supporting copy and small mono labels.
- ScrollTrigger behavior with keyboard input, browser zoom, and dynamic viewport changes.
- Touch behavior and accidental horizontal/vertical scroll conflicts.
- Whether the header anchor probe and `scroll-padding-top` remain aligned at all viewport sizes.

### 9.3 Quality and delivery

The repository defines:
- `npm run typecheck`
- `npm run verify:content`
- `npm run lint`
- `npm run build`

GitHub Actions runs all four checks on branch pushes and pull requests. The content gate protects review-only evidence and approved-only case-study publication.

No unit-test, component-test, or browser-test script is present in the inspected `package.json`. This does not prove there are no manual checks elsewhere; it means the current visible CI does not automate browser behavior or visual regression.

---

## 10. Prioritized opportunity list

Priority reflects impact on the visitor journey, not visual preference.

| Priority | Opportunity | Why it matters | Decision / dependency |
|---|---|---|---|
| P0 | Add a real contact action | The Contact section currently has no direct contact destination. | Owner must approve channel and disclosure. |
| P1 | Strengthen public evidence layer | One self-referential public case study cannot demonstrate the full breadth of work. | Review evidence, status, role, and disclosure; do not bypass gates. |
| P1 | Clarify hero message hierarchy | Brand line is strong; visitor value proposition needs to be understood immediately. | Test copy hierarchy without replacing approved profile data prematurely. |
| P1 | Fix navigation semantics | “About” points to the hero copy container rather than an About destination. | Decide whether to add an About/approach destination or change label/anchor. |
| P1 | Separate narrative from principles | Four-stage story and four engineering principles partially overlap. | Give the sections distinct jobs or consolidate. |
| P2 | Validate horizontal story interaction | Pinned desktop scroll and mobile swipe can impose navigation cost. | Browser QA across desktop, touch, keyboard, reduced motion. |
| P2 | Clarify section order | Experience currently precedes the engineering principles section. | Test the content sequence against visitor questions, not a fixed template. |
| P2 | Connect experience to evidence | Timeline responsibilities could link to approved work stories. | Depends on approved case studies. |
| P2 | Align self-platform case-study narrative | It still describes the earlier visual direction as a retained foundation. | Update only after the new visual system is selected. |
| P3 | Review visual legacy and generated studies | Old selectors and generated visual studies may not serve the eventual concept. | Identify usage and purpose before removing anything. |
| P3 | Expand automated interaction testing | CI verifies types, content gates, lint, and build but not browser behavior. | Add browser checks when the implementation scope is approved. |

---

## 11. Recommended visitor-journey model

This is a recommendation for concept exploration, not an approved page rewrite.

| Stage | Visitor needs | Existing material | Opportunity |
|---|---|---|---|
| Orientation | Who is Irvan and what does he do? | Hero, Product Engineer label, brand line | Improve value hierarchy and message clarity. |
| Understanding | How do product, design, and engineering connect? | Four-beat Motion Narrative | Keep one concise explanation of the working model. |
| Proof | What has he actually built or contributed to? | One approved case study; four work domains | Build a stronger approved evidence portfolio. |
| Method | How does he make decisions? | Engineering principles | Connect principles to real work and trade-offs. |
| Depth | What is his background and technical range? | Expertise, experience, writing, résumé | Reduce repetition and connect relevant evidence. |
| Connection | How can someone start a conversation? | Contact copy, profile links | Add an owner-approved direct contact route. |

---

## 12. Browser validation plan

**Correction (2026-11-27):** the matrix below began as a plan, not completed QA. The original audit did not run the site in a browser. A follow-up Chromium suite now covers the declared viewports, keyboard routes, reduced motion, axe scans, effective-width reflow, and print-PDF generation. It does not emulate literal browser zoom or substitute for screen-reader/device/manual checks. See `docs/RUNTIME-QA-BASELINE.md` for the exact-SHA result and remaining manual review gate.

| Test viewport / mode | What to inspect |
|---|---|
| 1440 × 900 desktop | Hero hierarchy, artwork balance, full section rhythm, pinned narrative pacing. |
| 1280 × 800 laptop | Hero title wrapping, narrative panel fit, header and anchor offsets. |
| 1024 × 768 tablet landscape | Transition between pinned and swipe behavior; content density. |
| 768 × 1024 tablet portrait | Horizontal panel discoverability and vertical content fit. |
| 390 × 844 mobile | Stacked hero, action wrapping, story swipe hint, work-card order. |
| 360 × 800 small mobile | No clipped headline, horizontal overflow, or inaccessible actions. |
| Reduced motion | Story becomes a vertical sequence; hero presents a useful static artwork state. |
| Keyboard only | Header menu, story navigation, links, focus visibility, route transitions. |
| 200% zoom | Reading order, text wrapping, and absence of content loss. |

Record screenshots, browser/device details, and defects. Do not mark a visual review complete based on CI or source inspection.

---

## 13. Phase 1 exit assessment

### Completed from repository inspection

- [x] Static source inventory of routes, page order, navigation, public copy, evidence states, section purposes, and CTA destinations.
- [x] Static source observations of responsive CSS and motion/reduced-motion branches (inventory only; not runtime validation).
- [x] Priority opportunities recorded.

### Still open before Phase 1 can be fully closed

- [x] Execute the Playwright/axe suite on an exact proposed SHA: 31 passed, 0 failed, 0 flaky on `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a` in both push and PR CI.
- [x] Review six homepage viewport captures and desktop/mobile story-stage screenshots; fix the visual collisions found and recheck the final screenshots.
- [x] Automate route-wide Chromium keyboard traversal, focus visibility, mobile-menu Escape/focus return, and reduced-motion desktop/mobile behavior.
- [x] Run axe across 12 route/viewport combinations and the 720 × 450 CSS effective 200%-reflow viewport for all four routes.
- [x] Generate and visually review the final two-page A4 CV print PDF; confirm the blank trailing page is removed.
- [ ] Manually operate desktop pinning and tablet/mobile story scrolling in the owner's browser/device.
- [ ] Complete real-device touch, screen-reader, literal browser 200% zoom/text scaling, and native print-dialog checks.
- [ ] Verify the deployed production domain and commit parity.
- [ ] Confirm direct public contact preference.
- [ ] Owner review of the prioritized findings.

**Phase 1 status:** source inventory, automated Chromium/axe runtime checks, route-wide scripted keyboard traversal, effective-width reflow, and screenshot/PDF review are complete. Manual assistive-technology, physical-device, literal browser zoom, production, and owner validation remain open. This is not full accessibility or production sign-off.

## 14. Immediate next step

Complete the remaining manual accessibility, real-device, production-domain, and owner checks. Resolve the contact-channel decision. Only after Phase 1 is genuinely closed should Phase 2 concept review proceed against the identity specification; each territory must extend beyond a single hero image.

No visual implementation is authorized by this audit.

**End of audit — v1.0**
