import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const component = await readFile("src/components/ContactAndFooter.tsx", "utf8");
const css = await readFile("src/app/globals.css", "utf8");

const imports = component.match(/^import .+$/gm) ?? [];
assert.deepEqual(
  imports,
  [
    'import { PROFILE } from "@/data/profile";',
    'import { SITE_META } from "@/data/site";',
    'import { PUBLIC_PROFILES } from "@/data/writing";',
  ],
  "Contact and footer must use only approved identity, site, and public-profile data sources"
);

for (const required of [
  'className="atlas-contact-footer"',
  'data-band="dark"',
  'id="contact"',
  'aria-labelledby="contact-title"',
  'id="contact-title"',
  "PROFILE.displayName",
  "PROFILE.positioning",
  "SITE_META.location",
  "SITE_META.brand",
  "PUBLIC_PROFILES.map",
  'href="/cv"',
  'href="#work"',
  'href="#top"',
  'aria-label="Public profiles and site links"',
  'target="_blank"',
  'rel="noopener noreferrer"',
  "No direct public contact channel is listed.",
]) {
  assert.ok(component.includes(required), "Missing contact/footer contract: " + required);
}

assert.doesNotMatch(component, /mailto:|tel:|@gmail\.com|@outlook\.com|@yahoo\.com/i);
assert.equal((component.match(/PUBLIC_PROFILES\.map/g) ?? []).length, 1);
assert.equal((component.match(/href="#work"/g) ?? []).length, 1);
assert.equal((component.match(/href="\/cv"/g) ?? []).length, 2);

const contactStyles = css.slice(css.indexOf(".atlas-contact-footer {"));
assert.ok(contactStyles.length > 0, "System Atlas contact and footer styles are missing");
for (const selector of [
  ".atlas-contact {",
  ".atlas-contact__content {",
  ".atlas-contact__title {",
  ".atlas-contact__actions {",
  ".atlas-contact__footer {",
  ".atlas-contact__navigation {",
  ".atlas-contact__profile-link:focus-visible",
  "@media (max-width: 60rem)",
  "@media (max-width: 42rem)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  assert.ok(contactStyles.includes(selector), "Missing contact/footer style contract: " + selector);
}

for (const token of [
  "var(--deep-mineral)",
  "var(--limestone)",
  "var(--fog)",
  "var(--sea-glass)",
  "var(--contour-line)",
  "var(--font-manrope)",
  "var(--font-plus-jakarta-sans)",
]) {
  assert.ok(contactStyles.includes(token), "Missing System Atlas semantic role: " + token);
}

assert.ok(contactStyles.includes("grid-template-columns: minmax(0, 1.1fr) minmax(16rem, 0.9fr)"));
assert.ok(contactStyles.includes("grid-template-columns: minmax(0, 1fr)"));
assert.doesNotMatch(
  contactStyles,
  /(?:padding|margin|gap):[^;]*\b(?:8|12|16)px\b/,
  "Contact spacing should use root-relative values rather than fixed 8/12/16px insets"
);

process.stdout.write(
  "Contact/footer contract passed: approved identity and profile sources, existing internal destinations, no invented direct contact channel, semantic accessible links, responsive System Atlas layout and reduced-motion states.\n"
);
