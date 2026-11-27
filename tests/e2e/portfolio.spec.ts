import { writeFile } from "node:fs/promises";
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
      expect(response?.ok() || response?.status() === 304).toBe(true);
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

test.describe("System Atlas selected work", () => {
  test("homepage and work index expose one approved case study without promoting work domains", async ({ page }) => {
    for (const route of ["/", "/work"]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      const featured = page.locator('[data-case-study-card="uigerhana-space"]');
      await expect(featured).toHaveCount(1);
      await expect(featured).toHaveAttribute("data-project-status", "in-progress");
      await expect(featured.locator(".atlas-case-study__eyebrow")).toContainText("In progress");
      await expect(
        featured.getByRole("heading", { name: "Building a personal professional platform" })
      ).toBeVisible();
      await expect(
        featured.getByRole("link", { name: /Read case study/ })
      ).toHaveAttribute("href", "/work/uigerhana-space");
      await expect(
        page.getByText("Generalized work domains; not separate public case studies.", { exact: true })
      ).toBeVisible();
    }
  });

  test("featured case study and work domains reflow at 200% root text size", async ({ page }) => {
    for (const route of ["/", "/work"]) {
      for (const width of [390, 360, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
        await page.evaluate(() => document.fonts.ready);

        const metrics = await page.evaluate(() => {
          const card = document.querySelector<HTMLElement>("[data-case-study-card]");
          const cardBox = card?.getBoundingClientRect();
          return {
            viewportWidth: document.documentElement.clientWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            cardWithinViewport: Boolean(
              cardBox &&
              cardBox.left >= -1 &&
              cardBox.right <= document.documentElement.clientWidth + 1
            ),
            cardWidth: cardBox?.width ?? 0,
          };
        });

        expect(
          metrics.documentWidth,
          `Document overflow on ${route} at ${width}px: ${JSON.stringify(metrics)}`
        ).toBeLessThanOrEqual(metrics.viewportWidth + 1);
        expect(metrics.bodyWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
        expect(metrics.cardWithinViewport).toBe(true);
        expect(metrics.cardWidth).toBeGreaterThan(0);
      }
    }
  });
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

  test("captures element-level 200% root-text reflow diagnostics across public routes", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const routeReports: Array<Record<string, unknown>> = [];

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

      const report = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;

        const snapshot = (element: HTMLElement) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            id: element.id || null,
            className: typeof element.className === "string" ? element.className : "",
            text: (element.innerText || element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 110),
            rect: {
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              top: Math.round(rect.top * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
            },
            dimensions: {
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth,
              clientHeight: element.clientHeight,
              scrollHeight: element.scrollHeight,
            },
            css: {
              display: style.display,
              position: style.position,
              boxSizing: style.boxSizing,
              width: style.width,
              minWidth: style.minWidth,
              maxWidth: style.maxWidth,
              gridTemplateColumns: style.gridTemplateColumns,
              flex: style.flex,
              flexWrap: style.flexWrap,
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              letterSpacing: style.letterSpacing,
              whiteSpace: style.whiteSpace,
              overflowWrap: style.overflowWrap,
              wordBreak: style.wordBreak,
              textWrap: style.textWrap,
              overflowX: style.overflowX,
              paddingInline: style.paddingInline,
              marginInline: style.marginInline,
            },
          };
        };

        const isVisible = (element: HTMLElement) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 2 &&
            rect.height > 2 &&
            !element.classList.contains("sr-only");
        };

        const headings = Array.from(
          document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")
        ).filter(isVisible).map((element) => ({
          ...snapshot(element),
          clipped: element.scrollWidth > element.clientWidth + 1,
          ancestors: [
            element.parentElement,
            element.parentElement?.parentElement,
            element.parentElement?.parentElement?.parentElement,
          ].filter((node): node is HTMLElement => Boolean(node)).map(snapshot),
        }));

        const overflowCandidates = Array.from(document.body.querySelectorAll<HTMLElement>("*"))
          .filter((element) => {
            if (!isVisible(element)) return false;
            const rect = element.getBoundingClientRect();
            return rect.left < -1 ||
              rect.right > viewportWidth + 1 ||
              element.scrollWidth > element.clientWidth + 1;
          })
          .map((element) => ({
            ...snapshot(element),
            outsideViewport: (() => {
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > viewportWidth + 1;
            })(),
            ancestors: [
              element.parentElement,
              element.parentElement?.parentElement,
              element.parentElement?.parentElement?.parentElement,
            ].filter((node): node is HTMLElement => Boolean(node)).map(snapshot),
          }))
          .sort((left, right) => Number(right.outsideViewport) - Number(left.outsideViewport))
          .slice(0, 80);

        return {
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          viewportWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          headings,
          overflowCandidates,
        };
      });

      routeReports.push({ route, ...report });
      await page.screenshot({
        path: testInfo.outputPath(`root-text-200-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`),
        animations: "disabled",
      });
    }

    const evidence = JSON.stringify(routeReports, null, 2);
    await writeFile(testInfo.outputPath("root-text-200-percent-route-diagnostics.json"), evidence);
    await testInfo.attach("root-text-200-percent-route-diagnostics.json", {
      body: evidence,
      contentType: "application/json",
    });

    expect(routeReports).toHaveLength(ROUTES.length);
    expect(routeReports.every((entry) => entry.rootFontSize === 32)).toBe(true);
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

    await expect(page.locator("[data-resume-document]")).toBeVisible();
    await expect(page.locator(".resume-document-footer")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Publication profiles" }).getByRole("link")).toHaveCount(2);

    const printLayout = await page.evaluate(() => {
      const article = document.querySelector<HTMLElement>("[data-resume-document]");
      const toolbar = document.querySelector<HTMLElement>(".resume-chrome");
      const role = document.querySelector<HTMLElement>(".resume-role");
      return {
        articleBackground: article ? getComputedStyle(article).backgroundColor : "",
        articleBorder: article ? getComputedStyle(article).borderTopWidth : "",
        articleWidth: article?.getBoundingClientRect().width ?? 0,
        toolbarDisplay: toolbar ? getComputedStyle(toolbar).display : "",
        roleBreakInside: role ? getComputedStyle(role).breakInside : "",
        footerDisplay: getComputedStyle(document.querySelector(".resume-document-footer")!).display,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      };
    });
    expect(printLayout.articleWidth).toBeGreaterThan(0);
    expect(printLayout.articleBorder).toBe("0px");
    expect(printLayout.toolbarDisplay).toBe("none");
    expect(printLayout.roleBreakInside).toContain("avoid");
    expect(printLayout.footerDisplay).not.toBe("none");
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

test.describe("System Atlas résumé route", () => {
  test("presents the source-backed résumé structure across desktop, tablet, and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 834, height: 1112 },
      { width: 390, height: 844 },
      { width: 320, height: 800 },
    ]) {
      await page.setViewportSize(viewport);
      const response = await page.goto("/cv", { waitUntil: "domcontentloaded" });
      expect(response?.ok() || response?.status() === 304).toBe(true);
      await page.evaluate(() => document.fonts.ready);

      const documentSurface = page.locator("[data-resume-document]");
      await expect(documentSurface).toBeVisible();
      await expect(documentSurface.getByRole("heading", { level: 1, name: "Irvan Gerhana" })).toBeVisible();
      await expect(documentSurface.locator("[data-resume-role]")).toHaveCount(2);
      await expect(documentSurface.locator("[data-resume-skill-group]")).toHaveCount(5);
      await expect(documentSurface.locator(".resume-role__highlights li")).toHaveCount(12);
      await expect(documentSurface.locator(".resume-certification")).toHaveCount(1);
      await expect(documentSurface.getByRole("navigation", { name: "Publication profiles" }).getByRole("link")).toHaveCount(2);

      const metrics = await page.evaluate(() => {
        const documentSurface = document.querySelector<HTMLElement>("[data-resume-document]")!;
        const name = documentSurface.querySelector<HTMLElement>(".resume-header__name")!;
        const nameBox = name.getBoundingClientRect();
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          surface: documentSurface.getBoundingClientRect().width,
          nameWithinViewport: nameBox.left >= -1 && nameBox.right <= document.documentElement.clientWidth + 1,
        };
      });
      expect(metrics.document).toBeLessThanOrEqual(metrics.viewport + 1);
      expect(metrics.body).toBeLessThanOrEqual(metrics.viewport + 1);
      expect(metrics.surface).toBeGreaterThan(0);
      expect(metrics.nameWithinViewport).toBe(true);
    }
  });

  test("preserves the two source-backed overlapping role periods and the full highlight record", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });

    const experience = page.locator("#experience");
    const saptakarya = experience.locator('[data-resume-role="saptakarya"]');
    const infomedia = experience.locator('[data-resume-role="infomedia"]');
    await expect(saptakarya.getByRole("heading", { name: "Co-Founder & Lead Software Engineer" })).toBeVisible();
    await expect(saptakarya).toContainText("2021 — Present");
    await expect(infomedia.getByRole("heading", { name: "Information Systems & Cybersecurity Engineer" })).toBeVisible();
    await expect(infomedia).toContainText("2017 — Present");
    await expect(saptakarya.locator("li")).toHaveCount(6);
    await expect(infomedia.locator("li")).toHaveCount(6);
    await expect(page.locator("#skills .resume-skill-row")).toHaveCount(5);
    await expect(page.locator("#certifications")).toContainText("UI/UX Research and Design");
    await expect(page.locator("#certifications")).toContainText("Binar Academy");
  });

  test("reflows every résumé section at 200% root text without clipped content or page overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const metrics = await page.evaluate(() => {
        const candidates = Array.from(document.querySelectorAll<HTMLElement>([
          ".resume-back-link",
          ".resume-print-button",
          ".resume-chrome__inner",
          ".resume-header__name",
          ".resume-header__summary",
          ".resume-role__title",
          ".resume-role__period",
          ".resume-role__organization",
          ".resume-role__summary",
          ".resume-role__highlights",
          ".resume-skill-row__label",
          ".resume-skill-row__skills",
          ".resume-certification",
          ".resume-publications__summary",
          ".resume-publication-link",
          ".resume-document-footer",
        ].join(", ")));
        const name = document.querySelector<HTMLElement>(".resume-header__name")!;
        const nameBox = name.getBoundingClientRect();
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          nameClipped: name.scrollWidth > name.clientWidth + 1,
          nameWithinViewport: nameBox.left >= -1 && nameBox.right <= document.documentElement.clientWidth + 1,
          overflowTargets: candidates
            .filter((item) => item.scrollWidth > item.clientWidth + 1)
            .map((item) => ({
              tag: item.tagName.toLowerCase(),
              className: item.className,
              text: (item.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
              scrollWidth: item.scrollWidth,
              clientWidth: item.clientWidth,
            })),
        };
      });
      expect(metrics.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(metrics.document).toBeLessThanOrEqual(metrics.viewport + 1);
      expect(metrics.body).toBeLessThanOrEqual(metrics.viewport + 1);
      expect(metrics.nameClipped).toBe(false);
      expect(metrics.nameWithinViewport).toBe(true);
      expect(metrics.overflowTargets, JSON.stringify(metrics.overflowTargets, null, 2)).toEqual([]);
    }
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

