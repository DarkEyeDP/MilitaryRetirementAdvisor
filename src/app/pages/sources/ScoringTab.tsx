import { AnimatedTabContent, SourceNote } from './shared';

export function ScoringTab() {
  return (
    <AnimatedTabContent id="scoring">
    <div className="space-y-8">
      {/* Formula overview */}
      <div className="md:bg-slate-50 md:rounded-xl md:border md:border-slate-200 md:p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-1">How the Retirement Score is Calculated</h2>
        <p className="text-sm text-slate-500 mb-4">
          Each state receives a 0–100 score based on three weighted factors. The default weights reflect what
          matters most to the average military retiree, but you can adjust them on the Dashboard.
        </p>

        {/* Formula — desktop pills */}
        <div className="hidden md:flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Tax Score <span className="text-blue-600 font-semibold ml-1">× 40%</span>
          </div>
          <span className="text-slate-400 font-bold">+</span>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Cost of Living Score <span className="text-blue-600 font-semibold ml-1">× 30%</span>
          </div>
          <span className="text-slate-400 font-bold">+</span>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Veteran Benefits Score <span className="text-blue-600 font-semibold ml-1">× 30%</span>
          </div>
        </div>

        {/* Formula — mobile compact 3-col */}
        <div className="md:hidden grid grid-cols-3 border border-slate-200 rounded-lg overflow-hidden bg-white mb-5">
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center border-r border-slate-200">
            <span className="text-xs font-medium text-slate-700 leading-tight">Tax</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×40%</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center border-r border-slate-200">
            <span className="text-xs font-medium text-slate-700 leading-tight">Cost of Living</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×30%</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-3 text-center">
            <span className="text-xs font-medium text-slate-700 leading-tight">Vet Benefits</span>
            <span className="text-blue-600 font-bold text-sm mt-0.5">×30%</span>
          </div>
        </div>

        {/* Three factor sections — desktop: cards in grid; mobile: divider-separated rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 divide-y divide-slate-200 md:divide-y-0">
          {/* Tax Score */}
          <div className="py-4 first:pt-0 md:first:pt-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">T</div>
              <span className="font-semibold text-slate-800">Tax Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span>Pension exemption</span>
                <span className="font-mono text-xs text-slate-500">0–50 pts</span>
              </div>
              <div className="pl-2 space-y-1 text-xs text-slate-500 border-b border-slate-100 pb-2">
                <div className="flex justify-between"><span>Tax-Free</span><span className="font-semibold text-green-700">50 pts</span></div>
                <div className="flex justify-between"><span>Partial</span><span className="font-semibold text-yellow-700">28 pts</span></div>
                <div className="flex justify-between"><span>Taxed</span><span className="font-semibold text-red-600">0 pts</span></div>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span>State income tax rate</span>
                <span className="font-mono text-xs text-slate-500">0–32 pts</span>
              </div>
              <div className="pl-2 text-xs text-slate-400 border-b border-slate-100 pb-2">
                <code>max(0, 32 − rate × 2.4)</code>
                <div className="mt-1 text-slate-500">0% → 32 pts · ~13.3% → 0 pts</div>
              </div>
              <div className="flex justify-between items-center">
                <span>Property tax level</span>
                <span className="font-mono text-xs text-slate-500">0–18 pts</span>
              </div>
              <div className="pl-2 text-xs text-slate-500">
                <div className="flex justify-between"><span>Low</span><span className="font-semibold">18 pts</span></div>
                <div className="flex justify-between"><span>Medium</span><span className="font-semibold">10 pts</span></div>
                <div className="flex justify-between"><span>High</span><span className="font-semibold">0 pts</span></div>
              </div>
            </div>
          </div>

          {/* COL Score */}
          <div className="py-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">C</div>
              <span className="font-semibold text-slate-800">COL Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="text-xs text-slate-500">Derived from the national Cost of Living Index (100 = US average).</p>
              <div className="bg-slate-50 rounded p-2 font-mono text-xs text-slate-600 border border-slate-200">
                min(100, max(0,<br />
                &nbsp;&nbsp;(160 − COL) ÷ 78 × 100))
              </div>
              <div className="pt-1 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between"><span>COL ≤ 82</span><span className="font-semibold text-green-700">100 pts (cheapest)</span></div>
                <div className="flex justify-between"><span>COL = 100 (avg)</span><span className="font-semibold">77 pts</span></div>
                <div className="flex justify-between"><span>COL ≥ 160</span><span className="font-semibold text-red-600">0 pts (most expensive)</span></div>
              </div>
            </div>
          </div>

          {/* Benefits Score */}
          <div className="py-4 md:bg-white md:border md:border-slate-200 md:rounded-xl md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">B</div>
              <span className="font-semibold text-slate-800">Benefits Score (0–100)</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="text-xs text-slate-500">
                Facility and installation components can be scored two ways — toggled via the Dashboard filters.{' '}
                <span className="font-medium text-slate-600">Per 100k veterans</span> (default) normalizes by veteran population so small states that proportionally serve veterans well aren't penalized against large-population states.{' '}
                <span className="font-medium text-slate-600">Raw count</span> mode scores based on absolute facility numbers.
              </p>
              <div className="text-xs space-y-1 pt-1">
                <div className="font-medium text-slate-600 mb-1.5">Formula components (max 100 pts):</div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">VA Medical Centers <span className="text-slate-400">(per 100k vets × 12)</span></span>
                  <span className="font-mono text-slate-500">cap 30</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">VA Clinics <span className="text-slate-400">(per 100k vets × 6)</span></span>
                  <span className="font-mono text-slate-500">cap 15</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Military Installations <span className="text-slate-400">(per 100k vets × 6)</span></span>
                  <span className="font-mono text-slate-500">cap 10</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Reg. & license perks <span className="text-slate-400">(count × 2)</span></span>
                  <span className="font-mono text-slate-500">cap 10</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Medal & disability honors <span className="text-slate-400">(count × 2)</span></span>
                  <span className="font-mono text-slate-500">cap 10</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Education programs <span className="text-slate-400">(count × 2)</span></span>
                  <span className="font-mono text-slate-500">cap 15</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500">Property tax exemption <span className="text-slate-400">(100% disabled)</span></span>
                  <span className="font-mono text-slate-500">0 / 6 / 10</span>
                </div>
                <div className="pl-2 text-[11px] text-slate-400 mt-0.5">None = 0 · Partial = 6 · Full = 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score tiers */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Score Tiers</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">Elite</span>
            <span className="text-xs text-emerald-600">95 – 100</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-blue-700">Strong</span>
            <span className="text-xs text-blue-600">85 – 94</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-yellow-700">Moderate</span>
            <span className="text-xs text-yellow-600">70 – 84</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-slate-600">Weak</span>
            <span className="text-xs text-slate-500">&lt; 70</span>
          </div>
        </div>
      </div>

      <SourceNote>
        Curated scoring formula based on available data.
        Default weights (40 / 30 / 30) are adjustable via the Filters panel on the Dashboard.
        All underlying data sources are documented on the respective data tabs.
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
