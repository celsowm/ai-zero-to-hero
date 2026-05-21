import React, { useState } from 'react';
import type { Tensor3DExplorerCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: Tensor3DExplorerCopy;
}

type TensorRank = 'scalar' | 'vector' | 'matrix' | 'tensor3d' | 'tensor4d';

const CodePanel: React.FC<{ copy: Tensor3DExplorerCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)', marginBottom: 10 }}>
      {eyebrowLabel}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock code={copy.code ?? ''} language="python" explanations={copy.codeExplanations} sourceRef={copy.source} />
    </div>
  </PanelCard>
);

const panelStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 350,
  borderRadius: '18px',
  overflow: 'hidden',
  border: sw.borderSubtle,
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.14), transparent 28%), radial-gradient(circle at 84% 12%, rgba(255, 46, 151, 0.12), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))',
  boxShadow: `${sw.insetHighlight}, ${sw.shadowDeep}`,
  padding: 14,
};

const IsoCube: React.FC<{
  x: number; y: number; w: number; h: number; d: number;
  top: string; side: string; front: string; stroke?: string;
}> = ({ x, y, w, h, d, top, side, front, stroke = 'rgba(148,163,184,0.35)' }) => (
  <g>
    <polygon points={`${x},${y} ${x + d},${y - d * 0.55} ${x + d + w},${y - d * 0.55} ${x + w},${y}`} fill={top} stroke={stroke} strokeWidth="1" />
    <polygon points={`${x + w},${y} ${x + d + w},${y - d * 0.55} ${x + d + w},${y + h - d * 0.55} ${x + w},${y + h}`} fill={side} stroke={stroke} strokeWidth="1" />
    <rect x={x} y={y} width={w} height={h} fill={front} stroke={stroke} strokeWidth="1" />
  </g>
);

