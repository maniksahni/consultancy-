# Data sources and review policy

Checked 14 October 2026. This is an independent directory, with no Campus France or university affiliation.

## Campus France India: checked, excluded from import

- https://www.inde.campusfrance.org/robots.txt returned HTTP 200. Its `User-agent: *` rules exclude administrative, account, search, core/profile and oEmbed routes. Public article routes are not generally excluded. Robots permission alone is not a reuse licence.
- Checked the India homepage and searched its legal/terms links. A specific India catalogue reuse licence or official feed/export was not established. The homepage failed through the research browser; robots was successfully retrieved directly. This uncertainty must not be treated as permission.
- Central terms: https://www.campusfrance.org/en/terms-of-use. Search indexed the terms, but direct reading returned 403. Do not substitute terms for a different Campus France subsite or bypass access controls.
- No Campus France scraping, catalogue API, copying of logos or feed ingestion is enabled. Link to official guidance only. Seek explicit permission before adding an integration.

## Permitted government open data

- Dataset: https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-cartographie_formations_parcoursup/information/
- Export and licence: https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-cartographie_formations_parcoursup/export/ (Licence Ouverte v2.0 / Etalab).
- Official API: https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-cartographie_formations_parcoursup/records
- API endpoint successfully returned JSON during research. Scope: Parcoursup formation mapping, not a complete French university, international-admissions or Master's catalogue. Source year is preserved; it is not a last-verified date.
- Initial batch is capped at 100 records ordered by source year. This is deliberately a bounded pilot, not a claim of full coverage.

## University pages

`scripts/data/sources.json` has an empty university page allowlist. Before adding an exact HTTPS URL, a maintainer must record its domain, permission URL, permission review date, robots review date and `allowed: true`. Redirects are refused. Fetched pages remain raw evidence in staging; a human extracts factual fields and creates candidate records. Do not infer that public accessibility permits bulk reuse. Campus France domains remain excluded.

## Release procedure

1. `npm run data:import`: rate-limited fetches, four attempts, timeouts, one-day cache, provenance, source-year preservation, ID deduplication. No browser-side ingestion.
2. `npm run data:validate`: validates required fields, URLs and EUR cost types, then creates pending review candidates and content hashes.
3. A human reviews official pages, corrects each field, leaves unknown values null, sets `lastVerified`, and records `review.status = "approved"`, a real reviewer identity and ISO `reviewedAt`. After editing content, recompute its hash with `hash()` in `scripts/data/common.mjs`.
4. `npm run data:publish` refuses missing approvals or changed hashes. It atomically replaces the JSON snapshot locally; release it via a protected, human-reviewed pull request. Do not grant scheduled CI write permissions or call publish from CI. Branch protection / CODEOWNERS must be configured by the repository administrator; a hash records approval content but does not authenticate a person.
5. Public finders import only `src/data/published-directory.json`. Null fields display “Not yet verified”. EUR filtering excludes unknown tuition. Every record exposes source URL and verification date, plus official site, programme and application links where verified.

The scheduled GitHub Action runs weekly on Monday at 06:00 UTC and uploads candidates for review. It never commits or publishes. The initial public snapshot intentionally contains no records: prior editorial data has not received recorded human approval. Previous source files are retained for migration, not used by the new finders.

The importer also stages a bounded 100-record batch from the official institution registry: https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-principaux-etablissements-enseignement-superieur/ . University directory records receive the same review requirements and missing-field labels as programme records.
