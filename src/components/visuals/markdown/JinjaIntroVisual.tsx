import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface JinjaIntroVisualCopy {
  title: string;
  templateLabel: string;
  renderedLabel: string;
  variableExample: string;
  variableRendered: string;
  forLoopExample: string;
  forLoopRendered: string;
  ifExample: string;
  ifRendered: string;
}

interface JinjaIntroVisualProps {
  copy: JinjaIntroVisualCopy;
}

const TABS: Array<{
  key: string;
  label: string;
  syntax: string;
  rendered: string;
}> = [
  {
    key: 'variable',
    label: 'Variável',
    syntax: `Hello, {{ name }}!`,
    rendered: `Hello, World!`,
  },
  {
    key: 'for',
    label: 'For Loop',
    syntax: `{% for item in items %}\n  {{ item }}\n{% endfor %}`,
    rendered: `  apple\n  banana\n  cherry`,
  },
  {
    key: 'if',
    label: 'If/Else',
    syntax: `{% if logged_in %}\n  Welcome, {{ user }}!\n{% else %}\n  Please log in.\n{% endif %}`,
    rendered: `Welcome, Alice!`,
  },
];

export const JinjaIntroVisual = React.memo(({ copy }: JinjaIntroVisualProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

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
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {TABS.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '6px 14px',
              background: i === activeTab ? `${sw.cyan}18` : 'rgba(255,255,255,0.04)',
              border: i === activeTab ? `1px solid ${sw.cyan}55` : `1px solid ${sw.borderSubtle}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: i === activeTab ? '700' : '500',
              color: i === activeTab ? sw.cyan : sw.textDim,
              transition: 'all 0.15s ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.purple, marginBottom: '8px' }}>
            {copy.templateLabel}
          </div>
          <pre style={{
            margin: 0,
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            border: `1px solid ${sw.purple}22`,
            fontSize: '13px',
            fontFamily: 'monospace',
            color: sw.cyan,
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}>
            {tab.syntax}
          </pre>
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.cyan, marginBottom: '8px' }}>
            {copy.renderedLabel}
          </div>
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 229, 255, 0.04)',
            borderRadius: '12px',
            border: `1px solid ${sw.cyan}22`,
            fontSize: '13px',
            fontFamily: sw.fontSans,
            color: sw.text,
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
          }}>
            {tab.rendered}
          </div>
        </div>
      </div>
    </div>
  );
});
