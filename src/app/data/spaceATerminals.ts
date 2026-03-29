/**
 * AMC CONUS Space-A Passenger Terminals
 * Source: https://www.amc.af.mil/AMC-Travel-Site/
 * 16 official AMC CONUS terminals as listed on the AMC Travel Site.
 * Phone numbers sourced from AMC Pax Terminal Contact Info (May 2022).
 */

export interface SpaceATerminal {
  id: string;
  name: string;
  base: string;          // Short base/installation name
  stateId: string;       // State the terminal is located in (hyphenated lowercase)
  stateAbbr: string;
  phone: string;
  amcUrl: string;
  lat: number;
  lon: number;
}

export const spaceATerminals: SpaceATerminal[] = [
  {
    id: 'bwi',
    name: 'Baltimore-Washington Int\'l (BWI) Passenger Terminal',
    base: 'BWI Airport',
    stateId: 'maryland',
    stateAbbr: 'MD',
    phone: '(609) 253-8825',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Baltimore-Washington-International-Airport-Passenger-Terminal/',
    lat: 39.1754,
    lon: -76.6682,
  },
  {
    id: 'dover-afb',
    name: 'Dover AFB Passenger Terminal',
    base: 'Dover AFB',
    stateId: 'delaware',
    stateAbbr: 'DE',
    phone: '(302) 677-4088',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Dover-AFB-Passenger-Terminal/',
    lat: 39.1295,
    lon: -75.4660,
  },
  {
    id: 'fairchild-afb',
    name: 'Fairchild AFB Passenger Terminal',
    base: 'Fairchild AFB',
    stateId: 'washington',
    stateAbbr: 'WA',
    phone: '(509) 247-2195',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Fairchild-AFB-Passenger-Terminal/',
    lat: 47.6151,
    lon: -117.6560,
  },
  {
    id: 'jb-andrews',
    name: 'Joint Base Andrews Passenger Terminal',
    base: 'Joint Base Andrews',
    stateId: 'maryland',
    stateAbbr: 'MD',
    phone: '(301) 981-3604',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Joint-Base-Andrews-Passenger-Terminal/',
    lat: 38.8108,
    lon: -76.8694,
  },
  {
    id: 'jb-charleston',
    name: 'Joint Base Charleston Passenger Terminal',
    base: 'Joint Base Charleston',
    stateId: 'south-carolina',
    stateAbbr: 'SC',
    phone: '(843) 963-3048',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Joint-Base-Charleston-Passenger-Terminal/',
    lat: 32.8986,
    lon: -80.0403,
  },
  {
    id: 'jblm',
    name: 'Joint Base Lewis-McChord Passenger Terminal',
    base: 'JBLM',
    stateId: 'washington',
    stateAbbr: 'WA',
    phone: '(253) 982-7259',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Joint-Base-Lewis-McChord-Passenger-Terminal/',
    lat: 47.1151,
    lon: -122.5779,
  },
  {
    id: 'jb-mdl',
    name: 'Joint Base McGuire-Dix-Lakehurst Passenger Terminal',
    base: 'JB McGuire-Dix-Lakehurst',
    stateId: 'new-jersey',
    stateAbbr: 'NJ',
    phone: '(609) 754-5023',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Joint-Base-MDL-Passenger-Terminal/',
    lat: 40.0144,
    lon: -74.5969,
  },
  {
    id: 'little-rock-afb',
    name: 'Little Rock AFB Passenger Terminal',
    base: 'Little Rock AFB',
    stateId: 'arkansas',
    stateAbbr: 'AR',
    phone: '(501) 987-3342',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Little-Rock-AFB-Passenger-Terminal/',
    lat: 34.9169,
    lon: -92.1497,
  },
  {
    id: 'macdill-afb',
    name: 'MacDill AFB Passenger Terminal',
    base: 'MacDill AFB',
    stateId: 'florida',
    stateAbbr: 'FL',
    phone: '(813) 828-2485',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/MacDill-AFB-Passenger-Terminal/',
    lat: 27.8493,
    lon: -82.5212,
  },
  {
    id: 'mcconnell-afb',
    name: 'McConnell AFB Air Transportation Function',
    base: 'McConnell AFB',
    stateId: 'kansas',
    stateAbbr: 'KS',
    phone: '(316) 759-4810',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/McConnell-AFB-Air-Transportation-Function/',
    lat: 37.6218,
    lon: -97.2682,
  },
  {
    id: 'nas-jacksonville',
    name: 'NAS Jacksonville Passenger Terminal',
    base: 'NAS Jacksonville',
    stateId: 'florida',
    stateAbbr: 'FL',
    phone: '(904) 542-8159',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/NAS-Jacksonville-Passenger-Terminal/',
    lat: 30.2358,
    lon: -81.6806,
  },
  {
    id: 'ns-norfolk',
    name: 'NS Norfolk Passenger Terminal',
    base: 'Naval Station Norfolk',
    stateId: 'virginia',
    stateAbbr: 'VA',
    phone: '(757) 444-4118',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/NS-Norfolk-Passenger-Terminal/',
    lat: 36.9376,
    lon: -76.2988,
  },
  {
    id: 'pope-field',
    name: 'Pope Field Passenger Terminal',
    base: 'Pope Field (Fort Liberty)',
    stateId: 'north-carolina',
    stateAbbr: 'NC',
    phone: '(910) 394-6527',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Pope-Army-Airfield-Passenger-Terminal/',
    lat: 35.1708,
    lon: -79.0145,
  },
  {
    id: 'scott-afb',
    name: 'Scott AFB Air Transportation Function',
    base: 'Scott AFB',
    stateId: 'illinois',
    stateAbbr: 'IL',
    phone: '(618) 256-1854',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Scott-AFB-Air-Transportation-Function/',
    lat: 38.5418,
    lon: -89.8495,
  },
  {
    id: 'seatac',
    name: 'Seattle-Tacoma International Gateway',
    base: 'Seattle-Tacoma IAP',
    stateId: 'washington',
    stateAbbr: 'WA',
    phone: '(253) 982-3504',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Seattle-Tacoma-International-Gateway/',
    lat: 47.4502,
    lon: -122.3088,
  },
  {
    id: 'travis-afb',
    name: 'Travis AFB Passenger Terminal',
    base: 'Travis AFB',
    stateId: 'california',
    stateAbbr: 'CA',
    phone: '(707) 424-1854',
    amcUrl: 'https://www.amc.af.mil/AMC-Travel-Site/Terminals/CONUS-Terminals/Travis-AFB-Passenger-Terminal/',
    lat: 38.2627,
    lon: -121.9277,
  },
];

