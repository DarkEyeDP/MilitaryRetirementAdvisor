export type { RiskLevel, HumidityLevel, RegionClimateData, StateClimateData } from './types';

import { southClimate }      from './south';
import { westClimate }       from './west';
import { midwestClimate }    from './midwest';
import { northeastClimate }  from './northeast';
import { territoriesClimate } from './territories';

export const stateClimateData: Record<string, import('./types').StateClimateData> = {
  ...southClimate,
  ...westClimate,
  ...midwestClimate,
  ...northeastClimate,
  ...territoriesClimate,
};
