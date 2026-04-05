import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Brand + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white text-base">Military Retirement Advisor</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Helping service members and their families make informed decisions about where to retire —
              based on taxes, veteran benefits, cost of living, and more.
            </p>
            <span className="inline-block text-xs text-slate-500 border border-slate-700 px-2.5 py-1 rounded-full">
              2026 Updated Data
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  State Comparison Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/compare')}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Compare States Side-by-Side
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/sources')}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Data Sources &amp; Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Important Notice</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This tool is for informational purposes only. Always verify data with official government
              sources before making relocation or financial decisions. Tax laws and benefit programs
              change annually.
            </p>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              VA disability rates sourced from VA.gov. State tax data reflects 2026 statutes.
              Cost of living data from the Council for Community and Economic Research (C2ER).
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <span>© 2026 Military Retirement Advisor. Data updated annually.</span>
          <span className="sm:text-right">
            Not affiliated with the U.S. Department of Defense or the Department of Veterans Affairs.
          </span>
        </div>

      </div>
    </footer>
  );
}