test.describe("System Atlas case-study detail", () => {
  test("presents the approved project story and publication status at responsive widths", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 390, height: 844 },
      { width: 320, height: 800 },
    ]) {
      await page.setViewportSize(viewport);
      const response = await page.goto("/work/uigerhana-space", { waitUntil: "domcontentloaded" });
      expect(response?.ok() || response?.status() === 304).toBe(true);
      await expect(page.getByRole("heading", { level: 1, name: "Building a personal professional platform" })).toBeVisible();
      await expect(page.locator('[data-project-status="in-progress"]')).toHaveText(/In progress/);
      await expect(page.getByRole("navigation", { name: "Case study navigation" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "The work behind the experience." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "How the site is put together." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "From the problem to the current state." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Tools mapped to their role." })).toBeVisible();
      await expect(page.getByText(/Not deployment or infrastructure topology/)).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });

  test("keeps the case-study detail readable with 200% root text at narrow widths", async ({ page }) => {
    const widths = [390, 360, 320];
    await page.setViewportSize({ width: widths[0], height: 844 });
    await page.goto("/work/uigerhana-space", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of widths) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.evaluate(() => {
        const title = document.querySelector<HTMLElement>(".atlas-detail__title");
        const rect = title?.getBoundingClientRect();
        return {
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          titleClipped: Boolean(title && title.scrollWidth > title.clientWidth + 1),
          titleInViewport: Boolean(rect && rect.left >= -1 && rect.right <= document.documentElement.clientWidth + 1),
        };
      });
      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.titleClipped).toBe(false);
      expect(layout.titleInViewport).toBe(true);
    }
  });
});


