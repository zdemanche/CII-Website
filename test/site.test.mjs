import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { dist, base, demo, walk, read, rel, pages, strip, resolves, isStub } from './helpers.mjs';

const expected = ['/', '/capabilities/', '/capabilities/materials/', '/capabilities/engineering/', '/capabilities/finishing/',
  '/markets/', '/markets/aircraft/', '/markets/defense/', '/markets/turbine-engine/', '/markets/industrial/', '/markets/programs/',
  '/quality/', '/company/', '/company/news/', '/careers/', '/contact/', '/privacy/', '/terms/', '/export-control/', '/sitemap/'];

test('build output exists (FR-012)', () => assert.ok(existsSync(join(dist, 'index.html')), 'run `npm run build` first'));

test('every planned page is built (FR-001..009)', () => {
  const built = new Set(pages().map(rel));
  for (const p of expected) assert.ok(built.has(p), `missing page ${p}`);
  assert.ok(existsSync(join(dist, '404.html')), 'missing 404');
});

test('each page: lang, one h1, viewport without zoom lock, unique title + description (NFR-001, NFR-004)', () => {
  const titles = new Map();
  for (const f of pages()) {
    const h = read(f), r = rel(f);
    assert.match(h, /<html lang="en"/, `${r} lang`);
    assert.equal((h.match(/<h1[\s>]/g) || []).length, 1, `${r} must have exactly one h1`);
    const vp = h.match(/<meta name="viewport" content="([^"]+)"/)?.[1] ?? '';
    assert.ok(vp && !/maximum-scale|user-scalable=no/.test(vp), `${r} viewport must not lock zoom`);
    const t = h.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(t, `${r} title`);
    assert.ok(/<meta name="description" content="[^"]{30,}"/.test(h), `${r} needs a description`);
    if (!r.includes('launch-checklist') && r !== '/404.html') {
      assert.ok(!titles.has(t), `${r} duplicates title of ${titles.get(t)}`);
      titles.set(t, r);
    }
  }
});

test('skip link and main landmark on every page (NFR-001)', () => {
  for (const f of pages()) {
    const h = read(f);
    assert.match(h, /class="skip-link" href="#main"/, `${rel(f)} skip link`);
    assert.match(h, /<main id="main"/, `${rel(f)} main`);
  }
});

test('images have alt text; no lorem or generic alt (NFR-001)', () => {
  for (const f of pages()) {
    for (const img of read(f).match(/<img\b[^>]*>/g) || []) {
      const alt = img.match(/alt="([^"]*)"/);
      assert.ok(alt, `${rel(f)} img missing alt: ${img}`);
      assert.ok(!/lorem|vestibulum|^image$|^photo$/i.test(alt[1]), `${rel(f)} bad alt "${alt[1]}"`);
    }
  }
});

test('internal links and assets resolve under BASE_PATH (FR-001)', () => {
  const bad = [];
  for (const f of pages()) {
    const h = strip(read(f));
    for (const [, url] of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
      if (!resolves(url)) bad.push(`${rel(f)} → ${url}`);
    }
  }
  assert.deepEqual(bad, [], 'broken internal links');
});

