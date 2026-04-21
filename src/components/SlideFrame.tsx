import React from 'react';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';

interface SlideFrameProps {
  title: string;
  children: React.ReactNode;
  maxWidthClassName: string;
}

export const SlideFrame: React.FC<SlideFrameProps> = ({ title, children, maxWidthClassName }) => {
  const { fontScale } = useCourse();

  return (
    <div
      className={`${maxWidthClassName} w-full h-full min-h-0 mx-auto animate-slide-up flex flex-col`}
      style={{ padding: '0 24px 18px' }}
    >
      <h1
        className="glow-pink synthwave-title"
        style={{
          fontSize: 36 * FONT_SCALE_BASE * fontScale,
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

      <div
        className="glow-line"
        style={{
          height: 2,
          borderRadius: 2,
          marginBottom: 22,
          maxWidth: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'linear-gradient(90deg, transparent, var(--sw-pink), var(--sw-purple), transparent)',
        }}
      />

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
};
