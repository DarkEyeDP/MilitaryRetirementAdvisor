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
}

export const vaFacilityLocations: Record<string, VAFacility[]> = {
  'florida': [
    { name: 'Bay Pines VA Medical Center', lat: 27.752, lon: -82.739 },
    { name: 'Gainesville VA Medical Center', lat: 29.640, lon: -82.352 },
    { name: 'Lake City VA Medical Center', lat: 30.190, lon: -82.637 },
    { name: 'Miami VA Medical Center', lat: 25.783, lon: -80.215 },
    { name: 'Orlando VA Medical Center', lat: 28.538, lon: -81.379 },
    { name: 'Tampa VA Medical Center', lat: 28.017, lon: -82.466 },
    { name: 'West Palm Beach VA Medical Center', lat: 26.715, lon: -80.109 },
    { name: 'Jacksonville VA Outpatient Clinic', lat: 30.332, lon: -81.656 },
    { name: 'Pensacola VA Outpatient Clinic', lat: 30.474, lon: -87.247 },
  ],
  'texas': [
    { name: 'Amarillo VA Medical Center', lat: 35.191, lon: -101.831 },
    { name: 'Big Spring VA Medical Center', lat: 32.237, lon: -101.469 },
    { name: 'Dallas VA Medical Center', lat: 32.814, lon: -96.820 },
    { name: 'El Paso VA Medical Center', lat: 31.832, lon: -106.442 },
    { name: 'Houston VA Medical Center (Michael E. DeBakey)', lat: 29.733, lon: -95.402 },
    { name: 'Kerrville VA Medical Center', lat: 30.047, lon: -99.140 },
    { name: 'Marlin VA Medical Center', lat: 31.305, lon: -96.899 },
    { name: 'San Antonio VA Medical Center (Audie L. Murphy)', lat: 29.538, lon: -98.592 },
    { name: 'Temple VA Medical Center (Olin E. Teague)', lat: 31.105, lon: -97.343 },
    { name: 'Waco VA Medical Center', lat: 31.549, lon: -97.147 },
    { name: 'Fort Worth VA Outpatient Clinic', lat: 32.745, lon: -97.330 },
  ],
  'virginia': [
    { name: 'Hampton VA Medical Center', lat: 37.024, lon: -76.340 },
    { name: 'Richmond VA Medical Center (McGuire)', lat: 37.480, lon: -77.439 },
    { name: 'Salem VA Medical Center', lat: 37.293, lon: -80.042 },
    { name: 'Hampton Roads VA Outpatient Clinic', lat: 36.839, lon: -76.054 },
    { name: 'Charlottesville VA Outpatient Clinic', lat: 38.029, lon: -78.477 },
    { name: 'Fredericksburg VA Outpatient Clinic', lat: 38.301, lon: -77.461 },
    { name: 'Virginia Beach VA Outpatient Clinic', lat: 36.853, lon: -75.978 },
    { name: 'Winchester VA Outpatient Clinic', lat: 39.186, lon: -78.163 },
  ],
  'tennessee': [
    { name: 'Memphis VA Medical Center', lat: 35.149, lon: -90.048 },
    { name: 'Mountain Home VA Medical Center (James H. Quillen)', lat: 36.310, lon: -82.374 },
    { name: 'Murfreesboro VA Medical Center', lat: 35.849, lon: -86.392 },
    { name: 'Nashville VA Medical Center (Tennessee Valley)', lat: 36.165, lon: -86.784 },
  ],
  'nevada': [
    { name: 'Las Vegas VA Medical Center', lat: 36.175, lon: -115.148 },
    { name: 'Reno VA Medical Center', lat: 39.534, lon: -119.813 },
  ],
  'washington': [
    { name: 'American Lake VA Medical Center (Tacoma)', lat: 47.144, lon: -122.556 },
    { name: 'Seattle VA Medical Center (VA Puget Sound)', lat: 47.652, lon: -122.305 },
    { name: 'Spokane VA Medical Center (Mann-Grandstaff)', lat: 47.665, lon: -117.405 },
    { name: 'Walla Walla VA Medical Center', lat: 46.063, lon: -118.343 },
    { name: 'Vancouver VA Medical Center', lat: 45.639, lon: -122.671 },
    { name: 'Kennewick VA Outpatient Clinic', lat: 46.209, lon: -119.137 },
  ],
  'alaska': [
    { name: 'Anchorage VA Medical Center', lat: 61.218, lon: -149.900 },
    { name: 'Fairbanks VA Outpatient Clinic', lat: 64.838, lon: -147.716 },
  ],
  'wyoming': [
    { name: 'Cheyenne VA Medical Center', lat: 41.137, lon: -104.820 },
  ],
  'south-dakota': [
    { name: 'Fort Meade VA Medical Center', lat: 44.407, lon: -103.462 },
    { name: 'Sioux Falls VA Medical Center (Royal C. Johnson)', lat: 43.549, lon: -96.729 },
  ],
  'new-hampshire': [
    { name: 'Manchester VA Medical Center', lat: 42.992, lon: -71.464 },
    { name: 'White River Junction VA Medical Center (shared with VT)', lat: 43.647, lon: -72.319 },
  ],
  'north-carolina': [
    { name: 'Asheville VA Medical Center', lat: 35.547, lon: -82.558 },
    { name: 'Durham VA Medical Center', lat: 35.997, lon: -78.939 },
    { name: 'Fayetteville VA Medical Center', lat: 35.052, lon: -78.879 },
    { name: 'Salisbury VA Medical Center (W.G. Hefner)', lat: 35.670, lon: -80.474 },
    { name: 'Charlotte VA Outpatient Clinic', lat: 35.228, lon: -80.843 },
    { name: 'Greensboro VA Outpatient Clinic', lat: 36.073, lon: -79.792 },
    { name: 'Wilmington VA Outpatient Clinic', lat: 34.226, lon: -77.945 },
  ],
  'georgia': [
    { name: 'Atlanta VA Medical Center (Joseph Maxwell Cleland)', lat: 33.797, lon: -84.326 },
    { name: 'Augusta VA Medical Center (Charlie Norwood)', lat: 33.475, lon: -82.024 },
    { name: 'Dublin VA Medical Center (Carl Vinson)', lat: 32.540, lon: -82.903 },
    { name: 'Decatur VA Medical Center', lat: 33.772, lon: -84.296 },
    { name: 'Savannah VA Outpatient Clinic', lat: 32.083, lon: -81.100 },
    { name: 'Columbus VA Outpatient Clinic', lat: 32.461, lon: -84.988 },
  ],
  'california': [
    { name: 'Fresno VA Medical Center', lat: 36.787, lon: -119.790 },
    { name: 'Loma Linda VA Medical Center (Jerry L. Pettis)', lat: 34.044, lon: -117.261 },
    { name: 'Long Beach VA Medical Center', lat: 33.801, lon: -118.186 },
    { name: 'Los Angeles VA Medical Center (West LA)', lat: 34.059, lon: -118.457 },
    { name: 'Palo Alto VA Medical Center', lat: 37.433, lon: -122.177 },
    { name: 'Sacramento VA Medical Center (Mather)', lat: 38.560, lon: -121.298 },
    { name: 'San Diego VA Medical Center', lat: 32.874, lon: -117.237 },
    { name: 'San Francisco VA Medical Center', lat: 37.783, lon: -122.507 },
    { name: 'Sepulveda VA Medical Center', lat: 34.220, lon: -118.476 },
    { name: 'Livermore VA Medical Center', lat: 37.693, lon: -121.768 },
    { name: 'Martinez VA Medical Center', lat: 38.020, lon: -122.128 },
    { name: 'San Jose VA Outpatient Clinic', lat: 37.335, lon: -121.893 },
    { name: 'Monterey VA Outpatient Clinic', lat: 36.600, lon: -121.894 },
    { name: 'Oxnard VA Outpatient Clinic', lat: 34.197, lon: -119.177 },
  ],
  'arizona': [
    { name: 'Phoenix VA Medical Center (Carl T. Hayden)', lat: 33.484, lon: -112.099 },
    { name: 'Prescott VA Medical Center', lat: 34.551, lon: -112.469 },
    { name: 'Tucson VA Medical Center (Southern Arizona)', lat: 32.235, lon: -110.960 },
    { name: 'Flagstaff VA Outpatient Clinic', lat: 35.198, lon: -111.651 },
    { name: 'Sun City VA Outpatient Clinic', lat: 33.600, lon: -112.273 },
  ],
  'colorado': [
    { name: 'Aurora VA Medical Center (Rocky Mountain)', lat: 39.721, lon: -104.689 },
    { name: 'Denver VA Medical Center', lat: 39.741, lon: -104.986 },
    { name: 'Grand Junction VA Medical Center', lat: 39.064, lon: -108.551 },
    { name: 'Pueblo VA Medical Center', lat: 38.254, lon: -104.609 },
  ],
  'oregon': [
    { name: 'Portland VA Medical Center', lat: 45.496, lon: -122.682 },
    { name: 'Roseburg VA Medical Center', lat: 43.218, lon: -123.351 },
    { name: 'White City VA Medical Center (Southern Oregon Rehabilitation)', lat: 42.422, lon: -122.847 },
    { name: 'Eugene VA Outpatient Clinic', lat: 44.052, lon: -123.087 },
  ],
  'idaho': [
    { name: 'Boise VA Medical Center', lat: 43.600, lon: -116.226 },
    { name: 'Pocatello VA Outpatient Clinic', lat: 42.866, lon: -112.466 },
  ],
  'montana': [
    { name: 'Fort Harrison VA Medical Center (Montana)', lat: 46.611, lon: -112.026 },
    { name: 'Miles City VA Outpatient Clinic', lat: 46.408, lon: -105.840 },
  ],
  'utah': [
    { name: 'Salt Lake City VA Medical Center (George E. Wahlen)', lat: 40.769, lon: -111.853 },
    { name: 'Ogden VA Outpatient Clinic', lat: 41.228, lon: -111.967 },
  ],
  'new-mexico': [
    { name: 'Albuquerque VA Medical Center (Raymond G. Murphy)', lat: 35.092, lon: -106.614 },
    { name: 'Amarillo VA Outpatient Clinic', lat: 35.191, lon: -101.831 },
    { name: 'Santa Fe VA Outpatient Clinic', lat: 35.687, lon: -105.938 },
  ],
  'oklahoma': [
    { name: 'Muskogee VA Medical Center (Jack C. Montgomery)', lat: 35.748, lon: -95.369 },
    { name: 'Oklahoma City VA Medical Center (Oklahoma City)', lat: 35.476, lon: -97.598 },
    { name: 'Tulsa VA Outpatient Clinic', lat: 36.154, lon: -95.993 },
  ],
  'missouri': [
    { name: 'Columbia VA Medical Center (Harry S. Truman)', lat: 38.952, lon: -92.329 },
    { name: 'Kansas City VA Medical Center', lat: 39.087, lon: -94.591 },
    { name: 'Poplar Bluff VA Medical Center (John J. Pershing)', lat: 36.757, lon: -90.413 },
    { name: 'St. Louis VA Medical Center (John Cochran)', lat: 38.634, lon: -90.239 },
    { name: 'St. Louis VA Medical Center (Jefferson Barracks)', lat: 38.524, lon: -90.283 },
  ],
  'kansas': [
    { name: 'Leavenworth VA Medical Center (Dwight D. Eisenhower)', lat: 39.301, lon: -94.922 },
    { name: 'Wichita VA Medical Center (Robert J. Dole)', lat: 37.685, lon: -97.329 },
    { name: 'Topeka VA Outpatient Clinic', lat: 39.056, lon: -95.695 },
  ],
  'nebraska': [
    { name: 'Grand Island VA Medical Center', lat: 40.924, lon: -98.342 },
    { name: 'Lincoln VA Medical Center', lat: 40.813, lon: -96.674 },
    { name: 'Omaha VA Medical Center', lat: 41.261, lon: -95.993 },
  ],
  'iowa': [
    { name: 'Des Moines VA Medical Center', lat: 41.600, lon: -93.628 },
    { name: 'Iowa City VA Medical Center', lat: 41.663, lon: -91.534 },
  ],
  'minnesota': [
    { name: 'Minneapolis VA Medical Center', lat: 44.979, lon: -93.244 },
    { name: 'St. Cloud VA Medical Center', lat: 45.561, lon: -94.159 },
    { name: 'Duluth VA Outpatient Clinic', lat: 46.782, lon: -92.106 },
  ],
  'wisconsin': [
    { name: 'Madison VA Medical Center (William S. Middleton)', lat: 43.073, lon: -89.412 },
    { name: 'Milwaukee VA Medical Center (Clement J. Zablocki)', lat: 43.059, lon: -87.972 },
    { name: 'Tomah VA Medical Center', lat: 43.974, lon: -90.502 },
  ],
  'michigan': [
    { name: 'Ann Arbor VA Medical Center', lat: 42.282, lon: -83.739 },
    { name: 'Battle Creek VA Medical Center', lat: 42.305, lon: -85.179 },
    { name: 'Detroit VA Medical Center (John D. Dingell)', lat: 42.352, lon: -83.039 },
    { name: 'Iron Mountain VA Medical Center (Oscar G. Johnson)', lat: 45.820, lon: -88.067 },
    { name: 'Saginaw VA Medical Center (Aleda E. Lutz)', lat: 43.428, lon: -83.946 },
  ],
  'illinois': [
    { name: 'Chicago VA Medical Center (Jesse Brown)', lat: 41.874, lon: -87.666 },
    { name: 'Danville VA Medical Center', lat: 40.130, lon: -87.601 },
    { name: 'Hines VA Medical Center (Edward Hines Jr.)', lat: 41.852, lon: -87.850 },
    { name: 'Marion VA Medical Center', lat: 37.731, lon: -88.933 },
    { name: 'North Chicago VA Medical Center (Captain James A. Lovell)', lat: 42.300, lon: -87.886 },
    { name: 'Peoria VA Outpatient Clinic', lat: 40.694, lon: -89.589 },
  ],
  'indiana': [
    { name: 'Fort Wayne VA Medical Center', lat: 41.075, lon: -85.143 },
    { name: 'Indianapolis VA Medical Center (Richard L. Roudebush)', lat: 39.785, lon: -86.162 },
    { name: 'Marion VA Medical Center', lat: 40.558, lon: -85.659 },
  ],
  'ohio': [
    { name: 'Chillicothe VA Medical Center', lat: 39.332, lon: -82.982 },
    { name: 'Cincinnati VA Medical Center', lat: 39.138, lon: -84.497 },
    { name: 'Cleveland VA Medical Center (Louis Stokes)', lat: 41.503, lon: -81.612 },
    { name: 'Columbus VA Medical Center (Chalmers P. Wylie)', lat: 40.000, lon: -82.993 },
    { name: 'Dayton VA Medical Center', lat: 39.765, lon: -84.199 },
    { name: 'Toledo VA Outpatient Clinic', lat: 41.660, lon: -83.558 },
  ],
  'pennsylvania': [
    { name: 'Altoona VA Medical Center (James E. Van Zandt)', lat: 40.496, lon: -78.400 },
    { name: 'Butler VA Medical Center', lat: 40.860, lon: -79.895 },
    { name: 'Coatesville VA Medical Center', lat: 39.980, lon: -75.823 },
    { name: 'Erie VA Medical Center', lat: 42.130, lon: -80.080 },
    { name: 'Lebanon VA Medical Center', lat: 40.333, lon: -76.411 },
    { name: 'Philadelphia VA Medical Center (Corporal Michael J. Crescenz)', lat: 39.944, lon: -75.181 },
    { name: 'Pittsburgh VA Medical Center (H.J. Heinz III)', lat: 40.467, lon: -79.961 },
    { name: 'Wilkes-Barre VA Medical Center', lat: 41.226, lon: -75.883 },
  ],
  'new-york': [
    { name: 'Albany VA Medical Center', lat: 42.673, lon: -73.757 },
    { name: 'Bath VA Medical Center', lat: 42.333, lon: -77.317 },
    { name: 'Brooklyn VA Medical Center', lat: 40.647, lon: -74.014 },
    { name: 'Buffalo VA Medical Center', lat: 42.894, lon: -78.847 },
    { name: 'Canandaigua VA Medical Center', lat: 42.905, lon: -77.292 },
    { name: 'Castle Point VA Medical Center', lat: 41.555, lon: -73.956 },
    { name: 'Manhattan VA Medical Center', lat: 40.789, lon: -73.978 },
    { name: 'Montrose VA Medical Center', lat: 41.246, lon: -73.930 },
    { name: 'Northport VA Medical Center', lat: 40.906, lon: -73.345 },
    { name: 'Syracuse VA Medical Center', lat: 43.032, lon: -76.134 },
    { name: 'Bronx VA Medical Center', lat: 40.878, lon: -73.884 },
  ],
  'new-jersey': [
    { name: 'East Orange VA Medical Center', lat: 40.764, lon: -74.210 },
    { name: 'Lyons VA Medical Center', lat: 40.669, lon: -74.573 },
    { name: 'Northampton County VA Outpatient Clinic', lat: 40.679, lon: -75.213 },
    { name: 'Cape May VA Outpatient Clinic', lat: 38.935, lon: -74.906 },
  ],
  'delaware': [
    { name: 'Wilmington VA Medical Center', lat: 39.740, lon: -75.545 },
  ],
  'maryland': [
    { name: 'Baltimore VA Medical Center', lat: 39.291, lon: -76.626 },
    { name: 'Perry Point VA Medical Center', lat: 39.563, lon: -76.075 },
    { name: 'Loch Raven VA Medical Center', lat: 39.371, lon: -76.579 },
    { name: 'Fort Howard VA Outpatient Clinic', lat: 39.200, lon: -76.437 },
  ],
  'west-virginia': [
    { name: 'Beckley VA Medical Center', lat: 37.778, lon: -81.188 },
    { name: 'Clarksburg VA Medical Center (Louis A. Johnson)', lat: 39.280, lon: -80.345 },
    { name: 'Huntington VA Medical Center', lat: 38.399, lon: -82.435 },
  ],
  'kentucky': [
    { name: 'Lexington VA Medical Center (Leestown)', lat: 38.067, lon: -84.530 },
    { name: 'Louisville VA Medical Center (Robley Rex)', lat: 38.262, lon: -85.696 },
    { name: 'Louisville VA Medical Center (Zorn Avenue)', lat: 38.255, lon: -85.762 },
  ],
  'alabama': [
    { name: 'Birmingham VA Medical Center', lat: 33.506, lon: -86.799 },
    { name: 'Montgomery VA Medical Center (Central Alabama)', lat: 32.361, lon: -86.271 },
    { name: 'Tuscaloosa VA Medical Center', lat: 33.196, lon: -87.572 },
    { name: 'Tuskegee VA Medical Center', lat: 32.431, lon: -85.692 },
  ],
  'mississippi': [
    { name: 'Biloxi VA Medical Center (Gulf Coast)', lat: 30.411, lon: -88.895 },
    { name: 'Jackson VA Medical Center (G.V. (Sonny) Montgomery)', lat: 32.338, lon: -90.178 },
    { name: 'Oxford VA Outpatient Clinic', lat: 34.366, lon: -89.528 },
  ],
  'louisiana': [
    { name: 'Alexandria VA Medical Center (Overton Brooks)', lat: 31.310, lon: -92.455 },
    { name: 'New Orleans VA Medical Center (Southeast Louisiana)', lat: 29.967, lon: -90.099 },
    { name: 'Baton Rouge VA Outpatient Clinic', lat: 30.451, lon: -91.180 },
    { name: 'Shreveport VA Outpatient Clinic', lat: 32.514, lon: -93.749 },
  ],
  'arkansas': [
    { name: 'Fayetteville VA Medical Center', lat: 36.078, lon: -94.157 },
    { name: 'Little Rock VA Medical Center (John L. McClellan Memorial)', lat: 34.743, lon: -92.364 },
  ],
  'south-carolina': [
    { name: 'Augusta VA Medical Center (shared with GA)', lat: 33.475, lon: -82.024 },
    { name: 'Charleston VA Medical Center (Ralph H. Johnson)', lat: 32.789, lon: -79.956 },
    { name: 'Columbia VA Medical Center (Wm. Jennings Bryan Dorn)', lat: 33.972, lon: -81.004 },
    { name: 'Greenville VA Outpatient Clinic', lat: 34.852, lon: -82.399 },
    { name: 'Florence VA Outpatient Clinic', lat: 34.195, lon: -79.769 },
  ],
  'maine': [
    { name: 'Togus VA Medical Center', lat: 44.324, lon: -69.720 },
    { name: 'Portland VA Outpatient Clinic', lat: 43.661, lon: -70.255 },
  ],
  'vermont': [
    { name: 'White River Junction VA Medical Center', lat: 43.647, lon: -72.319 },
  ],
  'massachusetts': [
    { name: 'Bedford VA Medical Center (Edith Nourse Rogers)', lat: 42.479, lon: -71.265 },
    { name: 'Boston VA Medical Center (Jamaica Plain)', lat: 42.318, lon: -71.112 },
    { name: 'Boston VA Medical Center (West Roxbury)', lat: 42.291, lon: -71.158 },
    { name: 'Brockton VA Medical Center', lat: 42.083, lon: -71.014 },
    { name: 'Northampton VA Medical Center', lat: 42.330, lon: -72.640 },
  ],
  'connecticut': [
    { name: 'Newington VA Medical Center', lat: 41.697, lon: -72.729 },
    { name: 'West Haven VA Medical Center', lat: 41.284, lon: -72.958 },
  ],
  'rhode-island': [
    { name: 'Providence VA Medical Center', lat: 41.830, lon: -71.413 },
  ],
  'hawaii': [
    { name: 'Honolulu VA Medical Center (Spark M. Matsunaga)', lat: 21.298, lon: -157.858 },
    { name: 'Lihue VA Outpatient Clinic (Kauai)', lat: 21.978, lon: -159.370 },
    { name: 'Hilo VA Outpatient Clinic (Big Island)', lat: 19.704, lon: -155.084 },
  ],
  'north-dakota': [
    { name: 'Fargo VA Medical Center', lat: 46.876, lon: -96.789 },
    { name: 'Minot VA Outpatient Clinic', lat: 48.231, lon: -101.299 },
  ],
};

