import { ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { SiteLogo } from '../../components/ui/SiteLogo';
import IconReadOutlined from '../../components/ui/IconReadOutlined';
import type { StateData } from '../../data/stateData';
import { getEffectiveTaxRate } from '../../data/stateTaxBrackets';
import type { ElementType } from 'react';

interface StickyHeaderProps {
  state: StateData;
  prevState: StateData | null;
  nextState: StateData | null;
  prevId: string | null;
  nextId: string | null;
  prevScore: number;
  nextScore: number;
  computedScore: number;
  headerScrolled: boolean;
  pdfLoading: boolean;
  isSeparating: boolean;
  taxBadge: { text: string; color: string; icon: ElementType };
  flagUrl: string;
  retirementIncome: number;
  getScoreColor: (score: number) => string;
  onExportPdf: () => void;
  onNavPrev: () => void;
  onNavNext: () => void;
  onNavigate: (path: string) => void;
}

export function StickyHeader({
  state, prevState, nextState, prevId, nextId, prevScore, nextScore, computedScore,
  headerScrolled, pdfLoading, isSeparating, taxBadge, flagUrl, retirementIncome,
  getScoreColor, onExportPdf, onNavPrev, onNavNext, onNavigate,
}: StickyHeaderProps) {
  const TaxIcon = taxBadge.icon;
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          <Button variant="ghost" onClick={() => onNavigate('/dashboard')} className="gap-2 shrink-0">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Results</span>
          </Button>

          <div className={`flex items-center gap-1.5 transition-all duration-300 ${headerScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavPrev}
              disabled={!prevId}
              className="h-7 px-1.5 shrink-0 hidden sm:flex items-center gap-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {prevState && (
                <span className="text-[10px] font-semibold leading-none">
                  {prevState.abbreviation} <span className={getScoreColor(prevScore)}>{prevScore}</span>
                </span>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <img
                src={flagUrl}
                alt=""
                className="h-5 w-auto shadow-sm border border-slate-200/60 shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className={`font-bold text-slate-900 whitespace-nowrap ${state.name.length >= 13 ? 'text-sm' : 'text-base'}`}>{state.name}</span>
              {!isSeparating && (
                <Badge className={`${taxBadge.color} flex items-center gap-1 text-xs`}>
                  <TaxIcon className="w-3 h-3" />
                  {taxBadge.text}
                </Badge>
              )}
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200 text-sm text-slate-500 shrink-0">
                {state.stateIncomeTax === 0
                  ? <span className="text-green-600 font-medium whitespace-nowrap">No income tax</span>
                  : <span className="whitespace-nowrap" title={`${state.stateIncomeTax}% top marginal rate`}>
                      ~{getEffectiveTaxRate(retirementIncome || 60_000, state.id).toFixed(1)}% eff. rate
                    </span>}
                <span className="whitespace-nowrap">COL {state.costOfLivingIndex}</span>
                <span className={`font-bold text-base whitespace-nowrap ${getScoreColor(computedScore)}`}>
                  {computedScore}<span className="text-xs font-normal text-slate-400 ml-0.5">/ 100</span>
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavNext}
              disabled={!nextId}
              className="h-7 px-1.5 shrink-0 hidden sm:flex items-center gap-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
            >
              {nextState && (
                <span className="text-[10px] font-semibold leading-none">
                  <span className={getScoreColor(nextScore)}>{nextScore}</span> {nextState.abbreviation}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={onExportPdf} disabled={pdfLoading} className="gap-1.5 h-8 text-xs">
              {pdfLoading
                ? <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin" />
                : <Download className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{pdfLoading ? 'Building…' : 'Export PDF'}</span>
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('/sources')} className="gap-2">
              <IconReadOutlined className="w-4 h-4" />
              <span className="hidden sm:inline">Sources</span>
            </Button>
            <SiteLogo className="hidden sm:block w-5 h-5" />
            <span className="font-semibold hidden md:inline text-sm">MilRetired.com</span>
          </div>

        </div>
      </div>
    </header>
  );
}
