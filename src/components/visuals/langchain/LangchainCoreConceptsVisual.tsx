import React, { useState } from 'react';
import type { LangchainCoreConceptsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainCoreConceptsProps {
  copy: LangchainCoreConceptsCopy;
}

export const LangchainCoreConceptsVisual = React.memo(({ copy }: LangchainCoreConceptsProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: copy.conceptModel, icon: '🧠', color: sw.cyan, detail: copy.modelLabel },
    { label: copy.conceptPrompt, icon: '📝', color: sw.purple, detail: copy.promptLabel },
    { label: copy.conceptParser, icon: '🔧', color: sw.pink, detail: copy.parserLabel },
    { label: copy.conceptOutput, icon: '✅', color: '#10b981', detail: copy.outputLabel },
  ];

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setActiveStep(i)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: `2px solid ${i <= activeStep ? step.color : sw.borderSubtle}`,
                background: i === activeStep ? `${step.color}18` : 'rgba(26, 22, 40, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '72px',
              }}
            >
              <span style={{ fontSize: '22px' }}>{step.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: i <= activeStep ? step.color : sw.textDim }}>
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span style={{ fontSize: '18px', color: sw.cyan }}>{copy.flowArrow}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{
        padding: '20px',
        background: `${steps[activeStep].color}10`,
        borderRadius: '12px',
        border: `1px solid ${steps[activeStep].color}33`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: sw.textDim, textTransform: 'uppercase', marginBottom: '6px' }}>
          {steps[activeStep].icon} {steps[activeStep].label}
        </div>
        <div style={{ fontSize: '15px', fontWeight: '700', color: steps[activeStep].color }}>
          {steps[activeStep].detail}
        </div>
      </div>
    </div>
  );
});
