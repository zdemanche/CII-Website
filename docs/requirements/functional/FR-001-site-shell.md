---
id: "FR-001"
title: "Site shell: layout, header, navigation, footer, base-path-safe links, 404"
type: "functional"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["src/layouts/Base.astro", "src/components/Header.astro", "src/components/Footer.astro", "src/data/company.ts", "src/pages/404.astro"]
test_files: ["test/shell.test.mjs"]
depends_on: []
implements: ["NFR-001", "NFR-008"]
---

# FR-001: Site shell

## Description
Shared layout for every page. Fixes legacy defects: zoom lock, `#` nav parents, no header address, 2016 copyright, Twitter link, three brand names.

## Requirements
### FR-001.1: Base layout
Every page SHALL render through the Base layout with `<html lang="en">`, a unique `<title>`, a viewport meta without `maximum-scale` or `user-scalable=no`, exactly one `h1`, and a skip-to-content link as the first focusable element.

**Acceptance Criteria:**
- AC-1: Given any built page, then it has `lang="en"`, one `h1`, a skip link, a viewport meta without `maximum-scale`/`user-scalable`, and a title unique across pages.

### FR-001.2: Header
The header SHALL show the company name "Consolidated Industries, Inc.", address (677 Mixville Rd., Cheshire, CT 06410), phone (203) 272-5371 as a `tel:` link, and a prominent RFQ button linking to the RFQ form (FR-008).

**Acceptance Criteria:**
- AC-1: Given any page, then the header has the address, a `tel:` link and an RFQ link.

### FR-001.3: Navigation
Navigation SHALL consist only of real links (no `href="#"` parents), keyboard operable with visible focus, and SHALL include entries for Capabilities, Markets, Quality, Company, Careers and Contact.

**Acceptance Criteria:**
- AC-1: Given any page, then every nav `a` has a resolvable non-`#` href and shows a visible focus indicator on Tab.

### FR-001.4: Footer
The footer SHALL show the company name once as the single brand, a copyright year computed at build time (not hardcoded), and links to Privacy, Terms, Export control and the HTML sitemap (FR-009). It SHALL NOT contain a Twitter/X link.

**Acceptance Criteria:**
- AC-1: Given a build in year Y, then the footer shows "© Y" and no `href` contains `twitter.com` or `x.com`.

### FR-001.5: Base-path-safe links
All internal links and asset URLs SHALL be built via an `import.meta.env.BASE_URL` helper; no hardcoded leading `/`.

**Acceptance Criteria:**
- AC-1: Given `BASE_PATH=/demo/`, then every internal `href`/`src` starts with `/demo/` and resolves in `dist/`.

### FR-001.6: 404 page
The site SHALL provide a 404 page (Base layout) linking to Home and Contact.
**Acceptance Criteria:** AC-1: Given a build, then `dist/404.html` exists with those links.

## Traceability
| Sub-req | Test file | Source reference |
|---------|-----------|-----------------|
| FR-001.1-.6 | test/shell.test.mjs (planned) | src/layouts/Base.astro, src/components/*, src/pages/404.astro (planned) |

## Addendum (orchestrator, from US-006 unmapped)
- FR-001.A1: Base layout emits Organization + LocalBusiness JSON-LD (name, address, phone, url) from `src/data/company.ts` on every page.
