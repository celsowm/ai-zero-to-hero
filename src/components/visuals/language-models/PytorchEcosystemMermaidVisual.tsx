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

const MODULE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b', '#38bdf8'];

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

export const PytorchEcosystemMermaidVisual = React.memo(({ copy }: PytorchEcosystemMermaidVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = copy.legend[activeIndex] ?? copy.legend[0];
  const activeColor = MODULE_COLORS[activeIndex % MODULE_COLORS.length];

  return (
    <div style={{ display: 'grid', gap: 10, height: '100%' }}>
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.6fr) minmax(240px, 1fr)',
          gap: 10,
          flex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 14,
            background: sw.surface,
            padding: 16,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MermaidBlock source={copy.mermaidSource} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          <div style={{
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 14,
            background: sw.surface,
            padding: '10px 14px',
            color: sw.text,
            fontSize: 13,
            fontWeight: 800,
          }}>{copy.legendTitle}</div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            {copy.legend.map((item, index) => {
              const color = MODULE_COLORS[index % MODULE_COLORS.length];
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.module}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  style={{
                    fontFamily: sw.fontMono,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '5px 9px',
                    borderRadius: 999,
                    border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                    background: isActive ? `${color}18` : sw.surfaceLight,
                    color: isActive ? color : sw.textDim,
                    cursor: 'pointer',
                    boxShadow: isActive ? `0 6px 14px ${color}18` : 'none',
                    transition: 'all 150ms ease',
                  }}
                >
                  {item.module}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            style={{
              border: `1px solid ${activeColor}55`,
              borderRadius: 12,
              background: `linear-gradient(180deg, ${activeColor}10, rgba(255,255,255,0.01))`,
              padding: 14,
            }}
          >
            <div style={{
              fontSize: 15,
              fontWeight: 800,
              color: activeColor,
              fontFamily: sw.fontMono,
              marginBottom: 8,
            }}>
              {active.module}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.65, color: sw.text }}>{active.role}</div>
          </div>

          <div style={{ display: 'flex', gap: 5 }}>
            <button
              type="button"
              onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 8,
                border: `1px solid ${sw.borderSubtle}`,
                background: activeIndex === 0 ? 'rgba(255,255,255,0.02)' : sw.surface,
                color: activeIndex === 0 ? sw.textMuted : sw.text,
                cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(i => Math.min(copy.legend.length - 1, i + 1))}
              disabled={activeIndex === copy.legend.length - 1}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 8,
                border: `1px solid ${activeIndex === copy.legend.length - 1 ? sw.borderSubtle : `${activeColor}55`}`,
                background: activeIndex === copy.legend.length - 1 ? 'rgba(255,255,255,0.02)' : `linear-gradient(135deg, ${activeColor}18, rgba(255,255,255,0.03))`,
                color: activeIndex === copy.legend.length - 1 ? sw.textMuted : sw.text,
                cursor: activeIndex === copy.legend.length - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              →
            </button>
          </div>
        </div>
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
