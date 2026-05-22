import React, { useState } from 'react';
import type { QkvIntuitionExplorerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface QkvIntuitionExplorerProps {
  copy: QkvIntuitionExplorerCopy;
}

const lanes = [
  { key: 'q', label: 'Q', color: sw.cyan },
  { key: 'k', label: 'K', color: sw.purple },
  { key: 'v', label: 'V', color: sw.pink },
] as const;

export const QkvIntuitionExplorer = React.memo(({ copy }: QkvIntuitionExplorerProps) => {
  const [selectedToken, setSelectedToken] = useState(copy.tokens.indexOf(copy.queryToken));
  const activeIndex = selectedToken >= 0 ? selectedToken : copy.tokens.length - 1;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 22,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeep,
      background: 'radial-gradient(circle at 20% 12%, rgba(0,229,255,0.09), transparent 30%), radial-gradient(circle at 82% 20%, rgba(255,46,151,0.09), transparent 30%), linear-gradient(180deg, rgba(10,12,20,0.96), rgba(7,8,14,0.98))',
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr auto',
      gap: 14,
      fontFamily: sw.fontSans,
      overflow: 'hidden',
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 5, fontSize: 15, fontWeight: 750, color: sw.text, lineHeight: 1.3 }}>
          {copy.subtitle}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center' }}>
        <StageBadge color={sw.cyan} label={copy.tokenLabel} value="x: (T,C)" />
        <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(0,229,255,0.45), rgba(168,85,247,0.45), rgba(255,46,151,0.45))' }} />
        <StageBadge color={sw.pink} label={copy.projectionLabel} value="qkv: (T,3C)" />
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '0.92fr 1.18fr', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 12, minHeight: 0 }}>
          <Panel title={copy.tokenLabel}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {copy.tokens.map((token, index) => (
                <button
                  key={token}
                  onClick={() => setSelectedToken(index)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr',
                    gap: 10,
                    alignItems: 'center',
                    padding: '9px 10px',
                    borderRadius: 14,
                    border: index === activeIndex ? `1px solid ${sw.cyan}` : '1px solid rgba(255,255,255,0.08)',
                    background: index === activeIndex ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.035)',
                    color: index === activeIndex ? sw.cyan : sw.textDim,
                    cursor: 'pointer',
                    fontFamily: sw.fontSans,
                    transition: sw.transitionFast,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 900 }}>{token}</span>
                  <VectorRow values={copy.xRows[index]} color={index === activeIndex ? sw.cyan : sw.textMuted} />
                </button>
              ))}
            </div>
          </Panel>

          <Panel title={copy.contextLabel}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {copy.valueMix.map((item, index) => {
                const weight = copy.weights[index] ?? 0;
                return (
                  <div key={item} style={{ display: 'grid', gridTemplateColumns: '82px 1fr', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 850, color: lanes[index % lanes.length].color }}>
                      {item}
                    </div>
                    <div style={{ height: 9, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
                      <div style={{
                        width: `${weight * 100}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${lanes[index % lanes.length].color}88, ${lanes[index % lanes.length].color})`,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 12, minHeight: 0 }}>
          <Panel title={copy.splitLabel}>
            <div style={{ perspective: 900, minHeight: 160 }}>
              <div style={{
                position: 'relative',
                height: 160,
                transformStyle: 'preserve-3d',
                transform: 'rotateX(57deg) rotateZ(-29deg)',
              }}>
                {lanes.map((lane, laneIndex) => {
                  const rows = lane.key === 'q' ? copy.qRows : lane.key === 'k' ? copy.kRows : copy.vRows;
                  return (
                    <div key={lane.key} style={{
                      position: 'absolute',
                      left: 42 + laneIndex * 78,
                      top: 14 + laneIndex * 18,
                      width: 176,
                      padding: 8,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${lane.color}24, rgba(255,255,255,0.035))`,
                      border: `1px solid ${lane.color}66`,
                      boxShadow: `0 18px 34px rgba(0,0,0,0.26), 0 0 22px ${lane.color}22`,
                    }}>
                      <div style={{ fontSize: 18, fontWeight: 950, color: lane.color, marginBottom: 7 }}>
                        {lane.label}
                      </div>
                      <MiniMatrix rows={rows} color={lane.color} activeRow={activeIndex} />
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 0 }}>
            <Panel title={copy.scoreLabel}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.tokens.map((token, index) => (
                  <ScoreRow
                    key={token}
                    token={token}
                    score={copy.scores[index] ?? 0}
                    active={index === activeIndex}
                  />
                ))}
              </div>
            </Panel>

            <Panel title={copy.softmaxLabel}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.tokens.map((token, index) => (
                  <WeightPill
                    key={token}
                    token={token}
                    weight={copy.weights[index] ?? 0}
                    active={index === activeIndex}
                  />
                ))}
              </div>
            </Panel>
          </div>

          <div style={{
            padding: '10px 12px',
            borderRadius: 16,
            background: 'linear-gradient(90deg, rgba(0,229,255,0.08), rgba(168,85,247,0.08))',
            border: '1px solid rgba(0,229,255,0.18)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.cyan }}>
              {copy.bridgeLabel}
            </div>
            <div style={{ marginTop: 5, fontSize: 13, fontWeight: 850, fontFamily: sw.fontMono, color: sw.text }}>
              {copy.bridgeText}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {copy.takeaways.map((takeaway, index) => (
          <div key={takeaway} style={{
            flex: 1,
            minWidth: 150,
            padding: '8px 10px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 11.5,
            fontWeight: 700,
            color: sw.textDim,
            lineHeight: 1.25,
          }}>
            <span style={{ color: lanes[index % lanes.length].color }}>●</span> {takeaway}
          </div>
        ))}
      </div>
    </div>
  );
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: 0,
      padding: 12,
      borderRadius: 18,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.insetHighlight,
      overflow: 'hidden',
    }}>
      <div style={{ marginBottom: 9, fontSize: 10, fontWeight: 950, letterSpacing: '0.11em', textTransform: 'uppercase', color: sw.textMuted }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function StageBadge({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div style={{
      padding: '9px 12px',
      borderRadius: 14,
      border: `1px solid ${color}55`,
      background: `${color}12`,
    }}>
      <div style={{ fontSize: 9, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>
        {label}
      </div>
      <div style={{ marginTop: 4, fontSize: 12.5, fontWeight: 850, fontFamily: sw.fontMono, color: sw.text }}>
        {value}
      </div>
    </div>
  );
}

function VectorRow({ values, color }: { values: number[]; color: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${values.length}, 1fr)`, gap: 4 }}>
      {values.map((value, index) => (
        <div key={index} style={{
          padding: '4px 0',
          borderRadius: 7,
          background: 'rgba(255,255,255,0.055)',
          color,
          fontSize: 10.5,
          fontWeight: 850,
          fontFamily: sw.fontMono,
          textAlign: 'center',
        }}>
          {value.toFixed(1)}
        </div>
      ))}
    </div>
  );
}

function MiniMatrix({ rows, color, activeRow }: { rows: number[][]; color: string; activeRow: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: 4 }}>
          {row.map((value, colIndex) => (
            <div key={colIndex} style={{
              height: 17,
              borderRadius: 5,
              background: rowIndex === activeRow ? `${color}44` : 'rgba(255,255,255,0.07)',
              border: rowIndex === activeRow ? `1px solid ${color}88` : '1px solid rgba(255,255,255,0.04)',
              color: sw.text,
              fontSize: 8.5,
              fontWeight: 850,
              fontFamily: sw.fontMono,
              textAlign: 'center',
              lineHeight: '15px',
            }}>
              {value.toFixed(value >= 1 ? 1 : 2)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ScoreRow({ token, score, active }: { token: string; score: number; active: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr 42px', gap: 7, alignItems: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 850, color: active ? sw.cyan : sw.textDim }}>{token}</div>
      <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(score, 1) * 100}%`, height: '100%', borderRadius: 999, background: active ? sw.cyan : sw.purple }} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 900, fontFamily: sw.fontMono, color: active ? sw.cyan : sw.textMuted, textAlign: 'right' }}>
        {score.toFixed(2)}
      </div>
    </div>
  );
}

function WeightPill({ token, weight, active }: { token: string; weight: number; active: boolean }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '58px 1fr',
      gap: 8,
      alignItems: 'center',
      padding: '6px 8px',
      borderRadius: 12,
      background: active ? 'rgba(0,229,255,0.09)' : 'rgba(255,255,255,0.035)',
      border: active ? '1px solid rgba(0,229,255,0.24)' : '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: 12, fontWeight: 850, color: active ? sw.cyan : sw.textDim }}>{token}</div>
      <div style={{ fontSize: 13, fontWeight: 950, color: active ? sw.cyan : sw.text, fontFamily: sw.fontMono }}>
        {(weight * 100).toFixed(0)}%
      </div>
    </div>
  );
}
