import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile("src/app/cv/page.tsx", "utf8");
const button = await readFile("src/components/CvPrintButton.tsx", "utf8");
const css = await readFile("src/app/globals.css", "utf8");

const imports = page.match(/^import .+$/gm) ?? [];
assert.deepEqual(
  imports,
  [
    'import type { Metadata } from "next";',
    'import Link from "next/link";',
    'import { CvPrintButton } from "@/components/CvPrintButton";',
    'import { EXPERIENCE } from "@/data/experience";',
    'import { PROFILE } from "@/data/profile";',
    'import { CERTIFICATIONS, SKILL_GROUPS } from "@/data/skills";',
    'import { PUBLICATION_PROFILES } from "@/data/writing";',
    'import { SITE_META } from "@/data/site";',
  ],
  "Résumé must stay connected to the approved source records"
);

for (const required of [
  'data-resume-route',
  'data-resume-document',
  'aria-labelledby="resume-name"',
  "PROFILE.displayName",
  "PROFILE.positioning",
  "PROFILE.context.join",
  "PROFILE.summary",
  "SITE_META.location",
  "SITE_META.timezone",
  "EXPERIENCE.map",
  "role.period",
  "role.organization",
  "role.location",
  "role.summary",
  "role.highlights.map",
  "SKILL_GROUPS.map",
  "group.skills.join",
  "CERTIFICATIONS.map",
  "PUBLICATION_PROFILES.map",
  'href={profile.href}',
  'target="_blank"',
  'rel="noopener noreferrer"',
  "resume-document-footer",
]) {
  assert.ok(page.includes(required), "Missing résumé source/layout contract: " + required);
}

for (const required of [
  'id="experience"',
  'id="skills"',
  'id="certifications"',
  'id="publications"',
  'data-resume-role={role.id}',
  'data-resume-skill-group={group.id}',
  'aria-label="Publication profiles"',
]) {
  assert.ok(page.includes(required), "Missing résumé navigation/data contract: " + required);
}

assert.doesNotMatch(
  page,
  /mailto:|tel:|@gmail\.com|@outlook\.com|@yahoo\.com/i,
  "Résumé must not invent direct contact details"
);
assert.doesNotMatch(page, /Independent · Founder · Product Builder/, "Context labels must come from PROFILE.context");
assert.ok(button.includes("window.print()"), "Print control must invoke the native print flow");
assert.ok(button.includes('className="resume-print-button"'));

for (const selector of [
  ".resume-page {",
  ".resume-chrome {",
  ".resume-chrome__inner {",
  ".resume-document {",
  ".resume-header {",
  ".resume-section__heading {",
  ".resume-role__header {",
  ".resume-role__highlights {",
  ".resume-skill-row {",
  ".resume-publication-link:focus-visible",
  "@media (max-width: 48rem)",
  "@media (max-width: 24rem)",
  "@page {",
  "@media print {",
  ".resume-chrome {\n    display: none !important;",
  ".resume-role,\n  .resume-skill-row,\n  .resume-certification,\n  .resume-publication-link {\n    break-inside: avoid-page;",
]) {
  assert.ok(css.includes(selector), "Missing résumé responsive/print style contract: " + selector);
}

for (const token of [
  "var(--atlas-ink)",
  "var(--deep-mineral)",
  "var(--limestone)",
  "var(--sea-glass)",
  "var(--signal-copper)",
  "var(--font-manrope)",
  "var(--font-plus-jakarta-sans)",
  "var(--font-geist-mono)",
]) {
  assert.ok(css.includes(token), "Missing System Atlas résumé token/font: " + token);
}

assert.match(css, /@page\s*\{\s*size:\s*A4 portrait;\s*margin:\s*16mm 14mm;/);
assert.match(css, /\.resume-document-footer\s*\{[^}]*break-inside:\s*auto;/s);
assert.match(css, /\.resume-document-footer\s*\{[^}]*margin-top:\s*0\.9rem\s*!important;/s);
assert.match(css, /\.resume-role__highlights\s*\{[^}]*line-height:\s*1\.45\s*!important;/s);
assert.match(css, /\.resume-document\s*\{[^}]*width:\s*min\(calc\(100% - 2rem\), 58\.75rem\)/s);
assert.match(css, /\.resume-document\s*\{[^}]*background:\s*#f8f6f0/s);
assert.doesNotMatch(
  css.slice(css.indexOf(".resume-page {"), css.indexOf("\n\n.hero-shell::before")),
  /(?:padding|margin|gap):[^;]*\b(?:8|12|16)px\b/,
  "Résumé inset and spacing rules must remain root-relative"
);

process.stdout.write(
  "Résumé integrity passed: approved source records, all experience/skill/certification/publication mappings, accessible page structure, no invented contact details, System Atlas typography/tokens, responsive reflow, and A4 print contracts.\n"
);
