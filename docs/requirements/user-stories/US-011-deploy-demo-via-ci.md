---
id: "US-011"
title: "Build, verify and deploy the demo to GitHub Pages"
type: "user-story"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
persona: "IT (Zach) deploying the site"
implements_fr: ["FR-012", "FR-001"]
implements_nfr: ["NFR-007", "NFR-002", "NFR-006", "NFR-008"]
test_files: ["test/build.test.mjs", "test/links.test.mjs", "test/deploy.test.mjs"]
epic: "Delivery"
---

# US-011: Build, verify and deploy the demo to GitHub Pages

## Story
As **IT (Zach)**, I want **a GitHub Actions workflow that builds, checks, tests and deploys the demo**, so that **leadership can review a working site under a project base path with no manual steps**.

## Acceptance Criteria
- [ ] AC-1: A push to the main branch runs `npm run build`, `npm run check` and `npm test`, and deploys `dist/` to GitHub Pages only if all pass.
- [ ] AC-2: The workflow sets `SITE_URL`, `BASE_PATH` and `DEMO=1` for the demo build, and the deployed site serves all pages, assets and links under that base path.
- [ ] AC-3: A failing check or test blocks deployment and the workflow log identifies the failure.
- [ ] AC-4: The build output is static and meets the performance target (Lighthouse mobile at least 90) on the home page.

## Test Coverage
| Criterion | Test file | Description |
|-----------|-----------|-------------|
| AC-1 | test/deploy.test.mjs | Workflow file defines build, check, test, deploy jobs (planned) |
| AC-2 | test/links.test.mjs | Links resolve under demo BASE_PATH (planned) |
| AC-3 | test/deploy.test.mjs | Deploy job depends on test job (planned) |
| AC-4 | test/build.test.mjs | Static dist output exists; Lighthouse run in CI (extend) |
