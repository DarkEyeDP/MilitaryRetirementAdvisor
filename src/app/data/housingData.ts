/**
 * Housing market data per state.
 * Sources: Zillow Research, Census Bureau ACS 2023, Redfin Data Center (2024–2025 estimates).
 *
 * medianRent         — Median gross monthly rent, all unit sizes (dollars)
 * housingPriceTrend  — Year-over-year median home price change, % (positive = appreciation)
 * medianHomeCost     — Mirrors avgHomeCost in stateData but kept here for housing-focused views
 *
 * Future fields to add here (not in stateData.ts):
 *   rentalVacancyRate, homeownershipRate, newPermitsGrowth, avgDaysOnMarket
 */
export interface HousingData {
  medianRent: number;
  housingPriceTrend: number;
}

export const stateHousingData: Record<string, HousingData> = {
  'florida':        { medianRent: 1_720, housingPriceTrend:  3.2 },
  'texas':          { medianRent: 1_370, housingPriceTrend:  1.8 },
  'virginia':       { medianRent: 1_530, housingPriceTrend:  4.1 },
  'tennessee':      { medianRent: 1_260, housingPriceTrend:  4.8 },
  'nevada':         { medianRent: 1_410, housingPriceTrend:  4.9 },
  'washington':     { medianRent: 1_680, housingPriceTrend:  5.8 },
  'alaska':         { medianRent: 1_260, housingPriceTrend:  1.5 },
  'wyoming':        { medianRent: 1_060, housingPriceTrend:  4.1 },
  'south-dakota':   { medianRent:   910, housingPriceTrend:  3.8 },
  'new-hampshire':  { medianRent: 1_460, housingPriceTrend:  5.7 },
  'north-carolina': { medianRent: 1_260, housingPriceTrend:  5.1 },
  'georgia':        { medianRent: 1_360, housingPriceTrend:  4.2 },
  'california':     { medianRent: 1_960, housingPriceTrend:  4.5 },
  'arizona':        { medianRent: 1_360, housingPriceTrend:  5.2 },
  'colorado':       { medianRent: 1_660, housingPriceTrend:  2.8 },
  'oregon':         { medianRent: 1_420, housingPriceTrend:  3.2 },
  'idaho':          { medianRent: 1_210, housingPriceTrend:  3.8 },
  'montana':        { medianRent: 1_160, housingPriceTrend:  5.9 },
  'utah':           { medianRent: 1_460, housingPriceTrend:  3.5 },
  'new-mexico':     { medianRent: 1_060, housingPriceTrend:  3.4 },
  'oklahoma':       { medianRent:   910, housingPriceTrend:  2.9 },
  'missouri':       { medianRent:   960, housingPriceTrend:  4.7 },
  'kansas':         { medianRent:   910, housingPriceTrend:  3.9 },
  'nebraska':       { medianRent:   960, housingPriceTrend:  4.2 },
  'iowa':           { medianRent:   860, housingPriceTrend:  3.6 },
  'minnesota':      { medianRent: 1_160, housingPriceTrend:  4.0 },
  'wisconsin':      { medianRent: 1_010, housingPriceTrend:  5.1 },
  'michigan':       { medianRent: 1_010, housingPriceTrend:  5.6 },
  'illinois':       { medianRent: 1_110, housingPriceTrend:  4.1 },
  'indiana':        { medianRent:   960, housingPriceTrend:  5.8 },
  'ohio':           { medianRent:   960, housingPriceTrend:  6.2 },
  'pennsylvania':   { medianRent: 1_160, housingPriceTrend:  5.3 },
  'new-york':       { medianRent: 1_710, housingPriceTrend:  2.1 },
  'new-jersey':     { medianRent: 1_760, housingPriceTrend:  7.1 },
  'delaware':       { medianRent: 1_360, housingPriceTrend:  4.6 },
  'maryland':       { medianRent: 1_610, housingPriceTrend:  4.8 },
  'west-virginia':  { medianRent:   760, housingPriceTrend:  3.2 },
  'kentucky':       { medianRent:   910, housingPriceTrend:  4.3 },
  'alabama':        { medianRent:   960, housingPriceTrend:  3.5 },
  'mississippi':    { medianRent:   860, housingPriceTrend:  2.8 },
  'louisiana':      { medianRent:   960, housingPriceTrend:  1.2 },
  'arkansas':       { medianRent:   860, housingPriceTrend:  3.1 },
  'south-carolina': { medianRent: 1_160, housingPriceTrend:  4.6 },
  'maine':          { medianRent: 1_210, housingPriceTrend:  4.9 },
  'vermont':        { medianRent: 1_210, housingPriceTrend:  5.4 },
  'massachusetts':  { medianRent: 1_860, housingPriceTrend:  4.2 },
  'connecticut':    { medianRent: 1_510, housingPriceTrend:  7.2 },
  'rhode-island':   { medianRent: 1_460, housingPriceTrend:  6.8 },
  'hawaii':         { medianRent: 1_960, housingPriceTrend: -1.2 },
  'north-dakota':   { medianRent:   960, housingPriceTrend:  2.5 },
};

/** National medians for comparison reference (2024) */
export const NATIONAL_HOUSING = {
  medianRent: 1_163,
  housingPriceTrend: 4.0,
};
