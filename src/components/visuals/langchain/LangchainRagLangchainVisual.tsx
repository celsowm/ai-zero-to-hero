import React from 'react';
import type { LangchainRagLangchainCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainRagLangchainProps {
  copy: LangchainRagLangchainCopy;
}

export const LangchainRagLangchainVisual = React.memo(({ copy }: LangchainRagLangchainProps) => {
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
      gap: '32px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Ingest Phase */}
      <div style={{
        padding: '20px',
        background: 'rgba(168, 85, 247, 0.06)',
        borderRadius: '16px',
        border: `1px solid ${sw.purple}22`,
      }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: sw.purple, marginBottom: '16px', textTransform: 'uppercase' }}>
          {copy.loadLabel} → {copy.splitLabel} → {copy.storeLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '📄', label: copy.documentLabel, color: sw.purple },
            { icon: '✂️', label: copy.chunkLabel, color: sw.pink },
            { icon: '🗃️', label: copy.vectorstoreLabel, color: sw.cyan },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                padding: '12px 18px',
                background: `${step.color}12`,
                borderRadius: '12px',
                border: `1px solid ${step.color}33`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>{step.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: step.color }}>{step.label}</span>
              </div>
              {i < arr.length - 1 && <span style={{ color: sw.cyan, fontSize: '16px' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Query Phase */}
      <div style={{
        padding: '20px',
        background: 'rgba(0, 229, 255, 0.06)',
        borderRadius: '16px',
        border: `1px solid ${sw.cyan}22`,
      }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: sw.cyan, marginBottom: '16px', textTransform: 'uppercase' }}>
          {copy.retrieveLabel} → {copy.qaChainLabel} → {copy.answerLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '❓', label: 'Query', color: sw.cyan },
            { icon: '🔍', label: copy.retrieverLabel, color: sw.pink },
            { icon: '📋', label: 'Context', color: sw.purple },
            { icon: '🤖', label: 'LLM', color: '#f59e0b' },
            { icon: '✅', label: copy.answerLabel, color: '#10b981' },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                padding: '12px 18px',
                background: `${step.color}12`,
                borderRadius: '12px',
                border: `1px solid ${step.color}33`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>{step.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: step.color }}>{step.label}</span>
              </div>
              {i < arr.length - 1 && <span style={{ color: sw.cyan, fontSize: '16px' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
});
