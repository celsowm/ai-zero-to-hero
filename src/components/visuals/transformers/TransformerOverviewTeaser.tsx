import React, { useMemo, useState } from 'react';
import type { TransformerOverviewTeaserCopy } from '../../../types/slide';

interface TransformerOverviewTeaserProps {
  copy: TransformerOverviewTeaserCopy;
}

const TokenRow: React.FC<{
  tokens: string[];
  color: string;
  activeCount?: number;
  mutedOpacity?: number;
}> = ({ tokens, color, activeCount = tokens.length, mutedOpacity = 0.24 }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    {tokens.map((token, index) => {
      const active = index < activeCount;

      return (
        <span
          key={`${token}-${index}`}
          style={{
            fontSize: 18,
            fontWeight: 700,
            color,
            opacity: active ? 1 : mutedOpacity,
            textShadow: `0 0 14px ${color}30`,
            transition: 'opacity 180ms ease, transform 180ms ease',
            transform: active ? 'translateY(0)' : 'translateY(1px)',
          }}
        >
          {token}
        </span>
      );
    })}
  </div>
);

const BarsRow: React.FC<{
  count: number;
  activeCount: number;
  color: string;
}> = ({ count, activeCount, color }) => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        style={{
          width: 16,
          height: 8,
          borderRadius: 999,
          background: color,
          opacity: index < activeCount ? 1 : 0.22,
          boxShadow: `0 0 10px ${color}44`,
        }}
      />
    ))}
  </div>
);

const Panel: React.FC<{
  title: string;
  badge: string;
  accent: string;
  highlight: boolean;
  children: React.ReactNode;
}> = ({ title, badge, accent, highlight, children }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 22,
      border: `1px solid ${highlight ? `${accent}80` : 'rgba(255,255,255,0.10)'}`,
      background: highlight
        ? `linear-gradient(180deg, ${accent}18 0%, rgba(14,14,22,0.92) 100%)`
        : 'linear-gradient(180deg, rgba(18,18,28,0.84) 0%, rgba(11,11,18,0.96) 100%)',
      boxShadow: highlight
        ? `0 16px 38px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.04)`
        : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: 244,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--sw-text-dim)',
        }}
      >
        {badge}
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--sw-text)' }}>{title}</div>
    </div>
    {children}
  </div>
);

