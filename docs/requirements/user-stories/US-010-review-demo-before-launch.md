---
id: "US-010"
title: "Review the demo and see what still needs confirmation"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "CII leadership reviewing the demo"
implements_fr: ["FR-011"]
implements_nfr: ["NFR-005", "NFR-006", "NFR-004"]
test_files: ["test/demo.test.mjs", "test/content.test.mjs"]
epic: "Content and Governance"
---

# US-010: Review the demo and see what still needs confirmation

## Story
As **CII leadership reviewing the demo**, I want **a clearly labelled demo that lists every unconfirmed fact**, so that **I can approve content, and know the demo will not be indexed or collect data**.

## Acceptance Criteria
- [ ] AC-1: With `DEMO=1`, every page has a robots noindex meta tag and `robots.txt` disallows all; without `DEMO`, neither is emitted and `robots.txt` references the sitemap.
- [ ] AC-2: A demo banner appears on every page in demo builds only.
- [ ] AC-3: Each `confirm: true` item renders a subtle visible marker in the demo and not in production.
- [ ] AC-4: A launch-checklist page lists all confirm items (for example certification numbers, the secure-transfer URL, the second phone line, legal drafts) with their page.
- [ ] AC-5: The demo loads no analytics or tracking scripts.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/demo.test.mjs | Noindex meta and robots.txt for DEMO and non-DEMO (planned) |
| AC-2 | test/demo.test.mjs | Banner present only when DEMO=1 (planned) |
| AC-3 | test/demo.test.mjs | Markers rendered for confirm items (planned) |
| AC-4 | test/content.test.mjs | Checklist count equals confirm flags in data (planned) |
| AC-5 | test/demo.test.mjs | No third-party script tags (planned) |
