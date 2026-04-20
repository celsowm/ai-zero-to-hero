import React, { useState } from 'react';
import type { SamplingRouletteCopy } from '../../../types/slide';

interface SamplingRouletteProps {
  copy: SamplingRouletteCopy;
}

export const SamplingRoulette: React.FC<SamplingRouletteProps> = ({ copy }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const options = [
    { word: 'the', prob: 84, color: '#3b82f6' },
    { word: 'a', prob: 11, color: '#10b981' },
    { word: 'it', prob: 5, color: '#f59e0b' },
  ];

  const handleRoll = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    
    // Simulate spin
    setTimeout(() => {
      setSpinning(false);
      // Pick based on probability
      const rand = Math.random() * 100;
      let cumulative = 0;
      for (const opt of options) {
        cumulative += opt.prob;
        if (rand <= cumulative) {
          setResult(opt.word);
          break;
        }
      }
    }, 2000);
  };

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #f8f9fd 0%, #eef2f8 100%)',
      borderRadius: '24px',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7)',
      border: '1px solid #dbe2ee',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Probability Bar */}
      <div style={{ width: '100%', height: '40px', display: 'flex', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {options.map((opt, i) => (
          <div key={i} style={{
            width: `${opt.prob}%`,
            background: opt.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: opt.prob > 10 ? '16px' : '12px'
          }}>
            {opt.prob > 10 ? opt.word : ''}
          </div>
        ))}
      </div>

      {/* Die / Result Box */}
      <div style={{
        width: '160px',
        height: '160px',
        background: '#fff',
        borderRadius: '32px',
        boxShadow: '0 20px 40px rgba(15, 26, 45, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: '800',
        color: '#0f172a',
        border: '4px solid #e2e8f0',
        animation: spinning ? 'shake 0.5s infinite' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {spinning ? '🎲' : result ? result : '?'}
      </div>

      {/* Button */}
      <button 
        onClick={handleRoll}
        disabled={spinning}
        style={{
          padding: '16px 40px',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '100px',
          fontSize: '20px',
          fontWeight: '700',
          cursor: spinning ? 'not-allowed' : 'pointer',
          opacity: spinning ? 0.7 : 1,
          boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)',
        }}
      >
        {spinning ? '...' : result ? copy.resultLabel + ' ' + result : copy.rollLabel}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}} />
    </div>
  );
};

