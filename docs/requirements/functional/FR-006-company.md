---
id: "FR-006"
title: "Company: about, group companies, memberships, news"
type: "functional"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/company.astro", "src/pages/news.astro", "src/data/company.ts", "src/data/news.ts"]
test_files: ["test/company.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-006"]
---

# FR-006: Company

## Description
About, mission/vision, AIAC group companies, memberships and news archive.

## Requirements

### FR-006.1: About, mission and vision
The page SHALL state the company since 1948, the mission (success through strategic goal-setting, communicated to employees and public) and the vision "deliver forging excellence by instilling a culture of collaboration, flexibility and responsiveness".

**Acceptance Criteria:**
- AC-1: Given the page, then "1948", the mission and the vision quotation appear verbatim.

### FR-006.2: AIAC group companies
The site SHALL state CII is part of the AIAC (American Industrial Acquisition Corporation) Aerospace & Special Metals Group (current status CONFIRM) and list Lenape Forged Products Corp (West Chester PA), Arnprior Aerospace Inc. (Arnprior ON / Chihuahua MX), Arnprior Rapid Manufacturing Solutions (Rochester NY), Arnprior Aerospace Portland (OR) and Arnprior Aerospace Montreal (QC). External links exist only for lenapeforge.com, arnprioraerospace.com and arnprior-rmsi.com, with `rel="noopener"`.

**Acceptance Criteria:**
- AC-1: Given the page, then five companies render and exactly three have external links.
- AC-2: Given the AIAC statement, then its data item has `confirm: true`.

### FR-006.3: Memberships
The site SHALL list FIA, AIA, Made in CT (via CONNSTEP), FDMC and ACIBC (joined Mar 2016), all flagged CONFIRM active.

**Acceptance Criteria:**
- AC-1: Given the page, then five memberships render, each with `confirm: true`.

### FR-006.4: News archive
The site SHALL show the four audited items, dated, newest first (2016-03-21 ACIBC letter on carrier funding; 2016-03-15 joined ACIBC; 2015-11-20 new machinery; 2015-10-27 CH-53K first flight), with a note that news resumes at launch. No article text is invented.

**Acceptance Criteria:**
- AC-1: Given the news page, then items are in descending date order, each in a `<time datetime>` element.
- AC-2: Given the page, then the "news resumes at launch" note is present.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-006.1-.4 | test/company.test.mjs (planned) | src/data/company.ts, src/data/news.ts (planned) |
