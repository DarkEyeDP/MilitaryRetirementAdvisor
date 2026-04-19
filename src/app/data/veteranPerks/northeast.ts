import type { VeteranPerksData } from './types';

// CT DE MA MD ME NH NJ NY PA RI VT DC

export const northeastPerks: Record<string, VeteranPerksData> = {
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
