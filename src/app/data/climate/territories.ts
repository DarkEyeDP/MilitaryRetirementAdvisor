/**
 * Climate data — DC and US Territories
 * DC PR GU VI AS MP
 *
 * Sources: NOAA Climate Normals (1991–2020), FEMA National Risk Index.
 */
import type { StateClimateData } from './types';

export const territoriesClimate: Record<string, StateClimateData> = {
  'dc': {
    avgSummerHighF: 88,
    avgWinterLowF: 28,
    humidity: 'High',
    annualRainfallInches: 41,
    extremeHeatDays: 18,
    extremeColdDays: 12,
    disasterRisk: {
      hurricane: 'Low',
      wildfire: 'None',
      flood: 'Moderate',
      tornado: 'Low',
      earthquake: 'Low',
      winterStorm: 'Moderate',
    },
  },
  'puerto-rico': {
    avgSummerHighF: 90,
    avgWinterLowF: 68,
    humidity: 'High',
    annualRainfallInches: 63,
    extremeHeatDays: 40,
    extremeColdDays: 0,
    disasterRisk: {
      hurricane: 'High',
      wildfire: 'None',
      flood: 'High',
      tornado: 'Low',
      earthquake: 'Moderate',
      winterStorm: 'None',
    },
  },
  'guam': {
    avgSummerHighF: 88,
    avgWinterLowF: 74,
    humidity: 'High',
    annualRainfallInches: 95,
    extremeHeatDays: 30,
    extremeColdDays: 0,
    disasterRisk: {
      hurricane: 'High',
      wildfire: 'None',
      flood: 'Moderate',
      tornado: 'None',
      earthquake: 'Moderate',
      winterStorm: 'None',
    },
  },
  'us-virgin-islands': {
    avgSummerHighF: 88,
    avgWinterLowF: 70,
    humidity: 'High',
    annualRainfallInches: 52,
    extremeHeatDays: 35,
    extremeColdDays: 0,
    disasterRisk: {
      hurricane: 'High',
      wildfire: 'None',
      flood: 'Moderate',
      tornado: 'None',
      earthquake: 'Low',
      winterStorm: 'None',
    },
  },
  'american-samoa': {
    avgSummerHighF: 87,
    avgWinterLowF: 75,
    humidity: 'High',
    annualRainfallInches: 120,
    extremeHeatDays: 10,
    extremeColdDays: 0,
    disasterRisk: {
      hurricane: 'Moderate',
      wildfire: 'None',
      flood: 'Moderate',
      tornado: 'None',
      earthquake: 'Moderate',
      winterStorm: 'None',
    },
  },
  'northern-mariana-islands': {
    avgSummerHighF: 86,
    avgWinterLowF: 73,
    humidity: 'High',
    annualRainfallInches: 82,
    extremeHeatDays: 15,
    extremeColdDays: 0,
    disasterRisk: {
      hurricane: 'High',
      wildfire: 'None',
      flood: 'Moderate',
      tornado: 'None',
      earthquake: 'Moderate',
      winterStorm: 'None',
    },
  },
};
