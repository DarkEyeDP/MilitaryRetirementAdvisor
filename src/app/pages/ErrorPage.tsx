import { useState } from 'react';
import { useRouteError, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { AlertTriangle, Compass, RotateCcw, ArrowLeft, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);

  const is404 =
    !error ||
    (error instanceof Response && error.status === 404) ||
    (typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404);

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : JSON.stringify(error, null, 2);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center"
      >
        {is404 ? (
          <>
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <Compass className="w-7 h-7 text-slate-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Page Not Found</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-7">
              This page doesn't exist or may have moved. Use the links below to get back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Go Back
              </Button>
              <Button onClick={() => navigate('/dashboard')} className="gap-1.5">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              An unexpected error occurred. Try reloading or return to the dashboard.
            </p>
            {errorMessage && (
              <div className="mb-5 text-left">
                <button
                  onClick={() => setShowDetail((v) => !v)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors mx-auto"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetail ? 'rotate-180' : ''}`} />
                  {showDetail ? 'Hide' : 'Show'} error detail
                </button>
                {showDetail && (
                  <pre className="mt-2 text-xs text-left bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto text-red-700 whitespace-pre-wrap break-all">
                    {errorMessage}
                  </pre>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" onClick={() => window.location.reload()} className="gap-1.5">
                <RotateCcw className="w-4 h-4" /> Reload
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Go Back
              </Button>
              <Button onClick={() => navigate('/dashboard')} className="gap-1.5">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
