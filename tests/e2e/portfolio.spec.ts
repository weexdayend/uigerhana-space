import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "wide desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet landscape", width: 1024, height: 768 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small mobile", width: 360, height: 800 },
] as const;
const ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"] as const;
const A11Y_VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

test.describe("responsive homepage runtime", () => {
  for (const viewport of VIEWPORTS) {
    test(`renders without clipped hero copy or document overflow at ${viewport.name}`, async ({ page }, testInfo) => {
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto("/", { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("link", { name: /Explore selected work/ })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const lines = Array.from(document.querySelectorAll<HTMLElement>(".hero-organic__title-line, .hero-organic__title-second"));
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          titleOverflows: lines.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => ({
            text: el.textContent?.trim(), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth,
          })),
        };
      });
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.titleOverflows).toEqual([]);
      expect(runtimeErrors).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath("homepage-full-page.png"),
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});

test.describe("route runtime smoke", () => {
  for (const route of ROUTES) {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      test(`${route} responds and retains main content at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.status(), `Unexpected response for ${route}`).toBe(200);
        await expect(page.locator("main").first()).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
        const widths = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
        expect(widths.body).toBeLessThanOrEqual(widths.viewport + 1);
      });
    }
  }
});

test.describe("keyboard and motion behavior", () => {
  test("skip link and mobile story are usable with a keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
    const region = page.getByRole("region", { name: "Product journey" });
    await expect(region).toBeVisible();
    await region.focus();
    const initial = await region.evaluate((el) => el.scrollLeft);
    for (let i = 0; i < 4; i += 1) await page.keyboard.press("ArrowRight");
    await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(initial);
  });

  test("mobile navigation closes with Escape and restores trigger focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
  });

  test("reduced-motion desktop presents all story chapters in document flow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const track = page.locator(".motion-story__track");
    await expect.poll(() => track.evaluate((el) => getComputedStyle(el).display)).toBe("grid");
    const chapters = page.locator("[data-story-panel]");
    await expect(chapters).toHaveCount(4);
    for (let i = 0; i < 4; i += 1) await expect(chapters.nth(i).locator("h2")).toBeVisible();
    await expect(page.getByRole("progressbar", { name: "Story progress" })).toBeHidden();
  });
});

test.describe("automated accessibility audit (axe-core)", () => {
  for (const route of ROUTES) {
    for (const viewport of A11Y_VIEWPORTS) {
      test(`has no WCAG A/AA or axe best-practice violations on ${route} at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
          .analyze();
        const summary = results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          affectedNodes: violation.nodes.map((node) => node.target.join(" ")),
        }));
        expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
      });
    }
  }
});
