import React from 'react';
import { PanelCard } from '../PanelCard';

interface Copy {
  q1Title: string;
  q1Desc: string;
  q2Title: string;
  q2Desc: string;
  q3Title: string;
  q3Desc: string;
  q4Title: string;
  q4Desc: string;
}

export const TrainingMetricsFamiliesVisual = React.memo(({ copy }: { copy: Copy }) => {
  const quadrants = [
    { title: copy.q1Title, desc: copy.q1Desc, icon: '📉', color: '#34d399' },
    { title: copy.q2Title, desc: copy.q2Desc, icon: '📈', color: '#60a5fa' },
    { title: copy.q3Title, desc: copy.q3Desc, icon: '⚖️', color: '#facc15' },
    { title: copy.q4Title, desc: copy.q4Desc, icon: '🚀', color: '#a855f7' },
  ];

  return (
    <PanelCard className="h-full flex flex-col items-center justify-center p-6 gap-4">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '16px',
        width: '100%',
        height: '100%',
      }}>
        {quadrants.map((q, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${q.color}33`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '24px' }}>{q.icon}</div>
            <div style={{ fontWeight: 'bold', color: q.color, fontSize: '14px' }}>{q.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--sw-text-muted)' }}>{q.desc}</div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
});
