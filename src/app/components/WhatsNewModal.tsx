import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee } from 'lucide-react';
import { WHATS_NEW_VERSION } from '../data/siteConfig';
import { whatsNewEntries, whatsNewReleaseLabel, type BadgeType } from '../data/whatsNew';

const LS_KEY = 'whats-new-seen';

const BADGE_MAP: Record<BadgeType, { label: string; className: string }> = {
  new:         { label: 'New Feature', className: 'bg-blue-600    text-white' },
  data:        { label: 'Data Update', className: 'bg-emerald-600 text-white' },
  improvement: { label: 'Improvement', className: 'bg-slate-600   text-white' },
  fix:         { label: 'Bug Fix',     className: 'bg-red-600     text-white' },
};

export function WhatsNewModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(LS_KEY);
    if (seen !== WHATS_NEW_VERSION) {
      const t = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    try { localStorage.setItem(LS_KEY, WHATS_NEW_VERSION); } catch { /* storage unavailable */ }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 pointer-events-auto flex flex-col" style={{ maxHeight: '70vh' }}>

              {/* Header */}
              <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-slate-900 text-white px-2 py-0.5 rounded uppercase tracking-wide">What&apos;s New</span>
                    <span className="text-xs text-slate-400">{whatsNewReleaseLabel}</span>
                  </div>
                  <button
                    onClick={dismiss}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-1.5">Site Updates &amp; New Features</h2>
              </div>

              {/* Update list — scrollable */}
              <div className="overflow-y-auto flex-1 px-5 py-3 space-y-3">
                {whatsNewEntries.map((entry, i) => {
                  const badge = BADGE_MAP[entry.badge];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.16, ease: 'easeOut' }}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide ${badge.className}`}>{badge.label}</span>
                        <span className="text-xs font-semibold text-slate-800">{entry.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{entry.body}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Thank-you + dismiss */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex-shrink-0 space-y-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 space-y-2">
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">Thank you to everyone who has supported this project.</span> Your contributions directly fund data maintenance, hosting, and new features — this site exists because of you.
                  </p>
                  <a
                    href="https://buymeacoffee.com/staymarinesim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold text-[11px] px-2.5 py-1.5 rounded-md transition-colors"
                  >
                    <Coffee className="w-3 h-3" />
                    Buy Me a Coffee
                  </a>
                </div>
                <button
                  onClick={dismiss}
                  className="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors"
                >
                  Got it, let&apos;s go
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
