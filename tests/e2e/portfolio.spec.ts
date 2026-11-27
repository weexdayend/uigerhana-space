import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "wide desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet landscape", width: 1024, height: 768 },
  { name: "tablet portrait authored width", width: 834, height: 1112 },
  { name: "narrow tablet", width: 768, height: 1024 },
  { name: "large mobile", width: 430, height: 932 },
  { name: "mobile reference", width: 390, height: 844 },
  { name: "small mobile", width: 360, height: 800 },
  { name: "narrow reflow", width: 320, height: 800 },
  { name: "short mobile", width: 390, height: 667 },
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
      await expect(page.locator(".hero-atlas__primary-link")).toBeVisible();
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
        const heading = document.querySelector<HTMLElement>("[data-hero-title]");
        const headingBox = heading?.getBoundingClientRect();
        const copyBox = document.querySelector<HTMLElement>(".hero-atlas__copy")?.getBoundingClientRect();
        const artBox = document.querySelector<HTMLElement>(".hero-atlas__visual")?.getBoundingClientRect();
        const intersects = Boolean(
          copyBox &&
          artBox &&
          copyBox.left < artBox.right &&
          copyBox.right > artBox.left &&
          copyBox.top < artBox.bottom &&
          copyBox.bottom > artBox.top
        );
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingWithinViewport: Boolean(
            headingBox &&
            headingBox.left >= -1 &&
            headingBox.right <= document.documentElement.clientWidth + 1
          ),
          heroColumnsOverlap: intersects,
          copyBottom: copyBox?.bottom ?? 0,
          artTop: artBox?.top ?? 0,
          routeVisible: Boolean(artBox && artBox.width > 0 && artBox.height > 0),
        };
      });
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingWithinViewport).toBe(true);
      expect(layout.routeVisible).toBe(true);
      if (viewport.width > 840) {
        expect(layout.heroColumnsOverlap).toBe(false);
      } else {
        expect(layout.artTop).toBeGreaterThanOrEqual(layout.copyBottom - 1);
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
    for (const viewport of VIEWPORTS) {
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

  test("keyboard traversal exposes important controls and exits without traps on all routes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const requiredLabels: Record<string, string[]> = {
      "/": ["Skip to content", "UI Gerhana home", "Work", "About", "Notes", "Résumé", "Explore selected work", "Product journey", "Explore work", "Back to top"],
      "/work": ["UI Gerhana", "Read case study", "View résumé"],
      "/work/uigerhana-space": ["All work", "Résumé", "Explore more work", "UI Gerhana home"],
      "/cv": ["Back to uigerhana.space", "Print / Save PDF"],
    };

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const positiveTabIndex = await page.locator("[tabindex]").evaluateAll((nodes) =>
        nodes
          .filter((element) => Number(element.getAttribute("tabindex")) > 0)
          .map((element) => element.outerHTML.slice(0, 160))
      );
      expect(positiveTabIndex, `Positive tabindex on ${route}`).toEqual([]);

      const visited: Array<{ index: number; label: string; href: string | null }> = [];
      const seen = new Set<number>();
      let sequenceEnded = false;

      for (let step = 0; step < 80; step += 1) {
        await page.keyboard.press("Tab");
        const focused = await page.evaluate((selector) => {
          const active = document.activeElement as HTMLElement | null;
          if (!active || active === document.body || active === document.documentElement) {
            return { end: true as const };
          }

          const candidates = Array.from(document.querySelectorAll<HTMLElement>(selector));
          const index = candidates.indexOf(active);
          return {
            end: false as const,
            index,
            label: active.getAttribute("aria-label") || active.innerText?.trim().slice(0, 80) || active.tagName,
            href: active instanceof HTMLAnchorElement ? active.getAttribute("href") : null,
            outlineStyle: getComputedStyle(active).outlineStyle,
          };
        }, FOCUSABLE_SELECTOR);

        if (focused.end) {
          sequenceEnded = true;
          break;
        }

        expect(focused.index, `Tab moved to an element outside the focusable set on ${route}: ${JSON.stringify(focused)}`).toBeGreaterThanOrEqual(0);
        expect(focused.outlineStyle, `No visible focus indicator on ${route}: ${JSON.stringify(focused)}`).not.toBe("none");

        if (seen.has(focused.index)) {
          // Chromium can return to the first control after the final tab stop.
          sequenceEnded = true;
          break;
        }

        seen.add(focused.index);
        visited.push({ index: focused.index, label: focused.label, href: focused.href });
      }

      expect(sequenceEnded, `Keyboard traversal did not reach the end on ${route}`).toBe(true);
      const minimumStops: Record<string, number> = { "/": 12, "/work": 3, "/work/uigerhana-space": 4, "/cv": 4 };
      expect(visited.length, `Too few keyboard stops on ${route}; reached ${JSON.stringify(visited)}`).toBeGreaterThanOrEqual(minimumStops[route] ?? 1);

      const labels = visited.map((entry) => entry.label);
      for (const required of requiredLabels[route] ?? []) {
        expect(
          labels.some((label) => label.includes(required)),
          `Keyboard traversal missed "${required}" on ${route}. Reached: ${JSON.stringify(labels)}`
        ).toBe(true);
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

  test("200% root-font-size reflows the System Atlas hero at 320, 360, and 390px", async ({ page }, testInfo) => {
    const widths = [390, 360, 320];
    const reports: Array<{
      viewportWidth: number;
      documentWidth: number;
      bodyWidth: number;
      rootFontSize: number;
      headingClipped: boolean;
      headingWithinViewport: boolean;
      actionsWithinViewport: boolean;
      overflowCandidates: Array<{
        tag: string;
        className: string;
        text: string;
        left: number;
        right: number;
        width: number;
        scrollWidth: number;
        clientWidth: number;
      }>;
    }> = [];

    await page.setViewportSize({ width: widths[0], height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const viewportWidth of widths) {
      await page.setViewportSize({ width: viewportWidth, height: 844 });
      const report = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const heading = document.querySelector<HTMLElement>("[data-hero-title]");
        const headingBox = heading?.getBoundingClientRect();
        const actionsBox = document.querySelector<HTMLElement>("[data-hero-actions]")?.getBoundingClientRect();
        const overflowCandidates = Array.from(document.body.querySelectorAll<HTMLElement>("*"))
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0 &&
              (rect.right > viewportWidth + 1 || rect.left < -1 || element.scrollWidth > element.clientWidth + 1);
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const horizontalScroller = element.closest(".motion-story__viewport");
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              text: (element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 90),
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
              boxOverflow: rect.right > viewportWidth + 1 || rect.left < -1,
              internalOverflow: element.scrollWidth > element.clientWidth + 1,
              insideHorizontalScroller: Boolean(horizontalScroller),
              scrollWidth: element.scrollWidth,
              clientWidth: element.clientWidth,
            };
          })
          .sort((left, right) => {
            if (left.insideHorizontalScroller !== right.insideHorizontalScroller) {
              return Number(left.insideHorizontalScroller) - Number(right.insideHorizontalScroller);
            }
            if (left.boxOverflow !== right.boxOverflow) {
              return Number(right.boxOverflow) - Number(left.boxOverflow);
            }
            return right.right - left.right;
          })
          .slice(0, 24);

        return {
          viewportWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingWithinViewport: Boolean(
            headingBox &&
            headingBox.left >= -1 &&
            headingBox.right <= viewportWidth + 1
          ),
          actionsWithinViewport: Boolean(
            actionsBox &&
            actionsBox.left >= -1 &&
            actionsBox.right <= viewportWidth + 1
          ),
          overflowCandidates,
        };
      });
      reports.push(report);
    }

    await testInfo.attach("system-atlas-root-font-200-percent-reflow.json", {
      body: JSON.stringify(reports, null, 2),
      contentType: "application/json",
    });

    for (const layout of reports) {
      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(
        layout.documentWidth,
        `Document overflow at ${layout.viewportWidth}px: ${JSON.stringify(layout.overflowCandidates)}`
      ).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.bodyWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingWithinViewport).toBe(true);
      expect(layout.actionsWithinViewport).toBe(true);
    }
  });

  test("CV print media hides browser controls and preserves all résumé sections", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: /Print \/ Save PDF/ })).toBeVisible();

    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("button", { name: /Print \/ Save PDF/ })).toBeHidden();
    await expect(page.getByRole("link", { name: /Back to uigerhana.space/ })).toBeHidden();

    for (const heading of [
      "Professional Experience",
      "Technical Skills",
      "Certification",
      "Technical Leadership & Publications",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    const printLayout = await page.evaluate(() => {
      const article = document.querySelector("article");
      return {
        background: getComputedStyle(document.body).backgroundColor,
        articleBackground: article ? getComputedStyle(article).backgroundColor : "",
        articleBorder: article ? getComputedStyle(article).borderTopWidth : "",
        articleWidth: article?.getBoundingClientRect().width ?? 0,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      };
    });
    expect(printLayout.articleWidth).toBeGreaterThan(0);
    expect(printLayout.articleBorder).toBe("0px");
    expect(printLayout.documentWidth).toBeLessThanOrEqual(printLayout.viewportWidth + 1);
  });

  test("CV Chromium print output produces a valid two-page A4 PDF", async ({ page, browserName }, testInfo) => {
    test.skip(browserName !== "chromium", "Playwright page.pdf is Chromium-only; other engines run print-media checks above.");
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await page.emulateMedia({ media: "print" });

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
