import { useMemo } from 'react';
import { statesData } from '../../data/stateData';
import { stateFinancialData } from '../../data/financialData';
import { DATA_YEAR, DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import {
  AnimatedTabContent, MotionTr, SortableHead, MobileCardList, SourceNote, useSortState,
} from './shared';

export function FinancialTab() {
  const { sortKey, sortDir, handleSort } = useSortState('name');

  const rows = useMemo(() => {
    const data = statesData.map(s => ({
      ...s,
      ...(stateFinancialData[s.id] ?? {}),
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

  const fd = (s: typeof rows[number]) => stateFinancialData[s.id];

  return (
    <AnimatedTabContent id="financial">
    <div>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {sh('name', 'State')}
              {sh('propertyTaxRate', 'Property Tax Rate')}
              {sh('medianAnnualPropertyTax', 'Annual Prop. Tax')}
              {sh('salesTaxCombined', 'Combined Sales Tax')}
              {sh('avgHomeInsuranceMonthly', 'Home Ins./mo')}
              {sh('avgAutoInsuranceMonthly', 'Auto Ins./mo')}
              {sh('avgMonthlyUtilities', 'Utilities/mo')}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((s, i) => {
              const f = fd(s);
              if (!f) return null;
              return (
                <MotionTr
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02, ease: 'easeOut' }}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-800 whitespace-nowrap">{s.name}</TableCell>
                  <TableCell className="tabular-nums">{f.propertyTaxRate}%</TableCell>
                  <TableCell className="tabular-nums">${f.medianAnnualPropertyTax.toLocaleString()}</TableCell>
                  <TableCell className="tabular-nums">{f.salesTaxCombined}%</TableCell>
                  <TableCell className="tabular-nums">${f.avgHomeInsuranceMonthly}/mo</TableCell>
                  <TableCell className="tabular-nums">${f.avgAutoInsuranceMonthly}/mo</TableCell>
                  <TableCell className="tabular-nums">${f.avgMonthlyUtilities}/mo</TableCell>
                </MotionTr>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <MobileCardList rows={rows} columns={[
        { label: 'Prop Tax Rate', render: (s) => { const f = stateFinancialData[s.id]; return f ? `${f.propertyTaxRate}%` : '—'; } },
        { label: 'Annual Prop Tax', render: (s) => { const f = stateFinancialData[s.id]; return f ? `$${f.medianAnnualPropertyTax.toLocaleString()}` : '—'; } },
        { label: 'Home Ins/mo', render: (s) => { const f = stateFinancialData[s.id]; return f ? `$${f.avgHomeInsuranceMonthly}/mo` : '—'; } },
        { label: 'Auto Ins/mo', render: (s) => { const f = stateFinancialData[s.id]; return f ? `$${f.avgAutoInsuranceMonthly}/mo` : '—'; } },
        { label: 'Utilities/mo', render: (s) => { const f = stateFinancialData[s.id]; return f ? `$${f.avgMonthlyUtilities}/mo` : '—'; } },
        { label: 'Sales Tax', render: (s) => { const f = stateFinancialData[s.id]; return f ? `${f.salesTaxCombined}%` : '—'; } },
      ]} />
      <SourceNote vintage={DATA_VINTAGES.stateTax}>
        Property tax rates and combined sales tax: Tax Foundation ({DATA_YEAR}). Home insurance: Insurance.com state averages.
        Auto insurance: ValuePenguin full-coverage estimates. Utilities: BLS Consumer Expenditure Survey, NerdWallet. Data year: {DATA_YEAR}.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
