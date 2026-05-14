import React from 'react';
import { PanelCard } from '../PanelCard';

interface Copy {
  healthyLabel: string;
  overfitLabel: string;
  trainLoss: string;
  evalLoss: string;
}

export const EvalLossGeneralizationVisual = React.memo(({ copy }: { copy: Copy }) => {
  return (
    <PanelCard className="h-full flex flex-col items-center justify-center p-6 gap-6">
      
      {/* Healthy Chart Mock */}
      <div style={{ width: '100%', padding: '16px', background: 'rgba(52, 211, 153, 0.05)', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
        <div style={{ fontWeight: 'bold', color: '#34d399', marginBottom: '12px', fontSize: '14px' }}>✅ {copy.healthyLabel}</div>
        <div style={{ position: 'relative', height: '80px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Train curve */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <path d="M 0 10 Q 50 10, 100 60 T 200 75" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 15 Q 50 15, 100 55 T 200 65" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px', fontSize: '12px' }}>
          <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>— {copy.trainLoss}</span>
          <span style={{ color: '#f472b6', fontWeight: 'bold' }}>- - {copy.evalLoss}</span>
        </div>
      </div>

      {/* Overfitting Chart Mock */}
      <div style={{ width: '100%', padding: '16px', background: 'rgba(244, 114, 182, 0.05)', borderRadius: '12px', border: '1px solid rgba(244, 114, 182, 0.2)' }}>
        <div style={{ fontWeight: 'bold', color: '#f472b6', marginBottom: '12px', fontSize: '14px' }}>❌ {copy.overfitLabel}</div>
        <div style={{ position: 'relative', height: '80px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Train curve */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <path d="M 0 10 Q 50 10, 100 60 T 200 75" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 15 Q 50 15, 100 40 T 200 10" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px', fontSize: '12px' }}>
          <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>— {copy.trainLoss}</span>
          <span style={{ color: '#f472b6', fontWeight: 'bold' }}>- - {copy.evalLoss}</span>
        </div>
      </div>

    </PanelCard>
  );
});
