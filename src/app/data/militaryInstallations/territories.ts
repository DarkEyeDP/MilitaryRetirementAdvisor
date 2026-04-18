import type { MilitaryInstallation } from './types';

// PR GU

export const territoriesInstallations: MilitaryInstallation[] = [
  // ── PUERTO RICO ───────────────────────────────────────────────────────────
  { id: 'fort-buchanan', name: 'Fort Buchanan',                  stateId: 'puerto-rico', stateAbbr: 'PR', lat: 18.3834, lon: -66.1044 },
  { id: 'muniz-ang',     name: 'Muñiz Air National Guard Base',  stateId: 'puerto-rico', stateAbbr: 'PR', lat: 18.4941, lon: -66.0020 },

  // ── GUAM ──────────────────────────────────────────────────────────────────
  { id: 'naval-station-guam', name: 'Naval Station Guam',        stateId: 'guam',        stateAbbr: 'GU', lat: 13.4449, lon: 144.6509 },
  { id: 'andersen-afb',       name: 'Andersen Air Force Base',   stateId: 'guam',        stateAbbr: 'GU', lat: 13.5832, lon: 144.9298 },
  { id: 'mcb-camp-blaz',      name: 'Marine Corps Base Camp Blaz', stateId: 'guam',      stateAbbr: 'GU', lat: 13.5294, lon: 144.8486 },
];
