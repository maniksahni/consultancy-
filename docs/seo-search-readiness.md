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
