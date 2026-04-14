import type { StateData } from './types';
import { getEffectiveTaxRate } from '../stateTaxBrackets';

export const DEFAULT_SCORE_WEIGHTS = { taxes: 40, cost: 30, benefits: 30 };

/**
 * Non-state US jurisdictions included in the dataset.
 * Add territory IDs here as they are added to statesData.
 */
export const TERRITORY_IDS = new Set([
  'dc',
  'puerto-rico',
  'guam',
  'us-virgin-islands',
  'american-samoa',
  'northern-mariana-islands',
]);

/**
 * Score tiers used across the UI for consistent labeling.
 * Elite 95–100 | Strong 85–94 | Moderate 70–84 | Weak <70
 */
export function scoreTier(score: number): { label: string; className: string } {
  if (score >= 95) return { label: 'Elite',    className: 'bg-emerald-100 text-emerald-700' };
  if (score >= 85) return { label: 'Strong',   className: 'bg-blue-100 text-blue-700' };
  if (score >= 70) return { label: 'Moderate', className: 'bg-yellow-100 text-yellow-700' };
  return              { label: 'Weak',     className: 'bg-slate-100 text-slate-500' };
}

/**
 * Reference income used to derive an effective tax rate for scoring purposes.
 * Represents a reasonable non-pension annual income for a military retiree
 * (spouse income, rental, part-time work, etc.). Scoring is income-agnostic;
 * this keeps comparisons consistent across users.
 */
const SCORE_REFERENCE_INCOME = 80_000;

/**
 * Calculates a weighted retirement score for a state (0–100).
 *
 * Tax Friendliness (0–100):
 *   Pension tax exemption  — Awarded only when stateIncomeTax > 0, because for
 *                            zero-income-tax states the pension is trivially exempt
 *                            and the rate score already captures that benefit.
 *                            No: 50 pts | Partial: 28 pts | Taxed: 0 pts
 *   Non-pension income rate — Effective rate at $80k reference income via progressive
 *                             brackets → 0% = 32 pts, scales to 0 at ~13.3% effective
 *   Property tax level     — Low: 18 pts | Medium: 10 pts | High: 0 pts
 *
 * Cost of Living (0–100):
 *   COL index ≤ 82 → 100 | COL index ≥ 160 → 0  (linear, hard-clamped)
 *
 * Veteran Benefits (0–100):
 *   State veteran benefits score (already 0–100)
 */
export const calculateCustomScore = (
  state: StateData,
  weights: { taxes: number; cost: number; benefits: number }
): number => {
  // Only award pension exemption points when the state actually HAS an income tax to
  // exempt from. If stateIncomeTax === 0, the pension is trivially exempt; the income
  // rate score below already captures the full benefit of paying zero income tax.
  const pensionPts  = state.stateIncomeTax > 0
    ? (state.militaryPensionTax === 'No' ? 50 : state.militaryPensionTax === 'Partial' ? 28 : 0)
    : 0;

  // Use progressive effective rate at reference income rather than the stored top marginal rate.
  // This correctly scores e.g. Ohio (low effective rate despite 3.99% top) vs. PR (high effective
  // rate despite progressive brackets that reduce real burden at moderate incomes).
  const effectiveRate = getEffectiveTaxRate(SCORE_REFERENCE_INCOME, state.id);
  const incomePts    = Math.max(0, Math.round(32 - effectiveRate * 2.4));

  const propertyPts  = state.propertyTaxLevel === 'Low' ? 18 : state.propertyTaxLevel === 'Medium' ? 10 : 0;
  const taxScore     = pensionPts + incomePts + propertyPts;

  const costScore    = Math.min(100, Math.max(0, Math.round((160 - state.costOfLivingIndex) / 78 * 100)));
  const benefitsScore = state.veteranBenefitsScore;

  const total = weights.taxes + weights.cost + weights.benefits;
  if (total === 0) return 0;

  const weighted = (taxScore * weights.taxes + costScore * weights.cost + benefitsScore * weights.benefits) / total;
  return Math.min(100, Math.max(0, Math.round(weighted)));
};
