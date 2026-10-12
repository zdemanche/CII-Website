# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in
this repository.

## What this is

Rebuild of the Consolidated Industries, Inc. site (forgemetal.com): aerospace/defense forgings, Cheshire CT, since 1948. It replaces a 2016 PHP site. A demo is served from GitHub Pages first; later DNS cutover to `https://www.forgemetal.com` (base `/`). The project is early (v0.1.0): only `src/pages/index.astro` and a smoke test exist, so much of the structure below is intended, not yet built.

## Commands

```
npm install
npm run dev        # astro dev
npm run build      # outputs dist/
npm run check      # astro check (TypeScript strict)
npm test           # node --test test/*.test.mjs
```

- Tests inspect `dist/`, so run `npm run build` before `npm test`.
- Single test file: `node --test test/build.test.mjs`. Single test by name: `node --test --test-name-pattern="<name>" test/*.test.mjs`.
- Demo builds set env vars read by `astro.config.mjs`: `SITE_URL`, `BASE_PATH`, and `DEMO=1` (noindex). Defaults are `https://www.forgemetal.com` and `/`.
- Not configured yet: lint/format, CI workflow, redirects, noindex mechanism. Do not assume they exist.

## Stack

Astro 7.3 with `@astrojs/sitemap`, TypeScript strict, Node >=20, ESM. Styling is plain CSS design tokens in `src/styles`. There is no Tailwind and no UI framework, so do not add one.

## Architecture

Static site. Content is typed data, not CMS or markdown prose, so pages stay thin.

- `src/data/*.ts`: all content as TypeScript (company facts, capabilities, certifications, markets, programs, news, jobs, `redirects.ts`). Pages and components render from here.
- `src/layouts`: the Base layout owns head/meta (including the DEMO noindex robots meta), header and footer. Every page uses it.
- `src/pages`: routes. `src/components`: shared UI.
- `src/styles`: tokens plus global CSS.
- `public`: static assets and `robots.txt` (must disallow all when `DEMO=1`).
- `test`: post-build HTML checks against `dist/`.
- `docs`: requirements, design, ADRs, and `sdlc-metadata.yml`. Never hand-edit the metadata; use the SDLC plugin's state script.
- `.github/workflows`: CI and Pages deploy (to be created).

Two deployment modes drive the design:

- Demo (GitHub Pages): non-root `BASE_PATH`, `DEMO=1`, noindex, and no server redirects.
- Production (forgemetal.com): base `/`, indexable, real 301s from the host.

## Rules to enforce

- **Base path:** every internal link and asset goes through an `import.meta.env.BASE_URL` helper. Never hardcode a leading `/`.
- **Redirects:** every legacy `.php` URL and PDF from the old site gets an entry in `src/data/redirects.ts`. GitHub Pages cannot send 301s, so the demo generates meta-refresh stub pages from that list. The production host does real 301s at cutover.
- **Noindex:** when `DEMO=1`, emit a robots meta tag and a `robots.txt` that disallows all.
- **RFQ form:** it must NOT accept file uploads. It tells buyers that export-controlled/CUI drawings go through CII's secure transfer link.
- **Accessibility (WCAG 2.2 AA):** real alt text, exactly one `h1` per page, visible focus, `prefers-reduced-motion` respected, no zoom lock in the viewport meta.
- **Content integrity:** facts come only from the audited old site. Flag unconfirmed facts in docs rather than inventing them. No fake stats, testimonials or customer logos.
