import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { stateClimateData } from '../../data/climateData';
import { DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote,
  RiskBadge, useSortState,
} from './shared';

export function ClimateTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => ({
      ...s,
      ...(stateClimateData[s.id] ?? {}),
    }));
    return data.sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      if (typeof av === 'string' && typeof bv === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return 0;
    });
  }, [sortKey, sortDir]);

  const sh = (key: string, label: string) => (
    <SortableHead key={key} label={label} sortKey={key} currentKey={sortKey} dir={sortDir} onSort={handleSort} />
  );

  const cd = (s: typeof rows[number]) => stateClimateData[s.id];

  return (
    <AnimatedTabContent id="climate">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('avgSummerHighF', 'Summer High °F')}
              {sh('avgWinterLowF', 'Winter Low °F')}
              {sh('humidity', 'Humidity')}
              {sh('annualRainfallInches', 'Rainfall (in)')}
              {sh('extremeHeatDays', 'Heat Days >95°F')}
              {sh('extremeColdDays', 'Cold Days <20°F')}
              <TableHead>Disaster Risks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((s, i) => {
              const c = cd(s);
              if (!c) return null;
              return (
                <MotionTr
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02, ease: 'easeOut' }}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-800 whitespace-nowrap">{s.name}</TableCell>
                  <TableCell className="tabular-nums">{c.avgSummerHighF}°F</TableCell>
                  <TableCell className="tabular-nums">{c.avgWinterLowF}°F</TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium ${c.humidity === 'High' ? 'text-blue-700' : c.humidity === 'Low' ? 'text-orange-600' : 'text-slate-600'}`}>
                      {c.humidity}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{c.annualRainfallInches}&quot;</TableCell>
                  <TableCell className="tabular-nums">{c.extremeHeatDays}</TableCell>
                  <TableCell className="tabular-nums">{c.extremeColdDays}</TableCell>
                  <TableCell className="min-w-[160px]">
                    <RiskBadge level={c.disasterRisk.hurricane} label="Hurricane" />
                    <RiskBadge level={c.disasterRisk.wildfire} label="Wildfire" />
                    <RiskBadge level={c.disasterRisk.flood} label="Flood" />
                    <RiskBadge level={c.disasterRisk.tornado} label="Tornado" />
                    <RiskBadge level={c.disasterRisk.earthquake} label="Earthquake" />
                    <RiskBadge level={c.disasterRisk.winterStorm} label="Winter Storm" />
                  </TableCell>
                </MotionTr>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Summer High', render: (s) => { const c = stateClimateData[s.id]; return c ? `${c.avgSummerHighF}°F` : '—'; } },
        { label: 'Winter Low', render: (s) => { const c = stateClimateData[s.id]; return c ? `${c.avgWinterLowF}°F` : '—'; } },
        { label: 'Humidity', render: (s) => { const c = stateClimateData[s.id]; return c ? <span className={c.humidity === 'High' ? 'text-blue-700' : c.humidity === 'Low' ? 'text-orange-600' : 'text-slate-600'}>{c.humidity}</span> : '—'; } },
        { label: 'Rainfall', render: (s) => { const c = stateClimateData[s.id]; return c ? `${c.annualRainfallInches}"` : '—'; } },
        { label: 'Heat Days >95°F', render: (s) => { const c = stateClimateData[s.id]; return c ? String(c.extremeHeatDays) : '—'; } },
        { label: 'Cold Days <20°F', render: (s) => { const c = stateClimateData[s.id]; return c ? String(c.extremeColdDays) : '—'; } },
        { label: 'Disaster Risks', span2: true, render: (s) => { const c = stateClimateData[s.id]; if (!c) return '—'; return <div className="flex flex-wrap gap-1 mt-0.5"><RiskBadge level={c.disasterRisk.hurricane} label="Hurricane" /><RiskBadge level={c.disasterRisk.wildfire} label="Wildfire" /><RiskBadge level={c.disasterRisk.flood} label="Flood" /><RiskBadge level={c.disasterRisk.tornado} label="Tornado" /><RiskBadge level={c.disasterRisk.earthquake} label="Earthquake" /><RiskBadge level={c.disasterRisk.winterStorm} label="Winter Storm" /></div>; } },
      ]} />
      <SourceNote vintage={`Climate: ${DATA_VINTAGES.climate} · Disaster Risk: ${DATA_VINTAGES.disasterRisk}`}>
        Temperature and precipitation: NOAA Climate Normals (1991–2020). Extreme heat/cold days: NWS historical averages.
        Disaster risk levels: FEMA National Risk Index, NIFC wildfire data. Verify current risks at ready.gov.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
