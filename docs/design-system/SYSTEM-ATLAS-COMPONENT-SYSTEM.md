# The System Atlas — component system and anatomy

**Status:** Component-system proposal for owner review · 2026-11-27  
**Parent direction:** The System Atlas  
**Implementation:** Not authorized by this document

## 1. Component philosophy

The Atlas is an editorial product-engineering identity, not a dashboard kit. Reusable components should make content easier to understand and navigate. They should not add UI furniture for its own sake.

The system uses:
- **Clear hierarchy:** identity, evidence, and actions are more prominent than metadata.
- **Quiet structure:** hairline boundaries, stable alignment, and purposeful surface changes replace shadows and floating-card stacks.
- **One visual signature:** a continuous route and meaningful waypoints; no fake coordinates, node clouds, or pseudo-metrics.
- **Evidence before decoration:** conceptual diagrams are labelled as conceptual; actual project screenshots or outcome claims require approved evidence.
- **Accessible states:** focus, disabled state, status, and interaction cannot depend on color alone.

## 2. Foundations and reusable primitives

| Primitive | Responsibility | Composition rule |
|---|---|---|
| Page shell | Centered content and page edge gutters | Stable maximum width; root-relative edge inset |
| Surface band | Large dark/light section context | Alternate only when it clarifies the visitor journey |
| Section heading | Eyebrow, heading, optional supporting copy | Heading leads; metadata never competes |
| Atlas route | One continuous visual progression | Use once as a signature; reuse smaller only when it adds narrative meaning |
| Waypoint | One meaningful stage | Pair icon/shape with a text label |
| Hairline divider | Separate independent content groups | One-pixel rule; low-contrast, never box every element |
| Metadata line | Context, date, reading time, role, status | Compact mono label; no body-copy use |
| Action group | Primary, secondary, tertiary navigation | One primary action per context; keep labels destination-specific |
| Content list | Repeated evidence or editorial items | Stable text alignment and predictable reading order |

## 3. Core component catalogue

### 3.1 Site header

**Purpose:** persistent orientation across the homepage and dedicated routes.

Anatomy: brand mark/name → primary section links → résumé action → mobile menu control.

Rules:
- Keep the wordmark and navigation text-led; the mark is supportive.
- Desktop links point to actual section IDs or actual routes. Do not create an “About” target that silently points to the hero unless the navigation label says Introduction.
- Use a stable header surface. Avoid color-flipping complexity based on every section; if adaptive contrast is retained, it needs browser-state QA.
- Mobile uses a compact menu with a clear expanded/collapsed state and Escape-to-close behavior.
- On navigation, close the menu and preserve logical focus. Do not trap focus in a simple disclosure menu unless it becomes a modal dialog.
- The résumé link remains a separate, persistent destination.

### 3.2 Buttons and action links

Three semantic tiers:

| Tier | Visual treatment | When to use |
|---|---|---|
| Primary | Signal Copper fill with Atlas Ink label | The single most important action in a section |
| Secondary | Transparent surface with a one-pixel boundary | A parallel but lower-priority action |
| Tertiary | Text link with a clear underline or arrow treatment | Inline navigation and low-emphasis destinations |

Rules:
- Use native anchors for navigation and native buttons for in-place actions.
- An external-link arrow is decorative and hidden from assistive technology; the accessible name must remain meaningful.
- Avoid multiple primary actions competing within one visual group.
- CTA inset uses the approved control pair: `--py: 0.75rem`, `--px: 1.25rem`.
- Target a minimum 2.75rem control height; enlarge when the composition needs a more generous action.
- Button labels should use sentence case and state the destination/action. Avoid vague “Click here”.
- Do not use pill shapes. A 0.125rem–0.25rem corner is a candidate range, not a final radius decision.

### 3.3 Selected case-study feature

**Purpose:** introduce one approved case study and communicate its current state before the visitor opens it.

Anatomy:
1. status/context eyebrow;
2. project title;
3. concise, source-backed summary;
4. independent context and role, when useful;
5. clear “Read case study” action.

Rules:
- Status text is always explicit (for example, **In progress**); color is an additional cue only.
- Do not invent a thumbnail or screenshot to fill visual space.
- Keep the whole card readable without hover.
- Hover may shift the surface subtly and strengthen the action underline; it must not reveal the only copy or status.
- Use the approved card inset pair: `--py: 1.5rem`, `--px: 1.5rem`.

### 3.4 Work-domain row/card

**Purpose:** summarize broader, generalized experience without implying a separate public case study.

Anatomy: index → domain title → one-sentence description → compact capability context.

