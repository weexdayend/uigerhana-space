import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

const STYLEFRAME_ROOT = path.join(
  process.cwd(),
  "docs",
  "styleframes",
  "system-atlas",
  "connected"
);

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:wght@200..800&display=swap";

const ARTBOARDS = [
  { name: "home-desktop", file: "home-desktop.svg", width: 1440, height: 5740 },
  { name: "home-tablet", file: "home-tablet.svg", width: 834, height: 5200 },
  { name: "home-mobile", file: "home-mobile.svg", width: 390, height: 7850 },
  { name: "work-index", file: "work-index.svg", width: 1440, height: 2580 },
  { name: "case-study", file: "case-study.svg", width: 1440, height: 3920 },
  { name: "resume", file: "resume.svg", width: 1440, height: 2200 },
  { name: "component-library", file: "component-library.svg", width: 1440, height: 2180 },
  { name: "interaction-states-desktop", file: "interaction-states-desktop.svg", width: 1440, height: 1660 },
  { name: "interaction-states-mobile", file: "interaction-states-mobile.svg", width: 390, height: 1810 },
  { name: "motion-storyboard", file: "motion-storyboard.svg", width: 1440, height: 1500 },
] as const;

test("renders all System Atlas artboards with the selected fonts and no text collisions", async ({ page }, testInfo) => {
  test.setTimeout(90_000);

  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.setContent(
    [
      "<!doctype html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '<link rel="stylesheet" href="' + FONT_STYLESHEET + '">',
      "<style>",
      "html, body { margin: 0; padding: 0; background: #f4f4f0; }",
      "body { width: max-content; }",
      "svg { display: block; max-width: none; height: auto; }",
      "</style>",
      "</head>",
      "<body></body>",
      "</html>",
    ].join(""),
    { waitUntil: "networkidle", timeout: 30_000 }
  );

  const fontLoad = await page.evaluate(async () => {
    const [manropeFaces, jakartaFaces] = await Promise.all([
      document.fonts.load('600 32px "Manrope"', "System Atlas"),
      document.fonts.load('400 16px "Plus Jakarta Sans"', "System Atlas"),
    ]);
    await document.fonts.ready;

    return {
      manrope: manropeFaces.length,
      plusJakartaSans: jakartaFaces.length,
      loadedFaces: Array.from(document.fonts)
        .filter((face) => face.status === "loaded")
        .map((face) => ({ family: face.family, weight: face.weight, style: face.style })),
    };
  });

  expect(fontLoad.manrope, "Manrope must be downloaded and loaded in Chromium").toBeGreaterThan(0);
  expect(fontLoad.plusJakartaSans, "Plus Jakarta Sans must be downloaded and loaded in Chromium").toBeGreaterThan(0);

  const reports: Array<{
    name: string;
    width: number;
    height: number;
    textNodes: number;
    outOfBounds: Array<{ text: string; x: number; y: number; right: number; bottom: number }>;
    overlaps: Array<{ first: string; second: string; area: number }>;
  }> = [];

  for (const artboard of ARTBOARDS) {
    const source = await readFile(path.join(STYLEFRAME_ROOT, artboard.file), "utf8");
    const markup = source.replace(/^\s*<\?xml[^?]*\?>\s*/, "");

    await page.setViewportSize({ width: artboard.width, height: 900 });
    await page.locator("body").evaluate((body, svgMarkup) => {
      body.innerHTML = svgMarkup;
    }, markup);
    await page.evaluate(() => document.fonts.ready);

    const layout = await page.locator("svg").evaluate((element) => {
      const svg = element as SVGSVGElement;
      const viewBox = svg.viewBox.baseVal;
      const textNodes = Array.from(svg.querySelectorAll<SVGTextElement>("text"));
      const boxes = textNodes
        .map((element) => {
          const box = element.getBBox();
          return {
            text: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 140),
            x: box.x,
            y: box.y,
            right: box.x + box.width,
            bottom: box.y + box.height,
          };
        })
        .filter((box) => box.text.length > 0);

      const outOfBounds = boxes.filter(
        (box) =>
          box.x < -1 ||
          box.y < -1 ||
          box.right > viewBox.width + 1 ||
          box.bottom > viewBox.height + 1
      );

      const overlaps: Array<{ first: string; second: string; area: number }> = [];
      for (let firstIndex = 0; firstIndex < boxes.length; firstIndex += 1) {
        const first = boxes[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < boxes.length; secondIndex += 1) {
          const second = boxes[secondIndex];
          const width = Math.min(first.right, second.right) - Math.max(first.x, second.x);
          const height = Math.min(first.bottom, second.bottom) - Math.max(first.y, second.y);
          const area = width * height;
          if (width > 1 && height > 1 && area > 4) {
            overlaps.push({
              first: first.text,
              second: second.text,
              area: Math.round(area * 100) / 100,
              intersectionWidth: Math.round(width * 100) / 100,
              intersectionHeight: Math.round(height * 100) / 100,
            });
          }
        }
      }

      return {
        width: viewBox.width,
        height: viewBox.height,
        textNodes: boxes.length,
        outOfBounds,
        overlaps,
      };
    });

    reports.push({ name: artboard.name, ...layout });

    await page.screenshot({
      path: testInfo.outputPath("system-atlas-" + artboard.name + ".png"),
      fullPage: true,
      animations: "disabled",
    });
  }

  const reportPath = testInfo.outputPath("system-atlas-font-rendering.json");
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(
    reportPath,
    JSON.stringify(
      {
        fontStylesheet: FONT_STYLESHEET,
        fontLoad,
        browser: "Playwright Chromium",
        reports,
      },
      null,
      2
    ),
    "utf8"
  );

  expect(pageErrors, "No browser runtime errors while rendering the artboards").toEqual([]);
  expect(
    reports.filter((report) => report.outOfBounds.length > 0).map((report) => ({
      artboard: report.name,
      outOfBounds: report.outOfBounds,
    })),
    "All text must remain within its SVG viewBox using the selected font families"
  ).toEqual([]);
  expect(
    reports.filter((report) => report.overlaps.length > 0).map((report) => ({
      artboard: report.name,
      overlaps: report.overlaps,
    })),
    "Text nodes must not collide after the selected fonts are loaded"
  ).toEqual([]);
});