/** States that share a land border — used to determine Space-A proximity benefits */
export const stateAdjacency: Record<string, string[]> = {
  'alabama':        ['florida', 'georgia', 'mississippi', 'tennessee'],
  'alaska':         [],
  'arizona':        ['california', 'colorado', 'nevada', 'new-mexico', 'utah'],
  'arkansas':       ['louisiana', 'mississippi', 'missouri', 'oklahoma', 'tennessee', 'texas'],
  'california':     ['arizona', 'nevada', 'oregon'],
  'colorado':       ['arizona', 'kansas', 'nebraska', 'new-mexico', 'oklahoma', 'utah', 'wyoming'],
  'connecticut':    ['massachusetts', 'new-york', 'rhode-island'],
  'delaware':       ['maryland', 'new-jersey', 'pennsylvania'],
  'florida':        ['alabama', 'georgia'],
  'georgia':        ['alabama', 'florida', 'north-carolina', 'south-carolina', 'tennessee'],
  'hawaii':         [],
  'idaho':          ['montana', 'nevada', 'oregon', 'utah', 'washington', 'wyoming'],
  'illinois':       ['indiana', 'iowa', 'kentucky', 'michigan', 'missouri', 'wisconsin'],
  'indiana':        ['illinois', 'kentucky', 'michigan', 'ohio'],
  'iowa':           ['illinois', 'minnesota', 'missouri', 'nebraska', 'south-dakota', 'wisconsin'],
  'kansas':         ['colorado', 'missouri', 'nebraska', 'oklahoma'],
  'kentucky':       ['illinois', 'indiana', 'missouri', 'ohio', 'tennessee', 'virginia', 'west-virginia'],
  'louisiana':      ['arkansas', 'mississippi', 'texas'],
  'maine':          ['new-hampshire'],
  'maryland':       ['delaware', 'pennsylvania', 'virginia', 'west-virginia'],
  'massachusetts':  ['connecticut', 'new-hampshire', 'new-york', 'rhode-island', 'vermont'],
  'michigan':       ['indiana', 'ohio', 'wisconsin'],
  'minnesota':      ['iowa', 'north-dakota', 'south-dakota', 'wisconsin'],
  'mississippi':    ['alabama', 'arkansas', 'louisiana', 'tennessee'],
  'missouri':       ['arkansas', 'illinois', 'iowa', 'kansas', 'kentucky', 'nebraska', 'oklahoma', 'tennessee'],
  'montana':        ['idaho', 'north-dakota', 'south-dakota', 'wyoming'],
  'nebraska':       ['colorado', 'iowa', 'kansas', 'missouri', 'south-dakota', 'wyoming'],
  'nevada':         ['arizona', 'california', 'idaho', 'oregon', 'utah'],
  'new-hampshire':  ['maine', 'massachusetts', 'vermont'],
  'new-jersey':     ['delaware', 'new-york', 'pennsylvania'],
  'new-mexico':     ['arizona', 'colorado', 'oklahoma', 'texas', 'utah'],
  'new-york':       ['connecticut', 'massachusetts', 'new-jersey', 'pennsylvania', 'vermont'],
  'north-carolina': ['georgia', 'south-carolina', 'tennessee', 'virginia'],
  'north-dakota':   ['minnesota', 'montana', 'south-dakota'],
  'ohio':           ['indiana', 'kentucky', 'michigan', 'pennsylvania', 'west-virginia'],
  'oklahoma':       ['arkansas', 'colorado', 'kansas', 'missouri', 'new-mexico', 'texas'],
  'oregon':         ['california', 'idaho', 'nevada', 'washington'],
  'pennsylvania':   ['delaware', 'maryland', 'new-jersey', 'new-york', 'ohio', 'west-virginia'],
  'rhode-island':   ['connecticut', 'massachusetts'],
  'south-carolina': ['georgia', 'north-carolina'],
  'south-dakota':   ['iowa', 'minnesota', 'montana', 'nebraska', 'north-dakota', 'wyoming'],
  'tennessee':      ['alabama', 'arkansas', 'georgia', 'kentucky', 'mississippi', 'missouri', 'north-carolina', 'virginia'],
  'texas':          ['arkansas', 'louisiana', 'new-mexico', 'oklahoma'],
  'utah':           ['arizona', 'colorado', 'idaho', 'nevada', 'new-mexico', 'wyoming'],
  'vermont':        ['massachusetts', 'new-hampshire', 'new-york'],
  'virginia':       ['kentucky', 'maryland', 'north-carolina', 'tennessee', 'west-virginia'],
  'washington':     ['idaho', 'oregon'],
  'west-virginia':  ['kentucky', 'maryland', 'ohio', 'pennsylvania', 'virginia'],
  'wisconsin':      ['illinois', 'iowa', 'michigan', 'minnesota'],
  'wyoming':        ['colorado', 'idaho', 'montana', 'nebraska', 'south-dakota', 'utah'],
};

/**
 * Returns terminals in the given state and in bordering states.
 * In-state terminals are returned first.
 */
export function getSpaceATerminalsByProximity(stateId: string): {
  inState: SpaceATerminal[];
  bordering: SpaceATerminal[];
} {
  const neighbors = stateAdjacency[stateId] ?? [];
  const inState = spaceATerminals.filter((t) => t.stateId === stateId);
  const bordering = spaceATerminals.filter((t) => neighbors.includes(t.stateId));
  return { inState, bordering };
}
