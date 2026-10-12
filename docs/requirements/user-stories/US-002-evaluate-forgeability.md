---
id: "US-002"
title: "Evaluate equipment and material limits for a part"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Design engineer evaluating forgeability"
implements_fr: ["FR-003"]
implements_nfr: ["NFR-001", "NFR-006"]
test_files: ["test/capabilities.test.mjs", "test/content.test.mjs", "test/a11y.test.mjs"]
epic: "Discovery and Evaluation"
---

# US-002: Evaluate equipment and material limits for a part

## Story
As a **design engineer evaluating forgeability**, I want **equipment specs and weight and plan-area limits by material in readable tables**, so that **I can tell whether my part fits CII's presses and hammers before requesting a quote**.

## Acceptance Criteria
- [ ] AC-1: Capabilities page lists hammers (31.5 kJ to 160 kJ), hydraulic presses (1,500 t, 2,500 t), a mechanical press (1,300 t) and cold trim presses (150 t, 75 t, 60 t) as spec tables with header cells and captions.
- [ ] AC-2: A limits table gives max weight and plan-view area by material (for example carbon/alloy/stainless 250 lb / 300 sq in; aluminum 100 lb / 250 sq in), and states open die and closed (impression) die.
- [ ] AC-3: The materials list covers steels, nickel, titanium, aluminum and other alloys exactly as audited, and engineering, heat treat, NDT, cleaning and lab services are listed with NADCAP shown only where audited.
- [ ] AC-4: Unconfirmed figures (the "16,000 lb impact energy" unit, the 1-200 lb About-page range) carry `confirm: true` in data and are never presented as fact.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/capabilities.test.mjs | Equipment table values, th scope, caption (planned) |
| AC-2 | test/capabilities.test.mjs | Weight/area limits per material rendered (planned) |
| AC-3 | test/content.test.mjs | Materials and services match audited data (planned) |
| AC-4 | test/content.test.mjs | Confirm-flagged items identified in data (planned) |
