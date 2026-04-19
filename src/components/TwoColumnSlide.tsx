import React from 'react';
import type { ISlide, Language } from '../types/slide';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';
import { SlideVisualRenderer } from './slide-visuals';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SlideFrame } from './SlideFrame';

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
    <SlideFrame title={content.title} maxWidthClassName="max-w-5xl">
      <div className="slide-two-col h-full min-h-0" style={twoColumnStyle}>
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
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, minHeight: 0, overflow: 'auto', paddingRight: 4 }}>
            <MarkdownRenderer body={leftPart || ''} variant="two-column" />
          </div>
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 14,
            background: 'rgba(26, 22, 40, 0.32)',
            border: '1px solid rgba(0, 229, 255, 0.08)',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            minHeight: 0,
            minWidth: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {slide.visual ? (
            <SlideVisualRenderer visual={slide.visual} language={language} />
          ) : (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                height: '100%',
                width: '100%',
                fontSize: 14 * FONT_SCALE_BASE * fontScale,
                lineHeight: 1.8,
                color: 'var(--sw-text-dim)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: 1, minHeight: 0, overflow: 'auto', paddingRight: 4 }}>
                <MarkdownRenderer body={rightPart || ''} variant="two-column" />
              </div>
            </div>
          )}
        </div>
      </div>
    </SlideFrame>
  );
};
