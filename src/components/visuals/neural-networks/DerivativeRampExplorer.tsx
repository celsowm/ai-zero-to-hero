import React, { useCallback, useState } from 'react';
import type { DerivativeRampExplorerCopy } from '../../../types/slide';

interface DerivativeRampExplorerProps {
  copy: DerivativeRampExplorerCopy;
}

// f(x) = x^2
const f = (x: number) => x * x;
// f'(x) = 2x
const fp = (x: number) => 2 * x;

const X_MIN = -3;
const X_MAX = 3;
const NUDGE = 0.001;

export const DerivativeRampExplorer = React.memo(({ copy }: DerivativeRampExplorerProps) => {
  const [xVal, setXVal] = useState(1.2);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setXVal(parseFloat(e.target.value));
  }, []);

  const fx = f(xVal);
  const fpx = fp(xVal);
  const fxNudged = f(xVal + NUDGE);
  const deltaOut = fxNudged - fx;
  const approx = deltaOut / NUDGE;

  // SVG chart dimensions
  const svgW = 340;
  const svgH = 180;
  const pad = { top: 16, right: 16, bottom: 28, left: 36 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // y range for x^2 on [-3, 3] is [0, 9]
  const yMin = 0;
  const yMax = 9;

  const toSvgX = (x: number) => pad.left + ((x - X_MIN) / (X_MAX - X_MIN)) * plotW;
  const toSvgY = (y: number) => pad.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

  // Build curve path
  const steps = 100;
  const curvePoints: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
    const y = f(x);
    const sx = toSvgX(x).toFixed(1);
    const sy = toSvgY(y).toFixed(1);
    curvePoints.push(`${i === 0 ? 'M' : 'L'}${sx},${sy}`);
  }
  const curvePath = curvePoints.join(' ');

  // Tangent line: y = f(x0) + f'(x0) * (x - x0)
  // Draw it over a small range around xVal
  const tanRange = 1.2;
  const tanX1 = xVal - tanRange;
  const tanX2 = xVal + tanRange;
  const tanY1 = fx + fpx * (tanX1 - xVal);
  const tanY2 = fx + fpx * (tanX2 - xVal);

  // Tangent color based on slope
  const tanColor = Math.abs(fpx) < 0.15 ? '#6b6280' : fpx > 0 ? '#10b981' : '#ef4444';
  const tanState = Math.abs(fpx) < 0.15 ? copy.flatLabel : fpx > 0 ? copy.uphillLabel : copy.downhillLabel;

  const sx = toSvgX(xVal);
  const sy = toSvgY(fx);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      background: 'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.08), transparent 32%), radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.08), transparent 28%), linear-gradient(180deg, rgba(8, 12, 24, 0.96), rgba(7, 10, 20, 0.98))',
      borderRadius: '18px',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',
      padding: '16px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#e8e4f0',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00e5ff' }}>
        {copy.eyebrow}
      </div>

      {/* SVG Chart */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}>
        <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: 'block' }}>
          {/* Grid */}
          {[-2, -1, 0, 1, 2, 3].map(x => (
            <line
              key={`gx-${x}`}
              x1={toSvgX(x)} y1={pad.top}
              x2={toSvgX(x)} y2={pad.top + plotH}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          {[0, 2, 4, 6, 8].map(y => (
            <line
              key={`gy-${y}`}
              x1={pad.left} y1={toSvgY(y)}
              x2={pad.left + plotW} y2={toSvgY(y)}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line
            x1={pad.left} y1={toSvgY(0)}
            x2={pad.left + plotW} y2={toSvgY(0)}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />

          {/* Curve */}
          <path d={curvePath} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />

          {/* Tangent line */}
          <line
            x1={toSvgX(tanX1)} y1={toSvgY(Math.max(yMin, Math.min(yMax, tanY1)))}
            x2={toSvgX(tanX2)} y2={toSvgY(Math.max(yMin, Math.min(yMax, tanY2)))}
            stroke={tanColor}
            strokeWidth="2"
            strokeDasharray={Math.abs(fpx) < 0.15 ? 'none' : '6,3'}
            opacity="0.85"
          />

          {/* Point on curve */}
          <circle cx={sx} cy={sy} r="5" fill={tanColor} opacity="0.3" />
          <circle cx={sx} cy={sy} r="3" fill={tanColor} />

          {/* X axis labels */}
          {[-2, -1, 0, 1, 2, 3].map(x => (
            <text
              key={`lx-${x}`}
              x={toSvgX(x)}
              y={svgH - 4}
              textAnchor="middle"
              fill="#6b6280"
              fontSize="10"
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            >
              {x}
            </text>
          ))}

          {/* Y axis labels */}
          {[0, 2, 4, 6, 8].map(y => (
            <text
              key={`ly-${y}`}
              x={pad.left - 4}
              y={toSvgY(y) + 3}
              textAnchor="end"
              fill="#6b6280"
              fontSize="10"
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            >
              {y}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '14px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '16px', height: '3px', background: '#a855f7', borderRadius: '2px' }} />
            <span style={{ color: '#b0a8c4' }}>{copy.functionLabel} = {copy.functionName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '16px', height: '3px', background: tanColor, borderRadius: '2px', borderStyle: Math.abs(fpx) >= 0.15 ? 'dashed' : 'solid' }} />
            <span style={{ color: tanColor, fontWeight: 700 }}>{copy.tangentLabel} ({tanState})</span>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6280' }}>
            {copy.sliderLabel}
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            color: '#00e5ff',
          }}>
            x = {xVal.toFixed(3)}
          </span>
        </div>
        <input
          type="range"
          min={X_MIN}
          max={X_MAX}
          step="0.01"
          value={xVal}
          onChange={handleSlider}
          style={{ width: '100%', accentColor: '#00e5ff', height: '4px' }}
        />
      </div>

      {/* Live math cards */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6280' }}>
          {copy.mathTitle}
        </div>

        {/* Direct values */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { label: copy.xLabel, value: xVal.toFixed(4), color: '#e8e4f0' },
            { label: copy.fxLabel, value: fx.toFixed(4), color: '#a855f7' },
            { label: copy.fxpLabel, value: fpx.toFixed(4), color: tanColor },
          ].map(item => (
            <div key={item.label} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              padding: '6px 8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6280', marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                color: item.color,
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Numerical approximation */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '8px',
          padding: '8px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          fontSize: '11.5px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: '#b0a8c4',
        }}>
          <div><span style={{ color: '#6b6280' }}>{copy.nudgedLabel}</span> = {(xVal + NUDGE).toFixed(4)}</div>
          <div><span style={{ color: '#6b6280' }}>{copy.fxnudgedLabel}</span> = {fxNudged.toFixed(6)}</div>
          <div><span style={{ color: '#6b6280' }}>{copy.deltaOutput}</span> = {deltaOut.toFixed(6)}</div>
          <div><span style={{ color: '#6b6280' }}>{copy.deltaInput}</span> = {NUDGE}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ color: '#6b6280' }}>{copy.approxLabel}</span>
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>{approx.toFixed(4)}</span>
            <span style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: Math.abs(approx - fpx) < 0.01 ? '#10b981' : '#f59e0b',
            }}>
              {Math.abs(approx - fpx) < 0.01 ? `✓ ${copy.matchLabel}` : '~'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
});