test.describe("System Atlas expertise and capabilities", () => {
  test("keeps five source-backed capability groups distinct from generalized work domains", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok() || response?.status() === 304).toBe(true);

    const section = page.locator("#expertise");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", {
      level: 2,
      name: "Connected disciplines. One product mindset.",
    })).toBeVisible();

    const groups = section.locator(".atlas-expertise__group");
    await expect(groups).toHaveCount(5);
    await expect(groups.nth(0).getByRole("heading", { level: 3, name: "Product & experience" })).toBeVisible();
    await expect(groups.nth(1).getByRole("heading", { level: 3, name: "Frontend engineering" })).toBeVisible();
    await expect(groups.nth(2).getByRole("heading", { level: 3, name: "Backend & data architecture" })).toBeVisible();
    await expect(groups.nth(3).getByRole("heading", { level: 3, name: "AI & data engineering" })).toBeVisible();
    await expect(groups.nth(4).getByRole("heading", { level: 3, name: "Infrastructure & security" })).toBeVisible();

    await expect(section.getByText("Professional expertise", { exact: true }).first()).toBeVisible();
    await expect(section.getByText("Technical capability", { exact: true }).first()).toBeVisible();
    await expect(section.getByText(/does not imply a separate published project/i)).toBeVisible();

    const domains = page.locator("#work .atlas-work-domains");
    await expect(domains).toHaveCount(1);
    await expect(domains.getByRole("heading", { level: 3, name: "Areas I have worked across." })).toBeVisible();
    await expect(domains.locator(".atlas-work-domain")).toHaveCount(4);
    await expect(domains.getByText("Generalized work domains; not separate public case studies.")).toBeVisible();
    await expect(domains.locator("[data-case-study]")).toHaveCount(0);

    const layout = await section.evaluate((element) => ({
      width: element.getBoundingClientRect().width,
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(layout.width).toBeGreaterThan(0);
    expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
  });

  test("keeps the expertise route reflowable with 200% root text at mobile widths", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.locator("#expertise").evaluate((section) => {
        const heading = section.querySelector("h2");
        const headingRect = heading?.getBoundingClientRect();
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingInViewport: Boolean(
            headingRect && headingRect.left >= -1 &&
            headingRect.right <= document.documentElement.clientWidth + 1
          ),
          groupCount: section.querySelectorAll(".atlas-expertise__group").length,
        };
      });

      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingInViewport).toBe(true);
      expect(layout.groupCount).toBe(5);
    }
  });

  test("supports keyboard focus through expertise content without introducing controls", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const section = page.locator("#expertise");
    await section.scrollIntoViewIfNeeded();

    const interactiveCount = await section.locator("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])").count();
    expect(interactiveCount).toBe(0);
    await expect(section.getByRole("list").first()).toBeVisible();
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(5);
  });

  test("has no axe WCAG A/AA or configured best-practice violations at desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#expertise").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    }
  });
});


