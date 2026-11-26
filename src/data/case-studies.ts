export type CaseStudyPublicationStatus = "draft" | "approved";
export type CaseStudyProjectStatus = "in-progress" | "completed" | "maintained";

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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
  stack: string[];
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
      "Product direction, information architecture, visual system, content modeling, and application implementation.",
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
        "Build the homepage and online résumé from shared sources so professional facts are not manually duplicated.",
      ],
      bullets: [
        "Next.js App Router, React, and TypeScript.",
        "Tailwind CSS with Geist and Pixelify Sans.",
        "Custom Bayer-dithered canvas visuals.",
        "Print-oriented résumé page with browser Print / Save PDF support.",
      ],
    },
    currentState: {
      heading: "Current state",
      paragraphs: [
        "The first implementation slice establishes the new identity, shared professional data, homepage sections, and an online résumé.",
        "The work is still in progress. Individual project case studies remain gated until their role, status, evidence, and disclosure details are reviewed.",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Canvas 2D"],
  },
];

export const PUBLIC_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => study.publicationStatus === "approved"
);

export function getPublicCaseStudy(slug: string) {
  return PUBLIC_CASE_STUDIES.find((study) => study.slug === slug);
}
