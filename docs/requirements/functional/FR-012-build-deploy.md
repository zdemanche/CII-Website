---
id: "FR-012"
title: "Build and deploy pipeline"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: [".github/workflows/ci.yml", ".github/workflows/pages.yml", "astro.config.mjs"]
test_files: ["test/build-deploy.test.mjs"]
depends_on: ["FR-011"]
implements: ["NFR-006", "NFR-007"]
---

# FR-012: Build and deploy pipeline

## Description
GitHub Actions builds, checks and tests the site and deploys the demo to GitHub Pages. No workflow exists yet (CLAUDE.md).

## Requirements

### FR-012.1: CI checks
On pull requests and pushes to the default branch, a workflow SHALL run on Node 20+: `npm ci`, `npm run check`, `npm run build`, `npm test`, in that order, failing the run on any non-zero exit.

**Acceptance Criteria:**
- AC-1: Given a PR with a type error, then the workflow fails at `npm run check`.
- AC-2: Given a PR with a failing test, then the workflow fails at `npm test`.

### FR-012.2: Demo environment
The deploy build SHALL set `DEMO=1`, `SITE_URL` (the Pages origin) and `BASE_PATH` (the repo path, with leading and trailing slash). The Pages repo name and URL are CONFIRM.

**Acceptance Criteria:**
- AC-1: Given the deployed artifact, then pages carry the noindex meta and internal links begin with BASE_PATH.

### FR-012.3: Pages deployment
On push to the default branch after FR-012.1 passes, the workflow SHALL upload `dist/` and deploy via the official Pages actions, with permissions limited to `contents: read`, `pages: write`, `id-token: write`.

**Acceptance Criteria:**
- AC-1: Given a PR (not push to default), then no deploy job runs.
- AC-2: Given the workflow file, then top-level or job permissions list only the three scopes above.

### FR-012.4: Production build not automated
The workflow SHALL NOT deploy to forgemetal.com; production cutover is manual (NFR-007).

**Acceptance Criteria:**
- AC-1: Given the workflows, then none deploys anywhere other than GitHub Pages.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-012.1-.4 | test/build-deploy.test.mjs (planned; parses workflow YAML) | .github/workflows/ci.yml, pages.yml (planned) |

## Addendum (orchestrator, from US-011 unmapped)
- FR-012.A1: CI runs a Lighthouse (mobile) check against the built demo and reports scores; job warns below NFR-002 thresholds. Demo URL: https://zdemanche.github.io/cii-website/ (CONFIRM after first deploy).
