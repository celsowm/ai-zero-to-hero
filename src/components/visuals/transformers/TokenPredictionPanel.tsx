import React from 'react';
import type { InferenceSnapshot } from './useGpt2InferenceEngine';
import { sw } from '../../../theme/tokens';

interface Props {
  snap: InferenceSnapshot;
  copy: {
    nextTokenLabel: string;
    topTokensLabel: string;
    tokenLabel: string;
    idLabel: string;
    tensorShapesLabel: string;
    wteLabel: string;
    wpeLabel: string;
    cAttnLabel: string;
    cFcLabel: string;
    lmHeadLabel: string;
  };
}

export const TokenPredictionPanel = React.memo(({ snap, copy }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Next token highlight */}
      {snap.nextToken && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 12,
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {copy.nextTokenLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 800, color: '#e2e8f0' }}>
                "{snap.nextToken.text}"
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--sw-text-dim)' }}>
                {copy.idLabel}: {snap.nextToken.id}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#86efac' }}>
                {(snap.nextToken.prob * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top tokens bar chart */}
      {snap.probs && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
            {copy.topTokensLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {snap.probs.map((tok, i) => {
              const isMax = i === 0;
              const pct = tok.prob * 100;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 60,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: isMax ? '#e2e8f0' : 'var(--sw-text-dim)',
                    fontWeight: isMax ? 700 : 400,
                    textAlign: 'right',
                  }}>
                    "{tok.text}"
                  </div>
                  <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.04)', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: `${pct * 4}%`,
                      height: '100%',
                      borderRadius: 4,
                      background: isMax ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)',
                      transition: 'width 0.3s ease',
                    }} />
                    <span style={{
                      position: 'absolute',
                      right: 6,
                      top: 1,
                      fontSize: 9,
                      fontWeight: 700,
                      color: isMax ? '#00e5ff' : 'var(--sw-text-dim)',
                    }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Logits info */}
      {snap.logits && (
        <div style={{
          padding: '8px 12px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.25)',
          border: `1px solid ${sw.borderSubtle}`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--sw-text-dim)',
        }}>
          {copy.tokenLabel}: [1, 4, 50257]
        </div>
      )}

      {/* Tensor shapes summary */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
          {copy.tensorShapesLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
          <div style={{ color: 'var(--sw-text-dim)' }}>
            <span style={{ color: sw.cyan }}>wte</span>: [50257, 768]
          </div>
          <div style={{ color: 'var(--sw-text-dim)' }}>
            <span style={{ color: sw.cyan }}>wpe</span>: [1024, 768]
          </div>
          <div style={{ color: 'var(--sw-text-dim)' }}>
            <span style={{ color: sw.purple }}>c_attn</span>: [768, 2304]
          </div>
          <div style={{ color: 'var(--sw-text-dim)' }}>
            <span style={{ color: sw.orange }}>c_fc</span>: [768, 3072]
          </div>
          <div style={{ color: 'var(--sw-text-dim)' }}>
            <span style={{ color: sw.pink }}>lm_head</span>: [768, 50257]
          </div>
        </div>
      </div>
    </div>
  );
});
