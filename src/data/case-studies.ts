import type { DitherArtKind } from "@/lib/dither";

export type CaseStudyPublicationStatus = "draft" | "approved";
export type CaseStudyProjectStatus = "in-progress" | "completed" | "maintained";

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseStudyContribution {
  area: string;
  description: string;
}

export interface CaseStudyArchitectureStage {
  label: string;
  description: string;
  items: string[];
}

export interface CaseStudyVisualStudy {
  id: string;
  art: DitherArtKind;
  title: string;
  label: string;
  caption: string;
}

export interface CaseStudyTechnologyGroup {
  category: string;
  purpose: string;
  technologies: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  publicationStatus: CaseStudyPublicationStatus;
  projectStatus: CaseStudyProjectStatus;
  context: string;
  role: string;
  challenge: CaseStudySection;
  approach: CaseStudySection;
  implementation: CaseStudySection;
  currentState: CaseStudySection;
  contributions: CaseStudyContribution[];
  architectureDiagram: {
    title: string;
    description: string;
    stages: CaseStudyArchitectureStage[];
  };
  visualStudies: CaseStudyVisualStudy[];
  technologyGroups: CaseStudyTechnologyGroup[];
}

/**
 * Public case studies must be explicitly approved.
 * Draft entries stay out of public selectors until contribution, status,
 * evidence, and disclosure details have been reviewed by the owner.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "uigerhana-space",
    title: "Building a personal professional platform",
    eyebrow: "Independent product · In progress",
    summary:
      "Reframing a personal website into a coherent professional identity, portfolio, and résumé experience.",
    publicationStatus: "approved",
    projectStatus: "in-progress",
    context: "Independent personal project",
    role:
      "Product direction, identity and content decisions, information architecture, visual direction, and implementation oversight.",
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "The initial concept had a strong visual signature, but its content was framed more like a software-services landing page than a personal professional platform.",
        "The project needed one narrative that could introduce a Product Engineer, provide credible evidence through work, and support both business conversations and professional opportunities.",
      ],
    },
    approach: {
      heading: "Product and experience approach",
      paragraphs: [
        "Reposition the experience around product thinking, interface design, software engineering, and production-minded work.",
        "Retain the Obsidian, Stone, and Amber palette, Geist typography, Pixelify Sans accents, editorial grids, and Bayer-dithered artwork while changing the information architecture.",
      ],
      bullets: [
        "Lead with a clear Product Engineer identity.",
        "Make work, expertise, experience, and engineering philosophy discoverable.",
        "Treat factual accuracy and project disclosure as part of the product experience.",
      ],
    },
    implementation: {
      heading: "Implementation",
      paragraphs: [
        "Create typed content modules for profile, experience, skills, work domains, and engineering principles.",
        "Build the homepage, portfolio, and online résumé from shared sources so professional facts are not manually duplicated.",
      ],
      bullets: [
        "Next.js App Router, React, and TypeScript.",
        "Tailwind CSS with Geist and Pixelify Sans.",
        "Custom Bayer-dithered canvas and SVG visuals.",
        "Print-oriented résumé page with browser Print / Save PDF support.",
        "Case-study publication gate based on explicit approval status.",
      ],
    },
    currentState: {
      heading: "Current state",
      paragraphs: [
        "The current implementation includes the identity foundation, homepage sections, typed professional content, an online résumé, and an evidence-led case-study route.",
        "The work is still in progress. The visual samples below are generated visual assets and studies from the site's own renderer, not screenshots of a completed product. Other professional project case studies remain gated until their role, evidence, and disclosure details are reviewed.",
      ],
    },
    contributions: [
      {
        area: "Product direction",
        description:
          "Defined the Product Engineer positioning, primary audience, website goals, and the story the platform should communicate.",
      },
      {
        area: "Information architecture",
        description:
          "Reshaped the site around introduction, selected work, expertise, experience, engineering philosophy, and résumé access.",
      },
      {
        area: "Visual direction",
        description:
          "Retained and applied the Obsidian, Stone, and Amber palette, editorial layout, pixel accents, and ordered-dither visual language.",
      },
      {
        area: "Content architecture",
        description:
          "Established typed, shared records for profile, experience, skills, work domains, case studies, and technical principles.",
      },
      {
        area: "Implementation oversight",
        description:
          "Directed the Next.js application structure, portfolio routes, online résumé, and quality workflow while the project remains in progress.",
      },
    ],
    architectureDiagram: {
      title: "How the site is put together",
      description:
        "A conceptual view of the current source organization: shared typed content feeds App Router pages, which are rendered through reusable presentation components. This is a code-architecture map, not a deployment or infrastructure topology.",
      stages: [
        {
          label: "Shared content",
          description: "Typed records under src/data",
          items: [
            "Profile & site metadata",
            "Experience & skills",
            "Work domains & case studies",
            "Engineering principles",
          ],
        },
        {
          label: "App routes",
          description: "Next.js App Router",
          items: [
            "/ — Homepage",
            "/work — Work index",
            "/work/[slug] — Case study",
            "/cv — Online résumé",
          ],
        },
        {
          label: "Presentation",
          description: "Reusable UI and visual primitives",
          items: [
            "Editorial page sections",
            "Case-study templates",
            "Résumé and print layout",
            "Canvas, SVG, and pixel visuals",
          ],
        },
      ],
    },
    visualStudies: [
      {
        id: "eclipse-horizon",
        art: "eclipse-horizon",
        title: "Eclipse horizon",
        label: "Used on homepage",
        caption:
          "The current hero artwork, rendered with the site's Bayer 4×4 dither palette.",
      },
      {
        id: "grid-waves",
        art: "grid-waves",
        title: "Ordered grid waves",
        label: "Renderer study",
        caption:
          "A procedural wave pattern exploring tonal depth within a restrained palette.",
      },
      {
        id: "isometric-cubes",
        art: "isometric-cubes",
        title: "Isometric volume",
        label: "Renderer study",
        caption:
          "A geometric luminance field exploring depth, repetition, and amber accents.",
      },
    ],
    technologyGroups: [
      {
        category: "Application",
        purpose: "Routing and page composition",
        technologies: ["Next.js 16 App Router", "React 19", "TypeScript"],
      },
      {
        category: "Interface system",
        purpose: "Layout, typography, and styling",
        technologies: ["Tailwind CSS 4", "Geist", "Pixelify Sans"],
      },
      {
        category: "Visual rendering",
        purpose: "Procedural artwork and crisp geometric details",
        technologies: ["Canvas 2D", "SVG", "Bayer 4×4 ordered dithering"],
      },
      {
        category: "Quality workflow",
        purpose: "Configured checks for the development branch",
        technologies: ["TypeScript", "ESLint", "GitHub Actions"],
      },
    ],
  },
];

export const PUBLIC_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => study.publicationStatus === "approved"
);

export function getPublicCaseStudy(slug: string) {
  return PUBLIC_CASE_STUDIES.find((study) => study.slug === slug);
}
