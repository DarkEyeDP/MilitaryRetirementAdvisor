/**
 * Veteran Perks — License/Registration and Medal Benefits by State
 *
 * Sources: State DMV websites, state department of veterans affairs,
 * Military.com benefits guide, VA state summaries (2024–2025 estimates).
 *
 * Always verify current benefits with official state resources before acting.
 * Benefits are subject to change with each legislative session.
 */

export interface VeteranPerksData {
  vehicleRegistrationBenefits: string[];
  medalBenefits: string[];
}

export const stateVeteranPerks: Record<string, VeteranPerksData> = {
  'alabama': {
    vehicleRegistrationBenefits: [
      'Free "Veteran" designation on driver\'s license',
      '100% service-connected disabled veterans exempt from vehicle license tax',
      'Free veteran specialty license plate; additional plates available at reduced cost',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state park access',
      'Purple Heart: free "Purple Heart" specialty plate, free hunting & fishing license',
      'POW/MIA: special "Ex-Prisoner of War" plate issued at no charge',
      'Combat veterans: reduced fee Combat Veteran plate available',
    ],
  },
  'alaska': {
    vehicleRegistrationBenefits: [
      'Veterans designation available on driver\'s license',
      '100% service-connected disabled veterans: free license plates and registration waiver',
      'Special veteran specialty plates available (multiple designs)',
      'Surviving spouses eligible for continued registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, no-cost specialty plate',
      'Purple Heart: free "Purple Heart" license plate',
      'POW: free "POW/MIA" plate issued at no cost',
      'Disabled veterans: Gold Star and combat designation plates available',
    ],
  },
  'arizona': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license and ID card',
      '100% disabled veterans: free vehicle registration (one vehicle)',
      'Wide variety of veteran specialty plates; Gold Star plates available',
      'Active duty and retired military: reduced registration fees in some counties',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass, no-cost MOH plate',
      'Purple Heart: free "Purple Heart" specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, free state parks access',
      'Silver Star & Bronze Star: specialty plates available at reduced cost',
    ],
  },
  'arkansas': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Veteran specialty plates available; Purple Heart plate free of charge',
      'Military retirees: discounted registration fees',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, free vehicle registration',
      'Purple Heart: free specialty plate, reduced hunting & fishing license fees',
      'POW: no-cost POW/MIA plate, expanded benefits through state DVA',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'california': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license and ID',
      '100% service-connected disabled veterans: vehicle license fee (VLF) waiver on one vehicle',
      'Numerous specialty plates: Gold Star Family, Purple Heart, POW/MIA, and more',
      'Surviving spouses of 100% disabled veterans retain VLF waiver',
    ],
    medalBenefits: [
      'Medal of Honor: free tuition at UC and CSU systems, free hunting & fishing license, free state parks',
      'Purple Heart: free "Purple Heart" specialty plate, reduced hunting & fishing fees',
      'POW/MIA: no-cost POW/MIA plate; additional state benefits through CalVet',
      'Combat service: Gold Star and Combat Veteran plates available',
    ],
  },
  'colorado': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: registration fee exemption on one vehicle',
      'Multiple veteran specialty plate options including Gold Star and Purple Heart',
      'Military retirees: eligible for veteran plate at reduced fee',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state parks annual pass, free MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, additional veteran services priority',
      'Silver Star: specialty plate available at reduced cost',
    ],
  },
  'connecticut': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      'Disabled veteran plates: reduced or waived registration for qualifying veterans',
      'Multiple specialty plate designs available for veterans and military retirees',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, priority services at state agencies',
      'POW/MIA: no-cost POW plate, expedited benefits processing',
      'Combat veterans: Combat Veteran plate available at reduced fee',
    ],
  },
  'delaware': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      'Disabled veteran plates at reduced registration cost',
      'Veteran specialty plates available; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, reduced state service fees',
      'POW/MIA: complimentary POW/MIA plate',
      'All military retirees: priority services through Delaware DVA',
    ],
  },
  'florida': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Largest selection of veteran specialty plates in the US (30+ designs)',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
      'Active duty stationed in FL: registration renewal without county fees',
    ],
    medalBenefits: [
      'Medal of Honor: free tuition at public universities, free hunting & fishing license, free state parks',
      'Purple Heart: free "Purple Heart" plate, free hunting & fishing license, state park discounts',
      'POW/MIA: no-cost POW/MIA plate, free state park access',
      'Silver Star & Bronze Star: specialty plates available; additional DVA benefits',
      'Combat veterans: free Combat Veteran plate; hunting/fishing license discounts',
    ],
  },
  'georgia': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle ad valorem tax exemption',
      'Multiple veteran specialty plates; Purple Heart plate at no cost',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, free MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW plate, priority veteran services',
      'Combat veterans: Bronze Star and Combat Veteran plate options',
    ],
  },
  'hawaii': {
    vehicleRegistrationBenefits: [
      'Veterans designation available on driver\'s license',
      '100% service-connected disabled veterans: vehicle weight tax exemption',
      'Veteran specialty plates available; Purple Heart plate at reduced cost',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, state park access benefits',
      'Purple Heart: specialty plate available, reduced licensing fees',
      'POW/MIA: special designation available through state DVA',
      'Military retirees: priority access to state veteran services',
    ],
  },
  'idaho': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Military retirees: reduced driver\'s license renewal fees',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'illinois': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Multiple veteran specialty plates; Purple Heart and MOH plates at no cost',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free registration on one vehicle, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, expedited state benefits',
      'Combat veterans: Illinois Combat Veteran plate at reduced cost',
    ],
  },
  'indiana': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Wide selection of veteran specialty plates; Purple Heart plate free',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, free vehicle registration',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate, additional DVA priority services',
      'Combat veterans: Combat Veteran plate available at reduced fee',
    ],
  },
  'iowa': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: registration fee reduction',
      'Veteran specialty plates including Purple Heart at reduced or no cost',
      'Military retirees: expedited license renewal at DVA offices',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass',
      'Purple Heart: free "Purple Heart" specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Combat veterans: specialty plate available at reduced cost',
    ],
  },
  'kansas': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: property tax exemption on one vehicle',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family and POW/MIA plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'kentucky': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle usage tax exemption',
      'Veteran specialty plates; Purple Heart and MOH plates free of charge',
      'Gold Star Family plates available; surviving spouse benefits',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park discounts',
      'POW/MIA: no-cost POW/MIA plate, priority DVA services',
      'Silver Star & Bronze Star: specialty plate options at reduced cost',
    ],
  },
  'louisiana': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle license plate at no charge',
      'Wide variety of specialty plates including Purple Heart at no cost',
      'Military retirees: reduced driver\'s license fees',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: Louisiana Combat Veteran plate available',
    ],
  },
  'maine': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle excise tax exemption',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Combat veterans: specialty plate available',
    ],
  },
  'maryland': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Multiple specialty plates; Purple Heart and MOH plates at no cost',
      'Surviving spouses of 100% disabled veterans retain exemptions',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, reduced hunting & fishing fees',
      'POW/MIA: complimentary POW/MIA plate, priority benefits processing',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'massachusetts': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle excise tax exemption',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates; surviving spouse vehicle benefit retention',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate, priority DVA services',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'michigan': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Wide selection of specialty plates including Purple Heart at no cost',
      'Military retirees: reduced driver\'s license renewal fee',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, free MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority services at state veteran offices',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'minnesota': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Multiple veteran specialty plates; Purple Heart and MOH plates free',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, expedited benefits',
      'Combat veterans: specialty Combat Veteran plate available',
    ],
  },
  'mississippi': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Veteran specialty plates; Purple Heart and POW/MIA plates at no cost',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'missouri': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle personal property tax exemption',
      'Multiple specialty plates; Purple Heart plate free of charge',
      'Gold Star Family plates; military retiree plate available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Silver Star & Bronze Star: specialty plate options available',
    ],
  },
  'montana': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'nebraska': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: motor vehicle tax exemption',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, free registration',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'nevada': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver (one vehicle)',
      'Multiple specialty plates; Purple Heart and MOH plates free of charge',
      'Surviving spouses of 100% disabled veterans retain exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority services',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'new-hampshire': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee reduction',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate available at reduced cost',
    ],
  },
  'new-jersey': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Multiple specialty plates; Purple Heart plate at no cost',
      'Gold Star Family plates; surviving spouse exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority DVA services',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'new-mexico': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: Combat Veteran plate available',
    ],
  },
  'new-york': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee exemption',
      'Wide variety of specialty plates; Purple Heart and Gold Star plates at no cost',
      'Surviving spouses of 100% disabled veterans retain exemptions',
    ],
    medalBenefits: [
      'Medal of Honor: free tuition at SUNY/CUNY schools, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park discounts',
      'POW/MIA: no-cost POW plate, priority services across state agencies',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'north-carolina': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle property tax exemption',
      'Multiple specialty plates; Purple Heart plate free of charge',
      'Surviving spouses of 100% disabled veterans retain property tax exemption',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority DVA services',
      'Silver Star & Bronze Star: specialty plate options available',
    ],
  },
  'north-dakota': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'ohio': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Large selection of specialty plates; Purple Heart and MOH plates free',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate, priority veteran services',
      'Combat veterans: Combat Veteran and Silver Star plates available',
    ],
  },
  'oklahoma': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Large variety of specialty plates; Purple Heart and MOH plates at no cost',
      'Surviving spouses of 100% disabled veterans retain exemption',
      'Military retirees: reduced registration fees',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park fee waivers',
      'POW/MIA: no-cost POW/MIA plate, expanded DVA priority services',
      'Silver Star & Bronze Star: specialty plates available at reduced cost',
      'Combat veterans: Oklahoma Patriot plate available',
    ],
  },
  'oregon': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Multiple specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'pennsylvania': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Extensive specialty plate options; Purple Heart and MOH plates free',
      'Surviving spouses of 100% disabled veterans retain exemption',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority DVA services',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'rhode-island': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee exemption',
      'Veteran specialty plates; Purple Heart plate at no cost',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate available',
    ],
  },
  'south-carolina': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Multiple specialty plates; Purple Heart plate at no charge',
      'Surviving spouses of 100% disabled veterans retain exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'south-dakota': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle license plate fee waiver',
      'Veteran specialty plates; Purple Heart and MOH plates at no cost',
      'Military retirees: reduced registration fees',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'tennessee': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Large selection of specialty plates (30+ designs); Purple Heart plate free',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
      'Military retirees: eligible for Military Retiree specialty plate',
    ],
    medalBenefits: [
      'Medal of Honor: free tuition at state universities, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park discounts',
      'POW/MIA: no-cost POW/MIA plate, priority services at Tennessee TDVS',
      'Silver Star & Bronze Star: specialty plates available at reduced cost',
      'Combat veterans: Combat Veteran plate available',
    ],
  },
  'texas': {
    vehicleRegistrationBenefits: [
      'Free "Veteran" designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration and free driver\'s license',
      'Largest specialty plate program in the US; Purple Heart, MOH, and 100+ veteran designs',
      'Military retirees: 50% reduction on driver\'s license fee; "Texas Veteran" plate option',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks, free college tuition',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park fee waivers',
      'POW/MIA: no-cost POW/MIA plate, expedited benefits through TXDVS',
      'Silver Star & Bronze Star: specialty plates available; additional TXDVS benefits',
      'Combat veterans: Combat Veteran plate free of charge',
    ],
  },
  'utah': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority veteran services',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'vermont': {
    vehicleRegistrationBenefits: [
      'Veterans designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee reduction',
      'Veteran specialty plates available; Purple Heart plate at reduced cost',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access',
      'Purple Heart: specialty plate at reduced cost, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate',
      'Combat veterans: specialty plate available',
    ],
  },
  'virginia': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: personal property tax exemption on one vehicle',
      'Extensive specialty plate catalog (50+ designs); Purple Heart and MOH plates free',
      'Surviving spouses of 100% disabled veterans retain vehicle property tax exemption',
      'Military retirees: Military Retiree plate with no additional fees',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle personal property tax, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license, state park discounts',
      'POW/MIA: no-cost POW/MIA plate, priority Virginia DVS services',
      'Silver Star & Bronze Star: specialty plates available; eligible for enhanced DVS services',
      'Combat veterans: Combat Veteran plate available, reduced licensing fees',
    ],
  },
  'washington': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Multiple specialty plates; Purple Heart and MOH plates at no charge',
      'Surviving spouses of 100% disabled veterans retain registration exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate, priority Washington DVA services',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
  'west-virginia': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Gold Star Family plates available',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: specialty plate at reduced cost',
    ],
  },
  'wisconsin': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: vehicle registration fee waiver (one vehicle)',
      'Multiple specialty plates; Purple Heart and MOH plates at no cost',
      'Surviving spouses of 100% disabled veterans retain exemption',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state parks',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: complimentary POW/MIA plate, priority DVA services',
      'Combat veterans: Wisconsin Combat Veteran plate available',
    ],
  },
  'wyoming': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% service-connected disabled veterans: free vehicle registration (one vehicle)',
      'Veteran specialty plates; Purple Heart plate at no charge',
      'Military retirees: reduced driver\'s license fees; Wyoming Veteran plate option',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park access, no-cost MOH plate',
      'Purple Heart: free specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW/MIA plate',
      'Combat veterans: Combat Veteran plate at reduced cost',
    ],
  },
};
