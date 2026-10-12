---
id: "US-004"
title: "Verify certifications, approvals and quality documents"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Supplier-quality engineer"
implements_fr: ["FR-005"]
implements_nfr: ["NFR-006", "NFR-001"]
test_files: ["test/quality.test.mjs", "test/content.test.mjs", "test/a11y.test.mjs"]
epic: "Discovery and Evaluation"
---

# US-004: Verify certifications, approvals and quality documents

## Story
As a **supplier-quality engineer**, I want **CII's certifications, customer approvals, quality policy and supplier documents in one place**, so that **I can assess approved-source status before onboarding CII**.

## Acceptance Criteria
- [ ] AC-1: Quality page lists AS9100 Rev D, ISO 9001:2015, NADCAP scopes (NDT; heat treating including test lab), Boeing D6-82479 and BMS7-247, each flagged `confirm: true` for numbers and expiry.
- [ ] AC-2: Customer approvals (Boeing, Sikorsky, GE, Lockheed Martin, Lord Corp, Raytheon, Vought) appear as text only, with no logos and no testimonials, flagged until logo permission and currency are confirmed.
- [ ] AC-3: Quality and safety policy text and the continuous improvement content appear on the Quality page with correct heading order.
- [ ] AC-4: A documents section lists the SQAR codes and Standard Terms & Conditions as pending (PDFs are not in the repo), and no link points to a missing file.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/quality.test.mjs | Certifications listed with confirm flags (planned) |
| AC-2 | test/quality.test.mjs | Approvals are text; no img elements (planned) |
| AC-3 | test/a11y.test.mjs | One h1, no skipped heading levels (planned) |
| AC-4 | test/quality.test.mjs | Documents section pending; links resolve (planned) |
