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
    { name: 'Bay Pines VA Medical Center', lat: 27.809065, lon: -82.778390, address: '10000 Bay Pines Blvd, Bay Pines, FL 33744', phone: '(727) 398-6661', type: 'vamc' },
    { name: 'Gainesville VA Medical Center (Malcom Randall)', lat: 29.637035, lon: -82.345780, address: '1601 SW Archer Rd, Gainesville, FL 32608', phone: '(352) 376-1611', type: 'vamc' },
    { name: 'Lake City VA Medical Center', lat: 30.181257, lon: -82.635254, address: '619 S Marion Ave, Lake City, FL 32025', phone: '(386) 755-3016', type: 'vamc' },
    { name: 'Miami VA Medical Center (Bruce W. Carter)', lat: 25.792363, lon: -80.217154, address: '1201 NW 16th St, Miami, FL 33125', phone: '(305) 575-7000', type: 'vamc' },
    { name: 'Orlando VA Medical Center', lat: 28.364807, lon: -81.274743, address: '13800 Veterans Way, Orlando, FL 32827', phone: '(407) 631-1000', type: 'vamc' },
    { name: 'Tampa VA Medical Center (James A. Haley)', lat: 28.064038, lon: -82.428754, address: '13000 Bruce B Downs Blvd, Tampa, FL 33612', phone: '(813) 972-2000', type: 'vamc' },
    { name: 'West Palm Beach VA Medical Center', lat: 26.785068, lon: -80.108630, address: '7305 N Military Trail, West Palm Beach, FL 33410', phone: '(561) 422-8262', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Jacksonville VA Clinic', lat: 30.346818, lon: -81.661087, address: '1833 Boulevard, Jacksonville, FL 32206', phone: '(904) 475-2000', type: 'clinic' },
    { name: 'Pensacola VA Clinic', lat: 30.401454, lon: -87.293338, address: '790 Veterans Way, Pensacola, FL 32507', phone: '(850) 912-2000', type: 'clinic' },
    { name: 'Daytona Beach VA Clinic', lat: 29.211, lon: -81.029, address: '551 N Beville Ave, Daytona Beach, FL 32114', phone: '(386) 323-7500', type: 'clinic' },
    { name: 'Fort Lauderdale VA Clinic', lat: 26.193572, lon: -80.279094, address: '9800 W Commercial Blvd, Sunrise, FL 33351', phone: '(954) 475-4800', type: 'clinic' },
    { name: 'Fort Myers VA Clinic', lat: 26.683298, lon: -81.920154, address: '2489 Diplomat Pkwy E, Cape Coral, FL 33909', phone: '(239) 652-1500', type: 'clinic' },
    { name: 'Tallahassee VA Clinic', lat: 30.457032, lon: -84.240064, address: '1607 St James Court, Tallahassee, FL 32308', phone: '(850) 878-0191', type: 'clinic' },
    { name: 'Ocala VA Clinic', lat: 29.187113, lon: -82.118737, address: '1515 E Silver Springs Blvd, Ocala, FL 34470', phone: '(352) 369-3320', type: 'clinic' },
  ],
  texas: [
    // VA Medical Centers
    {
      name: 'Amarillo VA Medical Center',
      lat: 35.203752,
      lon: -101.907127,
      address: '6010 Amarillo Blvd W, Amarillo, TX 79106',
      phone: '(806) 355-9703',
      type: 'vamc',
    },
    {
      name: 'Big Spring VA Medical Center',
      lat: 32.231054,
      lon: -101.473487,
      address: '300 Veterans Blvd, Big Spring, TX 79720',
      phone: '(432) 263-7361',
      type: 'vamc',
    },
    {
      name: 'Dallas VA Medical Center',
      lat: 32.695500,
      lon: -96.787072,
      address: '4500 S Lancaster Rd, Dallas, TX 75216',
      phone: '(214) 742-8387',
      type: 'vamc',
    },
    {
      name: 'El Paso VA Medical Center',
      lat: 31.820776,
      lon: -106.462234,
      address: '5001 N Piedras St, El Paso, TX 79930',
      phone: '(915) 564-6100',
      type: 'vamc',
    },
    {
      name: 'Houston VA Medical Center (Michael E. DeBakey)',
      lat: 29.701872,
      lon: -95.388855,
      address: '2002 Holcombe Blvd, Houston, TX 77030',
      phone: '(713) 791-1414',
      type: 'vamc',
    },
    {
      name: 'Kerrville VA Medical Center',
      lat: 30.016599,
      lon: -99.114245,
      address: '3600 Memorial Blvd, Kerrville, TX 78028',
      phone: '(830) 896-2020',
      type: 'vamc',
    },
    {
      name: 'Marlin VA Medical Center',
      lat: 31.317267,
      lon: -96.897838,
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
      lat: 31.077044,
      lon: -97.345722,
      address: '1901 Veterans Memorial Dr, Temple, TX 76504',
      phone: '(254) 778-4811',
      type: 'vamc',
    },
    {
      name: 'Waco VA Medical Center',
      lat: 31.513953,
      lon: -97.162429,
      address: '4800 Memorial Dr, Waco, TX 76711',
      phone: '(254) 752-6581',
      type: 'vamc',
    },
    // Community-Based Outpatient Clinics (CBOCs)
    {
      name: 'Austin VA Clinic',
      lat: 30.205601,
      lon: -97.690561,
      address: '7901 Metropolis Dr, Austin, TX 78744',
      phone: '(512) 823-4000',
      type: 'clinic',
    },
    {
      name: 'Beaumont VA Clinic',
      lat: 30.077829,
      lon: -94.138975,
      address: '3420 Veterans Circle, Beaumont, TX 77707',
      phone: '(409) 981-8550',
      type: 'clinic',
    },
    {
      name: 'Corpus Christi VA Clinic',
      lat: 27.758546,
      lon: -97.456021,
      address: '5283 Old Brownsville Rd, Corpus Christi, TX 78405',
      phone: '(361) 806-6900',
      type: 'clinic',
    },
    {
      name: 'Fort Worth VA Clinic',
      lat: 32.669597,
      lon: -97.298950,
      address: '2201 SE Loop 820, Fort Worth, TX 76119',
      phone: '(817) 730-0000',
      type: 'clinic',
    },
    {
      name: 'Harlingen VA Clinic',
      lat: 26.170977,
      lon: -97.667394,
      address: '2601 Veterans Dr, Harlingen, TX 78550',
      phone: '(956) 291-9000',
      type: 'clinic',
    },
    {
      name: 'Laredo VA Clinic',
      lat: 27.538706,
      lon: -99.503317,
      address: '4702 Santa Ursula Ave, Laredo, TX 78041',
      phone: '(956) 523-7850',
      type: 'clinic',
    },
    {
      name: 'Lubbock VA Clinic',
      lat: 33.537994,
      lon: -101.854363,
      address: '6104 Ave Q, Lubbock, TX 79412',
      phone: '(806) 472-3400',
      type: 'clinic',
    },
    {
      name: 'Lufkin VA Clinic',
      lat: 31.336757,
      lon: -94.743962,
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
      lat: 32.037574,
      lon: -102.112699,
      address: '4500 N Garfield St, Midland, TX 79705',
      phone: '(432) 697-8324',
      type: 'clinic',
    },
    {
      name: 'Palestine VA Clinic',
      lat: 31.733239,
      lon: -95.624503,
      address: '2000 S Loop 256, Palestine, TX 75801',
      phone: '(903) 729-4565',
      type: 'clinic',
    },
    {
      name: 'San Antonio Westover Hills VA Clinic',
      lat: 29.517913,
      lon: -98.427429,
      address: '9800 Village Dr, San Antonio, TX 78251',
      phone: '(210) 581-8000',
      type: 'clinic',
    },
    {
      name: 'Texarkana VA Clinic',
      lat: 33.429454,
      lon: -94.043381,
      address: '819 State Line Ave, Texarkana, TX 75501',
      phone: '(903) 255-2600',
      type: 'clinic',
    },
    {
      name: 'Tyler VA Clinic',
      lat: 32.2492004,
      lon: -95.3007343,
      address: '428 Centennial Pkwy, Tyler, TX 75703',
      phone: '(903) 266-5900',
      type: 'clinic',
    },
    {
      name: 'Victoria VA Clinic',
      lat: 28.821229,
      lon: -96.992088,
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
    { name: 'Hampton VA Medical Center', lat: 37.016973, lon: -76.332108, address: '100 Emancipation Dr, Hampton, VA 23667', phone: '(757) 722-9961', type: 'vamc' },
    { name: 'Richmond VA Medical Center (McGuire)', lat: 37.496345, lon: -77.465643, address: '1201 Broad Rock Blvd, Richmond, VA 23249', phone: '(804) 675-5000', type: 'vamc' },
    { name: 'Salem VA Medical Center', lat: 37.274709, lon: -80.020209, address: '1970 Roanoke Blvd, Salem, VA 24153', phone: '(540) 982-2463', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Norfolk VA Clinic', lat: 36.875216, lon: -76.214124, address: '4101 E Princess Anne Rd, Norfolk, VA 23502', phone: '(757) 623-2667', type: 'clinic' },
    { name: 'Charlottesville VA Clinic', lat: 38.020958, lon: -78.441417, address: '590 Peter Jefferson Pkwy, Charlottesville, VA 22911', phone: '(434) 293-3890', type: 'clinic' },
    { name: 'Fredericksburg VA Clinic', lat: 38.312139, lon: -77.477998, address: '130 Executive Center Pkwy, Fredericksburg, VA 22401', phone: '(540) 370-4944', type: 'clinic' },
    { name: 'Virginia Beach VA Clinic', lat: 36.845839, lon: -76.164942, address: '244 Clearfield Ave, Virginia Beach, VA 23462', phone: '(757) 722-9961', type: 'clinic' },
    { name: 'Winchester VA Clinic', lat: 39.183573, lon: -78.172741, address: '1000 N Cork St, Winchester, VA 22601', phone: '(540) 542-4000', type: 'clinic' },
  ],
  tennessee: [
    // VA Medical Centers
    { name: 'Memphis VA Medical Center', lat: 35.142497, lon: -90.024793, address: '1030 Jefferson Ave, Memphis, TN 38104', phone: '(901) 523-8990', type: 'vamc' },
    { name: 'Mountain Home VA Medical Center (James H. Quillen)', lat: 36.31, lon: -82.374, address: 'Veterans Way, Mountain Home, TN 37684', phone: '(423) 926-1171', type: 'vamc' },
    { name: 'Murfreesboro VA Medical Center', lat: 35.913953, lon: -86.379436, address: '3400 Lebanon Pike, Murfreesboro, TN 37129', phone: '(615) 867-6000', type: 'vamc' },
    { name: 'Nashville VA Medical Center (Tennessee Valley)', lat: 36.142778, lon: -86.804854, address: '1310 24th Ave S, Nashville, TN 37212', phone: '(615) 327-4751', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Chattanooga VA Clinic', lat: 35.046663, lon: -85.287811, address: '1108 E 3rd St, Chattanooga, TN 37403', phone: '(423) 893-6500', type: 'clinic' },
    { name: 'Knoxville VA Clinic', lat: 35.922301, lon: -84.086307, address: '9317 Cross Park Dr, Knoxville, TN 37923', phone: '(865) 545-4592', type: 'clinic' },
    { name: 'Jackson VA Clinic', lat: 35.615, lon: -88.814, address: '273 Lake Rd, Jackson, TN 38301', phone: '(731) 660-0605', type: 'clinic' },
    { name: 'Cookeville VA Clinic', lat: 36.145030, lon: -85.522684, address: '851 S Willow Ave, Cookeville, TN 38501', phone: '(931) 646-1123', type: 'clinic' },
  ],
  nevada: [
    // VA Medical Centers
    { name: 'Las Vegas VA Medical Center (VA Southern Nevada)', lat: 36.285310, lon: -115.094037, address: '6900 N Pecos Rd, North Las Vegas, NV 89086', phone: '(702) 791-9000', type: 'vamc' },
    { name: 'Reno VA Medical Center (Sierra Nevada)', lat: 39.516233, lon: -119.798272, address: '975 Kirman Ave, Reno, NV 89502', phone: '(775) 786-7200', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Henderson VA Outpatient Clinic', lat: 36.076241, lon: -115.081015, address: '2920 N Green Valley Pkwy, Henderson, NV 89014', phone: '(702) 791-9000', type: 'clinic' },
    { name: 'Pahrump VA Outpatient Clinic', lat: 36.208, lon: -115.984, address: '2100 E Calvada Blvd, Pahrump, NV 89048', phone: '(775) 751-2053', type: 'clinic' },
  ],
  washington: [
    // VA Medical Centers
    { name: 'American Lake VA Medical Center (Tacoma)', lat: 47.135050, lon: -122.575309, address: '9600 Veterans Dr SW, Tacoma, WA 98493', phone: '(253) 582-8440', type: 'vamc' },
    { name: 'Seattle VA Medical Center (VA Puget Sound)', lat: 47.563082, lon: -122.306893, address: '1660 S Columbian Way, Seattle, WA 98108', phone: '(206) 762-1010', type: 'vamc' },
    { name: 'Spokane VA Medical Center (Mann-Grandstaff)', lat: 47.703514, lon: -117.478057, address: '4815 N Assembly St, Spokane, WA 99205', phone: '(509) 434-7000', type: 'vamc' },
    { name: 'Walla Walla VA Medical Center (Jonathan M. Wainwright)', lat: 46.053864, lon: -118.355609, address: '77 Wainwright Dr, Walla Walla, WA 99362', phone: '(509) 525-5200', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Vancouver VA Outpatient Clinic', lat: 45.639, lon: -122.671, address: '1601 E 4th Plain Blvd, Vancouver, WA 98661', phone: '(360) 696-4061', type: 'clinic' },
    { name: 'Kennewick VA Outpatient Clinic', lat: 46.203223, lon: -119.158704, address: '615 S Ely St, Kennewick, WA 99336', phone: '(509) 783-1111', type: 'clinic' },
  ],
  alaska: [
    // VA Medical Centers
    { name: 'Anchorage VA Medical Center', lat: 61.232771, lon: -149.744210, address: '1201 N Muldoon Rd, Anchorage, AK 99504', phone: '(907) 257-4700', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Fairbanks VA Outpatient Clinic', lat: 64.841855, lon: -147.715152, address: '540 Noble St, Fairbanks, AK 99701', phone: '(907) 456-4218', type: 'clinic' },
  ],
  wyoming: [
    // VA Medical Centers
    { name: 'Cheyenne VA Medical Center', lat: 41.147696, lon: -104.786089, address: '2360 E Pershing Blvd, Cheyenne, WY 82001', phone: '(307) 778-7550', type: 'vamc' },
    { name: 'Sheridan VA Medical Center', lat: 44.828871, lon: -106.983393, address: '1898 Fort Rd, Sheridan, WY 82801', phone: '(307) 672-3473', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Casper VA Outpatient Clinic', lat: 42.854, lon: -106.313, address: '2620 C.Y. Ave, Casper, WY 82604', phone: '(307) 232-0007', type: 'clinic' },
    { name: 'Gillette VA Outpatient Clinic', lat: 44.241000, lon: -105.466606, address: '1816 S Douglas Hwy, Gillette, WY 82718', phone: '(307) 685-0676', type: 'clinic' },
  ],
  'south-dakota': [
    // VA Medical Centers
    { name: 'Fort Meade VA Medical Center', lat: 44.412414, lon: -103.471172, address: '113 Comanche Rd, Fort Meade, SD 57741', phone: '(605) 347-2511', type: 'vamc' },
    { name: 'Sioux Falls VA Medical Center (Royal C. Johnson)', lat: 43.531036, lon: -96.755536, address: '2501 W 22nd St, Sioux Falls, SD 57105', phone: '(605) 336-3230', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Rapid City VA Clinic', lat: 44.049939, lon: -103.224152, address: '3625 5th St, Rapid City, SD 57701', phone: '(605) 718-1095', type: 'clinic' },
    { name: 'Aberdeen VA Clinic', lat: 45.462068, lon: -98.447457, address: '2900 3rd Ave SE, Aberdeen, SD 57401', phone: '(605) 622-2640', type: 'clinic' },
    { name: 'Hot Springs VA Medical Center', lat: 43.437028, lon: -103.476661, address: '500 N 5th St, Hot Springs, SD 57747', phone: '(605) 745-2000', type: 'clinic' },
  ],
  'new-hampshire': [
    // VA Medical Centers
    { name: 'Manchester VA Medical Center', lat: 43.012545, lon: -71.440755, address: '718 Smyth Rd, Manchester, NH 03104', phone: '(603) 624-4366', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Conway VA Clinic', lat: 43.975107, lon: -71.129677, address: '71 Hobbs St, Conway, NH 03818', phone: '(603) 624-4366', type: 'clinic' },
    { name: 'Portsmouth VA Clinic', lat: 43.087361, lon: -70.816466, address: '302 Newmarket St, Portsmouth, NH 03801', phone: '(603) 624-4366', type: 'clinic' },
    { name: 'Tilton VA Clinic', lat: 43.446174, lon: -71.618933, address: '630 Main St, Tilton, NH 03276', phone: '(603) 624-4366', type: 'clinic' },
  ],
  'north-carolina': [
    // VA Medical Centers
    { name: 'Asheville VA Medical Center (Charles George)', lat: 35.589886, lon: -82.484107, address: '1100 Tunnel Rd, Asheville, NC 28805', phone: '(828) 298-7911', type: 'vamc' },
    { name: 'Durham VA Medical Center', lat: 36.009346, lon: -78.937235, address: '508 Fulton St, Durham, NC 27705', phone: '(919) 286-0411', type: 'vamc' },
    { name: 'Fayetteville VA Medical Center', lat: 35.087973, lon: -78.876486, address: '2300 Ramsey St, Fayetteville, NC 28301', phone: '(910) 488-2120', type: 'vamc' },
    { name: 'Salisbury VA Medical Center (W.G. Hefner)', lat: 35.684570, lon: -80.490753, address: '1601 Brenner Ave, Salisbury, NC 28144', phone: '(704) 638-9000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Charlotte VA Clinic', lat: 35.283889, lon: -80.731611, address: '8601 University East Dr, Charlotte, NC 28213', phone: '(704) 597-3500', type: 'clinic' },
    { name: 'Greensboro VA Clinic', lat: 36.073823, lon: -79.812600, address: '1515 W Market St, Greensboro, NC 27403', phone: '(336) 333-6130', type: 'clinic' },
    { name: 'Wilmington VA Clinic', lat: 34.226, lon: -77.945, address: '1705 Gardner Dr, Wilmington, NC 28405', phone: '(910) 343-7400', type: 'clinic' },
    { name: 'Jacksonville VA Clinic', lat: 34.754, lon: -77.43, address: '4247 W Corbett Ave, Jacksonville, NC 28540', phone: '(910) 353-6406', type: 'clinic' },
    { name: 'Raleigh VA Clinic', lat: 35.776983, lon: -78.581610, address: '3305 Sungate Blvd, Raleigh, NC 27610', phone: '(919) 212-0129', type: 'clinic' },
  ],
  georgia: [
    // VA Medical Centers
    { name: 'Atlanta VA Medical Center (Joseph Maxwell Cleland)', lat: 33.801804, lon: -84.311700, address: '1670 Clairmont Rd, Decatur, GA 30033', phone: '(404) 321-6111', type: 'vamc' },
    { name: 'Augusta VA Medical Center (Charlie Norwood)', lat: 33.464437, lon: -82.027358, address: '1 Freedom Way, Augusta, GA 30904', phone: '(706) 733-0188', type: 'vamc' },
    { name: 'Dublin VA Medical Center (Carl Vinson)', lat: 32.536462, lon: -82.944787, address: '1826 Veterans Blvd, Dublin, GA 31021', phone: '(478) 272-1210', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Savannah VA Clinic', lat: 32.001139, lon: -81.135099, address: '325 W Montgomery Cross Rd, Savannah, GA 31406', phone: '(912) 920-0214', type: 'clinic' },
    { name: 'Columbus VA Clinic', lat: 32.470594, lon: -84.974090, address: '1310 13th St, Columbus, GA 31901', phone: '(706) 257-7200', type: 'clinic' },
    { name: 'Macon VA Clinic', lat: 32.842056, lon: -83.686624, address: '3460 Log Cabin Dr, Macon, GA 31204', phone: '(478) 476-6170', type: 'clinic' },
    { name: 'Rome VA Clinic', lat: 34.250347, lon: -85.171942, address: '315 E 2nd Ave, Rome, GA 30161', phone: '(706) 235-6581', type: 'clinic' },
  ],
  california: [
    // VA Medical Centers
    { name: 'Fresno VA Medical Center', lat: 36.773207, lon: -119.779288, address: '2615 E Clinton Ave, Fresno, CA 93703', phone: '(559) 225-6100', type: 'vamc' },
    { name: 'Loma Linda VA Medical Center (Jerry L. Pettis)', lat: 34.050230, lon: -117.250192, address: '11201 Benton St, Loma Linda, CA 92357', phone: '(909) 825-7084', type: 'vamc' },
    { name: 'Long Beach VA Medical Center', lat: 33.777176, lon: -118.118231, address: '5901 E 7th St, Long Beach, CA 90822', phone: '(562) 826-8000', type: 'vamc' },
    { name: 'West Los Angeles VA Medical Center', lat: 34.065038, lon: -118.464427, address: '11301 Wilshire Blvd, Los Angeles, CA 90073', phone: '(310) 478-3711', type: 'vamc' },
    { name: 'Palo Alto VA Medical Center', lat: 37.405554, lon: -122.140820, address: '3801 Miranda Ave, Palo Alto, CA 94304', phone: '(650) 493-5000', type: 'vamc' },
    { name: 'Sacramento VA Medical Center (Mather)', lat: 38.572120, lon: -121.296867, address: '10535 Hospital Way, Mather, CA 95655', phone: '(916) 843-7000', type: 'vamc' },
    { name: 'San Diego VA Medical Center', lat: 32.874812, lon: -117.232998, address: '3350 La Jolla Village Dr, San Diego, CA 92161', phone: '(858) 552-8585', type: 'vamc' },
    { name: 'San Francisco VA Medical Center', lat: 37.782422, lon: -122.505409, address: '4150 Clement St, San Francisco, CA 94121', phone: '(415) 221-4810', type: 'vamc' },
    { name: 'Livermore VA Medical Center', lat: 37.625461, lon: -121.764970, address: '4951 Arroyo Rd, Livermore, CA 94550', phone: '(925) 373-4700', type: 'vamc' },
    { name: 'Martinez VA Medical Center', lat: 37.993926, lon: -122.115331, address: '150 Muir Rd, Martinez, CA 94553', phone: '(925) 372-2000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Sepulveda VA Ambulatory Care Center', lat: 34.246873, lon: -118.478274, address: '16111 Plummer St, North Hills, CA 91343', phone: '(818) 891-7711', type: 'clinic' },
    { name: 'San Jose VA Outpatient Clinic', lat: 37.234258, lon: -121.777259, address: '80 Great Oaks Blvd, San Jose, CA 95119', phone: '(408) 363-3011', type: 'clinic' },
    { name: 'Monterey VA Outpatient Clinic', lat: 36.650480, lon: -121.802440, address: '3401 Engineer Ln, Seaside, CA 93955', phone: '(831) 883-3800', type: 'clinic' },
    { name: 'Oxnard VA Outpatient Clinic', lat: 34.221038, lon: -119.146796, address: '2000 Outlet Center Dr, Oxnard, CA 93036', phone: '(805) 983-3845', type: 'clinic' },
  ],
  arizona: [
    // VA Medical Centers
    { name: 'Phoenix VA Medical Center (Carl T. Hayden)', lat: 33.497542, lon: -112.066864, address: '650 E Indian School Rd, Phoenix, AZ 85012', phone: '(602) 277-5551', type: 'vamc' },
    { name: 'Prescott VA Medical Center', lat: 34.551, lon: -112.469, address: '500 AZ-89 N, Prescott, AZ 86313', phone: '(928) 445-4860', type: 'vamc' },
    { name: 'Tucson VA Medical Center (Southern Arizona)', lat: 32.181449, lon: -110.964797, address: '3601 S 6th Ave, Tucson, AZ 85723', phone: '(520) 792-1450', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Flagstaff VA Outpatient Clinic', lat: 35.198592, lon: -111.644046, address: '1851 Elden St, Flagstaff, AZ 86004', phone: '(928) 213-3000', type: 'clinic' },
    { name: 'Sun City VA Outpatient Clinic', lat: 33.602449, lon: -112.281270, address: '13611 N 103rd Ave, Sun City, AZ 85351', phone: '(623) 214-4200', type: 'clinic' },
    { name: 'Mesa VA Outpatient Clinic', lat: 33.308311, lon: -111.682018, address: '6950 E Williams Field Rd, Mesa, AZ 85212', phone: '(480) 832-7100', type: 'clinic' },
    { name: 'Tucson South VA Outpatient Clinic', lat: 32.221571, lon: -110.935582, address: '2475 E Broadway Blvd, Tucson, AZ 85716', phone: '(520) 629-4600', type: 'clinic' },
  ],
  colorado: [
    // VA Medical Centers
    { name: 'Rocky Mountain Regional VA Medical Center (Aurora)', lat: 39.744578, lon: -104.830875, address: '1700 N Wheeling St, Aurora, CO 80045', phone: '(720) 723-7000', type: 'vamc' },
    { name: 'Eastern Colorado VA Medical Center (Denver)', lat: 39.732552, lon: -104.935172, address: '1055 Clermont St, Denver, CO 80220', phone: '(303) 399-8020', type: 'vamc' },
    { name: 'Grand Junction VA Medical Center', lat: 39.075671, lon: -108.541485, address: '2121 North Ave, Grand Junction, CO 81501', phone: '(970) 242-0731', type: 'vamc' },
    { name: 'Pueblo VA Medical Center (Southern Colorado)', lat: 38.299564, lon: -104.635081, address: '3001 Baltimore Ave, Pueblo, CO 81003', phone: '(719) 553-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Colorado Springs VA Outpatient Clinic', lat: 38.857026, lon: -104.757476, address: '1785 N Academy Blvd, Colorado Springs, CO 80909', phone: '(719) 327-5660', type: 'clinic' },
    { name: 'Fort Collins VA Outpatient Clinic', lat: 40.553735, lon: -105.087849, address: '2509 Research Blvd, Fort Collins, CO 80526', phone: '(970) 224-1550', type: 'clinic' },
  ],
  oregon: [
    // VA Medical Centers
    { name: 'Portland VA Medical Center', lat: 45.496, lon: -122.682, address: '3710 SW US Veterans Hospital Rd, Portland, OR 97239', phone: '(503) 220-8262', type: 'vamc' },
    { name: 'Roseburg VA Medical Center', lat: 43.224798, lon: -123.367563, address: '913 NW Garden Valley Blvd, Roseburg, OR 97471', phone: '(541) 440-1000', type: 'vamc' },
    { name: 'White City VA Medical Center (Southern Oregon Rehab)', lat: 42.441604, lon: -122.838711, address: '8495 Crater Lake Hwy, White City, OR 97503', phone: '(541) 826-2111', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Eugene VA Outpatient Clinic', lat: 44.088287, lon: -123.052531, address: '3355 Chad Dr, Eugene, OR 97408', phone: '(541) 465-6918', type: 'clinic' },
    { name: 'Salem VA Outpatient Clinic', lat: 44.929972, lon: -123.023414, address: '1660 Oak St SE, Salem, OR 97301', phone: '(503) 362-9911', type: 'clinic' },
  ],
  idaho: [
    // VA Medical Centers
    { name: 'Boise VA Medical Center', lat: 43.620845, lon: -116.190599, address: '500 W Fort St, Boise, ID 83702', phone: '(208) 422-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Pocatello VA Outpatient Clinic', lat: 42.870414, lon: -112.417189, address: '444 Hospital Way, Pocatello, ID 83201', phone: '(208) 232-6214', type: 'clinic' },
    { name: 'Twin Falls VA Outpatient Clinic', lat: 42.561, lon: -114.46, address: '260 Second Ave E, Twin Falls, ID 83301', phone: '(208) 732-0584', type: 'clinic' },
    { name: 'Nampa VA Outpatient Clinic', lat: 43.565, lon: -116.559, address: '2725 E Deer Flat Rd, Nampa, ID 83687', phone: '(208) 463-9471', type: 'clinic' },
  ],
  montana: [
    // VA Medical Centers
    { name: 'Fort Harrison VA Medical Center (Montana)', lat: 46.618708, lon: -112.102290, address: '3687 Veterans Dr, Fort Harrison, MT 59636', phone: '(406) 442-6410', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Billings VA Outpatient Clinic', lat: 45.755109, lon: -108.575302, address: '2345 King Ave W, Billings, MT 59102', phone: '(406) 373-3600', type: 'clinic' },
    { name: 'Missoula VA Outpatient Clinic', lat: 46.882, lon: -114.016, address: '3770 Brook St, Missoula, MT 59801', phone: '(406) 327-1450', type: 'clinic' },
    { name: 'Great Falls VA Outpatient Clinic', lat: 47.504, lon: -111.301, address: '621 Grand Blvd, Great Falls, MT 59405', phone: '(406) 761-5900', type: 'clinic' },
    { name: 'Miles City VA Outpatient Clinic', lat: 46.406200, lon: -105.828697, address: '210 S Winchester Ave, Miles City, MT 59301', phone: '(406) 874-5600', type: 'clinic' },
  ],
  utah: [
    // VA Medical Centers
    { name: 'Salt Lake City VA Medical Center (George E. Wahlen)', lat: 40.755565, lon: -111.838682, address: '500 Foothill Dr, Salt Lake City, UT 84148', phone: '(801) 582-1565', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Ogden VA Outpatient Clinic', lat: 41.167396, lon: -111.959851, address: '930 W Chambers St, Ogden, UT 84404', phone: '(801) 479-4105', type: 'clinic' },
    { name: 'Provo VA Outpatient Clinic', lat: 40.233, lon: -111.658, address: '1506 N Technology Ave, Provo, UT 84606', phone: '(801) 377-8898', type: 'clinic' },
    { name: 'St. George VA Outpatient Clinic', lat: 37.108212, lon: -113.586729, address: '1067 E Tabernacle St, St. George, UT 84770', phone: '(435) 634-7608', type: 'clinic' },
  ],
  'new-mexico': [
    // VA Medical Centers
    { name: 'Albuquerque VA Medical Center (Raymond G. Murphy)', lat: 35.053963, lon: -106.577780, address: '1501 San Pedro Dr SE, Albuquerque, NM 87108', phone: '(505) 265-1711', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Santa Fe VA Outpatient Clinic', lat: 35.619867, lon: -106.013780, address: '2695 Beckner Rd, Santa Fe, NM 87507', phone: '(505) 466-7900', type: 'clinic' },
    { name: 'Gallup VA Outpatient Clinic', lat: 35.528, lon: -108.742, address: '1400 Mike Wardell Blvd, Gallup, NM 87301', phone: '(505) 722-7234', type: 'clinic' },
    { name: 'Farmington VA Outpatient Clinic', lat: 36.748329, lon: -108.185052, address: '1760 E 20th St, Farmington, NM 87401', phone: '(505) 326-0366', type: 'clinic' },
  ],
  oklahoma: [
    // VA Medical Centers
    { name: 'Jack C. Montgomery VA Medical Center (Muskogee)', lat: 35.765589, lon: -95.414183, address: '1011 Honor Heights Dr, Muskogee, OK 74401', phone: '(918) 577-3000', type: 'vamc' },
    { name: 'Oklahoma City VA Medical Center', lat: 35.482248, lon: -97.501576, address: '921 NE 13th St, Oklahoma City, OK 73104', phone: '(405) 456-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Tulsa VA Outpatient Clinic', lat: 36.104381, lon: -95.910936, address: '9322 E 41st St, Tulsa, OK 74145', phone: '(918) 628-2500', type: 'clinic' },
    { name: 'Lawton VA Outpatient Clinic', lat: 34.589530, lon: -98.404704, address: '4 SE 11th St, Lawton, OK 73501', phone: '(580) 585-5100', type: 'clinic' },
    { name: 'Enid VA Outpatient Clinic', lat: 36.396, lon: -97.879, address: '104 S Nashville Ave, Enid, OK 73703', phone: '(580) 249-5380', type: 'clinic' },
    { name: 'Ardmore VA Outpatient Clinic', lat: 34.174, lon: -97.134, address: '1200 Veterans Dr, Ardmore, OK 73401', phone: '(580) 223-2266', type: 'clinic' },
  ],
  missouri: [
    // VA Medical Centers
    { name: 'Columbia VA Medical Center (Harry S. Truman)', lat: 38.936425, lon: -92.328830, address: '800 Hospital Dr, Columbia, MO 65201', phone: '(573) 814-6000', type: 'vamc' },
    { name: 'Kansas City VA Medical Center', lat: 39.064413, lon: -94.527541, address: '4801 Linwood Blvd, Kansas City, MO 64128', phone: '(816) 861-4700', type: 'vamc' },
    { name: 'Poplar Bluff VA Medical Center (John J. Pershing)', lat: 36.772046, lon: -90.416464, address: '1500 N Westwood Blvd, Poplar Bluff, MO 63901', phone: '(573) 686-4151', type: 'vamc' },
    { name: 'St. Louis VA Medical Center (John Cochran)', lat: 38.642671, lon: -90.231527, address: '915 N Grand Blvd, St. Louis, MO 63106', phone: '(314) 652-4100', type: 'vamc' },
    { name: 'St. Louis VA Medical Center (Jefferson Barracks)', lat: 38.492742, lon: -90.281502, address: '1 Jefferson Barracks Dr, St. Louis, MO 63125', phone: '(314) 652-4100', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Springfield VA Clinic', lat: 37.161465, lon: -93.244047, address: '2805 S Lone Pine Ave, Springfield, MO 65804', phone: '(417) 887-6600', type: 'clinic' },
    { name: 'Joplin VA Clinic', lat: 37.063070, lon: -94.507045, address: '2520 S Minnesota Ave, Joplin, MO 64804', phone: '(417) 782-3990', type: 'clinic' },
    { name: 'Cape Girardeau VA Clinic', lat: 37.346033, lon: -89.598589, address: '2420 Veterans Memorial Dr, Cape Girardeau, MO 63701', phone: '(573) 339-0270', type: 'clinic' },
  ],
  kansas: [
    // VA Medical Centers
    { name: 'Leavenworth VA Medical Center (Dwight D. Eisenhower)', lat: 39.281493, lon: -94.894323, address: '4101 S 4th St, Leavenworth, KS 66048', phone: '(913) 682-2000', type: 'vamc' },
    { name: 'Wichita VA Medical Center (Robert J. Dole)', lat: 37.679839, lon: -97.276410, address: '5500 E Kellogg Dr, Wichita, KS 67218', phone: '(316) 685-2221', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Topeka VA Clinic', lat: 39.028556, lon: -95.708612, address: '1200 SW 22nd St, Topeka, KS 66604', phone: '(785) 350-3111', type: 'clinic' },
    { name: 'Salina VA Clinic', lat: 38.848337, lon: -97.609049, address: '1641 Santa Fe Ave, Salina, KS 67401', phone: '(785) 825-6734', type: 'clinic' },
    { name: 'Dodge City VA Clinic', lat: 37.773577, lon: -100.033033, address: '2210 N 14th Ave, Dodge City, KS 67801', phone: '(620) 225-8850', type: 'clinic' },
  ],
  nebraska: [
    // VA Medical Centers
    { name: 'Grand Island VA Medical Center', lat: 40.943715, lon: -98.357230, address: '2201 N Broadwell Ave, Grand Island, NE 68803', phone: '(308) 382-3660', type: 'vamc' },
    { name: 'Lincoln VA Medical Center', lat: 40.807750, lon: -96.621326, address: '600 S 70th St, Lincoln, NE 68510', phone: '(402) 489-3802', type: 'vamc' },
    { name: 'Omaha VA Medical Center', lat: 41.243687, lon: -95.973635, address: '4101 Woolworth Ave, Omaha, NE 68105', phone: '(402) 346-8800', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Bellevue VA Clinic', lat: 41.118084, lon: -95.950336, address: '2501 Capehart Rd, Bellevue, NE 68123', phone: '(402) 591-4500', type: 'clinic' },
    { name: 'Norfolk VA Clinic', lat: 42.042603, lon: -97.426429, address: '1007 N 13th St, Norfolk, NE 68701', phone: '(402) 370-3820', type: 'clinic' },
    { name: 'North Platte VA Clinic', lat: 41.121953, lon: -100.756767, address: '600 E Francis St, North Platte, NE 69101', phone: '(308) 532-6906', type: 'clinic' },
  ],
  iowa: [
    // VA Medical Centers
    { name: 'Des Moines VA Medical Center', lat: 41.627734, lon: -93.662073, address: '3600 30th St, Des Moines, IA 50310', phone: '(515) 699-5999', type: 'vamc' },
    { name: 'Iowa City VA Medical Center', lat: 41.663, lon: -91.534, address: '601 Hwy 6 W, Iowa City, IA 52246', phone: '(319) 338-0581', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Cedar Rapids VA Clinic', lat: 42.019510, lon: -91.700876, address: '4250 River Center Ct NE, Cedar Rapids, IA 52402', phone: '(319) 369-4272', type: 'clinic' },
    { name: 'Sioux City VA Clinic', lat: 42.533745, lon: -96.390372, address: '1551 Indian Hills Dr, Sioux City, IA 51104', phone: '(712) 255-6900', type: 'clinic' },
    { name: 'Waterloo VA Clinic', lat: 42.460364, lon: -92.331562, address: '2215 E San Marnan Dr, Waterloo, IA 50702', phone: '(319) 272-6750', type: 'clinic' },
  ],
  minnesota: [
    // VA Medical Centers
    { name: 'Minneapolis VA Medical Center', lat: 44.979, lon: -93.244, address: 'One Veterans Dr, Minneapolis, MN 55417', phone: '(612) 725-2000', type: 'vamc' },
    { name: 'St. Cloud VA Medical Center', lat: 45.572570, lon: -94.215188, address: '4801 Veterans Dr, St. Cloud, MN 56303', phone: '(320) 252-1670', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Duluth VA Clinic', lat: 46.750727, lon: -92.158713, address: '4311 W 6th St, Duluth, MN 55807', phone: '(218) 722-8654', type: 'clinic' },
    { name: 'Rochester VA Clinic', lat: 44.021, lon: -92.479, address: '3915 Market Place Dr NW, Rochester, MN 55901', phone: '(507) 252-0885', type: 'clinic' },
    { name: 'Hibbing VA Clinic', lat: 47.420518, lon: -92.923144, address: '1340 25th St E, Hibbing, MN 55746', phone: '(218) 263-4415', type: 'clinic' },
  ],
  wisconsin: [
    // VA Medical Centers
    { name: 'Madison VA Medical Center (William S. Middleton)', lat: 43.074041, lon: -89.429059, address: '2500 Overlook Terrace, Madison, WI 53705', phone: '(608) 256-1901', type: 'vamc' },
    { name: 'Milwaukee VA Medical Center (Clement J. Zablocki)', lat: 43.024773, lon: -87.978313, address: '5000 W National Ave, Milwaukee, WI 53295', phone: '(414) 384-2000', type: 'vamc' },
    { name: 'Tomah VA Medical Center', lat: 43.974, lon: -90.502, address: '500 E Veterans St, Tomah, WI 54660', phone: '(608) 372-3971', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Green Bay VA Clinic', lat: 44.519, lon: -88.02, address: '141 Maes Dr, Green Bay, WI 54303', phone: '(920) 497-3331', type: 'clinic' },
    { name: 'La Crosse VA Clinic', lat: 43.912622, lon: -91.075853, address: '2312 State Rd 16, La Crosse, WI 54601', phone: '(608) 784-3886', type: 'clinic' },
    { name: 'Wausau VA Clinic', lat: 44.96, lon: -89.633, address: '10501 Prentice Ave, Wausau, WI 54401', phone: '(715) 842-2834', type: 'clinic' },
  ],
  michigan: [
    // VA Medical Centers
    { name: 'Ann Arbor VA Medical Center', lat: 42.286122, lon: -83.714525, address: '2215 Fuller Rd, Ann Arbor, MI 48105', phone: '(734) 769-7100', type: 'vamc' },
    { name: 'Battle Creek VA Medical Center', lat: 42.342131, lon: -85.291740, address: '5500 Armstrong Rd, Battle Creek, MI 49037', phone: '(269) 966-5600', type: 'vamc' },
    { name: 'Detroit VA Medical Center (John D. Dingell)', lat: 42.355224, lon: -83.058966, address: '4646 John R St, Detroit, MI 48201', phone: '(313) 576-1000', type: 'vamc' },
    { name: 'Iron Mountain VA Medical Center (Oscar G. Johnson)', lat: 45.810283, lon: -88.061479, address: '325 E H St, Iron Mountain, MI 49801', phone: '(906) 774-3300', type: 'vamc' },
    { name: 'Saginaw VA Medical Center (Aleda E. Lutz)', lat: 43.443761, lon: -83.960907, address: '1500 Weiss St, Saginaw, MI 48602', phone: '(989) 497-2500', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Grand Rapids VA Clinic', lat: 43.017407, lon: -85.656770, address: '3019 Coit Ave NE, Grand Rapids, MI 49505', phone: '(616) 365-9575', type: 'clinic' },
    { name: 'Flint VA Clinic', lat: 43.013, lon: -83.668, address: '2360 Murchie Dr, Flint, MI 48507', phone: '(810) 232-2231', type: 'clinic' },
    { name: 'Lansing VA Clinic', lat: 42.710852, lon: -84.553280, address: '2025 S Washington Ave, Lansing, MI 48910', phone: '(517) 267-3663', type: 'clinic' },
    { name: 'Marquette VA Clinic', lat: 46.541924, lon: -87.395725, address: '94 W Spring St, Marquette, MI 49855', phone: '(906) 226-4618', type: 'clinic' },
  ],
  illinois: [
    // VA Medical Centers
    { name: 'Chicago VA Medical Center (Jesse Brown)', lat: 41.870294, lon: -87.677772, address: '820 S Damen Ave, Chicago, IL 60612', phone: '(312) 569-8387', type: 'vamc' },
    { name: 'Danville VA Medical Center', lat: 40.125173, lon: -87.589093, address: '1900 E Main St, Danville, IL 61832', phone: '(217) 554-3000', type: 'vamc' },
    { name: 'Hines VA Medical Center (Edward Hines Jr.)', lat: 41.857456, lon: -87.840035, address: '5000 S 5th Ave, Hines, IL 60141', phone: '(708) 202-8387', type: 'vamc' },
    { name: 'Marion VA Medical Center', lat: 37.724583, lon: -88.954662, address: '2401 W Main St, Marion, IL 62959', phone: '(618) 997-5311', type: 'vamc' },
    { name: 'North Chicago VA Medical Center (James A. Lovell FHCC)', lat: 42.307748, lon: -87.860683, address: '3001 Green Bay Rd, North Chicago, IL 60064', phone: '(224) 610-3460', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Peoria VA Clinic', lat: 40.694033, lon: -89.594157, address: '411 Fulton St, Peoria, IL 61602', phone: '(309) 495-4492', type: 'clinic' },
    { name: 'Springfield VA Clinic', lat: 39.8, lon: -89.644, address: '2700 Corporate Pkwy, Springfield, IL 62703', phone: '(217) 523-4433', type: 'clinic' },
    { name: 'Bloomington VA Clinic', lat: 40.488254, lon: -88.942898, address: '2301 E Empire St, Bloomington, IL 61704', phone: '(309) 671-7350', type: 'clinic' },
  ],
  indiana: [
    // VA Medical Centers
    { name: 'Fort Wayne VA Medical Center', lat: 41.090916, lon: -85.109786, address: '2121 Lake Ave, Fort Wayne, IN 46805', phone: '(260) 426-5431', type: 'vamc' },
    { name: 'Indianapolis VA Medical Center (Richard L. Roudebush)', lat: 39.779638, lon: -86.187640, address: '1481 W 10th St, Indianapolis, IN 46202', phone: '(317) 554-0000', type: 'vamc' },
    { name: 'Marion VA Medical Center', lat: 40.519690, lon: -85.638080, address: '1700 E 38th St, Marion, IN 46953', phone: '(765) 674-3321', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Evansville VA Clinic', lat: 37.971555, lon: -87.492531, address: '500 S Green River Rd, Evansville, IN 47715', phone: '(812) 473-4493', type: 'clinic' },
    { name: 'South Bend VA Clinic', lat: 41.669418, lon: -86.250214, address: '709 W Michigan St, South Bend, IN 46601', phone: '(574) 299-4847', type: 'clinic' },
    { name: 'Terre Haute VA Clinic', lat: 39.469536, lon: -87.405767, address: '110 N 8th St, Terre Haute, IN 47807', phone: '(812) 238-6617', type: 'clinic' },
  ],
  ohio: [
    // VA Medical Centers
    { name: 'Chillicothe VA Medical Center', lat: 39.389182, lon: -83.017646, address: '17273 State Route 104, Chillicothe, OH 45601', phone: '(740) 773-1141', type: 'vamc' },
    { name: 'Cincinnati VA Medical Center', lat: 39.138898, lon: -84.508500, address: '3200 Vine St, Cincinnati, OH 45220', phone: '(513) 861-3100', type: 'vamc' },
    { name: 'Cleveland VA Medical Center (Louis Stokes)', lat: 41.513757, lon: -81.614063, address: '10701 East Blvd, Cleveland, OH 44106', phone: '(216) 791-3800', type: 'vamc' },
    { name: 'Columbus VA Medical Center (Chalmers P. Wylie)', lat: 39.980771, lon: -82.909574, address: '420 N James Rd, Columbus, OH 43219', phone: '(614) 257-5200', type: 'vamc' },
    { name: 'Dayton VA Medical Center', lat: 39.756546, lon: -84.209617, address: '4100 W Third St, Dayton, OH 45428', phone: '(937) 268-6511', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Toledo VA Clinic', lat: 41.612290, lon: -83.621851, address: '3333 Glendale Ave, Toledo, OH 43614', phone: '(419) 259-2000', type: 'clinic' },
    { name: 'Akron VA Clinic', lat: 41.028829, lon: -81.529058, address: '55 W Waterloo Rd, Akron, OH 44319', phone: '(330) 724-7715', type: 'clinic' },
    { name: 'Youngstown VA Clinic', lat: 41.126693, lon: -80.664261, address: '2031 Belmont Ave, Youngstown, OH 44505', phone: '(330) 740-9200', type: 'clinic' },
  ],
  pennsylvania: [
    // VA Medical Centers
    { name: 'Altoona VA Medical Center (James E. Van Zandt)', lat: 40.488495, lon: -78.395755, address: '2907 Pleasant Valley Blvd, Altoona, PA 16602', phone: '(877) 626-2500', type: 'vamc' },
    { name: 'Butler VA Medical Center', lat: 40.879997, lon: -79.955637, address: '325 New Castle Rd, Butler, PA 16001', phone: '(800) 362-8262', type: 'vamc' },
    { name: 'Coatesville VA Medical Center', lat: 39.999424, lon: -75.796044, address: '1400 Blackhorse Hill Rd, Coatesville, PA 19320', phone: '(610) 384-7711', type: 'vamc' },
    { name: 'Erie VA Medical Center', lat: 42.102480, lon: -80.065774, address: '135 E 38th St, Erie, PA 16504', phone: '(814) 868-8661', type: 'vamc' },
    { name: 'Lebanon VA Medical Center', lat: 40.317613, lon: -76.396849, address: '1700 S Lincoln Ave, Lebanon, PA 17042', phone: '(717) 272-6621', type: 'vamc' },
    { name: 'Philadelphia VA Medical Center (Corporal Michael J. Crescenz)', lat: 39.947595, lon: -75.199079, address: '3900 Woodland Ave, Philadelphia, PA 19104', phone: '(215) 823-5800', type: 'vamc' },
    { name: 'Pittsburgh VA Medical Center (H.J. Heinz III)', lat: 40.445685, lon: -79.960406, address: 'University Dr, Pittsburgh, PA 15240', phone: '(412) 688-6000', type: 'vamc' },
    { name: 'Wilkes-Barre VA Medical Center', lat: 41.248178, lon: -75.838336, address: '1111 E End Blvd, Wilkes-Barre, PA 18711', phone: '(570) 824-3521', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Camp Hill VA Clinic', lat: 40.240035, lon: -76.934783, address: '25 N 32nd St, Camp Hill, PA 17011', phone: '(717) 730-9782', type: 'clinic' },
    { name: 'Lancaster VA Clinic', lat: 40.051971, lon: -76.251477, address: '1861 Charter Lane, Lancaster, PA 17601', phone: '(717) 208-0218', type: 'clinic' },
    { name: 'Reading VA Clinic', lat: 40.364383, lon: -75.954771, address: '2400 Bernville Rd, Reading, PA 19605', phone: '(610) 208-4562', type: 'clinic' },
    { name: 'Tobyhanna VA Clinic', lat: 41.177, lon: -75.415, address: '3000 Gouldsboro Ave, Tobyhanna, PA 18466', phone: '(570) 894-5253', type: 'clinic' },
  ],
  'new-york': [
    // VA Medical Centers
    { name: 'Albany VA Medical Center (Samuel S. Stratton)', lat: 42.650429, lon: -73.773182, address: '113 Holland Ave, Albany, NY 12208', phone: '(518) 626-5000', type: 'vamc' },
    { name: 'Bath VA Medical Center', lat: 42.346032, lon: -77.347352, address: '76 Veterans Ave, Bath, NY 14810', phone: '(607) 664-4000', type: 'vamc' },
    { name: 'Brooklyn VA Medical Center', lat: 40.607441, lon: -74.023724, address: '800 Poly Place, Brooklyn, NY 11209', phone: '(718) 836-6600', type: 'vamc' },
    { name: 'Buffalo VA Medical Center', lat: 42.951303, lon: -78.812284, address: '3495 Bailey Ave, Buffalo, NY 14215', phone: '(716) 834-9200', type: 'vamc' },
    { name: 'Canandaigua VA Medical Center', lat: 42.901246, lon: -77.269611, address: '400 Fort Hill Ave, Canandaigua, NY 14424', phone: '(585) 394-2000', type: 'vamc' },
    { name: 'Castle Point VA Medical Center', lat: 41.555, lon: -73.956, address: '41 Castle Point Rd, Wappingers Falls, NY 12590', phone: '(845) 831-2000', type: 'vamc' },
    { name: 'Manhattan VA Medical Center', lat: 40.737070, lon: -73.976899, address: '423 E 23rd St, New York, NY 10010', phone: '(212) 686-7500', type: 'vamc' },
    { name: 'Montrose VA Medical Center', lat: 41.239298, lon: -73.929964, address: '2094 Albany Post Rd, Montrose, NY 10548', phone: '(914) 737-4400', type: 'vamc' },
    { name: 'Northport VA Medical Center', lat: 40.892848, lon: -73.311968, address: '79 Middleville Rd, Northport, NY 11768', phone: '(631) 261-4400', type: 'vamc' },
    { name: 'Syracuse VA Medical Center', lat: 43.038521, lon: -76.139062, address: '800 Irving Ave, Syracuse, NY 13210', phone: '(315) 425-4400', type: 'vamc' },
    { name: 'Bronx VA Medical Center', lat: 40.867200, lon: -73.905511, address: '130 W Kingsbridge Rd, Bronx, NY 10468', phone: '(718) 584-9000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Binghamton VA Clinic', lat: 42.107109, lon: -75.863719, address: '425 Robinson St, Binghamton, NY 13901', phone: '(607) 772-9100', type: 'clinic' },
    { name: 'Rochester VA Clinic', lat: 43.114806, lon: -77.610655, address: '465 Westfall Rd, Rochester, NY 14620', phone: '(585) 463-2600', type: 'clinic' },
  ],
  'new-jersey': [
    // VA Medical Centers
    { name: 'East Orange VA Medical Center', lat: 40.752423, lon: -74.235462, address: '385 Tremont Ave, East Orange, NJ 07018', phone: '(973) 676-1000', type: 'vamc' },
    { name: 'Lyons VA Medical Center', lat: 40.668397, lon: -74.558742, address: '151 Knollcroft Rd, Lyons, NJ 07939', phone: '(908) 647-0180', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Cape May VA Clinic', lat: 39.084570, lon: -74.822112, address: '105 N Main St, Cape May Court House, NJ 08210', phone: '(609) 465-6800', type: 'clinic' },
    { name: 'Toms River VA Clinic', lat: 39.953, lon: -74.198, address: '1 Conifer Dr, Toms River, NJ 08753', phone: '(732) 557-4100', type: 'clinic' },
    { name: 'Edison VA Clinic', lat: 40.517281, lon: -74.344687, address: '111 Fieldcrest Ave, Edison, NJ 08837', phone: '(732) 632-5000', type: 'clinic' },
    { name: 'Ventnor City VA Clinic', lat: 39.338726, lon: -74.477402, address: '6001 Atlantic Ave, Ventnor City, NJ 08406', phone: '(609) 822-0300', type: 'clinic' },
  ],
  delaware: [
    // VA Medical Centers
    { name: 'Wilmington VA Medical Center', lat: 39.740381, lon: -75.606437, address: '1601 Kirkwood Hwy, Wilmington, DE 19805', phone: '(302) 994-2511', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Dover VA Clinic', lat: 39.156, lon: -75.524, address: '1198 S College Ave, Dover, DE 19904', phone: '(302) 734-3300', type: 'clinic' },
    { name: 'Georgetown VA Clinic', lat: 38.69, lon: -75.386, address: '25526 N Dual Hwy, Georgetown, DE 19947', phone: '(302) 856-4516', type: 'clinic' },
  ],
  maryland: [
    // VA Medical Centers
    { name: 'Baltimore VA Medical Center', lat: 39.289668, lon: -76.624494, address: '10 N Greene St, Baltimore, MD 21201', phone: '(410) 605-7000', type: 'vamc' },
    { name: 'Perry Point VA Medical Center', lat: 39.563, lon: -76.075, address: 'Circle Dr, Perry Point, MD 21902', phone: '(410) 642-2411', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Loch Raven VA Clinic', lat: 39.336531, lon: -76.594939, address: '3900 Loch Raven Blvd, Baltimore, MD 21218', phone: '(410) 605-7650', type: 'clinic' },
    { name: 'Fort Howard VA Clinic', lat: 39.207141, lon: -76.443391, address: '9600 North Point Rd, Fort Howard, MD 21052', phone: '(410) 477-1800', type: 'clinic' },
    { name: 'Annapolis VA Clinic', lat: 38.979854, lon: -76.489837, address: '156 Maryland Ave, Annapolis, MD 21401', phone: '(410) 605-7400', type: 'clinic' },
    { name: 'Charlotte Hall VA Clinic', lat: 38.482995, lon: -76.781581, address: '29655 Charlotte Hall Rd, Charlotte Hall, MD 20622', phone: '(301) 884-7102', type: 'clinic' },
    { name: 'Hagerstown VA Clinic', lat: 39.636170, lon: -77.696469, address: '1101 Opal Ct, Hagerstown, MD 21740', phone: '(301) 665-1462', type: 'clinic' },
  ],
  'west-virginia': [
    // VA Medical Centers
    { name: 'Beckley VA Medical Center', lat: 37.764788, lon: -81.192210, address: '200 Veterans Ave, Beckley, WV 25801', phone: '(304) 255-2121', type: 'vamc' },
    { name: 'Clarksburg VA Medical Center (Louis A. Johnson)', lat: 39.270184, lon: -80.361923, address: '1 Medical Center Dr, Clarksburg, WV 26301', phone: '(304) 623-3461', type: 'vamc' },
    { name: 'Huntington VA Medical Center', lat: 38.376970, lon: -82.518120, address: '1540 Spring Valley Dr, Huntington, WV 25704', phone: '(304) 429-6741', type: 'vamc' },
    { name: 'Martinsburg VA Medical Center', lat: 39.414529, lon: -77.910270, address: '510 Butler Ave, Martinsburg, WV 25405', phone: '(304) 263-0811', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Charleston VA Clinic', lat: 38.361994, lon: -81.649174, address: '521 Central Ave, Charleston, WV 25302', phone: '(304) 343-3825', type: 'clinic' },
    { name: 'Parkersburg VA Clinic', lat: 39.282258, lon: -81.550444, address: '2311 Ohio Ave, Parkersburg, WV 26101', phone: '(304) 422-5114', type: 'clinic' },
    { name: 'Wheeling VA Clinic', lat: 40.083393, lon: -80.725684, address: '90 Main St, Wheeling, WV 26003', phone: '(304) 232-0587', type: 'clinic' },
  ],
  kentucky: [
    // VA Medical Centers
    { name: 'Lexington VA Medical Center', lat: 38.029752, lon: -84.506681, address: '1101 Veterans Dr, Lexington, KY 40502', phone: '(859) 233-4511', type: 'vamc' },
    { name: 'Louisville VA Medical Center (Robley Rex)', lat: 38.270315, lon: -85.698111, address: '800 Zorn Ave, Louisville, KY 40206', phone: '(502) 287-4000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Bowling Green VA Clinic', lat: 36.969871, lon: -86.433272, address: '1110 Wilkinson Trace, Bowling Green, KY 42103', phone: '(270) 796-3600', type: 'clinic' },
    { name: 'Hazard VA Clinic', lat: 37.253409, lon: -83.201945, address: '210 Black Gold Blvd, Hazard, KY 41701', phone: '(606) 435-0300', type: 'clinic' },
    { name: 'Prestonsburg VA Clinic', lat: 37.691906, lon: -82.727047, address: '6980 KY-302, Prestonsburg, KY 41653', phone: '(606) 886-1970', type: 'clinic' },
    { name: 'Paducah VA Clinic', lat: 37.069512, lon: -88.686377, address: '2620 Perkins Creek Dr, Paducah, KY 42001', phone: '(270) 444-8465', type: 'clinic' },
  ],
  alabama: [
    // VA Medical Centers
    { name: 'Birmingham VA Medical Center', lat: 33.505050, lon: -86.801290, address: '700 S 19th St, Birmingham, AL 35233', phone: '(205) 933-8101', type: 'vamc' },
    { name: 'Montgomery VA Medical Center (Central Alabama)', lat: 32.377173, lon: -86.243456, address: '215 Perry Hill Rd, Montgomery, AL 36109', phone: '(334) 272-4670', type: 'vamc' },
    { name: 'Tuscaloosa VA Medical Center', lat: 33.196, lon: -87.572, address: '3701 Loop Rd E, Tuscaloosa, AL 35404', phone: '(205) 554-2000', type: 'vamc' },
    { name: 'Tuskegee VA Medical Center', lat: 32.444760, lon: -85.714115, address: '2400 Hospital Rd, Tuskegee, AL 36083', phone: '(334) 727-0550', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Anniston VA Clinic', lat: 33.623370, lon: -85.803590, address: '1820 Coleman Rd, Anniston, AL 36207', phone: '(256) 236-4220', type: 'clinic' },
    { name: 'Dothan VA Clinic', lat: 31.227131, lon: -85.432050, address: '3082 Ross Clark Circle, Dothan, AL 36303', phone: '(334) 673-8100', type: 'clinic' },
    { name: 'Huntsville VA Clinic', lat: 34.720884, lon: -86.590761, address: '806 Governors Dr SW, Huntsville, AL 35801', phone: '(256) 535-3100', type: 'clinic' },
    { name: 'Mobile VA Clinic', lat: 30.700431, lon: -88.112872, address: '1504 Springhill Ave, Mobile, AL 36604', phone: '(251) 219-3900', type: 'clinic' },
  ],
  mississippi: [
    // VA Medical Centers
    { name: 'Biloxi VA Medical Center (Gulf Coast)', lat: 30.410262, lon: -88.948974, address: '400 Veterans Ave, Biloxi, MS 39531', phone: '(228) 523-5000', type: 'vamc' },
    { name: 'Jackson VA Medical Center (G.V. (Sonny) Montgomery)', lat: 32.328792, lon: -90.167000, address: '1500 E Woodrow Wilson Ave, Jackson, MS 39216', phone: '(601) 362-4471', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Oxford VA Clinic', lat: 34.365503, lon: -89.521623, address: '1002 Tyler Ave, Oxford, MS 38655', phone: '(662) 236-3636', type: 'clinic' },
    { name: 'Hattiesburg VA Clinic', lat: 31.327, lon: -89.29, address: '106 Security Blvd, Hattiesburg, MS 39402', phone: '(601) 579-2900', type: 'clinic' },
    { name: 'Tupelo VA Clinic', lat: 34.247393, lon: -88.694472, address: '1500 Martin Luther King Dr, Tupelo, MS 38804', phone: '(662) 680-7900', type: 'clinic' },
  ],
  louisiana: [
    // VA Medical Centers
    { name: 'Alexandria VA Medical Center', lat: 31.355981, lon: -92.437707, address: '2495 Shreveport Hwy, Pineville, LA 71360', phone: '(318) 473-0010', type: 'vamc' },
    { name: 'Overton Brooks VA Medical Center (Shreveport)', lat: 32.500070, lon: -93.722906, address: '510 E Stoner Ave, Shreveport, LA 71101', phone: '(318) 221-8411', type: 'vamc' },
    { name: 'Southeast Louisiana Veterans Health Care System (New Orleans)', lat: 29.961650, lon: -90.084846, address: '2400 Canal St, New Orleans, LA 70119', phone: '(504) 412-3700', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Baton Rouge VA Outpatient Clinic', lat: 30.398440, lon: -91.115073, address: '7200 Perkins Rd, Baton Rouge, LA 70808', phone: '(225) 761-3400', type: 'clinic' },
    { name: 'Lafayette VA Outpatient Clinic', lat: 30.165964, lon: -92.037963, address: '2121 Kaliste Saloom Rd, Lafayette, LA 70508', phone: '(337) 261-0734', type: 'clinic' },
    { name: 'Lake Charles VA Outpatient Clinic', lat: 30.213, lon: -93.219, address: '3206 E Broad St, Lake Charles, LA 70615', phone: '(337) 475-9000', type: 'clinic' },
  ],
  arkansas: [
    // VA Medical Centers
    { name: 'Fayetteville VA Medical Center', lat: 36.078, lon: -94.157, address: '1100 N College Ave, Fayetteville, AR 72703', phone: '(479) 443-4301', type: 'vamc' },
    { name: 'Little Rock VA Medical Center (John L. McClellan Memorial)', lat: 34.744962, lon: -92.321062, address: '4300 W 7th St, Little Rock, AR 72205', phone: '(501) 257-1000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Fort Smith VA Outpatient Clinic', lat: 35.358715, lon: -94.370948, address: '1901 S 56th St, Fort Smith, AR 72903', phone: '(479) 709-6800', type: 'clinic' },
    { name: 'Jonesboro VA Outpatient Clinic', lat: 35.842, lon: -90.704, address: '2600 Enterprise Ave, Jonesboro, AR 72401', phone: '(870) 932-6100', type: 'clinic' },
    { name: 'El Dorado VA Outpatient Clinic', lat: 33.208, lon: -92.666, address: '1504 S Lincoln Ave, El Dorado, AR 71730', phone: '(870) 875-5531', type: 'clinic' },
    { name: 'Hot Springs VA Outpatient Clinic', lat: 34.502, lon: -93.056, address: '157 Penny Dr, Hot Springs, AR 71913', phone: '(501) 624-7200', type: 'clinic' },
    { name: 'Texarkana VA Outpatient Clinic', lat: 33.458813, lon: -94.080057, address: '3310 Mall Dr, Texarkana, TX 75503', phone: '(903) 223-5200', type: 'clinic' },
    { name: 'Mountain Home VA Outpatient Clinic', lat: 36.340170, lon: -92.396829, address: '370 Burnett Dr, Mountain Home, AR 72653', phone: '(870) 424-4109', type: 'clinic' },
  ],
  'south-carolina': [
    // VA Medical Centers
    { name: 'Charleston VA Medical Center (Ralph H. Johnson)', lat: 32.783612, lon: -79.953913, address: '109 Bee St, Charleston, SC 29401', phone: '(843) 577-5011', type: 'vamc' },
    { name: 'Columbia VA Medical Center (Wm. Jennings Bryan Dorn)', lat: 33.974896, lon: -80.959847, address: '6439 Garners Ferry Rd, Columbia, SC 29209', phone: '(803) 776-4000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Greenville VA Clinic', lat: 34.840801, lon: -82.401886, address: '31 University Ridge, Greenville, SC 29601', phone: '(864) 299-1600', type: 'clinic' },
    { name: 'Florence VA Clinic', lat: 34.189190, lon: -79.804478, address: '1613 S Cashua Dr, Florence, SC 29501', phone: '(843) 292-8383', type: 'clinic' },
    { name: 'Myrtle Beach VA Clinic', lat: 33.671674, lon: -78.936396, address: '3381 Phillis Blvd, Myrtle Beach, SC 29577', phone: '(843) 477-0177', type: 'clinic' },
    { name: 'Beaufort VA Clinic', lat: 32.389027, lon: -80.682019, address: '1 Pinckney Blvd, Beaufort, SC 29902', phone: '(843) 770-0444', type: 'clinic' },
  ],
  maine: [
    // VA Medical Centers
    { name: 'Togus VA Medical Center', lat: 44.324, lon: -69.72, address: '1 VA Center, Augusta, ME 04330', phone: '(207) 623-8411', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Portland VA Clinic', lat: 43.661197, lon: -70.246797, address: '144 Fore St, Portland, ME 04101', phone: '(207) 771-3500', type: 'clinic' },
    { name: 'Bangor VA Clinic', lat: 44.801747, lon: -68.770984, address: '35 Hammond St, Bangor, ME 04401', phone: '(207) 561-3600', type: 'clinic' },
    { name: 'Saco VA Clinic', lat: 43.515568, lon: -70.428639, address: '655 Main St, Saco, ME 04072', phone: '(207) 294-3100', type: 'clinic' },
  ],
  vermont: [
    // VA Medical Centers
    { name: 'White River Junction VA Medical Center', lat: 43.650048, lon: -72.321950, address: '215 N Main St, White River Junction, VT 05009', phone: '(802) 295-9363', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Burlington VA Clinic', lat: 44.461962, lon: -73.217645, address: '128 Lakeside Ave, Burlington, VT 05401', phone: '(802) 657-7000', type: 'clinic' },
    { name: 'Rutland VA Clinic', lat: 43.607104, lon: -72.984887, address: '232 West St, Rutland, VT 05701', phone: '(802) 773-3386', type: 'clinic' },
  ],
  massachusetts: [
    // VA Medical Centers
    { name: 'Bedford VA Medical Center (Edith Nourse Rogers)', lat: 42.504058, lon: -71.275337, address: '200 Springs Rd, Bedford, MA 01730', phone: '(781) 687-2000', type: 'vamc' },
    { name: 'Boston VA Medical Center (Jamaica Plain)', lat: 42.327369, lon: -71.110897, address: '150 S Huntington Ave, Boston, MA 02130', phone: '(617) 232-9500', type: 'vamc' },
    { name: 'Boston VA Medical Center (West Roxbury)', lat: 42.274688, lon: -71.171882, address: '1400 VFW Pkwy, West Roxbury, MA 02132', phone: '(617) 323-7700', type: 'vamc' },
    { name: 'Brockton VA Medical Center', lat: 42.057304, lon: -71.048728, address: '940 Belmont St, Brockton, MA 02301', phone: '(508) 583-4500', type: 'vamc' },
    { name: 'Northampton VA Medical Center', lat: 42.349456, lon: -72.684600, address: '421 N Main St, Leeds, MA 01053', phone: '(413) 584-4040', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Worcester VA Clinic', lat: 42.297692, lon: -71.766736, address: '605 Lincoln St, Worcester, MA 01605', phone: '(508) 856-0104', type: 'clinic' },
    { name: 'Springfield VA Clinic', lat: 42.110143, lon: -72.599547, address: '25 Bond St, Springfield, MA 01104', phone: '(413) 731-6200', type: 'clinic' },
    { name: 'Hyannis VA Clinic', lat: 41.651714, lon: -70.293753, address: '233 Stevens St, Hyannis, MA 02601', phone: '(508) 771-3190', type: 'clinic' },
    { name: 'New Bedford VA Clinic', lat: 41.635967, lon: -70.930389, address: '174 Elm St, New Bedford, MA 02740', phone: '(508) 994-0217', type: 'clinic' },
    { name: 'Fitchburg VA Clinic', lat: 42.581, lon: -71.803, address: '73-75 Austin St, Fitchburg, MA 01420', phone: '(978) 342-9781', type: 'clinic' },
  ],
  connecticut: [
    // VA Medical Centers
    { name: 'West Haven VA Medical Center', lat: 41.283664, lon: -72.959832, address: '950 Campbell Ave, West Haven, CT 06516', phone: '(203) 932-5711', type: 'vamc' },
    { name: 'Newington VA Medical Center', lat: 41.701105, lon: -72.741644, address: '555 Willard Ave, Newington, CT 06111', phone: '(860) 666-6951', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Waterbury VA Clinic', lat: 41.553628, lon: -73.037518, address: '95 Scovill St, Waterbury, CT 06706', phone: '(203) 465-5292', type: 'clinic' },
    { name: 'Stamford VA Clinic', lat: 41.052094, lon: -73.533843, address: '281 Tresser Blvd, Stamford, CT 06901', phone: '(203) 325-0649', type: 'clinic' },
    { name: 'New London VA Clinic', lat: 41.347090, lon: -72.101213, address: '4 Shaw\'s Cove, New London, CT 06320', phone: '(860) 437-3611', type: 'clinic' },
    { name: 'Winsted VA Clinic', lat: 41.927, lon: -73.06, address: '115 Spencer St, Winsted, CT 06098', phone: '(860) 738-6985', type: 'clinic' },
  ],
  'rhode-island': [
    // VA Medical Centers
    { name: 'Providence VA Medical Center', lat: 41.831803, lon: -71.432773, address: '830 Chalkstone Ave, Providence, RI 02908', phone: '(401) 273-7100', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Lincoln VA Clinic', lat: 41.926253, lon: -71.434604, address: '51 Old River Rd, Lincoln, RI 02865', phone: '(401) 334-6930', type: 'clinic' },
    { name: 'Middletown VA Clinic', lat: 41.534, lon: -71.297, address: '10 Wampanoag Trail, Middletown, RI 02842', phone: '(401) 847-6239', type: 'clinic' },
  ],
  hawaii: [
    // VA Medical Centers
    { name: 'Honolulu VA Medical Center (Spark M. Matsunaga)', lat: 21.361343, lon: -157.889402, address: '459 Patterson Rd, Honolulu, HI 96819', phone: '(808) 433-0600', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Lihue VA Outpatient Clinic (Kauai)', lat: 21.978, lon: -159.37, address: '3-3367 Kuhio Hwy, Lihue, HI 96766', phone: '(808) 246-0497', type: 'clinic' },
    { name: 'Hilo VA Outpatient Clinic (Big Island)', lat: 19.717302, lon: -155.113912, address: '1285 Waianuenue Ave, Hilo, HI 96720', phone: '(808) 935-3781', type: 'clinic' },
    { name: 'Maui VA Outpatient Clinic', lat: 20.887276, lon: -156.463469, address: '203 Ho\'ohana St, Kahului, HI 96732', phone: '(808) 871-2454', type: 'clinic' },
  ],
  'north-dakota': [
    // VA Medical Centers
    { name: 'Fargo VA Medical Center', lat: 46.905877, lon: -96.775002, address: '2101 Elm St N, Fargo, ND 58102', phone: '(701) 232-3241', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Minot VA Clinic', lat: 48.231, lon: -101.299, address: '4 Jordan Dr, Minot, ND 58701', phone: '(701) 839-0088', type: 'clinic' },
    { name: 'Bismarck VA Clinic', lat: 46.836178, lon: -100.776958, address: '2700 State St, Bismarck, ND 58503', phone: '(701) 221-9152', type: 'clinic' },
    { name: 'Grand Forks VA Clinic', lat: 47.924004, lon: -97.070647, address: '3701 Cambridge St, Grand Forks, ND 58203', phone: '(701) 772-3719', type: 'clinic' },
  ],
  dc: [
    // VA Medical Centers
    { name: 'Washington DC VA Medical Center', lat: 38.9347, lon: -77.0138, address: '50 Irving St NW, Washington, DC 20422', phone: '(202) 745-8000', type: 'vamc' },
    // VA Outpatient Clinics
    { name: 'Southeast DC VA Clinic', lat: 38.8353, lon: -76.9952, address: '820 Chesapeake St SE, Washington, DC 20032', phone: '(202) 745-8685', type: 'clinic' },
    { name: 'Vet Center — Washington DC', lat: 38.9084, lon: -77.0363, address: '1250 Taylor St NW, Washington, DC 20011', phone: '(202) 726-5212', type: 'clinic' },
    { name: 'DC VA Community Resource & Referral Center', lat: 38.8943, lon: -77.0291, address: '1500 Franklin St NE, Washington, DC 20018', phone: '(202) 526-3131', type: 'clinic' },
  ],
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
  dc: '11',
  'puerto-rico': '72',
  guam: '66',
  'us-virgin-islands': '78',
  'american-samoa': '60',
  'northern-mariana-islands': '69',
};
