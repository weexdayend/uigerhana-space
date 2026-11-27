import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const dataSource = await readFile("src/data/experience.ts", "utf8");
const componentSource = await readFile("src/components/ExperienceSection.tsx", "utf8");
const cssSource = await readFile("src/app/globals.css", "utf8");

assert.equal((dataSource.match(/^\s+id: "/gm) ?? []).length, 2, "The public experience section must retain two source records");
assert.match(dataSource, /id: "saptakarya",[\s\S]*?period: "2021 — Present"/);
assert.match(dataSource, /id: "infomedia",[\s\S]*?period: "2017 — Present"/);
assert.equal((dataSource.match(/^    highlights: \[/gm) ?? []).length, 2, "Both résumé-backed roles must retain their highlight arrays");

assert.match(componentSource, /import \{ EXPERIENCE \} from "@\/data\/experience"/);
assert.match(componentSource, /EXPERIENCE\.map/);
assert.match(componentSource, /role\.period/);
assert.match(componentSource, /role\.title/);
assert.match(componentSource, /role\.organization/);
assert.match(componentSource, /role\.location/);
assert.match(componentSource, /role\.summary/);
assert.match(componentSource, /role\.highlights\.map/);
assert.match(componentSource, /aria-labelledby="experience-title"/);
assert.match(componentSource, /aria-labelledby=\{\x60experience-\$\{role\.id\}\x60\}/);
assert.match(componentSource, /two role periods overlap/i);
assert.doesNotMatch(componentSource, /SKILL_GROUPS|WORK_DOMAINS|PUBLIC_CASE_STUDIES|ENGINEERING_PRINCIPLES/);

assert.match(cssSource, /\.atlas-experience__roles/);
assert.match(cssSource, /@media \(max-width: 60rem\)/);
assert.match(cssSource, /@media \(max-width: 42rem\)/);
assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)/);

process.stdout.write(
  "Experience contract passed: two résumé-backed roles, original overlapping dates, mapped source highlights, separated content domains, responsive and reduced-motion-safe styles.\n"
);
