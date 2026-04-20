import { Home, TrendingUp, TrendingDown, Minus, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import type { StateData } from '../../data/stateData';
import { NATIONAL_HOUSING } from '../../data/housingData';
import type { HousingData } from '../../data/housingData';
import { NATIONAL_EMPLOYMENT } from '../../data/employmentData';
import type { EmploymentData } from '../../data/employmentData';

interface HousingSectionProps {
  state: StateData;
  housing: HousingData | null;
  employment: EmploymentData | null;
}

export function HousingSection({ state, housing, employment }: HousingSectionProps) {
  if (!housing && !employment) return null;
  return (
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
                <span className="text-slate-500 font-medium">~{Math.round(state.avgHomeCost / (housing.medianRent * 12))} yrs</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Data: Zillow Research &amp; Census Bureau ACS 2023–2024. Trends are year-over-year estimates.
            </p>
          </CardContent>
        </Card>
      )}

      {employment && (
        <Card className="h-full">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Economy &amp; Jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
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
                  {employment.jobGrowthRate > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
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
            <div className="flex flex-wrap gap-1.5">
              {employment.topIndustries.map((industry) => (
                <span key={industry} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {industry}
                </span>
              ))}
            </div>
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
  );
}
