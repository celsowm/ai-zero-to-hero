import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { PytorchEcosystemMermaidCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    primaryColor: '#0b1020',
    primaryTextColor: '#dbe6ff',
    primaryBorderColor: '#2b3e73',
    lineColor: '#22d3ee',
    tertiaryColor: '#111a2f',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
});

interface PytorchEcosystemMermaidVisualProps {
  copy: PytorchEcosystemMermaidCopy;
}

const MermaidBlock: React.FC<{ source: string }> = ({ source }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setFailed(false);
    node.innerHTML = source;

    mermaid
      .run({ nodes: [node] })
      .catch(() => setFailed(true));

    return () => {
      node.innerHTML = '';
    };
  }, [source]);

  if (failed) {
    return (
      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 12,
          background: sw.surfaceLight,
          color: sw.textMuted,
          fontSize: 13,
          padding: 12,
        }}
      >
        Mermaid indisponível neste ambiente. Veja a legenda ao lado.
      </div>
    );
  }

  return <div ref={ref} />;
};

export const PytorchEcosystemMermaidVisual = React.memo(({ copy }: PytorchEcosystemMermaidVisualProps) => (
  <div style={{ display: 'grid', gap: 12, height: '100%' }}>
    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 14,
        background: sw.surface,
        padding: 12,
      }}
    >
      <div style={{ color: sw.text, fontSize: 18, fontWeight: 800 }}>{copy.title}</div>
      <div style={{ color: sw.textDim, fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{copy.subtitle}</div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 12,
        minHeight: 0,
      }}
    >
      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 14,
          background: sw.surface,
          padding: 12,
          overflow: 'auto',
        }}
      >
        <MermaidBlock source={copy.mermaidSource} />
      </div>

      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 14,
          background: sw.surface,
          padding: 12,
          display: 'grid',
          alignContent: 'start',
          gap: 10,
        }}
      >
        <div style={{ color: sw.text, fontSize: 14, fontWeight: 800 }}>{copy.legendTitle}</div>
        {copy.legend.map(item => (
          <div key={item.module} style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 10, padding: 10, background: sw.surfaceLight }}>
            <div style={{ color: sw.cyan, fontSize: 13, fontWeight: 800 }}>{item.module}</div>
            <div style={{ color: sw.textDim, fontSize: 12.5, lineHeight: 1.5, marginTop: 4 }}>{item.role}</div>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 12,
        background: sw.surface,
        color: sw.textMuted,
        fontSize: 12.5,
        lineHeight: 1.5,
        padding: '10px 12px',
      }}
    >
      {copy.footer}
    </div>
  </div>
));

