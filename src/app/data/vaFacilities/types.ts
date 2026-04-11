export interface VAFacility {
  name: string;
  lat: number;
  lon: number;
  address?: string;
  phone?: string;
  type?: 'vamc' | 'clinic';
}
