export interface StateData {
  id: string;
  name: string;
  abbreviation: string;
  militaryPensionTax: 'Yes' | 'No' | 'Partial';
  stateIncomeTax: number;
  propertyTaxLevel: 'Low' | 'Medium' | 'High';
  propertyTaxExemption100: 'Full' | 'Partial' | 'None';
  costOfLivingIndex: number;
  veteranBenefitsScore: number;
  retirementScore: number;
  salesTax: number;
  militaryBenefits: string[];
  vaFacilities: number;
  veteranPopulation: number;
  pros: string[];
  cons: string[];
  avgHomeCost: number;
  coordinates: { x: number; y: number };
  /**
   * Puerto Rico only — IRC §933 exempts bona fide PR residents from federal income
   * tax on income earned from Puerto Rico sources (wages, rental, business income).
   * Military pension is still subject to federal tax (US-source income).
   */
  prFederalExemption?: boolean;
}
