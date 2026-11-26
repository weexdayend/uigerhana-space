# Phase 2 — Static styleframe exploration

**Status:** non-binding design research. No visual direction, typography, palette, token, illustration system, or motion language is approved. This work does not close Phase 1 or authorize production UI changes.

## Preview index

All desktop frames use a 1440 × 900 viewBox and the same approved identity, role, headline, introduction and CTA content. Open the standalone SVG files in a browser or vector editor.

| Concept | Desktop | Mobile |
|---|---|---|
| A — The System Atlas | [Desktop SVG](concept-a-system-atlas-desktop.svg) | [390 × 844 SVG](concept-a-system-atlas-mobile.svg) |
| B — The Editorial Instrument | [Desktop SVG](concept-b-editorial-instrument-desktop.svg) | — |
| C — Material to Meaning | [Desktop SVG](concept-c-material-to-meaning-desktop.svg) | — |
| D — The Product Field Notes | [Desktop SVG](concept-d-product-field-notes-desktop.svg) | [390 × 844 SVG](concept-d-product-field-notes-mobile.svg) |

[Case-study extension test](case-study-extension-test.svg)

## Shared content and frame

- Name: Irvan Gerhana
- Role: Product Engineer
- Brand line: From pixel to production.
- Headline: “I build digital products from product logic to production.”
- Introduction: “I work across product thinking, interface design, and software engineering—bringing complex workflows into software that is clear to use and practical to operate.”
- Primary CTA: Explore selected work
- Secondary CTA: View résumé

Desktop comparison frame: 1440 × 900. Mobile stress test: 390 × 844. The static frames use editable vector shapes and live SVG text; they are design artefacts, not browser-rendered production page captures. Arial/Georgia are SVG fallback families for portable inspection; no font choice is proposed.

## Concept rationale and visual grammar

### A — The System Atlas
A right-weighted spatial field with a single legible route, layered contours and restrained boundaries. The route moves through ambiguous terrain into a resolved passage. It intentionally avoids data dashboards, crowded node maps, technical labels and pseudo-HUD furniture.

**Strength:** communicates systems relationships and navigation through complexity. **Risk:** may be misread as network/data visualization; hero path must remain secondary to identity and copy. Good extension potential for workflow and decision paths in case studies.

### B — The Editorial Instrument
The headline leads. The right-side composition is a typographic specimen/grid with columns, baseline intersections and a small editorial fragment. Its signature is deliberate rhythm and a controlled serif/sans contrast rather than a large illustration.

**Strength:** clearest first-read and easiest extension to writing/CV. **Risk:** can become generic minimalism unless the grid, crop logic and type scale develop a distinctive and consistent voice. This frame uses the least visual metaphor.

### C — Material to Meaning
An irregular, layered geometric field resolves from fragmented marks into a structured plane. Pixel elements are only one small material cue, not the concept or a commitment to dither. Static state carries the transformation idea without animation.

**Strength:** most expressive visual metaphor; communicates shaping/structuring. **Risk:** near prior pixel/dither experiments, so the final art direction would need a more original material treatment; could be difficult to extend across dense evidence.

### D — The Product Field Notes
A three-stage evidence composition connects product direction, information architecture and implementation. It is explicitly conceptual and references only source-backed project structure; no fake client screen, metrics or product interface is shown.

**Strength:** strongest bridge from identity to work evidence and case-study narrative. **Risk:** current public case-study inventory is thin; too many artifacts would tempt invented evidence. Captions and provenance must remain explicit.

## Weighted evaluation

Scores are qualitative design-review estimates on a 1–10 scale, assigned against the rubric in `BRAND-IDENTITY-PLAN.md`. Weighted result = sum(score × weight) / 100. They are prompts for review, not truth claims or automatic selection.

| Criterion | Weight | A | B | C | D |
|---|---:|---:|---:|---:|---:|
| Identity fit | 25% | 9 | 8 | 8 | 9 |
| Clarity | 20% | 7 | 9 | 7 | 8 |
| Memorability | 20% | 8 | 7 | 9 | 8 |
| Evidence compatibility | 15% | 8 | 9 | 6 | 9 |
| Extensibility | 10% | 9 | 9 | 7 | 8 |
| Accessibility/performance | 10% | 8 | 9 | 8 | 8 |
| **Weighted result / 10** | **100%** | **8.15** | **8.35** | **7.55** | **8.40** |

### Score rationale and trade-offs

