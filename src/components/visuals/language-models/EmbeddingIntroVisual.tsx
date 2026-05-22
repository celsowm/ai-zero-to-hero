import React, { useMemo, useState } from 'react';
import type { EmbeddingIntroVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';

interface EmbeddingIntroVisualProps {
  copy: EmbeddingIntroVisualCopy;
}

const tokenGrid = [
  [2, 4, 1],
  [3, 0, 2],
];

const embeddingTable = [
  [0.34, -0.19, 0.52, -0.66],
  [-0.11, 0.44, -0.28, 0.73],
  [0.85, 0.12, -0.39, 0.08],
  [-0.56, 0.21, 0.63, -0.32],
  [0.17, -0.47, 0.58, 0.26],
];

const lookupSteps = [
  { b: 0, t: 0 },
  { b: 0, t: 1 },
  { b: 0, t: 2 },
  { b: 1, t: 0 },
  { b: 1, t: 1 },
  { b: 1, t: 2 },
];

const EmbeddingIntroVisual: React.FC<EmbeddingIntroVisualProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(0);

  const active = lookupSteps[step];
  const activeTokenId = tokenGrid[active.b][active.t];
  const activeVector = useMemo(() => embeddingTable[activeTokenId].map((v) => v.toFixed(2)).join(', '), [activeTokenId]);
  const tokenCellX = 24 + active.t * 62;
  const tokenCellY = 40 + active.b * 56;
  const rowY = 40 + activeTokenId * 46;
  const outputCellX = 548 + active.t * 108;
  const outputCellY = 40 + active.b * 116;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel="Embedding intro" items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
              {copy.tabs[0]?.label ?? 'Code'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.codePanel.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.codePanel.description}</div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <CodeBlock language="python" code="" sourceRef={copy.codePanel.source} explanations={copy.codePanel.codeExplanations} />
            </div>
          </PanelCard>
        ) : (
          <PanelCard minHeight={0} gap={14} style={{ height: '100%', overflow: 'auto' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
              {copy.tabs[1]?.label ?? 'Explorer'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.embedExplorer.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.embedExplorer.subtitle}</div>

            <svg viewBox="0 0 900 340" style={{ width: '100%', maxHeight: 340 }}>
              <defs>
                <linearGradient id="outGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <text x="24" y="24" fill="#94a3b8" fontSize="11" fontWeight="700">{copy.embedExplorer.sequenceLabel}</text>
              {tokenGrid.map((row, b) =>
                row.map((tokenId, t) => {
                  const x = 24 + t * 62;
                  const y = 40 + b * 56;
                  const selected = active.b === b && active.t === t;
                  return (
                    <g key={`idx-${b}-${t}`}>
                      <rect x={x} y={y} width="52" height="42" rx="8" fill={selected ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.03)'} stroke={selected ? '#00e5ff' : '#334155'} />
                      <text x={x + 26} y={y + 25} textAnchor="middle" fill={selected ? '#00e5ff' : '#cbd5e1'} fontFamily={sw.fontMono} fontSize="13">
                        {tokenId}
                      </text>
                    </g>
                  );
                }),
              )}

              <text x="246" y="24" fill="#94a3b8" fontSize="11" fontWeight="700">{copy.embedExplorer.tableLabel}</text>
              {embeddingTable.map((row, id) => {
                const y = 40 + id * 46;
                const selected = id === activeTokenId;
                return (
                  <g key={`row-${id}`}>
                    <rect x="246" y={y} width="244" height="34" rx="8" fill={selected ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.02)'} stroke={selected ? '#a78bfa' : '#334155'} />
                    <text x="257" y={y + 22} fill={selected ? '#a78bfa' : '#94a3b8'} fontFamily={sw.fontMono} fontSize="11">
                      {id}: [{row.map((v) => v.toFixed(2)).join(', ')}]
                    </text>
                  </g>
                );
              })}

              <text x="548" y="24" fill="#94a3b8" fontSize="11" fontWeight="700">{copy.embedExplorer.outputLabel}</text>
              {tokenGrid.map((row, b) =>
                row.map((_, t) => {
                  const x = 548 + t * 108;
                  const y = 40 + b * 116;
                  const selected = active.b === b && active.t === t;
                  return (
                    <g key={`out-${b}-${t}`}>
                      <rect x={x} y={y} width="94" height="90" rx="8" fill={selected ? 'url(#outGlow)' : 'rgba(15,23,42,0.45)'} stroke={selected ? '#00e5ff' : '#334155'} />
                      <text x={x + 47} y={y + 18} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily={sw.fontMono}>
                        H[{b},{t},:]
                      </text>
                      {Array.from({ length: 4 }).map((__, d) => (
                        <text key={d} x={x + 47} y={y + 36 + d * 12} textAnchor="middle" fill={selected ? '#e2e8f0' : '#64748b'} fontSize="10" fontFamily={sw.fontMono}>
                          {selected ? embeddingTable[activeTokenId][d].toFixed(2) : '...'}
                        </text>
                      ))}
                    </g>
                  );
                }),
              )}

              <line
                x1={tokenCellX + 52}
                y1={tokenCellY + 21}
                x2="246"
                y2={rowY + 17}
                stroke="#00e5ff"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="490"
                y1={rowY + 17}
                x2={outputCellX}
                y2={outputCellY + 46}
                stroke="#a78bfa"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 12, color: sw.textMuted }}>{copy.embedExplorer.stepperLabel}</div>
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1 + lookupSteps.length) % lookupSteps.length)}
                style={{ border: '1px solid #334155', background: sw.surface, color: sw.text, borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}
              >
                {copy.embedExplorer.prevLabel}
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => (prev + 1) % lookupSteps.length)}
                style={{ border: '1px solid #334155', background: sw.surface, color: sw.text, borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}
              >
                {copy.embedExplorer.nextLabel}
              </button>
              <div style={{ fontFamily: sw.fontMono, color: '#00e5ff', fontSize: 12 }}>
                {copy.embedExplorer.activePositionLabel}: (b={active.b}, t={active.t})
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10 }}>
              <div style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #334155', background: 'rgba(0,229,255,0.05)' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.08em' }}>{copy.embedExplorer.selectedTokenLabel}</div>
                <div style={{ fontFamily: sw.fontMono, color: sw.text, marginTop: 4 }}>ID {activeTokenId}</div>
              </div>
              <div style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid #334155', background: 'rgba(124,58,237,0.08)' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#a78bfa', letterSpacing: '0.08em' }}>{copy.embedExplorer.selectedVectorLabel}</div>
                <div style={{ fontFamily: sw.fontMono, color: sw.text, marginTop: 4, fontSize: 12 }}>[{activeVector}]</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10 }}>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 16, background: sw.surface, border: '1px solid #1e293b', fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
                <strong style={{ color: sw.text }}>{copy.embedExplorer.lookupLabel}</strong> {copy.embedExplorer.lookupBody}
              </div>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 16, background: sw.surface, border: '1px solid #1e293b', fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
                <strong style={{ color: sw.text }}>{copy.embedExplorer.maxIdLabel}</strong> {copy.embedExplorer.sharedWeightsHint}
              </div>
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.embedExplorer.footer}</div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
};

export default EmbeddingIntroVisual;
