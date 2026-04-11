/**
 * stateData.ts — re-export barrel.
 *
 * All state data now lives in src/app/data/states/:
 *   types.ts        — StateData interface
 *   scoring.ts      — DEFAULT_SCORE_WEIGHTS, TERRITORY_IDS, scoreTier, calculateCustomScore
 *   south.ts        — FL, TX, VA, TN, NC, GA, OK, AR, SC, AL, MS, LA, MD, WV, KY
 *   west.ts         — NV, WA, AK, WY, CA, AZ, CO, OR, ID, MT, UT, NM, HI
 *   midwest.ts      — SD, ND, MO, KS, NE, IA, MN, WI, MI, IL, IN, OH
 *   northeast.ts    — NH, PA, NY, NJ, DE, ME, VT, MA, CT, RI
 *   territories.ts  — DC, PR, GU, VI, AS, MP
 *   index.ts        — assembles and exports statesData[]
 *
 * To edit a state, open its regional file directly.
 * All existing imports of '@/app/data/stateData' continue to work unchanged.
 */
export { statesData, DEFAULT_SCORE_WEIGHTS, TERRITORY_IDS, scoreTier, calculateCustomScore } from './states/index';
export type { StateData } from './states/index';