test.describe("System Atlas professional experience", () => {
  test("preserves both résumé-backed roles and their overlapping periods", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok() || response?.status() === 304).toBe(true);

    const section = page.locator("#experience");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", {
      level: 2,
      name: "Building across products, platforms, and systems.",
    })).toBeVisible();
    await expect(section.getByText(/two role periods overlap/i)).toBeVisible();

    const roles = section.locator(".atlas-experience__role");
    await expect(roles).toHaveCount(2);

    await expect(roles.nth(0).getByRole("heading", {
      level: 3,
      name: "Co-Founder & Lead Software Engineer",
    })).toBeVisible();
    await expect(roles.nth(0).getByText("Saptakarya", { exact: true })).toBeVisible();
    await expect(roles.nth(0).getByText("2021 — Present", { exact: true })).toBeVisible();
    await expect(roles.nth(0).locator(".atlas-experience__highlights li")).toHaveCount(6);

    await expect(roles.nth(1).getByRole("heading", {
      level: 3,
      name: "Information Systems & Cybersecurity Engineer",
    })).toBeVisible();
    await expect(roles.nth(1).getByText("Infomedia Nusantara (Telkom Group)", { exact: true })).toBeVisible();
    await expect(roles.nth(1).getByText("2017 — Present", { exact: true })).toBeVisible();
    await expect(roles.nth(1).locator(".atlas-experience__highlights li")).toHaveCount(6);

    const dates = await roles.locator(".atlas-experience__period").allTextContents();
    expect(dates).toEqual(["2021 — Present", "2017 — Present"]);
    await expect(section.getByText(/two roles · overlapping periods/i)).toBeVisible();
  });

  test("reflows both experience records at 200% root text without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.locator("#experience").evaluate((section) => {
        const heading = section.querySelector("h2");
        const headingRect = heading?.getBoundingClientRect();
        const roles = Array.from(section.querySelectorAll<HTMLElement>(".atlas-experience__role"));
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingInViewport: Boolean(
            headingRect && headingRect.left >= -1 &&
            headingRect.right <= document.documentElement.clientWidth + 1
          ),
          roleCount: roles.length,
          roleWidths: roles.map((role) => Math.round(role.getBoundingClientRect().width)),
          roleOverflows: roles.some((role) => role.scrollWidth > role.clientWidth + 1),
        };
      });

      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingInViewport).toBe(true);
      expect(layout.roleCount).toBe(2);
      expect(layout.roleWidths.every((width) => width > 0)).toBe(true);
      expect(layout.roleOverflows).toBe(false);
    }
  });

  test("keeps role content static and keyboard-neutral", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".atlas-experience__role")).toHaveCount(2);
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(2);

    const interactiveCount = await section.locator(
      "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    ).count();
    expect(interactiveCount).toBe(0);

    for (const role of await section.locator(".atlas-experience__role").all()) {
      await expect(role).toHaveCSS("opacity", "1");
    }
  });

  test("has no axe WCAG A/AA or configured best-practice violations in the section", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#experience").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .include("#experience")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    }
  });
});


