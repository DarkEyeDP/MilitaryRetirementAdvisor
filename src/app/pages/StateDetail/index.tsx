import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router';
import { statesData, scoreTier } from '../../data/stateData';
import { calculateScore as calculateCustomScore, computeVeteranBenefitsScore } from '../../data/veteranScore';
import type { StateData } from '../../data/stateData';
import { stateHousingData } from '../../data/housingData';
import { vaFacilityLocations } from '../../data/vaFacilityLocations';
import { militaryInstallations } from '../../data/militaryInstallations';
import { stateEmploymentData } from '../../data/employmentData';
import { stateVeteranPerks } from '../../data/veteranPerksData';
import { stateVeteranUrls } from '../../data/stateVeteranUrls';
import { stateClimateData } from '../../data/climateData';
import { DATA_YEAR, LAST_UPDATED } from '../../data/siteConfig';
import { stateTaxBrackets, calculateProgressiveTax, getEffectiveTaxRate } from '../../data/stateTaxBrackets';
import { calculateFinancialReality, DEFAULT_USER_COST_PROFILE, sanitizeCostProfile, fmt$, type UserCostProfile, type SecondaryIncomeSource, type FinancialInputs } from '../../data/financialReality';
import { stateFinancialData } from '../../data/financialData';
import BudgetCustomizerPanel from '../../components/BudgetCustomizerPanel';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs } from '../../components/ui/tabs';
import {
  ChevronLeft, ChevronRight,
  DollarSign, Home, Building2, Users,
  CheckCircle2, AlertCircle,
  Star, TrendingDown, TrendingUp,
  GitCompare, ExternalLink, Info,
} from 'lucide-react';
import { toast } from 'sonner';
import ComparisonDrawer from '../../components/ComparisonDrawer';
import { pdf } from '@react-pdf/renderer';
import { StatePdfDocument } from '../../components/pdf/StatePdfDocument';
import { SiteLogo } from '../../components/ui/SiteLogo';
import { getFlagUrl } from '../../lib/flagUrl';
import { trackEvent } from '../../lib/analytics';

import { ScoreGauge, SectionMeter } from './ScoreGauge';
import { StickyHeader } from './StickyHeader';
import { FacilitiesSection } from './FacilitiesSection';
import { FinancialSection } from './FinancialSection';
import { SummaryCard } from './SummaryCard';
import { MilitaryBenefitsSection } from './MilitaryBenefitsSection';
import { HousingSection } from './HousingSection';
import { VeteranPerksSection } from './VeteranPerksSection';
import { ClimateSection } from './ClimateSection';

