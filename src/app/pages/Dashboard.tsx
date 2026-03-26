import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { statesData, calculateCustomScore } from '../data/stateData';
import { FinancialInputs } from '../data/financialReality';
import FinancialRealityBanner from '../components/FinancialRealityBanner';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Sheet, SheetContent } from '../components/ui/sheet';
import { Badge } from '../components/ui/badge';
import {
  Shield,
  Table as TableIcon,
  LayoutGrid,
  Map,
  Scale,
  Filter,
  ArrowLeft,
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

  const [filters, setFilters] = useState({
    noIncomeTax: false,
    taxFreeMilitary: false,
    lowCostOfLiving: false,
    highVABenefits: false,
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
    });
    setWeights({
      taxes: 40,
      cost: 30,
      benefits: 30,
    });
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

  const filteredStates = useMemo(() => {
    return statesData.filter((state) => {
      if (filters.noIncomeTax && state.stateIncomeTax > 0) return false;
      if (filters.taxFreeMilitary && state.militaryPensionTax !== 'No') return false;
      if (filters.lowCostOfLiving && state.costOfLivingIndex >= 95) return false;
      if (filters.highVABenefits && state.veteranBenefitsScore <= 85) return false;
      return true;
    });
  }, [filters]);

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

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const hasCustomWeights = weights.taxes !== 40 || weights.cost !== 30 || weights.benefits !== 30;

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
                <Shield className="w-6 h-6 text-blue-600" />
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
                {(activeFiltersCount > 0 || hasCustomWeights) && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          {sidebarOpen && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  weights={weights}
                  onFilterChange={handleFilterChange}
                  onWeightChange={handleWeightChange}
                  onReset={handleReset}
                  onClose={() => setSidebarOpen(false)}
                />

                {/* Active Filters Summary */}
                {(activeFiltersCount > 0 || hasCustomWeights) && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        Custom Settings Active
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="h-6 text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                    {hasCustomWeights && (
                      <p className="text-xs text-blue-700">Custom priority weights applied</p>
                    )}
                    {activeFiltersCount > 0 && (
                      <p className="text-xs text-blue-700">{activeFiltersCount} filter(s) active</p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Financial Reality Banner */}
            <FinancialRealityBanner states={sortedStates} inputs={financialInputs} />

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

              {/* View Toggle */}
              <Tabs value={view} onValueChange={(v) => setView(v as 'table' | 'cards' | 'map')}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="cards" className="gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Cards</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="gap-2">
                    <TableIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Table</span>
                  </TabsTrigger>
                  <TabsTrigger value="map" className="gap-2">
                    <Map className="w-4 h-4" />
                    <span className="hidden sm:inline">Map</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Views */}
            {view === 'cards' && (
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
            )}

            {view === 'table' && (
              <StateTable
                states={sortedStates}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                customScores={customScores}
              />
            )}

            {view === 'map' && <MapView states={sortedStates} customScores={customScores} />}

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
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <FilterPanel
            filters={filters}
            weights={weights}
            onFilterChange={handleFilterChange}
            onWeightChange={handleWeightChange}
            onReset={handleReset}
            onClose={() => setShowFilters(false)}
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
