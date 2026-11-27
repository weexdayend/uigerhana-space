import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillsSource = await readFile("src/data/skills.ts", "utf8");
const projectsSource = await readFile("src/data/projects.ts", "utf8");
const componentSource = await readFile("src/components/ExpertiseSection.tsx", "utf8");
const cssSource = await readFile("src/app/globals.css", "utf8");

const expectedGroups = [
  "product-design",
  "frontend",
  "backend",
  "ai-data",
  "infrastructure",
];

for (const id of expectedGroups) {
  assert.match(skillsSource, new RegExp('id: "' + id + '"'), "Missing source-backed group: " + id);
}
assert.equal((skillsSource.match(/id: "/g) ?? []).length, 5, "Public capability source must retain exactly five groups");
assert.match(skillsSource, /export const SKILL_GROUPS: SkillGroup\[\] = \[/);

assert.match(componentSource, /SKILL_GROUPS\.map/);
assert.match(componentSource, /DISCIPLINE_LABELS/);
assert.match(componentSource, /Professional expertise/);
assert.match(componentSource, /Technical capability/);
assert.match(componentSource, /does not imply a separate/);
assert.match(componentSource, /aria-labelledby="expertise-title"/);
assert.match(componentSource, /<ol className="atlas-expertise__groups">/);
assert.match(componentSource, /<ul className="atlas-expertise__skills"/);

assert.match(projectsSource, /export const WORK_DOMAINS: WorkDomain\[\] = \[/);
assert.match(componentSource, /Representative skills and technologies are drawn from the existing/);
assert.doesNotMatch(componentSource, /WORK_DOMAINS|PUBLIC_CASE_STUDIES|EXPERIENCE|ENGINEERING_PRINCIPLES/);
assert.match(cssSource, /\.atlas-expertise/);
assert.match(cssSource, /@media \(max-width: 58rem\)/);
assert.match(cssSource, /@media \(max-width: 42rem\)/);
assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)/);

process.stdout.write(
  "Expertise contract passed: five existing skill groups, explicit capability taxonomy, generalized work-domain separation, semantic lists, responsive and reduced-motion styles.\n"
);