export default function StateDetail() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const state = statesData.find((s) => s.id === stateId);

  // URL search params take priority over localStorage — enables shareable links.
  const spIncome   = searchParams.get('income');
  const spDr       = searchParams.get('dr');
  const spSpouse   = searchParams.get('spouse');
  const spChildren = searchParams.get('children');
  const spType     = searchParams.get('type') as 'retiree' | 'separating' | null;
  const spOrigin   = searchParams.get('origin');
  const spSi       = searchParams.get('si');

  const locState = location.state as { resultIds?: string[]; currentStateId?: string; retirementIncome?: number } | null;
  const resultIds: string[] = locState?.resultIds ?? statesData.map((s) => s.id);
  const currentStateId: string | null = spOrigin ?? locState?.currentStateId ?? localStorage.getItem('origin-state-id');
  const retirementIncome: number = spIncome
    ? Number(spIncome)
    : (locState?.retirementIncome ?? (Number(localStorage.getItem('origin-retirement-income') || '0') || 60000));
  const userType = (spType ?? localStorage.getItem('origin-user-type') ?? 'retiree') as 'retiree' | 'separating';
  const isSeparating = userType === 'separating';
  const disabilityRating = spDr ?? localStorage.getItem('origin-disability-rating') ?? '';
  const perCapita = localStorage.getItem('va-scoring-per-capita') === 'true';

  const currentIdx = resultIds.indexOf(stateId ?? '');
  const prevId = currentIdx > 0 ? resultIds[currentIdx - 1] : null;
  const nextId = currentIdx < resultIds.length - 1 ? resultIds[currentIdx + 1] : null;
  const navTo = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/state/${id}${window.location.search}`, { state: { resultIds, currentStateId, retirementIncome } });
  };
  const navToKeepScroll = (id: string) => {
    sessionStorage.setItem('preserveScroll', '1');
    navigate(`/state/${id}${window.location.search}`, { state: { resultIds, currentStateId, retirementIncome } });
  };

  const originState = currentStateId ? statesData.find((s) => s.id === currentStateId) ?? null : null;
  function pensionTaxDollars(s: StateData): number {
    if (!isSeparating && s.militaryPensionTax === 'No') return 0;
    const taxable = (!isSeparating && s.militaryPensionTax === 'Partial') ? retirementIncome * 0.5 : retirementIncome;
    return calculateProgressiveTax(taxable, stateTaxBrackets[s.id] ?? []);
  }
  const annualSavings = originState && state
    ? Math.round(pensionTaxDollars(originState) - pensionTaxDollars(state))
    : null;
  const colDiffPct = originState && state
    ? Math.round(((originState.costOfLivingIndex - state.costOfLivingIndex) / originState.costOfLivingIndex) * 100)
    : null;

  const scoreWeights = (() => {
    try {
      const saved = localStorage.getItem('dashboard-weights');
      if (saved) return JSON.parse(saved) as { taxes: number; cost: number; benefits: number };
    } catch { /* ignore */ }
    return { taxes: 2, cost: 2, benefits: 2 };
  })();

  const [budgetProfile, setBudgetProfile] = useState<UserCostProfile>(() => {
    try {
      const saved = localStorage.getItem('budget-profile');
      if (saved) return sanitizeCostProfile(JSON.parse(saved));
    } catch { /* ignore */ }
    return DEFAULT_USER_COST_PROFILE;
  });
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const handleProfileChange = useCallback((profile: UserCostProfile) => {
    setBudgetProfile(profile);
    try { localStorage.setItem('budget-profile', JSON.stringify(profile)); } catch { /* ignore */ }
  }, []);

  const [frInputs, setFrInputs] = useState<FinancialInputs>(() => ({
    userType,
    retirementIncome,
    disabilityRating: disabilityRating || 'none',
    secondaryIncome: (() => {
      if (spSi) { try { return JSON.parse(spSi); } catch { /* ignore */ } }
      try {
        const stored = localStorage.getItem('origin-secondary-income');
        return stored ? JSON.parse(stored) : [];
      } catch { return []; }
    })(),
    hasSpouse: spSpouse !== null ? spSpouse === 'true' : localStorage.getItem('origin-has-spouse') === 'true',
    dependentChildren: spChildren !== null ? parseInt(spChildren, 10) : parseInt(localStorage.getItem('origin-dependent-children') ?? '0', 10),
  }));
  const handleChangeInputs = useCallback((updated: FinancialInputs) => {
    setFrInputs(updated);
    localStorage.setItem('origin-retirement-income', String(updated.retirementIncome));
    localStorage.setItem('origin-disability-rating', updated.disabilityRating || 'none');
    localStorage.setItem('origin-secondary-income', JSON.stringify(updated.secondaryIncome ?? []));
    localStorage.setItem('origin-has-spouse', String(updated.hasSpouse ?? false));
    localStorage.setItem('origin-dependent-children', String(updated.dependentChildren ?? 0));
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {
      income:   String(frInputs.retirementIncome),
      dr:       frInputs.disabilityRating || 'none',
      spouse:   String(frInputs.hasSpouse ?? false),
      children: String(frInputs.dependentChildren ?? 0),
      type:     frInputs.userType ?? 'retiree',
    };
    if (currentStateId) params.origin = currentStateId;
    if ((frInputs.secondaryIncome?.length ?? 0) > 0)
      params.si = JSON.stringify(frInputs.secondaryIncome);
    // Pass location.state through so resultIds (set by Dashboard navigation) isn't wiped.
    setSearchParams(params, { replace: true, state: location.state });
  }, [frInputs, currentStateId, setSearchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const financialBreakdown = state ? calculateFinancialReality(state, frInputs, budgetProfile) : null;
  const hasCustomizations = budgetProfile.isRenting
    || budgetProfile.homeValue !== null
    || budgetProfile.propertyTaxOverride !== null
    || budgetProfile.homeInsuranceOverride !== null
    || budgetProfile.autoInsuranceOverride !== null
    || budgetProfile.utilitiesOverride !== null
    || budgetProfile.groceryOverride !== null
    || budgetProfile.customLineItems.length > 0
    || (frInputs.secondaryIncome?.length ?? 0) > 0;
  const originBreakdown = originState && originState.id !== state?.id
    ? calculateFinancialReality(originState, frInputs, budgetProfile)
    : null;

  const prevState = prevId ? statesData.find((s) => s.id === prevId) ?? null : null;
  const nextState = nextId ? statesData.find((s) => s.id === nextId) ?? null : null;
  const prevScore = prevState ? calculateCustomScore(prevState, scoreWeights, perCapita) : 0;
  const nextScore = nextState ? calculateCustomScore(nextState, scoreWeights, perCapita) : 0;
  const computedScore = state ? calculateCustomScore(state, scoreWeights, perCapita) : 0;

  const [hoveredFacilityName, setHoveredFacilityName] = useState<string | null>(null);
  const [frShowYearly, setFrShowYearly] = useState(false);
  const [hoveredInstallationId, setHoveredInstallationId] = useState<string | null>(null);

  const [displayScore, setDisplayScore] = useState(0);
  const scoreFromRef = useRef(0);
  useEffect(() => {
    const from = scoreFromRef.current;
    const to = computedScore;
    let rafId: number;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / 700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplayScore(current);
      if (progress < 1) { scoreFromRef.current = current; rafId = requestAnimationFrame(tick); }
      else { scoreFromRef.current = to; }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [computedScore]);

  const taxScoreComponents = state ? (() => {
    const pensionPts  = state.militaryPensionTax === 'No' ? 50 : state.militaryPensionTax === 'Partial' ? 28 : 0;
    const effectiveRate = getEffectiveTaxRate(80_000, state.id);
    const incomePts   = Math.max(0, Math.round(32 - effectiveRate * 2.4));
    const propertyPts = state.propertyTaxLevel === 'Low' ? 18 : state.propertyTaxLevel === 'Medium' ? 10 : 0;
    return { total: pensionPts + incomePts + propertyPts, pensionPts, incomePts, propertyPts };
  })() : null;
  const costScore = state ? Math.min(100, Math.max(0, Math.round((160 - state.costOfLivingIndex) / 78 * 100))) : 0;

  const housing = state ? stateHousingData[state.id] : null;
  const climate = state ? stateClimateData[state.id] : null;
  const employment = state ? stateEmploymentData[state.id] : null;

  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);
  const activeClimate = climate
    ? (climate.regions && climate.regions.length > 0
        ? { ...climate, ...climate.regions[selectedRegionIdx] }
        : climate)
    : null;

  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('comparison-favorites') || '[]'); }
    catch { return []; }
  });
  const [showComparison, setShowComparison] = useState(false);
  const [resourceTab, setResourceTab] = useState<'va' | 'installations'>('va');
  const [showInstallations, setShowInstallations] = useState(false);

  const handleResourceTabChange = (v: 'va' | 'installations') => {
    setResourceTab(v);
    setShowInstallations(v === 'installations');
  };
  const isFavorite = state ? favorites.includes(state.id) : false;

  const saveFavorites = (next: string[]) => {
    setFavorites(next);
    localStorage.setItem('comparison-favorites', JSON.stringify(next));
  };
  const addFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id) || prev.length >= 3) return prev;
      const next = [...prev, id];
      localStorage.setItem('comparison-favorites', JSON.stringify(next));
      return next;
    });
  };
  const removeFavorite = (id: string) => saveFavorites(favorites.filter((f) => f !== id));
  const toggleFavorite = () => {
    if (!state) return;
    if (isFavorite) {
      saveFavorites(favorites.filter((id) => id !== state.id));
      toast.success(`${state.name} removed from comparison`);
    } else if (favorites.length >= 3) {
      toast.error('You can compare up to 3 states. Remove one first.');
    } else {
      saveFavorites([...favorites, state.id]);
      toast.success(`${state.name} added to comparison`);
    }
  };

  const [headerScrolled, setHeaderScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 180);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const nav = headerScrolled ? navToKeepScroll : navTo;
      if (e.key === 'ArrowLeft' && prevId) nav(prevId);
      if (e.key === 'ArrowRight' && nextId) nav(nextId);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevId, nextId, headerScrolled]);

  const [pdfLoading, setPdfLoading] = useState(false);
  const veteranPerksRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = async () => {
    if (!state) return;
    setPdfLoading(true);
    try {
      const rawClimate = stateClimateData[state.id] ?? null;
      const regionName = (rawClimate?.regions && rawClimate.regions.length > 0)
        ? rawClimate.regions[selectedRegionIdx].region
        : null;
      const blob = await pdf(
        <StatePdfDocument
          state={state}
          inputs={frInputs}
          breakdown={financialBreakdown}
          originBreakdown={originBreakdown?.hasFinancialData ? originBreakdown : null}
          housingData={stateHousingData[state.id] ?? null}
          employmentData={stateEmploymentData[state.id] ?? null}
          climateData={rawClimate}
          activeClimateData={activeClimate}
          selectedRegion={regionName}
          perks={stateVeteranPerks[state.id] ?? null}
          originState={originState}
          scoreWeights={scoreWeights}
          perCapita={perCapita}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.name.replace(/\s+/g, '-')}-Military-Retirement-Report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      trackEvent('pdf_export', { pdf_type: 'state_report', state_name: state.name });
    } finally {
      setPdfLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-50 dot-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">State not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 65) return 'text-yellow-600';
    return 'text-slate-600';
  };

  const getTaxBadge = (tax: string) => {
    if (tax === 'No')      return { text: 'Tax Free',       color: 'bg-green-100 text-green-700',  icon: CheckCircle2 };
    if (tax === 'Partial') return { text: 'Partially Taxed', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle };
    return                        { text: 'Fully Taxed',    color: 'bg-red-100 text-red-700',      icon: AlertCircle };
  };

  const taxBadge = getTaxBadge(state.militaryPensionTax);
  const TaxIcon = taxBadge.icon;
  const flagUrl = getFlagUrl(state.abbreviation);

  const stateNameSizeClass = state.name.length >= 13
    ? 'text-xl sm:text-3xl'
    : state.name.length >= 10
      ? 'text-2xl sm:text-3xl'
      : 'text-3xl';

  const formatVeteranPop = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return n.toString();
  };

  const allFacilities = vaFacilityLocations[state.id] ?? [];
  const vamcs = allFacilities.filter((f) => f.type !== 'clinic').sort((a, b) => a.name.localeCompare(b.name));
  const clinics = allFacilities.filter((f) => f.type === 'clinic').sort((a, b) => a.name.localeCompare(b.name));
  const stateInstallations = militaryInstallations.filter((i) => i.stateId === state.id).sort((a, b) => a.name.localeCompare(b.name));

  const facilityPanelHeight = 520;
  const directoryHeight = facilityPanelHeight + 80;

  return (
    <div className="min-h-screen bg-slate-50 dot-bg">
      <StickyHeader
        state={state}
        prevState={prevState}
        nextState={nextState}
        prevId={prevId}
        nextId={nextId}
        prevScore={prevScore}
        nextScore={nextScore}
        computedScore={computedScore}
        headerScrolled={headerScrolled}
        pdfLoading={pdfLoading}
        isSeparating={isSeparating}
        taxBadge={taxBadge}
        flagUrl={flagUrl}
        retirementIncome={retirementIncome}
        getScoreColor={getScoreColor}
        onExportPdf={handleExportPdf}
        onNavPrev={() => prevId && navToKeepScroll(prevId)}
        onNavNext={() => nextId && navToKeepScroll(nextId)}
        onNavigate={navigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero card */}
        <div className="flex items-stretch gap-2 mb-6">
          <div className="hidden md:flex items-center">
            <Button
              variant="outline"
              onClick={() => prevId && navTo(prevId)}
              disabled={!prevId}
              className="h-full min-h-[56px] px-3 rounded-xl border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 flex flex-col items-center gap-0.5 w-[64px]"
            >
              <ChevronLeft className="w-4 h-4" />
              {prevState && (
                <>
                  <span className="text-[10px] font-bold leading-none tracking-wide">{prevState.abbreviation}</span>
                  <span className={`text-xs font-bold leading-none ${getScoreColor(prevScore)}`}>{prevScore}</span>
                </>
              )}
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex-1">
            <div className="flex items-start justify-between gap-6 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md tracking-wide">{state.abbreviation}</span>
                  <img
                    src={flagUrl}
                    alt={`${state.name} state flag`}
                    className="h-6 w-auto shadow-sm border border-slate-200/60"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <h1 className={`${stateNameSizeClass} font-bold text-slate-900`}>{state.name}</h1>
                  {!isSeparating && (
                    <Badge className={`${taxBadge.color} flex items-center gap-1`}>
                      <TaxIcon className="w-3 h-3" />
                      {taxBadge.text}
                    </Badge>
                  )}
                  {annualSavings !== null && annualSavings > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Save ${annualSavings.toLocaleString()}/yr tax vs {originState!.abbreviation}
                    </Badge>
                  )}
                  {annualSavings !== null && annualSavings < 0 && (
                    <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                      +${Math.abs(annualSavings).toLocaleString()}/yr more tax than {originState!.abbreviation}
                    </Badge>
                  )}
                  {colDiffPct !== null && colDiffPct !== 0 && (
                    <Badge className={colDiffPct > 0
                      ? 'bg-blue-100 text-blue-700 flex items-center gap-1'
                      : 'bg-slate-100 text-slate-500 flex items-center gap-1'
                    }>
                      {colDiffPct > 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                      COL {Math.abs(colDiffPct)}% {colDiffPct > 0 ? 'lower' : 'higher'} than {originState!.abbreviation}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-3">
                  <p className="text-sm text-slate-400">{isSeparating ? 'Transitioning service member' : 'Military retirement profile'} · {DATA_YEAR} data</p>
                  {stateVeteranUrls[state.id] && (
                    <a href={stateVeteranUrls[state.id]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      <ExternalLink className="w-3 h-3" />
                      {state.name} Veteran Services
                    </a>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    {state.stateIncomeTax === 0
                      ? <span className="text-green-600 font-medium">No income tax</span>
                      : <span title={`${state.stateIncomeTax}% top marginal rate`}>
                          ~{getEffectiveTaxRate(retirementIncome || 60_000, state.id).toFixed(1)}% eff. rate
                        </span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>COL {state.costOfLivingIndex}</span>
                    <span className="text-slate-400 text-xs hidden sm:inline">(US avg = 100)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{formatVeteranPop(state.veteranPopulation)} veterans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{vamcs.length} VAMC{vamcs.length !== 1 ? 's' : ''} · {clinics.length} clinic{clinics.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-center min-w-[90px]">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Score</div>
                <div className={`text-5xl font-bold leading-none tabular-nums ${getScoreColor(computedScore)}`}>{displayScore}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${scoreTier(computedScore).className}`}>
                  {scoreTier(computedScore).label}
                </span>
                <button
                  onClick={toggleFavorite}
                  className={`mt-3 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors w-full justify-center ${
                    isFavorite
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  {isFavorite ? 'In Comparison' : 'Compare'}
                </button>
                {favorites.length > 0 && (
                  <button onClick={() => setShowComparison(true)} className="mt-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-center">
                    View comparison ({favorites.length})
                  </button>
                )}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="border-t border-slate-100 pt-5">
              {disabilityRating === '100' && state.propertyTaxExemption100 !== 'None' && (
                <div className={`mx-2 sm:mx-4 mb-4 flex items-start gap-2.5 py-1.5 sm:px-3 sm:py-2 sm:rounded-md sm:border text-xs ${
                  state.propertyTaxExemption100 === 'Full'
                    ? 'sm:bg-green-50 sm:border-green-200 sm:text-green-800 text-green-900'
                    : 'sm:bg-yellow-50 sm:border-yellow-200 sm:text-yellow-800 text-yellow-900'
                }`}>
                  <div className={`w-1 self-stretch rounded-full flex-shrink-0 sm:hidden ${state.propertyTaxExemption100 === 'Full' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${state.propertyTaxExemption100 === 'Full' ? 'text-green-500' : 'text-yellow-500'}`} />
                  <span>
                    <strong>100% VA Disability:</strong>{' '}
                    {state.propertyTaxExemption100 === 'Full'
                      ? `${state.name} offers a full property tax exemption on your primary residence.`
                      : `${state.name} offers a partial property tax exemption for 100% disabled veterans.`}
                    {' '}<button
                      onClick={() => veteranPerksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-[inherit] text-[length:inherit] leading-[inherit] font-[inherit]"
                    >See Veteran Perks below.</button>
                  </span>
                </div>
              )}

              {/* Desktop gauges */}
              <div className="hidden md:grid grid-cols-3 divide-x divide-slate-100">
                {taxScoreComponents && (() => {
                  const pensionTax = Math.round(pensionTaxDollars(state));
                  const incomeTax  = Math.round(calculateProgressiveTax(retirementIncome, stateTaxBrackets[state.id] ?? []));
                  const effRate    = getEffectiveTaxRate(retirementIncome || 60_000, state.id);
                  return (
                    <ScoreGauge
                      score={taxScoreComponents.total}
                      label="Tax Friendliness"
                      subItems={[
                        ...(!isSeparating ? [{ label: 'Pension tax/yr', value: pensionTax === 0 ? '$0 — exempt' : `$${pensionTax.toLocaleString()}/yr` }] : []),
                        { label: 'Income tax rate', value: state.stateIncomeTax === 0 ? 'None' : `~${effRate.toFixed(1)}% eff. (${state.stateIncomeTax}% top)` },
                        { label: 'Property tax', value: state.propertyTaxLevel, badge: disabilityRating === '100' ? state.propertyTaxExemption100 === 'Full' ? { text: 'Exempt at 100%', color: 'text-green-700 bg-green-50 border-green-200' } : state.propertyTaxExemption100 === 'Partial' ? { text: 'Partial Exemption', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' } : null : null },
                        { label: 'Sales tax', value: state.salesTax === 0 ? 'None' : `${state.salesTax}%` },
                      ]}
                    />
                  );
                })()}
                <ScoreGauge
                  score={costScore}
                  label="Cost of Living"
                  subItems={[
                    { label: 'COL index', value: `${state.costOfLivingIndex} (avg = 100)` },
                    { label: 'vs national avg', value: state.costOfLivingIndex <= 100 ? `${100 - state.costOfLivingIndex}% below avg` : `${state.costOfLivingIndex - 100}% above avg` },
                    { label: 'Avg home price', value: `$${(state.avgHomeCost / 1000).toFixed(0)}k` },
                    { label: 'Median rent/mo', value: housing ? `$${housing.medianRent.toLocaleString()}` : '—' },
                  ]}
                />
                {(() => {
                  const perks = stateVeteranPerks[state.id];
                  const eduCount = perks ? perks.educationBenefits.retiree.length + perks.educationBenefits.family.length : 0;
                  const regCount = perks ? perks.vehicleRegistrationBenefits.length : 0;
                  return (
                    <ScoreGauge
                      score={computeVeteranBenefitsScore(state, perCapita)}
                      label="Veteran Benefits"
                      subItems={[
                        { label: 'VA facilities', value: `${vamcs.length} VAMC · ${clinics.length} clinic` },
                        { label: 'Veterans in state', value: formatVeteranPop(state.veteranPopulation) },
                        { label: 'Education programs', value: eduCount > 0 ? `${eduCount} programs` : 'None listed' },
                        { label: 'Reg. & license perks', value: regCount > 0 ? `${regCount} benefits` : 'None listed' },
                      ]}
                    />
                  );
                })()}
              </div>

              {/* Mobile stacked rows */}
              {taxScoreComponents && (() => {
                const pensionTax = Math.round(pensionTaxDollars(state));
                const mobileEffRate = getEffectiveTaxRate(retirementIncome || 60_000, state.id);
                const perks = stateVeteranPerks[state.id];
                const eduCount = perks ? perks.educationBenefits.retiree.length + perks.educationBenefits.family.length : 0;
                const regCount = perks ? perks.vehicleRegistrationBenefits.length : 0;
                const sections = [
                  {
                    label: 'Tax Friendliness',
                    score: taxScoreComponents.total,
                    items: [
                      ...(!isSeparating ? [{ label: 'Pension tax', value: pensionTax === 0 ? '$0 — exempt' : `$${pensionTax.toLocaleString()}/yr` }] : []),
                      { label: 'Income tax rate', value: state.stateIncomeTax === 0 ? 'None' : `~${mobileEffRate.toFixed(1)}% eff.` },
                      { label: 'Property tax', value: state.propertyTaxLevel, badge: disabilityRating === '100' ? state.propertyTaxExemption100 === 'Full' ? { text: 'Exempt at 100%', color: 'text-green-700 bg-green-50 border-green-200' } : state.propertyTaxExemption100 === 'Partial' ? { text: 'Partial Exemption', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' } : null : null },
                      { label: 'Sales tax', value: state.salesTax === 0 ? 'None' : `${state.salesTax}%` },
                    ],
                  },
                  {
                    label: 'Cost of Living',
                    score: costScore,
                    items: [
                      { label: 'COL index', value: `${state.costOfLivingIndex} (avg = 100)` },
                      { label: 'vs avg', value: state.costOfLivingIndex <= 100 ? `${100 - state.costOfLivingIndex}% below` : `${state.costOfLivingIndex - 100}% above` },
                      { label: 'Avg home', value: `$${(state.avgHomeCost / 1000).toFixed(0)}k` },
                      { label: 'Median rent', value: housing ? `$${housing.medianRent.toLocaleString()}/mo` : '—' },
                    ],
                  },
                  {
                    label: 'Veteran Benefits',
                    score: computeVeteranBenefitsScore(state, perCapita),
                    items: [
                      { label: 'VA facilities', value: `${vamcs.length} VAMC · ${clinics.length} clinic` },
                      { label: 'Veterans', value: formatVeteranPop(state.veteranPopulation) },
                      { label: 'Education', value: eduCount > 0 ? `${eduCount} programs` : 'None' },
                      { label: 'Reg. perks', value: regCount > 0 ? `${regCount} benefits` : 'None' },
                    ],
                  },
                ];
                const scoreColor = (s: number) =>
                  s >= 85 ? '#16a34a' : s >= 75 ? '#2563eb' : s >= 65 ? '#d97706' : '#94a3b8';
                return (
                  <div className="md:hidden space-y-3">
                    {sections.map((sec) => (
                      <div key={sec.label} className="py-3 border-t border-slate-100 first:border-t-0">
                        <SectionMeter score={sec.score} color={scoreColor(sec.score)} />
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold tabular-nums leading-none" style={{ color: scoreColor(sec.score) }}>{sec.score}</span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-wide">/100</span>
                          <span className="text-xs font-semibold text-slate-700 ml-1">{sec.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {sec.items.map((it) => (
                            <div key={it.label} className="flex justify-between items-baseline text-xs gap-1 min-w-0">
                              <span className="text-slate-400 shrink-0">{it.label}</span>
                              <span className="font-semibold text-slate-700 text-right">{it.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="px-4 pt-3 pb-1 mt-1 border-t border-slate-100">
                <div className="flex items-start gap-1.5 text-xs text-slate-400">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    VA Benefits score is currently using{' '}
                    {perCapita
                      ? <span className="text-slate-500 font-medium">facilities per 100k veterans</span>
                      : <span className="text-slate-500 font-medium">raw facility counts</span>
                    }.{' '}
                    Toggle this in Dashboard filters.{' '}
                    <button
                      onClick={() => navigate('/sources?tab=scoring')}
                      className="underline underline-offset-2 hover:text-slate-600 transition-colors text-[length:inherit] leading-[inherit] font-[inherit]"
                    >
                      See full methodology →
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Button
              variant="outline"
              onClick={() => nextId && navTo(nextId)}
              disabled={!nextId}
              className="h-full min-h-[56px] px-3 rounded-xl border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 flex flex-col items-center gap-0.5 w-[64px]"
            >
              <ChevronRight className="w-4 h-4" />
              {nextState && (
                <>
                  <span className="text-[10px] font-bold leading-none tracking-wide">{nextState.abbreviation}</span>
                  <span className={`text-xs font-bold leading-none ${getScoreColor(nextScore)}`}>{nextScore}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile floating prev/next nav */}
        <div className="md:hidden">
          {prevId && prevState && (
            <button onClick={() => navTo(prevId)} className="fixed bottom-6 left-4 z-50 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[10px] font-bold leading-none">{prevState.abbreviation}</span>
              <span className={`text-[10px] font-bold leading-none ${getScoreColor(prevScore)}`}>{prevScore}</span>
            </button>
          )}
          {nextId && nextState && (
            <button onClick={() => navTo(nextId)} className="fixed bottom-6 right-4 z-50 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform">
              <ChevronRight className="w-5 h-5" />
              <span className="text-[10px] font-bold leading-none">{nextState.abbreviation}</span>
              <span className={`text-[10px] font-bold leading-none ${getScoreColor(nextScore)}`}>{nextScore}</span>
            </button>
          )}
        </div>

        <FacilitiesSection
          state={state}
          vamcs={vamcs}
          clinics={clinics}
          stateInstallations={stateInstallations}
          allFacilitiesCount={allFacilities.length}
          resourceTab={resourceTab}
          showInstallations={showInstallations}
          hoveredFacilityName={hoveredFacilityName}
          hoveredInstallationId={hoveredInstallationId}
          facilityPanelHeight={facilityPanelHeight}
          directoryHeight={directoryHeight}
          onResourceTabChange={handleResourceTabChange}
          onHoverFacility={setHoveredFacilityName}
          onHoverInstallation={setHoveredInstallationId}
        />

        <div className="space-y-6">
          {financialBreakdown?.hasFinancialData && (
            <FinancialSection
              state={state}
              originState={originState}
              frInputs={frInputs}
              financialBreakdown={financialBreakdown}
              originBreakdown={originBreakdown}
              budgetProfile={budgetProfile}
              frShowYearly={frShowYearly}
              isSeparating={isSeparating}
              hasCustomizations={hasCustomizations}
              onFrShowYearlyChange={setFrShowYearly}
              onProfileChange={handleProfileChange}
              onOpenBudgetPanel={() => setShowBudgetPanel(true)}
            />
          )}

          <SummaryCard state={state} computedScore={computedScore} />

          <MilitaryBenefitsSection state={state} />

          <HousingSection state={state} housing={housing} employment={employment} />

          {stateVeteranPerks[state.id] && (
            <VeteranPerksSection
              state={state}
              perks={stateVeteranPerks[state.id]}
              scrollRef={veteranPerksRef}
            />
          )}

          {activeClimate && climate && (
            <ClimateSection
              climate={climate}
              activeClimate={activeClimate}
              selectedRegionIdx={selectedRegionIdx}
              onRegionChange={setSelectedRegionIdx}
            />
          )}
        </div>
      </div>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>Data last updated: {LAST_UPDATED}</p>
            <p className="mt-1">Always verify current tax laws and benefits with official state resources and your tax advisor.</p>
          </div>
        </div>
      </footer>

      <ComparisonDrawer
        states={statesData.filter((s) => favorites.includes(s.id))}
        open={showComparison}
        onClose={() => setShowComparison(false)}
        onRemove={removeFavorite}
        onAdd={addFavorite}
        availableStates={statesData}
      />

      <AnimatePresence>
        {showBudgetPanel && (
          <BudgetCustomizerPanel
            open={showBudgetPanel}
            onClose={() => setShowBudgetPanel(false)}
            profile={budgetProfile}
            onChange={handleProfileChange}
            stateAvgs={stateFinancialData[state.id] ?? null}
            stateAvgHomeCost={state.avgHomeCost}
            financialInputs={frInputs}
            onChangeInputs={handleChangeInputs}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
