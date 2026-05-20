import React, { useEffect, useMemo, useState } from 'react';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';
import type { CodeExplanation, CodeSourceRef } from '../../../types/slide';

export interface PytorchEmbeddingLogitsContractCopy {
  tabs: Array<{ label: string }>;
  codePanel: {
    title: string;
    description: string;
    source: CodeSourceRef;
    codeExplanations?: CodeExplanation[];
  };
  blueprintPanel: {
    title: string;
    subtitle?: string;
    stages: Array<{
      label: string;
      title: string;
      shape: string;
      body: string;
      reading: string;
    }>;
    diagnosticsTitle: string;
    diagnostics: string[];
    footer?: string;
  };
  interactive?: {
    title?: string;
    subtitle?: string;
    sliders?: { batch?: string; time?: string; channels?: string; vocab?: string };
    legend?: { idx?: string; hidden?: string; logits?: string; loss?: string; next?: string };
    playLabel?: string;
    pauseLabel?: string;
    resetLabel?: string;
  };
}

interface Props {
  copy: PytorchEmbeddingLogitsContractCopy;
}

const STAGE_COLORS = [sw.cyan, sw.purple, sw.pink, '#f59e0b', sw.green];

// Synthetic but stable data for visualization
function makeIdx(B: number, T: number, V: number): number[][] {
  const out: number[][] = [];
  let seed = 7;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let b = 0; b < B; b++) {
    const row: number[] = [];
    for (let t = 0; t < T; t++) row.push(Math.floor(next() * V));
    out.push(row);
  }
  return out;
}

function makeEmbeddingTensor(B: number, T: number, C: number, idx: number[][]): number[][][] {
  const out: number[][][] = [];
  for (let b = 0; b < B; b++) {
    const row: number[][] = [];
    for (let t = 0; t < T; t++) {
      const channel: number[] = [];
      const base = (idx[b][t] * 0.137) % 1;
      for (let c = 0; c < C; c++) channel.push((Math.sin(base * 7 + c * 0.6) + 1) / 2);
      row.push(channel);
    }
    out.push(row);
  }
  return out;
}

function makeLogitsTensor(B: number, T: number, V: number, idx: number[][]): number[][][] {
  const out: number[][][] = [];
  for (let b = 0; b < B; b++) {
    const row: number[][] = [];
    for (let t = 0; t < T; t++) {
      const vocab: number[] = [];
      const target = idx[b][t];
      for (let v = 0; v < V; v++) {
        const d = Math.abs(v - target);
        vocab.push(Math.max(0, 1 - d / Math.max(2, V / 2)) + Math.sin(v * 0.7 + t) * 0.12);
      }
      row.push(vocab);
    }
    out.push(row);
  }
  return out;
}

const heatColor = (v: number, accent: string) => {
  const clamped = Math.max(0, Math.min(1, v));
  const a = (clamped * 0.85 + 0.1).toFixed(2);
  return `${accent}${Math.round(Number(a) * 255).toString(16).padStart(2, '0')}`;
};

