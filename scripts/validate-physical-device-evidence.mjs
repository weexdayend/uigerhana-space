import { createHash } from "node:crypto";
import { readFile, realpath, stat, mkdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

export const PUBLIC_ROUTES = ["/", "/work", "/work/uigerhana-space", "/cv"];
export const REQUIRED_PLATFORMS = ["android", "ios"];
export const REQUIRED_SCENARIOS = [
  "publicRoutes",
  "touchNavigation",
  "storySwipe",
  "nativeBackNavigation",
  "osTextScaling",
  "reducedMotion",
  "assistiveTechnology",
];

const SHA_PATTERN = /^[a-f0-9]{40}$/i;
const HASH_PATTERN = /^[a-f0-9]{64}$/i;
const VALID_STATUSES = new Set(["pass", "fail", "not-run", "blocked"]);
const PRIVACY_KEY_PATTERN =
  /^(serial(number)?|imei|udid|advertising(id)?|android(id)?|phone(number)?|email|latitude|longitude|gps|postal(code)?|street(address)?)$/i;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isWithin(parent, candidate) {
  const rel = relative(parent, candidate);
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

function findPrivacyFields(value, path = "$", findings = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => findPrivacyFields(item, path + "[" + index + "]", findings));
    return findings;
  }
  if (!isRecord(value)) return findings;

  for (const [key, child] of Object.entries(value)) {
    const nextPath = path + "." + key;
    if (PRIVACY_KEY_PATTERN.test(key)) findings.push(nextPath);
    findPrivacyFields(child, nextPath, findings);
  }
  return findings;
}

function addUnique(list, value) {
  if (!list.includes(value)) list.push(value);
}