export const TransformerOverviewTeaser: React.FC<TransformerOverviewTeaserProps> = ({ copy }) => {
  const [step, setStep] = useState(3);
  const maxStep = 6;

  const sourceTokens = useMemo(() => copy.sourceSentence.split(' '), [copy.sourceSentence]);
  const targetTokens = useMemo(() => copy.targetSentence.split(' '), [copy.targetSentence]);
  const generatedCount = Math.min(Math.max(step - 1, 0), targetTokens.length);

  const stepDetails = useMemo(
    () => [
      { title: copy.step1Title, description: copy.step1Description },
      { title: copy.step2Title, description: copy.step2Description },
      { title: copy.step3Title, description: copy.step3Description },
      { title: copy.step4Title, description: copy.step4Description },
      { title: copy.step5Title, description: copy.step5Description },
      { title: copy.step6Title, description: copy.step6Description },
    ],
    [
      copy.step1Description,
      copy.step1Title,
      copy.step2Description,
      copy.step2Title,
      copy.step3Description,
      copy.step3Title,
      copy.step4Description,
      copy.step4Title,
      copy.step5Description,
      copy.step5Title,
      copy.step6Description,
      copy.step6Title,
    ]
  );

  const activeStep = stepDetails[step - 1];
  const sourceActive = step >= 1;
  const memoryActive = step >= 3;
  const decoderActive = step >= 4;
  const outputActive = step >= 5;

  return (
    <div
      style={{
        width: '100%',
        padding: 20,
        borderRadius: 28,
        background:
          'radial-gradient(120% 120% at 50% 0%, rgba(123, 92, 255, 0.10) 0%, rgba(15, 15, 24, 0.98) 38%, rgba(8, 8, 12, 1) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 28px 60px rgba(0,0,0,0.42)',
        color: 'var(--sw-text)',
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20% auto auto -10%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0) 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'auto -8% -18% auto',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,46,151,0.10) 0%, rgba(255,46,151,0) 68%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 240 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--sw-text)' }}>{copy.interactiveTitle}</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--sw-text-dim)' }}>{copy.interactiveHint}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 13, color: 'var(--sw-text-dim)', fontWeight: 700 }}>{copy.decodingStepLabel}:</span>
            {Array.from({ length: maxStep }, (_, index) => {
              const value = index + 1;
              const active = value === step;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStep(value)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    border: active ? '2px solid var(--sw-pink)' : '1px solid rgba(255,255,255,0.18)',
                    background: active ? 'rgba(255,46,151,0.18)' : 'rgba(255,255,255,0.04)',
                    color: 'var(--sw-text)',
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'transform 180ms ease, background 180ms ease, border-color 180ms ease',
                    boxShadow: active ? '0 0 0 3px rgba(255,46,151,0.10)' : 'none',
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: 'var(--sw-text-dim)',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              {copy.outputLabel}
            </span>
            <TokenRow tokens={targetTokens} activeCount={generatedCount} color="var(--sw-purple)" />
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          border: '1px solid rgba(96, 165, 250, 0.38)',
          background: 'linear-gradient(180deg, rgba(14, 18, 32, 0.92), rgba(10, 10, 16, 0.98))',
          padding: 16,
          minHeight: 292,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <marker id="to-memory" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(34, 211, 238, 0.95)" />
            </marker>
            <marker id="to-decoder" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(168, 85, 247, 0.95)" />
            </marker>
            <marker id="to-output" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(255, 46, 151, 0.95)" />
            </marker>
          </defs>

          <path
            d="M 17 64 C 24 51, 28 46, 37 44"
            stroke={sourceActive ? 'rgba(34, 211, 238, 0.95)' : 'rgba(148, 163, 184, 0.34)'}
            strokeWidth={sourceActive ? 2.8 : 1.5}
            fill="none"
            strokeLinecap="round"
            markerEnd={sourceActive ? 'url(#to-memory)' : 'none'}
          />
          <path
            d="M 44 44 C 49 44, 51 44, 57 44"
            stroke={memoryActive ? 'rgba(168, 85, 247, 0.95)' : 'rgba(148, 163, 184, 0.34)'}
            strokeWidth={memoryActive ? 2.8 : 1.5}
            fill="none"
            strokeLinecap="round"
            markerEnd={memoryActive ? 'url(#to-decoder)' : 'none'}
          />
          <path
            d="M 68 44 C 75 44, 81 41, 86 34"
            stroke={decoderActive ? 'rgba(255, 46, 151, 0.95)' : 'rgba(148, 163, 184, 0.34)'}
            strokeWidth={decoderActive ? 2.8 : 1.5}
            fill="none"
            strokeLinecap="round"
            markerEnd={decoderActive ? 'url(#to-output)' : 'none'}
          />
          <path
            d="M 77 75 C 77 66, 74 62, 69 57"
            stroke={outputActive ? 'rgba(255, 46, 151, 0.65)' : 'rgba(148, 163, 184, 0.26)'}
            strokeWidth={1.6}
            fill="none"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 0.78fr 1fr', gap: 14, alignItems: 'stretch' }}>
          <Panel
            title={copy.sourceLabel}
            badge={copy.inputLabel}
            accent="rgba(34, 211, 238, 1)"
            highlight={sourceActive}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  {copy.positionLabel}
                </div>
                <BarsRow count={sourceTokens.length} activeCount={sourceTokens.length} color="#d9e99c" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  {copy.embeddingsLabel}
                </div>
                <BarsRow count={sourceTokens.length} activeCount={sourceTokens.length} color="#9ed38b" />
              </div>

              <div style={{ marginTop: 4 }}>
                <TokenRow tokens={sourceTokens} color="#84cc16" />
              </div>
            </div>
          </Panel>

          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              border: `1px solid ${memoryActive ? 'rgba(251, 146, 60, 0.45)' : 'rgba(255,255,255,0.10)'}`,
              background: memoryActive
                ? 'linear-gradient(180deg, rgba(251, 146, 60, 0.12) 0%, rgba(12, 12, 18, 0.94) 100%)'
                : 'linear-gradient(180deg, rgba(18,18,28,0.84) 0%, rgba(11,11,18,0.96) 100%)',
              boxShadow: memoryActive
                ? '0 16px 38px rgba(251, 146, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.04)'
                : 'inset 0 1px 0 rgba(255,255,255,0.04)',
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              justifyContent: 'space-between',
              minHeight: 244,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--sw-text-dim)',
                }}
              >
                Memória
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--sw-text)' }}>
                {copy.keyLabel} / {copy.valueLabel}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              <div
                style={{
                  borderRadius: 16,
                  border: '1px solid rgba(251, 146, 60, 0.30)',
                  background: 'rgba(251, 146, 60, 0.10)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#fdba74' }}>{copy.keyLabel}</span>
                  <span style={{ fontSize: 12, color: 'var(--sw-text-dim)' }}>where to look</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 10px)', gap: 4, width: 'fit-content' }}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: index % 4 === 0 || index % 4 === 1 ? '#fb923c' : 'rgba(251, 146, 60, 0.26)',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  border: '1px solid rgba(96, 165, 250, 0.30)',
                  background: 'rgba(96, 165, 250, 0.10)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#93c5fd' }}>{copy.valueLabel}</span>
                  <span style={{ fontSize: 12, color: 'var(--sw-text-dim)' }}>what to retrieve</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 10px)', gap: 4, width: 'fit-content' }}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: index % 4 < 2 ? '#60a5fa' : 'rgba(96, 165, 250, 0.24)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 12.5,
                lineHeight: 1.5,
                color: 'var(--sw-text-dim)',
              }}
            >
              A saída do encoder vira um banco de memória para o decoder. K aponta para onde buscar e V carrega o conteúdo recuperável.
            </div>
          </div>

          <Panel
            title={copy.decoderLabel}
            badge={copy.outputLabel}
            accent="rgba(255, 46, 151, 1)"
            highlight={decoderActive}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  alignSelf: 'flex-end',
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  color: 'var(--sw-text)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                {copy.linearLabel}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  {copy.previousOutputsLabel}
                </div>
                <TokenRow tokens={targetTokens} color="var(--sw-purple)" activeCount={generatedCount} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  Próximo token
                </div>
                <div
                  style={{
                    minHeight: 56,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255, 46, 151, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 14px',
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: 'var(--sw-text)',
                      opacity: generatedCount > 0 ? 1 : 0.35,
                    }}
                  >
                    {generatedCount > 0 ? targetTokens.slice(0, generatedCount).join(' ') : '…'}
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div
        style={{
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.11)',
          background: 'linear-gradient(180deg, rgba(24, 22, 38, 0.92), rgba(16, 16, 24, 0.96))',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--sw-cyan)' }}>{activeStep.title}</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{activeStep.description}</div>
      </div>
    </div>
  );
};
