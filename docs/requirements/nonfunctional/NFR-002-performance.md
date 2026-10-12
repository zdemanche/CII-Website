---
id: "NFR-002"
title: "Performance (static output, Lighthouse >= 90 mobile)"
type: "nonfunctional"
category: "performance"
focus_track: "quality"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["astro.config.mjs", "package.json", "CLAUDE.md", "src/layouts/Base.astro"]
test_files: ["test/performance.test.mjs"]
verification_method: "benchmark"
---

# NFR-002: Performance (static output, Lighthouse >= 90 mobile)

## Description
The site is fully static HTML/CSS (Astro, `build.format: 'directory'`), loads fast on mobile connections, and avoids third-party runtime cost (ISO/IEC 25010 performance efficiency). Less transferred data also lowers energy use (secondary eco benefit).

## Measurable criteria
- Build output is static: `dist/` contains only HTML, CSS, assets and optional small first-party JS; no SSR adapter in `astro.config.mjs`.
- Lighthouse mobile Performance score >= 90 on Home, Capabilities and Contact/RFQ (Accessibility and Best Practices also >= 90).
- LCP <= 2.5 s, CLS <= 0.1, TBT <= 200 ms (Lighthouse mobile, simulated throttling).
- Zero third-party scripts, fonts, iframes or tag managers in any page (no embedded map; link-out only, per define-findings #6). No render-blocking external resources.
- Images are optimized (modern format, explicit `width`/`height`, `loading="lazy"` below the fold); no single image over 200 KB.
- Each page's HTML plus critical CSS stays under 100 KB uncompressed (excluding images).

## Verification
- Post-build tests in `test/performance.test.mjs`: no `<script src>` / `<link href>` / `<iframe>` pointing to an external origin; every `img` has `width` and `height`; image file sizes under budget; no adapter in config.
- CI step (FR-012): Lighthouse CI against `dist/` (mobile preset) with the score and Core Web Vitals assertions above; build fails below threshold.
- Manual at cutover: Lighthouse and WebPageTest run against the production host behind real HTTPS/CDN, results recorded in the launch checklist.

## Notes
Lighthouse CI is not yet configured (CLAUDE.md: no CI workflow exists). Thresholds are the orchestrator allocation defaults.
