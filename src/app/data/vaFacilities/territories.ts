import type { VAFacility } from './types';

export const territoriesFacilities: Record<string, VAFacility[]> = {
  'puerto-rico': [
    { name: 'VA Caribbean Healthcare System (San Juan VAMC)', lat: 18.4135, lon: -66.0614, address: '10 Casia St, San Juan, PR 00921', phone: '(787) 641-7582', type: 'vamc' },
    { name: 'Ponce VA Clinic', lat: 17.9828, lon: -66.6089, address: 'Carr 14 Km 24, Ponce, PR 00716', phone: '(787) 841-3700', type: 'clinic' },
    { name: 'Mayaguez VA Clinic', lat: 18.2001, lon: -67.1432, address: '871 Calle Nenadich, Mayaguez, PR 00680', phone: '(787) 832-9474', type: 'clinic' },
    { name: 'Arecibo VA Clinic', lat: 18.4721, lon: -66.7154, address: '1 Veterans Plaza, Arecibo, PR 00612', phone: '(787) 879-5200', type: 'clinic' },
  ],
  guam: [
    { name: 'Guam VA Clinic', lat: 13.4746, lon: 144.7503, address: '222 Chalan Santo Papa, Hagåtña, GU 96910', phone: '(671) 475-5760', type: 'clinic' },
  ],
  'us-virgin-islands': [
    { name: 'St. Croix VA Clinic', lat: 17.7281, lon: -64.7027, address: '3500 Estate Richmond, St. Croix, VI 00820', phone: '(340) 778-5553', type: 'clinic' },
    { name: 'St. Thomas VA Clinic', lat: 18.3511, lon: -64.9307, address: '50 Estate Thomas, St. Thomas, VI 00802', phone: '(340) 774-6094', type: 'clinic' },
  ],
  'american-samoa': [
    { name: 'American Samoa Vet Center', lat: -14.2781, lon: -170.7025, address: 'Pago Pago, AS 96799', phone: '(684) 699-3730', type: 'clinic' },
  ],
  'northern-mariana-islands': [
    { name: 'CNMI VA Clinic (Saipan)', lat: 15.1994, lon: 145.7335, address: 'Saipan, MP 96950', phone: '(670) 322-0647', type: 'clinic' },
  ],
};
