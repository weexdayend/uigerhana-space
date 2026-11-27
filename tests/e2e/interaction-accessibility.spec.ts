import { writeFile } from "node:fs/promises";
import { expect, test, type Locator, type Page } from "@playwright/test";

interface FocusAuditCase {
  route: string;
  viewport: { width: number; height: number };
  selectors: string[];
}

interface FocusAuditRecord {
  route: string;
  selector: string;
  outlineStyle: string;
  outlineWidth: string;
  outlineColor: string;
  outlineOffset: string;
  bounds: { width: number; height: number };
}

interface TargetSizeRecord {
  route: string;
  selector: string;
  bounds: { width: number; height: number };
  minimumCssPixels: number;
}

interface HoverAuditCase {
  route: string;
  viewport: { width: number; height: number };
  selector: string;
  property: "backgroundColor" | "borderColor" | "color" | "textDecorationColor";
  label: string;
}

async function focusByTab(page: Page, locator: Locator) {
  for (let index = 0; index < 100; index += 1) {
    await page.keyboard.press("Tab");
    const isFocused = await locator.evaluate((element) => document.activeElement === element);
    if (isFocused) return;
  }

  throw new Error("Keyboard traversal did not reach " + (await locator.getAttribute("class")));
}

const FOCUS_AUDIT_CASES: FocusAuditCase[] = [
  {
    route: "/",
    viewport: { width: 1440, height: 900 },
    selectors: [
      ".atlas-header__link",
      ".atlas-header__resume",
      ".hero-atlas__primary-link",
      ".hero-atlas__secondary-link",
      ".atlas-contact__action--primary",
      ".atlas-contact__action--secondary",
      ".atlas-contact__profile-link",
      ".atlas-contact__back-to-top",
    ],
  },
  {
    route: "/",
    viewport: { width: 390, height: 844 },
    selectors: [".atlas-header__menu", ".hero-atlas__primary-link", ".hero-atlas__secondary-link"],
  },
  {
    route: "/work",
    viewport: { width: 1440, height: 900 },
    selectors: [
      ".atlas-route-header__link",
      ".atlas-route-header__resume",
      ".atlas-case-study__action",
      ".atlas-work-index__footer-link",
    ],
  },
  {
    route: "/work/uigerhana-space",
    viewport: { width: 1440, height: 900 },
    selectors: [
      ".atlas-detail__nav-link",
      ".atlas-detail__resume-link",
      ".atlas-detail__footer-link",
      ".atlas-detail__footer-home",
    ],
  },
  {
    route: "/cv",
    viewport: { width: 1440, height: 900 },
    selectors: [".resume-back-link", ".resume-print-button", ".resume-publication-link"],
  },
];

const TARGET_SIZE_CASES: Array<{
  route: string;
  selectors: string[];
}> = [
  {
    route: "/",
    selectors: [
      ".atlas-header__menu",
      ".hero-atlas__primary-link",
      ".hero-atlas__secondary-link",
      ".atlas-contact__action--primary",
      ".atlas-contact__action--secondary",
    ],
  },
  {
    route: "/cv",
    selectors: [".resume-print-button"],
  },
];

const HOVER_AUDIT_CASES: HoverAuditCase[] = [
  {
    route: "/",
    viewport: { width: 390, height: 844 },
    selector: ".atlas-header__menu",
    property: "backgroundColor",
    label: "Mobile menu button",
  },
  {
    route: "/",
    viewport: { width: 1440, height: 900 },
    selector: ".hero-atlas__primary-link",
    property: "backgroundColor",
    label: "Hero primary action",
  },
  {
    route: "/",
    viewport: { width: 1440, height: 900 },
    selector: ".hero-atlas__secondary-link",
    property: "backgroundColor",
    label: "Hero secondary action",
  },
  {
    route: "/",
    viewport: { width: 1440, height: 900 },
    selector: ".atlas-contact__action--primary",
    property: "backgroundColor",
    label: "Contact primary action",
  },
  {
    route: "/work",
    viewport: { width: 1440, height: 900 },
    selector: ".atlas-case-study__action",
    property: "color",
    label: "Case-study action link",
  },
  {
    route: "/work/uigerhana-space",
    viewport: { width: 1440, height: 900 },
    selector: ".atlas-detail__nav-link",
    property: "color",
    label: "Case-study navigation link",
  },
  {
    route: "/cv",
    viewport: { width: 1440, height: 900 },
    selector: ".resume-print-button",
    property: "backgroundColor",
    label: "Résumé print action",
  },
];

