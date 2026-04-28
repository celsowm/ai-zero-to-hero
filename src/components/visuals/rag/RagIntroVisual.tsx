import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagIntroVisualCopy } from '../../../types/slide';

interface RagIntroVisualProps {
  copy: RagIntroVisualCopy;
}

export const RagIntroVisual = React.memo(({ copy }: RagIntroVisualProps) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % (totalSteps + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{
      width: '100%',
      padding: '20px 16px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Flow diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Query */}
        <div style={{
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px 8px 0 0',
          border: `1px solid ${sw.borderSubtle}`,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: sw.text }}>
            💬 {copy.queryLabel}
          </span>
        </div>

        {/* Step 1: Retrieve */}
        <div style={{
          padding: '12px 16px',
          background: step >= 1 ? `${sw.cyan}12` : 'transparent',
          borderLeft: `3px solid ${step >= 1 ? sw.cyan : 'transparent'}`,
          transition: 'all 0.5s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: step >= 1 ? `${sw.cyan}20` : 'rgba(255,255,255,0.05)',
            border: `2px solid ${step >= 1 ? sw.cyan : sw.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.5s ease-out',
          }}>
            🔍
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: sw.cyan }}>
              {copy.retrieveLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted }}>
              {copy.vectorDbLabel} → top-k docs
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '14px' }}>↓</div>

        {/* Step 2: Augment */}
        <div style={{
          padding: '12px 16px',
          background: step >= 2 ? `rgba(168,85,247,0.12)` : 'transparent',
          borderLeft: `3px solid ${step >= 2 ? '#a855f7' : 'transparent'}`,
          transition: 'all 0.5s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: step >= 2 ? `rgba(168,85,247,0.2)` : 'rgba(255,255,255,0.05)',
            border: `2px solid ${step >= 2 ? '#a855f7' : sw.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.5s ease-out',
          }}>
            📝
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#a855f7' }}>
              {copy.augmentLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted }}>
              {copy.contextLabel} + query → prompt
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '14px' }}>↓</div>

        {/* Step 3: Generate */}
        <div style={{
          padding: '12px 16px',
          background: step >= 3 ? `${sw.green}12` : 'transparent',
          borderLeft: `3px solid ${step >= 3 ? sw.green : 'transparent'}`,
          transition: 'all 0.5s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: step >= 3 ? `${sw.green}20` : 'rgba(255,255,255,0.05)',
            border: `2px solid ${step >= 3 ? sw.green : sw.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.5s ease-out',
          }}>
            🤖
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: sw.green }}>
              {copy.generateLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted }}>
              {copy.llmLabel} → {copy.answerLabel.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Answer */}
        <div style={{
          padding: '10px 16px',
          background: step >= 3 ? `${sw.green}08` : 'rgba(255,255,255,0.03)',
          borderRadius: '0 0 8px 8px',
          border: `1px solid ${step >= 3 ? sw.green + '33' : sw.borderSubtle}`,
          textAlign: 'center',
          transition: 'all 0.5s ease-out',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: step >= 3 ? sw.green : sw.textMuted }}>
            ✅ {copy.answerLabel}
          </span>
        </div>
      </div>
    </div>
  );
});
