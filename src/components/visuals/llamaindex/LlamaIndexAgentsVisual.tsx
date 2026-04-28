import React, { useState } from 'react';
import type { LlamaIndexAgentsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexAgentsProps {
  copy: LlamaIndexAgentsCopy;
}

export const LlamaIndexAgentsVisual = React.memo(({ copy }: LlamaIndexAgentsProps) => {
  const [activeAgent, setActiveAgent] = useState<'react' | 'fc'>('react');
  const [step, setStep] = useState(0);

  const reactSteps = [
    { type: copy.thoughtLabel, content: 'Preciso buscar informações sobre X', color: sw.purple },
    { type: copy.actionLabel, content: 'call_tool("search", "X")', color: sw.pink },
    { type: copy.observationLabel, content: 'Resultados: [doc1, doc2, doc3]', color: sw.cyan },
    { type: copy.thoughtLabel, content: 'Agora tenho contexto suficiente', color: sw.purple },
    { type: copy.answerLabel, content: 'Com base nos documentos...', color: '#10b981' },
  ];

  const fcSteps = [
    { type: copy.thoughtLabel, content: 'User asks about weather', color: sw.purple },
    { type: copy.actionLabel, content: 'get_weather(location="SP")', color: sw.pink },
    { type: copy.observationLabel, content: '{"temp": 28, "condition": "sunny"}', color: sw.cyan },
    { type: copy.answerLabel, content: 'It\'s 28°C and sunny in São Paulo', color: '#10b981' },
  ];

  const currentSteps = activeAgent === 'react' ? reactSteps : fcSteps;

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

      {/* Agent type selector */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { key: 'react' as const, label: copy.reActLabel, icon: '🧠', color: sw.purple, desc: copy.reActDesc },
          { key: 'fc' as const, label: copy.functionCallingLabel, icon: '⚡', color: sw.cyan, desc: copy.fcDesc },
        ].map(agent => (
          <button
            key={agent.key}
            onClick={() => { setActiveAgent(agent.key); setStep(0); }}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: `2px solid ${activeAgent === agent.key ? agent.color : sw.borderSubtle}`,
              background: activeAgent === agent.key ? `${agent.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{agent.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeAgent === agent.key ? agent.color : sw.text }}>
              {agent.label}
            </span>
          </button>
        ))}
      </div>

      {/* Step-by-step */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentSteps.map((s, i) => (
          <React.Fragment key={i}>
            <div
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
          </React.Fragment>
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
          onClick={() => setStep(Math.min(currentSteps.length - 1, step + 1))}
          disabled={step === currentSteps.length - 1}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${sw.cyan}`,
            background: step === currentSteps.length - 1 ? 'rgba(26, 22, 40, 0.8)' : `${sw.cyan}15`,
            color: step === currentSteps.length - 1 ? sw.textDim : sw.cyan,
            cursor: step === currentSteps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '13px',
          }}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
});
