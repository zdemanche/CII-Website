---
id: "FR-002"
title: "Home page"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/index.astro", "src/data/company.ts"]
test_files: ["test/home.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-004"]
---

# FR-002: Home page

## Description
Landing page that states what CII forges and since when, and routes buyers to Capabilities, Markets, Quality and RFQ.

## Requirements

### FR-002.1: Company statement
The home page SHALL state that CII, since 1948, produces forgings from ferrous, non-ferrous and exotic metals, at low or high volume. Partial or full machining MAY be mentioned only with a CONFIRM marker (machining scope unconfirmed).

**Acceptance Criteria:**
- AC-1: Given `/`, then the text contains "1948" and "ferrous, non-ferrous and exotic".
- AC-2: Given the machining claim is rendered, then its data item has `confirm: true`.

### FR-002.2: Entry points
The home page SHALL link to Capabilities (FR-003), Markets (FR-004), Quality (FR-005) and the RFQ form (FR-008), each with descriptive link text.

**Acceptance Criteria:**
- AC-1: Given `/`, then links to all four destinations exist and resolve under BASE_PATH.

### FR-002.3: Content integrity of imagery and claims
The home page SHALL NOT include invented statistics, testimonials or customer logos, and every image SHALL have meaningful alt text (decorative images `alt=""`). Stock photos are not required; imagery is CONFIRM (approved photography not supplied).

**Acceptance Criteria:**
- AC-1: Given `/`, then every `img` has an `alt` attribute and none contains generic/lorem text.
- AC-2: Given `/`, then no numeric claim is rendered that is absent from `src/data`.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-002.1-.3 | test/home.test.mjs (planned) | src/pages/index.astro, src/data/company.ts (planned) |
