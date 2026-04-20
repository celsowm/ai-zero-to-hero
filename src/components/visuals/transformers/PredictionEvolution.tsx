import React, { useState } from 'react';
import type { PredictionEvolutionCopy } from '../../../types/slide';

interface PredictionEvolutionProps {
  copy: PredictionEvolutionCopy;
}

export const PredictionEvolution: React.FC<PredictionEvolutionProps> = ({ copy }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { label: copy.step1, prediction: 'are', prob: '15%' },
    { label: copy.step2, prediction: 'United', prob: '45%' },
    { label: copy.step3, prediction: 'of', prob: '92%' },
  ];

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
      
      {/* Context */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {['We', 'the', 'people'].map((t, i) => (
          <div key={i} style={{ padding: '12px 24px', background: '#f1f5f9', borderRadius: '12px', fontSize: '24px', fontWeight: '600', color: '#334155' }}>
            {t}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        {steps.map((s, i) => {
          const isActive = step === i + 1;
          const isPast = step > i + 1;
          
          return (
            <div key={i} 
              onClick={() => setStep(i + 1)}
              style={{
              padding: '24px',
              background: isActive ? '#eff6ff' : isPast ? '#f8fafc' : '#fff',
              border: isActive ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: isActive || isPast ? 1 : 0.5
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: isActive ? '#1d4ed8' : '#64748b' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '8px 16px', background: isActive ? '#3b82f6' : '#cbd5e1', color: isActive ? '#fff' : '#475569', borderRadius: '8px', fontWeight: '700', fontSize: '20px' }}>
                  {s.prediction}
                </div>
                <div style={{ fontWeight: '600', color: isActive ? '#10b981' : '#94a3b8', width: '40px' }}>
                  {s.prob}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

