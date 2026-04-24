import React from 'react';
import type { RoadToMiniTransformerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface RoadToMiniTransformerProps {
  copy: RoadToMiniTransformerCopy;
}

export const RoadToMiniTransformer = React.memo(({ copy }: RoadToMiniTransformerProps) => {
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
      fontFamily: sw.fontSans,
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Road background */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '40px', background: sw.borderMedium, transform: 'translateY(-50%)', zIndex: 0, boxShadow: `0 0 30px ${sw.purple}10` }}>
        <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--sw-cyan), var(--sw-pink))', marginTop: '18px', opacity: 0.9 }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        {/* Start */}
        <div style={{ background: 'rgba(26,22,40,0.94)', border: '2px solid var(--sw-cyan)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: '0 0 20px rgba(0,229,255,0.12)' }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--sw-cyan)', boxShadow: '0 0 18px rgba(0,229,255,0.4)' }} />
          <div style={{ fontWeight: '700', color: 'var(--sw-cyan)' }}>{copy.startLabel}</div>
        </div>

        {/* End */}
        <div style={{ background: 'linear-gradient(135deg, var(--sw-pink) 0%, var(--sw-purple) 100%)', padding: '24px 40px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: '0 0 26px rgba(255,46,151,0.22), 0 10px 30px rgba(168,85,247,0.24)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, border: '2px solid rgba(255,255,255,0.7)', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{copy.endLabel}</div>
        </div>
      </div>

    </div>
  );
});

