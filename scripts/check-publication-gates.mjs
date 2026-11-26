import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const SOURCE_ROOTS = ["src/app", "src/components"];
const EVIDENCE_PATH = "src/data/project-evidence.ts";
const SOURCE_EVIDENCE_PATH = "src/data/project-source-evidence.ts";
const CASE_STUDY_PATH = "src/data/case-studies.ts";
const WRITING_PATH = "src/data/writing.ts";

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(fullPath)));
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function fail(message) {
  console.error("Content publication gate failed: " + message);
  process.exitCode = 1;
}

const uiFiles = (await Promise.all(SOURCE_ROOTS.map(collectSourceFiles))).flat();
const uiSources = await Promise.all(
  uiFiles.map(async (path) => ({
    path,
    content: await readFile(path, "utf8"),
  }))
);

const forbiddenReferences = uiSources.filter(
  ({ content }) =>
    /project-evidence|project-source-evidence|PROJECT_EVIDENCE_REGISTER|PROJECT_SOURCE_EVIDENCE|ProjectEvidenceRecord/.test(content)
);

if (forbiddenReferences.length > 0) {
  fail(
    "review-only evidence register is referenced by public UI: " +
      forbiddenReferences.map((item) => item.path).join(", ")
  );
}

const evidenceSource = await readFile(EVIDENCE_PATH, "utf8");
const sourceEvidence = await readFile(SOURCE_EVIDENCE_PATH, "utf8");
const evidenceRecordCount = (evidenceSource.match(/^\s+id: "/gm) ?? []).length;
const reviewRequiredCount = (
  evidenceSource.match(/^    publicationState: "review-required",$/gm) ?? []
).length;
const unconfirmedStatusCount = (
  evidenceSource.match(/^    projectStatus: "not-confirmed",$/gm) ?? []
).length;
const unclearedAttributionCount = (
  evidenceSource.match(/^    attributionDisclosure: "not-cleared",$/gm) ?? []
).length;
const sourceEvidenceRecordCount = (sourceEvidence.match(/^    id: "/gm) ?? []).length;
const sourceEvidenceReviewRequiredCount = (
  sourceEvidence.match(/publicationState: "review-required"/g) ?? []
).length;
const sourceEvidenceAttributionNotClearedCount = (
  sourceEvidence.match(/attributionDisclosure: "not-cleared"/g) ?? []
).length;

if (evidenceRecordCount === 0) {
  fail("no résumé-backed project evidence records were found");
}

if (
  sourceEvidenceRecordCount === 0 ||
  sourceEvidenceReviewRequiredCount !== sourceEvidenceRecordCount ||
  sourceEvidenceAttributionNotClearedCount !== sourceEvidenceRecordCount
) {
  fail("private-source evidence records must remain review-required and attribution-not-cleared");
}

if (
  reviewRequiredCount !== evidenceRecordCount ||
  unconfirmedStatusCount !== evidenceRecordCount ||
  unclearedAttributionCount !== evidenceRecordCount
) {
  fail(
    "every project evidence record must remain review-required, status-unconfirmed, and attribution-not-cleared"
  );
}

const caseStudySource = await readFile(CASE_STUDY_PATH, "utf8");
const hasApprovedSelector =
  /PUBLIC_CASE_STUDIES\s*=\s*CASE_STUDIES\.filter\(\s*\(study\)\s*=>\s*study\.publicationStatus\s*===\s*"approved"/s.test(
    caseStudySource
  );
const hasPublicLookup =
  /getPublicCaseStudy\(slug: string\)[\s\S]*?PUBLIC_CASE_STUDIES\.find/.test(
    caseStudySource
  );
const hasDraftDeepDive =
  /slug: "professional-services-automation-platform",[\s\S]*?publicationStatus: "draft"/.test(
    caseStudySource
  );
const hasDraftInvitationDeepDive =
  /slug: "passwordless-team-invitations",[\s\S]*?publicationStatus: "draft"/.test(
    caseStudySource
  );
const hasDraftBackupRecoveryDeepDive =
  /slug: "verifiable-backup-and-recovery-operations",[\s\S]*?publicationStatus: "draft"/.test(
    caseStudySource
  );

if (!hasApprovedSelector) {
  fail("public case studies must be filtered by explicit approved status");
}

if (!hasPublicLookup) {
  fail("public case-study lookup must resolve only from the approved selector");
}

if (!hasDraftDeepDive) {
  fail("the reviewed IT-services platform deep dive must remain a draft until owner approval");
}

if (!hasDraftInvitationDeepDive) {
  fail("the passwordless invitation vertical-slice deep dive must remain a draft until owner approval");
}

if (!hasDraftBackupRecoveryDeepDive) {
  fail("the backup and recovery case study must remain a draft until owner approval");
}


const writingSource = await readFile(WRITING_PATH, "utf8");
const requiredPublicProfileUrls = [
  "https://github.com/weexdayend",
  "https://dev.to/uigerhana",
  "https://medium.com/@weexdayend",
];
const writingProfileCount = (writingSource.match(/id: "(?:github|dev|medium)"/g) ?? []).length;
const featuredWritingCount = (writingSource.match(/id: "article-[^"]+"/g) ?? []).length;

if (writingProfileCount !== requiredPublicProfileUrls.length) {
  fail("the public GitHub, DEV, and Medium profile records must remain present");
}

for (const url of requiredPublicProfileUrls) {
  if (!writingSource.includes(url)) {
    fail("missing verified public profile URL: " + url);
  }
}

if (featuredWritingCount < 3) {
  fail("at least three owner-authored public writing links must remain available");
}

if (process.exitCode !== 1) {
  console.log(
    "Content publication gates passed: " +
      evidenceRecordCount +
      " résumé-derived records and " +
      sourceEvidenceRecordCount +
      " private-source records remain review-only; no public UI imports; approved-only case-study selector."
  );
}
