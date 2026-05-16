import React, { useState } from 'react';
import type { ArchitectureComparatorCopy } from '../../../types/slide';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: ArchitectureComparatorCopy;
}

const MLPDiagram = () => (
  <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="mlpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--sw-cyan)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="var(--sw-blue)" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    {/* Connections */}
    {[60, 120, 180].map((x, i, arr) => {
      if (i === arr.length - 1) return null;
      const nextX = arr[i + 1];
      const currentNodes = i === 0 ? [35, 65, 95, 125] : [50, 80, 110];
      const nextNodes = i === 0 ? [50, 80, 110] : [80];
      return currentNodes.map(y1 => 
        nextNodes.map(y2 => (
          <line key={`${x}-${y1}-${y2}`} x1={x} y1={y1} x2={nextX} y2={y2} stroke={sw.tintAccent} strokeWidth="0.5" strokeOpacity="0.4" />
        ))
      );
    })}
    {/* Layers */}
    <g>
      {[35, 65, 95, 125].map(y => <circle key={y} cx="60" cy={y} r="6" fill="var(--sw-cyan)" />)}
      <text x="60" y="22" textAnchor="middle" fontSize="8" fill="var(--sw-text-dim)" fontWeight="900">INPUT</text>
    </g>
    <g>
      {[50, 80, 110].map(y => <circle key={y} cx="120" cy={y} r="7" fill="var(--sw-blue)" stroke="rgba(255,255,255,0.2)" />)}
      <text x="120" y="35" textAnchor="middle" fontSize="8" fill="var(--sw-text-dim)" fontWeight="900">HIDDEN (DENSE)</text>
    </g>
    <g>
      <circle cx="180" cy={80} r="8" fill="var(--sw-purple)" stroke="white" strokeWidth="1" />
      <text x="180" y="65" textAnchor="middle" fontSize="8" fill="var(--sw-text-dim)" fontWeight="900">OUTPUT</text>
    </g>
  </svg>
);

const CNNDiagram = () => (
  <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    {/* Image Volume */}
    <rect x="30" y="40" width="60" height="60" fill="rgba(0, 229, 255, 0.05)" stroke="var(--sw-cyan)" strokeWidth="1" />
    <path d="M 30 50 H 90 M 30 60 H 90 M 30 70 H 90 M 30 80 H 90 M 40 40 V 100 M 50 40 V 100 M 60 40 V 100 M 70 40 V 100 M 80 40 V 100" stroke="var(--sw-cyan)" strokeWidth="0.5" strokeOpacity="0.2" />
    
    {/* Kernel/Filter */}
    <g>
      <rect x="45" y="55" width="20" height="20" fill="var(--sw-pink)" fillOpacity="0.3" stroke="var(--sw-pink)" strokeWidth="1.5" />
      <text x="55" y="50" textAnchor="middle" fontSize="7" fill="var(--sw-pink)" fontWeight="900">KERNEL 3x3</text>
    </g>

    {/* Feature Map Stack */}
    <rect x="130" y="45" width="40" height="40" fill="rgba(56, 189, 248, 0.1)" stroke="var(--sw-blue)" strokeWidth="1" />
    <rect x="135" y="50" width="40" height="40" fill="rgba(56, 189, 248, 0.1)" stroke="var(--sw-blue)" strokeWidth="1" />
    <text x="155" y="38" textAnchor="middle" fontSize="8" fill="var(--sw-blue)" fontWeight="900">FEATURE MAPS</text>

    {/* Projection lines */}
    <path d="M 65 55 L 130 45 M 65 75 L 130 85" stroke="var(--sw-pink)" strokeWidth="0.8" strokeDasharray="2,1" opacity="0.6" />

    {/* Pooling/Output */}
    <rect x="195" y="62" width="20" height="20" rx="3" fill="var(--sw-purple)" opacity="0.8" />
    <path d="M 175 72 L 195 72" stroke={sw.tintState} strokeWidth="1.5" markerEnd="url(#arrow)" />
  </svg>
);

const TransformerDiagram = () => (
  <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    {/* Tokens */}
    <g>
      <rect x="40" y="125" width="30" height="12" rx="3" fill="var(--sw-cyan)" opacity="0.7" />
      <rect x="75" y="125" width="30" height="12" rx="3" fill="var(--sw-cyan)" opacity="0.7" />
      <rect x="110" y="125" width="30" height="12" rx="3" fill="var(--sw-cyan)" opacity="0.7" />
      <text x="90" y="150" textAnchor="middle" fontSize="8" fill="var(--sw-text-dim)" fontWeight="900">INPUT TOKENS</text>
    </g>

    {/* Self-Attention Block */}
    <rect x="45" y="75" width="90" height="35" rx="5" fill="rgba(56, 189, 248, 0.05)" stroke="var(--sw-blue)" strokeWidth="1.5" />
    <text x="90" y="96" textAnchor="middle" fontSize="9" fill="var(--sw-blue)" fontWeight="900">SELF-ATTENTION</text>

    {/* MLP/FFN Block */}
    <rect x="45" y="25" width="90" height="35" rx="5" fill="rgba(168, 85, 247, 0.05)" stroke="var(--sw-purple)" strokeWidth="1.5" />
    <text x="90" y="46" textAnchor="middle" fontSize="9" fill="var(--sw-purple)" fontWeight="900">FEED-FORWARD</text>

    {/* Relationships */}
    <path d="M 55 75 Q 90 50 125 75" fill="none" stroke="var(--sw-cyan)" strokeWidth="1" opacity="0.4" />
    <path d="M 70 75 Q 90 60 110 75" fill="none" stroke="var(--sw-cyan)" strokeWidth="1" opacity="0.4" />

    {/* Flow */}
    <path d="M 90 125 V 110 M 90 75 V 60" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" markerEnd="url(#arrow)" />

    {/* Residual */}
    <path d="M 135 131 H 160 V 43 H 135" fill="none" stroke="var(--sw-pink)" strokeWidth="1.5" strokeDasharray="4,2" />
    <text x="168" y="87" transform="rotate(90 168 87)" fontSize="7" fill="var(--sw-pink)" fontWeight="900">RESIDUAL STREAM</text>

    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M 0 0 L 6 3 L 0 6 Z" fill={sw.tintActive} />
      </marker>
    </defs>
  </svg>
);

export const ArchitectureComparatorVisual = React.memo(({ copy }: Props) => {
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

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
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
                  background: sw.tint,
                  borderRadius: 12,
                  border: `1px solid ${sw.tintOverlay}`,
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
              borderTop: `1px solid ${sw.tintAccent}`,
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
});
