import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { statesData, DEFAULT_SCORE_WEIGHTS, scoreTier } from '../data/stateData';
import { calculateScore as calculateCustomScore, computeVeteranBenefitsScore } from '../data/veteranScore';
import type { StateData } from '../data/stateData';
import { stateHousingData, NATIONAL_HOUSING } from '../data/housingData';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
import { getSpaceATerminalsByProximity } from '../data/spaceATerminals';
import { militaryInstallations } from '../data/militaryInstallations';
import { stateEmploymentData, NATIONAL_EMPLOYMENT } from '../data/employmentData';
import { stateVeteranPerks } from '../data/veteranPerksData';
import { stateVeteranUrls } from '../data/stateVeteranUrls';
import { stateClimateData } from '../data/climateData';
import type { RiskLevel } from '../data/climateData';
import { DATA_YEAR, LAST_UPDATED } from '../data/siteConfig';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent } from '../components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Home,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Thermometer,
  Droplets,
  CloudRain,
  Flame,
  Wind,
  Snowflake,
  TriangleAlert,
  Waves,
  Mountain,
  GitCompare,
  Briefcase,
  Plane,
  ExternalLink,
  Download,
  Info,
} from 'lucide-react';
import IconReadOutlined from '../components/ui/IconReadOutlined';
import { toast } from 'sonner';
import StateShapeMap from '../components/StateShapeMap';
import ComparisonDrawer from '../components/ComparisonDrawer';
import { pdf } from '@react-pdf/renderer';
import { StatePdfDocument } from '../components/pdf/StatePdfDocument';
import { SiteLogo } from '../components/ui/SiteLogo';
import { getFlagUrl } from '../lib/flagUrl';

