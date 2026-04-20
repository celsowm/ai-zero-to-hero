import React from 'react';
import type { CrossEntropyChartCopy } from '../../../types/slide';

interface CrossEntropyChartProps {
  copy: CrossEntropyChartCopy;
}

export const CrossEntropyChart: React.FC<CrossEntropyChartProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#fff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      <svg viewBox="0 0 500 300" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="loss-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Axes */}
        <line x1="50" y1="250" x2="450" y2="250" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Axis Labels */}
        <text x="250" y="285" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="600">{copy.probAxis} (0 to 1)</text>
        <text x="20" y="150" transform="rotate(-90 20 150)" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="600">{copy.lossAxis}</text>

        {/* -log(x) curve from x=0.01 to x=1 */}
        <path 
          d="M 54 50 Q 80 200, 250 240 T 450 248" 
          fill="none" 
          stroke="url(#loss-gradient)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />

        {/* Annotations */}
        <g transform="translate(100, 100)">
          <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#fee2e2" />
          <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">{copy.highSurprise}</text>
        </g>
        
        <g transform="translate(380, 200)">
          <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#d1fae5" />
          <text x="0" y="5" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">{copy.lowSurprise}</text>
        </g>
      </svg>
    </div>
  );
};

