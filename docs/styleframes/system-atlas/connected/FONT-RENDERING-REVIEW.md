# System Atlas — browser font-rendering review

**Status:** Post-fix browser font-rendering and layout checks passed on exact SHA `a615ad41286dc85381d063823f7a56bac8f3c500` · 2026-11-27
**Scope:** Static SVG artboards only  
**Application typography:** Unchanged — the portfolio application still uses its existing Geist setup  
**Production implementation:** Not authorized

## Why a separate browser pass exists

The System Atlas SVG artboards declare Manrope for display/headings and Plus Jakarta Sans for body/interface. They do not embed font files. The portfolio application's current Next.js layout loads Geist, Geist Mono, and Pixelify Sans. Therefore, screenshots of the existing application cannot establish how the static System Atlas artboards look with the selected typefaces.

## Browser fixture

A dedicated Playwright test, `tests/e2e/system-atlas-styleframes.spec.ts`, renders all ten connected SVG artboards in Chromium. The fixture loads the selected Manrope and Plus Jakarta Sans variable families through the Google Fonts CSS2 endpoint, then waits for both font families to finish loading before measuring text geometry.

For every artboard it:
- confirms both selected font families loaded in Chromium;
- measures every SVG text node with `getBBox()`;
- fails when a text bounding box crosses the artboard's `viewBox`;
- checks pairwise text-node bounding-box intersections and fails on collisions;
- captures a full-page PNG and a JSON geometry report in the Playwright test artifact directory.

The existing CI browser job uploads `test-results/` and `playwright-report/`, so these captures and diagnostics are retained with the workflow run.


## Latest execution result

On exact code SHA `a615ad41286dc85381d063823f7a56bac8f3c500`, GitHub Actions [run #190](https://github.com/weexdayend/uigerhana-space/actions/runs/45902670980) passed both CI jobs:

- Typecheck, content-publication checks, System Atlas static copy/SVG integrity, lint, and production build: passed.
- Runtime visual and accessibility QA: passed.
- Playwright: **32 tests passed, 0 failed**, including the selected-font render pass across all ten artboards.
- The geometry report records both font families loaded, with zero out-of-viewBox text, zero intersecting text-node boxes, and zero targeted visual-contract failures.

The targeted visual contracts protect three defects found during screenshot inspection: the tablet hero route crossing its headline, desktop interaction-board copy being obscured by the first panel, and the component-library card action exceeding its content inset.

The [post-fix browser QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45902670980/artifacts/15155194933) contains the ten PNG specimens and JSON report. See [VISUAL-REVIEW.md](./VISUAL-REVIEW.md) for the human visual inspection notes and remaining acceptance gates.

This execution validates the static SVG specimens in Chromium, not owner acceptance, the live application's font setup, an accessibility certification of the SVG artboards, or the remaining browser/zoom/print/deployment gates.

## Determinism and limits

The selected fonts are fetched from Google's hosted CSS/font endpoints at test time. This makes the fixture exercise real browser font loading, but it is not a vendored or offline font package. Changes to the upstream font files or a network failure can affect test execution; the exact stylesheet URL is recorded in the JSON report.

The geometric checks are intentionally strict. A failure must be reviewed with its screenshot and bounding-box report before deciding whether it indicates a genuine collision or an intentional text composition. The test does not claim to assess aesthetic quality, color contrast, optical balance, reading order, or assistive-technology behavior of the SVG artwork.

This remains a static-artboard browser test. It does not modify application CSS, Next.js font loading, public content, routes, dependencies, or production UI. Manual review and owner acceptance remain separate.
