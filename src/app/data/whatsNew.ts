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
    title: 'Full Financial Reality Engine',
    body: 'Every state page now shows what your finances are estimated to look like, but built on your real numbers. Add your pension and any other income (including post-EAS/ETS scenarios), enter your actual expenses, and see which state leaves you with more money in your pocket. Includes a monthly/yearly toggle to understand long-term impact, a rent vs. buy toggle that adjusts taxes and costs automatically, and a fully customizable budget sandbox for bills, savings, and anything else. Estimated federal and state income tax are both factored in.',
  },
  {
    badge: 'new',
    title: 'Transitioning Service Member Mode',
    body: 'Members separating without a military pension can now select "Transitioning Service Member" on the landing page. Tax calculations, state information, and financial breakdowns all adapt with regular income no longer being treated as pension income with military-specific exemptions.',
  },
  {
    badge: 'new',
    title: 'Financial Breakdown in PDF Export',
    body: 'State PDF reports now include a full financial reality page: monthly income, estimated costs, state and federal tax deductions, and estimated discretionary funds with a side-by-side comparison against your current state where applicable.',
  },
  {
    badge: 'fix',
    title: 'Score Consistency Fixes',
    body: 'The "Your Current State" card, state dropdown picker, and state result cards all now show identical scores using your active weight settings and VA scoring mode. Scores were previously inconsistent between views.',
  },
];
