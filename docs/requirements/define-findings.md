# Define findings + requirement ID allocation

Inputs: source/test/NFR analyst reports (2026-10-12), `docs/source/legacy-site-audit.md` (content source of truth), `CLAUDE.md`.

## REQUIREMENT ID ALLOCATION

| ID | Slug | Title |
| --- | --- | --- |
| FR-001 | site-shell | Base layout, header (address + phone + RFQ button), real-link nav, footer, base-path-safe links, 404 |
| FR-002 | home | Home page: what CII forges, since 1948, entry points to Capabilities, Markets, Quality, RFQ |
| FR-003 | capabilities | Equipment spec tables, weight/plan-area limits by material, materials list, engineering, heat treat / NDT / cleaning / lab |
| FR-004 | markets-programs | Market pages (aircraft & rotorcraft, military & defense, turbine engine, industrial & transportation) + programs served |
| FR-005 | quality | Certifications, customer approvals (text only), quality & safety policy, SQAR + T&Cs documents |
| FR-006 | company | About (since 1948, mission/vision), AIAC group companies, memberships, news archive |
| FR-007 | careers | Open roles from data with empty state, benefits, apply path, EEO statement |
| FR-008 | contact-rfq | Contact details, map link-out + directions, RFQ form (no upload), secure-transfer guidance, validation + success/error states |
| FR-009 | legal-pages | Privacy policy, terms, export-control notice, HTML sitemap page |
| FR-010 | legacy-redirects | Redirect map for all 23 legacy URLs; demo meta-refresh stubs; production 301 config generated from same data |
| FR-011 | demo-review-mode | DEMO=1: noindex meta + robots disallow, demo banner, visible markers on unconfirmed facts, launch-checklist page listing them |
| FR-012 | build-deploy | GitHub Actions: build, check, test, deploy to GitHub Pages with SITE_URL/BASE_PATH/DEMO |
| NFR-001 | accessibility | WCAG 2.2 AA |
| NFR-002 | performance | Static output, Lighthouse ≥ 90 mobile, no render-blocking third-party scripts, optimized images |
| NFR-003 | security-export-control | No server code; no file upload; no CUI/technical data collected; HTTPS + security headers at production host; bot protection on production form |
| NFR-004 | seo | Unique title + description per page, canonical, sitemap, Organization/LocalBusiness JSON-LD, redirects preserve rankings |
| NFR-005 | privacy | Privacy policy covers RFQ data; no trackers in demo; analytics decision deferred |
| NFR-006 | maintainability-content-integrity | Typed content data in src/data; per-item `confirm` flag; no invented facts; TS strict; CI gate |
| NFR-007 | deployability | Demo on GitHub Pages under base path; production cutover via DNS with rollback (low TTL, old host retained 30 days) |
| NFR-008 | responsive-support | Reflow to 320 CSS px, current evergreen browsers (last 2 versions of Chrome, Edge, Firefox, Safari incl. iOS) |

## Resolved open questions (orchestrator defaults — confirm at sign-off)

1. **RFQ submission:** demo build validates client-side and shows a "demo — not sent" confirmation; nothing leaves the browser. Production endpoint (serverless function or form service → sales mailbox) decided at cutover (ADR). Fields: name*, company*, email*, phone, material/alloy*, part description*, approx. weight per part, annual quantity*, program/platform, required date, notes. No file input, ever.
2. **Secure-transfer link:** shown as guidance text; URL is a CONFIRM item.
3. **Unread pages** (turbine engine, transportation, industrial/commercial, continuous improvement): ship with only audited facts, flagged as content pending. Transportation + industrial/commercial merge into one page; continuous improvement folds into Quality.
4. **Legal text** (privacy, terms, export control, EEO): ship clearly labelled drafts flagged CONFIRM for CII/legal approval.
5. **PDFs:** not in repo; legacy PDF URLs redirect to the Quality documents section / Contact directions; documents listed as pending.
6. **Map:** address + link-out to map services; no embedded third-party script.
7. **Sitemap in demo:** generated but robots.txt disallows all; production robots.txt references sitemap.
8. **News:** shown as dated archive, newest first, with a note that news resumes at launch.
9. **CONFIRM items** carry `confirm: true` in data; DEMO renders a subtle marker and lists them on /launch-checklist; production build fails CI if a CONFIRM item would render unflagged (later gate).
10. **Program names & customer approvals:** text only, no logos.

## Test gaps to cover (test analyst)
Pages built; one h1; alt text; html lang; no zoom lock; internal links resolve under BASE_PATH; RFQ has no file input + required fields + labels + CUI notice; DEMO noindex + robots; redirect stub per legacy URL; sitemap; unique titles/descriptions; no Twitter link; current copyright year; skip link.
