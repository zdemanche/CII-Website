# Runbook: DNS cutover to the new forgemetal.com

Implements FR-010.A2, NFR-007 and US-012 AC-5. Host per ADR-0002 (Azure Static Web Apps, Proposed). Record times and results in the launch checklist.

## 0. Prerequisites (complete before T-48h)
- [ ] ADR-0002 is accepted and the host resource exists (SWA Standard, CII subscription).
- [ ] Registrar and DNS admin access for **forgemetal.com** and **consolindustries.com**. You know who hosts DNS and whether it supports ALIAS/ANAME at the apex.
- [ ] Admin access to the **current host** (login and FTP/panel). Agree it stays untouched for 30 days.
- [ ] Export the current DNS zones for both domains to a file and attach them to the change ticket. This is your rollback reference.
- [ ] RFQ Function deployed, Graph `sendMail` tested, Turnstile keys issued (ADR-0002). `PUBLIC_RFQ_ENDPOINT` is known.
- [ ] Privacy policy approved (NFR-005). Search Console baseline captured (`search-console.md` step 1).
- [ ] Change window agreed with CII. Not before a weekend; business hours ET with Zach on call.

## 1. T-48h: lower TTL
1. On the current DNS host, set the TTL to **300 s or less** on the `@` (apex) and `www` records for forgemetal.com. Do the same for any consolindustries.com web records that will change.
2. Write down the old TTL values so you can restore them in step 6.
3. Wait at least 48 h, or the old TTL if it is longer, so caches expire.
4. Check with `dig +noall +answer www.forgemetal.com` and `dig +noall +answer forgemetal.com`. The TTL column should be 300 or less.

## 2. Deploy the production build
```sh
git checkout main && git pull && npm ci
npx astro check
SITE_URL=https://www.forgemetal.com BASE_PATH=/ PUBLIC_RFQ_ENDPOINT=<function-url> npm run build   # DEMO unset
npm test                                                   # same env (DEMO unset)
ls dist/staticwebapp.config.json dist/robots.txt dist/sitemap-index.xml
grep -L 'name="robots"' dist/index.html                    # must print the file (no noindex)
```
Deploy `dist/` to the SWA production environment, using the SWA CLI with the deployment token or the manual workflow. Then smoke-test on the default `*.azurestaticapps.net` hostname by running the step 5 script with `SITE=https://<app>.azurestaticapps.net`.

## 3. Add the custom domains and verify ownership
1. In SWA, go to Custom domains and add **www.forgemetal.com**. Create the CNAME it asks for, `www -> <app>.azurestaticapps.net`. Wait for validation and the managed certificate.
2. Add **forgemetal.com** (apex). Create the TXT validation record, then wait for validation.
3. Set **www.forgemetal.com as the default domain**, so the apex and the azurestaticapps.net host redirect to it.

Pre-validation via TXT lets steps 1 and 2 finish before traffic moves. If www validation needs the live CNAME, do it in step 4.

## 4. Switch the records (start of change window)
| Name | Old | New |
|---|---|---|
| `www.forgemetal.com` | old host (A or CNAME) | `CNAME <app>.azurestaticapps.net` |
| `forgemetal.com` (apex) | old host A | `ALIAS/ANAME -> <app>.azurestaticapps.net` (or Azure DNS alias record) |

- Do **not** touch MX, SPF, DKIM, DMARC or any other mail and verification records on either domain.
- consolindustries.com: change web records only if ADR-0002 follow-up says so. Mail stays as is.
- Note the exact time of the switch.

## 5. Verification checklist (within 15 min of the switch, repeat at +2 h)
- [ ] Every legacy URL returns **301** to its target (script below, run from repo root):
```sh
SITE=${SITE:-https://www.forgemetal.com}
grep -oE "^ *'[^']+': *'[^']+'" src/data/redirects.ts | sed -E "s/^ *'([^']+)': *'([^'#]+).*/\1 \2/" |
while read -r from to; do
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$SITE$from")
  if [ "$out" = "301 $SITE$to" ]; then echo "OK   $from -> $SITE$to"
  else echo "FAIL $from -> $out (want 301 $SITE$to)"; fi
done | tee cutover-redirects.log
grep -c '^OK' cutover-redirects.log   # expect 23; any FAIL line blocks sign-off
```
- [ ] Each redirect target loads: `curl -sI "$SITE/company/"` returns 200. All 20 pages in `test/site.test.mjs` respond with 200.
- [ ] HTTPS: `curl -sI http://www.forgemetal.com/` and `curl -sI https://forgemetal.com/` both redirect to `https://www.forgemetal.com/`. The certificate is valid (browser padlock, or `openssl s_client -connect www.forgemetal.com:443 -servername www.forgemetal.com`).
- [ ] Headers: `curl -sI https://www.forgemetal.com/` shows `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `X-Frame-Options`. Securityheaders.com grade is A or better.
- [ ] 404: `curl -sI https://www.forgemetal.com/nope` returns 404 and serves the custom 404 page.
- [ ] RFQ: submit one test request marked "TEST - ignore". Confirm it arrives at info@consolindustries.com, that Turnstile/honeypot rejects a scripted POST, and that the form has no file input.
- [ ] Indexing: `robots.txt` shows `Allow: /` and `Sitemap: https://www.forgemetal.com/sitemap-index.xml`. `sitemap-index.xml` returns 200. The home page has no `noindex` meta and no demo banner.
- [ ] Mail still flows: send to and from info@consolindustries.com.
- [ ] Hand off to `search-console.md` step 2.

## Rollback (decide within 1 h; target under 15 min)
Trigger it if any of these happen: legacy 301s fail, the TLS certificate is not issued, the RFQ fails with no quick fix, or the site is down.
1. Restore the apex and `www` records to the values in the step 0 zone export. TTL is still 300 s.
2. Confirm with `dig` and `curl -sI` that the old site answers.
3. Leave the SWA resource and custom domain entries in place. Record the cause and fix it before rescheduling.
The old host must stay running and unchanged for **30 days** after cutover so this stays possible.

## 6. Post-cutover
- **+24 h, stable:** raise the TTL back to the old value, or 3600 s.
- **+7 days:** check the Search Console 404 report and add any missed legacy URLs to `src/data/redirects.ts`, then redeploy.
- **+30 days:** if there has been no rollback, decommission the old host:
  1. Take a final backup and archive it.
  2. Cancel the hosting plan.
  3. Remove stale DNS records.
  4. Close the change ticket.
