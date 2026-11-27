import { writeFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const SITE_ORIGIN = "https://uigerhana.space";
const PUBLIC_ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"] as const;
const DRAFT_CASE_STUDY_ROUTES = [
  "/work/professional-services-automation-platform",
  "/work/passwordless-team-invitations",
  "/work/verifiable-backup-and-recovery-operations",
] as const;

interface RouteLinkRecord {
  sourceRoute: string;
  href: string;
  text: string;
  ariaLabel: string | null;
  target: string | null;
  rel: string | null;
  kind: "internal" | "external" | "mailto" | "tel";
}

interface PerformanceState {
  lcpMs: number | null;
  lcpElement: string | null;
  cls: number;
  longTaskDurations: number[];
}

interface PerformanceSample {
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
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

test.describe("release route and link integrity", () => {
  test("serves the complete public route set with canonical metadata, sitemap, and robots", async ({
    page,
    request,
  }, testInfo) => {
    const routeEvidence: Array<{
      route: string;
      status: number;
      title: string;
      description: string;
      canonical: string | null;
      headingCount: number;
      duplicateIds: string[];
    }> = [];

    for (const route of PUBLIC_ROUTES) {
      const response = await request.get(route);
      expect(response.status(), route + " response status").toBe(200);

      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1").first(), route + " primary heading").toBeVisible();

      const metadata = await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll<HTMLElement>("[id]"))
          .map((element) => element.id);
        const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        return {
          title: document.title.trim(),
          description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content.trim() ?? "",
          canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? null,
          headingCount: document.querySelectorAll("main h1, main h2, main h3, main h4").length,
          duplicateIds,
        };
      });

      expect(metadata.title, route + " document title").not.toBe("");
      expect(metadata.description, route + " meta description").not.toBe("");
      expect(metadata.canonical, route + " canonical URL").toBe(
        SITE_ORIGIN + (route === "/" ? "/" : route)
      );
      expect(metadata.duplicateIds, route + " duplicate DOM IDs").toEqual([]);

      routeEvidence.push({ route, status: response.status(), ...metadata });
    }

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.status(), "sitemap.xml response").toBe(200);
    const sitemap = await sitemapResponse.text();
    const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((match) => new URL(match[1].replace(/&amp;/g, "&")).href)
      .sort();
    const expectedSitemapUrls = PUBLIC_ROUTES
      .map((route) => SITE_ORIGIN + (route === "/" ? "/" : route))
      .sort();
    expect(sitemapUrls, "public sitemap route inventory").toEqual(expectedSitemapUrls);

    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.status(), "robots.txt response").toBe(200);
    const robots = await robotsResponse.text();
    expect(robots).toMatch(/User-agent:\s*\*/i);
    expect(robots).toMatch(/Allow:\s*\/(?:\s|$)/i);
    expect(robots).toContain(SITE_ORIGIN + "/sitemap.xml");

    const draftRoutes = [];
    for (const draftRoute of DRAFT_CASE_STUDY_ROUTES) {
      const draftResponse = await request.get(draftRoute);
      expect(draftResponse.status(), "unapproved draft case study must not be public: " + draftRoute).toBe(404);
      expect(sitemap).not.toContain(draftRoute);
      draftRoutes.push({
        route: draftRoute,
        status: draftResponse.status(),
        absentFromSitemap: !sitemap.includes(draftRoute),
      });
    }

    const evidence = {
      siteOrigin: SITE_ORIGIN,
      publicRoutes: routeEvidence,
      sitemap: { status: sitemapResponse.status(), urls: sitemapUrls },
      robots: { status: robotsResponse.status(), content: robots },
      publicationBoundary: { draftRoutes },
    };

    await writeFile(
      testInfo.outputPath("public-route-metadata-and-indexing.json"),
      JSON.stringify(evidence, null, 2)
    );

    await testInfo.attach("public-route-metadata-and-indexing.json", {
      body: JSON.stringify(evidence, null, 2),
      contentType: "application/json",
    });
  });

  test("audits every rendered anchor, internal destination, fragment, and external target policy", async ({
    page,
    request,
  }, testInfo) => {
    const inventory: RouteLinkRecord[] = [];
    const localOrigin = new URL(testInfo.project.use.baseURL as string).origin;
    const internalDestinations = new Map<string, Set<string>>();
    const externalDestinations = new Set<string>();

    for (const sourceRoute of PUBLIC_ROUTES) {
      await page.goto(sourceRoute, { waitUntil: "domcontentloaded" });
      const sourceUrl = page.url();
      const anchors = await page.locator("a[href]").evaluateAll((elements) =>
        elements.map((element) => {
          const anchor = element as HTMLAnchorElement;
          return {
            href: anchor.getAttribute("href"),
            text: (anchor.innerText || "").trim().replace(/\s+/g, " ").slice(0, 120),
            ariaLabel: anchor.getAttribute("aria-label"),
            target: anchor.getAttribute("target"),
            rel: anchor.getAttribute("rel"),
          };
        })
      );

      for (const anchor of anchors) {
        const rawHref = anchor.href?.trim() ?? "";
        expect(rawHref, "empty href on " + sourceRoute + ": " + anchor.text).not.toBe("");
        expect(rawHref, "placeholder href on " + sourceRoute + ": " + anchor.text).not.toBe("#");
        expect(rawHref, "javascript href on " + sourceRoute + ": " + anchor.text).not.toMatch(/^javascript:/i);

        let destination: URL;
        try {
          destination = new URL(rawHref, sourceUrl);
        } catch {
          throw new Error("Invalid anchor URL on " + sourceRoute + ": " + rawHref);
        }

        let kind: RouteLinkRecord["kind"];
        if (destination.protocol === "mailto:") {
          kind = "mailto";
        } else if (destination.protocol === "tel:") {
          kind = "tel";
        } else {
          expect(
            ["http:", "https:"],
            "unsupported link protocol on " + sourceRoute + ": " + rawHref
          ).toContain(destination.protocol);

          const isInternal =
            destination.origin === localOrigin ||
            destination.origin === SITE_ORIGIN;

          if (isInternal) {
            kind = "internal";
            const destinationPath = destination.pathname + destination.search;
            const fragments = internalDestinations.get(destinationPath) ?? new Set<string>();
            if (destination.hash) {
              fragments.add(decodeURIComponent(destination.hash.slice(1)));
            }
            internalDestinations.set(destinationPath, fragments);
          } else {
            kind = "external";
            externalDestinations.add(destination.href);
            if (anchor.target === "_blank") {
              const relTokens = (anchor.rel ?? "").toLowerCase().split(/\s+/).filter(Boolean);
              expect(
                relTokens.some((token) => token === "noopener" || token === "noreferrer"),
                "new-tab external link must use noopener/noreferrer: " + rawHref
              ).toBe(true);
            }
            expect(destination.protocol, "external link must use HTTPS: " + rawHref).toBe("https:");
          }
        }

        inventory.push({
          sourceRoute,
          href: destination.href,
          text: anchor.text,
          ariaLabel: anchor.ariaLabel,
          target: anchor.target,
          rel: anchor.rel,
          kind,
        });
      }
    }

    const internalChecks: Array<{
      destination: string;
      status: number;
      fragments: Array<{ id: string; exists: boolean }>;
    }> = [];

    for (const [destinationPath, fragmentIds] of internalDestinations) {
      const response = await request.get(destinationPath);
      expect(response.status(), "internal destination " + destinationPath).toBe(200);

      const fragments: Array<{ id: string; exists: boolean }> = [];
      if (fragmentIds.size > 0) {
        await page.goto(destinationPath, { waitUntil: "domcontentloaded" });
        for (const id of fragmentIds) {
          const exists = await page.evaluate((targetId) => Boolean(document.getElementById(targetId)), id);
          expect(exists, "missing fragment #" + id + " on " + destinationPath).toBe(true);
          fragments.push({ id, exists });
        }
      }

      internalChecks.push({
        destination: destinationPath,
        status: response.status(),
        fragments,
      });
    }

    const evidence = {
      routesScanned: [...PUBLIC_ROUTES],
      anchorCount: inventory.length,
      internalAnchorCount: inventory.filter((link) => link.kind === "internal").length,
      externalAnchorCount: inventory.filter((link) => link.kind === "external").length,
      mailtoCount: inventory.filter((link) => link.kind === "mailto").length,
      telCount: inventory.filter((link) => link.kind === "tel").length,
      internalDestinations: internalChecks,
      externalDestinations: [...externalDestinations].sort(),
      externalHttpReachability: "not probed by this local-origin CI check",
      inventory,
    };

    await writeFile(
      testInfo.outputPath("rendered-link-integrity-inventory.json"),
      JSON.stringify(evidence, null, 2)
    );

    await testInfo.attach("rendered-link-integrity-inventory.json", {
      body: JSON.stringify(evidence, null, 2),
      contentType: "application/json",
    });
  });
});

