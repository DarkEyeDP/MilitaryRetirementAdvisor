import {
  VA_RATE_ALONE,
  VA_RATE_WITH_SPOUSE,
  VA_RATE_WITH_SPOUSE_ONE_CHILD,
  VA_RATE_ADDITIONAL_CHILD,
  VA_RATE_CHILD_NO_SPOUSE,
} from '../../data/vaRates';
import { DATA_YEAR, DATA_VINTAGES } from '../../data/siteConfig';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { AnimatedTabContent, MotionTr, SourceNote } from './shared';

const VA_RATINGS = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];

function fmt(n: number) {
  return n === 0 ? '—' : `$${n.toLocaleString()}`;
}

export function VADisabilityTab() {
  return (
    <AnimatedTabContent id="va-disability">
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">VA Disability Compensation Policy</p>
        <p>
          VA disability pay is <strong>always federally tax-exempt</strong> (38 U.S.C. § 5301) — no state can tax it.
          At 10% and 20%, the rate is the same regardless of dependents. At 30%+, veterans receive additional
          monthly compensation for a qualifying spouse and each dependent child under 18.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Monthly Compensation by Rating &amp; Dependents ({DATA_YEAR})</h3>
        <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Rating</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">No Dependents</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">With Spouse</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 1 Child</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 2 Children</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Spouse + 3 Children</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Child Only (No Spouse)</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Per Add&apos;l Child</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VA_RATINGS.map((r, i) => {
                const alone = VA_RATE_ALONE[r] ?? 0;
                const spouse = VA_RATE_WITH_SPOUSE[r] ?? 0;
                const spouse1 = VA_RATE_WITH_SPOUSE_ONE_CHILD[r] ?? 0;
                const addlChild = VA_RATE_ADDITIONAL_CHILD[r] ?? 0;
                const childOnly = VA_RATE_CHILD_NO_SPOUSE[r] ?? 0;
                const noSupplement = parseInt(r) < 30;
                return (
                  <MotionTr
                    key={r}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="border-b hover:bg-slate-50 transition-colors"
                  >
                    <TableCell>
                      <span className="font-semibold text-slate-800">{r}%</span>
                    </TableCell>
                    <TableCell className="text-slate-700">{fmt(alone)}</TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1 + addlChild)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(spouse1 + addlChild * 2)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-slate-700'}>
                      {noSupplement ? 'No supplement' : fmt(childOnly)}
                    </TableCell>
                    <TableCell className={noSupplement ? 'text-slate-400 text-xs' : 'text-green-700 font-medium'}>
                      {noSupplement ? '—' : `+$${addlChild}/mo`}
                    </TableCell>
                  </MotionTr>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* Mobile: one card per rating */}
        <div className="md:hidden divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
          {VA_RATINGS.map((r) => {
            const alone = VA_RATE_ALONE[r] ?? 0;
            const spouse = VA_RATE_WITH_SPOUSE[r] ?? 0;
            const spouse1 = VA_RATE_WITH_SPOUSE_ONE_CHILD[r] ?? 0;
            const addlChild = VA_RATE_ADDITIONAL_CHILD[r] ?? 0;
            const childOnly = VA_RATE_CHILD_NO_SPOUSE[r] ?? 0;
            const noSupplement = parseInt(r) < 30;
            return (
              <div key={r} className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-900 mb-2">{r}% Rating</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">No Dependents</p>
                    <p className="text-xs font-medium text-slate-700">{fmt(alone)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">With Spouse</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Spouse + 1 Child</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse1)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Spouse + 2 Children</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(spouse1 + addlChild)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Child Only (No Spouse)</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-slate-700'}`}>{noSupplement ? 'No supplement' : fmt(childOnly)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Per Add&apos;l Child</p>
                    <p className={`text-xs font-medium ${noSupplement ? 'text-slate-400' : 'text-green-700'}`}>{noSupplement ? '—' : `+$${addlChild}/mo`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">How Dependents Are Detected</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-slate-700 mb-1">Spouse</p>
            <p className="text-slate-500">Any household member with an <span className="font-mono bg-slate-100 px-1 rounded">Adult (19–64)</span> or <span className="font-mono bg-slate-100 px-1 rounded">Senior (65+)</span> age group. Maximum of one spouse counted.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-slate-700 mb-1">Dependent Children</p>
            <p className="text-slate-500">Any household member with age group <span className="font-mono bg-slate-100 px-1 rounded">Under 6</span>, <span className="font-mono bg-slate-100 px-1 rounded">6–12</span>, or <span className="font-mono bg-slate-100 px-1 rounded">13–18</span>. Each one counted separately.</p>
          </div>
        </div>
      </div>

      <SourceNote vintage={DATA_VINTAGES.vaRates}>
        Monthly compensation rates: VA.gov official {DATA_YEAR} rates, effective December 1, 2025 (2.8% COLA).
        Source URL: va.gov/disability/compensation-rates/veteran-rates/.
        Tax exemption authority: 38 U.S.C. § 5301. Dependent supplement policy: 38 CFR Part 3.
        Note: Dependent parent supplements and Aid &amp; Attendance are not modeled (verify at VA.gov).
      </SourceNote>
    </div>
    </AnimatedTabContent>
  );
}
