import { writeFile } from "node:fs/promises";
import { expect, test, type Locator } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const DEVICE_SCALE_FACTOR = 3;
const MINIMUM_TARGET_SIZE = 24;
const PUBLIC_CASE_STUDY = "/work/uigerhana-space";

interface TargetEvidence {
  label: string;
  width: number;
  height: number;
  left: number;
  top: number;
  route: string;
}

interface TouchNavigationEvidence {
  action: string;
  target: TargetEvidence;
  resultingUrl: string;
  menuExpanded: boolean | null;
}

async function captureTarget(locator: Locator, label: string): Promise<TargetEvidence> {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error("Touch target is not measurable: " + label);

  expect(box.width, label + " width").toBeGreaterThanOrEqual(MINIMUM_TARGET_SIZE);
  expect(box.height, label + " height").toBeGreaterThanOrEqual(MINIMUM_TARGET_SIZE);

  return {
    label,
    width: Math.round(box.width * 10) / 10,
    height: Math.round(box.height * 10) / 10,
    left: Math.round(box.x * 10) / 10,
    top: Math.round(box.y * 10) / 10,
    route: new URL(locator.page().url()).pathname,
  };
}

async function tapAndRecord(
  locator: Locator,
  label: string,
  actions: TouchNavigationEvidence[]
): Promise<TargetEvidence> {
  const target = await captureTarget(locator, label);
  await locator.tap();
  actions.push({
    action: label,
    target,
    resultingUrl: locator.page().url(),
    menuExpanded: await locator.page()
      .locator('button[aria-controls="mobile-navigation"]')
      .getAttribute("aria-expanded")
      .then((value) => value === null ? null : value === "true"),
  });
  return target;
}