test.describe("release performance baseline", () => {
  test("records repeatable production-route timing and resource baselines in Chromium", async ({
    browser,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Performance baseline is recorded once in Chromium.");
    const baseURL = testInfo.project.use.baseURL as string;
    const samples: PerformanceSample[] = [];

    for (const route of PUBLIC_ROUTES) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const page = await context.newPage();
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => {
        failedRequests.push(request.url() + " — " + (request.failure()?.errorText ?? "unknown"));
      });

      await page.addInitScript(() => {
        const state: PerformanceState = {
          lcpMs: null,
          lcpElement: null,
          cls: 0,
          longTaskDurations: [],
        };
        (window as Window & { __p8Performance?: PerformanceState }).__p8Performance = state;

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
              const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
              if (!shift.hadRecentInput) state.cls += shift.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
        }

        if (supported.includes("longtask")) {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) state.longTaskDurations.push(entry.duration);
          }).observe({ type: "longtask", buffered: true });
        }
      });

      for (let iteration = 1; iteration <= 3; iteration += 1) {
        const consoleStart = consoleErrors.length;
        const pageErrorStart = pageErrors.length;
        const failedRequestStart = failedRequests.length;
        const targetUrl = new URL(route, baseURL).toString();
        const response = iteration === 1
          ? await page.goto(targetUrl, { waitUntil: "load" })
          : await page.reload({ waitUntil: "load" });

        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(250);
        expect(response?.status(), route + " performance navigation " + iteration).toBe(200);

        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
          const paints = performance.getEntriesByType("paint");
          const fcp = paints.find((entry) => entry.name === "first-contentful-paint")?.startTime ?? null;
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
            else if (resource.initiatorType === "img" || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path)) category = "image";
            transferByType[category] += resource.transferSize;
          }

          const state = (window as Window & { __p8Performance?: PerformanceState }).__p8Performance;
          const longTasks = state?.longTaskDurations ?? [];
          return {
            ttfbMs: navigation ? navigation.responseStart - navigation.requestStart : null,
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
          };
        });

        samples.push({
          route,
          iteration,
          cacheMode: iteration === 1 ? "isolated-context-first-view" : "same-context-repeat",
          status: response?.status() ?? null,
          ...metrics,
          consoleErrors: consoleErrors.slice(consoleStart),
          pageErrors: pageErrors.slice(pageErrorStart),
          failedRequests: failedRequests.slice(failedRequestStart),
        });
      }

      await context.close();
    }

    const summaries = PUBLIC_ROUTES.map((route) => {
      const routeSamples = samples.filter((sample) => sample.route === route);
      return {
        route,
        sampleCount: routeSamples.length,
        median: {
          ttfbMs: median(routeSamples.map((sample) => sample.ttfbMs).filter((value): value is number => value !== null)),
          fcpMs: median(routeSamples.map((sample) => sample.fcpMs).filter((value): value is number => value !== null)),
          lcpMs: median(routeSamples.map((sample) => sample.lcpMs).filter((value): value is number => value !== null)),
          cls: median(routeSamples.map((sample) => sample.cls).filter((value): value is number => value !== null)),
          transferBytes: median(routeSamples.map((sample) => sample.transferBytes)),
          resourceCount: median(routeSamples.map((sample) => sample.resourceCount)),
          longTaskTotalMs: median(routeSamples.map((sample) => sample.longTaskTotalMs)),
        },
      };
    });

    const report = {
      scope: "local production-build browser lab baseline",
      browser: "Chromium",
      browserVersion: browser.version(),
      viewport: { width: 1440, height: 900 },
      cacheProtocol: "one isolated-context first view followed by two same-context repeat navigations per route",
      routes: [...PUBLIC_ROUTES],
      sampleCount: samples.length,
      metrics: {
        collected: [
          "navigation TTFB",
          "First Contentful Paint",
          "Largest Contentful Paint",
          "Cumulative Layout Shift",
          "DOMContentLoaded and load event timing",
          "resource count and transfer/encoded/decoded byte totals",
          "script, stylesheet, image, and font transfer bytes",
          "long-task count and duration",
        ],
        notClaimed: [
          "field Core Web Vitals",
          "Interaction to Next Paint (INP)",
          "mobile-device performance",
          "representative-user network performance",
        ],
        budgetPolicy: "No pass/fail performance budget is set from this initial sample; review medians and variance before setting evidence-based budgets.",
      },
      summaries,
      samples,
    };

    await writeFile(testInfo.outputPath("phase-8-performance-baseline.json"), JSON.stringify(report, null, 2));
    await testInfo.attach("phase-8-performance-baseline.json", {
      body: JSON.stringify(report, null, 2),
      contentType: "application/json",
    });

    expect(samples).toHaveLength(PUBLIC_ROUTES.length * 3);
    expect(samples.every((sample) => sample.status === 200)).toBe(true);
    expect(samples.every((sample) => sample.resourceCount >= 0 && sample.transferBytes >= 0)).toBe(true);
  });
});
