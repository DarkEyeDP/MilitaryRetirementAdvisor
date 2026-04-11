/**
 * What's New modal content.
 *
 * To push a new update to all users:
 *   1. Replace the entries array below with the new release notes.
 *   2. Update `whatsNewReleaseLabel` to the current month/year.
 *   3. Bump WHATS_NEW_VERSION in siteConfig.ts (e.g. 'june-2026-v1').
 *
 * Badge types:
 *   'new'         → blue    (brand-new capability)
 *   'data'        → emerald (data refresh or expansion)
 *   'improvement' → slate   (QoL / polish)
 *   'fix'         → red     (bug fix worth calling out)
 */

export type BadgeType = 'new' | 'data' | 'improvement' | 'fix';

export interface WhatsNewEntry {
  badge: BadgeType;
  title: string;
  body: string;
}

export const whatsNewReleaseLabel = 'April 2026';

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    badge: 'new',
    title: 'Per-Capita VA Facility Scoring',
    body: 'The VA Benefits score now rates facilities per 100k veterans by default — so small states that actually serve their veterans well score accurately against large states. Toggle between per-capita and raw counts in Dashboard filters.',
  },
  {
    badge: 'data',
    title: 'Complete VA Facility Directory',
    body: 'All 50 states now have a fully populated list of VA Medical Centers and outpatient clinics with addresses, phone numbers, and map pins. Open any state page and explore the VA Facilities tab.',
  },
  {
    badge: 'new',
    title: '100% Disability Property Tax Exemptions',
    body: 'Every state now shows whether 100% disabled veterans qualify for a full or partial property tax exemption. Set your disability rating to 100% and look for the exemption callout on any state detail page.',
  },
  {
    badge: 'improvement',
    title: 'Quality of Life Improvements',
    body: 'State result cards now show who you\'re comparing against (e.g. "COL 12% lower vs. CA"). The mobile layout has been significantly improved throughout. The scoring methodology panel now reflects which mode is currently active.',
  },
];
