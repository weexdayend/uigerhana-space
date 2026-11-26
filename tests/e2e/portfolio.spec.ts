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

const FOCUSABLE_SELECTOR = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[contenteditable='true']:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

test.describe("responsive homepage runtime", () => {
  for (const viewport of VIEWPORTS) {
    test(`renders without clipped hero copy or document overflow at ${viewport.name}`, async ({ page }, testInfo) => {
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto("/", { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".hero-organic__primary-link")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      for (const selector of [
        "[data-hero-title]",
        "[data-hero-byline]",
        "[data-hero-copy]",
        "[data-hero-actions]",
      ]) {
        await expect(page.locator(selector)).toHaveCSS("opacity", "1");
      }
      const layout = await page.evaluate(() => {
        const lines = Array.from(document.querySelectorAll<HTMLElement>(".hero-organic__title-line, .hero-organic__title-second"));
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          titleOverflows: lines.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => ({
            text: el.textContent?.trim(), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth,
          })),
          heroColumnsOverlap: (() => {
            const copy = document.querySelector<HTMLElement>(".hero-organic__copy");
            const art = document.querySelector<HTMLElement>(".hero-organic__art");
            if (!copy || !art) return false;
            const a = copy.getBoundingClientRect();
            const b = art.getBoundingClientRect();
            return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
          })(),
        };
      });
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.titleOverflows).toEqual([]);
      if (viewport.width >= 768 && viewport.width <= 820) {
        expect(layout.heroColumnsOverlap).toBe(false);
      }
      expect(runtimeErrors).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath("homepage-viewport.png"),
        animations: "disabled",
      });
    });
  }
});

