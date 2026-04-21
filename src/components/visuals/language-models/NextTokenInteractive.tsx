import React, { useState } from 'react';
import type { NextTokenInteractiveCopy } from '../../../types/slide';

interface NextTokenInteractiveProps {
  copy: NextTokenInteractiveCopy;
}

export const NextTokenInteractive: React.FC<NextTokenInteractiveProps> = ({ copy }) => {
  const [step, setStep] = useState(0);

  const stepsPT = ['Era', ' uma', ' vez', ' um', ' reino', ' distante...'];
  const stepsEN = ['Once', ' upon', ' a', ' time', ' in', ' a', ' far', ' away', ' land...'];
  
  const sequence = copy.startLabel.toLowerCase().includes('iniciar') ? stepsPT : stepsEN;

  const handleNext = () => {
    if (step < sequence.length) {
      setStep(prev => prev + 1);
    } else {
      setStep(0);
    }
  };

  const isFinished = step === sequence.length;

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      border: '1px solid #1e293b',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Model Box */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Input Text */}
        <div style={{
          width: '100%',
          padding: '24px',
          background: '#1e293b',
          borderRadius: '16px',
          color: '#e2e8f0',
          fontSize: '20px',
          lineHeight: '1.6',
          minHeight: '120px',
          border: '1px solid #334155'
        }}>
          {sequence.slice(0, Math.max(1, step)).map((word, i) => (
            <span key={i} style={{
              color: i === step - 1 && step > 1 ? '#38bdf8' : '#e2e8f0',
              transition: 'color 0.3s ease'
            }}>
              {word}
            </span>
          ))}
          {step > 0 && !isFinished && (
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '20px',
              background: '#38bdf8',
              marginLeft: '4px',
              animation: 'blink 1s infinite',
              verticalAlign: 'middle'
            }} />
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            background: isFinished ? '#475569' : 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '100px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isFinished ? 'none' : '0 4px 12px rgba(14, 165, 233, 0.3)',
          }}
          onMouseOver={(e) => {
            if (!isFinished) e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (!isFinished) e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {step === 0 ? copy.startLabel : isFinished ? copy.startLabel : copy.nextLabel}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />
    </div>
  );
};

