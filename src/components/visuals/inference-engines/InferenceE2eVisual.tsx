import React, { useState } from 'react';
import type { InferenceE2eCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface InferenceE2eProps {
  copy: InferenceE2eCopy;
}

export const InferenceE2eVisual = React.memo(({ copy }: InferenceE2eProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: 1, label: copy.step1Label, desc: copy.step1Desc, icon: '📝', color: sw.purple, code: 'pipeline("text-generation")' },
    { num: 2, label: copy.step2Label, desc: copy.step2Desc, icon: '⚙️', color: sw.cyan, code: 'optimum-cli export onnx' },
    { num: 3, label: copy.step3Label, desc: copy.step3Desc, icon: '🚀', color: sw.pink, code: 'vllm serve model' },
    { num: 4, label: copy.step4Label, desc: copy.step4Desc, icon: '📡', color: '#10b981', code: 'OpenAI(base_url="http://localhost:8000")' },
    { num: 5, label: copy.step5Label, desc: copy.step5Desc, icon: '⚡', color: '#f59e0b', code: 'stream=True → token by token' },
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

      {/* Step selector */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              border: `2px solid ${i <= activeStep ? s.color : sw.borderSubtle}`,
              background: i === activeStep ? `${s.color}18` : i < activeStep ? `${s.color}08` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <span style={{ fontSize: '18px' }}>{s.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: i <= activeStep ? s.color : sw.textDim }}>
              {s.num}
            </span>
          </button>
        ))}
      </div>

      {/* Active step detail */}
      {steps.map((s, i) => (
        i === activeStep && (
          <div key={i} style={{
            padding: '24px',
            background: `${s.color}08`,
            borderRadius: '16px',
            border: `1px solid ${s.color}22`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: s.color }}>
                  Step {s.num}: {s.label}
                </div>
                <div style={{ fontSize: '13px', color: sw.textDim, fontFamily: sw.fontMono }}>
                  {s.code}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: sw.text, lineHeight: 1.5 }}>
              {s.desc}
            </div>
          </div>
        )
      ))}

      {/* Progress bar */}
      <div style={{
        height: '4px',
        background: 'rgba(26, 22, 40, 0.8)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${((activeStep + 1) / steps.length) * 100}%`,
          background: `linear-gradient(90deg, ${steps[0].color}, ${steps[activeStep].color})`,
          transition: 'width 0.3s ease',
          borderRadius: '2px',
        }} />
      </div>
    </div>
  );
});