Rules:
- Keep wording generalized unless an individual project has explicit publication approval.
- Avoid “View case study” affordance on a work domain that has no public case-study route.
- Use a grid or ruled list depending on width; do not force every item into a floating card.
- At narrow widths, stack title and description before metadata.

### 3.5 Capability group

**Purpose:** show a cross-disciplinary toolkit and how related skills sit together.

Anatomy: index → group title and explanation → skills list.

Rules:
- Skills are text, not individually clickable pills unless they truly filter or navigate.
- Keep skill labels readable; wrap naturally rather than shrinking typography to preserve a single line.
- Use a two-column desktop composition and a single-column mobile reading order.
- Do not imply proficiency levels that are not evidenced by the source.

### 3.6 Experience entry

**Purpose:** make responsibility, organization, and timeline easy to scan.

Anatomy: period → role → organization/location → summary → selected responsibilities.

Rules:
- Preserve overlapping dates exactly as stated by the résumé.
- Use the same hierarchy on desktop and mobile; mobile stacks date/role before the explanatory copy.
- Bullets are reserved for distinct responsibilities, not repeated summaries.
- Keep the organization and period as text; do not rely on logo or color recognition.

### 3.7 Principle / approach tile

**Purpose:** express a working principle in a memorable but readable pattern.

Anatomy: index → short principle → supporting sentence.

Rules:
- The sentence carries the meaning; the index is navigation/structure only.
- Four-column desktop can become two-column tablet and one-column mobile.
- Use a quiet surface and border instead of shadow.
- All principles remain visible without animation.

### 3.8 Article card

**Purpose:** preview an existing public article and make the destination clear.

Anatomy: category → publication/reading time → title link → summary → date.

Rules:
- The title is the link; avoid a second ambiguous “Read” action if it duplicates the same destination.
- Open external destinations in a new tab only when the surrounding site convention calls for it, with safe rel attributes.
- Preserve article title, publication, date, and reading time from the verified content source.
- Use a three-column desktop grid, then one-column or two-column responsive layout according to readable width—not a hard-coded card count.

### 3.9 Résumé action and document surface

**Purpose:** support a document-like reading and print path.

Rules:
- Print action is a native button.
- Keep the résumé sheet narrow enough for comfortable reading and preserve real document flow.
- Hide only navigation/chrome in print; never remove résumé content to force page count.
- Keep print contrast and links readable in grayscale.
- The artboard is a layout study, not proof of native print-dialog behavior.

### 3.10 Footer / contact region

**Purpose:** close the visitor journey and repeat genuine next steps.

Rules:
- Reuse the existing approved résumé, work, and public-profile destinations.
- Do not style a decorative contact affordance that has no destination.
- Do not add an email address, phone number, booking form, or “Hire me” action without owner approval.
- Keep identity, role, location, and social destinations as separate, clearly named elements.

## 4. Layout and responsive rules

| Context | Layout proposal | Constraints |
|---|---|---|
| Wide desktop | 12-column centered grid; copy-led hero and right-side atlas | Main content max-width candidate 85rem; long-form reading remains around 64–72ch |
| Desktop | 12-column section grid; 2–3 columns only for short repeated items | Avoid excessive card surfaces and uneven reading order |
| Tablet | 8-column or nested 4-column grid | Reflow groups before labels collide; no horizontal overflow |
| Mobile | Single-column reading order with 1rem page-edge gutter | Identity/copy → action → route; never shrink the desktop artboard |
| Small mobile | Same semantic order and 1rem base gutter | Allow line wrap; reduce decorative area before body text or controls |

These are layout proposals for browser validation. Static SVG artboard dimensions do not establish CSS breakpoints or actual reflow.

## 5. Shape, imagery, and decoration

- Prefer square or subtly rounded geometry. Candidate radius values are intentionally small and remain under review.
- Use a one-pixel hairline for boundaries; do not turn each content item into a bordered tile.
- Default to no drop shadows. Establish hierarchy with spacing, type, and surface tone.
- The atlas route is a signature graphic, not a chart or route-planning UI.
- Use actual product imagery only when publication/disclosure is approved.
- Generated/conceptual imagery must be labelled as a study and must never be represented as product evidence.
- Do not add logos, customer marks, fake device frames, fake UI, or fabricated outcomes.

## 6. Governance

The component catalogue is a reusable design proposal. It does not approve:
- final token values or component variants;
- public copy changes or new case-study publication;
- final focus, hover, disabled, or contrast behavior until browser review;
- a production implementation or site-wide replacement.

The proposal must be reviewed as a connected system against the desktop/tablet/mobile styleframes and the interaction-state contract. Production implementation requires a separate owner decision after the remaining Phase 1 gates and Phase 5 visual acceptance are addressed.
