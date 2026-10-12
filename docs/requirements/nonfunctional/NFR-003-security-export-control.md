---
id: "NFR-003"
title: "Security and export-control safety (no uploads, no CUI)"
type: "nonfunctional"
category: "security"
focus_track: "security"
priority: "P0"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["CLAUDE.md", "docs/source/legacy-site-audit.md", "docs/requirements/define-findings.md", "src/pages/contact.astro", "public/_headers"]
test_files: ["test/security.test.mjs"]
verification_method: "test"
---

# NFR-003: Security and export-control safety (no uploads, no CUI)

## Description
CII forges aerospace/defense parts, so buyers may hold ITAR/EAR-controlled or CUI drawings. The website must never receive such data (ISO/IEC 27001 confidentiality). The attack surface is minimized by shipping a static site with no server code.

## Measurable criteria
- No server-side code in the repo or build output: no API routes, no SSR adapter, no PHP.
- No `<input type="file">` anywhere in `dist/`; RFQ form has no `enctype="multipart/form-data"`. The RFQ page states that export-controlled/CUI drawings go through CII's secure transfer link (guidance text; URL is a CONFIRM item).
- RFQ fields are limited to the list in define-findings #1 (name, company, email, phone, material/alloy, part description, approx. weight, annual quantity, program, required date, notes); no drawing, part-number-with-spec, or CUI fields.
- Demo build submits nothing: the form posts nowhere (no `action` to an external origin) and shows a "demo - not sent" confirmation.
- Production host (forgemetal.com) serves HTTPS only (HTTP redirects to HTTPS) with HSTS, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `frame-ancestors 'none'` (or `X-Frame-Options: DENY`).
- Production RFQ endpoint has bot protection (honeypot or privacy-respecting challenge) and server-side input length limits; decision recorded in an ADR at cutover.
- `npm audit --omit=dev` reports no high or critical vulnerabilities; no secrets committed.

## Verification
- Post-build tests in `test/security.test.mjs`: no file input, no multipart enctype, no external form action, CUI notice present on the RFQ page, no inline third-party scripts.
- CI step (FR-012): `npm audit --omit=dev --audit-level=high`.
- Manual at cutover: `curl -I` / securityheaders.com check of the production host; submit a test RFQ to confirm bot protection and delivery.

## Notes
Security headers cannot be set by GitHub Pages; they are a production-host requirement and are verified only at cutover.
