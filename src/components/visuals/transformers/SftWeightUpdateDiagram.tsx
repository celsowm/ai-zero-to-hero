import React from 'react';
import type { SftWeightUpdateDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface SftWeightUpdateDiagramProps {
  copy: SftWeightUpdateDiagramCopy;
}

const boxStyle: React.CSSProperties = {
  border: `1px solid ${sw.borderSubtle}`,
  borderRadius: 8,
  padding: '16px',
  background: 'rgba(12, 15, 24, 0.82)',
  minHeight: 96,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
};

export const SftWeightUpdateDiagram = React.memo(({ copy }: SftWeightUpdateDiagramProps) => {
  const stages = [
    { label: 'W', title: copy.baseWeights, detail: copy.trainable, color: sw.cyan },
    { label: 'dL/dW', title: copy.gradients, detail: 'backward()', color: sw.pink },
    { label: 'step()', title: copy.optimizer, detail: 'AdamW / SGD', color: sw.yellow },
    { label: "W'", title: copy.updatedWeights, detail: copy.checkpoint, color: sw.green },
  ];

  return (
    <div style={{
      width: '100%',
      padding: 24,
      borderRadius: 8,
      border: `1px solid ${sw.borderSubtle}`,
      background: 'linear-gradient(180deg, rgba(9, 14, 24, 0.96), rgba(15, 17, 28, 0.98))',
      color: sw.text,
      fontFamily: sw.fontSans,
      boxShadow: sw.shadowDeep,
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: sw.cyan, fontWeight: 800, fontSize: 18 }}>{copy.title}</div>
        <div style={{ color: sw.textDim, fontSize: 13, marginTop: 4 }}>{copy.subtitle}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        {stages.map((stage) => (
          <div key={stage.label} style={boxStyle}>
            <div style={{ color: stage.color, fontWeight: 900, fontSize: 22 }}>{stage.label}</div>
            <div style={{ fontWeight: 750, fontSize: 13 }}>{stage.title}</div>
            <div style={{ color: sw.textDim, fontSize: 12 }}>{stage.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