test.describe("System Atlas engineering approach", () => {
  test("presents the four approved engineering principles in source order", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok() || response?.status() === 304).toBe(true);

    const section = page.locator("#approach");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", {
      level: 2,
      name: "How I think about building software.",
    })).toBeVisible();

    const principles = section.locator(".atlas-approach__principle");
    await expect(principles).toHaveCount(4);
    const titles = await principles.locator("h3").allTextContents();
    expect(titles).toEqual([
      "Start with the workflow",
      "Make complexity legible",
      "Build AI with context",
      "Think beyond the interface",
    ]);

    await expect(principles.nth(0).locator("p")).toContainText(/people, decisions, data, and constraints/i);
    await expect(principles.nth(1).locator("p")).toContainText(/information architecture, canonical data models/i);
    await expect(principles.nth(2).locator("p")).toContainText(/business context, integration boundaries, data governance/i);
    await expect(principles.nth(3).locator("p")).toContainText(/security, monitoring, deployment, maintainability/i);
    await expect(section.getByText("Four connected principles", { exact: true })).toBeVisible();

    const sequence = await principles.locator(".atlas-approach__waypoint span").allTextContents();
    expect(sequence).toEqual(["01", "02", "03", "04"]);
  });

  test("reflows all four principles at 200% root text without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.locator("#approach").evaluate((section) => {
        const heading = section.querySelector("h2");
        const headingRect = heading?.getBoundingClientRect();
        const principles = Array.from(
          section.querySelectorAll<HTMLElement>(".atlas-approach__principle")
        );
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingInViewport: Boolean(
            headingRect && headingRect.left >= -1 &&
            headingRect.right <= document.documentElement.clientWidth + 1
          ),
          principleCount: principles.length,
          principleOverflows: principles.some((item) => item.scrollWidth > item.clientWidth + 1),
          titleCount: section.querySelectorAll(".atlas-approach__principle h3").length,
        };
      });

      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingInViewport).toBe(true);
      expect(layout.principleCount).toBe(4);
      expect(layout.titleCount).toBe(4);
      expect(layout.principleOverflows).toBe(false);
    }
  });

  test("keeps the principle map static and keyboard-neutral under reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = page.locator("#approach");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".atlas-approach__principle")).toHaveCount(4);
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(4);
    await expect(section.locator(".atlas-approach__route")).toBeVisible();

    const interactiveCount = await section.locator(
      "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    ).count();
    expect(interactiveCount).toBe(0);

    for (const principle of await section.locator(".atlas-approach__principle article").all()) {
      await expect(principle).toHaveCSS("opacity", "1");
    }
  });

  test("has no axe WCAG A/AA or configured best-practice violations at desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#approach").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .include("#approach")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    }
  });
});


