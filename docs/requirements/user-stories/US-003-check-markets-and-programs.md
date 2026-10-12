---
id: "US-003"
title: "Check markets served and aircraft programs"
type: "user-story"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Aerospace/defense procurement buyer"
implements_fr: ["FR-004"]
implements_nfr: ["NFR-004", "NFR-006"]
test_files: ["test/markets.test.mjs", "test/seo.test.mjs", "test/content.test.mjs"]
epic: "Discovery and Evaluation"
---

# US-003: Check markets served and aircraft programs

## Story
As a **procurement buyer**, I want **to see which markets and programs CII supplies**, so that **I can confirm it has relevant experience for my platform**.

## Acceptance Criteria
- [ ] AC-1: Separate pages exist for aircraft and rotorcraft, military and defense, turbine engine, and a combined industrial and transportation market.
- [ ] AC-2: The aircraft page describes flight-safety, flight-critical and primary forgings (landing gear, structural, rotor, airframe, wheel components) and the military page describes hand, contoured and closed die forgings, using audited wording only.
- [ ] AC-3: Programs served are grouped as commercial fixed-wing, commercial rotorcraft, military fixed-wing and military rotorcraft, as text only with no logos.
- [ ] AC-4: Turbine engine and industrial/transportation pages ship with audited facts only and a visible content-pending marker; program names are `confirm: true` until CII approves naming.
- [ ] AC-5: Each market page has a unique title and meta description.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/markets.test.mjs | Four market pages built (planned) |
| AC-2 | test/content.test.mjs | Market copy sourced from data (planned) |
| AC-3 | test/markets.test.mjs | Program groups rendered, no img logos (planned) |
| AC-4 | test/content.test.mjs | Pending/confirm markers present (planned) |
| AC-5 | test/seo.test.mjs | Unique titles and descriptions (planned) |
