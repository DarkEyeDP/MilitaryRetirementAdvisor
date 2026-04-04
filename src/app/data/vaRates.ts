/**
 * VA Disability Compensation Rate Tables + Utilities
 *
 * Source: VA.gov — official 2026 rates, effective December 1, 2025
 * URL: https://www.va.gov/disability/compensation-rates/veteran-rates/
 * Reference: 38 CFR Part 3 (compensation amounts), 38 CFR §4.25 (combined ratings)
 * COLA: 2.8% (per SSA.gov 2026 COLA announcement)
 *
 * Key policy rules:
 * - 10% and 20% ratings: NO dependent supplement — rate is identical regardless of
 *   spouse, children, or parents (per VA policy note on the official rates page)
 * - 30%+: Additional monthly compensation for spouse and/or dependent children under 18
 * - VA disability compensation is ALWAYS federally tax-exempt (38 U.S.C. § 5301)
 *
 * Dollar values are stored as whole dollars (cents truncated) for display purposes.
 * IMPORTANT: Update this file each December when VA publishes new COLA-adjusted rates.
 */

// ─── Rate Tables ─────────────────────────────────────────────────────────────

/** Veteran alone — no dependents */
export const VA_RATE_ALONE: Record<string, number> = {
  '': 0, none: 0,
  '10': 180, '20': 357,
  '30': 552,  '40': 796,  '50': 1133, '60': 1435,
  '70': 1808, '80': 2102, '90': 2362, '100': 3939,
};

/** Veteran with spouse, no children, no parents — 30%+ only (10/20 same as alone) */
export const VA_RATE_WITH_SPOUSE: Record<string, number> = {
  '': 0, none: 0,
  '10': 180, '20': 357,
  '30': 617,  '40': 883,  '50': 1242, '60': 1566,
  '70': 1961, '80': 2277, '90': 2559, '100': 4158,
};

/** Veteran with spouse + 1 dependent child, no parents — 30%+ only */
export const VA_RATE_WITH_SPOUSE_ONE_CHILD: Record<string, number> = {
  '': 0, none: 0,
  '10': 180, '20': 357,
  '30': 666,  '40': 948,  '50': 1323, '60': 1663,
  '70': 2074, '80': 2406, '90': 2704, '100': 4319,
};

/**
 * Monthly supplement per additional child under 18 beyond the first.
 * Added on top of VA_RATE_WITH_SPOUSE_ONE_CHILD (or VA_RATE_CHILD_NO_SPOUSE).
 * 30%+ only; 0 for 10% and 20%.
 * Source: VA.gov "Added amounts" table, effective December 1, 2025.
 */
export const VA_RATE_ADDITIONAL_CHILD: Record<string, number> = {
  '': 0, none: 0,
  '10': 0, '20': 0,
  '30': 32, '40': 43, '50': 54,  '60': 65,
  '70': 76, '80': 87, '90': 98, '100': 109,
};

/** Veteran with 1 child only, no spouse, no parents — 30%+ only */
export const VA_RATE_CHILD_NO_SPOUSE: Record<string, number> = {
  '': 0, none: 0,
  '10': 180, '20': 357,
  '30': 596,  '40': 854,  '50': 1206, '60': 1523,
  '70': 1910, '80': 2219, '90': 2494, '100': 4085,
};

// ─── Lookup Function ──────────────────────────────────────────────────────────

/**
 * Returns the correct VA monthly disability compensation for the given
 * rating and dependent situation. Dependent supplements only apply at 30%+.
 *
 * @param rating - string key: '10'–'100', 'none', or ''
 * @param hasSpouse - veteran has a qualifying spouse
 * @param childCount - number of dependent children under 18
 */
export function getVAMonthlyPay(
  rating: string,
  hasSpouse: boolean,
  childCount: number,
): number {
  const ratingNum = parseInt(rating) || 0;

  // 10% and 20%: no dependent adjustment
  if (ratingNum < 30) return VA_RATE_ALONE[rating] ?? 0;

  if (hasSpouse) {
    if (childCount === 0) return VA_RATE_WITH_SPOUSE[rating] ?? 0;
    const base = VA_RATE_WITH_SPOUSE_ONE_CHILD[rating] ?? 0;
    const extra = (VA_RATE_ADDITIONAL_CHILD[rating] ?? 0) * (childCount - 1);
    return base + extra;
  }

  if (childCount >= 1) {
    const base = VA_RATE_CHILD_NO_SPOUSE[rating] ?? 0;
    const extra = (VA_RATE_ADDITIONAL_CHILD[rating] ?? 0) * (childCount - 1);
    return base + extra;
  }

  return VA_RATE_ALONE[rating] ?? 0;
}

// ─── Combined Ratings Formula (38 CFR §4.25) ─────────────────────────────────

/**
 * Combines multiple VA disability ratings using the "whole person" method.
 *
 * Algorithm:
 * 1. Sort ratings largest to smallest
 * 2. For each rating, apply it to the remaining efficiency:
 *    remaining = remaining × (1 − rating/100)
 * 3. Combined disability = (1 − remaining) × 100
 * 4. Round to nearest 10% — values ending in 5 round UP per §4.25(a)
 *
 * Examples:
 *   combineRatings([60, 30]) → 72% (rounds to 70%)
 *   combineRatings([50, 30]) → 65% (rounds up to 70%)
 *   combineRatings([40, 20]) → 52% (rounds to 50%)
 *
 * @param ratings - array of individual disability percentages (0–100)
 * @returns combined rating rounded to nearest 10%
 */
export function combineRatings(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sorted = [...ratings].sort((a, b) => b - a);
  let remaining = 1.0;
  for (const r of sorted) {
    remaining *= 1 - r / 100;
  }
  const combined = Math.round((1 - remaining) * 100);
  const mod = combined % 10;
  if (mod === 0) return combined;
  if (mod < 5) return combined - mod;       // round down
  return combined + (10 - mod);             // round up (includes exact 5)
}
