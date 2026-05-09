import React, { useState } from 'react';
import type { ReActFlowVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: ReActFlowVisualCopy }

interface ReactStep {
  type: 'thought' | 'action' | 'observation';
  content: string;
}

const sampleSteps: ReactStep[] = [
  { type: 'thought', content: '"Preciso buscar preços em ambas as lojas."' },
  { type: 'action', content: 'buscar_preco(loja="Amazon", produto="iPhone 15")' },
  { type: 'observation', content: 'Amazon: R$ 7.499' },
  { type: 'thought', content: '"Agora busco na Magazine Luiza."' },
  { type: 'action', content: 'buscar_preco(loja="MagazineLuiza", produto="iPhone 15")' },
  { type: 'observation', content: 'Magazine Luiza: R$ 7.299' },
  { type: 'thought', content: '"Tenho ambos. Magazine Luiza é R$ 200 mais barata."' },
];

export const ReActFlowVisual = React.memo(({ copy }: Props) => {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);

  const runReAct = () => {
    setRunning(true);
    setVisibleSteps(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleSteps(i);
      if (i >= sampleSteps.length) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 800);
  };

  const handleReset = () => {
    setVisibleSteps(0);
    setRunning(false);
  };

  const typeColors = {
    thought: sw.purple,
    action: sw.emerald,
    observation: sw.amber,
  };
  const typeLabels = {
    thought: copy.thoughtLabel,
    action: copy.actionLabel,
    observation: copy.observationLabel,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={runReAct}
          disabled={running}
          style={{
            padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
            border: `1px solid ${sw.purple}44`, background: `${sw.purple}22`, color: sw.purple,
            cursor: running ? 'not-allowed' : 'pointer', opacity: running ? 0.5 : 1,
          }}
        >
          {running ? 'Executando...' : `▶ ${copy.startButton}`}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
            border: `1px solid ${sw.borderSubtle}44`, background: sw.surface, color: sw.textMuted,
            cursor: 'pointer',
          }}
        >
          {copy.resetButton}
        </button>
      </div>

      {/* ReAct steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
        {sampleSteps.slice(0, visibleSteps).map((step, i) => (
          <div
            key={i}
            style={{
              padding: '6px 8px', borderRadius: '8px',
              borderLeft: `3px solid ${typeColors[step.type]}`,
              background: `${typeColors[step.type]}08`,
              fontSize: '10px', color: sw.text, lineHeight: '1.4',
            }}
          >
            <strong style={{ color: typeColors[step.type], fontSize: '9px', textTransform: 'uppercase' }}>
              {typeLabels[step.type]}
            </strong>
            <br />
            <span style={{ fontFamily: 'monospace' }}>{step.content}</span>
          </div>
        ))}
      </div>

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
