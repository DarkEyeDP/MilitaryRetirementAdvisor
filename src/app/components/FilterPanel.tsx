import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
  onExcludeAll: () => void;
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
  onExcludeAll,
}: FilterPanelProps) {
  const [stateSearch, setStateSearch] = useState('');
  const [showMethodology, setShowMethodology] = useState(false);
  const [pendingIncludes, setPendingIncludes] = useState<string[]>([]);

  const allExcluded = excludedStates.length === statesData.length;

  const searchResults = stateSearch.trim().length > 0
    ? statesData.filter((s) =>
        allExcluded
          ? excludedStates.includes(s.id) && !pendingIncludes.includes(s.id)
          : !excludedStates.includes(s.id),
      ).filter((s) =>
        s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
        s.abbreviation.toLowerCase().includes(stateSearch.toLowerCase())
      ).slice(0, 6)
    : [];

  const excludedStateObjects = statesData.filter((s) => excludedStates.includes(s.id)).sort((a, b) => a.name.localeCompare(b.name));
  const pendingObjects = statesData.filter((s) => pendingIncludes.includes(s.id));

  const handleConfirmIncludes = () => {
    pendingIncludes.forEach((id) => onIncludeState(id));
    setPendingIncludes([]);
    setStateSearch('');
  };
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

      {/* Score Methodology */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => setShowMethodology((v) => !v)}
          className="flex items-center justify-between w-full text-left group"
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">How Scores Are Calculated</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showMethodology ? 'rotate-180' : ''}`} />
        </button>

        {showMethodology && (
          <div className="mt-3 space-y-3 text-xs text-slate-600">
            <p className="text-slate-500">
              Each state earns 0–100 across three components weighted by your priority sliders above.
            </p>

            <div className="space-y-2">
              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                <div className="font-semibold text-slate-700 flex items-center justify-between">
                  <span>Tax Friendliness</span>
                  <span className="text-blue-600 font-bold">{weights.taxes}%</span>
                </div>
                <div className="space-y-1 text-slate-500">
                  <div className="flex justify-between"><span>Military pension not taxed</span><span className="font-medium text-slate-700">+50 pts</span></div>
                  <div className="flex justify-between"><span>Pension partially exempt</span><span className="font-medium text-slate-700">+28 pts</span></div>
                  <div className="flex justify-between"><span>State income tax rate (0–13%)</span><span className="font-medium text-slate-700">up to +32 pts</span></div>
                  <div className="flex justify-between"><span>Property tax level (Low/Med/High)</span><span className="font-medium text-slate-700">+18 / +10 / 0</span></div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                <div className="font-semibold text-slate-700 flex items-center justify-between">
                  <span>Cost of Living</span>
                  <span className="text-blue-600 font-bold">{weights.cost}%</span>
                </div>
                <p className="text-slate-500">Scaled against a national baseline. Score drops sharply above the national average and rises for states below it.</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                <div className="font-semibold text-slate-700 flex items-center justify-between">
                  <span>Veteran Benefits</span>
                  <span className="text-blue-600 font-bold">{weights.benefits}%</span>
                </div>
                <p className="text-slate-500">State VA facility quality, veteran services, and veteran-focused programs rated 0–100.</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-3 py-1.5 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Score Tiers</div>
              <div className="divide-y divide-slate-100">
                {[
                  { label: 'Elite',    range: '95–100', cls: 'bg-emerald-100 text-emerald-700' },
                  { label: 'Strong',   range: '85–94',  cls: 'bg-blue-100 text-blue-700' },
                  { label: 'Moderate', range: '70–84',  cls: 'bg-yellow-100 text-yellow-700' },
                  { label: 'Weak',     range: 'Below 70', cls: 'bg-slate-100 text-slate-500' },
                ].map(({ label, range, cls }) => (
                  <div key={label} className="flex items-center justify-between px-3 py-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
                    <span className="text-slate-500">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exclude States */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-slate-700">Exclude States</h4>
          {!allExcluded && (
            <button
              onClick={() => { onExcludeAll(); setStateSearch(''); setPendingIncludes([]); }}
              className="text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md px-2 py-1 transition-colors"
            >
              Exclude all
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400">
          {allExcluded
            ? 'All states excluded. Search and select the states you want to see, then tap Done.'
            : 'Removed from all results and financial calculations.'}
        </p>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
            placeholder={allExcluded ? 'Search states to add back…' : 'Search states to exclude…'}
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-300 rounded-md bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
        </div>

        {/* Search dropdown */}
        {searchResults.length > 0 && (
          <div className="border border-slate-200 rounded-md overflow-hidden shadow-sm">
            {searchResults.map((state) => (
              <button
                key={state.id}
                onClick={() => {
                  if (allExcluded) {
                    setPendingIncludes((prev) => prev.includes(state.id) ? prev : [...prev, state.id]);
                  } else {
                    onExcludeState(state.id);
                  }
                  setStateSearch('');
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
              >
                <span>{state.name}</span>
                <span className={`text-xs ${allExcluded ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                  {allExcluded ? '+ select' : state.abbreviation}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Pending includes — staged states waiting for Done */}
        {allExcluded && pendingObjects.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {pendingObjects.map((state) => (
                <span
                  key={state.id}
                  className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-2 py-1"
                >
                  {state.name}
                  <button
                    onClick={() => setPendingIncludes((prev) => prev.filter((id) => id !== state.id))}
                    className="hover:text-blue-900 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={handleConfirmIncludes}
              className="w-full py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Done — Show {pendingObjects.length} State{pendingObjects.length !== 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* All-excluded summary when nothing pending */}
        {allExcluded && pendingObjects.length === 0 && (
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

        {/* Normal excluded chips */}
        {!allExcluded && excludedStateObjects.length > 0 && (
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
