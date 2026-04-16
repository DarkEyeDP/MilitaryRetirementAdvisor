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
  propertyTaxExemptions: string[];
  educationBenefits: {
    retiree: string[];
    family: string[];
  };
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
    propertyTaxExemptions: [
      'Full property tax exemption for 100% P&T service-connected disabled veterans (effective Oct. 1, 2024 via Public Act 24-46)',
      'Previously a partial exemption — expanded to full by recent legislation',
      'Apply through local town/city assessor with VA disability documentation',
    ],
    educationBenefits: {
      retiree: [
        'CT Veterans\' Education Benefit: free tuition at CT state colleges/universities for veterans with 90+ days wartime service',
        'Applies to all CT Board of Regents institutions and UConn',
        'Veterans who retired after 20+ years of service qualify under the wartime service provisions',
      ],
      family: [
        'CT Surviving Spouses & Dependents Waiver: children and surviving spouses of veterans who died in the line of duty or from service-connected disability receive free tuition at CT state colleges',
        'Benefit covers tuition and mandatory fees at all CT public higher education institutions',
        'No age limit for surviving spouses; dependent children must be under age 23',
      ],
    },
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
    propertyTaxExemptions: [
      '100% credit toward non-vocational school district property tax for qualifying disabled veterans',
      '3-year Delaware residency required prior to application',
      'Apply through the Division of Veterans Affairs; credit offsets annual school tax bill',
    ],
    educationBenefits: {
      retiree: [
        'DE Higher Education Veteran Benefit: up to $1,000/year tuition waiver at Delaware Technical Community College for eligible veterans',
        'In-state tuition rates guaranteed at all DE public colleges for honorably discharged veterans',
        'Delaware National Guard Education Assistance Program covers tuition for guard members',
      ],
      family: [
        'DE Education Benefits for Surviving Dependents: tuition assistance for children and spouses of veterans killed in action or rated 100% P&T disabled',
        'University of Delaware and Delaware State University both honor survivor benefit programs',
        'Surviving spouses and dependent children qualify for in-state tuition rates regardless of residency',
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
    propertyTaxExemptions: [
      'Veterans with 70%+ service-connected disability: first $250,000 of equalized assessed value exempt',
      '100% disability qualifies for the full $250,000 exemption amount',
      'Must be primary residence; apply through county assessor',
    ],
    educationBenefits: {
      retiree: [
        'Illinois Veterans\' Grant (IVG): free tuition and certain fees at all IL public universities and community colleges for veterans with 1+ year active duty service',
        'One of the most generous state veteran education programs — no GPA requirement, no income limit',
        'Covers up to the equivalent of 4 academic years of full-time enrollment',
      ],
      family: [
        'IL MIA/POW Scholarship: free tuition and fees at IL public universities for spouses and children of veterans who are MIA, POW, or died in service',
        'IL Dependent Grant: children of veterans rated 100% P&T disabled receive tuition assistance at IL public colleges',
        'Both programs administered by the Illinois Student Assistance Commission (ISAC)',
      ],
    },
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
    propertyTaxExemptions: [
      'Disabled veteran deductions: $14,000 deduction for 10%+ disability; $24,960 for total disability; max combined $38,960',
      'Must have been honorably discharged; property must be primary residence',
      'Apply through county auditor by December 31 of the assessment year',
    ],
    educationBenefits: {
      retiree: [
        'IN Free Tuition Program: free tuition for honorably discharged veterans (up to 124 credit hours) at IN public colleges',
        'Available at all Ivy Tech Community College, Vincennes University, and IN public university campuses',
        'Veterans must be IN residents and enrolled in eligible degree or certificate programs',
      ],
      family: [
        'IN Children and Surviving Spouses Education: free tuition at IN public colleges for children and spouses of veterans KIA, MIA, POW, or rated 100% P&T disabled',
        'Children must begin using the benefit before age 32; no age limit for surviving spouses',
        'Covers tuition and mandatory fees — does not cover room, board, or books',
      ],
    },
  },
  'iowa': {
    vehicleRegistrationBenefits: [
      'Veteran designation on Iowa driver\'s license or state ID; $10 duplicate fee; requires DD-214',
      'Specialty license plates for honorably discharged veterans per Iowa Code §35.1; options vary by branch of service',
      'Personalized veteran plate available with applicable personalized plate fee',
      'Lifetime hunting and fishing license for $7 for Iowa resident veterans with active federal service',
    ],
    medalBenefits: [
      'Medal of Honor: free hunting & fishing license, free state park annual pass',
      'Purple Heart: free "Purple Heart" specialty plate, free hunting & fishing license',
      'POW/MIA: no-cost POW plate, priority veteran services',
      'Combat veterans: specialty plate available at reduced cost',
    ],
    propertyTaxExemptions: [
      'Disabled Veteran\'s Homestead Tax Credit: 100% property tax exemption for 100% P&T disabled veterans and DIC recipients; must be primary residence; surviving spouses retain the credit',
      'Military Service Tax Exemption: reduces assessed home value by up to $4,000 for property tax purposes; requires 18+ months active duty service',
      'Apply through your County Assessor and County VSO; eligibility and property limitations may apply',
    ],
    educationBenefits: {
      retiree: [
        'Iowa Board of Regents schools offer in-state tuition for all honorably discharged veterans',
        'Iowa Tuition Grant: veterans may qualify at IA private colleges',
        'Iowa National Guard Scholarship covers full tuition at IA public institutions',
      ],
      family: [
        'Children of the Fallen (Branstad-Reynolds) Scholarship Fund: college education assistance for children of post-9/11 service members who died while on active military status',
        'IA Surviving Spouse & Dependent Educational Assistance: free tuition at IA Board of Regents schools for children of veterans who died in service or are 100% P&T disabled',
        'Surviving spouses of service members who died on active duty qualify for in-state tuition rates',
      ],
    },
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
    propertyTaxExemptions: [
      'Homestead Property Tax Refund Program: refund up to $700 for qualifying veterans',
      'Income cap applies (generally under $36,600/year); home value limits also apply',
      'Apply through Kansas Department of Revenue with income and disability documentation',
    ],
    educationBenefits: {
      retiree: [
        'KS Military Service Scholarships available to eligible veterans attending KS state schools',
        'In-state tuition rates guaranteed at all KS Board of Regents institutions for veterans',
        'Kansas National Guard Educational Assistance Program covers tuition at KS public colleges',
      ],
      family: [
        'KS Military Service Scholarships for Surviving Dependents: free tuition at KS state schools for surviving spouses and dependent children of KIA, MIA, or 100% P&T disabled veterans',
        'Kansas Board of Regents administers the program — apply through individual institutions',
        'Dependent children must be under age 21; surviving spouses have no age restriction',
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
    propertyTaxExemptions: [
      'Exemption of $6,000 of property value for qualifying veterans (higher for specially adapted housing)',
      'Must have wartime service; 100% disability qualifies for maximum benefit',
      'Paraplegic veterans may receive additional exemptions; apply through municipality',
    ],
    educationBenefits: {
      retiree: [
        'ME Veterans Dependents Education Benefits: Maine State Approving Agency coordinates all GI Bill-eligible programs',
        'University of Maine system offers in-state tuition rates for all honorably discharged veterans',
        'Maine National Guard Tuition Assistance covers tuition at ME public colleges',
      ],
      family: [
        'ME Children of Veterans Scholarship: free tuition at ME public colleges for children of wartime veterans who are 100% P&T disabled, POW, MIA, or KIA',
        'Maine State Grant program provides additional financial aid priority to qualifying veteran dependents',
        'Surviving spouses of service members who died on active duty qualify for in-state tuition rates',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on principal residence for 100% P&T service-connected disabled veterans',
      'No income limit; exemption covers entire assessed value of primary home',
      'Surviving spouses retain the exemption; apply through State Department of Assessments and Taxation',
    ],
    educationBenefits: {
      retiree: [
        'MD Edward T. Conroy Memorial Scholarship: free tuition plus living stipend at MD public colleges for veterans rated 100% P&T disabled',
        'Award covers tuition, fees, and provides a $9,000 living stipend annually',
        'Maryland Higher Education Commission administers this benefit for qualifying veterans',
      ],
      family: [
        'MD Edward T. Conroy Memorial Scholarship extends to children and spouses of service members KIA, MIA, or totally disabled — annual award up to $19,000',
        'Surviving spouses qualify until remarriage; dependent children must be under age 24',
        'One of the most generous state programs nationally — covers tuition plus substantial living expenses',
      ],
    },
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
    propertyTaxExemptions: [
      'No statewide property tax exemption specifically for 100% VA-disabled veterans',
      'Some municipalities offer local exemptions — check with your city/town assessor',
      'Veterans may qualify for general exemptions based on wartime service; contact local assessor',
    ],
    educationBenefits: {
      retiree: [
        'MA Veterans Tuition Waiver: free tuition (not fees or room/board) at MA public colleges for Massachusetts-domiciled veterans',
        'Applies to all UMass campuses, state universities, and community colleges',
        'Veterans must have been domiciled in MA at time of enlistment or currently be MA residents',
      ],
      family: [
        'MA Tuition Waiver for Children of Veterans: free tuition at MA public colleges for children of veterans rated 100% P&T disabled or who died of service-connected causes',
        'Children of KIA or service-connected death veterans qualify regardless of disability rating',
        'Massachusetts Board of Higher Education oversees all veteran and dependent education waivers',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on principal residence for 100% P&T service-connected disabled veterans',
      'No income limit; applies to primary residence only',
      'Surviving spouses retain exemption; apply through local assessing office',
    ],
    educationBenefits: {
      retiree: [
        'MI Veterans Tuition Grant: up to $7,500/year at Michigan private colleges for eligible veterans',
        'Michigan public universities offer in-state tuition rates immediately for honorably discharged veterans',
        'Michigan National Guard State Tuition Assistance covers 100% of tuition at MI public institutions',
      ],
      family: [
        'MI Children of Veterans Tuition Grant: scholarships at MI private colleges for children of veterans rated 100% P&T disabled or who died of service-connected causes',
        'Surviving spouses of veterans who died on active duty qualify for in-state tuition at MI public colleges',
        'Michigan Student Financial Services Bureau administers all veteran dependent education benefits',
      ],
    },
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
    propertyTaxExemptions: [
      'Market value exclusion up to $300,000 for 100% P&T service-connected disabled veterans',
      'Surviving spouses may qualify for an exclusion up to $150,000',
      'Apply through county assessor; no income limit for the veteran exclusion',
    ],
    educationBenefits: {
      retiree: [
        'MN GI Bill: up to $3,000/year for eligible veterans at MN colleges and universities',
        'Minnesota State Colleges and Universities (MnSCU) system guarantees in-state tuition for all veterans',
        'MN Veterans Preference helps veterans access financial aid and support services',
      ],
      family: [
        'MN GI Bill Spouse & Dependent Benefit: spouses and children of eligible veterans receive up to $3,000/year at MN colleges and universities',
        'Surviving spouses of service members who died on active duty receive in-state tuition at MN public colleges',
        'Dependents of 100% P&T disabled veterans qualify for the full GI Bill benefit amount',
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
    propertyTaxExemptions: [
      'Property Tax Credit (circuit breaker) program: credit up to $1,100 based on income and taxes paid',
      'Must be 100% service-connected disabled; income limits apply (generally under $30,000)',
      'Apply through Missouri Department of Revenue with MO-PTC form',
    ],
    educationBenefits: {
      retiree: [
        'MO Returning Heroes Education Act: in-state tuition capped at the 2-year public institution rate for all honorably discharged veterans at MO public colleges',
        'Missouri public universities guarantee in-state tuition for veterans regardless of residency duration',
        'Missouri National Guard Tuition Assistance covers 100% of tuition at MO public institutions',
      ],
      family: [
        'MO Survivors\' & Dependents\' Education Benefit: free tuition at MO public colleges for children and surviving spouses of POW/MIA/KIA veterans',
        'Dependent children must be under age 25; surviving spouses have no age restriction',
        'Missouri Department of Higher Education administers this benefit for qualifying dependents',
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
    propertyTaxExemptions: [
      'Homestead exemption for 100% service-connected disabled veterans — Category 4V',
      'No income limit and no homestead value cap for qualifying veterans',
      'Surviving spouses retain the exemption; apply through county assessor by June 30',
    ],
    educationBenefits: {
      retiree: [
        'NE Waiver of Tuition for Veterans: free tuition at NE state colleges and University of Nebraska for veterans who served during wartime periods',
        'Nebraska National Guard Tuition Assistance covers full tuition at NE public institutions',
        'In-state tuition guaranteed at all NE public colleges for honorably discharged veterans',
      ],
      family: [
        'NE Waiver for Spouses & Dependents: extends tuition waiver to surviving spouses and children of veterans killed in action, MIA, or 100% P&T disabled',
        'Children must be under age 26; surviving spouses qualify until remarriage',
        'Nebraska Coordinating Commission for Postsecondary Education administers this benefit',
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
  'new-hampshire': {
    vehicleRegistrationBenefits: [
      'Honorably discharged veterans may add a free "Veteran" indicator to their NH driver\'s license or ID card (free at renewal; $3 fee outside renewal)',
      'Free vehicle registration for veterans who are amputees, paraplegic, totally blind from service-connected disability, POWs, or permanently and totally disabled (RSA 261:141, 261:157, 261:159)',
      'Free driver\'s license for amputees, paraplegics, or veterans classified as permanently and totally disabled by the VA (RSA 263:42)',
      '17 veteran and military specialty license plates available; one free Disabled Veteran plate for 100% P&T disabled veterans (RSA 261:86); free Purple Heart plate (RSA 261:86-d)',
      'Disabled veteran license plates include free parking time in any NH city or town (RSA 265:73)',
    ],
    medalBenefits: [
      'Purple Heart: one free set of specialty license plates upon honorable discharge verification and award documentation (RSA 261:86-d)',
      'POW/former prisoner of war: free vehicle registration fee exemption (RSA 261:141)',
      '100% P&T service-connected disabled veterans: free perpetual Fish and Game License ($10 one-time administrative fee) (RSA 214:13)',
      'Any service-connected disability: free day-use admission to all NH state parks; enterprise activity fees (ski lifts, campgrounds, etc.) still apply (RSA 216-A:3-g)',
      'NH National Guard members in pay grades E-1 through E-6 who are legal NH residents: free admission to NH state parks',
    ],
    propertyTaxExemptions: [
      'Wartime veterans: statewide property tax credit of $51–$750 on primary residence; municipalities may increase this amount (RSA 72:28)',
      'Permanently and totally disabled service-connected veterans, double amputees, or paraplegics: $700–$2,000 tax credit on primary residence; cities and towns may vote the higher amount (RSA 72:35)',
      'Blind, paraplegic, or double amputee P&T disabled veterans with a specially adapted homestead acquired with VA assistance: full property tax exemption on that homestead; surviving spouse also exempt (RSA 72:36-a)',
      'Surviving Spouse of veteran killed on active duty: tax credit of $700–$2,000 on real estate or personal property (RSA 72:29-a)',
    ],
    educationBenefits: {
      retiree: [
        'NH National Guard Tuition Assistance: members may attend NH state-supported postsecondary and technical institutions tuition-free on a space-available basis after completing AIT or commissioning',
        'NH National Guard members who complete their initial service obligation (≥6 years) may transfer their community college tuition waiver to their spouse for use at NH Community College System institutions (through July 1, 2027)',
      ],
      family: [
        'Children of NH resident service members declared MIA or POW: free tuition at NH Community College System institutions for as long as the member remains missing or captive (RSA 188-F:15)',
        'Children of NH resident service members killed in action or who died from a service-connected disability: free tuition at NH public higher education institutions; scholarship up to $2,500/year for room, board, books, and supplies for up to 4 years if financially needed (RSA 193:19–21)',
        'Child (biological, adopted, or stepchild) of a 100% P&T disabled NH resident veteran: free tuition at University System of NH institutions (RSA 187-A:20)',
      ],
    },
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
    propertyTaxExemptions: [
      'Full property tax exemption on primary residence for veterans certified as 100% P&T disabled',
      'No income limit; exemption covers entire property tax bill on primary home',
      'Apply through local tax assessor with VA disability certification',
    ],
    educationBenefits: {
      retiree: [
        'NJ Veterans Tuition Credit: $400/semester for eligible veterans at NJ institutions',
        'New Jersey public colleges offer in-state tuition for all honorably discharged veterans',
        'NJ National Guard Tuition Assistance covers tuition at NJ public colleges and universities',
      ],
      family: [
        'NJ Survivor Tuition Benefits: free tuition at NJ public colleges for children and spouses of service members killed in combat or 100% P&T disabled',
        'Surviving spouses of KIA veterans receive this benefit until remarriage',
        'Higher Education Student Assistance Authority (HESAA) administers all NJ veteran dependent education programs',
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
    propertyTaxExemptions: [
      'Alternative Veterans Exemption and Cold War Veterans Exemption available — amounts vary by municipality',
      'Exemptions reduce assessed value by a set percentage; 100% disability may qualify for enhanced amounts',
      'Check with local assessor — municipalities set their own exemption amounts within state limits',
    ],
    educationBenefits: {
      retiree: [
        'NY Military Service Recognition Scholarship (MSRS): financial aid for veterans who served after 9/11 at NY colleges',
        'Medal of Honor recipients receive free tuition at all SUNY and CUNY institutions',
        'NY Regents awards and SUNY/CUNY Excelsior Scholarship available to qualifying veterans',
      ],
      family: [
        'NY Military Enhanced Recognition Incentive and Tribute (MERIT) Scholarship: full 4-year scholarship covering tuition, room, board, and books at SUNY/CUNY for children of severely disabled, KIA, POW, or MIA veterans',
        'One of the most comprehensive state family education benefits in the nation',
        'New York State Higher Education Services Corporation (HESC) administers the MERIT Scholarship',
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
    propertyTaxExemptions: [
      'Property tax credit based on disability percentage — 100% disability receives full credit amount',
      'Credit offsets property taxes on primary residence; income limits may apply',
      'Apply through county director of tax equalization',
    ],
    educationBenefits: {
      retiree: [
        'ND Veterans\' Aid Fund: grants up to $1,500 for eligible ND veterans with financial need',
        'NDSU, UND, and other ND state colleges offer in-state tuition for honorably discharged veterans',
        'ND National Guard Tuition Assistance covers full tuition at ND public institutions',
      ],
      family: [
        'ND Tuition Waiver for Dependents of KIA/Disabled Veterans: free tuition at ND state colleges for spouses and children of service members who died in service or are 100% P&T disabled',
        'Children must be ND residents under age 26; surviving spouses qualify until remarriage',
        'North Dakota University System administers the waiver — apply through individual campuses',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax reduction equal to taxes on up to $50,000 of homestead market value',
      'Applies to 100% service-connected disabled veterans or surviving spouses',
      'Apply through county auditor; no income limit',
    ],
    educationBenefits: {
      retiree: [
        'OH GI Promise: free tuition at Ohio community and technical colleges for eligible veterans',
        'Ohio National Guard Scholarship covers full tuition at OH public institutions',
        'Ohio public universities guarantee in-state tuition for all honorably discharged veterans',
      ],
      family: [
        'OH War Orphans Scholarship: up to full tuition at OH public colleges for children of disabled or KIA veterans — one of the most established programs nationally',
        'Surviving spouses of veterans who died in service also qualify',
        'Ohio Board of Regents administers the scholarship — children must be under age 25',
      ],
    },
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
    propertyTaxExemptions: [
      'Full exemption of fair cash value of homestead for 100% P&T service-connected disabled veterans — entire property tax bill on primary residence eliminated, no income limit',
      'Sales tax exemption card: 100% service-connected disabled veterans receive a permit exempting all qualifying purchases from Oklahoma sales tax, up to $25,000 per year — apply through the Oklahoma Tax Commission',
      'Surviving spouse of a qualified 100% disabled veteran retains property tax exemption (if not remarried); also eligible for sales tax exemption on up to $1,000/yr in purchases',
    ],
    educationBenefits: {
      retiree: [
        'OK Academic Scholars Program gives preference to veterans for merit awards',
        'Free tuition at OK colleges for Medal of Honor recipients',
        'Oklahoma State Regents for Higher Education guarantee in-state tuition for all honorably discharged veterans',
      ],
      family: [
        'OK Dependents Education Waiver: free tuition at OK public colleges for children and spouses of 100% disabled veterans or veterans who died of service-connected causes',
        'Surviving spouses qualify until remarriage; children must be under age 23',
        'Oklahoma State Regents for Higher Education administers all dependent education waivers',
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
    propertyTaxExemptions: [
      'Disabled Veterans Real Estate Tax Exemption: full exemption on primary residence for 100% P&T disabled veterans',
      'Income limit applies (combined income of veteran and spouse must not exceed $114,637)',
      'Apply through county board of assessment; surviving spouses may retain the exemption',
    ],
    educationBenefits: {
      retiree: [
        'PA Veterans Education Program: reduced tuition at Pennsylvania State System of Higher Education (PASSHE) schools',
        'PA National Guard Scholarship covers full tuition at PA public institutions',
        'PA public universities offer in-state tuition for honorably discharged veterans regardless of residency duration',
      ],
      family: [
        'PA Children of Deceased Veterans: free tuition at PA state schools for children of veterans who died of service-connected injuries',
        'PA Educational Gratuity Program: $500/semester for children of 100% disabled veterans at PA public colleges',
        'Pennsylvania Higher Education Assistance Agency (PHEAA) administers all veteran dependent programs',
      ],
    },
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
    propertyTaxExemptions: [
      'Property tax exemptions vary by municipality — no uniform statewide program',
      'Many cities and towns offer exemptions for 100% disabled veterans; amounts vary widely',
      'Contact your local tax assessor for current exemption amounts and application process',
    ],
    educationBenefits: {
      retiree: [
        'RI Veterans Tuition Credit: up to $1,000/year for qualifying veterans at RI institutions',
        'Rhode Island Board of Education institutions offer in-state tuition for honorably discharged veterans',
        'RI National Guard Tuition Assistance covers tuition at RI public colleges and universities',
      ],
      family: [
        'RI Children of Veterans Scholarship: eligible children of veterans rated 100% P&T disabled or KIA receive reduced or free tuition at RI public colleges',
        'Surviving spouses of service members who died on active duty qualify for in-state tuition',
        'Rhode Island Office of the Postsecondary Commissioner assists families with available education benefits',
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
    propertyTaxExemptions: [
      'Exemption of $200,000 of full and true value of owner-occupied dwelling for 100% disabled veterans',
      'Scaled exemptions available for lower disability ratings (50%, 70%, etc.)',
      'Apply through county director of equalization; no income limit for 100% rating',
    ],
    educationBenefits: {
      retiree: [
        'SD Free Tuition for Veterans: one month of free tuition at SD Board of Regents schools for each month of active service (up to 4 years total)',
        'One of the most direct and flexible veteran education benefit programs nationally',
        'SD National Guard Tuition Assistance also available for guard members at SD public institutions',
      ],
      family: [
        'SD Survivors\' Education Benefit: free tuition at SD Board of Regents schools for spouses and children of veterans killed in action or rated 100% P&T disabled',
        'Surviving spouses qualify until remarriage; children must be SD residents under age 25',
        'South Dakota Board of Regents administers all veteran and dependent education waivers',
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
    propertyTaxExemptions: [
      'Minimum exemption of $10,000 with potential for higher local exemptions',
      'Municipalities may vote to increase the exemption amount above the state minimum',
      'Apply through town listers office; wartime service and disability verification required',
    ],
    educationBenefits: {
      retiree: [
        'VT National Guard Tuition Assistance covers tuition at Vermont State Colleges system',
        'Vermont State Colleges offer priority enrollment and support services for veteran students',
        'In-state tuition rates available for all honorably discharged veterans at VT public colleges',
      ],
      family: [
        'VT Children of Veterans Education Benefit: tuition assistance for children of veterans killed in action or 100% P&T disabled at VT public colleges',
        'Vermont Student Assistance Corporation (VSAC) assists eligible veteran dependents with state financial aid',
        'Surviving spouses of service members who died on active duty qualify for in-state tuition rates',
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
    propertyTaxExemptions: [
      'Property tax credit covering 100% of taxes paid on primary residence for qualifying disabled veterans',
      'Applies to veterans with 100% P&T service-connected disability; no income limit',
      'Surviving spouses retain the credit; apply through Wisconsin Department of Revenue',
    ],
    educationBenefits: {
      retiree: [
        'WI GI Bill: free tuition and fees for 128 credits at UW System schools or WI Technical Colleges for eligible veterans (90+ days active duty)',
        'Covers both undergraduate and graduate programs at UW System institutions',
        'One of the broadest state veteran education programs — no income test, no GPA floor at enrollment',
      ],
      family: [
        'WI GI Bill Spouse & Child Benefit: spouses and children of veterans who were 100% P&T disabled or died while on active duty receive the same 128-credit free tuition and fee benefit',
        'Benefit can be used at any UW System campus or Wisconsin Technical College System school',
        'Wisconsin Higher Educational Aids Board (HEAB) administers all GI Bill and dependent education programs',
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

  // ── US TERRITORIES ────────────────────────────────────────────────────────

  'puerto-rico': {
    vehicleRegistrationBenefits: [
      '100% service-connected disabled veterans exempt from PR vehicle registration fees',
      'Veteran designation available on Puerto Rico driver\'s license',
      '"Veterano" specialty license plate available for honorably discharged veterans',
      'Surviving spouses of 100% P&T disabled veterans retain registration exemptions',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration and specialty plate',
      'Purple Heart: free "Purple Heart" specialty license plate',
      'Puerto Rico Office of Veterans Affairs assists with available PR-level benefits',
    ],
    propertyTaxExemptions: [
      'No dedicated 100% VA disability property tax exemption program under Puerto Rico law',
      'Federal veteran benefits still apply; contact local CRIM office for any available local relief',
      'Puerto Rico has its own tax system — verify current rules with CRIM (Centro de Recaudación de Ingresos Municipales)',
    ],
    educationBenefits: {
      retiree: [
        'University of Puerto Rico (UPR): waived tuition for eligible PR resident veterans under Act 135 and UPR regulations',
        'Post-9/11 GI Bill fully applicable at all accredited PR institutions',
        'PR Vocational Rehabilitation program assists veterans with service-connected disabilities',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): federal benefit for dependents of P&T or killed-in-service veterans — applies at UPR and all PR-accredited schools',
        'UPR extends in-state tuition rates to children of PR resident veterans',
        'PR Department of Education coordinates dependent scholarship programs for children of fallen heroes',
      ],
    },
  },
  guam: {
    vehicleRegistrationBenefits: [
      '100% service-connected disabled veterans exempt from Guam vehicle registration fees',
      'Veteran designation on Guam driver\'s license',
      'Disabled veteran specialty license plate available',
      'Access to on-base vehicle registration services through Andersen AFB and Naval Station Guam',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration and specialty plate',
      'Purple Heart: specialty license plate available',
      'Guam DVA assists recipients with local benefit coordination',
    ],
    propertyTaxExemptions: [
      'No dedicated 100% VA disability property tax exemption program under Puerto Rico law',
      'Federal veteran benefits still apply; contact local CRIM office for any available local relief',
      'Puerto Rico has its own tax system — verify current rules with CRIM (Centro de Recaudación de Ingresos Municipales)',
    ],
    educationBenefits: {
      retiree: [
        'University of Guam (UOG): in-state tuition and fee waivers for eligible Guam resident veterans',
        'Guam Community College: reduced tuition for honorably discharged veterans',
        'Post-9/11 GI Bill fully applicable at UOG and Guam Community College',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): applies at UOG and accredited Guam institutions',
        'UOG extends tuition considerations to dependents of veterans rated 100% P&T or killed in service',
        'Guam DVA coordinates available dependent educational benefits',
      ],
    },
  },
  'us-virgin-islands': {
    vehicleRegistrationBenefits: [
      '100% service-connected disabled veterans exempt from USVI vehicle registration fees',
      'Veteran designation available on USVI driver\'s license',
      'Veteran specialty license plate available',
      'USVI Office of Veterans Affairs assists with local benefits coordination',
    ],
    medalBenefits: [
      'Medal of Honor: free vehicle registration',
      'Purple Heart: specialty license plate recognition',
      'USVI Veterans Affairs assists Medal of Honor and Purple Heart recipients',
    ],
    propertyTaxExemptions: [
      'No specific 100% VA disability property tax exemption program under USVI law',
      'Federal veteran benefits still apply; contact USVI Bureau of Internal Revenue for any local options',
      'Verify current rules with local tax authorities',
    ],
    educationBenefits: {
      retiree: [
        'University of the Virgin Islands (UVI): in-state tuition and fee waivers for eligible USVI resident veterans',
        'Post-9/11 GI Bill fully applicable at UVI',
        'USVI Office of Veterans Affairs coordinates vocational rehabilitation services',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): applies at UVI and accredited USVI institutions',
        'UVI provides tuition considerations for dependents of veterans killed in service or rated 100% P&T',
        'USVI Office of Veterans Affairs assists with dependent education benefit enrollment',
      ],
    },
  },
  'american-samoa': {
    vehicleRegistrationBenefits: [
      'Veterans with service-connected disabilities may qualify for American Samoa vehicle registration fee waivers',
      'Veteran designation available on American Samoa driver\'s license',
      'Federal commissary and exchange access available to eligible retirees visiting military installations',
    ],
    medalBenefits: [
      'American Samoa recognizes Medal of Honor and Purple Heart recipients through veteran services programs',
      'Local veteran ceremonies and recognition coordinated through the American Samoa Department of Human Resources',
    ],
    propertyTaxExemptions: [
      'No specific 100% VA disability property tax exemption program under American Samoa law',
      'Federal veteran benefits still apply; contact local government for any available relief',
      'Verify current rules with American Samoa tax authorities',
    ],
    educationBenefits: {
      retiree: [
        'American Samoa Community College (ASCC): reduced tuition for eligible AS resident veterans',
        'Post-9/11 GI Bill fully applicable at ASCC and accredited programs',
        'Federal vocational rehabilitation (Chapter 31) available for veterans with service-connected disabilities',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): applies at ASCC and accredited AS institutions',
        'ASCC provides educational support for dependents of veterans killed in service or rated 100% P&T',
        'American Samoa Department of Human Resources coordinates dependent education assistance',
      ],
    },
  },
  'northern-mariana-islands': {
    vehicleRegistrationBenefits: [
      'CNMI veterans with service-connected disabilities may qualify for vehicle registration fee waivers',
      'Veteran designation on CNMI driver\'s license',
      'Access to on-base services through military installations on Tinian and Saipan',
    ],
    medalBenefits: [
      'CNMI Board of Northern Marianas Veterans Affairs recognizes Medal of Honor and Purple Heart recipients',
      'Local veteran recognition programs coordinated through BNMVA',
    ],
    propertyTaxExemptions: [
      'No specific 100% VA disability property tax exemption program under CNMI law',
      'Federal veteran benefits still apply; contact CNMI Division of Revenue and Taxation for local options',
      'Verify current rules with local tax authorities',
    ],
    educationBenefits: {
      retiree: [
        'Northern Marianas College (NMC): in-state tuition for eligible CNMI resident veterans',
        'Post-9/11 GI Bill fully applicable at NMC and accredited programs',
        'Federal vocational rehabilitation (Chapter 31) available for CNMI veterans with service-connected disabilities',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): applies at NMC and accredited CNMI institutions',
        'NMC provides tuition considerations for dependents of veterans killed in service or rated 100% P&T',
        'BNMVA coordinates available dependent education assistance programs',
      ],
    },
  },
  'dc': {
    vehicleRegistrationBenefits: [
      '100% service-connected disabled veterans exempt from DC vehicle registration fees',
      'Surviving spouses of veterans who died in service or from service-connected disability retain the registration fee exemption',
      'Veteran designation available on DC driver\'s license',
      'Free "Disabled Veteran" specialty license plate for 100% P&T veterans',
    ],
    medalBenefits: [
      'Medal of Honor: free DC vehicle registration and free specialty plate',
      'Purple Heart: free "Purple Heart" specialty license plate',
      'DC Office of Veterans Affairs assists Medal of Honor and Purple Heart recipients with available DC benefits',
    ],
    propertyTaxExemptions: [
      'Veterans with 100% service-connected disability may qualify for reduced property tax rate on primary residence',
      'DC homestead deduction also applies; contact DC Office of Tax and Revenue for current details',
      'Surviving spouses may retain benefits; contact DC Office of Tax and Revenue for details',
    ],
    educationBenefits: {
      retiree: [
        'University of the District of Columbia (UDC): free tuition for eligible DC resident veterans under the DC Veterans Education Benefits Program',
        'UDC Community College: free tuition for honorably discharged DC resident veterans',
        'Post-9/11 GI Bill transferable to all accredited DC-area institutions',
      ],
      family: [
        'Survivors\' & Dependents\' Educational Assistance (Chapter 35): federal benefit for spouses and children of veterans rated 100% P&T or died from service-connected causes — applies at UDC and all DC-area schools',
        'DC Children of Fallen Heroes Scholarship: tuition assistance at DC public institutions for children of DC first responders and military members killed in the line of duty',
        'UDC waives tuition for dependents of DC resident veterans under qualifying federal programs',
      ],
    },
  },
};
