import React, { useState, useMemo, useCallback } from 'react';
import { sw } from '../../../theme/tokens';

interface MoeRouterSimulatorCopy {
  tokenLabel: string;
  expertLabel: string;
  scoreLabel: string;
  selectToken: string;
  routingStep1: string;
  routingStep2: string;
  routingStep3: string;
  routingStep4: string;
}

interface MoeRouterSimulatorProps {
  copy: MoeRouterSimulatorCopy;
}

// Token types with their "semantic profiles" (pretend embedding)
const TOKEN_TYPES = [
  { id: 'verb', label: 'Verbo (correr)', icon: '🏃', color: '#06b6d4' },
  { id: 'noun', label: 'Substantivo (gato)', icon: '🐱', color: '#8b5cf6' },
  { id: 'adj', label: 'Adjetivo (rápido)', icon: '⚡', color: '#f59e0b' },
  { id: 'pronoun', label: 'Pronome (ele)', icon: '👤', color: '#10b981' },
  { id: 'prep', label: 'Preposição (de)', icon: '🔗', color: '#ec4899' },
  { id: 'punct', label: 'Pontuação (,)', icon: '❗', color: '#6b7280' },
];

const NUM_EXPERTS = 8;
const TOP_K = 2;

// Simulated routing scores per token type (softmax-like distribution)
const ROUTING_PROFILES: Record<string, number[]> = {
  verb: [0.42, 0.35, 0.05, 0.03, 0.04, 0.06, 0.03, 0.02],
  noun: [0.03, 0.04, 0.38, 0.32, 0.06, 0.05, 0.07, 0.05],
  adj: [0.08, 0.06, 0.28, 0.35, 0.10, 0.05, 0.04, 0.04],
  pronoun: [0.15, 0.12, 0.08, 0.06, 0.32, 0.14, 0.08, 0.05],
  prep: [0.05, 0.06, 0.10, 0.08, 0.15, 0.35, 0.12, 0.09],
  punct: [0.08, 0.10, 0.06, 0.07, 0.12, 0.14, 0.25, 0.18],
};

export const MoeRouterSimulator = React.memo(({ copy }: MoeRouterSimulatorProps) => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0); // 0-4

  const tokenData = useMemo(() => {
    if (!selectedToken) return null;
    const scores = ROUTING_PROFILES[selectedToken];
    const topIndices = scores
      .map((score, idx) => ({ score, idx }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K)
      .map(x => x.idx);
    return { scores, topIndices };
  }, [selectedToken]);

  const handleTokenSelect = useCallback((tokenId: string) => {
    setSelectedToken(tokenId);
    setAnimationStep(1);
    // Animate through steps
    setTimeout(() => setAnimationStep(2), 400);
    setTimeout(() => setAnimationStep(3), 1000);
    setTimeout(() => setAnimationStep(4), 1800);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedToken(null);
    setAnimationStep(0);
  }, []);

  const stepTexts = [
    copy.selectToken,
    copy.routingStep1,
    copy.routingStep2,
    copy.routingStep3,
    copy.routingStep4,
  ];

  return (
    <div style={{
      width: '100%',
      padding: '28px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', fontSize: '13px', color: sw.textMuted, fontWeight: '500' }}>
        MoE Router Simulator — Top-{TOP_K} de {NUM_EXPERTS} experts
      </div>

      {/* Token selector */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.text, marginBottom: '10px' }}>
          {copy.tokenLabel}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {TOKEN_TYPES.map((token) => {
            const isSelected = selectedToken === token.id;
            return (
              <button
                key={token.id}
                onClick={() => handleTokenSelect(token.id)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${token.color}` : '1px solid rgba(255,255,255,0.12)',
                  background: isSelected ? `${token.color}18` : 'rgba(255,255,255,0.03)',
                  color: isSelected ? token.color : sw.text,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: isSelected ? '700' : '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '20px' }}>{token.icon}</span>
                <span style={{ fontSize: '10px', lineHeight: '1.2' }}>{token.label.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animation stepper */}
      {selectedToken && (
        <>
          <div style={{
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '12px',
            color: sw.text,
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: sw.cyan,
              color: sw.surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '800',
            }}>
              {animationStep}
            </span>
            {stepTexts[animationStep]}
          </div>

          {/* Expert scores visualization */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: sw.text, marginBottom: '12px' }}>
              {copy.expertLabel} Scores (softmax)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {tokenData?.scores.map((score, idx) => {
                const isTopK = tokenData?.topIndices.includes(idx);
                const barWidth = score * 100;
                const selectedTokenData = TOKEN_TYPES.find(t => t.id === selectedToken);
                const tokenColor = selectedTokenData?.color || sw.cyan;

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: animationStep >= 2 ? 1 : 0.3,
                      transition: `opacity 0.4s ease ${idx * 0.05}s`,
                    }}
                  >
                    <span style={{
                      width: '56px',
                      fontSize: '11px',
                      fontWeight: isTopK ? '700' : '500',
                      color: isTopK ? tokenColor : sw.textMuted,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {copy.expertLabel} {idx + 1}
                    </span>
                    <div style={{
                      flex: 1,
                      height: '24px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: `${barWidth}%`,
                        height: '100%',
                        background: isTopK
                          ? `linear-gradient(90deg, ${tokenColor}, ${tokenColor}88)`
                          : 'rgba(255,255,255,0.08)',
                        borderRadius: '6px',
                        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isTopK ? `0 0 10px ${tokenColor}50` : 'none',
                      }} />
                    </div>
                    <span style={{
                      width: '48px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: isTopK ? tokenColor : sw.textMuted,
                      fontFamily: "'JetBrains Mono', monospace",
                      textAlign: 'right',
                    }}>
                      {(score * 100).toFixed(1)}%
                    </span>
                    {isTopK && animationStep >= 3 && (
                      <span style={{ fontSize: '14px' }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary stats */}
          {animationStep >= 4 && (
            <div style={{
              padding: '14px 18px',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '10px',
              fontSize: '12px',
              color: sw.text,
              lineHeight: '1.6',
            }}>
              <strong style={{ color: sw.cyan }}>Roteamento:</strong> Token "{TOKEN_TYPES.find(t => t.id === selectedToken)?.label}"
              → ativa <strong style={{ color: sw.cyan }}>{copy.expertLabel} {tokenData?.topIndices.map(i => i + 1).join(' + ')}</strong>
              <br />
              <span style={{ color: sw.textMuted, fontSize: '11px' }}>
                Eficiência: {((TOP_K / NUM_EXPERTS) * 100).toFixed(0)}% dos parâmetros usados neste forward pass
              </span>
            </div>
          )}

          {/* Reset button */}
          <button
            onClick={handleReset}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: sw.textMuted,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
              (e.target as HTMLButtonElement).style.color = sw.text;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              (e.target as HTMLButtonElement).style.color = sw.textMuted;
            }}
          >
            ↺ Reset simulação
          </button>
        </>
      )}
    </div>
  );
});
