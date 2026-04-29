import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface MarkdownSyntaxVisualCopy {
  title: string;
  syntaxLabel: string;
  renderLabel: string;
  headingLabel: string;
  boldLabel: string;
  codeLabel: string;
  listLabel: string;
  tableLabel: string;
}

interface MarkdownSyntaxVisualProps {
  copy: MarkdownSyntaxVisualCopy;
}

const TABS: Array<{
  key: string;
  label: string;
  syntax: string;
  rendered: string;
}> = [
  {
    key: 'heading',
    label: 'Heading',
    syntax: '# Título Principal\n## Subtítulo\n### Seção',
    rendered: 'Título Principal (grande)\n  Subtítulo (médio)\n    Seção (pequeno)',
  },
  {
    key: 'bold',
    label: 'Ênfase',
    syntax: '**negrito** para destaque\n*itálico* para ênfase',
    rendered: 'negrito (forte)\n  itálico (suave)',
  },
  {
    key: 'code',
    label: 'Código',
    syntax: 'Use `print()` para imprimir\n\n```python\ndef hello():\n    print("Olá!")\n```',
    rendered: 'Use print() para imprimir\n\n┌─────────────────┐\n│ def hello():    │\n│   print("Olá!") │\n└─────────────────┘',
  },
  {
    key: 'list',
    label: 'Listas',
    syntax: '- Item não ordenado\n- Outro item\n\n1. Primeiro passo\n2. Segundo passo',
    rendered: '• Item não ordenado\n  • Outro item\n\n  1. Primeiro passo\n  2. Segundo passo',
  },
  {
    key: 'table',
    label: 'Tabelas',
    syntax: '| Modelo | Params |\n|---|---|\n| GPT-2 | 124M |\n| GPT-4 | 1.7T |',
    rendered: '┌────────┬────────┐\n│ Modelo │ Params │\n├────────┼────────┤\n│ GPT-2  │ 124M   │\n│ GPT-4  │ 1.7T   │\n└────────┴────────┘',
  },
];

export const MarkdownSyntaxVisual = React.memo(({ copy }: MarkdownSyntaxVisualProps) => {
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
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Tab bar */}
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

      {/* Syntax / Rendered side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Syntax */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.purple, marginBottom: '8px' }}>
            {copy.syntaxLabel}
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

        {/* Rendered */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: sw.cyan, marginBottom: '8px' }}>
            {copy.renderLabel}
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
