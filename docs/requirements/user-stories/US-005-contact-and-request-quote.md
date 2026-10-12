---
id: "US-005"
title: "Contact CII and request a quote without uploading drawings"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Aerospace/defense procurement buyer"
implements_fr: ["FR-008", "FR-001"]
implements_nfr: ["NFR-003", "NFR-005", "NFR-001"]
test_files: ["test/rfq.test.mjs", "test/contact.test.mjs", "test/a11y.test.mjs"]
epic: "Engagement"
---

# US-005: Contact CII and request a quote without uploading drawings

## Story
As a **procurement buyer**, I want **a clear RFQ form, contact details and directions**, so that **I can reach CII and request a quote without sending export-controlled data through the website**.

## Acceptance Criteria
- [ ] AC-1: Contact page shows 677 Mixville Rd., Cheshire, CT 06410, phone (203) 272-5371 and email info@consolindustries.com; the second line (203) 272-5672 is shown only with a confirm marker.
- [ ] AC-2: A map link-out and written directions are provided; no third-party map script is embedded.
- [ ] AC-3: The RFQ form has labelled fields (name*, company*, email*, phone, material/alloy*, part description*, approx. weight, annual quantity*, program, required date, notes); empty required fields produce accessible inline errors.
- [ ] AC-4: The form has no file input and tells buyers that export-controlled or CUI drawings go through CII's secure transfer link (URL is a CONFIRM item).
- [ ] AC-5: In the demo build, valid submission shows a "demo - not sent" confirmation and sends nothing from the browser.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/contact.test.mjs | Address, phone, email rendered (planned) |
| AC-2 | test/contact.test.mjs | Map link-out present; no external script (planned) |
| AC-3 | test/rfq.test.mjs | Labels, required attributes, error states (planned) |
| AC-4 | test/rfq.test.mjs | No input type=file; CUI notice present (planned) |
| AC-5 | test/rfq.test.mjs | Demo confirmation text; no network call (planned) |
