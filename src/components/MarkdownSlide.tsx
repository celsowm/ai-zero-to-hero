import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { IContent } from '../types/slide';
import { FONT_SCALE_BASE, useCourse } from '../context/CourseContext';

interface MarkdownSlideProps {
  content: IContent;
}

export const MarkdownSlide: React.FC<MarkdownSlideProps> = ({ content }) => {
  const { fontScale } = useCourse();

  return (
    <div className="max-w-2xl w-full mx-auto animate-slide-up" style={{ padding: '0 24px' }}>
      {/* Title */}
      <h1
        className="glow-pink"
        style={{
          fontSize: 36 * FONT_SCALE_BASE * fontScale,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: 'var(--sw-pink)',
          margin: '0 0 16px 0',
        }}
      >
        {content.title}
      </h1>

      {/* Gradient divider */}
      <div
        className="glow-line"
        style={{
          height: 2,
          borderRadius: 2,
          marginBottom: 40,
          background: 'linear-gradient(90deg, var(--sw-pink), var(--sw-purple) 60%, transparent)',
        }}
      />

      {/* Body */}
      <div style={{ fontSize: 15 * FONT_SCALE_BASE * fontScale, lineHeight: 1.8, color: 'var(--sw-text-dim)' }}>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <span className="hidden" {...props} />,
            h2: ({ node, ...props }) => (
              <h2
                style={{
                  fontSize: 18 * FONT_SCALE_BASE * fontScale,
                  fontWeight: 600,
                  color: 'var(--sw-text)',
                  margin: '32px 0 16px',
                  letterSpacing: '-0.01em',
                }}
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p style={{ margin: '0 0 20px', lineHeight: 1.8 }} {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
                {...props}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  counterReset: 'item',
                }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  paddingLeft: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--sw-cyan)',
                    marginTop: 8,
                    flexShrink: 0,
                    boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
                  }}
                />
                <span style={{ flex: 1 }}>{(props as any).children}</span>
              </li>
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                style={{
                  margin: '32px 0',
                  padding: '20px 24px',
                  borderRadius: 10,
                  fontStyle: 'italic',
                  fontSize: 14 * FONT_SCALE_BASE * fontScale,
                  lineHeight: 1.7,
                  background: 'rgba(168, 85, 247, 0.05)',
                  borderLeft: '3px solid var(--sw-purple)',
                  color: 'var(--sw-text-muted)',
                }}
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              <strong
                style={{ color: 'var(--sw-cyan)', fontWeight: 600 }}
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13 * FONT_SCALE_BASE * fontScale,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'var(--sw-surface)',
                  color: 'var(--sw-yellow)',
                }}
                {...props}
              />
            ),
          }}
        >
          {content.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};
