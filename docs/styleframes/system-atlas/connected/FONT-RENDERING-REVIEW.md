# System Atlas — browser font-rendering review

**Status:** Automated browser-rendering check added · CI execution pending  
**Scope:** Static SVG artboards only  
**Application typography:** Unchanged — the portfolio application still uses its existing Geist setup  
**Production implementation:** Not authorized

## Why a separate browser pass exists

The System Atlas SVG artboards declare Manrope for display/headings and Plus Jakarta Sans for body/interface. They do not embed font files. The portfolio application's current Next.js layout loads Geist, Geist Mono, and Pixelify Sans. Therefore, screenshots of the existing application cannot establish how the static System Atlas artboards look with the selected typefaces.

## Browser fixture

A dedicated Playwright test, \`tests/e2e/system-atlas-styleframes.spec.ts\`, renders all ten connected SVG artboards in Chromium. The fixture loads the selected Manrope and Plus Jakarta Sans variable families through the Google Fonts CSS2 endpoint, then waits for both font families to finish loading before measuring text geometry.

For every artboard it:
- confirms both selected font families loaded in Chromium;
- measures every SVG text node with \`getBBox()\`;
- fails when a text bounding box crosses the artboard's \`viewBox\`;
- checks pairwise text-node bounding-box intersections and fails on collisions;
- captures a full-page PNG and a JSON geometry report in the Playwright test artifact directory.

The existing CI browser job uploads \`test-results/\` and \`playwright-report/\`, so these captures and diagnostics are retained with the workflow run.

## Determinism and limits

The selected fonts are fetched from Google's hosted CSS/font endpoints at test time. This makes the fixture exercise real browser font loading, but it is not a vendored or offline font package. Changes to the upstream font files or a network failure can affect test execution; the exact stylesheet URL is recorded in the JSON report.

The geometric checks are intentionally strict. A failure must be reviewed with its screenshot and bounding-box report before deciding whether it indicates a genuine collision or an intentional text composition. The test does not claim to assess aesthetic quality, color contrast, optical balance, reading order, or assistive-technology behavior of the SVG artwork.

This remains a static-artboard browser test. It does not modify application CSS, Next.js font loading, public content, routes, dependencies, or production UI. Manual review and owner acceptance remain separate.
