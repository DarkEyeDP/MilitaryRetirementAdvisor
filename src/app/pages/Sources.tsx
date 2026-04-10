import { useNavigate } from 'react-router';
import { DATA_YEAR } from '../data/siteConfig';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import IconReadOutlined from '../components/ui/IconReadOutlined';
import { ScoringTab } from './sources/ScoringTab';
import { TaxesTab } from './sources/TaxesTab';
import { CostOfLivingTab } from './sources/CostOfLivingTab';
import { HousingTab } from './sources/HousingTab';
import { FinancialTab } from './sources/FinancialTab';
import { ClimateTab } from './sources/ClimateTab';
import { EmploymentTab } from './sources/EmploymentTab';
import { VeteransTab } from './sources/VeteransTab';
import { VADisabilityTab } from './sources/VADisabilityTab';

const TABS = [
  { value: 'scoring',       label: 'Scoring Formula' },
  { value: 'taxes',         label: 'Taxes' },
  { value: 'col',           label: 'Cost of Living' },
  { value: 'housing',       label: 'Housing' },
  { value: 'financial',     label: 'Financial' },
  { value: 'climate',       label: 'Climate' },
  { value: 'employment',    label: 'Employment' },
  { value: 'veterans',      label: 'Veterans' },
  { value: 'va-disability', label: 'VA Pay Rates' },
];

export default function Sources() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2 min-w-0">
              <IconReadOutlined className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h1 className="font-semibold text-sm sm:text-lg truncate">Data Sources &amp; Methodology</h1>
            </div>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
            {DATA_YEAR} Updated Data
          </span>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Description */}
        <p className="text-slate-500 text-sm mb-6">
          <span className="hidden md:inline">All 50 states + DC. Every number used to compute scores is shown below — click any column header to sort.
          Data is updated annually; always verify critical figures with official sources before making relocation decisions.</span>
          <span className="md:hidden">Every number behind the retirement scores — all 50 states + DC, {DATA_YEAR} data. Tap a section to explore. Always verify critical figures with official sources before making relocation decisions.</span>
        </p>

        <Tabs defaultValue="scoring">
          {/* Desktop tabs — wrap */}
          <TabsList className="hidden md:flex flex-wrap h-auto gap-1 bg-slate-100 p-1 rounded-lg mb-6">
            {TABS.map(t => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs sm:text-sm rounded-md">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* Mobile tabs — sticky nav bar with underline indicator */}
          <div className="md:hidden -mx-4 sticky top-14 z-30 bg-white border-b border-slate-200 mb-5">
            <div className="overflow-x-auto scrollbar-none">
              <TabsList className="flex w-max gap-0 bg-transparent p-0 rounded-none h-auto">
                {TABS.map(t => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="
                      relative text-sm font-medium whitespace-nowrap
                      px-4 py-3.5 rounded-none bg-transparent
                      text-slate-500
                      data-[state=active]:text-blue-600
                      data-[state=active]:shadow-none
                      data-[state=active]:bg-transparent
                      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full
                      after:bg-transparent
                      data-[state=active]:after:bg-blue-600
                    "
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value="scoring"><ScoringTab /></TabsContent>
          <TabsContent value="taxes"><TaxesTab /></TabsContent>
          <TabsContent value="col"><CostOfLivingTab /></TabsContent>
          <TabsContent value="housing"><HousingTab /></TabsContent>
          <TabsContent value="financial"><FinancialTab /></TabsContent>
          <TabsContent value="climate"><ClimateTab /></TabsContent>
          <TabsContent value="employment"><EmploymentTab /></TabsContent>
          <TabsContent value="veterans"><VeteransTab /></TabsContent>
          <TabsContent value="va-disability"><VADisabilityTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
