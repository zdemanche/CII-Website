/**
 * What is left before the preview becomes www.forgemetal.com.
 * Listed on /launch-checklist/ in DEMO builds. Keep in step with the open GitHub issues:
 * remove an item when its issue closes.
 */
export interface LaunchItem { id: string; area: string; item: string; issue: number }

export const pending: LaunchItem[] = [
  { id: 'host', area: 'Go-live', item: 'Approve the production host (Azure Static Web Apps recommended) and the quote-form endpoint', issue: 30 },
  { id: 'dns', area: 'Go-live', item: 'DNS access and primary domain, then run the cutover and Search Console runbooks', issue: 10 },
  { id: 'signoff', area: 'Review', item: 'Leadership walkthrough and go-live sign-off', issue: 28 },
];

/** Done since the preview went up — shown so reviewers can see progress. */
export const completed: { item: string; issue: number }[] = [
  { item: 'Company, capability, certification and program facts confirmed', issue: 1 },
  { item: 'Real photos from the current site in place of a new shoot', issue: 13 },
  { item: 'Accessibility and performance audit (Lighthouse 99–100, zero axe violations)', issue: 27 },
  { item: 'DNS cutover runbook written', issue: 31 },
  { item: 'Search Console baseline and monitoring plan written', issue: 32 },
];
