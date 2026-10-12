---
id: "NFR-008"
title: "Responsive layout and browser support"
type: "nonfunctional"
category: "compatibility"
focus_track: "quality"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["CLAUDE.md", "package.json", "src/layouts/Base.astro", "src/styles/global.css"]
test_files: ["test/responsive.test.mjs"]
verification_method: "ci-matrix"
---

# NFR-008: Responsive layout and browser support

## Description
Buyers and engineers read spec tables on phones, tablets and desktops. Every page must adapt without loss of content or function (ISO/IEC 25010 compatibility and portability: adaptability). Supports WCAG 2.2 reflow (see NFR-001).

## Measurable criteria
- Layout reflows to a 320 CSS px viewport with no horizontal scrolling of the page at 320 px and at 400% zoom on a 1280 px window; wide equipment/limits tables scroll inside their own container or restack, never the whole page.
- No content or function is lost between 320 px and 1920 px; touch targets are at least 24x24 CSS px (WCAG 2.2 target size minimum), 44x44 preferred for nav and the RFQ button.
- Viewport meta is `width=device-width, initial-scale=1` with no zoom lock.
- Supported browsers: the last 2 versions of Chrome, Edge, Firefox and Safari (macOS and iOS), plus Chrome on Android. No IE and no polyfills.
- Pages are usable with JavaScript disabled: nav, content and the RFQ form markup render without it (client-side validation is progressive enhancement).
- Build and test tooling runs on Node >= 20 (`engines`).
- CSS uses only features supported by the above browser set; no vendor-specific hacks.

## Verification
- Post-build tests in `test/responsive.test.mjs`: viewport meta correct on every page; tables wrapped in a scroll container; no fixed pixel widths above 320 px on layout containers in global CSS.
- CI step (FR-012): headless browser run (Playwright Chromium, Firefox, WebKit) at 320, 768 and 1280 px asserting `scrollWidth <= clientWidth` for every built page; Node 20 and current LTS in the build matrix.
- Manual at cutover: spot check on a real iPhone (Safari) and Android (Chrome), plus current Edge, for Home, Capabilities and RFQ.

## Notes
Playwright is not a current dependency; adding it is a dev-dependency decision for the design phase. Until then the static checks and manual checks apply.
