/**
 * Grain-flow art. A forging's grain follows the part contour, bending around bosses and
 * bunching where metal is pushed hardest. We imitate that with streamlines of ideal flow
 * past cylinders (each boss is a doublet in the stream function), traced with RK4 at build
 * time and emitted as smooth cubic SVG paths. Deterministic: same input, same drawing.
 */
export interface Boss { x: number; y: number; r: number }
export interface GrainOptions { width: number; height: number; lines: number; bosses: Boss[]; tilt?: number }
export interface GrainArt { width: number; height: number; paths: string[]; bosses: Boss[] }

function psi(x: number, y: number, bosses: Boss[], tilt: number): number {
  let s = y + tilt * x;
  for (const b of bosses) {
    const dx = x - b.x, dy = y - b.y;
    const r2 = dx * dx + dy * dy;
    s -= (b.r * b.r * dy) / Math.max(r2, 1e-6);
  }
  return s;
}

function velocity(x: number, y: number, bosses: Boss[], tilt: number): [number, number] {
  const h = 0.5;
  const u = (psi(x, y + h, bosses, tilt) - psi(x, y - h, bosses, tilt)) / (2 * h);
  const v = -(psi(x + h, y, bosses, tilt) - psi(x - h, y, bosses, tilt)) / (2 * h);
  const m = Math.hypot(u, v) || 1;
  return [u / m, v / m];
}

function trace(x0: number, y0: number, o: GrainOptions): [number, number][] {
  const tilt = o.tilt ?? 0;
  const pts: [number, number][] = [[x0, y0]];
  let x = x0, y = y0;
  const ds = 3;
  for (let i = 0; i < 4000 && x < o.width + 20; i++) {
    const [k1x, k1y] = velocity(x, y, o.bosses, tilt);
    const [k2x, k2y] = velocity(x + (ds / 2) * k1x, y + (ds / 2) * k1y, o.bosses, tilt);
    const [k3x, k3y] = velocity(x + (ds / 2) * k2x, y + (ds / 2) * k2y, o.bosses, tilt);
    const [k4x, k4y] = velocity(x + ds * k3x, y + ds * k3y, o.bosses, tilt);
    x += (ds / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (ds / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    if (o.bosses.some((b) => Math.hypot(x - b.x, y - b.y) < b.r * 0.98)) break;
    if (i % 14 === 0) pts.push([x, y]);
  }
  pts.push([x, y]);
  return pts;
}

/** Catmull-Rom spline through points → cubic Bézier path. */
function smooth(p: [number, number][]): string {
  const f = (n: number) => String(Math.round(n));
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export function grainflow(o: GrainOptions): GrainArt {
  const paths: string[] = [];
  const pad = o.height * 0.35;
  for (let i = 0; i < o.lines; i++) {
    const t = (i + 0.5) / o.lines;
    // Seed lines on the left edge; ease spacing so lines bunch slightly toward the middle.
    const eased = 0.5 + (t - 0.5) * (0.85 + 0.15 * Math.abs(t - 0.5) * 2);
    const y0 = -pad + eased * (o.height + 2 * pad);
    const line = trace(-20, y0, o);
    const end = line[line.length - 1];
    // Keep only lines that make it across; a line that stalls at a boss reads as a glitch.
    if (line.length > 3 && end[0] >= o.width) paths.push(smooth(line));
  }
  return { width: o.width, height: o.height, paths, bosses: o.bosses };
}

/** Preset compositions so each section gets its own drawing. */
export const presets: Record<string, GrainOptions> = {
  hero: { width: 1200, height: 760, lines: 40, bosses: [{ x: 640, y: 330, r: 118 }, { x: 960, y: 520, r: 64 }, { x: 1080, y: 210, r: 38 }] },
  capabilities: { width: 1200, height: 320, lines: 22, bosses: [{ x: 820, y: 170, r: 70 }, { x: 1040, y: 120, r: 30 }] },
  markets: { width: 1200, height: 320, lines: 22, bosses: [{ x: 760, y: 190, r: 52 }, { x: 960, y: 130, r: 52 }] },
  quality: { width: 1200, height: 320, lines: 22, bosses: [{ x: 900, y: 160, r: 84 }] },
  company: { width: 1200, height: 320, lines: 22, bosses: [{ x: 700, y: 210, r: 40 }, { x: 860, y: 130, r: 60 }, { x: 1060, y: 220, r: 36 }] },
  careers: { width: 1200, height: 320, lines: 22, bosses: [{ x: 980, y: 150, r: 66 }] },
  contact: { width: 1200, height: 320, lines: 22, bosses: [{ x: 840, y: 150, r: 46 }, { x: 1000, y: 210, r: 46 }] },
  plain: { width: 1200, height: 320, lines: 22, bosses: [{ x: 1000, y: 160, r: 40 }] },
};
