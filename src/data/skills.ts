export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "product-design",
    title: "Product & experience",
    description:
      "Understanding workflows and translating requirements into usable product interfaces.",
    skills: ["UI/UX Research", "Layout Analysis", "Interface Design"],
  },
  {
    id: "frontend",
    title: "Frontend engineering",
    description:
      "Building application interfaces and reusable product experiences.",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    id: "backend",
    title: "Backend & data architecture",
    description:
      "Designing APIs, service boundaries, and canonical data structures.",
    skills: ["Go", "Python", "Node.js", "Bun", "Hono", "REST APIs", "Supabase", "Canonical Data Modeling"],
  },
  {
    id: "ai-data",
    title: "AI & data engineering",
    description:
      "Integrating language models and intelligent extraction into operational systems.",
    skills: ["LLM Integration", "NER", "BERT", "Agentic Platforms", "Continuous-Learning Pipelines"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & security",
    description:
      "Supporting cloud-native delivery, monitoring, and information protection.",
    skills: ["Cloud-Native Deployments", "SNMP Monitoring", "Data Loss Prevention (DLP)"],
  },
];

export const CERTIFICATIONS = [
  {
    name: "UI/UX Research and Design",
    issuer: "Binar Academy",
  },
] as const;

export const PUBLICATION_PROFILES = [
  { platform: "DEV Community", handle: "@uigerhana" },
  { platform: "Medium", handle: "@weexdayend" },
] as const;
