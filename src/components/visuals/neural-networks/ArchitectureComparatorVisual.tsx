import React, { useState } from 'react';
import type { ArchitectureComparatorCopy } from '../../../types/slide';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Props {
  copy: ArchitectureComparatorCopy;
}

const MLPDiagram = () => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <defs>
      <linearGradient id="mlpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--sw-cyan)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="var(--sw-blue)" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    {/* Connections */}
    {[40, 100, 160].map((x, i, arr) => {
      if (i === arr.length - 1) return null;
      const nextX = arr[i + 1];
      const currentNodes = i === 0 ? [25, 55, 85, 115] : [40, 70, 100];
      const nextNodes = i === 0 ? [40, 70, 100] : [70];
      return currentNodes.map(y1 => 
        nextNodes.map(y2 => (
          <line key={`${x}-${y1}-${y2}`} x1={x} y1={y1} x2={nextX} y2={y2} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        ))
      );
    })}
    {/* Layers */}
    <g>
      {[25, 55, 85, 115].map(y => <circle key={y} cx="40" cy={y} r="5" fill="var(--sw-cyan)" />)}
      <text x="40" y="15" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)" fontWeight="800">INPUT</text>
    </g>
    <g>
      {[40, 70, 100].map(y => <circle key={y} cx="100" cy={y} r="6" fill="var(--sw-blue)" stroke="rgba(255,255,255,0.2)" />)}
      <text x="100" y="25" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)" fontWeight="800">HIDDEN (DENSE)</text>
    </g>
    <g>
      <circle cx="160" cy="70" r="7" fill="var(--sw-purple)" stroke="white" strokeWidth="1" />
      <text x="160" y="55" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)" fontWeight="800">OUTPUT</text>
    </g>
  </svg>
);

const CNNDiagram = () => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    {/* Image Volume */}
    <rect x="20" y="30" width="50" height="50" fill="rgba(0, 229, 255, 0.05)" stroke="var(--sw-cyan)" strokeWidth="1" />
    <path d="M 20 40 H 70 M 20 50 H 70 M 20 60 H 70 M 20 70 H 70 M 30 30 V 80 M 40 30 V 80 M 50 30 V 80 M 60 30 V 80" stroke="var(--sw-cyan)" strokeWidth="0.5" strokeOpacity="0.2" />
    
    {/* Kernel/Filter */}
    <g>
      <rect x="35" y="45" width="20" height="20" fill="var(--sw-pink)" fillOpacity="0.3" stroke="var(--sw-pink)" strokeWidth="1.5" />
      <text x="45" y="40" textAnchor="middle" fontSize="6" fill="var(--sw-pink)" fontWeight="900">KERNEL 3x3</text>
    </g>

    {/* Feature Map Stack */}
    <rect x="110" y="35" width="35" height="35" fill="rgba(56, 189, 248, 0.1)" stroke="var(--sw-blue)" strokeWidth="1" />
    <rect x="115" y="40" width="35" height="35" fill="rgba(56, 189, 248, 0.1)" stroke="var(--sw-blue)" strokeWidth="1" />
    <text x="135" y="30" textAnchor="middle" fontSize="7" fill="var(--sw-blue)" fontWeight="800">FEATURE MAPS</text>

    {/* Projection lines */}
    <path d="M 55 45 L 110 35 M 55 65 L 110 70" stroke="var(--sw-pink)" strokeWidth="0.8" strokeDasharray="2,1" opacity="0.6" />

    {/* Pooling/Output */}
    <rect x="170" y="50" width="15" height="15" rx="2" fill="var(--sw-purple)" opacity="0.8" />
    <path d="M 150 57 L 170 57" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrow)" />
  </svg>
);