test.describe("Phase 8.4 interaction accessibility states", () => {
  test("primary actions expose a visible keyboard focus ring across public routes", async ({
    page,
  }, testInfo) => {
    const records: FocusAuditRecord[] = [];

    for (const auditCase of FOCUS_AUDIT_CASES) {
      await page.setViewportSize(auditCase.viewport);
      await page.goto(auditCase.route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1").first()).toBeVisible();
      await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) active.blur();
      });

      for (const selector of auditCase.selectors) {
        const target = page.locator(selector).first();
        await expect(target, auditCase.route + " " + selector).toBeVisible();
        await focusByTab(page, target);

        const appearance = await target.evaluate((element) => {
          const style = getComputedStyle(element);
          const bounds = element.getBoundingClientRect();
          return {
            outlineStyle: style.outlineStyle,
            outlineWidth: style.outlineWidth,
            outlineColor: style.outlineColor,
            outlineOffset: style.outlineOffset,
            bounds: { width: bounds.width, height: bounds.height },
          };
        });

        expect(
          appearance.outlineStyle,
          "Keyboard focus must have a visible outline: " + auditCase.route + " " + selector
        ).not.toBe("none");
        expect(
          Number.parseFloat(appearance.outlineWidth),
          "Keyboard focus outline must be at least 2 CSS px: " + auditCase.route + " " + selector
        ).toBeGreaterThanOrEqual(2);
        expect(
          appearance.outlineColor,
          "Keyboard focus outline must not be transparent: " + auditCase.route + " " + selector
        ).not.toBe("rgba(0, 0, 0, 0)");
        expect(Number.parseFloat(appearance.outlineOffset)).toBeGreaterThan(0);

        records.push({
          route: auditCase.route,
          selector,
          ...appearance,
        });
      }
    }

    const evidence = {
      method: "Tab-key traversal to each representative primary action",
      viewportCases: FOCUS_AUDIT_CASES.map(({ route, viewport }) => ({ route, viewport })),
      recordCount: records.length,
      records,
    };
    const body = JSON.stringify(evidence, null, 2);
    await writeFile(testInfo.outputPath("keyboard-focus-visible-state-audit.json"), body);
    await testInfo.attach("keyboard-focus-visible-state-audit.json", {
      body,
      contentType: "application/json",
    });
  });

  test("mobile navigation links retain visible focus after opening the menu", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const menuButton = page.locator(".atlas-header__menu");
    await expect(menuButton).toBeVisible();
    await page.evaluate(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement) active.blur();
    });
    await focusByTab(page, menuButton);
    await page.keyboard.press("Enter");
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const records: FocusAuditRecord[] = [];
    for (const selector of [".atlas-header__mobile-link", ".atlas-header__mobile-resume"]) {
      const target = page.locator(selector).first();
      await expect(target).toBeVisible();
      await focusByTab(page, target);
      const appearance = await target.evaluate((element) => {
        const style = getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        return {
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          outlineColor: style.outlineColor,
          outlineOffset: style.outlineOffset,
          bounds: { width: bounds.width, height: bounds.height },
        };
      });

      expect(appearance.outlineStyle).not.toBe("none");
      expect(Number.parseFloat(appearance.outlineWidth)).toBeGreaterThanOrEqual(2);
      expect(appearance.outlineColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(Number.parseFloat(appearance.outlineOffset)).toBeGreaterThan(0);
      records.push({ route: "/", selector, ...appearance });
    }

    const body = JSON.stringify({ records }, null, 2);
    await writeFile(testInfo.outputPath("mobile-navigation-focus-state-audit.json"), body);
    await testInfo.attach("mobile-navigation-focus-state-audit.json", {
      body,
      contentType: "application/json",
    });
  });

  test("primary mobile controls meet the 24 by 24 CSS-pixel target-size minimum", async ({
    page,
  }, testInfo) => {
    const records: TargetSizeRecord[] = [];
    const minimumCssPixels = 24;

    for (const auditCase of TARGET_SIZE_CASES) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(auditCase.route, { waitUntil: "domcontentloaded" });

      for (const selector of auditCase.selectors) {
        const target = page.locator(selector).first();
        await expect(target, auditCase.route + " " + selector).toBeVisible();
        const bounds = await target.boundingBox();
        expect(bounds, "Target must have a measurable hit area: " + selector).not.toBeNull();

        const size = { width: bounds!.width, height: bounds!.height };
        expect(
          size.width,
          "Primary target must be at least 24 CSS px wide: " + auditCase.route + " " + selector
        ).toBeGreaterThanOrEqual(minimumCssPixels);
        expect(
          size.height,
          "Primary target must be at least 24 CSS px high: " + auditCase.route + " " + selector
        ).toBeGreaterThanOrEqual(minimumCssPixels);

        records.push({
          route: auditCase.route,
          selector,
          bounds: size,
          minimumCssPixels,
        });
      }
    }

    const evidence = {
      standard: "WCAG 2.2 SC 2.5.8 minimum target size — audited primary control/CTA hit areas only",
      minimumCssPixels,
      excluded: "Inline prose links and general text links are not treated as standalone controls in this target-size sample.",
      records,
    };
    const body = JSON.stringify(evidence, null, 2);
    await writeFile(testInfo.outputPath("primary-target-size-audit.json"), body);
    await testInfo.attach("primary-target-size-audit.json", {
      body,
      contentType: "application/json",
    });
  });

  test("pointer hover produces an observable state change on representative controls", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Pointer-state measurement is recorded once in Chromium.");

    const records: Array<{
      route: string;
      label: string;
      selector: string;
      property: HoverAuditCase["property"];
      before: string;
      after: string;
    }> = [];

    for (const auditCase of HOVER_AUDIT_CASES) {
      await page.setViewportSize(auditCase.viewport);
      await page.goto(auditCase.route, { waitUntil: "domcontentloaded" });
      const target = page.locator(auditCase.selector).first();
      await expect(target, auditCase.label).toBeVisible();

      const before = await target.evaluate(
        (element, property) => getComputedStyle(element)[property],
        auditCase.property
      );
      await target.hover();
      await page.waitForTimeout(240);
      const after = await target.evaluate(
        (element, property) => getComputedStyle(element)[property],
        auditCase.property
      );

      expect(
        after,
        "Hover must change " + auditCase.property + " for " + auditCase.label
      ).not.toBe(before);
      records.push({
        route: auditCase.route,
        label: auditCase.label,
        selector: auditCase.selector,
        property: auditCase.property,
        before,
        after,
      });
    }

    const body = JSON.stringify({ records }, null, 2);
    await writeFile(testInfo.outputPath("pointer-hover-state-audit.json"), body);
    await testInfo.attach("pointer-hover-state-audit.json", {
      body,
      contentType: "application/json",
    });
  });

  test("mobile navigation pointer activation opens and closes the menu", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const menuButton = page.locator(".atlas-header__menu");
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(navigation).toBeVisible();
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(navigation).toHaveCount(0);

    const evidence = {
      route: "/",
      viewport: { width: 390, height: 844 },
      activation: "pointer",
      openState: { ariaExpanded: "true", navigationVisible: true },
      closedState: { ariaExpanded: "false", navigationCount: 0 },
    };
    const body = JSON.stringify(evidence, null, 2);
    await writeFile(testInfo.outputPath("mobile-navigation-pointer-state-audit.json"), body);
    await testInfo.attach("mobile-navigation-pointer-state-audit.json", {
      body,
      contentType: "application/json",
    });
  });
});
