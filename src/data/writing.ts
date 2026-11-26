export const PUBLICATION_PROFILES = [
  {
    id: "dev",
    platform: "DEV Community",
    handle: "@uigerhana",
    href: "https://dev.to/uigerhana",
  },
  {
    id: "medium",
    platform: "Medium",
    handle: "@weexdayend",
    href: "https://medium.com/@weexdayend",
  },
] as const;

export const PUBLIC_PROFILES = [
  {
    id: "github",
    label: "GitHub",
    handle: "@weexdayend",
    href: "https://github.com/weexdayend",
  },
  ...PUBLICATION_PROFILES.map(({ id, platform, handle, href }) => ({
    id,
    label: platform,
    handle,
    href,
  })),
] as const;

export const FEATURED_WRITING = [
  {
    id: "article-engineering-memory",
    publication: "Medium",
    title: "What Leaves When an Engineer Leaves",
    summary:
      "A long-form look at the knowledge that disappears when engineering decisions live only in people's heads, and why documentation is part of an organisation's memory.",
    href: "https://medium.com/@weexdayend/what-leaves-when-an-engineer-leaves-a91d735ba537",
    category: "Engineering practice",
    publishedAt: "2026-07-01",
    publishedLabel: "1 Jul 2026",
    readingTime: "17 min read",
  },
  {
    id: "article-enterprise-reconciliation",
    publication: "Medium",
    title: "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
    summary:
      "Explores the gap between collecting a payment and understanding what it settles across invoices, contracts, milestones, and operational records.",
    href: "https://medium.com/@weexdayend/why-payment-gateways-dont-solve-enterprise-reconciliation-cde4b403dbbd",
    category: "Financial intelligence",
    publishedAt: "2026-06-26",
    publishedLabel: "26 Jun 2026",
    readingTime: "5 min read",
  },
  {
    id: "article-canonical-data-architecture",
    publication: "Medium",
    title: "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
    summary:
      "Explains how fragmented enterprise data limits intelligent automation, and how a shared canonical representation gives systems consistent business context.",
    href: "https://medium.com/@weexdayend/the-hidden-layer-every-ai-agent-needs-canonical-data-architecture-8b7367c5374d",
    category: "Enterprise AI",
    publishedAt: "2026-06-24",
    publishedLabel: "24 Jun 2026",
    readingTime: "6 min read",
  },
] as const;
