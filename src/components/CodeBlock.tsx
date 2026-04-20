import React, { useMemo } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that renders a code block with syntax highlighting using highlight.js.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript', 
  className, 
  style 
}) => {
  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code, { language }).value;
    } catch (e) {
      console.warn(`Highlight.js error for language "${language}":`, e);
      // Fallback to plain text if highlighting fails
      return code.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m] || m));
    }
  }, [code, language]);

  return (
    <pre 
      className={className} 
      style={{ 
        margin: 0, 
        padding: 0, 
        background: 'transparent', 
        overflow: 'visible',
        ...style 
      }}
    >
      <code
        className={`hljs language-${language}`}
        style={{ 
          background: 'transparent',
          padding: 0,
          display: 'block',
          width: '100%'
        }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
};
