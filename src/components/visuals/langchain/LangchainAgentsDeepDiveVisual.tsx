import React, { useState } from 'react';
import type { LangchainAgentsDeepDiveCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainAgentsDeepDiveProps {
  copy: LangchainAgentsDeepDiveCopy;
}

export const LangchainAgentsDeepDiveVisual = React.memo(({ copy }: LangchainAgentsDeepDiveProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    { type: copy.thoughtLabel, content: 'User asks: "What is the weather?"', color: sw.purple },
    { type: copy.thoughtLabel, content: 'I should use the weather_search tool', color: sw.purple },
    { type: copy.actionLabel, content: 'weather_search(location="São Paulo")', color: sw.pink },
    { type: copy.observationLabel, content: '{"temp": 28, "condition": "sunny"}', color: sw.cyan },
    { type: copy.finalAnswerLabel, content: 'It\'s 28°C and sunny in São Paulo!', color: '#10b981' },
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {steps.map((s, i) => (
          <div
            key={i}
            onClick={() => setStep(i)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: `2px solid ${i <= step ? s.color : sw.borderSubtle}`,
              background: i === step ? `${s.color}15` : i < step ? `${s.color}08` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: i > step ? 0.4 : 1,
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '700', color: s.color, textTransform: 'uppercase', marginBottom: '4px' }}>
              {s.type}
            </div>
            <div style={{ fontSize: '13px', color: sw.text, fontFamily: sw.fontMono }}>
              {s.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${sw.borderSubtle}`,
            background: 'rgba(26, 22, 40, 0.8)',
            color: step === 0 ? sw.textDim : sw.text,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            fontSize: '13px',
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${sw.cyan}`,
            background: step === steps.length - 1 ? 'rgba(26, 22, 40, 0.8)' : `${sw.cyan}15`,
            color: step === steps.length - 1 ? sw.textDim : sw.cyan,
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '13px',
          }}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
});
