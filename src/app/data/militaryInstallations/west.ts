import type { MilitaryInstallation } from './types';

// CA WA CO NV AZ HI AK NM UT ID MT WY

export const westInstallations: MilitaryInstallation[] = [
  // ── CALIFORNIA ────────────────────────────────────────────────────────────
  { id: 'camp-pendleton',          name: 'Marine Corps Base Camp Pendleton',                    stateId: 'california', stateAbbr: 'CA', lat: 33.3956,  lon: -117.5626  },
  { id: 'nb-san-diego',            name: 'Naval Base San Diego',                                stateId: 'california', stateAbbr: 'CA', lat: 32.6781,  lon: -117.1128  },
  { id: 'nas-north-island',        name: 'Naval Air Station North Island',                      stateId: 'california', stateAbbr: 'CA', lat: 32.6969,  lon: -117.2117  },
  { id: 'mcas-miramar',            name: 'Marine Corps Air Station Miramar',                    stateId: 'california', stateAbbr: 'CA', lat: 32.8681,  lon: -117.1425  },
  { id: 'nb-point-loma',           name: 'Naval Base Point Loma',                               stateId: 'california', stateAbbr: 'CA', lat: 32.6736,  lon: -117.2400  },
  { id: 'nbvc',                    name: 'Naval Base Ventura County',                           stateId: 'california', stateAbbr: 'CA', lat: 34.1200,  lon: -119.1200  },
  { id: 'edwards-afb',             name: 'Edwards Air Force Base',                              stateId: 'california', stateAbbr: 'CA', lat: 34.9054,  lon: -117.8839  },
  { id: 'vandenberg-sfb',          name: 'Vandenberg Space Force Base',                         stateId: 'california', stateAbbr: 'CA', lat: 34.7420,  lon: -120.5724  },
  { id: 'travis-afb',              name: 'Travis Air Force Base',                               stateId: 'california', stateAbbr: 'CA', lat: 38.2627,  lon: -121.9277  },
  { id: 'nas-lemoore',             name: 'Naval Air Station Lemoore',                           stateId: 'california', stateAbbr: 'CA', lat: 36.3331,  lon: -119.9522  },
  { id: 'presidio-monterey',       name: 'Presidio of Monterey (Defense Language Institute)',   stateId: 'california', stateAbbr: 'CA', lat: 36.5954,  lon: -121.8855  },
  { id: 'mclb-barstow',            name: 'Marine Corps Logistics Base Barstow',                 stateId: 'california', stateAbbr: 'CA', lat: 34.9008,  lon: -116.9969  },
  { id: 'fort-irwin',              name: 'Fort Irwin (National Training Center)',                stateId: 'california', stateAbbr: 'CA', lat: 35.2639,  lon: -116.6858  },
  { id: 'nws-seal-beach',          name: 'Naval Weapons Station Seal Beach',                    stateId: 'california', stateAbbr: 'CA', lat: 33.7342,  lon: -118.0756  },
  { id: 'mcagcc-twentynine-palms', name: 'Marine Corps Air Ground Combat Center Twentynine Palms', stateId: 'california', stateAbbr: 'CA', lat: 34.2922, lon: -116.1620 },
  { id: 'los-alamitos-jftb',       name: 'Los Alamitos Joint Forces Training Base',             stateId: 'california', stateAbbr: 'CA', lat: 33.7939,  lon: -118.0525  },
  { id: 'cg-island-alameda',       name: 'Coast Guard Island Alameda',                          stateId: 'california', stateAbbr: 'CA', lat: 37.7718,  lon: -122.2516  },
  { id: 'mcrd-san-diego',          name: 'Marine Corps Recruit Depot San Diego',                stateId: 'california', stateAbbr: 'CA', lat: 32.7428,  lon: -117.2005  },

  // ── WASHINGTON ────────────────────────────────────────────────────────────
  { id: 'jblm',                    name: 'Joint Base Lewis-McChord',                            stateId: 'washington', stateAbbr: 'WA', lat: 47.1095,  lon: -122.5776  },
  { id: 'nb-kitsap',               name: 'Naval Base Kitsap',                                   stateId: 'washington', stateAbbr: 'WA', lat: 47.5579,  lon: -122.6307  },
  { id: 'ns-everett',              name: 'Naval Station Everett',                               stateId: 'washington', stateAbbr: 'WA', lat: 47.9815,  lon: -122.2254  },
  { id: 'fairchild-afb-wa',        name: 'Fairchild Air Force Base',                            stateId: 'washington', stateAbbr: 'WA', lat: 47.6151,  lon: -117.6560  },
  { id: 'whidbey-island-nas',      name: 'Naval Air Station Whidbey Island',                    stateId: 'washington', stateAbbr: 'WA', lat: 48.3516,  lon: -122.6557  },

  // ── COLORADO ──────────────────────────────────────────────────────────────
  { id: 'fort-carson',             name: 'Fort Carson',                                         stateId: 'colorado',   stateAbbr: 'CO', lat: 38.7397,  lon: -104.7886  },
  { id: 'peterson-sfb',            name: 'Peterson Space Force Base',                           stateId: 'colorado',   stateAbbr: 'CO', lat: 38.8197,  lon: -104.7008  },
  { id: 'schriever-sfb',           name: 'Schriever Space Force Base',                          stateId: 'colorado',   stateAbbr: 'CO', lat: 38.8025,  lon: -104.5317  },
  { id: 'buckley-sfb',             name: 'Buckley Space Force Base',                            stateId: 'colorado',   stateAbbr: 'CO', lat: 39.7169,  lon: -104.7519  },
  { id: 'usaf-academy',            name: 'United States Air Force Academy',                     stateId: 'colorado',   stateAbbr: 'CO', lat: 38.9983,  lon: -104.8614  },
  { id: 'norad-cheyenne',          name: 'Cheyenne Mountain Space Force Station',               stateId: 'colorado',   stateAbbr: 'CO', lat: 38.7442,  lon: -104.8464  },

  // ── NEVADA ────────────────────────────────────────────────────────────────
  { id: 'nellis-afb',              name: 'Nellis Air Force Base',                               stateId: 'nevada',     stateAbbr: 'NV', lat: 36.2361,  lon: -115.0341  },
  { id: 'creech-afb',              name: 'Creech Air Force Base',                               stateId: 'nevada',     stateAbbr: 'NV', lat: 36.5819,  lon: -115.6725  },
  { id: 'nas-fallon',              name: 'Naval Air Station Fallon',                            stateId: 'nevada',     stateAbbr: 'NV', lat: 39.4166,  lon: -118.7009  },

  // ── ARIZONA ───────────────────────────────────────────────────────────────
  { id: 'davis-monthan-afb',       name: 'Davis-Monthan Air Force Base',                        stateId: 'arizona',    stateAbbr: 'AZ', lat: 32.1665,  lon: -110.8831  },
  { id: 'luke-afb',                name: 'Luke Air Force Base',                                 stateId: 'arizona',    stateAbbr: 'AZ', lat: 33.5350,  lon: -112.3831  },
  { id: 'fort-huachuca',           name: 'Fort Huachuca',                                       stateId: 'arizona',    stateAbbr: 'AZ', lat: 31.5544,  lon: -110.3447  },
  { id: 'yuma-proving-ground',     name: 'Yuma Proving Ground',                                 stateId: 'arizona',    stateAbbr: 'AZ', lat: 32.8956,  lon: -114.3903  },
  { id: 'mcas-yuma',               name: 'Marine Corps Air Station Yuma',                       stateId: 'arizona',    stateAbbr: 'AZ', lat: 32.6564,  lon: -114.6058  },

  // ── HAWAII ────────────────────────────────────────────────────────────────
  { id: 'jbphh',                   name: 'Joint Base Pearl Harbor-Hickam',                      stateId: 'hawaii',     stateAbbr: 'HI', lat: 21.3450,  lon: -157.9397  },
  { id: 'schofield-barracks',      name: 'Schofield Barracks',                                  stateId: 'hawaii',     stateAbbr: 'HI', lat: 21.4978,  lon: -158.0639  },
  { id: 'mcb-hawaii',              name: 'Marine Corps Base Hawaii (Kaneohe Bay)',               stateId: 'hawaii',     stateAbbr: 'HI', lat: 21.4472,  lon: -157.7669  },
  { id: 'wheeler-aaf',             name: 'Wheeler Army Airfield',                               stateId: 'hawaii',     stateAbbr: 'HI', lat: 21.4835,  lon: -158.0397  },
  { id: 'pohakuloa-training-area', name: 'Pohakuloa Training Area',                             stateId: 'hawaii',     stateAbbr: 'HI', lat: 19.7519,  lon: -155.5439  },

  // ── ALASKA ────────────────────────────────────────────────────────────────
  { id: 'jber',                    name: 'Joint Base Elmendorf-Richardson',                     stateId: 'alaska',     stateAbbr: 'AK', lat: 61.2530,  lon: -149.8069  },
  { id: 'fort-wainwright',         name: 'Fort Wainwright',                                     stateId: 'alaska',     stateAbbr: 'AK', lat: 64.8271,  lon: -147.6544  },
  { id: 'eielson-afb',             name: 'Eielson Air Force Base',                              stateId: 'alaska',     stateAbbr: 'AK', lat: 64.6657,  lon: -147.1019  },

  // ── NEW MEXICO ────────────────────────────────────────────────────────────
  { id: 'holloman-afb',            name: 'Holloman Air Force Base',                             stateId: 'new-mexico', stateAbbr: 'NM', lat: 32.8523,  lon: -106.1072  },
  { id: 'kirtland-afb',            name: 'Kirtland Air Force Base',                             stateId: 'new-mexico', stateAbbr: 'NM', lat: 35.0454,  lon: -106.6086  },
  { id: 'white-sands-ms',          name: 'White Sands Missile Range',                           stateId: 'new-mexico', stateAbbr: 'NM', lat: 32.3797,  lon: -106.4822  },
  { id: 'cannon-afb',              name: 'Cannon Air Force Base',                               stateId: 'new-mexico', stateAbbr: 'NM', lat: 34.3828,  lon: -103.3222  },

  // ── UTAH ──────────────────────────────────────────────────────────────────
  { id: 'hill-afb',                name: 'Hill Air Force Base',                                 stateId: 'utah',       stateAbbr: 'UT', lat: 41.1240,  lon: -111.9730  },
  { id: 'dugway-proving-ground',   name: 'Dugway Proving Ground',                               stateId: 'utah',       stateAbbr: 'UT', lat: 40.1933,  lon: -112.9352  },

  // ── IDAHO ─────────────────────────────────────────────────────────────────
  { id: 'mountain-home-afb',       name: 'Mountain Home Air Force Base',                        stateId: 'idaho',      stateAbbr: 'ID', lat: 43.0436,  lon: -115.8724  },

  // ── MONTANA ───────────────────────────────────────────────────────────────
  { id: 'malmstrom-afb',           name: 'Malmstrom Air Force Base',                            stateId: 'montana',    stateAbbr: 'MT', lat: 47.5097,  lon: -111.1878  },

  // ── WYOMING ───────────────────────────────────────────────────────────────
  { id: 'fe-warren-afb',           name: 'F.E. Warren Air Force Base',                          stateId: 'wyoming',    stateAbbr: 'WY', lat: 41.1451,  lon: -104.8650  },
];
