/**
 * State-specific weekly grocery cost estimates.
 *
 * Source: GoBankingRates 2025, via World Population Review
 * https://worldpopulationreview.com/state-rankings/grocery-prices-by-state
 *
 * Methodology: Based on BLS Consumer Expenditure Survey and related cost data.
 * Values represent estimated average weekly household grocery spend by state.
 *
 * NATIONAL_AVG_WEEKLY_GROCERY (118) is the arithmetic mean of all 50 state values.
 * The state multiplier (state / national avg) is applied to USDA per-person base
 * amounts in calculateFinancialReality() so that household grocery estimates
 * reflect actual state price levels rather than a single national baseline.
 *
 * Territories (PR, GU, VI, AS, MP, DC) are not covered by the source data —
 * they fall back to a multiplier of 1.0 (national average).
 */

export const NATIONAL_AVG_WEEKLY_GROCERY = 118;

export const stateWeeklyGroceryCost: Record<string, number> = {
  'alabama':        114,
  'alaska':         152,
  'arizona':        119,
  'arkansas':       111,
  'california':     127,
  'colorado':       119,
  'connecticut':    118,
  'delaware':       117,
  'florida':        122,
  'georgia':        114,
  'hawaii':         157,
  'idaho':          122,
  'illinois':       115,
  'indiana':        114,
  'iowa':           111,
  'kansas':         112,
  'kentucky':       116,
  'louisiana':      113,
  'maine':          117,
  'maryland':       122,
  'massachusetts':  120,
  'michigan':       115,
  'minnesota':      117,
  'mississippi':    112,
  'missouri':       113,
  'montana':        122,
  'nebraska':       115,
  'nevada':         120,
  'new-hampshire':  115,
  'new-jersey':     119,
  'new-mexico':     114,
  'new-york':       121,
  'north-carolina': 114,
  'north-dakota':   113,
  'ohio':           116,
  'oklahoma':       111,
  'oregon':         122,
  'pennsylvania':   113,
  'rhode-island':   115,
  'south-carolina': 115,
  'south-dakota':   120,
  'tennessee':      113,
  'texas':          112,
  'utah':           114,
  'vermont':        124,
  'virginia':       115,
  'washington':     126,
  'west-virginia':  113,
  'wisconsin':      116,
  'wyoming':        119,
};

/**
 * Returns the state grocery cost multiplier relative to the national average.
 * e.g. Hawaii → 1.33 (33% more expensive than national average)
 *      Texas  → 0.95 (5% cheaper than national average)
 * Falls back to 1.0 for territories and any unmapped state.
 */
export function getGroceryMultiplier(stateId: string): number {
  const weekly = stateWeeklyGroceryCost[stateId];
  return weekly != null ? weekly / NATIONAL_AVG_WEEKLY_GROCERY : 1.0;
}
