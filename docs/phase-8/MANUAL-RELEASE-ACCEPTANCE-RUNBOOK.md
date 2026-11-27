# Phase 8 — Manual Release Acceptance Runbook

**Purpose:** collect native-browser and OS evidence that CI cannot truthfully provide.
**Rule:** record NOT RUN / BLOCKED where the check was not actually performed. Never infer a pass from emulation.

## Session metadata

- Date/time + timezone:
- Tester:
- Device/model:
- OS + version:
- Browser + exact version:
- Display resolution / scaling:
- Network profile:
- Commit under review:
- Evidence folder / artifact links:

## A. Literal browser zoom — 200%

Run on the actual desktop browser, not Playwright viewport emulation.

- [ ] Set browser zoom to 200% using the browser UI/keyboard shortcut.
- [ ] Visit `/`, `/work`, `/work/uigerhana-space`, and `/cv`.
- [ ] Verify heading and body copy are not clipped or overlapped.
- [ ] Verify every primary action and navigation control remains visible/reachable.
- [ ] Verify no page-level horizontal scrollbar appears.
- [ ] Exercise header/navigation, pinned story, horizontal story, case-study sections, résumé toolbar.
- [ ] Capture full-page and focused screenshots for each route.
- [ ] Record any browser/OS chrome or layout limitation separately.

Result: NOT RUN  
Findings / screenshots:

## B. Native OS text scaling

Record the exact OS feature and percentage/setting used. Do not label browser zoom as OS text scaling.

- [ ] Enable the OS text/accessibility scaling option supported by this device.
- [ ] Repeat all four public routes.
- [ ] Verify content order, wrapping, focus indicators, control labels, and horizontal overflow.
- [ ] Record whether the browser honors the OS setting and any limitation.
- [ ] Capture evidence.

Result: NOT RUN  
OS setting / findings:

## C. Native browser print dialog and Save as PDF

- [ ] Open `/cv` in the actual browser.
- [ ] Launch the actual Print dialog using the visible action or browser UI.
- [ ] Confirm destination (Save as PDF), paper A4, portrait, scaling, margins, background graphics, headers/footers.
- [ ] Inspect preview before saving: expected page count, page breaks, no clipped content, no orphaned blank page, readable text.
- [ ] Save the PDF through the native dialog.
- [ ] Open the saved file in the OS PDF viewer and inspect every page at fit-width and 100%.
- [ ] Verify text is selectable/searchable and links remain usable where expected.
- [ ] Attach the PDF and screenshots of dialog settings and pages.

Result: NOT RUN  
Saved PDF / findings:

## D. Desktop motion interaction

- [ ] Operate the desktop pinned story using normal wheel/trackpad scrolling.
- [ ] Confirm all four panels appear in order.
- [ ] Confirm progress feedback corresponds to the visible panel.
- [ ] Confirm the final panel is reachable and the page exits pinning naturally.
- [ ] Repeat with keyboard/trackpad if applicable.
- [ ] Repeat with OS reduced-motion preference enabled and ensure all content remains in normal flow.

Result: NOT RUN  
Findings:

## E. Keyboard and assistive technology

Existing owner attestation says real-device and AT checks were completed on 2026-11-27, but does not include exact device/AT matrix or scenario logs. Add details only if records are available.

- [ ] Record screen reader / AT name and exact version.
- [ ] Record OS and browser versions.
- [ ] Verify landmarks, heading order, link names, reading order, menu state, focus return, and route changes.
- [ ] Verify the story region can be discovered and traversed.
- [ ] Verify reduced-motion reading order.
- [ ] Attach concise notes or recording references.

Result: OWNER CATEGORY ATTESTATION ONLY — DETAILS NOT SUPPLIED  
Findings:

## F. External destination reachability

Run the dedicated GitHub Actions workflow manually against the reviewed branch/commit. It builds that revision locally, scans the four approved public routes, and probes each distinct external HTTPS destination once.

- [ ] Dispatch `.github/workflows/external-destination-audit.yml` for the exact reviewed ref.
- [ ] Save the `external-destination-reachability.json` artifact with the session evidence.
- [ ] Review each URL, source route/label, HTTP status, final redirect URL, content type, and response duration.
- [ ] Recheck 404/410 results in a separate browser session before treating them as persistent unavailability.
- [ ] Treat 401/403/405/407/429 as restricted/inconclusive, not automatically broken.
- [ ] Treat 408/425/5xx and network/TLS/time-out errors as transient or runner-specific observations; retry before making a conclusion.
- [ ] Confirm destination content is still the intended public profile/article/resource and is appropriate to expose.
- [ ] Record any replacement decision separately; this audit does not authorize changing public links.

Result: NOT RUN  
Workflow run / artifact / findings:

## G. Final decision

- [ ] All P1 defects closed with exact-head evidence.
- [ ] All required engine suites green.
- [ ] Literal zoom and OS scaling accepted.
- [ ] Native print accepted.
- [ ] Performance baseline reviewed.
- [ ] Route/link integrity accepted.
- [ ] External destination reachability and content spot-check reviewed.
- [ ] Production parity verified read-only.
- [ ] No unresolved release-blocking accessibility issue.
- [ ] Owner explicitly authorizes release.

Decision: NO-GO until every required gate has evidence and owner approval.
