/**
 * StateShapeMap — renders the state outline with VA facility markers
 *
 * Uses react-leaflet with OpenStreetMap tiles. State boundary is fetched
 * from the us-atlas topojson (jsDelivr CDN) and converted to GeoJSON via
 * topojson-client. Markers are sourced from vaFacilityLocations.ts.
 */

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { GeoJsonObject, Feature } from 'geojson';
import { vaFacilityLocations, stateFipsMap } from '../data/vaFacilityLocations';
import { spaceATerminals } from '../data/spaceATerminals';
import { militaryInstallations } from '../data/militaryInstallations';
import { TERRITORY_IDS } from '../data/stateData';
import 'leaflet/dist/leaflet.css';

const SPACE_A_COLOR = '#7c3aed'; // violet
const INSTALLATION_COLOR = '#4b5320'; // olive drab

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

const installationIconHovered = L.divIcon({
  html: `<div style="background:${INSTALLATION_COLOR};color:white;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.45);line-height:1">★</div>`,
  className: '',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -19],
});

interface Props {
  stateId: string;
  stateName: string;
  height?: number;
  showInstallations?: boolean;
  onShowInstallationsChange?: (value: boolean) => void;
  hoveredFacilityName?: string | null;
  hoveredInstallationId?: string | null;
}

// Fit the map view to the GeoJSON bounds after it loads
function FitBounds({ geojson }: { geojson: GeoJsonObject | null }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    try {
      const layer = L.geoJSON(geojson);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
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

export default function StateShapeMap({ stateId, stateName: _stateName, height = 380, showInstallations: showInstallationsProp, onShowInstallationsChange, hoveredFacilityName, hoveredInstallationId }: Props) {
  const [stateGeojson, setStateGeojson] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showInstallationsInternal, setShowInstallationsInternal] = useState(false);
  const showInstallations = showInstallationsProp !== undefined ? showInstallationsProp : showInstallationsInternal;
  const setShowInstallations = (value: boolean) => {
    setShowInstallationsInternal(value);
    onShowInstallationsChange?.(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoJsonRef = useRef<any>(null);

  const facilities = vaFacilityLocations[stateId] ?? [];
  const fips = stateFipsMap[stateId];
  const stateInstallations = militaryInstallations.filter((i) => i.stateId === stateId);

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
      <div className="w-full rounded-xl bg-slate-100 flex items-center justify-center" style={{ height }}>
        <div className="text-slate-500 text-sm">Loading map…</div>
      </div>
    );
  }

  if (error || !stateGeojson) {
    return (
      <div className="w-full rounded-xl bg-slate-100 flex items-center justify-center" style={{ height }}>
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
        style={{ height: `${height}px`, width: '100%' }}
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
          const isHovered = hoveredFacilityName === facility.name;
          return (
            <CircleMarker
              key={i}
              center={[facility.lat, facility.lon]}
              radius={isHovered ? (isClinic ? 11 : 14) : (isClinic ? 6 : 8)}
              pathOptions={{
                color: '#ffffff',
                weight: isHovered ? 3 : 2,
                fillColor: isClinic ? '#16a34a' : '#1d4ed8',
                fillOpacity: isHovered ? 1.0 : 0.9,
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

        {/* Space-A terminal markers — all CONUS terminals shown on every state map */}
        {spaceATerminals.map((terminal) => (
          <Marker key={terminal.id} position={[terminal.lat, terminal.lon]} icon={planeIcon}>
            <Popup>
              <div className="text-sm leading-snug max-w-[240px] space-y-1">
                <div className="font-semibold">{terminal.name}</div>
                <div className="text-xs text-violet-700 font-medium">AMC Space-A Terminal</div>
                {terminal.phone && (
                  <a
                    href={`tel:${terminal.phone.replace(/\D/g, '')}`}
                    className="text-xs text-blue-600 hover:underline block"
                  >
                    {terminal.phone}
                  </a>
                )}
                <a
                  href={terminal.amcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline block"
                >
                  AMC Terminal Info →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Military installation markers — toggleable, off by default */}
        {showInstallations && stateInstallations.map((inst) => (
          <Marker key={inst.id} position={[inst.lat, inst.lon]} icon={hoveredInstallationId === inst.id ? installationIconHovered : installationIcon}>
            <Popup>
              <div className="text-sm leading-snug max-w-[240px] space-y-1">
                <div className="font-semibold">{inst.name}</div>
                <div className="text-xs font-medium" style={{ color: INSTALLATION_COLOR }}>Military Installation</div>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitBounds geojson={stateGeojson} />
      </MapContainer>

      {/* Legend */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 flex flex-col gap-2">
        {/* Marker type row — wraps on narrow viewports */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm flex-shrink-0" />
            <span>VA Medical Center ({facilities.filter((f) => f.type !== 'clinic').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm flex-shrink-0" />
            <span>VA Clinic ({facilities.filter((f) => f.type === 'clinic').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-[9px] flex-shrink-0" style={{ backgroundColor: SPACE_A_COLOR }}>✈</div>
            <span>Space-A Terminal ({spaceATerminals.filter((t) => t.stateId === stateId).length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-3 rounded-sm bg-blue-100 border border-blue-700 opacity-70 flex-shrink-0" />
            <span>{TERRITORY_IDS.has(stateId) ? 'Territory' : 'State'} boundary</span>
          </div>
        </div>
        {/* Controls row — wraps on narrow viewports */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {stateInstallations.length > 0 && (
            <button
              onClick={() => setShowInstallations((v) => !v)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                showInstallations
                  ? 'border-transparent text-white'
                  : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
              }`}
              style={showInstallations ? { backgroundColor: INSTALLATION_COLOR, borderColor: INSTALLATION_COLOR } : {}}
            >
              <span>★</span>
              <span>Installations ({stateInstallations.length})</span>
            </button>
          )}
          <span className="text-xs text-slate-400">Click markers for details</span>
        </div>
      </div>
    </div>
  );
}
