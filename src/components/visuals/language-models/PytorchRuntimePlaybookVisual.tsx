import React, { useMemo, useState } from 'react';
import type { PytorchRuntimePlaybookCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';

interface PytorchRuntimePlaybookVisualProps {
  copy: PytorchRuntimePlaybookCopy;
}

const ACCENTS = [sw.cyan, sw.purple, sw.pink];

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 6,
        background: sw.surfaceLight,
        padding: '1px 6px',
        color: sw.cyan,
        fontSize: 12,
      }}
    >
      {children}
    </code>
  );
}

export const PytorchRuntimePlaybookVisual = React.memo(({ copy }: PytorchRuntimePlaybookVisualProps) => {
  const tabs = copy.tabs ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (tabs.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 p-6 text-center">
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>Runtime options unavailable</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>
          The current slide copy is missing runtime tabs for this locale.
        </div>
      </div>
    );
  }

  const active = tabs[activeIndex] ?? tabs[0];
  const accent = ACCENTS[activeIndex % ACCENTS.length];

  const tabItems = useMemo(
    () => tabs.map(tab => ({ label: tab.label })),
    [tabs],
  );

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar
        ariaLabel="Runtime options"
        items={tabItems}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          padding: 14,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto',
          gap: 12,
        }}
      >
        {/* Header card */}
        <div
          style={{
            border: `1px solid ${accent}44`,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${accent}16, rgba(255,255,255,0.02))`,
            padding: 14,
            display: 'grid',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
            <div>
              <div
                style={{
                  color: accent,
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {active.badge}
              </div>

              <div style={{ marginTop: 4, color: sw.text, fontSize: 20, fontWeight: 800 }}>
                {active.label}
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${accent}55`,
                borderRadius: 999,
                background: `${accent}14`,
                color: accent,
                padding: '6px 10px',
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              runtime
            </div>
          </div>

          <div style={{ color: sw.textDim, fontSize: 13, lineHeight: 1.55 }}>
            {active.when}
          </div>
        </div>

        {/* Two-column: steps + links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 12 }}>
          {/* Steps */}
          <div
            style={{
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 16,
              background: sw.surface,
              padding: 14,
              display: 'grid',
              gap: 10,
            }}
          >
            <div style={{ color: sw.text, fontSize: 14, fontWeight: 800 }}>
              Passo a passo
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {active.steps.map((step, index) => (
                <div
                  key={`${active.label}-step-${index}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '26px 1fr',
                    gap: 8,
                    alignItems: 'start',
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      border: `1px solid ${accent}55`,
                      background: `${accent}14`,
                      color: accent,
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div style={{ color: sw.textDim, fontSize: 12.5, lineHeight: 1.55 }}>
                    {step.split('`').map((part, partIndex) =>
                      partIndex % 2 === 1
                        ? <InlineCode key={`${part}-${partIndex}`}>{part}</InlineCode>
                        : <span key={`${part}-${partIndex}`}>{part}</span>,
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links + caveat */}
          <div
            style={{
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 16,
              background: sw.surface,
              padding: 14,
              display: 'grid',
              gap: 10,
              alignContent: 'start',
            }}
          >
            <div style={{ color: sw.text, fontSize: 14, fontWeight: 800 }}>
              Links úteis
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {active.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    border: `1px solid ${accent}33`,
                    borderRadius: 12,
                    background: `${accent}10`,
                    padding: '10px 12px',
                    color: sw.text,
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: accent }}>↗</span>
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: 2,
                border: `1px solid ${sw.borderSubtle}`,
                borderRadius: 12,
                background: sw.surfaceLight,
                padding: 12,
                color: sw.textMuted,
                fontSize: 12,
                lineHeight: 1.55,
              }}
            >
              {active.caveat}
            </div>
          </div>
        </div>

        {/* Code block */}
        <div
          style={{
            minHeight: 0,
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 18,
            background: '#050816',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              borderBottom: `1px solid ${sw.borderSubtle}`,
              background: sw.surfaceLight,
              padding: '10px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: sw.textDim,
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
              }}
            >
              comando / notebook
            </div>

            <button
              type="button"
              onClick={copyCode}
              style={{
                border: `1px solid ${accent}55`,
                borderRadius: 999,
                background: copied ? `${accent}22` : 'transparent',
                color: accent,
                padding: '6px 10px',
                fontSize: 11,
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              {copied ? 'copiado' : 'copiar'}
            </button>
          </div>

          <pre
            style={{
              margin: 0,
              padding: 14,
              overflow: 'auto',
              color: '#d8e2ff',
              fontSize: 12,
              lineHeight: 1.5,
              whiteSpace: 'pre',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          >
            <code>{active.code}</code>
          </pre>
        </div>

        {/* Footer */}
        <div
          style={{
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 14,
            background: sw.surface,
            padding: '10px 12px',
            color: sw.textMuted,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          {copy.footer}
        </div>
      </div>
    </div>
  );
});
