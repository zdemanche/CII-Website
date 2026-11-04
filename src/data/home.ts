import { company } from './company';
import { hammers, presses } from './capabilities';

const years = new Date().getFullYear() - company.founded;
/** "over 70 years" style figure: rounded down to the decade so it is always true. */
export const decades = Math.floor(years / 10) * 10;
const maxPress = Math.max(...presses.map((p) => p.tons)).toLocaleString('en-US');
const maxHammer = hammers.range.split(' to ').pop();

export interface SlideAction { href: string; label: string; primary?: boolean }
export interface Slide { photo: string; title: string; body: string; actions: SlideAction[] }

/** Home hero carousel. First slide carries the page h1. Photos must be >= 1600px wide: the slide is full-bleed. */
export const slides: Slide[] = [
  {
    photo: 'hero-f35-formation',
    title: `Excellence in aerospace forging for over ${decades} years`,
    body: `Precision aerospace and commercial forgings in titanium, aluminum, steel and nickel alloys. Consolidated Industries serves the global marketplace as a preferred supplier in the design, manufacture and support of high-technology forging applications, from Cheshire, Connecticut, since ${company.founded}.`,
    actions: [
      { href: '/markets/aircraft/', label: 'Aircraft forgings', primary: true },
      { href: '/capabilities/', label: 'Forging capabilities' },
    ],
  },
  {
    photo: 'hero-rocket-launch-night',
    title: 'Innovation at work: a better process means better parts',
    body: 'We keep a rigorous culture of continuous improvement in every part of the business, from DEFORM simulation before tooling is cut to NADCAP-accredited heat treating and testing in house.',
    actions: [
      { href: '/quality/#improvement', label: 'Continuous improvement', primary: true },
      { href: '/company/', label: 'About us' },
    ],
  },
];

export interface Pillar { icon: 'plane' | 'shapes' | 'factory' | 'compass'; title: string; body: string; href: string; link: string }

/** "Market experience" cards: the four entry points buyers ask for first. */
export const pillars: Pillar[] = [
  { icon: 'plane', title: 'Aerospace', body: 'End-use applications and the commercial and military aircraft programs we have supplied.', href: '/markets/programs/', link: 'Programs served' },
  { icon: 'shapes', title: 'Parts we make', body: 'Flight-critical forgings for aircraft, warships, armored vehicles, engines and guided munitions.', href: '/markets/', link: 'Markets and parts' },
  { icon: 'factory', title: 'Forging process', body: `Open- and closed-die forging on hammers to ${maxHammer} and presses to ${maxPress} tons, with heat treat and testing in house.`, href: '/capabilities/', link: 'Equipment and process' },
  { icon: 'compass', title: 'Engineering services', body: 'Forging design and redesign, DEFORM process simulation, metal-flow analysis and laser scanning.', href: '/capabilities/engineering/', link: 'Engineering services' },
];
