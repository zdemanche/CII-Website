---
id: "NFR-004"
title: "Search engine optimization and ranking preservation"
type: "nonfunctional"
category: "quality"
focus_track: "quality"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["astro.config.mjs", "CLAUDE.md", "docs/source/legacy-site-audit.md", "src/data/redirects.ts", "src/layouts/Base.astro"]
test_files: ["test/seo.test.mjs"]
verification_method: "test"
---

# NFR-004: Search engine optimization and ranking preservation

## Description
The production site must be discoverable for aerospace/defense forging searches and must not lose the ranking of the 23 legacy URLs. Demo builds must stay out of search indexes (see FR-011). Mapped to ISO/IEC 25010 quality in use / compatibility (interoperability with crawlers).

## Measurable criteria
- Every page has a unique non-empty `<title>` (<= 60 chars) and unique `meta name="description"` (70-160 chars); no duplicates across `dist/`.
- Every page has a `<link rel="canonical">` built from `site` + `base` (`SITE_URL`/`BASE_PATH`), absolute URL.
- `@astrojs/sitemap` emits `sitemap-index.xml`; production `robots.txt` references it; demo `robots.txt` disallows all (define-findings #7).
- Home page carries valid `Organization` (or `LocalBusiness`) JSON-LD with the audited name, address (677 Mixville Rd., Cheshire, CT 06410), phone and foundingDate 1948; no invented fields.
- All 23 legacy URLs in the audit resolve via `src/data/redirects.ts` (301 at the production host, meta-refresh stub in demo) to the most relevant new page; no redirect chains longer than one hop and no redirect to the home page by default.
- Internal links are crawlable `<a href>` elements; no `href="#"`; custom 404 returns a useful page.

## Verification
- Post-build tests in `test/seo.test.mjs`: title/description uniqueness and length, canonical present, JSON-LD parses and matches data, sitemap file exists, one stub per legacy URL (demo) with `rel=canonical` to its target.
- CI step (FR-012): build with `SITE_URL`/`BASE_PATH`/`DEMO` set, then `npm test`.
- Manual at cutover: verify 301 status for all 23 legacy URLs with `curl -I`; submit sitemap in Search Console; Rich Results test on JSON-LD; compare indexed-URL count 2 and 4 weeks after launch.

## Notes
Legacy site's ranking baseline (Search Console data) is not in the audit; capture before cutover.
