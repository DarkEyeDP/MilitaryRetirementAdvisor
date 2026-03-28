import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { statesData, calculateCustomScore, DEFAULT_SCORE_WEIGHTS, scoreTier } from '../data/stateData';
import { stateHousingData, NATIONAL_HOUSING } from '../data/housingData';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
import { stateVeteranPerks } from '../data/veteranPerksData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft,
  DollarSign,
  Home,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Car,
  Medal,
} from 'lucide-react';
import StateShapeMap from '../components/StateShapeMap';

export default function StateDetail() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const state = statesData.find((s) => s.id === stateId);
  const computedScore = state ? calculateCustomScore(state, DEFAULT_SCORE_WEIGHTS) : 0;

  // Score component breakdowns (matching calculateCustomScore internals)
  const taxScoreComponents = state ? (() => {
    const pensionPts  = state.militaryPensionTax === 'No' ? 50 : state.militaryPensionTax === 'Partial' ? 28 : 0;
    const incomePts   = Math.max(0, Math.round(32 - state.stateIncomeTax * 2.4));
    const propertyPts = state.propertyTaxLevel === 'Low' ? 18 : state.propertyTaxLevel === 'Medium' ? 10 : 0;
    return { total: pensionPts + incomePts + propertyPts, pensionPts, incomePts, propertyPts };
  })() : null;
  const costScore    = state ? Math.min(100, Math.max(0, Math.round((160 - state.costOfLivingIndex) / 78 * 100))) : 0;

  const housing = state ? stateHousingData[state.id] : null;
  const flagUrl = `https://cdn.jsdelivr.net/gh/hayleox/flags@master/svg/us/${state.abbreviation.toLowerCase()}.svg`;

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

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-50';
    if (score >= 80) return 'bg-blue-50';
    if (score >= 70) return 'bg-yellow-50';
    return 'bg-slate-50';
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

  const formatVeteranPop = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return n.toString();
  };

  const allFacilities = vaFacilityLocations[state.id] ?? [];
  const vamcs = allFacilities.filter((f) => f.type !== 'clinic');
  const clinics = allFacilities.filter((f) => f.type === 'clinic');

  // Shared height for the map+directory row — grows with facility count
  const facilityPanelHeight = allFacilities.length > 20 ? 560 : allFacilities.length > 10 ? 460 : 380;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-semibold hidden sm:inline">Military Retirement Advisor</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* State Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 mb-6">
          <div className="flex items-start justify-between gap-6">

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
              </div>
              <p className="text-sm text-slate-400 mb-4">Military retirement profile · 2026 data</p>

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

            {/* Right: score card */}
            <div className="flex-shrink-0 text-center border border-slate-200 rounded-xl px-6 py-4 bg-slate-50 min-w-[110px]">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Score</div>
              <div className={`text-5xl font-bold leading-none ${getScoreColor(computedScore)}`}>
                {computedScore}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${scoreTier(computedScore).className}`}>
                {scoreTier(computedScore).label}
              </span>
            </div>
          </div>
        </div>

        {/* Map + VA Facilities list side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Map with overlaid title */}
          <div className="relative">
            <div className="absolute top-3 right-3 z-[400] flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm border border-slate-200/80">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">VA Facilities Map</span>
            </div>
            <StateShapeMap stateId={state.id} stateName={state.name} height={facilityPanelHeight} />
          </div>

          {/* VA Facilities list */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-full">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3 flex-shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
              Facility Directory
              <span className="ml-auto text-xs font-normal text-slate-400">Tap to open in Maps</span>
            </h2>

            <div className="flex-1 overflow-y-auto space-y-4">
              {vamcs.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                    Medical Centers ({vamcs.length})
                  </div>
                  <ul className={vamcs.length > 6 ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'space-y-1'}>
                    {vamcs.map((f, i) => (
                      <li key={i}>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline py-0.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{f.name}</span>
                        </a>
                      </li>
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
                      <li key={i}>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-green-600 hover:text-green-800 hover:underline py-0.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{f.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {allFacilities.length === 0 && (
                <p className="text-sm text-slate-400 italic">No facility data available.</p>
              )}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Why {state.name}{' '}
                  {computedScore >= 85
                    ? 'is Great'
                    : computedScore >= 70
                      ? 'Could Work'
                      : 'May Challenge'}{' '}
                  for Your Retirement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Advantages
                  </h4>
                  <ul className="space-y-2">
                    {state.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Considerations
                  </h4>
                  <ul className="space-y-2">
                    {state.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">⚠</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="income">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="income">Income Tax</TabsTrigger>
                    <TabsTrigger value="property">Property Tax</TabsTrigger>
                    <TabsTrigger value="sales">Sales Tax</TabsTrigger>
                  </TabsList>

                  <TabsContent value="income" className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">State Income Tax Rate</span>
                        <span className="font-semibold">
                          {state.stateIncomeTax === 0 ? 'None' : `${state.stateIncomeTax}%`}
                        </span>
                      </div>
                      <Progress value={state.stateIncomeTax * 10} className="h-2" />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h5 className="font-semibold mb-2">Military Retirement Income</h5>
                      <p className="text-sm text-slate-600 mb-2">
                        {state.militaryPensionTax === 'No'
                          ? 'Your military retirement income is fully exempt from state income tax.'
                          : state.militaryPensionTax === 'Partial'
                            ? 'A portion of your military retirement income may be exempt from state income tax. Check current exemption limits.'
                            : 'Military retirement income is subject to state income tax.'}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="property" className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Property Tax Level</span>
                        <Badge
                          variant={
                            state.propertyTaxLevel === 'Low'
                              ? 'default'
                              : state.propertyTaxLevel === 'Medium'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {state.propertyTaxLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Average Home Cost</span>
                        <span className="font-semibold">${state.avgHomeCost.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Property tax exemptions and credits may be available for disabled veterans.
                        Check local county assessor for details.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="sales" className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">State Sales Tax Rate</span>
                        <span className="font-semibold">
                          {state.salesTax === 0 ? 'None' : `${state.salesTax}%`}
                        </span>
                      </div>
                      <Progress value={state.salesTax * 10} className="h-2" />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                      <p>
                        Local sales taxes may apply in addition to state rates. Total combined rates
                        vary by county and city.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Military Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Military-Specific Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {state.militaryBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Housing Market */}
            {housing && (
              <Card>
                <CardHeader>
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
            {/* Veteran Perks — License/Registration & Medal Benefits */}
            {stateVeteranPerks[state.id] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    License, Registration &amp; Military Honor Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {stateVeteranPerks[state.id].vehicleRegistrationBenefits.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                        <Car className="w-4 h-4 text-slate-400" />
                        Driver's License &amp; Vehicle Registration
                      </h4>
                      <ul className="space-y-2">
                        {stateVeteranPerks[state.id].vehicleRegistrationBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {stateVeteranPerks[state.id].medalBenefits.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                        <Medal className="w-4 h-4 text-slate-400" />
                        Military Medal &amp; Honor Benefits
                      </h4>
                      <ul className="space-y-2">
                        {stateVeteranPerks[state.id].medalBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs text-slate-400">
                    Verify current eligibility requirements with your state DMV and official veteran services office.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Default weights: taxes 40%, cost 30%, benefits 30%</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {taxScoreComponents && (
                  <div>
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span>Tax Friendliness</span>
                      <span className="font-semibold">{taxScoreComponents.total}/100</span>
                    </div>
                    <Progress value={taxScoreComponents.total} className="h-2 mb-2" />
                    <div className="text-xs text-slate-400 space-y-0.5 pl-1">
                      <div className="flex justify-between">
                        <span>Pension tax exemption</span>
                        <span className="font-medium text-slate-600">+{taxScoreComponents.pensionPts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income tax rate ({state.stateIncomeTax === 0 ? 'none' : `${state.stateIncomeTax}%`})</span>
                        <span className="font-medium text-slate-600">+{taxScoreComponents.incomePts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property tax ({state.propertyTaxLevel})</span>
                        <span className="font-medium text-slate-600">+{taxScoreComponents.propertyPts}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span>Cost of Living</span>
                    <span className="font-semibold">{costScore}/100</span>
                  </div>
                  <Progress value={costScore} className="h-2 mb-2" />
                  <div className="text-xs text-slate-400 pl-1">
                    Index: {state.costOfLivingIndex} (100 = US average)
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span>Veteran Benefits</span>
                    <span className="font-semibold">{state.veteranBenefitsScore}/100</span>
                  </div>
                  <Progress value={state.veteranBenefitsScore} className="h-2" />
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-semibold">
                  <span>Overall Score</span>
                  <span className={scoreTier(computedScore).className.split(' ')[0]}>{computedScore}</span>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Ready to Compare?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Add more states to your comparison to make the best decision.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  Compare More States
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>Data last updated: March 2026</p>
            <p className="mt-1">
              Always verify current tax laws and benefits with official state resources and your tax
              advisor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
