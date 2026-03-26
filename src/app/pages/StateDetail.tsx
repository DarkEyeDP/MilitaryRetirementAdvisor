import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { statesData } from '../data/stateData';
import { vaFacilityLocations } from '../data/vaFacilityLocations';
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
} from 'lucide-react';
import StateShapeMap from '../components/StateShapeMap';

export default function StateDetail() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const [facilitiesExpanded, setFacilitiesExpanded] = useState(false);
  const state = statesData.find((s) => s.id === stateId);

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

  const allFacilities = vaFacilityLocations[state.id] ?? [];
  const vamcs = allFacilities.filter((f) => f.type !== 'clinic');
  const clinics = allFacilities.filter((f) => f.type === 'clinic');

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
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{state.name}</h1>
                <Badge className={taxBadge.color}>
                  <TaxIcon className="w-3 h-3 mr-1" />
                  {taxBadge.text}
                </Badge>
              </div>
              <p className="text-blue-100 text-lg">Retirement Friendliness Analysis for Veterans</p>
            </div>
            <div className={`text-right ${getScoreBg(state.retirementScore)} rounded-xl p-4`}>
              <div className="text-sm text-slate-600 mb-1">Overall Score</div>
              <div className={`text-5xl font-bold ${getScoreColor(state.retirementScore)}`}>
                {state.retirementScore}
              </div>
              <div className="text-xs text-slate-600 mt-1">out of 100</div>
            </div>
          </div>
        </div>

        {/* State Map + VA Facilities */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            VA Medical Centers in {state.name}
          </h2>
          <StateShapeMap stateId={state.id} stateName={state.name} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">State Income Tax</CardTitle>
            </CardHeader>
            <CardContent>
              {state.stateIncomeTax === 0 ? (
                <div className="text-2xl font-bold text-green-600">None</div>
              ) : (
                <div className="text-2xl font-bold">{state.stateIncomeTax}%</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Cost of Living</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.costOfLivingIndex}</div>
              <p className="text-xs text-slate-500 mt-1">US Average = 100</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">VA Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.vaFacilities}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Veteran Population
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(state.veteranPopulation / 1000).toFixed(0)}k
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Why {state.name}{' '}
                  {state.retirementScore >= 85
                    ? 'is Great'
                    : state.retirementScore >= 75
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Tax Friendliness</span>
                    <span className="font-semibold">
                      {state.militaryPensionTax === 'No'
                        ? '100'
                        : state.militaryPensionTax === 'Partial'
                          ? '60'
                          : '20'}
                      /100
                    </span>
                  </div>
                  <Progress
                    value={
                      state.militaryPensionTax === 'No'
                        ? 100
                        : state.militaryPensionTax === 'Partial'
                          ? 60
                          : 20
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Cost of Living</span>
                    <span className="font-semibold">
                      {Math.max(0, 200 - state.costOfLivingIndex)}/100
                    </span>
                  </div>
                  <Progress value={Math.max(0, 200 - state.costOfLivingIndex)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Veteran Benefits</span>
                    <span className="font-semibold">{state.veteranBenefitsScore}/100</span>
                  </div>
                  <Progress value={state.veteranBenefitsScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => setFacilitiesExpanded((v) => !v)}
                >
                  <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">VA Facilities</div>
                      {facilitiesExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      )}
                    </div>
                    <div className="flex items-end gap-3 mt-0.5">
                      <div>
                        <span className="text-2xl font-bold">{state.vaFacilities}</span>
                        <span className="text-xs text-slate-500 ml-1">Medical Centers</span>
                      </div>
                      {clinics.length > 0 && (
                        <div>
                          <span className="text-2xl font-bold text-green-600">{clinics.length}</span>
                          <span className="text-xs text-slate-500 ml-1">Clinics</span>
                        </div>
                      )}
                    </div>
                    {facilitiesExpanded && allFacilities.length > 0 && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs text-slate-400 italic">
                          Tap any location to open in Google Maps
                        </p>
                        {vamcs.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1.5">
                              Medical Centers
                            </div>
                            <ul className="space-y-1">
                              {vamcs.map((f, i) => (
                                <li key={i}>
                                  <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    <MapPin className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <span>{f.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {clinics.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1.5">
                              Clinics
                            </div>
                            <ul className="space-y-1">
                              {clinics.map((f, i) => (
                                <li key={i}>
                                  <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(f.address ?? f.name + ', ' + state.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-start gap-1.5 text-xs text-green-600 hover:text-green-800 hover:underline"
                                  >
                                    <MapPin className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{f.name}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Total Veterans</div>
                    <div className="text-2xl font-bold">
                      {state.veteranPopulation.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Average Home Price</div>
                    <div className="text-2xl font-bold">
                      ${(state.avgHomeCost / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Cost of Living Index</div>
                    <div className="text-2xl font-bold">{state.costOfLivingIndex}</div>
                    <div className="text-xs text-slate-500">100 = National Average</div>
                  </div>
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
