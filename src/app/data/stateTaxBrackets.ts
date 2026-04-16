/**
 * State Income Tax Brackets — 2026 Tax Year
 *
 * Marginal bracket data for all 50 states, DC, and US territories.
 * Brackets represent SINGLE FILER rates (conservative / higher-tax assumption).
 * States with flat income taxes use a single bracket. States with no income tax use [].
 *
 * Notes:
 * - Brackets are on GROSS income (no state standard deductions modeled — consistent
 *   with the current financial engine approach and simplifies comparison).
 * - For territories that mirror the US federal system (Guam, USVI, CNMI), a
 *   simplified flat rate is used.
 * - Federal brackets are included for Puerto Rico's IRC §933 federal exemption calc.
 *
 * Sources:
 * - State revenue department official rate schedules (2024–2025, adjusted to 2026)
 * - Tax Foundation 2025 state tax data
 * - IRS Rev. Proc. 2024-40 (2025 federal brackets, ~3% inflation adj. to 2026)
 */

export interface TaxBracket {
  min: number;   // annual income floor ($)
  max: number;   // annual income ceiling (use Infinity for top bracket)
  rate: number;  // marginal rate as a PERCENTAGE (e.g. 5.75, not 0.0575)
}

export type StateTaxBrackets = TaxBracket[];

/**
 * Computes annual state income tax owed using marginal bracket math.
 * Pass annualIncome as gross (no deductions — consistent with current engine).
 * Returns 0 for states with no brackets (no income tax).
 */
