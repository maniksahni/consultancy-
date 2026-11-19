# Project health audit — 24 October 2026

The audited production snapshot passed its build, static validation, functional tests and the final browser/accessibility checks below. Fixes are present in the workspace. The public site passed a separate six-page smoke check and the France finder flow.

## Results

| Check | Result |
| --- | --- |
| Production build | Passed; 795 content HTML exports, plus the 404 page |
| Current workspace TypeScript and ESLint | Passed |
| Export metadata, canonical URLs, sitemap and structured data | Passed across 795 content exports |
| Complete browser route sweep | 1,590 checks: 795 pages at 390px and 1440px |
| Initial route timeouts | Four; all passed fresh-session retries, with no unresolved route issue |
| Focused Chromium suite | 43 passed, no skipped or flaky tests |
| WebKit / Safari-engine smoke suite | 6 passed |
| Automated accessibility | 32 representative page/viewport combinations; findings fixed and rechecked, no remaining findings in those checks |
| Unique internal link targets | 810 checked; no missing targets |
| Local asset targets | 112 checked; no missing assets |
| Job data | 14,466 records checked; 14 have no local description and now have an explicit fallback |
| Detailed programme profiles | All 20 passed the existing programme-content validator |
| Course tuition resolver | Existing seven-country coverage validator passed |
| Public-site smoke check | Home, France directory, jobs, booking, knowledge and comparison returned 200, one H1 each, no mobile overflow or recorded page errors; Engineering + France preserved France |

The browser suite covers menu opening/Escape/focus return, homepage breakpoints and landscape, student story controls, destination discovery and persistence, comparison filters and URL persistence, all seven directory destinations, course/city/qualification/budget filtering, autocomplete, search validation, country preservation, expandable course evidence, knowledge filters/downloads, budget calculations, programme CSV export, package-prefilled consultation forms, validation and WhatsApp handoff, guide deep links, worksheet downloads, and local TXT/PDF/DOCX CV reading.

## Fixes

- Jobs with a null description-file reference no longer request `/desc/null.json`.
- An empty job description resolves to a clear original-posting fallback rather than an endless loading state. A role-specific CV score is withheld when there is no description to compare against.
- Mobile card groups without their own focusable content can receive keyboard focus and be scrolled. Automatically added focus stops are cleaned up appropriately.
- Animated homepage words retain readable contrast before they are highlighted.
- Guide editorial text has sufficient contrast in the audited dark layout.
- Autocomplete only exposes an active-descendant ID when an actual suggestion is highlighted.
- The local preview server serves PDF JavaScript modules with the correct MIME type, allowing the CV checker to be tested faithfully.
- Outdated tests were aligned with the current story carousel, footer, comparison rows and guide navigation. Row-layout measurements are taken in one frame to avoid false failures during smooth scrolling. Long legacy full-route tests have time budgets proportional to the project size.
- New regression tests exercise all seven country routes, missing and empty job descriptions, and local PDF/DOCX CV parsing using synthetic fixtures.

## Publication boundary

No deployment was made from this audit snapshot. A separate session changed the French university template, added school-fee data, and changed deployment configuration while this audit was running. Publishing the earlier snapshot would replace those later changes. Those edits were preserved. The latest workspace still passes TypeScript and lint, but the concurrent fee-content changes are outside this snapshot's complete browser validation.

The prepared export passed the page-preservation guard: all 793 URLs in the observed live sitemap remain present. This is a preservation check, not evidence that the local fixes have been published.

## Evidence and limits

Evidence is saved in `/Users/maniksahni/Desktop/consultancy-website/audit/full-project-20261024/`:

- `summary.json`: consolidated counts and publication status.
- `snapshot-manifest.json`: hashes identifying the audited source files.
- `route-results.json`: all route/viewport results, original timeouts and fresh-session retries.
- `final-functional-results.json` and `webkit-results.json`: functional test reports.
- `accessibility-final.json`: merged final automated accessibility results.
- `assets-data.json`: internal target checks and job-data coverage.
- `live-smoke.json`: separate public-site observations.

No real enquiry was sent and no real CV was used. Form tests intercept the WhatsApp handoff; CV fixtures remain on the test device. External employer sites were checked for well-formed links, not whether every role still accepts applications. Automated accessibility checks and engine simulations do not establish exhaustive WCAG conformance or coverage of every physical phone. This is a functional/technical audit; every fee, deadline and immigration rule was not independently re-researched.
