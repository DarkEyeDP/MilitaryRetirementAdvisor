import { useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Users, Briefcase } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  UserCostProfile,
  HouseholdMember,
  CustomLineItem,
  AgeGroup,
  AGE_GROUP_LABELS,
  GROCERY_MONTHLY_PER_PERSON,
  DEFAULT_USER_COST_PROFILE,
  fmt$,
  type FinancialInputs,
  type SecondaryIncomeSource,
} from '../data/financialReality';
import { StateFinancialData } from '../data/financialData';

interface Props {
  open: boolean;
  onClose: () => void;
  profile: UserCostProfile;
  onChange: (profile: UserCostProfile) => void;
  stateAvgs: StateFinancialData | null;
  financialInputs?: FinancialInputs;
  onChangeInputs?: (inputs: FinancialInputs) => void;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
      {children}
    </p>
  );
}

export default function BudgetCustomizerPanel({
  open,
  onClose,
  profile,
  onChange,
  stateAvgs,
  financialInputs,
  onChangeInputs,
}: Props) {
  const update = useCallback(
    (patch: Partial<UserCostProfile>) => onChange({ ...profile, ...patch }),
    [profile, onChange]
  );

  const handleReset = () => onChange(DEFAULT_USER_COST_PROFILE);

  // ── Override input helpers ────────────────────────────────────────────────

  const parseOverride = (val: string): number | null =>
    val === '' ? null : Math.max(0, parseFloat(val) || 0);

  // ── Household members ─────────────────────────────────────────────────────

  const addMember = () => {
    const newMember: HouseholdMember = {
      id: crypto.randomUUID(),
      ageGroup: 'adult',
    };
    update({ householdMembers: [...profile.householdMembers, newMember] });
  };

  const removeMember = (id: string) =>
    update({ householdMembers: profile.householdMembers.filter((m) => m.id !== id) });

  const updateMemberAge = (id: string, ageGroup: AgeGroup) =>
    update({
      householdMembers: profile.householdMembers.map((m) =>
        m.id === id ? { ...m, ageGroup } : m
      ),
    });

  const calculatedGrocery = profile.householdMembers.reduce(
    (sum, m) => sum + GROCERY_MONTHLY_PER_PERSON[m.ageGroup],
    0
  );

  const effectiveGrocery =
    profile.groceryOverride !== null ? profile.groceryOverride : calculatedGrocery;

  // ── Custom line items ─────────────────────────────────────────────────────

  const addLineItem = () => {
    const newItem: CustomLineItem = {
      id: crypto.randomUUID(),
      label: '',
      amount: 0,
    };
    update({ customLineItems: [...profile.customLineItems, newItem] });
  };

  const removeLineItem = (id: string) =>
    update({ customLineItems: profile.customLineItems.filter((item) => item.id !== id) });

  const updateLineItem = (id: string, patch: Partial<CustomLineItem>) =>
    update({
      customLineItems: profile.customLineItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });

  const customExpensesTotal = profile.customLineItems.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // ── Secondary income ──────────────────────────────────────────────────────

  const secondaryIncome: SecondaryIncomeSource[] = financialInputs?.secondaryIncome ?? [];
  const hasSpouseIncome = secondaryIncome.some((s) => s.label === 'Spouse income');

  const addSecondarySource = (label: string) => {
    if (!financialInputs || !onChangeInputs) return;
    onChangeInputs({
      ...financialInputs,
      secondaryIncome: [...secondaryIncome, { id: crypto.randomUUID(), label, annualAmount: 30000 }],
    });
  };

  const updateSecondaryAmount = (id: string, annualAmount: number) => {
    if (!financialInputs || !onChangeInputs) return;
    onChangeInputs({
      ...financialInputs,
      secondaryIncome: secondaryIncome.map((s) => s.id === id ? { ...s, annualAmount } : s),
    });
  };

  const updateSecondaryLabel = (id: string, label: string) => {
    if (!financialInputs || !onChangeInputs) return;
    onChangeInputs({
      ...financialInputs,
      secondaryIncome: secondaryIncome.map((s) => s.id === id ? { ...s, label } : s),
    });
  };

  const removeSecondarySource = (id: string) => {
    if (!financialInputs || !onChangeInputs) return;
    onChangeInputs({
      ...financialInputs,
      secondaryIncome: secondaryIncome.filter((s) => s.id !== id),
    });
  };

  const totalCustomMonthly =
    (profile.propertyTaxOverride ?? 0) +
    (profile.homeInsuranceOverride ?? 0) +
    (profile.autoInsuranceOverride ?? 0) +
    (profile.utilitiesOverride ?? 0) +
    effectiveGrocery +
    customExpensesTotal;

  // ── State avg display values ──────────────────────────────────────────────

  const avgPropertyTax = stateAvgs ? stateAvgs.medianAnnualPropertyTax / 12 : null;
  const avgHomeIns = stateAvgs ? stateAvgs.avgHomeInsuranceMonthly : null;
  const avgAutoIns = stateAvgs ? stateAvgs.avgAutoInsuranceMonthly : null;
  const avgUtils = stateAvgs ? stateAvgs.avgMonthlyUtilities : null;

  const overrideFields: Array<{
    label: string;
    avg: number | null;
    value: number | null;
    key: keyof Pick<
      UserCostProfile,
      'propertyTaxOverride' | 'homeInsuranceOverride' | 'autoInsuranceOverride' | 'utilitiesOverride'
    >;
  }> = [
    {
      label: 'Property Tax',
      avg: avgPropertyTax,
      value: profile.propertyTaxOverride,
      key: 'propertyTaxOverride',
    },
    {
      label: 'Home Insurance',
      avg: avgHomeIns,
      value: profile.homeInsuranceOverride,
      key: 'homeInsuranceOverride',
    },
    {
      label: 'Auto Insurance',
      avg: avgAutoIns,
      value: profile.autoInsuranceOverride,
      key: 'autoInsuranceOverride',
    },
    {
      label: 'Utilities',
      avg: avgUtils,
      value: profile.utilitiesOverride,
      key: 'utilitiesOverride',
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Budget Customizer</h2>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 rounded-md px-2.5 py-1 transition-colors"
                >
                  Reset to defaults
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Section 0: Additional Income */}
              {onChangeInputs && (
                <section>
                  <SectionHeader>Additional Income</SectionHeader>
                  <p className="text-xs text-slate-400 mb-3">Taxed at full state rate — no military exemptions</p>

                  <div className="space-y-2 mb-3">
                    {secondaryIncome.map((src) => (
                      <div key={src.id} className="flex items-center gap-2 py-2 border-b border-slate-100">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <Input
                          type="text"
                          value={src.label}
                          onChange={(e) => updateSecondaryLabel(src.id, e.target.value)}
                          className="flex-1 h-8 text-sm"
                          placeholder="Income label"
                        />
                        <div className="relative flex items-center w-28 shrink-0">
                          <span className="absolute left-2 text-xs text-slate-400">$</span>
                          <Input
                            type="number"
                            min={0}
                            step={100}
                            value={src.annualAmount > 0 ? String(Math.round(src.annualAmount / 12)) : ''}
                            onChange={(e) => updateSecondaryAmount(src.id, Math.max(0, parseFloat(e.target.value) || 0) * 12)}
                            className="h-8 text-sm text-right pl-5"
                            placeholder="Monthly"
                          />
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">/mo</span>
                        <button
                          onClick={() => removeSecondarySource(src.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {secondaryIncome.length === 0 && (
                    <p className="text-xs text-slate-400 mb-3">No additional income sources added.</p>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => addSecondarySource('Income')}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-2.5 py-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />Income
                    </button>
                    <button
                      onClick={() => addSecondarySource('Spouse income')}
                      disabled={hasSpouseIncome}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-2.5 py-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />Spouse income
                    </button>
                    <button
                      onClick={() => addSecondarySource('Rental income')}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-2.5 py-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />Rental income
                    </button>
                    <button
                      onClick={() => addSecondarySource('Other income')}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />Other
                    </button>
                  </div>
                </section>
              )}

            {/* Section 1: Monthly Expenses */}
              <section>
                <SectionHeader>Monthly Expenses</SectionHeader>
                <div className="space-y-0">
                  {overrideFields.map((field) => (
                    <div
                      key={field.key}
                      className="flex items-center justify-between py-3 border-b border-slate-100"
                    >
                      <div>
                        <Label className="text-sm font-medium text-slate-700">
                          {field.label}
                        </Label>
                        {field.avg !== null && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            State avg: {fmt$(field.avg)}/mo
                          </p>
                        )}
                        {field.avg === null && (
                          <p className="text-xs text-slate-400 mt-0.5">Select a state to see avg</p>
                        )}
                      </div>
                      <div className="relative flex items-center w-28 shrink-0">
                        <span className="absolute left-2 text-xs text-slate-400">$</span>
                        <Input
                          type="number"
                          min={0}
                          placeholder={field.avg !== null ? String(Math.round(field.avg)) : '0'}
                          value={field.value !== null ? String(field.value) : ''}
                          onChange={(e) => update({ [field.key]: parseOverride(e.target.value) })}
                          className="w-28 text-right h-8 text-sm pl-5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2: Groceries */}
              <section>
                <SectionHeader>Groceries</SectionHeader>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Household members</span>
                  </div>
                  <button
                    onClick={addMember}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-2 py-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add member
                  </button>
                </div>

                {profile.householdMembers.length === 0 && (
                  <p className="text-xs text-slate-400 mb-3">
                    No members added. Add household members for a personalized estimate.
                  </p>
                )}

                <div className="space-y-2 mb-3">
                  {profile.householdMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <select
                        value={member.ageGroup}
                        onChange={(e) => updateMemberAge(member.id, e.target.value as AgeGroup)}
                        className="flex-1 border border-slate-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                      >
                        {(Object.keys(AGE_GROUP_LABELS) as AgeGroup[]).map((key) => (
                          <option key={key} value={key}>
                            {AGE_GROUP_LABELS[key]} — {fmt$(GROCERY_MONTHLY_PER_PERSON[key])}/mo
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                        aria-label="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {profile.householdMembers.length > 0 && profile.groceryOverride === null && (
                  <p className="text-sm text-green-600 font-medium mb-3">
                    Estimated: {fmt$(calculatedGrocery)}/mo
                  </p>
                )}

                <div className="py-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Custom monthly total
                      </Label>
                      <p className="text-xs text-slate-400 mt-0.5">Override the estimate above</p>
                    </div>
                    <div className="relative flex items-center w-28 shrink-0">
                      <span className="absolute left-2 text-xs text-slate-400">$</span>
                      <Input
                        type="number"
                        min={0}
                        placeholder={
                          calculatedGrocery > 0 ? String(Math.round(calculatedGrocery)) : '0'
                        }
                        value={profile.groceryOverride !== null ? String(profile.groceryOverride) : ''}
                        onChange={(e) => update({ groceryOverride: parseOverride(e.target.value) })}
                        className="w-28 text-right h-8 text-sm pl-5"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  Based on USDA moderate-cost food plan (2026)
                </p>
              </section>

              {/* Section 3: Additional Expenses */}
              <section>
                <SectionHeader>Additional Expenses</SectionHeader>

                <p className="text-xs text-slate-500 mb-3">Monthly expenses</p>

                <div className="space-y-2 mb-3">
                  {profile.customLineItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Expense label"
                        value={item.label}
                        onChange={(e) => updateLineItem(item.id, { label: e.target.value })}
                        className="flex-1 h-8 text-sm"
                      />
                      <div className="relative flex items-center w-24 shrink-0">
                        <span className="absolute left-2 text-xs text-slate-400">$</span>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          value={item.amount > 0 ? String(item.amount) : ''}
                          onChange={(e) =>
                            updateLineItem(item.id, {
                              amount: Math.max(0, parseFloat(e.target.value) || 0),
                            })
                          }
                          className="w-24 text-right h-8 text-sm pl-5"
                        />
                      </div>
                      <button
                        onClick={() => removeLineItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                        aria-label="Remove expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addLineItem}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-3 py-1.5 transition-colors w-full justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add expense
                </button>
              </section>
            </div>

            {/* Footer summary */}
            <div className="flex-shrink-0 border-t border-slate-200 px-5 py-4 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Total custom monthly</span>
                <span className="text-base font-bold text-slate-900">
                  {fmt$(totalCustomMonthly)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Changes apply live — no save needed
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
