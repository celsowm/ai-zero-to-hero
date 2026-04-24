import React from 'react';
import { sw } from '../../../theme/tokens';
import type { AttentionLinesDiagramCopy } from '../../../types/slide';

interface AttentionLinesDiagramProps {
  copy: AttentionLinesDiagramCopy;
}

export const AttentionLinesDiagram = React.memo(({ copy }: AttentionLinesDiagramProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      <svg viewBox="0 0 500 200" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Nodes */}
        <g transform="translate(100, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="rgba(0,229,255,0.12)" stroke="rgba(0,229,255,0.7)" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#e8e4f0" fontSize="16" fontWeight="700">{copy.token1}</text>
        </g>
        
        <g transform="translate(250, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="rgba(168,85,247,0.14)" stroke="rgba(168,85,247,0.78)" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#e8e4f0" fontSize="16" fontWeight="700">{copy.token2}</text>
        </g>
        
        <g transform="translate(400, 100)">
          <rect x="-40" y="-20" width="80" height="40" rx="8" fill="rgba(255,46,151,0.14)" stroke="rgba(255,46,151,0.78)" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#e8e4f0" fontSize="16" fontWeight="700">{copy.token3}</text>
        </g>

        {/* Lines */}
        {/* We <-> the (Weak) */}
        <path d="M 100 80 Q 175 40 250 80" fill="none" stroke="rgba(176,168,196,0.45)" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* the <-> people (Medium) */}
        <path d="M 250 80 Q 325 40 400 80" fill="none" stroke="rgba(168,85,247,0.55)" strokeWidth="4" />
        
        {/* We <-> people (Strong) */}
        <path d="M 100 120 Q 250 180 400 120" fill="none" stroke="rgba(0,229,255,0.88)" strokeWidth="8" strokeOpacity="0.9" />

        {/* Labels */}
        <text x="250" y="160" textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="700">{copy.strongConnection}</text>
        <text x="175" y="50" textAnchor="middle" fill="#b0a8c4" fontSize="12" fontWeight="600">{copy.weakConnection}</text>

      </svg>
    </div>
  );
});