function validateScenarioShape(session, scenarioName, scenario, attachmentMap, blockers, failures, errors) {
  if (!isRecord(scenario)) {
    blockers.push(session.id + ": missing scenario " + scenarioName);
    return;
  }

  if (!VALID_STATUSES.has(scenario.status)) {
    errors.push(session.id + ": " + scenarioName + " has an invalid status.");
    return;
  }

  if (scenario.status === "fail") {
    failures.push(session.id + ": " + scenarioName + " was recorded as failed.");
    return;
  }
  if (scenario.status !== "pass") {
    blockers.push(session.id + ": " + scenarioName + " is " + scenario.status + ".");
    return;
  }

  if (!Array.isArray(scenario.attachmentIds) || scenario.attachmentIds.length === 0) {
    blockers.push(session.id + ": " + scenarioName + " has no evidence attachment.");
  } else {
    for (const attachmentId of scenario.attachmentIds) {
      const attachment = attachmentMap.get(attachmentId);
      if (!attachment) {
        errors.push(session.id + ": " + scenarioName + " references unknown attachment " + attachmentId + ".");
      } else if (attachment.sessionId !== session.id || attachment.scenarioId !== scenarioName) {
        errors.push(session.id + ": attachment " + attachmentId + " belongs to a different session or scenario.");
      }
    }
  }

  switch (scenarioName) {
    case "publicRoutes": {
      if (!Array.isArray(scenario.routes)) {
        blockers.push(session.id + ": publicRoutes has no route result array.");
        break;
      }
      for (const route of PUBLIC_ROUTES) {
        const result = scenario.routes.find((item) => item?.path === route);
        if (!result) {
          blockers.push(session.id + ": publicRoutes is missing " + route + ".");
          continue;
        }
        if (result.statusCode !== 200 || result.mainContentVisible !== true ||
            result.horizontalOverflow !== false) {
          failures.push(session.id + ": public route acceptance failed for " + route + ".");
        }
      }
      break;
    }
    case "touchNavigation": {
      const expectedSteps = [
        "open-mobile-menu",
        "navigate-work-anchor",
        "open-work-index",
        "open-approved-case-study",
      ];
      if (!Array.isArray(scenario.steps)) {
        blockers.push(session.id + ": touchNavigation has no step results.");
        break;
      }
      for (const stepName of expectedSteps) {
        const step = scenario.steps.find((item) => item?.id === stepName);
        if (!step) {
          blockers.push(session.id + ": touchNavigation is missing " + stepName + ".");
          continue;
        }
        if (step.result !== "success") {
          failures.push(session.id + ": touch navigation failed at " + stepName + ".");
        }
        if (!isRecord(step.target) || !positiveNumber(step.target.width) ||
            !positiveNumber(step.target.height)) {
          blockers.push(session.id + ": touch target geometry is missing for " + stepName + ".");
        }
      }
      break;
    }
    case "storySwipe": {
      const reached = Array.isArray(scenario.reachedPanels)
        ? [...new Set(scenario.reachedPanels)].sort((a, b) => a - b)
        : [];
      if (JSON.stringify(reached) !== JSON.stringify([1, 2, 3, 4])) {
        failures.push(session.id + ": not all four Product Journey panels were reached by swipe.");
      }
      if (scenario.verticalScrollPreserved !== true || scenario.gestureConflicts !== false) {
        failures.push(session.id + ": story swipe caused a vertical-scroll or gesture conflict.");
      }
      break;
    }
    case "nativeBackNavigation": {
      if (scenario.works !== true || scenario.returnsToPreviousRoute !== true) {
        failures.push(session.id + ": native/browser back navigation was not accepted.");
      }
      break;
    }
    case "osTextScaling": {
      if (!nonEmptyString(scenario.setting)) blockers.push(session.id + ": OS text scaling setting is not recorded.");
      if (scenario.applied !== true || scenario.contentClipped !== false ||
          scenario.horizontalOverflow !== false) {
        failures.push(session.id + ": OS text scaling did not preserve readable, unclipped content.");
      }
      break;
    }
    case "reducedMotion": {
      if (!nonEmptyString(scenario.setting)) blockers.push(session.id + ": reduced-motion setting is not recorded.");
      if (scenario.active !== true || scenario.allContentInOrder !== true ||
          scenario.pinnedStoryDisabled !== true) {
        failures.push(session.id + ": reduced-motion acceptance failed.");
      }
      break;
    }
    case "assistiveTechnology": {
      if (!nonEmptyString(scenario.technology) || !nonEmptyString(scenario.version)) {
        blockers.push(session.id + ": assistive-technology name/version is not recorded.");
      }
      const checks = scenario.checks;
      const required = ["landmarks", "headingOrder", "linkNames", "menuState", "readingOrder", "focusOrder"];
      if (!isRecord(checks)) {
        blockers.push(session.id + ": assistive-technology checks are missing.");
      } else {
        for (const check of required) {
          if (checks[check] !== true) failures.push(session.id + ": assistive-technology check failed: " + check + ".");
        }
      }
      break;
    }
  }
}

async function validateAttachments(attachments, evidenceRoot, errors) {
  const attachmentMap = new Map();
  const resolvedRoot = await realpath(evidenceRoot).catch(() => null);
  if (!resolvedRoot) {
    errors.push("Evidence directory does not exist: " + evidenceRoot);
    return attachmentMap;
  }

  if (!Array.isArray(attachments)) {
    errors.push("attachments must be an array.");
    return attachmentMap;
  }

  for (const attachment of attachments) {
    if (!isRecord(attachment) || !nonEmptyString(attachment.id) ||
        !nonEmptyString(attachment.path) || !nonEmptyString(attachment.sessionId) ||
        !nonEmptyString(attachment.scenarioId) || !HASH_PATTERN.test(attachment.sha256 ?? "")) {
      errors.push("Every attachment must include id, relative path, sessionId, scenarioId, and SHA-256.");
      continue;
    }
    if (attachmentMap.has(attachment.id)) {
      errors.push("Duplicate attachment id: " + attachment.id + ".");
      continue;
    }

    const candidate = resolve(resolvedRoot, attachment.path);
    if (!isWithin(resolvedRoot, candidate)) {
      errors.push("Attachment path escapes the evidence directory: " + attachment.path + ".");
      continue;
    }

    const actualPath = await realpath(candidate).catch(() => null);
    if (!actualPath || !isWithin(resolvedRoot, actualPath)) {
      errors.push("Attachment is missing or resolves outside the evidence directory: " + attachment.path + ".");
      continue;
    }

    const fileStat = await stat(actualPath).catch(() => null);
    if (!fileStat?.isFile()) {
      errors.push("Attachment is not a regular file: " + attachment.path + ".");
      continue;
    }

    const bytes = await readFile(actualPath);
    const actualHash = createHash("sha256").update(bytes).digest("hex");
    if (actualHash.toLowerCase() !== attachment.sha256.toLowerCase()) {
      errors.push("Attachment SHA-256 mismatch: " + attachment.path + ".");
      continue;
    }

    attachmentMap.set(attachment.id, attachment);
  }
  return attachmentMap;
}

