import React, { useState } from 'react';
import type { EmbeddingIntroVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';

interface EmbeddingIntroVisualProps {
  copy: EmbeddingIntroVisualCopy;
}

const EmbeddingIntroVisual: React.FC<EmbeddingIntroVisualProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const vocabSize = 5;
  const embedDim = 4;
  const embedTable = [
    [0.12, -0.34,  0.56, -0.78],
    [0.91, -0.23,  0.45, -0.67],
    [0.33, -0.11,  0.77, -0.55],
    [0.22, -0.44,  0.66, -0.88],
    [0.15, -0.35,  0.55, -0.75],
  ];

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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: '10px 14px', borderRadius: 16, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e5ff' }}>{copy.embedExplorer.vocabSizeLabel}</div>
                <div style={{ fontFamily: sw.fontMono, fontSize: 16, fontWeight: 700, color: sw.text, marginTop: 4 }}>V = {vocabSize}</div>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 16, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed' }}>{copy.embedExplorer.embedDimLabel}</div>
                <div style={{ fontFamily: sw.fontMono, fontSize: 16, fontWeight: 700, color: sw.text, marginTop: 4 }}>C = {embedDim}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: sw.text, marginBottom: 8 }}>{copy.embedExplorer.tableLabel}</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: sw.fontMono }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #1e293b', color: '#64748b', fontWeight: 700 }}>{copy.embedExplorer.rowLabel}</th>
                      {Array.from({ length: embedDim }).map((_, j) => (
                        <th key={j} style={{ textAlign: 'center', padding: '6px 8px', borderBottom: '1px solid #1e293b', color: '#64748b', fontWeight: 700 }}>dim {j}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {embedTable.map((row, i) => {
                      const isSelected = selectedId === i;
                      const rowStyle: React.CSSProperties = {
                        textAlign: 'center',
                        padding: '6px 8px',
                        borderBottom: '1px solid #0f172a',
                        background: isSelected ? 'rgba(0,229,255,0.12)' : 'transparent',
                        color: isSelected ? '#00e5ff' : '#94a3b8',
                        fontWeight: isSelected ? 700 : 400,
                        cursor: 'pointer',
                      };
                      return (
                        <tr key={i} onClick={() => setSelectedId(i)} style={{ cursor: 'pointer' }}>
                          <td style={{ ...rowStyle, textAlign: 'left' }}>
                            {isSelected ? '> ' : ''}ID {i}
                          </td>
                          {row.map((val, j) => (
                            <td key={j} style={rowStyle}>{val.toFixed(2)}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: 16, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b' }}>{copy.embedExplorer.maxIdLabel}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: sw.text, marginTop: 4 }}>
                {selectedId !== null ? (
                  <>embedding([{selectedId}]) &rarr; vetor de {embedDim} dimensoes: [{embedTable[selectedId].map(v => v.toFixed(2)).join(', ')}]</>
                ) : (
                  'Clique em uma linha da tabela acima para ver o lookup.'
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 16, background: sw.surface, border: '1px solid #1e293b' }}>
                <strong style={{ color: sw.text }}>{copy.embedExplorer.lookupLabel}</strong> {copy.embedExplorer.lookupBody}
              </div>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 16, background: sw.surface, border: '1px solid #1e293b' }}>
                <strong style={{ color: sw.text }}>Hint</strong> {copy.embedExplorer.sharedWeightsHint}
              </div>
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
              {copy.embedExplorer.footer}
            </div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
};

export default EmbeddingIntroVisual;
