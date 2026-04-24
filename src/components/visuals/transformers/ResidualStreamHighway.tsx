import React from 'react';
import type { ResidualStreamHighwayCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface ResidualStreamHighwayProps {
  copy: ResidualStreamHighwayCopy;
}

export const ResidualStreamHighway = React.memo(({ copy }: ResidualStreamHighwayProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <svg viewBox="0 0 400 300" style={{ width: '100%', maxWidth: '400px', height: 'auto', overflow: 'visible' }}>
        {/* Highway */}
        <rect x="180" y="0" width="40" height="300" fill={sw.borderMedium} />
        <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(0,229,255,0.6)" strokeWidth="4" strokeDasharray="10 10" />

        <text x="170" y="30" textAnchor="end" fill={sw.textDim} fontSize="14" fontWeight="600">{copy.highwayLabel}</text>

        {/* Divert path */}
        <path d="M 220 60 Q 300 60 300 100" fill="none" stroke="var(--sw-cyan)" strokeWidth="4" />
        <path d="M 300 200 Q 300 240 220 240" fill="none" stroke="var(--sw-pink)" strokeWidth="4" />

        {/* Arrows */}
        <polygon points="300,100 295,90 305,90" fill="var(--sw-cyan)" />
        <polygon points="220,240 230,235 230,245" fill="var(--sw-pink)" />

        {/* Block */}
        <rect x="250" y="100" width="100" height="100" rx="12" fill="rgba(26,22,40,0.92)" stroke="rgba(0,229,255,0.6)" strokeWidth="2" />
        <text x="300" y="150" textAnchor="middle" fill="var(--sw-text)" fontSize="14" fontWeight="700">
          <tspan x="300" dy="-10">Attention</tspan>
          <tspan x="300" dy="20">& MLP</tspan>
        </text>

        {/* Add Label */}
        <text x="310" y="235" textAnchor="start" fill="var(--sw-pink)" fontSize="12" fontWeight="700">{copy.addLabel}</text>

        {/* Plus circle */}
        <circle cx="200" cy="240" r="16" fill="var(--sw-pink)" />
        <text x="200" y="246" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">+</text>
      </svg>
    </div>
  );
});

