import React from 'react';
import type { PeftFreezeDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface PeftFreezeDiagramProps {
  copy: PeftFreezeDiagramCopy;
}

export const PeftFreezeDiagram = React.memo(({ copy }: PeftFreezeDiagramProps) => {
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
      <div style={{ marginBottom: 18 }}>
        <div style={{ color: sw.cyan, fontWeight: 800, fontSize: 18 }}>{copy.title}</div>
        <div style={{ color: sw.textDim, fontSize: 13, marginTop: 4 }}>{copy.subtitle}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr', gap: 16, alignItems: 'stretch' }}>
        <div style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 8,
          padding: 18,
          background: 'rgba(80, 90, 110, 0.15)',
        }}>
          <div style={{ color: sw.textDim, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
            {copy.frozenBase}
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} style={{
                height: 18,
                borderRadius: 4,
                background: index % 3 === 0 ? 'rgba(0, 229, 255, 0.28)' : 'rgba(255,255,255,0.12)',
              }} />
            ))}
          </div>
          <div style={{ color: sw.textMuted, fontSize: 12, marginTop: 14 }}>{copy.baseParams}</div>
        </div>
        <div style={{
          border: `1px solid ${sw.cyan}66`,
          borderRadius: 8,
          padding: 18,
          background: 'rgba(0, 229, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div>
            <div style={{ color: sw.cyan, fontWeight: 900, fontSize: 15 }}>{copy.adapters}</div>
            <div style={{ color: sw.textDim, fontSize: 12, marginTop: 6 }}>{copy.gradients}</div>
          </div>
          <div style={{
            alignSelf: 'center',
            width: 110,
            height: 72,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${sw.cyan}, ${sw.purple})`,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 900,
          }}>
            A x B
          </div>
          <div style={{ color: sw.textMuted, fontSize: 12 }}>{copy.adapterParams}</div>
          <div style={{ color: sw.green, fontSize: 12, fontWeight: 800 }}>{copy.savedArtifact}</div>
        </div>
      </div>
    </div>
  );
});
