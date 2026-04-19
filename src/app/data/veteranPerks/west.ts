import type { VeteranPerksData } from './types';

// AK AZ CA CO HI ID MT NV NM OR UT WA WY

export const westPerks: Record<string, VeteranPerksData> = {
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
    propertyTaxExemptions: [
      'Veterans with 50%+ disability: up to $150,000 of assessed value exempt',
      'Full 100% disability rating qualifies for the maximum $150,000 exemption',
      'Must be primary residence; apply through the borough/municipality assessor',
    ],
    educationBenefits: {
      retiree: [
        'University of Alaska system offers reduced tuition for veterans with 181+ days honorable service',
        'Alaska Commission on Postsecondary Education (ACPE) provides veteran-specific financial aid',
        'Alaska National Guard Education Assistance Program available to guard members',
      ],
      family: [
        'University of Alaska waives tuition for spouses and dependents of 100% P&T disabled or KIA veterans',
        'Alaska Performance Scholarship available to qualifying dependents of veterans',
        'Children of KIA/MIA service members may qualify for additional state financial assistance',
      ],
    },
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
      '100% service-connected disabled veterans: free day-use pass to all AZ State Parks — pick up pass at any park visitor center or Central Phoenix Office (VA proof of 100% required)',
      'Military retirees and service-disabled veterans (<100%): 50% off day-use entrance at all AZ State Parks — show military ID at gate',
      'Active duty, Reserves, and National Guard: 50% off day-use entrance — show military ID; discount extends to up to 3 accompanied adults',
    ],
    propertyTaxExemptions: [
      'Property tax exemption up to approximately $4,873 of assessed value for qualifying disabled veterans',
      'Amount prorated based on disability percentage (100% = maximum benefit)',
      'Must be primary residence; income limits may apply in some counties',
    ],
    educationBenefits: {
      retiree: [
        'Arizona Veterans Education Benefit: up to 120 credit hours of free tuition at AZ public colleges for wartime veterans',
        'AZ community colleges offer in-state tuition rates for all honorably discharged veterans',
        'Arizona Military Family Relief Fund grants for education expenses',
      ],
      family: [
        'AZ Survivors\' Tuition Benefits: free tuition at AZ public universities for dependents of KIA or 100% P&T disabled veterans',
        'Benefit covers tuition and fees at all Arizona Board of Regents institutions',
        'Eligible spouses and children of service members who died in the line of duty also qualify',
      ],
    },
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
    propertyTaxExemptions: [
      'Disabled Veterans Exemption: up to $271,009 of assessed value exempt (low-income tier: up to $161,083)',
      'Applies to veterans rated 100% or compensated at 100% for unemployability (IU)',
      'Must be primary residence; apply through county assessor by February 15',
    ],
    educationBenefits: {
      retiree: [
        'Cal Vet College Fee Waiver (Plan A): full fee waiver at CSU, UC, and CA community colleges for 100% P&T disabled veterans',
        'Medal of Honor recipients receive free tuition at all CA public colleges and universities',
        'CA community colleges offer Board of Governors Fee Waiver for low-income veterans',
      ],
      family: [
        'College Fee Waiver Plan B: surviving spouse/child of wartime veteran who died of service-connected causes receives full fee waiver',
        'College Fee Waiver Plan C: dependent children of veterans with any service-connected disability rating may qualify',
        'College Fee Waiver Plan D: children of current National Guard members qualify for reduced fees',
      ],
    },
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
    propertyTaxExemptions: [
      '50% reduction on first $200,000 of actual value of primary residence',
      'Applies to veterans with 100% permanent and total disability rating',
      'No income limit; surviving spouses retain the benefit',
    ],
    educationBenefits: {
      retiree: [
        'CO National Guard Tuition Assistance covers 100% of tuition at CO public institutions',
        'Some CO community colleges offer free tuition for 100% P&T disabled veterans',
        'In-state tuition guaranteed at all CO public colleges for honorably discharged veterans',
      ],
      family: [
        'CO Dependents\' Tuition Fund: eligible dependents of veterans killed or 100% disabled in service receive tuition assistance at CO public institutions',
        'Surviving spouses of service members who died on active duty may qualify for in-state tuition rates',
        'Children of KIA/MIA veterans may receive additional scholarship funding through state VSOs',
      ],
    },
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
    propertyTaxExemptions: [
      'Totally disabled veterans may be exempt from property taxes except for a minimum tax',
      'Amount and terms vary by county — Honolulu, Maui, Hawaii, and Kauai each set their own rates',
      'Apply through county real property tax office with VA disability certification',
    ],
    educationBenefits: {
      retiree: [
        'University of Hawaii system offers reduced tuition for veterans with 90+ days wartime service',
        'HI College Fee Waiver available for eligible wartime veterans at UH campuses',
        'HI State Approving Agency (SAA) coordinates GI Bill and education benefits for all veterans',
      ],
      family: [
        'HI Survivors\' Benefit: children and spouses of service members who died in service or are 100% P&T disabled receive reduced tuition at University of Hawaii system',
        'Eligible dependents qualify for in-state tuition rates regardless of residency',
        'Hawaii Veterans Benefits program assists families in navigating all education entitlements',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax reduction of up to $1,500 for qualifying disabled veterans',
      'Must be honorably discharged and have a service-connected disability',
      'Income limits apply; apply through county assessor by April 15',
    ],
    educationBenefits: {
      retiree: [
        'ID Freedom Scholarship: covers tuition at ID public colleges for eligible Idaho veterans',
        'Idaho National Guard Scholarship Program covers tuition and fees at ID public institutions',
        'In-state tuition rates at all ID public colleges for honorably discharged veterans',
      ],
      family: [
        'ID Children of Veterans Scholarship: free tuition at ID state colleges for dependent children of 100% disabled, POW, MIA, or KIA veterans',
        'Eligible children must be under age 26 and residents of Idaho',
        'Surviving spouses of 100% P&T disabled veterans qualify for in-state tuition rates',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax reduction of 50–100% depending on income for qualifying disabled veterans',
      '100% disability with income under threshold may qualify for full reduction',
      'Apply through Montana Department of Revenue; income verification required annually',
    ],
    educationBenefits: {
      retiree: [
        'MT Veterans\' Fee Waiver: free tuition for up to 12 semesters at MT public colleges for veterans who served during wartime periods',
        'Applies to all Montana University System campuses and community colleges',
        'Military retirees qualify under wartime service provisions — no separate application needed beyond enrollment',
      ],
      family: [
        'MT Dependent Tuition Waiver: free tuition at MT public colleges for children of veterans killed in action, MIA, or 100% permanently disabled',
        'Surviving spouses of 100% P&T disabled veterans also qualify for the tuition waiver',
        'Montana University System administers the waiver — contact the registrar at individual campuses',
      ],
    },
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
    propertyTaxExemptions: [
      'Assessed value exemption of $35,400 for 100% service-connected disabled veterans',
      'Additional exemptions may apply at the county level',
      'Must be primary residence; apply through county assessor',
    ],
    educationBenefits: {
      retiree: [
        'NV in-state tuition rates guaranteed at NSHE institutions for all honorably discharged veterans',
        'Nevada National Guard Tuition Assistance Program covers tuition at NV public colleges',
        'NV Governor\'s Veteran Employment Committee coordinates workforce and education resources',
      ],
      family: [
        'NV Orphans of Veterans Program: state scholarship assistance for children of veterans who were 100% P&T disabled or died of service-connected causes',
        'Surviving spouses of KIA or service-connected death veterans qualify for in-state tuition rates',
        'Nevada System of Higher Education (NSHE) veterans services office assists with benefit enrollment',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax exemption available for 100% P&T service-connected disabled veterans on primary residence',
      'Surviving spouses may retain exemption; details set by county assessors',
      'Apply through county assessor office with VA disability documentation',
    ],
    educationBenefits: {
      retiree: [
        'NM Vietnam Veterans Scholarship: up to $4,000/year for NM Vietnam veterans at NM state colleges',
        'NM Lottery Scholarship and other state aid available to qualifying veterans',
        'In-state tuition rates guaranteed at all NM public colleges for honorably discharged veterans',
      ],
      family: [
        'NM Survivor Benefit Scholarship: free tuition at NM state schools for children and spouses of veterans rated 100% P&T disabled or KIA',
        'Children of POW/MIA veterans also qualify for the scholarship',
        'New Mexico Higher Education Department administers all veteran dependent education benefits',
      ],
    },
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
    propertyTaxExemptions: [
      'No dedicated statewide property tax exemption specifically for 100% VA-disabled veterans',
      'General senior/disabled deferral programs may be available based on income and age',
      'Contact your county assessor for any locally available veteran property tax relief',
    ],
    educationBenefits: {
      retiree: [
        'OR Oregon Opportunity Grant priority given to qualifying veterans with financial need',
        'Oregon National Guard Tuition Assistance covers tuition at OR public colleges and universities',
        'OR public universities and community colleges offer in-state tuition for honorably discharged veterans',
      ],
      family: [
        'OR Surviving Dependents Tuition Waiver: free tuition at OR public colleges for surviving spouses and children of service members killed in action or rated 100% P&T disabled',
        'Oregon Student Access Commission (OSAC) administers dependent veteran education benefits',
        'Surviving spouses qualify until remarriage; children must be OR residents under age 23',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax abatement up to $521,620 of taxable value for qualifying disabled veterans',
      'Benefit amount depends on disability percentage and unemployment status (IU may qualify)',
      'Must be primary residence; apply through county assessor by September 1',
    ],
    educationBenefits: {
      retiree: [
        'UT Tuition Waiver for Veterans: free tuition at UT public colleges for eligible veterans with 90+ days honorable service',
        'Utah System of Higher Education guarantees in-state tuition for all honorably discharged veterans',
        'UT National Guard Tuition Assistance covers full tuition at UT public institutions',
      ],
      family: [
        'UT Survivors\' & Dependents\' Educational Benefits: free tuition at UT public colleges for spouses and children of veterans who are 100% P&T disabled or died of service-connected causes',
        'Surviving spouses qualify until remarriage; children must be UT residents under age 26',
        'Utah System of Higher Education administers all veteran and dependent tuition waivers',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax relief program based on income — amount depends on income tier and local levy rates',
      'Veterans with 100% service-connected disability may qualify for larger relief amounts',
      'Apply through county assessor; income verification required annually',
    ],
    educationBenefits: {
      retiree: [
        'WA Tuition Waiver for Veterans: eligible veterans receive 200 quarter credits at WA public colleges plus $500 book stipend per year',
        'One of the most comprehensive state veteran education programs — covers both tuition and a book stipend',
        'WA National Guard Tuition Assistance covers 100% of tuition at WA public institutions',
      ],
      family: [
        'WA Children of Eligible Veterans Tuition Waiver: same 200-quarter-credit waiver available to dependent children of qualifying veterans',
        'Spouses of 100% P&T disabled or KIA veterans also eligible for the full tuition waiver and book stipend',
        'Washington Student Achievement Council administers all veteran and dependent education waivers',
      ],
    },
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
    propertyTaxExemptions: [
      'Annual property tax exemption of $6,000 of assessed value for qualifying veterans (effective 2025 tax year)',
      'Applies to veterans with at least 10% service-connected disability; 100% maximizes benefit',
      'Apply through county assessor; must be primary residence',
    ],
    educationBenefits: {
      retiree: [
        'WY Veterans Education Assistance: reduced tuition and scholarships at WY community college districts for qualifying veterans',
        'University of Wyoming and WY community colleges offer in-state tuition for all honorably discharged veterans',
        'WY National Guard Tuition Assistance covers tuition at WY public colleges and universities',
      ],
      family: [
        'WY Survivors\' & Dependents\' Educational Assistance: tuition assistance for children and spouses of veterans killed in action, MIA, or rated 100% P&T disabled at WY public colleges',
        'Surviving spouses qualify until remarriage; dependent children must be WY residents under age 25',
        'Wyoming Department of Education coordinates state veteran dependent education benefits',
      ],
    },
  },
};
