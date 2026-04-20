import React, { useState, useEffect } from 'react';
import type { TokenSizeComparisonCopy } from '../../../types/slide';

interface TokenSizeComparisonProps {
  copy: TokenSizeComparisonCopy;
}

const ItemRow = ({ title, items, color, delay, mounted }: { title: string, items: string[], color: string, delay: number, mounted: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
      {title}
    </div>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: color,
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transform: mounted ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
          opacity: mounted ? 1 : 0,
          transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay + (i * 0.05)}s`
        }}>
          {item}
        </div>
      ))}
    </div>
  </div>
);

export const TokenSizeComparison: React.FC<TokenSizeComparisonProps> = ({ copy }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const isPT = copy.words.toLowerCase().includes('palavra');
  const word = isPT ? 'Inconstitucional' : 'Unbelievable';
  
  const chars = word.split('');
  const tokens = isPT ? ['In', 'constitucion', 'al'] : ['Un', 'believ', 'able'];



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
      <ItemRow title={copy.chars} items={chars} color="#94a3b8" delay={0.1} mounted={mounted} />
      <ItemRow title={copy.words} items={[word]} color="#3b82f6" delay={0.5} mounted={mounted} />
      <ItemRow title={copy.tokens} items={tokens} color="#8b5cf6" delay={0.9} mounted={mounted} />
    </div>
  );
};

