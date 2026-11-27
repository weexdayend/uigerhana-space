import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import tls from "node:tls";

const REQUEST_TIMEOUT_MS = 15_000;
const PUBLIC_ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"];
const AUXILIARY_ROUTES = ["/robots.txt", "/sitemap.xml"];
const EXPECTED_COMMIT = process.env.EXPECTED_COMMIT ?? "";
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY ?? "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

function assertInput(value, pattern, label) {
  if (!pattern.test(value)) throw new Error(label + " is missing or has an invalid format.");
}

async function readSiteOrigin() {
  const source = await readFile(new URL("../src/data/site.ts", import.meta.url), "utf8");
  const match = source.match(/siteUrl:\s*"([^"]+)"/);
  if (!match) throw new Error("SITE_META.siteUrl could not be resolved.");
  const url = new URL(match[1]);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/") {
    throw new Error("SITE_META.siteUrl must be a credential-free HTTPS origin.");
  }
  return url;
}

function parseAttributes(tag) {
  const attributes = {};
  const expression = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(expression)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attributes;
}

function decodeText(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function inspectHtml(html, requestedUrl) {
  const title = decodeText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1Match = html.match(/<main\b[^>]*>[\s\S]*?<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = decodeText(h1Match?.[1] ?? "");
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
  const description = meta.find((item) => item.name?.toLowerCase() === "description")?.content ?? "";
  const robots = meta
    .filter((item) => item.name?.toLowerCase() === "robots")
    .map((item) => item.content ?? "");
  const canonicalHref = links.find((item) =>
    (item.rel ?? "").toLowerCase().split(/\s+/).includes("canonical")
  )?.href ?? null;
  let canonical = null;
  if (canonicalHref) {
    try {
      canonical = new URL(canonicalHref, requestedUrl).href;
    } catch {
      canonical = null;
    }
  }
  const revisionMeta = meta.find((item) => item.name?.toLowerCase() === "ui-gerhana-revision");
  return {
    title,
    description: decodeText(description),
    h1,
    canonical,
    robots,
    revisionMarker: revisionMeta?.content ?? null,
  };
}

function compareRevision(marker, expected) {
  const value = typeof marker === "string" ? marker.trim().toLowerCase() : "";
  if (!value) return "not-exposed";
  if (!/^[0-9a-f]{7,40}$/.test(value)) return "invalid-marker";
  const sha = expected.toLowerCase();
  return sha.startsWith(value) || value.startsWith(sha) ? "match" : "mismatch";
}

async function fetchText(url) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        "user-agent": "UI-Gerhana-Production-Parity-Audit/1.0 (+read-only)",
        accept: "text/html,application/xml,text/plain;q=0.9,*/*;q=0.5",
      },
    });
    const body = await response.text();
    const selectedHeaders = {};
    for (const name of [
      "date", "server", "via", "age", "cache-control", "strict-transport-security",
      "content-security-policy", "x-content-type-options", "x-frame-options",
      "referrer-policy", "x-ui-gerhana-revision",
    ]) {
      const value = response.headers.get(name);
      if (value !== null) selectedHeaders[name] = value;
    }
    return {
      ok: true,
      status: response.status,
      finalUrl: response.url,
      redirected: response.redirected,
      contentType: response.headers.get("content-type"),
      durationMs: Date.now() - startedAt,
      headers: selectedHeaders,
      body,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      finalUrl: null,
      redirected: false,
      contentType: null,
      durationMs: Date.now() - startedAt,
      headers: {},
      body: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function inspectTls(hostname) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let settled = false;
    const finish = (result, socket) => {
      if (settled) return;
      settled = true;
      socket?.destroy();
      resolve({ hostname, durationMs: Date.now() - startedAt, ...result });
    };

    let socket;
    try {
      socket = tls.connect({
        host: hostname,
        port: 443,
        servername: hostname,
        rejectUnauthorized: false,
      });
      socket.setTimeout(REQUEST_TIMEOUT_MS, () => {
        finish({ status: "timeout", authorized: false, error: "TLS inspection timed out." }, socket);
      });
      socket.once("secureConnect", () => {
        const certificate = socket.getPeerCertificate();
        const now = Date.now();
        const validFrom = certificate.valid_from ? Date.parse(certificate.valid_from) : NaN;
        const validTo = certificate.valid_to ? Date.parse(certificate.valid_to) : NaN;
        finish({
          status: "observed",
          authorized: socket.authorized,
          authorizationError: socket.authorizationError ?? null,
          subject: certificate.subject ?? null,
          issuer: certificate.issuer ?? null,
          subjectAltName: certificate.subjectaltname ?? null,
          fingerprint256: certificate.fingerprint256 ?? null,
          validFrom: certificate.valid_from ?? null,
          validTo: certificate.valid_to ?? null,
          currentlyWithinValidity: Number.isFinite(validFrom) && Number.isFinite(validTo)
            ? now >= validFrom && now <= validTo
            : null,
          error: null,
        }, socket);
      });
      socket.once("error", (error) => {
        finish({
          status: "error",
          authorized: false,
          error: error.message,
          errorCode: error.code ?? null,
        }, socket);
      });
    } catch (error) {
      finish({
        status: "error",
        authorized: false,
        error: error instanceof Error ? error.message : String(error),
      }, socket);
    }
  });
}