function ScoreGauge({
  score,
  label,
  subItems,
}: {
  score: number;
  label: string;
  subItems: { label: string; value: string; badge?: { text: string; color: string } | null }[];
}) {
  const cx = 60, cy = 56, r = 48, sw = 11;
  const arcLen = Math.PI * r;
  const fullPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Single RAF loop drives arc, dot, and counter from one animVal float —
  // guarantees all three are frame-perfectly in sync with no CSS transition lag.
  const [animVal, setAnimVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const to = score;
    let rafId: number;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / 700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      fromRef.current = current;
      setAnimVal(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  const fillColor =
    score >= 90 ? '#16a34a'
    : score >= 80 ? '#2563eb'
    : score >= 70 ? '#d97706'
    : '#94a3b8';

  // All three derived from the same animVal
  const dashoffset = arcLen * (1 - animVal / 100);
  const tipθ = ((180 - animVal * 1.8) * Math.PI) / 180;
  const tipX = cx + r * Math.cos(tipθ);
  const tipY = cy - r * Math.sin(tipθ);

  return (
    <div className="flex flex-col items-center px-4">
      <svg viewBox="0 0 120 68" className="w-full max-w-[180px]" aria-label={`${label}: ${score} out of 100`}>
        {/* Background track */}
        <path
          d={fullPath}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={fullPath}
          fill="none"
          stroke={fillColor}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={dashoffset}
        />
        {/* Tip dot — same animVal, same frame */}
        {animVal > 2 && (
          <circle
            cx={tipX.toFixed(2)}
            cy={tipY.toFixed(2)}
            r={3}
            fill="white"
          />
        )}
        {/* Score number */}
        <text x={cx} y={48} textAnchor="middle" fontSize="22" fontWeight="700" fill={fillColor}>
          {Math.round(animVal)}
        </text>
        <text x={cx} y={62} textAnchor="middle" fontSize="8.5" fill="#94a3b8">
          / 100
        </text>
      </svg>
      <p className="text-xs font-semibold text-slate-600 -mt-1 mb-2.5 text-center">{label}</p>
      <div className="w-full space-y-1.5">
        {subItems.map((it) => (
          <div key={it.label} className="flex justify-between items-center text-xs text-slate-400 gap-1">
            <span>{it.label}</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-600">{it.value}</span>
              {it.badge && (
                <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded-full leading-none ${it.badge.color}`}>
                  {it.badge.text}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StateDetail() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = statesData.find((s) => s.id === stateId);

  // Result list for prev/next browsing — passed via router state from Dashboard
  const locState = location.state as { resultIds?: string[]; currentStateId?: string; retirementIncome?: number } | null;
  const resultIds: string[] = locState?.resultIds ?? statesData.map((s) => s.id);
  const currentStateId: string | null = locState?.currentStateId ?? localStorage.getItem('origin-state-id');
  const retirementIncome: number = locState?.retirementIncome
    ?? (Number(localStorage.getItem('origin-retirement-income') || '0') || 60000);
  const userType = (localStorage.getItem('origin-user-type') ?? 'retiree') as 'retiree' | 'separating';
  const isSeparating = userType === 'separating';
  const disabilityRating = localStorage.getItem('origin-disability-rating') ?? '';
  const perCapita = localStorage.getItem('va-scoring-per-capita') === 'true';

  const currentIdx = resultIds.indexOf(stateId ?? '');
  const prevId = currentIdx > 0 ? resultIds[currentIdx - 1] : null;
  const nextId = currentIdx < resultIds.length - 1 ? resultIds[currentIdx + 1] : null;
  const navTo = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/state/${id}`, { state: { resultIds, currentStateId, retirementIncome } });
  };
  const navToKeepScroll = (id: string) => {
    sessionStorage.setItem('preserveScroll', '1');
    navigate(`/state/${id}`, { state: { resultIds, currentStateId, retirementIncome } });
  };

  // Tax savings vs current state
  const originState = currentStateId ? statesData.find((s) => s.id === currentStateId) ?? null : null;
  function pensionTaxDollars(s: StateData): number {
    if (s.militaryPensionTax === 'No') return 0;
    const taxable = s.militaryPensionTax === 'Partial' ? retirementIncome * 0.5 : retirementIncome;
    return taxable * (s.stateIncomeTax / 100);
  }
  const annualSavings = originState && state
    ? Math.round(pensionTaxDollars(originState) - pensionTaxDollars(state))
    : null;
  const colDiffPct = originState && state
    ? Math.round(((originState.costOfLivingIndex - state.costOfLivingIndex) / originState.costOfLivingIndex) * 100)
    : null;

  const prevState = prevId ? statesData.find((s) => s.id === prevId) ?? null : null;
  const nextState = nextId ? statesData.find((s) => s.id === nextId) ?? null : null;
  const prevScore = prevState ? calculateCustomScore(prevState, DEFAULT_SCORE_WEIGHTS) : 0;
  const nextScore = nextState ? calculateCustomScore(nextState, DEFAULT_SCORE_WEIGHTS) : 0;
  const computedScore = state ? calculateCustomScore(state, DEFAULT_SCORE_WEIGHTS) : 0;

  // Hover state for map marker highlight (must be before early return)
  const [hoveredFacilityName, setHoveredFacilityName] = useState<string | null>(null);
  const [hoveredInstallationId, setHoveredInstallationId] = useState<string | null>(null);

  // Animated counter for the hero score
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

  // Score component breakdowns (matching calculateCustomScore internals)
  const taxScoreComponents = state ? (() => {
    const pensionPts  = state.militaryPensionTax === 'No' ? 50 : state.militaryPensionTax === 'Partial' ? 28 : 0;
    const incomePts   = Math.max(0, Math.round(32 - state.stateIncomeTax * 2.4));
    const propertyPts = state.propertyTaxLevel === 'Low' ? 18 : state.propertyTaxLevel === 'Medium' ? 10 : 0;
    return { total: pensionPts + incomePts + propertyPts, pensionPts, incomePts, propertyPts };
  })() : null;
  const costScore    = state ? Math.min(100, Math.max(0, Math.round((160 - state.costOfLivingIndex) / 78 * 100))) : 0;

  const housing = state ? stateHousingData[state.id] : null;
  const climate = state ? stateClimateData[state.id] : null;
  const employment = state ? stateEmploymentData[state.id] : null;

  // Comparison favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('comparison-favorites') || '[]'); }
    catch { return []; }
  });
  const [showComparison, setShowComparison] = useState(false);
  const [resourceTab, setResourceTab] = useState<'va' | 'installations'>('va');
  const [showInstallations, setShowInstallations] = useState(false);

  const handleResourceTabChange = (v: string) => {
    const tab = v as 'va' | 'installations';
    setResourceTab(tab);
    if (tab === 'installations') setShowInstallations(true);
    else setShowInstallations(false);
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
  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter((f) => f !== id));
  };

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
      const blob = await pdf(
        <StatePdfDocument
          state={state}
          inputs={{ userType, retirementIncome }}
          housingData={stateHousingData[state.id] ?? null}
          employmentData={stateEmploymentData[state.id] ?? null}
          climateData={stateClimateData[state.id] ?? null}
          perks={stateVeteranPerks[state.id] ?? null}
          originState={originState}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.name.replace(/\s+/g, '-')}-Military-Retirement-Report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  };

  const riskColor = (level: RiskLevel) => {
    if (level === 'High')     return 'bg-red-100 text-red-700 border border-red-200';
    if (level === 'Moderate') return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    if (level === 'Low')      return 'bg-blue-100 text-blue-700 border border-blue-200';
    return 'bg-slate-100 text-slate-400 border border-slate-200';
  };

  const climateRisks = climate ? [
    { label: 'Hurricane',    value: climate.disasterRisk.hurricane,   icon: Wind },
    { label: 'Wildfire',     value: climate.disasterRisk.wildfire,    icon: Flame },
    { label: 'Flooding',     value: climate.disasterRisk.flood,       icon: Waves },
    { label: 'Tornado',      value: climate.disasterRisk.tornado,     icon: TriangleAlert },
    { label: 'Earthquake',   value: climate.disasterRisk.earthquake,  icon: Mountain },
    { label: 'Winter Storm', value: climate.disasterRisk.winterStorm, icon: Snowflake },
  ] : [];

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">State not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-slate-600';
  };

  const getTaxBadge = (tax: string) => {
    if (tax === 'No')
      return { text: 'Tax Free', color: 'bg-green-100 text-green-700', icon: CheckCircle2 };
    if (tax === 'Partial')
      return { text: 'Partially Taxed', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle };
    return { text: 'Fully Taxed', color: 'bg-red-100 text-red-700', icon: XCircle };
  };

  const taxBadge = getTaxBadge(state.militaryPensionTax);
  const TaxIcon = taxBadge.icon;
  const flagUrl = getFlagUrl(state.abbreviation);

  const formatVeteranPop = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return n.toString();
  };

  const allFacilities = vaFacilityLocations[state.id] ?? [];
  const vamcs = allFacilities.filter((f) => f.type !== 'clinic').sort((a, b) => a.name.localeCompare(b.name));
  const clinics = allFacilities.filter((f) => f.type === 'clinic').sort((a, b) => a.name.localeCompare(b.name));
  const stateInstallations = militaryInstallations.filter((i) => i.stateId === state.id).sort((a, b) => a.name.localeCompare(b.name));

  // Map height + legend section (~80px) = total column height both panels share
  const facilityPanelHeight = 520;
  const directoryHeight = facilityPanelHeight + 80;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Left: back button */}
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Results</span>
            </Button>

            {/* Center: state identity — fades in after scroll */}
            <div className={`flex items-center gap-1.5 transition-all duration-300 ${headerScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => prevId && navToKeepScroll(prevId)}
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
                <span className="font-bold text-slate-900 text-base">{state.name}</span>
                <Badge className={`${taxBadge.color} flex items-center gap-1 text-xs`}>
                  <TaxIcon className="w-3 h-3" />
                  {taxBadge.text}
                </Badge>
                <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200 text-sm text-slate-500">
                  {state.stateIncomeTax === 0
                    ? <span className="text-green-600 font-medium">No income tax</span>
                    : <span>{state.stateIncomeTax}% tax</span>}
                  <span>COL {state.costOfLivingIndex}</span>
                  <span className={`font-bold text-base ${getScoreColor(computedScore)}`}>{computedScore}<span className="text-xs font-normal text-slate-400 ml-0.5">/ 100</span></span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => nextId && navToKeepScroll(nextId)}
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

            {/* Right: export + sources link + app name */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleExportPdf} disabled={pdfLoading} className="gap-1.5 h-8 text-xs">
                {pdfLoading ? (
                  <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">{pdfLoading ? 'Building…' : 'Export PDF'}</span>
              </Button>
              <Button variant="ghost" onClick={() => navigate('/sources')} className="gap-2">
                <IconReadOutlined className="w-4 h-4" />
                <span className="hidden sm:inline">Sources</span>
              </Button>
              <SiteLogo className="hidden sm:block w-5 h-5" />
              <span className="font-semibold hidden md:inline text-sm">Military Retirement Advisor</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* State Header */}
        <div className="flex items-stretch gap-2 mb-6">
          {/* Prev arrow — desktop only */}
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

            {/* Left: identity + inline stats */}
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md tracking-wide">
                  {state.abbreviation}
                </span>
                <img
                  src={flagUrl}
                  alt={`${state.name} state flag`}
                  className="h-6 w-auto shadow-sm border border-slate-200/60"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <h1 className="text-3xl font-bold text-slate-900">{state.name}</h1>
                <Badge className={`${taxBadge.color} flex items-center gap-1`}>
                  <TaxIcon className="w-3 h-3" />
                  {taxBadge.text}
                </Badge>
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4">
                <p className="text-sm text-slate-400">{isSeparating ? 'Transitioning service member' : 'Military retirement profile'} · {DATA_YEAR} data</p>
                {stateVeteranUrls[state.id] && (
                  <a
                    href={stateVeteranUrls[state.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {state.name} Veteran Services
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  {state.stateIncomeTax === 0
                    ? <span className="text-green-600 font-medium">No income tax</span>
                    : <span>{state.stateIncomeTax}% income tax</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>COL index {state.costOfLivingIndex}</span>
                  <span className="text-slate-400 text-xs">(US avg = 100)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatVeteranPop(state.veteranPopulation)} veterans</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vamcs.length} VAMC{vamcs.length !== 1 ? 's' : ''} · {clinics.length} clinic{clinics.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {/* Right: score + compare */}
            <div className="flex-shrink-0 text-center min-w-[90px]">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Score</div>
              <div className={`text-5xl font-bold leading-none tabular-nums ${getScoreColor(computedScore)}`}>
                {displayScore}
              </div>
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
                <button
                  onClick={() => setShowComparison(true)}
                  className="mt-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-center"
                >
                  View comparison ({favorites.length})
                </button>
              )}
            </div>
          </div>

          {/* Score Breakdown — Gauge Charts */}
          <div className="border-t border-slate-100 pt-5">
            {/* 100% disability property tax callout — compact inline banner above gauges */}
            {disabilityRating === '100' && state.propertyTaxExemption100 !== 'None' && (
              <div className={`mx-4 mb-4 px-3 py-2 rounded-md border text-xs flex items-center gap-2 ${
                state.propertyTaxExemption100 === 'Full'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}>
                <span className="text-sm leading-none shrink-0">{state.propertyTaxExemption100 === 'Full' ? '✓' : '◑'}</span>
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
            {/* Desktop: 3-column gauge layout */}
            <div className="hidden md:grid grid-cols-3 divide-x divide-slate-100">
              {taxScoreComponents && (() => {
                const pensionTax = Math.round(pensionTaxDollars(state));
                const incomeTax  = Math.round(retirementIncome * state.stateIncomeTax / 100);
                return (
                  <ScoreGauge
                    score={taxScoreComponents.total}
                    label="Tax Friendliness"
                    subItems={[
                      ...(!isSeparating ? [{
                        label: 'Pension tax/yr',
                        value: pensionTax === 0 ? '$0 — exempt' : `$${pensionTax.toLocaleString()}/yr`,
                      }] : []),
                      {
                        label: 'Income tax/yr',
                        value: incomeTax === 0 ? 'None' : `$${incomeTax.toLocaleString()}/yr`,
                      },
                      {
                        label: 'Property tax',
                        value: state.propertyTaxLevel,
                        badge: disabilityRating === '100'
                          ? state.propertyTaxExemption100 === 'Full'
                            ? { text: 'Exempt at 100%', color: 'text-green-700 bg-green-50 border-green-200' }
                            : state.propertyTaxExemption100 === 'Partial'
                            ? { text: 'Partial Exemption', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' }
                            : null
                          : null,
                      },
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
                  {
                    label: 'vs national avg',
                    value: state.costOfLivingIndex <= 100
                      ? `${100 - state.costOfLivingIndex}% below avg`
                      : `${state.costOfLivingIndex - 100}% above avg`,
                  },
                  { label: 'Avg home price', value: `$${(state.avgHomeCost / 1000).toFixed(0)}k` },
                  {
                    label: 'Median rent/mo',
                    value: housing ? `$${housing.medianRent.toLocaleString()}` : '—',
                  },
                ]}
              />
              {(() => {
                const perks = stateVeteranPerks[state.id];
                const eduCount = perks
                  ? perks.educationBenefits.retiree.length + perks.educationBenefits.family.length
                  : 0;
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

            {/* Mobile: horizontal stacked rows */}
            {taxScoreComponents && (() => {
              const pensionTax = Math.round(pensionTaxDollars(state));
              const perks = stateVeteranPerks[state.id];
              const eduCount = perks ? perks.educationBenefits.retiree.length + perks.educationBenefits.family.length : 0;
              const regCount = perks ? perks.vehicleRegistrationBenefits.length : 0;
              const sections = [
                {
                  label: 'Tax Friendliness',
                  score: taxScoreComponents.total,
                  items: [
                    ...(!isSeparating ? [{ label: 'Pension tax', value: pensionTax === 0 ? '$0 — exempt' : `$${pensionTax.toLocaleString()}/yr` }] : []),
                    { label: 'Income tax', value: state.stateIncomeTax === 0 ? 'None' : `${state.stateIncomeTax}%` },
                    {
                      label: 'Property tax',
                      value: state.propertyTaxLevel,
                      badge: disabilityRating === '100'
                        ? state.propertyTaxExemption100 === 'Full'
                          ? { text: 'Exempt at 100%', color: 'text-green-700 bg-green-50 border-green-200' }
                          : state.propertyTaxExemption100 === 'Partial'
                          ? { text: 'Partial Exemption', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' }
                          : null
                        : null,
                    },
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
                s >= 90 ? '#16a34a' : s >= 80 ? '#2563eb' : s >= 70 ? '#d97706' : '#94a3b8';
              return (
                <div className="md:hidden space-y-3">
                  {sections.map((sec) => (
                    <div key={sec.label} className="py-3 border-t border-slate-100 first:border-t-0">
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

            {/* Score methodology note */}
            <div className="px-4 pt-3 pb-1 mt-1 border-t border-slate-100">
              <div className="flex items-start gap-1.5 text-xs text-slate-400">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  VA Benefits score uses{' '}
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
          </div>{/* end hero card flex-1 */}

          {/* Next arrow — desktop only */}
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
        </div>{/* end hero flex wrapper */}

        {/* Mobile floating prev/next nav — fixed bottom corners */}
        <div className="md:hidden">
          {prevId && prevState && (
            <button
              onClick={() => navTo(prevId)}
              className="fixed bottom-6 left-4 z-50 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[10px] font-bold leading-none">{prevState.abbreviation}</span>
              <span className={`text-[10px] font-bold leading-none ${getScoreColor(prevScore)}`}>{prevScore}</span>
            </button>
          )}
          {nextId && nextState && (
            <button
              onClick={() => navTo(nextId)}
              className="fixed bottom-6 right-4 z-50 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="text-[10px] font-bold leading-none">{nextState.abbreviation}</span>
              <span className={`text-[10px] font-bold leading-none ${getScoreColor(nextScore)}`}>{nextScore}</span>
            </button>
          )}
        </div>

        {/* Map + VA Facilities list side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Map with overlaid title */}
          <div className="relative isolate">
            <div className="absolute top-3 right-3 z-[400] flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm border border-slate-200/80">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">VA Facilities Map</span>
            </div>
            <StateShapeMap key={state.id} stateId={state.id} stateName={state.name} height={facilityPanelHeight} showInstallations={showInstallations} onShowInstallationsChange={setShowInstallations} hoveredFacilityName={hoveredFacilityName} hoveredInstallationId={hoveredInstallationId} />
          </div>

          {/* Facility Directory — tabbed */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col" style={{ height: directoryHeight }}>
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 flex-shrink-0 -mx-4 px-4">
              <MapPin className="w-4 h-4 text-blue-600" />
              Military Resources
              <span className="ml-auto text-xs font-normal text-slate-400">Tap to open in Maps</span>
            </h2>

            <Tabs value={resourceTab} onValueChange={handleResourceTabChange} className="flex flex-col flex-1 min-h-0">
              <div className="flex rounded-full bg-slate-100 p-1 mb-3 flex-shrink-0 text-xs font-medium">
                {([
                  { value: 'va', label: `VA Facilities (${allFacilities.length})` },
                  { value: 'installations', label: `Installations (${stateInstallations.length})` },
                ] as const).map(({ value, label }) => {
                  const active = resourceTab === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleResourceTabChange(value)}
                      className={`relative flex-1 px-3 py-1.5 rounded-full transition-colors z-10 ${active ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {active && (
                        <motion.div
                          layoutId="resource-tab-pill"
                          className="absolute inset-0 bg-blue-600 rounded-full shadow-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                      {label}
                    </button>
                  );
                })}
              </div>

              <TabsContent value="va" className="flex-1 overflow-y-auto mt-0">
                <div className="space-y-4">
                  {vamcs.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                        Medical Centers ({vamcs.length})
                      </div>
                      <ul className={vamcs.length > 6 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                        {vamcs.map((f, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
                          >
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline py-0.5"
                              onMouseEnter={() => setHoveredFacilityName(f.name)}
                              onMouseLeave={() => setHoveredFacilityName(null)}
                            >
                              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                              <span>{f.name}</span>
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {clinics.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                        Clinics ({clinics.length})
                      </div>
                      <ul className={clinics.length > 6 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                        {clinics.map((f, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: (vamcs.length + i) * 0.04, ease: 'easeOut' }}
                          >
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-sm text-green-600 hover:text-green-800 hover:underline py-0.5"
                              onMouseEnter={() => setHoveredFacilityName(f.name)}
                              onMouseLeave={() => setHoveredFacilityName(null)}
                            >
                              <MapPin className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{f.name}</span>
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {allFacilities.length === 0 && (
                    <p className="text-sm text-slate-400 italic">No facility data available.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="installations" className="flex-1 overflow-y-auto mt-0">
                {stateInstallations.length > 0 ? (
                  <ul className={stateInstallations.length > 8 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                    {stateInstallations.map((inst, i) => (
                      <motion.li
                        key={inst.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
                      >
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(inst.name + ', ' + state.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm hover:underline py-0.5"
                          style={{ color: '#4b5320' }}
                          onMouseEnter={() => setHoveredInstallationId(inst.id)}
                          onMouseLeave={() => setHoveredInstallationId(null)}
                        >
                          <span className="flex-shrink-0 mt-0.5" style={{ color: '#7a8c3a' }}>★</span>
                          <span>{inst.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 italic">No installation data available for this state yet.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>


        <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  {computedScore >= 85
                    ? <Star className="w-5 h-5 text-green-500" />
                    : computedScore >= 70
                      ? <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      : <AlertCircle className="w-5 h-5 text-amber-500" />}
                  Why {state.name}{' '}
                  {computedScore >= 85
                    ? 'is Great'
                    : computedScore >= 70
                      ? 'Could Work'
                      : 'May Challenge'}{' '}
                  for Your Retirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Advantages</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.pros.map((pro, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.04, duration: 0.2 }}
                          className="inline-flex items-start gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded-lg"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          {pro}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Considerations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.cons.map((con, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (state.pros.length + idx) * 0.04, duration: 0.2 }}
                          className="inline-flex items-start gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-2.5 py-1.5 rounded-lg"
                        >
                          <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                          {con}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Military Benefits */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Military-Specific Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {state.militaryBenefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition-colors"
                    >
                      <div className="w-1 self-stretch rounded-full bg-blue-400 flex-shrink-0" />
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
                {(() => {
                  const { inState, bordering } = getSpaceATerminalsByProximity(state.id);
                  const total = inState.length + bordering.length;
                  if (total === 0) return null;
                  return (
                    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Terminals column */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Plane className="w-4 h-4 text-violet-600" />
                            <span className="text-sm font-semibold text-violet-800">Space-A Travel Access</span>
                            <span className="ml-auto text-xs font-semibold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                              {total} terminal{total !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {inState.map((t) => (
                              <div key={t.id} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                                <span className="text-sm text-violet-900">
                                  <span className="font-medium">{t.name}</span> ({t.base}) —{' '}
                                  <a href={t.amcUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-violet-700">AMC Terminal Info</a>
                                </span>
                              </div>
                            ))}
                            {bordering.map((t) => (
                              <div key={t.id} className="flex items-start gap-2 opacity-75">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-300 flex-shrink-0 mt-1.5" />
                                <span className="text-sm text-violet-800">
                                  {t.base}, {t.stateAbbr} (bordering state) —{' '}
                                  <a href={t.amcUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-violet-700">AMC Info</a>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Retiree eligibility column */}
                        <div className="border-t border-violet-200 sm:border-t-0 sm:border-l sm:pl-4 pt-3 sm:pt-0">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold text-violet-800">Retiree Eligibility</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              'Category VI — lowest priority, flies when seats available',
                              'Valid military retiree ID (DD-2765) required',
                              'Dependents on ID card may travel with you',
                              'OCONUS travel permitted (unlike active duty Cat IV/V)',
                              'Sign up in person or via email at each terminal',
                            ].map((text, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-1.5" />
                                <span className="text-sm text-violet-800">{text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Housing Market + Economy side-by-side */}
            {(housing || employment) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {housing && (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-600" />
                    Housing Market
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Three key stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Median Home</div>
                      <div className="text-xl font-bold text-slate-800">${(state.avgHomeCost / 1000).toFixed(0)}k</div>
                      <div className={`text-xs mt-1 font-medium ${state.avgHomeCost < 300_000 ? 'text-green-600' : state.avgHomeCost < 500_000 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {state.avgHomeCost < 300_000 ? 'Below avg' : state.avgHomeCost < 500_000 ? 'Near avg' : 'Above avg'}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Median Rent</div>
                      <div className="text-xl font-bold text-slate-800">${housing.medianRent.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                      <div className={`text-xs mt-1 font-medium ${housing.medianRent < NATIONAL_HOUSING.medianRent ? 'text-green-600' : housing.medianRent < NATIONAL_HOUSING.medianRent * 1.3 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {housing.medianRent < NATIONAL_HOUSING.medianRent
                          ? `$${(NATIONAL_HOUSING.medianRent - housing.medianRent).toLocaleString()} below US avg`
                          : `$${(housing.medianRent - NATIONAL_HOUSING.medianRent).toLocaleString()} above US avg`}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Price Trend</div>
                      <div className={`text-xl font-bold flex items-center justify-center gap-1 ${housing.housingPriceTrend > 0 ? 'text-slate-800' : housing.housingPriceTrend < 0 ? 'text-red-600' : 'text-slate-500'}`}>
                        {housing.housingPriceTrend > 0
                          ? <TrendingUp className="w-4 h-4 text-emerald-500" />
                          : housing.housingPriceTrend < 0
                          ? <TrendingDown className="w-4 h-4 text-red-500" />
                          : <Minus className="w-4 h-4 text-slate-400" />}
                        {housing.housingPriceTrend > 0 ? '+' : ''}{housing.housingPriceTrend}%
                      </div>
                      <div className="text-xs text-slate-400 mt-1">year over year</div>
                    </div>
                  </div>

                  {/* Context row */}
                  <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-sm">
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-slate-600">Rent vs. US median ($1,163/mo)</span>
                      <span className={`font-semibold ${housing.medianRent <= NATIONAL_HOUSING.medianRent ? 'text-green-600' : 'text-red-600'}`}>
                        {housing.medianRent <= NATIONAL_HOUSING.medianRent ? '✓ Below' : '↑ Above'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-slate-600">Home price momentum</span>
                      <div className="text-right">
                        <span className={`font-semibold block ${
                          housing.housingPriceTrend >= 5 ? 'text-amber-600'
                          : housing.housingPriceTrend >= 2 ? 'text-blue-600'
                          : housing.housingPriceTrend < 0 ? 'text-red-600'
                          : 'text-slate-600'}`}>
                          {housing.housingPriceTrend >= 5 ? 'Fast-rising'
                            : housing.housingPriceTrend >= 2 ? 'Steady growth'
                            : housing.housingPriceTrend < 0 ? 'Declining'
                            : 'Flat'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {housing.housingPriceTrend > 0 ? '+' : ''}{housing.housingPriceTrend}% · {housing.housingPriceTrend >= 0 ? '+' : ''}${Math.round(state.avgHomeCost * housing.housingPriceTrend / 100).toLocaleString()}/yr
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-slate-600">Buy vs. rent breakeven</span>
                      <span className="text-slate-500 font-medium">
                        ~{Math.round(state.avgHomeCost / (housing.medianRent * 12))} yrs
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    Data: Zillow Research &amp; Census Bureau ACS 2023–2024. Trends are year-over-year estimates.
                  </p>
                </CardContent>
              </Card>
            )}
            {/* Economy & Jobs */}
            {employment && (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Economy &amp; Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Three key stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 leading-tight">Unemployment</div>
                      <div className={`text-xl font-bold ${employment.unemploymentRate < 4 ? 'text-green-600' : employment.unemploymentRate < 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {employment.unemploymentRate}%
                      </div>
                      <div className={`text-xs mt-1 font-medium ${employment.unemploymentRate < NATIONAL_EMPLOYMENT.unemploymentRate ? 'text-green-600' : 'text-slate-400'}`}>
                        {employment.unemploymentRate < NATIONAL_EMPLOYMENT.unemploymentRate ? 'Below US avg' : 'Above US avg'}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 leading-tight">Job Growth</div>
                      <div className={`text-xl font-bold flex items-center justify-center gap-1 ${employment.jobGrowthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {employment.jobGrowthRate > 0
                          ? <TrendingUp className="w-4 h-4" />
                          : <TrendingDown className="w-4 h-4" />}
                        {employment.jobGrowthRate > 0 ? '+' : ''}{employment.jobGrowthRate}%
                      </div>
                      <div className="text-xs text-slate-400 mt-1">year over year</div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 leading-tight">Median Income</div>
                      <div className={`text-xl font-bold ${employment.medianHouseholdIncome >= NATIONAL_EMPLOYMENT.medianHouseholdIncome ? 'text-green-600' : 'text-slate-800'}`}>
                        ${(employment.medianHouseholdIncome / 1000).toFixed(0)}k
                      </div>
                      <div className={`text-xs mt-1 font-medium ${employment.medianHouseholdIncome >= NATIONAL_EMPLOYMENT.medianHouseholdIncome ? 'text-green-600' : 'text-slate-400'}`}>
                        {employment.medianHouseholdIncome >= NATIONAL_EMPLOYMENT.medianHouseholdIncome ? 'Above US avg' : 'Below US avg'}
                      </div>
                    </div>
                  </div>

                  {/* Top industries */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {employment.topIndustries.map((industry) => (
                        <span key={industry} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Context rows */}
                  <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-sm">
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-slate-500">vs. US unemployment avg ({NATIONAL_EMPLOYMENT.unemploymentRate}%)</span>
                      <span className={`font-semibold ${employment.unemploymentRate < NATIONAL_EMPLOYMENT.unemploymentRate ? 'text-green-600' : 'text-red-500'}`}>
                        {employment.unemploymentRate < NATIONAL_EMPLOYMENT.unemploymentRate
                          ? `${(NATIONAL_EMPLOYMENT.unemploymentRate - employment.unemploymentRate).toFixed(1)}% lower ✓`
                          : `${(employment.unemploymentRate - NATIONAL_EMPLOYMENT.unemploymentRate).toFixed(1)}% higher`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-slate-500">DoD contractor footprint</span>
                      <span className="text-slate-700 font-medium text-right max-w-[200px]">
                        {employment.defenseContractorPresence === 'High'
                          ? 'Strong — many DoD contractor roles'
                          : employment.defenseContractorPresence === 'Medium'
                          ? 'Moderate — some contractor presence'
                          : 'Limited — few major DoD contractors'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    Data: BLS 2024 &amp; Census ACS 2023. Always verify with current job listings before relocating.
                  </p>
                </CardContent>
              </Card>
            )}
              </div>
            )}

            {/* Veteran Perks — License/Registration & Medal Benefits */}
            {stateVeteranPerks[state.id] && (() => {
              const perks = stateVeteranPerks[state.id];
              const sections = [
                { value: 'prop-tax', label: 'Property Tax Exemption (100% VA Disability)', items: perks.propertyTaxExemptions,          checkClass: state.propertyTaxExemption100 === 'Full' ? 'text-green-600' : 'text-yellow-500', pillClass: state.propertyTaxExemption100 === 'Full' ? 'bg-green-50 text-green-900' : state.propertyTaxExemption100 === 'Partial' ? 'bg-yellow-50 text-yellow-900' : 'bg-slate-50 text-slate-700' },
                { value: 'dl',       label: "Driver's License & Vehicle Registration",      items: perks.vehicleRegistrationBenefits,    checkClass: 'text-green-600',   pillClass: 'bg-slate-50 text-slate-700'   },
                { value: 'medal',    label: 'Military Medal & Honor Benefits',               items: perks.medalBenefits,                  checkClass: 'text-yellow-500',  pillClass: 'bg-slate-50 text-slate-700'   },
                { value: 'edu-r',    label: 'Education Benefits — Retiree',                  items: perks.educationBenefits.retiree,      checkClass: 'text-blue-600',    pillClass: 'bg-blue-50 text-blue-900'     },
                { value: 'edu-f',    label: 'Education Benefits — Spouse & Dependents',      items: perks.educationBenefits.family,       checkClass: 'text-purple-600',  pillClass: 'bg-purple-50 text-purple-900' },
              ].filter((s) => s.items.length > 0);
              if (sections.length === 0) return null;
              return (
                <div ref={veteranPerksRef}>
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <SiteLogo className="w-5 h-5" />
                      Veteran Perks &amp; Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                      {sections.map((section) => (
                          <AccordionItem key={section.value} value={section.value} className="border-0 px-6 data-[state=closed]:hover:bg-slate-50 transition-colors">
                            <AccordionTrigger className="hover:no-underline py-4 gap-3 border-t border-slate-200">
                              <span className="text-sm font-semibold text-slate-700 flex-1 text-left">{section.label}</span>
                              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mr-2 tabular-nums">
                                {section.items.length} item{section.items.length !== 1 ? 's' : ''}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                              <ul className="space-y-2">
                                {section.items.map((item, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.04, duration: 0.18 }}
                                    className={`flex items-start gap-3 p-3 rounded-lg text-sm ${section.pillClass}`}
                                  >
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${section.checkClass}`} />
                                    <span>{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                      ))}
                    </Accordion>
                    <div className="px-6 pb-2 pt-1">
                      <p className="text-xs text-slate-400">
                        Verify current eligibility requirements with your state DMV and official veteran services office.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                </div>
              );
            })()}

            {/* Climate & Natural Disaster Risk */}
            {climate && (
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    Climate &amp; Natural Disaster Risk
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Temperature & Conditions */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Typical Climate Conditions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">{climate.avgSummerHighF}°F</div>
                        <div className="text-xs text-slate-500 mt-1">Summer High (July avg)</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{climate.avgWinterLowF}°F</div>
                        <div className="text-xs text-slate-500 mt-1">Winter Low (Jan avg)</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="w-4 h-4 text-sky-500" />
                          <span className="text-xl font-bold text-sky-600">{climate.humidity}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Humidity</div>
                      </div>
                      <div className="p-3 bg-sky-50 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CloudRain className="w-4 h-4 text-sky-600" />
                          <span className="text-2xl font-bold text-sky-700">{climate.annualRainfallInches}&quot;</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Annual Rainfall</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-500">{climate.extremeHeatDays}</div>
                        <div className="text-xs text-slate-500 mt-1">Days &gt;95°F / yr</div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-600">{climate.extremeColdDays}</div>
                        <div className="text-xs text-slate-500 mt-1">Days &lt;20°F / yr</div>
                      </div>
                    </div>
                  </div>

                  {/* Disaster Risk Grid */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Natural Disaster Risk</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {climateRisks.map(({ label, value, icon: Icon }) => (
                        <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${riskColor(value)}`}>
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <div>
                            <div className="text-xs opacity-70 leading-none mb-0.5">{label}</div>
                            <div className="font-semibold leading-none">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    Climate normals from NOAA (1991–2020). Disaster risk based on FEMA National Risk Index and historical frequency data. Individual risk varies by location within state.
                  </p>
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>Data last updated: {LAST_UPDATED}</p>
            <p className="mt-1">
              Always verify current tax laws and benefits with official state resources and your tax
              advisor.
            </p>
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
    </div>
  );
}
