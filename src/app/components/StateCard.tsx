import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { StateData, statesData, scoreTier } from '../data/stateData';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
import { GitCompare, TrendingUp, TrendingDown, DollarSign, Home, Star, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

function pensionTaxDollars(s: StateData, annualIncome: number): number {
  if (s.militaryPensionTax === 'No') return 0;
  const taxable = s.militaryPensionTax === 'Partial' ? annualIncome * 0.5 : annualIncome;
  return taxable * (s.stateIncomeTax / 100);
}

interface StateCardProps {
  state: StateData;
  customScore?: number;
  isFavorite: boolean;
  onToggleFavorite: (stateId: string) => void;
  resultIds?: string[];
  currentStateId?: string;
  retirementIncome?: number;
  disabilityRating?: string;
}

export default function StateCard({
  state,
  customScore,
  isFavorite,
  onToggleFavorite,
  resultIds,
  currentStateId,
  retirementIncome = 60000,
  disabilityRating,
}: StateCardProps) {
  const navigate = useNavigate();
  const displayScore = customScore ?? state.retirementScore;

  const currentState = currentStateId ? statesData.find((s) => s.id === currentStateId) ?? null : null;
  const annualSavings = currentState
    ? Math.round(pensionTaxDollars(currentState, retirementIncome) - pensionTaxDollars(state, retirementIncome))
    : null;
  // COL delta: positive = destination is cheaper, negative = more expensive
  const colDiffPct = currentState
    ? Math.round(((currentState.costOfLivingIndex - state.costOfLivingIndex) / currentState.costOfLivingIndex) * 100)
    : null;
  const facilities = vaFacilityLocations[state.id] ?? [];
  const vamcCount = facilities.filter((f) => f.type !== 'clinic').length;
  const clinicCount = facilities.filter((f) => f.type === 'clinic').length;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-slate-600 bg-slate-50';
  };

  const getTaxBadgeColor = (tax: string) => {
    if (tax === 'No') return 'bg-green-100 text-green-700';
    if (tax === 'Partial') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const flagUrl = `https://cdn.jsdelivr.net/gh/hayleox/flags@master/svg/us/${state.abbreviation.toLowerCase()}.svg`;

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => navigate(`/state/${state.id}`, { state: { resultIds, currentStateId, retirementIncome } })}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <img
                src={flagUrl}
                alt={`${state.name} state flag`}
                className="h-5 w-auto shadow-sm border border-slate-200/60 flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <CardTitle className="text-xl">{state.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge className={getTaxBadgeColor(state.militaryPensionTax)}>
                {state.militaryPensionTax === 'No'
                  ? 'Tax Free'
                  : state.militaryPensionTax === 'Partial'
                    ? 'Partial Tax'
                    : 'Taxed'}
              </Badge>
              {state.stateIncomeTax === 0 && <Badge variant="outline">No Income Tax</Badge>}
              {annualSavings !== null && annualSavings > 0 && (
                <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Save ${annualSavings.toLocaleString()}/yr tax
                </Badge>
              )}
              {annualSavings !== null && annualSavings < 0 && (
                <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                  +${Math.abs(annualSavings).toLocaleString()}/yr more tax
                </Badge>
              )}
              {colDiffPct !== null && colDiffPct !== 0 && (
                <Badge className={colDiffPct > 0
                  ? 'bg-blue-100 text-blue-700 flex items-center gap-1'
                  : 'bg-slate-100 text-slate-500 flex items-center gap-1'
                }>
                  {colDiffPct > 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  COL {Math.abs(colDiffPct)}% {colDiffPct > 0 ? 'lower' : 'higher'}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span><span className="font-medium text-slate-700">{vamcCount}</span> VAMC{vamcCount !== 1 ? 's' : ''}</span>
              <span className="text-slate-300">·</span>
              <span><span className="font-medium text-slate-700">{clinicCount}</span> Clinic{clinicCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Score</div>
            <div className={`text-3xl font-bold leading-none ${getScoreColor(displayScore).split(' ')[0]}`}>
              {displayScore}
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scoreTier(displayScore).className}`}>
              {scoreTier(displayScore).label}
            </span>
            <div className="relative group/tooltip mt-0.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(state.id);
                }}
                className="h-8 w-8 p-0"
              >
                <GitCompare className={`w-4 h-4 ${isFavorite ? 'text-blue-600' : 'text-slate-400'}`} />
              </Button>
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 leading-relaxed opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                {isFavorite
                  ? `Remove ${state.name} from your side-by-side comparison.`
                  : `Add ${state.name} to your side-by-side comparison. Up to 3 states at a time.`}
                <div className="absolute right-2.5 -top-1 w-2 h-2 bg-slate-900 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Cost of Living</div>
                <div className="font-medium">{state.costOfLivingIndex}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">VA Benefits</div>
                <div className="font-medium">{state.veteranBenefitsScore}/100</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Property Tax</div>
                <div className="font-medium">{state.propertyTaxLevel}</div>
                {disabilityRating === '100' && state.propertyTaxExemption100 === 'Full' && (
                  <div className="text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full mt-0.5 leading-none inline-block">Exempt at 100%</div>
                )}
                {disabilityRating === '100' && state.propertyTaxExemption100 === 'Partial' && (
                  <div className="text-[10px] font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full mt-0.5 leading-none inline-block">Partial Exemption</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Avg Home</div>
                <div className="font-medium">${(state.avgHomeCost / 1000).toFixed(0)}k</div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500 mb-1">Top Benefits:</div>
            <ul className="space-y-1">
              {state.militaryBenefits.slice(0, 2).map((benefit, idx) => (
                <li key={idx} className="text-sm text-slate-700 line-clamp-1">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-blue-500 font-medium flex items-center gap-1">
              View details
              <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
