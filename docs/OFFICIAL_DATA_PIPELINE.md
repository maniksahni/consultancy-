# Official institution pipeline

The Ministry's `fr-esr-principaux-etablissements-enseignement-superieur` API explicitly supplies Licence Ouverte v2.0 (Etalab) metadata and its licence URL. The source and licence are stored in each snapshot. This is an institution registry, **not a course catalogue or admissions feed**.

`node scripts/import-institutions.mjs` performs a bounded server-side API import, paced 600ms between pages, with timeouts and three attempts using exponential backoff. It validates the source licence, response shape and complete record count, and deduplicates identifiers. The output is staging only.

After reviewing the fields and provenance, run `node scripts/import-institutions.mjs --publish --reviewer 'NAME'`. Publication requires a named review and schema validation. The client loads this reviewed local snapshot; no full-site scraping occurs in browsers.

A weekly GitHub workflow stages candidates as a review artifact. It has read-only repository permissions and cannot publish or deploy. Snapshot source/review timestamps are visible. Academic fields absent from the registry remain null and display as `Not yet verified`.

Campus France catalogue API/export permission has not been established here. Full programme ingestion, robust per-institution cross-source conflict moderation and automatic link/staleness monitoring remain acceptance TODOs; curated programme evidence is maintained separately. Do not describe the registry as full catalogue completion.
