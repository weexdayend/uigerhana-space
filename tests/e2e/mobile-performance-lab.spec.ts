import { writeFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"] as const;

interface MobilePerformanceState {
  lcpMs: number | null;
  lcpElement: string | null;
  cls: number;
  longTaskDurations: number[];
}

interface MobilePerformanceSample {
  route: string;
  iteration: number;
  cacheMode: "isolated-context-first-view" | "same-context-repeat";
  status: number | null;
  ttfbMs: number | null;
  fcpMs: number | null;
  lcpMs: number | null;
  lcpElement: string | null;
  cls: number | null;
  domContentLoadedMs: number | null;
  loadEventMs: number | null;
  resourceCount: number;
  transferBytes: number;
  encodedBodyBytes: number;
  decodedBodyBytes: number;
  transferByType: Record<string, number>;
  longTaskCount: number;
  longTaskTotalMs: number;
  longTaskMaxMs: number;
  viewportWidth: number;
  viewportHeight: number;
  documentScrollWidth: number;
  bodyScrollWidth: number;
  devicePixelRatio: number;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

test.describe("Phase 8.8 mobile-class performance lab", () => {
  test("records mobile-emulated constrained-network performance without field claims", async ({
    browser,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Mobile CDP emulation is recorded once in Chromium.");
    test.setTimeout(240_000);

    const baseURL = testInfo.project.use.baseURL as string;
    const samples: MobilePerformanceSample[] = [];
    const navigationErrors: Array<{
      route: string;
      iteration: number;
      consoleErrors: string[];
      pageErrors: string[];
      failedRequests: string[];
    }> = [];

    const emulation = {
      deviceClass: "mobile-class Chromium emulation",
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      cpuThrottlingRate: 4,
      network: {
        connectionType: "cellular4g",
        roundTripLatencyMs: 150,
        downloadBitsPerSecond: 1_600_000,
        uploadBitsPerSecond: 750_000,
        downloadBytesPerSecond: 200_000,
        uploadBytesPerSecond: 93_750,
      },
      cacheProtocol: "one isolated-context first view followed by one same-context repeat navigation per route",
    };

    for (const route of PUBLIC_ROUTES) {
      const context = await browser.newContext({
        viewport: emulation.viewport,
        deviceScaleFactor: emulation.deviceScaleFactor,
        isMobile: emulation.isMobile,
        hasTouch: emulation.hasTouch,
      });

      try {
        const page = await context.newPage();
        const cdp = await context.newCDPSession(page);

        await cdp.send("Network.enable");
        await cdp.send("Network.emulateNetworkConditions", {
          offline: false,
          latency: emulation.network.roundTripLatencyMs,
          downloadThroughput: emulation.network.downloadBytesPerSecond,
          uploadThroughput: emulation.network.uploadBytesPerSecond,
          connectionType: emulation.network.connectionType,
        });
        await cdp.send("Emulation.setCPUThrottlingRate", {
          rate: emulation.cpuThrottlingRate,
        });

        const consoleErrors: string[] = [];
        const pageErrors: string[] = [];
        const failedRequests: string[] = [];

        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        page.on("requestfailed", (request) => {
          failedRequests.push(
            request.url() + " — " + (request.failure()?.errorText ?? "unknown")
          );
        });

        await page.addInitScript(() => {
          const state: MobilePerformanceState = {
            lcpMs: null,
            lcpElement: null,
            cls: 0,
            longTaskDurations: [],
          };
          (window as Window & { __p8MobilePerformance?: MobilePerformanceState })
            .__p8MobilePerformance = state;

          const supported = PerformanceObserver.supportedEntryTypes ?? [];
          if (supported.includes("largest-contentful-paint")) {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const lcp = entry as PerformanceEntry & { element?: Element | null };
                state.lcpMs = Math.round(lcp.startTime * 10) / 10;
                const element = lcp.element;
                if (!element) {
                  state.lcpElement = null;
                } else {
                  const className = typeof element.className === "string"
                    ? element.className.trim().replace(/\s+/g, ".")
                    : "";
                  state.lcpElement = element.tagName.toLowerCase() +
                    (element.id ? "#" + element.id : "") +
                    (className ? "." + className : "");
                }
              }
            }).observe({ type: "largest-contentful-paint", buffered: true });
          }

          if (supported.includes("layout-shift")) {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const shift = entry as PerformanceEntry & {
                  value: number;
                  hadRecentInput: boolean;
                };
                if (!shift.hadRecentInput) state.cls += shift.value;
              }
            }).observe({ type: "layout-shift", buffered: true });
          }

          if (supported.includes("longtask")) {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                state.longTaskDurations.push(entry.duration);
              }
            }).observe({ type: "longtask", buffered: true });
          }
        });

        for (let iteration = 1; iteration <= 2; iteration += 1) {
          const consoleStart = consoleErrors.length;
          const pageErrorStart = pageErrors.length;
          const failedRequestStart = failedRequests.length;
          const targetUrl = new URL(route, baseURL).toString();
          const response = iteration === 1
            ? await page.goto(targetUrl, { waitUntil: "load", timeout: 90_000 })
            : await page.reload({ waitUntil: "load", timeout: 90_000 });

          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(350);
          expect(
            response?.status(),
            route + " mobile performance navigation " + iteration
          ).toBe(200);

          const metrics = await page.evaluate(() => {
            const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
            const paints = performance.getEntriesByType("paint");
            const fcp = paints.find((entry) => entry.name === "first-contentful-paint")
              ?.startTime ?? null;
            const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
            const transferByType: Record<string, number> = {
              script: 0,
              stylesheet: 0,
              image: 0,
              font: 0,
              other: 0,
            };

            for (const resource of resources) {
              const path = new URL(resource.name).pathname;
              let category = "other";
              if (/\.(woff2?|ttf|otf)$/i.test(path)) category = "font";
              else if (resource.initiatorType === "script" || /\.(m?js)$/i.test(path)) category = "script";
              else if (resource.initiatorType === "css" || /\.css$/i.test(path)) category = "stylesheet";
              else if (resource.initiatorType === "img" || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path)) {
                category = "image";
              }
              transferByType[category] += resource.transferSize;
            }

            const state = (window as Window & {
              __p8MobilePerformance?: MobilePerformanceState;
            }).__p8MobilePerformance;
            const longTasks = state?.longTaskDurations ?? [];

            return {
              ttfbMs: navigation
                ? navigation.responseStart - navigation.requestStart
                : null,
              fcpMs: fcp,
              lcpMs: state?.lcpMs ?? null,
              lcpElement: state?.lcpElement ?? null,
              cls: state?.cls ?? null,
              domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
              loadEventMs: navigation?.loadEventEnd ?? null,
              resourceCount: resources.length,
              transferBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
              encodedBodyBytes: resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
              decodedBodyBytes: resources.reduce((sum, resource) => sum + resource.decodedBodySize, 0),
              transferByType,
              longTaskCount: longTasks.length,
              longTaskTotalMs: longTasks.reduce((sum, duration) => sum + duration, 0),
              longTaskMaxMs: longTasks.length ? Math.max(...longTasks) : 0,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
              documentScrollWidth: document.documentElement.scrollWidth,
              bodyScrollWidth: document.body.scrollWidth,
              devicePixelRatio: window.devicePixelRatio,
            };
          });

          samples.push({
            route,
            iteration,
            cacheMode: iteration === 1
              ? "isolated-context-first-view"
              : "same-context-repeat",
            status: response?.status() ?? null,
            ...metrics,
          });

          navigationErrors.push({
            route,
            iteration,
            consoleErrors: consoleErrors.slice(consoleStart),
            pageErrors: pageErrors.slice(pageErrorStart),
            failedRequests: failedRequests.slice(failedRequestStart),
          });
        }

        await cdp.detach();
      } finally {
        await context.close();
      }
    }

    const summaries = PUBLIC_ROUTES.map((route) => {
      const routeSamples = samples.filter((sample) => sample.route === route);
      return {
        route,
        sampleCount: routeSamples.length,
        median: {
          ttfbMs: median(routeSamples.map((sample) => sample.ttfbMs).filter(
            (value): value is number => value !== null
          )),
          fcpMs: median(routeSamples.map((sample) => sample.fcpMs).filter(
            (value): value is number => value !== null
          )),
          lcpMs: median(routeSamples.map((sample) => sample.lcpMs).filter(
            (value): value is number => value !== null
          )),
          cls: median(routeSamples.map((sample) => sample.cls).filter(
            (value): value is number => value !== null
          )),
          transferBytes: median(routeSamples.map((sample) => sample.transferBytes)),
          resourceCount: median(routeSamples.map((sample) => sample.resourceCount)),
          longTaskTotalMs: median(routeSamples.map((sample) => sample.longTaskTotalMs)),
        },
        horizontalOverflowSamples: routeSamples.filter(
          (sample) => sample.documentScrollWidth > sample.viewportWidth
        ).length,
      };
    });

    const report = {
      scope: "mobile-class Chromium lab emulation against the local production build",
      sourceCommit: process.env.GITHUB_SHA ?? null,
      browser: "Chromium",
      browserVersion: browser.version(),
      checkedAt: new Date().toISOString(),
      routes: [...PUBLIC_ROUTES],
      emulation,
      metricsCollected: [
        "navigation TTFB",
        "First Contentful Paint",
        "Largest Contentful Paint and its element",
        "Cumulative Layout Shift",
        "DOMContentLoaded and load-event timing",
        "resource count and transfer/encoded/decoded bytes",
        "script, stylesheet, image, and font transfer bytes",
        "long-task count and duration",
        "viewport and document/body scroll widths",
      ],
      notClaimed: [
        "physical Android or iOS device performance",
        "field Core Web Vitals or representative-user network performance",
        "Interaction to Next Paint (INP)",
        "battery, thermal, GPU, or memory behavior of a physical device",
        "real carrier variability, radio conditions, or server/CDN geography",
      ],
      budgetPolicy: "Observational baseline only; do not infer pass/fail budgets from this first mobile-emulated sample.",
      summaries,
      samples,
      navigationErrors,
    };

    const body = JSON.stringify(report, null, 2);
    await writeFile(testInfo.outputPath("phase-8-mobile-performance-lab.json"), body);
    await testInfo.attach("phase-8-mobile-performance-lab.json", {
      body,
      contentType: "application/json",
    });

    expect(samples).toHaveLength(PUBLIC_ROUTES.length * 2);
    expect(samples.every((sample) => sample.status === 200)).toBe(true);
    expect(samples.every((sample) =>
      sample.viewportWidth === emulation.viewport.width &&
      sample.devicePixelRatio === emulation.deviceScaleFactor
    )).toBe(true);
  });
});
