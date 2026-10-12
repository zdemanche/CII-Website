# ADR-0002: Production hosting for forgemetal.com

- Status: Proposed (2026-10-12), pending CII IT and owner approval
- Context: ADR-0001 left the production host open. GitHub Pages serves the demo only. Production must send real 301s for the 23 legacy URLs (FR-010.3), send security headers and HTTPS only (NFR-003), allow a DNS rollback within 15 minutes (NFR-007), and give the RFQ form a real endpoint with bot protection (FR-010.A3).
- Related: FR-008, FR-010, FR-012.4, NFR-003, NFR-005, NFR-007, US-012

## Options

| | Azure Static Web Apps | Netlify | GitHub Pages (as is) |
|---|---|---|---|
| Fit with CII IT | Same tenant as Microsoft 365, Entra ID and Intune. Billing, RBAC and audit logs are already in place | New vendor account and billing outside the Microsoft stack | Already used for the demo |
| Cost | Free tier (2 custom domains, no SLA) or Standard (about $9/month per app, SLA, more domains). Confirm current pricing | Free Starter; Pro per member per month | Free |
| Custom domain + TLS | Yes, managed certificates for www and apex | Yes, managed Let's Encrypt | Yes, but one domain only |
| 301 redirects | `routes[]` with `statusCode: 301` in `staticwebapp.config.json` | Native `_redirects` | **No.** Meta-refresh stubs only |
| Security headers | `globalHeaders` in the same file | Native `_headers` | **No.** Headers can't be set |
| RFQ endpoint | Azure Functions (managed API on Standard, or a linked Function App) | Netlify Forms or Functions | None. Needs a third-party form service |
| Access control | Entra ID RBAC on the resource group | Netlify team accounts | GitHub repo permissions |

GitHub Pages is **not suitable for production**: it can't send 301s or security headers, so it fails FR-010.3 and NFR-003. It stays the demo host.

## Decision (proposed)
1. **Host on Azure Static Web Apps (Standard tier)** in a CII-owned subscription and resource group.
   - The build already emits `dist/staticwebapp.config.json` from `src/data/redirects.ts`. It contains one 301 route per legacy URL, `globalHeaders` built from the same header set as `_headers`, and a 404 override to `/404.html`.
   - `navigationFallback` stays unset. This is a static multi-page site, so unknown paths must return a real 404.
   - `_redirects` and `_headers` are still generated. That keeps Netlify or Cloudflare Pages open as a fallback with no code change.
2. **RFQ goes to a small Azure Function.**
   - It accepts only the FR-008 fields. It rejects any file part or multipart file, enforces a maximum length per field and a total body limit, and returns JSON.
   - It sends the request to info@consolindustries.com (CONFIRM recipient, FR-008) through **Microsoft Graph `sendMail`**. It uses an app registration with `Mail.Send` (application), limited to one sending mailbox by an Exchange application access policy.
   - The secret lives in app settings or Key Vault, never in the repo.
   - Fallback: a hosted form service with no file uploads, US data residency and a signed DPA. This needs a privacy policy update.
   - The site points at the endpoint with `PUBLIC_RFQ_ENDPOINT`. The build already adds that origin to the CSP `connect-src` and `form-action`.
3. **Bot protection uses Cloudflare Turnstile**, with the token verified server-side in the Function (`siteverify`), plus a hidden honeypot field and per-IP rate limiting.
4. **Deployment:** production deploys stay manual (FR-012.4). Run `npm run build` with production env, then deploy `dist/` with the SWA CLI or a manually triggered workflow that uses a deployment token held by CII IT. The demo workflow keeps deploying only to GitHub Pages.

## Consequences
- Positive: real 301s, HSTS and CSP at the edge. Access, billing and audit all sit in Entra and Azure, where CII IT already works. No server code in the static site. The RFQ Function is the only runtime code.
- Rollback stays a DNS revert. The old host is kept 30 days (see `docs/runbooks/dns-cutover.md`).
- Turnstile loads a third-party script from `challenges.cloudflare.com`. Before enabling it:
  - Add that origin to CSP `script-src` and `frame-src`.
  - Allowlist it in the "no third-party scripts" test, for production builds only.
  - Disclose it in the privacy policy (NFR-005).
  - The demo stays free of third parties. If that is not acceptable, use honeypot plus rate limiting only.
- The Function adds patching, secret rotation and monitoring (Application Insights) to CII IT's workload.
- Azure SWA quirks to verify at setup:
  - The apex domain needs Azure DNS or a registrar that supports ALIAS/ANAME/CNAME flattening.
  - Route matching is case-insensitive.
  - The config file must be at the root of the deployed output (it is: `dist/`).

## Needed from CII IT
- [ ] An Azure subscription and resource group for the site. Name owners and approve the Standard tier cost.
- [ ] Registrar and DNS access for **forgemetal.com** and **consolindustries.com**. Say who hosts DNS today and whether it supports ALIAS records.
- [ ] Admin access to the current forgemetal.com host. It stays up 30 days after cutover.
- [ ] Confirm the RFQ recipient mailbox (info@consolindustries.com) and a sending mailbox for Graph.
- [ ] Approve the Entra app registration with `Mail.Send` and the Exchange application access policy that limits it to the sending mailbox.
- [ ] A Cloudflare account for the Turnstile site key and secret, or a decision to use honeypot plus rate limiting only.
- [ ] Decide whether consolindustries.com serves or redirects any website. Its MX, SPF, DKIM and DMARC records must not change.
- [ ] Approve the privacy policy text, including the RFQ processor and retention period (NFR-005).
- [ ] Access to Google Search Console and Bing Webmaster Tools (see `docs/runbooks/search-console.md`).
