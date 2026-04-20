import React, { useState, useEffect } from 'react';
import type { LanguageModelingDiagramCopy } from '../../../types/slide';

interface LanguageModelingDiagramProps {
  copy: LanguageModelingDiagramCopy;
}

export const LanguageModelingDiagram: React.FC<LanguageModelingDiagramProps> = ({ copy }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse options like "mat (85%)"
  const parsedOptions = copy.options.map(opt => {
    const match = opt.match(/(.+)\s*\((\d+)%\)/);
    if (match) {
      return { word: match[1], prob: parseInt(match[2], 10) };
    }
    return { word: opt, prob: 0 };
  });

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
      gap: '32px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {/* Input Text Box */}
      <div style={{
        background: '#fff',
        padding: '24px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(15, 26, 45, 0.05)',
        border: '1px solid #eef2f8',
        fontSize: '24px',
        fontWeight: '600',
        color: '#233145',
        textAlign: 'center',
        position: 'relative'
      }}>
        {copy.text.split('___').map((part, index, arr) => (
          <React.Fragment key={index}>
            {part}
            {index < arr.length - 1 && (
              <span style={{
                display: 'inline-block',
                minWidth: '60px',
                borderBottom: '3px solid #00e5ff',
                margin: '0 8px',
                animation: 'pulse 2s infinite',
                position: 'relative',
                top: '-4px'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {parsedOptions.map((opt, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(15, 26, 45, 0.03)',
            border: i === 0 ? '2px solid #00e5ff' : '1px solid #eef2f8',
            transform: mounted ? 'translateX(0)' : 'translateX(20px)',
            opacity: mounted ? 1 : 0,
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Progress Bar Background */}
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: `${mounted ? opt.prob : 0}%`,
              background: i === 0 
                ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0.2) 100%)'
                : 'linear-gradient(90deg, rgba(143, 178, 216, 0.1) 0%, rgba(143, 178, 216, 0.2) 100%)',
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
              zIndex: 0
            }} />
            
            {/* Content */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              zIndex: 1,
              fontWeight: i === 0 ? '700' : '500',
              color: i === 0 ? '#0a192f' : '#526176'
            }}>
              <span style={{ fontSize: '20px' }}>{opt.word}</span>
              <span style={{ 
                fontSize: '18px',
                color: i === 0 ? '#00b8cc' : '#8fb2d8',
                fontWeight: '600'
              }}>{opt.prob}%</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; box-shadow: 0 4px 12px rgba(0, 229, 255, 0.4); }
          100% { opacity: 0.4; }
        }
      `}} />
    </div>
  );
};

