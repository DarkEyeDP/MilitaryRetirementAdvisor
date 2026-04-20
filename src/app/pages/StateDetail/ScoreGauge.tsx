import { useState, useEffect, useRef } from 'react';

export function SectionMeter({ score, color }: { score: number; color: string }) {
  const [animVal, setAnimVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const to = score;
    let rafId: number;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      fromRef.current = current;
      setAnimVal(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  return (
    <div className="relative h-1.5 bg-slate-100 rounded-full mb-2.5 overflow-visible">
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${animVal}%`, backgroundColor: color }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm"
        style={{ left: `calc(${animVal}% - 6px)`, backgroundColor: color }}
      />
    </div>
  );
}

export function ScoreGauge({
  score,
  label,
  subItems,
}: {
  score: number;
  label: string;
  subItems: { label: string; value: string; badge?: { text: string; color: string } | null }[];
}) {
  const cx = 60, cy = 56, r = 48, sw = 11;
  const arcLen = Math.PI * r;
  const fullPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  const [animVal, setAnimVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const to = score;
    let rafId: number;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / 700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      fromRef.current = current;
      setAnimVal(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  const fillColor =
    score >= 85 ? '#16a34a'
    : score >= 75 ? '#2563eb'
    : score >= 65 ? '#d97706'
    : '#94a3b8';

  const dashoffset = arcLen * (1 - animVal / 100);
  const tipθ = ((180 - animVal * 1.8) * Math.PI) / 180;
  const tipX = cx + r * Math.cos(tipθ);
  const tipY = cy - r * Math.sin(tipθ);

  return (
    <div className="flex flex-col items-center px-4">
      <svg viewBox="0 0 120 68" className="w-full max-w-[180px]" aria-label={`${label}: ${score} out of 100`}>
        <path d={fullPath} fill="none" stroke="#e2e8f0" strokeWidth={sw} strokeLinecap="round" />
        <path
          d={fullPath}
          fill="none"
          stroke={fillColor}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={dashoffset}
        />
        {animVal > 2 && (
          <circle cx={tipX.toFixed(2)} cy={tipY.toFixed(2)} r={3} fill="white" />
        )}
        <text x={cx} y={48} textAnchor="middle" fontSize="22" fontWeight="700" fill={fillColor}>
          {Math.round(animVal)}
        </text>
        <text x={cx} y={62} textAnchor="middle" fontSize="8.5" fill="#94a3b8">
          / 100
        </text>
      </svg>
      <p className="text-xs font-semibold text-slate-600 -mt-1 mb-2.5 text-center">{label}</p>
      <div className="w-full space-y-1.5">
        {subItems.map((it) => (
          <div key={it.label} className="flex justify-between items-center text-xs text-slate-400 gap-1">
            <span>{it.label}</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-600">{it.value}</span>
              {it.badge && (
                <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded-full leading-none ${it.badge.color}`}>
                  {it.badge.text}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
