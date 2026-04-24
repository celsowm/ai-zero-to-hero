import React, { useState } from 'react';
import type { PredictionEvolutionCopy } from '../../../types/slide';

interface PredictionEvolutionProps {
  copy: PredictionEvolutionCopy;
}

export const PredictionEvolution = React.memo(({ copy }: PredictionEvolutionProps) => {
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
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Context */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {['We', 'the', 'people'].map((t, i) => (
          <div key={i} style={{ padding: '12px 24px', background: 'rgba(26,22,40,0.92)', border: '1px solid rgba(0,229,255,0.14)', borderRadius: '12px', fontSize: '24px', fontWeight: '600', color: 'var(--sw-text)' }}>
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
              background: isActive ? 'rgba(0,229,255,0.08)' : isPast ? 'rgba(168,85,247,0.06)' : 'rgba(26,22,40,0.9)',
              border: isActive ? '2px solid var(--sw-cyan)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: isActive || isPast ? 1 : 0.5
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: isActive ? 'var(--sw-cyan)' : 'var(--sw-text-dim)' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '8px 16px', background: isActive ? 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))' : 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '8px', fontWeight: '700', fontSize: '20px' }}>
                  {s.prediction}
                </div>
                <div style={{ fontWeight: '600', color: isActive ? 'var(--sw-cyan)' : 'var(--sw-text-muted)', width: '40px' }}>
                  {s.prob}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
});

