/**
 * VA facility locations by state — split by region for maintainability.
 *
 * To add/edit facilities for a state, find its regional file:
 *   South (FL, VA, TN, GA, NC, SC, AL, MS, LA, AR, KY, WV) → south.ts
 *   Southwest (TX, OK, AZ, NM)                               → southwest.ts
 *   West (CA, OR, WA, AK, HI, NV, ID, MT, UT, WY, CO)       → west.ts
 *   Midwest (MO, KS, NE, IA, MN, WI, MI, IL, IN, OH, ND, SD) → midwest.ts
 *   Northeast (PA, NY, NJ, DE, MD, DC, MA, CT, RI, VT, ME, NH) → northeast.ts
 *   Territories (PR, GU, VI, AS, MP)                          → territories.ts
 *
 * Source: VA.gov facility locator · Data year: 2026
 */

export type { VAFacility } from './types';
export { southFacilities } from './south';
export { southwestFacilities } from './southwest';
export { westFacilities } from './west';
export { midwestFacilities } from './midwest';
export { northeastFacilities } from './northeast';
export { territoriesFacilities } from './territories';

import { southFacilities } from './south';
import { southwestFacilities } from './southwest';
import { westFacilities } from './west';
import { midwestFacilities } from './midwest';
import { northeastFacilities } from './northeast';
import { territoriesFacilities } from './territories';
import type { VAFacility } from './types';

export const vaFacilityLocations: Record<string, VAFacility[]> = {
  ...southFacilities,
  ...southwestFacilities,
  ...westFacilities,
  ...midwestFacilities,
  ...northeastFacilities,
  ...territoriesFacilities,
};

/** FIPS code map — used to match us-atlas topojson features to our state IDs */
export const stateFipsMap: Record<string, string> = {
  alabama: '01',
  alaska: '02',
  arizona: '04',
  arkansas: '05',
  california: '06',
  colorado: '08',
  connecticut: '09',
  delaware: '10',
  florida: '12',
  georgia: '13',
  hawaii: '15',
  idaho: '16',
  illinois: '17',
  indiana: '18',
  iowa: '19',
  kansas: '20',
  kentucky: '21',
  louisiana: '22',
  maine: '23',
  maryland: '24',
  massachusetts: '25',
  michigan: '26',
  minnesota: '27',
  mississippi: '28',
  missouri: '29',
  montana: '30',
  nebraska: '31',
  nevada: '32',
  'new-hampshire': '33',
  'new-jersey': '34',
  'new-mexico': '35',
  'new-york': '36',
  'north-carolina': '37',
  'north-dakota': '38',
  ohio: '39',
  oklahoma: '40',
  oregon: '41',
  pennsylvania: '42',
  'rhode-island': '44',
  'south-carolina': '45',
  'south-dakota': '46',
  tennessee: '47',
  texas: '48',
  utah: '49',
  vermont: '50',
  virginia: '51',
  washington: '53',
  'west-virginia': '54',
  wisconsin: '55',
  wyoming: '56',
  dc: '11',
  'puerto-rico': '72',
  guam: '66',
  'us-virgin-islands': '78',
  'american-samoa': '60',
  'northern-mariana-islands': '69',
};
