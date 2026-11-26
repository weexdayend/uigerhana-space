import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArchitecture } from "@/components/CaseStudyArchitecture";
import { CaseStudyContributionBreakdown } from "@/components/CaseStudyContributionBreakdown";
import { CaseStudyTechnologyMap } from "@/components/CaseStudyTechnologyMap";
import { CaseStudyVisualGallery } from "@/components/CaseStudyVisualGallery";
import { getPublicCaseStudy, PUBLIC_CASE_STUDIES } from "@/data/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const STATUS_LABELS = {
  "in-progress": "In progress",
  completed: "Completed",
  maintained: "Maintained",
} as const;

export function generateStaticParams() {
  return PUBLIC_CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getPublicCaseStudy(slug);

  if (!study) return { title: "Work" };

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: "/work/" + study.slug },
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
    },
  };
}

function ContentSection({
  heading,
  paragraphs,
  bullets,
}: {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}) {
  return (
    <section className="grid gap-5 border-t border-[#121518]/18 py-8 sm:grid-cols-12 sm:gap-10">
      <h2 className="text-xl font-normal tracking-tight sm:col-span-4">{heading}</h2>
      <div className="space-y-4 sm:col-span-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-[1.8] text-[#121518]/75 sm:text-base">
            {paragraph}
          </p>
        ))}
        {bullets && (
          <ul className="space-y-2 pt-1">
            {bullets.map((bullet) => (
              <li key={bullet} className="grid grid-cols-[12px_1fr] gap-3 text-sm leading-[1.7] text-[#121518]/75">
                <span className="mt-[9px] h-1.5 w-1.5 bg-[#b8680c]" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getPublicCaseStudy(slug);

  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[#f2efe7] text-[#121518]">
      <header className="border-b border-[#121518]/18">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-7 sm:px-10">
          <Link href="/work" className="text-sm text-[#585f5e] transition-colors hover:text-[#8a5a20]">
            ← All work
          </Link>
          <Link href="/cv" className="text-sm transition-colors hover:text-[#8a5a20]">
            Résumé ↗
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[1120px] px-5 py-14 sm:px-10 sm:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">{study.eyebrow}</p>
          <span className="border border-[#121518]/18 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a5a20]">
            {STATUS_LABELS[study.projectStatus]}
          </span>
        </div>
        <h1 className="mt-5 max-w-[16ch] text-[clamp(2.8rem,7vw,6rem)] font-normal leading-[0.94] tracking-[-0.065em]">
          {study.title}
        </h1>
        <p className="mt-7 max-w-[64ch] text-lg leading-[1.75] text-[#121518]/75">{study.summary}</p>

        <div className="mt-12 grid gap-5 border-y border-[#121518]/18 py-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8a5a20]">Context</p>
            <p className="mt-2 text-sm">{study.context}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8a5a20]">Role</p>
            <p className="mt-2 text-sm leading-[1.7]">{study.role}</p>
          </div>
        </div>

        <CaseStudyContributionBreakdown contributions={study.contributions} />
        <CaseStudyArchitecture diagram={study.architectureDiagram} />
        <CaseStudyVisualGallery visuals={study.visualStudies} />

        <div className="mt-2">
          <ContentSection {...study.challenge} />
          <ContentSection {...study.approach} />
          <ContentSection {...study.implementation} />
          <ContentSection {...study.currentState} />
        </div>

        <CaseStudyTechnologyMap groups={study.technologyGroups} />
      </article>

      <footer className="border-t border-[#121518]/18">
        <div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-10">
          <Link href="/work" className="text-sm text-[#585f5e] transition-colors hover:text-[#8a5a20]">
            ← Explore more work
          </Link>
          <Link href="/" className="text-sm transition-colors hover:text-[#8a5a20]">
            UI Gerhana home ↗
          </Link>
        </div>
      </footer>
    </main>
  );
}
