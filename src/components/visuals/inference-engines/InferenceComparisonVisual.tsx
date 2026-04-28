import React, { useState } from 'react';
import type { InferenceComparisonCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface InferenceComparisonProps {
  copy: InferenceComparisonCopy;
}

export const InferenceComparisonVisual = React.memo(({ copy }: InferenceComparisonProps) => {
  const [activeCriterion, setActiveCriterion] = useState<string>('throughput');

  const engines = [
    {
      name: 'Transformers\npipeline/server',
      color: sw.purple,
      scores: {
        throughput: 2,
        latency: 3,
        setup: 5,
        hardware: 4,
        useCase: 'Dev / test',
      },
    },
    {
      name: 'ONNX\nRuntime',
      color: sw.cyan,
      scores: {
        throughput: 3,
        latency: 4,
        setup: 4,
        hardware: 5,
        useCase: 'CPU / Edge',
      },
    },
    {
      name: 'vLLM',
      color: '#10b981',
      scores: {
        throughput: 5,
        latency: 3,
        setup: 3,
        hardware: 4,
        useCase: 'GPU high-throughput',
      },
    },
    {
      name: 'sglang',
      color: '#f59e0b',
      scores: {
        throughput: 5,
        latency: 5,
        setup: 2,
        hardware: 4,
        useCase: 'GPU + structured output',
      },
    },
  ];

  const criteria = [
    { key: 'throughput', label: copy.throughputLabel, icon: '📊' },
    { key: 'latency', label: copy.latencyLabel, icon: '⚡' },
    { key: 'setup', label: copy.setupLabel, icon: '🔧' },
    { key: 'hardware', label: copy.hardwareLabel, icon: '🖥️' },
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

      {/* Criterion selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {criteria.map(c => (
          <button
            key={c.key}
            onClick={() => setActiveCriterion(c.key)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: `2px solid ${activeCriterion === c.key ? sw.cyan : sw.borderSubtle}`,
              background: activeCriterion === c.key ? `${sw.cyan}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '18px' }}>{c.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: activeCriterion === c.key ? sw.cyan : sw.text }}>
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Comparison matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
        {engines.map(engine => (
          <div key={engine.name} style={{
            padding: '20px',
            background: `${engine.color}06`,
            borderRadius: '12px',
            border: `1px solid ${engine.color}22`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: engine.color, textAlign: 'center', whiteSpace: 'pre-line' }}>
              {engine.name}
            </div>

            {/* Score bars */}
            {criteria.map(c => {
              const score = engine.scores[c.key as keyof typeof engine.scores] as number;
              return (
                <div key={c.key} style={{ width: '100%' }}>
                  <div style={{ fontSize: '11px', color: sw.textDim, marginBottom: '4px' }}>
                    {c.label}
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'rgba(26, 22, 40, 0.6)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(score / 5) * 100}%`,
                      background: activeCriterion === c.key ? engine.color : `${engine.color}44`,
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                    }} />
                  </div>
                </div>
              );
            })}

            {/* Use case */}
            <div style={{
              padding: '8px 12px',
              background: 'rgba(26, 22, 40, 0.8)',
              borderRadius: '8px',
              fontSize: '11px',
              color: sw.textDim,
              textAlign: 'center',
              width: '100%',
            }}>
              {engine.scores.useCase as string}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
