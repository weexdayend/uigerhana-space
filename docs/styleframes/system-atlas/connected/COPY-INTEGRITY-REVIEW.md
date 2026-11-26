# System Atlas — static SVG copy-integrity review

**Status:** Static text-integrity repair completed · 2026-11-27  
**Scope:** Static SVG design studies and a lightweight repository quality gate  
**Visual acceptance:** Still open · **Production implementation:** Not authorized

## Finding

A source-to-artboard text review found that several SVG text nodes had lost their leading words or characters. The result was not simply visual clipping: the SVG source itself contained incomplete strings. This made portfolio titles, engineering principles, role descriptions, work-domain evidence, and motion explanations read as fragments.

The findings were confirmed by comparing the SVG text nodes with the existing typed records and design notes. No new professional claims or public profile facts were added.

## Corrections

| Artefact | What was repaired | Source of truth |
|---|---|---|
| Homepage desktop | Restored all four engineering-principle headings and their complete source descriptions; restored all three article titles and replaced fragments with concise complete summaries | \`src/data/approach.ts\`, \`src/data/writing.ts\` |
| Homepage tablet | Restored both role titles and complete, concise role summaries; restored full featured-article titles with intentional line wrapping | \`src/data/experience.ts\`, \`src/data/writing.ts\` |
| Homepage mobile | Restored UI/UX, Go, and LLM skill prefixes; repaired four concise experience highlights; restored complete principle descriptions; restored full article titles and complete summaries | \`src/data/skills.ts\`, \`src/data/experience.ts\`, \`src/data/approach.ts\`, \`src/data/writing.ts\` |
| Work index | Restored the complete descriptions for all four generalized work domains; wrapped each description into intentional lines | \`src/data/projects.ts\` |
| Motion storyboard | Restored the missing initial text in all four motion captions | \`MOTION-STORYBOARD.md\` |

Article titles now remain complete and wrap into multiple lines instead of beginning midway through a word or showing only the last part of a title. Work-domain descriptions are the complete source-backed summaries; they remain generalized and are not presented as separate public case studies.

## Regression prevention

Added \`scripts/verify-system-atlas-styleframes.mjs\`, a dependency-free Node check that:

- checks all 10 connected SVGs for a root/viewBox, title and description metadata, closing tag, and balanced element nesting;
- requires complete source-backed labels, article titles, skill prefixes, role text, work-domain summaries, and motion captions in the affected artboards;
- rejects the exact incomplete text nodes found during this review.

The check is exposed as \`npm run verify:styleframes\` and is wired into the existing CI quality job. It complements the existing content-publication gate; it does not replace browser visual QA or validate font metrics.

## Validation boundary

The corrected SVG source was re-read from the feature branch and checked in-memory for:

- presence of every required complete text string;
- absence of each known truncated text node;
- balanced SVG element nesting;
- retained viewBox, title, and description metadata on the five corrected artboards.

This is a static source-validation result. The check has not yet been executed by GitHub Actions on this new commit. The SVGs still declare Manrope and Plus Jakarta Sans without embedding font assets, so line wrapping and actual browser-rendered fit have not been verified.

The following remain open and are not implied by this repair:

- browser rendering with the actual fonts;
- visual overflow/clipping review at the accepted viewport samples;
- literal browser zoom and OS text-scaling review;
- native print-dialog and cross-browser checks;
- owner acceptance of the connected visual system and responsive compositions.

No \`src/\`, app route, public structured content, application CSS, dependency, publication state, or deployment behavior was changed by this bake.
