import { motion } from 'motion/react';
import { Building2, MapPin } from 'lucide-react';
import { Tabs, TabsContent } from '../../components/ui/tabs';
import StateShapeMap from '../../components/StateShapeMap';
import type { StateData } from '../../data/stateData';
import type { VAFacility } from '../../data/vaFacilityLocations';
import type { MilitaryInstallation } from '../../data/militaryInstallations';

interface FacilitiesSectionProps {
  state: StateData;
  vamcs: VAFacility[];
  clinics: VAFacility[];
  stateInstallations: MilitaryInstallation[];
  allFacilitiesCount: number;
  resourceTab: 'va' | 'installations';
  showInstallations: boolean;
  hoveredFacilityName: string | null;
  hoveredInstallationId: string | null;
  facilityPanelHeight: number;
  directoryHeight: number;
  onResourceTabChange: (v: 'va' | 'installations') => void;
  onHoverFacility: (name: string | null) => void;
  onHoverInstallation: (id: string | null) => void;
}

export function FacilitiesSection({
  state, vamcs, clinics, stateInstallations, allFacilitiesCount,
  resourceTab, showInstallations, hoveredFacilityName, hoveredInstallationId,
  facilityPanelHeight, directoryHeight,
  onResourceTabChange, onHoverFacility, onHoverInstallation,
}: FacilitiesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="relative isolate">
        <div className="absolute top-3 right-3 z-[400] flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm border border-slate-200/80">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700">VA Facilities Map</span>
        </div>
        <StateShapeMap
          key={state.id}
          stateId={state.id}
          stateName={state.name}
          height={facilityPanelHeight}
          showInstallations={showInstallations}
          onShowInstallationsChange={(v) => onResourceTabChange(v ? 'installations' : 'va')}
          hoveredFacilityName={hoveredFacilityName}
          hoveredInstallationId={hoveredInstallationId}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col" style={{ height: directoryHeight }}>
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 flex-shrink-0 -mx-4 px-4">
          <MapPin className="w-4 h-4 text-blue-600" />
          Military Resources
          <span className="ml-auto text-xs font-normal text-slate-400">Tap to open in Maps</span>
        </h2>

        <Tabs value={resourceTab} onValueChange={(v) => onResourceTabChange(v as 'va' | 'installations')} className="flex flex-col flex-1 min-h-0">
          <div className="flex rounded-full bg-slate-100 p-1 mb-3 flex-shrink-0 text-xs font-medium">
            {([
              { value: 'va' as const, label: `VA Facilities (${allFacilitiesCount})` },
              { value: 'installations' as const, label: `Installations (${stateInstallations.length})` },
            ]).map(({ value, label }) => {
              const active = resourceTab === value;
              return (
                <button
                  key={value}
                  onClick={() => onResourceTabChange(value)}
                  className={`relative flex-1 px-3 py-1.5 rounded-full transition-colors z-10 ${active ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {active && (
                    <motion.div
                      layoutId="resource-tab-pill"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>

          <TabsContent value="va" className="flex-1 overflow-y-auto mt-0">
            <div className="space-y-4">
              {vamcs.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                    Medical Centers ({vamcs.length})
                  </div>
                  <ul className={vamcs.length > 6 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                    {vamcs.map((f, i) => (
                      <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline py-0.5"
                          onMouseEnter={() => onHoverFacility(f.name)}
                          onMouseLeave={() => onHoverFacility(null)}
                        >
                          <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{f.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {clinics.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                    Clinics ({clinics.length})
                  </div>
                  <ul className={clinics.length > 6 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                    {clinics.map((f, i) => (
                      <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: (vamcs.length + i) * 0.04, ease: 'easeOut' }}>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-green-600 hover:text-green-800 hover:underline py-0.5"
                          onMouseEnter={() => onHoverFacility(f.name)}
                          onMouseLeave={() => onHoverFacility(null)}
                        >
                          <MapPin className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{f.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {allFacilitiesCount === 0 && (
                <p className="text-sm text-slate-400 italic">No facility data available.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="installations" className="flex-1 overflow-y-auto mt-0">
            {stateInstallations.length > 0 ? (
              <ul className={stateInstallations.length > 8 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                {stateInstallations.map((inst, i) => (
                  <motion.li key={inst.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(inst.name + ', ' + state.name)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-2 text-sm hover:underline py-0.5"
                      style={{ color: '#4b5320' }}
                      onMouseEnter={() => onHoverInstallation(inst.id)}
                      onMouseLeave={() => onHoverInstallation(null)}
                    >
                      <span className="flex-shrink-0 mt-0.5" style={{ color: '#7a8c3a' }}>★</span>
                      <span>{inst.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic">No installation data available for this state yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
