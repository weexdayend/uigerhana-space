import { writeFile } from "node:fs/promises";
import { expect, test, type Locator, type Page } from "@playwright/test";

interface Backdrop {
  status: "resolved" | "unresolved";
  color: string | null;
  source: string | null;
  reason?: string;
}

interface FocusContrastRecord {
  selector: string;
  outlineColor: string;
  outlineStyle: string;
  outlineWidthPx: number;
  outlineOffsetPx: number;
  backdrop: Backdrop;
  contrastRatio: number | null;
}

interface HoverContrastRecord {
  route: string;
  selector: string;
  color: string;
  backdrop: Backdrop;
  contrastRatio: number | null;
}

async function focusByTab(page: Page, locator: Locator) {
  for (let index = 0; index < 100; index += 1) {
    await page.keyboard.press("Tab");
    const focused = await locator.evaluate((element) => document.activeElement === element);
    if (focused) return;
  }

  throw new Error("Keyboard traversal did not reach the requested contrast-audit target.");
}

function contrastFromRgb(foreground: string, background: string) {
  const channels = (value: string) => {
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
    if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) return null;
    return parts.slice(0, 3).map((part) => {
      const channel = part / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
  };

  const fg = channels(foreground);
  const bg = channels(background);
  if (!fg || !bg) return null;
  const luminance = (rgb: number[]) =>
    0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const first = luminance(fg);
  const second = luminance(bg);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

async function readFocusContrast(locator: Locator): Promise<FocusContrastRecord> {
  const measurement = await locator.evaluate((element) => {
    const parseColor = (value: string) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) return null;
      return {
        red: parts[0],
        green: parts[1],
        blue: parts[2],
        alpha: Number.isFinite(parts[3]) ? parts[3] : 1,
      };
    };

    const layers: Array<{ red: number; green: number; blue: number; alpha: number }> = [];
    let node = element.parentElement;
    let source: string | null = null;
    let unresolvedReason: string | null = null;

    while (node) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none") {
        unresolvedReason = "A background image/gradient is present before a solid backdrop is found.";
        break;
      }

      const color = parseColor(style.backgroundColor);
      if (!color) {
        unresolvedReason = "The computed backdrop color could not be parsed.";
        break;
      }

      if (color.alpha > 0) {
        layers.push(color);
        if (color.alpha >= 0.999) {
          source = node.tagName.toLowerCase() + (node.id ? "#" + node.id : "");
          break;
        }
      }

      node = node.parentElement;
    }

    if (!source && !unresolvedReason) {
      unresolvedReason = "No opaque solid ancestor backdrop was found.";
    }

    let backdrop: Backdrop;
    if (!source) {
      backdrop = {
        status: "unresolved",
        color: null,
        source: null,
        reason: unresolvedReason ?? "Backdrop resolution failed.",
      };
    } else {
      let composed = layers[layers.length - 1];
      for (let index = layers.length - 2; index >= 0; index -= 1) {
        const layer = layers[index];
        composed = {
          red: layer.red * layer.alpha + composed.red * (1 - layer.alpha),
          green: layer.green * layer.alpha + composed.green * (1 - layer.alpha),
          blue: layer.blue * layer.alpha + composed.blue * (1 - layer.alpha),
          alpha: 1,
        };
      }
      backdrop = {
        status: "resolved",
        color:
          "rgb(" +
          Math.round(composed.red) +
          ", " +
          Math.round(composed.green) +
          ", " +
          Math.round(composed.blue) +
          ")",
        source,
      };
    }

    const style = getComputedStyle(element);
    return {
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidthPx: Number.parseFloat(style.outlineWidth),
      outlineOffsetPx: Number.parseFloat(style.outlineOffset),
      backdrop,
    };
  });

  const ratio =
    measurement.backdrop.status === "resolved" && measurement.backdrop.color
      ? contrastFromRgb(measurement.outlineColor, measurement.backdrop.color)
      : null;

  return {
    selector: await locator.getAttribute("class") ?? "unclassified",
    ...measurement,
    contrastRatio: ratio,
  };
}

