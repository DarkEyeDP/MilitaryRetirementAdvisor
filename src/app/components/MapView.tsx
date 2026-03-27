import { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject } from 'geojson';
import { StateData, statesData } from '../data/stateData';
import { stateFipsMap } from '../data/vaFacilityLocations';
import { useNavigate } from 'react-router';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  states: StateData[];
  customScores?: Record<string, number>;
}

const TOPO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
let topoCache: Topology | null = null;

// Reverse map: FIPS → state ID
// Include both padded ('01') and unpadded ('1') forms since topojson
// stores state IDs as numbers (String(1) = '1', not '01')
const fipsToStateId: Record<string, string> = {};
Object.entries(stateFipsMap).forEach(([id, fips]) => {
  fipsToStateId[fips] = id;                          // '01' → 'alabama'
  fipsToStateId[String(parseInt(fips, 10))] = id;    // '1'  → 'alabama'
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

export default function MapView({ states, customScores }: MapViewProps) {
  const navigate = useNavigate();
  const [usGeoJson, setUsGeoJson] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const filteredIds = useMemo(() => new Set(states.map((s) => s.id)), [states]);

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

  // Key changes when scores/filter changes so GeoJSON re-renders with new styles
  const geoJsonKey = useMemo(
    () => `${states.map((s) => s.id).join(',')}-${JSON.stringify(customScores)}`,
    [states, customScores]
  );

  // Memoized so the function reference only changes when filters/scores change —
  // not when hoveredState/tooltipPos update. This prevents react-leaflet from
  // calling layer.setStyle() on the whole GeoJSON on every hover re-render,
  // which was wiping the per-feature hover highlight immediately.
  const styleFeature = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feat: any) => {
      const fips = String(feat.id);
      const stateId = fipsToStateId[fips];
      const isVisible = stateId && filteredIds.has(stateId);
      if (!isVisible) {
        return { fillColor: '#e2e8f0', color: '#ffffff', weight: 1, fillOpacity: 0.75 };
      }
      const score = customScores?.[stateId] ?? stateById[stateId]?.retirementScore ?? 50;
      return { fillColor: getScoreColor(score), color: '#ffffff', weight: 1, fillOpacity: 0.85 };
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
        ? { fillOpacity: 0.85, weight: 1, color: '#ffffff' }
        : { fillOpacity: 0.75, weight: 1, color: '#ffffff' };

      layer.on({
        click: () => navigate(`/state/${stateId}`),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mouseover: (e: any) => {
          setHoveredState(state);
          setTooltipPos({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
          layer.setStyle({ fillOpacity: 1, weight: 3, color: '#0f172a' });
          layer.bringToFront();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mousemove: (e: any) => {
          setTooltipPos({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
        },
        mouseout: () => {
          setHoveredState(null);
          layer.setStyle(baseStyle);
        },
      });
    },
    [filteredIds, navigate],
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="h-[540px] flex items-center justify-center text-slate-400 text-sm">
          Loading map…
        </div>
      </div>
    );
  }

  const isFiltered = states.length < statesData.length;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Header + Legend */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="font-semibold text-lg">Retirement Score by State</h3>
        <div className="flex items-center gap-4 text-xs text-slate-600">
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
      </div>

      {/* Map */}
      <div
        className="rounded-lg overflow-hidden border border-slate-100"
        style={{ isolation: 'isolate' }}
      >
        <MapContainer
          center={[39.5, -98.35]}
          zoom={4}
          style={{ height: '540px', width: '100%', background: '#f1f5f9' }}
          zoomControl={true}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          {usGeoJson && (
            <GeoJSON
              key={geoJsonKey}
              data={usGeoJson}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Hover to preview · Click any state to view full retirement details
      </p>

      {/* Hover tooltip — rendered outside map container to avoid z-index issues */}
      {hoveredState && (
        <div
          className="fixed z-[9999] pointer-events-none bg-white border border-slate-200 rounded-lg shadow-xl p-3 min-w-[190px]"
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y - 10 }}
        >
          <div className="font-semibold text-sm mb-1.5">{hoveredState.name}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Score</span>
              <span
                className="font-bold"
                style={{
                  color: getScoreColor(
                    customScores?.[hoveredState.id] ?? hoveredState.retirementScore
                  ),
                }}
              >
                {customScores?.[hoveredState.id] ?? hoveredState.retirementScore}
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Pension Tax</span>
              <span className="font-medium text-slate-800">
                {hoveredState.militaryPensionTax === 'No'
                  ? 'Exempt'
                  : hoveredState.militaryPensionTax}
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-500">Cost of Living</span>
              <span className="font-medium text-slate-800">
                {hoveredState.costOfLivingIndex}
              </span>
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
