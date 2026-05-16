import React from 'react';
import { sw } from '../../../theme/tokens';

interface JinjaChatmlPracticeVisualCopy {
  title: string;
  templateLabel: string;
  renderedLabel: string;
  messagesLabel: string;
  templateContent: string;
  renderedContent: string;
  addGenerationPromptLabel: string;
  systemMsg: string;
  userMsg: string;
}

interface JinjaChatmlPracticeVisualProps {
  copy: JinjaChatmlPracticeVisualCopy;
}

export const JinjaChatmlPracticeVisual = React.memo(({ copy }: JinjaChatmlPracticeVisualProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '28px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, textAlign: 'center' }}>
        {copy.messagesLabel}
      </div>

      <div style={{
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
        fontSize: '12px',
        fontFamily: 'monospace',
        color: sw.textDim,
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
      }}>
        {copy.systemMsg}
        {'\n'}
        {copy.userMsg}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.purple, marginBottom: '8px' }}>
            {copy.templateLabel}
          </div>
          <pre style={{
            margin: 0,
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            border: `1px solid ${sw.purple}22`,
            fontSize: '12px',
            fontFamily: 'monospace',
            color: sw.cyan,
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}>
            {copy.templateContent}
          </pre>
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.cyan, marginBottom: '8px' }}>
            {copy.renderedLabel}
          </div>
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 229, 255, 0.04)',
            borderRadius: '12px',
            border: `1px solid ${sw.cyan}22`,
            fontSize: '12px',
            fontFamily: 'monospace',
            color: sw.text,
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
          }}>
            {copy.renderedContent}
          </div>
        </div>
      </div>

      <div style={{
        padding: '10px 14px',
        background: 'rgba(251, 191, 36, 0.06)',
        borderRadius: '10px',
        border: `1px solid ${sw.yellow}33`,
        fontSize: '11px',
        color: sw.textDim,
        lineHeight: '1.6',
      }}>
        {copy.addGenerationPromptLabel}
      </div>
    </div>
  );
});
