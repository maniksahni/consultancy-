# Search readiness

Every content route has a title, description, absolute canonical URL, Open Graph and Twitter metadata. `/france` and `/france/campus-france` intentionally canonicalize to their existing guide pages. The sitemap includes the canonical France resource and topic pages.

Production builds (`npm run build`) allow indexing. Local development is blocked unless a site URL is configured. Set `SITE_INDEXABLE=false` for a private preview build, including previews that already have a site URL. Canonical URLs always use `brand.canonicalUrl`; update the brand config if the production domain changes. Deploy private previews separately from the production export.

Organization, adviser and website entities share stable JSON-LD identifiers. FAQ markup uses exactly the questions and answers rendered by the existing accordion. Articles link their official source through `citation`, retain the existing editorial date, and identify their publisher. Do not update review dates unless the source has actually been checked. Avoid adding fabricated reviews, qualifications, contact information or admission guarantees.

## After publishing

1. Verify the production domain in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml`.
2. Inspect the homepage, a programme, a guide and an article in Search Console. Check Google's Rich Results Test and Schema.org validator.
3. Check canonical host redirects and HTTPS on alternate domains through the domain hosting settings.
4. Track search impressions, clicks, consultation enquiries and relevant AI citations over time. Structured data and crawlability do not guarantee rankings or AI recommendations.
5. Keep programme deadlines, tuition, official citations and source review dates current. Expand answers using real consultation questions and first-hand adviser expertise.

Reference: https://developers.google.com/search/docs/appearance/ai-features

## SEO / AEO / GEO implementation — 15 October 2026

The homepage now explains the business, adviser, location and three service areas in visible text, and offers short answers linking to the cost guide, application procedure and arrival checklist. Interior pages share canonical-linked WebPage and BreadcrumbList entities. The two FAQ pages generate Question/Answer markup from the same data visitors read. This describes the content; it does not imply eligibility for Google's restricted FAQ rich results.

Programme fee, calendar and requirements evidence now links directly to the cited university pages. Editorial articles expose their official citation as a visible link. Existing source-review dates are preserved. Social metadata titles include the brand, and Google preview controls allow full text snippets and large image previews.

Run `npm run build && npm run check:seo` before publishing. The exported-page audit checks titles, descriptions, single primary headings, indexability, canonical sitemap coverage, JSON parsing, canonical-linked page identities, breadcrumbs, duplicate metadata and broken local navigation. It validates static HTML before JavaScript runs. It does not certify Google rich-result eligibility or external source accuracy.

### Measurement and ongoing priorities

Use Search Console exports to record a 28-day baseline, then compare the next 28 days after deployment. Segment branded queries from non-branded study, settling and career queries. Track impressions, clicks, click-through rate and consultation enquiries; record landing page and enquiry quality rather than treating rank alone as success. Search Console AI-feature traffic is included in overall Web search reporting rather than a separate AI-only report.

Use Bing Webmaster Tools AI Performance, where available, for citation counts, cited pages and grounding queries. Keep these separate from referral visits and actual enquiries. An AI citation is not evidence of a visit or conversion. Google indexing, citations and rankings remain at the search provider's discretion.

Prioritise original adviser contributions: an attributed programme-shortlisting example, a real anonymised budget breakdown, a first-month arrival walkthrough and CV guidance drawn from actual coaching experience. Obtain permission for student stories, retain evidence for outcome claims, and add publication/review dates only when the underlying work occurred. Avoid producing near-identical city pages or generic articles just to cover more keywords.

Review official fees, deadlines and procedural claims before each intake. Use the existing page that best answers a query before adding another page with overlapping intent. Expand France service pages around questions from real consultations and link each new answer to the relevant next step.

Current primary guidance:
- Google: https://developers.google.com/search/docs/appearance/ai-features
- Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c

## Branded search investigation — 16 October 2026

The supplied Google screenshots show this domain already indexed, a generic favicon, and an AI Overview describing Althéa Groupe. That overview is about a different entity; it is not evidence this site's own structured data contains the Groupe's address or headcount.

Live checks found crawlable homepage metadata, the advertised 512×512 PNG returning HTTP 200 with image/png, permissive robots.txt, and a 301 from www to the canonical hostname. Keep the existing favicon URLs stable rather than rotating them to force a refresh. Google does not guarantee favicon display, and processing can take days to weeks.

The homepage now leads its search title with the full brand, names its founder and Paris location in the description, and renders an explicit business definition in visible HTML. Organization and WebSite share full-brand spelling alternatives; Organization links the about page and the three real service pages through an OfferCatalog. The audit checks visible identity, service links and favicon asset existence. No unverified social profiles, company identifiers, affiliations or reviews were added.

After deployment, request homepage recrawling in Search Console URL Inspection and inspect the Google-selected canonical and last crawl date. Submit the existing sitemap if not already submitted. Compare branded queries such as “Althéa Consulting Harshita Kohli” and “Althea Consulting study in France” with the ambiguous short query. Keep real external profiles consistent with the full brand, domain and founder; add sameAs only after the actual profiles are verified. AI Overview inclusion cannot be forced through markup or a special AI file.

Primary references:
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/ai-features

### Search Console follow-up, 16 October evening

Opened the signed-in Safari Search Console domain property. Homepage URL Inspection reports “URL is on Google”, successful Googlebot smartphone fetch, crawling/indexing allowed, and Google-selected canonical equal to the inspected homepage. Last crawl shown: 15 Oct 2026, 17:15:52 (as displayed by Search Console), before the latest changes. The URL-level report says no referring sitemaps detected; inspect the actual Sitemaps report separately before treating that as a submission failure. Started Request indexing; do not treat a running live test as successful submission. A daily 10:00 local-time thread follow-up is configured to check actual search appearance and remain quiet on unchanged state.

Sitemaps report verified directly: https://altheaconsulting.in/sitemap.xml, submitted 14 Oct, last read 16 Oct, Success, 68 discovered pages. Thus the URL Inspection “no referring sitemaps” field is not a sitemap submission error. Homepage indexing request progressed from live testing to “Submitting request”.

Confirmed final Search Console dialog: “Indexing requested”; “URL was added to a priority crawl queue.” Request accepted, not merely attempted. Google explicitly states repeated submissions do not change queue position or priority. Actual favicon/AI Overview resolution remains unverified and is the follow-up's success condition.

## Follow-up — 19 October 2026 (IST)

Live homepage, /favicon.ico, /brand/favicon-20261015.png, robots.txt and sitemap.xml all returned HTTP 200 with appropriate content types. Homepage is index, follow; current title is “Study in France Consultant for Indians | Althéa Consulting”. The site has changed since the earlier deployment; favicon bytes also changed at the existing stable paths. No changes to assets or indexing submissions were made in this monitoring run.

Meaningful search appearance improvement observed directly in Safari Google results for “Althéa Consulting”: both homepage and about result now display the branded blue/red/white leaf favicon rather than the globe. Homepage remains the first ordinary result in this personalized session. Its snippet now explicitly identifies altheaconsulting.in as Harshita Kohli's independent study abroad, settling and career advisory in Paris. Screenshot was emitted in this chat. This is an observed improvement, not a guarantee across all users/locations.

The same query's AI Overview still prioritizes Althéa Groupe and other advisory firms; full resolution is NOT established. An already-open result for the longer homepage-title query also showed an incorrect corporate-firm interpretation, but that was not a fresh check of the required France-qualified query. A fresh France-qualified query and Search Console crawl date could not be reliably inspected in this run because native Safari navigation did not consistently follow the requested destinations. Do not infer new crawl dates or submit indexing requests from these observations. Keep the follow-up active for the unresolved AI entity issue.

### Follow-up — 19 October 2026, 10:03 IST

Live homepage, ICO, stable PNG favicon, robots.txt and sitemap all return 200 with appropriate content types. Homepage remains index, follow, its title is unchanged from the preceding check, and embedded JSON-LD parses successfully. No technical regression requiring a change was found.

Fresh signed-out in-app Google query “Althea Consulting study in France” returned an AI Overview generation-unavailable message (“Can't generate an AI overview right now”). This is not evidence of entity resolution or a site fault. The visible first-page ordinary results in that session did not contain this domain, unlike the preceding personalized Safari brand query; do not compare them as a like-for-like ranking measurement. Navigation to the exact accented brand query timed out, so current favicon appearance and unqualified AI identity were not reverified in this run. Search Console crawl status was not obtained. Previous observed branded-favicon improvement stands as historical evidence only. No indexing requests, asset rotation, or content changes were made. Follow-up remains active; no new confirmed resolution.

## Search and AI discovery work — 19 October 2026

Read the signed-in property's 28-day Web report: 12 clicks, 54 impressions, 22.2% CTR, average position 6.5; chart dates available were only 13–17 October. This is a small baseline, not evidence of growth. A separate **Generative AI features (Beta)** report is now visible for this property and shows 1 homepage impression. This supersedes the earlier report-availability note above. Do not infer AI referrals, clicks or leads from it.

Implementation and the 90-day measurement/content plan are documented in `docs/organic-growth-plan.md`; observed values are in `audit/search-growth/baseline-2026-10-19.json`. Changes improve guide topic navigation, visible editorial context, primary-source links, static country-guide discovery, institution-template qualifications and a practical shortlist worksheet. An optional self-reported discovery source is included in the existing WhatsApp message; it adds no form storage or hidden tracking. Real student cases, original adviser contributions and external profile/outreach work remain dependent on genuine business inputs and specific authorization.

### Follow-up — 21 October 2026, 17:19 IST

Live checks: homepage, /favicon.ico, /brand/favicon-20261015.png, robots.txt and sitemap.xml all return 200 with correct content types. Homepage remains index, follow; title remains “Study in France Consultant for Indians | Althéa Consulting”; three JSON-LD blocks parse. Favicon file sizes match the preceding run. No technical regression or fix was warranted.

Fresh in-app Google results inspected for both requested queries. “Althéa Consulting” AI Overview still prioritizes the European corporate consulting company and other namesakes. “Althea Consulting study in France” places this website first in ordinary results with the correct Harshita Kohli/Paris/student guidance snippet, but its AI Overview still describes the corporate company and inaccurately excludes student advisory. Therefore AI entity resolution remains unresolved. This personalized browser result is not a universal rank measurement. No fresh visual favicon claim was made; the preceding screenshot remains historical evidence.

Signed-in Search Console URL Inspection now reports homepage “URL is on Google”, last crawl “19 Oct 2026, 01:23:42” (as displayed), Googlebot smartphone, successful fetch, crawling/indexing allowed, and Google-selected canonical equal to inspected homepage. Thus Google has recrawled since the original 15 October record; recrawling alone has not resolved AI ambiguity. No repeat indexing request was submitted. Monitoring continues quietly because the unresolved AI state is unchanged and no user action is required.

### Follow-up — 22 October 2026, 10:10 IST

Live homepage, /favicon.ico, stable /brand/favicon-20261015.png, robots.txt and sitemap all return HTTP 200 with correct content types. Homepage title is unchanged, index/follow remains enabled, and all three JSON-LD blocks parse. Icon byte sizes are unchanged from the preceding check. No concrete technical regression found; no site edits or repeat indexing requests made.

Fresh Google browser queries: the accented brand query places the correct homepage first in ordinary results with Harshita Kohli/Paris identity, but its AI Overview still prioritizes the Alan Allman corporate consulting entity and other namesakes. The France-qualified query also places the correct site first in ordinary results, but its AI Overview now discusses Alzea India and generic student services, not this advisory. This is answer variability, not verified resolution or a reason to churn metadata. No fresh screenshot-based favicon verification was performed; the earlier confirmed branded-icon observation is historical. No existing Search Console tab was present in the in-app inventory, so the latest confirmed crawl remains the 19 October record checked on 21 October. Monitoring remains active; no user action required.

### Follow-up — 23 October 2026, 14:53 IST

Live homepage, ICO, stable PNG, robots.txt and sitemap all return 200 with correct content types. Homepage metadata remains index/follow, same title, three parseable JSON-LD blocks. Icon byte sizes unchanged. No technical regression found; no code, asset URLs or indexing submissions changed.

Fresh in-app Google queries still show incorrect AI entity identification: the accented brand query prioritizes Alan Allman's corporate consultancy; the France-qualified query explicitly describes that business rather than the student advisory. Correct Harshita Kohli/Paris guidance remains visible in the ordinary search snippet for the latter. This remains unresolved; no fresh screenshot-based favicon claim was made.

Signed-in Search Console homepage inspection: URL is on Google / indexed; last crawl “23 Oct 2026, 05:40:28” as displayed; Googlebot smartphone; fetch successful; crawl and index allowed; Google-selected canonical is inspected homepage. Recrawling is occurring normally, so another indexing request is not justified. Monitoring remains active without a notification because the relevant AI outcome is unchanged and no user action is required.

### Follow-up — 24 October 2026, 10:04 IST

Meaningful partial improvement observed: fresh Google query “Althea Consulting study in France” now produces an AI Overview explicitly naming Althéa Consulting and linking to this domain's /france/resources page, describing study-abroad guidance, resources and application support for France. Screenshot emitted in chat shows that answer and the branded leaf favicon on the homepage ordinary result. This is a single personalized observation, not universal or permanent resolution. The short accented query still describes Althéa Groupe/Alan Allman's management consultancy, so monitoring must remain active.

ICO, stable PNG, robots.txt and sitemap return 200 with appropriate types and unchanged byte sizes. Initial homepage read timed out, so a separate homepage retry was initiated; this isolated timeout is not sufficient evidence of a persistent outage. Search Console confirms homepage indexed, successful Googlebot smartphone fetch, crawl/index allowed, selected canonical matches homepage, last crawl “23 Oct 2026, 17:44:19” as displayed. No repeat indexing request or site mutation performed.
