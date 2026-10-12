---
id: "US-006"
title: "Learn about the company, AIAC group and industry standing"
type: "user-story"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Aerospace/defense procurement buyer"
implements_fr: ["FR-006"]
implements_nfr: ["NFR-004", "NFR-006"]
test_files: ["test/company.test.mjs", "test/seo.test.mjs", "test/content.test.mjs"]
epic: "Discovery and Evaluation"
---

# US-006: Learn about the company, AIAC group and industry standing

## Story
As a **procurement buyer**, I want **to read CII's history, mission, group affiliation and industry memberships**, so that **I can judge its stability and standing before awarding work**.

## Acceptance Criteria
- [ ] AC-1: About page states CII has forged since 1948 and presents the mission, vision and a single consistent brand name (not the three used on the legacy site).
- [ ] AC-2: Related companies lists AIAC and the sister companies (Lenape Forged Products, Arnprior entities) with external links; AIAC membership is flagged `confirm: true`.
- [ ] AC-3: Memberships list FIA, AIA, Made in CT, FDMC and ACIBC, each flagged `confirm: true` until active status is verified.
- [ ] AC-4: The news archive shows the four audited items newest first with dates and a note that news resumes at launch.
- [ ] AC-5: Organization JSON-LD with the audited address and phone is present on the site.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/company.test.mjs | About copy and brand name (planned) |
| AC-2 | test/company.test.mjs | Related companies and links (planned) |
| AC-3 | test/content.test.mjs | Memberships with confirm flags (planned) |
| AC-4 | test/company.test.mjs | News order and resume note (planned) |
| AC-5 | test/seo.test.mjs | JSON-LD parses with audited address (planned) |
