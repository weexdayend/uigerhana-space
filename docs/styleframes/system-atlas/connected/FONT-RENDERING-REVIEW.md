# System Atlas — browser font-rendering review

**Status:** Latest completed Chromium font-rendering and layout checks passed on code/styleframe SHA `7c2b7008271c597ad48ac9f6363766c0950d7cc2` · 2026-11-27
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


## Latest completed execution result

On code/styleframe SHA `7c2b7008271c597ad48ac9f6363766c0950d7cc2`, GitHub Actions [PR run #198](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136) passed both CI jobs:

- Typecheck, content-publication checks, System Atlas static copy/SVG integrity, lint, and production build: passed.
- Runtime visual and accessibility QA: passed.
- Playwright: **32 tests passed, 0 failed**, including the selected-font render pass across all ten artboards.
- The geometry contracts passed with both font families loaded, zero out-of-viewBox text, zero intersecting text-node boxes, and zero targeted visual-contract failures.
- The CI runner used Playwright Chromium / Chrome for Testing **159.0.8154.6**.

The targeted visual contracts protect three defects found during screenshot inspection: the tablet hero route crossing its headline, desktop interaction-board copy being obscured by the first panel, and the component-library card action exceeding its content inset.

The [latest completed browser QA artifact](https://github.com/weexdayend/uigerhana-space/actions/runs/45904594136/artifacts/15158165064) contains the 29-file Playwright report and test-results bundle, including the ten PNG specimens and JSON geometry/font report. Artifact digest: `sha256:1e71347429965b017e8518580ad23ddbf23a32afb4cdbcebcbec3c06205fd094`. See [VISUAL-REVIEW.md](./VISUAL-REVIEW.md) for human visual inspection notes and remaining acceptance gates.

The current PR head is documentation-only commit `2dc6cb690011fe0a0c9b4d8f476dca1850b1bedc`, which reconciles evidence references without changing the artboards, application, or tests. Its exact-HEAD CI is running in [PR run #45911865021](https://github.com/weexdayend/uigerhana-space/actions/runs/45911865021); it must complete before that documentation refresh is treated as CI-verified.

This execution validates the static SVG specimens in Chromium, not owner acceptance, the live application's font setup, an accessibility certification of the SVG artboards, or the remaining browser/zoom/print/deployment gates.

## Determinism and limits

The selected fonts are fetched from Google's hosted CSS/font endpoints at test time. This makes the fixture exercise real browser font loading, but it is not a vendored or offline font package. Changes to the upstream font files or a network failure can affect test execution; the exact stylesheet URL is recorded in the JSON report.

The geometric checks are intentionally strict. A failure must be reviewed with its screenshot and bounding-box report before deciding whether it indicates a genuine collision or an intentional text composition. The test does not claim to assess aesthetic quality, color contrast, optical balance, reading order, or assistive-technology behavior of the SVG artwork.

This remains a static-artboard browser test. It does not modify application CSS, Next.js font loading, public content, routes, dependencies, or production UI. Manual review and owner acceptance remain separate.


## Cross-engine static-artboard result

The same ten-artboard fixture was executed under the Chromium, Firefox, and WebKit Playwright projects in run [#45912275133](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133). All three executions loaded Manrope and Plus Jakarta Sans and reported zero out-of-viewBox text, zero text-node intersections, and zero failures in the targeted artboard layout contracts.

The artifact contains one PNG for each of the ten artboards per engine. The JSON's browser-name field in this initial multi-engine run was still hard-coded to “Playwright Chromium”; a follow-up test change records the actual browser name and version. The test result and artifact folder names identify each engine independently.

This closes only automated static-artboard geometry regression under the three Playwright engines. It does not certify native Safari, owner aesthetics, responsive production CSS, actual browser zoom, OS text scaling, or native print behavior.
