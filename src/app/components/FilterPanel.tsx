import { useState } from 'react';
import { motion } from 'motion/react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { X, Plus, ChevronDown } from 'lucide-react';
import { statesData } from '../data/stateData';

interface FilterPanelProps {
  filters: {
    noIncomeTax: boolean;
    taxFreeMilitary: boolean;
    lowCostOfLiving: boolean;
    highVABenefits: boolean;
    partialTaxMilitary: boolean;
    lowPropertyTax: boolean;
    lowSalesTax: boolean;
    strongJobMarket: boolean;
  };
  weights: {
    taxes: number;
    cost: number;
    benefits: number;
  };
  perCapita: boolean;
  onFilterChange: (key: string, value: boolean) => void;
  onWeightChange: (key: string, value: number) => void;
  onPerCapitaChange: (value: boolean) => void;
  onReset: () => void;
  onClose?: () => void;
  excludedStates: string[];
  onExcludeState: (stateId: string) => void;
  onIncludeState: (stateId: string) => void;
  onExcludeAll: () => void;
}

export default function FilterPanel({
  filters,
  weights,
  perCapita,
  onFilterChange,
  onWeightChange,
  onPerCapitaChange,
  onReset,
  onClose,
  excludedStates,
  onExcludeState,
  onIncludeState,
  onExcludeAll,
}: FilterPanelProps) {
  const [showAllStates, setShowAllStates] = useState(false);

  const includedStateObjects = statesData
    .filter((s) => !excludedStates.includes(s.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  const excludedStateObjects = statesData
    .filter((s) => excludedStates.includes(s.id))
    .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters & Preferences</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-slate-700">Quick Preferences</h4>
        <p className="text-xs text-slate-400">Shows states matching any checked option.</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="noIncomeTax"
              checked={filters.noIncomeTax}
              onCheckedChange={(checked) => onFilterChange('noIncomeTax', checked as boolean)}
            />
            <Label htmlFor="noIncomeTax" className="text-sm cursor-pointer">
              No State Income Tax
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="taxFreeMilitary"
              checked={filters.taxFreeMilitary}
              onCheckedChange={(checked) => onFilterChange('taxFreeMilitary', checked as boolean)}
            />
            <Label htmlFor="taxFreeMilitary" className="text-sm cursor-pointer">
              Tax-Free Military Retirement
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowCostOfLiving"
              checked={filters.lowCostOfLiving}
              onCheckedChange={(checked) => onFilterChange('lowCostOfLiving', checked as boolean)}
            />
            <Label htmlFor="lowCostOfLiving" className="text-sm cursor-pointer">
              Low Cost of Living (&lt;95)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="highVABenefits"
              checked={filters.highVABenefits}
              onCheckedChange={(checked) => onFilterChange('highVABenefits', checked as boolean)}
            />
            <Label htmlFor="highVABenefits" className="text-sm cursor-pointer">
              High VA Benefits Score (&gt;85)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="partialTaxMilitary"
              checked={filters.partialTaxMilitary}
              onCheckedChange={(checked) => onFilterChange('partialTaxMilitary', checked as boolean)}
            />
            <Label htmlFor="partialTaxMilitary" className="text-sm cursor-pointer">
              Partial Military Pension Exemption
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowPropertyTax"
              checked={filters.lowPropertyTax}
              onCheckedChange={(checked) => onFilterChange('lowPropertyTax', checked as boolean)}
            />
            <Label htmlFor="lowPropertyTax" className="text-sm cursor-pointer">
              Low Property Tax
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowSalesTax"
              checked={filters.lowSalesTax}
              onCheckedChange={(checked) => onFilterChange('lowSalesTax', checked as boolean)}
            />
            <Label htmlFor="lowSalesTax" className="text-sm cursor-pointer">
              Low Sales Tax (&lt;4%)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="strongJobMarket"
              checked={filters.strongJobMarket}
              onCheckedChange={(checked) => onFilterChange('strongJobMarket', checked as boolean)}
            />
            <Label htmlFor="strongJobMarket" className="text-sm cursor-pointer">
              Strong Job Market (&lt;4% unemployment)
            </Label>
          </div>
        </div>
      </div>

      {/* VA Scoring Method */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h4 className="font-medium text-sm text-slate-700">VA Benefits Scoring</h4>
        <p className="text-xs text-slate-400">How VA facility and installation counts are weighted.</p>
        <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-medium">
          {([
            { value: false, label: 'Raw Count',  hint: 'Total facilities'  },
            { value: true,  label: 'Per Capita', hint: 'Per 100k veterans' },
          ] as const).map(({ value, label, hint }) => {
            const active = perCapita === value;
            return (
              <button
                key={label}
                onClick={() => onPerCapitaChange(value)}
                className={`relative flex-1 px-3 py-1.5 rounded-full transition-colors z-10 flex flex-col items-center leading-tight ${active ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {active && (
                  <motion.div
                    layoutId="va-scoring-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span>{label}</span>
                <span className={`text-[10px] font-normal ${active ? 'text-blue-100' : 'text-slate-400'}`}>{hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weights */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h4 className="font-medium text-sm text-slate-700">Customize Priorities</h4>
        {(
          [
            { label: 'Tax Friendliness', key: 'taxes', value: weights.taxes },
            { label: 'Cost of Living',   key: 'cost',  value: weights.cost  },
            { label: 'Veteran Benefits', key: 'benefits', value: weights.benefits },
          ] as const
        ).map(({ label, key, value }) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <span className="text-sm text-slate-700 min-w-0 flex-1">{label}</span>
            <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-medium shrink-0">
              {([1, 2, 3] as const).map((tier, i) => {
                const tierLabel = ['Low', 'Med', 'High'][i];
                const active = value === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => onWeightChange(key, tier)}
                    className={`relative px-3 py-1 rounded-full transition-colors z-10 ${active ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {active && (
                      <motion.div
                        layoutId={`weight-pill-${key}`}
                        className="absolute inset-0 bg-blue-600 rounded-full shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {tierLabel}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Exclude States */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-slate-700">Exclude States</h4>
          {includedStateObjects.length > 0 && (
            <button
              onClick={() => { onExcludeAll(); setShowAllStates(false); }}
              className="text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md px-2 py-1 transition-colors"
            >
              Exclude all
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400">
          Excluded states are removed from all results and financial calculations.
        </p>

        {/* Show all states toggle */}
        {includedStateObjects.length > 0 && (
          <button
            onClick={() => setShowAllStates((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${showAllStates ? 'rotate-180' : ''}`}
            />
            {showAllStates ? 'Hide' : 'Show all states'} ({includedStateObjects.length} included)
          </button>
        )}

        {/* Included states — green pills */}
        {showAllStates && includedStateObjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {includedStateObjects.map((state) => (
              <span
                key={state.id}
                className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-1"
              >
                {state.abbreviation}
                <button
                  onClick={() => onExcludeState(state.id)}
                  className="hover:text-green-900 ml-0.5"
                  aria-label={`Exclude ${state.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Divider + excluded section */}
        {excludedStateObjects.length > 0 && (
          <>
            {showAllStates && <div className="border-t border-slate-200" />}
            <div className="space-y-1.5">
              <p className="text-xs text-slate-500 font-medium">
                Excluded ({excludedStateObjects.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {excludedStateObjects.map((state) => (
                  <span
                    key={state.id}
                    className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md px-2 py-1"
                  >
                    {state.abbreviation}
                    <button
                      onClick={() => onIncludeState(state.id)}
                      className="hover:text-red-900 ml-0.5"
                      aria-label={`Re-include ${state.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* All excluded — show reset option */}
        {includedStateObjects.length === 0 && (
          <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-md px-3 py-2">
            <span className="text-xs text-red-700 font-medium">All 50 states excluded</span>
            <button
              onClick={() => onIncludeState('__clear_all__')}
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <Button variant="outline" onClick={onReset} className="w-full">
        Reset All
      </Button>
    </div>
  );
}
