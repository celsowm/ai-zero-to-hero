import React from 'react';
import type { LlamaIndexPipelineVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexPipelineVisualProps {
  copy: LlamaIndexPipelineVisualCopy;
}

export const LlamaIndexPipelineVisual = React.memo(({ copy }: LlamaIndexPipelineVisualProps) => {
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
          {copy.ingestPhase}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '📄', label: copy.documentsLabel, color: sw.purple },
            { icon: '✂️', label: copy.chunkLabel, color: sw.pink },
            { icon: '🔢', label: copy.embedLabel, color: sw.cyan },
            { icon: '📇', label: copy.indexLabel, color: '#10b981' },
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
          {copy.queryPhase}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '❓', label: copy.questionLabel, color: sw.cyan },
            { icon: '🔍', label: copy.retrieveLabel, color: sw.pink },
            { icon: '📋', label: copy.contextLabel, color: sw.purple },
            { icon: '🤖', label: copy.llmLabel, color: '#f59e0b' },
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
