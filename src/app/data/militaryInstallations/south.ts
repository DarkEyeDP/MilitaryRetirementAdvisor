import type { MilitaryInstallation } from './types';

// FL GA NC VA TX SC AL MS LA KY TN AR

export const southInstallations: MilitaryInstallation[] = [
  // ── FLORIDA ───────────────────────────────────────────────────────────────
  { id: 'eglin-afb',          name: 'Eglin Air Force Base',                                  stateId: 'florida',         stateAbbr: 'FL', lat: 30.4832, lon: -86.5255  },
  { id: 'hurlburt-field',     name: 'Hurlburt Field (Air Force Special Operations Command)', stateId: 'florida',         stateAbbr: 'FL', lat: 30.4278, lon: -86.6903  },
  { id: 'nas-jacksonville',   name: 'Naval Air Station Jacksonville',                        stateId: 'florida',         stateAbbr: 'FL', lat: 30.2353, lon: -81.6806  },
  { id: 'ns-mayport',         name: 'Naval Station Mayport',                                 stateId: 'florida',         stateAbbr: 'FL', lat: 30.3928, lon: -81.4225  },
  { id: 'nas-pensacola',      name: 'Naval Air Station Pensacola',                           stateId: 'florida',         stateAbbr: 'FL', lat: 30.3526, lon: -87.3186  },
  { id: 'nas-whiting-field',  name: 'Naval Air Station Whiting Field',                       stateId: 'florida',         stateAbbr: 'FL', lat: 30.7224, lon: -87.0228  },
  { id: 'patrick-sfb',        name: 'Patrick Space Force Base',                              stateId: 'florida',         stateAbbr: 'FL', lat: 28.2347, lon: -80.6011  },
  { id: 'tyndall-afb',        name: 'Tyndall Air Force Base',                                stateId: 'florida',         stateAbbr: 'FL', lat: 30.0697, lon: -85.6083  },
  { id: 'macdill-afb',        name: 'MacDill Air Force Base',                                stateId: 'florida',         stateAbbr: 'FL', lat: 27.8493, lon: -82.5212  },
  { id: 'nas-key-west',       name: 'Naval Air Station Key West',                            stateId: 'florida',         stateAbbr: 'FL', lat: 24.5782, lon: -81.6893  },
  { id: 'nsa-panama-city',    name: 'Naval Support Activity Panama City',                    stateId: 'florida',         stateAbbr: 'FL', lat: 30.1916, lon: -85.6788  },
  { id: 'camp-blanding',      name: 'Camp Blanding Joint Training Center',                   stateId: 'florida',         stateAbbr: 'FL', lat: 29.9335, lon: -81.9885  },

  // ── GEORGIA ───────────────────────────────────────────────────────────────
  { id: 'fort-eisenhower',    name: 'Fort Eisenhower (formerly Fort Gordon)',                 stateId: 'georgia',         stateAbbr: 'GA', lat: 33.4226, lon: -82.1501  },
  { id: 'fort-moore',         name: 'Fort Moore (formerly Fort Benning)',                     stateId: 'georgia',         stateAbbr: 'GA', lat: 32.3643, lon: -84.9913  },
  { id: 'fort-stewart',       name: 'Fort Stewart',                                          stateId: 'georgia',         stateAbbr: 'GA', lat: 31.8690, lon: -81.6106  },
  { id: 'hunter-aaf',         name: 'Hunter Army Airfield',                                  stateId: 'georgia',         stateAbbr: 'GA', lat: 32.0098, lon: -81.1459  },
  { id: 'moody-afb',          name: 'Moody Air Force Base',                                  stateId: 'georgia',         stateAbbr: 'GA', lat: 30.9678, lon: -83.1932  },
  { id: 'robins-afb',         name: 'Robins Air Force Base',                                 stateId: 'georgia',         stateAbbr: 'GA', lat: 32.6401, lon: -83.5919  },
  { id: 'kings-bay-nsb',      name: 'Naval Submarine Base Kings Bay',                        stateId: 'georgia',         stateAbbr: 'GA', lat: 30.7989, lon: -81.5570  },
  { id: 'mclb-albany',        name: 'Marine Corps Logistics Base Albany',                    stateId: 'georgia',         stateAbbr: 'GA', lat: 31.5359, lon: -84.0573  },

  // ── NORTH CAROLINA ────────────────────────────────────────────────────────
  { id: 'fort-liberty',           name: 'Fort Liberty (formerly Fort Bragg)',                stateId: 'north-carolina',  stateAbbr: 'NC', lat: 35.1427, lon: -79.0060  },
  { id: 'mcb-camp-lejeune',       name: 'Marine Corps Base Camp Lejeune',                   stateId: 'north-carolina',  stateAbbr: 'NC', lat: 34.6691, lon: -77.3406  },
  { id: 'mcas-cherry-point',      name: 'Marine Corps Air Station Cherry Point',            stateId: 'north-carolina',  stateAbbr: 'NC', lat: 34.9006, lon: -76.8803  },
  { id: 'mcas-new-river',         name: 'Marine Corps Air Station New River',               stateId: 'north-carolina',  stateAbbr: 'NC', lat: 34.7081, lon: -77.4396  },
  { id: 'seymour-johnson-afb',    name: 'Seymour Johnson Air Force Base',                   stateId: 'north-carolina',  stateAbbr: 'NC', lat: 35.3394, lon: -77.9606  },
  { id: 'camp-lejeune-stone-bay', name: 'Camp Davis (Stone Bay)',                           stateId: 'north-carolina',  stateAbbr: 'NC', lat: 34.5926, lon: -77.3878  },

  // ── VIRGINIA ──────────────────────────────────────────────────────────────
  { id: 'jble',               name: 'Joint Base Langley-Eustis',                             stateId: 'virginia',        stateAbbr: 'VA', lat: 37.0826, lon: -76.3597  },
  { id: 'ns-norfolk',         name: 'Naval Station Norfolk',                                 stateId: 'virginia',        stateAbbr: 'VA', lat: 36.9466, lon: -76.2988  },
  { id: 'nas-oceana',         name: 'Naval Air Station Oceana',                              stateId: 'virginia',        stateAbbr: 'VA', lat: 36.8203, lon: -76.0334  },
  { id: 'jb-little-creek',    name: 'Joint Base Little Creek-Fort Story',                   stateId: 'virginia',        stateAbbr: 'VA', lat: 36.9215, lon: -76.0608  },
  { id: 'mcb-quantico',       name: 'Marine Corps Base Quantico',                           stateId: 'virginia',        stateAbbr: 'VA', lat: 38.5146, lon: -77.3498  },
  { id: 'fort-belvoir',       name: 'Fort Belvoir',                                          stateId: 'virginia',        stateAbbr: 'VA', lat: 38.7128, lon: -77.1494  },
  { id: 'nswc-dahlgren',      name: 'Naval Surface Warfare Center Dahlgren',                stateId: 'virginia',        stateAbbr: 'VA', lat: 38.3309, lon: -77.0342  },
  { id: 'nsa-hampton-roads',  name: 'Naval Support Activity Hampton Roads',                 stateId: 'virginia',        stateAbbr: 'VA', lat: 36.8698, lon: -76.2950  },
  { id: 'pentagon',           name: 'The Pentagon',                                          stateId: 'virginia',        stateAbbr: 'VA', lat: 38.8719, lon: -77.0563  },

  // ── TEXAS ─────────────────────────────────────────────────────────────────
  { id: 'camp-mabry',         name: 'Camp Mabry',                                            stateId: 'texas',           stateAbbr: 'TX', lat: 30.3134, lon: -97.7666  },
  { id: 'fort-cavazos',       name: 'Fort Cavazos (formerly Fort Hood)',                     stateId: 'texas',           stateAbbr: 'TX', lat: 31.1378, lon: -97.7831  },
  { id: 'fort-sam-houston',   name: 'Fort Sam Houston',                                      stateId: 'texas',           stateAbbr: 'TX', lat: 29.4586, lon: -98.4370  },
  { id: 'jbsa-lackland',      name: 'Joint Base San Antonio-Lackland',                       stateId: 'texas',           stateAbbr: 'TX', lat: 29.3844, lon: -98.6204  },
  { id: 'jbsa-randolph',      name: 'Joint Base San Antonio-Randolph',                       stateId: 'texas',           stateAbbr: 'TX', lat: 29.5293, lon: -98.2789  },
  { id: 'dyess-afb',          name: 'Dyess Air Force Base',                                  stateId: 'texas',           stateAbbr: 'TX', lat: 32.4208, lon: -99.8544  },
  { id: 'goodfellow-afb',     name: 'Goodfellow Air Force Base',                             stateId: 'texas',           stateAbbr: 'TX', lat: 31.3588, lon: -100.4017 },
  { id: 'laughlin-afb',       name: 'Laughlin Air Force Base',                               stateId: 'texas',           stateAbbr: 'TX', lat: 29.3595, lon: -100.7784 },
  { id: 'sheppard-afb',       name: 'Sheppard Air Force Base',                               stateId: 'texas',           stateAbbr: 'TX', lat: 33.9788, lon: -98.8311  },
  { id: 'nas-jrb-fort-worth', name: 'Naval Air Station Joint Reserve Base Fort Worth',       stateId: 'texas',           stateAbbr: 'TX', lat: 32.7693, lon: -97.4415  },
  { id: 'ns-ingleside',       name: 'Naval Station Ingleside',                               stateId: 'texas',           stateAbbr: 'TX', lat: 27.8613, lon: -97.2126  },
  { id: 'fort-bliss',         name: 'Fort Bliss',                                            stateId: 'texas',           stateAbbr: 'TX', lat: 31.8124, lon: -106.4183 },
  { id: 'corpus-christi-nas', name: 'Naval Air Station Corpus Christi',                      stateId: 'texas',           stateAbbr: 'TX', lat: 27.6954, lon: -97.2885  },

  // ── SOUTH CAROLINA ────────────────────────────────────────────────────────
  { id: 'fort-jackson',       name: 'Fort Jackson',                                          stateId: 'south-carolina',  stateAbbr: 'SC', lat: 34.0498, lon: -80.9076  },
  { id: 'shaw-afb',           name: 'Shaw Air Force Base',                                   stateId: 'south-carolina',  stateAbbr: 'SC', lat: 33.9726, lon: -80.4706  },
  { id: 'jb-charleston',      name: 'Joint Base Charleston',                                 stateId: 'south-carolina',  stateAbbr: 'SC', lat: 32.8991, lon: -80.0401  },
  { id: 'mcas-beaufort',      name: 'Marine Corps Air Station Beaufort',                     stateId: 'south-carolina',  stateAbbr: 'SC', lat: 32.4773, lon: -80.7231  },
  { id: 'mcrd-parris-island', name: 'Marine Corps Recruit Depot Parris Island',              stateId: 'south-carolina',  stateAbbr: 'SC', lat: 32.3336, lon: -80.6850  },

  // ── ALABAMA ───────────────────────────────────────────────────────────────
  { id: 'fort-novosel',       name: 'Fort Novosel (formerly Fort Rucker)',                   stateId: 'alabama',         stateAbbr: 'AL', lat: 31.3647, lon: -85.7197  },
  { id: 'redstone-arsenal',   name: 'Redstone Arsenal',                                      stateId: 'alabama',         stateAbbr: 'AL', lat: 34.6789, lon: -86.6494  },
  { id: 'maxwell-afb',        name: 'Maxwell Air Force Base',                                stateId: 'alabama',         stateAbbr: 'AL', lat: 32.3829, lon: -86.3644  },

  // ── MISSISSIPPI ───────────────────────────────────────────────────────────
  { id: 'keesler-afb',        name: 'Keesler Air Force Base',                                stateId: 'mississippi',     stateAbbr: 'MS', lat: 30.4113, lon: -88.9239  },
  { id: 'camp-shelby',        name: 'Camp Shelby Joint Forces Training Center',              stateId: 'mississippi',     stateAbbr: 'MS', lat: 31.3391, lon: -89.2092  },
  { id: 'columbus-afb',       name: 'Columbus Air Force Base',                               stateId: 'mississippi',     stateAbbr: 'MS', lat: 33.6438, lon: -88.4438  },

  // ── LOUISIANA ─────────────────────────────────────────────────────────────
  { id: 'fort-johnson',           name: 'Fort Johnson (formerly Fort Polk)',                 stateId: 'louisiana',       stateAbbr: 'LA', lat: 31.0449, lon: -93.2058  },
  { id: 'barksdale-afb',          name: 'Barksdale Air Force Base',                          stateId: 'louisiana',       stateAbbr: 'LA', lat: 32.5018, lon: -93.6627  },
  { id: 'nas-jrb-new-orleans',    name: 'Naval Air Station Joint Reserve Base New Orleans',  stateId: 'louisiana',       stateAbbr: 'LA', lat: 29.8243, lon: -90.0282  },

  // ── KENTUCKY ──────────────────────────────────────────────────────────────
  { id: 'fort-knox',          name: 'Fort Knox',                                             stateId: 'kentucky',        stateAbbr: 'KY', lat: 37.8897, lon: -85.9630  },
  { id: 'fort-campbell',      name: 'Fort Campbell',                                         stateId: 'kentucky',        stateAbbr: 'KY', lat: 36.6565, lon: -87.4721  },

  // ── TENNESSEE ─────────────────────────────────────────────────────────────
  { id: 'arnold-afb',         name: 'Arnold Air Force Base',                                 stateId: 'tennessee',       stateAbbr: 'TN', lat: 35.3928, lon: -86.0883  },

  // ── ARKANSAS ──────────────────────────────────────────────────────────────
  { id: 'little-rock-afb',    name: 'Little Rock Air Force Base',                            stateId: 'arkansas',        stateAbbr: 'AR', lat: 34.9169, lon: -92.1497  },
];
