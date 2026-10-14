# Get Althéa into Google Search

The production site is publicly crawlable: `robots.txt` allows crawling, the homepage returns HTTP 200, pages declare `index, follow`, and `https://altheaconsulting.in/sitemap.xml` lists the canonical page URLs. These signals make pages eligible for discovery; Google decides when and whether to index each URL.

## Verify and request indexing

1. Add the **Domain** property `altheaconsulting.in` in Google Search Console and verify the DNS TXT record with the domain provider. This covers both `www` and non-`www` hostnames.
2. Submit `https://altheaconsulting.in/sitemap.xml` in the Sitemaps report. Confirm its read status and discovered URL count.
3. Use URL Inspection for the homepage, `/study-in-france`, `/settle-in-france`, and `/career-support`. Check the indexed URL's selected canonical, then run **Test live URL**.
4. If live tests pass, request indexing for those priority pages. Check Page indexing for a reason if the request is rejected or the pages remain excluded. A request enters a queue and is not a guarantee of indexing.
5. Repeat for other important pages after their rendered content is final. Don't repeatedly submit the same unchanged URLs.

Optional HTML-tag verification is supported at build time with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Set its value to the token Google provides, then rebuild and deploy. DNS verification is preferable because it verifies the whole domain property without changing site code.

Google may take days or weeks to crawl and index a new or recently changed site. Monitor Search Console's Page indexing and Performance reports to distinguish discovery, crawl, indexing and ranking. A `site:` search is only a rough check; URL Inspection is the authoritative per-URL diagnostic.

## Search Console progress — 14 October 2026

- The domain property `altheaconsulting.in` is verified and the sitemap is submitted. Search Console reported **Success** and **67 discovered pages**. The live sitemap currently lists 67 canonical URLs; the local SEO validator separately checks 69 exported HTML pages, including pages intentionally omitted from the sitemap.
- URL Inspection shows the homepage and `/study-in-france` are on Google. The homepage and `/insights` have prior indexing-request confirmations; do not resubmit unchanged pages.
- `/settle-in-france`, `/career-support`, `/book-consultation` and `/france/institutions` passed **Test live URL** (“URL is available to Google” / “Page can be indexed”) and were added to the priority crawl queue on 14 October 2026.
- `/destinations` is not indexed. Its indexed report selected the unrelated `https://www.747live.bet/` as canonical, while the current live page and Google's live render both declare `https://altheaconsulting.in/destinations`. The live HTML contains no reference to the unrelated domain. A recrawl request was attempted but rejected because the daily quota was exceeded; it is **not queued**. Retry once the quota resets and check Google's selected canonical after recrawl. Search Console's Security issues and Manual actions reports both show **No issues detected**.
- A live `site:altheaconsulting.in` Google search showed the homepage result as `http://altheaconsulting.in/`; HTTP currently redirects to the canonical HTTPS URL. Treat this as a stale indexed result and recheck after Google recrawls the homepage.
- Search Console's overall Page indexing report is still processing data. Queue requests are not proof of indexing; recheck Page indexing after Google crawls the submitted URLs and do not repeatedly submit the same URLs.

## Brand mark and favicon refresh — 15 October 2026

- Restored the Althéa logo lockup in the global header and footer. Added a stable square 512×512 PNG favicon alongside the SVG and point the Organization structured-data `logo` to that square PNG.
- Verified the live homepage advertises both favicon formats and the header/footer logo assets. The PNG is publicly crawlable. Google Search Console confirms the homepage is indexed and accepted a fresh indexing request on 15 October 2026 after the logo/favicon update.
- Google can take several days or weeks to recrawl and refresh a favicon, and display is not guaranteed. Recheck the Google result after the next crawl; do not submit the homepage again unless it changes.
