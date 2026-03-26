import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Info,
} from 'lucide-react';
import { StateData } from '../data/stateData';
import {
  FinancialInputs,
  FinancialBreakdown,
  computeAllRealities,
  fmt$,
} from '../data/financialReality';
import { cn } from '@/app/components/ui/utils';

interface Props {
  states: StateData[];
  inputs: FinancialInputs;
}

interface LineItem {
  label: string;
  value: string;
  sub?: string;
}

function BreakdownTooltip({ breakdown }: { breakdown: FinancialBreakdown }) {
  const items: LineItem[] = [
    { label: 'State tax on pension', value: fmt$(breakdown.stateTaxOnPension) },
    { label: 'Property tax (monthly)', value: fmt$(breakdown.propertyTaxMonthly) },
    {
      label: 'Sales tax on spending',
      value: fmt$(breakdown.salesTaxOnSpending),
      sub: '~35% of income × combined rate',
    },
    { label: 'Home insurance', value: fmt$(breakdown.homeInsuranceMonthly) },
    { label: 'Auto insurance', value: fmt$(breakdown.autoInsuranceMonthly) },
    { label: 'Utilities', value: fmt$(breakdown.utilitiesMonthly) },
  ];

  return (
    <div className="absolute z-50 top-full mt-2 left-0 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 text-sm">
      <p className="font-semibold text-slate-800 mb-3">Monthly Cost Breakdown</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-start gap-2">
            <div>
              <span className="text-slate-600">{item.label}</span>
              {item.sub && <p className="text-xs text-slate-400">{item.sub}</p>}
            </div>
            <span className="font-medium text-slate-800 flex-shrink-0">{item.value}</span>
          </div>
        ))}
        <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
          <span>Total tracked</span>
          <span>{fmt$(breakdown.totalTrackedExpenses)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 leading-relaxed">
        Estimates based on state averages. Does not include food, healthcare, transportation, or
        personal spending.
      </p>
    </div>
  );
}

