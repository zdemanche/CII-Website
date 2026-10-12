/**
 * What is left before the preview becomes www.forgemetal.com.
 * Listed on /launch-checklist/ in DEMO builds. Remove an item when its issue closes.
 */
export interface LaunchItem { id: string; area: string; item: string; issue: number }

export const pending: LaunchItem[] = [
  { id: 'host', area: 'Go-live', item: 'Approve the production host (Azure Static Web Apps recommended) and the quote-form endpoint', issue: 30 },
  { id: 'dns', area: 'Go-live', item: 'Registrar and DNS access for forgemetal.com and consolindustries.com; pick the primary domain', issue: 10 },
  { id: 'cutover', area: 'Go-live', item: 'Run the DNS cutover runbook and verify every old URL redirects', issue: 31 },
  { id: 'search', area: 'Go-live', item: 'Capture the Search Console baseline before cutover, then monitor for 30 days', issue: 32 },
  { id: 'signoff', area: 'Review', item: 'Leadership walkthrough and go-live sign-off', issue: 28 },
  { id: 'photos', area: 'Content', item: 'Photo shoot of presses, hammers, heat treat, lab and customer-cleared parts', issue: 13 },
];
