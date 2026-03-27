import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { StateData } from '../data/stateData';
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

// Shared column widths — used in both the header and body tables so they align
const COL_WIDTHS = ['52px', '160px', '190px', '155px', '130px', '155px', '145px', '105px'];

function ColGroup() {
  return (
    <colgroup>
      {COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  );
}

function SortButton({
  field,
  children,
  onSort,
}: {
  field: SortField;
  children: ReactNode;
  onSort: (field: SortField) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className="h-8 -ml-3 hover:bg-transparent font-medium text-slate-700"
    >
      {children}
      <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-slate-400" />
    </Button>
  );
}

export default function StateTable({
  states,
  favorites,
  onToggleFavorite,
  customScores,
}: StateTableProps) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let aVal: any, bVal: any;
    switch (sortField) {
      case 'name':       aVal = a.name; bVal = b.name; break;
      case 'score':      aVal = customScores?.[a.id] ?? a.retirementScore; bVal = customScores?.[b.id] ?? b.retirementScore; break;
      case 'tax':        aVal = a.militaryPensionTax === 'No' ? 0 : a.militaryPensionTax === 'Partial' ? 1 : 2; bVal = b.militaryPensionTax === 'No' ? 0 : b.militaryPensionTax === 'Partial' ? 1 : 2; break;
      case 'costOfLiving': aVal = a.costOfLivingIndex; bVal = b.costOfLivingIndex; break;
      case 'benefits':   aVal = a.veteranBenefitsScore; bVal = b.veteranBenefitsScore; break;
    }
    if (typeof aVal === 'string') return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
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

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">

      {/* ── Fixed header ── outside scroll container so it never moves */}
      <div className="overflow-x-auto border-b border-slate-200 bg-white">
        <table className="w-full text-sm" style={{ tableLayout: 'fixed', minWidth: COL_WIDTHS.reduce((s, w) => s + parseInt(w), 0) + 'px' }}>
          <ColGroup />
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3" />
              <th className="px-4 py-3">
                <SortButton field="name" onSort={handleSort}>State</SortButton>
              </th>
              <th className="px-4 py-3">
                <SortButton field="tax" onSort={handleSort}>Military Pension Tax</SortButton>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-slate-700">State Income Tax</th>
              <th className="px-4 py-3 text-sm font-medium text-slate-700">Property Tax</th>
              <th className="px-4 py-3">
                <SortButton field="costOfLiving" onSort={handleSort}>Cost of Living</SortButton>
              </th>
              <th className="px-4 py-3">
                <SortButton field="benefits" onSort={handleSort}>VA Benefits</SortButton>
              </th>
              <th className="px-4 py-3">
                <SortButton field="score" onSort={handleSort}>Score</SortButton>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* ── Scrollable body ── */}
      <div className="overflow-x-auto overflow-y-auto max-h-[65vh]">
        <table className="w-full text-sm" style={{ tableLayout: 'fixed', minWidth: COL_WIDTHS.reduce((s, w) => s + parseInt(w), 0) + 'px' }}>
          <ColGroup />
          <tbody>
            {sortedStates.map((state, i) => {
              const isFavorite = favorites.includes(state.id);
              const displayScore = customScores?.[state.id] ?? state.retirementScore;

              return (
                <motion.tr
                  key={state.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.03, ease: 'easeOut' }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/state/${state.id}`)}
                >
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(state.id); }}
                      className="h-8 w-8 p-0"
                    >
                      {isFavorite
                        ? <BookmarkCheck className="w-4 h-4 text-blue-600" />
                        : <Bookmark className="w-4 h-4 text-slate-400" />}
                    </Button>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{state.name}</td>
                  <td className="px-4 py-3">
                    <Badge className={getTaxBadgeColor(state.militaryPensionTax)}>
                      {state.militaryPensionTax}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {state.stateIncomeTax === 0
                      ? <span className="text-green-600 font-medium">None</span>
                      : `${state.stateIncomeTax}%`}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{state.propertyTaxLevel}</td>
                  <td className="px-4 py-3 text-slate-600">{state.costOfLivingIndex}</td>
                  <td className="px-4 py-3 text-slate-600">{state.veteranBenefitsScore}/100</td>
                  <td className="px-4 py-3">
                    <Badge className={getScoreBadge(displayScore)}>{displayScore}</Badge>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
