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
| P8-LINK-01 | public routes, canonical, sitemap, robots, rendered internal links and fragments | PENDING PR #27 | `tests/e2e/release-readiness.spec.ts`; route/link inventory artifact | External HTTP reachability remains manual spot-check |
| P8-LINK-02 | external link scheme and new-tab security | PENDING PR #27 | Rendered-link inventory artifact | HTTPS and noopener/noreferrer policy checked |
| P8-PERF-01 | Chromium production-build lab baseline | PENDING PR #27 | `phase-8-performance-baseline.json` artifact | 12 samples / 4 routes; collect TTFB, FCP, LCP, CLS, resources, bytes, long tasks; no budgets set yet |
| P8-PERF-02 | field/mobile/INP performance acceptance | NOT VERIFIED | Future representative-device and field evidence | CI lab data is not field CWV or INP |
| P8-PROD-01 | production commit parity | NOT VERIFIED | Future read-only verification | No deployment authority |
| P8-OWNER-01 | final owner go/no-go | OPEN | Owner decision | Release remains blocked |
