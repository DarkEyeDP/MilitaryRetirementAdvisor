import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { stateHousingData } from '../../data/housingData';
import { DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote, useSortState,
} from './shared';

export function HousingTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => ({
      ...s,
      ...(stateHousingData[s.id] ?? { medianRent: 0, housingPriceTrend: 0 }),
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

  return (
    <AnimatedTabContent id="housing">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('avgHomeCost', 'Avg Home Cost')}
              {sh('medianRent', 'Median Rent/mo')}
              {sh('housingPriceTrend', 'Price Trend (YoY%)')}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((s, i) => (
              <MotionTr
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.02, ease: 'easeOut' }}
                className="border-b hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium text-slate-800 whitespace-nowrap">{s.name}</TableCell>
                <TableCell className="tabular-nums">${s.avgHomeCost.toLocaleString()}</TableCell>
                <TableCell className="tabular-nums">${(s as any).medianRent?.toLocaleString()}/mo</TableCell>
                <TableCell className="tabular-nums">
                  <span className={(s as any).housingPriceTrend > 0 ? 'text-orange-600' : 'text-green-700'}>
                    {(s as any).housingPriceTrend > 0 ? '+' : ''}{(s as any).housingPriceTrend}%
                  </span>
                </TableCell>
              </MotionTr>
            ))}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Avg Home Cost', render: (s) => `$${s.avgHomeCost.toLocaleString()}` },
        { label: 'Median Rent/mo', render: (s) => s.medianRent ? `$${s.medianRent.toLocaleString()}/mo` : '—' },
        { label: 'Price Trend (YoY)', render: (s) => s.housingPriceTrend != null ? <span className={s.housingPriceTrend > 0 ? 'text-orange-600' : 'text-green-700'}>{s.housingPriceTrend > 0 ? '+' : ''}{s.housingPriceTrend}%</span> : '—' },
      ]} />
      <SourceNote vintage={DATA_VINTAGES.housing}>
        Median rent and price trends: Zillow Research, Redfin Data Center (2024–2025 estimates).
        Avg home cost: Census Bureau ACS 2023 median home value. Trends are YoY % change in median sale price.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
