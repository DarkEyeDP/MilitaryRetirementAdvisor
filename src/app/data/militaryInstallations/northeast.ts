import type { MilitaryInstallation } from './types';

// MD NJ NY MA PA DE CT RI DC

export const northeastInstallations: MilitaryInstallation[] = [
  // ── MARYLAND ──────────────────────────────────────────────────────────────
  { id: 'jba',                  name: 'Joint Base Andrews',                          stateId: 'maryland',     stateAbbr: 'MD', lat: 38.8108, lon: -76.8669 },
  { id: 'aberdeen-proving-ground', name: 'Aberdeen Proving Ground',                 stateId: 'maryland',     stateAbbr: 'MD', lat: 39.4654, lon: -76.1294 },
  { id: 'fort-meade',           name: 'Fort Meade',                                  stateId: 'maryland',     stateAbbr: 'MD', lat: 39.1112, lon: -76.7358 },
  { id: 'nsa-bethesda',         name: 'Naval Support Activity Bethesda (Walter Reed)', stateId: 'maryland',   stateAbbr: 'MD', lat: 38.9844, lon: -77.0947 },
  { id: 'patuxent-river',       name: 'Naval Air Station Patuxent River',            stateId: 'maryland',     stateAbbr: 'MD', lat: 38.2862, lon: -76.4117 },

  // ── NEW JERSEY ────────────────────────────────────────────────────────────
  { id: 'jb-mdl',               name: 'Joint Base McGuire-Dix-Lakehurst',            stateId: 'new-jersey',   stateAbbr: 'NJ', lat: 40.0144, lon: -74.5918 },
  { id: 'picatinny-arsenal',    name: 'Picatinny Arsenal',                           stateId: 'new-jersey',   stateAbbr: 'NJ', lat: 40.9784, lon: -74.5487 },

  // ── NEW YORK ──────────────────────────────────────────────────────────────
  { id: 'fort-drum',            name: 'Fort Drum',                                   stateId: 'new-york',     stateAbbr: 'NY', lat: 44.0551, lon: -75.7696 },
  { id: 'usma-west-point',      name: 'United States Military Academy West Point',   stateId: 'new-york',     stateAbbr: 'NY', lat: 41.3912, lon: -73.9570 },
  { id: 'niagara-falls-ars',    name: 'Niagara Falls Air Reserve Station',           stateId: 'new-york',     stateAbbr: 'NY', lat: 43.1072, lon: -78.9458 },

  // ── MASSACHUSETTS ─────────────────────────────────────────────────────────
  { id: 'natick-labs',          name: 'Natick Soldier Systems Center',               stateId: 'massachusetts', stateAbbr: 'MA', lat: 42.3468, lon: -71.3756 },
  { id: 'hanscom-afb',          name: 'Hanscom Air Force Base',                      stateId: 'massachusetts', stateAbbr: 'MA', lat: 42.4613, lon: -71.2868 },
  { id: 'cape-cod-ars',         name: 'Cape Cod Air Force Station',                  stateId: 'massachusetts', stateAbbr: 'MA', lat: 41.7551, lon: -70.5370 },

  // ── PENNSYLVANIA ──────────────────────────────────────────────────────────
  { id: 'carlisle-barracks',    name: 'Carlisle Barracks (Army War College)',         stateId: 'pennsylvania', stateAbbr: 'PA', lat: 40.2001, lon: -77.1836 },
  { id: 'letterkenny-army-depot', name: 'Letterkenny Army Depot',                    stateId: 'pennsylvania', stateAbbr: 'PA', lat: 39.9903, lon: -77.6444 },

  // ── DELAWARE ──────────────────────────────────────────────────────────────
  { id: 'dover-afb',            name: 'Dover Air Force Base',                        stateId: 'delaware',     stateAbbr: 'DE', lat: 39.1295, lon: -75.4660 },

  // ── CONNECTICUT ───────────────────────────────────────────────────────────
  { id: 'nsb-new-london',       name: 'Naval Submarine Base New London',             stateId: 'connecticut',  stateAbbr: 'CT', lat: 41.3934, lon: -72.0940 },

  // ── RHODE ISLAND ──────────────────────────────────────────────────────────
  { id: 'ns-newport',           name: 'Naval Station Newport',                       stateId: 'rhode-island', stateAbbr: 'RI', lat: 41.5060, lon: -71.3272 },

  // ── DISTRICT OF COLUMBIA ──────────────────────────────────────────────────
  { id: 'jbab',                         name: 'Joint Base Anacostia-Bolling',        stateId: 'dc',           stateAbbr: 'DC', lat: 38.8440, lon: -77.0165 },
  { id: 'fort-mcnair',                  name: 'Fort Lesley J. McNair',               stateId: 'dc',           stateAbbr: 'DC', lat: 38.8688, lon: -77.0139 },
  { id: 'marine-barracks-washington',   name: 'Marine Barracks Washington (8th & I)', stateId: 'dc',          stateAbbr: 'DC', lat: 38.8794, lon: -76.9949 },
  { id: 'washington-navy-yard',         name: 'Washington Navy Yard',                stateId: 'dc',           stateAbbr: 'DC', lat: 38.8713, lon: -77.0005 },
];
