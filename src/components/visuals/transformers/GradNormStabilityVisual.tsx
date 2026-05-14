import React from 'react';
import { PanelCard } from '../PanelCard';

interface Copy {
  schedulerTitle: string;
  warmup: string;
  decay: string;
  gradNormTitle: string;
  spike: string;
}

export const GradNormStabilityVisual = React.memo(({ copy }: { copy: Copy }) => {
  return (
    <PanelCard className="h-full flex flex-col items-center justify-center p-6 gap-6">
      
      <div style={{ width: '100%', padding: '16px', background: 'rgba(250, 204, 21, 0.05)', borderRadius: '12px', border: '1px solid rgba(250, 204, 21, 0.2)' }}>
        <div style={{ fontWeight: 'bold', color: '#facc15', marginBottom: '12px', fontSize: '14px' }}>📈 {copy.schedulerTitle}</div>
        <div style={{ position: 'relative', height: '80px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Warmup + Cosine */}
            <path d="M 0 70 L 30 10 Q 100 10, 200 70" fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <text x="5" y="45" fill="#facc15" fontSize="10">{copy.warmup}</text>
            <text x="130" y="45" fill="#facc15" fontSize="10">{copy.decay}</text>
          </svg>
        </div>
      </div>

      <div style={{ width: '100%', padding: '16px', background: 'rgba(244, 114, 182, 0.05)', borderRadius: '12px', border: '1px solid rgba(244, 114, 182, 0.2)' }}>
        <div style={{ fontWeight: 'bold', color: '#f472b6', marginBottom: '12px', fontSize: '14px' }}>⚖️ {copy.gradNormTitle}</div>
        <div style={{ position: 'relative', height: '80px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Stable then spike */}
            <path d="M 0 60 L 20 55 L 40 65 L 60 55 L 80 60 L 100 -20 L 120 65 L 140 55 L 200 60" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="100" cy="-20" r="4" fill="#ef4444" />
            <text x="110" y="-15" fill="#ef4444" fontSize="12" fontWeight="bold">{copy.spike}</text>
          </svg>
        </div>
      </div>

    </PanelCard>
  );
});
