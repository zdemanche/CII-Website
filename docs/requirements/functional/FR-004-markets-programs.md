---
id: "FR-004"
title: "Markets and programs served"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/pages/markets/index.astro", "src/pages/markets/[slug].astro", "src/data/markets.ts", "src/data/programs.ts"]
test_files: ["test/markets.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-006"]
---

# FR-004: Markets and programs served

## Description
Four market pages plus a programs-served list, rendered from typed data. Replaces legacy products-* and aircraft-programs-served pages.

## Requirements

### FR-004.1: Aircraft and rotorcraft
The page SHALL state flight-safety, flight-critical and primary forgings for fixed-wing, rotorcraft and UAV (military, commercial, general aviation), with examples: landing gear, structural, rotor, airframe, wheel components, UH-60 rotor link.

**Acceptance Criteria:**
- AC-1: Given the page, then the audited statement and all listed examples appear.

### FR-004.2: Military and defense
The page SHALL state hand, contoured and closed die forgings for warships, fixed/rotary wing aircraft, armored vehicles and guided munitions.

**Acceptance Criteria:**
- AC-1: Given the page, then all four platform types appear.

### FR-004.3: Turbine engine and industrial/transportation
These pages were not read in the audit. They SHALL ship with only audited facts (transportation and industrial/commercial merged; power generation and centrifuges named) and a visible "content pending" marker.

**Acceptance Criteria:**
- AC-1: Given each page, then it renders a content-pending marker and its data item has `confirm: true`.
- AC-2: Given each page, then no technical claim appears that is absent from the audit.

### FR-004.4: Programs served
The site SHALL list programs grouped as commercial fixed-wing, commercial rotorcraft, military fixed-wing and military rotorcraft (names per audit; legacy programs marked "legacy"), as text only with no logos. Whether each program may be named publicly is CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the programs section, then four groups render and legacy entries (e.g. 707, A-6) carry a legacy label.
- AC-2: Given the programs data, then every item has `confirm: true` until approved.
- AC-3: Given the page, then it contains no customer or program logo images.

### FR-004.5: Market navigation
Each market page SHALL link to Capabilities and to the RFQ form, and the markets index SHALL link to all market pages.

**Acceptance Criteria:**
- AC-1: Given the markets index, then 4 market links resolve under BASE_PATH.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-004.1-.5 | test/markets.test.mjs (planned) | src/data/markets.ts, src/data/programs.ts (planned) |

## Addendum (2026-10-12)
- Transportation is its own page again (`/markets/transportation/`) now that its copy was recovered from the legacy site; industrial/commercial keeps `/markets/industrial/`. Turbine engine and industrial copy also recovered. Legacy redirects updated.
- Per project owner, facts from the legacy site are treated as confirmed; per-fact confirm markers removed. `/launch-checklist/` now lists go-live tasks only.
