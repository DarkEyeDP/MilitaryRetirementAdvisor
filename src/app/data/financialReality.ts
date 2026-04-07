/**
 * Financial Reality Engine
 *
 * Calculates a personalized monthly financial picture for a given state
 * based on the user's retirement income and VA disability rating.
 *
 * Notes:
 * - VA Disability Compensation is ALWAYS federally tax-exempt (38 U.S.C. § 5301).
 *   No state can tax it. This is reflected in every calculation — disability pay
 *   is never reduced by state taxes.
 * - Military pension tax treatment varies by state (No / Partial / Yes).
 *   For "Partial" states, ~50% of pension is treated as taxable (simplified —
 *   actual exempt amounts vary by state; see state detail pages for specifics).
 * - Sales tax estimate assumes ~35% of total monthly income goes toward
 *   taxable purchases (groceries, goods, dining). This is a conservative model.
 * - Property tax is the annual median divided by 12 (assumes homeowner).
 */

import { StateData } from './stateData';
import { stateFinancialData } from './financialData';
import { getVAMonthlyPay } from './vaRates';

// Re-export for any consumers that imported VA_DISABILITY_MONTHLY directly
export { VA_RATE_ALONE as VA_DISABILITY_MONTHLY } from './vaRates';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SecondaryIncomeSource {
  id: string;
  label: string;  // e.g. "Part-time work", "Spouse income"
  annualAmount: number;
}

export interface FinancialInputs {
  userType?: 'retiree' | 'separating'; // 'retiree' = collecting pension; 'separating' = no pension
  retirementIncome: number;        // annual military pension ($) or expected annual income for separating members
  disabilityRating: string;        // '10'–'100', 'none', or ''
  secondaryIncome?: SecondaryIncomeSource[]; // taxed at full state rate
  hasSpouse?: boolean;             // veteran has qualifying spouse — affects VA pay at 30%+
  dependentChildren?: number;      // count of dependent children under 18
}

export type AgeGroup = 'under6' | '6to12' | '13to18' | 'adult' | 'senior';

export interface HouseholdMember {
  id: string;
  ageGroup: AgeGroup;
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  under6: 'Child (under 6)',
  '6to12': 'Child (6–12)',
  '13to18': 'Teen (13–18)',
  adult: 'Adult (19–64)',
  senior: 'Senior (65+)',
};

// USDA moderate-cost food plan monthly estimates (2026)
export const GROCERY_MONTHLY_PER_PERSON: Record<AgeGroup, number> = {
  under6: 220,
  '6to12': 295,
  '13to18': 345,
  adult: 365,
  senior: 315,
};

export interface CustomLineItem {
  id: string;
  label: string;
  amount: number; // monthly $
}

export interface UserCostProfile {
  // Override state estimates — null means "use state average"
  propertyTaxOverride: number | null;
  homeInsuranceOverride: number | null;
  autoInsuranceOverride: number | null;
  utilitiesOverride: number | null;
  // Groceries
  householdMembers: HouseholdMember[];
  groceryOverride: number | null; // null = auto-calculated from household
  // Custom monthly expenses
  customLineItems: CustomLineItem[];
}

export const DEFAULT_USER_COST_PROFILE: UserCostProfile = {
  propertyTaxOverride: null,
  homeInsuranceOverride: null,
  autoInsuranceOverride: null,
  utilitiesOverride: null,
  householdMembers: [],
  groceryOverride: null,
  customLineItems: [],
};

export interface FinancialBreakdown {
  // Income
  monthlyPension: number;
  monthlyDisabilityPay: number;
  monthlySecondaryIncome: number; // sum of all secondary sources before tax
  totalMonthlyIncome: number;     // all income combined (gross)

  // Expense line items
  stateTaxOnPension: number;
  stateTaxOnSecondaryIncome: number; // secondary income taxed at full state rate
  propertyTaxMonthly: number;
  salesTaxOnSpending: number;
  homeInsuranceMonthly: number;
  autoInsuranceMonthly: number;
  utilitiesMonthly: number;
  groceryMonthly: number;
  customExpensesMonthly: number;

  // Totals
  totalTrackedExpenses: number;
  monthlyRemaining: number;

  // Meta
  hasFinancialData: boolean;
}

// ─── Calculator ──────────────────────────────────────────────────────────────

