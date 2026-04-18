export type { MilitaryInstallation } from './types';
export { westInstallations }        from './west';
export { southInstallations }       from './south';
export { northeastInstallations }   from './northeast';
export { midwestInstallations }     from './midwest';
export { territoriesInstallations } from './territories';

import { westInstallations }        from './west';
import { southInstallations }       from './south';
import { northeastInstallations }   from './northeast';
import { midwestInstallations }     from './midwest';
import { territoriesInstallations } from './territories';

export const militaryInstallations = [
  ...westInstallations,
  ...southInstallations,
  ...northeastInstallations,
  ...midwestInstallations,
  ...territoriesInstallations,
];
