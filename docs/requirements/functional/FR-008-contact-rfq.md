---
id: "FR-008"
title: "Contact and RFQ form"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/contact.astro", "src/components/RfqForm.astro", "src/data/company.ts"]
test_files: ["test/contact-rfq.test.mjs"]
depends_on: ["FR-001", "FR-009", "FR-011"]
implements: ["NFR-001", "NFR-003", "NFR-005"]
---

# FR-008: Contact and RFQ form

## Description
Contact details, map link-out, directions, and an RFQ form that never accepts files (replaces contact-location-request-quote.php, directions1.pdf).

## Requirements
### FR-008.1: Contact details
The page SHALL show Consolidated Industries, Inc., 677 Mixville Rd., Cheshire, CT 06410, phone (203) 272-5371, and email info@consolindustries.com (domain differs from forgemetal.com; CONFIRM). The second line (203) 272-5672 is unlabeled (fax/department CONFIRM) and SHALL be flagged.

**Acceptance Criteria:**
- AC-1: Given the page, then address, phone and email render; phone is a `tel:` link.
- AC-2: Given (203) 272-5672 and the email are rendered, then each has `confirm: true`.

### FR-008.2: Map and directions
The page SHALL provide link-outs to map services for the address and written directions. No embedded third-party map or script SHALL be loaded. Directions text (legacy directions1.pdf, unread) is CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the page, then it has external map links and no `iframe` or third-party `script`.

### FR-008.3: RFQ fields and validation
The form SHALL provide labelled fields: name*, company*, email*, phone, material/alloy*, part description*, approx. weight per part, annual quantity*, program/platform, required date, notes (* required). Client-side validation SHALL show per-field error messages tied to inputs and an error summary.

**Acceptance Criteria:**
- AC-1: Given the form, then each field has a `<label>` and required fields are marked `required`/`aria-required`.
- AC-2: Given empty required fields or an invalid email, when submitted, then per-field errors show and focus moves to the error summary.

### FR-008.4: No file upload; secure transfer
The form SHALL NOT contain `input[type=file]`. It SHALL state that export-controlled/CUI drawings must not be sent through the form and go through CII's secure transfer link. The link URL is CONFIRM; until supplied the notice is guidance text only.

**Acceptance Criteria:**
- AC-1: Given the built page, then no `input[type=file]` exists and the CUI notice text is present.
- AC-2: Given no URL is supplied, then no placeholder link renders.

### FR-008.5: Submission states
In the demo, valid submission SHALL show a "demo - not sent" confirmation and nothing SHALL leave the browser. Production endpoint is decided at cutover (ADR). The error state SHALL preserve entered values.

**Acceptance Criteria:**
- AC-1: Given a valid demo submission, then confirmation shows and no network request is made.
- AC-2: Given a failed submission, then an error message shows and input values remain.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-008.1-.5 | test/contact-rfq.test.mjs (planned) | src/pages/contact.astro, src/components/RfqForm.astro (planned) |
