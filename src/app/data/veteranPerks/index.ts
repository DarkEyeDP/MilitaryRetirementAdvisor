export type { VeteranPerksData } from './types';
export { westPerks }        from './west';
export { southPerks }       from './south';
export { midwestPerks }     from './midwest';
export { northeastPerks }   from './northeast';
export { territoriesPerks } from './territories';

import { westPerks }        from './west';
import { southPerks }       from './south';
import { midwestPerks }     from './midwest';
import { northeastPerks }   from './northeast';
import { territoriesPerks } from './territories';

export const stateVeteranPerks: Record<string, import('./types').VeteranPerksData> = {
  ...westPerks,
  ...southPerks,
  ...midwestPerks,
  ...northeastPerks,
  ...territoriesPerks,
};
