import React, { useState, useEffect } from 'react';
import type { ParallelPredictionDiagramCopy } from '../../../types/slide';

interface ParallelPredictionDiagramProps {
  copy: ParallelPredictionDiagramCopy;
}

export const ParallelPredictionDiagram: React.FC<ParallelPredictionDiagramProps> = ({ copy }) => {
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
      background: '#fff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '700', color: '#1e293b', background: '#e0f2fe', padding: '12px', borderRadius: '12px', color: '#0369a1' }}>
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
            <div style={{ padding: '16px', background: '#3b82f6', color: '#fff', borderRadius: '12px', fontSize: '20px', fontWeight: '600', width: '100%', textAlign: 'center' }}>
              {token}
            </div>

            {/* Model Pipe */}
            <div style={{ width: '40px', height: '100px', background: '#f1f5f9', borderLeft: '2px dashed #94a3b8', borderRight: '2px dashed #94a3b8', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)', animation: 'flowDown 2s infinite linear' }} />
              <div style={{ position: 'absolute', fontWeight: '800', color: '#64748b', opacity: 0.2, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>GPT-2</div>
            </div>

            {/* Output Prediction */}
            <div style={{ padding: '16px', background: '#10b981', color: '#fff', borderRadius: '12px', fontSize: '14px', fontWeight: '600', width: '100%', textAlign: 'center', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {predictions[i]}
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowDown {
          0% { background-position: 0 -100px; }
          100% { background-position: 0 100px; }
        }
      `}} />
    </div>
  );
};

