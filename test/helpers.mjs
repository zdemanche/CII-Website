import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('..', import.meta.url));
export const dist = join(root, process.env.DIST_DIR || 'dist');
export const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
export const demo = process.env.DEMO === '1';

export function walk(dir = dist, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}
export const read = (p) => readFileSync(p, 'utf8');
export const rel = (p) => '/' + relative(dist, p).replace(/index\.html$/, '');
export const isStub = (html) => /http-equiv="refresh"/.test(html);
/** Content pages: everything except legacy redirect stubs. */
export const pages = () => walk().filter((p) => !isStub(read(p)));
export const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

/** Resolve an internal href against dist; returns true if it maps to a built file. */
export function resolves(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean.startsWith(base)) return false;
  const path = clean.slice(base.length);
  const candidates = [join(dist, path), join(dist, path, 'index.html'), join(dist, path + '.html')];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}
