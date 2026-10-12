---
id: "FR-005"
title: "Quality, certifications, policies and documents"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/quality.astro", "src/data/certifications.ts"]
test_files: ["test/quality.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-006"]
---

# FR-005: Quality

## Description
Certifications, customer approvals, quality and safety policy, continuous improvement, and supplier documents. Replaces accreditations, mission-vision (policies), continuous-improvement pages and the two PDFs.

## Requirements

### FR-005.1: Certifications
The site SHALL list AS9100 Rev D and ISO 9001:2015 (registrar Amtivo (USA) Inc.), NADCAP (nondestructive testing MT, PT; heat treating incl. test lab), Boeing D6-82479 and BMS7-247, and MIL-spec/NAS spec compliance. Certificate numbers, expiry dates, NADCAP UT scope and the "most MIL/NAS" wording are CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the page, then each listed certification renders from data.
- AC-2: Given certification entries, then each has `confirm: true` and no certificate number or expiry is invented.

### FR-005.2: Customer approvals
The site SHALL list Boeing, Sikorsky, GE, Lockheed Martin, Lord Corp, Raytheon and Vought as text only. Currency and logo permission are CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the page, then seven names render, all flagged `confirm: true`, with no logo images.

### FR-005.3: Quality and safety policy
The site SHALL state the quality policy (continuous improvement; every employee responsible for understanding, controlling and reducing process variation) and safety policy (safe, healthy workplace, environmental stewardship, report every injury). Continuous improvement is a section of this page; no separate page.

**Acceptance Criteria:**
- AC-1: Given the page, then both policies and a continuous-improvement section render under heading levels with no skipped levels.
- AC-2: Given continuous-improvement detail beyond the audit is absent, then the section is flagged content pending.

### FR-005.4: Documents
The page SHALL list the Supplier Quality Assurance Requirements (SQAR) codes and Standard Terms & Conditions as documents. PDFs are not in the repo; each is shown as "pending" with a request-via-Contact link.

**Acceptance Criteria:**
- AC-1: Given the documents section, then both entries render with pending status and a Contact link, and no broken PDF link exists.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-005.1-.4 | test/quality.test.mjs (planned) | src/data/certifications.ts, src/pages/quality.astro (planned) |
