import type { MilitaryInstallation } from './types';

// OK KS MO IL NE ND SD OH IN MI

export const midwestInstallations: MilitaryInstallation[] = [
  // ── OKLAHOMA ──────────────────────────────────────────────────────────────
  { id: 'fort-sill',           name: 'Fort Sill',                               stateId: 'oklahoma',     stateAbbr: 'OK', lat: 34.6496, lon: -98.4017  },
  { id: 'tinker-afb',          name: 'Tinker Air Force Base',                   stateId: 'oklahoma',     stateAbbr: 'OK', lat: 35.4147, lon: -97.3866  },
  { id: 'vance-afb',           name: 'Vance Air Force Base',                    stateId: 'oklahoma',     stateAbbr: 'OK', lat: 36.3392, lon: -97.9158  },
  { id: 'altus-afb',           name: 'Altus Air Force Base',                    stateId: 'oklahoma',     stateAbbr: 'OK', lat: 34.6671, lon: -99.2669  },

  // ── KANSAS ────────────────────────────────────────────────────────────────
  { id: 'fort-leavenworth',    name: 'Fort Leavenworth',                        stateId: 'kansas',       stateAbbr: 'KS', lat: 39.3614, lon: -94.9219  },
  { id: 'fort-riley',          name: 'Fort Riley',                               stateId: 'kansas',       stateAbbr: 'KS', lat: 39.0963, lon: -96.8092  },
  { id: 'mcconnell-afb',       name: 'McConnell Air Force Base',                 stateId: 'kansas',       stateAbbr: 'KS', lat: 37.6218, lon: -97.2683  },

  // ── MISSOURI ──────────────────────────────────────────────────────────────
  { id: 'whiteman-afb',        name: 'Whiteman Air Force Base',                  stateId: 'missouri',     stateAbbr: 'MO', lat: 38.7272, lon: -93.5483  },
  { id: 'fort-leonard-wood',   name: 'Fort Leonard Wood',                        stateId: 'missouri',     stateAbbr: 'MO', lat: 37.7200, lon: -92.1394  },

  // ── ILLINOIS ──────────────────────────────────────────────────────────────
  { id: 'scott-afb',           name: 'Scott Air Force Base',                     stateId: 'illinois',     stateAbbr: 'IL', lat: 38.5418, lon: -89.8497  },

  // ── NEBRASKA ──────────────────────────────────────────────────────────────
  { id: 'offutt-afb',          name: 'Offutt Air Force Base',                    stateId: 'nebraska',     stateAbbr: 'NE', lat: 41.1182, lon: -95.9125  },

  // ── NORTH DAKOTA ──────────────────────────────────────────────────────────
  { id: 'minot-afb',           name: 'Minot Air Force Base',                     stateId: 'north-dakota', stateAbbr: 'ND', lat: 48.4156, lon: -101.3578 },
  { id: 'grand-forks-afb',     name: 'Grand Forks Air Force Base',               stateId: 'north-dakota', stateAbbr: 'ND', lat: 47.9611, lon: -97.3761  },

  // ── SOUTH DAKOTA ──────────────────────────────────────────────────────────
  { id: 'ellsworth-afb',       name: 'Ellsworth Air Force Base',                 stateId: 'south-dakota', stateAbbr: 'SD', lat: 44.1455, lon: -103.1036 },

  // ── OHIO ──────────────────────────────────────────────────────────────────
  { id: 'wright-patterson-afb', name: 'Wright-Patterson Air Force Base',         stateId: 'ohio',         stateAbbr: 'OH', lat: 39.8261, lon: -84.0484  },

  // ── INDIANA ───────────────────────────────────────────────────────────────
  { id: 'crane-nswc',          name: 'Naval Surface Warfare Center Crane',        stateId: 'indiana',      stateAbbr: 'IN', lat: 38.8286, lon: -86.8408  },

  // ── MICHIGAN ──────────────────────────────────────────────────────────────
  { id: 'selfridge-angb',      name: 'Selfridge Air National Guard Base',         stateId: 'michigan',     stateAbbr: 'MI', lat: 42.6083, lon: -82.8358  },
];
