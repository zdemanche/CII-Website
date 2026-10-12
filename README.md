# Consolidated Industries, Inc. — website rebuild

Replacement for the 2016 forgemetal.com site. Static Astro build, previewed on GitHub Pages, later cut over to forgemetal.com via DNS.

- **Stack:** Astro, plain CSS design tokens, TypeScript content data, GitHub Actions → GitHub Pages
- **Planned:** RFQ form (no file upload — export-controlled drawings go through CII's secure transfer), capability spec tables, certifications, markets and programs, careers, news, WCAG 2.2 AA, 301 redirects for every legacy `.php` URL

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm test         # post-build checks
```
