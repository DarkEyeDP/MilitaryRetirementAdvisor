import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Pane, useMap, useMapEvents } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject } from 'geojson';
import { StateData, statesData } from '../data/stateData';
import { stateFipsMap, vaFacilityLocations } from '../data/vaFacilityLocations';
import { militaryInstallations } from '../data/militaryInstallations';
import { spaceATerminals } from '../data/spaceATerminals';
import { useNavigate } from 'react-router';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  states: StateData[];
  customScores?: Record<string, number>;
}

const TOPO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
let topoCache: Topology | null = null;

const VAMC_COLOR = '#1d4ed8';
const CLINIC_COLOR = '#16a34a';
const SPACE_A_COLOR = '#7c3aed';
const INSTALLATION_COLOR = '#4b5320';

const fipsToStateId: Record<string, string> = {};
Object.entries(stateFipsMap).forEach(([id, fips]) => {
  fipsToStateId[fips] = id;
  fipsToStateId[String(parseInt(fips, 10))] = id;
});

const stateById: Record<string, StateData> = Object.fromEntries(
  statesData.map((s) => [s.id, s])
);

const getScoreColor = (score: number) => {
  if (score >= 90) return '#22c55e';
  if (score >= 80) return '#3b82f6';
  if (score >= 70) return '#eab308';
  return '#94a3b8';
};

// Ray-casting point-in-polygon for GeoJSON ring coordinates [lng, lat]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pointInPolygon(point: [number, number], rings: any[][][]): boolean {
  const [lng, lat] = point;
  const outer = rings[0];
  let inside = false;
  for (let i = 0, j = outer.length - 1; i < outer.length; j = i++) {
    const [xi, yi] = outer[i];
    const [xj, yj] = outer[j];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// Detects which state is under the map center — used by the mobile crosshair
function CrosshairTracker({
  features,
  onStateChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[];
  onStateChange: (state: StateData | null) => void;
}) {
  const map = useMap();

  const detect = useCallback(() => {
    const { lng, lat } = map.getCenter();
    const pt: [number, number] = [lng, lat];
    for (const feat of features) {
      const stateId = fipsToStateId[String(feat.id)];
      const state = stateId ? stateById[stateId] : null;
      if (!state) continue;
      const geom = feat.geometry;
      let found = false;
      if (geom.type === 'Polygon') {
        found = pointInPolygon(pt, geom.coordinates);
      } else if (geom.type === 'MultiPolygon') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        found = geom.coordinates.some((poly: any[][][]) => pointInPolygon(pt, poly));
      }
      if (found) { onStateChange(state); return; }
    }
    onStateChange(null);
  }, [map, features, onStateChange]);

  useMapEvents({ moveend: detect, zoomend: detect });
  useEffect(() => { detect(); }, [detect]);
  return null;
}

const vamcIcon = L.divIcon({
  html: `<div style="background:${VAMC_COLOR};border-radius:50%;width:16px;height:16px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

const clinicIcon = L.divIcon({
  html: `<div style="background:${CLINIC_COLOR};border-radius:50%;width:12px;height:12px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
  className: '',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -8],
});

const planeIcon = L.divIcon({
  html: `<div style="background:${SPACE_A_COLOR};color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:13px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);line-height:1">✈</div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
});

const installationIcon = L.divIcon({
  html: `<div style="background:${INSTALLATION_COLOR};color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:13px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);line-height:1">★</div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
});

