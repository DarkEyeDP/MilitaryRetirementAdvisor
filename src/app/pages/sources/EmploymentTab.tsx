import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { stateEmploymentData } from '../../data/employmentData';
import { DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote,
  DefenseBadge, useSortState,
} from './shared';

export function EmploymentTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => ({
      ...s,
      ...(stateEmploymentData[s.id] ?? {}),
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

  const ed = (s: typeof rows[number]) => stateEmploymentData[s.id];

  return (
    <AnimatedTabContent id="employment">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('unemploymentRate', 'Unemployment %')}
              {sh('jobGrowthRate', 'Job Growth %')}
              {sh('medianHouseholdIncome', 'Median HH Income')}
              {sh('defenseContractorPresence', 'Defense Presence')}
              <TableHead>Top Industries</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((s, i) => {
              const e = ed(s);
              if (!e) return null;
              return (
                <MotionTr
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02, ease: 'easeOut' }}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-800 whitespace-nowrap">{s.name}</TableCell>
                  <TableCell className="tabular-nums">{e.unemploymentRate}%</TableCell>
                  <TableCell className="tabular-nums">
                    <span className={e.jobGrowthRate >= 2 ? 'text-green-700 font-medium' : e.jobGrowthRate <= 0.5 ? 'text-slate-400' : ''}>
                      {e.jobGrowthRate > 0 ? '+' : ''}{e.jobGrowthRate}%
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">${e.medianHouseholdIncome.toLocaleString()}</TableCell>
                  <TableCell><DefenseBadge value={e.defenseContractorPresence} /></TableCell>
                  <TableCell className="text-xs text-slate-500 whitespace-normal leading-relaxed">{e.topIndustries.join(', ')}</TableCell>
                </MotionTr>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Unemployment', render: (s) => { const e = stateEmploymentData[s.id]; return e ? `${e.unemploymentRate}%` : '—'; } },
        { label: 'Job Growth', render: (s) => { const e = stateEmploymentData[s.id]; if (!e) return '—'; return <span className={e.jobGrowthRate >= 2 ? 'text-green-700 font-medium' : e.jobGrowthRate <= 0.5 ? 'text-slate-400' : ''}>{e.jobGrowthRate > 0 ? '+' : ''}{e.jobGrowthRate}%</span>; } },
        { label: 'Median HH Income', render: (s) => { const e = stateEmploymentData[s.id]; return e ? `$${e.medianHouseholdIncome.toLocaleString()}` : '—'; } },
        { label: 'Defense', render: (s) => { const e = stateEmploymentData[s.id]; return e ? <DefenseBadge value={e.defenseContractorPresence} /> : '—'; } },
      ]} />
      <SourceNote vintage={DATA_VINTAGES.employment}>
        Unemployment rates: BLS Local Area Unemployment Statistics (2024 annual avg). Job growth: BLS Quarterly Census of Employment and Wages (2024 YoY).
        Median household income: Census Bureau ACS 2023. Defense contractor presence tier: USASpending.gov DoD prime contract awards (FY2024).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
