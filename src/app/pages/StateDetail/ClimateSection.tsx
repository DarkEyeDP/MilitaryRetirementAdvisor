import { motion, AnimatePresence } from 'motion/react';
import {
  Thermometer, Droplets, CloudRain, Flame, Wind,
  Snowflake, TriangleAlert, Waves, Mountain,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import type { ClimateData, RiskLevel } from '../../data/climateData';

interface ClimateSectionProps {
  climate: ClimateData;
  activeClimate: ClimateData & { region?: string };
  selectedRegionIdx: number;
  onRegionChange: (idx: number) => void;
}

function riskColor(level: RiskLevel) {
  if (level === 'High')     return 'bg-red-100 text-red-700 border border-red-200';
  if (level === 'Moderate') return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
  if (level === 'Low')      return 'bg-blue-100 text-blue-700 border border-blue-200';
  return 'bg-slate-100 text-slate-400 border border-slate-200';
}

export function ClimateSection({ climate, activeClimate, selectedRegionIdx, onRegionChange }: ClimateSectionProps) {
  const climateRisks = [
    { label: 'Hurricane',    value: climate.disasterRisk.hurricane,   icon: Wind },
    { label: 'Wildfire',     value: climate.disasterRisk.wildfire,    icon: Flame },
    { label: 'Flooding',     value: climate.disasterRisk.flood,       icon: Waves },
    { label: 'Tornado',      value: climate.disasterRisk.tornado,     icon: TriangleAlert },
    { label: 'Earthquake',   value: climate.disasterRisk.earthquake,  icon: Mountain },
    { label: 'Winter Storm', value: climate.disasterRisk.winterStorm, icon: Snowflake },
  ];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-orange-500" />
          Climate &amp; Natural Disaster Risk
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {climate.regions && climate.regions.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Region:</span>
            {climate.regions.map((r, i) => (
              <button
                key={i}
                onClick={() => onRegionChange(i)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedRegionIdx === i
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {r.region}
              </button>
            ))}
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Typical Climate Conditions</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { key: 'summer', bg: 'bg-orange-50', content: <span className="text-2xl font-bold text-orange-600">{activeClimate.avgSummerHighF}°F</span>, label: 'Summer High (July avg)' },
              { key: 'winter', bg: 'bg-blue-50',   content: <span className="text-2xl font-bold text-blue-600">{activeClimate.avgWinterLowF}°F</span>,   label: 'Winter Low (Jan avg)' },
              { key: 'humidity', bg: 'bg-slate-50', content: <span className="flex items-center justify-center gap-1"><Droplets className="w-4 h-4 text-sky-500" /><span className="text-xl font-bold text-sky-600">{activeClimate.humidity}</span></span>, label: 'Humidity' },
              { key: 'rain',  bg: 'bg-sky-50',     content: <span className="flex items-center justify-center gap-1"><CloudRain className="w-4 h-4 text-sky-600" /><span className="text-2xl font-bold text-sky-700">{activeClimate.annualRainfallInches}&quot;</span></span>, label: 'Annual Rainfall' },
              { key: 'heat',  bg: 'bg-red-50',     content: <span className="text-2xl font-bold text-red-500">{activeClimate.extremeHeatDays}</span>,      label: 'Days >95°F / yr' },
              { key: 'cold',  bg: 'bg-indigo-50',  content: <span className="text-2xl font-bold text-indigo-600">{activeClimate.extremeColdDays}</span>,   label: 'Days <20°F / yr' },
            ].map(({ key, bg, content, label }) => (
              <div key={key} className={`p-3 ${bg} rounded-lg text-center overflow-hidden`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${key}-${selectedRegionIdx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Natural Disaster Risk</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {climateRisks.map(({ label, value, icon: Icon }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${riskColor(value)}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="text-xs opacity-70 leading-none mb-0.5">{label}</div>
                  <div className="font-semibold leading-none">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Climate normals from NOAA (1991–2020).{climate.regions ? ' Regional data shown — select a region above to compare.' : ''} Disaster risk based on FEMA National Risk Index and is state-level.
        </p>
      </CardContent>
    </Card>
  );
}
