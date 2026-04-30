import React, { useState, useMemo } from 'react';
import type { QkvIntuitionExplorerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { PanelCard } from '../PanelCard';

interface QkvIntuitionExplorerProps {
  copy: QkvIntuitionExplorerCopy;
}

export const QkvIntuitionExplorer = React.memo(({ copy }: QkvIntuitionExplorerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(() => [
    { label: copy.tabs.intuition.label, id: 'intuition' },
    { label: copy.tabs.mechanics.label, id: 'mechanics' },
    { label: copy.tabs.retrieval.label, id: 'retrieval' },
  ], [copy.tabs]);

  const renderContent = () => {
    switch (activeTab) {
      case 0: // Intuition
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              <div style={cardStyle('var(--sw-cyan)')}>
                <div style={iconBadgeStyle('var(--sw-cyan)')}>Q</div>
                <h4 style={cardTitleStyle}>{copy.queryLabel}</h4>
                <p style={cardDescStyle}>{copy.tabs.intuition.description.split('.')[0]}.</p>
              </div>
              <div style={cardStyle('var(--sw-purple)')}>
                <div style={iconBadgeStyle('var(--sw-purple)')}>K</div>
                <h4 style={cardTitleStyle}>{copy.keyLabel}</h4>
                <p style={cardDescStyle}>{copy.tabs.intuition.description.split('.')[1] || ''}.</p>
              </div>
              <div style={cardStyle('var(--sw-pink)')}>
                <div style={iconBadgeStyle('var(--sw-pink)')}>V</div>
                <h4 style={cardTitleStyle}>{copy.valueLabel}</h4>
                <p style={cardDescStyle}>{copy.tabs.intuition.description.split('.')[2] || ''}.</p>
              </div>
            </div>
            <PanelCard style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <h5 style={{ fontSize: 13, fontWeight: 800, color: 'var(--sw-cyan)', marginBottom: 8, textTransform: 'uppercase' }}>
                {copy.tabs.intuition.analogyTitle}
              </h5>
              <p style={{ fontSize: 14, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>
                {copy.tabs.intuition.analogyText}
              </p>
            </PanelCard>
          </div>
        );
      case 1: // Mechanics
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sw-text)' }}>{copy.tabs.mechanics.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--sw-text-dim)' }}>{copy.tabs.mechanics.description}</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
              <div style={mathBlockStyle('var(--sw-cyan)')}>Query [1 × d]</div>
              <span style={{ fontSize: 24, fontWeight: 300, color: 'var(--sw-text-muted)' }}>×</span>
              <div style={mathBlockStyle('var(--sw-purple)')}>Keyᵀ [d × n]</div>
              <span style={{ fontSize: 24, fontWeight: 300, color: 'var(--sw-text-muted)' }}>=</span>
              <div style={{ 
                padding: '16px 24px', 
                borderRadius: 12, 
                background: 'linear-gradient(135deg, var(--sw-cyan), var(--sw-purple))',
                color: '#000',
                fontWeight: 800,
                boxShadow: '0 10px 30px rgba(0,229,255,0.2)'
              }}>
                Scores [1 × n]
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <PanelCard gap={10}>
                <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--sw-cyan)', textTransform: 'uppercase' }}>{copy.tabs.mechanics.dotProductLabel}</div>
                <p style={{ fontSize: 13, color: 'var(--sw-text-dim)' }}>Similaridade por produto escalar: quanto mais os vetores "apontam" para o mesmo lado, maior o score.</p>
              </PanelCard>
              <PanelCard gap={10}>
                <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--sw-purple)', textTransform: 'uppercase' }}>{copy.tabs.mechanics.scalingLabel}</div>
                <p style={{ fontSize: 13, color: 'var(--sw-text-dim)' }}>Dividimos pela raiz da dimensão (√d) para manter os valores sob controle e evitar gradientes nulos.</p>
              </PanelCard>
            </div>
          </div>
        );
      case 2: // Retrieval
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.4s ease-out' }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 15, alignItems: 'center' }}>
                <div style={boxStyle}>
                  <div style={{ color: 'var(--sw-cyan)', fontWeight: 800 }}>Google Search</div>
                  <div style={{ fontSize: 12, color: 'var(--sw-text-muted)' }}>"Quem escreveu Dom Casmurro?" (Query)</div>
                </div>
                <span style={{ color: 'var(--sw-text-muted)' }}>→</span>
                <div style={boxStyle}>
                  <div style={{ color: 'var(--sw-purple)', fontWeight: 800 }}>Database Index</div>
                  <div style={{ fontSize: 12, color: 'var(--sw-text-muted)' }}>Livros: Machado de Assis (Key)</div>
                </div>
                <span style={{ color: 'var(--sw-text-muted)' }}>→</span>
                <div style={boxStyle}>
                  <div style={{ color: 'var(--sw-pink)', fontWeight: 800 }}>Content</div>
                  <div style={{ fontSize: 12, color: 'var(--sw-text-muted)' }}>"Dom Casmurro é uma obra..." (Value)</div>
                </div>
             </div>

             <PanelCard style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)' }}>
               <h4 style={{ fontWeight: 800, color: 'var(--sw-cyan)', marginBottom: 8 }}>{copy.tabs.retrieval.databaseAnalogyTitle}</h4>
               <p style={{ fontSize: 14, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>{copy.tabs.retrieval.databaseAnalogyText}</p>
             </PanelCard>

             <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: 'var(--sw-text-muted)', fontStyle: 'italic' }}>
                  A diferença é que no Transformer isso é "Soft": pegamos um pouco de cada resposta, ponderado pelo match.
                </p>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: 24,
      background: 'rgba(10,12,18,0.5)',
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeep,
      minHeight: 0,
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--sw-text)', letterSpacing: '-0.02em' }}>{copy.title}</h2>
        <div style={{ width: 320 }}>
          <TabsBar 
            items={tabs} 
            activeIndex={activeTab} 
            onChange={setActiveTab} 
            ariaLabel="QKV Tabs" 
          />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}>
        {renderContent()}
      </div>
    </div>
  );
});

const cardStyle = (accent: string): React.CSSProperties => ({
  background: 'rgba(255,255,255,0.02)',
  border: `1px solid ${accent}22`,
  borderRadius: 20,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 12,
  boxShadow: `0 10px 30px ${accent}08`,
});

const iconBadgeStyle = (color: string): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: 14,
  background: color,
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  fontWeight: 900,
  boxShadow: `0 4px 15px ${color}44`,
});

const cardTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
  color: 'var(--sw-text)',
  margin: 0,
};

const cardDescStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: 'var(--sw-text-dim)',
  margin: 0,
  lineHeight: 1.45,
};

const mathBlockStyle = (color: string): React.CSSProperties => ({
  padding: '12px 20px',
  background: 'rgba(255,255,255,0.03)',
  border: `1px solid ${color}44`,
  borderRadius: 12,
  color: color,
  fontFamily: 'monospace',
  fontWeight: 700,
  fontSize: 14,
});

const boxStyle: React.CSSProperties = {
  padding: 16,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 16,
  textAlign: 'center',
  flex: 1,
};
