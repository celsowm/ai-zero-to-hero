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
          gridTemplateColumns: 'minmax(260px, 1fr) minmax(260px, 1.1fr)',
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
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            minHeight: 0,
          }}
        >
          <div style={{ color: sw.text, fontSize: 14, fontWeight: 800 }}>{copy.legendTitle}</div>

          {/* Selectable module tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
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
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                    background: isActive ? `${color}18` : sw.surfaceLight,
                    color: isActive ? color : sw.textDim,
                    cursor: 'pointer',
                    boxShadow: isActive ? `0 8px 18px ${color}18` : 'none',
                    transition: 'all 150ms ease',
                  }}
                >
                  {item.module}
                </button>
              );
            })}
          </div>

          {/* Iterative focus card */}
          <div
            aria-live="polite"
            style={{
              border: `1px solid ${activeColor}55`,
              borderRadius: 14,
              background: `linear-gradient(180deg, ${activeColor}12, rgba(255,255,255,0.02))`,
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: activeColor, fontFamily: sw.fontMono }}>
                {active.module}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: sw.textMuted,
                  fontFamily: sw.fontMono,
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')} / {String(copy.legend.length).padStart(2, '0')}
              </div>
            </div>

            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.text }}>{active.role}</div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
              {copy.legend.map((_, index) => {
                const color = MODULE_COLORS[index % MODULE_COLORS.length];
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    aria-label={`module ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      width: 12,
                      height: 8,
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? color : sw.surfaceLight,
                      transition: 'background 150ms ease',
                    }}
                  />
                );
              })}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                disabled={activeIndex === 0}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 8,
                  border: `1px solid ${sw.borderSubtle}`,
                  background: activeIndex === 0 ? 'rgba(255,255,255,0.025)' : sw.surface,
                  color: activeIndex === 0 ? sw.textMuted : sw.text,
                  cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Anterior / Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex(i => Math.min(copy.legend.length - 1, i + 1))}
                disabled={activeIndex === copy.legend.length - 1}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 8,
                  border: `1px solid ${activeIndex === copy.legend.length - 1 ? sw.borderSubtle : `${activeColor}55`}`,
                  background: activeIndex === copy.legend.length - 1 ? 'rgba(255,255,255,0.025)' : `linear-gradient(135deg, ${activeColor}20, rgba(255,255,255,0.04))`,
                  color: activeIndex === copy.legend.length - 1 ? sw.textMuted : sw.text,
                  cursor: activeIndex === copy.legend.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Próximo / Next →
              </button>
            </div>
          </div>
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
  );
});
