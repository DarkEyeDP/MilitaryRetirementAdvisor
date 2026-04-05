import { useState, useRef, useEffect } from 'react';
import { StateData, calculateCustomScore, DEFAULT_SCORE_WEIGHTS } from '../data/stateData';
import { Sheet, SheetContent } from './ui/sheet';
import { X, ExternalLink, ArrowUpRight, DollarSign, Home, ShieldCheck, TrendingUp, Users, Building2, MapPin, GitCompare, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/app/components/ui/utils';

interface ComparisonDrawerProps {
  states: StateData[];
  open: boolean;
  onClose: () => void;
  onRemove: (stateId: string) => void;
  onAdd?: (stateId: string) => void;
  availableStates?: StateData[];
  customScores?: Record<string, number>;
}

function scoreColor(score: number) {
  if (score >= 90) return 'text-green-600 bg-green-50';
  if (score >= 80) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-slate-600 bg-slate-50';
}

function taxBadgeColor(tax: string) {
  if (tax === 'No') return 'bg-green-100 text-green-700';
  if (tax === 'Partial') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

function taxLabel(tax: string) {
  if (tax === 'No') return 'Tax Free';
  if (tax === 'Partial') return 'Partial';
  return 'Taxed';
}

function propertyBadgeColor(level: string) {
  if (level === 'Low') return 'bg-green-100 text-green-700';
  if (level === 'Medium') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

function SectionHeader({ label }: { label: string }) {
  return (
    <tr>
      <td colSpan={4} className="px-4 py-2 bg-slate-50 border-y border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      </td>
    </tr>
  );
}

function StatePickerSlot({
  onSelect,
  availableStates,
}: {
  onSelect: (stateId: string) => void;
  availableStates: StateData[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? availableStates.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.abbreviation.toLowerCase().includes(query.toLowerCase())
      )
    : availableStates;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl border-2 border-dashed border-slate-200 p-3 flex flex-col items-center justify-center min-h-[88px] gap-1.5 w-full hover:border-blue-300 hover:bg-blue-50/50 transition-colors group"
      >
        <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
          <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </div>
        <span className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors font-medium">Add state</span>
      </button>
    );
  }

  return (
    <div ref={containerRef} className="rounded-xl border-2 border-blue-300 bg-white min-h-[88px] overflow-hidden">
      <div className="relative border-b border-slate-100">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states…"
          className="w-full pl-8 pr-3 py-2 text-xs bg-transparent placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <div className="max-h-40 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-3 py-2 text-xs text-slate-400">No matches</div>
        ) : (
          filtered.map((state) => (
            <button
              key={state.id}
              onClick={() => {
                onSelect(state.id);
                setIsOpen(false);
                setQuery('');
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors"
            >
              <span className="font-medium">{state.name}</span>
              <span className="text-slate-400">{state.abbreviation}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default function ComparisonDrawer({
  states,
  open,
  onClose,
  onRemove,
  onAdd,
  availableStates = [],
  customScores,
}: ComparisonDrawerProps) {
  const navigate = useNavigate();

  if (states.length === 0 && !open) return null;

  const scores = states.map((s) => customScores?.[s.id] ?? calculateCustomScore(s, DEFAULT_SCORE_WEIGHTS));
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const addableStates = availableStates
    .filter((s) => !states.find((c) => c.id === s.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  const emptySlots = 3 - states.length;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      {/* [&>button]:hidden suppresses the built-in SheetContent close button */}
      <SheetContent side="right" className="w-full sm:max-w-xl flex flex-col p-0 gap-0 bg-white [&>button]:hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <GitCompare className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">State Comparison</h2>
              <p className="text-xs text-slate-400">{states.length} of 3 states selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-4 pb-2 space-y-4">

            {/* State cards + empty slots */}
            <div className={cn('grid gap-2', 'grid-cols-3')}>
              {states.map((state, i) => {
                const score = scores[i];
                const sc = scoreColor(score);
                return (
                  <div key={state.id} className="relative bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
                    <button
                      onClick={() => onRemove(state.id)}
                      className="absolute top-2 right-2 p-0.5 rounded-md text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="pr-5">
                      <div className="text-xs text-slate-400 font-medium">{state.abbreviation}</div>
                      <div className="font-semibold text-slate-900 text-sm leading-tight mt-0.5 line-clamp-1">{state.name}</div>
                      <div className="mt-2">
                        <div className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-0.5">Score</div>
                        <span className={cn('text-xl font-bold leading-none', sc.split(' ')[0])}>
                          {score}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Empty slots — clickable state pickers */}
              {onAdd && Array.from({ length: emptySlots }).map((_, i) => (
                <StatePickerSlot
                  key={`slot-${i}`}
                  availableStates={addableStates}
                  onSelect={onAdd}
                />
              ))}
              {!onAdd && Array.from({ length: emptySlots }).map((_, i) => (
                <div key={`empty-${i}`} className="rounded-xl border-2 border-dashed border-slate-200 p-3 flex items-center justify-center min-h-[88px]">
                  <span className="text-xs text-slate-300">+ Add state</span>
                </div>
              ))}
            </div>

            {/* Hint */}
            {states.length < 2 && (
              <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                Add {2 - states.length} more state{states.length === 0 ? 's' : ''} to see a side-by-side comparison.
              </div>
            )}

            {/* Full comparison link */}
            <button
              onClick={() => { onClose(); navigate('/compare'); }}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg py-2.5 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              Full Comparison &amp; Financial Breakdown
            </button>

            {/* Metrics table — only when 2+ states */}
            {states.length >= 2 && (
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2.5 font-medium text-slate-500 text-xs uppercase tracking-wide w-28">Metric</th>
                      {states.map((state) => (
                        <th key={state.id} className="text-center px-3 py-2.5 font-semibold text-slate-700 text-sm">
                          {state.abbreviation}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <SectionHeader label="Tax" />

                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-slate-400" />Score</div>
                      </td>
                      {states.map((state, i) => {
                        const score = scores[i];
                        const isBest = score === bestScore;
                        const sc = scoreColor(score);
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('inline-flex items-center gap-1 font-bold text-base', sc.split(' ')[0])}>
                              {isBest && <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />}
                              {score}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    <tr className="border-b border-slate-100 bg-slate-50/40">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" />Pension Tax</div>
                      </td>
                      {states.map((state) => (
                        <td key={state.id} className="text-center px-3 py-3">
                          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', taxBadgeColor(state.militaryPensionTax))}>
                            {taxLabel(state.militaryPensionTax)}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-slate-400" />Income Tax</div>
                      </td>
                      {states.map((state) => (
                        <td key={state.id} className="text-center px-3 py-3">
                          {state.stateIncomeTax === 0
                            ? <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">None</span>
                            : <span className="text-slate-700 font-medium">{state.stateIncomeTax}%</span>}
                        </td>
                      ))}
                    </tr>

                    <SectionHeader label="Cost & Housing" />

                    <tr className="border-b border-slate-100 bg-slate-50/40">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" />Cost of Living</div>
                      </td>
                      {states.map((state) => {
                        const best = Math.min(...states.map((s) => s.costOfLivingIndex));
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('font-medium', state.costOfLivingIndex === best ? 'text-green-600 font-semibold' : 'text-slate-700')}>
                              {state.costOfLivingIndex}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-slate-400" />Property Tax</div>
                      </td>
                      {states.map((state) => (
                        <td key={state.id} className="text-center px-3 py-3">
                          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', propertyBadgeColor(state.propertyTaxLevel))}>
                            {state.propertyTaxLevel}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-100 bg-slate-50/40">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-slate-400" />Avg Home</div>
                      </td>
                      {states.map((state) => {
                        const best = Math.min(...states.map((s) => s.avgHomeCost));
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('font-medium', state.avgHomeCost === best ? 'text-green-600 font-semibold' : 'text-slate-700')}>
                              ${(state.avgHomeCost / 1000).toFixed(0)}k
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    <SectionHeader label="Veterans & Benefits" />

                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" />VA Benefits</div>
                      </td>
                      {states.map((state) => {
                        const best = Math.max(...states.map((s) => s.veteranBenefitsScore));
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('font-medium', state.veteranBenefitsScore === best ? 'text-green-600 font-semibold' : 'text-slate-700')}>
                              {state.veteranBenefitsScore}<span className="text-slate-400 text-xs">/100</span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    <tr className="border-b border-slate-100 bg-slate-50/40">
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-400" />VA Facilities</div>
                      </td>
                      {states.map((state) => {
                        const best = Math.max(...states.map((s) => s.vaFacilities));
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('font-medium', state.vaFacilities === best ? 'text-green-600 font-semibold' : 'text-slate-700')}>
                              {state.vaFacilities}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    <tr>
                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" />Vet Population</div>
                      </td>
                      {states.map((state) => {
                        const best = Math.max(...states.map((s) => s.veteranPopulation));
                        const val = state.veteranPopulation >= 1_000_000
                          ? (state.veteranPopulation / 1_000_000).toFixed(1) + 'M'
                          : (state.veteranPopulation / 1000).toFixed(0) + 'k';
                        return (
                          <td key={state.id} className="text-center px-3 py-3">
                            <span className={cn('font-medium', state.veteranPopulation === best ? 'text-green-600 font-semibold' : 'text-slate-700')}>
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* View state buttons */}
          {states.length > 0 && (
            <div
              className="px-5 py-4 border-t border-slate-100 grid gap-2"
              style={{ gridTemplateColumns: `repeat(${states.length}, 1fr)` }}
            >
              {states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => { onClose(); navigate(`/state/${state.id}`); }}
                  className="flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-colors"
                >
                  {state.abbreviation}
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
