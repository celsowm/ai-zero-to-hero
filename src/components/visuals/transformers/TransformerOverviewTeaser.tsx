import React, { useMemo, useState } from 'react';
import type { TransformerOverviewTeaserCopy } from '../../../types/slide';

interface TransformerOverviewTeaserProps {
  copy: TransformerOverviewTeaserCopy;
}

const panelBackground = 'linear-gradient(180deg, rgba(14,16,28,0.96), rgba(10,12,20,0.98))';
const labelFont = "'IBM Plex Mono', 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace";

const TokenRow: React.FC<{
  tokens: string[];
  color: string;
  activeCount?: number;
  size?: number;
}> = ({ tokens, color, activeCount = tokens.length, size = 17 }) => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
    {tokens.map((token, index) => {
      const active = index < activeCount;

      return (
        <span
          key={`${token}-${index}`}
          style={{
            fontSize: size,
            fontWeight: 700,
            color,
            opacity: active ? 1 : 0.2,
            transition: 'opacity 180ms ease',
          }}
        >
          {token}
        </span>
      );
    })}
  </div>
);

const SignalBars: React.FC<{
  count: number;
  activeCount: number;
  color: string;
}> = ({ count, activeCount, color }) => (
  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        style={{
          width: 16,
          height: 8,
          borderRadius: 2,
          background: color,
          opacity: index < activeCount ? 1 : 0.22,
          transition: 'opacity 180ms ease',
        }}
      />
    ))}
  </div>
);

const MicroLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: labelFont,
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(226,232,240,0.68)',
    }}
  >
    {children}
  </div>
);

const Frame: React.FC<{
  eyebrow: string;
  title: string;
  accent: string;
  active: boolean;
  children: React.ReactNode;
}> = ({ eyebrow, title, accent, active, children }) => (
  <section
    style={{
      borderRadius: 16,
      border: active ? `1px solid ${accent}55` : '1px solid rgba(255,255,255,0.08)',
      background: panelBackground,
      boxShadow: active ? `inset 3px 0 0 ${accent}` : 'inset 3px 0 0 rgba(255,255,255,0.04)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignSelf: 'stretch',
      minWidth: 0,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MicroLabel>{eyebrow}</MicroLabel>
      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--sw-text)' }}>{title}</div>
    </div>
    {children}
  </section>
);

const MatrixBlock: React.FC<{
  title: string;
  hint: string;
  color: string;
  active: boolean;
}> = ({ title, hint, color, active }) => (
  <div
    style={{
      borderRadius: 14,
      border: `1px solid ${active ? `${color}52` : 'rgba(255,255,255,0.08)'}`,
      background: active ? `${color}10` : 'rgba(255,255,255,0.02)',
      padding: '12px 13px',
      display: 'grid',
      gap: 10,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
      <span style={{ fontSize: 13, fontWeight: 800, color }}>{title}</span>
      <span style={{ fontSize: 12, color: 'rgba(226,232,240,0.70)', textAlign: 'right' }}>{hint}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 9px)', gap: 5, width: 'fit-content' }}>
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          style={{
            width: 9,
            height: 9,
            borderRadius: 1,
            background: index % 4 < 2 ? color : `${color}40`,
          }}
        />
      ))}
    </div>
  </div>
);

