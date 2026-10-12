// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// GitHub Pages demo sets SITE_URL + BASE_PATH (+ DEMO=1) in CI; production (forgemetal.com) uses root.
const site = process.env.SITE_URL || 'https://www.forgemetal.com';
const base = process.env.BASE_PATH || '/';

/**
 * Emits host-neutral production artifacts from src/data/redirects.ts:
 *  - `_redirects`: one 301 rule per legacy URL (Netlify / Cloudflare Pages / Azure SWA-convertible format)
 *  - `_headers`: security headers for the production host (NFR-003)
 *  - `staticwebapp.config.json`: Azure Static Web Apps routes (301s) + globalHeaders (ADR-0002)
 * GitHub Pages ignores all three; the demo uses meta-refresh stubs instead.
 */
function hostArtifacts() {
  return {
    name: 'cii-host-artifacts',
    hooks: {
      /** @param {{ dir: URL }} args */
      'astro:build:done': async ({ dir }) => {
        const src = await import('./src/data/redirects.ts').catch(() => null);
        /** @type {Record<string,string>} */
        const map = src?.redirects ?? {};
        const lines = Object.entries(map).map(([from, to]) => `${from}  ${to.split('#')[0]}  301`);
        await writeFile(fileURLToPath(new URL('_redirects', dir)), `# Generated from src/data/redirects.ts\n${lines.join('\n')}\n`);
        const csp = [
          "default-src 'self'",
          "img-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          "script-src 'self' 'unsafe-inline'",
          "font-src 'self'",
          "connect-src 'self'" + (process.env.PUBLIC_RFQ_ENDPOINT ? ` ${new URL(process.env.PUBLIC_RFQ_ENDPOINT).origin}` : ''),
          "form-action 'self'" + (process.env.PUBLIC_RFQ_ENDPOINT ? ` ${new URL(process.env.PUBLIC_RFQ_ENDPOINT).origin}` : ''),
          "frame-ancestors 'none'",
          "base-uri 'self'",
        ].join('; ');
        /** One security-header set for every host format (NFR-003). @type {Record<string,string>} */
        const securityHeaders = {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Content-Security-Policy': csp,
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          'X-Frame-Options': 'DENY',
        };
        const headers = ['/*', ...Object.entries(securityHeaders).map(([k, v]) => `  ${k}: ${v}`)];
        await writeFile(fileURLToPath(new URL('_headers', dir)), headers.join('\n') + '\n');
        // Azure Static Web Apps (ADR-0002): same redirects and headers; no navigationFallback (static site, real 404s).
        const swa = {
          routes: Object.entries(map).map(([from, to]) => ({ route: from, redirect: to.split('#')[0], statusCode: 301 })),
          responseOverrides: { 404: { rewrite: '/404.html' } },
          globalHeaders: securityHeaders,
        };
        await writeFile(fileURLToPath(new URL('staticwebapp.config.json', dir)), JSON.stringify(swa, null, 2) + '\n');
      },
    },
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\.(php|pdf)\/?$/.test(page) && !page.includes('/launch-checklist'),
    }),
    hostArtifacts(),
  ],
});
