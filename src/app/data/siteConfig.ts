/**
 * Site-wide configuration — update these values here and they propagate everywhere.
 *
 * DATA_YEAR and LAST_UPDATED drive UI badges and footer text sitewide.
 * DATA_VINTAGES holds the actual currency of each individual data source —
 * shown on the Sources page so users know exactly how fresh each dataset is.
 * Update each key independently when that source is refreshed.
 */

/** The data year shown on UI badges throughout the site (reflects majority of data) */
export const DATA_YEAR = '2026';

/**
 * Bump this string to re-show the "What's New" modal for all users.
 * localStorage key: 'whats-new-seen' stores the last seen version.
 */
export const WHATS_NEW_VERSION = 'april-2026-v1';

/** Month + year shown in footers and disclaimers */
export const LAST_UPDATED = 'April 2026';

/**
 * Per-source data vintages — update each independently when that dataset is refreshed.
 * These are surfaced on the Sources page next to each section.
 */
export const DATA_VINTAGES = {
  /** State income tax rates, pension exemption status, sales tax — from state statutes */
  stateTax: '2026 Tax Year',

  /** VA disability compensation rates — updated Dec 1 annually with COLA */
  vaRates: 'Dec 2025 (2.8% COLA)',

  /** Cost of living index — C2ER / Council for Community & Economic Research */
  costOfLiving: 'Q1 2026',

  /** Housing market data — median home prices, rent estimates */
  housing: 'Q1 2026',

  /** Employment & economy — BLS unemployment, job growth, industry mix */
  employment: 'Q1 2026',

  /** Climate normals — NOAA 30-year average temperature, precipitation, humidity */
  climate: 'NOAA 1991–2020 Normals',

  /** Natural disaster risk ratings — FEMA National Risk Index, NOAA */
  disasterRisk: '2024',

  /** State veteran perks — license plates, property tax exemptions, education benefits */
  veteranBenefits: '2026',

  /** VA medical facilities and clinic locations */
  vaFacilities: '2025',

  /** Military installations data */
  militaryInstallations: '2025',

  /** Space-A terminal listings */
  spaceATerminals: '2025',
};
