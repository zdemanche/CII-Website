# ADR-0001: Static Astro site, plain CSS tokens, grain-flow visual identity

- Status: Accepted (2026-10-12; design sign-off waived by project owner)
- Context: Replace the 2016 PHP forgemetal.com. Demo on GitHub Pages, production host chosen at cutover. Requirements FR-001..012, NFR-001..008.

## Decision
1. **Astro 7 static output**, no client framework. Content in typed `src/data/*.ts`. Small vanilla scripts only for the mobile menu and RFQ validation.
2. **Plain CSS design tokens** (`src/styles/tokens.css`), self-hosted Archivo variable font (`@fontsource-variable/archivo`, wdth + wght axes) — no third-party requests.
3. **Two build modes** from env: `DEMO=1` (noindex, preview banner, unconfirmed-fact markers, `/launch-checklist/`) and production (indexable, `_redirects` + `_headers` emitted for the host).
4. **Legacy redirects** from one data file: demo = meta-refresh stub at `<legacy-path>/index.html`; production = `_redirects` 301 rules.
5. **RFQ** posts to `PUBLIC_RFQ_ENDPOINT` when set; otherwise (demo) validates and confirms locally without sending. No file input ever.

## Visual direction
- **Signature:** procedurally generated grain-flow lines (stream function of flow past die bosses, contoured by marching squares at build time) tinted with steel temper colors. It is the one bold element; everything else is quiet.
- **Palette:** steel ink `#17202B`, mill scale `#EEF1F3`, aluminum rule `#C7CED5`, white `#FFFFFF`, temper blue `#2B55A3` (links/CTA), straw `#C2902F` (sparing highlight).
- **Type:** Archivo only — expanded width (wdth 118–125) for display, 100 for body, 75 condensed for spec-table headers and data; tabular figures in tables.
- **Layout:** left-aligned 12-column grid, max text measure ~68ch, spec content as real tables, numbered markers only for the forging process sequence.

## Consequences
- No server code to patch; production headers/301s depend on the host chosen in the cutover ADR.
- No photography until the shoot (issue #13); grain-flow art carries the visuals meanwhile.
