# Organic search and AI discovery — 19 October 2026

## Starting point

The signed-in Search Console 28-day Web report shows 12 clicks, 54 impressions, 22.2% CTR and average position 6.5. Available chart dates are only 13–17 October. These numbers are too small and recent to establish a trend. The homepage has most of the clicks; /study-in-france has 5 impressions and no clicks. Query rows include “study in france for indian students” and “study abroad france”, both with one impression and no clicks. These are observations, not keyword-volume estimates.

The property also exposes a **Generative AI features (Beta)** report: 1 homepage impression in the selected 28-day period. This supersedes earlier notes saying no separate AI report was available. No AI clicks, citations, referred visits or leads are inferred from that impression. Keep Google impressions separate from Bing citation counts and self-reported enquiry sources.

Machine-readable observed baseline: `audit/search-growth/baseline-2026-10-19.json`. No external settings, ads, messages, backlink purchases or account creation were performed.

## Implemented in this pass

- Guide chapters expose an on-page topic index, direct answer anchors and an official-source anchor. Links into collapsed in-depth topics open the relevant answer. All links and answer text exist in exported HTML before hydration.
- Guides show the publisher, adviser, source-review date and editorial standards. Review dates are preserved; a source review is explicitly separate from a rule's effective date. Official editorial citations no longer carry blanket nofollow.
- The existing source/credits page explains publishing responsibility, source dates, estimates, limitations and how to report a correction. It is linked from the footer and guides.
- The study-in-France pillar includes an original programme-comparison worksheet and a downloadable blank copy. It takes visitors from an actual decision to admissions, cost, application and consultation pages.
- The knowledge hub exposes country guide, admissions, cost and visa links in static HTML. The university finder links to individual French institution profiles and application/cost guidance.
- Institution templates qualify application routes, national fee benchmarks, Mon Master eligibility and CVEC applicability. Public status no longer implies every programme charges the same national fee. Official application and fee evidence is linked visibly.
- The consultation form offers an optional, explicit source answer (Google, Bing/other search, AI answer, social or referral). It is included in the message visitors review in WhatsApp. No hidden referral capture, analytics cookies, form storage or automatic message sending is added.
- Static SEO validation checks guide topic anchors and visible editorial context. Browser tests cover no-JavaScript navigation, deep-link opening, mobile overflow, worksheet availability and optional referral validation.

## Priority intents and existing pages

| Visitor intent | Primary page | Supporting content | Useful action |
| --- | --- | --- | --- |
| Study in France for Indian students | /study-in-france | /france/admissions, /france/education-system | Complete a shortlist worksheet |
| France course or university selection | /france/universities | Individual institution pages; /universities; /programmes | Compare exact programmes, not school names |
| Cost of studying in France | /france/costs | /knowledge budget planner; /from-india/education-loans | Prepare a sourced personal budget |
| Campus France application process | /campus-france-guide | /france/admissions; /from-india/documents-attestation | Resolve the correct route and deadline |
| Student arrival and housing | /settle-in-france | /france/living; /first-30-days-france | Request scoped arrival guidance |
| Career support in France | /career-support | /jobs; /france/jobs; /france/after-graduation | Request a role-specific coaching conversation |

Use these pages as the main destinations. Expand the strongest existing answer rather than creating a new page for every keyword variation. Do not promise admissions, jobs, visa outcomes, ranking positions or AI citations.

## Next 30 days: evidence and actual enquiries

1. Review Search Console weekly using the same 28-day Web filter. Separate brand queries from non-brand study, costs, applications, housing and career intents. Record query/page pairs, device and country when enough data exists; preserve privacy-suppressed query limitations.
2. Compare a complete 28-day post-release period against the preceding equivalent period once available. Record deployment dates and other campaigns so changes are not casually attributed to SEO. Avoid interpreting five days as a full baseline.
3. Maintain an enquiry ledger outside the website: enquiry date, volunteered source, service, qualified/not qualified, consultation confirmed and paid-client outcome if applicable. Avoid copying unnecessary personal data. Opening WhatsApp is a handoff, not a submitted lead or confirmed appointment.
4. Check indexing for the priority canonical URLs and the latest sitemap read/discovered count. Request indexing only for materially changed priority pages when justified. Do not repeatedly submit unchanged URLs.
5. Recheck programme-specific fees, intake calendars and visa guidance with the primary publisher before targeting time-sensitive claims. Fix source accuracy before optimizing a snippet.

## Days 31–60: original adviser evidence

These require real business inputs and have **not** been fabricated or published:

- One consented, anonymised programme comparison with real decision criteria, alternatives and trade-offs.
- One actual student budget broken down by city, fee category, academic year and source documents.
- An adviser-written account of common application mistakes and how to resolve them, based on real consultations.
- One first-month arrival walkthrough using original, authorised photographs or video and a clearly stated date.

Publish only with evidence and appropriate permission. Keep the adviser’s real professional profiles consistent with the business name and canonical domain. Evaluate Google Business Profile eligibility against the actual customer-contact model before creating or changing a listing. External outreach, profile changes, paid placements and messaging require separate explicit instructions.

## Days 61–90: improve the paths showing demand

- Improve titles/descriptions for pages with sustained relevant impressions and weak CTR, checking query intent and current competitors first. Do not keep rewriting metadata based on single impressions.
- Add practical detail to answers attracting impressions but failing to produce useful enquiries. Consolidate overlapping pages only when actual overlap and search data justify it; preserve redirects and internal links.
- Inspect mobile page experience with real data when available; currently Search Console has no Core Web Vitals sample. Lab checks do not establish a field CWV pass.
- Use the Google AI report visible for this property and Bing AI Performance if connected. Track page visibility independently from visits, volunteered discovery sources and business outcomes.

## Success measures

Relevant non-brand impressions and clicks; indexed priority pages; qualified study/arrival/career enquiries; confirmed consultations; and paid-client outcomes. Keep branded discovery, AI visibility, search clicks and actual enquiries as separate measures. No traffic target or ranking guarantee is asserted without a stable baseline.

## Official references checked

- Google generative AI search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing AI Performance definitions: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Campus France admissions platforms: https://www.campusfrance.org/fr/candidature-enseignement-superieur-france
- Campus France India procedure: https://www.inde.campusfrance.org/application-and-admission-procedure (direct retrieval returned 403; the official indexed result was available).

Google's current guidance prioritizes useful original content, clear site structure and ordinary technical SEO. It explicitly says special AI text files and markup are not required for Google visibility. The existing llms files are retained as alternate representations; this pass does not claim they improve Google rankings.

## Validation record

The release export contains 401 canonical audited pages (402 HTML files including 404). Topic navigation is present on 143 guide exports, including the two existing canonical aliases. The institution template improvements cover 192 French institution pages. The focused browser suite has nine cases covering the finder, consultation handoff, static guide links, mobile deep links and worksheet/referral behavior.

Live verification additionally exposed a mobile initialization race: the global phone layout could collapse a hash-linked guide answer after its guide component opened it. The phone layout now preserves the directly linked section, and the regression test waits for the phone layout to initialize before asserting the target remains open. This is a usability fix discovered through live verification, not a claimed ranking gain.

Final release: Firebase Hosting reported release complete. The final nine-test run passed, followed by live HTTP/content checks on seven URLs, a mobile direct-answer link check after phone initialization, and verification that the referral field defaults to unanswered. Evidence: `audit/search-growth/test-results.json`, `audit/search-growth/live-verification.json`, and `audit/search-growth/live-guide-mobile.png`. No ranking or traffic uplift has been measured yet.
