import React, { useState } from 'react';
import type { SglangDeepDiveCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface SglangDeepDiveProps {
  copy: SglangDeepDiveCopy;
}

export const SglangDeepDiveVisual = React.memo(({ copy }: SglangDeepDiveProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    { type: copy.generateLabel, content: 'LLM gera token: "1"', color: sw.cyan },
    { type: copy.validateLabel, content: `regex: /^\{.+\}$/ — válido? ✅`, color: sw.purple },
    { type: copy.generateLabel, content: 'LLM gera token: `"name":' , color: sw.cyan },
    { type: copy.validateLabel, content: `schema: string esperado — OK ✅`, color: sw.purple },
    { type: copy.acceptLabel, content: `{ "name": "RAG", "desc": "Retrieval-Augmented" }`, color: '#10b981' },
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
        {copy.titleLabel}
      </div>

      {/* Step-by-step */}
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

      {/* Nav buttons */}
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

      {/* Constraint types */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{
          padding: '14px',
          background: `${sw.purple}08`,
          borderRadius: '10px',
          border: `1px solid ${sw.purple}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.purple, marginBottom: '6px' }}>
            {copy.regexLabel}
          </div>
          <div style={{ fontSize: '12px', fontFamily: sw.fontMono, color: sw.textDim }}>
            ^\d{4}-\d{2}-\d{2}$
          </div>
        </div>
        <div style={{
          padding: '14px',
          background: `${sw.cyan}08`,
          borderRadius: '10px',
          border: `1px solid ${sw.cyan}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.cyan, marginBottom: '6px' }}>
            {copy.schemaLabel}
          </div>
          <div style={{ fontSize: '12px', fontFamily: sw.fontMono, color: sw.textDim }}>
            {"{type: 'object', properties: {...}}"}
          </div>
        </div>
      </div>
    </div>
  );
});
