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

// ─── VA Disability Monthly Pay (2026, single veteran, no dependents) ────────
// Source: VA.gov compensation rate tables (with 2.5% COLA from 2025)
export const VA_DISABILITY_MONTHLY: Record<string, number> = {
  '': 0,
  none: 0,
  '10': 175,
  '20': 347,
  '30': 537,
  '40': 774,
  '50': 1102,
  '60': 1396,
  '70': 1759,
  '80': 2045,
  '90': 2298,
  '100': 3831,
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FinancialInputs {
  retirementIncome: number; // annual military pension ($)
  disabilityRating: string; // '10'–'100', 'none', or ''
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
  totalMonthlyIncome: number;

  // Expense line items
  stateTaxOnPension: number;
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
  hasFinancialData: boolean; // false if state not in financialData.ts yet
}

// ─── Calculator ──────────────────────────────────────────────────────────────

export function calculateFinancialReality(
  state: StateData,
  inputs: FinancialInputs,
  profile: UserCostProfile = DEFAULT_USER_COST_PROFILE
): FinancialBreakdown {
  const fin = stateFinancialData[state.id];

  if (!fin) {
    // State not yet in financial data — return zeroed breakdown
    return {
      monthlyPension: 0,
      monthlyDisabilityPay: 0,
      totalMonthlyIncome: 0,
      stateTaxOnPension: 0,
      propertyTaxMonthly: 0,
      salesTaxOnSpending: 0,
      homeInsuranceMonthly: 0,
      autoInsuranceMonthly: 0,
      utilitiesMonthly: 0,
      groceryMonthly: 0,
      customExpensesMonthly: 0,
      totalTrackedExpenses: 0,
      monthlyRemaining: 0,
      hasFinancialData: false,
    };
  }

  const monthlyPension = inputs.retirementIncome / 12;
  const monthlyDisabilityPay = VA_DISABILITY_MONTHLY[inputs.disabilityRating] ?? 0;
  const totalMonthlyIncome = monthlyPension + monthlyDisabilityPay;

  // State income tax on military pension
  let stateTaxOnPension = 0;
  if (state.militaryPensionTax === 'Yes') {
    stateTaxOnPension = monthlyPension * (state.stateIncomeTax / 100);
  } else if (state.militaryPensionTax === 'Partial') {
    // Simplified: ~50% of pension is taxable. Actual varies by state.
    stateTaxOnPension = monthlyPension * 0.5 * (state.stateIncomeTax / 100);
  }
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
    totalMonthlyIncome,
    stateTaxOnPension,
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
