import type { DitherArtKind } from "@/lib/dither";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  url?: string;
  summary: string;
  quote: string;
  attribution: string;
  metrics: { value: string; label: string }[];
  problem: string;
  architecture: string;
  outcomes: string[];
  stack: string[];
}

export interface NoteArticle {
  slug: string;
  title: string;
  excerpt: string;
  art: DitherArtKind;
  readTime: string;
  body: string[];
}

export interface OpenSourceItem {
  name: string;
  description: string;
  repoUrl: string;
  docsNote: string;
}

export interface FaqGroup {
  index: string;
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const SITE_META = {
  brand: "UI Gerhana",
  handle: "uigerhana.space",
  email: "hello@uigerhana.space",
  location: "Bandung · Worldwide",
  timezone: "WIB (UTC+7)",
  githubUrl: "https://github.com/irvangerhana",
  xUrl: "https://x.com/uigerhana",
  linkedinUrl: "https://linkedin.com/in/irvangerhana",
};

export const HERO_COPY = {
  headlineLine1: "From pixel",
  headlineLine2: "to production.",
  intro:
    "A product engineering practice in Bandung, working worldwide. Web apps, SaaS platforms, AI workflows, and design systems built and handed over cleanly.",
  trustPoints: [
    "Bandung · UTC+7",
    "One accountable builder",
    "Clean repo handoff",
  ],
};

export const SERVICES_COPY = {
  heading: "Your product, your code, your call.",
  intro:
    "For founders who have outgrown templates and fragmented agencies. Every system is custom-built, documented, and delivered directly into your repository.",
  items: [
    {
      id: "product-apps",
      title: "SaaS & web platforms",
      description:
        "Software designed and engineered around your domain model, permissions, billing, and real operational workflows.",
      deliverable: "Next.js, TypeScript, Postgres, CI/CD",
    },
    {
      id: "ai-systems",
      title: "Agentic AI workflows",
      description:
        "Practical AI tools connected cleanly to your internal documents, APIs, and review gates—built for reliability over demos.",
      deliverable: "Tool-calling pipelines, evals, guardrails",
    },
    {
      id: "commerce",
      title: "Custom storefronts",
      description:
        "Sub-second editorial commerce and custom configurators without bloated plugins or runaway monthly app fees.",
      deliverable: "Headless checkout, inventory, edge cache",
    },
    {
      id: "design-systems",
      title: "Design & interfaces",
      description:
        "Marketing sites and product interfaces designed directly in code so typography, motion, and state never drift.",
      deliverable: "Tokenized UI kits, interactive visuals",
    },
  ] satisfies ServiceItem[],
};

export const PROCESS_COPY = {
  heading: "Built and shipped your way.",
  intro:
    "No code gets written before scope is clear, and nothing wraps up until your team can run and extend the product independently.",
  steps: [
    {
      id: "scoping",
      title: "Scoping",
      description:
        "Priorities, architecture, and deliverables agreed in writing before the first commit.",
    },
    {
      id: "development",
      title: "Development",
      description:
        "Built in weekly milestones with live staging links you can test every Friday.",
    },
    {
      id: "delivery",
      title: "Delivery",
      description:
        "You receive the full repository, infrastructure config, and documentation with zero lock-in.",
    },
    {
      id: "handoff",
      title: "Enablement",
      description:
        "Walkthroughs and runbooks so you or your team can evolve the system confidently.",
    },
  ] satisfies ProcessStep[],
};

/**
 * Case study blueprints adapted to the editorial layout.
 * Replace client names, quotes, and figures in this file with your verified engagements.
 */
export const WORK_COPY = {
  heading: "What shipped work looks like.",
  intro:
    "Software your team owns outright, faster core workflows, and systems engineered to stay readable after launch.",
  featured: {
    id: "meridian-ledger",
    client: "Meridian Ledger",
    summary:
      "Replaced a spreadsheet-and-admin patchwork with a keyboard-first treasury operations console.",
    quote:
      "Having one engineer own both the interface details and the Postgres ledger meant we shipped in seven weeks without a single handoff bottleneck. Weekly close dropped from hours to minutes.",
    attribution: "Treasury Product Lead // B2B Fintech",
    metrics: [
      { value: "100%", label: "code & schema owned" },
      { value: "42 ms", label: "p95 query response" },
      { value: "7 wks", label: "concept to live users" },
    ],
    problem:
      "Finance operators were reconciling 18,000+ weekly rows across disconnected spreadsheets, causing export delays and manual errors during close.",
    architecture:
      "Built a tokenized UI system backed by an append-only PostgreSQL ledger, idempotent payout mutations, and virtualized keyboard navigation.",
    outcomes: [
      "Cut weekly close reconciliation from ~6 hours to under 25 minutes",
      "Zero duplicate payout events across production runs",
      "Delivered complete test suite and runbooks directly in client repo",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Tailwind CSS"],
  } satisfies CaseStudy,
  secondary: {
    id: "selene-storefront",
    client: "Selene Studio",
    headlineStat: "0.9s",
    statLabel: "mobile page load",
    quote:
      "Consolidating design and engineering cut nine runtime scripts and lifted checkout completion within two months.",
    attribution: "Founder // Custom Commerce",
    problem:
      "Slow third-party widgets stalled mobile product pages at 4.8s LCP and dropped buyers during variant selection.",
    architecture:
      "Server-rendered Next.js catalog routes, edge-cached inventory checks, and a zero-dependency product configurator.",
    outcomes: [
      "Mobile LCP dropped from 4.8s to 0.9s",
      "Removed 9 third-party runtime dependencies",
    ],
    stack: ["Next.js", "Stripe", "Edge Caching", "TypeScript"],
  },
};

export const NOTES_COPY = {
  heading: "Field notes",
  intro:
    "Short technical notes on interface craft, ordered dithering, product architecture, and building without agency bloat.",
  articles: [
    {
      slug: "pixel-and-dither-as-architecture",
      title: "Using pixel and dither as system architecture, not nostalgia",
      excerpt:
        "Ordered Bayer matrices let dark and light interfaces share one crisp visual grammar without sacrificing body copy legibility.",
      art: "eclipse-horizon",
      readTime: "4 min read",
      body: [
        "Most pixel-inspired sites fail because they treat low resolution as an aesthetic gimmick—applying noisy scanlines over body text or relying on arcade clichés.",
        "When treated as an engineering constraint, ordered Bayer 4×4 dithering solves a real visual problem: it creates tonal depth, atmospheric gradients, and tactile motion inside a strict 2- or 3-color palette.",
        "Keeping prose on calm, high-contrast flat surfaces while reserving pixel geometry for structure, dividers, diagrams, and interactive artwork gives you both executive clarity and unmistakable character.",
      ],
    },
    {
      slug: "one-accountable-builder",
      title: "Why one product engineer often out-ships a four-person agency",
      excerpt:
        "Eliminating the handoff gap between Figma mockups, frontend state, and SQL schemas removes weeks of translation drift.",
      art: "isometric-cubes",
      readTime: "3 min read",
      body: [
        "Most delays in early product builds come from alignment overhead: designers inventing states that don't match database constraints, and engineers guessing spacing and motion intent.",
        "When one builder owns the visual system, API contract, and deployment pipeline together, every tradeoff is resolved in minutes inside the same codebase.",
      ],
    },
    {
      slug: "designing-for-zero-lock-in",
      title: "Designing client software for clean handoff from day one",
      excerpt:
        "Plain TypeScript, documented schemas, and standard hosting beat proprietary no-code glue the moment a team hires internally.",
      art: "grid-waves",
      readTime: "5 min read",
      body: [
        "A client should never feel trapped by the engineer who built their v1. Every project starts directly inside a repository they own, with boringly reliable primitives.",
        "Clear README architecture notes, environment templates, and strict type boundaries mean an incoming engineer can ship their first PR on day one.",
      ],
    },
    {
      slug: "progressive-resolution-motion",
      title: "Stepped motion and progressive resolution on the web",
      excerpt:
        "Quantized keyframes and block-size sweeps feel native to digital hardware while staying respectful of reduced-motion preferences.",
      art: "matrix-orbit",
      readTime: "3 min read",
      body: [
        "Not every interface needs elastic spring physics. Stepped resolution sweeps and 1-bit pixel transitions mirror how digital displays actually draw frames.",
      ],
    },
    {
      slug: "latency-budgets-for-tools",
      title: "Sub-100ms budgets for internal operations consoles",
      excerpt:
        "Keyboard navigation, indexed queries, and optimistic UI turn daily back-office chores into fast, trustworthy tools.",
      art: "signal-bars",
      readTime: "4 min read",
      body: [
        "Internal tools deserve the same speed budget as consumer apps. Operators spending six hours a day inside a console notice every 400ms spinner.",
      ],
    },
  ] satisfies NoteArticle[],
};

export const OPENSOURCE_COPY = {
  heading: "Tools & open source.",
  intro:
    "Small utilities, dither experiments, and starter kits published openly—built from the same patterns used in client work.",
  items: [
    {
      name: "bayer-dither-canvas",
      description:
        "Zero-dependency 4×4 ordered dithering renderer with progressive resolution and pointer lens.",
      repoUrl: "https://github.com/irvangerhana",
      docsNote: "TypeScript · Canvas 2D",
    },
    {
      name: "next-dual-polarity",
      description:
        "Starter architecture for high-contrast light/dark design systems with Next.js App Router and Tailwind v4.",
      repoUrl: "https://github.com/irvangerhana",
      docsNote: "Next.js 16 · Tailwind v4",
    },
    {
      name: "ledger-idempotency-kit",
      description:
        "Deterministic idempotency middleware and Postgres audit log helpers for financial mutations.",
      repoUrl: "https://github.com/irvangerhana",
      docsNote: "PostgreSQL · Drizzle",
    },
    {
      name: "agent-eval-harness",
      description:
        "Lightweight regression runner for testing tool-calling AI workflows against real fixtures.",
      repoUrl: "https://github.com/irvangerhana",
      docsNote: "Node.js · Structured Eval",
    },
  ] satisfies OpenSourceItem[],
};

export const FAQ_COPY = {
  heading: "Questions before we start",
  intro:
    "A custom build involves technical choices, scope boundaries, and budget clarity. Here are straight answers upfront.",
  groups: [
    {
      index: "01",
      category: "Ownership & codebase",
      items: [
        {
          question: "Do I own 100% of the code and infrastructure?",
          answer:
            "Yes. All work is committed directly into a repository under your GitHub organization, deployed on your cloud accounts, with zero proprietary runtime lock-in.",
        },
        {
          question: "Can my in-house engineers take over after launch?",
          answer:
            "That is the goal. I use standard, well-typed stacks (Next.js, TypeScript, PostgreSQL) and include architecture docs and a live walkthrough at handoff.",
        },
        {
          question: "Do you design as well as engineer?",
          answer:
            "Yes. I design the visual system, typography, components, and responsive states directly alongside the production implementation so nothing gets lost in translation.",
        },
      ],
    },
    {
      index: "02",
      category: "Process & timezone",
      items: [
        {
          question: "How long does a typical v1 build take?",
          answer:
            "Focused marketing sites and design systems take 2–3 weeks. Full-stack SaaS MVPs or custom operations consoles typically ship in 4–8 weeks.",
        },
        {
          question: "How do we track progress week to week?",
          answer:
            "You get a live staging preview updated continuously, concise weekly async video/written check-ins every Friday, and direct Slack or Discord access.",
        },
        {
          question: "How does working from Bandung (UTC+7) work with EU or US teams?",
          answer:
            "Async-first written updates paired with dedicated overlap windows—afternoon/evening WIB overlaps smoothly with European mornings and US East Coast mornings.",
        },
      ],
    },
    {
      index: "03",
      category: "Scope & pricing",
      items: [
        {
          question: "How do you structure engagements?",
          answer:
            "Either fixed-scope product sprints (clear deliverables and fixed price agreed upfront) or monthly embedded product engineering retainers for ongoing shipping.",
        },
        {
          question: "Do I need an ongoing retainer after launch?",
          answer:
            "No. Every build includes a post-launch stabilization window, and ongoing retainers are completely optional based on your roadmap.",
        },
      ],
    },
  ] satisfies FaqGroup[],
};

export const CONTACT_COPY = {
  heading: "Tell me what you want to build.",
};
