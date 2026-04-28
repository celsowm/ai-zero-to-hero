import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { UnembeddingDiagramCopy } from '../../../types/slide';

interface UnembeddingDiagramProps {
  copy: UnembeddingDiagramCopy;
}

export const UnembeddingDiagram = React.memo(({ copy }: UnembeddingDiagramProps) => {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const vocabTokens = ['of', 'the', 'people', 'united', 'states', 'nation', 'world'];
  const logits = [8.7, 6.2, 4.1, 3.5, 2.9, 1.8, 0.5];
  const maxLogit = Math.max(...logits);

  // Softmax
  const exps = logits.map(l => Math.exp(l - maxLogit));
  const sumExp = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / sumExp);

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
      gap: '28px',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Flow diagram */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
        {/* Input vector */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: `2px solid ${sw.purple}`,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', color: sw.textMuted, marginBottom: '4px' }}>{copy.vectorLabel}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: sw.purple,
            fontWeight: '600'
          }}>
            [0.82, -0.34, ...]
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '2px', background: sw.textMuted }} />
          <div style={{ fontSize: '10px', color: sw.textMuted }}>×</div>
        </div>

        {/* Unembedding matrix */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255, 46, 151, 0.1)',
          border: `2px solid ${sw.pink}`,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', color: sw.textMuted, marginBottom: '4px' }}>{copy.vocabLabel}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: sw.pink,
            fontWeight: '600'
          }}>
            50,256 × 768
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '2px', background: sw.textMuted }} />
          <div style={{ fontSize: '10px', color: sw.textMuted }}>→</div>
        </div>

        {/* Output logits */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(34, 211, 238, 0.1)',
          border: `2px solid ${sw.cyan}`,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', color: sw.textMuted, marginBottom: '4px' }}>{copy.logitsLabel}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: sw.cyan,
            fontWeight: '600'
          }}>
            [8.7, 6.2, ...]
          </div>
        </div>
      </div>

      {/* Logits bars with vocab tokens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {vocabTokens.map((token, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredToken(i)}
            onMouseLeave={() => setHoveredToken(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              background: hoveredToken === i ? 'rgba(255,255,255,0.05)' : 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
          >
            <div style={{
              width: '60px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              fontWeight: '600',
              color: i === 0 ? sw.cyan : sw.text,
              textAlign: 'right'
            }}>
              {token}
            </div>
            <div style={{
              flex: 1,
              height: '24px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${(logits[i] / maxLogit) * 100}%`,
                height: '100%',
                background: i === 0
                  ? `linear-gradient(90deg, ${sw.cyan}, ${sw.pink})`
                  : `rgba(255,255,255,0.1)`,
                borderRadius: '6px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{
              width: '50px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: sw.textMuted,
              textAlign: 'right'
            }}>
              {(probs[i] * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

    </div>
  );
});
