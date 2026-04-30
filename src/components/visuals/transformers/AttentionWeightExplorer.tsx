import React, { useState, useEffect, useRef } from 'react';
import { sw } from '../../../theme/tokens';

export interface AttentionWeightExplorerCopy {
  title: string;
  subtitle: string;
  clickHint: string;
  queryLabel: string;
  keyLabel: string;
  attentionWeightLabel: string;
  contextMeaningLabel: string;
  beforeLabel: string;
  afterLabel: string;
  sentenceTokens: string[];
  // attention[queryIdx][keyIdx] = weight 0..1
  attentionMatrix: number[][];
  // meaning shift per query token: before → after absorbing attention context
  meaningBefore: string[];
  meaningAfter: string[];
  insightTitle: string;
  insights: string[];
}

interface Props {
  copy: AttentionWeightExplorerCopy;
}

const ACCENT_COLORS = ['#00e5ff', '#a855f7', '#ff2e97', '#f59e0b', '#22c55e', '#f97316'];

function useAnimatedWeights(target: number[], duration = 500) {
  const [current, setCurrent] = useState(target.map(() => 0));
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef<number[]>(target.map(() => 0));

  useEffect(() => {
    fromRef.current = current;
    startRef.current = null;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCurrent(fromRef.current.map((from, i) => from + (target[i] - from) * ease));
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.join(','), duration]);

  return current;
}

