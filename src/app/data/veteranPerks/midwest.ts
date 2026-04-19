import type { VeteranPerksData } from './types';

// IA IL IN KS MI MN MO ND NE OH OK SD WI

export const midwestPerks: Record<string, VeteranPerksData> = {
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
};
