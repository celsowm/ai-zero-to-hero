import React, { useState } from 'react';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import type { TensorOriginsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: TensorOriginsCopy;
}

type TensorLevel = 0 | 1 | 2 | 3 | 4;

interface LevelData {
  shape: string;
  dim: string;
  physics: string;
  ml: string;
  visual: React.ReactNode;
}

const levels: TensorLevel[] = [0, 1, 2, 3, 4];

function getLevelData(level: TensorLevel): LevelData {
  switch (level) {
    case 0:
      return {
        shape: '()',
        dim: '0D',
        physics: 'Temperatura em um ponto (25°C)',
        ml: 'Loss scalar: tensor(0.42)',
        visual: (
          <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--sw-cyan)', fontFamily: "'JetBrains Mono', monospace" }}>
            25
          </div>
        ),
      };
    case 1:
      return {
        shape: '(3,)',
        dim: '1D',
        physics: 'Velocidade: [x, y, z]',
        ml: 'Embedding: [0.2, -0.5, 0.8]',
        visual: (
          <div style={{ display: 'flex', gap: 8 }}>
            {[0.2, -0.5, 0.8].map((v, i) => (
              <div key={i} style={{
                width: 48, height: 48, borderRadius: 8,
                background: v > 0 ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 46, 151, 0.2)',
                border: `1px solid ${v > 0 ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 46, 151, 0.4)'}`,
                display: 'grid', placeItems: 'center',
                fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                color: v > 0 ? 'var(--sw-cyan)' : 'var(--sw-pink)',
              }}>
                {v}
              </div>
            ))}
          </div>
        ),
      };
    case 2:
      return {
        shape: '(2, 3)',
        dim: '2D',
        physics: 'Stress em um material (σᵢⱼ)',
        ml: 'Batch de embeddings: [[...], [...]]',
        visual: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 48px)', gap: 6 }}>
            {[[1.0, 0.0, -0.3], [0.5, 0.8, 0.1]].flat().map((v, i) => (
              <div key={i} style={{
                width: 48, height: 40, borderRadius: 6,
                background: 'rgba(0, 229, 255, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                display: 'grid', placeItems: 'center',
                fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--sw-cyan)',
              }}>
                {v.toFixed(1)}
              </div>
            ))}
          </div>
        ),
      };
    case 3:
      return {
        shape: '(2, 2, 3)',
        dim: '3D',
        physics: 'Curvatura do espaço-tempo (Rᵢⱼₖₗ)',
        ml: 'Batch de imagens RGB: [N, C, H, W]',
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[0, 1].map(d => (
              <div key={d} style={{ display: 'flex', gap: 6, paddingLeft: d === 1 ? 16 : 0 }}>
                {[[0.9, 0.1, 0.4], [0.3, 0.7, 0.2]].flat().map((v, i) => (
                  <div key={`${d}-${i}`} style={{
                    width: 40, height: 36, borderRadius: 5,
                    background: 'rgba(168, 85, 247, 0.12)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    display: 'grid', placeItems: 'center',
                    fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--sw-purple)',
                  }}>
                    {v.toFixed(1)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ),
      };
    case 4:
      return {
        shape: '(8, 2, 3, 4)',
        dim: '4D',
        physics: 'Tensor de curvatura de Riemann (4 índices)',
        ml: 'Batch de vídeos: [frames, batch, canais, altura]',
        visual: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['t₀', 't₁'].map((t, d) => (
              <div key={d} style={{ display: 'flex', gap: 4, paddingLeft: d === 1 ? 12 : 0, alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'var(--sw-text-muted)', width: 18 }}>{t}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 28px)', gap: 3 }}>
                  {[0.5, 0.8, 0.2, 0.9].map((v, i) => (
                    <div key={i} style={{
                      width: 28, height: 24, borderRadius: 4,
                      background: 'rgba(251, 191, 36, 0.1)',
                      border: '1px solid rgba(251, 191, 36, 0.25)',
                      display: 'grid', placeItems: 'center',
                      fontSize: 9, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--sw-yellow)',
                    }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: 'var(--sw-text-muted)', fontStyle: 'italic', paddingLeft: 30 }}>
              × 8 batches × 3 canais ...
            </div>
          </div>
        ),
      };
  }
}

/* ─── Tab 1: Physics vs ML ─── */
const PhysicsVsMlPanel: React.FC<{ copy: TensorOriginsCopy['physicsVsMl'] }> = ({ copy }) => (
  <PanelCard gap={18} style={{ height: '100%', overflow: 'auto' }}>
    {/* Eyebrow + Title */}
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
      {copy.eyebrow}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>
      {copy.title}
    </div>

    {/* Two columns: Physics vs ML */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start' }}>
      {/* Physics */}
      <div style={{
        borderRadius: 14, border: '1px solid rgba(74, 222, 128, 0.2)',
        background: 'rgba(74, 222, 128, 0.04)', padding: 18,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80', marginBottom: 12 }}>
          {copy.physicsTitle}
        </div>
        {/* Einstein equation */}
        <div style={{
          borderRadius: 10, background: 'rgba(0,0,0,0.3)', padding: 16, textAlign: 'center',
          marginBottom: 14, border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          <div style={{
            fontSize: 22, fontFamily: 'serif', fontStyle: 'italic', color: '#4ade80',
            fontWeight: 700, letterSpacing: '0.02em',
          }}>
            G<sub style={{ fontSize: 14 }}>μν</sub> = <sup style={{ fontSize: 13 }}>8πG</sup>⁄<sub style={{ fontSize: 13 }}>c⁴</sub> · T<sub style={{ fontSize: 14 }}>μν</sub>
          </div>
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.65, color: 'var(--sw-text-dim)', marginBottom: 14 }}>
          {copy.physicsBody}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: '#4ade80', fontFamily: "'JetBrains Mono', monospace",
          padding: '8px 12px', borderRadius: 8, background: 'rgba(74, 222, 128, 0.08)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          {copy.physicsLabels.tensorName}
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--sw-text-muted)', marginTop: 8 }}>
          {copy.physicsLabels.tensorDesc}
        </div>
      </div>

      {/* Bridge arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.1)',
        }}>
          <span style={{ fontSize: 20, color: 'var(--sw-text-muted)' }}>↔</span>
          <span style={{ fontSize: 9, color: 'var(--sw-text-muted)', textAlign: 'center', lineHeight: 1.3 }}>
            {copy.bridgeLabel}
          </span>
        </div>
      </div>

      {/* ML */}
      <div style={{
        borderRadius: 14, border: '1px solid rgba(0, 229, 255, 0.2)',
        background: 'rgba(0, 229, 255, 0.04)', padding: 18,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-cyan)', marginBottom: 12 }}>
          {copy.mlTitle}
        </div>
        {/* Code snippet */}
        <div style={{
          borderRadius: 10, background: 'rgba(0,0,0,0.4)', padding: 14,
          marginBottom: 14, border: '1px solid rgba(0, 229, 255, 0.15)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.6,
        }}>
          <span style={{ color: '#c084fc' }}>import</span> <span style={{ color: 'var(--sw-cyan)' }}>torch</span>
          <br />
          <br />
          <span style={{ color: 'var(--sw-text-muted)' }}># array N-dimensional</span>
          <br />
          <span style={{ color: 'var(--sw-text)' }}>x = torch.tensor(</span>
          <br />
          <span style={{ color: 'var(--sw-text)' }}>  [[1, 2], [3, 4]]</span>
          <br />
          <span style={{ color: 'var(--sw-text)' }}>)</span>
          <br />
          <span style={{ color: 'var(--sw-text-muted)' }}># shape: (2, 2)</span>
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.65, color: 'var(--sw-text-dim)', marginBottom: 14 }}>
          {copy.mlBody}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'var(--sw-cyan)', fontFamily: "'JetBrains Mono', monospace",
          padding: '8px 12px', borderRadius: 8, background: 'rgba(0, 229, 255, 0.08)',
          border: '1px solid rgba(0, 229, 255, 0.15)',
        }}>
          {copy.mlLabels.tensorName}
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--sw-text-muted)', marginTop: 8 }}>
          {copy.mlLabels.tensorDesc}
        </div>
      </div>
    </div>

    {/* Takeaway */}
    <div style={{
      fontSize: 12, lineHeight: 1.65, color: 'var(--sw-text)',
      padding: '12px 16px', borderRadius: 10,
      background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
      borderLeft: '3px solid var(--sw-cyan)',
    }}>
      {copy.takeaway}
    </div>
  </PanelCard>
);

/* ─── Tab 2: Interactive Hierarchy ─── */
const HierarchyPanel: React.FC<{ copy: TensorOriginsCopy['hierarchy'] }> = ({ copy }) => {
  const [activeLevel, setActiveLevel] = useState<TensorLevel>(0);
  const data = getLevelData(activeLevel);

  return (
    <PanelCard gap={16} style={{ height: '100%', overflow: 'auto' }}>
      {/* Eyebrow + Title + Description */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
        {copy.eyebrow}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>
        {copy.title}
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>
        {copy.description}
      </div>

      {/* Level selector buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {levels.map(l => {
          const active = l === activeLevel;
          const labels = ['Escalar', 'Vetor', 'Matriz', 'Tensor 3D', 'Tensor 4D'];
          const shapes = ['()', '(3,)', '(2, 3)', '(2, 2, 3)', '(8, 2, 3, 4)'];
          return (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLevel(l)}
              style={{
                padding: '8px 14px',
                borderRadius: sw.cardBorderRadius,
                border: active ? '1px solid #00e5ff88' : sw.borderSubtle,
                background: active
                  ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.22), rgba(255,255,255,0.04))'
                  : 'rgba(255, 255, 255, 0.03)',
                color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: sw.transitionFast,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {labels[l]} {shapes[l]}
            </button>
          );
        })}
      </div>

      {/* Visual representation */}
      <div style={{
        borderRadius: 14, padding: 20, textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255,255,255,0.06)',
        minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {data.visual}
      </div>

      {/* Info cards: Dimension, Shape, Physics, ML */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.dimensionLabel}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--sw-cyan)' }}>
            {data.dim}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168, 85, 247, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.shapeLabel}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--sw-purple)' }}>
            {data.shape}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(74, 222, 128, 0.06)', border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.physicsLabel}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, fontWeight: 600, color: '#4ade80' }}>
            {data.physics}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.mlLabel}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, fontWeight: 600, color: 'var(--sw-cyan)' }}>
            {data.ml}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--sw-text-muted)', paddingTop: 2 }}>
        {copy.footer}
      </div>
    </PanelCard>
  );
};

/* ─── Main Component ─── */
export const TensorOriginsVisual = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel="Tensor origins tabs" items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />

      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === 0 ? (
          <PhysicsVsMlPanel copy={copy.physicsVsMl} />
        ) : (
          <HierarchyPanel copy={copy.hierarchy} />
        )}
      </div>
    </div>
  );
});
