---
id: "FR-011"
title: "Demo review mode"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["astro.config.mjs", "src/layouts/Base.astro", "src/components/DemoBanner.astro", "src/components/ConfirmMark.astro", "src/pages/launch-checklist.astro", "public/robots.txt"]
test_files: ["test/demo-mode.test.mjs"]
depends_on: ["FR-001"]
implements: ["NFR-004", "NFR-006", "NFR-007"]
---

# FR-011: Demo review mode

## Description
`DEMO=1` builds are for stakeholder review: not indexable, clearly labelled, and exposing every unconfirmed fact.

## Requirements

### FR-011.1: Noindex
When `DEMO=1`, every page SHALL include `<meta name="robots" content="noindex, nofollow">` and `robots.txt` SHALL disallow all. A sitemap MAY be generated. When `DEMO` is unset, neither SHALL be emitted and `robots.txt` SHALL allow crawling and reference the sitemap.

**Acceptance Criteria:**
- AC-1: Given a DEMO build, then all pages have the robots meta and `robots.txt` contains `Disallow: /`.
- AC-2: Given a non-DEMO build, then no page has the robots noindex meta and `robots.txt` references the sitemap.

### FR-011.2: Demo banner
In DEMO builds each page SHALL show a banner stating it is a non-final demo, placed after the skip link and not obscuring content at 320 px.

**Acceptance Criteria:**
- AC-1: Given a DEMO build, then every page contains the banner; given non-DEMO, none does.

### FR-011.3: Confirm markers
Any data item with `confirm: true` SHALL render a visible, non-color-only marker in DEMO builds and no marker in non-DEMO builds.

**Acceptance Criteria:**
- AC-1: Given a DEMO page rendering a confirm item, then a marker with accessible text (e.g. "to be confirmed") is present.

### FR-011.4: Launch checklist
A `/launch-checklist` page, built in DEMO only, SHALL list every `confirm: true` item with its page and reason, generated from data. A later CI gate (not in this release) fails a production build rendering a confirm item unflagged.

**Acceptance Criteria:**
- AC-1: Given N confirm items in data, then the checklist lists N entries.
- AC-2: Given a non-DEMO build, then the checklist page does not exist.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-011.1-.4 | test/demo-mode.test.mjs (planned) | astro.config.mjs, src/layouts/Base.astro, src/pages/launch-checklist.astro (planned) |
