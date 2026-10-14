# Phase 7 — verification report

Date: 14 October 2026. Production was not redeployed during this pass.

## Verification

- `npm run build` completed successfully and generated the 86 static output paths reported by Next.js.
- `npm run lint` and `npm run typecheck` passed.
- Playwright: 14/14 tests passed, including enquiry states, atlas comparison, search/filter behavior, internal links, and automated WCAG A/AA checks across exported routes at 320px and 1440px.
- `scripts/check-althea-responsive.mjs`: 810/810 route and viewport checks passed across 81 exported routes at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px.
- Lighthouse was run with mobile simulated throttling on the live production homepage/routes before the work and on the local final static build afterward. The browser versions and cache/network conditions may differ, so treat this as a directional comparison rather than a controlled field-data experiment.
- The static-export build reports 87.6 KB shared first-load JavaScript and 104 KB on `/book-consultation` (under the 150 KB budget).

| Route | Performance before → after | Accessibility before → after | Best Practices before → after | SEO before → after | LCP before → after | CLS after | TBT after |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 85 → 96 | 100 → 100 | 100 → 100 | 69 → 100 | 3.80s → 2.78s | 0 | 8ms |
| `/destinations` | 93 → 97 | 98 → 100 | 100 → 100 | 69 → 100 | 3.17s → 2.50s | 0 | 14ms |
| `/study-in-france` | 94 → 96 | 98 → 100 | 100 → 100 | 69 → 100 | 3.01s → 2.68s | 0 | 86ms |
| `/book-consultation` | 94 → 97 | 100 → 100 | 100 → 100 | 69 → 100 | 3.11s → 2.62s | 0 | 7ms |

The measured LCP improved on each route but remains above the requested `<2.0s` target (2.50–2.78s in these runs). Other requested Lighthouse category thresholds, CLS, TBT, and first-load JavaScript budgets were met in these runs. Do not treat this as a verified mobile field LCP; real-device and production measurements remain outstanding.

## Remaining release work

- Browser form submission stays disabled until Firebase App Check is registered for the public domains and the owner confirms the privacy contact, retention policy, and contact/WhatsApp details. Firestore rules and server-side validation were exercised with an authenticated synthetic record; that verifies transport and rules, not a production browser booking. See `docs/ENQUIRY_RELEASE_STATUS.md`.
- The reviewed local dataset contains 245 French higher-education institutions from the Ministry's Licence Ouverte v2.0 registry; it is not a course catalogue. Campus France programme API/export permission has not been established. The curated examples and programme research pages are source-linked but do not amount to full catalogue ingestion. See `docs/OFFICIAL_DATA_PIPELINE.md`.
- `npm audit --omit=dev` reports seven production dependency advisories (six high, one critical) involving Next.js and Firebase dependency trees. Available npm fixes request major-version changes; the app remains on Next.js 14 static export. Review and plan a tested major upgrade before claiming a clean dependency audit.
- Visual screenshots in `audit/after-mobile.png` and `audit/after-desktop.png` document the final composition. Production visual QA, cross-browser/device QA, owner review, and a successful live Hosting deployment remain outstanding.

## Evidence files

- `audit/lighthouse/before-summary.json` and `audit/lighthouse/after-final-summary.json` contain the route-level scores and metrics above.
- Matching full Lighthouse JSON reports are retained beside those summaries.
- `audit/responsive-results.json`, `audit/accessibility.json`, and `audit/playwright-results.json` contain automated test results.
