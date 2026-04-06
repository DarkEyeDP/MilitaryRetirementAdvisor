import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { statesData, calculateCustomScore } from '../data/stateData';
import { stateFinancialData } from '../data/financialData';
import { stateHousingData } from '../data/housingData';
import { stateClimateData } from '../data/climateData';
import { stateEmploymentData } from '../data/employmentData';
import {
  VA_RATE_ALONE,
  VA_RATE_WITH_SPOUSE,
  VA_RATE_WITH_SPOUSE_ONE_CHILD,
  VA_RATE_ADDITIONAL_CHILD,
  VA_RATE_CHILD_NO_SPOUSE,
} from '../data/vaRates';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { ArrowLeft, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import IconReadOutlined from '../components/ui/IconReadOutlined';

type SortDir = 'asc' | 'desc';

const MotionTr = motion.tr;

function AnimatedTabContent({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40 inline-block" />;
  return dir === 'asc'
    ? <ChevronUp className="w-3 h-3 ml-1 inline-block text-blue-600" />
    : <ChevronDown className="w-3 h-3 ml-1 inline-block text-blue-600" />;
}

function SortableHead({
  label,
  sortKey,
  currentKey,
  dir,
  onSort,
  className,
}: {
  label: string;
  sortKey: string;
  currentKey: string;
  dir: SortDir;
  onSort: (key: string) => void;
  className?: string;
}) {
  return (
    <TableHead
      className={`cursor-pointer select-none whitespace-nowrap hover:bg-slate-100 transition-colors ${className ?? ''}`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <SortIcon active={currentKey === sortKey} dir={dir} />
    </TableHead>
  );
}

// ─── Mobile card list — replaces horizontal-scroll tables on small screens ────

type MobileCol = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (row: any) => React.ReactNode;
  span2?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MobileCardList({ rows, columns }: { rows: any[]; columns: MobileCol[] }) {
  return (
    <div className="md:hidden divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
      {rows.map((row) => (
        <div key={row.id} className="px-4 py-3">
          <p className="text-sm font-semibold text-slate-900 mb-2">{row.name}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {columns.map((col) => (
              <div key={col.label} className={col.span2 ? 'col-span-2' : ''}>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">{col.label}</p>
                <div className="text-xs font-medium text-slate-700">{col.render(row)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-slate-400 mt-4 px-1">
      <span className="font-medium text-slate-500">Sources:</span> {children}
    </p>
  );
}

function RiskBadge({ level, label }: { level: string; label: string }) {
  if (level === 'None') return null;
  const color =
    level === 'High' ? 'bg-red-100 text-red-700' :
    level === 'Moderate' ? 'bg-orange-100 text-orange-700' :
    'bg-yellow-100 text-yellow-700';
  return (
    <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mr-1 mb-1 ${color}`}>
      {label}
    </span>
  );
}

function PensionBadge({ value }: { value: string }) {
  const color =
    value === 'No' ? 'bg-green-100 text-green-700' :
    value === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';
  const label = value === 'No' ? 'Tax-Free' : value === 'Partial' ? 'Partial' : 'Taxed';
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{label}</span>;
}

function DefenseBadge({ value }: { value: string }) {
  const color =
    value === 'High' ? 'bg-blue-100 text-blue-700' :
    value === 'Medium' ? 'bg-slate-100 text-slate-600' :
    'bg-slate-50 text-slate-400';
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{value}</span>;
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 95 ? 'bg-emerald-100 text-emerald-700' :
    score >= 85 ? 'bg-blue-100 text-blue-700' :
    score >= 70 ? 'bg-yellow-100 text-yellow-700' :
    'bg-slate-100 text-slate-500';
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${color}`}>{score}</span>;
}

// ─── Scoring Tab ─────────────────────────────────────────────────────────────

function ScoringTab() {
  return (
    <AnimatedTabContent id="scoring">
    <div className="space-y-8">
      {/* Formula overview */}
      <div className="md:bg-slate-50 md:rounded-xl md:border md:border-slate-200 md:p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">How the Retirement Score is Calculated</h2>
        <p className="text-sm text-slate-500 mb-4">
          Each state receives a 0–100 score based on three weighted factors. The default weights reflect what
          matters most to the average military retiree, but you can adjust them on the Dashboard.
        </p>

        {/* Formula — desktop pills */}
        <div className="hidden md:flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Tax Score <span className="text-blue-600 font-semibold ml-1">× 40%</span>
          </div>
          <span className="text-slate-400 font-bold">+</span>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Cost of Living Score <span className="text-blue-600 font-semibold ml-1">× 30%</span>
          </div>
          <span className="text-slate-400 font-bold">+</span>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Veteran Benefits Score <span className="text-blue-600 font-semibold ml-1">× 30%</span>
          </div>
        </div>

        {/* Formula — mobile compact 3-col */}
        <div className="md:hidden grid grid-cols-3 border border-slate-200 rounded-lg overflow-hidden bg-white mb-5">
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center border-r border-slate-200">
            <span className="text-xs font-medium text-slate-700 leading-tight">Tax</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×40%</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center border-r border-slate-200">
            <span className="text-xs font-medium text-slate-700 leading-tight">Cost of Living</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×30%</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center">
            <span className="text-xs font-medium text-slate-700 leading-tight">Vet Benefits</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×30%</span>
          </div>
        </div>

        {/* Three factor sections — desktop: cards in grid; mobile: divider-separated rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 divide-y divide-slate-200 md:divide-y-0">
          {/* Tax Score */}
          <div className="py-4 first:pt-0 md:first:pt-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">T</div>
              <span className="font-semibold text-slate-800">Tax Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span>Pension exemption</span>
                <span className="font-mono text-xs text-slate-500">0–50 pts</span>
              </div>
              <div className="pl-2 space-y-1 text-xs text-slate-500 border-b border-slate-100 pb-2">
                <div className="flex justify-between"><span>Tax-Free</span><span className="font-semibold text-green-700">50 pts</span></div>
                <div className="flex justify-between"><span>Partial</span><span className="font-semibold text-yellow-700">28 pts</span></div>
                <div className="flex justify-between"><span>Taxed</span><span className="font-semibold text-red-600">0 pts</span></div>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span>State income tax rate</span>
                <span className="font-mono text-xs text-slate-500">0–32 pts</span>
              </div>
              <div className="pl-2 text-xs text-slate-400 border-b border-slate-100 pb-2">
                <code>max(0, 32 − rate × 2.4)</code>
                <div className="mt-1 text-slate-500">0% → 32 pts · ~13.3% → 0 pts</div>
              </div>
              <div className="flex justify-between items-center">
                <span>Property tax level</span>
                <span className="font-mono text-xs text-slate-500">0–18 pts</span>
              </div>
              <div className="pl-2 text-xs text-slate-500">
                <div className="flex justify-between"><span>Low</span><span className="font-semibold">18 pts</span></div>
                <div className="flex justify-between"><span>Medium</span><span className="font-semibold">10 pts</span></div>
                <div className="flex justify-between"><span>High</span><span className="font-semibold">0 pts</span></div>
              </div>
            </div>
          </div>

          {/* COL Score */}
          <div className="py-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">C</div>
              <span className="font-semibold text-slate-800">COL Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="text-xs text-slate-500">Derived from the national Cost of Living Index (100 = US average).</p>
              <div className="bg-slate-50 rounded p-2 font-mono text-xs text-slate-600 border border-slate-200">
                min(100, max(0,<br />
                &nbsp;&nbsp;(160 − COL) ÷ 78 × 100))
              </div>
              <div className="pt-1 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between"><span>COL ≤ 82</span><span className="font-semibold text-green-700">100 pts (cheapest)</span></div>
                <div className="flex justify-between"><span>COL = 100 (avg)</span><span className="font-semibold">77 pts</span></div>
                <div className="flex justify-between"><span>COL ≥ 160</span><span className="font-semibold text-red-600">0 pts (most expensive)</span></div>
              </div>
            </div>
          </div>

          {/* Benefits Score */}
          <div className="py-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">B</div>
              <span className="font-semibold text-slate-800">Benefits Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="text-xs text-slate-500">A curated 0–100 score reflecting the quality and breadth of state-level veteran benefits.</p>
              <div className="text-xs text-slate-500 space-y-1 pt-1">
                <div className="font-medium text-slate-600 mb-1">Factors considered:</div>
                <div>• VA medical facility availability</div>
                <div>• License plate & registration perks</div>
                <div>• Tuition assistance programs</div>
                <div>• Property/vehicle tax exemptions</div>
                <div>• Medal & disability honors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score tiers */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Score Tiers</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">Elite</span>
            <span className="text-xs text-emerald-600">95 – 100</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-blue-700">Strong</span>
            <span className="text-xs text-blue-600">85 – 94</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-yellow-700">Moderate</span>
            <span className="text-xs text-yellow-600">70 – 84</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-slate-600">Weak</span>
            <span className="text-xs text-slate-500">&lt; 70</span>
          </div>
        </div>
      </div>

      <SourceNote>
        Curated scoring formula based on available data.
        Default weights (40 / 30 / 30) are adjustable via the Filters panel on the Dashboard.
        All underlying data sources are documented on the respective data tabs.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Taxes Tab ────────────────────────────────────────────────────────────────

function TaxesTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
      <SourceNote>
        State tax laws (2026 tax year). Pension exemption status reflects enacted legislation as of 2026.
        Sales tax rates: Tax Foundation. Always verify with your state's Department of Revenue before filing.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Cost of Living Tab ───────────────────────────────────────────────────────

function CostOfLivingTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
      <SourceNote>
        COL Index: composite economic index where 100 = US national average. Home costs: Zillow/Census median home value estimates (2025).
        A COL Index above 100 means above-average cost; below 100 means below-average.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Housing Tab ──────────────────────────────────────────────────────────────

function HousingTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
                <TableCell className="tabular-nums">${s.medianRent.toLocaleString()}/mo</TableCell>
                <TableCell className="tabular-nums">
                  <span className={s.housingPriceTrend > 0 ? 'text-orange-600' : 'text-green-700'}>
                    {s.housingPriceTrend > 0 ? '+' : ''}{s.housingPriceTrend}%
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
      <SourceNote>
        Median rent and price trends: Zillow Research, Redfin Data Center (2024–2025 estimates).
        Avg home cost: Census Bureau ACS 2023 median home value. Trends are YoY % change in median sale price.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Financial Tab ────────────────────────────────────────────────────────────

function FinancialTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
      <SourceNote>
        Property tax rates and combined sales tax: Tax Foundation (2026). Home insurance: Insurance.com state averages.
        Auto insurance: ValuePenguin full-coverage estimates. Utilities: BLS Consumer Expenditure Survey, NerdWallet. Data year: 2026.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Climate Tab ──────────────────────────────────────────────────────────────

function ClimateTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
                  <TableCell className="tabular-nums">{c.annualRainfallInches}"</TableCell>
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
      <SourceNote>
        Temperature and precipitation: NOAA Climate Normals (1991–2020). Extreme heat/cold days: NWS historical averages.
        Disaster risk levels: FEMA National Risk Index, NIFC wildfire data. Verify current risks at ready.gov.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Employment Tab ───────────────────────────────────────────────────────────

function EmploymentTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
      <SourceNote>
        Unemployment rates: BLS Local Area Unemployment Statistics (2024 annual avg). Job growth: BLS Quarterly Census of Employment and Wages (2024 YoY).
        Median household income: Census Bureau ACS 2023. Defense contractor presence tier: USASpending.gov DoD prime contract awards (FY2024).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Veterans Tab ─────────────────────────────────────────────────────────────

function VeteransTab() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

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
      <SourceNote>
        Veteran population: National Center for Veterans Analysis and Statistics (NCVAS), state-level estimates.
        VA facility counts: VA.gov facility locator (major VAMCs and CBOCs). Benefits score: curated index based on
        state DMV websites, State Departments of Veterans Affairs, Military.com, and VA state summaries (2024–2025).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── VA Disability Pay Rates Tab ──────────────────────────────────────────────

const VA_RATINGS = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];

function fmt(n: number) {
  return n === 0 ? '—' : `$${n.toLocaleString()}`;
}

function VADisabilityTab() {
  return (
    <AnimatedTabContent id="va-disability">
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">VA Disability Compensation Policy</p>
        <p>
          VA disability pay is <strong>always federally tax-exempt</strong> (38 U.S.C. § 5301) — no state can tax it.
          At 10% and 20%, the rate is the same regardless of dependents. At 30%+, veterans receive additional
          monthly compensation for a qualifying spouse and each dependent child under 18.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Monthly Compensation by Rating &amp; Dependents (2026)</h3>
        <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Rating</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">No Dependents</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">With Spouse</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 1 Child</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 2 Children</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 3 Children</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Child Only (No Spouse)</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Per Add'l Child</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VA_RATINGS.map((r, i) => {
                const alone = VA_RATE_ALONE[r] ?? 0;
                const spouse = VA_RATE_WITH_SPOUSE[r] ?? 0;
                const spouse1 = VA_RATE_WITH_SPOUSE_ONE_CHILD[r] ?? 0;
                const addlChild = VA_RATE_ADDITIONAL_CHILD[r] ?? 0;
                const childOnly = VA_RATE_CHILD_NO_SPOUSE[r] ?? 0;
                const noSupplement = parseInt(r) < 30;
                return (
                  <MotionTr
                    key={r}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="border-b hover:bg-slate-50 transition-colors"
                  >
                    <TableCell>
                      <span className="font-semibold text-slate-800">{r}%</span>
                    </TableCell>
                    <TableCell className="text-slate-700">{fmt(alone)}</TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1 + addlChild)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1 + addlChild * 2)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(childOnly)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-green-700 font-medium'}>
                      {noSupplement ? '—' : `+$${addlChild}/mo`}
                    </TableCell>
                  </MotionTr>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* Mobile: one card per rating */}
        <div className="md:hidden divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
          {VA_RATINGS.map((r) => {
            const alone = VA_RATE_ALONE[r] ?? 0;
            const spouse = VA_RATE_WITH_SPOUSE[r] ?? 0;
            const spouse1 = VA_RATE_WITH_SPOUSE_ONE_CHILD[r] ?? 0;
            const addlChild = VA_RATE_ADDITIONAL_CHILD[r] ?? 0;
            const childOnly = VA_RATE_CHILD_NO_SPOUSE[r] ?? 0;
            const noSupplement = parseInt(r) < 30;
            return (
              <div key={r} className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-900 mb-2">{r}% Rating</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">No Dependents</p>
                    <p className="text-xs font-medium text-slate-700">{fmt(alone)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">With Spouse</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Spouse + 1 Child</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Spouse + 2 Children</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse1 + addlChild)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Child Only (No Spouse)</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(childOnly)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Per Add'l Child</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-green-700'}`}>{noSupplement ? '—' : `+$${addlChild}/mo`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">How Dependents Are Detected</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-slate-700 mb-1">Spouse</p>
            <p className="text-slate-500">Any household member with an <span className="font-mono bg-slate-100 px-1 rounded">Adult (19–64)</span> or <span className="font-mono bg-slate-100 px-1 rounded">Senior (65+)</span> age group. Maximum of one spouse counted.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-slate-700 mb-1">Dependent Children</p>
            <p className="text-slate-500">Any household member with age group <span className="font-mono bg-slate-100 px-1 rounded">Under 6</span>, <span className="font-mono bg-slate-100 px-1 rounded">6–12</span>, or <span className="font-mono bg-slate-100 px-1 rounded">13–18</span>. Each one counted separately.</p>
          </div>
        </div>
      </div>

      <SourceNote>
        Monthly compensation rates: VA.gov official 2026 rates, effective December 1, 2025 (2.8% COLA).
        Source URL: va.gov/disability/compensation-rates/veteran-rates/.
        Tax exemption authority: 38 U.S.C. § 5301. Dependent supplement policy: 38 CFR Part 3.
        Note: Dependent parent supplements and Aid &amp; Attendance are not modeled (verify at VA.gov).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { value: 'scoring',      label: 'Scoring Formula' },
  { value: 'taxes',        label: 'Taxes' },
  { value: 'col',          label: 'Cost of Living' },
  { value: 'housing',      label: 'Housing' },
  { value: 'financial',    label: 'Financial' },
  { value: 'climate',      label: 'Climate' },
  { value: 'employment',   label: 'Employment' },
  { value: 'veterans',     label: 'Veterans' },
  { value: 'va-disability', label: 'VA Pay Rates' },
];

export default function Sources() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2 min-w-0">
              <IconReadOutlined className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h1 className="font-semibold text-sm sm:text-lg truncate">Data Sources &amp; Methodology</h1>
            </div>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
            2026 Updated Data
          </span>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Description */}
        <p className="text-slate-500 text-sm mb-6">
          <span className="hidden md:inline">All 50 states + DC. Every number used to compute scores is shown below — click any column header to sort.
          Data is updated annually; always verify critical figures with official sources before making relocation decisions.</span>
          <span className="md:hidden">Every number behind the retirement scores — all 50 states + DC, 2026 data. Tap a section to explore. Always verify critical figures with official sources before making relocation decisions.</span>
        </p>

        <Tabs defaultValue="scoring">
          {/* Desktop tabs — wrap */}
          <TabsList className="hidden md:flex flex-wrap h-auto gap-1 bg-slate-100 p-1 rounded-lg mb-6">
            {TABS.map(t => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs sm:text-sm rounded-md">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* Mobile tabs — sticky nav bar with underline indicator */}
          <div className="md:hidden -mx-4 sticky top-14 z-30 bg-white border-b border-slate-200 mb-5">
            <div className="overflow-x-auto scrollbar-none">
              <TabsList className="flex w-max gap-0 bg-transparent p-0 rounded-none h-auto">
                {TABS.map(t => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="
                      relative text-sm font-medium whitespace-nowrap
                      px-4 py-3.5 rounded-none bg-transparent
                      text-slate-500
                      data-[state=active]:text-blue-600
                      data-[state=active]:shadow-none
                      data-[state=active]:bg-transparent
                      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full
                      after:bg-transparent
                      data-[state=active]:after:bg-blue-600
                    "
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value="scoring"><ScoringTab /></TabsContent>
          <TabsContent value="taxes"><TaxesTab /></TabsContent>
          <TabsContent value="col"><CostOfLivingTab /></TabsContent>
          <TabsContent value="housing"><HousingTab /></TabsContent>
          <TabsContent value="financial"><FinancialTab /></TabsContent>
          <TabsContent value="climate"><ClimateTab /></TabsContent>
          <TabsContent value="employment"><EmploymentTab /></TabsContent>
          <TabsContent value="veterans"><VeteransTab /></TabsContent>
          <TabsContent value="va-disability"><VADisabilityTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
