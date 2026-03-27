/**
 * ComparisonPage — full-page side-by-side comparison of up to 3 states.
 *
 * Reads compared states from localStorage ('comparison-favorites').
 * Reads financial inputs from localStorage ('landing-preferences').
 * Reads user cost profile from localStorage ('budget-profile').
 */

import { useNavigate } from 'react-router';
import { ArrowLeft, DollarSign, LayoutGrid, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { statesData } from '../data/stateData';
import {
  calculateFinancialReality,
  fmt$,
  type FinancialInputs,
  type UserCostProfile,
  DEFAULT_USER_COST_PROFILE,
} from '../data/financialReality';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
import { stateFinancialData } from '../data/financialData';
import ComparisonMap from '../components/ComparisonMap';

// ─── Color palettes per state index ─────────────────────────────────────────

const STATE_BORDER_COLORS = [
  'border-blue-500',
  'border-green-500',
  'border-amber-500',
];
const STATE_BG_TINTS = [
  'bg-blue-50/50',
  'bg-green-50/50',
  'bg-amber-50/50',
];
const STATE_PILL_CLASSES = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-amber-100 text-amber-700',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatVeteranPop(n: number): string {
  return n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + 'M'
    : (n / 1000).toFixed(0) + 'k';
}

// ─── Shared table components ─────────────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

interface TableProps {
  stateNames: string[];
  stateCount: number;
  children: React.ReactNode;
}

