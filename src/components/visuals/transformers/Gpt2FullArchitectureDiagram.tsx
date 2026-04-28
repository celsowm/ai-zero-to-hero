import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { Gpt2FullArchitectureDiagramCopy } from '../../../types/slide';

interface Gpt2FullArchitectureDiagramProps {
  copy: Gpt2FullArchitectureDiagramCopy;
}

export const Gpt2FullArchitectureDiagram = React.memo(({ copy }: Gpt2FullArchitectureDiagramProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const stages = [
    {
      id: 'input',
      label: copy.inputStage,
      icon: '📝',
      color: sw.purple,
      bg: 'rgba(99, 102, 241, 0.12)',
      items: ['Texto → Tokens → Embeddings → Position']
    },
    {
      id: 'blocks',
      label: copy.blocksStage,
      icon: '🧱',
      color: sw.pink,
      bg: 'rgba(255, 46, 151, 0.1)',
      items: ['Self-Attention', 'MLP', 'Residual Add', '×12 blocks']
    },
    {
      id: 'output',
      label: copy.outputStage,
      icon: '🎯',
      color: sw.cyan,
      bg: 'rgba(34, 211, 238, 0.1)',
      items: ['Unembedding × Vocab', 'Softmax(+Temp)', 'Sample token']
    }
  ];

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Stages flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <div
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              style={{
                padding: '16px 20px',
                background: selectedStage === stage.id ? stage.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selectedStage === stage.id ? stage.color : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{stage.icon}</span>
                <div style={{
                  flex: 1,
                  fontWeight: '600',
                  color: stage.color,
                  fontSize: '13px'
                }}>
                  {stage.label}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: sw.textMuted,
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {selectedStage === stage.id ? '▼' : '▶'}
                </div>
              </div>
              {selectedStage === stage.id && (
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {stage.items.map((item, j) => (
                    <span key={j} style={{
                      padding: '4px 10px',
                      background: `${stage.color}20`,
                      border: `1px solid ${stage.color}40`,
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: stage.color,
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow between stages */}
            {i < stages.length - 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '4px 0',
                color: sw.textMuted,
                fontSize: '14px'
              }}>
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Loop hint */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px dashed rgba(255,255,255,0.1)',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '11px',
        color: sw.textMuted
      }}>
        <span style={{ color: sw.pink }}>↻</span> Token gerado → cola no texto → repete
      </div>

    </div>
  );
});
