import React, { useState } from 'react';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import type { TensorOriginsCopy } from '../../../types/slide';
import { TensorHierarchy3D } from './TensorHierarchy3D';
import type { TensorLevel } from './TensorHierarchy3D';

interface Props {
  copy: TensorOriginsCopy;
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

/* ─── Tab 2: Interactive Hierarchy (Three.js) ─── */
const HierarchyPanel: React.FC<{ copy: TensorOriginsCopy['hierarchy'] }> = ({ copy }) => {
  const [activeLevel, setActiveLevel] = useState<TensorLevel>(0);

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

      <TensorHierarchy3D
        activeLevel={activeLevel}
        onLevelChange={setActiveLevel}
        copy={copy}
      />
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
