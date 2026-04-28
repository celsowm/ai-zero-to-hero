import React, { useMemo } from 'react';
import type { Nf4QuantileVisualizerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Nf4QuantileVisualizerProps {
  copy: Nf4QuantileVisualizerCopy;
}

// Compute quantiles of standard normal for 16 levels
function normalQuantiles(n: number): number[] {
  // Approximation of inverse CDF (probit)
  const probs = Array.from({ length: n }, (_, i) => (i + 0.5) / n);
  // Simple approximation using rational function
  return probs.map(p => {
    if (p <= 0.5) {
      const t = Math.sqrt(-2 * Math.log(p + 0.0001));
      return -(t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t));
    }
    const t = Math.sqrt(-2 * Math.log(1 - p + 0.0001));
    return t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);
  });
}

// Bell curve y values for x in [-4, 4]
function bellCurve(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export const Nf4QuantileVisualizer = React.memo(({ copy }: Nf4QuantileVisualizerProps) => {
  const nf4Levels = useMemo(() => normalQuantiles(16), []);
  const uniformLevels = Array.from({ length: 16 }, (_, i) => -3.5 + (i * 7) / 15);

  // Bell curve data
  const bellPoints = 60;
  const bellData = Array.from({ length: bellPoints }, (_, i) => {
    const x = -4 + (i * 8) / (bellPoints - 1);
    return { x, y: bellCurve(x) };
  });

  const maxY = Math.max(...bellData.map(d => d.y));

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Bell curve with NF4 levels */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '12px' }}>
          {copy.normalFloatLabel}
        </div>
        <div style={{ position: 'relative', height: '140px', borderBottom: `2px solid ${sw.borderSubtle}` }}>
          {/* Bell curve SVG */}
          <svg width="100%" height="140" viewBox="0 0 400 140" preserveAspectRatio="none">
            <path
              d={bellData.map((d, i) => {
                const x = (d.x + 4) / 8 * 400;
                const y = 140 - (d.y / maxY) * 130;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke={sw.cyan}
              strokeWidth="2"
            />
            {/* NF4 level markers */}
            {nf4Levels.map((_, i) => {
              const x = (nf4Levels[i] + 4) / 8 * 400;
              return (
                <line key={i} x1={x} y1="0" x2={x} y2="140"
                  stroke={sw.purple} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
              );
            })}
          </svg>
          <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: sw.textDim }}>
            {copy.bellCurveLabel} — N(0, 1)
          </div>
        </div>
        <div style={{ fontSize: '10px', color: sw.purple, marginTop: '4px', textAlign: 'center' }}>
          {copy.quantileLabel}: {nf4Levels.map(l => l.toFixed(2)).join(', ')}
        </div>
      </div>

      {/* Uniform vs NF4 comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Uniform */}
        <div style={{
          padding: '14px',
          background: 'rgba(255, 46, 151, 0.06)',
          borderRadius: '10px',
          border: `1px solid ${sw.pink}33`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.pink, marginBottom: '8px' }}>
            {copy.uniformLabel}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '40px' }}>
            {uniformLevels.map((_, i) => (
              <div key={i} style={{
                width: '4px',
                height: '100%',
                background: sw.pink,
                opacity: 0.5,
                borderRadius: '1px',
              }} />
            ))}
          </div>
          <div style={{ fontSize: '10px', color: sw.textDim, marginTop: '6px' }}>
            {copy.spacedAtTails}
          </div>
        </div>

        {/* NormalFloat */}
        <div style={{
          padding: '14px',
          background: 'rgba(0, 229, 255, 0.06)',
          borderRadius: '10px',
          border: `1px solid ${sw.cyan}33`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.cyan, marginBottom: '8px' }}>
            {copy.normalFloatLabel}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '40px' }}>
            {nf4Levels.map((l, i) => {
              const centered = Math.abs(l) < 1 ? 1 : 0.5;
              return (
                <div key={i} style={{
                  width: '4px',
                  height: `${centered * 100}%`,
                  background: sw.cyan,
                  borderRadius: '1px',
                }} />
              );
            })}
          </div>
          <div style={{ fontSize: '10px', color: sw.textDim, marginTop: '6px' }}>
            {copy.denseNearZero}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        padding: '10px 14px',
        background: 'rgba(168, 85, 247, 0.08)',
        borderRadius: '10px',
        border: `1px solid ${sw.purple}33`,
        fontSize: '12px',
        color: sw.textDim,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span><strong style={{ color: sw.purple }}>{copy.level16Label}:</strong> {nf4Levels.length} níveis</span>
        <span><strong style={{ color: sw.cyan }}>{copy.precisionLabel}:</strong> 4 bits por peso</span>
      </div>
    </div>
  );
});
