import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface MarkdownOutputCompareCopy {
  title: string;
  plainTextLabel: string;
  markdownLabel: string;
  headingExample: string;
  boldExample: string;
  codeExample: string;
  listExample: string;
  tableExample: string;
  syntaxLabel: string;
  renderLabel: string;
}

interface MarkdownOutputCompareProps {
  copy: MarkdownOutputCompareCopy;
}

const ELEMENTS: Array<{ syntax: string; rendered: string; type: string }> = [
  { syntax: '# A Capital do Brasil', rendered: 'A Capital do Brasil (texto grande)', type: 'Heading' },
  { syntax: '## Fatos Principais', rendered: 'Fatos Principais (texto médio)', type: 'Sub-heading' },
  { syntax: '**Brasília**', rendered: 'Brasília (negrito)', type: 'Bold' },
  { syntax: '*UNESCO*', rendered: 'UNESCO (itálico)', type: 'Italic' },
  { syntax: '`print(5760)`', rendered: 'print(5760) (código inline)', type: 'Code' },
  { syntax: '```python\nprint(5760)\n```', rendered: 'print(5760)  # bloco destacado', type: 'Code block' },
  { syntax: '- Inaugurada em 1960\n- População: 3M', rendered: '• Inaugurada em 1960\n• População: 3M', type: 'List' },
];

export const MarkdownOutputCompare = React.memo(({ copy }: MarkdownOutputCompareProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{
      width: '100%',
      padding: '28px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Plain text side */}
        <div style={{
          padding: '16px',
          background: 'rgba(156, 163, 175, 0.06)',
          borderRadius: '16px',
          border: `1px solid ${sw.textDim}22`,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{ fontWeight: '700', fontSize: '13px', color: sw.textDim, marginBottom: '4px' }}>
            {copy.plainTextLabel}
          </div>
          <div style={{ fontSize: '12px', color: sw.textDim, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {copy.headingExample}
{'\n'}
{copy.boldExample}
{'\n'}
{copy.codeExample}
{'\n'}
{copy.listExample}
{'\n'}
{copy.tableExample}
          </div>
        </div>

        {/* Markdown side */}
        <div style={{
          padding: '16px',
          background: 'rgba(0, 229, 255, 0.04)',
          borderRadius: '16px',
          border: `1px solid ${sw.cyan}33`,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{ fontWeight: '700', fontSize: '13px', color: sw.cyan, marginBottom: '4px' }}>
            {copy.markdownLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ELEMENTS.map((el, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  background: i === activeIndex ? `${sw.cyan}18` : 'transparent',
                  border: i === activeIndex ? `1px solid ${sw.cyan}55` : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: i === activeIndex ? sw.cyan : sw.textDim,
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
              >
                <span style={{ color: sw.purple, fontWeight: '600', minWidth: '14px' }}>
                  {el.type}
                </span>
                <span style={{ fontFamily: 'monospace', color: sw.text, opacity: 0.8 }}>
                  {el.syntax.split('\n')[0]}
                  {el.syntax.includes('\n') ? '...' : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active element detail */}
      <div style={{
        padding: '16px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ fontWeight: '700', fontSize: '13px', color: sw.purple, marginBottom: '10px' }}>
          {ELEMENTS[activeIndex].type}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', color: sw.textDim, marginBottom: '4px' }}>
              {copy.syntaxLabel}:
            </div>
            <pre style={{
              margin: 0,
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: sw.cyan,
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
            }}>
              {ELEMENTS[activeIndex].syntax}
            </pre>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: sw.textDim, marginBottom: '4px' }}>
              {copy.renderLabel}:
            </div>
            <div style={{
              padding: '8px 12px',
              background: 'rgba(0, 229, 255, 0.04)',
              borderRadius: '8px',
              fontSize: '12px',
              color: sw.text,
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6',
            }}>
              {ELEMENTS[activeIndex].rendered}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