async function readHoverContrast(
  locator: Locator,
  route: string,
  selector: string
): Promise<HoverContrastRecord> {
  const measurement = await locator.evaluate((element) => {
    const parseColor = (value: string) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) return null;
      return {
        red: parts[0],
        green: parts[1],
        blue: parts[2],
        alpha: Number.isFinite(parts[3]) ? parts[3] : 1,
      };
    };

    const layers: Array<{ red: number; green: number; blue: number; alpha: number }> = [];
    let node: Element | null = element;
    let source: string | null = null;
    let unresolvedReason: string | null = null;

    while (node) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none") {
        unresolvedReason = "A background image/gradient is present before a solid backdrop is found.";
        break;
      }

      const color = parseColor(style.backgroundColor);
      if (!color) {
        unresolvedReason = "The computed backdrop color could not be parsed.";
        break;
      }

      if (color.alpha > 0) {
        layers.push(color);
        if (color.alpha >= 0.999) {
          source = node.tagName.toLowerCase() + (node.id ? "#" + node.id : "");
          break;
        }
      }

      node = node.parentElement;
    }

    if (!source && !unresolvedReason) {
      unresolvedReason = "No opaque solid ancestor backdrop was found.";
    }

    let backdrop: Backdrop;
    if (!source) {
      backdrop = {
        status: "unresolved",
        color: null,
        source: null,
        reason: unresolvedReason ?? "Backdrop resolution failed.",
      };
    } else {
      let composed = layers[layers.length - 1];
      for (let index = layers.length - 2; index >= 0; index -= 1) {
        const layer = layers[index];
        composed = {
          red: layer.red * layer.alpha + composed.red * (1 - layer.alpha),
          green: layer.green * layer.alpha + composed.green * (1 - layer.alpha),
          blue: layer.blue * layer.alpha + composed.blue * (1 - layer.alpha),
          alpha: 1,
        };
      }
      backdrop = {
        status: "resolved",
        color:
          "rgb(" +
          Math.round(composed.red) +
          ", " +
          Math.round(composed.green) +
          ", " +
          Math.round(composed.blue) +
          ")",
        source,
      };
    }

    return { color: getComputedStyle(element).color, backdrop };
  });

  const ratio =
    measurement.backdrop.status === "resolved" && measurement.backdrop.color
      ? contrastFromRgb(measurement.color, measurement.backdrop.color)
      : null;

  return { route, selector, ...measurement, contrastRatio: ratio };
}

test.describe("Phase 8.5 interactive state contrast", () => {
  test("résumé focus indicators retain at least 3:1 contrast on dark and light surfaces", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();

    const selectors = [
      ".resume-back-link",
      ".resume-print-button",
      ".resume-publication-link",
    ];
    const records: FocusContrastRecord[] = [];

    for (const selector of selectors) {
      const target = page.locator(selector).first();
      await expect(target, selector).toBeVisible();
      await focusByTab(page, target);
      const record = await readFocusContrast(target);
      records.push(record);

      expect(record.outlineStyle, selector + " focus outline style").not.toBe("none");
      expect(record.outlineWidthPx, selector + " focus outline width").toBeGreaterThanOrEqual(2);
      expect(record.outlineOffsetPx, selector + " focus outline offset").toBeGreaterThanOrEqual(2);
      expect(record.backdrop.status, selector + " solid adjacent surface").toBe("resolved");
      expect(record.contrastRatio, selector + " focus indicator contrast").not.toBeNull();
      expect(record.contrastRatio!, selector + " focus indicator must reach 3:1").toBeGreaterThanOrEqual(3);
    }

    const evidence = {
      method: "Keyboard Tab traversal; computed focus outline measured against the nearest resolved solid parent surface.",
      criterion: "WCAG 2.2 SC 1.4.11 Non-text Contrast: focus-state information is at least 3:1 against adjacent color(s).",
      route: "/cv",
      records,
    };
    const body = JSON.stringify(evidence, null, 2);
    await writeFile(testInfo.outputPath("focus-indicator-contrast-audit.json"), body);
    await testInfo.attach("focus-indicator-contrast-audit.json", {
      body,
      contentType: "application/json",
    });
  });

  test("representative résumé and contact hover text retains 4.5:1 contrast", async ({
    page,
  }, testInfo) => {
    const cases = [
      { route: "/cv", selector: ".resume-back-link", label: "Résumé back link" },
      { route: "/cv", selector: ".resume-print-button", label: "Résumé print action" },
      { route: "/cv", selector: ".resume-publication-link", label: "Résumé publication link" },
      { route: "/", selector: ".atlas-contact__action--secondary", label: "Contact secondary action" },
    ];
    const records: HoverContrastRecord[] = [];

    for (const auditCase of cases) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(auditCase.route, { waitUntil: "domcontentloaded" });
      const target = page.locator(auditCase.selector).first();
      await expect(target, auditCase.label).toBeVisible();
      await target.hover();
      await page.waitForTimeout(240);

      const record = await readHoverContrast(target, auditCase.route, auditCase.selector);
      records.push(record);
      expect(record.backdrop.status, auditCase.label + " solid text backdrop").toBe("resolved");
      expect(record.contrastRatio, auditCase.label + " text contrast").not.toBeNull();
      expect(record.contrastRatio!, auditCase.label + " normal text must reach 4.5:1").toBeGreaterThanOrEqual(4.5);
    }

    const evidence = {
      method: "Pointer hover; computed text color measured against the composited solid background of the element and its ancestors.",
      criterion: "WCAG 2.2 SC 1.4.3 normal text contrast: at least 4.5:1.",
      records,
    };
    const body = JSON.stringify(evidence, null, 2);
    await writeFile(testInfo.outputPath("hover-text-contrast-audit.json"), body);
    await testInfo.attach("hover-text-contrast-audit.json", {
      body,
      contentType: "application/json",
    });
  });
});
