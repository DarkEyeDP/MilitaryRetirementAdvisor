import { useMemo, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Trophy,
  Wallet,
  DollarSign,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

const DISABILITY_RATINGS = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
import { StateData } from '../data/stateData';
import {
  FinancialInputs,
  FinancialBreakdown,
  UserCostProfile,
  computeAllRealities,
  fmt$,
} from '../data/financialReality';
import { StateFinancialData } from '../data/financialData';
import { cn } from '@/app/components/ui/utils';

interface Props {
  states: StateData[];
  inputs: FinancialInputs;
  profile: UserCostProfile;
  stateAvg: StateFinancialData | null;
  onCustomize: () => void;
  onChangeInputs?: (inputs: FinancialInputs) => void;
}

interface LineItem {
  label: string;
  value: string;
  sub?: string;
}

function BreakdownTooltip({ breakdown, profile }: { breakdown: FinancialBreakdown; profile: UserCostProfile }) {
  const items: (LineItem & { overridden?: boolean })[] = [
    { label: 'State tax on pension', value: fmt$(breakdown.stateTaxOnPension) },
    ...(breakdown.stateTaxOnSecondaryIncome > 0 ? [{ label: 'State tax on other income', value: fmt$(breakdown.stateTaxOnSecondaryIncome) }] : []),
    { label: 'Property tax (monthly)', value: fmt$(breakdown.propertyTaxMonthly), overridden: profile.propertyTaxOverride !== null },
    {
      label: 'Sales tax on spending',
      value: fmt$(breakdown.salesTaxOnSpending),
      sub: '~35% of income × combined rate',
    },
    { label: 'Home insurance', value: fmt$(breakdown.homeInsuranceMonthly), overridden: profile.homeInsuranceOverride !== null },
    { label: 'Auto insurance', value: fmt$(breakdown.autoInsuranceMonthly), overridden: profile.autoInsuranceOverride !== null },
    { label: 'Utilities', value: fmt$(breakdown.utilitiesMonthly), overridden: profile.utilitiesOverride !== null },
  ];

  const hasCustom = breakdown.groceryMonthly > 0 || breakdown.customExpensesMonthly > 0;

  return (
    <div className="absolute z-50 top-full right-0 w-72 pt-2">
    <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-4 text-sm">
      <p className="font-semibold text-slate-800 mb-3">Monthly Cost Breakdown</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-start gap-2">
            <div>
              <span className={item.overridden ? 'text-blue-600' : 'text-slate-600'}>{item.label}</span>
              {item.sub && <p className="text-xs text-slate-400">{item.sub}</p>}
            </div>
            <span className={cn('font-medium flex-shrink-0', item.overridden ? 'text-blue-600' : 'text-slate-800')}>{item.value}</span>
          </div>
        ))}
        {breakdown.groceryMonthly > 0 && (
          <div className="flex justify-between items-start gap-2">
            <span className="text-blue-600">Groceries</span>
            <span className="font-medium text-blue-600 flex-shrink-0">{fmt$(breakdown.groceryMonthly)}</span>
          </div>
        )}
        {breakdown.customExpensesMonthly > 0 && (
          <div className="flex justify-between items-start gap-2">
            <span className="text-blue-600">Custom expenses</span>
            <span className="font-medium text-blue-600 flex-shrink-0">{fmt$(breakdown.customExpensesMonthly)}</span>
          </div>
        )}
        <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
          <span>Total tracked</span>
          <span>{fmt$(breakdown.totalTrackedExpenses)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 leading-relaxed">
        {hasCustom
          ? 'Includes your customized expenses. State averages used for non-overridden items.'
          : 'Estimates based on state averages. Does not include food, healthcare, or personal spending.'}
      </p>
    </div>
    </div>
  );
}