const cubeFace = (base: string, alpha: number) => `${base}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
const channelBase = ['#22d3ee', '#a78bfa', '#fb7185'];

const RankStructureView: React.FC<{ rank: TensorRank }> = ({ rank }) => {
  if (rank === 'scalar') {
    return (
      <div style={panelStyle}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: '100%' }}>
          <IsoCube x={360} y={130} w={160} h={120} d={34} top={cubeFace('#22d3ee', 0.34)} side={cubeFace('#06b6d4', 0.26)} front={cubeFace('#1e293b', 0.9)} />
          <text x="440" y="198" textAnchor="middle" fill="#67e8f9" fontFamily={sw.fontMono} fontSize="24" fontWeight="700">0.42</text>
          <text x="450" y="306" textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="14">sem eixo: ()</text>
        </svg>
      </div>
    );
  }

  if (rank === 'vector') {
    return (
      <div style={panelStyle}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: '100%' }}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <IsoCube x={170 + i * 145} y={140} w={90} h={74} d={20} top={cubeFace('#22d3ee', 0.3)} side={cubeFace('#0ea5e9', 0.24)} front={cubeFace('#1e293b', 0.88)} />
              <text x={215 + i * 145} y={184} textAnchor="middle" fill="#67e8f9" fontFamily={sw.fontMono} fontSize="14">{i}</text>
            </g>
          ))}
          <text x="450" y="298" textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="14">um eixo: (4,)</text>
        </svg>
      </div>
    );
  }

  if (rank === 'matrix') {
    return (
      <div style={panelStyle}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: '100%' }}>
          <rect
            x={150}
            y={58}
            width={520}
            height={238}
            rx={12}
            fill="rgba(167,139,250,0.04)"
            stroke="rgba(167,139,250,0.26)"
          />
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => (
              <IsoCube
                key={`${r}-${c}`}
                x={170 + c * 120}
                y={74 + r * 84}
                w={72}
                h={56}
                d={16}
                top={cubeFace('#a78bfa', 0.28)}
                side={cubeFace('#7c3aed', 0.2)}
                front={cubeFace('#1e293b', 0.88)}
              />
            )),
          )}
          <line x1="150" y1="296" x2="646" y2="296" stroke="rgba(148,163,184,0.7)" strokeWidth="2" markerEnd="url(#arrow2d)" />
          <line x1="150" y1="58" x2="150" y2="296" stroke="rgba(148,163,184,0.7)" strokeWidth="2" markerEnd="url(#arrow2d)" />
          <defs>
            <marker id="arrow2d" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="rgba(148,163,184,0.8)" />
            </marker>
          </defs>
          <text x="156" y="48" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="12">linhas r [0..2]</text>
          <text x="448" y="316" textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="12">colunas c [0..3]</text>
          <text x="450" y="30" textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="14">dois eixos: (3, 4)</text>
        </svg>
      </div>
    );
  }

  if (rank === 'tensor3d') {
    return (
      <div style={panelStyle}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: '100%' }}>
          {[0, 1].map((b) => {
            const ox = b === 0 ? 90 : 500;
            return (
              <g key={`tensor3d-batch-${b}`}>
                <rect
                  x={ox - 18}
                  y={54}
                  width={332}
                  height={230}
                  rx={12}
                  fill={b === 0 ? 'rgba(34,211,238,0.04)' : 'rgba(167,139,250,0.05)'}
                  stroke={b === 0 ? 'rgba(34,211,238,0.28)' : 'rgba(167,139,250,0.28)'}
                />
                <text x={ox - 2} y={44} fill={b === 0 ? '#67e8f9' : '#c4b5fd'} fontFamily={sw.fontMono} fontSize="14" fontWeight="700">
                  batch[{b}]
                </text>
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 4 }).map((__, c) => (
                    <IsoCube
                      key={`${b}-${r}-${c}`}
                      x={ox + c * 74}
                      y={82 + r * 60}
                      w={46}
                      h={34}
                      d={10}
                      top={cubeFace(b === 0 ? '#22d3ee' : '#a78bfa', 0.36)}
                      side={cubeFace(b === 0 ? '#0ea5e9' : '#7c3aed', 0.24)}
                      front={cubeFace('#1e293b', 0.9)}
                    />
                  )),
                )}
              </g>
            );
          })}
          <line x1="74" y1="66" x2="74" y2="256" stroke="rgba(148,163,184,0.7)" strokeWidth="2" markerEnd="url(#arrow3d)" />
          <line x1="74" y1="256" x2="384" y2="256" stroke="rgba(148,163,184,0.7)" strokeWidth="2" markerEnd="url(#arrow3d)" />
          <line x1="90" y1="300" x2="810" y2="300" stroke="rgba(148,163,184,0.7)" strokeWidth="2" markerEnd="url(#arrow3d)" />
          <defs>
            <marker id="arrow3d" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="rgba(148,163,184,0.8)" />
            </marker>
          </defs>
          <text x="86" y="52" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="12">posicao r [0..2]</text>
          <text x="248" y="274" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="12">conteudo c [0..3]</text>
          <text x="706" y="294" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="12">batch b [0..1]</text>
          <text x="450" y="30" textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="14">três eixos: (2, 3, 4)</text>
        </svg>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <svg viewBox="0 0 900 360" style={{ width: '100%', height: '100%' }}>
        {[0, 1].map((b) => {
          const ox = b === 0 ? 110 : 500;
          const oy = b === 0 ? 110 : 145;
          return (
            <g key={`batch-cube-${b}`}>
              <IsoCube x={ox} y={oy} w={260} h={170} d={44} top={cubeFace('#0ea5e9', 0.2)} side={cubeFace('#06b6d4', 0.2)} front={cubeFace('#1e293b', 0.85)} stroke="rgba(34,211,238,0.45)" />
              <text x={ox + 16} y={oy + 24} fill="#67e8f9" fontFamily={sw.fontMono} fontSize="13" fontWeight="700">
                batch[{b}] {'->'} (3, 28, 28)
              </text>
              {[0, 1, 2].map((c) => {
                const cx = ox + 18 + c * 78;
                const cy = oy + 48 + c * 10;
                return (
                  <g key={`batch-${b}-channel-cube-${c}`}>
                    <IsoCube x={cx} y={cy} w={66} h={84} d={18} top={cubeFace(channelBase[c], 0.32)} side={cubeFace(channelBase[c], 0.24)} front={cubeFace(channelBase[c], 0.12)} stroke="rgba(148,163,184,0.4)" />
                    <text x={cx + 6} y={cy + 16} fill={channelBase[c]} fontFamily={sw.fontMono} fontSize="11" fontWeight="700">c[{c}]</text>
                    <text x={cx + 8} y={cy + 36} fill="#e2e8f0" fontFamily={sw.fontMono} fontSize="10">28 x 28</text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 10, border: '1px solid rgba(0,229,255,0.35)', borderRadius: 10, background: 'rgba(6,18,34,0.78)', padding: '8px 10px', fontSize: 11.5, color: '#cbd5e1', fontFamily: sw.fontMono }}>
        batch[0..1] | canal[0..2] | altura[0..27] | largura[0..27]
      </div>
    </div>
  );
};

const infoCardStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: sw.cardBorderRadius,
  background: sw.tintStrong,
  border: sw.borderSubtle,
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
  marginBottom: 4,
};

const infoValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  color: 'var(--sw-cyan)',
};

function getShapeValue(rank: TensorRank): string {
  switch (rank) { case 'scalar': return '()'; case 'vector': return '(4,)'; case 'matrix': return '(3, 4)'; case 'tensor3d': return '(2, 3, 4)'; case 'tensor4d': return '(2, 3, 28, 28)'; }
}
function getRankValue(rank: TensorRank): string {
  switch (rank) { case 'scalar': return '0D'; case 'vector': return '1D'; case 'matrix': return '2D'; case 'tensor3d': return '3D'; case 'tensor4d': return '4D'; }
}
function getRankLabel(rank: TensorRank, copy: Tensor3DExplorerCopy['interactivePanel']): string {
  switch (rank) { case 'scalar': return copy.scalarLabel; case 'vector': return copy.vectorLabel; case 'matrix': return copy.matrixLabel; case 'tensor3d': return copy.tensor3dLabel; case 'tensor4d': return copy.tensor4dLabel; }
}
const rankOptions: TensorRank[] = ['scalar', 'vector', 'matrix', 'tensor3d', 'tensor4d'];

export const Tensor3DExplorer = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeRank, setActiveRank] = useState<TensorRank>('scalar');

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel={copy.interactivePanel.title} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[0]?.label ?? 'Code'} />
        ) : (
          <PanelCard minHeight={0} gap={14} style={{ height: '100%', overflow: 'hidden' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>{copy.interactivePanel.eyebrow}</div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.interactivePanel.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.interactivePanel.description}</div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {rankOptions.map((r) => {
                const active = r === activeRank;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setActiveRank(r)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: sw.cardBorderRadius,
                      border: active ? '1px solid #00e5ff88' : sw.borderSubtle,
                      background: active ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.22), rgba(255,255,255,0.04))' : sw.tintStrong,
                      color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: sw.transitionFast,
                    }}
                  >
                    {getRankLabel(r, copy.interactivePanel)}
                  </button>
                );
              })}
            </div>

            <RankStructureView rank={activeRank} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>{copy.interactivePanel.shapeLabel}</div>
                <div style={infoValueStyle}>{getShapeValue(activeRank)}</div>
              </div>
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>{copy.interactivePanel.rankLabel}</div>
                <div style={infoValueStyle}>{getRankValue(activeRank)}</div>
              </div>
            </div>

            <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--sw-text-muted)', paddingTop: 2 }}>{copy.interactivePanel.footer}</div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
});
