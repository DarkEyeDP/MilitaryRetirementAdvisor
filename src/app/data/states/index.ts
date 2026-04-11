export type { StateData } from './types';
export { DEFAULT_SCORE_WEIGHTS, TERRITORY_IDS, scoreTier, calculateCustomScore } from './scoring';

import { southStates } from './south';
import { westStates } from './west';
import { midwestStates } from './midwest';
import { northeastStates } from './northeast';
import { territories } from './territories';
import type { StateData } from './types';

export const statesData: StateData[] = [
  ...southStates,
  ...westStates,
  ...midwestStates,
  ...northeastStates,
  ...territories,
];