export default function FinancialRealityBanner({ states, inputs, profile, stateAvg, onCustomize, onChangeInputs }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [editingIncome, setEditingIncome] = useState(false);
  const [incomeInputValue, setIncomeInputValue] = useState('');
  const incomeInputRef = useRef<HTMLInputElement>(null);

  const startEditIncome = () => {
    setIncomeInputValue(String(Math.round(inputs.retirementIncome / 12)));
    setEditingIncome(true);
  };

  const saveIncome = () => {
    const monthly = parseFloat(incomeInputValue);
    if (!isNaN(monthly) && monthly > 0) {
      onChangeInputs?.({ ...inputs, retirementIncome: Math.round(monthly) * 12 });
    }
    setEditingIncome(false);
  };

  const handleDisabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeInputs?.({ ...inputs, disabilityRating: e.target.value || 'none' });
  };

  const results = useMemo(
    () => computeAllRealities(states, inputs, profile),
    [states, inputs, profile]
  );

  const hasCustomizations =
    profile.propertyTaxOverride !== null ||
    profile.homeInsuranceOverride !== null ||
    profile.autoInsuranceOverride !== null ||
    profile.utilitiesOverride !== null ||
    profile.groceryOverride !== null ||
    profile.customLineItems.length > 0 ||
    profile.householdMembers.length > 0;

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
    <div className="mb-6 md:bg-white md:rounded-xl md:border md:border-slate-200 md:shadow-sm">
      {/* Header row */}
      <div className="px-6 pt-5 pb-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold tracking-wide uppercase">
              Your Financial Reality
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCustomize}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg px-3 py-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Customize
              {hasCustomizations && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
              )}
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap"
            >
              {expanded ? 'Less detail' : 'Full breakdown'}
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="text-slate-500 text-sm flex flex-wrap items-baseline gap-x-1">
          <span>Based on</span>
          {editingIncome ? (
            <span className="inline-flex items-baseline gap-px">
              <span className="text-slate-900 font-medium">$</span>
              <input
                ref={incomeInputRef}
                autoFocus
                type="number"
                min={500}
                max={20000}
                step={100}
                value={incomeInputValue}
                onChange={(e) => setIncomeInputValue(e.target.value)}
                onBlur={saveIncome}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveIncome();
                  if (e.key === 'Escape') setEditingIncome(false);
                }}
                className="w-20 text-sm font-medium text-slate-900 border-b-2 border-blue-500 bg-transparent focus:outline-none tabular-nums"
              />
              <span className="text-slate-900 font-medium">/mo pension</span>
              <span className="text-xs text-slate-400 ml-1">(Enter to save)</span>
            </span>
          ) : (
            <button
              onClick={onChangeInputs ? startEditIncome : undefined}
              className={onChangeInputs ? 'text-slate-900 font-medium hover:text-blue-600 hover:underline underline-offset-2 transition-colors' : 'text-slate-900 font-medium'}
            >
              {fmt$(monthlyPension)}/mo pension
            </button>
          )}
          {hasDisability ? (
            <>
              <span>+</span>
              <span className="inline-flex flex-col">
                <span className="text-slate-900 font-medium whitespace-nowrap">
                  {fmt$(topState.breakdown.monthlyDisabilityPay)}/mo VA disability ({onChangeInputs ? (<select
                      value={inputs.disabilityRating}
                      onChange={handleDisabilityChange}
                      className="text-sm font-medium text-slate-900 bg-transparent border-b border-dotted border-slate-400 hover:border-blue-400 focus:border-blue-500 focus:outline-none cursor-pointer transition-colors appearance-none"
                      style={{ width: `${inputs.disabilityRating?.length ?? 2}ch`, padding: 0 }}
                    >{DISABILITY_RATINGS.map((r) => (<option key={r} value={r}>{r}</option>))}</select>) : inputs.disabilityRating}%)
                  {onChangeInputs && (
                    <button
                      onClick={() => handleDisabilityChange({ target: { value: 'none' } } as React.ChangeEvent<HTMLSelectElement>)}
                      className="text-xs text-slate-400 hover:text-red-500 transition-colors ml-1"
                      title="Remove disability rating"
                    >
                      ✕
                    </button>
                  )}
                </span>
                {(() => {
                  const ratingNum = parseInt(inputs.disabilityRating ?? '0') || 0;
                  if (ratingNum < 30) return <span className="text-xs text-slate-400">No dependent supplement (&lt;30%)</span>;
                  const hasSpouse = inputs.hasSpouse;
                  const children = inputs.dependentChildren ?? 0;
                  if (!hasSpouse && children === 0) return <span className="text-xs text-slate-400">No dependents</span>;
                  const parts = [
                    hasSpouse && 'spouse',
                    children === 1 && '1 child',
                    children > 1 && `${children} children`,
                  ].filter(Boolean);
                  return <span className="text-xs text-slate-400">{parts.join(' + ')}</span>;
                })()}
              </span>
            </>
          ) : (
            onChangeInputs && (
              <button
                onClick={() => onChangeInputs({ ...inputs, disabilityRating: '50' })}
                className="text-xs text-blue-500 hover:text-blue-700 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
              >
                + Add VA disability
              </button>
            )
          )}
          {(() => {
            const sources = inputs.secondaryIncome ?? [];
            if (sources.length === 0) return null;
            const totalMonthly = sources.reduce((sum, s) => sum + s.annualAmount / 12, 0);
            const label = sources.length === 1
              ? sources[0].label.toLowerCase()
              : `${sources.length} additional sources`;
            return (
              <span className="flex items-baseline gap-1">
                <span>+</span>
                <span className="text-slate-900 font-medium whitespace-nowrap">{fmt$(totalMonthly)}/mo {label}</span>
              </span>
            );
          })()}
          <span>across</span>
          <span className="text-slate-900 font-medium">{results.length} states</span>
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 [&>*]:border-slate-100 [&>*:nth-child(2)]:border-l [&>*:nth-child(4)]:border-l [&>*:nth-child(n+3)]:border-t lg:[&>*:nth-child(3)]:border-l lg:[&>*:nth-child(3)]:border-t-0 lg:[&>*:nth-child(4)]:border-t-0">
        {/* Total monthly income */}
        <div className="px-5 py-4">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
            Total Monthly Income
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {fmt$(topState.breakdown.totalMonthlyIncome)}
          </p>
          {hasDisability && (
            <p className="text-xs text-slate-400 mt-1">Pension + disability combined</p>
          )}
          <div className="mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="text-xs text-green-600">VA disability tax-free in all 50 states</span>
          </div>
        </div>

        {/* Estimated tracked costs — top ranked state */}
        <div
          className="px-5 py-4 relative"
          onMouseEnter={() => setShowTooltip('costs')}
          onMouseLeave={() => setShowTooltip(null)}
          onClick={() => setShowTooltip(v => v === 'costs' ? null : 'costs')}
        >
          <div className="flex items-center gap-1 mb-1">
            <p className="text-slate-400 text-xs uppercase tracking-wide">Est. Monthly Costs</p>
            <Info className="w-3 h-3 text-slate-400 cursor-help" />
            {hasCustomizations && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {fmt$(best.breakdown.totalTrackedExpenses)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Tax + insurance + utilities</p>
          <p className="text-xs text-slate-400 mt-1">In {best.state.name} (lowest cost)</p>
          {showTooltip === 'costs' && <BreakdownTooltip breakdown={best.breakdown} profile={profile} />}
        </div>

        {/* Best state */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Lowest Cost State</p>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">{best.state.name}</p>
          <p className="text-green-600 font-semibold text-sm mt-1">
            {fmt$(best.breakdown.monthlyRemaining)}/mo remaining
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            +{fmt$(best.breakdown.monthlyRemaining - avgRemaining)} vs avg
          </p>
        </div>

        {/* Worst state */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-slate-400 text-xs uppercase tracking-wide">Highest Cost State</p>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">{worst.state.name}</p>
          <p className="text-red-500 font-semibold text-sm mt-1">
            {fmt$(worst.breakdown.monthlyRemaining)}/mo remaining
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {fmt$(worst.breakdown.monthlyRemaining - avgRemaining)} vs avg
          </p>
        </div>
      </div>

      {/* Expanded breakdown table */}
      <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="breakdown"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
          className="rounded-b-xl overflow-hidden"
        >
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
          <p className="text-slate-700 text-sm font-semibold mb-3">
            Top 10 States — Monthly Remaining After Tracked Costs
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wide">
                  <th className="text-left pb-2 pr-4">State</th>
                  <th className="text-right pb-2 pr-4">Pension Tax</th>
                  <th className="text-right pb-2 pr-4">Prop. Tax/mo</th>
                  <th className="text-right pb-2 pr-4">Insurance/mo</th>
                  <th className="text-right pb-2 pr-4">Utilities/mo</th>
                  <th className="text-right pb-2 pr-4">
                    <span className="inline-flex items-center gap-1">
                      Total Costs
                      {hasCustomizations && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    </span>
                  </th>
                  <th className="text-right pb-2">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {sorted.slice(0, 10).map(({ state, breakdown }, i) => (
                  <motion.tr
                    key={state.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
                    className={cn('border-t border-slate-100', i === 0 && 'bg-green-50')}
                  >
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        {i === 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                            Best
                          </span>
                        )}
                        <span className="text-slate-900 font-medium">{state.name}</span>
                        <span className="text-slate-400 text-xs">{state.abbreviation}</span>
                      </div>
                    </td>
                    <td className="text-right py-2 pr-4">
                      <span
                        className={cn(
                          'text-xs px-1.5 py-0.5 rounded font-medium',
                          breakdown.stateTaxOnPension === 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        )}
                      >
                        {breakdown.stateTaxOnPension === 0
                          ? 'Exempt'
                          : `-${fmt$(breakdown.stateTaxOnPension)}`}
                      </span>
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-600">
                      {fmt$(breakdown.propertyTaxMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-600">
                      {fmt$(breakdown.homeInsuranceMonthly + breakdown.autoInsuranceMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-600">
                      {fmt$(breakdown.utilitiesMonthly)}
                    </td>
                    <td className="text-right py-2 pr-4 text-slate-600">
                      {fmt$(breakdown.totalTrackedExpenses)}
                    </td>
                    <td className="text-right py-2">
                      <span className="font-bold text-green-600">
                        {fmt$(breakdown.monthlyRemaining)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {(topState.breakdown.groceryMonthly > 0 || topState.breakdown.customExpensesMonthly > 0) && (
            <p className="text-xs text-blue-600 mt-3 leading-relaxed bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
              Total Costs includes
              {topState.breakdown.groceryMonthly > 0 && (
                <> your grocery estimate ({fmt$(topState.breakdown.groceryMonthly)}/mo)</>
              )}
              {topState.breakdown.groceryMonthly > 0 && topState.breakdown.customExpensesMonthly > 0 && ' and '}
              {topState.breakdown.customExpensesMonthly > 0 && (
                <> {profile.customLineItems.length} custom expense{profile.customLineItems.length !== 1 ? 's' : ''} ({fmt$(topState.breakdown.customExpensesMonthly)}/mo)</>
              )}.
            </p>
          )}
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Estimates use state average insurance and utility rates. Property tax based on state
            median home value × effective rate. Sales tax applied to ~35% of monthly income. Does
            not include healthcare, mortgage principal, or discretionary spending unless customized.
            VA Disability Compensation is exempt from all state taxes under federal law (38 U.S.C. §
            5301).
          </p>
        </div>
        <button
          onClick={() => setExpanded(false)}
          className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border-t border-slate-200 transition-colors group"
          aria-label="Collapse breakdown"
        >
          <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