export function calculateProgressiveTax(
  annualIncome: number,
  brackets: StateTaxBrackets,
): number {
  if (!brackets.length || annualIncome <= 0) return 0;
  let tax = 0;
  for (const bracket of brackets) {
    if (annualIncome <= bracket.min) break;
    const taxableInBracket = Math.min(annualIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * (bracket.rate / 100);
  }
  return Math.max(0, tax);
}

/**
 * Returns the effective tax rate (0–100) for a given annual income in a state.
 * Used by the scoring engine as a more accurate stand-in for the flat stateIncomeTax rate.
 */
export function getEffectiveTaxRate(annualIncome: number, stateId: string): number {
  if (annualIncome <= 0) return 0;
  const brackets = stateTaxBrackets[stateId] ?? [];
  if (!brackets.length) return 0;
  return (calculateProgressiveTax(annualIncome, brackets) / annualIncome) * 100;
}

// ─── Federal Brackets (2026 estimate, Single Filer) ──────────────────────────
// Used ONLY for Puerto Rico IRC §933 federal savings calculation.
// Standard deduction applied before these brackets ($15,050 single, est. 2026).
export const FEDERAL_STANDARD_DEDUCTION_SINGLE = 15_050;
export const FEDERAL_STANDARD_DEDUCTION_MFJ    = 30_100;

export const federalBracketsSingle: StateTaxBrackets = [
  { min:       0, max:   12_350, rate: 10   },
  { min:  12_350, max:   49_750, rate: 12   },
  { min:  49_750, max:  106_200, rate: 22   },
  { min: 106_200, max:  202_600, rate: 24   },
  { min: 202_600, max:  257_300, rate: 32   },
  { min: 257_300, max:  643_050, rate: 35   },
  { min: 643_050, max: Infinity, rate: 37   },
];

export const federalBracketsMFJ: StateTaxBrackets = [
  { min:       0, max:   24_700, rate: 10   },
  { min:  24_700, max:   99_500, rate: 12   },
  { min:  99_500, max:  212_400, rate: 22   },
  { min: 212_400, max:  405_200, rate: 24   },
  { min: 405_200, max:  514_600, rate: 32   },
  { min: 514_600, max:  772_750, rate: 35   },
  { min: 772_750, max: Infinity, rate: 37   },
];

// ─── State Brackets ──────────────────────────────────────────────────────────

export const stateTaxBrackets: Record<string, StateTaxBrackets> = {

  // ── No Income Tax States (empty = $0 tax) ─────────────────────────────────
  alaska:         [],
  florida:        [],
  nevada:         [],
  'new-hampshire': [], // No tax on wages/pension (minor interest/dividend tax only)
  'south-dakota': [],
  tennessee:      [],
  texas:          [],
  washington:     [], // WA has capital gains tax but not on wages/pension
  wyoming:        [],

  // ── Flat Rate States (single bracket) ─────────────────────────────────────
  arizona:      [{ min: 0, max: Infinity, rate: 2.5  }],
  colorado:     [{ min: 0, max: Infinity, rate: 4.4  }],
  georgia:      [{ min: 0, max: Infinity, rate: 5.39 }],
  illinois:     [{ min: 0, max: Infinity, rate: 4.95 }],
  indiana:      [{ min: 0, max: Infinity, rate: 3.0  }],
  iowa:         [{ min: 0, max: Infinity, rate: 3.8  }], // Flat since 2025 reform
  kentucky:     [{ min: 0, max: Infinity, rate: 4.0  }],
  massachusetts:[{ min: 0, max: Infinity, rate: 5.0  }], // 9% surtax at $1M+ ignored
  michigan:     [{ min: 0, max: Infinity, rate: 4.25 }],
  mississippi:  [{ min: 0, max: Infinity, rate: 4.7  }], // Phasing to flat
  'north-carolina': [{ min: 0, max: Infinity, rate: 3.99 }],
  'north-dakota':   [{ min: 0, max: Infinity, rate: 2.5  }], // Flat since 2024 reform
  pennsylvania: [{ min: 0, max: Infinity, rate: 3.07 }],
  utah:         [{ min: 0, max: Infinity, rate: 4.55 }],
  idaho:        [{ min: 0, max: Infinity, rate: 5.3  }], // Flat 5.3% (rate cut effective 2025)

  // ── Progressive States ─────────────────────────────────────────────────────

  // Alabama — 2% / 4% / 5% (single filer)
  alabama: [
    { min:     0, max:   500, rate: 2 },
    { min:   500, max: 3_000, rate: 4 },
    { min: 3_000, max: Infinity, rate: 5 },
  ],

  // Arkansas — two-schedule system (2025): low-income progressive table; high-income flat 3.9% above ~$95,500
  // Top rate reduced from 4.7% to 3.9% per ongoing legislative reform. Simplified to progressive-to-3.9%.
  arkansas: [
    { min:      0, max:  4_999, rate: 0.0 },
    { min:  5_000, max:  8_999, rate: 2.0 },
    { min:  9_000, max: Infinity, rate: 3.9 },
  ],

  // California — 2024 (single filer, SDI ignored)
  california: [
    { min:       0, max:   10_756, rate:  1.0  },
    { min:  10_756, max:   25_499, rate:  2.0  },
    { min:  25_499, max:   40_245, rate:  4.0  },
    { min:  40_245, max:   55_866, rate:  6.0  },
    { min:  55_866, max:   70_606, rate:  8.0  },
    { min:  70_606, max:  360_659, rate:  9.3  },
    { min: 360_659, max:  432_787, rate: 10.3  },
    { min: 432_787, max:  721_314, rate: 11.3  },
    { min: 721_314, max:1_000_000, rate: 12.3  },
    { min:1_000_000,max: Infinity, rate: 13.3  },
  ],

  // Connecticut — 2024
  connecticut: [
    { min:       0, max:  10_000, rate: 2.0  },
    { min:  10_000, max:  50_000, rate: 4.5  },
    { min:  50_000, max: 100_000, rate: 5.5  },
    { min: 100_000, max: 200_000, rate: 6.0  },
    { min: 200_000, max: 250_000, rate: 6.5  },
    { min: 250_000, max: 500_000, rate: 6.9  },
    { min: 500_000, max: Infinity, rate: 6.99 },
  ],

  // Delaware — 2024
  delaware: [
    { min:      0, max:  2_000, rate: 0.0  },
    { min:  2_000, max:  5_000, rate: 2.2  },
    { min:  5_000, max: 10_000, rate: 3.9  },
    { min: 10_000, max: 20_000, rate: 4.8  },
    { min: 20_000, max: 25_000, rate: 5.2  },
    { min: 25_000, max: 60_000, rate: 5.55 },
    { min: 60_000, max: Infinity, rate: 6.6 },
  ],

  // Hawaii — 2024 (single filer)
  hawaii: [
    { min:       0, max:   9_600, rate: 1.4  },
    { min:   9_600, max:  19_200, rate: 3.2  },
    { min:  19_200, max:  48_000, rate: 5.5  },
    { min:  48_000, max:  96_000, rate: 6.4  },
    { min:  96_000, max: 150_000, rate: 6.8  },
    { min: 150_000, max: 175_000, rate: 7.2  },
    { min: 175_000, max: 200_000, rate: 7.6  },
    { min: 200_000, max: 300_000, rate: 7.9  },
    { min: 300_000, max: 400_000, rate: 8.25 },
    { min: 400_000, max: 600_000, rate: 9.0  },
    { min: 600_000, max: Infinity, rate: 11.0 },
  ],

  // Kansas — 2024
  kansas: [
    { min:      0, max: 15_000, rate: 3.1 },
    { min: 15_000, max: 30_000, rate: 5.25 },
    { min: 30_000, max: Infinity, rate: 5.7 },
  ],

  // Louisiana — 2024
  louisiana: [
    { min:      0, max: 12_500, rate: 1.85 },
    { min: 12_500, max: 50_000, rate: 3.5  },
    { min: 50_000, max: Infinity, rate: 4.25 },
  ],

  // Maine — 2024 (single filer)
  maine: [
    { min:      0, max: 24_500, rate: 5.8  },
    { min: 24_500, max: 58_050, rate: 6.75 },
    { min: 58_050, max: Infinity, rate: 7.15 },
  ],

  // Maryland — 2024 (state-only; county local tax not modeled)
  maryland: [
    { min:       0, max:   1_000, rate: 2.0  },
    { min:   1_000, max:   2_000, rate: 3.0  },
    { min:   2_000, max:   3_000, rate: 4.0  },
    { min:   3_000, max: 100_000, rate: 4.75 },
    { min: 100_000, max: 125_000, rate: 5.0  },
    { min: 125_000, max: 150_000, rate: 5.25 },
    { min: 150_000, max: 250_000, rate: 5.5  },
    { min: 250_000, max: Infinity, rate: 5.75 },
  ],

  // Minnesota — 2024 (single filer)
  minnesota: [
    { min:      0, max:  31_690, rate: 5.35 },
    { min: 31_690, max: 104_090, rate: 6.8  },
    { min: 104_090, max: 193_240, rate: 7.85 },
    { min: 193_240, max: Infinity, rate: 9.85 },
  ],

  // Missouri — 2024 (top rate 4.8%, phasing down annually)
  missouri: [
    { min:     0, max: 1_207, rate: 0.0  },
    { min: 1_207, max: 2_414, rate: 2.0  },
    { min: 2_414, max: 3_622, rate: 2.5  },
    { min: 3_622, max: 4_829, rate: 3.0  },
    { min: 4_829, max: 6_036, rate: 3.5  },
    { min: 6_036, max: 7_244, rate: 4.0  },
    { min: 7_244, max: 8_451, rate: 4.5  },
    { min: 8_451, max: Infinity, rate: 4.8 },
  ],

  // Montana — 2024 (reformed to 2-bracket flat-ish system)
  montana: [
    { min:      0, max: 20_500, rate: 4.7 },
    { min: 20_500, max: Infinity, rate: 5.9 },
  ],

  // Nebraska — 2024 (rates phasing down; use current schedule)
  nebraska: [
    { min:      0, max:  3_700, rate: 2.46 },
    { min:  3_700, max: 22_170, rate: 3.51 },
    { min: 22_170, max: 35_730, rate: 5.01 },
    { min: 35_730, max: Infinity, rate: 5.84 },
  ],

  // New Jersey — 2024 (single filer)
  'new-jersey': [
    { min:       0, max:  20_000, rate:  1.4   },
    { min:  20_000, max:  35_000, rate:  1.75  },
    { min:  35_000, max:  40_000, rate:  3.5   },
    { min:  40_000, max:  75_000, rate:  5.525 },
    { min:  75_000, max: 500_000, rate:  6.37  },
    { min: 500_000, max:1_000_000,rate:  8.97  },
    { min:1_000_000,max: Infinity, rate: 10.75 },
  ],

  // New Mexico — 2024
  'new-mexico': [
    { min:      0, max:   5_500, rate: 1.7 },
    { min:  5_500, max:  11_000, rate: 3.2 },
    { min: 11_000, max:  16_000, rate: 4.7 },
    { min: 16_000, max: 210_000, rate: 4.9 },
    { min: 210_000, max: Infinity, rate: 5.9 },
  ],

  // New York — 2024 (state only; NYC local tax not modeled)
  'new-york': [
    { min:       0, max:   17_150, rate:  4.0  },
    { min:  17_150, max:   23_600, rate:  4.5  },
    { min:  23_600, max:   27_900, rate:  5.25 },
    { min:  27_900, max:  161_550, rate:  5.5  },
    { min: 161_550, max:  323_200, rate:  6.0  },
    { min: 323_200, max:2_155_350, rate:  6.85 },
    { min:2_155_350,max: Infinity, rate:  9.65 },
  ],

  // Ohio — 2024 (single filer)
  ohio: [
    { min:      0, max:  26_050, rate: 0.0   },
    { min: 26_050, max:  46_100, rate: 2.765 },
    { min: 46_100, max:  92_150, rate: 3.226 },
    { min: 92_150, max: 115_300, rate: 3.688 },
    { min: 115_300, max: Infinity, rate: 3.99 },
  ],

  // Oklahoma — 2024
  oklahoma: [
    { min:     0, max: 1_000, rate: 0.25 },
    { min: 1_000, max: 2_500, rate: 0.75 },
    { min: 2_500, max: 3_750, rate: 1.75 },
    { min: 3_750, max: 4_900, rate: 2.75 },
    { min: 4_900, max: 7_200, rate: 3.75 },
    { min: 7_200, max: Infinity, rate: 4.75 },
  ],

  // Oregon — 2024 (single filer)
  oregon: [
    { min:      0, max:  18_400, rate: 4.75 },
    { min: 18_400, max:  46_200, rate: 6.75 },
    { min: 46_200, max: 250_000, rate: 8.75 },
    { min: 250_000, max: Infinity, rate: 9.9 },
  ],

  // Rhode Island — 2024 (single filer)
  'rhode-island': [
    { min:      0, max:  73_450, rate: 3.75 },
    { min: 73_450, max: 166_950, rate: 4.75 },
    { min: 166_950, max: Infinity, rate: 5.99 },
  ],

  // South Carolina — 2024 (post-reform, phasing to flat 6.2%)
  'south-carolina': [
    { min:      0, max:  3_460, rate: 0.0 },
    { min:  3_460, max: 17_330, rate: 3.0 },
    { min: 17_330, max: Infinity, rate: 6.4 },
  ],

  // Vermont — 2024 (single filer)
  vermont: [
    { min:      0, max:  45_400, rate: 3.35 },
    { min:  45_400, max: 110_050, rate: 6.6  },
    { min: 110_050, max: 229_550, rate: 7.6  },
    { min: 229_550, max: Infinity, rate: 8.75 },
  ],

  // Virginia — 2024 (effectively flat above $17k; legislature considering reform)
  virginia: [
    { min:     0, max:  3_000, rate: 2.0  },
    { min: 3_000, max:  5_000, rate: 3.0  },
    { min: 5_000, max: 17_000, rate: 5.0  },
    { min: 17_000, max: Infinity, rate: 5.75 },
  ],

  // West Virginia — 2024 (progressive, rates phasing down)
  'west-virginia': [
    { min:      0, max: 10_000, rate: 2.36 },
    { min: 10_000, max: 25_000, rate: 3.15 },
    { min: 25_000, max: 40_000, rate: 3.54 },
    { min: 40_000, max: 60_000, rate: 4.72 },
    { min: 60_000, max: Infinity, rate: 5.12 },
  ],

  // Wisconsin — 2024 (single filer)
  wisconsin: [
    { min:       0, max:  14_320, rate: 3.54 },
    { min:  14_320, max:  28_640, rate: 4.65 },
    { min:  28_640, max: 315_310, rate: 5.3  },
    { min: 315_310, max: Infinity, rate: 7.65 },
  ],

  // ── Territories ────────────────────────────────────────────────────────────

  // District of Columbia — 2024 (top rate is actually 10.75% at $1M+)
  dc: [
    { min:       0, max:  10_000, rate:  4.0  },
    { min:  10_000, max:  40_000, rate:  6.0  },
    { min:  40_000, max:  60_000, rate:  6.5  },
    { min:  60_000, max: 250_000, rate:  8.5  },
    { min: 250_000, max: 500_000, rate:  9.25 },
    { min: 500_000, max:1_000_000,rate:  9.75 },
    { min:1_000_000,max: Infinity, rate: 10.75 },
  ],

  // Puerto Rico — 2024 (key for this fix; progressive up to 33%)
  // NOTE: Military pension is STILL subject to federal income tax in PR
  //       (US-source income is excluded from IRC §933 exemption).
  //       Non-pension income EARNED IN PR is exempt from federal income tax.
  'puerto-rico': [
    { min:      0, max:  9_000, rate:  0  },
    { min:  9_000, max: 25_000, rate:  7  },
    { min: 25_000, max: 41_500, rate: 14  },
    { min: 41_500, max: 61_500, rate: 25  },
    { min: 61_500, max: Infinity, rate: 33 },
  ],

  // Guam — mirrors US federal system (simplified flat rate)
  guam: [{ min: 0, max: Infinity, rate: 22.0 }],

  // US Virgin Islands — mirrors US federal system (simplified flat rate)
  'us-virgin-islands': [{ min: 0, max: Infinity, rate: 22.0 }],

  // American Samoa — own tax code (simplified flat rate)
  'american-samoa': [{ min: 0, max: Infinity, rate: 25.0 }],

  // Northern Mariana Islands — mirrors US federal system (simplified flat rate)
  'northern-mariana-islands': [{ min: 0, max: Infinity, rate: 22.0 }],
};
