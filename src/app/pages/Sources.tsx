import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { statesData, calculateCustomScore } from '../data/stateData';
import { stateFinancialData } from '../data/financialData';
import { stateHousingData } from '../data/housingData';
import { stateClimateData } from '../data/climateData';
import { stateEmploymentData } from '../data/employmentData';
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
import { ArrowLeft, BookOpen, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

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
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">How the Retirement Score is Calculated</h2>
        <p className="text-sm text-slate-500 mb-5">
          Each state receives a 0–100 score based on three weighted factors. The default weights reflect what
          matters most to the average military retiree, but you can adjust them on the Dashboard.
        </p>
        <div className="flex flex-wrap gap-3 mb-6 items-center">
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

        {/* Three factor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tax Score */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
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
          <div className="bg-white border border-slate-200 rounded-xl p-4">
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
          <div className="bg-white border border-slate-200 rounded-xl p-4">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <div className="overflow-x-auto rounded-lg border border-slate-200">
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
      <SourceNote>
        Veteran population: National Center for Veterans Analysis and Statistics (NCVAS), state-level estimates.
        VA facility counts: VA.gov facility locator (major VAMCs and CBOCs). Benefits score: curated index based on
        state DMV websites, State Departments of Veterans Affairs, Military.com, and VA state summaries (2024–2025).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { value: 'scoring',    label: 'Scoring Formula' },
  { value: 'taxes',      label: 'Taxes' },
  { value: 'col',        label: 'Cost of Living' },
  { value: 'housing',    label: 'Housing' },
  { value: 'financial',  label: 'Financial' },
  { value: 'climate',    label: 'Climate' },
  { value: 'employment', label: 'Employment' },
  { value: 'veterans',   label: 'Veterans' },
];

export default function Sources() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h1 className="font-semibold text-lg">Data Sources &amp; Methodology</h1>
            </div>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
            2026 Updated Data
          </span>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          All 50 states. Every number used to compute scores is shown below — click any column header to sort.
          Data is updated annually; always verify critical figures with official sources before making relocation decisions.
        </p>

        <Tabs defaultValue="scoring">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100 p-1 rounded-lg mb-6">
            {TABS.map(t => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="text-xs sm:text-sm rounded-md"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="scoring"><ScoringTab /></TabsContent>
          <TabsContent value="taxes"><TaxesTab /></TabsContent>
          <TabsContent value="col"><CostOfLivingTab /></TabsContent>
          <TabsContent value="housing"><HousingTab /></TabsContent>
          <TabsContent value="financial"><FinancialTab /></TabsContent>
          <TabsContent value="climate"><ClimateTab /></TabsContent>
          <TabsContent value="employment"><EmploymentTab /></TabsContent>
          <TabsContent value="veterans"><VeteransTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
