# Runbook: Search Console and Bing Webmaster Tools around cutover

Supports NFR-004 (SEO) and US-012 ("search rankings survive"). Run step 1 before `dns-cutover.md` step 0 sign-off and step 2 right after cutover step 5.

## 1. Before cutover: verify and capture the baseline
1. **Verify a Domain property** for `forgemetal.com` in Google Search Console. A Domain property covers http/https, apex and www.
   - Add the `google-site-verification=...` **DNS TXT** record at the apex. Leave it there permanently.
   - If a URL-prefix property already exists, keep it. Its history is useful.
2. In **Bing Webmaster Tools**, add the site. Import from Google Search Console, or verify with the Bing TXT/CNAME record.
3. Decide whether consolindustries.com needs a property. That depends on whether it serves web pages (ADR-0002 "Needed from CII IT").
4. **Export the baseline**, last 16 months (GSC) or the maximum available (Bing). Save the exports to the project's shared drive, not to this repo.
   - GSC > Performance > Search results: export **Pages**, **Queries**, **Countries** and **Devices** with clicks, impressions, CTR and position.
   - GSC > Indexing > Pages: export indexed and not-indexed counts and the reasons.
   - GSC > Links: export the top linked pages and top linking sites. External links to legacy `.php` and `.pdf` URLs must all be in `src/data/redirects.ts`.
   - Bing > Search Performance: export pages and keywords.
5. Cross-check: every legacy URL with clicks or links in the export is in `src/data/redirects.ts`. Add any that are missing and redeploy before cutover.
6. Record baseline totals (28-day clicks, impressions, indexed pages) in the launch checklist.

## 2. After cutover (same day)
1. GSC > Sitemaps: submit `https://www.forgemetal.com/sitemap-index.xml`. Remove any old sitemap such as `/sitemap.php`, which is now a 301.
2. Bing > Sitemaps: submit the same URL.
3. GSC > URL Inspection on `/`, `/capabilities/`, `/quality/` and `/contact/`, then "Request indexing". Do this for a handful only; don't run it on every page.
4. Use URL Inspection on two or three legacy URLs, such as `/forging-capabilities.php`. The result should say "Page with redirect" pointing to the new URL.
5. **Change of Address tool:** use it **only if the domain changes**, for example if the site moves to consolindustries.com. The cutover keeps `www.forgemetal.com`, so **do not use it**. Moving between apex and www, or from http to https, is not a change of address.

## 3. Monitor for 30 days
Watch for these:
- **Indexing > Pages:** "Not found (404)", "Redirect error", "Page with redirect" (expected for legacy URLs) and "Excluded by noindex" (should be zero; if not, DEMO leaked into production).
- **Performance:** clicks and impressions against the baseline. A dip of up to about 20% in weeks 1–2 is normal. A sustained drop of more than 30% at week 3 needs investigation.
- **Bing:** Site Explorer and Crawl errors.
- **Security & Manual actions:** these should stay empty.

### Weekly checklist (weeks 1–4; record in the launch checklist)
- [ ] GSC Pages report: any new 404s? For legacy URLs, add them to `src/data/redirects.ts`, rebuild and redeploy. For new-site URLs, fix the link.
- [ ] GSC Sitemaps: status is "Success" and discovered count is about 20 pages, matching `dist/sitemap-0.xml`.
- [ ] GSC Performance: last 7 days against the same period in the baseline (clicks, impressions, top 10 queries). Note any query that lost position.
- [ ] Spot-check 3 top baseline pages with URL Inspection. The new URL should be indexed and the legacy URL should show as redirected.
- [ ] Bing: crawl errors are zero or explained, and the sitemap was processed.
- [ ] Re-run the 301 loop from `dns-cutover.md` step 5. Expect 23 OK.
- [ ] `curl -s https://www.forgemetal.com/robots.txt` shows `Allow: /` and the Sitemap line.

## 4. Close-out (day 30)
- Record final against baseline numbers. If there was no rollback, approve old-host decommission (`dns-cutover.md` step 6).
- Keep the DNS TXT verification records. Leave the 301s in place indefinitely, since external links to `.php` URLs will keep arriving.