function ComparisonTable({ stateNames, stateCount, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <colgroup>
          <col className="w-44" />
          {stateNames.map((_, i) => (
            <col key={i} style={{ width: `${Math.floor(100 / (stateCount + 1))}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 bg-slate-50 border-b border-slate-100" />
            {stateNames.map((name, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-center text-sm font-semibold border-b border-slate-100 border-t-2 ${STATE_BORDER_COLORS[idx]} ${STATE_BG_TINTS[idx]}`}
              >
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATE_PILL_CLASSES[idx]}`}>
                  {name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface RowProps {
  label: string;
  values: React.ReactNode[];
  bold?: boolean;
  borderTop?: boolean;
  even?: boolean;
}

function TableRow({ label, values, bold, borderTop, even }: RowProps) {
  return (
    <tr
      className={`border-b border-slate-100 last:border-0 ${borderTop ? 'border-t border-slate-200' : ''} ${even ? 'bg-slate-50' : 'bg-white'}`}
    >
      <td
        className={`px-4 py-3 text-sm text-slate-600 font-medium bg-slate-50 w-44 ${bold ? 'font-semibold text-slate-800' : ''}`}
      >
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`px-4 py-3 text-sm text-center text-slate-800 ${bold ? 'font-semibold' : ''}`}
        >
          {val}
        </td>
      ))}
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComparisonPage() {
  const navigate = useNavigate();

  // Load compared state IDs
  const favoriteIds: string[] = JSON.parse(localStorage.getItem('comparison-favorites') ?? '[]');
  const states = statesData.filter((s) => favoriteIds.includes(s.id));

  // Financial inputs
  const prefs = JSON.parse(localStorage.getItem('landing-preferences') ?? '{}');
  const financialInputs: FinancialInputs = {
    retirementIncome: prefs.retirementIncome ?? 60000,
    disabilityRating: prefs.disabilityRating ?? 'none',
  };

  // User cost profile
  const userCostProfile: UserCostProfile =
    JSON.parse(localStorage.getItem('budget-profile') ?? 'null') ?? DEFAULT_USER_COST_PROFILE;

  const stateNames = states.map((s) => s.name);
  const n = states.length;

  // Compute financial breakdowns
  const breakdowns = states.map((s) =>
    calculateFinancialReality(s, financialInputs, userCostProfile)
  );

  // Check optional rows
  const anyGroceries = breakdowns.some((b) => b.groceryMonthly > 0);
  const anyCustom = breakdowns.some((b) => b.customExpensesMonthly > 0);

  // Empty state
  if (states.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 p-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">No States Selected</h1>
          <p className="text-slate-500">
            Add states to your comparison list from the dashboard to compare them here.
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors flex-shrink-0"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-lg text-slate-800 flex-shrink-0">State Comparison</span>
            <div className="flex items-center gap-2 flex-wrap">
              {states.map((s, idx) => (
                <span
                  key={s.id}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATE_PILL_CLASSES[idx]}`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="flex-shrink-0 text-slate-600">
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Page Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ── Section 1: Financial Reality ─────────────────────────────── */}
        <Section title="Financial Reality" icon={<DollarSign className="w-5 h-5" />}>
          <ComparisonTable stateNames={stateNames} stateCount={n}>
            <TableRow
              label="Monthly Income"
              even={false}
              values={breakdowns.map((b) => (
                <span className="font-medium text-slate-900">{fmt$(b.totalMonthlyIncome)}</span>
              ))}
            />
            <TableRow
              label="State Tax on Pension"
              even={true}
              values={breakdowns.map((b) =>
                b.stateTaxOnPension === 0 ? (
                  <span className="text-green-600 font-medium">Exempt</span>
                ) : (
                  <span className="text-red-600 font-medium">-{fmt$(b.stateTaxOnPension)}</span>
                )
              )}
            />
            <TableRow
              label="Property Tax / mo"
              even={false}
              values={breakdowns.map((b) => fmt$(b.propertyTaxMonthly))}
            />
            <TableRow
              label="Sales Tax on Spending"
              even={true}
              values={breakdowns.map((b) => fmt$(b.salesTaxOnSpending))}
            />
            <TableRow
              label="Home Insurance / mo"
              even={false}
              values={breakdowns.map((b) => fmt$(b.homeInsuranceMonthly))}
            />
            <TableRow
              label="Auto Insurance / mo"
              even={true}
              values={breakdowns.map((b) => fmt$(b.autoInsuranceMonthly))}
            />
            <TableRow
              label="Utilities / mo"
              even={false}
              values={breakdowns.map((b) => fmt$(b.utilitiesMonthly))}
            />
            {anyGroceries && (
              <TableRow
                label="Groceries / mo"
                even={true}
                values={breakdowns.map((b) =>
                  b.groceryMonthly > 0 ? fmt$(b.groceryMonthly) : '—'
                )}
              />
            )}
            {anyCustom && (
              <TableRow
                label="Custom Expenses / mo"
                even={anyGroceries}
                values={breakdowns.map((b) =>
                  b.customExpensesMonthly > 0 ? fmt$(b.customExpensesMonthly) : '—'
                )}
              />
            )}
            <TableRow
              label="Total Monthly Costs"
              bold
              borderTop
              even={false}
              values={breakdowns.map((b) => fmt$(b.totalTrackedExpenses))}
            />
            <TableRow
              label="Monthly Remaining"
              bold
              even={true}
              values={breakdowns.map((b) => (
                <span className="text-green-600">{fmt$(b.monthlyRemaining)}</span>
              ))}
            />
          </ComparisonTable>
        </Section>

        {/* ── Section 2: State Overview ─────────────────────────────────── */}
        <Section title="State Overview" icon={<LayoutGrid className="w-5 h-5" />}>
          <ComparisonTable stateNames={stateNames} stateCount={n}>
            <TableRow
              label="Overall Score"
              even={false}
              values={states.map((s) => {
                const score = s.retirementScore;
                const cls =
                  score >= 90
                    ? 'bg-green-100 text-green-700'
                    : score >= 80
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700';
                return <Badge className={cls}>{score}</Badge>;
              })}
            />
            <TableRow
              label="Military Pension Tax"
              even={true}
              values={states.map((s) => {
                const cls =
                  s.militaryPensionTax === 'No'
                    ? 'bg-green-100 text-green-700'
                    : s.militaryPensionTax === 'Partial'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700';
                const label =
                  s.militaryPensionTax === 'No'
                    ? 'Tax Free'
                    : s.militaryPensionTax === 'Partial'
                    ? 'Partial'
                    : 'Taxed';
                return <Badge className={cls}>{label}</Badge>;
              })}
            />
            <TableRow
              label="State Income Tax"
              even={false}
              values={states.map((s) =>
                s.stateIncomeTax === 0 ? (
                  <span className="text-green-600 font-medium">None</span>
                ) : (
                  `${s.stateIncomeTax}%`
                )
              )}
            />
            <TableRow
              label="Sales Tax"
              even={true}
              values={states.map((s) => {
                const fin = stateFinancialData[s.id];
                return fin ? `${fin.salesTaxCombined}%` : `${s.salesTax}%`;
              })}
            />
            <TableRow
              label="Cost of Living Index"
              even={false}
              values={states.map((s) => {
                const col = s.costOfLivingIndex;
                const cls =
                  col < 95
                    ? 'text-green-600 font-medium'
                    : col <= 105
                    ? 'text-yellow-600 font-medium'
                    : 'text-red-600 font-medium';
                return <span className={cls}>{col}</span>;
              })}
            />
            <TableRow
              label="Property Tax Level"
              even={true}
              values={states.map((s) => s.propertyTaxLevel)}
            />
            <TableRow
              label="Avg Home Price"
              even={false}
              values={states.map((s) => `$${(s.avgHomeCost / 1000).toFixed(0)}k`)}
            />
            <TableRow
              label="Veteran Population"
              even={true}
              values={states.map((s) => formatVeteranPop(s.veteranPopulation))}
            />
            <TableRow
              label="VA Benefits Score"
              even={false}
              values={states.map((s) => `${s.veteranBenefitsScore}/100`)}
            />
          </ComparisonTable>
        </Section>

        {/* ── Section 3: VA Facilities ──────────────────────────────────── */}
        <Section title="VA Facilities" icon={<Building2 className="w-5 h-5" />}>
          <ComparisonTable stateNames={stateNames} stateCount={n}>
            <TableRow
              label="VA Medical Centers"
              even={false}
              values={states.map((s) => {
                const facilities = vaFacilityLocations[s.id] ?? [];
                return facilities.filter((f) => f.type !== 'clinic').length;
              })}
            />
            <TableRow
              label="VA Clinics"
              even={true}
              values={states.map((s) => {
                const facilities = vaFacilityLocations[s.id] ?? [];
                return facilities.filter((f) => f.type === 'clinic').length;
              })}
            />
            <TableRow
              label="Total VA Locations"
              bold
              borderTop
              even={false}
              values={states.map((s) => {
                const facilities = vaFacilityLocations[s.id] ?? [];
                return facilities.length;
              })}
            />
          </ComparisonTable>

          {/* Comparison Map */}
          <div className="px-6 py-6 border-t border-slate-100">
            <ComparisonMap stateIds={favoriteIds} />
          </div>
        </Section>

        {/* ── Section 4: Military Benefits ──────────────────────────────── */}
        <Section title="Military Benefits" icon={<ShieldCheck className="w-5 h-5" />}>
          <div className={`grid gap-4 p-6 ${n === 1 ? 'grid-cols-1' : n === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {states.map((s, idx) => (
              <div
                key={s.id}
                className={`rounded-lg border p-4 space-y-3 ${
                  idx === 0
                    ? 'border-blue-200 bg-blue-50/40'
                    : idx === 1
                    ? 'border-green-200 bg-green-50/40'
                    : 'border-amber-200 bg-amber-50/40'
                }`}
              >
                <div className={`text-sm font-semibold px-2 py-0.5 rounded inline-block ${STATE_PILL_CLASSES[idx]}`}>
                  {s.name}
                </div>
                <ul className="space-y-2">
                  {s.militaryBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span
                        className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          idx === 0
                            ? 'bg-blue-500'
                            : idx === 1
                            ? 'bg-green-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

      </main>
    </div>
  );
}
