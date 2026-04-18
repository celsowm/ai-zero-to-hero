import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ISlide, Language } from '../types/slide';
import { FONT_SCALE_BASE, useCourse } from '../context/CourseContext';

interface TwoColumnSlideProps {
  slide: ISlide;
  language: Language;
}

export const TwoColumnSlide: React.FC<TwoColumnSlideProps> = ({ slide, language }) => {
  const content = slide.content[language];
  const parts = content.body.split('---');
  const { fontScale } = useCourse();

  return (
    <div className="max-w-5xl w-full mx-auto animate-slide-up" style={{ padding: '0 24px' }}>
      <h1
        className="glow-pink"
        style={{
          fontSize: 36 * FONT_SCALE_BASE * fontScale,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: 'var(--sw-pink)',
          margin: '0 0 16px 0',
          textAlign: 'center',
        }}
      >
        {content.title}
      </h1>

      <div
        className="glow-line"
        style={{
          height: 2,
          borderRadius: 2,
          marginBottom: 40,
          maxWidth: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'linear-gradient(90deg, transparent, var(--sw-pink), var(--sw-purple), transparent)',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[parts[0], parts[1]].map((part, i) => (
          <div
            key={i}
            style={{
              padding: 28,
              borderRadius: 14,
              fontSize: 14 * FONT_SCALE_BASE * fontScale,
              lineHeight: 1.8,
              color: 'var(--sw-text-dim)',
              background: 'rgba(26, 22, 40, 0.4)',
              border: `1px solid rgba(${i === 0 ? '168, 85, 247' : '0, 229, 255'}, 0.08)`,
            }}
          >
            <ReactMarkdown>{part || ''}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};
