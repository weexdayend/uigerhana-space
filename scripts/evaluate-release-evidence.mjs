import { createHash } from "node:crypto";
import { readFile, realpath, stat, mkdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

export const PUBLIC_ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"];
export const SOURCE_SPECS = {
  externalDestination: {
    workflowPath: ".github/workflows/external-destination-audit.yml",
    artifactPrefix: "external-destination-audit-",
  },
  productionParity: {
    workflowPath: ".github/workflows/production-parity-audit.yml",
    artifactPrefix: "production-parity-audit-",
  },
  physicalDevice: {
    workflowPath: ".github/workflows/physical-device-acceptance.yml",
    artifactPrefix: "physical-device-acceptance-",
  },
};

const SHA_PATTERN = /^[a-f0-9]{40}$/;
const HASH_PATTERN = /^[a-f0-9]{64}$/;
const EXTERNAL_CLASSES = [
  "reachable", "unavailable", "restricted", "transient", "network-error", "inconclusive",
];

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validTimestamp(value) {
  return typeof value === "string" && value.trim() !== "" &&
    Number.isFinite(Date.parse(value));
}

function isWithin(parent, candidate) {
  const path = relative(parent, candidate);
  return path === "" || (!path.startsWith("..") && !isAbsolute(path));
}

function sameSha(left, right) {
  return typeof left === "string" && typeof right === "string" &&
    left.toLowerCase() === right.toLowerCase();
}

function incrementCounts(results) {
  return Object.fromEntries(EXTERNAL_CLASSES.map((name) => [
    name,
    results.filter((item) => item.classification === name).length,
  ]));
}

function externalStatusMatches(result) {
  const status = result.status;
  switch (result.classification) {
    case "reachable":
      return Number.isInteger(status) && status >= 200 && status < 400;
    case "unavailable":
      return status === 404 || status === 410;
    case "restricted":
      return [401, 403, 405, 407, 429].includes(status);
    case "transient":
      return status === 408 || status === 425 ||
        (Number.isInteger(status) && status >= 500);
    case "network-error":
      return status === null;
    case "inconclusive":
      return Number.isInteger(status) &&
        !([401, 403, 405, 407, 408, 410, 425, 429].includes(status)) &&
        !(status >= 200 && status < 400) &&
        !(status >= 500);
    default:
      return false;
  }
}

function addBlocker(blockers, gate, detail) {
  blockers.push({ gate, detail });
}

function evaluateExternal(report, expectedCommit, blockers, errors) {
  const gate = {
    status: "hold",
    checkedAt: report?.checkedAt ?? null,
    destinationCount: report?.destinationCount ?? null,
    summary: report?.summary ?? null,
  };

  if (!isRecord(report)) {
    errors.push("External destination report must be a JSON object.");
    return gate;
  }
  if (!sameSha(report.sourceCommit, expectedCommit)) {
    errors.push("External destination report sourceCommit does not match expectedCommit.");
  }
  if (!validTimestamp(report.checkedAt)) {
    errors.push("External destination report checkedAt is missing or invalid.");
  }
  if (typeof report.scope !== "string" ||
      !report.scope.includes("external HTTPS links rendered")) {
    errors.push("External destination report scope is not the expected reviewed-build audit.");
  }
  if (!isRecord(report.requestPolicy) ||
      report.requestPolicy.method !== "GET" ||
      report.requestPolicy.authentication !== "none" ||
      report.requestPolicy.cookies !== "none") {
    errors.push("External destination report request policy is missing or unexpected.");
  }

  const routes = report.routes;
  if (!Array.isArray(routes) || routes.length !== PUBLIC_ROUTES.length ||
      !PUBLIC_ROUTES.every((route, index) =>
        routes[index]?.route === route && routes[index]?.status === 200
      )) {
    addBlocker(blockers, "externalDestination",
      "All four approved public routes must return HTTP 200 in the reviewed local build.");
  }

  if (!Array.isArray(report.results) || report.results.length === 0) {
    errors.push("External destination report must include at least one destination result.");
    return gate;
  }
  if (report.destinationCount !== report.results.length) {
    errors.push("External destination destinationCount does not match results length.");
  }

  for (const [index, result] of report.results.entries()) {
    if (!isRecord(result) || !EXTERNAL_CLASSES.includes(result.classification)) {
      errors.push("External destination result " + index + " has an invalid shape or classification.");
      continue;
    }
    if (typeof result.url !== "string" || !result.url.startsWith("https://")) {
      errors.push("External destination result " + index + " does not contain an HTTPS URL.");
    }
    if (!externalStatusMatches(result)) {
      errors.push("External destination result " + index +
        " has a status that contradicts its classification.");
    }
  }

  if (isRecord(report.summary)) {
    const counts = incrementCounts(report.results.filter(isRecord));
    for (const name of EXTERNAL_CLASSES) {
      if (!Number.isInteger(report.summary[name]) || report.summary[name] !== counts[name]) {
        errors.push("External destination summary count for " + name + " is inconsistent.");
      }
    }
  } else {
    errors.push("External destination summary is missing.");
  }

  const allReachable = report.results.length > 0 &&
    report.results.every((result) => result?.classification === "reachable");
  if (!allReachable) {
    addBlocker(blockers, "externalDestination",
      "One or more destinations are unavailable, restricted, transient, inconclusive, or failed from the runner; review or retry before release.");
  } else if (routes?.length === PUBLIC_ROUTES.length &&
      PUBLIC_ROUTES.every((route, index) =>
        routes[index]?.route === route && routes[index]?.status === 200
      )) {
    gate.status = "evidence-present";
  }

  gate.destinationCount = report.results.length;
  gate.summary = report.summary;
  return gate;
}

function evaluateProduction(report, expectedCommit, blockers, errors) {
  const gate = {
    status: "hold",
    checkedAt: report?.checkedAt ?? null,
    productionCommitParity: report?.outcome?.productionCommitParity ?? null,
    deploymentRecordParity: report?.outcome?.deploymentRecordParity ?? null,
    siteRoutes: report?.outcome?.siteRoutes ?? null,
    tls: report?.outcome?.tls ?? null,
  };

  if (!isRecord(report)) {
    errors.push("Production parity report must be a JSON object.");
    return gate;
  }
  if (!validTimestamp(report.checkedAt)) {
    errors.push("Production parity report checkedAt is missing or invalid.");
  }
  if (!sameSha(report.expected?.commit, expectedCommit)) {
    errors.push("Production parity report expected.commit does not match expectedCommit.");
  }
  if (!isRecord(report.outcome) || report.outcome.manualReviewRequired !== true) {
    errors.push("Production parity report must preserve manualReviewRequired=true.");
    return gate;
  }

  const routes = report.routes;
  const routesComplete = Array.isArray(routes) &&
    routes.length === PUBLIC_ROUTES.length &&
    PUBLIC_ROUTES.every((path, index) =>
      routes[index]?.route === path &&
      routes[index]?.state === "pass" &&
      typeof routes[index]?.metadata?.revisionMarker === "string"
    );

  const markers = report.servedRevisionMarkers;
  const markerEvidenceComplete = Array.isArray(markers) &&
    markers.length === PUBLIC_ROUTES.length &&
    PUBLIC_ROUTES.every((path) => {
      const marker = markers.find((item) => item.route === path);
      return marker?.comparison === "match";
    });

  if (report.outcome.productionCommitParity === "mismatch" ||
      report.outcome.deploymentRecordParity === "mismatch") {
    addBlocker(blockers, "productionParity",
      "Production evidence contains an explicit commit or deployment-record mismatch.");
  }
  if (report.outcome.productionCommitParity !== "marker-match" || !markerEvidenceComplete) {
    addBlocker(blockers, "productionParity",
      "A matching served revision marker was not observed on every approved public route.");
  }
  if (report.outcome.deploymentRecordParity !== "match") {
    addBlocker(blockers, "productionParity",
      "The latest GitHub production deployment record is not a successful exact-SHA match.");
  }
  if (report.outcome.siteRoutes !== "pass" || !routesComplete) {
    addBlocker(blockers, "productionParity",
      "Production public-route and metadata checks did not all pass.");
  }
  if (report.outcome.tls !== "pass" ||
      report.tls?.status !== "observed" ||
      report.tls?.authorized !== true ||
      report.tls?.currentlyWithinValidity !== true) {
    addBlocker(blockers, "productionParity",
      "TLS authorization and certificate validity were not both observed as passing.");
  }

  if (report.outcome.productionCommitParity === "marker-match" &&
      report.outcome.deploymentRecordParity === "match" &&
      report.outcome.siteRoutes === "pass" &&
      report.outcome.tls === "pass" &&
      routesComplete && markerEvidenceComplete &&
      report.tls?.authorized === true &&
      report.tls?.currentlyWithinValidity === true) {
    gate.status = "evidence-present";
  }

  gate.servedMarkerProvenance = "owner-verification-required";
  return gate;
}

function evaluatePhysicalDevice(report, expectedCommit, blockers, errors) {
  const gate = {
    status: "hold",
    evidenceStatus: report?.status ?? null,
    sessionCount: report?.sessionCount ?? null,
    platformsSeen: report?.platformsSeen ?? [],
    attachmentCount: report?.attachmentCount ?? null,
  };

  if (!isRecord(report)) {
    errors.push("Physical-device validation report must be a JSON object.");
    return gate;
  }
  if (!sameSha(report.sourceCommit, expectedCommit) ||
      !sameSha(report.expectedCommit, expectedCommit)) {
    errors.push("Physical-device report sourceCommit and expectedCommit must both match the reviewed SHA.");
  }
  if (report.releaseApproved !== false ||
      report.releaseDecision !== "owner-review-required") {
    errors.push("Physical-device validator must never approve release; owner review must remain required.");
  }

  if (report.status !== "evidence-complete") {
    addBlocker(blockers, "physicalDevice",
      "Physical-device evidence is not complete; validator status is " +
      String(report.status ?? "missing") + ".");
  }
  const platforms = Array.isArray(report.platformsSeen) ? report.platformsSeen : [];
  if (report.sessionCount !== 2 ||
      !["android", "ios"].every((platform) => platforms.includes(platform)) ||
      !Number.isInteger(report.attachmentCount) || report.attachmentCount < 14) {
    addBlocker(blockers, "physicalDevice",
      "Both Android and iOS sessions and at least one retained attachment for each of seven scenarios per platform are required.");
  }
  if (!Array.isArray(report.sessions) || report.sessions.length !== 2 ||
      !["android", "ios"].every((platform) =>
        report.sessions.some((session) =>
          session?.platform === platform && session.physicalDeviceConfirmed === true
        )
      )) {
    addBlocker(blockers, "physicalDevice",
      "Both platform sessions must include a positive physical-device owner attestation.");
  }
  for (const key of ["errors", "failures", "blockers"]) {
    if (Array.isArray(report[key]) && report[key].length > 0) {
      addBlocker(blockers, "physicalDevice",
        "Physical-device report contains " + report[key].length + " " + key + ".");
    }
  }

  if (report.status === "evidence-complete" &&
      report.sessionCount === 2 &&
      ["android", "ios"].every((platform) => platforms.includes(platform)) &&
      Number.isInteger(report.attachmentCount) && report.attachmentCount >= 14 &&
      Array.isArray(report.sessions) && report.sessions.length === 2 &&
      ["android", "ios"].every((platform) =>
        report.sessions.some((session) =>
          session?.platform === platform && session.physicalDeviceConfirmed === true
        )
      )) {
    gate.status = "evidence-present";
  }
  return gate;
}

async function readVerifiedInput(manifestDirectory, key, input, expectedCommit, errors, seenRunIds) {
  const spec = SOURCE_SPECS[key];
  if (!isRecord(input)) {
    errors.push("Manifest input " + key + " is missing.");
    return null;
  }

  if (!Number.isSafeInteger(input.runId) || input.runId <= 0) {
    errors.push("Manifest input " + key + " has an invalid workflow run id.");
  } else if (seenRunIds.has(input.runId)) {
    errors.push("Workflow run ids must be unique across evidence sources.");
  } else {
    seenRunIds.add(input.runId);
  }
  if (input.workflowPath !== spec.workflowPath) {
    errors.push("Manifest input " + key + " references an unexpected workflow path.");
  }
  if (!sameSha(input.headSha, expectedCommit)) {
    errors.push("Manifest input " + key + " workflow head SHA does not match expectedCommit.");
  }
  if (input.event !== "workflow_dispatch" ||
      input.status !== "completed" ||
      !["success", "failure"].includes(input.conclusion)) {
    errors.push("Manifest input " + key + " workflow run must be a completed workflow_dispatch with its report artifact available.");
  }
  if (input.artifactName !== spec.artifactPrefix + expectedCommit) {
    errors.push("Manifest input " + key + " artifact name is not bound to expectedCommit.");
  }
  if (typeof input.reportPath !== "string" || input.reportPath.trim() === "" ||
      isAbsolute(input.reportPath)) {
    errors.push("Manifest input " + key + " reportPath must be a non-empty relative path.");
    return null;
  }
  if (!HASH_PATTERN.test(input.reportSha256 ?? "")) {
    errors.push("Manifest input " + key + " reportSha256 must be a full SHA-256 digest.");
    return null;
  }

  const candidate = resolve(manifestDirectory, input.reportPath);
  if (!isWithin(manifestDirectory, candidate)) {
    errors.push("Manifest input " + key + " reportPath escapes the evidence bundle.");
    return null;
  }
  const actualPath = await realpath(candidate).catch(() => null);
  if (!actualPath || !isWithin(manifestDirectory, actualPath)) {
    errors.push("Manifest input " + key + " report is missing or resolves outside the evidence bundle.");
    return null;
  }
  const fileStat = await stat(actualPath).catch(() => null);
  if (!fileStat?.isFile()) {
    errors.push("Manifest input " + key + " report is not a regular file.");
    return null;
  }

  const bytes = await readFile(actualPath);
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (digest !== input.reportSha256.toLowerCase()) {
    errors.push("Manifest input " + key + " report SHA-256 does not match the downloaded artifact.");
    return null;
  }

  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch {
    errors.push("Manifest input " + key + " report is not valid JSON.");
    return null;
  }
}

export async function evaluateReleaseEvidenceManifest(manifestPath) {
  const errors = [];
  const blockers = [];
  const absoluteManifestPath = resolve(manifestPath);
  let manifest;
  try {
    manifest = JSON.parse(await readFile(absoluteManifestPath, "utf8"));
  } catch (error) {
    return {
      schemaVersion: 1,
      status: "invalid",
      releaseApproved: false,
      releaseDecision: "owner-review-required",
      errors: ["Could not read release evidence manifest: " +
        (error instanceof Error ? error.message : String(error))],
      blockers,
      ownerReviewRequired: [],
    };
  }

  if (!isRecord(manifest)) {
    errors.push("Release evidence manifest root must be a JSON object.");
    manifest = {};
  }
  if (manifest.schemaVersion !== 1) errors.push("Manifest schemaVersion must be 1.");
  if (manifest.repository !== "weexdayend/uigerhana-space") {
    errors.push("Manifest repository must be weexdayend/uigerhana-space.");
  }
  if (!SHA_PATTERN.test(manifest.expectedCommit ?? "")) {
    errors.push("Manifest expectedCommit must be a full lowercase 40-character SHA.");
  }
  if (!validTimestamp(manifest.generatedAt)) {
    errors.push("Manifest generatedAt must be an ISO-compatible timestamp.");
  }

  const expectedCommit = typeof manifest.expectedCommit === "string"
    ? manifest.expectedCommit.toLowerCase()
    : "";
  const inputs = isRecord(manifest.inputs) ? manifest.inputs : {};
  if (!isRecord(manifest.inputs)) errors.push("Manifest inputs object is missing.");

  const reports = {};
  const seenRunIds = new Set();
  const manifestDirectory = await realpath(dirname(absoluteManifestPath)).catch(() => null);
  if (!manifestDirectory) errors.push("Manifest directory does not exist.");

  if (manifestDirectory) {
    for (const key of Object.keys(SOURCE_SPECS)) {
      reports[key] = await readVerifiedInput(
        manifestDirectory, key, inputs[key], expectedCommit, errors, seenRunIds
      );
    }
  }

  const gates = {
    externalDestination: evaluateExternal(
      reports.externalDestination, expectedCommit, blockers, errors
    ),
    productionParity: evaluateProduction(
      reports.productionParity, expectedCommit, blockers, errors
    ),
    physicalDevice: evaluatePhysicalDevice(
      reports.physicalDevice, expectedCommit, blockers, errors
    ),
  };

  const ownerReviewRequired = [
    {
      id: "external-destination-content",
      detail: "Review each reachable destination's identity, current content, intended destination, privacy, and suitability; HTTP reachability is not content approval.",
    },
    {
      id: "served-revision-marker-provenance",
      detail: "Verify that the live revision marker is injected by the actual build/deployment pipeline from the commit that produced the served application.",
    },
    {
      id: "physical-device-evidence-review",
      detail: "Review the retained Android/iOS attachments and owner attestations; SHA integrity and schema completeness do not independently prove hardware authenticity.",
    },
    {
      id: "native-browser-zoom",
      detail: "Accept literal 200% browser zoom on a real desktop browser.",
    },
    {
      id: "native-os-text-scaling",
      detail: "Accept native OS text/accessibility scaling on representative real devices.",
    },
    {
      id: "native-print",
      detail: "Accept the actual browser print dialog and saved A4 PDF on the target OS.",
    },
    {
      id: "field-mobile-performance",
      detail: "Review representative-device and trustworthy field CWV/INP evidence; Chromium emulation is not field evidence.",
    },
    {
      id: "final-owner-go-no-go",
      detail: "Record a separate explicit owner go/no-go decision after reviewing every required source and manual gate.",
    },
  ];

  return {
    schemaVersion: 1,
    repository: manifest.repository ?? null,
    expectedCommit: expectedCommit || null,
    generatedAt: manifest.generatedAt ?? null,
    evaluatedAt: new Date().toISOString(),
    status: errors.length > 0 ? "invalid" :
      blockers.length > 0 ? "blocked" : "owner-review-required",
    releaseApproved: false,
    releaseDecision: "owner-review-required",
    gates,
    errors,
    blockers,
    ownerReviewRequired,
    statement: "This report validates evidence provenance, integrity, and technical observations only. It never authorizes deployment or release.",
  };
}

async function main() {
  const manifestPath = process.argv[2];
  const reportPath = process.argv[3] ?? "artifacts/release-gate-report.json";
  if (!manifestPath) {
    throw new Error(
      "Usage: node scripts/evaluate-release-evidence.mjs <manifest.json> [report.json]"
    );
  }

  const report = await evaluateReleaseEvidenceManifest(manifestPath);
  const serialized = JSON.stringify(report, null, 2);
  const absoluteReportPath = resolve(reportPath);
  await mkdir(dirname(absoluteReportPath), { recursive: true });
  await writeFile(absoluteReportPath, serialized + "\n");
  process.stdout.write(serialized + "\n");

  if (report.status === "invalid") process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === new URL("file://" + resolve(process.argv[1])).href) {
  main().catch((error) => {
    process.stderr.write((error instanceof Error ? error.stack : String(error)) + "\n");
    process.exitCode = 1;
  });
}
