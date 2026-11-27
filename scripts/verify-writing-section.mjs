import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/data/writing.ts", "utf8");
const component = await readFile("src/components/WritingSection.tsx", "utf8");
const css = await readFile("src/app/globals.css", "utf8");

const articles = [
  {
    id: "article-engineering-memory",
    title: "What Leaves When an Engineer Leaves",
    publishedAt: "2026-07-01",
    publishedLabel: "1 Jul 2026",
    readingTime: "17 min read",
    href: "https://medium.com/@weexdayend/what-leaves-when-an-engineer-leaves-a91d735ba537",
  },
  {
    id: "article-enterprise-reconciliation",
    title: "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
    publishedAt: "2026-06-26",
    publishedLabel: "26 Jun 2026",
    readingTime: "5 min read",
    href: "https://medium.com/@weexdayend/why-payment-gateways-dont-solve-enterprise-reconciliation-cde4b403dbbd",
  },
  {
    id: "article-canonical-data-architecture",
    title: "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
    publishedAt: "2026-06-24",
    publishedLabel: "24 Jun 2026",
    readingTime: "6 min read",
    href: "https://medium.com/@weexdayend/the-hidden-layer-every-ai-agent-needs-canonical-data-architecture-8b7367c5374d",
  },
];

assert.equal(
  (source.match(/id: "article-[^"]+"/g) ?? []).length,
  articles.length,
  "The public writing list must retain exactly the three approved article records"
);

for (const article of articles) {
  for (const [field, value] of Object.entries(article)) {
    assert.ok(
      source.includes(field + ': "' + value + '"'),
      "Missing source-backed article " + field + ": " + value
    );
  }
}

for (const [id, url] of [
  ["dev", "https://dev.to/uigerhana"],
  ["medium", "https://medium.com/@weexdayend"],
]) {
  assert.ok(source.includes('id: "' + id + '"'), "Missing publication profile: " + id);
  assert.ok(source.includes('href: "' + url + '"'), "Missing verified publication URL: " + url);
}

assert.ok(component.includes('import { FEATURED_WRITING, PUBLICATION_PROFILES } from "@/data/writing"'));
assert.equal((component.match(/FEATURED_WRITING\.map/g) ?? []).length, 1);
assert.equal((component.match(/PUBLICATION_PROFILES\.map/g) ?? []).length, 1);
assert.ok(component.includes('id="writing"'));
assert.ok(component.includes('aria-labelledby="writing-title"'));
assert.ok(component.includes("article.title"));
assert.ok(component.includes("article.summary"));
assert.ok(component.includes("article.href"));
assert.ok(component.includes("article.publishedAt"));
assert.ok(component.includes("article.publishedLabel"));
assert.ok(component.includes("article.readingTime"));
assert.ok(component.includes("article.category"));
assert.ok(component.includes("article.publication"));
assert.ok(component.includes("dateTime={article.publishedAt}"));
assert.ok(component.includes('target="_blank"'));
assert.ok(component.includes('rel="noopener noreferrer"'));
assert.ok(component.includes('aria-label="Publication profiles"'));

const imports = component.match(/^import .+$/gm) ?? [];
assert.deepEqual(
  imports,
  ['import { FEATURED_WRITING, PUBLICATION_PROFILES } from "@/data/writing";'],
  "Writing presentation must use only its dedicated writing and publication data source"
);

const writingStyles = css.slice(css.indexOf(".atlas-writing {"));
assert.ok(writingStyles.length > 0, "System Atlas writing styles are missing");
for (const token of [
  ".atlas-writing__header",
  ".atlas-writing__articles",
  ".atlas-writing__article",
  ".atlas-writing__article-link:focus-visible",
  ".atlas-writing__directory",
  ".atlas-writing__profile-link",
]) {
  assert.ok(writingStyles.includes(token), "Missing writing presentation style: " + token);
}
assert.ok(writingStyles.includes("grid-template-columns: repeat(3, minmax(0, 1fr))"));
assert.ok(writingStyles.includes("grid-template-columns: repeat(2, minmax(0, 1fr))"));
assert.ok(writingStyles.includes("grid-template-columns: minmax(0, 1fr)"));
assert.ok(writingStyles.includes("@media (max-width: 60rem)"));
assert.ok(writingStyles.includes("@media (max-width: 42rem)"));
assert.ok(writingStyles.includes("@media (prefers-reduced-motion: reduce)"));
assert.ok(writingStyles.includes("var(--atlas-inset-light)"));
assert.ok(writingStyles.includes("var(--light-secondary-text)"));
assert.match(
  writingStyles,
  /\.atlas-writing__article-footer\s*\{[^}]*flex-wrap:\s*wrap;/s,
  "Article publication metadata must wrap when the text scale increases"
);
assert.doesNotMatch(
  writingStyles,
  /(?:padding|margin|gap):[^;]*\b(?:8|12|16)px\b/,
  "Writing spacing should use root-relative values rather than fixed 8/12/16px insets"
);

process.stdout.write(
  "Writing section contract passed: exactly three source-backed articles, verified publication profiles, separated content domains, semantic external links, responsive System Atlas layout, reduced-motion and focus states.\n"
);