const TransformerDiagram = () => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    {/* Tokens */}
    <g>
      <rect x="20" y="115" width="25" height="10" rx="2" fill="var(--sw-cyan)" opacity="0.7" />
      <rect x="50" y="115" width="25" height="10" rx="2" fill="var(--sw-cyan)" opacity="0.7" />
      <rect x="80" y="115" width="25" height="10" rx="2" fill="var(--sw-cyan)" opacity="0.7" />
      <text x="62" y="134" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)" fontWeight="800">INPUT TOKENS</text>
    </g>

    {/* Self-Attention Block */}
    <rect x="25" y="65" width="75" height="30" rx="4" fill="rgba(56, 189, 248, 0.05)" stroke="var(--sw-blue)" strokeWidth="1.5" />
    <text x="62" y="83" textAnchor="middle" fontSize="8" fill="var(--sw-blue)" fontWeight="900">SELF-ATTENTION</text>

    {/* MLP/FFN Block */}
    <rect x="25" y="20" width="75" height="30" rx="4" fill="rgba(168, 85, 247, 0.05)" stroke="var(--sw-purple)" strokeWidth="1.5" />
    <text x="62" y="38" textAnchor="middle" fontSize="8" fill="var(--sw-purple)" fontWeight="900">FEED-FORWARD</text>

    {/* Relationships */}
    <path d="M 32 65 Q 62 45 92 65" fill="none" stroke="var(--sw-cyan)" strokeWidth="1" opacity="0.4" />
    <path d="M 45 65 Q 62 55 80 65" fill="none" stroke="var(--sw-cyan)" strokeWidth="1" opacity="0.4" />

    {/* Flow */}
    <path d="M 62 115 V 95 M 62 65 V 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#arrow)" />

    {/* Residual */}
    <path d="M 100 120 H 120 V 35 H 100" fill="none" stroke="var(--sw-pink)" strokeWidth="1.2" strokeDasharray="3,2" />
    <text x="125" y="80" transform="rotate(90 125 80)" fontSize="6" fill="var(--sw-pink)" fontWeight="800">RESIDUAL STREAM</text>

    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(255,255,255,0.5)" />
      </marker>
    </defs>
  </svg>
);

export const ArchitectureComparatorVisual: React.FC<Props> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = copy.tabs[activeTab];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar
        ariaLabel={copy.tabs[activeTab]?.title || 'Architecture Comparison'}
        items={copy.tabs.map((t) => ({ label: t.label }))}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />
      <TabbedPanelSurface>
        <PanelCard minHeight={0} gap={16} style={{ height: '100%', overflow: 'hidden', padding: 24 }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--sw-text)', marginBottom: 6, letterSpacing: '-0.02em' }}>
              {currentTab.title}
            </div>
            <div style={{ fontSize: 14.5, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>
              {currentTab.description}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20, flex: 1, minHeight: 0 }}>
            <div
              style={{
                background: 'rgba(13, 11, 21, 0.4)',
                borderRadius: 16,
                border: '1px solid rgba(168, 85, 247, 0.15)',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--sw-cyan)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <div style={{ width: 8, height: 8, background: 'var(--sw-cyan)', borderRadius: 2 }} />
                {currentTab.diagramLabel}
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {activeTab === 0 && <MLPDiagram />}
                {activeTab === 1 && <CNNDiagram />}
                {activeTab === 2 && <TransformerDiagram />}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {currentTab.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      background: 'rgba(168, 85, 247, 0.1)',
                      padding: '6px 12px',
                      borderRadius: 8,
                      color: 'var(--sw-purple-light)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--sw-purple)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <div style={{ width: 8, height: 8, background: 'var(--sw-purple)', borderRadius: 2 }} />
                Lógica Algorítmica (Python)
              </div>
              <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                <CodeBlock 
                  code={currentTab.code} 
                  language="python" 
                  explanations={currentTab.codeExplanations}
                  sourceRef={currentTab.source}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--sw-text-muted)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 16,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sw-pink)' }} />
            {copy.footer}
          </div>
        </PanelCard>
      </TabbedPanelSurface>
    </div>
  );
};
