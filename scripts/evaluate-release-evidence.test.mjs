import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { evaluateReleaseEvidenceManifest, PUBLIC_ROUTES } from "./evaluate-release-evidence.mjs";

const COMMIT = "3ccf1d0c57135da49e89a7837337a193c478da84";
const CLASSES = ["reachable", "unavailable", "restricted", "transient", "network-error", "inconclusive"];

function makeExternalReport() {
  const results = [
    { url: "https://example.com/profile", status: 200, finalUrl: "https://example.com/profile", classification: "reachable" },
    { url: "https://example.org/article", status: 200, finalUrl: "https://example.org/article", classification: "reachable" },
  ];
  return {
    scope: "HTTP reachability of external HTTPS links rendered by the reviewed local production build",
    sourceCommit: COMMIT,
    checkedAt: "2026-11-28T10:00:00.000Z",
    browser: "Chromium",
    project: "chromium",
    routes: PUBLIC_ROUTES.map((route) => ({ route, status: 200 })),
    requestPolicy: { method: "GET", timeoutMs: 15000, maximumRedirects: 8, concurrency: 3, authentication: "none", cookies: "none" },
    destinationCount: results.length,
    summary: Object.fromEntries(CLASSES.map((name) => [name, results.filter((item) => item.classification === name).length])),
    results,
  };
}

function makeProductionReport() {
  return {
    schemaVersion: 1,
    checkedAt: "2026-11-28T10:05:00.000Z",
    expected: { commit: COMMIT },
    outcome: {
      productionCommitParity: "marker-match",
      deploymentRecordParity: "match",
      siteRoutes: "pass",
      tls: "pass",
      manualReviewRequired: true,
    },
    tls: { status: "observed", authorized: true, currentlyWithinValidity: true },
    routes: PUBLIC_ROUTES.map((route) => ({
      route,
      state: "pass",
      metadata: { revisionMarker: COMMIT },
    })),
    servedRevisionMarkers: PUBLIC_ROUTES.map((route) => ({ route, marker: COMMIT, comparison: "match" })),
  };
}

function makePhysicalReport() {
  return {
    status: "evidence-complete",
    sourceCommit: COMMIT,
    expectedCommit: COMMIT,
    validatedAt: "2026-11-28T10:06:00.000Z",
    sessionCount: 2,
    platformsSeen: ["android", "ios"],
    sessions: [
      { platform: "android", physicalDeviceConfirmed: true },
      { platform: "ios", physicalDeviceConfirmed: true },
    ],
    attachmentCount: 14,
    errors: [],
    failures: [],
    blockers: [],
    releaseApproved: false,
    releaseDecision: "owner-review-required",
  };
}

