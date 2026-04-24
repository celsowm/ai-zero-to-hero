import React, { useState } from 'react';
import type { NeuralNetworkTabsStepperCopy, NeuralNetworkTabsStepperRowCopy } from '../../../types/slide';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Props {
  copy: NeuralNetworkTabsStepperCopy;
}

const sectionColors = {
  inputs: '#00e5ff',
  hidden: '#38bdf8',
  output: '#66b84a',
} as const;

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 10,
};

const RowGrid: React.FC<{
  rows: NeuralNetworkTabsStepperRowCopy[];
  columns?: 1 | 2;
}> = ({ rows, columns = rows.length > 2 ? 2 : 1 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: columns === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
      gap: 8,
      minWidth: 0,
    }}
  >
    {rows.map((row) => (
      <div
        key={row.label}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 10,
          minWidth: 0,
          padding: '7px 8px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span
          style={{
            minWidth: 0,
            color: 'var(--sw-text-dim)',
            fontSize: 8.5,
            lineHeight: 1.1,
            textTransform: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.label}
        </span>
        <span
          style={{
            flexShrink: 0,
            color: '#e8e4f0',
            fontFamily: 'monospace',
            fontWeight: 800,
            fontSize: 11,
            lineHeight: 1.1,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            textAlign: 'right',
          }}
        >
          {row.value}
        </span>
      </div>
    ))}
  </div>
);

