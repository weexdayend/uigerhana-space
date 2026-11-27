import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { validateEvidencePayload, REQUIRED_SCENARIOS, PUBLIC_ROUTES } from "./validate-physical-device-evidence.mjs";

const COMMIT = "a".repeat(40);
async function createEvidenceRoot() {
  const root = await mkdtemp(join(tmpdir(), "uigerhana-device-evidence-"));
  return root;
}

function createScenario(name, attachmentId) {
  const base = { status: "pass", attachmentIds: [attachmentId] };
  switch (name) {
    case "publicRoutes":
      return {
        ...base,
        routes: PUBLIC_ROUTES.map((path) => ({
          path,
          statusCode: 200,
          mainContentVisible: true,
          horizontalOverflow: false,
        })),
      };
    case "touchNavigation":
      return {
        ...base,
        steps: [
          "open-mobile-menu",
          "navigate-work-anchor",
          "open-work-index",
          "open-approved-case-study",
        ].map((id) => ({ id, result: "success", target: { width: 48, height: 48 } })),
      };
    case "storySwipe":
      return {
        ...base,
        reachedPanels: [1, 2, 3, 4],
        verticalScrollPreserved: true,
        gestureConflicts: false,
      };
    case "nativeBackNavigation":
      return { ...base, works: true, returnsToPreviousRoute: true };
    case "osTextScaling":
      return {
        ...base,
        setting: "Large text enabled",
        applied: true,
        contentClipped: false,
        horizontalOverflow: false,
      };
    case "reducedMotion":
      return {
        ...base,
        setting: "Reduce motion enabled",
        active: true,
        allContentInOrder: true,
        pinnedStoryDisabled: true,
      };
    case "assistiveTechnology":
      return {
        ...base,
        technology: "Screen reader",
        version: "1.0",
        checks: {
          landmarks: true,
          headingOrder: true,
          linkNames: true,
          menuState: true,
          readingOrder: true,
          focusOrder: true,
        },
      };
    default:
      throw new Error("Unknown scenario: " + name);
  }
}

async function createSession(root, platform) {
  const id = platform + "-physical-session";
  const attachments = [];
  const scenarios = {};

  for (const name of REQUIRED_SCENARIOS) {
    const attachmentId = id + "-" + name;
    const filename = attachmentId + ".txt";
    const bytes = Buffer.from("Evidence placeholder for " + platform + " / " + name + "\n");
    await writeFile(join(root, filename), bytes);
    attachments.push({
      id: attachmentId,
      path: filename,
      sessionId: id,
      scenarioId: name,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
    scenarios[name] = createScenario(name, attachmentId);
  }

  return {
    id,
    platform,
    physicalDeviceConfirmed: true,
    device: {
      manufacturer: platform === "android" ? "Example Android Maker" : "Example Phone Maker",
      model: platform === "android" ? "Example Android Model" : "Example iOS Model",
      osVersion: platform === "android" ? "16" : "27.0",
      displayScale: 3,
    },
    browser: {
      name: platform === "android" ? "Chrome" : "Safari",
      version: "1.0",
    },
    viewport: { width: 390, height: 844, devicePixelRatio: 3 },
    network: { type: "wifi", rttMs: 30, downlinkMbps: 80 },
    testedAt: "2026-11-28T09:00:00+07:00",
    scenarios,
    attachments,
  };
}

async function createValidPayload(root) {
  const android = await createSession(root, "android");
  const ios = await createSession(root, "ios");
  const androidAttachments = android.attachments;
  const iosAttachments = ios.attachments;
  delete android.attachments;
  delete ios.attachments;
  return {
    schemaVersion: 1,
    sourceCommit: COMMIT,
    reviewedAt: "2026-11-28T10:00:00+07:00",
    reviewerRole: "owner",
    sessions: [android, ios],
    attachments: [...androidAttachments, ...iosAttachments],
  };
}

test("accepts complete Android+iOS physical evidence while keeping release approval separate", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "evidence-complete");
  assert.deepEqual(report.platformsSeen.sort(), ["android", "ios"]);
  assert.equal(report.attachmentCount, 14);
  assert.equal(report.releaseApproved, false);
  assert.equal(report.releaseDecision, "owner-review-required");
});

test("reports incomplete when a platform session is missing", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.sessions = evidence.sessions.filter((session) => session.platform === "android");
  evidence.attachments = evidence.attachments.filter((item) => item.sessionId.startsWith("android-"));

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "incomplete");
  assert.ok(report.blockers.some((item) => item.includes("Missing physical-device session for ios")));
});

test("reports acceptance failure when a required physical scenario fails", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.sessions[0].scenarios.storySwipe.gestureConflicts = true;

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "acceptance-failed");
  assert.ok(report.failures.some((item) => item.includes("story swipe caused")));
});

test("rejects a reviewed commit that does not match the expected exact SHA", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);

  const report = await validateEvidencePayload(evidence, root, "b".repeat(40));

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("does not match the exact reviewed commit")));
});

test("rejects attachments whose recorded SHA-256 does not match their bytes", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.attachments[0].sha256 = "0".repeat(64);

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("SHA-256 mismatch")));
});

test("rejects evidence paths that escape the evidence directory", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.attachments[0].path = "../outside.txt";

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("escapes the evidence directory")));
});

test("rejects device identifiers and personally identifying fields", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.sessions[0].device.serialNumber = "DO-NOT-STORE";

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "invalid");
  assert.ok(report.errors.some((item) => item.includes("Potentially identifying")));
});

test("keeps all gates owner-reviewed even when physical evidence is complete", async (t) => {
  const root = await createEvidenceRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  const evidence = await createValidPayload(root);
  evidence.ownerDecision = "release";

  const report = await validateEvidencePayload(evidence, root, COMMIT);

  assert.equal(report.status, "evidence-complete");
  assert.equal(report.releaseApproved, false);
  assert.equal(report.releaseDecision, "owner-review-required");
});
