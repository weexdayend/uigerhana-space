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
| P8-LINK-01 | public routes, metadata, sitemap, robots and draft publication boundary | PARTIAL — semantic draft-boundary rerun pending | [PR Actions #46058407707](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707); [artifact #15227981742](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707/artifacts/15227981742) | Sitemap and public metadata passed; HTTP-only 404 assertion was incorrect for streamed `notFound()` responses; separate browser UI/noindex checks committed for the next run |
| P8-LINK-02 | rendered internal links/fragments and external link policy | PASS — INITIAL THREE-ENGINE RUN | [PR Actions #46058407707](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707); [artifact #15227981742](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707/artifacts/15227981742) | 36 anchors per engine; 26 internal, 10 external; four internal destinations and all fragments passed; six unique HTTPS destinations; external host reachability remains manual |
| P8-PERF-01 | Chromium production-build lab baseline | RECORDED — RERUN SNAPSHOT | [Actions #46058407707 artifact #15227981742](https://github.com/weexdayend/uigerhana-space/actions/runs/46058407707/artifacts/15227981742); 12 samples / 4 routes | All HTTP 200; median FCP/LCP: home 164 ms, work 96 ms, case study 124 ms, CV 68 ms; CLS 0 all routes; no console/page/request errors; 131 ms long-task total on first home view and 51 ms on first case-study view; no budgets set |
| P8-PERF-02 | field/mobile/INP performance acceptance | NOT VERIFIED | Future representative-device and field evidence | CI lab data is not field CWV or INP |
| P8-PROD-01 | production commit parity | NOT VERIFIED | Future read-only verification | No deployment authority |
| P8-OWNER-01 | final owner go/no-go | OPEN | Owner decision | Release remains blocked |
