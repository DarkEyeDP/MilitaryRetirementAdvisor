import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, LayoutDashboard, GitCompare, BookOpen, MapPin, Globe } from 'lucide-react';
import { statesData, TERRITORY_IDS } from '../data/stateData';

const states = statesData.filter((s) => !TERRITORY_IDS.has(s.id)).sort((a, b) => a.name.localeCompare(b.name));
const territories = statesData.filter((s) => TERRITORY_IDS.has(s.id)).sort((a, b) => a.name.localeCompare(b.name));

const MAIN_PAGES = [
  { label: 'Home', path: '/', description: 'Enter your profile and get personalized state rankings', icon: LayoutDashboard },
  { label: 'State Comparison Dashboard', path: '/dashboard', description: 'Browse, filter, and rank all 50 states + DC & territories', icon: LayoutDashboard },
  { label: 'Compare States Side-by-Side', path: '/compare', description: 'Compare up to 3 states with a full financial breakdown', icon: GitCompare },
  { label: 'Data Sources & Methodology', path: '/sources', description: 'How retirement scores are calculated and where data comes from', icon: BookOpen },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay, ease: 'easeOut' },
});

export default function Sitemap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <motion.div className="mb-8" {...fadeUp(0)}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Site Map</h1>
          <p className="text-slate-500">A full index of every page on Military Retirement Advisor.</p>
        </motion.div>

        {/* Main Pages */}
        <motion.section className="mb-10" {...fadeUp(0.08)}>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Main Pages</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {MAIN_PAGES.map(({ label, path, description, icon: Icon }, i) => (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-start gap-4 px-5 py-4 hover:bg-blue-50/50 transition-colors text-left group"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.12 + i * 0.06, ease: 'easeOut' }}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* State Pages */}
        <motion.section className="mb-10" {...fadeUp(0.38)}>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            States ({states.length})
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="columns-2 sm:columns-3 md:columns-4 gap-x-6">
              {states.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => navigate(`/state/${s.id}`)}
                  className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors text-left py-0.5 break-inside-avoid w-full"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: 0.42 + i * 0.012, ease: 'easeOut' }}
                >
                  <span className="text-xs text-slate-300 font-mono w-6 flex-shrink-0">{s.abbreviation}</span>
                  <span>{s.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Territory Pages */}
        <motion.section {...fadeUp(1.06)}>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            Territories & DC ({territories.length})
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="columns-2 sm:columns-3 gap-x-6">
              {territories.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => navigate(`/state/${s.id}`)}
                  className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors text-left py-0.5 break-inside-avoid w-full"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: 1.10 + i * 0.05, ease: 'easeOut' }}
                >
                  <span className="text-xs text-slate-300 font-mono w-6 flex-shrink-0">{s.abbreviation}</span>
                  <span>{s.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