const SectionCard: React.FC<{
  title: string;
  accent: string;
  active: boolean;
  rows: NeuralNetworkTabsStepperRowCopy[];
}> = ({ title, accent, active, rows }) => (
  <div
    style={{
      minWidth: 0,
      padding: 12,
      borderRadius: 14,
      background: active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${active ? `${accent}80` : 'rgba(255,255,255,0.06)'}`,
      boxShadow: active ? `0 0 0 1px ${accent}22 inset, 0 0 18px ${accent}15` : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
    }}
  >
    <div
      style={{
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: accent,
        paddingBottom: 6,
        borderBottom: `1px solid ${accent}2a`,
      }}
    >
      {title}
    </div>

    <RowGrid rows={rows} />
  </div>
);

const CodePanel: React.FC<{ copy: NeuralNetworkTabsStepperCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <PanelCard
    minHeight={0}
    gap={12}
    style={{
      height: '100%',
      overflow: 'hidden',
    }}
  >
    <div style={eyebrowStyle}>{eyebrowLabel}</div>

    <div
      style={{
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--sw-text)',
      }}
    >
      {copy.title}
    </div>

    <div
      style={{
        fontSize: 13.5,
        lineHeight: 1.65,
        color: 'var(--sw-text-dim)',
      }}
    >
      {copy.description}
    </div>

    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock
        code={copy.code}
        language="python"
        explanations={copy.codeExplanations}
        sourceRef={copy.source}
      />
    </div>
  </PanelCard>
);

const StepperPanel: React.FC<{ copy: NeuralNetworkTabsStepperCopy['stepperPanel'] }> = ({ copy }) => {
  const [activeStep, setActiveStep] = useState(0);
  const lastStepIndex = copy.steps.length - 1;
  const currentStep = copy.steps[activeStep];
  const progress = ((activeStep + 1) / copy.steps.length) * 100;
  const isFirst = activeStep === 0;
  const isLast = activeStep === lastStepIndex;

  return (
    <PanelCard
      minHeight={0}
      gap={14}
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div>
        <div style={eyebrowStyle}>{copy.eyebrow}</div>

        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--sw-text)',
            marginBottom: 8,
          }}
        >
          {copy.title}
        </div>

        <div
          style={{
            fontSize: 13.5,
            lineHeight: 1.7,
            color: 'var(--sw-text-dim)',
          }}
        >
          {copy.description}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${currentStep.accent}, rgba(255,255,255,0.94))`,
              transition: 'width 200ms ease',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {copy.steps.map((step, index) => {
            const active = index === activeStep;
            const completed = index < activeStep;

            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setActiveStep(index)}
                style={{
                  minWidth: 0,
                  padding: '8px 10px',
                  borderRadius: 999,
                  border: `1px solid ${active ? `${step.accent}88` : 'rgba(255,255,255,0.06)'}`,
                  background: active
                    ? `linear-gradient(135deg, ${step.accent}22, rgba(255,255,255,0.04))`
                    : completed
                      ? 'rgba(255,255,255,0.035)'
                      : 'rgba(255,255,255,0.02)',
                  color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 180ms ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    color: active ? '#091018' : 'var(--sw-text)',
                    background: active ? step.accent : completed ? `${step.accent}55` : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          flex: '1 1 0',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: 4,
          display: 'grid',
          gap: 12,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 10,
            minWidth: 0,
          }}
        >
          <SectionCard
            title={copy.inputSectionLabel}
            accent={sectionColors.inputs}
            active={currentStep.activeSection === 'inputs'}
            rows={currentStep.inputs}
          />
          <SectionCard
            title={copy.hiddenSectionLabel}
            accent={sectionColors.hidden}
            active={currentStep.activeSection === 'hidden'}
            rows={currentStep.hidden}
          />
          <SectionCard
            title={copy.outputSectionLabel}
            accent={sectionColors.output}
            active={currentStep.activeSection === 'output'}
            rows={currentStep.output}
          />
        </div>

        <div
          aria-live="polite"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 16,
            borderRadius: 16,
            border: `1px solid ${currentStep.accent}44`,
            background: `linear-gradient(180deg, ${currentStep.accent}15, rgba(255,255,255,0.025))`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 'auto auto -42px -44px',
              width: 124,
              height: 124,
              borderRadius: 999,
              background: `${currentStep.accent}14`,
              filter: 'blur(2px)',
            }}
          />

          <div style={{ position: 'relative', display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: currentStep.accent,
                }}
              >
                {currentStep.label} {activeStep + 1}/{copy.steps.length}
              </div>

              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--sw-text-dim)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {currentStep.activeSection}
              </div>
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--sw-text)',
                lineHeight: 1.18,
              }}
            >
              {currentStep.title}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                alignSelf: 'flex-start',
                padding: '10px 14px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--sw-text)',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              <span style={{ color: currentStep.accent, fontSize: 16, lineHeight: 1 }}>Σ</span>
              <span style={{ wordBreak: 'break-word' }}>{currentStep.formula}</span>
            </div>

            <div
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--sw-text-dim)',
              }}
            >
              {currentStep.description}
            </div>

            <SectionCard
              title={copy.metricsSectionLabel}
              accent={currentStep.accent}
              active
              rows={currentStep.metrics}
            />

            {isLast ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    marginTop: 4,
                    borderRadius: 999,
                    background: currentStep.accent,
                    boxShadow: `0 0 16px ${currentStep.accent}66`,
                    flexShrink: 0,
                  }}
                />

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: currentStep.accent,
                      marginBottom: 4,
                    }}
                  >
                    {copy.completionLabel}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--sw-text)' }}>
                    {copy.completionDescription}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 12,
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveStep((previous) => Math.max(0, previous - 1))}
          disabled={isFirst}
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: isFirst ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
            color: isFirst ? 'rgba(232,228,240,0.42)' : 'var(--sw-text)',
            fontSize: 11,
            fontWeight: 700,
            cursor: isFirst ? 'not-allowed' : 'pointer',
            opacity: isFirst ? 0.55 : 1,
          }}
        >
          {copy.previousLabel}
        </button>

        <div
          style={{
            justifySelf: 'center',
            padding: '9px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'var(--sw-text-muted)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {activeStep + 1} / {copy.steps.length}
        </div>

        <button
          type="button"
          onClick={() => setActiveStep((previous) => Math.min(lastStepIndex, previous + 1))}
          disabled={isLast}
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            border: `1px solid ${isLast ? 'rgba(255,255,255,0.08)' : `${currentStep.accent}55`}`,
            background: isLast
              ? 'rgba(255,255,255,0.025)'
              : `linear-gradient(135deg, ${currentStep.accent}20, rgba(255,255,255,0.04))`,
            color: isLast ? 'rgba(232,228,240,0.42)' : 'var(--sw-text)',
            fontSize: 11,
            fontWeight: 700,
            cursor: isLast ? 'not-allowed' : 'pointer',
            opacity: isLast ? 0.55 : 1,
            boxShadow: isLast ? 'none' : `0 10px 24px ${currentStep.accent}12`,
          }}
        >
          {copy.nextLabel}
        </button>
      </div>
    </PanelCard>
  );
};

export const NeuralNetworkTabsStepper = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel={copy.stepperPanel.title} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        {activeTab === 0 ? <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[0]?.label ?? 'Code'} /> : <StepperPanel copy={copy.stepperPanel} />}
      </TabbedPanelSurface>
    </div>
  );
});
