/**
 * veteranScore.ts
 *
 * Computes veteran-related stats dynamically from live data files so that
 * editing vaFacilityLocations.ts, militaryInstallations.ts, or
 * veteranPerksData.ts automatically updates scores everywhere.
 *
 * Formula (0–100):
 *   VAMCs                — up to 30 pts  (each VAMC = 4 pts, capped at 30)
 *   Clinics              — up to 15 pts  (each clinic = 2 pts, capped at 15)
 *   Military installs    — up to 10 pts  (each install = 2 pts, capped at 10)
 *   Reg/License perks    — up to 10 pts  (each benefit = 2 pts, capped at 10)
 *   Medal benefits       — up to 10 pts  (each benefit = 2 pts, capped at 10)
 *   Education programs   — up to 15 pts  (each program = 2 pts, capped at 15)
 *   Prop tax exemption   — up to 10 pts  (Full=10, Partial=6, None=0)
 *                                         ─────────────────────────────────
 *                                         Total max = 100
 */

import { vaFacilityLocations } from './vaFacilityLocations';
import { militaryInstallations } from './militaryInstallations';
import { stateVeteranPerks } from './veteranPerksData';
import type { StateData } from './stateData';
import { calculateCustomScore } from './stateData';

export interface VAStats {
  vamcCount: number;
  clinicCount: number;
  totalFacilities: number;
}

export function getVAStats(stateId: string): VAStats {
  const facilities = vaFacilityLocations[stateId] ?? [];
  const vamcCount = facilities.filter((f) => f.type !== 'clinic').length;
  const clinicCount = facilities.filter((f) => f.type === 'clinic').length;
  return { vamcCount, clinicCount, totalFacilities: vamcCount + clinicCount };
}

export function getInstallationCount(stateId: string): number {
  return militaryInstallations.filter((i) => i.stateId === stateId).length;
}

export function computeVeteranBenefitsScore(state: StateData, perCapita = false): number {
  const { vamcCount, clinicCount } = getVAStats(state.id);
  const installCount = getInstallationCount(state.id);
  const perks = stateVeteranPerks[state.id];

  const regCount   = perks?.vehicleRegistrationBenefits.length ?? 0;
  const medalCount = perks?.medalBenefits.length ?? 0;
  const eduCount   = perks
    ? perks.educationBenefits.retiree.length + perks.educationBenefits.family.length
    : 0;

  let vamcPts: number, clinicPts: number, installPts: number;
  if (perCapita) {
    // Normalize by veteran population (per 100k veterans) so small states that
    // proportionally serve their veterans well aren't penalized against large-population states.
    const pop100k = Math.max(state.veteranPopulation, 1) / 100_000;
    vamcPts    = Math.min((vamcCount    / pop100k) * 12, 30);
    clinicPts  = Math.min((clinicCount  / pop100k) * 6,  15);
    installPts = Math.min((installCount / pop100k) * 6,  10);
  } else {
    // Raw count mode — rewards states with more absolute facilities/installations.
    vamcPts    = Math.min(vamcCount    * 4, 30);
    clinicPts  = Math.min(clinicCount  * 2, 15);
    installPts = Math.min(installCount * 2, 10);
  }

  const regPts     = Math.min(regCount   * 2, 10);
  const medalPts   = Math.min(medalCount * 2, 10);
  const eduPts     = Math.min(eduCount   * 2, 15);
  const propTaxPts = state.propertyTaxExemption100 === 'Full'    ? 10
                   : state.propertyTaxExemption100 === 'Partial' ? 6
                   : 0;

  return Math.round(Math.min(100, vamcPts + clinicPts + installPts + regPts + medalPts + eduPts + propTaxPts));
}

/**
 * Drop-in replacement for calculateCustomScore that uses the live-computed
 * veteran benefits score instead of the static stateData value.
 * Use this everywhere instead of calculateCustomScore directly.
 */
export function calculateScore(
  state: StateData,
  weights: { taxes: number; cost: number; benefits: number },
  perCapita = false
): number {
  const liveState = { ...state, veteranBenefitsScore: computeVeteranBenefitsScore(state, perCapita) };
  return calculateCustomScore(liveState, weights);
}
