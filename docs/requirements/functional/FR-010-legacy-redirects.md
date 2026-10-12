---
id: "FR-010"
title: "Legacy URL redirects"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/data/redirects.ts", "src/pages/[...legacy].astro", "scripts/gen-redirects.mjs"]
test_files: ["test/redirects.test.mjs"]
depends_on: ["FR-001", "FR-003", "FR-004", "FR-005", "FR-006", "FR-007", "FR-008", "FR-009"]
implements: ["NFR-004", "NFR-007"]
---

# FR-010: Legacy URL redirects

## Description
Every legacy `.php` and PDF URL maps to a new page via one data file. GitHub Pages cannot send 301s, so the demo emits meta-refresh stubs; production 301 config is generated from the same data.

## Requirements

### FR-010.1: Redirect map
`src/data/redirects.ts` SHALL contain exactly the 23 legacy URLs in the audit, each with a target. Targets: index.php to Home; about, mission-vision-strategy-quality, related-companies, memberships-committees, news-forging-industry to Company/News (FR-006); accreditations-certificates-affiliations, continuous-improvement, quality-clauses-supplier.pdf, industrytermsconditions.pdf to Quality (FR-005, documents section for PDFs); forging-capabilities, engineering-design-services, finishing-processes to Capabilities; the five products-* pages and aircraft-programs-served to their Markets/Programs sections (transportation and industrial to the merged page); contact-location-request-quote and directions1.pdf to Contact (directions); employment-opportunities to Careers; sitemap.php to the HTML sitemap.

**Acceptance Criteria:**
- AC-1: Given the data, then it has 23 entries matching the audit list, unique sources, and every target resolves to a built page.

### FR-010.2: Demo meta-refresh stubs
When built for the demo, the site SHALL emit one stub per legacy URL containing `<meta http-equiv="refresh">`, a visible fallback link, `rel="canonical"` to the target, and a robots noindex meta, with targets honoring BASE_PATH.

**Acceptance Criteria:**
- AC-1: Given a demo build, then a stub exists for each of the 23 URLs and each refresh target exists in `dist/`.

### FR-010.3: Production 301 configuration
The build SHALL generate a host redirect config (format decided by ADR) from the same data, mapping each legacy path to its target with status 301.

**Acceptance Criteria:**
- AC-1: Given a production build, then the generated file lists 23 rules, all 301, matching `redirects.ts`.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-010.1-.3 | test/redirects.test.mjs (planned) | src/data/redirects.ts, scripts/gen-redirects.mjs (planned) |

## Addendum (orchestrator, from US-012 unmapped)
- FR-010.A1: The same redirect data also emits host-neutral production artifacts at build time: a `_redirects` file (source → target 301) and a `_headers` file (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) for the production host chosen at cutover.
- FR-010.A2: `docs/runbooks/dns-cutover.md` documents: lower TTL to ≤300 s 48 h ahead, deploy production build, switch DNS, verify every legacy URL returns 301, keep old host 30 days, rollback = revert DNS records.
- FR-010.A3: Production RFQ endpoint and bot protection are decided by ADR before cutover (NFR-003); the demo never submits.
