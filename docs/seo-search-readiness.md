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