export const TransformerOverviewTeaser: React.FC<TransformerOverviewTeaserProps> = ({ copy }) => {
  const [step, setStep] = useState(3);
  const maxStep = 6;
  const eosToken = '<eos>';

  const sourceTokens = useMemo(() => copy.sourceSentence.split(' '), [copy.sourceSentence]);
  const targetTokens = useMemo(() => copy.targetSentence.split(' '), [copy.targetSentence]);
  const generatedCount = Math.min(Math.max(step - 1, 0), targetTokens.length);
  const completedOutputTokens = generatedCount >= targetTokens.length ? [...targetTokens, eosToken] : targetTokens;
  const completedOutputActiveCount = generatedCount >= targetTokens.length ? targetTokens.length + 1 : generatedCount;
  const nextTokenValue = generatedCount >= targetTokens.length ? eosToken : generatedCount > 0 ? targetTokens.slice(0, generatedCount).join(' ') : '...';

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
        minWidth: 0,
        padding: 20,
        borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(20,18,31,0.97), rgba(10,10,16,0.99))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 28px 56px rgba(0,0,0,0.34)',
        color: 'var(--sw-text)',
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <style>{`
        @media (max-width: 940px) {
          .transformer-overview-main {
            grid-template-columns: 1fr !important;
          }

          .transformer-overview-wires {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--sw-text)' }}>{copy.interactiveTitle}</div>
        <div
          style={{
            fontSize: 12.5,
            lineHeight: 1.55,
            color: 'var(--sw-text-dim)',
            whiteSpace: 'nowrap',
          }}
        >
          {copy.interactiveHint}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sw-text-dim)' }}>{copy.decodingStepLabel}:</span>
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
                  background: active ? 'rgba(255,46,151,0.14)' : 'transparent',
                  color: 'var(--sw-text)',
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: active ? '0 0 0 3px rgba(255,46,151,0.08)' : 'none',
                  transition: 'all 180ms ease',
                }}
              >
                {value}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sw-text-dim)' }}>{copy.outputLabel}</span>
          <TokenRow tokens={completedOutputTokens} activeCount={completedOutputActiveCount} color="var(--sw-purple)" size={16} />
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          borderRadius: 22,
          border: '1px solid rgba(84,126,212,0.42)',
          background: `
            linear-gradient(180deg, rgba(11,13,22,0.98), rgba(8,10,16,1)),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.02) 0,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 22px
            )
          `,
          padding: 18,
          overflow: 'visible',
        }}
      >
        <div
          className="transformer-overview-wires"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <div
            style={{
              position: 'absolute',
              left: '33%',
              top: '50%',
              width: '9%',
              height: 1,
              background: memoryActive ? 'rgba(34,211,238,0.48)' : 'rgba(148,163,184,0.18)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '58%',
              top: '50%',
              width: '9%',
              height: 1,
              background: decoderActive ? 'rgba(255,46,151,0.44)' : 'rgba(148,163,184,0.18)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '15%',
              top: '29%',
              width: 1,
              height: '40%',
              background: outputActive ? 'rgba(255,46,151,0.26)' : 'rgba(148,163,184,0.14)',
            }}
          />
        </div>

        <div
          className="transformer-overview-main"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1.06fr 0.8fr 1.08fr',
            gap: 18,
            minWidth: 0,
            alignItems: 'start',
          }}
        >
          <Frame
            eyebrow={copy.inputLabel}
            title={copy.sourceLabel}
            accent="rgba(34,211,238,1)"
            active={sourceActive}
          >
            <div
              style={{
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                padding: 14,
                display: 'grid',
                gap: 14,
              }}
            >
              <div style={{ display: 'grid', gap: 8 }}>
                <MicroLabel>{copy.positionLabel}</MicroLabel>
                <SignalBars count={sourceTokens.length} activeCount={sourceTokens.length} color="#d8e47f" />
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                <MicroLabel>{copy.embeddingsLabel}</MicroLabel>
                <SignalBars count={sourceTokens.length} activeCount={sourceTokens.length} color="#9fd28e" />
              </div>
            </div>

            <div style={{ paddingTop: 2 }}>
              <MicroLabel>{copy.inputLabel}</MicroLabel>
            </div>

            <div>
              <TokenRow tokens={sourceTokens} activeCount={sourceTokens.length} color="#84cc16" />
            </div>
          </Frame>

          <Frame
            eyebrow={copy.memoryLabel}
            title={`${copy.keyLabel} / ${copy.valueLabel}`}
            accent="rgba(251,146,60,1)"
            active={memoryActive}
          >
            <div style={{ display: 'grid', gap: 12 }}>
              <MatrixBlock title={copy.keyLabel} hint={copy.keyHintLabel} color="#fb923c" active={memoryActive} />
              <MatrixBlock title={copy.valueLabel} hint={copy.valueHintLabel} color="#60a5fa" active={memoryActive} />
            </div>

            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--sw-text-dim)' }}>
              {copy.step3Description}
            </div>
          </Frame>

          <Frame
            eyebrow={copy.targetLabel}
            title={copy.decoderLabel}
            accent="rgba(255,46,151,1)"
            active={decoderActive}
          >
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.04)',
                fontSize: 13,
                fontWeight: 800,
                color: 'var(--sw-text)',
              }}
            >
              {copy.linearLabel}
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <MicroLabel>{copy.previousOutputsLabel}</MicroLabel>
              <div
                style={{
                  borderRadius: 14,
                  border: '1px solid rgba(168,85,247,0.22)',
                  background: 'rgba(168,85,247,0.07)',
                  padding: 14,
                }}
              >
                <TokenRow tokens={targetTokens} activeCount={generatedCount} color="var(--sw-purple)" size={16} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <MicroLabel>{copy.nextTokenLabel}</MicroLabel>
              <div
                style={{
                  minHeight: 58,
                  borderRadius: 14,
                  border: outputActive ? '1px solid rgba(255,46,151,0.22)' : '1px solid rgba(255,255,255,0.08)',
                  background: outputActive ? 'rgba(255,46,151,0.07)' : 'rgba(255,255,255,0.02)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: 'var(--sw-text)',
                    opacity: generatedCount > 0 ? 1 : 0.3,
                  }}
                >
                  {nextTokenValue}
                </span>
              </div>
            </div>
          </Frame>
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(180deg, rgba(24,22,38,0.88), rgba(14,14,22,0.96))',
          padding: 16,
          display: 'grid',
          gap: 8,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--sw-cyan)' }}>{activeStep.title}</div>
        <div
          style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: 'var(--sw-text-dim)',
            minWidth: 0,
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
          {activeStep.description}
        </div>
      </div>
    </div>
  );
};
