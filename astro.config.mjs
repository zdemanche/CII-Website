// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages demo sets SITE_URL + BASE_PATH in CI; production (forgemetal.com) uses root.
const site = process.env.SITE_URL || 'https://www.forgemetal.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
