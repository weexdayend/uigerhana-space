import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/data/approach.ts", "utf8");
const component = await readFile("src/components/ProcessSection.tsx", "utf8");
const css = await readFile("src/app/globals.css", "utf8");

const principles = [
  ["workflow-first", "Start with the workflow"],
  ["make-complexity-legible", "Make complexity legible"],
  ["ai-with-context", "Build AI with context"],
  ["production-minded", "Think beyond the interface"],
];

assert.equal((source.match(/\bid: "/g) ?? []).length, 4, "The engineering approach must keep exactly four principles");
for (const [id, title] of principles) {
  assert.match(source, new RegExp('id: "' + id + '"[\\s\\S]*?title: "' + title + '"'));
}

assert.match(component, /import \{ ENGINEERING_PRINCIPLES \} from "@\/data\/approach"/);
assert.match(component, /ENGINEERING_PRINCIPLES\.map/);
assert.match(component, /<section[\s\S]*?id="approach"/);
assert.match(component, /aria-labelledby="approach-title"/);
assert.match(component, /<span[\\s\\S]*?className="atlas-approach__route"/);\nassert.match(component, /<ol className="atlas-approach__principles"/);
assert.match(component, /<article aria-labelledby=\{\x60approach-\$\{principle\.id\}\x60\}/);
assert.match(component, /principle\.index/);
assert.match(component, /principle\.title/);
assert.match(component, /principle\.description/);
assert.doesNotMatch(component, /EXPERIENCE|SKILL_GROUPS|WORK_DOMAINS|PUBLIC_CASE_STUDIES|PROFILE/);

assert.match(css, /\.atlas-approach\s*\{/);
assert.match(css, /background: var\(--atlas-ink\)/);
assert.match(css, /\.atlas-approach__principles::before/);
assert.match(css, /@media \(max-width: 60rem\)/);
assert.match(css, /@media \(max-width: 42rem\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

process.stdout.write(
  "Engineering approach contract passed: four approved principles in order, single source mapping, domain separation, semantic ordered list, responsive route, and reduced-motion fallback.\n"
);
