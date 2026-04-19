import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Sigma } from 'lucide-react';
import type { ProgressStepperVisualCopy } from '../../../types/slide';

interface ProgressStepperVisualProps {
  copy: ProgressStepperVisualCopy;
}

const cardStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 20,
  padding: 20,
  background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(14, 13, 24, 0.98))',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.24)',
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 10,
};

const buttonBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  minWidth: 132,
  padding: '11px 14px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.08)',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.01em',
  transition: 'all 160ms ease',
};

export const ProgressStepperVisual: React.FC<ProgressStepperVisualProps> = ({ copy }) => {
  const [activeStep, setActiveStep] = useState(0);
  const lastStepIndex = copy.steps.length - 1;
  const currentStep = copy.steps[activeStep];
  const progress = ((activeStep + 1) / copy.steps.length) * 100;
  const isFirst = activeStep === 0;
  const isLast = activeStep === lastStepIndex;

  const goToPreviousStep = () => {
    setActiveStep(previous => Math.max(0, previous - 1));
  };

  const goToNextStep = () => {
    setActiveStep(previous => Math.min(lastStepIndex, previous + 1));
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          ...cardStyle,
          flex: '1 1 0',
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
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

        <p
          style={{
            margin: '0 0 18px 0',
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--sw-text-dim)',
          }}
        >
          {copy.description}
        </p>

        <div
          style={{
            display: 'grid',
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              height: 8,
              borderRadius: 999,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.06)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: 999,
                background: 'linear-gradient(90deg, rgba(0, 229, 255, 0.95), rgba(255, 46, 151, 0.92))',
                transition: 'width 200ms ease',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${copy.steps.length}, minmax(0, 1fr))`,
              gap: 8,
            }}
          >
            {copy.steps.map((step, index) => {
              const completed = index < activeStep;
              const active = index === activeStep;

              return (
                <div
                  key={step.label}
                  style={{
                    minWidth: 0,
                    padding: '10px 10px 9px',
                    borderRadius: 14,
                    border: `1px solid ${active ? `${step.accent}80` : 'rgba(255,255,255,0.06)'}`,
                    background: active
                      ? `linear-gradient(180deg, ${step.accent}20, rgba(255,255,255,0.03))`
                      : completed
                        ? 'rgba(255,255,255,0.035)'
                        : 'rgba(255,255,255,0.02)',
                    opacity: completed || active ? 1 : 0.78,
                    boxShadow: active ? `0 0 0 1px ${step.accent}22 inset` : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        flexShrink: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 800,
                        color: active ? '#091018' : 'var(--sw-text)',
                        background: active
                          ? step.accent
                          : completed
                            ? `${step.accent}55`
                            : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      style={{
                        minWidth: 0,
                        fontSize: 12,
                        fontWeight: 700,
                        color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          aria-live="polite"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 20,
            borderRadius: 18,
            border: `1px solid ${currentStep.accent}55`,
            background: `linear-gradient(180deg, ${currentStep.accent}18, rgba(255,255,255,0.025))`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 'auto auto -40px -42px',
              width: 132,
              height: 132,
              borderRadius: 999,
              background: `${currentStep.accent}18`,
              filter: 'blur(2px)',
            }}
          />

          <div style={{ position: 'relative', display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: currentStep.accent,
                }}
              >
                {copy.progressLabel} {activeStep + 1}/{copy.steps.length}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--sw-text-muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {currentStep.label}
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
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--sw-text)',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <Sigma size={16} color={currentStep.accent} />
              <span style={{ wordBreak: 'break-word' }}>{currentStep.formula}</span>
            </div>

            {copy.table ? (
              <div
                style={{
                  display: 'grid',
                  gap: 10,
                  padding: 14,
                  borderRadius: 16,
                  background: 'rgba(8, 10, 18, 0.28)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--sw-text-muted)',
                  }}
                >
                  {copy.table.title}
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'separate',
                      borderSpacing: 0,
                      fontSize: 12.5,
                      color: 'var(--sw-text)',
                    }}
                  >
                    <thead>
                      <tr>
                        {[
                          copy.table.headers.height,
                          copy.table.headers.age,
                          copy.table.headers.realWeight,
                          copy.table.headers.predictedWeight,
                          copy.table.headers.error,
                          copy.table.headers.squaredError,
                        ].map(header => (
                          <th
                            key={header}
                            style={{
                              padding: '8px 10px',
                              textAlign: 'left',
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'var(--sw-text-muted)',
                              borderBottom: '1px solid rgba(255,255,255,0.08)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {copy.table.rows.map((row, index) => {
                        const isHighlighted = currentStep.highlightedRowIndexes?.includes(index) ?? false;

                        return (
                          <tr
                            key={`${row.height}-${row.age}-${index}`}
                            style={{
                              background: isHighlighted ? `${currentStep.accent}18` : 'transparent',
                              boxShadow: isHighlighted ? `inset 0 0 0 1px ${currentStep.accent}44` : 'none',
                            }}
                          >
                            {[row.height, row.age, row.realWeight, row.predictedWeight ?? '-', row.error ?? '-', row.squaredError ?? '-'].map(
                              (cell, cellIndex) => (
                                <td
                                  key={`${cell}-${cellIndex}`}
                                  style={{
                                    padding: '10px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    color: isHighlighted ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                                    fontWeight: isHighlighted ? 700 : 500,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--sw-text-dim)',
              }}
            >
              {currentStep.description}
            </p>

            {isLast ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <CheckCircle2 size={18} color={currentStep.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
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

        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={isFirst}
            style={{
              ...buttonBaseStyle,
              justifySelf: 'start',
              color: isFirst ? 'rgba(232, 228, 240, 0.42)' : 'var(--sw-text)',
              background: isFirst ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              opacity: isFirst ? 0.55 : 1,
            }}
          >
            <ChevronLeft size={16} />
            {copy.previousLabel}
          </button>

          <div
            style={{
              justifySelf: 'center',
              padding: '10px 14px',
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
            onClick={goToNextStep}
            disabled={isLast}
            style={{
              ...buttonBaseStyle,
              justifySelf: 'end',
              color: isLast ? 'rgba(232, 228, 240, 0.42)' : '#091018',
              background: isLast
                ? 'rgba(255,255,255,0.025)'
                : 'linear-gradient(135deg, rgba(0, 229, 255, 0.95), rgba(255, 46, 151, 0.92))',
              cursor: isLast ? 'not-allowed' : 'pointer',
              opacity: isLast ? 0.55 : 1,
              boxShadow: isLast ? 'none' : '0 14px 28px rgba(0, 229, 255, 0.12)',
            }}
          >
            {copy.nextLabel}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '0 4px',
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--sw-text-muted)',
        }}
      >
        {copy.footer}
      </div>
    </div>
  );
};
