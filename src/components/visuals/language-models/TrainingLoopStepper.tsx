import React, { useState } from 'react';
import type { TrainingLoopStepperCopy } from '../../../types/slide';

interface TrainingLoopStepperProps {
  copy: TrainingLoopStepperCopy;
}

export const TrainingLoopStepper: React.FC<TrainingLoopStepperProps> = ({ copy }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { title: copy.step1Title, desc: copy.step1Desc, color: '#3b82f6' },
    { title: copy.step2Title, desc: copy.step2Desc, color: '#ef4444' },
    { title: copy.step3Title, desc: copy.step3Desc, color: '#10b981' },
  ];

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
      fontFamily: "'Inter', sans-serif",
      color: '#fff'
    }}>
      
      {/* Progress Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        {[1, 2, 3].map(s => (
          <div key={s} 
            onClick={() => setStep(s)}
            style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: step >= s ? steps[s-1].color : '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: step === s ? `0 0 20px ${steps[s-1].color}` : 'none'
          }}>
            {s}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: '#1e293b',
        padding: '32px',
        borderRadius: '16px',
        border: `2px solid ${steps[step-1].color}`,
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '16px',
        transition: 'all 0.3s'
      }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: steps[step-1].color }}>
          {steps[step-1].title}
        </div>
        <div style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.6' }}>
          {steps[step-1].desc}
        </div>
      </div>

      {/* Next Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setStep(s => s === 3 ? 1 : s + 1)}
          style={{
            padding: '12px 32px',
            background: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            borderRadius: '100px',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {step === 3 ? 'Restart Loop' : 'Next Step'}
        </button>
      </div>

    </div>
  );
};

