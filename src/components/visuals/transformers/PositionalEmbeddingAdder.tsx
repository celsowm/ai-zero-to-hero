import React, { useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { PositionalEmbeddingAdderCopy } from '../../../types/slide';

interface PositionalEmbeddingAdderProps {
  copy: PositionalEmbeddingAdderCopy;
}

/* ── data ─── */
const TOKENS = [
  { word: 'We',     color: '#00e5ff', emb: [ 0.8, -0.2,  0.5,  0.1, -0.6,  0.3] },
  { word: 'the',    color: '#a855f7', emb: [-0.3,  0.6,  0.1, -0.4,  0.7, -0.1] },
  { word: 'people', color: '#facc15', emb: [ 0.4,  0.1, -0.8,  0.6,  0.2, -0.5] },
  { word: '.',      color: '#34d399', emb: [-0.1,  0.3,  0.2, -0.2, -0.1,  0.4] },
];

/* sinusoidal positional encoding (simplified 6-dim) */
function positionalEncoding(pos: number, _dim: number, dModel = 6): number[] {
  return Array.from({ length: dModel }, (_, i) => {
    if (i % 2 === 0) return Math.sin(pos / Math.pow(10000, (2 * i) / dModel));
    return Math.cos(pos / Math.pow(10000, (2 * (i - 1)) / dModel));
  });
}

const POS_EMB = TOKENS.map((_, i) => positionalEncoding(i, 6));

function valColor(v: number) {
  const clamped = Math.max(-1, Math.min(1, v));
  if (clamped >= 0) {
    const a = Math.max(0.15, clamped * 0.7);
    return { bg: `rgba(0,229,255,${a})`, border: 'rgba(0,229,255,0.3)', text: clamped > 0.4 ? '#fff' : 'var(--sw-text)' };
  }
  const a = Math.max(0.15, Math.abs(clamped) * 0.7);
  return { bg: `rgba(255,46,151,${a})`, border: 'rgba(255,46,151,0.3)', text: Math.abs(clamped) > 0.4 ? '#fff' : 'var(--sw-text)' };
}

function cellStyle(v: number, size: 'sm' | 'md' = 'sm') {
  const { bg, border, text } = valColor(v);
  return {
    width: size === 'sm' ? '38px' : '44px',
    height: size === 'sm' ? '28px' : '34px',
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: '4px',
    fontSize: size === 'sm' ? '10px' : '11px',
    fontWeight: 600,
    color: text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  } as React.CSSProperties;
}

/* ─── component ─── */
export const PositionalEmbeddingAdder = React.memo(({ copy }: PositionalEmbeddingAdderProps) => {
  const combined = useMemo(
    () => TOKENS.map((t, i) => ({
      word: t.word,
      color: t.color,
      emb: t.emb,
      pos: POS_EMB[i],
      sum: t.emb.map((v, j) => v + POS_EMB[i][j]),
    })),
    [],
  );

  const DIM_LABELS = ['d₀', 'd₁', 'd₂', 'd₃', 'd₄', 'd₅'];

  return (
    <div style={{
      width: '100%',
      padding: '28px 20px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{
          fontSize: '13px', fontWeight: 700, color: 'var(--sw-cyan)',
          background: 'rgba(0,229,255,0.1)', padding: '6px 16px', borderRadius: '8px',
          border: '1px solid rgba(0,229,255,0.2)',
        }}>
          {copy.tokenLabel}
        </span>
      </div>

      {/* flow: token → pos → sum */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {combined.map((row, ri) => (
          <div key={ri} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 12px',
            background: ri % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            {/* token word badge */}
            <div style={{
              width: '64px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: row.color,
              flexShrink: 0,
            }}>
              "{row.word}"
            </div>

            {/* token embedding bar */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {row.emb.map((v, j) => (
                <div key={j} style={cellStyle(v)} title={`${DIM_LABELS[j]}: ${v.toFixed(3)}`}>
                  {v.toFixed(1)}
                </div>
              ))}
            </div>

            {/* + */}
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sw-purple)', margin: '0 4px', flexShrink: 0 }}>+</div>

            {/* positional encoding bar */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {row.pos.map((v, j) => (
                <div key={j} style={{ ...cellStyle(v), background: v >= 0 ? `rgba(168,85,247,${Math.max(0.15, Math.abs(v) * 0.6)})` : `rgba(251,191,36,${Math.max(0.15, Math.abs(v) * 0.5)})`, borderColor: v >= 0 ? 'rgba(168,85,247,0.3)' : 'rgba(251,191,36,0.3)' }}>
                  {v.toFixed(1)}
                </div>
              ))}
            </div>

            {/* = */}
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sw-pink)', margin: '0 4px', flexShrink: 0 }}>=</div>

            {/* combined bar */}
            <div style={{ display: 'flex', gap: '2px', boxShadow: `0 0 12px ${row.color}22`, borderRadius: '6px' }}>
              {row.sum.map((v, j) => (
                <div key={j} style={{ ...cellStyle(v, 'md'), fontWeight: 700, border: `2px solid ${row.color}66` }}>
                  {v.toFixed(1)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* legend */}
      <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '11px', color: 'var(--sw-text-dim)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'rgba(0,229,255,0.5)', borderRadius: '3px', display: 'inline-block' }} />
          {copy.tokenVector}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'rgba(168,85,247,0.5)', borderRadius: '3px', display: 'inline-block' }} />
          {copy.posVector}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'rgba(0,229,255,0.3)', borderRadius: '3px', display: 'inline-block' }} />
          {copy.resultVector}
        </span>
      </div>

      {/* dimension labels */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginTop: '8px', marginRight: '200px' }}>
        {DIM_LABELS.map((d) => (
          <div key={d} style={{ width: '38px', textAlign: 'center', fontSize: '9px', color: 'var(--sw-text-muted)', fontFamily: 'monospace' }}>{d}</div>
        ))}
      </div>
    </div>
  );
});
