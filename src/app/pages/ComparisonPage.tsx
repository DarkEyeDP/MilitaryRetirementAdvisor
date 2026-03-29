/**
 * ComparisonPage — full-page side-by-side comparison of up to 3 states.
 *
 * Reads compared states from localStorage ('comparison-favorites').
 * Reads financial inputs from localStorage ('landing-preferences').
 * Reads user cost profile from localStorage ('budget-profile').
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, DollarSign, LayoutGrid, Building2, ShieldCheck,
  CheckCircle2, AlertCircle, XCircle, TrendingUp, TrendingDown,
  Home, Users, Thermometer, Wind, Flame, Waves, Snowflake,
  TriangleAlert, Mountain, Shield,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { statesData, calculateCustomScore, DEFAULT_SCORE_WEIGHTS, scoreTier } from '../data/stateData';
import {
  calculateFinancialReality,
  fmt$,
  type FinancialInputs,
  type UserCostProfile,
  DEFAULT_USER_COST_PROFILE,
  VA_DISABILITY_MONTHLY,
} from '../data/financialReality';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
import { stateFinancialData } from '../data/financialData';
import { stateHousingData, NATIONAL_HOUSING } from '../data/housingData';
import { stateClimateData } from '../data/climateData';
import type { RiskLevel } from '../data/climateData';
import ComparisonMap from '../components/ComparisonMap';

// ─── Color palettes per state index ─────────────────────────────────────────

const STATE_COLORS = [
  { border: 'border-blue-400', headerBg: 'bg-blue-500', lightBg: 'bg-blue-50', pill: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', text: 'text-blue-600' },
  { border: 'border-emerald-400', headerBg: 'bg-emerald-500', lightBg: 'bg-emerald-50', pill: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  { border: 'border-amber-400', headerBg: 'bg-amber-500', lightBg: 'bg-amber-50', pill: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', text: 'text-amber-600' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtVetPop(n: number): string {
  return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M' : (n / 1000).toFixed(0) + 'k';
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-slate-500';
}

function riskColor(level: RiskLevel) {
  if (level === 'High') return 'text-red-600 bg-red-50 border-red-200';
  if (level === 'Moderate') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  if (level === 'Low') return 'text-blue-600 bg-blue-50 border-blue-200';
  return 'text-slate-400 bg-slate-50 border-slate-200';
}

/** Returns index of the best (max/min) value among vals. tie → -1 */
function bestIdx(vals: number[], prefer: 'max' | 'min'): number {
  if (vals.length === 0) return -1;
  const target = prefer === 'max' ? Math.max(...vals) : Math.min(...vals);
  const indices = vals.map((v, i) => (v === target ? i : -1)).filter((i) => i !== -1);
  return indices.length === 1 ? indices[0] : -1;
}

// ─── Shared components ────────────────────────────────────────────────────────

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
          {icon}
        </div>
        <h2 className="font-semibold text-slate-800 text-base">{title}</h2>
      </div>
      {children}
    </div>
  );
}

interface RowProps {
  label: string;
  values: React.ReactNode[];
  bold?: boolean;
  divider?: boolean;
  bestIdx?: number; // index of best cell, gets green highlight
  n: number;
}

function Row({ label, values, bold, divider, bestIdx: best, n }: RowProps) {
  return (
    <tr className={`border-b border-slate-100 last:border-0 ${divider ? 'border-t-2 border-slate-200' : ''}`}>
      <td className={`px-5 py-3 text-sm bg-slate-50/70 ${bold ? 'font-semibold text-slate-800' : 'text-slate-500 font-medium'}`}>
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`px-4 py-3 text-sm text-center ${bold ? 'font-semibold text-slate-900' : 'text-slate-800'} ${n === 2 ? 'w-[38%]' : 'w-[28%]'}`}
        >
          <div className="flex items-center justify-center gap-1.5">
            {best === i && <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />}
            {val}
          </div>
        </td>
      ))}
    </tr>
  );
}

