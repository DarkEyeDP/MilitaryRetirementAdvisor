/**
 * ComparisonMap — renders multiple states highlighted with VA markers for each.
 *
 * Shows all 50 states as a light gray base layer. Highlighted states appear
 * in distinct colors (blue, green, amber) with their VA facility markers.
 */

import { useEffect, useRef, useState } from 'react';
import { MapContainer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject, Feature, FeatureCollection } from 'geojson';
import { vaFacilityLocations, stateFipsMap } from '../data/vaFacilityLocations';
import 'leaflet/dist/leaflet.css';

interface Props {
  stateIds: string[]; // up to 3 state IDs
}

const STATE_COLORS = ['#1d4ed8', '#16a34a', '#d97706']; // blue, green, amber
const STATE_FILL = ['#dbeafe', '#dcfce7', '#fef3c7'];
const STATE_NAME_COLORS = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-green-100', text: 'text-green-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
];

const TOPO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// Simple cache so we only fetch once per session
let topoCache: Topology | null = null;

// Fit the map to bounds of all highlighted states
function FitBoundsMulti({ geojsons }: { geojsons: GeoJsonObject[] }) {
  const map = useMap();
  useEffect(() => {
    if (geojsons.length === 0) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L) return;
      let combinedBounds: ReturnType<typeof L.latLngBounds> | null = null;
      for (const gj of geojsons) {
        const layer = L.geoJSON(gj);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          if (combinedBounds === null) {
            combinedBounds = bounds;
          } else {
            combinedBounds.extend(bounds);
          }
        }
      }
      if (combinedBounds && combinedBounds.isValid()) {
        map.fitBounds(combinedBounds, { padding: [40, 60] });
      }
    } catch {
      // bounds fit is best-effort
    }
  }, [geojsons, map]);
  return null;
}

export default function ComparisonMap({ stateIds }: Props) {
  const [allStatesGeojson, setAllStatesGeojson] = useState<GeoJsonObject | null>(null);
  const [highlightedGeojsons, setHighlightedGeojsons] = useState<(GeoJsonObject | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoJsonRefs = useRef<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        if (!topoCache) {
          const res = await fetch(TOPO_URL);
          topoCache = (await res.json()) as Topology;
        }
        const topo = topoCache;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const statesCollection = feature(topo, (topo as any).objects.states) as FeatureCollection;

        // Full 50-state base layer
        setAllStatesGeojson(statesCollection);

        // Find individual highlighted state features
        const highlighted = stateIds.map((stateId) => {
          const fips = stateFipsMap[stateId];
          if (!fips) return null;
          const unpaddedFips = String(parseInt(fips, 10));
          const stateFeature: Feature | undefined = statesCollection.features.find(
            (f: Feature) => String(f.id) === unpaddedFips
          );
          return stateFeature ?? null;
        });

        setHighlightedGeojsons(highlighted);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [stateIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-slate-100 flex items-center justify-center" style={{ height: 500 }}>
        <div className="text-slate-500 text-sm">Loading map…</div>
      </div>
    );
  }

  if (error || !allStatesGeojson) {
    return (
      <div className="w-full rounded-xl bg-slate-100 flex items-center justify-center" style={{ height: 500 }}>
        <div className="text-slate-500 text-sm">Map unavailable</div>
      </div>
    );
  }

  const baseStyle = {
    color: '#cbd5e1',
    weight: 1,
    fillColor: '#f1f5f9',
    fillOpacity: 1,
  };

  const validHighlighted = highlightedGeojsons.filter((g): g is GeoJsonObject => g !== null);

  return (
    <div style={{ isolation: 'isolate' }}>
      <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <MapContainer
          center={[39.5, -98.35]}
          zoom={4}
          style={{ height: '500px', width: '100%', background: '#e8f4f8' }}
          zoomControl={true}
          attributionControl={true}
          scrollWheelZoom={false}
        >
          {/* Base layer — all 50 states in light gray */}
          <GeoJSON data={allStatesGeojson} style={baseStyle} />

          {/* Highlighted states */}
          {highlightedGeojsons.map((gj, idx) => {
            if (!gj) return null;
            return (
              <GeoJSON
                key={stateIds[idx]}
                ref={(el) => { geoJsonRefs.current[idx] = el; }}
                data={gj}
                style={{
                  color: STATE_COLORS[idx],
                  weight: 2.5,
                  fillColor: STATE_FILL[idx],
                  fillOpacity: 0.4,
                }}
              />
            );
          })}

          {/* VA facility markers for each compared state */}
          {stateIds.map((stateId, stateIdx) => {
            const facilities = vaFacilityLocations[stateId] ?? [];
            const color = STATE_COLORS[stateIdx];
            return facilities.map((facility, i) => {
              const isClinic = facility.type === 'clinic';
              return (
                <CircleMarker
                  key={`${stateId}-${i}`}
                  center={[facility.lat, facility.lon]}
                  radius={isClinic ? 5 : 7}
                  pathOptions={{
                    color: '#ffffff',
                    weight: 2,
                    fillColor: color,
                    fillOpacity: 0.9,
                  }}
                >
                  <Popup>
                    <div className="text-sm leading-snug max-w-[220px] space-y-1">
                      <div className="font-semibold">{facility.name}</div>
                      <div className="text-xs text-gray-500 italic">
                        {isClinic ? 'VA Outpatient Clinic' : 'VA Medical Center'}
                      </div>
                      {facility.address && (
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(facility.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline block"
                        >
                          {facility.address}
                        </a>
                      )}
                      {facility.phone && (
                        <a
                          href={`tel:${facility.phone.replace(/\D/g, '')}`}
                          className="text-xs text-blue-600 hover:underline block"
                        >
                          {facility.phone}
                        </a>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            });
          })}

          <FitBoundsMulti geojsons={validHighlighted} />
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4">
        {stateIds.map((stateId, idx) => {
          const facilities = vaFacilityLocations[stateId] ?? [];
          const vamcCount = facilities.filter((f) => f.type !== 'clinic').length;
          const clinicCount = facilities.filter((f) => f.type === 'clinic').length;
          const color = STATE_COLORS[idx];
          const nameColor = STATE_NAME_COLORS[idx];
          // Get state name from stateId (title-case conversion)
          const stateName = stateId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <div key={stateId} className="flex items-center gap-2 text-sm text-slate-600">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className={`font-medium px-2 py-0.5 rounded text-xs ${nameColor.bg} ${nameColor.text}`}>
                {stateName}
              </span>
              <span className="text-xs text-slate-500">
                {vamcCount} VAMCs · {clinicCount} Clinics
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
