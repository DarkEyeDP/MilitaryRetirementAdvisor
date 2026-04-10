import { useMemo } from 'react';
import { statesData, calculateCustomScore } from '../../data/stateData';
import { DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote,
  PensionBadge, ScorePill, useSortState,
} from './shared';

export function VeteransTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    return [...statesData].sort((a, b) => {
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
    <AnimatedTabContent id="veterans">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('veteranPopulation', 'Veteran Population')}
              {sh('vaFacilities', 'VA Facilities')}
              {sh('veteranBenefitsScore', 'Benefits Score')}
              {sh('militaryPensionTax', 'Pension Tax')}
              {sh('retirementScore', 'Retirement Score')}
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
                <TableCell className="tabular-nums">{s.veteranPopulation.toLocaleString()}</TableCell>
                <TableCell className="tabular-nums">{s.vaFacilities}</TableCell>
                <TableCell><ScorePill score={s.veteranBenefitsScore} /></TableCell>
                <TableCell><PensionBadge value={s.militaryPensionTax} /></TableCell>
                <TableCell><ScorePill score={calculateCustomScore(s, { taxes: 40, cost: 30, benefits: 30 })} /></TableCell>
              </MotionTr>
            ))}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Veteran Population', render: (s) => s.veteranPopulation.toLocaleString() },
        { label: 'VA Facilities', render: (s) => String(s.vaFacilities) },
        { label: 'Benefits Score', render: (s) => <ScorePill score={s.veteranBenefitsScore} /> },
        { label: 'Pension Tax', render: (s) => <PensionBadge value={s.militaryPensionTax} /> },
        { label: 'Retirement Score', render: (s) => <ScorePill score={calculateCustomScore(s, { taxes: 40, cost: 30, benefits: 30 })} /> },
      ]} />
      <SourceNote vintage={`Benefits: ${DATA_VINTAGES.veteranBenefits} · VA Facilities: ${DATA_VINTAGES.vaFacilities}`}>
        Veteran population: National Center for Veterans Analysis and Statistics (NCVAS), state-level estimates.
        VA facility counts: VA.gov facility locator (major VAMCs and CBOCs). Benefits score: curated index based on
        state DMV websites, State Departments of Veterans Affairs, Military.com, and VA state summaries (2024–2025).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
