# System Atlas — manual acceptance runbook

**Status:** Prepared; owner/native-platform execution is not recorded  
**Review branch:** `brand/system-atlas-artboard-copy-integrity`  
**Scope:** Owner acceptance of the connected visual identity plus native-platform gates that CI cannot certify  
**Production implementation:** Not authorized  
**Deployment:** Not authorized

This runbook is deliberately separate from Playwright CI. It records the exact native/browser conditions needed to close the remaining gates without treating a headless browser proxy as the same thing.

## 1. Evidence already available

- Exact-HEAD cross-engine CI run [#45912926554](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554), artifact [15160708872](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554/artifacts/15160708872). The initial discovery artifact remains available from [run #45912275133](https://github.com/weexdayend/uigerhana-space/actions/runs/45912275133).
- Ten connected SVG artboards rendered in Chromium, Firefox, and WebKit with Manrope and Plus Jakarta Sans loaded. All three geometry/font reports show zero text-node collisions, zero out-of-viewBox text, and zero targeted artboard layout failures.
- Runtime suite exercises ten viewport samples on all four current app routes. Its first run recorded 204 pass, 4 fail, and 2 skip; the four failures were three reports of ROOT-01 and one Firefox test-measurement false positive. See the acceptance matrix for the follow-up test treatment.
- Chromium generated an A4 PDF preview; print-media assertions also run in Firefox and WebKit. Neither is a native print-dialog acceptance.

## 2. Owner visual acceptance — connected journey

Review the SVGs as one continuous visitor journey, not as isolated hero concepts:

| Artboard | Source | Owner disposition |
|---|---|---|
| Homepage desktop | [home-desktop.svg](./home-desktop.svg) | NOT REVIEWED |
| Homepage tablet | [home-tablet.svg](./home-tablet.svg) | NOT REVIEWED |
| Homepage mobile | [home-mobile.svg](./home-mobile.svg) | NOT REVIEWED |
| Work index | [work-index.svg](./work-index.svg) | NOT REVIEWED |
| Case study | [case-study.svg](./case-study.svg) | NOT REVIEWED |
| Résumé | [resume.svg](./resume.svg) | NOT REVIEWED |
| Component library | [component-library.svg](./component-library.svg) | NOT REVIEWED |
| Interaction states — desktop | [interaction-states-desktop.svg](./interaction-states-desktop.svg) | NOT REVIEWED |
| Interaction states — mobile | [interaction-states-mobile.svg](./interaction-states-mobile.svg) | NOT REVIEWED |
| Motion storyboard | [motion-storyboard.svg](./motion-storyboard.svg) | NOT REVIEWED |

Review identity and content hierarchy, route-as-supporting-graphic, typography, semantic palette roles, surface/state exceptions, CTA order, responsive content sequence, and reduced-motion comprehension. Confirm that no public claim, project status, metric, destination, or contact method is invented.

Owner acceptance is a decision, not an automated assertion. Record ACCEPT, ACCEPT WITH FINDINGS, or REJECT, with date, reviewer, reviewed commit, and any P0/P1 findings. Do not freeze tokens or authorize production implementation on the basis of CI alone.

## 3. Literal browser 200% zoom

This must be performed through the browser's own zoom control, not by resizing the viewport:

1. Open the exact preview/review target and record URL, commit, browser name/version, OS, display size, and device-pixel ratio.
2. Set browser zoom to 200% using the browser UI while keeping OS text/display scaling at its normal recorded setting.
3. Check homepage, work index, case study, and résumé. Record the resulting CSS viewport width/height from developer tools.
4. Check heading wraps, actions, navigation, status labels, card boundaries, horizontal page overflow, keyboard focus, and content reachability.
5. Save screenshots at each affected route and include the browser zoom indicator in evidence.

The automated 720 × 450 CSS viewport check is only a reflow-width proxy for a 1440 × 900 desktop at 200% zoom. It does not exercise the browser's native zoom implementation.

## 4. Native OS text/display scaling

Run independently from browser zoom:

1. Restore browser zoom to 100%.
2. Change the OS text-size/display-scaling setting to 200% where the platform offers that setting, or the largest supported accessibility text size. Record the exact OS setting and value.
3. Re-check the same four routes and the résumé, including all navigation, metadata, actions, and long headings.
4. Capture evidence and note any clipping, overlap, unreadable contrast, or unavailable action.

The automated `html { font-size: 200% }` diagnostic is not a native OS scaling test. It found **ROOT-01 · P1**: the current homepage hero heading clips at a 390px CSS viewport and the document grows to 435px in Chromium, Firefox, and WebKit. Production CSS was not changed by this PR; this issue remains open for a separately authorized implementation/fix cycle.

## 5. Native Safari and Firefox review

- **Safari:** use the installed Safari application on macOS and, where in scope, Safari on iOS/iPadOS. Record exact Safari and OS versions. Check all four routes at 1440, 834, 390, and 320 CSS-pixel widths, plus literal browser zoom, keyboard focus, disclosure behavior, reduced motion, scrolling, and print.
- **Firefox:** use the installed desktop Firefox on the target OS and record the exact version. Compare the same routes/widths and keyboard/print behavior against CI evidence.
- Playwright's WebKit project is an engine regression aid; it is not the Safari application or iOS Safari. Linux Firefox CI is not the owner's installed OS/browser review.

## 6. Native print dialog / Save as PDF

On the actual target OS/browser, open `/cv` and invoke the browser's native Print dialog:

- Paper: A4, portrait.
- Margins: record the selected setting; the stylesheet declares `@page { size: A4; margin: 16mm 14mm; }`.
- Check color and grayscale output, background handling, all résumé sections, role/date associations, real links, page breaks, blank trailing pages, clipped text, and header/footer browser chrome.
- Save the generated PDF and record browser/OS version, date, page count, paper/margin settings, and evidence path.

CI verifies `@media print` visibility in three engines and creates a two-page Chromium headless PDF. It does not open or operate the native OS print dialog.

## 7. Production/deployed-commit parity

**BLOCKED — release not authorized**

Do not deploy or merge this branch to close this gate. Once implementation and deployment are separately approved, record:

- production URL and timestamp;
- immutable deployed commit/deployment identifier from the hosting platform;
- approved release commit SHA;
- evidence that the two SHAs match;
- browser/font-loading evidence from the deployed URL.

A green PR build, branch SHA, recent push timestamp, or inaccessible production URL is not proof of deployed parity.

## 8. Evidence record template

For each executed gate, record:

```text
Gate ID:
Disposition: PASS / FAIL / BLOCKED / NOT RUN
Date and local time:
Reviewed commit:
URL / route / artboard:
Browser and exact version:
OS and exact version:
Device / display / DPR:
Viewport and scale (browser zoom and OS scaling separately):
Paper and print settings (when applicable):
Evidence links:
Findings and severity:
Owner decision / follow-up:
```

Never convert NOT RUN or BLOCKED into PASS without the stated evidence. Preserve earlier failures and add a dated retest rather than overwriting history.

## 9. Latest automated retest — 2026-11-27

Exact commit `8a6e31fd57cc501efc5663e219cd7b40f0afd3d4` passed push run [#45912926554](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554). The runtime suite reported 208 passed and 2 skipped; ROOT-01 is retained as an expected failing diagnostic in each engine. The artifact [15160708872](https://github.com/weexdayend/uigerhana-space/actions/runs/45912926554/artifacts/15160708872) contains per-engine screenshots/geometry, test output, and print evidence.

The native/manual gates in sections 2–7 are unchanged: a green automated suite does not supply owner sign-off, literal browser UI zoom, OS text scaling, native Safari, native print-dialog review, or deployed-commit parity.
