---
id: "US-001"
title: "Orient on first visit and reach key pages on any device"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "Aerospace/defense procurement buyer"
implements_fr: ["FR-001", "FR-002"]
implements_nfr: ["NFR-001", "NFR-002", "NFR-008"]
test_files: ["test/build.test.mjs", "test/pages.test.mjs", "test/links.test.mjs", "test/a11y.test.mjs"]
epic: "Discovery and Evaluation"
---

# US-001: Orient on first visit and reach key pages on any device

## Story
As a **procurement buyer**, I want **to see what CII forges and reach Capabilities, Markets, Quality and RFQ within one click from the home page**, so that **I can decide quickly whether CII is a viable source**.

## Acceptance Criteria
- [ ] AC-1: Home page states CII forges ferrous, non-ferrous and exotic metals and has served since 1948, with entry links to Capabilities, Markets, Quality and RFQ.
- [ ] AC-2: Every page shows the header with address, phone and an RFQ button, real-link navigation (no `#` parents), and a footer with the current copyright year and no Twitter link.
- [ ] AC-3: Every internal link and asset resolves under both `BASE_PATH=/` and a non-root demo base path; unknown URLs show a 404 page with navigation.
- [ ] AC-4: Each page has one `h1`, `lang` set, a skip link, visible focus, no viewport zoom lock, and reflows at 320 CSS px without horizontal scroll.
- [ ] AC-5: Pages are static output with no render-blocking third-party scripts.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/pages.test.mjs | Home page content and entry links present (planned) |
| AC-2 | test/pages.test.mjs | Header address/phone/RFQ, footer year, no Twitter link (planned) |
| AC-3 | test/links.test.mjs | Link resolution under root and demo base; 404 page (planned) |
| AC-4 | test/a11y.test.mjs | h1 count, lang, skip link, viewport meta (planned) |
| AC-5 | test/build.test.mjs | dist output exists; no external script tags (extend) |