export const AttentionWeightExplorer = React.memo(({ copy }: Props) => {
  const tokens = copy.sentenceTokens;
  const n = tokens.length;
  const [selectedQuery, setSelectedQuery] = useState(n - 1);
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);

  const rawWeights = copy.attentionMatrix[selectedQuery] ?? tokens.map(() => 1 / n);
  const animWeights = useAnimatedWeights(rawWeights);
  const maxW = Math.max(...animWeights, 0.001);

  const queryColor = ACCENT_COLORS[selectedQuery % ACCENT_COLORS.length];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gap: 16,
      fontFamily: sw.fontSans,
    }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
          {copy.title}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sw-text)', lineHeight: 1.3 }}>
          {copy.subtitle}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--sw-text-dim)', marginTop: 2 }}>
          {copy.clickHint}
        </div>
      </div>

      {/* ── Main area ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        minHeight: 0,
      }}>
        {/* Left: Token grid + attention bars */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 0,
        }}>
          {/* Token selector row */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: `1px solid ${sw.borderSubtle}`,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 10 }}>
              {copy.queryLabel}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tokens.map((token, i) => {
                const isSelected = i === selectedQuery;
                const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedQuery(i)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 999,
                      fontSize: 14,
                      fontWeight: isSelected ? 800 : 600,
                      fontFamily: sw.fontSans,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: isSelected ? `${color}22` : 'rgba(255,255,255,0.04)',
                      border: isSelected ? `1.5px solid ${color}` : '1.5px solid rgba(255,255,255,0.1)',
                      color: isSelected ? color : 'var(--sw-text-dim)',
                      boxShadow: isSelected ? `0 0 18px ${color}30` : 'none',
                      transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                    }}
                  >
                    {token}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attention weight bars */}
          <div style={{
            flex: 1,
            minHeight: 0,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: `1px solid ${sw.borderSubtle}`,
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
              {copy.attentionWeightLabel}
            </div>
            {tokens.map((token, ki) => {
              const w = animWeights[ki] ?? 0;
              const pct = maxW > 0 ? (w / maxW) * 100 : 0;
              const color = ACCENT_COLORS[ki % ACCENT_COLORS.length];
              const isHovered = hoveredKey === ki;
              const isMax = ki === animWeights.indexOf(Math.max(...animWeights));

              return (
                <div
                  key={ki}
                  onMouseEnter={() => setHoveredKey(ki)}
                  onMouseLeave={() => setHoveredKey(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 44px',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'default',
                    transition: 'opacity 0.2s',
                    opacity: isHovered ? 1 : 0.85,
                  }}
                >
                  <div style={{
                    fontSize: 12.5,
                    fontWeight: isMax ? 800 : 600,
                    color: isMax ? color : 'var(--sw-text-dim)',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {token}
                  </div>
                  <div style={{
                    height: 10,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${pct}%`,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${color}99, ${color})`,
                      boxShadow: isMax ? `0 0 10px ${color}66` : 'none',
                      transition: 'box-shadow 0.3s',
                    }} />
                  </div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isMax ? color : 'var(--sw-text-muted)',
                    textAlign: 'right',
                  }}>
                    {(w * 100).toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Heatmap + meaning shift */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 0,
        }}>
          {/* Attention heatmap */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: `1px solid ${sw.borderSubtle}`,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 10 }}>
              {copy.keyLabel}
            </div>
            {/* Compact heatmap: query rows × key columns */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <td style={{ width: 52 }} />
                    {tokens.map((t, ki) => (
                      <td key={ki} style={{ textAlign: 'center', padding: '2px 2px 6px', fontSize: 10, fontWeight: 700, color: ki === selectedQuery ? queryColor : 'var(--sw-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.attentionMatrix.map((row, qi) => {
                    const isSelectedRow = qi === selectedQuery;
                    const rowColor = ACCENT_COLORS[qi % ACCENT_COLORS.length];
                    const rowMax = Math.max(...row, 0.001);
                    return (
                      <tr key={qi} style={{ cursor: 'pointer' }} onClick={() => setSelectedQuery(qi)}>
                        <td style={{
                          fontSize: 10,
                          fontWeight: isSelectedRow ? 800 : 600,
                          color: isSelectedRow ? rowColor : 'var(--sw-text-dim)',
                          paddingRight: 6,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {tokens[qi]}
                        </td>
                        {row.map((w, ki) => {
                          const intensity = w / rowMax;
                          const bg = isSelectedRow
                            ? `rgba(${hexToRgb(rowColor)}, ${0.1 + intensity * 0.7})`
                            : `rgba(255,255,255,${0.02 + intensity * 0.12})`;
                          return (
                            <td key={ki} title={`${(w * 100).toFixed(0)}%`} style={{
                              height: 28,
                              background: bg,
                              border: isSelectedRow && ki === animWeights.indexOf(Math.max(...animWeights))
                                ? `1.5px solid ${rowColor}88`
                                : '1px solid rgba(255,255,255,0.04)',
                              borderRadius: 5,
                              transition: 'background 0.4s',
                            }} />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Meaning shift card */}
          <div style={{
            flex: 1,
            minHeight: 0,
            background: `linear-gradient(135deg, ${queryColor}0d, rgba(255,255,255,0.02))`,
            borderRadius: 16,
            border: `1px solid ${queryColor}30`,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: queryColor }}>
              {copy.contextMeaningLabel} — <span style={{ fontWeight: 700, fontSize: 12 }}>{tokens[selectedQuery]}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 10, flex: 1 }}>
              {/* Before */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                padding: '10px 12px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 6 }}>
                  {copy.beforeLabel}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sw-text-dim)', lineHeight: 1.4 }}>
                  {copy.meaningBefore[selectedQuery]}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <defs>
                    <linearGradient id={`attn-arrow-${selectedQuery}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="100%" stopColor={queryColor} />
                    </linearGradient>
                  </defs>
                  <path d="M4 14 L20 14 M14 8 L20 14 L14 20" stroke={`url(#attn-arrow-${selectedQuery})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              {/* After */}
              <div style={{
                background: `${queryColor}12`,
                borderRadius: 12,
                padding: '10px 12px',
                border: `1px solid ${queryColor}35`,
                boxShadow: `0 0 20px ${queryColor}15`,
              }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: queryColor, marginBottom: 6 }}>
                  {copy.afterLabel}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text)', lineHeight: 1.4 }}>
                  {copy.meaningAfter[selectedQuery]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer: insight pills ── */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginRight: 4 }}>
          {copy.insightTitle}
        </span>
        {copy.insights.map((insight, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--sw-text-dim)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT_COLORS[i % ACCENT_COLORS.length], flexShrink: 0 }} />
            {insight}
          </span>
        ))}
      </div>
    </div>
  );
});

// Helper: convert hex color to "r,g,b" string for rgba()
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
