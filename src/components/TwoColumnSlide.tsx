import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ISlide, Language } from '../types/slide';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';
import { SlideVisualRenderer } from './slide-visuals';

interface TwoColumnSlideProps {
  slide: ISlide;
  language: Language;
}

export const TwoColumnSlide: React.FC<TwoColumnSlideProps> = ({ slide, language }) => {
  const content = slide.content[language];
  const { fontScale } = useCourse();
  const [leftPart, rightPart] = content.body.split('---');
  const [leftRatio, rightRatio] = slide.options?.columnRatios ?? [0.95, 1.05];
  const columnTemplateProperty = '--slide-two-col-columns';

  const twoColumnStyle = {
    [columnTemplateProperty]: `minmax(0, ${leftRatio}fr) minmax(0, ${rightRatio}fr)`,
  } as React.CSSProperties;

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

      <div className="slide-two-col" style={twoColumnStyle}>
        <div
          style={{
            padding: 28,
            borderRadius: 14,
            fontSize: 14 * FONT_SCALE_BASE * fontScale,
            lineHeight: 1.8,
            color: 'var(--sw-text-dim)',
            background: 'rgba(26, 22, 40, 0.4)',
            border: '1px solid rgba(168, 85, 247, 0.08)',
            minWidth: 0,
          }}
        >
          <ReactMarkdown>{leftPart || ''}</ReactMarkdown>
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 14,
            background: 'rgba(26, 22, 40, 0.32)',
            border: '1px solid rgba(0, 229, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {slide.visual ? (
            <SlideVisualRenderer visual={slide.visual} language={language} />
          ) : (
            <div
              style={{
                width: '100%',
                fontSize: 14 * FONT_SCALE_BASE * fontScale,
                lineHeight: 1.8,
                color: 'var(--sw-text-dim)',
              }}
            >
              <ReactMarkdown>{rightPart || ''}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
