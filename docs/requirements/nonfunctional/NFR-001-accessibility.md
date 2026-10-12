---
id: "NFR-001"
title: "Accessibility (WCAG 2.2 AA)"
type: "nonfunctional"
category: "quality"
focus_track: "quality"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["CLAUDE.md", "docs/source/legacy-site-audit.md", "src/layouts/Base.astro", "src/styles/global.css"]
test_files: ["test/a11y.test.mjs"]
verification_method: "test"
---

# NFR-001: Accessibility (WCAG 2.2 AA)

## Description
Every page conforms to WCAG 2.2 Level AA (ISO/IEC 25010 usability / accessibility). The legacy site has a zoom lock (`maximum-scale=1`), lorem/generic alt text, `#` nav parents and skipped heading levels; the rebuild must remove all of them.

## Measurable criteria
- Exactly one `h1` per page; heading levels never skip (h1 > h2 > h3).
- Every `img` has a non-empty, descriptive `alt` (or `alt=""` when purely decorative); no "image", "lorem", or filename alt text.
- `<html lang="en">` on every page; viewport meta has no `maximum-scale` / `user-scalable=no`.
- A skip-to-content link is the first focusable element; keyboard focus is always visible (no bare `outline: none`).
- `prefers-reduced-motion: reduce` disables non-essential animation/transition.
- Every form control (RFQ form) has an associated `label`; required fields marked in text, not color alone; errors are announced (`aria-live` or `role="alert"`).
- Nav items are real links (no `href="#"` parents). Text contrast >= 4.5:1 (3:1 large text and UI components).

## Verification
- Post-build tests in `test/a11y.test.mjs` scan every `dist/**/*.html` for the structural criteria above (h1 count, heading order, alt, lang, viewport, skip link, labels, no `href="#"`).
- CI step runs `npm run build && npm test` on every push/PR (see FR-012).
- Manual at cutover: keyboard-only walkthrough, 200%/400% zoom, screen-reader spot check (NVDA or VoiceOver) of Home, Capabilities and RFQ; contrast checked against design tokens in `src/styles`.

## Notes
Evidence today: only `src/pages/index.astro` and a smoke test exist; criteria are enforced as the layout and pages are built.
