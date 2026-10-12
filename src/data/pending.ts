/**
 * Every fact that must be confirmed by CII before launch.
 * Pages reference these by id via <Confirm id="..."/>; DEMO builds mark them and
 * list them on /launch-checklist/. Resolve an item by deleting it and its markers.
 */
export interface Pending { id: string; area: string; item: string; page: string; issue?: number }

export const pending: Pending[] = [
  { id: 'name', area: 'Company', item: 'Official company name for the site (old site used three variants)', page: '/company/', issue: 1 },
  { id: 'phone2', area: 'Company', item: 'Second number (203) 272-5672 — fax or department line?', page: '/contact/', issue: 1 },
  { id: 'email', area: 'Company', item: 'Primary email/domain: info@consolindustries.com vs forgemetal.com', page: '/contact/', issue: 1 },
  { id: 'machining', area: 'Company', item: 'Scope of partial or full machining offered', page: '/', issue: 1 },
  { id: 'max-weight', area: 'Capabilities', item: 'Max forging weight: old About page said 1–200 lb; capability table says up to 250 lb', page: '/capabilities/', issue: 2 },
  { id: 'hammer-unit', area: 'Capabilities', item: 'Hammer rating: 31.5–160 kJ vs "16,000 lb impact energy"', page: '/capabilities/', issue: 2 },
  { id: 'equipment', area: 'Capabilities', item: 'Equipment added or retired since 2015', page: '/capabilities/', issue: 2 },
  { id: 'nadcap-ut', area: 'Quality', item: 'NADCAP NDT scope — is ultrasonic inspection covered?', page: '/quality/', issue: 3 },
  { id: 'certs', area: 'Quality', item: 'Certificate numbers, expiry dates and PDFs for AS9100D, ISO 9001:2015, NADCAP', page: '/quality/', issue: 3 },
  { id: 'specs', area: 'Quality', item: '"Most MIL-spec and NAS specifications" wording and Boeing approvals status', page: '/quality/', issue: 3 },
  { id: 'docs', area: 'Quality', item: 'Current SQAR codes and Standard Terms & Conditions PDFs', page: '/quality/', issue: 3 },
  { id: 'approvals', area: 'Quality', item: 'Customer approvals still current and cleared to name', page: '/quality/', issue: 4 },
  { id: 'programs', area: 'Markets', item: 'Which programs may be named publicly; drop retired types?', page: '/markets/programs/', issue: 4 },
  { id: 'market-copy', area: 'Markets', item: 'Copy for turbine engine and industrial & transportation pages', page: '/markets/', issue: 6 },
  { id: 'aiac', area: 'Company', item: 'Still part of AIAC Aerospace & Special Metals Group; sister-company list', page: '/company/', issue: 5 },
  { id: 'memberships', area: 'Company', item: 'Memberships still active: FIA, AIA, Made in CT, FDMC, ACIBC', page: '/company/', issue: 5 },
  { id: 'legal', area: 'Legal', item: 'Privacy policy, terms, export-control notice and EEO statement are drafts for legal review', page: '/privacy/', issue: 7 },
  { id: 'rfq-routing', area: 'RFQ', item: 'Sales mailbox for RFQs and approved secure-transfer link for drawings', page: '/contact/', issue: 8 },
  { id: 'careers', area: 'Careers', item: 'Open roles, benefits summary and apply contact', page: '/careers/', issue: 9 },
  { id: 'news', area: 'Company', item: 'Current news items to replace the 2015–2016 archive', page: '/company/news/', issue: 28 },
];

export const pendingById = Object.fromEntries(pending.map((p) => [p.id, p]));
