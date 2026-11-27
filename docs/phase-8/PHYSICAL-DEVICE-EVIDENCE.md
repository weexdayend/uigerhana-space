# Phase 8.10 — Physical-Device Evidence Contract

**Status:** Instrumented; exact-head CI pending.  
**Scope:** Intake and integrity validation for owner-run physical Android and iOS acceptance. This contract does not simulate hardware or approve a release.

## Required sessions

Create one session for a physical Android device and one for a physical iOS device. Each session records:

- Manufacturer, model, OS version, display scale, browser name/version, CSS viewport, DPR, and test timestamp.
- Network type and measured conditions when available.
- A positive owner attestation that the session was conducted on physical hardware (not desktop emulation, simulator, or browser responsive mode).
- A result for every required scenario.

## Required scenarios per platform

1. **Public routes:** \`/\`, \`/work\`, \`/work/uigerhana-space\`, and \`/cv\` each return 200, expose main content, and do not overflow horizontally.
2. **Touch navigation:** Open the mobile menu, navigate to the Work anchor, open the work index, and follow the approved case-study link. Record target geometry for each action.
3. **Story swipe:** Reach all four Product Journey panels with a natural touch gesture; verify vertical scrolling remains usable and no gesture conflict occurs.
4. **Native/browser back:** Verify the platform/browser back action returns to the prior route without a broken or trapped navigation state.
5. **OS text scaling:** Record the exact native OS text-size/accessibility setting and verify content does not clip or overflow.
6. **Reduced motion:** Enable the platform's reduced-motion setting and verify the complete story remains in order without the pinned interaction.
7. **Assistive technology:** Record the screen reader/AT name and version, and verify landmarks, heading order, link names, menu state, reading order, and focus order.

A passing scenario must reference at least one evidence attachment. Each attachment must identify its session and scenario, use a path relative to the evidence directory, and include the exact SHA-256 digest of its bytes.

## Generate a session file

Copy \`evidence/physical-device/physical-device-session.template.json\` to \`evidence/physical-device/session.json\`. Replace all placeholders, preserve the schema shape, and add evidence files under \`evidence/physical-device/\`.

Example attachment record:

\`\`\`json
{
  "id": "android-story-swipe-video",
  "path": "android/story-swipe.mp4",
  "sessionId": "android-physical-session",
  "scenarioId": "storySwipe",
  "sha256": "<64-character SHA-256>"
}
\`\`\`

Reference that attachment id in the matching scenario's \`attachmentIds\` array. Compute hashes only after the file is final. The validator resolves symlinks and rejects any attachment that escapes the evidence directory.

## Validate locally

Run from the repository root with Node 24 or a compatible recent Node runtime:

\`\`\`bash
EXPECTED_COMMIT="<full-40-character-reviewed-commit>" \
REPORT_PATH="./physical-device-acceptance-report.json" \
node scripts/validate-physical-device-evidence.mjs \
  evidence/physical-device/session.json \
  evidence/physical-device
\`\`\`

Exit codes:
- \`0\`: evidence is complete and all required scenarios are marked passed.
- \`1\`: malformed input, privacy-key violation, SHA mismatch, missing attachment, path escape, or exact-commit mismatch.
- \`2\`: incomplete evidence or a recorded acceptance failure.

The JSON report lists sessions, platform coverage, attachment count, blockers, failures, and warnings.

## Manual GitHub Actions audit

After the workflow file has been merged onto the repository's default branch (required for the manual `workflow_dispatch` entry point), run **Physical Device Acceptance Audit** manually:

- In the Actions tab, select the branch/commit that contains both the evidence JSON and attachments.
- Supply the full expected commit SHA.
- Supply the evidence JSON path (normally \`evidence/physical-device/session.json\`).
- Review the uploaded \`physical-device-acceptance-report.json\` artifact and preserve it with the release record.

The workflow has read-only repository permissions. It checks out the selected commit, validates evidence, and uploads a report; it does not deploy, change settings, or mutate production.

## Privacy and evidence boundaries

Do not include serial numbers, IMEI, UDID, Android ID, advertising identifiers, phone numbers, personal email, GPS coordinates, postal addresses, or other personal/device identifiers. Screenshots and recordings should be cropped or redacted to avoid unrelated notifications, accounts, messages, or location information. Do not record a person's face or voice unless the owner has a separate valid reason and consent to retain it.

A completed evidence report means only that the required evidence package is present, internally consistent, and SHA-verified. It does **not** independently prove the device is genuine; the physical-device checkbox is an owner attestation. It does not certify all handset models, browser versions, carriers, users, or assistive technologies.

The validator always emits \`releaseApproved: false\` and \`releaseDecision: "owner-review-required"\`. The owner must review the evidence and record a separate explicit go/no-go decision. Field Core Web Vitals/INP, external destination reachability, production parity, native print, and final release authorization remain separate gates.
