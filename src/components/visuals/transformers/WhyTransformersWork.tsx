import React from 'react';
import type { WhyTransformersWorkCopy } from '../../../types/slide';

interface WhyTransformersWorkProps {
  copy: WhyTransformersWorkCopy;
}

export const WhyTransformersWork: React.FC<WhyTransformersWorkProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #f8f9fd 0%, #eef2f8 100%)',
      borderRadius: '24px',
      border: '1px solid #dbe2ee',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '24px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {[
        { label: copy.reason1, icon: '⚡', color: '#f59e0b', bg: '#fffbeb' },
        { label: copy.reason2, icon: '🧠', color: '#8b5cf6', bg: '#f3e8ff' },
        { label: copy.reason3, icon: '🚀', color: '#10b981', bg: '#ecfdf5' },
      ].map((r, i) => (
        <div key={i} style={{
          flex: 1,
          background: '#fff',
          padding: '32px 24px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
          borderTop: `4px solid ${r.color}`
        }}>
          <div style={{ width: '80px', height: '80px', background: r.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', boxShadow: `0 8px 16px ${r.color}33` }}>
            {r.icon}
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>
            {r.label}
          </div>
        </div>
      ))}

    </div>
  );
};

