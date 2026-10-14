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
