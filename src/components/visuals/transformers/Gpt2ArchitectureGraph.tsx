import React from 'react';
import type { InferenceSnapshot } from './useGpt2InferenceEngine';
import { sw } from '../../../theme/tokens';

interface Props {
  snap: InferenceSnapshot;
  copy: {
    archLabel: string;
    inputTokensLabel: string;
    currentTensorLabel: string;
    attentionWeightsLabel: string;
    logitsLabel: string;
    stageLabels: string[];
  };
  phase: string;
  onHover?: (text: string | null) => void;
}

const PHASE_TO_STAGE: Record<string, number> = {
  embedding: 0,
  attention: 2,
  mlp: 3,
  residual: 4,
  finalNorm: 5,
  lmHead: 6,
  softmax: 7,
  nextToken: 7,
};

const STAGE_ICONS = ['📦', '📍', '🔮', '🧠', '➕', '📐', '🎯', '📊'];
const STAGE_COLORS = [sw.cyan, sw.cyan, sw.purple, sw.orange, sw.green, sw.cyan, sw.pink, sw.yellow];

export const Gpt2ArchitectureGraph = React.memo(({ snap, copy, phase, onHover }: Props) => {
  const activeStage = PHASE_TO_STAGE[phase] ?? 0;

  return (
    <div style={{ width: '100%', height: '100%', padding: 16, overflow: 'auto', fontFamily: "'Inter', sans-serif" }}>
      {/* Token IDs */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 8 }}>
          {copy.inputTokensLabel}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['We', 'the', 'people', 'of'].map((tok, i) => (
            <div key={i} style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(0,229,255,0.12)',
              border: '1px solid rgba(0,229,255,0.25)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#00e5ff' }}>"{tok}"</div>
              <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', marginTop: 2 }}>ID: {[964, 372, 6616, 286][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {copy.stageLabels.map((label, idx) => {
          const isDone = idx < activeStage;
          const isCurrent = idx === activeStage;
          const color = STAGE_COLORS[idx] ?? sw.cyan;
          const icon = STAGE_ICONS[idx] ?? '⚙️';
          return (
            <div key={idx}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: isCurrent ? `${color}18` : isDone ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: isCurrent ? `1px solid ${color}40` : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={() => onHover?.(label)}
                onMouseLeave={() => onHover?.(null)}
              >
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? color : isDone ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                }}>
                  {label}
                </span>
                {isCurrent && (
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }} />
                )}
              </div>
              {idx < copy.stageLabels.length - 1 && (
                <div style={{
                  width: 2,
                  height: 6,
                  marginLeft: 18,
                  background: isDone ? `${sw.cyan}30` : 'rgba(255,255,255,0.06)',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Shape info */}
      <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: `1px solid ${sw.borderSubtle}` }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: sw.cyan, marginBottom: 6 }}>{copy.currentTensorLabel}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#e2e8f0' }}>
          {snap.hiddenState.shape}
        </div>
        <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginTop: 4 }}>
          {snap.hiddenState.description}
        </div>
        {snap.attention && (
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: sw.purple, marginBottom: 4 }}>{copy.attentionWeightsLabel}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e2e8f0' }}>
              {snap.attention.shape}
            </div>
            <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginTop: 2 }}>
              {snap.attention.pattern}
            </div>
          </div>
        )}
        {snap.logits && (
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: sw.pink, marginBottom: 4 }}>{copy.logitsLabel}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e2e8f0' }}>
              {snap.logits.shape}
            </div>
            <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginTop: 2 }}>
              {snap.logits.description}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}` }} />
    </div>
  );
});
