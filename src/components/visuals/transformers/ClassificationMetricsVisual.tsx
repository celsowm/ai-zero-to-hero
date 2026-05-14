import React from 'react';
import { PanelCard } from '../PanelCard';

interface Copy {
  precisionTitle: string;
  precisionDesc: string;
  recallTitle: string;
  recallDesc: string;
}

export const ClassificationMetricsVisual = React.memo(({ copy }: { copy: Copy }) => {
  return (
    <PanelCard className="h-full flex flex-col items-center justify-center p-6 gap-6">
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Precision */}
        <div style={{ background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '24px' }}>🎯</div>
            <div style={{ fontWeight: 'bold', color: '#34d399', fontSize: '18px' }}>{copy.precisionTitle}</div>
          </div>
          <p style={{ color: 'var(--sw-text-muted)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
            {copy.precisionDesc}
          </p>
        </div>

        {/* Recall */}
        <div style={{ background: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '24px' }}>🔍</div>
            <div style={{ fontWeight: 'bold', color: '#60a5fa', fontSize: '18px' }}>{copy.recallTitle}</div>
          </div>
          <p style={{ color: 'var(--sw-text-muted)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
            {copy.recallDesc}
          </p>
        </div>

        {/* F1 */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '20px', padding: '8px 24px', color: '#a855f7', fontWeight: 'bold', fontSize: '14px' }}>
            F1-Score = Balance
          </div>
        </div>

      </div>

    </PanelCard>
  );
});
