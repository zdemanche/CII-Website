---
id: "FR-009"
title: "Legal pages and HTML sitemap"
type: "functional"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/privacy.astro", "src/pages/terms.astro", "src/pages/export-control.astro", "src/pages/sitemap.astro", "src/data/legal.ts"]
test_files: ["test/legal.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-003", "NFR-005"]
---

# FR-009: Legal pages and HTML sitemap

## Description
Privacy policy, terms of use, export-control notice and an HTML sitemap page. The legacy site had no privacy policy.

## Requirements

### FR-009.1: Privacy policy
The site SHALL publish a privacy policy covering RFQ data (what is collected, purpose, retention, contact) and stating that no trackers run in the demo. Text is a labelled draft flagged CONFIRM for CII/legal approval.

**Acceptance Criteria:**
- AC-1: Given the page, then it names the RFQ fields collected and carries `confirm: true`.
- AC-2: Given the footer, then it links to the page.

### FR-009.2: Terms of use
The site SHALL publish site terms as a labelled draft flagged CONFIRM. Standard Terms & Conditions for purchasing are a separate document (FR-005.4).

**Acceptance Criteria:**
- AC-1: Given the page, then it renders with `confirm: true` and a link to the Quality documents section.

### FR-009.3: Export-control notice
The site SHALL publish a notice that technical data must not be submitted via the website and that export-controlled/CUI material goes through the secure transfer channel (FR-008.4). Wording is a draft flagged CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the page, then the notice text and `confirm: true` are present.

### FR-009.4: HTML sitemap page
The site SHALL provide an HTML sitemap page linking to every public page, generated from the page list so new pages cannot be omitted.

**Acceptance Criteria:**
- AC-1: Given the built site, then every non-redirect page in `dist/` (except 404 and sitemap itself) is linked from the sitemap page.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-009.1-.4 | test/legal.test.mjs (planned) | src/data/legal.ts, src/pages/sitemap.astro (planned) |
