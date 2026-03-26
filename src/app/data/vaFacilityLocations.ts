/**
 * VA Medical Center (VAMC) locations by state
 * Coordinates are approximate center-of-facility locations.
 * Source: VA.gov facility locator (major VAMCs only — excludes CBOCs/outpatient-only sites)
 * Data year: 2026
 */

export interface VAFacility {
  name: string;
  lat: number;
  lon: number;
  address?: string;
  phone?: string;
  type?: 'vamc' | 'clinic';
}

export const vaFacilityLocations: Record<string, VAFacility[]> = {
  florida: [
    // VA Medical Centers
    { name: 'Bay Pines VA Medical Center', lat: 27.752, lon: -82.739, address: '10000 Bay Pines Blvd, Bay Pines, FL 33744', phone: '(727) 398-6661', type: 'vamc' },
    { name: 'Gainesville VA Medical Center (Malcom Randall)', lat: 29.64, lon: -82.352, address: '1601 SW Archer Rd, Gainesville, FL 32608', phone: '(352) 376-1611', type: 'vamc' },
    { name: 'Lake City VA Medical Center', lat: 30.19, lon: -82.637, address: '619 S Marion Ave, Lake City, FL 32025', phone: '(386) 755-3016', type: 'vamc' },
    { name: 'Miami VA Medical Center (Bruce W. Carter)', lat: 25.783, lon: -80.215, address: '1201 NW 16th St, Miami, FL 33125', phone: '(305) 575-7000', type: 'vamc' },
    { name: 'Orlando VA Medical Center', lat: 28.538, lon: -81.379, address: '13800 Veterans Way, Orlando, FL 32827', phone: '(407) 631-1000', type: 'vamc' },
    { name: 'Tampa VA Medical Center (James A. Haley)', lat: 28.017, lon: -82.466, address: '13000 Bruce B Downs Blvd, Tampa, FL 33612', phone: '(813) 972-2000', type: 'vamc' },
    { name: 'West Palm Beach VA Medical Center', lat: 26.715, lon: -80.109, address: '7305 N Military Trail, West Palm Beach, FL 33410', phone: '(561) 422-8262', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Jacksonville VA Clinic', lat: 30.332, lon: -81.656, address: '1833 Boulevard, Jacksonville, FL 32206', phone: '(904) 475-2000', type: 'clinic' },
    { name: 'Pensacola VA Clinic', lat: 30.421, lon: -87.201, address: '790 Veterans Way, Pensacola, FL 32507', phone: '(850) 912-2000', type: 'clinic' },
    { name: 'Daytona Beach VA Clinic', lat: 29.211, lon: -81.029, address: '551 N Beville Ave, Daytona Beach, FL 32114', phone: '(386) 323-7500', type: 'clinic' },
    { name: 'Fort Lauderdale VA Clinic', lat: 26.159, lon: -80.256, address: '9800 W Commercial Blvd, Sunrise, FL 33351', phone: '(954) 475-4800', type: 'clinic' },
    { name: 'Fort Myers VA Clinic', lat: 26.617, lon: -81.951, address: '2489 Diplomat Pkwy E, Cape Coral, FL 33909', phone: '(239) 652-1500', type: 'clinic' },
    { name: 'Tallahassee VA Clinic', lat: 30.455, lon: -84.253, address: '1607 St James Court, Tallahassee, FL 32308', phone: '(850) 878-0191', type: 'clinic' },
    { name: 'Ocala VA Clinic', lat: 29.187, lon: -82.124, address: '1515 E Silver Springs Blvd, Ocala, FL 34470', phone: '(352) 369-3320', type: 'clinic' },
  ],
  texas: [
    // VA Medical Centers
    {
      name: 'Amarillo VA Medical Center',
      lat: 35.191,
      lon: -101.831,
      address: '6010 Amarillo Blvd W, Amarillo, TX 79106',
      phone: '(806) 355-9703',
      type: 'vamc',
    },
    {
      name: 'Big Spring VA Medical Center',
      lat: 32.237,
      lon: -101.469,
      address: '300 Veterans Blvd, Big Spring, TX 79720',
      phone: '(432) 263-7361',
      type: 'vamc',
    },
    {
      name: 'Dallas VA Medical Center',
      lat: 32.814,
      lon: -96.82,
      address: '4500 S Lancaster Rd, Dallas, TX 75216',
      phone: '(214) 742-8387',
      type: 'vamc',
    },
    {
      name: 'El Paso VA Medical Center',
      lat: 31.832,
      lon: -106.442,
      address: '5001 N Piedras St, El Paso, TX 79930',
      phone: '(915) 564-6100',
      type: 'vamc',
    },
    {
      name: 'Houston VA Medical Center (Michael E. DeBakey)',
      lat: 29.733,
      lon: -95.402,
      address: '2002 Holcombe Blvd, Houston, TX 77030',
      phone: '(713) 791-1414',
      type: 'vamc',
    },
    {
      name: 'Kerrville VA Medical Center',
      lat: 30.047,
      lon: -99.14,
      address: '3600 Memorial Blvd, Kerrville, TX 78028',
      phone: '(830) 896-2020',
      type: 'vamc',
    },
    {
      name: 'Marlin VA Medical Center',
      lat: 31.305,
      lon: -96.899,
      address: '1016 Ward St, Marlin, TX 76661',
      phone: '(254) 883-3511',
      type: 'vamc',
    },
    {
      name: 'San Antonio VA Medical Center (Audie L. Murphy)',
      lat: 29.538,
      lon: -98.592,
      address: '7400 Merton Minter Blvd, San Antonio, TX 78229',
      phone: '(210) 617-5300',
      type: 'vamc',
    },
    {
      name: 'Temple VA Medical Center (Olin E. Teague)',
      lat: 31.105,
      lon: -97.343,
      address: '1901 Veterans Memorial Dr, Temple, TX 76504',
      phone: '(254) 778-4811',
      type: 'vamc',
    },
    {
      name: 'Waco VA Medical Center',
      lat: 31.549,
      lon: -97.147,
      address: '4800 Memorial Dr, Waco, TX 76711',
      phone: '(254) 752-6581',
      type: 'vamc',
    },
    // Community-Based Outpatient Clinics (CBOCs)
    {
      name: 'Austin VA Clinic',
      lat: 30.185,
      lon: -97.728,
      address: '7901 Metropolis Dr, Austin, TX 78744',
      phone: '(512) 823-4000',
      type: 'clinic',
    },
    {
      name: 'Beaumont VA Clinic',
      lat: 30.073,
      lon: -94.131,
      address: '3420 Veterans Circle, Beaumont, TX 77707',
      phone: '(409) 981-8550',
      type: 'clinic',
    },
    {
      name: 'Corpus Christi VA Clinic',
      lat: 27.763,
      lon: -97.418,
      address: '5283 Old Brownsville Rd, Corpus Christi, TX 78405',
      phone: '(361) 806-6900',
      type: 'clinic',
    },
    {
      name: 'Fort Worth VA Clinic',
      lat: 32.745,
      lon: -97.33,
      address: '2201 SE Loop 820, Fort Worth, TX 76119',
      phone: '(817) 730-0000',
      type: 'clinic',
    },
    {
      name: 'Harlingen VA Clinic',
      lat: 26.191,
      lon: -97.696,
      address: '2601 Veterans Dr, Harlingen, TX 78550',
      phone: '(956) 291-9000',
      type: 'clinic',
    },
    {
      name: 'Laredo VA Clinic',
      lat: 27.527,
      lon: -99.505,
      address: '4702 Santa Ursula Ave, Laredo, TX 78041',
      phone: '(956) 523-7850',
      type: 'clinic',
    },
    {
      name: 'Lubbock VA Clinic',
      lat: 33.537,
      lon: -101.868,
      address: '6104 Ave Q, Lubbock, TX 79412',
      phone: '(806) 472-3400',
      type: 'clinic',
    },
    {
      name: 'Lufkin VA Clinic',
      lat: 31.338,
      lon: -94.729,
      address: '1301 Frank Ave, Lufkin, TX 75904',
      phone: '(936) 637-1342',
      type: 'clinic',
    },
    {
      name: 'McAllen VA Clinic',
      lat: 26.192,
      lon: -98.245,
      address: '2101 S Col Rowe Blvd, McAllen, TX 78501',
      phone: '(956) 618-7100',
      type: 'clinic',
    },
    {
      name: 'Midland VA Clinic',
      lat: 32.024,
      lon: -102.077,
      address: '4500 N Garfield St, Midland, TX 79705',
      phone: '(432) 697-8324',
      type: 'clinic',
    },
    {
      name: 'Palestine VA Clinic',
      lat: 31.744,
      lon: -95.643,
      address: '2000 S Loop 256, Palestine, TX 75801',
      phone: '(903) 729-4565',
      type: 'clinic',
    },
    {
      name: 'San Antonio Westover Hills VA Clinic',
      lat: 29.469,
      lon: -98.635,
      address: '9800 Village Dr, San Antonio, TX 78251',
      phone: '(210) 581-8000',
      type: 'clinic',
    },
    {
      name: 'Texarkana VA Clinic',
      lat: 33.426,
      lon: -94.048,
      address: '819 State Line Ave, Texarkana, TX 75501',
      phone: '(903) 255-2600',
      type: 'clinic',
    },
    {
      name: 'Tyler VA Clinic',
      lat: 32.377,
      lon: -95.301,
      address: '3101 N Midway Dr, Tyler, TX 75702',
      phone: '(903) 593-5888',
      type: 'clinic',
    },
    {
      name: 'Victoria VA Clinic',
      lat: 28.824,
      lon: -97.003,
      address: '3006 N Laurent St, Victoria, TX 77901',
      phone: '(361) 485-6400',
      type: 'clinic',
    },
    {
      name: 'Wichita Falls VA Clinic',
      lat: 33.906,
      lon: -98.485,
      address: '1400 Hamilton St, Wichita Falls, TX 76301',
      phone: '(940) 723-2373',
      type: 'clinic',
    },
  ],
  virginia: [
    // VA Medical Centers
    { name: 'Hampton VA Medical Center', lat: 37.024, lon: -76.34, address: '100 Emancipation Dr, Hampton, VA 23667', phone: '(757) 722-9961', type: 'vamc' },
    { name: 'Richmond VA Medical Center (McGuire)', lat: 37.48, lon: -77.439, address: '1201 Broad Rock Blvd, Richmond, VA 23249', phone: '(804) 675-5000', type: 'vamc' },
    { name: 'Salem VA Medical Center', lat: 37.293, lon: -80.042, address: '1970 Roanoke Blvd, Salem, VA 24153', phone: '(540) 982-2463', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Norfolk VA Clinic', lat: 36.839, lon: -76.054, address: '4101 E Princess Anne Rd, Norfolk, VA 23502', phone: '(757) 623-2667', type: 'clinic' },
    { name: 'Charlottesville VA Clinic', lat: 38.029, lon: -78.477, address: '590 Peter Jefferson Pkwy, Charlottesville, VA 22911', phone: '(434) 293-3890', type: 'clinic' },
    { name: 'Fredericksburg VA Clinic', lat: 38.301, lon: -77.461, address: '130 Executive Center Pkwy, Fredericksburg, VA 22401', phone: '(540) 370-4944', type: 'clinic' },
    { name: 'Virginia Beach VA Clinic', lat: 36.853, lon: -75.978, address: '244 Clearfield Ave, Virginia Beach, VA 23462', phone: '(757) 722-9961', type: 'clinic' },
    { name: 'Winchester VA Clinic', lat: 39.186, lon: -78.163, address: '1000 N Cork St, Winchester, VA 22601', phone: '(540) 542-4000', type: 'clinic' },
  ],
  tennessee: [
    // VA Medical Centers
    { name: 'Memphis VA Medical Center', lat: 35.149, lon: -90.048, address: '1030 Jefferson Ave, Memphis, TN 38104', phone: '(901) 523-8990', type: 'vamc' },
    { name: 'Mountain Home VA Medical Center (James H. Quillen)', lat: 36.31, lon: -82.374, address: 'Veterans Way, Mountain Home, TN 37684', phone: '(423) 926-1171', type: 'vamc' },
    { name: 'Murfreesboro VA Medical Center', lat: 35.849, lon: -86.392, address: '3400 Lebanon Pike, Murfreesboro, TN 37129', phone: '(615) 867-6000', type: 'vamc' },
    { name: 'Nashville VA Medical Center (Tennessee Valley)', lat: 36.165, lon: -86.784, address: '1310 24th Ave S, Nashville, TN 37212', phone: '(615) 327-4751', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Chattanooga VA Clinic', lat: 35.046, lon: -85.309, address: '1108 E 3rd St, Chattanooga, TN 37403', phone: '(423) 893-6500', type: 'clinic' },
    { name: 'Knoxville VA Clinic', lat: 35.909, lon: -83.995, address: '9317 Cross Park Dr, Knoxville, TN 37923', phone: '(865) 545-4592', type: 'clinic' },
    { name: 'Jackson VA Clinic', lat: 35.615, lon: -88.814, address: '273 Lake Rd, Jackson, TN 38301', phone: '(731) 660-0605', type: 'clinic' },
    { name: 'Cookeville VA Clinic', lat: 36.162, lon: -85.502, address: '851 S Willow Ave, Cookeville, TN 38501', phone: '(931) 646-1123', type: 'clinic' },
  ],
  nevada: [
    // VA Medical Centers
    { name: 'Las Vegas VA Medical Center (VA Southern Nevada)', lat: 36.245, lon: -115.107, address: '6900 N Pecos Rd, North Las Vegas, NV 89086', phone: '(702) 791-9000', type: 'vamc' },
    { name: 'Reno VA Medical Center (Sierra Nevada)', lat: 39.534, lon: -119.813, address: '975 Kirman Ave, Reno, NV 89502', phone: '(775) 786-7200', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Henderson VA Outpatient Clinic', lat: 36.04, lon: -115.032, address: '2920 N Green Valley Pkwy, Henderson, NV 89014', phone: '(702) 791-9000', type: 'clinic' },
    { name: 'Pahrump VA Outpatient Clinic', lat: 36.208, lon: -115.984, address: '2100 E Calvada Blvd, Pahrump, NV 89048', phone: '(775) 751-2053', type: 'clinic' },
  ],
  washington: [
    // VA Medical Centers
    { name: 'American Lake VA Medical Center (Tacoma)', lat: 47.144, lon: -122.556, address: '9600 Veterans Dr SW, Tacoma, WA 98493', phone: '(253) 582-8440', type: 'vamc' },
    { name: 'Seattle VA Medical Center (VA Puget Sound)', lat: 47.652, lon: -122.305, address: '1660 S Columbian Way, Seattle, WA 98108', phone: '(206) 762-1010', type: 'vamc' },
    { name: 'Spokane VA Medical Center (Mann-Grandstaff)', lat: 47.665, lon: -117.405, address: '4815 N Assembly St, Spokane, WA 99205', phone: '(509) 434-7000', type: 'vamc' },
    { name: 'Walla Walla VA Medical Center (Jonathan M. Wainwright)', lat: 46.063, lon: -118.343, address: '77 Wainwright Dr, Walla Walla, WA 99362', phone: '(509) 525-5200', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Vancouver VA Outpatient Clinic', lat: 45.639, lon: -122.671, address: '1601 E 4th Plain Blvd, Vancouver, WA 98661', phone: '(360) 696-4061', type: 'clinic' },
    { name: 'Kennewick VA Outpatient Clinic', lat: 46.209, lon: -119.137, address: '615 S Ely St, Kennewick, WA 99336', phone: '(509) 783-1111', type: 'clinic' },
  ],
  alaska: [
    // VA Medical Centers
    { name: 'Anchorage VA Medical Center', lat: 61.218, lon: -149.9, address: '1201 N Muldoon Rd, Anchorage, AK 99504', phone: '(907) 257-4700', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Fairbanks VA Outpatient Clinic', lat: 64.838, lon: -147.716, address: '540 Noble St, Fairbanks, AK 99701', phone: '(907) 456-4218', type: 'clinic' },
  ],
  wyoming: [
    // VA Medical Centers
    { name: 'Cheyenne VA Medical Center', lat: 41.137, lon: -104.82, address: '2360 E Pershing Blvd, Cheyenne, WY 82001', phone: '(307) 778-7550', type: 'vamc' },
    { name: 'Sheridan VA Medical Center', lat: 44.797, lon: -106.966, address: '1898 Fort Rd, Sheridan, WY 82801', phone: '(307) 672-3473', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Casper VA Outpatient Clinic', lat: 42.854, lon: -106.313, address: '2620 C.Y. Ave, Casper, WY 82604', phone: '(307) 232-0007', type: 'clinic' },
    { name: 'Gillette VA Outpatient Clinic', lat: 44.291, lon: -105.502, address: '1816 S Douglas Hwy, Gillette, WY 82718', phone: '(307) 685-0676', type: 'clinic' },
  ],
  'south-dakota': [
    // VA Medical Centers
    { name: 'Fort Meade VA Medical Center', lat: 44.407, lon: -103.462, address: '113 Comanche Rd, Fort Meade, SD 57741', phone: '(605) 347-2511', type: 'vamc' },
    { name: 'Sioux Falls VA Medical Center (Royal C. Johnson)', lat: 43.549, lon: -96.729, address: '2501 W 22nd St, Sioux Falls, SD 57105', phone: '(605) 336-3230', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Rapid City VA Clinic', lat: 44.08, lon: -103.231, address: '3625 5th St, Rapid City, SD 57701', phone: '(605) 718-1095', type: 'clinic' },
    { name: 'Aberdeen VA Clinic', lat: 45.464, lon: -98.486, address: '2900 3rd Ave SE, Aberdeen, SD 57401', phone: '(605) 622-2640', type: 'clinic' },
    { name: 'Hot Springs VA Medical Center', lat: 43.432, lon: -103.47, address: '500 N 5th St, Hot Springs, SD 57747', phone: '(605) 745-2000', type: 'clinic' },
  ],
  'new-hampshire': [
    // VA Medical Centers
    { name: 'Manchester VA Medical Center', lat: 42.992, lon: -71.464, address: '718 Smyth Rd, Manchester, NH 03104', phone: '(603) 624-4366', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Conway VA Clinic', lat: 43.981, lon: -71.127, address: '71 Hobbs St, Conway, NH 03818', phone: '(603) 624-4366', type: 'clinic' },
    { name: 'Portsmouth VA Clinic', lat: 43.071, lon: -70.762, address: '302 Newmarket St, Portsmouth, NH 03801', phone: '(603) 624-4366', type: 'clinic' },
    { name: 'Tilton VA Clinic', lat: 43.448, lon: -71.594, address: '630 Main St, Tilton, NH 03276', phone: '(603) 624-4366', type: 'clinic' },
  ],
  'north-carolina': [
    // VA Medical Centers
    { name: 'Asheville VA Medical Center (Charles George)', lat: 35.547, lon: -82.558, address: '1100 Tunnel Rd, Asheville, NC 28805', phone: '(828) 298-7911', type: 'vamc' },
    { name: 'Durham VA Medical Center', lat: 35.997, lon: -78.939, address: '508 Fulton St, Durham, NC 27705', phone: '(919) 286-0411', type: 'vamc' },
    { name: 'Fayetteville VA Medical Center', lat: 35.052, lon: -78.879, address: '2300 Ramsey St, Fayetteville, NC 28301', phone: '(910) 488-2120', type: 'vamc' },
    { name: 'Salisbury VA Medical Center (W.G. Hefner)', lat: 35.67, lon: -80.474, address: '1601 Brenner Ave, Salisbury, NC 28144', phone: '(704) 638-9000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Charlotte VA Clinic', lat: 35.228, lon: -80.843, address: '8601 University East Dr, Charlotte, NC 28213', phone: '(704) 597-3500', type: 'clinic' },
    { name: 'Greensboro VA Clinic', lat: 36.073, lon: -79.792, address: '1515 W Market St, Greensboro, NC 27403', phone: '(336) 333-6130', type: 'clinic' },
    { name: 'Wilmington VA Clinic', lat: 34.226, lon: -77.945, address: '1705 Gardner Dr, Wilmington, NC 28405', phone: '(910) 343-7400', type: 'clinic' },
    { name: 'Jacksonville VA Clinic', lat: 34.754, lon: -77.43, address: '4247 W Corbett Ave, Jacksonville, NC 28540', phone: '(910) 353-6406', type: 'clinic' },
    { name: 'Raleigh VA Clinic', lat: 35.752, lon: -78.633, address: '3305 Sungate Blvd, Raleigh, NC 27610', phone: '(919) 212-0129', type: 'clinic' },
  ],
  georgia: [
    // VA Medical Centers
    { name: 'Atlanta VA Medical Center (Joseph Maxwell Cleland)', lat: 33.772, lon: -84.296, address: '1670 Clairmont Rd, Decatur, GA 30033', phone: '(404) 321-6111', type: 'vamc' },
    { name: 'Augusta VA Medical Center (Charlie Norwood)', lat: 33.475, lon: -82.024, address: '1 Freedom Way, Augusta, GA 30904', phone: '(706) 733-0188', type: 'vamc' },
    { name: 'Dublin VA Medical Center (Carl Vinson)', lat: 32.54, lon: -82.903, address: '1826 Veterans Blvd, Dublin, GA 31021', phone: '(478) 272-1210', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Savannah VA Clinic', lat: 32.083, lon: -81.1, address: '325 W Montgomery Cross Rd, Savannah, GA 31406', phone: '(912) 920-0214', type: 'clinic' },
    { name: 'Columbus VA Clinic', lat: 32.461, lon: -84.988, address: '1310 13th St, Columbus, GA 31901', phone: '(706) 257-7200', type: 'clinic' },
    { name: 'Macon VA Clinic', lat: 32.836, lon: -83.632, address: '3460 Log Cabin Dr, Macon, GA 31204', phone: '(478) 476-6170', type: 'clinic' },
    { name: 'Rome VA Clinic', lat: 34.257, lon: -85.165, address: '315 E 2nd Ave, Rome, GA 30161', phone: '(706) 235-6581', type: 'clinic' },
  ],
  california: [
    // VA Medical Centers
    { name: 'Fresno VA Medical Center', lat: 36.787, lon: -119.79, address: '2615 E Clinton Ave, Fresno, CA 93703', phone: '(559) 225-6100', type: 'vamc' },
    { name: 'Loma Linda VA Medical Center (Jerry L. Pettis)', lat: 34.044, lon: -117.261, address: '11201 Benton St, Loma Linda, CA 92357', phone: '(909) 825-7084', type: 'vamc' },
    { name: 'Long Beach VA Medical Center', lat: 33.801, lon: -118.186, address: '5901 E 7th St, Long Beach, CA 90822', phone: '(562) 826-8000', type: 'vamc' },
    { name: 'West Los Angeles VA Medical Center', lat: 34.059, lon: -118.457, address: '11301 Wilshire Blvd, Los Angeles, CA 90073', phone: '(310) 478-3711', type: 'vamc' },
    { name: 'Palo Alto VA Medical Center', lat: 37.433, lon: -122.177, address: '3801 Miranda Ave, Palo Alto, CA 94304', phone: '(650) 493-5000', type: 'vamc' },
    { name: 'Sacramento VA Medical Center (Mather)', lat: 38.56, lon: -121.298, address: '10535 Hospital Way, Mather, CA 95655', phone: '(916) 843-7000', type: 'vamc' },
    { name: 'San Diego VA Medical Center', lat: 32.874, lon: -117.237, address: '3350 La Jolla Village Dr, San Diego, CA 92161', phone: '(858) 552-8585', type: 'vamc' },
    { name: 'San Francisco VA Medical Center', lat: 37.783, lon: -122.507, address: '4150 Clement St, San Francisco, CA 94121', phone: '(415) 221-4810', type: 'vamc' },
    { name: 'Livermore VA Medical Center', lat: 37.693, lon: -121.768, address: '4951 Arroyo Rd, Livermore, CA 94550', phone: '(925) 373-4700', type: 'vamc' },
    { name: 'Martinez VA Medical Center', lat: 38.02, lon: -122.128, address: '150 Muir Rd, Martinez, CA 94553', phone: '(925) 372-2000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Sepulveda VA Ambulatory Care Center', lat: 34.22, lon: -118.476, address: '16111 Plummer St, North Hills, CA 91343', phone: '(818) 891-7711', type: 'clinic' },
    { name: 'San Jose VA Outpatient Clinic', lat: 37.335, lon: -121.893, address: '80 Great Oaks Blvd, San Jose, CA 95119', phone: '(408) 363-3011', type: 'clinic' },
    { name: 'Monterey VA Outpatient Clinic', lat: 36.6, lon: -121.894, address: '3401 Engineer Ln, Seaside, CA 93955', phone: '(831) 883-3800', type: 'clinic' },
    { name: 'Oxnard VA Outpatient Clinic', lat: 34.197, lon: -119.177, address: '2000 Outlet Center Dr, Oxnard, CA 93036', phone: '(805) 983-3845', type: 'clinic' },
  ],
  arizona: [
    // VA Medical Centers
    { name: 'Phoenix VA Medical Center (Carl T. Hayden)', lat: 33.484, lon: -112.099, address: '650 E Indian School Rd, Phoenix, AZ 85012', phone: '(602) 277-5551', type: 'vamc' },
    { name: 'Prescott VA Medical Center', lat: 34.551, lon: -112.469, address: '500 AZ-89 N, Prescott, AZ 86313', phone: '(928) 445-4860', type: 'vamc' },
    { name: 'Tucson VA Medical Center (Southern Arizona)', lat: 32.235, lon: -110.96, address: '3601 S 6th Ave, Tucson, AZ 85723', phone: '(520) 792-1450', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Flagstaff VA Outpatient Clinic', lat: 35.198, lon: -111.651, address: '1851 Elden St, Flagstaff, AZ 86004', phone: '(928) 213-3000', type: 'clinic' },
    { name: 'Sun City VA Outpatient Clinic', lat: 33.6, lon: -112.273, address: '13611 N 103rd Ave, Sun City, AZ 85351', phone: '(623) 214-4200', type: 'clinic' },
    { name: 'Mesa VA Outpatient Clinic', lat: 33.374, lon: -111.666, address: '6950 E Williams Field Rd, Mesa, AZ 85212', phone: '(480) 832-7100', type: 'clinic' },
    { name: 'Tucson South VA Outpatient Clinic', lat: 32.215, lon: -110.878, address: '2475 E Broadway Blvd, Tucson, AZ 85716', phone: '(520) 629-4600', type: 'clinic' },
  ],
  colorado: [
    // VA Medical Centers
    { name: 'Rocky Mountain Regional VA Medical Center (Aurora)', lat: 39.721, lon: -104.689, address: '1700 N Wheeling St, Aurora, CO 80045', phone: '(720) 723-7000', type: 'vamc' },
    { name: 'Eastern Colorado VA Medical Center (Denver)', lat: 39.741, lon: -104.986, address: '1055 Clermont St, Denver, CO 80220', phone: '(303) 399-8020', type: 'vamc' },
    { name: 'Grand Junction VA Medical Center', lat: 39.064, lon: -108.551, address: '2121 North Ave, Grand Junction, CO 81501', phone: '(970) 242-0731', type: 'vamc' },
    { name: 'Pueblo VA Medical Center (Southern Colorado)', lat: 38.254, lon: -104.609, address: '3001 Baltimore Ave, Pueblo, CO 81003', phone: '(719) 553-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Colorado Springs VA Outpatient Clinic', lat: 38.859, lon: -104.713, address: '1785 N Academy Blvd, Colorado Springs, CO 80909', phone: '(719) 327-5660', type: 'clinic' },
    { name: 'Fort Collins VA Outpatient Clinic', lat: 40.574, lon: -105.06, address: '2509 Research Blvd, Fort Collins, CO 80526', phone: '(970) 224-1550', type: 'clinic' },
  ],
  oregon: [
    // VA Medical Centers
    { name: 'Portland VA Medical Center', lat: 45.496, lon: -122.682, address: '3710 SW US Veterans Hospital Rd, Portland, OR 97239', phone: '(503) 220-8262', type: 'vamc' },
    { name: 'Roseburg VA Medical Center', lat: 43.218, lon: -123.351, address: '913 NW Garden Valley Blvd, Roseburg, OR 97471', phone: '(541) 440-1000', type: 'vamc' },
    { name: 'White City VA Medical Center (Southern Oregon Rehab)', lat: 42.422, lon: -122.847, address: '8495 Crater Lake Hwy, White City, OR 97503', phone: '(541) 826-2111', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Eugene VA Outpatient Clinic', lat: 44.052, lon: -123.087, address: '3355 Chad Dr, Eugene, OR 97408', phone: '(541) 465-6918', type: 'clinic' },
    { name: 'Salem VA Outpatient Clinic', lat: 44.924, lon: -123.047, address: '1660 Oak St SE, Salem, OR 97301', phone: '(503) 362-9911', type: 'clinic' },
  ],
  idaho: [
    // VA Medical Centers
    { name: 'Boise VA Medical Center', lat: 43.6, lon: -116.226, address: '500 W Fort St, Boise, ID 83702', phone: '(208) 422-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Pocatello VA Outpatient Clinic', lat: 42.866, lon: -112.466, address: '444 Hospital Way, Pocatello, ID 83201', phone: '(208) 232-6214', type: 'clinic' },
    { name: 'Twin Falls VA Outpatient Clinic', lat: 42.561, lon: -114.46, address: '260 Second Ave E, Twin Falls, ID 83301', phone: '(208) 732-0584', type: 'clinic' },
    { name: 'Nampa VA Outpatient Clinic', lat: 43.565, lon: -116.559, address: '2725 E Deer Flat Rd, Nampa, ID 83687', phone: '(208) 463-9471', type: 'clinic' },
  ],
  montana: [
    // VA Medical Centers
    { name: 'Fort Harrison VA Medical Center (Montana)', lat: 46.611, lon: -112.026, address: '3687 Veterans Dr, Fort Harrison, MT 59636', phone: '(406) 442-6410', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Billings VA Outpatient Clinic', lat: 45.771, lon: -108.586, address: '2345 King Ave W, Billings, MT 59102', phone: '(406) 373-3600', type: 'clinic' },
    { name: 'Missoula VA Outpatient Clinic', lat: 46.882, lon: -114.016, address: '3770 Brook St, Missoula, MT 59801', phone: '(406) 327-1450', type: 'clinic' },
    { name: 'Great Falls VA Outpatient Clinic', lat: 47.504, lon: -111.301, address: '621 Grand Blvd, Great Falls, MT 59405', phone: '(406) 761-5900', type: 'clinic' },
    { name: 'Miles City VA Outpatient Clinic', lat: 46.408, lon: -105.84, address: '210 S Winchester Ave, Miles City, MT 59301', phone: '(406) 874-5600', type: 'clinic' },
  ],
  utah: [
    // VA Medical Centers
    { name: 'Salt Lake City VA Medical Center (George E. Wahlen)', lat: 40.769, lon: -111.853, address: '500 Foothill Dr, Salt Lake City, UT 84148', phone: '(801) 582-1565', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Ogden VA Outpatient Clinic', lat: 41.228, lon: -111.967, address: '930 W Chambers St, Ogden, UT 84404', phone: '(801) 479-4105', type: 'clinic' },
    { name: 'Provo VA Outpatient Clinic', lat: 40.233, lon: -111.658, address: '1506 N Technology Ave, Provo, UT 84606', phone: '(801) 377-8898', type: 'clinic' },
    { name: 'St. George VA Outpatient Clinic', lat: 37.108, lon: -113.583, address: '1067 E Tabernacle St, St. George, UT 84770', phone: '(435) 634-7608', type: 'clinic' },
  ],
  'new-mexico': [
    // VA Medical Centers
    { name: 'Albuquerque VA Medical Center (Raymond G. Murphy)', lat: 35.092, lon: -106.614, address: '1501 San Pedro Dr SE, Albuquerque, NM 87108', phone: '(505) 265-1711', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Santa Fe VA Outpatient Clinic', lat: 35.687, lon: -105.938, address: '2695 Beckner Rd, Santa Fe, NM 87507', phone: '(505) 466-7900', type: 'clinic' },
    { name: 'Gallup VA Outpatient Clinic', lat: 35.528, lon: -108.742, address: '1400 Mike Wardell Blvd, Gallup, NM 87301', phone: '(505) 722-7234', type: 'clinic' },
    { name: 'Farmington VA Outpatient Clinic', lat: 36.728, lon: -108.188, address: '1760 E 20th St, Farmington, NM 87401', phone: '(505) 326-0366', type: 'clinic' },
  ],
  oklahoma: [
    // VA Medical Centers
    { name: 'Jack C. Montgomery VA Medical Center (Muskogee)', lat: 35.748, lon: -95.369, address: '1011 Honor Heights Dr, Muskogee, OK 74401', phone: '(918) 577-3000', type: 'vamc' },
    { name: 'Oklahoma City VA Medical Center', lat: 35.476, lon: -97.598, address: '921 NE 13th St, Oklahoma City, OK 73104', phone: '(405) 456-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Tulsa VA Outpatient Clinic', lat: 36.154, lon: -95.993, address: '9322 E 41st St, Tulsa, OK 74145', phone: '(918) 628-2500', type: 'clinic' },
    { name: 'Lawton VA Outpatient Clinic', lat: 34.607, lon: -98.39, address: '4 SE 11th St, Lawton, OK 73501', phone: '(580) 585-5100', type: 'clinic' },
    { name: 'Enid VA Outpatient Clinic', lat: 36.396, lon: -97.879, address: '104 S Nashville Ave, Enid, OK 73703', phone: '(580) 249-5380', type: 'clinic' },
    { name: 'Ardmore VA Outpatient Clinic', lat: 34.174, lon: -97.134, address: '1200 Veterans Dr, Ardmore, OK 73401', phone: '(580) 223-2266', type: 'clinic' },
  ],
  missouri: [
    // VA Medical Centers
    { name: 'Columbia VA Medical Center (Harry S. Truman)', lat: 38.952, lon: -92.329, address: '800 Hospital Dr, Columbia, MO 65201', phone: '(573) 814-6000', type: 'vamc' },
    { name: 'Kansas City VA Medical Center', lat: 39.087, lon: -94.591, address: '4801 Linwood Blvd, Kansas City, MO 64128', phone: '(816) 861-4700', type: 'vamc' },
    { name: 'Poplar Bluff VA Medical Center (John J. Pershing)', lat: 36.757, lon: -90.413, address: '1500 N Westwood Blvd, Poplar Bluff, MO 63901', phone: '(573) 686-4151', type: 'vamc' },
    { name: 'St. Louis VA Medical Center (John Cochran)', lat: 38.634, lon: -90.239, address: '915 N Grand Blvd, St. Louis, MO 63106', phone: '(314) 652-4100', type: 'vamc' },
    { name: 'St. Louis VA Medical Center (Jefferson Barracks)', lat: 38.524, lon: -90.283, address: '1 Jefferson Barracks Dr, St. Louis, MO 63125', phone: '(314) 652-4100', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Springfield VA Clinic', lat: 37.177, lon: -93.293, address: '2805 S Lone Pine Ave, Springfield, MO 65804', phone: '(417) 887-6600', type: 'clinic' },
    { name: 'Joplin VA Clinic', lat: 37.085, lon: -94.513, address: '2520 S Minnesota Ave, Joplin, MO 64804', phone: '(417) 782-3990', type: 'clinic' },
    { name: 'Cape Girardeau VA Clinic', lat: 37.306, lon: -89.518, address: '2420 Veterans Memorial Dr, Cape Girardeau, MO 63701', phone: '(573) 339-0270', type: 'clinic' },
  ],
  kansas: [
    // VA Medical Centers
    { name: 'Leavenworth VA Medical Center (Dwight D. Eisenhower)', lat: 39.301, lon: -94.922, address: '4101 S 4th St, Leavenworth, KS 66048', phone: '(913) 682-2000', type: 'vamc' },
    { name: 'Wichita VA Medical Center (Robert J. Dole)', lat: 37.685, lon: -97.329, address: '5500 E Kellogg Dr, Wichita, KS 67218', phone: '(316) 685-2221', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Topeka VA Clinic', lat: 39.056, lon: -95.695, address: '1200 SW 22nd St, Topeka, KS 66604', phone: '(785) 350-3111', type: 'clinic' },
    { name: 'Salina VA Clinic', lat: 38.84, lon: -97.611, address: '1641 Santa Fe Ave, Salina, KS 67401', phone: '(785) 825-6734', type: 'clinic' },
    { name: 'Dodge City VA Clinic', lat: 37.753, lon: -100.017, address: '2210 N 14th Ave, Dodge City, KS 67801', phone: '(620) 225-8850', type: 'clinic' },
  ],
  nebraska: [
    // VA Medical Centers
    { name: 'Grand Island VA Medical Center', lat: 40.924, lon: -98.342, address: '2201 N Broadwell Ave, Grand Island, NE 68803', phone: '(308) 382-3660', type: 'vamc' },
    { name: 'Lincoln VA Medical Center', lat: 40.813, lon: -96.674, address: '600 S 70th St, Lincoln, NE 68510', phone: '(402) 489-3802', type: 'vamc' },
    { name: 'Omaha VA Medical Center', lat: 41.261, lon: -95.993, address: '4101 Woolworth Ave, Omaha, NE 68105', phone: '(402) 346-8800', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Bellevue VA Clinic', lat: 41.137, lon: -95.914, address: '2501 Capehart Rd, Bellevue, NE 68123', phone: '(402) 591-4500', type: 'clinic' },
    { name: 'Norfolk VA Clinic', lat: 41.987, lon: -97.417, address: '1007 N 13th St, Norfolk, NE 68701', phone: '(402) 370-3820', type: 'clinic' },
    { name: 'North Platte VA Clinic', lat: 41.124, lon: -100.765, address: '600 E Francis St, North Platte, NE 69101', phone: '(308) 532-6906', type: 'clinic' },
  ],
  iowa: [
    // VA Medical Centers
    { name: 'Des Moines VA Medical Center', lat: 41.6, lon: -93.628, address: '3600 30th St, Des Moines, IA 50310', phone: '(515) 699-5999', type: 'vamc' },
    { name: 'Iowa City VA Medical Center', lat: 41.663, lon: -91.534, address: '601 Hwy 6 W, Iowa City, IA 52246', phone: '(319) 338-0581', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Cedar Rapids VA Clinic', lat: 41.997, lon: -91.641, address: '4250 River Center Ct NE, Cedar Rapids, IA 52402', phone: '(319) 369-4272', type: 'clinic' },
    { name: 'Sioux City VA Clinic', lat: 42.495, lon: -96.39, address: '1551 Indian Hills Dr, Sioux City, IA 51104', phone: '(712) 255-6900', type: 'clinic' },
    { name: 'Waterloo VA Clinic', lat: 42.494, lon: -92.328, address: '2215 E San Marnan Dr, Waterloo, IA 50702', phone: '(319) 272-6750', type: 'clinic' },
  ],
  minnesota: [
    // VA Medical Centers
    { name: 'Minneapolis VA Medical Center', lat: 44.979, lon: -93.244, address: 'One Veterans Dr, Minneapolis, MN 55417', phone: '(612) 725-2000', type: 'vamc' },
    { name: 'St. Cloud VA Medical Center', lat: 45.561, lon: -94.159, address: '4801 Veterans Dr, St. Cloud, MN 56303', phone: '(320) 252-1670', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Duluth VA Clinic', lat: 46.782, lon: -92.106, address: '4311 W 6th St, Duluth, MN 55807', phone: '(218) 722-8654', type: 'clinic' },
    { name: 'Rochester VA Clinic', lat: 44.021, lon: -92.479, address: '3915 Market Place Dr NW, Rochester, MN 55901', phone: '(507) 252-0885', type: 'clinic' },
    { name: 'Hibbing VA Clinic', lat: 47.427, lon: -92.938, address: '1340 25th St E, Hibbing, MN 55746', phone: '(218) 263-4415', type: 'clinic' },
  ],
  wisconsin: [
    // VA Medical Centers
    { name: 'Madison VA Medical Center (William S. Middleton)', lat: 43.073, lon: -89.412, address: '2500 Overlook Terrace, Madison, WI 53705', phone: '(608) 256-1901', type: 'vamc' },
    { name: 'Milwaukee VA Medical Center (Clement J. Zablocki)', lat: 43.059, lon: -87.972, address: '5000 W National Ave, Milwaukee, WI 53295', phone: '(414) 384-2000', type: 'vamc' },
    { name: 'Tomah VA Medical Center', lat: 43.974, lon: -90.502, address: '500 E Veterans St, Tomah, WI 54660', phone: '(608) 372-3971', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Green Bay VA Clinic', lat: 44.519, lon: -88.02, address: '141 Maes Dr, Green Bay, WI 54303', phone: '(920) 497-3331', type: 'clinic' },
    { name: 'La Crosse VA Clinic', lat: 43.813, lon: -91.24, address: '2312 State Rd 16, La Crosse, WI 54601', phone: '(608) 784-3886', type: 'clinic' },
    { name: 'Wausau VA Clinic', lat: 44.96, lon: -89.633, address: '10501 Prentice Ave, Wausau, WI 54401', phone: '(715) 842-2834', type: 'clinic' },
  ],
  michigan: [
    // VA Medical Centers
    { name: 'Ann Arbor VA Medical Center', lat: 42.282, lon: -83.739, address: '2215 Fuller Rd, Ann Arbor, MI 48105', phone: '(734) 769-7100', type: 'vamc' },
    { name: 'Battle Creek VA Medical Center', lat: 42.305, lon: -85.179, address: '5500 Armstrong Rd, Battle Creek, MI 49037', phone: '(269) 966-5600', type: 'vamc' },
    { name: 'Detroit VA Medical Center (John D. Dingell)', lat: 42.352, lon: -83.039, address: '4646 John R St, Detroit, MI 48201', phone: '(313) 576-1000', type: 'vamc' },
    { name: 'Iron Mountain VA Medical Center (Oscar G. Johnson)', lat: 45.82, lon: -88.067, address: '325 E H St, Iron Mountain, MI 49801', phone: '(906) 774-3300', type: 'vamc' },
    { name: 'Saginaw VA Medical Center (Aleda E. Lutz)', lat: 43.428, lon: -83.946, address: '1500 Weiss St, Saginaw, MI 48602', phone: '(989) 497-2500', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Grand Rapids VA Clinic', lat: 42.996, lon: -85.636, address: '3019 Coit Ave NE, Grand Rapids, MI 49505', phone: '(616) 365-9575', type: 'clinic' },
    { name: 'Flint VA Clinic', lat: 43.013, lon: -83.668, address: '2360 Murchie Dr, Flint, MI 48507', phone: '(810) 232-2231', type: 'clinic' },
    { name: 'Lansing VA Clinic', lat: 42.707, lon: -84.555, address: '2025 S Washington Ave, Lansing, MI 48910', phone: '(517) 267-3663', type: 'clinic' },
    { name: 'Marquette VA Clinic', lat: 46.544, lon: -87.395, address: '94 W Spring St, Marquette, MI 49855', phone: '(906) 226-4618', type: 'clinic' },
  ],
  illinois: [
    // VA Medical Centers
    { name: 'Chicago VA Medical Center (Jesse Brown)', lat: 41.874, lon: -87.666, address: '820 S Damen Ave, Chicago, IL 60612', phone: '(312) 569-8387', type: 'vamc' },
    { name: 'Danville VA Medical Center', lat: 40.13, lon: -87.601, address: '1900 E Main St, Danville, IL 61832', phone: '(217) 554-3000', type: 'vamc' },
    { name: 'Hines VA Medical Center (Edward Hines Jr.)', lat: 41.852, lon: -87.85, address: '5000 S 5th Ave, Hines, IL 60141', phone: '(708) 202-8387', type: 'vamc' },
    { name: 'Marion VA Medical Center', lat: 37.731, lon: -88.933, address: '2401 W Main St, Marion, IL 62959', phone: '(618) 997-5311', type: 'vamc' },
    { name: 'North Chicago VA Medical Center (James A. Lovell FHCC)', lat: 42.3, lon: -87.886, address: '3001 Green Bay Rd, North Chicago, IL 60064', phone: '(224) 610-3460', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Peoria VA Clinic', lat: 40.694, lon: -89.589, address: '411 Fulton St, Peoria, IL 61602', phone: '(309) 495-4492', type: 'clinic' },
    { name: 'Springfield VA Clinic', lat: 39.8, lon: -89.644, address: '2700 Corporate Pkwy, Springfield, IL 62703', phone: '(217) 523-4433', type: 'clinic' },
    { name: 'Bloomington VA Clinic', lat: 40.477, lon: -88.952, address: '2301 E Empire St, Bloomington, IL 61704', phone: '(309) 671-7350', type: 'clinic' },
  ],
  indiana: [
    // VA Medical Centers
    { name: 'Fort Wayne VA Medical Center', lat: 41.075, lon: -85.143, address: '2121 Lake Ave, Fort Wayne, IN 46805', phone: '(260) 426-5431', type: 'vamc' },
    { name: 'Indianapolis VA Medical Center (Richard L. Roudebush)', lat: 39.785, lon: -86.162, address: '1481 W 10th St, Indianapolis, IN 46202', phone: '(317) 554-0000', type: 'vamc' },
    { name: 'Marion VA Medical Center', lat: 40.558, lon: -85.659, address: '1700 E 38th St, Marion, IN 46953', phone: '(765) 674-3321', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Evansville VA Clinic', lat: 37.972, lon: -87.504, address: '500 S Green River Rd, Evansville, IN 47715', phone: '(812) 473-4493', type: 'clinic' },
    { name: 'South Bend VA Clinic', lat: 41.676, lon: -86.252, address: '709 W Michigan St, South Bend, IN 46601', phone: '(574) 299-4847', type: 'clinic' },
    { name: 'Terre Haute VA Clinic', lat: 39.466, lon: -87.414, address: '110 N 8th St, Terre Haute, IN 47807', phone: '(812) 238-6617', type: 'clinic' },
  ],
  ohio: [
    // VA Medical Centers
    { name: 'Chillicothe VA Medical Center', lat: 39.332, lon: -82.982, address: '17273 State Route 104, Chillicothe, OH 45601', phone: '(740) 773-1141', type: 'vamc' },
    { name: 'Cincinnati VA Medical Center', lat: 39.138, lon: -84.497, address: '3200 Vine St, Cincinnati, OH 45220', phone: '(513) 861-3100', type: 'vamc' },
    { name: 'Cleveland VA Medical Center (Louis Stokes)', lat: 41.503, lon: -81.612, address: '10701 East Blvd, Cleveland, OH 44106', phone: '(216) 791-3800', type: 'vamc' },
    { name: 'Columbus VA Medical Center (Chalmers P. Wylie)', lat: 40.0, lon: -82.993, address: '420 N James Rd, Columbus, OH 43219', phone: '(614) 257-5200', type: 'vamc' },
    { name: 'Dayton VA Medical Center', lat: 39.765, lon: -84.199, address: '4100 W Third St, Dayton, OH 45428', phone: '(937) 268-6511', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Toledo VA Clinic', lat: 41.66, lon: -83.558, address: '3333 Glendale Ave, Toledo, OH 43614', phone: '(419) 259-2000', type: 'clinic' },
    { name: 'Akron VA Clinic', lat: 41.035, lon: -81.519, address: '55 W Waterloo Rd, Akron, OH 44319', phone: '(330) 724-7715', type: 'clinic' },
    { name: 'Youngstown VA Clinic', lat: 41.098, lon: -80.649, address: '2031 Belmont Ave, Youngstown, OH 44505', phone: '(330) 740-9200', type: 'clinic' },
  ],
  pennsylvania: [
    // VA Medical Centers
    { name: 'Altoona VA Medical Center (James E. Van Zandt)', lat: 40.496, lon: -78.4, address: '2907 Pleasant Valley Blvd, Altoona, PA 16602', phone: '(877) 626-2500', type: 'vamc' },
    { name: 'Butler VA Medical Center', lat: 40.86, lon: -79.895, address: '325 New Castle Rd, Butler, PA 16001', phone: '(800) 362-8262', type: 'vamc' },
    { name: 'Coatesville VA Medical Center', lat: 39.98, lon: -75.823, address: '1400 Blackhorse Hill Rd, Coatesville, PA 19320', phone: '(610) 384-7711', type: 'vamc' },
    { name: 'Erie VA Medical Center', lat: 42.13, lon: -80.08, address: '135 E 38th St, Erie, PA 16504', phone: '(814) 868-8661', type: 'vamc' },
    { name: 'Lebanon VA Medical Center', lat: 40.333, lon: -76.411, address: '1700 S Lincoln Ave, Lebanon, PA 17042', phone: '(717) 272-6621', type: 'vamc' },
    { name: 'Philadelphia VA Medical Center (Corporal Michael J. Crescenz)', lat: 39.944, lon: -75.181, address: '3900 Woodland Ave, Philadelphia, PA 19104', phone: '(215) 823-5800', type: 'vamc' },
    { name: 'Pittsburgh VA Medical Center (H.J. Heinz III)', lat: 40.467, lon: -79.961, address: 'University Dr, Pittsburgh, PA 15240', phone: '(412) 688-6000', type: 'vamc' },
    { name: 'Wilkes-Barre VA Medical Center', lat: 41.226, lon: -75.883, address: '1111 E End Blvd, Wilkes-Barre, PA 18711', phone: '(570) 824-3521', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Camp Hill VA Clinic', lat: 40.237, lon: -76.918, address: '25 N 32nd St, Camp Hill, PA 17011', phone: '(717) 730-9782', type: 'clinic' },
    { name: 'Lancaster VA Clinic', lat: 40.037, lon: -76.306, address: '1861 Charter Lane, Lancaster, PA 17601', phone: '(717) 208-0218', type: 'clinic' },
    { name: 'Reading VA Clinic', lat: 40.336, lon: -75.928, address: '2400 Bernville Rd, Reading, PA 19605', phone: '(610) 208-4562', type: 'clinic' },
    { name: 'Tobyhanna VA Clinic', lat: 41.177, lon: -75.415, address: '3000 Gouldsboro Ave, Tobyhanna, PA 18466', phone: '(570) 894-5253', type: 'clinic' },
  ],
  'new-york': [
    // VA Medical Centers
    { name: 'Albany VA Medical Center (Samuel S. Stratton)', lat: 42.673, lon: -73.757, address: '113 Holland Ave, Albany, NY 12208', phone: '(518) 626-5000', type: 'vamc' },
    { name: 'Bath VA Medical Center', lat: 42.333, lon: -77.317, address: '76 Veterans Ave, Bath, NY 14810', phone: '(607) 664-4000', type: 'vamc' },
    { name: 'Brooklyn VA Medical Center', lat: 40.647, lon: -74.014, address: '800 Poly Place, Brooklyn, NY 11209', phone: '(718) 836-6600', type: 'vamc' },
    { name: 'Buffalo VA Medical Center', lat: 42.894, lon: -78.847, address: '3495 Bailey Ave, Buffalo, NY 14215', phone: '(716) 834-9200', type: 'vamc' },
    { name: 'Canandaigua VA Medical Center', lat: 42.905, lon: -77.292, address: '400 Fort Hill Ave, Canandaigua, NY 14424', phone: '(585) 394-2000', type: 'vamc' },
    { name: 'Castle Point VA Medical Center', lat: 41.555, lon: -73.956, address: '41 Castle Point Rd, Wappingers Falls, NY 12590', phone: '(845) 831-2000', type: 'vamc' },
    { name: 'Manhattan VA Medical Center', lat: 40.739, lon: -73.978, address: '423 E 23rd St, New York, NY 10010', phone: '(212) 686-7500', type: 'vamc' },
    { name: 'Montrose VA Medical Center', lat: 41.246, lon: -73.93, address: '2094 Albany Post Rd, Montrose, NY 10548', phone: '(914) 737-4400', type: 'vamc' },
    { name: 'Northport VA Medical Center', lat: 40.906, lon: -73.345, address: '79 Middleville Rd, Northport, NY 11768', phone: '(631) 261-4400', type: 'vamc' },
    { name: 'Syracuse VA Medical Center', lat: 43.032, lon: -76.134, address: '800 Irving Ave, Syracuse, NY 13210', phone: '(315) 425-4400', type: 'vamc' },
    { name: 'Bronx VA Medical Center', lat: 40.878, lon: -73.884, address: '130 W Kingsbridge Rd, Bronx, NY 10468', phone: '(718) 584-9000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Binghamton VA Clinic', lat: 42.099, lon: -75.917, address: '425 Robinson St, Binghamton, NY 13901', phone: '(607) 772-9100', type: 'clinic' },
    { name: 'Rochester VA Clinic', lat: 43.138, lon: -77.608, address: '465 Westfall Rd, Rochester, NY 14620', phone: '(585) 463-2600', type: 'clinic' },
  ],
  'new-jersey': [
    // VA Medical Centers
    { name: 'East Orange VA Medical Center', lat: 40.764, lon: -74.21, address: '385 Tremont Ave, East Orange, NJ 07018', phone: '(973) 676-1000', type: 'vamc' },
    { name: 'Lyons VA Medical Center', lat: 40.669, lon: -74.573, address: '151 Knollcroft Rd, Lyons, NJ 07939', phone: '(908) 647-0180', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Cape May VA Clinic', lat: 38.935, lon: -74.906, address: '105 N Main St, Cape May Court House, NJ 08210', phone: '(609) 465-6800', type: 'clinic' },
    { name: 'Toms River VA Clinic', lat: 39.953, lon: -74.198, address: '1 Conifer Dr, Toms River, NJ 08753', phone: '(732) 557-4100', type: 'clinic' },
    { name: 'Edison VA Clinic', lat: 40.517, lon: -74.412, address: '111 Fieldcrest Ave, Edison, NJ 08837', phone: '(732) 632-5000', type: 'clinic' },
    { name: 'Ventnor City VA Clinic', lat: 39.341, lon: -74.474, address: '6001 Atlantic Ave, Ventnor City, NJ 08406', phone: '(609) 822-0300', type: 'clinic' },
  ],
  delaware: [
    // VA Medical Centers
    { name: 'Wilmington VA Medical Center', lat: 39.74, lon: -75.545, address: '1601 Kirkwood Hwy, Wilmington, DE 19805', phone: '(302) 994-2511', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Dover VA Clinic', lat: 39.156, lon: -75.524, address: '1198 S College Ave, Dover, DE 19904', phone: '(302) 734-3300', type: 'clinic' },
    { name: 'Georgetown VA Clinic', lat: 38.69, lon: -75.386, address: '25526 N Dual Hwy, Georgetown, DE 19947', phone: '(302) 856-4516', type: 'clinic' },
  ],
  maryland: [
    // VA Medical Centers
    { name: 'Baltimore VA Medical Center', lat: 39.291, lon: -76.626, address: '10 N Greene St, Baltimore, MD 21201', phone: '(410) 605-7000', type: 'vamc' },
    { name: 'Perry Point VA Medical Center', lat: 39.563, lon: -76.075, address: 'Circle Dr, Perry Point, MD 21902', phone: '(410) 642-2411', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Loch Raven VA Clinic', lat: 39.371, lon: -76.579, address: '3900 Loch Raven Blvd, Baltimore, MD 21218', phone: '(410) 605-7650', type: 'clinic' },
    { name: 'Fort Howard VA Clinic', lat: 39.2, lon: -76.437, address: '9600 North Point Rd, Fort Howard, MD 21052', phone: '(410) 477-1800', type: 'clinic' },
    { name: 'Annapolis VA Clinic', lat: 38.978, lon: -76.493, address: '156 Maryland Ave, Annapolis, MD 21401', phone: '(410) 605-7400', type: 'clinic' },
    { name: 'Charlotte Hall VA Clinic', lat: 38.497, lon: -76.773, address: '29655 Charlotte Hall Rd, Charlotte Hall, MD 20622', phone: '(301) 884-7102', type: 'clinic' },
    { name: 'Hagerstown VA Clinic', lat: 39.641, lon: -77.72, address: '1101 Opal Ct, Hagerstown, MD 21740', phone: '(301) 665-1462', type: 'clinic' },
  ],
  'west-virginia': [
    // VA Medical Centers
    { name: 'Beckley VA Medical Center', lat: 37.778, lon: -81.188, address: '200 Veterans Ave, Beckley, WV 25801', phone: '(304) 255-2121', type: 'vamc' },
    { name: 'Clarksburg VA Medical Center (Louis A. Johnson)', lat: 39.28, lon: -80.345, address: '1 Medical Center Dr, Clarksburg, WV 26301', phone: '(304) 623-3461', type: 'vamc' },
    { name: 'Huntington VA Medical Center', lat: 38.399, lon: -82.435, address: '1540 Spring Valley Dr, Huntington, WV 25704', phone: '(304) 429-6741', type: 'vamc' },
    { name: 'Martinsburg VA Medical Center', lat: 39.454, lon: -77.973, address: '510 Butler Ave, Martinsburg, WV 25405', phone: '(304) 263-0811', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Charleston VA Clinic', lat: 38.349, lon: -81.633, address: '521 Central Ave, Charleston, WV 25302', phone: '(304) 343-3825', type: 'clinic' },
    { name: 'Parkersburg VA Clinic', lat: 39.267, lon: -81.561, address: '2311 Ohio Ave, Parkersburg, WV 26101', phone: '(304) 422-5114', type: 'clinic' },
    { name: 'Wheeling VA Clinic', lat: 40.064, lon: -80.721, address: '90 Main St, Wheeling, WV 26003', phone: '(304) 232-0587', type: 'clinic' },
  ],
  kentucky: [
    // VA Medical Centers
    { name: 'Lexington VA Medical Center', lat: 38.067, lon: -84.53, address: '1101 Veterans Dr, Lexington, KY 40502', phone: '(859) 233-4511', type: 'vamc' },
    { name: 'Louisville VA Medical Center (Robley Rex)', lat: 38.262, lon: -85.696, address: '800 Zorn Ave, Louisville, KY 40206', phone: '(502) 287-4000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Bowling Green VA Clinic', lat: 36.976, lon: -86.444, address: '1110 Wilkinson Trace, Bowling Green, KY 42103', phone: '(270) 796-3600', type: 'clinic' },
    { name: 'Hazard VA Clinic', lat: 37.249, lon: -83.193, address: '210 Black Gold Blvd, Hazard, KY 41701', phone: '(606) 435-0300', type: 'clinic' },
    { name: 'Prestonsburg VA Clinic', lat: 37.674, lon: -82.772, address: '6980 KY-302, Prestonsburg, KY 41653', phone: '(606) 886-1970', type: 'clinic' },
    { name: 'Paducah VA Clinic', lat: 37.083, lon: -88.597, address: '2620 Perkins Creek Dr, Paducah, KY 42001', phone: '(270) 444-8465', type: 'clinic' },
  ],
  alabama: [
    // VA Medical Centers
    { name: 'Birmingham VA Medical Center', lat: 33.506, lon: -86.799, address: '700 S 19th St, Birmingham, AL 35233', phone: '(205) 933-8101', type: 'vamc' },
    { name: 'Montgomery VA Medical Center (Central Alabama)', lat: 32.361, lon: -86.271, address: '215 Perry Hill Rd, Montgomery, AL 36109', phone: '(334) 272-4670', type: 'vamc' },
    { name: 'Tuscaloosa VA Medical Center', lat: 33.196, lon: -87.572, address: '3701 Loop Rd E, Tuscaloosa, AL 35404', phone: '(205) 554-2000', type: 'vamc' },
    { name: 'Tuskegee VA Medical Center', lat: 32.431, lon: -85.692, address: '2400 Hospital Rd, Tuskegee, AL 36083', phone: '(334) 727-0550', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Anniston VA Clinic', lat: 33.659, lon: -85.831, address: '1820 Coleman Rd, Anniston, AL 36207', phone: '(256) 236-4220', type: 'clinic' },
    { name: 'Dothan VA Clinic', lat: 31.221, lon: -85.396, address: '3082 Ross Clark Circle, Dothan, AL 36303', phone: '(334) 673-8100', type: 'clinic' },
    { name: 'Huntsville VA Clinic', lat: 34.729, lon: -86.586, address: '806 Governors Dr SW, Huntsville, AL 35801', phone: '(256) 535-3100', type: 'clinic' },
    { name: 'Mobile VA Clinic', lat: 30.694, lon: -88.042, address: '1504 Springhill Ave, Mobile, AL 36604', phone: '(251) 219-3900', type: 'clinic' },
  ],
  mississippi: [
    // VA Medical Centers
    { name: 'Biloxi VA Medical Center (Gulf Coast)', lat: 30.411, lon: -88.895, address: '400 Veterans Ave, Biloxi, MS 39531', phone: '(228) 523-5000', type: 'vamc' },
    { name: 'Jackson VA Medical Center (G.V. (Sonny) Montgomery)', lat: 32.338, lon: -90.178, address: '1500 E Woodrow Wilson Ave, Jackson, MS 39216', phone: '(601) 362-4471', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Oxford VA Clinic', lat: 34.366, lon: -89.528, address: '1002 Tyler Ave, Oxford, MS 38655', phone: '(662) 236-3636', type: 'clinic' },
    { name: 'Hattiesburg VA Clinic', lat: 31.327, lon: -89.29, address: '106 Security Blvd, Hattiesburg, MS 39402', phone: '(601) 579-2900', type: 'clinic' },
    { name: 'Tupelo VA Clinic', lat: 34.258, lon: -88.703, address: '1500 Martin Luther King Dr, Tupelo, MS 38804', phone: '(662) 680-7900', type: 'clinic' },
  ],
  louisiana: [
    // VA Medical Centers
    { name: 'Alexandria VA Medical Center', lat: 31.31, lon: -92.455, address: '2495 Shreveport Hwy, Pineville, LA 71360', phone: '(318) 473-0010', type: 'vamc' },
    { name: 'Overton Brooks VA Medical Center (Shreveport)', lat: 32.514, lon: -93.749, address: '510 E Stoner Ave, Shreveport, LA 71101', phone: '(318) 221-8411', type: 'vamc' },
    { name: 'Southeast Louisiana Veterans Health Care System (New Orleans)', lat: 29.967, lon: -90.099, address: '2400 Canal St, New Orleans, LA 70119', phone: '(504) 412-3700', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Baton Rouge VA Outpatient Clinic', lat: 30.451, lon: -91.18, address: '7200 Perkins Rd, Baton Rouge, LA 70808', phone: '(225) 761-3400', type: 'clinic' },
    { name: 'Lafayette VA Outpatient Clinic', lat: 30.224, lon: -92.02, address: '2121 Kaliste Saloom Rd, Lafayette, LA 70508', phone: '(337) 261-0734', type: 'clinic' },
    { name: 'Lake Charles VA Outpatient Clinic', lat: 30.213, lon: -93.219, address: '3206 E Broad St, Lake Charles, LA 70615', phone: '(337) 475-9000', type: 'clinic' },
  ],
  arkansas: [
    // VA Medical Centers
    { name: 'Fayetteville VA Medical Center', lat: 36.078, lon: -94.157, address: '1100 N College Ave, Fayetteville, AR 72703', phone: '(479) 443-4301', type: 'vamc' },
    { name: 'Little Rock VA Medical Center (John L. McClellan Memorial)', lat: 34.743, lon: -92.364, address: '4300 W 7th St, Little Rock, AR 72205', phone: '(501) 257-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Fort Smith VA Outpatient Clinic', lat: 35.359, lon: -94.393, address: '1901 S 56th St, Fort Smith, AR 72903', phone: '(479) 709-6800', type: 'clinic' },
    { name: 'Jonesboro VA Outpatient Clinic', lat: 35.842, lon: -90.704, address: '2600 Enterprise Ave, Jonesboro, AR 72401', phone: '(870) 932-6100', type: 'clinic' },
    { name: 'El Dorado VA Outpatient Clinic', lat: 33.208, lon: -92.666, address: '1504 S Lincoln Ave, El Dorado, AR 71730', phone: '(870) 875-5531', type: 'clinic' },
    { name: 'Hot Springs VA Outpatient Clinic', lat: 34.502, lon: -93.056, address: '157 Penny Dr, Hot Springs, AR 71913', phone: '(501) 624-7200', type: 'clinic' },
    { name: 'Texarkana VA Outpatient Clinic', lat: 33.425, lon: -94.047, address: '3310 Mall Dr, Texarkana, TX 75503', phone: '(903) 223-5200', type: 'clinic' },
    { name: 'Mountain Home VA Outpatient Clinic', lat: 36.335, lon: -92.384, address: '370 Burnett Dr, Mountain Home, AR 72653', phone: '(870) 424-4109', type: 'clinic' },
  ],
  'south-carolina': [
    // VA Medical Centers
    { name: 'Charleston VA Medical Center (Ralph H. Johnson)', lat: 32.789, lon: -79.956, address: '109 Bee St, Charleston, SC 29401', phone: '(843) 577-5011', type: 'vamc' },
    { name: 'Columbia VA Medical Center (Wm. Jennings Bryan Dorn)', lat: 33.972, lon: -81.004, address: '6439 Garners Ferry Rd, Columbia, SC 29209', phone: '(803) 776-4000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Greenville VA Clinic', lat: 34.852, lon: -82.399, address: '31 University Ridge, Greenville, SC 29601', phone: '(864) 299-1600', type: 'clinic' },
    { name: 'Florence VA Clinic', lat: 34.195, lon: -79.769, address: '1613 S Cashua Dr, Florence, SC 29501', phone: '(843) 292-8383', type: 'clinic' },
    { name: 'Myrtle Beach VA Clinic', lat: 33.713, lon: -78.879, address: '3381 Phillis Blvd, Myrtle Beach, SC 29577', phone: '(843) 477-0177', type: 'clinic' },
    { name: 'Beaufort VA Clinic', lat: 32.432, lon: -80.669, address: '1 Pinckney Blvd, Beaufort, SC 29902', phone: '(843) 770-0444', type: 'clinic' },
  ],
  maine: [
    // VA Medical Centers
    { name: 'Togus VA Medical Center', lat: 44.324, lon: -69.72, address: '1 VA Center, Augusta, ME 04330', phone: '(207) 623-8411', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Portland VA Clinic', lat: 43.661, lon: -70.255, address: '144 Fore St, Portland, ME 04101', phone: '(207) 771-3500', type: 'clinic' },
    { name: 'Bangor VA Clinic', lat: 44.801, lon: -68.777, address: '35 Hammond St, Bangor, ME 04401', phone: '(207) 561-3600', type: 'clinic' },
    { name: 'Saco VA Clinic', lat: 43.499, lon: -70.443, address: '655 Main St, Saco, ME 04072', phone: '(207) 294-3100', type: 'clinic' },
  ],
  vermont: [
    // VA Medical Centers
    { name: 'White River Junction VA Medical Center', lat: 43.647, lon: -72.319, address: '215 N Main St, White River Junction, VT 05009', phone: '(802) 295-9363', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Burlington VA Clinic', lat: 44.476, lon: -73.212, address: '128 Lakeside Ave, Burlington, VT 05401', phone: '(802) 657-7000', type: 'clinic' },
    { name: 'Rutland VA Clinic', lat: 43.611, lon: -72.973, address: '232 West St, Rutland, VT 05701', phone: '(802) 773-3386', type: 'clinic' },
  ],
  massachusetts: [
    // VA Medical Centers
    { name: 'Bedford VA Medical Center (Edith Nourse Rogers)', lat: 42.479, lon: -71.265, address: '200 Springs Rd, Bedford, MA 01730', phone: '(781) 687-2000', type: 'vamc' },
    { name: 'Boston VA Medical Center (Jamaica Plain)', lat: 42.318, lon: -71.112, address: '150 S Huntington Ave, Boston, MA 02130', phone: '(617) 232-9500', type: 'vamc' },
    { name: 'Boston VA Medical Center (West Roxbury)', lat: 42.291, lon: -71.158, address: '1400 VFW Pkwy, West Roxbury, MA 02132', phone: '(617) 323-7700', type: 'vamc' },
    { name: 'Brockton VA Medical Center', lat: 42.083, lon: -71.014, address: '940 Belmont St, Brockton, MA 02301', phone: '(508) 583-4500', type: 'vamc' },
    { name: 'Northampton VA Medical Center', lat: 42.33, lon: -72.64, address: '421 N Main St, Leeds, MA 01053', phone: '(413) 584-4040', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Worcester VA Clinic', lat: 42.275, lon: -71.804, address: '605 Lincoln St, Worcester, MA 01605', phone: '(508) 856-0104', type: 'clinic' },
    { name: 'Springfield VA Clinic', lat: 42.105, lon: -72.576, address: '25 Bond St, Springfield, MA 01104', phone: '(413) 731-6200', type: 'clinic' },
    { name: 'Hyannis VA Clinic', lat: 41.652, lon: -70.28, address: '233 Stevens St, Hyannis, MA 02601', phone: '(508) 771-3190', type: 'clinic' },
    { name: 'New Bedford VA Clinic', lat: 41.635, lon: -70.934, address: '174 Elm St, New Bedford, MA 02740', phone: '(508) 994-0217', type: 'clinic' },
    { name: 'Fitchburg VA Clinic', lat: 42.581, lon: -71.803, address: '73-75 Austin St, Fitchburg, MA 01420', phone: '(978) 342-9781', type: 'clinic' },
  ],
  connecticut: [
    // VA Medical Centers
    { name: 'West Haven VA Medical Center', lat: 41.284, lon: -72.958, address: '950 Campbell Ave, West Haven, CT 06516', phone: '(203) 932-5711', type: 'vamc' },
    { name: 'Newington VA Medical Center', lat: 41.697, lon: -72.729, address: '555 Willard Ave, Newington, CT 06111', phone: '(860) 666-6951', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Waterbury VA Clinic', lat: 41.558, lon: -73.051, address: '95 Scovill St, Waterbury, CT 06706', phone: '(203) 465-5292', type: 'clinic' },
    { name: 'Stamford VA Clinic', lat: 41.053, lon: -73.538, address: '281 Tresser Blvd, Stamford, CT 06901', phone: '(203) 325-0649', type: 'clinic' },
    { name: 'New London VA Clinic', lat: 41.356, lon: -72.1, address: '4 Shaw\'s Cove, New London, CT 06320', phone: '(860) 437-3611', type: 'clinic' },
    { name: 'Winsted VA Clinic', lat: 41.927, lon: -73.06, address: '115 Spencer St, Winsted, CT 06098', phone: '(860) 738-6985', type: 'clinic' },
  ],
  'rhode-island': [
    // VA Medical Centers
    { name: 'Providence VA Medical Center', lat: 41.83, lon: -71.413, address: '830 Chalkstone Ave, Providence, RI 02908', phone: '(401) 273-7100', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Lincoln VA Clinic', lat: 41.912, lon: -71.437, address: '51 Old River Rd, Lincoln, RI 02865', phone: '(401) 334-6930', type: 'clinic' },
    { name: 'Middletown VA Clinic', lat: 41.534, lon: -71.297, address: '10 Wampanoag Trail, Middletown, RI 02842', phone: '(401) 847-6239', type: 'clinic' },
  ],
  hawaii: [
    // VA Medical Centers
    { name: 'Honolulu VA Medical Center (Spark M. Matsunaga)', lat: 21.298, lon: -157.858, address: '459 Patterson Rd, Honolulu, HI 96819', phone: '(808) 433-0600', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Lihue VA Outpatient Clinic (Kauai)', lat: 21.978, lon: -159.37, address: '3-3367 Kuhio Hwy, Lihue, HI 96766', phone: '(808) 246-0497', type: 'clinic' },
    { name: 'Hilo VA Outpatient Clinic (Big Island)', lat: 19.704, lon: -155.084, address: '1285 Waianuenue Ave, Hilo, HI 96720', phone: '(808) 935-3781', type: 'clinic' },
    { name: 'Maui VA Outpatient Clinic', lat: 20.887, lon: -156.475, address: '203 Ho\'ohana St, Kahului, HI 96732', phone: '(808) 871-2454', type: 'clinic' },
  ],
  'north-dakota': [
    // VA Medical Centers
    { name: 'Fargo VA Medical Center', lat: 46.876, lon: -96.789, address: '2101 Elm St N, Fargo, ND 58102', phone: '(701) 232-3241', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Minot VA Clinic', lat: 48.231, lon: -101.299, address: '4 Jordan Dr, Minot, ND 58701', phone: '(701) 839-0088', type: 'clinic' },
    { name: 'Bismarck VA Clinic', lat: 46.808, lon: -100.787, address: '2700 State St, Bismarck, ND 58503', phone: '(701) 221-9152', type: 'clinic' },
    { name: 'Grand Forks VA Clinic', lat: 47.921, lon: -97.033, address: '3701 Cambridge St, Grand Forks, ND 58203', phone: '(701) 772-3719', type: 'clinic' },
  ],
};

/** FIPS code map — used to match us-atlas topojson features to our state IDs */
export const stateFipsMap: Record<string, string> = {
  alabama: '01',
  alaska: '02',
  arizona: '04',
  arkansas: '05',
  california: '06',
  colorado: '08',
  connecticut: '09',
  delaware: '10',
  florida: '12',
  georgia: '13',
  hawaii: '15',
  idaho: '16',
  illinois: '17',
  indiana: '18',
  iowa: '19',
  kansas: '20',
  kentucky: '21',
  louisiana: '22',
  maine: '23',
  maryland: '24',
  massachusetts: '25',
  michigan: '26',
  minnesota: '27',
  mississippi: '28',
  missouri: '29',
  montana: '30',
  nebraska: '31',
  nevada: '32',
  'new-hampshire': '33',
  'new-jersey': '34',
  'new-mexico': '35',
  'new-york': '36',
  'north-carolina': '37',
  'north-dakota': '38',
  ohio: '39',
  oklahoma: '40',
  oregon: '41',
  pennsylvania: '42',
  'rhode-island': '44',
  'south-carolina': '45',
  'south-dakota': '46',
  tennessee: '47',
  texas: '48',
  utah: '49',
  vermont: '50',
  virginia: '51',
  washington: '53',
  'west-virginia': '54',
  wisconsin: '55',
  wyoming: '56',
};