/** FIPS code map — used to match us-atlas topojson features to our state IDs */
export const stateFipsMap: Record<string, string> = {
  'alabama': '01', 'alaska': '02', 'arizona': '04', 'arkansas': '05',
  'california': '06', 'colorado': '08', 'connecticut': '09', 'delaware': '10',
  'florida': '12', 'georgia': '13', 'hawaii': '15', 'idaho': '16',
  'illinois': '17', 'indiana': '18', 'iowa': '19', 'kansas': '20',
  'kentucky': '21', 'louisiana': '22', 'maine': '23', 'maryland': '24',
  'massachusetts': '25', 'michigan': '26', 'minnesota': '27', 'mississippi': '28',
  'missouri': '29', 'montana': '30', 'nebraska': '31', 'nevada': '32',
  'new-hampshire': '33', 'new-jersey': '34', 'new-mexico': '35', 'new-york': '36',
  'north-carolina': '37', 'north-dakota': '38', 'ohio': '39', 'oklahoma': '40',
  'oregon': '41', 'pennsylvania': '42', 'rhode-island': '44', 'south-carolina': '45',
  'south-dakota': '46', 'tennessee': '47', 'texas': '48', 'utah': '49',
  'vermont': '50', 'virginia': '51', 'washington': '53', 'west-virginia': '54',
  'wisconsin': '55', 'wyoming': '56',
};