test('no placeholder "#" nav links and no Twitter link (FR-001)', () => {
  for (const f of pages()) {
    const h = read(f);
    assert.ok(!/href="#"/.test(h), `${rel(f)} has href="#"`);
    assert.ok(!/twitter\.com|x\.com\//.test(h), `${rel(f)} links Twitter/X`);
  }
});

test('footer shows current year and address (FR-001)', () => {
  const h = read(join(dist, 'index.html'));
  assert.ok(h.includes(`© ${new Date().getFullYear()}`), 'copyright year');
  assert.ok(h.includes('677 Mixville Road'), 'address');
  assert.ok(!h.includes('2016 Consolidated'), 'stale copyright');
});

test('Organization JSON-LD present (FR-001.A1, NFR-004)', () => {
  const h = read(join(dist, 'index.html'));
  const ld = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(ld.name, 'Consolidated Industries, Inc.');
  assert.equal(ld.address.postalCode, '06410');
});

test('RFQ form: no file upload, required fields labelled, CUI notice (FR-008, NFR-003)', () => {
  const h = read(join(dist, 'contact', 'index.html'));
  const form = h.match(/<form[\s\S]*?<\/form>/)[0];
  assert.ok(!/type="file"|multipart\/form-data|\saccept=/.test(form), 'form must not accept files');
  for (const id of ['name', 'company', 'email', 'material', 'description', 'quantity']) {
    assert.match(form, new RegExp(`id="${id}"[^>]*required|required[^>]*id="${id}"`), `${id} required`);
  }
  for (const [, id] of form.matchAll(/<(?:input|select|textarea)[^>]*id="([^"]+)"/g)) {
    assert.match(form, new RegExp(`<label for="${id}"`), `${id} needs a label`);
  }
  assert.match(h, /Do not include drawings or controlled technical data/);
  assert.match(h, /secure transfer link/);
});

test('every legacy URL has a redirect stub to a real page (FR-010)', async () => {
  const { redirects } = await import('../src/data/redirects.ts').catch(async () => {
    const src = readFileSync(new URL('../src/data/redirects.ts', import.meta.url), 'utf8');
    return { redirects: Object.fromEntries([...src.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]])) };
  });
  const audit = readFileSync(new URL('../docs/source/legacy-site-audit.md', import.meta.url), 'utf8');
  const legacy = audit.split('## Legacy URLs')[1].split('##')[0].match(/\/[a-z0-9-]+\.(?:php|pdf)/g);
  assert.equal(legacy.length, 23);
  for (const from of legacy) {
    assert.ok(redirects[from], `no redirect for ${from}`);
    const stub = join(dist, from.slice(1), 'index.html');
    assert.ok(existsSync(stub), `no stub for ${from}`);
    const target = read(stub).match(/url=([^"]+)"/)[1];
    assert.ok(target.startsWith(base), `${from} target not under base`);
    assert.ok(resolves(target), `${from} → ${target} does not resolve`);
  }
  const rules = read(join(dist, '_redirects'));
  for (const from of legacy) assert.ok(rules.includes(`${from}  `), `_redirects missing ${from}`);
  assert.match(read(join(dist, '_headers')), /Strict-Transport-Security/);
});

test('sitemap excludes stubs and checklist (NFR-004)', () => {
  const sm = read(join(dist, 'sitemap-0.xml'));
  assert.ok(!/\.php|\.pdf|launch-checklist/.test(sm), 'sitemap lists stubs');
  assert.ok(sm.includes('/capabilities/'));
});

test('demo vs production indexing (FR-011)', () => {
  const robots = read(join(dist, 'robots.txt'));
  const home = read(join(dist, 'index.html'));
  const checklist = existsSync(join(dist, 'launch-checklist', 'index.html'));
  if (demo) {
    assert.match(robots, /Disallow: \//);
    assert.match(home, /<meta name="robots" content="noindex/);
    assert.ok(checklist, 'demo needs launch checklist');
    assert.match(home, /data-confirm=/, 'demo shows confirm markers');
  } else {
    assert.match(robots, /Allow: \/[\s\S]*Sitemap:/);
    assert.ok(!/<meta name="robots"/.test(home), 'production home must be indexable');
    assert.ok(!checklist, 'checklist must not ship to production');
    assert.ok(!/data-confirm=/.test(home), 'production must not show confirm markers');
  }
});

test('no third-party scripts or trackers (NFR-005)', () => {
  for (const f of pages()) {
    for (const [, src] of read(f).matchAll(/<script[^>]*src="([^"]+)"/g)) {
      assert.ok(src.startsWith(base), `${rel(f)} loads external script ${src}`);
    }
  }
});

test('external links opened in new tabs use rel=noopener (NFR-003)', () => {
  for (const f of pages()) {
    for (const a of read(f).match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) {
      assert.match(a, /rel="[^"]*noopener/, `${rel(f)}: ${a}`);
    }
  }
});
