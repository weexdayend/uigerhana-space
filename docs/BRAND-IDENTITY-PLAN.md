# Gerhana — Brand Identity Roadmap

**Version:** 1.0  
**Status:** Approved sequence; individual creative concepts and public copy require review  
**Prepared:** 2026-11-27  
**Parent specification:** `docs/BRAND-IDENTITY-SPEC.md`

---

## 1. Objective

Turn the brand identity specification into a cohesive, evidence-led portfolio experience without rushing into a visual style or implementation.

**Strategy → Experience → Concept exploration → Verbal identity → Visual system → Styleframes → Hero validation → Site-wide integration → Production QA.**

No website redesign should be built around an unapproved illustration, animation, or current visual trend.

## 2. Current baseline

### Established
- Public identity: Irvan Gerhana.
- Professional positioning: Product Engineer.
- Identity descriptor: product-minded systems builder.
- Brand line: “From pixel to production.”
- Working sequence: understand → shape → engineer → operate.
- Desired perception: thoughtful product judgment, interface craft, technical depth, production awareness, and trustworthy evidence.
- Visitor experience: introduce the person, prove the work, explain the thinking, show professional depth, and make connection straightforward.
- Principle: identity is larger than the visual style used to express it.

### Selected for refinement
- **Visual direction:** A — The System Atlas (owner-selected 2026-11-27).
- **Typography:** Manrope for display/headings + Plus Jakarta Sans for body/interface (owner-selected).
- **Motion engine:** GSAP (owner-selected; choreography remains subject to review).
- **Layout:** 1rem base gutter and component-scoped rem-based `--py` / `--px` inset pairs (owner-selected).
- **Palette:** Basalt / Limestone / Sea Glass / Signal Copper (designer-selected under owner delegation; presented for visual acceptance).

### Not yet finalized
- Palette roles and the complete token system after owner review.
- Final responsive art direction and typography metrics with real font assets.
- Motion choreography and its reduced-motion implementation.
- Full-page composition and connected section transitions.
- Final hero headline and supporting copy beyond current approved profile content.
- Whether pixel/dither remains a supporting motif or is removed from the main visual language.

Previous hero explorations remain archived references. The selected System Atlas is a direction for refinement, not a production approval.

## 3. Phased roadmap

## Phase 0 — Strategic foundation

**Status: Complete with this specification and plan.**

Deliverables:
- Identity thesis, positioning, and differentiators.
- Audience and desired perception.
- Visitor journey and homepage narrative.
- Voice, content, visual, motion, accessibility, and evidence guardrails.
- Phased roadmap and owner approval gates.

Exit criteria:
- [x] One coherent Product Engineer identity is defined.
- [x] Visual treatment is separated from identity.
- [x] Existing content-integrity safeguards remain authoritative.

