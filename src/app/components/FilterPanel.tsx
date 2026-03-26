import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    noIncomeTax: boolean;
    taxFreeMilitary: boolean;
    lowCostOfLiving: boolean;
    highVABenefits: boolean;
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
}

export default function FilterPanel({
  filters,
  weights,
  onFilterChange,
  onWeightChange,
  onReset,
  onClose,
}: FilterPanelProps) {
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
        <h4 className="font-medium text-sm text-slate-700">Quick Filters</h4>
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

      <Button variant="outline" onClick={onReset} className="w-full">
        Reset All
      </Button>
    </div>
  );
}
