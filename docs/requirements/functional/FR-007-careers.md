---
id: "FR-007"
title: "Careers"
type: "functional"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/careers.astro", "src/data/jobs.ts"]
test_files: ["test/careers.test.mjs"]
depends_on: ["FR-001", "FR-009"]
implements: ["NFR-006"]
---

# FR-007: Careers

## Description
Open roles rendered from data, with benefits, application path and EEO statement. Replaces employment-opportunities.php.

## Requirements

### FR-007.1: Open roles and empty state
The page SHALL render roles from `src/data/jobs.ts`. When the list is empty (current state; audit lists none) it SHALL show an explicit "no current openings" message and the application path.

**Acceptance Criteria:**
- AC-1: Given an empty jobs list, then the page shows the empty-state message and no empty list element.
- AC-2: Given a jobs entry is added, then it renders with title and description without page-code changes.

### FR-007.2: Benefits and who we seek
The page SHALL state competitive compensation, professional development and a collaborative team-based approach, and that CII seeks engineering drive and machining/forging backgrounds. No salary figures or other benefits are invented.

**Acceptance Criteria:**
- AC-1: Given the page, then all three benefits and both seek statements appear and no other benefit is listed.

### FR-007.3: Apply path
The page SHALL give a way to express interest (contact email or link to Contact). The recipient address for applications is CONFIRM. The page SHALL NOT accept file uploads.

**Acceptance Criteria:**
- AC-1: Given the page, then it links to Contact or shows a mailto, flagged `confirm: true`, and has no `input[type=file]`.

### FR-007.4: EEO statement
The page SHALL include an Equal Employment Opportunity statement, shipped as a labelled draft flagged CONFIRM for CII/legal approval.

**Acceptance Criteria:**
- AC-1: Given the page, then an EEO statement renders with `confirm: true` (DEMO marker visible).

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-007.1-.4 | test/careers.test.mjs (planned) | src/data/jobs.ts, src/pages/careers.astro (planned) |