async function inspectGitHubDeployment(expectedCommit) {
  if (!GITHUB_REPOSITORY.includes("/") || !GITHUB_TOKEN) {
    return {
      status: "not-available",
      reason: "GITHUB_REPOSITORY or GITHUB_TOKEN is unavailable.",
      environment: "production",
      latestDeployment: null,
      commitRecordParity: "not-verifiable",
    };
  }

  const apiBase = "https://api.github.com/repos/" + GITHUB_REPOSITORY;
  const headers = {
    accept: "application/vnd.github+json",
    authorization: "Bearer " + GITHUB_TOKEN,
    "x-github-api-version": "2022-11-28",
    "user-agent": "UI-Gerhana-Production-Parity-Audit/1.0",
  };

  try {
    const deploymentResponse = await fetch(
      apiBase + "/deployments?per_page=100",
      { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }
    );
    if (!deploymentResponse.ok) {
      return {
        status: "not-available",
        httpStatus: deploymentResponse.status,
        reason: "GitHub deployment records could not be read.",
        environment: "production",
        latestDeployment: null,
        commitRecordParity: "not-verifiable",
      };
    }

    const deployments = await deploymentResponse.json();
    const records = Array.isArray(deployments)
      ? deployments.filter((item) => (item.environment ?? "").toLowerCase() === "production")
      : [];

    if (records.length === 0) {
      return {
        status: "no-record",
        reason: "No GitHub deployment record for the production environment was found.",
        environment: "production",
        latestDeployment: null,
        commitRecordParity: "not-verifiable",
      };
    }

    const latest = records.sort((left, right) =>
      Date.parse(right.created_at ?? "") - Date.parse(left.created_at ?? "")
    )[0];
    const statusResponse = await fetch(
      apiBase + "/deployments/" + latest.id + "/statuses?per_page=10",
      { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }
    );
    let latestStatus = null;
    if (statusResponse.ok) {
      const statuses = await statusResponse.json();
      latestStatus = Array.isArray(statuses) ? statuses[0] ?? null : null;
    }

    const shaMatches = (latest.sha ?? "").toLowerCase() === expectedCommit.toLowerCase();
    const statusSuccess = latestStatus?.state === "success";
    return {
      status: "observed",
      environment: latest.environment,
      latestDeployment: {
        id: latest.id,
        sha: latest.sha ?? null,
        ref: latest.ref ?? null,
        task: latest.task ?? null,
        environment: latest.environment ?? null,
        createdAt: latest.created_at ?? null,
        updatedAt: latest.updated_at ?? null,
        status: latestStatus?.state ?? "status-unavailable",
        statusCreatedAt: latestStatus?.created_at ?? null,
        environmentUrl: latestStatus?.environment_url ?? null,
        logUrl: latestStatus?.log_url ?? null,
      },
      commitRecordParity: statusSuccess && shaMatches
        ? "match"
        : shaMatches
          ? "sha-match-status-not-success"
          : "mismatch",
      reason: null,
    };
  } catch (error) {
    return {
      status: "error",
      reason: error instanceof Error ? error.message : String(error),
      environment: "production",
      latestDeployment: null,
      commitRecordParity: "not-verifiable",
    };
  }
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => match[1].trim().replace(/&amp;/g, "&"));
}

