/** Prefix an internal path with the Astro base path. `url('/quality/')` → `/CII-Website/quality/` on Pages. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

/** True when `current` is `href` or a child of it (for nav highlighting). */
export function isActive(current: string, href: string): boolean {
  const c = current.replace(/\/$/, '');
  const h = url(href).replace(/\/$/, '');
  return h !== '' && h !== import.meta.env.BASE_URL.replace(/\/$/, '') ? c === h || c.startsWith(h + '/') : c === h;
}
