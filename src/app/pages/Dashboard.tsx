import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { statesData, calculateCustomScore } from '../data/stateData';
import { stateEmploymentData } from '../data/employmentData';
import { FinancialInputs, UserCostProfile, DEFAULT_USER_COST_PROFILE, fmt$ } from '../data/financialReality';
import { stateFinancialData } from '../data/financialData';
import FinancialRealityBanner from '../components/FinancialRealityBanner';
import BudgetCustomizerPanel from '../components/BudgetCustomizerPanel';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sheet, SheetContent } from '../components/ui/sheet';
import { Badge } from '../components/ui/badge';
import {
  Table as TableIcon,
  LayoutGrid,
  Map,
  Scale,
  Filter,
  ArrowLeft,
  Search,
  X,
  Globe,
  MousePointer2,
  ChevronDown,
  Info,
} from 'lucide-react';
import IconReadOutlined from '../components/ui/IconReadOutlined';

const DISABILITY_RATINGS = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
import { toast } from 'sonner';
import FilterPanel from '../components/FilterPanel';
import StateCard from '../components/StateCard';
import StateTable from '../components/StateTable';
import MapView from '../components/MapView';
import ComparisonDrawer from '../components/ComparisonDrawer';


export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read inputs passed from Landing page; fall back to sensible defaults
  const locationState = location.state as {
    retirementIncome?: number;
    disabilityRating?: string;
    currentStateId?: string;
    familyMembers?: Array<{ id: string; role: string; ageGroup: import('../data/financialReality').AgeGroup }>;
    secondaryIncome?: import('../data/financialReality').SecondaryIncomeSource[];
    hasSpouse?: boolean;
    dependentChildren?: number;
  } | null;
  // Derive dependent counts from saved budget members when no router state is present
  const _savedBudgetMembers: Array<{ ageGroup: import('../data/financialReality').AgeGroup }> = (() => {
    try {
      const p = JSON.parse(localStorage.getItem('budget-profile') ?? 'null');
      return p?.householdMembers ?? [];
    } catch { return []; }
  })();
  const _initHasSpouse = locationState?.hasSpouse
    ?? (_savedBudgetMembers.length > 0
      ? _savedBudgetMembers.some(m => m.ageGroup === 'adult' || m.ageGroup === 'senior')
      : localStorage.getItem('origin-has-spouse') === 'true');
  const _initDependentChildren = locationState?.dependentChildren
    ?? (_savedBudgetMembers.length > 0
      ? _savedBudgetMembers.filter(m => ['under6', '6to12', '13to18'].includes(m.ageGroup)).length
      : parseInt(localStorage.getItem('origin-dependent-children') ?? '0', 10));

  const [financialInputs, setFinancialInputs] = useState<FinancialInputs>({
    retirementIncome: locationState?.retirementIncome ?? 60000,
    disabilityRating: locationState?.disabilityRating
      ?? localStorage.getItem('origin-disability-rating')
      ?? 'none',
    secondaryIncome: locationState?.secondaryIncome ?? (() => {
      try {
        const stored = localStorage.getItem('origin-secondary-income');
        return stored ? JSON.parse(stored) : [];
      } catch { return []; }
    })(),
    hasSpouse: _initHasSpouse,
    dependentChildren: _initDependentChildren,
  });

  const handleChangeInputs = (updated: FinancialInputs) => {
    setFinancialInputs(updated);
    localStorage.setItem('origin-retirement-income', String(updated.retirementIncome));
    localStorage.setItem('origin-disability-rating', updated.disabilityRating || 'none');
    localStorage.setItem('origin-secondary-income', JSON.stringify(updated.secondaryIncome ?? []));
  };

  // currentStateId: prefer router state from landing, fall back to localStorage (survives refresh)
  const currentStateId: string | null = (() => {
    const fromNav = locationState?.currentStateId;
    if (fromNav && fromNav !== 'none' && fromNav !== '') return fromNav;
    return localStorage.getItem('origin-state-id') ?? null;
  })();
  const originStateName = currentStateId ? statesData.find((s) => s.id === currentStateId)?.name ?? null : null;
  const landingFamilyMembers = locationState?.familyMembers ?? (() => {
    try {
      const stored = localStorage.getItem('origin-family-members');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  })();

  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [headerEditingIncome, setHeaderEditingIncome] = useState(false);
  const [headerIncomeValue, setHeaderIncomeValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 160);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startHeaderEditIncome = () => {
    setHeaderIncomeValue(String(Math.round(financialInputs.retirementIncome / 12)));
    setHeaderEditingIncome(true);
  };

  const saveHeaderIncome = () => {
    const monthly = parseFloat(headerIncomeValue);
    if (!isNaN(monthly) && monthly > 0) {
      handleChangeInputs({ ...financialInputs, retirementIncome: Math.round(monthly) * 12 });
    }
    setHeaderEditingIncome(false);
  };

  const hasHeaderDisability =
    financialInputs.disabilityRating &&
    financialInputs.disabilityRating !== 'none' &&
    financialInputs.disabilityRating !== '';

  const [view, setView] = useState<'table' | 'cards' | 'map'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedScrollY = useRef(0);

  const handleViewChange = (newView: 'table' | 'cards' | 'map') => {
    savedScrollY.current = window.scrollY;
    setView(newView);
  };

  useEffect(() => {
    window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
  }, [view]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('comparison-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showMethodology, setShowMethodology] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [userCostProfile, setUserCostProfile] = useState<UserCostProfile>(() => {
    try {
      const saved = localStorage.getItem('budget-profile');
      const base: UserCostProfile = saved ? JSON.parse(saved) : DEFAULT_USER_COST_PROFILE;
      // Pre-populate household members from landing form (overrides saved whenever landing state was passed, including empty)
      if (locationState?.familyMembers !== undefined) {
        return {
          ...base,
          householdMembers: landingFamilyMembers.map((m) => ({ id: m.id, ageGroup: m.ageGroup })),
        };
      }
      return base;
    } catch {
      return DEFAULT_USER_COST_PROFILE;
    }
  });

  const handleProfileChange = (profile: UserCostProfile) => {
    setUserCostProfile(profile);
    // Sync VA disability dependent counts from household members.
    // adult/senior age groups are treated as a spouse (max 1); under-18 groups are children.
    const hasSpouse = profile.householdMembers.some(
      m => m.ageGroup === 'adult' || m.ageGroup === 'senior'
    );
    const dependentChildren = profile.householdMembers.filter(
      m => m.ageGroup === 'under6' || m.ageGroup === '6to12' || m.ageGroup === '13to18'
    ).length;
    setFinancialInputs(prev => ({ ...prev, hasSpouse, dependentChildren }));
    try {
      localStorage.setItem('budget-profile', JSON.stringify(profile));
      localStorage.setItem('origin-has-spouse', String(hasSpouse));
      localStorage.setItem('origin-dependent-children', String(dependentChildren));
    } catch { /* storage unavailable */ }
  };

  const [excludedStates, setExcludedStates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('excluded-states');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleExcludeState = (stateId: string) => {
    setExcludedStates((prev) => {
      const next = prev.includes(stateId) ? prev : [...prev, stateId];
      localStorage.setItem('excluded-states', JSON.stringify(next));
      return next;
    });
  };

  const handleIncludeState = (stateId: string) => {
    setExcludedStates((prev) => {
      const next = stateId === '__clear_all__' ? [] : prev.filter((id) => id !== stateId);
      if (next.length === 0) localStorage.removeItem('excluded-states');
      else localStorage.setItem('excluded-states', JSON.stringify(next));
      return next;
    });
  };

  const handleExcludeAll = () => {
    const all = statesData.map((s) => s.id);
    setExcludedStates(all);
    localStorage.setItem('excluded-states', JSON.stringify(all));
  };

  const [filters, setFilters] = useState({
    noIncomeTax: false,
    taxFreeMilitary: false,
    lowCostOfLiving: false,
    highVABenefits: false,
    partialTaxMilitary: false,
    lowPropertyTax: false,
    lowSalesTax: false,
    strongJobMarket: false,
  });

  const [weights, setWeights] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboard-weights');
      if (saved) return JSON.parse(saved) as { taxes: number; cost: number; benefits: number };
    } catch { /* ignore */ }
    return { taxes: 2, cost: 2, benefits: 2 };
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleWeightChange = (key: string, value: number) => {
    setWeights((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem('dashboard-weights', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const handleReset = () => {
    setFilters({
      noIncomeTax: false,
      taxFreeMilitary: false,
      lowCostOfLiving: false,
      highVABenefits: false,
      partialTaxMilitary: false,
      lowPropertyTax: false,
      lowSalesTax: false,
      strongJobMarket: false,
    });
    setWeights({ taxes: 2, cost: 2, benefits: 2 });
    setExcludedStates([]);
    localStorage.removeItem('excluded-states');
    localStorage.removeItem('dashboard-weights');
  };

  const toggleFavorite = (stateId: string) => {
    setFavorites((prev) => {
      if (prev.includes(stateId)) {
        const next = prev.filter((id) => id !== stateId);
        localStorage.setItem('comparison-favorites', JSON.stringify(next));
        return next;
      }
      if (prev.length >= 3) {
        toast.warning('Comparison limit reached', {
          description: 'Remove a bookmarked state before adding another.',
        });
        return prev;
      }
      const next = [...prev, stateId];
      localStorage.setItem('comparison-favorites', JSON.stringify(next));
      return next;
    });
  };

  const removeFavorite = (stateId: string) => {
    setFavorites((prev) => {
      const next = prev.filter((id) => id !== stateId);
      localStorage.setItem('comparison-favorites', JSON.stringify(next));
      return next;
    });
  };

  const searchTerms = useMemo(() => {
    return searchQuery
      .split(/[\s,]+/)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
  }, [searchQuery]);

  const filteredStates = useMemo(() => {
    return statesData.filter((state) => {
      if (excludedStates.includes(state.id)) return false;
      // OR logic — state must match at least one checked preference
      const activePrefs = [
        filters.noIncomeTax && state.stateIncomeTax === 0,
        filters.taxFreeMilitary && state.militaryPensionTax === 'No',
        filters.partialTaxMilitary && state.militaryPensionTax === 'Partial',
        filters.lowCostOfLiving && state.costOfLivingIndex < 95,
        filters.highVABenefits && state.veteranBenefitsScore > 85,
        filters.lowPropertyTax && state.propertyTaxLevel === 'Low',
        filters.lowSalesTax && state.salesTax < 4,
        filters.strongJobMarket && (stateEmploymentData[state.id]?.unemploymentRate ?? 99) < 4.0,
      ];
      const anyChecked = filters.noIncomeTax || filters.taxFreeMilitary || filters.partialTaxMilitary || filters.lowCostOfLiving || filters.highVABenefits || filters.lowPropertyTax || filters.lowSalesTax || filters.strongJobMarket;
      if (anyChecked && !activePrefs.some(Boolean)) return false;
      if (searchTerms.length > 0) {
        const name = state.name.toLowerCase();
        const abbr = state.abbreviation.toLowerCase();
        return searchTerms.some((term) => name.includes(term) || abbr === term);
      }
      return true;
    });
  }, [filters, searchTerms, excludedStates]);

  // Auto-remove comparison favorites when a state is filtered out of view
  useEffect(() => {
    const filteredIds = new Set(filteredStates.map((s) => s.id));
    setFavorites((prev) => {
      const next = prev.filter((id) => filteredIds.has(id));
      if (next.length === prev.length) return prev;
      localStorage.setItem('comparison-favorites', JSON.stringify(next));
      return next;
    });
  }, [filteredStates]);

  const customScores = useMemo(() => {
    const scores: Record<string, number> = {};
    filteredStates.forEach((state) => {
      scores[state.id] = calculateCustomScore(state, weights);
    });
    return scores;
  }, [filteredStates, weights]);

  const sortedStates = useMemo(() => {
    return [...filteredStates].sort((a, b) => {
      const scoreA = customScores[a.id];
      const scoreB = customScores[b.id];
      return scoreB - scoreA;
    });
  }, [filteredStates, customScores]);

  const favoriteStates = useMemo(() => {
    return favorites.map((id) => statesData.find((s) => s.id === id)!).filter(Boolean);
  }, [favorites]);

  const topStateAvg = sortedStates.length > 0
    ? stateFinancialData[sortedStates[0].id] ?? null
    : null;

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const hasCustomWeights = weights.taxes !== 2 || weights.cost !== 2 || weights.benefits !== 2;
  const customWeightsCount = (weights.taxes !== 2 ? 1 : 0) + (weights.cost !== 2 ? 1 : 0) + (weights.benefits !== 2 ? 1 : 0);
  const totalActiveCount = activeFiltersCount + excludedStates.length + customWeightsCount;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                <h1 className="font-semibold text-lg">
                  <span className="hidden sm:inline">State Comparison Results</span>
                  <span className="sm:hidden">Results</span>
                </h1>
                {originStateName && (
                  <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                    COL &amp; Taxes vs {originStateName}
                  </span>
                )}
              </div>
              <AnimatePresence>
                {headerScrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="hidden lg:flex items-center gap-2 pl-4 ml-1 border-l border-slate-200 text-sm"
                  >
                    {headerEditingIncome ? (
                      <span className="inline-flex items-baseline gap-px">
                        <span className="text-sm font-semibold text-slate-900">$</span>
                        <input
                          autoFocus
                          type="number"
                          min={500}
                          max={20000}
                          step={100}
                          value={headerIncomeValue}
                          onChange={(e) => setHeaderIncomeValue(e.target.value)}
                          onBlur={saveHeaderIncome}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveHeaderIncome();
                            if (e.key === 'Escape') setHeaderEditingIncome(false);
                          }}
                          className="w-20 text-sm font-semibold text-slate-900 border-b-2 border-blue-500 bg-transparent focus:outline-none tabular-nums"
                        />
                        <span className="text-sm font-semibold text-slate-900">/mo pension</span>
                      </span>
                    ) : (
                      <button
                        onClick={startHeaderEditIncome}
                        className="text-sm font-semibold text-slate-900 hover:text-blue-600 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                      >
                        {fmt$(financialInputs.retirementIncome / 12)}/mo pension
                      </button>
                    )}
                    {hasHeaderDisability && (
                      <>
                        <span className="text-sm text-slate-400">+</span>
                        <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">VA disability ({<select
                          value={financialInputs.disabilityRating}
                          onChange={(e) => handleChangeInputs({ ...financialInputs, disabilityRating: e.target.value || 'none' })}
                          className="text-sm font-semibold text-slate-900 bg-transparent border-b border-dotted border-slate-400 hover:border-blue-400 focus:border-blue-500 focus:outline-none cursor-pointer appearance-none"
                          style={{ width: `${financialInputs.disabilityRating?.length ?? 2}ch`, padding: 0 }}
                        >{DISABILITY_RATINGS.map((r) => <option key={r} value={r}>{r}</option>)}</select>}%)
                        </span>
                      </>
                    )}
                    {!hasHeaderDisability && (
                      <button
                        onClick={() => handleChangeInputs({ ...financialInputs, disabilityRating: '50' })}
                        className="text-sm text-blue-500 hover:text-blue-700 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                      >
                        + Add VA disability
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/sources')} className="gap-2">
                <IconReadOutlined className="w-4 h-4" />
                <span className="hidden sm:inline">Sources</span>
              </Button>
              {favorites.length > 0 && (
                <Button variant="outline" onClick={() => setShowComparison(true)} className="gap-2">
                  <Scale className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">Compare</span>
                  <Badge variant="secondary">{favorites.length}</Badge>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setSidebarOpen((v) => !v);
                  } else {
                    setShowFilters(true);
                  }
                }}
                className={`gap-2 ${sidebarOpen ? 'bg-slate-100 border-slate-400 text-slate-900' : ''}`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {(totalActiveCount > 0 || hasCustomWeights) && (
                  <Badge variant="secondary">{totalActiveCount}</Badge>
                )}
              </Button>
            </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Financial Reality Banner */}
            <FinancialRealityBanner
              states={sortedStates}
              inputs={financialInputs}
              profile={userCostProfile}
              stateAvg={topStateAvg}
              onCustomize={() => setShowBudgetPanel(true)}
              onChangeInputs={handleChangeInputs}
            />

            {/* Results Summary */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    {filteredStates.length} {filteredStates.length === 1 ? 'State' : 'States'} Found
                  </h2>
                  <p className="text-slate-600">
                    {activeFiltersCount > 0 || hasCustomWeights
                      ? 'Filtered and ranked based on your preferences'
                      : 'Showing all states ranked by retirement friendliness'}
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                  <AnimatePresence mode="wait">
                    {isSearching ? (
                      <motion.span
                        key="spinner"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ rotate: { duration: 0.6, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.15 } }}
                        className="block w-4 h-4 rounded-full border-2 border-slate-200 border-t-blue-500"
                      />
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="block"
                      >
                        <Search className="w-4 h-4 text-slate-400" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearching(true);
                    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
                    searchTimerRef.current = setTimeout(() => setIsSearching(false), 600);
                  }}
                  placeholder="Search states by name or abbreviation — separate multiple with spaces or commas"
                  className="pl-9 pr-9 h-10 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Toggle + Score Methodology button */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex bg-slate-100 rounded-lg p-1 max-w-xs w-full">
                  {(
                    [
                      { value: 'cards', icon: <LayoutGrid className="w-4 h-4" />, label: 'Cards' },
                      { value: 'table', icon: <TableIcon className="w-4 h-4" />, label: 'Table' },
                      { value: 'map',   icon: <Map className="w-4 h-4" />,       label: 'Map'   },
                    ] as const
                  ).map(({ value, icon, label }) => (
                    <button
                      key={value}
                      onClick={() => handleViewChange(value)}
                      className={`relative flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors z-10 ${
                        view === value ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {view === value && (
                        <motion.div
                          layoutId="view-tab-pill"
                          className="absolute inset-0 bg-white rounded-md shadow-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {icon}
                        <span className="hidden sm:inline">{label}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowMethodology((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">How scores are calculated</span>
                  <span className="sm:hidden">Scoring</span>
                  <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${showMethodology ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Inline Score Methodology Panel */}
              <AnimatePresence>
                {showMethodology && (
                  <motion.div
                    key="methodology"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mt-2 mb-1 space-y-4 text-sm text-slate-600"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.08, duration: 0.15 }}
                      className="text-slate-500"
                    >
                      Each state earns 0–100 across three components weighted by your priority settings.
                    </motion.p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          title: 'Tax Friendliness',
                          weight: weights.taxes,
                          content: (
                            <div className="space-y-1.5 text-slate-500">
                              <div className="flex justify-between"><span>Pension not taxed</span><span className="font-medium text-slate-700">+50 pts</span></div>
                              <div className="flex justify-between"><span>Pension partially exempt</span><span className="font-medium text-slate-700">+28 pts</span></div>
                              <div className="flex justify-between"><span>Income tax rate (0–13%)</span><span className="font-medium text-slate-700">up to +32</span></div>
                              <div className="flex justify-between"><span>Property tax (Low/Med/High)</span><span className="font-medium text-slate-700">+18/+10/0</span></div>
                            </div>
                          ),
                        },
                        {
                          title: 'Cost of Living',
                          weight: weights.cost,
                          content: <p className="text-slate-500 leading-relaxed">Scaled against national baseline. Score rises for states below average, drops sharply above it.</p>,
                        },
                        {
                          title: 'Veteran Benefits',
                          weight: weights.benefits,
                          content: <p className="text-slate-500 leading-relaxed">VA facility quality, veteran services, and veteran-focused programs rated 0–100.</p>,
                        },
                      ].map(({ title, weight, content }, i) => (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.06, duration: 0.18, ease: 'easeOut' }}
                          className="bg-white rounded-lg p-4 space-y-2 border border-slate-100"
                        >
                          <div className="font-semibold text-slate-800 flex items-center justify-between">
                            <span>{title}</span>
                            <span className="text-blue-600 font-bold text-xs px-2 py-0.5 bg-blue-50 rounded-md">{({ 1: 'Low', 2: 'Medium', 3: 'High' } as Record<number, string>)[weight] ?? 'Medium'}</span>
                          </div>
                          {content}
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, duration: 0.18, ease: 'easeOut' }}
                      className="rounded-lg border border-slate-200 overflow-hidden bg-white"
                    >
                      <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Score Tiers</div>
                      <div className="grid grid-cols-4 divide-x divide-slate-100">
                        {[
                          { label: 'Elite',    range: '95–100',   cls: 'bg-emerald-100 text-emerald-700' },
                          { label: 'Strong',   range: '85–94',    cls: 'bg-blue-100 text-blue-700' },
                          { label: 'Moderate', range: '70–84',    cls: 'bg-yellow-100 text-yellow-700' },
                          { label: 'Weak',     range: 'Below 70', cls: 'bg-slate-100 text-slate-500' },
                        ].map(({ label, range, cls }) => (
                          <div key={label} className="flex flex-col items-center gap-1.5 px-3 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>{label}</span>
                            <span className="text-sm text-slate-500">{range}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card view hint */}
            {view === 'cards' && (
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                <MousePointer2 className="w-3.5 h-3.5" style={{ transform: 'scaleX(-1)' }} />
                Click any card for detailed state information, tax breakdowns, VA facilities, and more
              </p>
            )}

            {/* Views */}
            <AnimatePresence mode="wait">
              {view === 'cards' && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedStates.map((state) => (
                      <StateCard
                        key={state.id}
                        state={state}
                        customScore={customScores[state.id]}
                        isFavorite={favorites.includes(state.id)}
                        onToggleFavorite={toggleFavorite}
                        resultIds={sortedStates.map((s) => s.id)}
                        currentStateId={currentStateId ?? undefined}
                        retirementIncome={financialInputs.retirementIncome}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {view === 'table' && (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <StateTable
                    states={sortedStates}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    customScores={customScores}
                  />
                </motion.div>
              )}

              {view === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MapView states={sortedStates} customScores={customScores} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results */}
            {filteredStates.length === 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                <p className="text-slate-600 mb-4">
                  No states match your current filters. Try adjusting your criteria.
                </p>
                <Button onClick={handleReset}>Clear All Filters</Button>
              </div>
            )}
          </main>

          {/* Filters Sidebar - Desktop (right side) */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                key="filters-sidebar"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="hidden lg:block w-80 flex-shrink-0"
              >
                <div className="sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto">
                  <FilterPanel
                    filters={filters}
                    weights={weights}
                    onFilterChange={handleFilterChange}
                    onWeightChange={handleWeightChange}
                    onReset={handleReset}
                    onClose={() => setSidebarOpen(false)}
                    excludedStates={excludedStates}
                    onExcludeState={handleExcludeState}
                    onIncludeState={handleIncludeState}
                    onExcludeAll={handleExcludeAll}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <FilterPanel
            filters={filters}
            weights={weights}
            onFilterChange={handleFilterChange}
            onWeightChange={handleWeightChange}
            onReset={handleReset}
            excludedStates={excludedStates}
            onExcludeState={handleExcludeState}
            onIncludeState={handleIncludeState}
          />
        </SheetContent>
      </Sheet>

      {/* Comparison Drawer */}
      <ComparisonDrawer
        states={favoriteStates}
        open={showComparison}
        onClose={() => setShowComparison(false)}
        onRemove={removeFavorite}
        onAdd={toggleFavorite}
        availableStates={sortedStates}
        customScores={customScores}
      />

      {/* Budget Customizer Panel */}
      <AnimatePresence>
        {showBudgetPanel && (
          <BudgetCustomizerPanel
            open={showBudgetPanel}
            onClose={() => setShowBudgetPanel(false)}
            profile={userCostProfile}
            onChange={handleProfileChange}
            stateAvgs={topStateAvg}
            financialInputs={financialInputs}
            onChangeInputs={handleChangeInputs}
          />
        )}
      </AnimatePresence>

      {/* Last Updated Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>Data last updated: March 2026</p>
            <p className="mt-1">
              Information compiled from state tax departments, VA facilities, and cost of living
              indices.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
