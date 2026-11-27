import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/data/approach.ts", "utf8");
const component = await readFile("src/components/ProcessSection.tsx", "utf8");
const css = await readFile("src/app/globals.css", "utf8");

const principles = [
  ["workflow-first", "01", "Start with the workflow"],
  ["make-complexity-legible", "02", "Make complexity legible"],
  ["ai-with-context", "03", "Build AI with context"],
  ["production-minded", "04", "Think beyond the interface"],
];

assert.equal(
  (source.match(/\bid: "/g) ?? []).length,
  4,
  "The engineering approach must keep exactly four principles"
);

for (const [id, index, title] of principles) {
  assert.ok(source.includes('id: "' + id + '"'), "Missing principle ID: " + id);
  assert.ok(source.includes('index: "' + index + '"'), "Missing principle index: " + index);
  assert.ok(source.includes('title: "' + title + '"'), "Missing principle title: " + title);
}

assert.ok(component.includes('import { ENGINEERING_PRINCIPLES } from "@/data/approach"'));
assert.ok(component.includes("ENGINEERING_PRINCIPLES.map"));
assert.ok(component.includes('id="approach"'));
assert.ok(component.includes('aria-labelledby="approach-title"'));
assert.ok(component.includes('className="atlas-approach__route"'));
assert.ok(component.includes('className="atlas-approach__principles"'));
assert.ok(component.includes("principle.index"));
assert.ok(component.includes("principle.title"));
assert.ok(component.includes("principle.description"));
assert.ok(component.includes("gsap.matchMedia()"));
assert.ok(component.includes("ScrollTrigger"));
assert.ok(component.includes("prefers-reduced-motion: no-preference"));
assert.ok(component.includes("once: true"));
assert.doesNotMatch(component, /pin:\s*true|scrub:/);

for (const unrelatedSource of [
  "EXPERIENCE",
  "SKILL_GROUPS",
  "WORK_DOMAINS",
  "PUBLIC_CASE_STUDIES",
  "PROFILE",
]) {
  assert.ok(
    !component.includes(unrelatedSource),
    "Engineering approach must not import or reference " + unrelatedSource
  );
}

assert.ok(css.includes(".atlas-approach {"));
assert.ok(css.includes("background: var(--atlas-ink)"));
assert.ok(css.includes(".atlas-approach__route {"));
assert.ok(css.includes("@media (max-width: 60rem)"));
assert.ok(css.includes("@media (max-width: 42rem)"));
assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"));

process.stdout.write(
  "Engineering approach contract passed: four approved principles in source order, semantic mapping, separate content domains, GSAP route with reduced-motion guard, responsive fallback.\n"
);