test.describe("Phase 8.9 mobile touch journeys", () => {
  test("completes the primary mobile journey using touch taps", async ({ browser }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Touch-device emulation and its evidence are recorded once in Chromium."
    );

    const context = await browser.newContext({
      viewport: MOBILE_VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      isMobile: true,
      hasTouch: true,
    });

    try {
      const page = await context.newPage();
      const actions: TouchNavigationEvidence[] = [];
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));

      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      const menuTrigger = page.locator('button[aria-controls="mobile-navigation"]');
      await tapAndRecord(menuTrigger, "Open mobile navigation", actions);
      await expect(menuTrigger).toHaveAttribute("aria-expanded", "true");

      const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(mobileNavigation).toBeVisible();
      const workLink = mobileNavigation.getByRole("link", { name: "Work" });
      await tapAndRecord(workLink, "Navigate to selected work anchor", actions);

      await expect(page).toHaveURL(/#work$/);
      await expect(page.locator("#work")).toBeVisible();
      await expect(mobileNavigation).toBeHidden();
      await expect(menuTrigger).toHaveAttribute("aria-expanded", "false");

      const exploreAllWork = page.getByRole("link", { name: "Explore all work" });
      await tapAndRecord(exploreAllWork, "Open work index", actions);
      await expect(page).toHaveURL(/\/work$/);
      await expect(page.getByRole("heading", { level: 1, name: "Work shaped by real problems." }))
        .toBeVisible();

      const readCaseStudy = page.getByRole("link", { name: /Read case study/ });
      await tapAndRecord(readCaseStudy, "Open approved case study", actions);
      await expect(page).toHaveURL(new RegExp(PUBLIC_CASE_STUDY.replaceAll("/", "\\/") + "$"));
      await expect(page.locator("[data-case-study-detail]")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

      const finalGeometry = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        devicePixelRatio: window.devicePixelRatio,
      }));
      expect(finalGeometry.documentWidth).toBeLessThanOrEqual(finalGeometry.viewportWidth + 1);
      expect(finalGeometry.bodyWidth).toBeLessThanOrEqual(finalGeometry.viewportWidth + 1);
      expect(finalGeometry.devicePixelRatio).toBe(DEVICE_SCALE_FACTOR);
      expect(runtimeErrors).toEqual([]);

      const evidence = {
        scope: "touch tap navigation journey on a mobile-class Chromium context",
        browser: browser.version(),
        viewport: MOBILE_VIEWPORT,
        deviceScaleFactor: DEVICE_SCALE_FACTOR,
        isMobile: true,
        hasTouch: true,
        actions,
        finalRoute: page.url(),
        finalGeometry,
        runtimeErrors,
        boundaries: [
          "This is Playwright/Chromium touch emulation, not a physical iOS or Android device.",
          "The 24 CSS-pixel target minimum is the automated sample threshold; it does not establish complete touch usability or native assistive-technology acceptance.",
        ],
      };

      const body = JSON.stringify(evidence, null, 2);
      await writeFile(testInfo.outputPath("mobile-touch-navigation-journey.json"), body);
      await testInfo.attach("mobile-touch-navigation-journey.json", {
        body,
        contentType: "application/json",
      });
      await page.screenshot({
        path: testInfo.outputPath("mobile-touch-case-study.png"),
        fullPage: true,
        animations: "disabled",
      });
    } finally {
      await context.close();
    }
  });

  test("advances the horizontal Product Journey through touch swipes", async ({ browser }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "CDP touch gesture evidence is recorded once in Chromium."
    );

    const context = await browser.newContext({
      viewport: MOBILE_VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      isMobile: true,
      hasTouch: true,
    });

    try {
      const page = await context.newPage();
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      const region = page.getByRole("region", { name: "Product journey" });
      await region.scrollIntoViewIfNeeded();
      await expect(region).toBeVisible();

      const cdp = await context.newCDPSession(page);
      const initial = await region.evaluate((element) => ({
        scrollLeft: element.scrollLeft,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        panelCount: element.querySelectorAll("[data-story-panel]").length,
        viewport: element.getBoundingClientRect().toJSON(),
      }));

      expect(initial.panelCount).toBe(4);
      expect(initial.scrollWidth).toBeGreaterThan(initial.clientWidth);

      const swipeEvidence: Array<{
        gesture: number;
        start: { x: number; y: number };
        end: { x: number; y: number };
        scrollLeftBefore: number;
        scrollLeftAfter: number;
        mostVisiblePanel: number;
        panelVisibility: number[];
      }> = [];

      for (let gesture = 1; gesture <= 4; gesture += 1) {
        const box = await region.boundingBox();
        if (!box) throw new Error("Product Journey touch viewport is not measurable.");

        const xStart = Math.min(
          MOBILE_VIEWPORT.width - 24,
          Math.max(24, Math.round(box.x + box.width * 0.84))
        );
        const xEnd = Math.max(24, Math.round(xStart - 250));
        const y = Math.min(
          MOBILE_VIEWPORT.height - 24,
          Math.max(72, Math.round(box.y + Math.min(220, box.height * 0.42)))
        );

        const before = await region.evaluate((element) => element.scrollLeft);
        const touchPoint = (x: number) => ({
          x,
          y,
          id: 1,
          radiusX: 2,
          radiusY: 2,
          force: 1,
        });

        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [touchPoint(xStart)],
        });

        for (let step = 1; step <= 6; step += 1) {
          const x = Math.round(xStart + ((xEnd - xStart) * step) / 6);
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [touchPoint(x)],
          });
          await page.waitForTimeout(20);
        }

        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
        await page.waitForTimeout(450);

        const after = await region.evaluate((element) => {
          const viewport = element.getBoundingClientRect();
          const panels = Array.from(
            element.querySelectorAll<HTMLElement>("[data-story-panel]")
          );
          const panelVisibility = panels.map((panel) => {
            const rect = panel.getBoundingClientRect();
            const visibleWidth = Math.max(
              0,
              Math.min(rect.right, viewport.right) - Math.max(rect.left, viewport.left)
            );
            return Math.round((visibleWidth / Math.max(rect.width, 1)) * 100) / 100;
          });
          return {
            scrollLeft: element.scrollLeft,
            panelVisibility,
            mostVisiblePanel: panelVisibility.indexOf(Math.max(...panelVisibility)),
          };
        });

        swipeEvidence.push({
          gesture,
          start: { x: xStart, y },
          end: { x: xEnd, y },
          scrollLeftBefore: Math.round(before * 10) / 10,
          scrollLeftAfter: Math.round(after.scrollLeft * 10) / 10,
          mostVisiblePanel: after.mostVisiblePanel + 1,
          panelVisibility: after.panelVisibility,
        });
      }

      const finalState = await region.evaluate((element) => {
        const viewport = element.getBoundingClientRect();
        const panels = Array.from(
          element.querySelectorAll<HTMLElement>("[data-story-panel]")
        );
        const last = panels[panels.length - 1].getBoundingClientRect();
        const visibleLastPanelWidth = Math.max(
          0,
          Math.min(last.right, viewport.right) - Math.max(last.left, viewport.left)
        );
        return {
          scrollLeft: element.scrollLeft,
          maxScrollLeft: element.scrollWidth - element.clientWidth,
          lastPanelVisibleRatio: visibleLastPanelWidth / Math.max(last.width, 1),
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          devicePixelRatio: window.devicePixelRatio,
        };
      });

      expect(finalState.scrollLeft).toBeGreaterThan(initial.scrollLeft);
      expect(finalState.lastPanelVisibleRatio).toBeGreaterThan(0.6);
      expect(finalState.documentWidth).toBeLessThanOrEqual(finalState.viewportWidth + 1);
      expect(finalState.bodyWidth).toBeLessThanOrEqual(finalState.viewportWidth + 1);
      expect(finalState.devicePixelRatio).toBe(DEVICE_SCALE_FACTOR);
      expect(runtimeErrors).toEqual([]);

      const evidence = {
        scope: "CDP-dispatched touch swipes against the native horizontal Product Journey scroller",
        browser: browser.version(),
        viewport: MOBILE_VIEWPORT,
        deviceScaleFactor: DEVICE_SCALE_FACTOR,
        initial,
        swipes: swipeEvidence,
        finalState,
        runtimeErrors,
        boundaries: [
          "CDP touch input is an emulated browser gesture, not a physical touchscreen or OS gesture recognizer.",
          "This proves the browser scroll container advances under touch input; it does not certify every device, gesture velocity, or accessibility mode.",
        ],
      };

      const body = JSON.stringify(evidence, null, 2);
      await writeFile(testInfo.outputPath("mobile-touch-product-journey-swipe.json"), body);
      await testInfo.attach("mobile-touch-product-journey-swipe.json", {
        body,
        contentType: "application/json",
      });
      await cdp.detach();
      await page.screenshot({
        path: testInfo.outputPath("mobile-touch-product-journey-final-panel.png"),
        fullPage: false,
        animations: "disabled",
      });
    } finally {
      await context.close();
    }
  });
});
