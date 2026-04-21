import React, { useState } from 'react';
import { AlertCircle, Wallet, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import type { StateData } from '../../data/stateData';
import {
  fmt$,
  type FinancialInputs,
  type FinancialBreakdown,
  type UserCostProfile,
} from '../../data/financialReality';

interface FinancialSectionProps {
  state: StateData;
  originState: StateData | null;
  frInputs: FinancialInputs;
  financialBreakdown: FinancialBreakdown;
  originBreakdown: FinancialBreakdown | null;
  budgetProfile: UserCostProfile;
  frShowYearly: boolean;
  isSeparating: boolean;
  hasCustomizations: boolean;
  onFrShowYearlyChange: (v: boolean) => void;
  onProfileChange: (profile: UserCostProfile) => void;
  onOpenBudgetPanel: () => void;
}

function CostRow({ label, val, ghost, isExempt, isGhostExempt, highlight, showGhost, fmtV }: {
  label: string; val: number; ghost?: number | null;
  isExempt?: boolean; isGhostExempt?: boolean; highlight?: boolean;
  showGhost: boolean; fmtV: (v: number) => string;
}) {
  const diff = ghost != null && !isExempt && !isGhostExempt ? val - ghost : null;
  const showDelta = diff != null && Math.abs(diff) >= 5;
  return (
    <>
      <span className="text-slate-600 pt-px">{label}</span>
      <div className="text-right">
        {isExempt
          ? <span className="font-medium text-emerald-600">Exempt</span>
          : <span className={`font-medium tabular-nums ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>-{fmtV(val)}</span>
        }
        {showDelta && (
          <span className={`block text-[10px] leading-none mt-0.5 tabular-nums ${diff! < 0 ? 'text-emerald-500' : 'text-red-400'}`}>
            {diff! < 0 ? `↓${fmtV(Math.abs(diff!))}` : `↑${fmtV(diff!)}`}
          </span>
        )}
      </div>
      {showGhost && (
        isGhostExempt
          ? <span className="font-medium text-slate-300 text-right pt-px border-l border-slate-100 pl-3">Exempt</span>
          : <span className="font-medium text-slate-300 tabular-nums text-right pt-px border-l border-slate-100 pl-3">-{fmtV(ghost ?? 0)}</span>
      )}
    </>
  );
}

function BetterDealStamp() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="stamp-weather">
          <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div style={{
        transform: 'rotate(-9deg)',
        filter: 'url(#stamp-weather)',
        border: '3px solid #14532d',
        boxShadow: 'inset 0 0 0 2px #14532d',
        borderRadius: '4px',
        padding: '5px 14px 6px',
        opacity: 0.22,
        mixBlendMode: 'multiply' as const,
      }}>
        <p style={{
          color: '#14532d',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          lineHeight: 1.15,
          fontFamily: "'Stardos Stencil', Georgia, serif",
          whiteSpace: 'nowrap' as const,
        }}>
          Best Value
        </p>
      </div>
    </div>
  );
}

export function FinancialSection({
  state, originState, frInputs, financialBreakdown, originBreakdown,
  budgetProfile, frShowYearly, isSeparating, hasCustomizations,
  onFrShowYearlyChange, onProfileChange, onOpenBudgetPanel,
}: FinancialSectionProps) {
  const [customExpanded, setCustomExpanded] = useState(false);

  const mul = frShowYearly ? 12 : 1;
  const period = frShowYearly ? '/yr' : '/mo';
  const fmtV = (v: number) => fmt$(v * mul);

  const ob = originBreakdown?.hasFinancialData ? originBreakdown : null;
  const totalTax = financialBreakdown.stateTaxOnPension + financialBreakdown.stateTaxOnSecondaryIncome;
  const obTotalTax = ob ? ob.stateTaxOnPension + ob.stateTaxOnSecondaryIncome : null;

  return (
    <Card className="border-emerald-200 shadow-[0_0_0_1px_theme(colors.emerald.200)] gap-0">
      <CardHeader className="border-b border-emerald-100 bg-emerald-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Your Financial Reality in {state.name}</span>
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {isSeparating ? 'Income' : 'Pension'}: {fmt$(frInputs.retirementIncome / 12)}/mo
              {financialBreakdown.monthlyDisabilityPay > 0 && ` · VA: ${fmt$(financialBreakdown.monthlyDisabilityPay)}/mo`}
              {financialBreakdown.monthlySecondaryIncome > 0 && ` · Other: ${fmt$(financialBreakdown.monthlySecondaryIncome)}/mo`}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => onProfileChange({ ...budgetProfile, isRenting: !budgetProfile.isRenting })}
              className={`flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 border transition-colors whitespace-nowrap ${budgetProfile.isRenting ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200 hover:text-slate-700'}`}
            >
              {budgetProfile.isRenting ? 'Renting' : 'Renting?'}
            </button>
            <button
              onClick={onOpenBudgetPanel}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Customize
              {hasCustomizations && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />}
            </button>
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
              <button
                onClick={() => onFrShowYearlyChange(false)}
                className={`px-2.5 py-1 rounded-md transition-colors ${!frShowYearly ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => onFrShowYearlyChange(true)}
                className={`px-2.5 py-1 rounded-md transition-colors ${frShowYearly ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Income column */}
          <div className="sm:border-r border-slate-100 sm:pr-6 pb-6 sm:pb-0">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">{frShowYearly ? 'Annual' : 'Monthly'} Income</p>
            <div className="space-y-2.5">
              {financialBreakdown.monthlyPension > 0 && (
                <div className="text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600">{isSeparating ? 'Income' : 'Military Pension'}</span>
                      {financialBreakdown.stateTaxOnPension === 0 && (
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full leading-none">tax-exempt</span>
                      )}
                    </div>
                    <span className="font-medium text-slate-900 tabular-nums">{fmtV(financialBreakdown.monthlyPension)}</span>
                  </div>
                  {financialBreakdown.stateTaxOnPension > 0 && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[11px] text-slate-400 pl-3">↳ State income tax{state.militaryPensionTax === 'Partial' ? ' (partial)' : ''}</span>
                      <span className="text-[11px] font-medium text-red-400 tabular-nums">-{fmtV(financialBreakdown.stateTaxOnPension)}</span>
                    </div>
                  )}
                </div>
              )}
              {financialBreakdown.monthlyDisabilityPay > 0 && (
                <div className="text-sm">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600">VA Disability</span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full leading-none">tax-free</span>
                    </div>
                    <span className="font-medium text-slate-900 tabular-nums">{fmtV(financialBreakdown.monthlyDisabilityPay)}</span>
                  </div>
                </div>
              )}
              {financialBreakdown.monthlySecondaryIncome > 0 && (
                <div className="text-sm">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-600">Other Income</span>
                    <span className="font-medium text-slate-900 tabular-nums">{fmtV(financialBreakdown.monthlySecondaryIncome)}</span>
                  </div>
                  {financialBreakdown.stateTaxOnSecondaryIncome > 0 && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[11px] text-slate-400 pl-3">↳ State income tax</span>
                      <span className="text-[11px] font-medium text-red-400 tabular-nums">-{fmtV(financialBreakdown.stateTaxOnSecondaryIncome)}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="border-t border-slate-100 pt-2.5">
                {ob ? (
                  <div className="grid gap-x-4 gap-y-1.5 text-sm grid-cols-[1fr_auto_auto]">
                    <span />
                    <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider text-right">{state.abbreviation}</span>
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider text-right border-l border-slate-100 pl-3">{originState!.abbreviation}</span>
                    {(totalTax > 0 || (obTotalTax ?? 0) > 0) && (
                      <>
                        <span className="text-slate-500">State income tax</span>
                        <span className={`font-medium tabular-nums text-right ${totalTax > 0 ? 'text-red-400' : 'text-emerald-600'}`}>
                          {totalTax > 0 ? `-${fmtV(totalTax)}` : 'None'}
                        </span>
                        <span className={`tabular-nums text-right border-l border-slate-100 pl-3 ${(obTotalTax ?? 0) > 0 ? 'font-medium text-slate-300' : 'text-slate-200'}`}>
                          {(obTotalTax ?? 0) > 0 ? `-${fmtV(obTotalTax!)}` : 'None'}
                        </span>
                      </>
                    )}
                    {financialBreakdown.federalIncomeTaxMonthly > 0 && (
                      <>
                        <span className="text-slate-500 flex items-center gap-1">Federal income tax <span className="text-[10px] text-slate-300 italic">same all states</span></span>
                        <span className="font-medium text-red-400 tabular-nums text-right">-{fmtV(financialBreakdown.federalIncomeTaxMonthly)}</span>
                        <span className="font-medium text-slate-300 tabular-nums text-right border-l border-slate-100 pl-3">-{fmtV(ob.federalIncomeTaxMonthly)}</span>
                      </>
                    )}
                    <span className="font-semibold text-slate-700">Net After Taxes</span>
                    <span className="font-bold text-slate-900 tabular-nums text-right">{fmtV(financialBreakdown.totalMonthlyIncome - totalTax - financialBreakdown.federalIncomeTaxMonthly)}</span>
                    <span className="font-semibold text-slate-300 tabular-nums text-right border-l border-slate-100 pl-3">{fmtV(ob.totalMonthlyIncome - (obTotalTax ?? 0) - ob.federalIncomeTaxMonthly)}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {totalTax > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">State income tax</span>
                        <span className="font-medium text-red-400 tabular-nums">-{fmtV(totalTax)}</span>
                      </div>
                    )}
                    {financialBreakdown.federalIncomeTaxMonthly > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 flex items-center gap-1">Federal income tax <span className="text-[10px] text-slate-300 italic">same all states</span></span>
                        <span className="font-medium text-red-400 tabular-nums">-{fmtV(financialBreakdown.federalIncomeTaxMonthly)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-700">Net After Taxes</span>
                      <span className="font-bold text-slate-900 tabular-nums">{fmtV(financialBreakdown.totalMonthlyIncome - totalTax - financialBreakdown.federalIncomeTaxMonthly)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Expenses column */}
          <div className="sm:pl-6">
            <div className={`grid gap-x-4 gap-y-2.5 text-sm ${ob ? 'grid-cols-[1fr_auto_auto]' : 'grid-cols-[1fr_auto]'}`}>
              <p className={`text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-0.5 ${!ob ? 'col-span-full' : ''}`}>
                Est. {frShowYearly ? 'Annual' : 'Monthly'} Costs
              </p>
              {ob && (
                <>
                  <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider text-right border-b border-slate-100 pb-2 mb-0.5">{state.abbreviation}</p>
                  <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider text-right border-b border-slate-100 pb-2 mb-0.5 border-l border-l-slate-100 pl-3">{originState!.abbreviation}</p>
                </>
              )}

              {!budgetProfile.isRenting && (
                <>
                  <CostRow
                    label="Property Tax"
                    val={financialBreakdown.propertyTaxMonthly}
                    ghost={ob?.propertyTaxMonthly}
                    isExempt={financialBreakdown.propertyTaxExemptionApplied === 'full'}
                    isGhostExempt={ob?.propertyTaxExemptionApplied === 'full'}
                    showGhost={!!ob} fmtV={fmtV}
                  />
                  {financialBreakdown.propertyTaxExemptionApplied === 'partial' && (
                    <div className="col-span-full flex items-start gap-1.5 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5">
                      <AlertCircle className="w-3 h-3 flex-shrink-0 mt-px" />
                      <span>
                        Partial exemption available at 100% rating — actual tax may be lower.
                        {budgetProfile.homeValue === null
                          ? ' Enter your home value in the customizer for a closer estimate.'
                          : " Exact savings depend on this state's specific exemption cap — consult your county assessor."}
                      </span>
                    </div>
                  )}
                </>
              )}
              <CostRow label="Sales Tax (est.)" val={financialBreakdown.salesTaxOnSpending} ghost={ob?.salesTaxOnSpending} showGhost={!!ob} fmtV={fmtV} />
              {!budgetProfile.isRenting && (
                <CostRow label="Home Insurance" val={financialBreakdown.homeInsuranceMonthly} ghost={ob?.homeInsuranceMonthly} showGhost={!!ob} fmtV={fmtV} />
              )}
              <CostRow label="Auto Insurance" val={financialBreakdown.autoInsuranceMonthly} ghost={ob?.autoInsuranceMonthly} showGhost={!!ob} fmtV={fmtV} />
              <CostRow label="Utilities" val={financialBreakdown.utilitiesMonthly} ghost={ob?.utilitiesMonthly} showGhost={!!ob} fmtV={fmtV} />
              <CostRow label="Groceries" val={financialBreakdown.groceryMonthly} ghost={ob?.groceryMonthly} highlight={budgetProfile.groceryOverride !== null} showGhost={!!ob} fmtV={fmtV} />

              {financialBreakdown.customExpensesMonthly > 0 && (
                <>
                  <button
                    onClick={() => setCustomExpanded(v => !v)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap min-w-0"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${customExpanded ? '' : '-rotate-90'}`} />
                    <span className="font-medium truncate">Additional Expenses ({budgetProfile.customLineItems.length})</span>
                  </button>
                  <span className="font-medium text-blue-600 tabular-nums text-right">-{fmtV(financialBreakdown.customExpensesMonthly)}</span>
                  {ob && <span className="font-medium text-slate-300 tabular-nums text-right border-l border-slate-100 pl-3">-{fmtV(ob.customExpensesMonthly)}</span>}
                  {customExpanded && budgetProfile.customLineItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <span className="text-slate-500 text-xs pl-4 pt-px">↳ {item.label || 'Unlabeled'}</span>
                      <span className="text-slate-500 text-xs tabular-nums text-right">-{fmtV(item.amount)}</span>
                      {ob && <span className="text-slate-300 text-xs tabular-nums text-right border-l border-slate-100 pl-3">-{fmtV(item.amount)}</span>}
                    </React.Fragment>
                  ))}
                </>
              )}

              {financialBreakdown.estimatedFederalTaxSavings > 0 && (
                <>
                  <span className="text-slate-600 pt-px">Fed. Savings (IRC §933)</span>
                  <span className="font-medium text-emerald-600 text-right tabular-nums">+{fmtV(financialBreakdown.estimatedFederalTaxSavings)}</span>
                  {ob && <span className="border-l border-slate-100 pl-3" />}
                </>
              )}

              <div className="col-span-full border-t border-slate-100 -mb-1" />
              <span className="font-semibold text-slate-700">Total Est. Costs</span>
              <span className="font-bold text-slate-900 text-right tabular-nums">-{fmtV(financialBreakdown.totalTrackedExpenses - totalTax)}</span>
              {ob && <span className="font-semibold text-slate-300 text-right tabular-nums border-l border-slate-100 pl-3">-{fmtV(ob.totalTrackedExpenses - (obTotalTax ?? 0))}</span>}
            </div>
          </div>
        </div>

        {/* Remaining */}
        {(() => {
          const diff = ob ? financialBreakdown.monthlyRemaining - ob.monthlyRemaining : 0;
          const viewedWins = ob && diff > 5;
          const originWins = ob && diff < -5;
          return (
            <div className="mt-5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Est. Discretionary Funds</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`relative flex items-center justify-between rounded-xl px-4 py-3.5 overflow-visible ${
                  ob
                    ? viewedWins ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-200'
                    : financialBreakdown.monthlyRemaining >= 0 ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'
                }`}>
                  {viewedWins && <BetterDealStamp />}
                  <div>
                    <p className={`text-sm font-semibold ${ob && !viewedWins ? 'text-slate-400' : 'text-slate-700'}`}>{ob ? `Moving to ${state.abbreviation}` : `Remaining in ${state.abbreviation}`}</p>
                    {ob ? (
                      Math.abs(diff) < 5
                        ? <p className="text-xs text-slate-500 mt-0.5">After tracked costs</p>
                        : <p className={`text-xs font-semibold mt-0.5 ${diff > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {diff > 0
                              ? `+${fmtV(diff)}${period} more than ${originState!.abbreviation}`
                              : `-${fmtV(Math.abs(diff))}${period} less than ${originState!.abbreviation}`}
                          </p>
                    ) : <p className="text-xs text-slate-500 mt-0.5">After tracked costs</p>}
                  </div>
                  <p className={`text-2xl font-bold tabular-nums ${
                    ob
                      ? viewedWins ? 'text-emerald-600' : 'text-slate-400'
                      : financialBreakdown.monthlyRemaining >= 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {fmtV(financialBreakdown.monthlyRemaining)}
                  </p>
                </div>
                {ob && (
                  <div className={`relative flex items-center justify-between rounded-xl px-4 py-3.5 overflow-visible ${originWins ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-200'}`}>
                    {originWins && <BetterDealStamp />}
                    <div>
                      <p className={`text-sm font-semibold ${originWins ? 'text-slate-700' : 'text-slate-400'}`}>Staying in {originState!.abbreviation}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Your current state</p>
                    </div>
                    <p className={`text-2xl font-bold tabular-nums ${originWins ? 'text-emerald-600' : 'text-slate-400'}`}>{fmtV(ob.monthlyRemaining)}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          {hasCustomizations
            ? 'Includes your customized budget profile. State averages used for non-overridden items.'
            : 'Uses state averages for insurance, utilities, and property tax.'
          }{' '}
          Grocery estimates use state-specific price levels (GoBankingRates 2025). Sales tax estimated at ~35% of monthly income × combined rate.
        </p>
      </CardContent>
    </Card>
  );
}
