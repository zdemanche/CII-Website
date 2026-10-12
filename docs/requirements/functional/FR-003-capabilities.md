---
id: "FR-003"
title: "Capabilities: equipment, limits, materials, engineering, finishing"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/capabilities.astro", "src/data/capabilities.ts"]
test_files: ["test/capabilities.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-001"]
---

# FR-003: Capabilities

## Description
Presents audited equipment and process data as accessible tables. Replaces legacy forging-capabilities, engineering-design-services and finishing-processes pages.

## Requirements

### FR-003.1: Equipment tables
The site SHALL list hammers (programmable hydraulic, 31.5 kJ to 160 kJ), presses (hydraulic 1,500 t and 2,500 t; mechanical 1,300 t; cold trim 150 t, 75 t, 60 t), and open and closed (impression) die capability, as tables with captions and header cells.

**Acceptance Criteria:**
- AC-1: Given the page, then each table has `<caption>` and `<th scope>` headers and every audited value appears.
- AC-2: Given the legacy "16,000 lb impact energy" claim, then it is omitted or shown with `confirm: true` (unit unresolved).

### FR-003.2: Weight and plan-area limits
The site SHALL show max weight / plan-view area by material: carbon, alloy and stainless (hammer) 250 lb / up to 300 sq in; nickel-base and titanium (hammer) 175 lb / 240 sq in; copper-base (press) 150 lb / 200 sq in; aluminum (press) 100 lb / 250 sq in.

**Acceptance Criteria:**
- AC-1: Given the table, then it has exactly four material rows with the values above.
- AC-2: Given the About page's "1–200 lb" range conflicts, then no overall range is stated unless `confirm: true`.

### FR-003.3: Materials
The site SHALL list materials grouped as Steels, Nickel, Titanium, Aluminum and Other, with the alloys named in the audit.

**Acceptance Criteria:**
- AC-1: Given the page, then five groups render and each audited alloy appears (e.g. 17-4PH, Inconel 718, Ti 6-4, 7075, naval brass).

### FR-003.4: Engineering services
The site SHALL describe forging design/redesign consulting, DEFORM process simulation, metallurgical and metal-flow analysis, laser scanning of machined parts, and 3-D models for die manufacturing.

**Acceptance Criteria:**
- AC-1: Given the page, then each of the six services is present.

### FR-003.5: Heat treat, NDT, cleaning, lab
The site SHALL list heat treat, NDT (fluorescent penetrant, magnetic particle, ultrasonic), cleaning and laboratory processes as audited. NADCAP scope per process (e.g. UT) is CONFIRM and SHALL be flagged.

**Acceptance Criteria:**
- AC-1: Given the page, then all four groups list their audited processes.
- AC-2: Given a NADCAP claim for ultrasonic testing, then it has `confirm: true`.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-003.1-.5 | test/capabilities.test.mjs (planned) | src/data/capabilities.ts, src/pages/capabilities.astro (planned) |