test.describe("System Atlas writing and publication", () => {
  test("presents the three existing public articles and their source-backed metadata in order", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok() || response?.status() === 304).toBe(true);

    const section = page.locator("#writing");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", {
      level: 2,
      name: "Ideas behind the systems.",
    })).toBeVisible();

    const articles = section.locator(".atlas-writing__article");
    await expect(articles).toHaveCount(3);

    const titles = [
      "What Leaves When an Engineer Leaves",
      "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
      "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
    ];
    const dates = ["2026-07-01", "2026-06-26", "2026-06-24"];
    const labels = ["1 Jul 2026", "26 Jun 2026", "24 Jun 2026"];
    const readingTimes = ["17 min read", "5 min read", "6 min read"];
    const categories = [
      "Engineering practice",
      "Financial intelligence",
      "Enterprise AI",
    ];

    for (let index = 0; index < titles.length; index += 1) {
      const article = articles.nth(index);
      await expect(article.getByRole("heading", { level: 3, name: titles[index] })).toBeVisible();
      await expect(article.getByText(categories[index], { exact: true })).toBeVisible();
      await expect(article.locator(".atlas-writing__publication")).toContainText("Medium");
      await expect(article.locator(".atlas-writing__publication")).toContainText(readingTimes[index]);
      await expect(article.locator("time")).toHaveAttribute("datetime", dates[index]);
      await expect(article.locator("time")).toHaveText(labels[index]);

      const link = article.locator(".atlas-writing__article-link");
      await expect(link).toBeVisible();
      await expect(link).toContainText(titles[index]);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /^https:\/\/medium\.com\/@weexdayend\//);
    }

    await expect(section.getByRole("navigation", { name: "Publication profiles" }).getByRole("link")).toHaveCount(2);
    await expect(section.getByRole("link", { name: /DEV Community.*@uigerhana/ })).toHaveAttribute("href", "https://dev.to/uigerhana");
    await expect(section.getByRole("link", { name: /Medium.*@weexdayend/ })).toHaveAttribute("href", "https://medium.com/@weexdayend");
  });

  test("uses the approved three-to-two-to-one article grid across responsive breakpoints", async ({ page }) => {
    for (const sample of [
      { width: 1440, columns: 3 },
      { width: 834, columns: 2 },
      { width: 390, columns: 1 },
    ]) {
      await page.setViewportSize({ width: sample.width, height: 900 });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const grid = page.locator("#writing .atlas-writing__articles");
      const count = await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
      expect(count).toBe(sample.columns);
      await expect(grid.locator(".atlas-writing__article")).toHaveCount(3);
    }
  });

  test("reflows article titles, summaries, and publication links at 200% root text", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.locator("#writing").evaluate((section) => {
        const heading = section.querySelector<HTMLElement>("h2");
        const headingRect = heading?.getBoundingClientRect();
        const cards = Array.from(section.querySelectorAll<HTMLElement>(".atlas-writing__article"));
        const textNodes = Array.from(section.querySelectorAll<HTMLElement>(
          ".atlas-writing__category, .atlas-writing__title, .atlas-writing__summary, .atlas-writing__article-footer, .atlas-writing__directory nav, .atlas-writing__profile-link"
        ));
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingInViewport: Boolean(
            headingRect && headingRect.left >= -1 &&
            headingRect.right <= document.documentElement.clientWidth + 1
          ),
          cardCount: cards.length,
          cardOverflows: cards.some((card) => card.scrollWidth > card.clientWidth + 1),
          textOverflowTargets: textNodes
            .filter((item) => item.scrollWidth > item.clientWidth + 1)
            .map((item) => ({
              tag: item.tagName.toLowerCase(),
              className: item.className,
              text: (item.textContent ?? "").replace(/\\s+/g, " ").trim().slice(0, 100),
              scrollWidth: item.scrollWidth,
              clientWidth: item.clientWidth,
            })),
        };
      });

      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingInViewport).toBe(true);
      expect(layout.cardCount).toBe(3);
      expect(layout.cardOverflows).toBe(false);
      expect(layout.textOverflowTargets, JSON.stringify(layout.textOverflowTargets, null, 2)).toEqual([]);
    }
  });

  test("keeps article and publication links keyboard-accessible under reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const section = page.locator("#writing");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".atlas-writing__article")).toHaveCount(3);
    await expect(section.getByRole("navigation", { name: "Publication profiles" }).getByRole("link")).toHaveCount(2);
    await expect(section.locator(".atlas-writing__article-link")).toHaveCount(3);

    const links = section.locator(".atlas-writing__article-link, .atlas-writing__profile-link");
    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("opacity", "1");
    }

    await links.first().focus();
    await expect(links.first()).toBeFocused();
  });

  test("has no axe WCAG A/AA or configured best-practice violations at desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#writing").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .include("#writing")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    }
  });
});


