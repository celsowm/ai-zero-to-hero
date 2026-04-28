import React, { useState } from 'react';
import type { LlamaIndexDataLoadersCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexDataLoadersProps {
  copy: LlamaIndexDataLoadersCopy;
}

export const LlamaIndexDataLoadersVisual = React.memo(({ copy }: LlamaIndexDataLoadersProps) => {
  const [activeLoader, setActiveLoader] = useState(0);

  const loaders = [
    { icon: '📁', label: copy.directoryLabel, code: 'SimpleDirectoryReader', desc: copy.filesLabel, nodes: '~120' },
    { icon: '🌐', label: copy.webLabel, code: 'SimpleWebPageReader', desc: 'URLs → text', nodes: '~45' },
    { icon: '🗄️', label: copy.databaseLabel, code: 'DatabaseReader', desc: 'SQL → rows', nodes: '~80' },
    { icon: '💻', label: copy.codeLabel, code: 'CodeReader', desc: '.py/.ts → AST', nodes: '~200' },
  ];

  const current = loaders[activeLoader];

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Loader selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {loaders.map((l, i) => (
          <button
            key={i}
            onClick={() => setActiveLoader(i)}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: `2px solid ${i === activeLoader ? sw.cyan : sw.borderSubtle}`,
              background: i === activeLoader ? 'rgba(0, 229, 255, 0.1)' : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '24px' }}>{l.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: i === activeLoader ? sw.cyan : sw.text }}>
              {l.label}
            </span>
            <span style={{ fontSize: '11px', color: sw.textDim }}>{l.code}</span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div style={{
        padding: '20px',
        background: 'rgba(0, 229, 255, 0.06)',
        borderRadius: '12px',
        border: `1px solid ${sw.cyan}22`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: sw.cyan }}>
            {current.icon} {current.code}
          </span>
          <span style={{
            padding: '4px 12px',
            background: 'rgba(168, 85, 247, 0.15)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            color: sw.purple,
          }}>
            {copy.loaderCount}: {current.nodes} {copy.nodesLabel}
          </span>
        </div>
        <div style={{ fontSize: '13px', color: sw.textDim }}>{current.desc}</div>
      </div>
    </div>
  );
});
