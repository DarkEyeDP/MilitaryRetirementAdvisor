/**
 * climateData.ts — re-export barrel.
 *
 * All climate data now lives in src/app/data/climate/:
 *   types.ts        — RiskLevel, HumidityLevel, RegionClimateData, StateClimateData
 *   south.ts        — FL TX VA TN NC GA OK AR SC AL MS LA MD WV KY
 *   west.ts         — NV WA AK WY CA AZ CO OR ID MT UT NM HI
 *   midwest.ts      — SD ND MO KS NE IA MN WI MI IL IN OH
 *   northeast.ts    — NH PA NY NJ DE ME VT MA CT RI
 *   territories.ts  — DC PR GU VI AS MP
 *   index.ts        — assembles and exports stateClimateData
 *
 * To edit a state, open its regional file directly.
 * All existing imports of 'climateData' continue to work unchanged.
 */
export { stateClimateData } from './climate/index';
export type { RiskLevel, HumidityLevel, RegionClimateData, StateClimateData } from './climate/index';
