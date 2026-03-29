/**
 * ComparisonMap — renders multiple states highlighted with VA markers for each.
 *
 * Shows all 50 states as a light gray base layer. Highlighted states appear
 * in distinct colors (blue, green, amber) with their VA facility markers.
 */

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject, Feature, FeatureCollection } from 'geojson';
import { vaFacilityLocations, stateFipsMap } from '../data/vaFacilityLocations';
import 'leaflet/dist/leaflet.css';

interface Props {
  stateIds: string[]; // up to 3 state IDs
}

// Per-state border/fill colors for the boundary outlines
const STATE_BORDER_COLORS = ['#1d4ed8', '#16a34a', '#d97706'];
const STATE_FILL_COLORS = ['#dbeafe', '#dcfce7', '#fef3c7'];

// VA marker colors — same as StateShapeMap (VAMC=blue, clinic=green)
const VAMC_COLOR = '#1d4ed8';
const CLINIC_COLOR = '#16a34a';

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

  if (error) {
    return (
      <div className="w-full rounded-xl bg-slate-100 flex items-center justify-center" style={{ height: 500 }}>
        <div className="text-slate-500 text-sm">Map unavailable</div>
      </div>
    );
  }

  const validHighlighted = highlightedGeojsons.filter((g): g is GeoJsonObject => g !== null);

  // Lookup state names for legend
  const stateNames = stateIds.map((id) =>
    id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ isolation: 'isolate' }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ height: '480px', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Highlighted state boundaries */}
        {highlightedGeojsons.map((gj, idx) => {
          if (!gj) return null;
          return (
            <GeoJSON
              key={stateIds[idx]}
              ref={(el) => { geoJsonRefs.current[idx] = el; }}
              data={gj}
              style={{
                color: STATE_BORDER_COLORS[idx],
                weight: 2.5,
                fillColor: STATE_FILL_COLORS[idx],
                fillOpacity: 0.35,
              }}
            />
          );
        })}

        {/* VA facility markers — blue=VAMC, green=clinic (same as state detail page) */}
        {stateIds.map((stateId) => {
          const facilities = vaFacilityLocations[stateId] ?? [];
          return facilities.map((facility, i) => {
            const isClinic = facility.type === 'clinic';
            return (
              <CircleMarker
                key={`${stateId}-${i}`}
                center={[facility.lat, facility.lon]}
                radius={isClinic ? 6 : 8}
                pathOptions={{
                  color: '#ffffff',
                  weight: 2,
                  fillColor: isClinic ? CLINIC_COLOR : VAMC_COLOR,
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

      {/* Legend — matches StateShapeMap style */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: VAMC_COLOR }} />
            <span>VA Medical Center</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: CLINIC_COLOR }} />
            <span>VA Clinic</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          {stateIds.map((stateId, idx) => {
            const facilities = vaFacilityLocations[stateId] ?? [];
            const vamcCount = facilities.filter((f) => f.type !== 'clinic').length;
            const clinicCount = facilities.filter((f) => f.type === 'clinic').length;
            return (
              <div key={stateId} className="flex items-center gap-1.5">
                <div className="w-5 h-2 rounded-sm border" style={{ backgroundColor: STATE_FILL_COLORS[idx], borderColor: STATE_BORDER_COLORS[idx] }} />
                <span className="font-medium text-slate-700">{stateNames[idx]}</span>
                <span className="text-slate-400">{vamcCount} VMC · {clinicCount} clinics</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-blue-500">Click markers for details</p>
      </div>
    </div>
  );
}
