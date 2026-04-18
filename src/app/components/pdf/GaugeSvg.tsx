/**
 * GaugeSvg — static semicircle gauge for @react-pdf/renderer
 *
 * Draws the filled arc as an explicit computed path (no strokeDashoffset,
 * which @react-pdf/renderer does not support). Arc geometry matches the
 * animated ScoreGauge in StateDetail.tsx:
 *   cx=60, cy=56, r=48, strokeWidth=11
 *   score=0  → arc starts at left  (180°)
 *   score=100 → arc ends at right  (0°)
 *   angle = (180 − score × 1.8) × π/180
 */

import { Svg, Path, Circle, Text as PdfText } from '@react-pdf/renderer';
import { C } from './pdfStyles';

interface GaugeSvgProps {
  score: number;
  size?: number; // rendered width in PDF pts (default 110)
}

function scoreColor(score: number): string {
  if (score >= 85) return C.green;
  if (score >= 75) return C.blue;
  if (score >= 65) return C.amber;
  return C.slate400;
}

export function GaugeSvg({ score, size = 110 }: GaugeSvgProps) {
  const cx = 60, cy = 56, r = 48, sw = 11;
  const fillColor = scoreColor(score);

  // Full background track: left → right through the top (sweep=1 = clockwise in SVG)
  const fullPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Tip position (same angle mapping as animated gauge)
  const tipθ = ((180 - score * 1.8) * Math.PI) / 180;
  const tipX = +(cx + r * Math.cos(tipθ)).toFixed(2);
  const tipY = +(cy - r * Math.sin(tipθ)).toFixed(2);

  // Filled arc: always sweep=1, large-arc=0 (max 180° sweep for valid 0–100 scores)
  const filledPath =
    score <= 0
      ? null
      : score >= 100
      ? fullPath
      : `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${tipX} ${tipY}`;

  return (
    <Svg width={size} height={size * (68 / 120)} viewBox="0 0 120 68">
      {/* Background track */}
      <Path
        d={fullPath}
        stroke={C.slate200}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      {/* Filled arc */}
      {filledPath && (
        <Path
          d={filledPath}
          stroke={fillColor}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
      )}
      {/* Tip dot */}
      {score > 2 && score < 100 && (
        <Circle cx={tipX} cy={tipY} r={3} fill={C.white} />
      )}
      {/* Score number */}
      <PdfText
        x={cx}
        y={48}
        style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', fill: fillColor, textAnchor: 'middle' }}
      >
        {String(score)}
      </PdfText>
      {/* / 100 */}
      <PdfText
        x={cx}
        y={62}
        style={{ fontSize: 8.5, fill: C.slate400, textAnchor: 'middle' }}
      >
        / 100
      </PdfText>
    </Svg>
  );
}
