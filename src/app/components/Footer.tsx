import { useNavigate } from 'react-router';
import { SiteLogo } from './ui/SiteLogo';
import { trackEvent } from '../lib/analytics';

function CrayonIcon({ className }: { className?: string }) {
  return <img src="/emojione-monotone--crayon.png" alt="" aria-hidden="true" className={className} />;
}
import { DATA_YEAR, LAST_UPDATED } from '../data/siteConfig';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SiteLogo className="w-5 h-5" />
              <span className="font-semibold text-white text-base">MilRetired.com</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Helping service members and their families make informed decisions about where to retire —
              based on taxes, veteran benefits, cost of living, and more.
            </p>
            <span className="inline-block text-xs text-slate-500 border border-slate-700 px-2.5 py-1 rounded-full">
              {DATA_YEAR} Updated Data
            </span>
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-1">Data corrections, site feedback, or suggestions? Reach me at</p>
              <a
                href="mailto:darkeyegraphics@gmail.com"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                onClick={() => trackEvent('footer_click', { link_label: 'email' })}
              >
                darkeyegraphics@gmail.com
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => { navigate('/dashboard'); trackEvent('footer_click', { link_label: 'state_comparison_dashboard' }); }}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  State Comparison Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/compare'); trackEvent('footer_click', { link_label: 'compare_states' }); }}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Compare States Side-by-Side
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/sources'); trackEvent('footer_click', { link_label: 'data_sources' }); }}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Data Sources &amp; Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/sitemap'); trackEvent('footer_click', { link_label: 'sitemap' }); }}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Site Map
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="order-first md:order-none">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Support This Project</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              If this tool helped you plan your retirement, consider buying me a crayon. It helps keep the data updated and the site running.
            </p>
            <a
              href="https://buymeacoffee.com/staymarinesim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              onClick={() => trackEvent('footer_click', { link_label: 'buy_me_a_crayon' })}
            >
              <CrayonIcon className="w-4 h-4" />
              <span>Buy Me a Crayon</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Important Notice</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              All financial projections are <strong className="text-slate-400 font-medium">estimates only</strong> based
              on state averages and user-provided inputs. They do not constitute financial, tax, or legal advice and
              should not be the sole basis for any relocation or retirement decision.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              Consult a qualified financial planner, tax professional, or military benefits counselor before
              making major financial decisions. Tax laws, benefit programs, and cost figures change annually —
              always verify with official government sources.
            </p>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              VA disability rates sourced from VA.gov. State tax data reflects {DATA_YEAR} statutes.
              Cost of living data from the Council for Community and Economic Research (C2ER).
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <span>© {DATA_YEAR} Military Retirement Advisor. Data updated {LAST_UPDATED}.</span>
          <span className="text-center">
            This site uses Google Analytics to understand usage patterns. No personally identifiable information is collected.{' '}
            <button
              onClick={() => { navigate('/privacy', { replace: true }); trackEvent('footer_click', { link_label: 'privacy_policy' }); }}
              className="text-xs text-slate-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </span>
          <span className="sm:text-right">
            Not affiliated with the U.S. Department of Defense or the Department of Veterans Affairs.
          </span>
        </div>

      </div>
    </footer>
  );
}