## Phase 1 — Current experience and content audit
**Status:** Static source inventory, the exact-SHA Chromium/axe runtime suite, route-wide keyboard traversal, reduced-motion desktop/mobile, effective 200%-width reflow, screenshot review, and the two-page A4 CV print-preview check are complete. The runtime suite passed 31 Playwright tests with 0 failures and 0 flaky retries on `1026f632742bbbfcd17f8ac3c5e6b8b6eaa9687a` ([push 45886068015](https://github.com/weexdayend/uigerhana-space/actions/runs/45886068015), [PR 45886076242](https://github.com/weexdayend/uigerhana-space/actions/runs/45886076242)). On 2026-11-27, the owner confirmed that real-device checks and assistive-technology checks are complete. This is recorded as a category-level owner attestation; device, OS/browser, assistive-technology versions, scenarios, and detailed results were not supplied. Phase 1 remains open for literal browser 200% zoom/OS text scaling, native print-dialog behavior, production-domain/commit parity, the public contact-channel decision, and owner acceptance of the prioritized findings. Cross-browser coverage beyond the owner's unspecified checks is not inferred. See `docs/CURRENT-EXPERIENCE-AUDIT.md` and `docs/RUNTIME-QA-BASELINE.md`.


**Goal:** understand what already exists before changing the design.

Work:
1. Inventory homepage sections, routes, CTAs, navigation, and content sources.
2. Map each element to orientation, relevance, evidence, method, depth, or connection.
3. Classify content as approved, source-backed but review-required, draft, outdated, duplicate, or remove.
4. Identify repetition, missing evidence, weak transitions, and competing messages.
5. Review desktop and mobile behavior separately.
6. Record accessibility, performance, and interaction issues without prescribing visual solutions prematurely.

Deliverables:
- Current-state page and section map.
- Content and claim audit.
- Interaction inventory.
- Desktop/mobile findings.
- Prioritized problems and opportunities.

Exit criteria:
- Every section has a purpose or a documented reason to change/remove it.
- Public copy and project evidence states are understood.
- The highest-impact experience problems are prioritized.

## Phase 2 — Creative concept exploration
**Owner-selected direction (2026-11-27):** A — The System Atlas. The owner selected Manrope + Plus Jakarta Sans, GSAP as the motion engine, and a `1rem` base gutter with rem-based `--py` / `--px` inset pairs. Palette selection was delegated and is proposed as Basalt / Limestone / Sea Glass / Signal Copper. The focused art-direction package is documented in `docs/design-system/SYSTEM-ATLAS-ART-DIRECTION.md`. The original four territories remain comparative research; selection of A does not approve a final token freeze or authorize production UI. Phase 1 remains open for its outstanding production, zoom/print, contact-channel, and owner-acceptance items.


**Goal:** find a distinct visual territory that grows from Gerhana's identity rather than copying a popular style.

Work:
1. Develop three or four genuinely different concept territories.
2. Describe each by metaphor, visual grammar, composition, typography, color, imagery, and motion potential.
3. Explain how each expresses product thinking, interface craft, engineering, and systems awareness.
4. Create comparable static hero studies using the same copy, viewport, and hierarchy.
5. Include at least one direction not based on anime, cyberpunk, a literal workspace, or pixel art.
6. Test extension to work, case studies, experience, writing, and contact.
7. Reject directions that depend on decoration, trend recognition, or motion spectacle.

Proposed evaluation rubric:

| Criterion | Weight | Evaluation question |
|---|---:|---|
| Identity fit | 25% | Does it express the Product Engineer and product-minded systems-builder identity? |
| Clarity | 20% | Can visitors understand the person and value quickly? |
| Memorability | 20% | Does it have a distinct point of view without copying a trend? |
| Evidence compatibility | 15% | Can real work remain central? |
| Extensibility | 10% | Can it support all sections and future case studies? |
| Accessibility/performance | 10% | Can it work across devices and reduced-motion settings? |

The score is a discussion aid, not an automatic design decision.

Deliverables:
- Three or four concept boards.
- Comparable desktop hero compositions.
- Preliminary mobile compositions for strongest candidates.
- Rationale and trade-off matrix.
- Recommended direction with rejected alternatives and reasons.

**Owner review gate:** concept selection met on 2026-11-27 when the owner selected A — The System Atlas. The original four concept assets remain in the archive. This selection authorizes focused art-direction refinement only; it does not approve a production redesign or token freeze.

Exit criteria:
- [x] One concept is selected for refinement by the owner.
- [x] The idea can be explained without naming a reference style: a single route makes complex work legible.
- [ ] The system is validated across the full site, not only the hero (Phase 5).

## Phase 3 — Verbal identity and message architecture

**Goal:** make words and hierarchy as considered as the visual direction.

Work:
1. Validate positioning and brand promise.
2. Draft headline alternatives without overwriting approved profile copy.
3. Define supporting copy, CTAs, navigation labels, section introductions, and case-study voice.
4. Establish rules for first-person voice, technical depth, evidence language, and project status.
5. Check comprehension for both primary and secondary audiences.
6. Obtain owner approval before changing public structured content.

Deliverables:
- Final positioning and message hierarchy.
- Approved hero copy.
- Homepage section message map.
- Voice and copy examples.
- Claim/source mapping.

Exit criteria:
- The hero has one central message and one supporting explanation.
- CTA labels communicate destinations.
- Copy matches the profile, résumé, and evidence records.
- Candidate copy is not silently treated as approved.

## Phase 4 — Visual system definition

**Goal:** turn the selected concept into a reusable identity system.

**Status:** initial System Atlas art direction is being refined for owner review. Typography, delegated palette, GSAP choreography, and rem-based spacing guidance are documented; this is not a production token freeze.

Work:
- Define color roles and contrast behavior.
- Define display, body, technical, and metadata typography.
- Define spacing, grid, content widths, and responsive layout rules.
- Define shape language, graphic motifs, illustration rules, and image treatment.
- Define iconography and interaction-state behavior.
- Define light/dark use if required.
- Define how the visual signature works in case studies and résumé pages.
- Separate core identity assets from optional treatments.

Deliverables:
- Visual system sheet.
- Color and typography tokens.
- Layout and spacing rules.
- Graphic and imagery guidelines.
- Interaction-state examples.
- Responsive rules.

Exit criteria:
- The system works beyond one hero.
- Visual emphasis, reading comfort, and evidence hierarchy are balanced.
- The identity remains recognizable without hero artwork.

## Phase 5 — Full-page styleframes and experience validation

**Goal:** prove the concept across a connected visitor journey before implementation.

Work:
1. Produce high-fidelity hero styleframes at desktop and mobile sizes.
2. Design the transition from hero to the next section.
3. Create styleframes for selected work, case-study detail, capabilities/approach, experience, writing, and contact.
4. Test light/dark content contexts if both are proposed.
5. Use realistic content density rather than placeholder cards.
6. Test first-visit questions: who is this, what does he do, what evidence exists, and what next?
7. Revise hierarchy, density, and rhythm based on these checks.

Deliverables:
- Connected homepage styleframe set.
- Responsive styleframes.
- Case-study and content-page examples.
- Motion storyboard and reduced-motion alternative.
- Design QA notes.

**Owner review gate:** approve the connected visual system. Approval of one hero image alone does not authorize a full-site redesign.

Exit criteria:
- The page tells one coherent story from introduction to contact.
- Each section has a content purpose.
- Real copy and realistic evidence remain legible.
- Mobile is intentionally composed, not simply scaled down.

## Phase 6 — Hero implementation as a controlled vertical slice

**Goal:** implement the approved hero without destabilizing the rest of the site.

Work:
- Branch from current `main`.
- Implement semantic markup and approved copy.
- Use the simplest rendering technique that meets the approved visual requirements.
- Add motion only where the storyboard defines a meaningful state change.
- Provide static and reduced-motion states.
- Ensure keyboard, touch, and responsive behavior.
- Verify header, anchor offsets, and next-section transition.
- Review browser screenshots at agreed desktop, tablet, and mobile viewports.

Deliverables:
- Isolated hero implementation.
- Motion and reduced-motion behavior.
- Responsive review evidence.
- Exact-SHA typecheck, content gates, lint, and build results.
- Browser QA findings.

Exit criteria:
- Browser rendering closely matches the approved styleframe.
- No section is hidden, delayed, clipped, or difficult to reach.
- CI passes on the exact proposed commit.
- Owner approves the rendered result before wider rollout.

## Phase 7 — Site-wide identity integration

**Goal:** extend the approved system consistently.

Work:
- Adapt homepage sections to the approved hierarchy.
- Align work index and case-study pages with the evidence-first visual language.
- Align expertise and experience content.
- Integrate writing and contact without a second identity.
- Align résumé while preserving document readability and print behavior.
- Align navigation, footer, metadata, social previews, and shared tokens.
- Remove obsolete visual treatments only when replacements are reviewed.

Deliverables:
- Updated homepage sections.
- Work index and case-study visual system.
- Experience, writing, contact, and résumé alignment.
- Shared tokens and component rules.

Exit criteria:
- Pages feel related but suit their content.
- No section is a disconnected template.
- Public content and disclosure states remain accurate.

## Phase 8 — Quality assurance and release readiness

Work:
- Responsive browser QA across mobile, tablet, laptop, and wide desktop.
- Keyboard-only, focus, reduced-motion, and touch review.
- Contrast, zoom, and text-scaling checks.
- Performance review for images, fonts, canvas, and animation.
- Link, route, metadata, and social-preview checks.
- Content publication-gate verification.
- Résumé print review.
- Record deployment state separately from build state.

Deliverables:
- QA matrix.
- Accessibility and performance findings/resolutions.
- Exact-SHA CI results.
- Release notes and deployment verification where applicable.

Exit criteria:
- No unresolved blocker affects identity comprehension or navigation.
- All checks have recorded results.
- Build success is not represented as visual QA or deployment success.
- Production release requires an explicit deployment decision.

## 4. Governance and approval

Owner approval is required for:
- Final concept direction.
- Public positioning or headline changes.
- Permanent visual signature or brand tokens.
- Connected styleframes.
- Project/client naming and disclosure.
- Final browser-rendered hero and site-wide visual release.

Implementation rules:
- No code implementation during concept exploration or styleframe review.
- Use scoped branches and reviewable PRs for approved implementation phases.
- Keep strategy/spec changes separate from UI changes.
- Do not merge a UI change solely because its build passes; browser visual review is required.
- Preserve a rollback path for significant visual changes.

## 5. Prioritization

When trade-offs arise, prioritize:

1. Truthfulness and content integrity.
2. Immediate understanding of identity and value.
3. Evidence and project credibility.
4. Reading clarity and navigation.
5. Visual distinctiveness.
6. Motion and decorative enhancement.

A visual effect must not compromise a higher-priority item.

## 6. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Choosing a trend before identity | Evaluate against the identity specification; require rationale independent of references. |
| Designing only a hero | Require connected full-page styleframes before broad implementation. |
| Visuals overpower evidence | Use real content and approved case studies in styleframes. |
| Draft copy becomes a factual claim | Keep candidates separate from approved profile data. |
| Motion hurts usability/performance | Provide static/reduced-motion states and browser QA. |
| Generated imagery is mistaken for evidence | Label conceptual visuals and separate them from case-study material. |
| Scope grows into a rewrite too early | Use approval gates and vertical-slice PRs. |

## 7. Immediate next action

Finish the remaining Phase 1 checks: literal browser 200% zoom/OS text scaling, native print-dialog behavior, production-domain/commit parity, the preferred public contact-channel decision, and owner review of the prioritized findings. The real-device and assistive-technology checks are owner-confirmed complete; do not ask the owner to repeat them unless new evidence shows a gap.

In parallel, produce four comparable **static, non-binding** hero styleframe studies using the shared copy and frame in `docs/CREATIVE-CONCEPT-EXPLORATION.md`. Use the same copy, hierarchy, viewport, and content density so the visual territory—not wording or layout changes—is what gets compared. Include the top of the next section and keep conceptual art clearly separate from real product evidence.

Do not select a winner, approve permanent tokens, change public copy, implement a new hero, or alter application UI until the remaining Phase 1 gates are closed and the owner explicitly approves a direction. Review the connected experience, not just the hero.

**End of roadmap — v1.0**
