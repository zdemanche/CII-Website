---
id: "US-012"
title: "Cut over forgemetal.com with legacy redirects and rollback"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "IT (Zach) cutting over DNS"
implements_fr: ["FR-010", "FR-011", "FR-012"]
implements_nfr: ["NFR-004", "NFR-007", "NFR-003"]
test_files: ["test/redirects.test.mjs", "test/seo.test.mjs", "test/demo.test.mjs"]
epic: "Delivery"
---

# US-012: Cut over forgemetal.com with legacy redirects and rollback

## Story
As **IT (Zach)**, I want **every legacy URL redirected from one data list and a reversible DNS cutover**, so that **existing links and search rankings survive and I can roll back quickly if something fails**.

## Acceptance Criteria
- [ ] AC-1: `src/data/redirects.ts` maps all 23 legacy `.php` and PDF URLs to a new page; legacy PDFs redirect to the Quality documents section or Contact directions.
- [ ] AC-2: The demo build generates a meta-refresh stub page for each legacy URL from that list, so no entry is missing.
- [ ] AC-3: A production redirect configuration (301s) is generated from the same data for the host to apply at cutover.
- [ ] AC-4: A production build (`SITE_URL=https://www.forgemetal.com`, `BASE_PATH=/`, no `DEMO`) is indexable, has canonical URLs, a sitemap, and HTTPS and security headers configured at the host.
- [ ] AC-5: The cutover plan uses a lowered DNS TTL and keeps the old host for 30 days for rollback.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/redirects.test.mjs | All 23 legacy URLs present with valid targets (planned) |
| AC-2 | test/redirects.test.mjs | One stub per legacy URL in dist (planned) |
| AC-3 | test/redirects.test.mjs | 301 config output matches data (planned) |
| AC-4 | test/seo.test.mjs | Canonical, sitemap, no noindex in production build (planned) |
| AC-5 | (manual) | Cutover runbook review; not automated |
