---
id: "NFR-007"
title: "Deployability (GitHub Pages demo, DNS cutover with rollback)"
type: "nonfunctional"
category: "reliability"
focus_track: "quality"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["astro.config.mjs", "CLAUDE.md", "package.json", ".github/workflows/deploy.yml"]
test_files: ["test/base-path.test.mjs"]
verification_method: "ci-matrix"
---

# NFR-007: Deployability (GitHub Pages demo, DNS cutover with rollback)

## Description
The same source builds for two modes without code changes, driven only by `SITE_URL`, `BASE_PATH` and `DEMO` (read in `astro.config.mjs`), and cutover to the live domain is reversible (ISO/IEC 25010 reliability: recoverability, portability: installability).

| Mode | SITE_URL | BASE_PATH | DEMO | Redirects |
|---|---|---|---|---|
| Demo (GitHub Pages) | `https://<owner>.github.io` | `/<repo>/` | `1` | meta-refresh stubs |
| Production | `https://www.forgemetal.com` (default) | `/` (default) | unset | real 301s at host |

## Measurable criteria
- Both modes build from one commit with exit code 0; the demo build works under a non-root base path with every internal link and asset prefixed by `import.meta.env.BASE_URL` (no hardcoded leading `/`).
- Deploy to GitHub Pages is automated by a workflow on push to the default branch and needs no manual step.
- Cutover plan before DNS change: TTL lowered to <= 300 s at least 48 h earlier; old host kept running and unchanged for 30 days after cutover; rollback is a DNS record revert achievable within 15 minutes.
- Post-cutover smoke check passes: home returns 200, all 23 legacy URLs return 301 to valid targets, `robots.txt` references the sitemap and is not disallow-all, no `noindex` meta.

## Verification
- CI step (FR-012): build matrix of {demo with `BASE_PATH=/cii-website/`, production defaults}; `npm test` runs against each `dist/`.
- Post-build tests in `test/base-path.test.mjs`: every `href`/`src` resolves to a file in `dist/` under the configured base; production build contains no `noindex` and no stub redirect pages.
- Manual at cutover: execute the cutover/rollback checklist (TTL, DNS change, smoke checks, 30-day retention reminder) and record results in the launch checklist.

## Notes
`.github/workflows` does not exist yet (CLAUDE.md: CI to be created). Host choice for production 301s and headers is an open ADR.