test.describe("visual state captures", () => {
  test("captures complete reduced-motion pages at desktop and mobile sizes", async ({ page }, testInfo) => {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const chapters = page.locator("[data-story-panel]");
      await expect(chapters).toHaveCount(4);
      for (let index = 0; index < 4; index += 1) {
        await expect(chapters.nth(index).locator("h2")).toBeVisible();
      }
      await page.screenshot({
        path: testInfo.outputPath(`homepage-full-page-${viewport.name}-reduced-motion.png`),
        fullPage: true,
        animations: "disabled",
      });
    }
  });

  test("captures all four stages of the desktop pinned story", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const selector of ["[data-hero-title]", "[data-hero-actions]"]) {
      await expect(page.locator(selector)).toHaveCSS("opacity", "1");
    }
    const story = page.locator(".motion-story");
    await expect(story).toBeVisible();
    await page.waitForFunction(() =>
      document.querySelector(".motion-story")?.parentElement?.classList.contains("pin-spacer")
    );
    const dimensions = await story.evaluate((element) => {
      const spacer = element.parentElement as HTMLElement;
      return {
        start: spacer.getBoundingClientRect().top + window.scrollY - 49,
        travel: Math.max(0, spacer.offsetHeight - (element as HTMLElement).offsetHeight),
      };
    });
    expect(dimensions.travel).toBeGreaterThan(0);

    for (let index = 0; index < 4; index += 1) {
      const fraction = index / 3;
      await page.evaluate(
        ({ start, travel, fraction }) => window.scrollTo(0, start + travel * fraction),
        { ...dimensions, fraction }
      );
      await page.waitForTimeout(1100);
      await page.screenshot({
        path: testInfo.outputPath(`desktop-story-stage-${index + 1}.png`),
        animations: "disabled",
      });
    }
  });

  test("captures each horizontal story panel at mobile width", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const region = page.getByRole("region", { name: "Product journey" });
    await region.scrollIntoViewIfNeeded();

    for (let index = 0; index < 4; index += 1) {
      await region.evaluate((element, panelIndex) => {
        const panel = element.querySelectorAll<HTMLElement>("[data-story-panel]")[panelIndex];
        const delta = panel.getBoundingClientRect().left - element.getBoundingClientRect().left;
        element.scrollLeft += delta;
      }, index);
      await page.waitForTimeout(150);

      if (index === 1) {
        const metadataOverlap = await region.evaluate((element) => {
          const panel = element.querySelectorAll<HTMLElement>("[data-story-panel]")[1];
          const label = panel.querySelector(".motion-story__visual-meta > span:first-child")!;
          const artwork = panel.querySelector(".story-ui")!;
          const labelBox = label.getBoundingClientRect();
          const artworkBox = artwork.getBoundingClientRect();
          return labelBox.bottom > artworkBox.top &&
            labelBox.top < artworkBox.bottom &&
            labelBox.right > artworkBox.left &&
            labelBox.left < artworkBox.right;
        });
        expect(metadataOverlap).toBe(false);
      }

      if (index === 2) {
        const collisions = await region.evaluate((element) => {
          const panel = element.querySelectorAll<HTMLElement>("[data-story-panel]")[2];
          const nodes = Array.from(
            panel.querySelectorAll<HTMLElement>(".story-architecture__core, .story-architecture__node")
          );
          return nodes.flatMap((node, nodeIndex) => {
            const a = node.getBoundingClientRect();
            return nodes.slice(nodeIndex + 1).filter((other) => {
              const b = other.getBoundingClientRect();
              return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
            }).map((other) => [node.textContent?.trim(), other.textContent?.trim()]);
          });
        });
        expect(collisions).toEqual([]);
      }

      await page.screenshot({
        path: testInfo.outputPath(`mobile-story-stage-${index + 1}.png`),
        animations: "disabled",
      });
    }
  });
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

  test("mobile navigation is keyboard reachable and Escape restores trigger focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const trigger = page.locator('button[aria-controls="mobile-navigation"]');
    await expect(trigger).toHaveAccessibleName("Open navigation menu");
    await trigger.focus();
    await page.keyboard.press("Enter");
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(navigation).toBeVisible();
    await expect(trigger).toHaveAccessibleName("Close navigation menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Tab");
    await expect(navigation.getByRole("link", { name: "Work" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(navigation).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAccessibleName("Open navigation menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("full keyboard traversal reaches every visible control in DOM order on all routes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const expected = await page.evaluate((selector) => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
        const visible = nodes.filter((element) => {
          const style = getComputedStyle(element);
          return element.getClientRects().length > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            !element.closest('[aria-hidden="true"]');
        });
        const positiveTabIndex = Array.from(document.querySelectorAll<HTMLElement>("[tabindex]"))
          .filter((element) => Number(element.getAttribute("tabindex")) > 0)
          .map((element) => element.outerHTML.slice(0, 160));
        return { count: visible.length, positiveTabIndex };
      }, FOCUSABLE_SELECTOR);

      expect(expected.count, `No visible keyboard controls found on ${route}`).toBeGreaterThan(0);
      expect(expected.positiveTabIndex, `Positive tabindex on ${route}`).toEqual([]);

      for (let index = 0; index < expected.count; index += 1) {
        await page.keyboard.press("Tab");
        const focused = await page.evaluate((selector) => {
          const visible = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((element) => {
            const style = getComputedStyle(element);
            return element.getClientRects().length > 0 &&
              style.visibility !== "hidden" &&
              style.display !== "none" &&
              !element.closest('[aria-hidden="true"]');
          });
          const active = document.activeElement as HTMLElement | null;
          return {
            index: active ? visible.indexOf(active) : -1,
            tag: active?.tagName ?? "BODY",
            outlineStyle: active ? getComputedStyle(active).outlineStyle : "none",
            label: active?.getAttribute("aria-label") || active?.innerText?.trim().slice(0, 60) || "",
          };
        }, FOCUSABLE_SELECTOR);

        expect(focused.index, `Unexpected focus position on ${route}, tab ${index + 1}: ${JSON.stringify(focused)}`).toBe(index);
        expect(focused.outlineStyle, `No visible focus indicator on ${route}, tab ${index + 1}: ${JSON.stringify(focused)}`).not.toBe("none");
      }
    }
  });

  test("reduced motion keeps all story chapters in document flow on desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const track = page.locator(".motion-story__track");
      await expect.poll(() => track.evaluate((el) => getComputedStyle(el).display)).toBe("grid");
      await expect.poll(() => page.locator(".motion-story__viewport").evaluate((el) => getComputedStyle(el).overflowX)).toBe("visible");

      const chapters = page.locator("[data-story-panel]");
      await expect(chapters).toHaveCount(4);
      const chapterTops: number[] = [];
      for (let index = 0; index < 4; index += 1) {
        await expect(chapters.nth(index).locator("h2")).toBeVisible();
        chapterTops.push(await chapters.nth(index).evaluate((element) => element.getBoundingClientRect().top));
      }
      expect(chapterTops[1]).toBeGreaterThan(chapterTops[0]);
      expect(chapterTops[2]).toBeGreaterThan(chapterTops[1]);
      expect(chapterTops[3]).toBeGreaterThan(chapterTops[2]);
      await expect(page.getByRole("progressbar", { name: "Story progress" })).toBeHidden();
    }
  });

  test("200% desktop zoom-equivalent viewport reflows all routes without overflow", async ({ page }) => {
    // A 1440×900 desktop viewport at 200% browser zoom has an effective layout
    // viewport close to 720×450 CSS pixels. This checks that reflow width, not
    // browser chrome's physical zoom setting.
    await page.setViewportSize({ width: 720, height: 450 });

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(dimensions.document, `Document overflow on ${route} at effective 200% width`).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.body, `Body overflow on ${route} at effective 200% width`).toBeLessThanOrEqual(dimensions.viewport + 1);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          targets: violation.nodes.map((node) => node.target.join(" ")),
        })),
        `axe violations on ${route} at effective 200% width`
      ).toEqual([]);
    }
  });

  test("CV print stylesheet removes controls and produces a valid A4 PDF", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: /Print \/ Save PDF/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional Experience" })).toBeVisible();

    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("button", { name: /Print \/ Save PDF/ })).toBeHidden();
    const printLayout = await page.evaluate(() => ({
      pageBackground: getComputedStyle(document.body).backgroundColor,
      articleWidth: document.querySelector("article")?.getBoundingClientRect().width ?? 0,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(printLayout.articleWidth).toBeGreaterThan(0);
    expect(printLayout.documentWidth).toBeLessThanOrEqual(printLayout.viewportWidth + 1);

    const pdfPath = testInfo.outputPath("irvan-gerhana-cv-print-preview.pdf");
    const pdf = await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
    expect(pdf.byteLength).toBeGreaterThan(5_000);
    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    const pdfPageCount = (pdf.toString("latin1").match(/\/Type\s*\/Page\b/g) ?? []).length;
    expect(pdfPageCount, "CV print output must not append a mostly empty trailing page").toBe(2);
  });
});

test.describe("automated accessibility audit (axe-core)", () => {
  for (const route of ROUTES) {
    for (const viewport of A11Y_VIEWPORTS) {
      test(`has no WCAG A/AA or axe best-practice violations on ${route} at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        if (route === "/") {
          for (const selector of [
            "[data-hero-title]",
            "[data-hero-byline]",
            "[data-hero-copy]",
            "[data-hero-actions]",
          ]) {
            await expect(page.locator(selector)).toHaveCSS("opacity", "1");
          }
        }
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
