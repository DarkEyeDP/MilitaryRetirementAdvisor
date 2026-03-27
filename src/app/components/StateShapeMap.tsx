/**
 * StateShapeMap — renders the state outline with VA facility markers
 *
 * Uses react-leaflet with OpenStreetMap tiles. State boundary is fetched
 * from the us-atlas topojson (jsDelivr CDN) and converted to GeoJSON via
 * topojson-client. Markers are sourced from vaFacilityLocations.ts.
 */

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject, Feature } from 'geojson';
import { vaFacilityLocations, stateFipsMap } from '../data/vaFacilityLocations';
import 'leaflet/dist/leaflet.css';

interface Props {
  stateId: string;
  stateName: string;
}

// Fit the map view to the GeoJSON bounds after it loads
function FitBounds({ geojson }: { geojson: GeoJsonObject | null }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      const L = (window as any).L ?? map;
      // Use Leaflet's geoJSON to get bounds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layer = (window as any).L?.geoJSON(geojson);
      if (layer) {
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      }
    } catch {
      // bounds fit is best-effort
    }
  }, [geojson, map]);
  return null;
}

const TOPO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// Simple cache so we only fetch once per session
let topoCache: Topology | null = null;

export default function StateShapeMap({ stateId, stateName }: Props) {
  const [stateGeojson, setStateGeojson] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoJsonRef = useRef<any>(null);

  const facilities = vaFacilityLocations[stateId] ?? [];
  const fips = stateFipsMap[stateId];

  useEffect(() => {
    async function load() {
      try {
        if (!topoCache) {
          const res = await fetch(TOPO_URL);
          topoCache = (await res.json()) as Topology;
        }
        const topo = topoCache;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const statesCollection = feature(topo, (topo as any).objects.states) as any;
        const stateFeature: Feature | undefined = statesCollection.features.find(
          (f: Feature) => String(f.id) === fips
        );
        if (stateFeature) {
          setStateGeojson(stateFeature);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fips]);

  if (loading) {
    return (
      <div className="w-full h-80 rounded-xl bg-slate-100 flex items-center justify-center">
        <div className="text-slate-500 text-sm">Loading map…</div>
      </div>
    );
  }

  if (error || !stateGeojson) {
    return (
      <div className="w-full h-80 rounded-xl bg-slate-100 flex items-center justify-center">
        <div className="text-slate-500 text-sm">Map unavailable</div>
      </div>
    );
  }

  const stateStyle = {
    color: '#1d4ed8',
    weight: 2.5,
    fillColor: '#dbeafe',
    fillOpacity: 0.35,
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ isolation: 'isolate' }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={5}
        style={{ height: '380px', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* State boundary */}
        <GeoJSON ref={geoJsonRef} data={stateGeojson} style={stateStyle} />

        {/* VA facility markers */}
        {facilities.map((facility, i) => {
          const isClinic = facility.type === 'clinic';
          return (
            <CircleMarker
              key={i}
              center={[facility.lat, facility.lon]}
              radius={isClinic ? 6 : 8}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: isClinic ? '#16a34a' : '#1d4ed8',
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
        })}

        <FitBounds geojson={stateGeojson} />
      </MapContainer>

      {/* Legend */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
            <span>VA Medical Center ({facilities.filter((f) => f.type !== 'clinic').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm" />
            <span>VA Clinic ({facilities.filter((f) => f.type === 'clinic').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-3 rounded-sm bg-blue-100 border border-blue-700 opacity-70" />
            <span>{stateName} boundary</span>
          </div>
        </div>
        <span className="text-xs text-slate-400">Click markers for facility information</span>
      </div>
    </div>
  );
}