function addFinding(findings, code, state, detail) {
  findings.push({ code, state, detail });
}

async function main() {
  assertInput(EXPECTED_COMMIT, /^[0-9a-fA-F]{40}$/, "EXPECTED_COMMIT");
  assertInput(GITHUB_REPOSITORY, /^[^/]+\/[^/]+$/, "GITHUB_REPOSITORY");

  const siteOrigin = await readSiteOrigin();
  const hostname = siteOrigin.hostname;
  const checkedAt = new Date().toISOString();
  const findings = [];
  const tlsEvidence = await inspectTls(hostname);

  addFinding(
    findings,
    "TLS_CERTIFICATE",
    tlsEvidence.status === "observed" && tlsEvidence.authorized && tlsEvidence.currentlyWithinValidity
      ? "pass"
      : "review",
    tlsEvidence.status === "observed"
      ? "Certificate observed; inspect SAN and validity in the attached report."
      : tlsEvidence.error ?? "TLS inspection could not complete."
  );

  const httpRedirect = await fetchText("http://" + hostname + "/");
  addFinding(
    findings,
    "HTTP_TO_HTTPS_REDIRECT",
    httpRedirect.ok && httpRedirect.status === 200 && httpRedirect.finalUrl?.startsWith(siteOrigin.origin + "/")
      ? "pass"
      : "review",
    httpRedirect.ok
      ? "HTTP request ended at " + httpRedirect.finalUrl + " with status " + httpRedirect.status + "."
      : httpRedirect.error ?? "HTTP redirect check failed."
  );

  const routeResults = [];
  const revisionMarkers = [];
  for (const route of PUBLIC_ROUTES) {
    const requestedUrl = new URL(route, siteOrigin).href;
    const response = await fetchText(requestedUrl);
    const html = response.ok && (response.contentType ?? "").includes("text/html")
      ? inspectHtml(response.body, response.finalUrl ?? requestedUrl)
      : null;
    const expectedCanonical = new URL(route, siteOrigin).href;
    const canonicalMatches = html?.canonical === expectedCanonical;
    const hasNoindex = html?.robots.some((value) => /\bnoindex\b/i.test(value)) ?? false;
    const routePass = response.ok &&
      response.status === 200 &&
      response.finalUrl?.startsWith(siteOrigin.origin + "/") &&
      Boolean(html?.title) &&
      Boolean(html?.description) &&
      Boolean(html?.h1) &&
      canonicalMatches &&
      !hasNoindex;

    const marker = response.headers["x-ui-gerhana-revision"] ?? html?.revisionMarker ?? null;
    const revisionState = compareRevision(marker, EXPECTED_COMMIT);
    if (marker) revisionMarkers.push({ route, marker, comparison: revisionState });

    routeResults.push({
      route,
      requestedUrl,
      status: response.status,
      finalUrl: response.finalUrl,
      redirected: response.redirected,
      contentType: response.contentType,
      durationMs: response.durationMs,
      error: response.error,
      headers: response.headers,
      metadata: html
        ? {
            title: html.title,
            description: html.description,
            h1: html.h1,
            canonical: html.canonical,
            canonicalMatches,
            robots: html.robots,
            hasNoindex,
            revisionMarker: marker,
          }
        : null,
      state: routePass ? "pass" : "review",
    });

    addFinding(
      findings,
      "PUBLIC_ROUTE_" + route.replace(/\W+/g, "_").toUpperCase(),
      routePass ? "pass" : "review",
      routePass
        ? "HTTP 200, public metadata, H1, canonical, and indexability checks passed."
        : "Route response or public metadata differs from the expected route contract."
    );
  }

  const auxiliaryResults = [];
  let robotsText = "";
  let sitemapText = "";
  for (const route of AUXILIARY_ROUTES) {
    const response = await fetchText(new URL(route, siteOrigin).href);
    if (route === "/robots.txt") robotsText = response.body;
    if (route === "/sitemap.xml") sitemapText = response.body;
    auxiliaryResults.push({
      route,
      status: response.status,
      finalUrl: response.finalUrl,
      contentType: response.contentType,
      durationMs: response.durationMs,
      error: response.error,
      state: response.ok && response.status === 200 ? "pass" : "review",
    });
  }

  const sitemapUrls = extractSitemapUrls(sitemapText);
  const missingSitemapRoutes = PUBLIC_ROUTES
    .map((route) => new URL(route, siteOrigin).href)
    .filter((url) => !sitemapUrls.includes(url));
  const robotsHasSitemap = robotsText.includes(new URL("/sitemap.xml", siteOrigin).href);

  addFinding(
    findings,
    "SITEMAP_PUBLIC_ROUTE_COVERAGE",
    auxiliaryResults.find((item) => item.route === "/sitemap.xml")?.state === "pass" && missingSitemapRoutes.length === 0
      ? "pass"
      : "review",
    missingSitemapRoutes.length === 0
      ? "All expected public routes appear in sitemap.xml."
      : "Missing public routes: " + missingSitemapRoutes.join(", ")
  );
  addFinding(
    findings,
    "ROBOTS_SITEMAP_REFERENCE",
    auxiliaryResults.find((item) => item.route === "/robots.txt")?.state === "pass" && robotsHasSitemap
      ? "pass"
      : "review",
    robotsHasSitemap
      ? "robots.txt references sitemap.xml."
      : "robots.txt did not reference the canonical sitemap URL."
  );

  const deployment = await inspectGitHubDeployment(EXPECTED_COMMIT);
  const markerStates = revisionMarkers.map((item) => item.comparison);
  const markerMismatch = markerStates.includes("mismatch") || markerStates.includes("invalid-marker");
  const allRoutesExposeMarker = routeResults.length === PUBLIC_ROUTES.length &&
    routeResults.every((item) => Boolean(item.metadata?.revisionMarker));
  const allMarkersMatch = allRoutesExposeMarker &&
    markerStates.length === PUBLIC_ROUTES.length &&
    markerStates.every((state) => state === "match");
  const productionCommitParity = markerMismatch
    ? "mismatch"
    : allMarkersMatch
      ? "verified"
      : "not-verifiable";

  addFinding(
    findings,
    "GITHUB_PRODUCTION_DEPLOYMENT_RECORD",
    deployment.commitRecordParity === "match" ? "pass" : "review",
    deployment.reason ??
      "Latest production deployment record SHA: " +
      (deployment.latestDeployment?.sha ?? "unknown") +
      "; status: " + (deployment.latestDeployment?.status ?? "unknown") +
      "; comparison: " + deployment.commitRecordParity + "."
  );
  addFinding(
    findings,
    "SERVED_COMMIT_PARITY",
    productionCommitParity === "verified" ? "pass" : "review",
    productionCommitParity === "verified"
      ? "Served revision marker matches the expected commit."
      : productionCommitParity === "mismatch"
        ? "A served revision marker does not match the expected commit."
        : "No trustworthy served revision marker is exposed; a GitHub deployment record alone is not proof of the live served commit."
  );

  const report = {
    schemaVersion: 1,
    audit: "UI Gerhana production parity and read-only runtime evidence",
    checkedAt,
    expected: {
      repository: GITHUB_REPOSITORY,
      commit: EXPECTED_COMMIT.toLowerCase(),
      origin: siteOrigin.origin,
      publicRoutes: PUBLIC_ROUTES,
      note: "The expected commit is the audit target. It is not assumed to be deployed.",
    },
    outcome: {
      productionCommitParity,
      deploymentRecordParity: deployment.commitRecordParity,
      siteRoutes: routeResults.every((item) => item.state === "pass") ? "pass" : "review",
      tls: tlsEvidence.status === "observed" && tlsEvidence.authorized && tlsEvidence.currentlyWithinValidity
        ? "pass"
        : "review",
      manualReviewRequired: true,
    },
    tls: tlsEvidence,
    httpToHttps: httpRedirect.ok
      ? {
          status: httpRedirect.status,
          finalUrl: httpRedirect.finalUrl,
          redirected: httpRedirect.redirected,
          durationMs: httpRedirect.durationMs,
          headers: httpRedirect.headers,
        }
      : {
          status: null,
          finalUrl: null,
          error: httpRedirect.error,
          durationMs: httpRedirect.durationMs,
        },
    routes: routeResults,
    auxiliaryRoutes: auxiliaryResults,
    sitemap: { urls: sitemapUrls, missingExpectedPublicRoutes: missingSitemapRoutes },
    robots: { hasCanonicalSitemapReference: robotsHasSitemap, body: robotsText.slice(0, 12_000) },
    deployment,
    servedRevisionMarkers: revisionMarkers,
    findings,
    limitations: [
      "This workflow performs only unauthenticated GET requests and GitHub deployment-record GET requests. It does not mutate production.",
      "A route/metadata pass is a current availability and public-contract observation, not proof of production commit parity.",
      "GitHub deployment records prove what GitHub recorded for a deployment; they do not independently prove what a CDN or application server currently serves.",
      "Production commit parity remains not-verifiable unless the live response exposes a trusted build-time revision marker.",
      "A revision marker is only trustworthy if the deployment process injects it from the same source commit that produced the running build.",
      "HTTP headers are recorded for review; this audit does not invent unapproved security-header requirements.",
      "TLS certificate fields are sampled from the runner network path at the audit timestamp.",
      "Workflow success means the audit executed and saved evidence; it does not mean every production finding passed.",
    ],
  };

  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/production-parity-audit.json", JSON.stringify(report, null, 2));

  const summary = [
    "# UI Gerhana production parity audit",
    "",
    "- Expected commit: " + report.expected.commit,
    "- Origin: " + report.expected.origin,
    "- Checked at: " + checkedAt,
    "- Site routes: " + report.outcome.siteRoutes.toUpperCase(),
    "- TLS: " + report.outcome.tls.toUpperCase(),
    "- GitHub deployment record: " + deployment.commitRecordParity.toUpperCase(),
    "- Served commit parity: " + productionCommitParity.toUpperCase(),
    "",
    "This is a read-only audit. Workflow success is not a release pass.",
    "",
    "| Finding | State | Detail |",
    "|---|---|---|",
    ...findings.map((item) =>
      "| " + item.code + " | " + item.state.toUpperCase() + " | " + item.detail.replace(/\|/g, "\\|") + " |"
    ),
    "",
    "Full response, TLS, header, sitemap, robots, and deployment evidence is in production-parity-audit.json.",
  ].join("\n");

  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  } else {
    process.stdout.write(summary + "\n");
  }

  process.stdout.write(JSON.stringify({
    report: "artifacts/production-parity-audit.json",
    siteRoutes: report.outcome.siteRoutes,
    tls: report.outcome.tls,
    deploymentRecordParity: report.outcome.deploymentRecordParity,
    productionCommitParity,
  }, null, 2) + "\n");
}

main().catch((error) => {
  process.stderr.write((error instanceof Error ? error.stack : String(error)) + "\n");
  process.exitCode = 1;
});
