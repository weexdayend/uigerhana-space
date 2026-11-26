"use client";

import React, { useState } from "react";
import { CONTACT_COPY, SITE_META } from "@/data/site";
import { PixelMark } from "@/components/PixelGraphics";

const FOOTER_COLS = [
  {
    heading: "Contact",
    links: [
      { label: SITE_META.email, href: `mailto:${SITE_META.email}` },
      { label: SITE_META.location, href: null },
      { label: SITE_META.timezone, href: null },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "SaaS & web platforms", href: "#services" },
      { label: "Agentic AI workflows", href: "#services" },
      { label: "Custom storefronts", href: "#services" },
      { label: "Design & interfaces", href: "#services" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Case studies", href: "#work" },
      { label: "How I work", href: "#process" },
      { label: "Open source", href: "#open-source" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Field notes", href: "#notes" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { label: "GitHub ↗", href: SITE_META.githubUrl, external: true },
      { label: "LinkedIn ↗", href: SITE_META.linkedinUrl, external: true },
      { label: "X / Twitter ↗", href: SITE_META.xUrl, external: true },
    ],
  },
];

export function ContactAndFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_META.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div data-band="dark" className="bg-[#0b0e11] text-[#e8e4d8]">
      {/* ── Contact Section ── */}
      <section id="contact" className="pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Heading + Direct Actions + Social Grid */}
          <div className="flex flex-col justify-between pb-12 lg:col-span-6 lg:pb-20">
            <div>
              <h2 className="max-w-[14ch] text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.06] tracking-[-0.03em]">
                {CONTACT_COPY.heading}
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE_META.email}?subject=${encodeURIComponent("Project inquiry — UI Gerhana")}`}
                  className="bg-[#f2efe7] px-5 py-2.5 text-sm text-[#121518] transition-colors hover:bg-[#f0b765]"
                >
                  Email me
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cursor-pointer border border-[#e8e4d8]/28 px-5 py-2.5 text-sm transition-colors hover:border-[#f0b765]"
                >
                  {copied ? "Copied ✓" : SITE_META.email}
                </button>
              </div>
            </div>

            {/* Social Tile Grid */}
            <div className="mt-14 flex items-stretch border border-[#e8e4d8]/18">
              <div
                aria-hidden="true"
                className="dither-band-dark hidden w-3.5 shrink-0 border-r border-[#e8e4d8]/18 sm:block"
              />
              <div className="grid flex-1 sm:grid-cols-2">
                <a
                  href={SITE_META.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between border-b border-[#e8e4d8]/18 p-5 transition-colors hover:bg-[#e8e4d8]/[0.03] sm:border-r sm:border-b-0 sm:p-6"
                >
                  <span className="font-mono text-xs text-[#f0b765]">↗</span>
                  <div className="mt-6">
                    <div className="text-sm">GitHub</div>
                    <div className="mt-0.5 text-xs text-[#e8e4d8]/50">Code & open source</div>
                  </div>
                </a>
                <div className="grid grid-rows-2">
                  <a
                    href={SITE_META.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-b border-[#e8e4d8]/18 px-5 py-3.5 transition-colors hover:bg-[#e8e4d8]/[0.03]"
                  >
                    <span className="text-sm">LinkedIn</span>
                    <span className="font-mono text-xs text-[#e8e4d8]/50">↗</span>
                  </a>
                  <a
                    href={SITE_META.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-[#e8e4d8]/[0.03]"
                  >
                    <span className="text-sm">X / Twitter</span>
                    <span className="font-mono text-xs text-[#e8e4d8]/50">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code Window */}
          <div className="flex items-end lg:col-span-6">
            <div className="w-full rounded-tl border-t border-r border-l border-[#121518]/20 bg-[#f2efe7] p-5 text-[#121518] sm:p-7">
              <div className="flex items-center justify-between border-b border-dashed border-[#121518]/18 pb-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                  <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                  <span className="h-2 w-2 rounded-full border border-[#121518]/30" />
                </div>
                <span className="font-mono text-[11px] text-[#585f5e]">project.ts</span>
              </div>
              <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-[1.75] text-[#121518]/85 sm:text-[13px]">
                <code>{`type Project = {
  founder: string
  goal: "saas" | "ai" | "storefront" | "design-system"
  timeline: string
}

export async function startProject(p: Project) {
  const scope = await alignOnDeliverables(p)

  return {
    owner: "you",
    codebase: "in your repository",
    weeklyStagingBuilds: true,
    vendorLockIn: undefined,
    contact: "${SITE_META.email}",
    scope,
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="mt-20 sm:mt-28">
        {/* Dithered pixel edge band */}
        <div className="dither-band-dark h-1.5" aria-hidden="true" />

        {/* Large brand wordmark + tagline */}
        <div className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-10 sm:pt-20">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <PixelMark className="h-9 w-9 text-[#e8e4d8]" />
                <span className="font-pixel text-[clamp(2.4rem,4.2vw,3.6rem)] font-bold leading-none tracking-tight text-[#e8e4d8]">
                  {SITE_META.brand}
                </span>
              </div>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[#e8e4d8]/50">
                Product engineer in Bandung, working worldwide. Web apps, SaaS
                platforms, AI workflows, and design systems built from pixel to
                production.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <a
                href="#contact"
                className="inline-block border border-[#e8e4d8]/22 px-6 py-3 text-sm text-[#e8e4d8] transition-colors hover:border-[#f0b765] hover:bg-[#f0b765] hover:text-[#0b0e11]"
              >
                Start a project →
              </a>
            </div>
          </div>
        </div>

        {/* 5-Column Directory Grid with 1px borders */}
        <div className="mx-auto max-w-[1360px] px-5 pt-14 sm:px-10">
          <div className="grid gap-px border border-[#e8e4d8]/14 bg-[#e8e4d8]/14 sm:grid-cols-2 lg:grid-cols-5">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="bg-[#0b0e11] p-6">
                <div className="mb-5 text-sm font-medium text-[#e8e4d8]">
                  {col.heading}
                </div>
                <ul className="space-y-2.5 text-sm text-[#e8e4d8]/55">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={
                            "external" in link && link.external
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            "external" in link && link.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="transition-colors hover:text-[#e8e4d8]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span>{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-10">
          <p className="text-xs text-[#e8e4d8]/35">
            © {SITE_META.brand} · {SITE_META.handle}
          </p>
          <div className="flex items-center gap-6 text-xs text-[#e8e4d8]/45">
            <a
              href={SITE_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8e4d8]"
            >
              GitHub
            </a>
            <a
              href={SITE_META.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8e4d8]"
            >
              LinkedIn
            </a>
            <a
              href={SITE_META.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8e4d8]"
            >
              X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
