import { motion } from 'motion/react';
import { Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import type { StateData } from '../../data/stateData';

export function SummaryCard({ state, computedScore }: { state: StateData; computedScore: number }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          {computedScore >= 85
            ? <Star className="w-5 h-5 text-green-500" />
            : computedScore >= 70
              ? <CheckCircle2 className="w-5 h-5 text-blue-500" />
              : <AlertCircle className="w-5 h-5 text-amber-500" />}
          Why {state.name}{' '}
          {computedScore >= 85 ? 'is Great' : computedScore >= 70 ? 'Could Work' : 'May Challenge'}{' '}
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
  );
}
