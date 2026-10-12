import type { ImageMetadata } from 'astro';

/** Photos from the legacy forgemetal.com site, keyed by file slug in src/assets/photos. */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

const alt: Record<string, string> = {
  'press-floor': 'Large blue forging press on the Consolidated Industries shop floor',
  'hammer-cell': 'Forging hammer cell with blue press frame and safety striping',
  'heat-treat-line': 'Glowing forgings moving through the heat treat line',
  'fpi-inspection': 'Forgings under ultraviolet light during fluorescent penetrant inspection',
  'lab-testing': 'Forging clamped in a test fixture in the in-house laboratory',
  deburring: 'Technician in gloves deburring aluminum forgings',
  'laser-scanning': 'Engineer laser-scanning a forged part on an inspection arm',
  'deform-simulation': 'DEFORM process simulation of a forging on a laptop screen',
  'hot-forging': 'Red-hot forgings fresh from the die',
  'bar-stock': 'Racks of metal bar stock ready for forging',
  team: 'Consolidated Industries team outside the Cheshire, Connecticut plant',
  'shop-presses': 'Row of blue forging presses inside the plant',
  'plaque-aia': 'Aerospace Industries Association membership plaque',
  'plaque-fia': 'Forging Industry Association membership plaque',
  'plaque-madeinct': 'Made in CT program certificate',
  'plaque-fdmc': 'Forging Defense Manufacturing Consortium membership plaque',
  'cert-amtivo': 'Amtivo certificate of registration for AS9100 and ISO 9001',
  'cert-nadcap-ndt': 'NADCAP accreditation certificate for nondestructive testing',
  'cert-nadcap-ht': 'NADCAP accreditation certificate for heat treating',
  'part-aluminum-handle': 'Pair of forged aluminum handles for aircraft',
  'part-aluminum-structural': 'Large forged aluminum structural aircraft parts',
  'part-uh60-rotor-link': 'Forged rotor links for the UH-60 Black Hawk helicopter',
  'part-large-titanium': 'Large titanium forgings including clevis and lug shapes',
  'part-small-titanium': 'Assorted small titanium forgings',
  'part-missile-aluminum': 'Forged aluminum missile components',
  'part-medium-steel': 'Medium-size steel forgings for defense applications',
  'part-small-steel': 'Assorted small steel forgings',
  'part-steel-fittings': 'Small forged steel fittings',
  'part-hastx-nozzle': 'Forged Hastelloy X power-generation turbine nozzles',
  'part-nozzles': 'Forged stainless steel fuel nozzles',
  'part-vanes-nozzles': 'Forged power-generation vanes and nozzles',
  'part-737-attach-bolt': 'Forged Inconel 718 engine attach bolts for the Boeing 737',
  'part-small-aluminum-valves': 'Small forged aluminum valve bodies',
  'part-large-aluminum-valves': 'Large forged aluminum valve bodies',
  'part-f15-fuel-injector-valve': 'Forged fuel injector valve bodies for the F-15',
  'part-valves-cranks': 'Forged aluminum valves and cranks',
  'part-magnesium': 'Magnesium forgings including a forged ring',
  'part-magnesium-2': 'Assorted magnesium forgings',
  'part-aa01': 'Forged valve and actuator bodies',
  'part-aa03': 'Forged steel housings with bored ends',
};

export interface Photo { src: ImageMetadata; alt: string }
export const photos: Record<string, Photo> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.jpg$/, '');
    if (!alt[slug]) throw new Error(`photos.ts: missing alt text for ${slug}`);
    return [slug, { src: mod.default, alt: alt[slug] }];
  }),
);
export const photo = (slug: string): Photo => {
  const p = photos[slug];
  if (!p) throw new Error(`Unknown photo: ${slug}`);
  return p;
};
