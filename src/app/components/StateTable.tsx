import { useState } from 'react';
import { StateData } from '../data/stateData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router';

interface StateTableProps {
  states: StateData[];
  favorites: string[];
  onToggleFavorite: (stateId: string) => void;
  customScores?: Record<string, number>;
}

type SortField = 'name' | 'score' | 'tax' | 'costOfLiving' | 'benefits';
type SortDirection = 'asc' | 'desc';

export default function StateTable({ states, favorites, onToggleFavorite, customScores }: StateTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'name' ? 'asc' : 'desc');
    }
  };

  const sortedStates = [...states].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    switch (sortField) {
      case 'name':
        aVal = a.name;
        bVal = b.name;
        break;
      case 'score':
        aVal = customScores?.[a.id] ?? a.retirementScore;
        bVal = customScores?.[b.id] ?? b.retirementScore;
        break;
      case 'tax':
        aVal = a.militaryPensionTax === 'No' ? 0 : a.militaryPensionTax === 'Partial' ? 1 : 2;
        bVal = b.militaryPensionTax === 'No' ? 0 : b.militaryPensionTax === 'Partial' ? 1 : 2;
        break;
      case 'costOfLiving':
        aVal = a.costOfLivingIndex;
        bVal = b.costOfLivingIndex;
        break;
      case 'benefits':
        aVal = a.veteranBenefitsScore;
        bVal = b.veteranBenefitsScore;
        break;
    }

    if (typeof aVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const getTaxBadgeColor = (tax: string) => {
    if (tax === 'No') return 'bg-green-100 text-green-700';
    if (tax === 'Partial') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 80) return 'bg-blue-100 text-blue-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-slate-100 text-slate-700';
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-8 -ml-3 hover:bg-transparent"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <SortButton field="name">State</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="tax">Military Pension Tax</SortButton>
              </TableHead>
              <TableHead>State Income Tax</TableHead>
              <TableHead>Property Tax</TableHead>
              <TableHead>
                <SortButton field="costOfLiving">Cost of Living</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="benefits">VA Benefits</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="score">Score</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStates.map((state) => {
              const isFavorite = favorites.includes(state.id);
              const displayScore = customScores?.[state.id] ?? state.retirementScore;
              
              return (
                <TableRow
                  key={state.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => navigate(`/state/${state.id}`)}
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(state.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      {isFavorite
                        ? <BookmarkCheck className="w-4 h-4 text-blue-600" />
                        : <Bookmark className="w-4 h-4 text-slate-400" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{state.name}</TableCell>
                  <TableCell>
                    <Badge className={getTaxBadgeColor(state.militaryPensionTax)}>
                      {state.militaryPensionTax}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {state.stateIncomeTax === 0 ? (
                      <span className="text-green-600 font-medium">None</span>
                    ) : (
                      `${state.stateIncomeTax}%`
                    )}
                  </TableCell>
                  <TableCell>{state.propertyTaxLevel}</TableCell>
                  <TableCell>{state.costOfLivingIndex}</TableCell>
                  <TableCell>{state.veteranBenefitsScore}/100</TableCell>
                  <TableCell>
                    <Badge className={getScoreBadge(displayScore)}>
                      {displayScore}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
