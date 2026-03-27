import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { X, Search } from 'lucide-react';
import { statesData } from '../data/stateData';

interface FilterPanelProps {
  filters: {
    noIncomeTax: boolean;
    taxFreeMilitary: boolean;
    lowCostOfLiving: boolean;
    highVABenefits: boolean;
    partialTaxMilitary: boolean;
  };
  weights: {
    taxes: number;
    cost: number;
    benefits: number;
  };
  onFilterChange: (key: string, value: boolean) => void;
  onWeightChange: (key: string, value: number) => void;
  onReset: () => void;
  onClose?: () => void;
  excludedStates: string[];
  onExcludeState: (stateId: string) => void;
  onIncludeState: (stateId: string) => void;
}

export default function FilterPanel({
  filters,
  weights,
  onFilterChange,
  onWeightChange,
  onReset,
  onClose,
  excludedStates,
  onExcludeState,
  onIncludeState,
}: FilterPanelProps) {
  const [stateSearch, setStateSearch] = useState('');

  const searchResults = stateSearch.trim().length > 0
    ? statesData.filter(
        (s) =>
          !excludedStates.includes(s.id) &&
          (s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
            s.abbreviation.toLowerCase().includes(stateSearch.toLowerCase()))
      ).slice(0, 6)
    : [];

  const excludedStateObjects = statesData.filter((s) => excludedStates.includes(s.id));
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
        </div>
      </div>

      {/* Weights */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h4 className="font-medium text-sm text-slate-700">Customize Priorities</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <Label>Tax Friendliness</Label>
            <span className="font-medium text-blue-600">{weights.taxes}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={5}
            value={[weights.taxes]}
            onValueChange={(value) => onWeightChange('taxes', value[0])}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <Label>Cost of Living</Label>
            <span className="font-medium text-blue-600">{weights.cost}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={5}
            value={[weights.cost]}
            onValueChange={(value) => onWeightChange('cost', value[0])}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <Label>Veteran Benefits</Label>
            <span className="font-medium text-blue-600">{weights.benefits}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={5}
            value={[weights.benefits]}
            onValueChange={(value) => onWeightChange('benefits', value[0])}
          />
        </div>
      </div>

      {/* Exclude States */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h4 className="font-medium text-sm text-slate-700">Exclude States</h4>
        <p className="text-xs text-slate-400">Removed from all results and financial calculations.</p>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
            placeholder="Search states to exclude…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-300 rounded-md bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
        </div>

        {/* Search dropdown */}
        {searchResults.length > 0 && (
          <div className="border border-slate-200 rounded-md overflow-hidden shadow-sm">
            {searchResults.map((state) => (
              <button
                key={state.id}
                onClick={() => { onExcludeState(state.id); setStateSearch(''); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
              >
                <span>{state.name}</span>
                <span className="text-xs text-slate-400">{state.abbreviation}</span>
              </button>
            ))}
          </div>
        )}

        {/* Excluded chips */}
        {excludedStateObjects.length > 0 && (
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
                  aria-label={`Remove ${state.name} from exclusions`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Button variant="outline" onClick={onReset} className="w-full">
        Reset All
      </Button>
    </div>
  );
}
