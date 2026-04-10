import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { DATA_YEAR, DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote,
  PensionBadge, ScorePill, useSortState,
} from './shared';

export function TaxesTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => {
      const pensionPts = s.militaryPensionTax === 'No' ? 50 : s.militaryPensionTax === 'Partial' ? 28 : 0;
      const incomePts = Math.max(0, Math.round(32 - s.stateIncomeTax * 2.4));
      const propertyPts = s.propertyTaxLevel === 'Low' ? 18 : s.propertyTaxLevel === 'Medium' ? 10 : 0;
      return { ...s, pensionPts, incomePts, propertyPts, taxScore: pensionPts + incomePts + propertyPts };
    });
    return data.sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      if (typeof av === 'string' && typeof bv === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return 0;
    });
  }, [sortKey, sortDir]);

  const sh = (key: string, label: string, className?: string) => (
    <SortableHead key={key} label={label} sortKey={key} currentKey={sortKey} dir={sortDir} onSort={handleSort} className={className} />
  );

  return (
    <AnimatedTabContent id="taxes">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('militaryPensionTax', 'Pension Tax')}
              {sh('stateIncomeTax', 'Income Tax %')}
              {sh('propertyTaxLevel', 'Property Tax')}
              {sh('salesTax', 'Sales Tax %')}
              {sh('pensionPts', 'Pension Pts')}
              {sh('incomePts', 'Income Pts')}
              {sh('propertyPts', 'Property Pts')}
              {sh('taxScore', 'Tax Score')}
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
                <TableCell><PensionBadge value={s.militaryPensionTax} /></TableCell>
                <TableCell className="tabular-nums">{s.stateIncomeTax === 0 ? '0%' : `${s.stateIncomeTax}%`}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${s.propertyTaxLevel === 'Low' ? 'text-green-700' : s.propertyTaxLevel === 'Medium' ? 'text-yellow-700' : 'text-red-600'}`}>
                    {s.propertyTaxLevel}
                  </span>
                </TableCell>
                <TableCell className="tabular-nums">{s.salesTax}%</TableCell>
                <TableCell className="tabular-nums text-slate-500">{s.pensionPts}</TableCell>
                <TableCell className="tabular-nums text-slate-500">{s.incomePts}</TableCell>
                <TableCell className="tabular-nums text-slate-500">{s.propertyPts}</TableCell>
                <TableCell><ScorePill score={s.taxScore} /></TableCell>
              </MotionTr>
            ))}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Pension Tax', render: (s) => <PensionBadge value={s.militaryPensionTax} /> },
        { label: 'Income Tax', render: (s) => s.stateIncomeTax === 0 ? '0%' : `${s.stateIncomeTax}%` },
        { label: 'Property Tax', render: (s) => <span className={s.propertyTaxLevel === 'Low' ? 'text-green-700' : s.propertyTaxLevel === 'Medium' ? 'text-yellow-700' : 'text-red-600'}>{s.propertyTaxLevel}</span> },
        { label: 'Sales Tax', render: (s) => `${s.salesTax}%` },
        { label: 'Tax Score', render: (s) => <ScorePill score={s.taxScore} /> },
      ]} />
      <SourceNote vintage={DATA_VINTAGES.stateTax}>
        State tax laws ({DATA_YEAR} tax year). Pension exemption status reflects enacted legislation as of {DATA_YEAR}.
        Sales tax rates: Tax Foundation. Always verify with your state&apos;s Department of Revenue before filing.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
