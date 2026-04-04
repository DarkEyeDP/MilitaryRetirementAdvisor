import { useState } from 'react';
import { motion } from 'motion/react';
import { StateData } from '../data/stateData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { GitCompare, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { useNavigate } from 'react-router';

interface StateTableProps {
  states: StateData[];
  favorites: string[];
  onToggleFavorite: (stateId: string) => void;
  customScores?: Record<string, number>;
}

type SortField = 'name' | 'score' | 'tax' | 'stateIncomeTax' | 'propertyTax' | 'costOfLiving' | 'benefits';
type SortDir = 'asc' | 'desc';

const MotionTr = motion.tr;

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40 inline-block" />;
  return dir === 'asc'
    ? <ChevronUp className="w-3 h-3 ml-1 inline-block text-blue-600" />
    : <ChevronDown className="w-3 h-3 ml-1 inline-block text-blue-600" />;
}

function SortHead({
  label,
  sortKey,
  currentKey,
  dir,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortField;
  currentKey: SortField;
  dir: SortDir;
  onSort: (key: SortField) => void;
  className?: string;
}) {
  return (
    <TableHead
      className={`cursor-pointer select-none whitespace-nowrap hover:bg-slate-100 transition-colors px-4 py-3 ${className ?? ''}`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <SortIcon active={currentKey === sortKey} dir={dir} />
    </TableHead>
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
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'name' ? 'asc' : 'desc');
    }
  };

  const propertyTaxOrder: Record<string, number> = { Low: 0, Medium: 1, High: 2 };

  const sortedStates = [...states].sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let aVal: any, bVal: any;
    switch (sortField) {
      case 'name':         aVal = a.name; bVal = b.name; break;
      case 'score':        aVal = customScores?.[a.id] ?? a.retirementScore; bVal = customScores?.[b.id] ?? b.retirementScore; break;
      case 'tax':          aVal = a.militaryPensionTax === 'No' ? 0 : a.militaryPensionTax === 'Partial' ? 1 : 2; bVal = b.militaryPensionTax === 'No' ? 0 : b.militaryPensionTax === 'Partial' ? 1 : 2; break;
      case 'stateIncomeTax': aVal = a.stateIncomeTax; bVal = b.stateIncomeTax; break;
      case 'propertyTax':  aVal = propertyTaxOrder[a.propertyTaxLevel] ?? 1; bVal = propertyTaxOrder[b.propertyTaxLevel] ?? 1; break;
      case 'costOfLiving': aVal = a.costOfLivingIndex; bVal = b.costOfLivingIndex; break;
      case 'benefits':     aVal = a.veteranBenefitsScore; bVal = b.veteranBenefitsScore; break;
    }
    if (typeof aVal === 'string') return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
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
      <div className="overflow-x-auto overflow-y-auto max-h-[65vh]">
        <table className="w-full caption-bottom text-sm">
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="hover:bg-white border-b border-slate-200">
              <TableHead className="w-10 px-4 py-3" />
              <SortHead label="State"               sortKey="name"          currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="Pension Tax"         sortKey="tax"           currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="Income Tax %"        sortKey="stateIncomeTax" currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="Property Tax"        sortKey="propertyTax"   currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="Cost of Living"      sortKey="costOfLiving"  currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="VA Benefits"         sortKey="benefits"      currentKey={sortField} dir={sortDir} onSort={handleSort} />
              <SortHead label="Score"               sortKey="score"         currentKey={sortField} dir={sortDir} onSort={handleSort} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStates.map((state, i) => {
              const isFavorite = favorites.includes(state.id);
              const displayScore = customScores?.[state.id] ?? state.retirementScore;

              return (
                <MotionTr
                  key={state.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.03, ease: 'easeOut' }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/state/${state.id}`)}
                >
                  <TableCell className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(state.id); }}
                      className="h-8 w-8 p-0"
                    >
                      <GitCompare className={`w-4 h-4 ${isFavorite ? 'text-blue-600' : 'text-slate-400'}`} />
                    </Button>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{state.name}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge className={getTaxBadgeColor(state.militaryPensionTax)}>
                      {state.militaryPensionTax}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {state.stateIncomeTax === 0
                      ? <span className="text-green-600 font-medium">None</span>
                      : `${state.stateIncomeTax}%`}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{state.propertyTaxLevel}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{state.costOfLivingIndex}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{state.veteranBenefitsScore}/100</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge className={getScoreBadge(displayScore)}>{displayScore}</Badge>
                  </TableCell>
                </MotionTr>
              );
            })}
          </TableBody>
        </table>
      </div>
    </div>
  );
}
