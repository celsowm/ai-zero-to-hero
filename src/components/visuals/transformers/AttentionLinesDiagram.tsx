import React from 'react';
import type { AttentionLinesDiagramCopy } from '../../../types/slide';

interface AttentionLinesDiagramProps {
  copy: AttentionLinesDiagramCopy;
}

export const AttentionLinesDiagram: React.FC<AttentionLinesDiagramProps> = ({ copy }) => {
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
      gap: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <svg viewBox="0 0 500 200" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Nodes */}
        <g transform="translate(100, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="700">{copy.token1}</text>
        </g>
        
        <g transform="translate(250, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="700">{copy.token2}</text>
        </g>
        
        <g transform="translate(400, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="700">{copy.token3}</text>
        </g>

        {/* Lines */}
        {/* We <-> the (Weak) */}
        <path d="M 100 80 Q 175 40 250 80" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* the <-> people (Medium) */}
        <path d="M 250 80 Q 325 40 400 80" fill="none" stroke="#94a3b8" strokeWidth="4" />
        
        {/* We <-> people (Strong) */}
        <path d="M 100 120 Q 250 180 400 120" fill="none" stroke="#0284c7" strokeWidth="8" strokeOpacity="0.8" />

        {/* Labels */}
        <text x="250" y="160" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="700">{copy.strongConnection}</text>
        <text x="175" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">{copy.weakConnection}</text>

      </svg>
    </div>
  );
};

