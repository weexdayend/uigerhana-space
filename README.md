# UI Gerhana

Personal professional website and résumé for **Irvan Gerhana — Product Engineer**.

The site brings together product thinking, interface design, software engineering, enterprise systems, and production-minded engineering under one personal identity.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Geist and Pixelify Sans
- Custom Bayer-dithered canvas artwork
- GSAP + ScrollTrigger for the homepage narrative sequence

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run verify:content
npm run lint
npm run build
```

The typecheck script runs `next typegen` before `tsc --noEmit` so generated App Router route helpers exist on a clean checkout. The content gate ensures review-only project evidence is never imported into public UI and the public case-study selector requires explicit approval.

## Routes

- `/` — personal homepage
- `/work` — selected work and generalized work domains
- `/work/[slug]` — approved case-study details only
- `/cv` — online résumé with browser print / Save PDF support
- `/sitemap.xml` and `/robots.txt` — crawler discovery and indexing rules
- `/opengraph-image` — generated social preview image

## Content architecture

Professional facts are maintained in typed modules under `src/data`:

- `profile.ts` — public display identity and professional summary
- `experience.ts` — résumé-backed roles and responsibilities
- `skills.ts` — skills, certification, and publication profile handles
- `projects.ts` — generalized work domains for the public homepage
- `case-studies.ts` — evidence-led case studies with an explicit publication approval gate
- `project-evidence.ts` — résumé-derived, generalized review records; not imported by public routes
- `project-source-evidence.ts` — generalized private-source review records; not imported by public routes
- `approach.ts` — engineering principles
- `site.ts` — site-level identity and location metadata
- `writing.ts` — verified public profiles and selected owner-authored articles

Case-study presentation is composed from reusable components for contribution breakdowns, code-architecture maps, evidence maturity maps, source-derived workflow maps, generated visual studies, and technology maps. The homepage includes a curated Writing section with links to verified public articles and author profiles. The IT-services platform overview, passwordless team-invitation slice, and backup/recovery operations case study remain draft-only and are excluded from public routes.

Keep the homepage, experience section, and résumé aligned to these shared sources. Do not add unsupported metrics, testimonials, credentials, project status, or client disclosures. The supplied résumé does not include education history or language proficiency, so those sections are intentionally omitted.

## Content integrity

- Public display name: **Irvan Gerhana**.
- Professional positioning: **Product Engineer**.
- Named client, product, and institution attributions require explicit disclosure approval; the source-derived project evidence register is generalized and excluded from public rendering.
- Personal phone and email details are not published by default.
- Use verified, individual URLs for repositories, articles, and social profiles.
- Distinguish production work, prototypes, experiments, and work in progress.
- Generated visual studies must not be presented as product screenshots.

## Brand identity

The Gerhana identity is larger than any visual style used to express it. The durable foundation is Irvan Gerhana as a Product Engineer and product-minded systems builder: connecting product thinking, interface craft, software engineering, and production-minded systems work.

- `docs/BRAND-IDENTITY-SPEC.md` — source of truth for identity, perception, experience, voice, visual principles, motion, and content guardrails.
- `docs/BRAND-IDENTITY-PLAN.md` — phased roadmap, deliverables, approval gates, and implementation sequence.
- `docs/CURRENT-EXPERIENCE-AUDIT.md` — source-based audit of the current routes, visitor journey, content evidence, navigation, interactions, and prioritized opportunities.

Visual treatments such as palettes, typefaces, pixel/dither graphics, anime-inspired illustration, environments, and cinematic motion are expressive options, not the identity itself. They must be selected against the brand specification and validated across the whole site.

See `docs/MASTER-IMPLEMENTATION-BRIEF.md` for the factual and technical baseline, `docs/CASE-STUDY-REVIEW.md` for the project disclosure checklist, `docs/PROJECT-SOURCE-REVIEW.md` for the sanitized private-source review, and `docs/IMPLEMENTATION-LOG.md` for delivered work.
