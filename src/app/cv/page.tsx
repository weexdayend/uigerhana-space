import type { Metadata } from "next";
import Link from "next/link";
import { CvPrintButton } from "@/components/CvPrintButton";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { CERTIFICATIONS, PUBLICATION_PROFILES, SKILL_GROUPS } from "@/data/skills";
import { SITE_META } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Professional résumé of Irvan Gerhana, Product Engineer working across product thinking, interface design, software engineering, enterprise AI, and production systems.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] px-5 py-8 text-[#121518] sm:px-8 sm:py-12 print:min-h-0 print:px-0 print:py-0">
      <div className="no-print mx-auto mb-8 flex max-w-[900px] items-center justify-between gap-4">
        <Link href="/" className="text-sm text-[#121518]/70 transition-colors hover:text-[#b8680c]">← Back to uigerhana.space</Link>
        <CvPrintButton />
      </div>
      <article className="mx-auto max-w-[900px] border border-[#121518]/18 bg-[#f8f6f0] p-6 sm:p-10 lg:p-14 print:max-w-none print:border-0 print:bg-white print:p-0">
        <header className="border-b-2 border-[#121518] pb-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8a5a20]">{PROFILE.positioning} · {SITE_META.location}</p>
          <h1 className="mt-4 text-4xl font-normal tracking-[-0.055em] sm:text-5xl">{PROFILE.displayName}</h1>
          <p className="mt-3 text-base text-[#121518]/70">Independent · Founder · Product Builder</p>
          <p className="mt-5 max-w-[72ch] text-sm leading-[1.75] text-[#121518]/80">{PROFILE.summary}</p>
        </header>

        <section className="cv-section mt-8">
          <h2 className="cv-heading">Professional Experience</h2>
          <div className="mt-5 space-y-8">
            {EXPERIENCE.map((role) => (
              <section key={role.id} className="break-inside-avoid">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-lg font-semibold tracking-tight">{role.title}</h3>
                  <span className="font-mono text-xs text-[#8a5a20]">{role.period}</span>
                </div>
                <p className="mt-1 text-sm text-[#121518]/70">{role.organization} · {role.location}</p>
                <p className="mt-3 text-sm leading-[1.7] text-[#121518]/80">{role.summary}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-[1.65] text-[#121518]/80">
                  {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="cv-section mt-9 break-inside-avoid">
          <h2 className="cv-heading">Technical Skills</h2>
          <div className="mt-4 space-y-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="grid gap-1 sm:grid-cols-[190px_1fr] sm:gap-5">
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <p className="text-sm leading-[1.65] text-[#121518]/80">{group.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section mt-9 break-inside-avoid">
          <h2 className="cv-heading">Certification</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {CERTIFICATIONS.map((certification) => (
              <li key={certification.name}><span className="font-semibold">{certification.name}</span><span className="text-[#121518]/70"> — {certification.issuer}</span></li>
            ))}
          </ul>
        </section>

        <section className="cv-section mt-9 break-inside-avoid">
          <h2 className="cv-heading">Technical Leadership & Publications</h2>
          <p className="mt-4 text-sm leading-[1.7] text-[#121518]/80">
            Focus areas include Enterprise AI Engineering, AI Governance, Context Engineering, Canonical Data Architecture, Agentic Systems, and Distributed Software Architecture.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#121518]/75">
            {PUBLICATION_PROFILES.map((profile) => <span key={profile.platform}>{profile.platform}: {profile.handle}</span>)}
          </div>
        </section>
        <footer className="mt-10 border-t border-[#121518]/20 pt-4 text-xs text-[#121518]/55">{PROFILE.displayName} · {PROFILE.positioning} · {SITE_META.timezone}</footer>
      </article>
    </main>
  );
}