// Grid renderers
const IdxGrid: React.FC<{ idx: number[][]; cell?: number }> = ({ idx, cell = 30 }) => (
  <div style={{ display: 'inline-grid', gridTemplateRows: `repeat(${idx.length}, ${cell}px)`, gap: 4 }}>
    {idx.map((row, b) => (
      <div key={b} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, ${cell}px)`, gap: 4 }}>
        {row.map((v, t) => (
          <div
            key={t}
            style={{
              width: cell,
              height: cell,
              borderRadius: 6,
              background: `${sw.cyan}22`,
              border: `1px solid ${sw.cyan}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: sw.fontMono,
              fontSize: 11,
              fontWeight: 700,
              color: sw.cyan,
            }}
          >
            {v}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const ChannelStrip: React.FC<{ values: number[]; accent: string; w?: number; h?: number }> = ({
  values, accent, w = 60, h = 22,
}) => {
  const each = w / values.length;
  return (
    <svg width={w} height={h} role="img" aria-hidden>
      {values.map((v, i) => (
        <rect
          key={i}
          x={i * each}
          y={0}
          width={Math.max(1, each - 0.5)}
          height={h}
          fill={heatColor(v, accent)}
        />
      ))}
    </svg>
  );
};

const HiddenGrid: React.FC<{ H: number[][][]; accent: string }> = ({ H, accent }) => (
  <div style={{ display: 'inline-grid', gridTemplateRows: `repeat(${H.length}, auto)`, gap: 4 }}>
    {H.map((row, b) => (
      <div key={b} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, auto)`, gap: 4 }}>
        {row.map((channel, t) => (
          <div
            key={t}
            style={{
              padding: 3,
              borderRadius: 6,
              background: `${accent}10`,
              border: `1px solid ${accent}55`,
            }}
          >
            <ChannelStrip values={channel} accent={accent} w={Math.max(40, channel.length * 6)} h={20} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const LogitsGrid: React.FC<{
  L: number[][][];
  accent: string;
  highlightLast?: boolean;
  flat?: boolean;
}> = ({ L, accent, highlightLast, flat }) => {
  const B = L.length;
  const T = L[0]?.length ?? 0;
  if (flat) {
    // (B*T, V) layout - tall column
    const flatList: { v: number[]; b: number; t: number }[] = [];
    for (let b = 0; b < B; b++) for (let t = 0; t < T; t++) flatList.push({ v: L[b][t], b, t });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {flatList.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: sw.fontMono,
                fontSize: 9,
                color: sw.textMuted,
                width: 30,
                textAlign: 'right',
              }}
            >
              [{item.b},{item.t}]
            </div>
            <div style={{
              padding: 2,
              borderRadius: 5,
              background: `${accent}10`,
              border: `1px solid ${accent}55`,
            }}>
              <ChannelStrip values={item.v} accent={accent} w={Math.max(70, item.v.length * 4)} h={16} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-grid', gridTemplateRows: `repeat(${B}, auto)`, gap: 4 }}>
      {L.map((row, b) => (
        <div key={b} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, auto)`, gap: 4 }}>
          {row.map((vocab, t) => {
            const isLast = highlightLast && t === T - 1;
            return (
              <div
                key={t}
                style={{
                  padding: 3,
                  borderRadius: 6,
                  background: isLast ? `${accent}30` : `${accent}10`,
                  border: `1px solid ${isLast ? accent : `${accent}55`}`,
                  boxShadow: isLast ? `0 0 0 2px ${accent}33` : 'none',
                }}
              >
                <ChannelStrip values={vocab} accent={accent} w={Math.max(48, vocab.length * 4)} h={18} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const SliceGrid: React.FC<{ L: number[][][]; accent: string }> = ({ L, accent }) => {
  const lastSlice = L.map(row => row[row.length - 1]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {lastSlice.map((vocab, b) => (
        <div
          key={b}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div style={{ fontFamily: sw.fontMono, fontSize: 9, color: sw.textMuted, width: 22 }}>b={b}</div>
          <div style={{ padding: 3, borderRadius: 6, background: `${accent}14`, border: `1px solid ${accent}66` }}>
            <ChannelStrip values={vocab} accent={accent} w={Math.max(80, vocab.length * 5)} h={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

const LossOrb: React.FC<{ value: number; accent: string }> = ({ value, accent }) => (
  <div
    style={{
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${accent}cc, ${accent}33 60%, transparent 80%)`,
      border: `2px solid ${accent}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: `0 0 28px ${accent}55`,
    }}
  >
    <div style={{ fontSize: 10, color: sw.text, opacity: 0.8 }}>loss</div>
    <div style={{ fontFamily: sw.fontMono, fontSize: 18, fontWeight: 800, color: '#fff' }}>{value.toFixed(2)}</div>
    <div style={{ fontSize: 9, color: sw.text, opacity: 0.7 }}>scalar</div>
  </div>
);

export const PytorchEmbeddingLogitsContract = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [B, setB] = useState(2);
  const [T, setT] = useState(4);
  const [C, setC] = useState(8);
  const [V, setV] = useState(12);
  const [playing, setPlaying] = useState(false);

  const stages = copy.blueprintPanel.stages;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActiveStage(s => (s + 1) % stages.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [playing, stages.length]);

  const idx = useMemo(() => makeIdx(B, T, V), [B, T, V]);
  const H = useMemo(() => makeEmbeddingTensor(B, T, C, idx), [B, T, C, idx]);
  const L = useMemo(() => makeLogitsTensor(B, T, V, idx), [B, T, V, idx]);
  const loss = useMemo(() => {
    let s = 0;
    for (let b = 0; b < B; b++) for (let t = 0; t < T; t++) s += Math.abs(L[b][t][idx[b][t]] - 1);
    return s / (B * T) + 0.45;
  }, [B, T, L, idx]);

  const i18n = copy.interactive ?? {};
  const sliders = i18n.sliders ?? {};
  const legend = i18n.legend ?? {};
  const stage = stages[activeStage] ?? stages[0];
  const accent = STAGE_COLORS[activeStage % STAGE_COLORS.length];

  const renderStage = () => {
    switch (activeStage) {
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: sw.cyan, textTransform: 'uppercase' }}>
              {legend.idx ?? 'idx (B,T) — integer ids'}
            </div>
            <IdxGrid idx={idx} />
          </div>
        );
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: sw.purple, textTransform: 'uppercase' }}>
              {legend.hidden ?? 'H (B,T,C) — continuous vectors'}
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <IdxGrid idx={idx} cell={22} />
              <div style={{ fontSize: 18, color: sw.purple, fontWeight: 800 }}>→</div>
              <HiddenGrid H={H} accent={sw.purple} />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: sw.pink, textTransform: 'uppercase' }}>
              {legend.logits ?? 'logits (B,T,V) — non-normalized scores'}
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <HiddenGrid H={H} accent={sw.purple} />
              <div style={{ fontSize: 18, color: sw.pink, fontWeight: 800 }}>→</div>
              <LogitsGrid L={L} accent={sw.pink} />
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: '#f59e0b', textTransform: 'uppercase' }}>
              {legend.loss ?? '(B*T, V) vs (B*T) — cross-entropy'}
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <LogitsGrid L={L} accent="#f59e0b" flat />
              <div style={{ fontSize: 18, color: '#f59e0b', fontWeight: 800 }}>→</div>
              <LossOrb value={loss} accent="#f59e0b" />
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: sw.green, textTransform: 'uppercase' }}>
              {legend.next ?? 'logits[:, -1, :] → (B,V) — next token'}
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <LogitsGrid L={L} accent={sw.green} highlightLast />
              <div style={{ fontSize: 18, color: sw.green, fontWeight: 800 }}>→</div>
              <SliceGrid L={L} accent={sw.green} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const slider = (
    label: string,
    value: number,
    setter: (v: number) => void,
    min: number,
    max: number,
    color: string,
  ) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color, textTransform: 'uppercase' }}>
        {label} = {value}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        style={{ accentColor: color }}
      />
    </label>
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar
        ariaLabel={copy.tabs[0]?.label ?? 'Tabs'}
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.codePanel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.codePanel.description}</div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <CodeBlock
                language="python"
                code=""
                sourceRef={copy.codePanel.source}
                explanations={copy.codePanel.codeExplanations}
              />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 14 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: sw.text }}>
                {i18n.title ?? copy.blueprintPanel.title}
              </div>
              {(i18n.subtitle ?? copy.blueprintPanel.subtitle) && (
                <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                  {i18n.subtitle ?? copy.blueprintPanel.subtitle}
                </div>
              )}
            </div>

            {/* Stage buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`, gap: 6 }}>
              {stages.map((item, index) => {
                const color = STAGE_COLORS[index % STAGE_COLORS.length];
                const isActive = index === activeStage;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setActiveStage(index); setPlaying(false); }}
                    style={{
                      border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                      borderRadius: 10,
                      background: isActive ? `${color}1e` : sw.surface,
                      padding: '8px 8px',
                      cursor: 'pointer',
                      color: isActive ? color : sw.textDim,
                      textAlign: 'left',
                      boxShadow: isActive ? `0 8px 20px ${color}22` : 'none',
                    }}
                  >
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {item.label}
                    </div>
                    <div style={{ marginTop: 3, fontSize: 11, fontWeight: 700, lineHeight: 1.3, color: isActive ? sw.text : sw.textDim }}>
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sliders + play */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) auto',
              gap: 10,
              alignItems: 'end',
              padding: 10,
              borderRadius: 12,
              background: sw.surface,
              border: `1px solid ${sw.borderSubtle}`,
            }}>
              {slider(sliders.batch ?? 'B', B, setB, 1, 3, sw.cyan)}
              {slider(sliders.time ?? 'T', T, setT, 2, 6, sw.purple)}
              {slider(sliders.channels ?? 'C', C, setC, 4, 12, sw.pink)}
              {slider(sliders.vocab ?? 'V', V, setV, 6, 18, sw.green)}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => setPlaying(p => !p)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: `1px solid ${accent}`,
                    background: `${accent}1e`,
                    color: accent,
                    fontWeight: 800,
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {playing ? (i18n.pauseLabel ?? '⏸ Pause') : (i18n.playLabel ?? '▶ Play')}
                </button>
                <button
                  type="button"
                  onClick={() => { setPlaying(false); setActiveStage(0); }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 10,
                    border: `1px solid ${sw.borderSubtle}`,
                    background: sw.surface,
                    color: sw.textDim,
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {i18n.resetLabel ?? '↺'}
                </button>
              </div>
            </div>

            {/* Stage visualization */}
            <div
              style={{
                border: `1px solid ${accent}55`,
                borderRadius: 16,
                background: `linear-gradient(180deg, ${accent}0d, rgba(255,255,255,0.01))`,
                padding: 16,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent }}>
                    {stage.label}
                  </div>
                  <div style={{ marginTop: 3, fontSize: 14, fontWeight: 700, color: sw.text }}>{stage.title}</div>
                </div>
                <div
                  style={{
                    fontFamily: sw.fontMono,
                    fontSize: 12,
                    fontWeight: 700,
                    color: accent,
                    background: `${accent}14`,
                    border: `1px solid ${accent}55`,
                    borderRadius: 8,
                    padding: '4px 8px',
                  }}
                >
                  {stage.shape}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                {renderStage()}
              </div>

              <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>{stage.body}</div>
              <div style={{ fontSize: 11, lineHeight: 1.5, color: sw.textMuted, fontStyle: 'italic' }}>
                {stage.reading}
              </div>
            </div>

            {/* Diagnostics */}
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, background: sw.surface, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
                {copy.blueprintPanel.diagnosticsTitle}
              </div>
              <ul style={{ marginTop: 8, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {copy.blueprintPanel.diagnostics.map((d, i) => (
                  <li key={i} style={{ fontSize: 12, lineHeight: 1.5, color: sw.textDim }}>{d}</li>
                ))}
              </ul>
            </div>

            {copy.blueprintPanel.footer && (
              <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.blueprintPanel.footer}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
