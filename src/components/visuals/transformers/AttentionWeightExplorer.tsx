import React, { useEffect, useRef, useState } from 'react';
import { sw } from '../../../theme/tokens';

export interface AttentionWeightExplorerCopy {
  title: string;
  subtitle: string;
  clickHint: string;
  queryLabel: string;
  keyLabel: string;
  attentionWeightLabel: string;
  contextMeaningLabel: string;
  scoreLabel: string;
  maskLabel: string;
  valueLabel: string;
  beforeLabel: string;
  afterLabel: string;
  sentenceTokens: string[];
  scoreMatrix: number[][];
  attentionMatrix: number[][];
  valueSummaries: string[];
  meaningBefore: string[];
  meaningAfter: string[];
  insightTitle: string;
  insights: string[];
}

interface Props {
  copy: AttentionWeightExplorerCopy;
}

const ACCENT_COLORS = ['#00e5ff', '#a855f7', '#ff2e97', '#f59e0b'];

function useAnimatedWeights(target: number[], duration = 420) {
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
      setCurrent(fromRef.current.map((from, i) => from + ((target[i] ?? 0) - from) * ease));
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.join(','), duration]);

  return current;
}

export const AttentionWeightExplorer = React.memo(({ copy }: Props) => {
  const tokens = copy.sentenceTokens;
  const [selectedQuery, setSelectedQuery] = useState(tokens.length - 1);
  const weights = copy.attentionMatrix[selectedQuery] ?? tokens.map(() => 1 / tokens.length);
  const scores = copy.scoreMatrix[selectedQuery] ?? tokens.map(() => 0);
  const animWeights = useAnimatedWeights(weights);
  const queryColor = ACCENT_COLORS[selectedQuery % ACCENT_COLORS.length];
  const strongestIndex = animWeights.indexOf(Math.max(...animWeights));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr auto',
      gap: 14,
      fontFamily: sw.fontSans,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700, color: 'var(--sw-text)', lineHeight: 1.3 }}>
          {copy.subtitle}
        </div>
        <div style={{ marginTop: 4, fontSize: 11.5, color: 'var(--sw-text-dim)' }}>
          {copy.clickHint}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 10,
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.035)',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)' }}>
          {copy.queryLabel}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tokens.map((token, index) => {
            const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
            const selected = index === selectedQuery;
            return (
              <button
                key={token}
                onClick={() => setSelectedQuery(index)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: selected ? `1.5px solid ${color}` : '1.5px solid rgba(255,255,255,0.1)',
                  background: selected ? `${color}22` : 'rgba(255,255,255,0.04)',
                  color: selected ? color : 'var(--sw-text-dim)',
                  fontFamily: sw.fontSans,
                  fontSize: 14,
                  fontWeight: selected ? 800 : 650,
                  cursor: 'pointer',
                  transform: selected ? 'translateY(-1px)' : 'none',
                  transition: 'all 0.18s ease',
                }}
              >
                {token}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <Panel title={copy.keyLabel}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 4, tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <td />
                  {tokens.map((token) => (
                    <td key={token} style={{ textAlign: 'center', fontSize: 10, fontWeight: 800, color: 'var(--sw-text-muted)' }}>
                      {token}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map((queryToken, rowIndex) => (
                  <tr key={queryToken} onClick={() => setSelectedQuery(rowIndex)} style={{ cursor: 'pointer' }}>
                    <td style={{
                      width: 54,
                      fontSize: 10,
                      fontWeight: rowIndex === selectedQuery ? 900 : 700,
                      color: rowIndex === selectedQuery ? queryColor : 'var(--sw-text-dim)',
                    }}>
                      {queryToken}
                    </td>
                    {tokens.map((_, colIndex) => {
                      const allowed = colIndex <= rowIndex;
                      const value = copy.attentionMatrix[rowIndex]?.[colIndex] ?? 0;
                      const active = rowIndex === selectedQuery;
                      return (
                        <td key={colIndex} style={{
                          height: 30,
                          borderRadius: 8,
                          textAlign: 'center',
                          fontSize: 10,
                          fontWeight: 800,
                          color: allowed ? 'var(--sw-text)' : 'var(--sw-text-muted)',
                          background: allowed
                            ? `rgba(${hexToRgb(active ? queryColor : '#ffffff')}, ${active ? 0.14 + value * 0.55 : 0.04 + value * 0.16})`
                            : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0 4px, rgba(255,255,255,0.01) 4px 8px)',
                          border: active ? `1px solid ${queryColor}55` : '1px solid rgba(255,255,255,0.05)',
                        }}>
                          {allowed ? `${Math.round(value * 100)}%` : 'mask'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title={copy.contextMeaningLabel}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'stretch' }}>
              <MeaningCard label={copy.beforeLabel} text={copy.meaningBefore[selectedQuery]} muted />
              <div style={{ alignSelf: 'center', color: queryColor, fontSize: 22, fontWeight: 900 }}>+</div>
              <MeaningCard label={copy.afterLabel} text={copy.meaningAfter[selectedQuery]} color={queryColor} />
            </div>
          </Panel>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <Panel title={copy.scoreLabel}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
              {tokens.map((token, index) => {
                const blocked = index > selectedQuery;
                return (
                  <MetricCard
                    key={token}
                    label={token}
                    value={blocked ? copy.maskLabel : (scores[index] ?? 0).toFixed(1)}
                    color={blocked ? 'var(--sw-text-muted)' : ACCENT_COLORS[index % ACCENT_COLORS.length]}
                    muted={blocked}
                  />
                );
              })}
            </div>
          </Panel>

          <Panel title={copy.attentionWeightLabel}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {tokens.map((token, index) => {
                const weight = animWeights[index] ?? 0;
                const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
                return (
                  <div key={token} style={{ display: 'grid', gridTemplateColumns: '62px 1fr 44px', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: index === strongestIndex ? 900 : 700, color }}>
                      {token}
                    </div>
                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{
                        width: `${weight * 100}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                        transition: 'width 0.2s ease',
                      }} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, textAlign: 'right', color: index === strongestIndex ? color : 'var(--sw-text-muted)' }}>
                      {Math.round(weight * 100)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title={copy.valueLabel}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tokens.map((token, index) => {
                const weight = animWeights[index] ?? 0;
                const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
                return (
                  <div key={token} style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 1fr',
                    gap: 8,
                    alignItems: 'center',
                    opacity: weight === 0 ? 0.45 : 1,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color }}>
                      {Math.round(weight * 100)}%
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--sw-text-dim)', lineHeight: 1.3 }}>
                      {copy.valueSummaries[index]}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)' }}>
          {copy.insightTitle}
        </span>
        {copy.insights.map((insight, index) => (
          <span key={insight} style={{
            padding: '5px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--sw-text-dim)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{ color: ACCENT_COLORS[index % ACCENT_COLORS.length] }}>●</span> {insight}
          </span>
        ))}
      </div>
    </div>
  );
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: 0,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${sw.borderSubtle}`,
    }}>
      <div style={{ marginBottom: 10, fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sw-text-muted)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function MetricCard({ label, value, color, muted = false }: { label: string; value: string; color: string; muted?: boolean }) {
  return (
    <div style={{
      padding: '10px 8px',
      borderRadius: 14,
      background: muted ? 'rgba(255,255,255,0.025)' : `${color}14`,
      border: muted ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${color}44`,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: muted ? 'var(--sw-text-muted)' : color }}>
        {label}
      </div>
      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 900, color: muted ? 'var(--sw-text-muted)' : 'var(--sw-text)' }}>
        {value}
      </div>
    </div>
  );
}

function MeaningCard({ label, text, color, muted = false }: { label: string; text?: string; color?: string; muted?: boolean }) {
  return (
    <div style={{
      padding: '10px 12px',
      borderRadius: 14,
      background: muted ? 'rgba(255,255,255,0.045)' : `${color}14`,
      border: muted ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${color}44`,
    }}>
      <div style={{ marginBottom: 6, fontSize: 9, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted ? 'var(--sw-text-muted)' : color }}>
        {label}
      </div>
      <div style={{ fontSize: 12, fontWeight: muted ? 650 : 800, lineHeight: 1.35, color: muted ? 'var(--sw-text-dim)' : 'var(--sw-text)' }}>
        {text}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  if (hex === '#ffffff') return '255,255,255';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
