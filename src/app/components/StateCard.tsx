import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { StateData } from '../data/stateData';
import { Bookmark, BookmarkCheck, TrendingUp, DollarSign, Home, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

interface StateCardProps {
  state: StateData;
  customScore?: number;
  isFavorite: boolean;
  onToggleFavorite: (stateId: string) => void;
}

export default function StateCard({
  state,
  customScore,
  isFavorite,
  onToggleFavorite,
}: StateCardProps) {
  const navigate = useNavigate();
  const displayScore = customScore ?? state.retirementScore;

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

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{state.name}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getTaxBadgeColor(state.militaryPensionTax)}>
                {state.militaryPensionTax === 'No'
                  ? 'Tax Free'
                  : state.militaryPensionTax === 'Partial'
                    ? 'Partial Tax'
                    : 'Taxed'}
              </Badge>
              {state.stateIncomeTax === 0 && <Badge variant="outline">No Income Tax</Badge>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`text-3xl font-bold ${getScoreColor(displayScore).split(' ')[0]}`}>
              {displayScore}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(state.id);
              }}
              className="h-8 w-8 p-0"
            >
              {isFavorite ? (
                <BookmarkCheck className="w-4 h-4 text-blue-600" />
              ) : (
                <Bookmark className="w-4 h-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent onClick={() => navigate(`/state/${state.id}`)}>
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

          <Button
            variant="outline"
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
