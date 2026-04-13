import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { DATA_YEAR } from '../data/siteConfig';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay, ease: 'easeOut' },
});

function Section({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.section className="mb-8" {...fadeUp(delay)}>
      <h2 className="text-base font-semibold text-slate-800 mb-3">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </motion.section>
  );
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <motion.div className="mb-10" {...fadeUp(0)}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Effective April 2026 &nbsp;·&nbsp; milretired.com
          </p>
        </motion.div>

        {/* Policy body */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8">

          <Section title="Overview" delay={0.06}>
            <p>
              Military Retirement Advisor ("this site", "we") is a free, informational tool that helps
              service members and their families evaluate retirement relocation options. We are committed
              to being transparent about the limited data this site collects and how it is used.
            </p>
            <p>
              This site has <strong>no user accounts, no sign-up forms, and no purchases.</strong> We do
              not collect your name, email address, Social Security number, military ID, or any other
              personally identifiable information (PII). Any financial figures you enter — retirement
              income, disability rating, family size — are stored only in your browser and are never
              transmitted to any server we operate.
            </p>
          </Section>

          <Section title="Information Collected Automatically" delay={0.1}>
            <p>
              When you visit this site, Google Analytics 4 (GA4) automatically collects certain
              non-identifying technical data, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pages visited and time spent on each page</li>
              <li>The type of device, browser, and operating system you are using</li>
              <li>Your approximate geographic location (country, state, and city — derived from your IP
                address; the full IP address is not stored by Google)</li>
              <li>How you arrived at the site (e.g., search engine, direct link)</li>
              <li>Interactions such as PDF exports and footer link clicks</li>
            </ul>
            <p>
              This data is aggregated and anonymous. It cannot be used to identify you individually.
            </p>
          </Section>

          <Section title="How We Use This Information" delay={0.14}>
            <p>
              Analytics data is used solely to understand how the site is used so we can improve it —
              for example, identifying which state pages are most visited, whether PDF exports are
              working correctly, and how users navigate between pages. We do not use this data for
              advertising, profiling, or any commercial purpose.
            </p>
          </Section>

          <Section title="Cookies & Browser Storage" delay={0.18}>
            <p>
              <strong>Google Analytics cookies:</strong> GA4 sets first-party cookies
              (e.g., <code className="bg-slate-100 px-1 rounded text-xs">_ga</code>,{' '}
              <code className="bg-slate-100 px-1 rounded text-xs">_ga_*</code>) in your browser to
              distinguish unique visitors and sessions. These cookies contain a randomly generated
              identifier and contain no personal data. They expire after 2 years and 24 hours,
              respectively.
            </p>
            <p>
              <strong>Local storage (browser only):</strong> This site saves your preferences —
              such as retirement income, disability rating, selected states, and filter settings —
              to your browser's local storage so you don't have to re-enter them on your next visit.
              This data never leaves your device and is not accessible to us or any third party.
              You can clear it at any time by clearing your browser's site data.
            </p>
          </Section>

          <Section title="Google Analytics" delay={0.22}>
            <p>
              This site uses Google Analytics 4, operated by Google LLC. Google may use the data it
              collects subject to its own privacy policy. For more information, see{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Privacy Policy
              </a>.
            </p>
            <p>
              You can opt out of Google Analytics tracking across all websites by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>. You can also manage or block cookies through your browser settings.
            </p>
          </Section>

          <Section title="Third-Party Links" delay={0.26}>
            <p>
              This site contains links to external websites, including VA.gov, state government sites,
              official data sources, and a voluntary support link (Buy Me a Coffee). These sites have
              their own privacy policies, which we do not control and are not responsible for. We
              recommend reviewing the privacy policy of any external site before providing information
              to it.
            </p>
          </Section>

          <Section title="Children's Privacy" delay={0.30}>
            <p>
              This site is intended for adults making retirement planning decisions and is not directed
              at children under 13. We do not knowingly collect any information from children.
            </p>
          </Section>

          <Section title="California Residents (CCPA)" delay={0.34}>
            <p>
              Under the California Consumer Privacy Act (CCPA), California residents have the right to
              know what personal information is collected about them and to request its deletion. As
              described above, we do not collect personal information directly. The only data collected
              is anonymous analytics data processed by Google.
            </p>
            <p>
              We do not sell personal information. We do not share personal information with third
              parties for cross-context behavioral advertising.
            </p>
          </Section>

          <Section title="Changes to This Policy" delay={0.38}>
            <p>
              We may update this policy as the site evolves. The effective date at the top of this page
              reflects the most recent revision. Continued use of the site after any changes constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact" delay={0.42}>
            <p>
              Questions about this policy or concerns about data handling? Reach out at{' '}
              <a
                href="mailto:darkeyegraphics@gmail.com"
                className="text-blue-600 hover:underline"
              >
                darkeyegraphics@gmail.com
              </a>.
            </p>
          </Section>

          <motion.p
            className="text-xs text-slate-400 border-t border-slate-100 pt-6 mt-2"
            {...fadeUp(0.46)}
          >
            © {DATA_YEAR} Military Retirement Advisor · milretired.com · Not affiliated with the U.S.
            Department of Defense or the Department of Veterans Affairs.
          </motion.p>

        </div>
      </div>
    </div>
  );
}
