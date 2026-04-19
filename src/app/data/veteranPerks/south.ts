import type { VeteranPerksData } from './types';

// AL AR FL GA KY LA MS NC SC TN TX VA WV

export const southPerks: Record<string, VeteranPerksData> = {
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
    propertyTaxExemptions: [
      'Full property tax exemption on primary residence for 100% P&T service-connected disabled veterans',
      'No income limit — exemption applies regardless of home value',
      'Surviving spouses retain the exemption after the veteran dies',
    ],
    educationBenefits: {
      retiree: [
        'Free tuition at state colleges/universities for 100% P&T disabled veterans',
        'Alabama GI Dependents\' Scholarship Program open to eligible veterans',
        'In-state tuition rates guaranteed for all honorably discharged veterans',
      ],
      family: [
        'G.I. Dependents\' Scholarship: up to 5 years of free tuition at AL public colleges for children/spouses of 100% disabled, POW, KIA, or MIA veterans',
        'Surviving spouses of 100% P&T disabled veterans eligible for the same program',
        'Children must be under age 26; spouses have no age limit',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on homestead for 100% P&T service-connected disabled veterans',
      'Exemption applies to the primary residence only',
      'Surviving spouses may retain the exemption',
    ],
    educationBenefits: {
      retiree: [
        'Military Service Members Tuition Discount at AR public colleges for active/retired military',
        'AR National Guard Scholarship covers tuition at AR public institutions',
        'In-state tuition rates for all veterans at state colleges and universities',
      ],
      family: [
        'AR Military Dependents\' Scholarship: free tuition and fees at AR public colleges for dependents of combat-related fatalities or 100% P&T disabled veterans',
        'Surviving spouses and dependent children both qualify',
        'Covers tuition and mandatory fees at all Arkansas public higher education institutions',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on homestead for 100% P&T service-connected disabled veterans',
      'No income limit — exemption covers the full assessed value of primary residence',
      'Surviving spouses of qualifying veterans retain the exemption',
    ],
    educationBenefits: {
      retiree: [
        'FL Resident Veteran Tuition Waiver: honorably discharged veterans who are FL residents qualify for in-state tuition rates immediately upon enrollment',
        'Medal of Honor recipients receive free tuition at all FL public colleges and universities',
        'FL National Guard Tuition Assistance covers up to 100% of tuition at FL public institutions',
      ],
      family: [
        'FL Dependent Children Scholarship: children of FL veterans who died from service-connected injury or disability receive tuition waiver at FL public colleges (up to 120 credit hours)',
        'Surviving spouses of KIA/service-connected death veterans qualify for in-state tuition rates',
        'Children must use the benefit before age 28; award covers tuition and fees only',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax exemption on homestead up to $121,812 of fair market value (2025 threshold)',
      'Applies to 100% service-connected disabled or unemployability (IU) rated veterans',
      'Surviving spouses retain exemption; amount adjusts annually with federal poverty guidelines',
    ],
    educationBenefits: {
      retiree: [
        'GA HOPE GI Grant: up to $2,000/year for eligible veterans attending GA public colleges',
        'In-state tuition rates at all GA Board of Regents institutions for honorably discharged veterans',
        'Georgia Military College offers specialized programs and tuition benefits for veterans',
      ],
      family: [
        'GA Survivors\' & Dependents\' Education Benefit: children and spouses of veterans rated 90%+ disabled or KIA receive up to $2,000/year at GA state schools',
        'Georgia Student Finance Commission administers this benefit — apply through GSFA',
        'Surviving spouses and dependent children under age 25 are both eligible',
      ],
    },
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
    propertyTaxExemptions: [
      'Homestead exemption of $49,100 deducted from assessed value for qualifying disabled veterans',
      'Applies to veterans with 100% service-connected disability rating',
      'Must be primary residence; apply through Property Valuation Administrator',
    ],
    educationBenefits: {
      retiree: [
        'KY Veterans Tuition Waiver: free tuition (up to 36 credit hours/year) at KY public colleges for veterans with 181+ days honorable service',
        'Applies to all Kentucky Community and Technical College System (KCTCS) and KY public universities',
        'No income limit or GPA requirement — available to all eligible veterans regardless of VA benefits received',
      ],
      family: [
        'KY Surviving Spouse & Child Education Benefit: free tuition at KY public colleges for dependents of veterans who died in service or are 100% P&T disabled',
        'Children must be under age 23; surviving spouses have no age restriction',
        'Kentucky Higher Education Assistance Authority (KHEAA) administers the program',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on homestead (up to $7,500 assessed value) for 100% disabled veterans',
      'Some parishes extend the exemption beyond the base amount — check locally',
      'Surviving spouses retain the exemption upon the veteran dies',
    ],
    educationBenefits: {
      retiree: [
        'LA Veterans\' State Aid Program: free tuition and fees at LA public colleges for veterans with 1+ year honorable service',
        'Covers tuition at all Louisiana public colleges, universities, and technical schools',
        'Veterans must be LA residents for at least 1 year before enrollment',
      ],
      family: [
        'LA Dependents\' Educational Assistance: free tuition at LA public schools for surviving spouses and children of veterans who died of service-connected injuries or are 100% P&T disabled',
        'Louisiana Office of Student Financial Assistance administers this benefit',
        'Dependent children must be between ages 16–25; surviving spouses have no age restriction',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on homestead for 100% P&T service-connected disabled veterans',
      'No income limit; exemption applies to primary residence',
      'Apply through county tax assessor with VA disability documentation',
    ],
    educationBenefits: {
      retiree: [
        'MS Veterans\' Assistance Fund: limited tuition assistance for qualifying veterans at MS state schools',
        'Mississippi public universities offer in-state tuition rates for all honorably discharged veterans',
        'Mississippi National Guard Tuition Assistance covers tuition at MS public institutions',
      ],
      family: [
        'MS Children of Veterans and Others Scholarship: up to $1,000/year for children of deceased or 100% disabled veterans at MS state schools',
        'Surviving spouses of 100% P&T disabled veterans qualify for in-state tuition at MS public colleges',
        'Mississippi Office of Student Financial Aid administers all veteran dependent education programs',
      ],
    },
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
    propertyTaxExemptions: [
      'Homestead exclusion of up to $45,000 of appraised value for qualifying disabled veterans',
      'Must have 100% total and permanent service-connected disability',
      'Apply through county tax assessor; surviving spouses may retain the benefit',
    ],
    educationBenefits: {
      retiree: [
        'NC National Guard Tuition Assistance covers 100% of tuition at NC public institutions',
        'NC Community College Advance Program (CCAP) provides tuition assistance for transitioning service members',
        'In-state tuition rates at all NC public universities for honorably discharged veterans',
      ],
      family: [
        'NC Scholarships for Children of War Veterans: up to $4,500/year at NC public colleges for children of 100% disabled, KIA, or POW veterans',
        'Award amount applies to tuition and fees at University of North Carolina system schools',
        'NC State Education Assistance Authority (SEAA) administers this scholarship program',
      ],
    },
  },
  'south-carolina': {
    vehicleRegistrationBenefits: [
      'Free veteran designation on driver\'s license',
      '100% P&T service-connected disabled veterans: free vehicle registration on up to two vehicles',
      'Vehicle in spouse\'s name qualifies if spouse resides with veteran at same registered address; counts toward the two-vehicle limit',
      'Vehicles titled to a trustee qualify if veteran or surviving spouse is the income beneficiary and uses the vehicle',
      'Surviving spouses who relocate to SC after the veteran passes now qualify for one-vehicle property tax exemption',
      'Surviving spouses of 100% disabled veterans retain full vehicle registration exemption',
      'Specialty plates available for: National Guard, National Guard Retirees, Purple Heart, Disabled Veterans, U.S. Armed Forces Retirees, Ex-POW, Medal of Honor, Pearl Harbor Survivors, Normandy Invasion Survivors, Marine Corps League — contact SCDMV at 803.737.4000',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration, free hunting & fishing license, free state park access',
      'Purple Heart: free specialty plate, free hunting & fishing license (SCDNR)',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Disabled veterans (any rating with proof): free hunting & fishing license from SCDNR — must apply directly showing proof of disability; renew every 3 years (call 803.734.3838)',
      'Totally & permanently disabled veterans: reduced-rate entry to all SC state parks; may apply for a reduced-fee "Palmetto Passport" (SCPRT, 803.734.0156)',
    ],
    propertyTaxExemptions: [
      'Full property tax exemption on primary residence and up to five adjoining acres for 100% P&T service-connected disabled veterans',
      'Exemption is retroactive to 2022 — applies from the tax year the disability was incurred, not the application year (expanded legislation signed March 2024)',
      'Surviving spouses immediately eligible for the same exemption regardless of whether the veteran applied; primary residence + up to 5 acres',
      'Surviving spouses who move to SC after the veteran passes also qualify for a property tax exemption on one vehicle',
      'Exemption does not apply to Medal of Honor recipients or former POWs (separate benefit programs cover those groups)',
      'Apply through county auditor with VA disability certification',
    ],
    educationBenefits: {
      retiree: [
        'SC National Guard Scholarship covers tuition and fees at SC public colleges and universities',
        'SC Veterans Tuition Fee Waiver: free tuition at SC public colleges for veterans qualifying under certain service conditions',
        'In-state tuition rates at all SC public universities for honorably discharged veterans',
        'Military spouse expedited professional licensure: SC LLR prioritizes out-of-state license transfers for military spouses — submit Military Spouse Expedited Licensure Request Form; contact militaryspouseinfo@llr.sc.gov with questions',
        'Palmetto Pathfinder Program (SCDVA): free state mentorship matching transitioning service members and veterans with experienced veteran mentors for navigating benefits and resources',
      ],
      family: [
        'SC Tuition Grants for Dependents of Disabled Veterans: children and spouses of veterans rated 100% P&T disabled or who died of service-connected causes receive free tuition at SC public schools',
        'Surviving spouses qualify until remarriage; children must be SC residents under age 26',
        'SC Commission on Higher Education coordinates all veteran and dependent education benefit programs',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax relief based on county; maximum market value cap set by county (varies)',
      'Qualifying disabled veterans may receive reimbursement for taxes paid on primary residence',
      'Apply through county trustee office; income and property value caps apply',
    ],
    educationBenefits: {
      retiree: [
        'TN Helping Heroes Grant: up to $2,000/year for eligible veterans at TN public colleges',
        'TN HOPE Scholarship with veteran priority for qualifying residents',
        'TN National Guard Scholarship covers full tuition and fees at TN public colleges',
      ],
      family: [
        'TN Dependents\' Scholarship Program: free tuition at TN public colleges for children of veterans who are 100% P&T disabled or died of service-connected causes',
        'Surviving spouses of eligible veterans also qualify for the dependent scholarship',
        'Tennessee Student Assistance Corporation (TSAC) administers all veteran and dependent education programs',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on primary residence homestead for 100% P&T service-connected disabled veterans',
      'No income limit — entire property tax bill is eliminated regardless of home value',
      'Surviving spouses retain the exemption; also applies to donated homesteads (Tax Code §11.131)',
    ],
    educationBenefits: {
      retiree: [
        'TX Hazlewood Act: up to 150 credit hours of tuition exemption at TX public colleges for veterans who were TX residents when they entered service',
        'No means-testing — available regardless of income, GI Bill status, or other financial aid received',
        'One of the most generous and flexible state veteran education programs in the nation',
      ],
      family: [
        'TX Hazlewood Legacy Act: veterans can transfer unused Hazlewood hours to a spouse or children',
        'Dependents must meet TX residency requirements and maintain satisfactory academic progress',
        'Texas Higher Education Coordinating Board (THECB) administers all Hazlewood Act claims',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on principal residence for 100% P&T service-connected disabled veterans',
      'Also applies to surviving spouses of qualifying veterans (as long as they do not remarry)',
      'Exemption covers the primary home and up to one acre; apply through local commissioner of revenue',
    ],
    educationBenefits: {
      retiree: [
        'Virginia public universities offer in-state tuition for all honorably discharged veterans',
        'VA Commonwealth University, GMU, and other state schools have dedicated veteran resource centers',
        'Virginia National Guard Tuition Assistance covers 100% of tuition at VA public institutions',
      ],
      family: [
        'VA Military Survivors and Dependents Education Program (VMSDEP): free tuition and fees at VA public colleges for up to 4 academic years for children and spouses of veterans rated 90%+ disabled, POW, KIA, or MIA',
        'One of the strongest state family education programs — covers full tuition and fees, not just partial',
        'Virginia Department of Veterans Services (DVS) administers VMSDEP — apply through DVS offices',
      ],
    },
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
    propertyTaxExemptions: [
      '$20,000 assessed value exemption on primary residence for 100% P&T disabled veterans',
      'Separate income tax credit also available for property taxes paid',
      'Apply through county assessor with VA disability documentation',
    ],
    educationBenefits: {
      retiree: [
        'WV Veterans Re-Education Program: free tuition at WV public colleges for veterans with service in an armed conflict',
        'WV public colleges offer in-state tuition rates for all honorably discharged veterans',
        'WV National Guard Tuition Assistance covers full tuition at WV public institutions',
      ],
      family: [
        'WV War Orphans Education Assistance: free tuition at WV public colleges for children of veterans who died of service-connected causes or are 100% P&T disabled',
        'Surviving spouses of KIA or service-connected death veterans qualify for in-state tuition rates',
        'West Virginia Higher Education Policy Commission oversees all veteran and dependent education programs',
      ],
    },
  },
};
