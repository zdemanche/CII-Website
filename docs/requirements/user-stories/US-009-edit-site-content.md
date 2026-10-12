---
id: "US-009"
title: "Update site content from typed data without inventing facts"
type: "user-story"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "CII marketing/HR content editor"
implements_fr: ["FR-006", "FR-007"]
implements_nfr: ["NFR-006", "NFR-004"]
test_files: ["test/content.test.mjs", "test/company.test.mjs", "test/careers.test.mjs"]
epic: "Content and Governance"
---

# US-009: Update site content from typed data without inventing facts

## Story
As a **CII marketing/HR content editor**, I want **to add news items and job postings by editing typed data files**, so that **pages update without touching page code and unconfirmed facts stay flagged**.

## Acceptance Criteria
- [ ] AC-1: Adding a dated entry to the news data appears on the news archive in newest-first order with no page changes.
- [ ] AC-2: Adding a job entry to the jobs data makes it appear on Careers and removes the empty state; deleting it restores the empty state.
- [ ] AC-3: Content entries accept an optional `confirm` flag, and TypeScript strict checking (`npm run check`) fails when a required field is missing.
- [ ] AC-4: A new job or news page gets a unique title and meta description derived from its data.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/company.test.mjs | News sorted newest first from data (planned) |
| AC-2 | test/careers.test.mjs | Jobs list vs empty state from fixture data (planned) |
| AC-3 | test/content.test.mjs | Data schema includes confirm flag; check gate in CI (planned) |
| AC-4 | test/content.test.mjs | Titles and descriptions unique (planned) |