export default function FinancialRealityBanner({ states, inputs }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const results = useMemo(() => computeAllRealities(states, inputs), [states, inputs]);

  if (results.length === 0) return null;

  const sorted = [...results].sort(
    (a, b) => b.breakdown.monthlyRemaining - a.breakdown.monthlyRemaining
  );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const avgRemaining =
    results.reduce((sum, r) => sum + r.breakdown.monthlyRemaining, 0) / results.length;

  // Use the top-ranked state (already sorted by score in Dashboard) for center card
  const topState = results[0];

  const hasDisability =
    inputs.disabilityRating && inputs.disabilityRating !== 'none' && inputs.disabilityRating !== '';
  const monthlyPension = inputs.retirementIncome / 12;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-xl border border-slate-700 overflow-hidden mb-6">
      {/* Header row */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold tracking-wide uppercase">
              Your Financial Reality
            </span>
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors"
          >
            {expanded ? 'Less detail' : 'Full breakdown'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
        <p className="text-slate-400 text-sm">
          Based on <span className="text-white font-medium">{fmt$(monthlyPension)}/mo pension</span>
          {hasDisability && (
            <>
              {' '}
              +{' '}
              <span className="text-white font-medium">
                {fmt$(topState.breakdown.monthlyDisabilityPay)}/mo VA disability (
                {inputs.disabilityRating}%)
              </span>
            </>
          )}{' '}
          across <span className="text-white font-medium">{results.length} states</span>
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700">
        {/* Total monthly income */}
        <div className="bg-slate-800/80 px-5 py-4">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
            Total Monthly Income
          </p>
          <p className="text-2xl font-bold text-white">
            {fmt$(topState.breakdown.totalMonthlyIncome)}
          </p>
          {hasDisability && (
            <p className="text-xs text-slate-400 mt-1">Pension + disability combined</p>
          )}
          <div className="mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-xs text-green-400">VA disability tax-free in all 50 states</span>
          </div>
        </div>

        {/* Estimated tracked costs — top ranked state */}
        <div
          className="bg-slate-800/80 px-5 py-4 relative"
          onMouseEnter={() => setShowTooltip('costs')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <div className="flex items-center gap-1 mb-1">
            <p className="text-slate-400 text-xs uppercase tracking-wide">Est. Monthly Costs</p>
            <Info className="w-3 h-3 text-slate-500 cursor-help" />
          </div>
          <p className="text-2xl font-bold text-white">
            {fmt$(topState.breakdown.totalTrackedExpenses)}
          </p>
          <p className="text-xs text-slate-400 mt-1">Tax + insurance + utilities</p>
          <p className="text-xs text-slate-500 mt-1">In {topState.state.name} (top ranked)</p>
          {showTooltip === 'costs' && <BreakdownTooltip breakdown={topState.breakdown} />}
        </div>

        {/* Best state */}
        <div className="bg-slate-800/80 px-5 py-4">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Best State</p>
          </div>
          <p className="text-xl font-bold text-white leading-tight">{best.state.name}</p>
          <p className="text-green-400 font-semibold text-sm mt-1">
            {fmt$(best.breakdown.monthlyRemaining)}/mo remaining
          </p>
          <p className="text-xs text-green-300/70 mt-0.5">
            +{fmt$(best.breakdown.monthlyRemaining - avgRemaining)} vs avg
          </p>
        </div>

        {/* Worst state */}
        <div className="bg-slate-800/80 px-5 py-4">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-red-400" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Highest Cost State</p>
          </div>
          <p className="text-xl font-bold text-white leading-tight">{worst.state.name}</p>
          <p className="text-red-400 font-semibold text-sm mt-1">
            {fmt$(worst.breakdown.monthlyRemaining)}/mo remaining
          </p>
          <p className="text-xs text-red-300/70 mt-0.5">
            {fmt$(worst.breakdown.monthlyRemaining - avgRemaining)} vs avg
          </p>
        </div>
      </div>

      {/* Expanded breakdown table */}
      {expanded && (
        <div className="px-6 py-5 bg-slate-900/60 border-t border-slate-700">
          <p className="text-slate-300 text-sm font-semibold mb-3">
            Top 10 States — Monthly Remaining After Tracked Costs
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wide">
                  <th className="text-left pb-2 pr-4">State</th>
                  <th className="text-right pb-2 pr-4">Pension Tax</th>
                  <th className="text-right pb-2 pr-4">Prop. Tax/mo</th>
                  <th className="text-right pb-2 pr-4">Insurance/mo</th>
                  <th className="text-right pb-2 pr-4">Utilities/mo</th>
                  <th className="text-right pb-2 pr-4">Total Costs</th>
                  <th className="text-right pb-2">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {sorted.slice(0, 10).map(({ state, breakdown }, i) => (
                  <tr
                    key={state.id}
                    className={cn('border-t border-slate-800', i === 0 && 'bg-green-900/20')}
                  >
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        {i === 0 && (
                          <span className="text-xs bg-green-700/50 text-green-300 px-1.5 py-0.5 rounded">
                            Best
                          </span>
                        )}
                        <span className="text-white font-medium">{state.name}</span>
                        <span className="text-slate-500 text-xs">{state.abbreviation}</span>
                      </div>
                    </td>
                    <td className="text-right py-2 pr-4">
                      <span
                        className={cn(
                          'text-xs px-1.5 py-0.5 rounded',
                          breakdown.stateTaxOnPension === 0
                            ? 'bg-green-900/40 text-green-400'
                            : 'bg-red-900/40 text-red-400'
                        )}
                      >
                        {breakdown.stateTaxOnPension === 0
                          ? 'Exempt'
                          : `-${fmt$(breakdown.stateTaxOnPension)}`}
                      </span>
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-300">
                      {fmt$(breakdown.propertyTaxMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-300">
                      {fmt$(breakdown.homeInsuranceMonthly + breakdown.autoInsuranceMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-300">
                      {fmt$(breakdown.utilitiesMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-300">
                      {fmt$(breakdown.totalTrackedExpenses)}
                    </td>
                    <td className="text-right py-2">
                      <span
                        className={cn(
                          'font-bold',
                          breakdown.monthlyRemaining > avgRemaining
                            ? 'text-green-400'
                            : breakdown.monthlyRemaining < avgRemaining
                              ? 'text-red-400'
                              : 'text-slate-300'
                        )}
                      >
                        {fmt$(breakdown.monthlyRemaining)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 mt-4 leading-relaxed">
            Estimates use state average insurance and utility rates. Property tax based on state
            median home value × effective rate. Sales tax applied to ~35% of monthly income. Does
            not include food, healthcare, mortgage principal, or discretionary spending. VA
            Disability Compensation is exempt from all state taxes under federal law (38 U.S.C. §
            5301).
          </p>
        </div>
      )}
    </div>
  );
}