async function createFixture(t, overrides = {}) {
  const root = await mkdtemp(join(tmpdir(), "uigerhana-release-evidence-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, "reports"), { recursive: true });

  const reports = {
    externalDestination: makeExternalReport(),
    productionParity: makeProductionReport(),
    physicalDevice: makePhysicalReport(),
  };
  for (const [key, value] of Object.entries(overrides.reports ?? {})) reports[key] = value;

  const names = {
    externalDestination: "external-destination-reachability.json",
    productionParity: "production-parity-audit.json",
    physicalDevice: "physical-device-acceptance-report.json",
  };
  const metadata = {
    externalDestination: {
      runId: 101,
      runAttempt: 1,
      runCreatedAt: "2026-11-28T09:55:00.000Z",
      runUpdatedAt: "2026-11-28T10:01:00.000Z",
      workflowPath: ".github/workflows/external-destination-audit.yml",
      headSha: COMMIT,
      event: "workflow_dispatch",
      status: "completed",
      conclusion: "success",
      artifactName: "external-destination-audit-" + COMMIT + "-1",
    },
    productionParity: {
      runId: 102,
      runAttempt: 1,
      runCreatedAt: "2026-11-28T10:02:00.000Z",
      runUpdatedAt: "2026-11-28T10:07:00.000Z",
      workflowPath: ".github/workflows/production-parity-audit.yml",
      headSha: COMMIT,
      event: "workflow_dispatch",
      status: "completed",
      conclusion: "success",
      artifactName: "production-parity-audit-" + COMMIT + "-1",
    },
    physicalDevice: {
      runId: 103,
      runAttempt: 1,
      runCreatedAt: "2026-11-28T10:05:00.000Z",
      runUpdatedAt: "2026-11-28T10:09:00.000Z",
      workflowPath: ".github/workflows/physical-device-acceptance.yml",
      headSha: COMMIT,
      event: "workflow_dispatch",
      status: "completed",
      conclusion: "success",
      artifactName: "physical-device-acceptance-" + COMMIT + "-1",
    },
  };

  const inputs = {};
  for (const key of Object.keys(metadata)) {
    const reportPath = "reports/" + names[key];
    const bytes = Buffer.from(JSON.stringify(reports[key], null, 2) + "\n");
    await writeFile(join(root, reportPath), bytes);
    inputs[key] = {
      ...metadata[key],
      reportPath,
      reportSha256: createHash("sha256").update(bytes).digest("hex"),
    };
  }
  for (const [key, patch] of Object.entries(overrides.inputs ?? {})) {
    inputs[key] = { ...inputs[key], ...patch };
  }

  const manifest = {
    schemaVersion: 1,
    repository: "weexdayend/uigerhana-space",
    expectedCommit: COMMIT,
    generatedAt: "2026-11-28T10:10:00.000Z",
    inputs,
  };
  const manifestPath = join(root, "manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  return { root, manifest, manifestPath, reports, inputs };
}

test("accepts exact-commit evidence but never approves release", async (t) => {
  const fixture = await createFixture(t);
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "owner-review-required");
  assert.equal(report.releaseApproved, false);
  assert.equal(report.releaseDecision, "owner-review-required");
  assert.equal(report.gates.externalDestination.status, "evidence-present");
  assert.equal(report.gates.productionParity.status, "evidence-present");
  assert.equal(report.gates.physicalDevice.status, "evidence-present");
  assert.ok(report.ownerReviewRequired.some((item) => item.id === "final-owner-go-no-go"));
});

test("blocks when an external destination is unavailable", async (t) => {
  const external = makeExternalReport();
  external.results[0].status = 404;
  external.results[0].classification = "unavailable";
  external.summary = Object.fromEntries(CLASSES.map((name) => [
    name, external.results.filter((item) => item.classification === name).length,
  ]));
  const fixture = await createFixture(t, { reports: { externalDestination: external } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "blocked");
  assert.ok(report.blockers.some((item) => item.gate === "externalDestination"));
});

test("blocks when production served revision markers are not verifiable", async (t) => {
  const production = makeProductionReport();
  production.outcome.productionCommitParity = "not-verifiable";
  production.servedRevisionMarkers = [];
  const fixture = await createFixture(t, { reports: { productionParity: production } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "blocked");
  assert.equal(report.gates.productionParity.status, "hold");
});

test("blocks incomplete Android/iOS evidence even when its workflow succeeded", async (t) => {
  const physical = makePhysicalReport();
  physical.status = "incomplete";
  physical.platformsSeen = ["android"];
  physical.sessionCount = 1;
  physical.sessions = [{ platform: "android", physicalDeviceConfirmed: true }];
  const fixture = await createFixture(t, { reports: { physicalDevice: physical } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "blocked");
  assert.equal(report.gates.physicalDevice.status, "hold");
});

test("rejects a report whose downloaded bytes do not match the manifest digest", async (t) => {
  const fixture = await createFixture(t);
  await writeFile(join(fixture.root, fixture.inputs.externalDestination.reportPath), JSON.stringify({ changed: true }));
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("SHA-256")));
});

test("rejects evidence workflows dispatched from a different commit", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { productionParity: { headSha: "a".repeat(40) } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("head SHA")));
});

test("rejects report paths that escape the evidence bundle", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { physicalDevice: { reportPath: "../outside.json" } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("escapes")));
});

test("rejects inconsistent external destination summary counters", async (t) => {
  const external = makeExternalReport();
  external.summary.reachable = 999;
  const fixture = await createFixture(t, { reports: { externalDestination: external } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("summary count")));
});

test("rejects any input that attempts to mark machine evidence as release approval", async (t) => {
  const physical = makePhysicalReport();
  physical.releaseApproved = true;
  const fixture = await createFixture(t, { reports: { physicalDevice: physical } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("must never approve release")));
});

test("rejects a report timestamp outside its source workflow run window", async (t) => {
  const external = makeExternalReport();
  external.checkedAt = "2026-11-28T09:54:00.000Z";
  const fixture = await createFixture(t, { reports: { externalDestination: external } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("within the source workflow run window")));
});

test("rejects a manifest generated before a source workflow completed", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { productionParity: { runUpdatedAt: "2026-11-28T10:11:00.000Z" } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("completed before the provenance manifest")));
});

test("rejects physical-device validation reports without a run-bound validation timestamp", async (t) => {
  const physical = makePhysicalReport();
  delete physical.validatedAt;
  const fixture = await createFixture(t, { reports: { physicalDevice: physical } });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("valid validatedAt timestamp")));
});

test("rejects a source artifact that is not bound to the validated run attempt", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { productionParity: { runAttempt: 2 } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("artifact name is not bound to expectedCommit and runAttempt")));
});

test("rejects missing or invalid source workflow run attempts", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { physicalDevice: { runAttempt: 0 } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("invalid workflow run attempt")));
});

test("rejects reuse of one workflow run as multiple independent evidence sources", async (t) => {
  const fixture = await createFixture(t, {
    inputs: { physicalDevice: { runId: 101 } },
  });
  const report = await evaluateReleaseEvidenceManifest(fixture.manifestPath);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("must be unique")));
});
