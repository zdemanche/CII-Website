import { capabilityLinks, marketLinks } from './sections';

export interface NavLink { href: string; label: string }
/** Top-level item; `children` renders as a dropdown (desktop) or accordion (phone). The parent is always a real page. */
export interface NavItem extends NavLink { children?: NavLink[] }

export const mainNav: NavItem[] = [
  { href: '/capabilities/', label: 'Capabilities', children: capabilityLinks },
  { href: '/markets/', label: 'Markets', children: marketLinks.filter((l) => l.href !== '/markets/') },
  { href: '/quality/', label: 'Quality', children: [
    { href: '/quality/#certs', label: 'Certifications' },
    { href: '/quality/#approvals', label: 'Customer approvals' },
    { href: '/quality/#improvement', label: 'Continuous improvement' },
    { href: '/quality/#documents', label: 'Supplier documents' },
  ]},
  { href: '/company/', label: 'Company', children: [
    { href: '/company/', label: 'About us' },
    { href: '/company/#mission', label: 'Mission and vision' },
    { href: '/company/#group', label: 'Related companies' },
    { href: '/company/#memberships', label: 'Memberships' },
    { href: '/company/news/', label: 'News' },
  ]},
  { href: '/careers/', label: 'Careers' },
];

export const footerNav = [
  { heading: 'Capabilities', links: [
    { href: '/capabilities/', label: 'Forging equipment' },
    { href: '/capabilities/materials/', label: 'Materials' },
    { href: '/capabilities/engineering/', label: 'Engineering' },
    { href: '/capabilities/finishing/', label: 'Heat treat, NDT and lab' },
  ]},
  { heading: 'Markets', links: [
    { href: '/markets/aircraft/', label: 'Aircraft and rotorcraft' },
    { href: '/markets/defense/', label: 'Military and defense' },
    { href: '/markets/turbine-engine/', label: 'Turbine engine' },
    { href: '/markets/transportation/', label: 'Transportation' },
    { href: '/markets/industrial/', label: 'Industrial and commercial' },
    { href: '/markets/programs/', label: 'Programs served' },
  ]},
  { heading: 'Company', links: [
    { href: '/company/', label: 'About us' },
    { href: '/quality/', label: 'Quality and certifications' },
    { href: '/company/news/', label: 'News' },
    { href: '/careers/', label: 'Careers' },
    { href: '/contact/', label: 'Contact and request a quote' },
  ]},
];

export const legalNav = [
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
  { href: '/export-control/', label: 'Export control' },
  { href: '/sitemap/', label: 'Sitemap' },
];
