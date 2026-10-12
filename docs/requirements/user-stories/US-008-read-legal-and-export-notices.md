---
id: "US-008"
title: "Read privacy, terms and export-control notices"
type: "user-story"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Aerospace/defense procurement buyer"
implements_fr: ["FR-009"]
implements_nfr: ["NFR-003", "NFR-005", "NFR-006"]
test_files: ["test/legal.test.mjs", "test/privacy.test.mjs"]
epic: "Trust and Compliance"
---

# US-008: Read privacy, terms and export-control notices

## Story
As a **procurement buyer**, I want **to understand how my RFQ data is handled and what must not be submitted online**, so that **I can use the site without breaching export-control or CUI obligations**.

## Acceptance Criteria
- [ ] AC-1: A privacy policy page explains what RFQ data is collected, how it is used, and that no trackers run in the demo.
- [ ] AC-2: A terms page and an export-control notice exist; the notice says technical data, ITAR/EAR-controlled and CUI material must not be submitted through the website.
- [ ] AC-3: All legal text is labelled as a draft and flagged `confirm: true` for CII/legal approval.
- [ ] AC-4: An HTML sitemap page lists every public page, and privacy, terms and export notice are linked from the footer on every page.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/privacy.test.mjs | Policy covers RFQ data; no tracker scripts (planned) |
| AC-2 | test/legal.test.mjs | Terms and export notice pages with required wording (planned) |
| AC-3 | test/legal.test.mjs | Draft label and confirm marker (planned) |
| AC-4 | test/legal.test.mjs | HTML sitemap completeness and footer links (planned) |