- **A:** identity 9 because its navigable systems metaphor connects workflow and architecture; clarity 7 because the route can compete with the person; memorability 8 for spatial composition; evidence 8 for workflows but less suited to non-system stories; extensibility 9 across process/case studies; accessibility/performance 8 because static SVG is lightweight but fine lines require contrast and scale checks.
- **B:** identity 8 because craft/judgment is clear but product systems are less explicit; clarity 9 because headline is dominant; memorability 7 because typography-led work risks category familiarity; evidence 9 due to reading hierarchy; extensibility 9 across writing, CV and case-study text; accessibility/performance 9 because it relies on static text/grid with minimal graphical complexity.
- **C:** identity 8 for the transformation thesis; clarity 7 because meaning may need interpretation; memorability 9 for the material field; evidence 6 because generative artwork cannot substitute for product proof; extensibility 7 because repeated material transformations can become decorative; accessibility/performance 8 because static vector is manageable but texture/density may need reduced-detail variants.
- **D:** identity 9 because the composition shows product thinking through implementation layers; clarity 8 with direct artifact captions; memorability 8 through connected evidence fragments; evidence 9 because provenance can be explicit, though the public corpus is limited; extensibility 8 across case studies and experience; accessibility/performance 8 because multiple annotations and visual groups need careful reading order and contrast.

## Responsive shortlist (not concept approval)

1. **D — Product Field Notes:** tests whether evidence-oriented hierarchy survives a narrower canvas without floating-card clutter. The mobile composition becomes two tightly grouped evidence fragments.
2. **A — System Atlas:** tests whether the spatial route remains one dominant, legible visual when compressed below the identity copy.

The shortlist is chosen for complementary stress coverage: D tests information density/evidence and A tests metaphor/geometry. Scores alone did not determine this. B remains a strong editorial challenger and C remains the expressive challenger. No winner is declared.

## Case-study extension test

The representative opening uses only the approved public `/work/uigerhana-space` case study: “Building a personal professional platform” (in progress). The title, summary, independent-project context, role, and conceptual map align to the source record. The conceptual map represents typed shared content → App Router pages → reusable presentation components. The source explicitly describes this as a code-architecture view, not deployment topology. No public outcomes, user metrics, launch completion, customer claims, or new attribution are introduced.

Three deeper project records remain draft-only. The SVG is labeled conceptual—not product UI—and is not a screenshot or public evidence asset.

## Five-second comprehension review

- **A:** name/role and headline are visible before the map; the path supports “systems-aware product engineer.” Potential misread is network/data visualization.
- **B:** strongest copy-first read; name, role, headline and CTA are the unambiguous first-order message. Potential weakness is less immediate signal of systems scope.
- **C:** copy remains primary, but material field competes for attention; potential misread is an art/creative-coding portfolio.
- **D:** identity remains first, and captions explain conceptual evidence fragments; potential misread is documentation-heavy product ops unless the actual work narrative follows.

All concepts support the same next-step cue, “How the work connects.” This is a section transition cue only; it does not add new approved profile copy.

## Risk register

- **Evidence scarcity:** only one public approved case study; do not fabricate artifacts to fill Concept D.
- **Metaphor-first reading:** A and C must never obscure “Irvan Gerhana — Product Engineer.”
- **Editorial genericness:** B needs a distinct repeatable crop/grid system before full-site adoption.
- **Artifact density:** D needs provenance and strong spacing, not a wall of annotations.
- **Responsive constraints:** 390 px is one stress point; test 360 px and real zoom/text scaling later.
- **Typography:** SVG font families are portability fallbacks, not recommendations or token decisions.
- **Phase 1:** remains open; static concept research proceeds in parallel without sign-off.
- **Production boundary:** no `src/`, `app/`, CSS, components, profile data, dependency or publication status was changed.

## Validation notes

The six SVG files are XML-well-formed, use explicit viewBox dimensions, and have title/description metadata. Text remains native SVG text and all visible artwork consists of vector primitives. Visual review should still be performed in the owner's target vector/browser environment; this document does not claim a production browser/AT test.

## Sources read

- `docs/BRAND-IDENTITY-SPEC.md`
- `docs/BRAND-IDENTITY-PLAN.md`
- `docs/CREATIVE-CONCEPT-EXPLORATION.md`
- `docs/CURRENT-EXPERIENCE-AUDIT.md`
- `docs/RUNTIME-QA-BASELINE.md`
- `docs/CASE-STUDY-REVIEW.md`
- `docs/IMPLEMENTATION-LOG.md`
- `src/data/profile.ts`
- `src/app/page.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/MotionNarrativeSection.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/data/case-studies.ts`
