import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders exercise instructions with Markdown support.
 * Compact styling adapted for the exercise context — smaller font, tighter spacing
 * than the main MarkdownRenderer, but still supports bold, inline code, tables, lists, etc.
 */
export const ExerciseInstructions: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      p: ({ ...props }) => (
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--sw-text)',
          }}
          {...props}
        />
      ),
      strong: ({ ...props }) => (
        <strong
          style={{ color: 'var(--sw-cyan)', fontWeight: 600 }}
          {...props}
        />
      ),
      code: ({
        className,
        children,
        inline,
        ...rest
      }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
        if (!inline) {
          return <code className={className} {...rest}>{children}</code>;
        }
        return (
          <code
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: 'var(--sw-cyan)',
              background: 'rgba(0, 229, 255, 0.08)',
              padding: '1px 5px',
              borderRadius: 4,
            }}
            {...rest}
          >
            {children}
          </code>
        );
      },
      table: ({ ...props }) => (
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            margin: '0 0 8px',
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <table
            style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}
            {...props}
          />
        </div>
      ),
      thead: ({ ...props }) => <thead style={{ background: 'rgba(255,255,255,0.04)' }} {...props} />,
      th: ({ ...props }) => (
        <th
          style={{
            padding: '6px 8px',
            textAlign: 'left',
            color: 'var(--sw-text)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            whiteSpace: 'nowrap',
          }}
          {...props}
        />
      ),
      td: ({ ...props }) => (
        <td
          style={{
            padding: '6px 8px',
            color: 'var(--sw-text-dim)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            whiteSpace: 'nowrap',
          }}
          {...props}
        />
      ),
      ul: ({ ...props }) => (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
          {...props}
        />
      ),
      ol: ({ ...props }) => (
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
          {...props}
        />
      ),
      li: ({ children, ...props }) => (
        <li
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            paddingLeft: 2,
          }}
          {...props}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--sw-cyan)',
              marginTop: 'calc(0.875em - 2.5px)',
              flexShrink: 0,
              boxShadow: '0 0 6px rgba(0, 229, 255, 0.3)',
            }}
          />
          <span style={{ flex: 1, fontSize: 13, lineHeight: 1.6, color: 'var(--sw-text)' }}>
            {children}
          </span>
        </li>
      ),
      blockquote: ({ ...props }) => (
        <blockquote
          style={{
            margin: '0 0 8px',
            padding: '10px 14px',
            borderRadius: 8,
            fontStyle: 'italic',
            fontSize: 12,
            lineHeight: 1.6,
            background: 'rgba(168, 85, 247, 0.05)',
            borderLeft: '2px solid var(--sw-purple)',
            color: 'var(--sw-text-muted)',
          }}
          {...props}
        />
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);
