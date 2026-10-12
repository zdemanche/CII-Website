// Accessibility gate: axe-core WCAG 2.2 AA scan of every content page at desktop and phone widths.
// Usage: serve dist (e.g. `npx astro preview --port 4321`), then `node test/a11y.mjs [baseUrl]`.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pages, rel } from './helpers.mjs';

const origin = process.argv[2] || 'http://localhost:4321';
const paths = pages().map(rel).filter((p) => !p.includes('launch-checklist'));
const browser = await chromium.launch();
let failures = 0;
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  for (const path of paths) {
    await page.goto(origin + path, { waitUntil: 'networkidle' });
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    for (const v of violations) {
      failures++;
      console.error(`✗ ${width}px ${path} ${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    }
  }
  await context.close();
}
await browser.close();
console.log(failures ? `${failures} accessibility violations` : `✓ ${paths.length} pages × 2 widths: no axe violations`);
process.exit(failures ? 1 : 0);
