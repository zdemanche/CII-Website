---
id: "NFR-006"
title: "Maintainability and content integrity"
type: "nonfunctional"
category: "quality"
focus_track: "quality"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["CLAUDE.md", "package.json", "tsconfig.json", "docs/source/legacy-site-audit.md", "src/data/"]
test_files: ["test/content-integrity.test.mjs", "test/build.test.mjs"]
verification_method: "ci-matrix"
---

# NFR-006: Maintainability and content integrity

## Description
Content is typed data, not prose, so pages stay thin and editors change facts in one place (ISO/IEC 25010 maintainability). Facts come only from the audited legacy site; anything conflicting or stale is flagged, never invented. For an aerospace/defense supplier, a false certification or capability claim is a business risk.

## Measurable criteria
- All site content lives in `src/data/*.ts` (company, capabilities, certifications, markets, programs, news, jobs, redirects); pages and components contain no hardcoded facts.
- `npm run check` (`astro check`, TypeScript strict) exits 0 with zero errors and zero warnings treated as errors.
- Every data item that is marked (CONFIRM) in `docs/source/legacy-site-audit.md` has `confirm: true`; the DEMO build renders a visible marker for each and lists them on `/launch-checklist` (define-findings #9).
- No fake stats, testimonials, customer logos or stock-photo claims; customer approvals and program names are text only.
- No Tailwind or UI framework dependency is added (CLAUDE.md); runtime dependencies stay limited to Astro, `@astrojs/sitemap`, `@astrojs/check`, TypeScript.
- Node >= 20 enforced via `engines`; `package-lock.json` committed.
- Later gate: production build fails CI if any `confirm: true` item would render unflagged.

## Verification
- CI step (FR-012) runs, in order and each must exit 0: `npm ci`, `npm run check`, `npm run build`, `npm test`.
- Post-build tests in `test/content-integrity.test.mjs`: every `confirm: true` item appears in `/launch-checklist` output; DEMO pages contain the marker; no "lorem" strings; copyright year equals the build year.
- Code review checklist: new facts cite a source line in `docs/source/`.
- Manual at cutover: CII staff clear each launch-checklist item or it stays flagged.

## Notes
Lint/format is not configured (CLAUDE.md); adding it is out of scope here unless a later ADR decides otherwise.
