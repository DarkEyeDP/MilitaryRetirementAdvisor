import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote,
  ScorePill, useSortState,
} from './shared';

export function CostOfLivingTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => ({
      ...s,
      colScore: Math.min(100, Math.max(0, Math.round((160 - s.costOfLivingIndex) / 78 * 100))),
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
    <AnimatedTabContent id="col">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('costOfLivingIndex', 'COL Index')}
              {sh('colScore', 'COL Score')}
              {sh('avgHomeCost', 'Avg Home Cost')}
              {sh('salesTax', 'Sales Tax %')}
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
                <TableCell className="tabular-nums">
                  <span className={s.costOfLivingIndex <= 90 ? 'text-green-700 font-medium' : s.costOfLivingIndex >= 120 ? 'text-red-600 font-medium' : ''}>
                    {s.costOfLivingIndex}
                  </span>
                </TableCell>
                <TableCell><ScorePill score={s.colScore} /></TableCell>
                <TableCell className="tabular-nums">${s.avgHomeCost.toLocaleString()}</TableCell>
                <TableCell className="tabular-nums">{s.salesTax}%</TableCell>
              </MotionTr>
            ))}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'COL Index', render: (s) => <span className={s.costOfLivingIndex <= 90 ? 'text-green-700 font-medium' : s.costOfLivingIndex >= 120 ? 'text-red-600 font-medium' : ''}>{s.costOfLivingIndex}</span> },
        { label: 'COL Score', render: (s) => <ScorePill score={s.colScore} /> },
        { label: 'Avg Home', render: (s) => `$${s.avgHomeCost.toLocaleString()}` },
        { label: 'Sales Tax', render: (s) => `${s.salesTax}%` },
      ]} />
      <SourceNote vintage={DATA_VINTAGES.costOfLiving}>
        COL Index: composite economic index where 100 = US national average. Home costs: Zillow/Census median home value estimates (2025).
        A COL Index above 100 means above-average cost; below 100 means below-average.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
