import React from 'react';
import { SlideCounter } from './SlideCounter';
import { FontSizeControls } from './FontSizeControls';

export const SlideTopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-end px-10 pt-8">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 10px',
          borderRadius: 10,
          background: 'rgba(168, 85, 247, 0.06)',
          border: '1px solid rgba(168, 85, 247, 0.1)',
        }}
      >
        <SlideCounter />
        <FontSizeControls />
      </div>
    </div>
  );
};
