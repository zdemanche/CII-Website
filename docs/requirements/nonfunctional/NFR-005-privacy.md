---
id: "NFR-005"
title: "Privacy (policy, no trackers in demo)"
type: "nonfunctional"
category: "security"
focus_track: "security"
priority: "P1"
status: "approved"
version: "1.0"
created: "2026-10-12"
author: "requirement-author-agent"
reviewer: "requirement-reviewer-agent"
source_files: ["CLAUDE.md", "docs/source/legacy-site-audit.md", "docs/requirements/define-findings.md", "src/pages/privacy.astro", "src/data/legal.ts"]
test_files: ["test/privacy.test.mjs"]
verification_method: "test"
---

# NFR-005: Privacy (policy, no trackers in demo)

## Description
The legacy site has no privacy policy. The rebuild collects personal data only through the RFQ form (name, company, email, phone) and must disclose that clearly, collect no more than needed, and set no tracking by default (ISO/IEC 27001 confidentiality, personal-data handling).

## Measurable criteria
- A privacy policy page exists, is linked from the footer of every page, and covers: what RFQ data is collected, purpose (responding to quotes), recipient (CII sales mailbox / form processor), retention period, contact for access/deletion requests, and that no CUI/export-controlled data should be submitted.
- The policy text ships as a draft flagged `confirm: true` for CII/legal approval (define-findings #4); a production build must not render it unflagged until approved.
- Demo build contains zero trackers: no analytics, pixels, tag managers, social widgets, embedded maps or third-party fonts; no cookies set; no `localStorage` writes.
- The Twitter link and social embeds from the legacy site are absent.
- Analytics decision is deferred: if added later it must be privacy-respecting (cookieless or consent-gated) and recorded in an ADR plus a policy update before enabling.
- RFQ form states, next to the submit button, a link to the privacy policy.

## Verification
- Post-build tests in `test/privacy.test.mjs`: footer link to privacy page on every page, no external script/img/iframe/font origins, no "twitter.com"/"x.com" links, RFQ page links to privacy policy, privacy page contains required headings.
- CI step (FR-012): `npm test` after build.
- Manual at cutover: legal/CII sign-off of policy text and retention period; browser DevTools check that no cookies or third-party requests occur on first load.

## Notes
Retention period and RFQ recipient are not in the audit; they are CONFIRM items.
