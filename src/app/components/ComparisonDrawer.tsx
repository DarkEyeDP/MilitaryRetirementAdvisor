import { StateData } from '../data/stateData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ComparisonDrawerProps {
  states: StateData[];
  open: boolean;
  onClose: () => void;
  onRemove: (stateId: string) => void;
  customScores?: Record<string, number>;
}

export default function ComparisonDrawer({
  states,
  open,
  onClose,
  onRemove,
  customScores,
}: ComparisonDrawerProps) {
  const navigate = useNavigate();

  if (states.length === 0) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Compare States ({states.length}/3)</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
            {states.length >= 1 && (
              <Button
                className="w-full"
                onClick={() => { onClose(); navigate('/compare'); }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Full Comparison Page
              </Button>
            )}
            {states.length < 2 && (
              <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                Add 1–2 more states to see a side-by-side comparison.
              </div>
            )}
            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-medium">Metric</th>
                    {states.map((state) => (
                      <th key={state.id} className="text-center py-3 px-2 font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <span>{state.abbreviation}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(state.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Overall Score</td>
                    {states.map((state) => {
                      const score = customScores?.[state.id] ?? state.retirementScore;
                      return (
                        <td key={state.id} className="text-center py-3 px-2">
                          <Badge
                            className={
                              score >= 90
                                ? 'bg-green-100 text-green-700'
                                : score >= 80
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {score}
                          </Badge>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Military Pension Tax</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        <Badge
                          className={
                            state.militaryPensionTax === 'No'
                              ? 'bg-green-100 text-green-700'
                              : state.militaryPensionTax === 'Partial'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }
                        >
                          {state.militaryPensionTax}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">State Income Tax</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {state.stateIncomeTax === 0 ? (
                          <span className="text-green-600 font-medium">None</span>
                        ) : (
                          `${state.stateIncomeTax}%`
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Property Tax</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {state.propertyTaxLevel}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Cost of Living Index</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {state.costOfLivingIndex}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">VA Benefits Score</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {state.veteranBenefitsScore}/100
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">VA Facilities</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {state.vaFacilities}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Avg Home Cost</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        ${(state.avgHomeCost / 1000).toFixed(0)}k
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Veteran Population</td>
                    {states.map((state) => (
                      <td key={state.id} className="text-center py-3 px-2">
                        {(state.veteranPopulation / 1000).toFixed(0)}k
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              {states.map((state) => (
                <Button
                  key={state.id}
                  variant="outline"
                  onClick={() => navigate(`/state/${state.id}`)}
                  className="flex-1 min-w-[120px]"
                >
                  View {state.name}
                </Button>
              ))}
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
