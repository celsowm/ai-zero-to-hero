import React from 'react';
import type { RoadToMiniTransformerCopy } from '../../../types/slide';

interface RoadToMiniTransformerProps {
  copy: RoadToMiniTransformerCopy;
}

export const RoadToMiniTransformer: React.FC<RoadToMiniTransformerProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Road background */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '40px', background: '#334155', transform: 'translateY(-50%)', zIndex: 0 }}>
        <div style={{ width: '100%', height: '4px', background: '#fbbf24', marginTop: '18px', borderStyle: 'dashed', borderWidth: '0', strokeDasharray: '20 20' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        {/* Start */}
        <div style={{ background: '#1e293b', border: '2px solid #38bdf8', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '32px' }}>📚</div>
          <div style={{ fontWeight: '700', color: '#38bdf8' }}>{copy.startLabel}</div>
        </div>

        {/* End */}
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '24px 40px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}>
          <div style={{ fontSize: '40px' }}>🛠️</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{copy.endLabel}</div>
        </div>
      </div>

    </div>
  );
};