export async function validateEvidencePayload(evidence, evidenceRoot, expectedCommit) {
  const errors = [];
  const blockers = [];
  const failures = [];
  const warnings = [];

  if (!SHA_PATTERN.test(expectedCommit ?? "")) {
    errors.push("Expected commit must be a full 40-character SHA.");
  }
  if (!isRecord(evidence)) {
    return {
      status: "invalid",
      errors: ["Evidence document root must be an object."],
      blockers,
      failures,
      warnings,
      releaseApproved: false,
      releaseDecision: "owner-review-required",
    };
  }

  if (evidence.schemaVersion !== 1) errors.push("schemaVersion must be 1.");
  if (!SHA_PATTERN.test(evidence.sourceCommit ?? "")) {
    errors.push("sourceCommit must be a full 40-character SHA.");
  } else if (SHA_PATTERN.test(expectedCommit ?? "") &&
      evidence.sourceCommit.toLowerCase() !== expectedCommit.toLowerCase()) {
    errors.push("sourceCommit does not match the exact reviewed commit.");
  }
  if (!nonEmptyString(evidence.reviewedAt) || !Number.isFinite(Date.parse(evidence.reviewedAt))) {
    errors.push("reviewedAt must be an ISO-compatible timestamp.");
  }
  if (!nonEmptyString(evidence.reviewerRole)) {
    blockers.push("reviewerRole is missing.");
  }

  const privacyFindings = findPrivacyFields(evidence);
  if (privacyFindings.length > 0) {
    errors.push("Potentially identifying device or personal fields are prohibited: " +
      privacyFindings.join(", ") + ".");
  }

  const attachments = evidence.attachments;
  const attachmentMap = await validateAttachments(attachments, evidenceRoot, errors);

  if (!Array.isArray(evidence.sessions)) {
    blockers.push("sessions must contain one physical Android session and one physical iOS session.");
  }

  const platformsSeen = [];
  const sessionIds = new Set();
  const sessionSummaries = [];

  for (const session of Array.isArray(evidence.sessions) ? evidence.sessions : []) {
    if (!isRecord(session)) {
      errors.push("Every session must be an object.");
      continue;
    }
    if (!nonEmptyString(session.id) || sessionIds.has(session.id)) {
      errors.push("Session ids must be non-empty and unique.");
      continue;
    }
    sessionIds.add(session.id);

    if (!REQUIRED_PLATFORMS.includes(session.platform)) {
      errors.push(session.id + ": platform must be android or ios.");
    } else {
      addUnique(platformsSeen, session.platform);
    }
    if (session.physicalDeviceConfirmed !== true) {
      failures.push(session.id + ": session is not confirmed as a physical device.");
    }

    const device = session.device;
    const browser = session.browser;
    const viewport = session.viewport;
    if (!isRecord(device) || !nonEmptyString(device.manufacturer) ||
        !nonEmptyString(device.model) || !nonEmptyString(device.osVersion) ||
        !positiveNumber(device.displayScale)) {
      blockers.push(session.id + ": device model, OS version, manufacturer, and display scale are required.");
    }
    if (!isRecord(browser) || !nonEmptyString(browser.name) || !nonEmptyString(browser.version)) {
      blockers.push(session.id + ": browser name and version are required.");
    }
    if (!isRecord(viewport) || !positiveNumber(viewport.width) ||
        !positiveNumber(viewport.height) || !positiveNumber(viewport.devicePixelRatio)) {
      blockers.push(session.id + ": viewport dimensions and DPR are required.");
    }
    if (!isRecord(session.network) || !nonEmptyString(session.network.type)) {
      blockers.push(session.id + ": network type is required.");
    }
    if (!nonEmptyString(session.testedAt) || !Number.isFinite(Date.parse(session.testedAt))) {
      blockers.push(session.id + ": testedAt timestamp is missing or invalid.");
    }

    const scenarios = session.scenarios;
    for (const scenarioName of REQUIRED_SCENARIOS) {
      validateScenarioShape(
        session,
        scenarioName,
        isRecord(scenarios) ? scenarios[scenarioName] : null,
        attachmentMap,
        blockers,
        failures,
        errors
      );
    }

    if (isRecord(scenarios?.touchNavigation) && Array.isArray(scenarios.touchNavigation.steps)) {
      const sizes = scenarios.touchNavigation.steps
        .map((step) => step?.target)
        .filter(isRecord)
        .map((target) => Math.min(target.width, target.height))
        .filter((value) => Number.isFinite(value));
      if (sizes.some((size) => size < 24)) {
        warnings.push(session.id + ": at least one measured touch target is below 24 CSS px; review spacing/target-size exceptions manually.");
      }
    }

    sessionSummaries.push({
      id: session.id,
      platform: session.platform,
      device: isRecord(device) ? [device.manufacturer, device.model].filter(nonEmptyString).join(" ") : null,
      osVersion: isRecord(device) ? device.osVersion ?? null : null,
      browser: isRecord(browser) ? [browser.name, browser.version].filter(nonEmptyString).join(" ") : null,
      physicalDeviceConfirmed: session.physicalDeviceConfirmed === true,
    });
  }

  for (const platform of REQUIRED_PLATFORMS) {
    if (!platformsSeen.includes(platform)) blockers.push("Missing physical-device session for " + platform + ".");
  }
  for (const attachment of Array.isArray(attachments) ? attachments : []) {
    if (isRecord(attachment) && nonEmptyString(attachment.sessionId) &&
        !sessionIds.has(attachment.sessionId)) {
      errors.push("Attachment references an unknown session: " + attachment.id + ".");
    }
  }

  let status = "evidence-complete";
  if (errors.length > 0) status = "invalid";
  else if (failures.length > 0) status = "acceptance-failed";
  else if (blockers.length > 0) status = "incomplete";

  return {
    status,
    schemaVersion: evidence.schemaVersion,
    sourceCommit: evidence.sourceCommit ?? null,
    expectedCommit: expectedCommit ?? null,
    sessionCount: sessionSummaries.length,
    platformsSeen,
    sessions: sessionSummaries,
    attachmentCount: attachmentMap.size,
    errors,
    failures,
    blockers,
    warnings,
    releaseApproved: false,
    releaseDecision: "owner-review-required",
    note: "Evidence completeness is not a release approval. The owner must review findings and record a separate go/no-go decision.",
  };
}

async function main() {
  const [evidencePath, evidenceDirectory] = process.argv.slice(2);
  if (!evidencePath || !evidenceDirectory) {
    throw new Error(
      "Usage: node scripts/validate-physical-device-evidence.mjs <evidence.json> <evidence-directory>"
    );
  }

  const expectedCommit = process.env.EXPECTED_COMMIT ?? "";
  const absoluteEvidencePath = resolve(process.cwd(), evidencePath);
  const absoluteEvidenceDirectory = resolve(process.cwd(), evidenceDirectory);
  const evidence = JSON.parse(await readFile(absoluteEvidencePath, "utf8"));
  const report = await validateEvidencePayload(evidence, absoluteEvidenceDirectory, expectedCommit);
  const serialized = JSON.stringify(report, null, 2);

  console.log(serialized);
  if (process.env.REPORT_PATH) {
    const reportPath = resolve(process.env.REPORT_PATH);
    await mkdir(dirname(reportPath), { recursive: true });
    await writeFile(reportPath, serialized + "\n");
  }

  if (report.status === "invalid") process.exitCode = 1;
  else if (report.status !== "evidence-complete") process.exitCode = 2;
}

if (process.argv[1] && import.meta.url === new URL("file://" + resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
