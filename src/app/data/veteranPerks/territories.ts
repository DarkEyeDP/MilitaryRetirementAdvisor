import type { VeteranPerksData } from './types';

// PR GU VI AS MP

export const territoriesPerks: Record<string, VeteranPerksData> = {
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
  'guam': {
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
      'No dedicated 100% VA disability property tax exemption program under Guam law',
      'Federal veteran benefits still apply; contact local tax authority for any available local relief',
      'Verify current rules with Guam Department of Revenue and Taxation',
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
};