test.describe("System Atlas contact and footer", () => {
  test("preserves the existing conversation copy and approved site destinations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok() || response?.status() === 304).toBe(true);

    const footer = page.locator(".atlas-contact-footer");
    const section = footer.locator("#contact");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", {
      level: 2,
      name: "Good work starts with a clear understanding of the problem.",
    })).toBeVisible();
    await expect(section.getByText(
      "I’m interested in thoughtful conversations around product development, enterprise workflows, software architecture, and technical collaboration.",
      { exact: true }
    )).toBeVisible();

    await expect(section.getByRole("link", { name: /Review my résumé/ })).toHaveAttribute("href", "/cv");
    await expect(section.getByRole("link", { name: /Explore work/ })).toHaveAttribute("href", "#work");
    await expect(footer.getByRole("link", { name: "UI Gerhana home" })).toHaveAttribute("href", "#top");

    const navigation = footer.getByRole("navigation", { name: "Public profiles and site links" });
    await expect(navigation.getByRole("link")).toHaveCount(4);
    await expect(navigation.getByRole("link", { name: /GitHub.*@weexdayend/ })).toHaveAttribute("href", "https://github.com/weexdayend");
    await expect(navigation.getByRole("link", { name: /DEV Community.*@uigerhana/ })).toHaveAttribute("href", "https://dev.to/uigerhana");
    await expect(navigation.getByRole("link", { name: /Medium.*@weexdayend/ })).toHaveAttribute("href", "https://medium.com/@weexdayend");
    await expect(navigation.getByRole("link", { name: "Résumé" })).toHaveAttribute("href", "/cv");

    const identity = footer.locator(".atlas-contact__identity p");
    await expect(identity).toContainText("Irvan Gerhana");
    await expect(identity).toContainText("Product Engineer");
    await expect(identity).toContainText("Bandung, Indonesia");
    await expect(footer.getByText("No direct public contact channel is listed.", { exact: true })).toBeVisible();
    await expect(footer.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  });

  test("keeps the conversation layout responsive at desktop, tablet, and mobile widths", async ({ page }) => {
    for (const sample of [
      { width: 1440, columns: 2 },
      { width: 834, columns: 1 },
      { width: 390, columns: 1 },
    ]) {
      await page.setViewportSize({ width: sample.width, height: 900 });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const content = page.locator("#contact .atlas-contact__content");
      const columns = await content.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
      expect(columns).toBe(sample.columns);
      await expect(page.locator(".atlas-contact__profile-link")).toHaveCount(4);
    }
  });

  test("reflows the conversation heading and footer metadata at 200% root text", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.evaluate(() => document.fonts.ready);

    for (const width of [390, 360, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.locator("#contact").evaluate((section) => {
        const heading = section.querySelector<HTMLElement>(".atlas-contact__title");
        const headingRect = heading?.getBoundingClientRect();
        const footer = section.querySelector<HTMLElement>(".atlas-contact__footer");
        const textNodes = Array.from(section.querySelectorAll<HTMLElement>(
          ".atlas-contact__title, .atlas-contact__introduction, .atlas-contact__identity p, .atlas-contact__availability"
        ));
        return {
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          rootFontSize: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
          headingClipped: Boolean(heading && heading.scrollWidth > heading.clientWidth + 1),
          headingInViewport: Boolean(
            headingRect && headingRect.left >= -1 &&
            headingRect.right <= document.documentElement.clientWidth + 1
          ),
          footerVisible: Boolean(footer && footer.getBoundingClientRect().width > 0),
          textOverflows: textNodes.some((item) => item.scrollWidth > item.clientWidth + 1),
        };
      });

      expect(layout.rootFontSize).toBeGreaterThanOrEqual(32);
      expect(layout.document).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
      expect(layout.headingClipped).toBe(false);
      expect(layout.headingInViewport).toBe(true);
      expect(layout.footerVisible).toBe(true);
      expect(layout.textOverflows).toBe(false);
    }
  });

  test("keeps all contact and profile links keyboard-accessible with reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const footer = page.locator(".atlas-contact-footer");
    await footer.scrollIntoViewIfNeeded();
    const links = footer.locator("a[href]");
    await expect(links).toHaveCount(8);
    await expect(footer.getByRole("link", { name: "Back to top ↑" })).toHaveAttribute("href", "#top");

    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("opacity", "1");
    }

    await links.first().focus();
    await expect(links.first()).toBeFocused();
  });

  test("has no axe WCAG A/AA or configured best-practice violations at desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .include(".atlas-contact-footer")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    }
  });
});