function ToggleButton({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
        active
          ? 'border-transparent text-white'
          : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
      }`}
      style={active ? { backgroundColor: color, borderColor: color } : {}}
    >
      {children}
    </button>
  );
}

export default function MapView({ states, customScores }: MapViewProps) {
  const navigate = useNavigate();
  const [usGeoJson, setUsGeoJson] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [crosshairState, setCrosshairState] = useState<StateData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersByStateId = useRef<Record<string, any>>({});
  const prevCrosshairRef = useRef<StateData | null>(null);

  const [showVAMC, setShowVAMC] = useState(false);
  const [showClinics, setShowClinics] = useState(false);
  const [showInstallations, setShowInstallations] = useState(false);
  const [showSpaceA, setShowSpaceA] = useState(false);

  const filteredIds = useMemo(() => new Set(states.map((s) => s.id)), [states]);

  // GeoJSON features extracted for crosshair point-in-polygon detection
  const geoJsonFeatures = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (usGeoJson ? (usGeoJson as any).features ?? [] : []),
    [usGeoJson]
  );

  useEffect(() => {
    async function load() {
      try {
        if (!topoCache) {
          const res = await fetch(TOPO_URL);
          topoCache = (await res.json()) as Topology;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collection = feature(topoCache, (topoCache as any).objects.states);
        setUsGeoJson(collection as GeoJsonObject);
      } catch {
        // silent — map just won't render
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const geoJsonKey = useMemo(
    () => `${states.map((s) => s.id).join(',')}-${JSON.stringify(customScores)}`,
    [states, customScores]
  );

  const styleFeature = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feat: any) => {
      const fips = String(feat.id);
      const stateId = fipsToStateId[fips];
      const isVisible = stateId && filteredIds.has(stateId);
      if (!isVisible) {
        return { fillColor: '#e2e8f0', color: '#ffffff', weight: 1, fillOpacity: 0.6 };
      }
      const score = customScores?.[stateId] ?? stateById[stateId]?.retirementScore ?? 50;
      return { fillColor: getScoreColor(score), color: '#ffffff', weight: 1, fillOpacity: 0.65 };
    },
    [filteredIds, customScores],
  );

  const onEachFeature = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feat: any, layer: any) => {
      const fips = String(feat.id);
      const stateId = fipsToStateId[fips];
      const state = stateId ? stateById[stateId] : null;
      if (!state) return;

      const isVisible = filteredIds.has(stateId);
      const baseStyle = isVisible
        ? { fillOpacity: 0.65, weight: 1, color: '#ffffff' }
        : { fillOpacity: 0.6, weight: 1, color: '#ffffff' };

      layersByStateId.current[stateId] = { layer, baseStyle };

      layer.on({
        // Mobile uses crosshair + "View full details" button — disable tap-to-navigate
        click: () => {
          if (window.innerWidth >= 768) navigate(`/state/${stateId}`);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mouseover: (e: any) => {
          if (window.innerWidth < 768) return;
          setHoveredState(state);
          setTooltipPos({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
          layer.setStyle({ fillOpacity: 0.85, weight: 3, color: '#0f172a' });
          layer.bringToFront();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mousemove: (e: any) => {
          if (window.innerWidth < 768) return;
          setTooltipPos({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
        },
        mouseout: () => {
          if (window.innerWidth < 768) return;
          setHoveredState(null);
          layer.setStyle(baseStyle);
        },
      });
    },
    [filteredIds, navigate],
  );

  // Apply/remove the bold-border highlight on the GeoJSON layer matching the crosshair state (mobile only)
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const prev = prevCrosshairRef.current;
    if (prev) {
      const entry = layersByStateId.current[prev.id];
      if (entry) entry.layer.setStyle(entry.baseStyle);
    }
    if (crosshairState) {
      const entry = layersByStateId.current[crosshairState.id];
      if (entry) {
        entry.layer.setStyle({ fillOpacity: 0.85, weight: 3, color: '#0f172a' });
        entry.layer.bringToFront();
      }
    }
    prevCrosshairRef.current = crosshairState;
  }, [crosshairState]);

  const allFacilities = useMemo(() => Object.values(vaFacilityLocations).flat(), []);
  const allInstallations = militaryInstallations;

  if (loading) {
    return (
      <div className="md:bg-white md:rounded-lg md:border md:border-slate-200 md:p-6">
        <div className="h-[540px] flex items-center justify-center text-slate-400 text-sm">
          Loading map…
        </div>
      </div>
    );
  }

  const isFiltered = states.length < statesData.length;

  return (
    <div className="md:bg-white md:rounded-lg md:border md:border-slate-200 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
        <h3 className="font-semibold text-lg">Retirement Score by State</h3>
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span className="text-[10px] text-slate-400 italic">Click to toggle layers</span>
          <div className="flex items-center gap-2 flex-wrap justify-start md:justify-end">
          <ToggleButton active={showVAMC} color={VAMC_COLOR} onClick={() => setShowVAMC((v) => !v)}>
            <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: showVAMC ? 'white' : VAMC_COLOR }} />
            VA Med Centers
          </ToggleButton>
          <ToggleButton active={showClinics} color={CLINIC_COLOR} onClick={() => setShowClinics((v) => !v)}>
            <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: showClinics ? 'white' : CLINIC_COLOR }} />
            VA Clinics
          </ToggleButton>
          <ToggleButton active={showInstallations} color={INSTALLATION_COLOR} onClick={() => setShowInstallations((v) => !v)}>
            ★ Installations
          </ToggleButton>
          <ToggleButton active={showSpaceA} color={SPACE_A_COLOR} onClick={() => setShowSpaceA((v) => !v)}>
            ✈ Space-A
          </ToggleButton>
          </div>
        </div>
      </div>

      {/* Score legend */}
      <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 flex-wrap">
        <span className="text-slate-400 font-medium uppercase tracking-wide">Score</span>
        {[
          { label: '90+', color: '#22c55e' },
          { label: '80–89', color: '#3b82f6' },
          { label: '70–79', color: '#eab308' },
          { label: '<70', color: '#94a3b8' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span>{label}</span>
          </div>
        ))}
        {isFiltered && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slate-200" />
            <span>Filtered out</span>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative rounded-lg overflow-hidden border border-slate-100" style={{ isolation: 'isolate' }}>
        <MapContainer
          center={[39.5, -98.35]}
          zoom={4}
          style={{ height: '540px', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={false}
          attributionControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Pane name="states-choropleth" style={{ zIndex: 300 }}>
            {usGeoJson && (
              <GeoJSON key={geoJsonKey} data={usGeoJson} style={styleFeature} onEachFeature={onEachFeature} />
            )}
          </Pane>

          {/* Crosshair state tracker — runs whenever map moves */}
          {geoJsonFeatures.length > 0 && (
            <CrosshairTracker features={geoJsonFeatures} onStateChange={setCrosshairState} />
          )}

          {showVAMC && allFacilities.filter((f) => f.type !== 'clinic').map((f, i) => (
            <Marker key={`vamc-${i}`} position={[f.lat, f.lon]} icon={vamcIcon}>
              <Popup>
                <div className="text-sm leading-snug max-w-[220px] space-y-1">
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-xs text-gray-500 italic">VA Medical Center</div>
                  {f.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(f.address)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline block">{f.address}</a>}
                  {f.phone && <a href={`tel:${f.phone.replace(/\D/g, '')}`} className="text-xs text-blue-600 hover:underline block">{f.phone}</a>}
                </div>
              </Popup>
            </Marker>
          ))}

          {showClinics && allFacilities.filter((f) => f.type === 'clinic').map((f, i) => (
            <Marker key={`clinic-${i}`} position={[f.lat, f.lon]} icon={clinicIcon}>
              <Popup>
                <div className="text-sm leading-snug max-w-[220px] space-y-1">
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-xs text-gray-500 italic">VA Outpatient Clinic</div>
                  {f.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(f.address)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline block">{f.address}</a>}
                  {f.phone && <a href={`tel:${f.phone.replace(/\D/g, '')}`} className="text-xs text-blue-600 hover:underline block">{f.phone}</a>}
                </div>
              </Popup>
            </Marker>
          ))}

          {showInstallations && allInstallations.map((inst) => (
            <Marker key={inst.id} position={[inst.lat, inst.lon]} icon={installationIcon}>
              <Popup>
                <div className="text-sm leading-snug max-w-[240px] space-y-1">
                  <div className="font-semibold">{inst.name}</div>
                  <div className="text-xs font-medium" style={{ color: INSTALLATION_COLOR }}>Military Installation</div>
                </div>
              </Popup>
            </Marker>
          ))}

          {showSpaceA && spaceATerminals.map((terminal) => (
            <Marker key={terminal.id} position={[terminal.lat, terminal.lon]} icon={planeIcon}>
              <Popup>
                <div className="text-sm leading-snug max-w-[240px] space-y-1">
                  <div className="font-semibold">{terminal.name}</div>
                  <div className="text-xs text-violet-700 font-medium">AMC Space-A Terminal</div>
                  {terminal.phone && <a href={`tel:${terminal.phone.replace(/\D/g, '')}`} className="text-xs text-blue-600 hover:underline block">{terminal.phone}</a>}
                  <a href={terminal.amcUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline block">AMC Terminal Info →</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Mobile crosshair — pointer-events-none so all touches pass through to the map */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
            style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.65))' }}>
            <circle cx="22" cy="22" r="17" stroke="white" strokeWidth="2.5" />
            <circle cx="22" cy="22" r="3" fill="white" />
            <line x1="22" y1="2" x2="22" y2="9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="35" x2="22" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="2" y1="22" x2="9" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="35" y1="22" x2="42" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Mobile state preview card — pinned to bottom of map, pointer-events-auto for the button */}
        {crosshairState && (
          <div className="md:hidden absolute bottom-8 left-3 right-3 z-[1000] bg-white border border-slate-200 rounded-xl shadow-xl p-3 pointer-events-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-slate-900">{crosshairState.name}</span>
              <span className="text-sm font-bold"
                style={{ color: getScoreColor(customScores?.[crosshairState.id] ?? crosshairState.retirementScore) }}>
                {customScores?.[crosshairState.id] ?? crosshairState.retirementScore}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-xs mb-3">
              <div>
                <p className="text-slate-400">Pension Tax</p>
                <p className="font-medium text-slate-800">
                  {crosshairState.militaryPensionTax === 'No' ? 'Exempt' : crosshairState.militaryPensionTax}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Income Tax</p>
                <p className="font-medium text-slate-800">
                  {crosshairState.stateIncomeTax === 0 ? 'None' : `${crosshairState.stateIncomeTax}%`}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Cost of Living</p>
                <p className="font-medium text-slate-800">{crosshairState.costOfLivingIndex}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/state/${crosshairState.id}`)}
              className="w-full text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors"
            >
              View full details →
            </button>
          </div>
        )}
      </div>

      {/* Hint text */}
      <p className="hidden md:block mt-3 text-center text-xs text-slate-400">
        Hover to preview · Click any state to view full retirement details · Click markers for details
      </p>
      <p className="md:hidden mt-3 text-center text-xs text-slate-400">
        Pan to aim crosshair · Tap &quot;View full details&quot; to navigate · Tap markers for info
      </p>

      {/* Desktop hover tooltip */}
      {hoveredState && (
        <div
          className="fixed z-[9999] pointer-events-none bg-white border border-slate-200 rounded-lg shadow-xl p-3 min-w-[190px]"
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y - 10 }}
        >
          <div className="font-semibold text-sm mb-1.5">{hoveredState.name}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Score</span>
              <span className="font-bold" style={{ color: getScoreColor(customScores?.[hoveredState.id] ?? hoveredState.retirementScore) }}>
                {customScores?.[hoveredState.id] ?? hoveredState.retirementScore}
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Pension Tax</span>
              <span className="font-medium text-slate-800">
                {hoveredState.militaryPensionTax === 'No' ? 'Exempt' : hoveredState.militaryPensionTax}
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Cost of Living</span>
              <span className="font-medium text-slate-800">{hoveredState.costOfLivingIndex}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Income Tax</span>
              <span className="font-medium text-slate-800">
                {hoveredState.stateIncomeTax === 0 ? 'None' : `${hoveredState.stateIncomeTax}%`}
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-blue-600 font-medium">
            Click to view full details →
          </div>
        </div>
      )}
    </div>
  );
}
