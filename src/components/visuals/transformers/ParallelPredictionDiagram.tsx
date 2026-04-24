import React, { useState, useEffect } from 'react';
import { sw } from '../../../theme/tokens';
import type { ParallelPredictionDiagramCopy } from '../../../types/slide';

interface ParallelPredictionDiagramProps {
  copy: ParallelPredictionDiagramCopy;
}

export const ParallelPredictionDiagram = React.memo(({ copy }: ParallelPredictionDiagramProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const tokens = copy.text.split(' ');
  const predictions = [copy.prediction1, copy.prediction2, copy.prediction3];

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
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '700', background: 'rgba(0,229,255,0.12)', padding: '12px', borderRadius: '12px', color: 'var(--sw-cyan)', border: '1px solid rgba(0,229,255,0.22)' }}>
        {copy.parallelLabel}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {tokens.map((token, i) => (
          <div key={i} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            opacity: mounted ? 1 : 0,
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2}s`
          }}>
            {/* Input Token */}
            <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(0,229,255,0.9), rgba(168,85,247,0.9))', color: '#fff', borderRadius: '12px', fontSize: '20px', fontWeight: '600', width: '100%', textAlign: 'center', boxShadow: '0 0 18px rgba(0,229,255,0.18)' }}>
              {token}
            </div>

            {/* Model Pipe */}
            <div style={{ width: '40px', height: '100px', background: 'rgba(26,22,40,0.92)', borderLeft: '2px dashed rgba(255,255,255,0.14)', borderRight: '2px dashed rgba(255,255,255,0.14)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,229,255,0.18) 0%, rgba(255,46,151,0.18) 100%)', animation: 'flowDown 2s infinite linear' }} />
              <div style={{ position: 'absolute', fontWeight: '800', color: 'var(--sw-text-muted)', opacity: 0.24, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>GPT-2</div>
            </div>

            {/* Output Prediction */}
            <div style={{ padding: '16px', background: 'rgba(255,46,151,0.12)', border: '1px solid rgba(255,46,151,0.24)', color: 'var(--sw-text)', borderRadius: '12px', fontSize: '14px', fontWeight: '600', width: '100%', textAlign: 'center', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {predictions[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