function CTable({ states, children }: { states: { name: string; idx: number }[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <colgroup>
          <col style={{ width: '200px' }} />
          {states.map((_, i) => <col key={i} />)}
        </colgroup>
        <thead>
          <tr className="border-b-2 border-slate-100">
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/70" />
            {states.map(({ name, idx: _idx }) => (
              <th key={_idx} className="px-4 py-3 text-center bg-slate-50/70">
                <span className="text-sm font-semibold text-slate-800">{name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComparisonPage() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  // Load compared state IDs
  const favoriteIds: string[] = JSON.parse(localStorage.getItem('comparison-favorites') ?? '[]');
  const states = favoriteIds
    .map((id) => statesData.find((s) => s.id === id))
    .filter((s): s is (typeof statesData)[0] => s !== undefined);

  // Financial inputs — read from multiple possible localStorage keys
  const financialInputs: FinancialInputs = {
    retirementIncome:
      Number(localStorage.getItem('origin-retirement-income') || '0') ||
      JSON.parse(localStorage.getItem('landing-preferences') ?? '{}').retirementIncome ||
      60000,
    disabilityRating:
      localStorage.getItem('origin-disability-rating') ||
      JSON.parse(localStorage.getItem('landing-preferences') ?? '{}').disabilityRating ||
      'none',
  };

  const userCostProfile: UserCostProfile =
    JSON.parse(localStorage.getItem('budget-profile') ?? 'null') ?? DEFAULT_USER_COST_PROFILE;

  const n = states.length;
  const stateEntries = states.map((s, idx) => ({ ...s, idx }));

  const breakdowns = states.map((s) => calculateFinancialReality(s, financialInputs, userCostProfile));
  const scores = states.map((s) => calculateCustomScore(s, DEFAULT_SCORE_WEIGHTS));

  const anyGroceries = breakdowns.some((b) => b.groceryMonthly > 0);
  const anyCustom = breakdowns.some((b) => b.customExpensesMonthly > 0);

  const mul = annual ? 12 : 1;
  const fmtVal = (v: number) => fmt$(v * mul);

  // Empty state
  if (n === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 p-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-2">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">No States Selected</h1>
          <p className="text-slate-500">Add up to 3 states from the dashboard or a state detail page to compare them here.</p>
        </div>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard
        </Button>
      </div>
    );
  }

  const flagUrl = (abbr: string) =>
    `https://cdn.jsdelivr.net/gh/hayleox/flags@master/svg/us/${abbr.toLowerCase()}.svg`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate('/dashboard')} className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-900 flex-shrink-0">State Comparison</span>
            <div className="flex items-center divide-x divide-slate-200">
              {states.map((s) => (
                <span key={s.id} className="px-3 first:pl-3 text-sm font-medium text-slate-700">{s.name}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-semibold">
              <button onClick={() => setAnnual(false)} className={`px-3 py-1.5 transition-colors ${!annual ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-3 py-1.5 transition-colors ${annual ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Annual</button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="text-slate-500 hidden sm:flex">Back to Dashboard</Button>
          </div>
        </div>
      </header>

      {/* Hero State Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className={`grid gap-4 ${n === 1 ? 'grid-cols-1 max-w-sm' : n === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {states.map((s, idx) => {
            const score = scores[idx];
            const tier = scoreTier(score);
            const taxIcon = s.militaryPensionTax === 'No' ? CheckCircle2 : s.militaryPensionTax === 'Partial' ? AlertCircle : XCircle;
            const TaxIcon = taxIcon;
            const taxColor = s.militaryPensionTax === 'No' ? 'text-green-600 bg-green-50' : s.militaryPensionTax === 'Partial' ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50';
            const taxLabel = s.militaryPensionTax === 'No' ? 'Tax Free' : s.militaryPensionTax === 'Partial' ? 'Partial Tax' : 'Fully Taxed';
            const bd = breakdowns[idx];
            return (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className={`px-5 pt-5 pb-4`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img src={flagUrl(s.abbreviation)} alt="" className="h-7 w-auto border border-slate-200/60 shadow-sm" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div>
                        <div className="text-xs text-slate-400 font-semibold">{s.abbreviation}</div>
                        <div className="font-bold text-slate-900 text-base leading-tight">{s.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold leading-none ${getScoreColor(score)}`}>{score}</div>
                      <div className="text-xs text-slate-400 mt-0.5">/ 100</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    <span className={tier.className + ' text-xs font-semibold px-2 py-0.5 rounded-full'}>{tier.label}</span>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${taxColor}`}>
                      <TaxIcon className="w-3 h-3" />{taxLabel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="bg-slate-50 rounded-lg px-2.5 py-2">
                      <div className="text-slate-400 font-medium">Monthly income</div>
                      <div className="font-bold text-slate-800 mt-0.5">{fmt$(bd.totalMonthlyIncome)}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-2.5 py-2">
                      <div className="text-slate-400 font-medium">Monthly left</div>
                      <div className={`font-bold mt-0.5 ${bd.monthlyRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt$(bd.monthlyRemaining)}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-2.5 py-2">
                      <div className="text-slate-400 font-medium">Income tax</div>
                      <div className="font-bold text-slate-800 mt-0.5">{s.stateIncomeTax === 0 ? <span className="text-green-600">None</span> : `${s.stateIncomeTax}%`}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-2.5 py-2">
                      <div className="text-slate-400 font-medium">COL index</div>
                      <div className={`font-bold mt-0.5 ${s.costOfLivingIndex < 95 ? 'text-green-600' : s.costOfLivingIndex > 110 ? 'text-red-600' : 'text-slate-800'}`}>{s.costOfLivingIndex}</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => navigate(`/state/${s.id}`)} className="w-full py-2.5 text-xs font-semibold border-t border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                  View Full Detail →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Page Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Section 1: Financial Reality ─────────────────────────────── */}
        <Section title="Financial Reality" icon={<DollarSign className="w-4 h-4" />}>
          <CTable states={stateEntries}>
            {/* Income */}
            <Row n={n} label="Military Pension / mo" values={breakdowns.map((b) => <span className="font-semibold">{fmt$(b.monthlyPension)}</span>)} bestIdx={bestIdx(breakdowns.map(b => b.monthlyPension), 'max')} />
            {financialInputs.disabilityRating !== 'none' && financialInputs.disabilityRating !== '' && (
              <Row n={n} label="VA Disability / mo" values={breakdowns.map((b) => <span className="text-blue-700 font-semibold">{fmt$(b.monthlyDisabilityPay)}</span>)} />
            )}
            <Row n={n} label={annual ? 'Total Annual Income' : 'Total Monthly Income'} bold values={breakdowns.map((b) => <span className="text-slate-900">{fmtVal(b.totalMonthlyIncome)}</span>)} bestIdx={bestIdx(breakdowns.map(b => b.totalMonthlyIncome), 'max')} />
            {/* Tax */}
            <Row n={n} label="Pension Tax" divider values={breakdowns.map((b) => b.stateTaxOnPension === 0 ? <span className="text-green-600 font-semibold">Exempt</span> : <span className="text-red-600 font-semibold">-{fmtVal(b.stateTaxOnPension)}</span>)} bestIdx={bestIdx(breakdowns.map(b => b.stateTaxOnPension), 'min')} />
            {/* Expenses */}
            <Row n={n} label="Property Tax" divider values={breakdowns.map((b) => fmtVal(b.propertyTaxMonthly))} bestIdx={bestIdx(breakdowns.map(b => b.propertyTaxMonthly), 'min')} />
            <Row n={n} label="Sales Tax on Spending" values={breakdowns.map((b) => fmtVal(b.salesTaxOnSpending))} bestIdx={bestIdx(breakdowns.map(b => b.salesTaxOnSpending), 'min')} />
            <Row n={n} label="Home Insurance" values={breakdowns.map((b) => fmtVal(b.homeInsuranceMonthly))} bestIdx={bestIdx(breakdowns.map(b => b.homeInsuranceMonthly), 'min')} />
            <Row n={n} label="Auto Insurance" values={breakdowns.map((b) => fmtVal(b.autoInsuranceMonthly))} bestIdx={bestIdx(breakdowns.map(b => b.autoInsuranceMonthly), 'min')} />
            <Row n={n} label="Utilities" values={breakdowns.map((b) => fmtVal(b.utilitiesMonthly))} bestIdx={bestIdx(breakdowns.map(b => b.utilitiesMonthly), 'min')} />
            {anyGroceries && <Row n={n} label="Groceries" values={breakdowns.map((b) => b.groceryMonthly > 0 ? fmtVal(b.groceryMonthly) : '—')} bestIdx={bestIdx(breakdowns.map(b => b.groceryMonthly), 'min')} />}
            {anyCustom && <Row n={n} label="Custom Expenses" values={breakdowns.map((b) => b.customExpensesMonthly > 0 ? fmtVal(b.customExpensesMonthly) : '—')} />}
            <Row n={n} label={annual ? 'Total Annual Costs' : 'Total Monthly Costs'} bold divider values={breakdowns.map((b) => fmtVal(b.totalTrackedExpenses))} bestIdx={bestIdx(breakdowns.map(b => b.totalTrackedExpenses), 'min')} />
            <Row n={n} label={annual ? 'Annual Remaining' : 'Monthly Remaining'} bold values={breakdowns.map((b) => <span className={b.monthlyRemaining >= 0 ? 'text-green-600' : 'text-red-600'}>{fmtVal(b.monthlyRemaining)}</span>)} bestIdx={bestIdx(breakdowns.map(b => b.monthlyRemaining), 'max')} />
          </CTable>
        </Section>

        {/* ── Section 2: Scores & Tax ───────────────────────────────────── */}
        <Section title="Scores &amp; Taxes" icon={<LayoutGrid className="w-4 h-4" />}>
          <CTable states={stateEntries}>
            <Row n={n} label="Overall Score" values={states.map((s, i) => {
              const sc = scores[i]; const tier = scoreTier(sc);
              return <div className="flex flex-col items-center gap-1"><span className={`text-xl font-bold ${getScoreColor(sc)}`}>{sc}</span><span className={`${tier.className} text-xs px-2 py-0.5 rounded-full font-semibold`}>{tier.label}</span></div>;
            })} bestIdx={bestIdx(scores, 'max')} />
            <Row n={n} label="Military Pension Tax" divider values={states.map((s) => {
              const cls = s.militaryPensionTax === 'No' ? 'bg-green-100 text-green-700' : s.militaryPensionTax === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
              const lbl = s.militaryPensionTax === 'No' ? 'Tax Free' : s.militaryPensionTax === 'Partial' ? 'Partial' : 'Taxed';
              return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>{lbl}</span>;
            })} bestIdx={bestIdx(states.map(s => s.militaryPensionTax === 'No' ? 2 : s.militaryPensionTax === 'Partial' ? 1 : 0), 'max')} />
            <Row n={n} label="State Income Tax" values={states.map((s) => s.stateIncomeTax === 0 ? <span className="text-green-600 font-semibold">None</span> : `${s.stateIncomeTax}%`)} bestIdx={bestIdx(states.map(s => s.stateIncomeTax), 'min')} />
            <Row n={n} label="Sales Tax" values={states.map((s) => { const fin = stateFinancialData[s.id]; return fin ? `${fin.salesTaxCombined}%` : `${s.salesTax}%`; })} bestIdx={bestIdx(states.map(s => { const f = stateFinancialData[s.id]; return f ? f.salesTaxCombined : s.salesTax; }), 'min')} />
            <Row n={n} label="Property Tax Level" values={states.map((s) => {
              const cls = s.propertyTaxLevel === 'Low' ? 'bg-green-100 text-green-700' : s.propertyTaxLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
              return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>{s.propertyTaxLevel}</span>;
            })} bestIdx={bestIdx(states.map(s => s.propertyTaxLevel === 'Low' ? 2 : s.propertyTaxLevel === 'Medium' ? 1 : 0), 'max')} />
            <Row n={n} label="Cost of Living" divider values={states.map((s) => { const c = s.costOfLivingIndex; return <span className={c < 95 ? 'text-green-600 font-semibold' : c > 110 ? 'text-red-600 font-semibold' : 'text-yellow-600 font-semibold'}>{c}</span>; })} bestIdx={bestIdx(states.map(s => s.costOfLivingIndex), 'min')} />
            <Row n={n} label="VA Benefits Score" values={states.map((s) => <span className="font-semibold">{s.veteranBenefitsScore}<span className="text-xs font-normal text-slate-400">/100</span></span>)} bestIdx={bestIdx(states.map(s => s.veteranBenefitsScore), 'max')} />
            <Row n={n} label="Veteran Population" values={states.map((s) => fmtVetPop(s.veteranPopulation))} bestIdx={bestIdx(states.map(s => s.veteranPopulation), 'max')} />
          </CTable>
        </Section>

        {/* ── Section 3: Housing ───────────────────────────────────────── */}
        <Section title="Housing &amp; Cost" icon={<Home className="w-4 h-4" />}>
          <CTable states={stateEntries}>
            <Row n={n} label="Avg Home Price" values={states.map((s) => `$${(s.avgHomeCost / 1000).toFixed(0)}k`)} bestIdx={bestIdx(states.map(s => s.avgHomeCost), 'min')} />
            <Row n={n} label="Median Rent / mo" values={states.map((s) => { const h = stateHousingData[s.id]; return h ? fmt$(h.medianRent) : '—'; })} bestIdx={bestIdx(states.map(s => stateHousingData[s.id]?.medianRent ?? 9999), 'min')} />
            <Row n={n} label="Price Trend (YoY)" values={states.map((s) => { const h = stateHousingData[s.id]; if (!h) return '—'; const up = h.housingPriceTrend > 0; return <span className={`flex items-center gap-1 justify-center ${up ? 'text-red-500' : 'text-green-600'}`}>{up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{Math.abs(h.housingPriceTrend)}%</span>; })} />
            <Row n={n} label="vs. National Avg Rent" values={states.map((s) => { const h = stateHousingData[s.id]; if (!h) return '—'; const diff = h.medianRent - NATIONAL_HOUSING.medianRent; return <span className={diff < 0 ? 'text-green-600 font-semibold' : 'text-slate-600'}>{diff < 0 ? `-$${Math.abs(diff).toLocaleString()}` : `+$${diff.toLocaleString()}`}</span>; })} bestIdx={bestIdx(states.map(s => stateHousingData[s.id]?.medianRent ?? 9999), 'min')} />
          </CTable>
        </Section>

        {/* ── Section 4: VA Facilities ──────────────────────────────────── */}
        <Section title="VA Facilities" icon={<Building2 className="w-4 h-4" />}>
          <CTable states={stateEntries}>
            <Row n={n} label="VA Medical Centers" values={states.map((s) => (vaFacilityLocations[s.id] ?? []).filter(f => f.type !== 'clinic').length)} bestIdx={bestIdx(states.map(s => (vaFacilityLocations[s.id] ?? []).filter(f => f.type !== 'clinic').length), 'max')} />
            <Row n={n} label="VA Clinics" values={states.map((s) => (vaFacilityLocations[s.id] ?? []).filter(f => f.type === 'clinic').length)} bestIdx={bestIdx(states.map(s => (vaFacilityLocations[s.id] ?? []).filter(f => f.type === 'clinic').length), 'max')} />
            <Row n={n} label="Total VA Locations" bold divider values={states.map((s) => (vaFacilityLocations[s.id] ?? []).length)} bestIdx={bestIdx(states.map(s => (vaFacilityLocations[s.id] ?? []).length), 'max')} />
          </CTable>
          <div className="px-6 py-6 border-t border-slate-100 isolate">
            <ComparisonMap stateIds={states.map((s) => s.id)} />
          </div>
        </Section>

        {/* ── Section 5: Climate ───────────────────────────────────────── */}
        <Section title="Climate &amp; Natural Disaster Risk" icon={<Thermometer className="w-4 h-4" />}>
          <CTable states={stateEntries}>
            <Row n={n} label="Summer High (July)" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? `${c.avgSummerHighF}°F` : '—'; })} bestIdx={bestIdx(states.map(s => stateClimateData[s.id]?.avgSummerHighF ?? 999), 'min')} />
            <Row n={n} label="Winter Low (Jan)" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? `${c.avgWinterLowF}°F` : '—'; })} />
            <Row n={n} label="Humidity" values={states.map((s) => { const c = stateClimateData[s.id]; if (!c) return '—'; const cls = c.humidity === 'Low' ? 'text-green-600' : c.humidity === 'Moderate' ? 'text-yellow-600' : 'text-red-600'; return <span className={`font-semibold ${cls}`}>{c.humidity}</span>; })} />
            <Row n={n} label="Annual Rainfall" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? `${c.annualRainfallInches}"` : '—'; })} />
          </CTable>
          {/* Disaster risk grid */}
          <div className="border-t border-slate-100 px-6 py-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Disaster Risk Levels</p>
            <div className={`grid gap-3 ${n === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {states.map((s, idx) => {
                const c = stateClimateData[s.id];
                if (!c) return null;
                const risks: { label: string; val: RiskLevel; Icon: React.ElementType }[] = [
                  { label: 'Hurricane', val: c.disasterRisk.hurricane, Icon: Wind },
                  { label: 'Wildfire', val: c.disasterRisk.wildfire, Icon: Flame },
                  { label: 'Flood', val: c.disasterRisk.flood, Icon: Waves },
                  { label: 'Tornado', val: c.disasterRisk.tornado, Icon: TriangleAlert },
                  { label: 'Earthquake', val: c.disasterRisk.earthquake, Icon: Mountain },
                  { label: 'Winter Storm', val: c.disasterRisk.winterStorm, Icon: Snowflake },
                ];
                return (
                  <div key={s.id} className={`rounded-xl border p-3 ${STATE_COLORS[idx].lightBg} border-current border-opacity-20`} style={{ borderColor: undefined }}>
                    <div className={`text-xs font-bold mb-2.5 ${STATE_COLORS[idx].text}`}>{s.name}</div>
                    <div className="space-y-1.5">
                      {risks.map(({ label, val, Icon }) => (
                        <div key={label} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500"><Icon className="w-3 h-3 flex-shrink-0" />{label}</div>
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${riskColor(val)}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ── Section 6: Military Benefits ──────────────────────────────── */}
        <Section title="Military Benefits" icon={<ShieldCheck className="w-4 h-4" />}>
          <div className={`grid gap-4 p-6 ${n === 1 ? 'grid-cols-1' : n === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {states.map((s, idx) => (
              <div key={s.id} className={`rounded-xl border p-4 space-y-3 ${STATE_COLORS[idx].lightBg}`} style={{ borderColor: undefined }}>
                <div className={`text-sm font-bold ${STATE_COLORS[idx].text}`}>{s.name}</div>
                <ul className="space-y-2">
                  {s.militaryBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATE_COLORS[idx].dot}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 7: Pros & Cons ────────────────────────────────────── */}
        <Section title="Pros &amp; Cons" icon={<Users className="w-4 h-4" />}>
          <div className={`grid gap-4 p-6 ${n === 1 ? 'grid-cols-1' : n === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {states.map((s, idx) => (
              <div key={s.id} className="space-y-3">
                <div className={`text-sm font-bold ${STATE_COLORS[idx].text}`}>{s.name}</div>
                <div className="space-y-1.5">
                  {s.pros.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5 pt-1">
                  {s.cons.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

      </main>

      <footer className="border-t bg-white mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-slate-400">
          Data updated March 2026 · Always verify tax laws and benefits with official state resources and your financial advisor.
        </div>
      </footer>
    </div>
  );
}
