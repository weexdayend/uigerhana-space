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

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The typecheck script runs `next typegen` before `tsc --noEmit` so generated App Router route helpers exist on a clean checkout.

## Routes

- `/` — personal homepage
- `/work` — selected work and generalized work domains
- `/work/[slug]` — approved case-study details only
- `/cv` — online résumé with browser print / Save PDF support

## Content architecture

Professional facts are maintained in typed modules under `src/data`:

- `profile.ts` — public display identity and professional summary
- `experience.ts` — résumé-backed roles and responsibilities
- `skills.ts` — skills, certification, and publication profile handles
- `projects.ts` — generalized work domains for the public homepage
- `case-studies.ts` — evidence-led case studies with an explicit publication approval gate
- `project-evidence.ts` — résumé-derived, generalized review records; not imported by public routes
- `approach.ts` — engineering principles
- `site.ts` — site-level identity and location metadata

Case-study presentation is composed from reusable components for contribution breakdowns, code-architecture maps, generated visual studies, and technology maps.

Keep the homepage, experience section, and résumé aligned to these shared sources. Do not add unsupported metrics, testimonials, credentials, project status, or client disclosures. The supplied résumé does not include education history or language proficiency, so those sections are intentionally omitted.

## Content integrity

- Public display name: **Irvan Gerhana**.
- Professional positioning: **Product Engineer**.
- Named client, product, and institution attributions require explicit disclosure approval; the source-derived project evidence register is generalized and excluded from public rendering.
- Personal phone and email details are not published by default.
- Use verified, individual URLs for repositories, articles, and social profiles.
- Distinguish production work, prototypes, experiments, and work in progress.
- Generated visual studies must not be presented as product screenshots.

## Design direction

The visual identity retains the existing Obsidian / Stone / Amber palette, Geist typography, Pixelify Sans accents, editorial grids, pixel geometry, and Bayer dithering.

See `docs/MASTER-IMPLEMENTATION-BRIEF.md` for the full implementation contract, `docs/CASE-STUDY-REVIEW.md` for the project disclosure and evidence checklist, and `docs/IMPLEMENTATION-LOG.md` for delivered work.
