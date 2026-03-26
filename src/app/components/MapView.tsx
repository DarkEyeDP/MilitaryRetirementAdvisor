import { useState } from 'react';
import { StateData } from '../data/stateData';
import { useNavigate } from 'react-router';

interface MapViewProps {
  states: StateData[];
  customScores?: Record<string, number>;
}

export default function MapView({ states, customScores }: MapViewProps) {
  const navigate = useNavigate();
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22c55e'; // green
    if (score >= 80) return '#3b82f6'; // blue
    if (score >= 70) return '#eab308'; // yellow
    return '#94a3b8'; // slate
  };

  const handleStateHover = (state: StateData, event: React.MouseEvent) => {
    setHoveredState(state);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Interactive State Map</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-600">Score:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }}></div>
            <span>90+</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <span>80-89</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#eab308' }}></div>
            <span>70-79</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#94a3b8' }}></div>
            <span>&lt;70</span>
          </div>
        </div>
      </div>

      <div className="relative bg-slate-50 rounded-lg p-8 min-h-[500px]">
        {/* Simplified US Map Grid */}
        <div className="grid grid-cols-12 gap-2 max-w-5xl mx-auto">
          {states.map((state) => {
            const score = customScores?.[state.id] ?? state.retirementScore;
            const color = getScoreColor(score);

            return (
              <button
                key={state.id}
                onClick={() => navigate(`/state/${state.id}`)}
                onMouseEnter={(e) => handleStateHover(state, e)}
                onMouseLeave={() => setHoveredState(null)}
                className="aspect-square rounded flex items-center justify-center text-xs font-medium text-white hover:scale-110 transition-transform cursor-pointer shadow-sm"
                style={{
                  backgroundColor: color,
                  gridColumn: `${Math.floor(state.coordinates.x / 8.33) + 1}`,
                  gridRow: `${Math.floor(state.coordinates.y / 10) + 1}`,
                }}
                title={state.name}
              >
                {state.abbreviation}
              </button>
            );
          })}
        </div>

        {/* Tooltip */}
        {hoveredState && (
          <div
            className="fixed bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 120,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-sm font-semibold mb-2">{hoveredState.name}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Score:</span>
                <span className="font-medium">
                  {customScores?.[hoveredState.id] ?? hoveredState.retirementScore}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Military Pension Tax:</span>
                <span className="font-medium">{hoveredState.militaryPensionTax}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Cost of Living:</span>
                <span className="font-medium">{hoveredState.costOfLivingIndex}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Click on any state to view detailed information
      </div>
    </div>
  );
}
