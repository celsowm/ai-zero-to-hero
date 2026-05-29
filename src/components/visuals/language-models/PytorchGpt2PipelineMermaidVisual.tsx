import React, { useEffect, useRef } from 'react';
import type { PytorchEcosystemMermaidCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface PytorchGpt2PipelineMermaidVisualProps {
  copy: PytorchEcosystemMermaidCopy;
}

export const PytorchGpt2PipelineMermaidVisual = React.memo(({ copy }: PytorchGpt2PipelineMermaidVisualProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: mermaid } = await import('mermaid');
      if (cancelled || !mermaidRef.current) return;
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
      mermaidRef.current.innerHTML = copy.mermaidSource;
      await mermaid.run({ nodes: [mermaidRef.current] });
    })();
    return () => { cancelled = true; };
  }, [copy.mermaidSource]);

  return (
    <div style={{ display: 'grid', gap: 10, height: '100%', alignContent: 'start' }}>
      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 14,
          background: sw.surface,
          padding: '10px 14px',
        }}
      >
        <div style={{ color: sw.text, fontSize: 17, fontWeight: 800 }}>{copy.title}</div>
        <div style={{ color: sw.textDim, fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>{copy.subtitle}</div>
      </div>

      <div
        ref={mermaidRef}
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 14,
          background: sw.surface,
          padding: 16,
          overflow: 'auto',
          minHeight: 360,
        }}
      >
        {copy.mermaidSource}
      </div>

      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 12,
          background: sw.surface,
          padding: '8px 12px',
          display: 'grid',
          gap: 6,
        }}
      >
        <div style={{ color: sw.text, fontSize: 13, fontWeight: 800 }}>{copy.legendTitle}</div>
        {copy.legend.map((item) => (
          <div
            key={item.module}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '4px 10px',
              padding: '6px 8px',
              borderRadius: 8,
              background: sw.surfaceLight,
            }}
          >
            <span
              style={{
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 800,
                color: sw.cyan,
                whiteSpace: 'nowrap',
              }}
            >
              {item.module}
            </span>
            <span style={{ fontSize: 12, color: sw.textDim, lineHeight: 1.5 }}>{item.role}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 12,
          background: sw.surface,
          color: sw.textMuted,
          fontSize: 12,
          lineHeight: 1.5,
          padding: '8px 12px',
        }}
      >
        {copy.footer}
      </div>
    </div>
  );
});
