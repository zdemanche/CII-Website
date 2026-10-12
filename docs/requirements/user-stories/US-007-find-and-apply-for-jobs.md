---
id: "US-007"
title: "Find open roles and learn how to apply"
type: "user-story"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Job applicant"
implements_fr: ["FR-007"]
implements_nfr: ["NFR-001", "NFR-005"]
test_files: ["test/careers.test.mjs", "test/a11y.test.mjs"]
epic: "Engagement"
---

# US-007: Find open roles and learn how to apply

## Story
As a **job applicant**, I want **to see current openings, what CII offers and how to apply**, so that **I can decide whether to pursue a career in forging at CII**.

## Acceptance Criteria
- [ ] AC-1: Careers page renders open roles from `src/data` jobs data; with no roles, it shows an empty state explaining that none are listed and how to inquire.
- [ ] AC-2: Benefits copy reflects the audited offer (competitive compensation, professional development, collaborative team-based approach) and the backgrounds sought (engineering drive, machining/forging).
- [ ] AC-3: An apply path is provided (contact method for HR is a CONFIRM item) and does not ask applicants to upload resumes through the site.
- [ ] AC-4: A draft EEO statement is shown, labelled and flagged `confirm: true` for CII/legal approval.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/careers.test.mjs | Roles render; empty state when data empty (planned) |
| AC-2 | test/careers.test.mjs | Benefits and sought backgrounds present (planned) |
| AC-3 | test/careers.test.mjs | Apply path present; no file input (planned) |
| AC-4 | test/careers.test.mjs | EEO statement with confirm marker (planned) |