export function calculateFinancialReality(
  state: StateData,
  inputs: FinancialInputs,
  profile: UserCostProfile = DEFAULT_USER_COST_PROFILE
): FinancialBreakdown {
  const fin = stateFinancialData[state.id];

  const monthlySecondaryIncome =
    (inputs.secondaryIncome ?? []).reduce((sum, s) => sum + s.annualAmount, 0) / 12;

  if (!fin) {
    // State not yet in financial data — return zeroed breakdown
    return {
      monthlyPension: 0,
      monthlyDisabilityPay: 0,
      monthlySecondaryIncome,
      totalMonthlyIncome: monthlySecondaryIncome,
      stateTaxOnPension: 0,
      stateTaxOnSecondaryIncome: 0,
      propertyTaxMonthly: 0,
      salesTaxOnSpending: 0,
      homeInsuranceMonthly: 0,
      autoInsuranceMonthly: 0,
      utilitiesMonthly: 0,
      groceryMonthly: 0,
      customExpensesMonthly: 0,
      totalTrackedExpenses: 0,
      monthlyRemaining: monthlySecondaryIncome,
      hasFinancialData: false,
    };
  }

  const monthlyPension = inputs.retirementIncome / 12;
  const monthlyDisabilityPay = getVAMonthlyPay(
    inputs.disabilityRating,
    inputs.hasSpouse ?? false,
    inputs.dependentChildren ?? 0,
  );
  const totalMonthlyIncome = monthlyPension + monthlyDisabilityPay + monthlySecondaryIncome;

  // State income tax on military pension
  let stateTaxOnPension = 0;
  if (state.militaryPensionTax === 'Yes') {
    stateTaxOnPension = monthlyPension * (state.stateIncomeTax / 100);
  } else if (state.militaryPensionTax === 'Partial') {
    stateTaxOnPension = monthlyPension * 0.5 * (state.stateIncomeTax / 100);
  }

  // Secondary income taxed at full state rate — no military exemptions
  const stateTaxOnSecondaryIncome = monthlySecondaryIncome * (state.stateIncomeTax / 100);

  // VA disability is always exempt — zero state tax regardless

  // Property tax — use override if set, otherwise state average
  const propertyTaxMonthly = profile.propertyTaxOverride !== null
    ? profile.propertyTaxOverride
    : fin.medianAnnualPropertyTax / 12;

  // Sales tax on estimated taxable spending (~35% of total income)
  const salesTaxOnSpending = totalMonthlyIncome * 0.35 * (fin.salesTaxCombined / 100);

  const homeInsuranceMonthly = profile.homeInsuranceOverride !== null
    ? profile.homeInsuranceOverride
    : fin.avgHomeInsuranceMonthly;

  const autoInsuranceMonthly = profile.autoInsuranceOverride !== null
    ? profile.autoInsuranceOverride
    : fin.avgAutoInsuranceMonthly;

  const utilitiesMonthly = profile.utilitiesOverride !== null
    ? profile.utilitiesOverride
    : fin.avgMonthlyUtilities;

  // Groceries — use override or calculate from household members
  const groceryMonthly = profile.groceryOverride !== null
    ? profile.groceryOverride
    : profile.householdMembers.reduce(
        (sum, m) => sum + GROCERY_MONTHLY_PER_PERSON[m.ageGroup],
        0
      );

  // Custom line items
  const customExpensesMonthly = profile.customLineItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalTrackedExpenses =
    stateTaxOnPension +
    stateTaxOnSecondaryIncome +
    propertyTaxMonthly +
    salesTaxOnSpending +
    homeInsuranceMonthly +
    autoInsuranceMonthly +
    utilitiesMonthly +
    groceryMonthly +
    customExpensesMonthly;

  return {
    monthlyPension,
    monthlyDisabilityPay,
    monthlySecondaryIncome,
    totalMonthlyIncome,
    stateTaxOnPension,
    stateTaxOnSecondaryIncome,
    propertyTaxMonthly,
    salesTaxOnSpending,
    homeInsuranceMonthly,
    autoInsuranceMonthly,
    utilitiesMonthly,
    groceryMonthly,
    customExpensesMonthly,
    totalTrackedExpenses,
    monthlyRemaining: totalMonthlyIncome - totalTrackedExpenses,
    hasFinancialData: true,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Compute financial reality for an array of states and return sorted results. */
export function computeAllRealities(
  states: StateData[],
  inputs: FinancialInputs,
  profile: UserCostProfile = DEFAULT_USER_COST_PROFILE
): Array<{ state: StateData; breakdown: FinancialBreakdown }> {
  return states
    .map((state) => ({
      state,
      breakdown: calculateFinancialReality(state, inputs, profile),
    }))
    .filter((r) => r.breakdown.hasFinancialData);
}

export function fmt$(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}
