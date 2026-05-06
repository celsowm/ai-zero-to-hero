import React, { useState, useEffect } from 'react';
import { sw } from '../../../theme/tokens';
import { JsonlViewer } from '../../JsonlViewer';
import type { SyntheticDataValdoriaVisualCopy } from '../../../types/slide';

interface SyntheticDataValdoriaVisualProps {
  copy: SyntheticDataValdoriaVisualCopy;
}

const fetchJsonl = async (fileRef: string): Promise<string> => {
  const resp = await fetch(fileRef);
  if (!resp.ok) return '';
  return resp.text();
};

export const SyntheticDataValdoriaVisual = React.memo(({ copy }: SyntheticDataValdoriaVisualProps) => {
  const [activeTab, setActiveTab] = useState<'dataset' | 'before' | 'after'>('dataset');
  const [jsonlContent, setJsonlContent] = useState<string>('');

  useEffect(() => {
    fetchJsonl(copy.fileRef).then(setJsonlContent);
  }, [copy.fileRef]);

  const tabs = [
    { key: 'dataset' as const, label: copy.datasetLabel },
    { key: 'before' as const, label: copy.beforeLabel },
    { key: 'after' as const, label: copy.afterLabel },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Title + Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sw-text)' }}>
          {copy.title}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--sw-text-muted)', marginTop: '2px' }}>
          {copy.subtitle}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        padding: '3px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '6px 8px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 600,
              background: activeTab === tab.key
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
              color: activeTab === tab.key
                ? 'var(--sw-text)'
                : 'var(--sw-text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dataset' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{ fontSize: '10px', color: 'var(--sw-text-muted)', marginBottom: '8px' }}>
            {copy.valdoriaDescription}
          </div>
          {jsonlContent ? (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <JsonlViewer jsonlContent={jsonlContent} fileName="synthetic-data-valdoria" />
            </div>
          ) : (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              fontSize: '10px',
              color: 'var(--sw-text-muted)',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
            }}>
              Carregando dataset...
            </div>
          )}
        </div>
      )}

      {activeTab === 'before' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '8px',
          }}>
            <div style={{
              fontSize: '9px',
              fontWeight: 600,
              color: '#f59e0b',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {copy.systemContent}
            </div>
            <div style={{
              fontSize: '9px',
              color: 'var(--sw-text-muted)',
              marginBottom: '8px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ color: '#64c8ff' }}>User: </span>{copy.promptTest}
            </div>
            <div style={{
              fontSize: '10px',
              color: '#f87171',
              lineHeight: 1.5,
              fontStyle: 'italic',
              padding: '8px',
              background: 'rgba(239,68,68,0.06)',
              borderRadius: '6px',
              borderLeft: '2px solid #ef4444',
            }}>
              {copy.beforeResponse}
            </div>
          </div>
          <div style={{
            fontSize: '9px',
            color: 'var(--sw-text-muted)',
            textAlign: 'center',
          }}>
            {copy.beforeCaption}
          </div>
        </div>
      )}

      {activeTab === 'after' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '8px',
          }}>
            <div style={{
              fontSize: '9px',
              fontWeight: 600,
              color: '#10b981',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {copy.systemContent}
            </div>
            <div style={{
              fontSize: '9px',
              color: 'var(--sw-text-muted)',
              marginBottom: '8px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ color: '#64c8ff' }}>User: </span>{copy.promptTest}
            </div>
            <div style={{
              fontSize: '10px',
              color: '#6ee7b7',
              lineHeight: 1.5,
              padding: '8px',
              background: 'rgba(16,185,129,0.06)',
              borderRadius: '6px',
              borderLeft: '2px solid #10b981',
            }}>
              {copy.afterResponse}
            </div>
          </div>
          <div style={{
            fontSize: '9px',
            color: 'var(--sw-text-muted)',
            textAlign: 'center',
          }}>
            {copy.afterCaption}
          </div>
        </div>
      )}

      {/* Tab Hint */}
      <div style={{
        marginTop: '12px',
        fontSize: '9px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.tapHint}
      </div>
    </div>
  );
});
