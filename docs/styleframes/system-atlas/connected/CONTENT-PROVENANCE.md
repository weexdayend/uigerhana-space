# Connected styleframes — content provenance

**Rule:** The art direction may change presentation, but it must not create new professional facts.

## Public identity and hero copy

Source: `src/data/profile.ts`

- Irvan Gerhana — Product Engineer.
- Brand line: “From pixel to production.”
- Headline: “I build digital products from product logic to production.”
- Introduction: “I work across product thinking, interface design, and software engineering—bringing complex workflows into software that is clear to use and practical to operate.”
- Context and experience label are taken from the existing profile source.

## Work

Sources: `src/data/case-studies.ts`, `src/data/projects.ts`, and `docs/CASE-STUDY-REVIEW.md`

- Only “Building a personal professional platform” is currently in the public case-study selector.
- Its project status is **In progress** and context is an independent personal project.
- Four work domains are generalized résumé-derived summaries. They are not individual public case studies.
- Draft-only project records, named client details, private interface captures, and unapproved outcomes are excluded.
- The architecture graphic describes the current code organization: typed shared content → Next.js App Router → reusable presentation components. It is not a production deployment or infrastructure topology.

## Capabilities and experience

Sources: `src/data/skills.ts`, `src/data/experience.ts`, and `src/data/approach.ts`

- Five capability groups and representative technologies are from the existing skill groups.
- Experience dates, role titles, organizations, and role summaries follow the résumé data.
- The two experience dates overlap in the source. The frames preserve that overlap and do not imply sequential employment.
- Four engineering principles preserve the source concepts; selected frame descriptions are shortened for visual composition.

## Writing and public profiles

Source: `src/data/writing.ts`

The three featured articles, publication labels, publication dates, reading times, summaries, and public profile handles are existing records:
- “What Leaves When an Engineer Leaves” — 1 Jul 2026 · 17 min read.
- “Why Payment Gateways Don’t Solve Enterprise Reconciliation” — 26 Jun 2026 · 5 min read.
- “The Hidden Layer Every AI Agent Needs: Canonical Data Architecture” — 24 Jun 2026 · 6 min read.

## Contact and résumé

Sources: `src/components/ContactAndFooter.tsx`, `src/data/profile.ts`, `src/data/site.ts`, `src/data/writing.ts`, `src/data/experience.ts`, and `src/data/skills.ts`.

- Contact actions remain the existing résumé and work destinations.
- Public profiles shown are GitHub, DEV Community, and Medium.
- A direct public contact channel has not been selected; no email address or phone number is fabricated.
- The résumé frame uses existing role, skill, certification, and focus-area information. It intentionally does not add education history or language proficiency.

## Copy and approval boundary

Some text is condensed or line-broken for the static styleframes. These are layout studies, not approved replacements for public profile, case-study, or résumé copy. Any change to published structured content requires a separate owner decision.
