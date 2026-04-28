import React, { useState } from 'react';
import type { LlamaIndexRetrieversCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexRetrieversProps {
  copy: LlamaIndexRetrieversCopy;
}

export const LlamaIndexRetrieversVisual = React.memo(({ copy }: LlamaIndexRetrieversProps) => {
  const [activeType, setActiveType] = useState<'vector' | 'bm25' | 'router'>('vector');

  const retrievers = {
    vector: {
      icon: '🎯',
      label: copy.vectorLabel,
      desc: copy.semanticDesc,
      color: sw.cyan,
      scores: [0.92, 0.87, 0.81, 0.74],
    },
    bm25: {
      icon: '🔤',
      label: copy.bm25Label,
      desc: copy.keywordDesc,
      color: sw.pink,
      scores: [0.85, 0.79, 0.62, 0.58],
    },
    router: {
      icon: '🔀',
      label: copy.routerLabel,
      desc: copy.autoSelectDesc,
      color: '#10b981',
      scores: [0.92, 0.87, 0.85, 0.79],
    },
  };

  const current = retrievers[activeType];

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

      {/* Type selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {(Object.entries(retrievers) as [string, typeof current][]).map(([key, r]) => (
          <button
            key={key}
            onClick={() => setActiveType(key as typeof activeType)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: `2px solid ${activeType === key ? r.color : sw.borderSubtle}`,
              background: activeType === key ? `${r.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{r.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeType === key ? r.color : sw.textDim }}>
              {r.label}
            </span>
          </button>
        ))}
      </div>

      {/* Description */}
      <div style={{
        padding: '14px',
        background: `${current.color}08`,
        borderRadius: '10px',
        border: `1px solid ${current.color}22`,
        fontSize: '13px',
        color: sw.textDim,
        textAlign: 'center',
      }}>
        {current.desc}
      </div>

      {/* Scores bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, textTransform: 'uppercase' }}>
          {copy.scoreLabel}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          {current.scores.map((score, i) => (
            <div key={i} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '80px',
                height: `${score * 80}px`,
                background: `linear-gradient(180deg, ${current.color}cc, ${current.color}44)`,
                borderRadius: '6px 6px 2px 2px',
                transition: 'height 0.3s ease',
              }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: current.color }}>
                {score.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: sw.textDim, textAlign: 'center' }}>
          {copy.topKLabel}: 4
        </div>
      </div>
    </div>
  );
});
