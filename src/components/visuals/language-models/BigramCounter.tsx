import React, { useState, useEffect } from 'react';
import type { BigramCounterCopy } from '../../../types/slide';

interface BigramCounterProps {
  copy: BigramCounterCopy;
}

export const BigramCounter = React.memo(({ copy }: BigramCounterProps) => {
  const [step, setStep] = useState(0);

  // Parse text: "We the people. We the nation. We the world."
  // And we want to count what comes after "We"
  
  const targetToken = copy.currentToken.trim(); // "We"
  const tokens = copy.text.split(' ').map(t => t.trim());
  
  // Find all indices of the target token
  const targetIndices = tokens.reduce<number[]>((acc, token, idx) => {
    if (token === targetToken) acc.push(idx);
    return acc;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (targetIndices.length + 2)); // +2 for pause at the end
    }, 1500);
    return () => clearInterval(timer);
  }, [targetIndices.length]);

  const activeIndex = step < targetIndices.length ? targetIndices[step] : -1;
  const counts: Record<string, number> = {};

  for (let i = 0; i < Math.min(step, targetIndices.length); i++) {
    const idx = targetIndices[i];
    if (idx + 1 < tokens.length) {
      const next = tokens[idx + 1].replace(/[.,]/g, '');
      counts[next] = (counts[next] || 0) + 1;
    }
  }

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Text Box */}
      <div style={{
        padding: '24px',
        background: '#f8fafc',
        borderRadius: '16px',
        fontSize: '24px',
        lineHeight: '1.8',
        color: '#475569',
        border: '1px solid #cbd5e1'
      }}>
        {tokens.map((token, i) => {
          const isTarget = i === activeIndex;
          const isNext = i === activeIndex + 1;
          const cleanToken = token.replace(/[.,]/g, '');
          const punctuation = token.replace(/[a-zA-Z]/g, '');
          
          return (
            <React.Fragment key={i}>
              <span style={{
                background: isTarget ? '#bfdbfe' : isNext ? '#bbf7d0' : 'transparent',
                color: isTarget || isNext ? '#0f172a' : 'inherit',
                padding: isTarget || isNext ? '2px 8px' : '0',
                borderRadius: '6px',
                fontWeight: isTarget || isNext ? '600' : '400',
                transition: 'all 0.3s ease'
              }}>
                {cleanToken}
              </span>
              {punctuation}{' '}
            </React.Fragment>
          );
        })}
      </div>

      {/* Counts Box */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
          {copy.countsTitle}
        </div>
        
        <div style={{ display: 'flex', gap: '16px', minHeight: '60px' }}>
          {Object.entries(counts).map(([word, count]) => (
            <div key={word} style={{
              background: '#fff',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid #38bdf8',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 6px rgba(56, 189, 248, 0.1)',
              animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>{word}</span>
              <span style={{ 
                background: '#e0f2fe',
                color: '#0284c7',
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '18px',
                fontWeight: '700'
              }}>{count}</span>
            </div>
          ))}
          {Object.keys(counts).length === 0 && (
            <div style={{ color: '#94a3b8', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
              Waiting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

