import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { statesData, calculateCustomScore } from '../data/stateData';
import { FinancialInputs, UserCostProfile, DEFAULT_USER_COST_PROFILE } from '../data/financialReality';
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
} from 'lucide-react';
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
    preferredRegion?: string;
  } | null;
  const financialInputs: FinancialInputs = {
    retirementIncome: locationState?.retirementIncome ?? 60000,
    disabilityRating: locationState?.disabilityRating ?? 'none',
  };

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
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [userCostProfile, setUserCostProfile] = useState<UserCostProfile>(() => {
    try {
      const saved = localStorage.getItem('budget-profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_COST_PROFILE;
    } catch {
      return DEFAULT_USER_COST_PROFILE;
    }
  });

  const handleProfileChange = (profile: UserCostProfile) => {
    setUserCostProfile(profile);
    try {
      localStorage.setItem('budget-profile', JSON.stringify(profile));
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
      const next = prev.filter((id) => id !== stateId);
      localStorage.setItem('excluded-states', JSON.stringify(next));
      return next;
    });
  };

  const [filters, setFilters] = useState({
    noIncomeTax: false,
    taxFreeMilitary: false,
    lowCostOfLiving: false,
    highVABenefits: false,
    partialTaxMilitary: false,
  });

  const [weights, setWeights] = useState({
    taxes: 40,
    cost: 30,
    benefits: 30,
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleWeightChange = (key: string, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      noIncomeTax: false,
      taxFreeMilitary: false,
      lowCostOfLiving: false,
      highVABenefits: false,
      partialTaxMilitary: false,
    });
    setWeights({
      taxes: 40,
      cost: 30,
      benefits: 30,
    });
    setExcludedStates([]);
    localStorage.removeItem('excluded-states');
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
      ];
      const anyChecked = filters.noIncomeTax || filters.taxFreeMilitary || filters.partialTaxMilitary || filters.lowCostOfLiving || filters.highVABenefits;
      if (anyChecked && !activePrefs.some(Boolean)) return false;
      if (searchTerms.length > 0) {
        const name = state.name.toLowerCase();
        const abbr = state.abbreviation.toLowerCase();
        return searchTerms.some((term) => name.includes(term) || abbr === term);
      }
      return true;
    });
  }, [filters, searchTerms, excludedStates]);

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
  const hasCustomWeights = weights.taxes !== 40 || weights.cost !== 30 || weights.benefits !== 30;
  const totalActiveCount = activeFiltersCount + excludedStates.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                <h1 className="font-semibold text-lg">State Comparison Results</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {(totalActiveCount > 0 || hasCustomWeights) && (
                  <Badge variant="secondary">{totalActiveCount}</Badge>
                )}
              </Button>
            </div>
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
                {sortedStates.length > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-slate-500 mb-1">Top Ranked</div>
                    <div className="text-2xl font-bold text-blue-600">{sortedStates[0].name}</div>
                  </div>
                )}
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

              {/* View Toggle */}
              <div className="flex bg-slate-100 rounded-lg p-1 max-w-xs">
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
                    className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md transition-colors z-10 ${
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
            </div>

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
                <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
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
                  />
                  {(totalActiveCount > 0 || hasCustomWeights) && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-900">Custom Settings Active</span>
                        <Button variant="ghost" size="sm" onClick={handleReset} className="h-6 text-xs">
                          Clear
                        </Button>
                      </div>
                      {hasCustomWeights && <p className="text-xs text-blue-700">Custom priority weights applied</p>}
                      {activeFiltersCount > 0 && <p className="text-xs text-blue-700">{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active</p>}
                      {excludedStates.length > 0 && <p className="text-xs text-blue-700">{excludedStates.length} state{excludedStates.length !== 1 ? 's' : ''} excluded</p>}
                    </div>
                  )}
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
            onClose={() => setShowFilters(false)}
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
