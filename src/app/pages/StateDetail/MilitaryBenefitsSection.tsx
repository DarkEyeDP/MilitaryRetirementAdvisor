import { motion } from 'motion/react';
import { Star, CheckCircle2, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import type { StateData } from '../../data/stateData';
import { getSpaceATerminalsByProximity } from '../../data/spaceATerminals';

export function MilitaryBenefitsSection({ state }: { state: StateData }) {
  const { inState, bordering } = getSpaceATerminalsByProximity(state.id);
  const total = inState.length + bordering.length;

  return (
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
              className="flex items-start gap-3 px-0 py-1.5 sm:p-3 sm:rounded-lg sm:border sm:border-slate-100 sm:bg-white sm:hover:bg-slate-50 sm:hover:border-slate-200 transition-colors"
            >
              <div className="w-1 self-stretch rounded-full bg-blue-400 flex-shrink-0" />
              <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {total > 0 && (
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        )}
      </CardContent>
    </Card>
  );
}
