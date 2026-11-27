# Phase 8 — Release Evidence Register

Keep this ledger current as Phase 8 progresses. Each PASS must link to exact commit/run/artifact or owner evidence.

| ID | Gate | Status | Evidence | Notes |
|---|---|---|---|---|
| P8-BASE-01 | #17–#24 merged sequentially | PASS | PR #17–#24 GitHub states | All closed/merged |
| P8-BASE-02 | main exact head | PASS | `675eaed00b8e06163c8df8b06474fd32cf2554f7` | PR #24 merge commit |
| P8-BASE-03 | exact-main quality job | PASS | Actions run 46054077202 | Typecheck, integrity gates, lint, build |
| P8-BASE-04 | exact-main browser QA | PENDING | Actions run 46054077202 | Runtime job was in progress when Phase 8 started |
| P8-ROOT-01 | 200% root-text clipping and page overflow across public routes | OPEN / P1 | Historical exact-head evidence + PR #26 route diagnostics | Historical 390px widths: home 429px, work 390px (heading clipping), case study 469px, CV 442px; reproduce across 390/360/320px |
| P8-ZOOM-01 | literal browser 200% zoom | MANUAL / NOT RUN | Owner runbook | Effective viewport test is not literal zoom |
| P8-OS-01 | native OS text scaling | MANUAL / NOT RUN | Owner runbook | Record actual platform/settings |
| P8-PRINT-01 | native print / Save as PDF | MANUAL / NOT RUN | Owner runbook | Headless Chromium PDF is only regression evidence |
| P8-PERF-01 | performance baseline | PENDING | To be added | Do not invent scores or budgets |
| P8-LINK-01 | internal/external route/link integrity | PENDING | To be added | Preserve approved publication boundary |
| P8-PROD-01 | production commit parity | NOT VERIFIED | To be added | Read-only check only; no deploy |
| P8-OWNER-01 | final owner go/no-go | OPEN | Owner decision | Release remains blocked |
