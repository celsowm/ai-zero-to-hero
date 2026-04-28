import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { LayerEvolutionChartCopy } from '../../../types/slide';

interface LayerEvolutionChartProps {
  copy: LayerEvolutionChartCopy;
}

// Predictions per layer based on slide content
const layerPredictions = [
  { top: 'are', prob: 0.35, runnerUp: 'have', runnerUpProb: 0.22 },
  { top: 'is', prob: 0.28, runnerUp: 'are', runnerUpProb: 0.25 },
  { top: 'have', prob: 0.20, runnerUp: 'are', runnerUpProb: 0.18 },
  { top: 'of', prob: 0.22, runnerUp: 'are', runnerUpProb: 0.20 },
  { top: 'of', prob: 0.35, runnerUp: 'United', runnerUpProb: 0.18 },
  { top: 'of', prob: 0.48, runnerUp: 'United', runnerUpProb: 0.15 },
  { top: 'of', prob: 0.62, runnerUp: 'the', runnerUpProb: 0.10 },
  { top: 'of', prob: 0.71, runnerUp: 'American', runnerUpProb: 0.08 },
  { top: 'of', prob: 0.78, runnerUp: 'United', runnerUpProb: 0.07 },
  { top: 'of', prob: 0.82, runnerUp: 'this', runnerUpProb: 0.05 },
  { top: 'of', prob: 0.87, runnerUp: 'the', runnerUpProb: 0.04 },
  { top: 'of', prob: 0.92, runnerUp: 'this', runnerUpProb: 0.02 },
];

export const LayerEvolutionChart = React.memo(({ copy }: LayerEvolutionChartProps) => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Title */}
      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        color: sw.textMuted,
        fontWeight: '500'
      }}>
        &ldquo;We the people &hellip;&rdquo;
      </div>

      {/* Layer predictions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {layerPredictions.map((pred, i) => {
          const layerNum = i + 1;
          const isSelected = selectedLayer === i;
          const isEarly = i < 3;
          const isMid = i >= 3 && i < 7;

          const phaseColor = isEarly ? sw.text : isMid ? sw.purple : sw.cyan;

          return (
            <React.Fragment key={i}>
              <div
                onClick={() => setSelectedLayer(isSelected ? null : i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  background: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{
                  width: '28px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: phaseColor,
                  fontWeight: '600',
                  textAlign: 'right'
                }}>
                  {copy.layerLabel} {layerNum}
                </div>

                {/* Top prediction bar */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '50px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    fontWeight: '700',
                    color: i >= 3 ? sw.cyan : sw.text,
                    textAlign: 'right'
                  }}>
                    {pred.top}
                  </div>
                  <div style={{
                    flex: 1,
                    height: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${pred.prob * 100}%`,
                      height: '100%',
                      background: i >= 3
                        ? `linear-gradient(90deg, ${sw.cyan}, ${sw.purple})`
                        : `rgba(255,255,255,0.12)`,
                      borderRadius: '6px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <div style={{
                    width: '40px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: sw.textMuted
                  }}>
                    {(pred.prob * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Selected layer detail */}
              {isSelected && (
                <div style={{
                  marginLeft: '40px',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: sw.textMuted,
                  display: 'flex',
                  gap: '16px'
                }}>
                  <span>{copy.predictionLabel}: <strong style={{ color: sw.cyan }}>{pred.top}</strong></span>
                  <span>2º: <strong style={{ color: sw.text }}>{pred.runnerUp}</strong> ({(pred.runnerUpProb * 100).toFixed(0)}%)</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
});
