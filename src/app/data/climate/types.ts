export type RiskLevel = 'None' | 'Low' | 'Moderate' | 'High';
export type HumidityLevel = 'Low' | 'Moderate' | 'High';

/**
 * Climate profile for a specific geographic region within a state.
 * Populated only for states with significant intra-state climate variation.
 */
export interface RegionClimateData {
  region: string;
  avgSummerHighF: number;
  avgWinterLowF: number;
  humidity: HumidityLevel;
  annualRainfallInches: number;
  extremeHeatDays: number;
  extremeColdDays: number;
}

export interface StateClimateData {
  avgSummerHighF: number;
  avgWinterLowF: number;
  humidity: HumidityLevel;
  annualRainfallInches: number;
  extremeHeatDays: number;
  extremeColdDays: number;
  disasterRisk: {
    hurricane: RiskLevel;
    wildfire: RiskLevel;
    flood: RiskLevel;
    tornado: RiskLevel;
    earthquake: RiskLevel;
    winterStorm: RiskLevel;
  };
  /** Regional breakdowns for states with significant geographic climate variation. */
  regions?: RegionClimateData[];
}
