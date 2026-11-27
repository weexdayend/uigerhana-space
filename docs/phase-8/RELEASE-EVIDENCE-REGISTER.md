# Phase 8 — Release Evidence Register

Keep this ledger current as Phase 8 progresses. Each PASS must link to exact commit/run/artifact or owner evidence.

| ID | Gate | Status | Evidence | Notes |
|---|---|---|---|---|
| P8-BASE-01 | #17–#24 merged sequentially | PASS | PR #17–#24 GitHub states | Phase 7 stack is merged |
| P8-BASE-02 | main exact head | PASS | `675eaed00b8e06163c8df8b06474fd32cf2554f7` | PR #24 merge commit; later Phase 8 branches are stacked above PRs and do not alter main |
| P8-BASE-03 | exact-main quality and browser QA | PASS | [Actions #46054077202](https://github.com/weexdayend/uigerhana-space/actions/runs/46054077202) | Both quality and cross-engine runtime jobs succeeded |
| P8-BASE-04 | PR #25 QA foundation | PASS | [Actions #46054485925](https://github.com/weexdayend/uigerhana-space/actions/runs/46054485925) | Both quality and runtime visual/accessibility jobs succeeded |
| P8-BASE-05 | PR #26 reflow remediation | PASS | [PR Actions #46055899645](https://github.com/weexdayend/uigerhana-space/actions/runs/46055899645); [push Actions #46055893632](https://github.com/weexdayend/uigerhana-space/actions/runs/46055893632) | Exact head `fb4de1234ad75d87d34a1f544847ef96a6f95845`; both CI triggers passed, including Chromium/Firefox/WebKit |
| P8-ROOT-01 | 200% CSS root-text reflow proxy | PASS — AUTOMATED | PR #26 exact-head CI and 4 routes × 390/360/320px reflow regression | Literal browser zoom and native OS text scaling remain manual |
| P8-ZOOM-01 | literal browser 200% zoom | MANUAL / NOT RUN | Owner runbook | Effective viewport/root-font tests are not literal zoom |
| P8-OS-01 | native OS text scaling | MANUAL / NOT RUN | Owner runbook | Record actual platform/settings |
| P8-PRINT-01 | native print / Save as PDF | MANUAL / NOT RUN | Owner runbook | Headless Chromium PDF is only regression evidence |
| P8-LINK-01 | public routes, metadata, sitemap, robots and unpublished-route boundary | PASS — FINAL EXACT HEAD | [PR Actions #46061556961](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961); [artifact #15228823778](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961/artifacts/15228823778) | Four public routes and sitemap match; three unpublished routes show not-found UI, no detail content, `noindex`, and remain absent from sitemap across all engines |
| P8-LINK-02 | rendered internal links/fragments and external link policy | PASS — FINAL EXACT HEAD | [PR Actions #46061556961](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961); [artifact #15228823778](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961/artifacts/15228823778) | 36 anchors per engine; 26 internal, 10 external; four internal destinations and all fragments passed; six unique HTTPS destinations; external host reachability remains manual |
| P8-PERF-01 | Chromium production-build lab baseline | RECORDED — FINAL SNAPSHOT | [PR Actions #46061556961 artifact #15228823778](https://github.com/weexdayend/uigerhana-space/actions/runs/46061556961/artifacts/15228823778); 12 samples / 4 routes | All HTTP 200; median FCP/LCP: home 144 ms, work 84 ms, case study 84 ms, CV 120 ms; median CLS 0; no console/page/request errors; individual long tasks retained in raw data; no budgets set |
| P8-INTERACTION-01 | keyboard focus-visible, mobile menu focus, hover-state delta, and primary target size | PASS — AUTOMATED EXACT HEAD | [PR Actions #46066904014](https://github.com/weexdayend/uigerhana-space/actions/runs/46066904014); [push Actions #46066883235](https://github.com/weexdayend/uigerhana-space/actions/runs/46066883235); artifacts #15230689950 / #15230759858 | Exact head `6cffd38d700be3349220a3025ab8fe51be861d1d`; both runtime jobs: 327 passed / 6 skipped / 0 failed; focus/target on three engines, pointer-state Chromium-only; native AT/device gates remain manual |
| P8-CONTRAST-01 | Focus indicator and sampled hover-text contrast | PENDING — PHASE 8.5 | `tests/e2e/interaction-contrast.spec.ts`; `docs/phase-8/INTERACTION-STATE-CONTRAST-AUDIT.md` | Awaiting exact-head CI; method only asserts solid adjacent surfaces; full-site/image contrast not claimed |
| P8-PERF-02 | field/mobile/INP performance acceptance | NOT VERIFIED | Future representative-device and field evidence | CI lab data is not field CWV or INP |
| P8-PROD-01 | production commit parity | NOT VERIFIED | Future read-only verification | No deployment authority |
| P8-OWNER-01 | final owner go/no-go | OPEN | Owner decision | Release remains blocked |
