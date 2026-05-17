import React from 'react';
import { useUI } from '../hooks/useUI';
import { DESIGN_SCALE_MULTIPLIER } from '../constants/course';
import { FloatingNavigation } from './FloatingNavigation';

interface SlideFrameProps {
  title: string;
  children: React.ReactNode;
  maxWidthClassName: string;
}

export const SlideFrame: React.FC<SlideFrameProps> = ({ title, children, maxWidthClassName }) => {
  const { fontScale } = useUI();

  return (
    <div
      className={`${maxWidthClassName} w-full h-full min-h-0 mx-auto animate-slide-up flex flex-col`}
      style={{ padding: '0 24px 12px' }}
    >
      <h1
        className="glow-pink synthwave-title"
        style={{
          fontSize: 36 * DESIGN_SCALE_MULTIPLIER * fontScale,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: 'var(--sw-pink)',
          margin: '0 0 8px 0',
          textAlign: 'center',
        }}
      >
        {title}
      </h1>

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>

      <FloatingNavigation />
    </div>
  );
};
