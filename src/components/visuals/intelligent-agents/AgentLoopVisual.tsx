import React, { useState } from 'react';
import type { AgentLoopVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentLoopVisualCopy }

const steps = ['plan', 'act', 'observe', 'decide'] as const;

export const AgentLoopVisual = React.memo(({ copy }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const getLabel = (step: string) => {
    switch (step) {
      case 'plan': return copy.planLabel;
      case 'act': return copy.actLabel;
      case 'observe': return copy.observeLabel;
      case 'decide': return copy.decideLabel;
      default: return '';
    }
  };
  const getDesc = (step: string) => {
    switch (step) {
      case 'plan': return copy.planDesc;
      case 'act': return copy.actDesc;
      case 'observe': return copy.observeDesc;
      case 'decide': return copy.decideDesc;
      default: return '';
    }
  };
  const getDetail = (step: number) => {
    switch (step) {
      case 0: return copy.step1Detail;
      case 1: return copy.step2Detail;
      case 2: return copy.step3Detail;
      case 3: return copy.step4Detail;
      default: return '';
    }
  };

  const handleNext = () => {
    if (currentStep >= 3) {
      setCompleted(true);
      return;
    }
    setCurrentStep(s => s + 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  const stepColor = steps[currentStep] === 'plan' ? sw.purple
    : steps[currentStep] === 'act' ? sw.emerald
    : steps[currentStep] === 'observe' ? sw.amber
    : sw.sky;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {/* Task display */}
      <div style={{
        background: sw.void, borderRadius: '10px', padding: '10px',
        border: `1px solid ${sw.borderSubtle}33`, fontSize: '11px', color: sw.text,
      }}>
        <strong>{copy.taskLabel}</strong> {copy.taskExample}
      </div>

      {/* Loop visualization */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          const color = step === 'plan' ? sw.purple
            : step === 'act' ? sw.emerald
            : step === 'observe' ? sw.amber
            : sw.sky;
          return (
            <div
              key={step}
              style={{
                padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
                border: `1px solid ${isDone || isActive ? color : sw.borderSubtle}44`,
                background: isActive ? `${color}33` : isDone ? `${color}11` : sw.surface,
                color: isDone || isActive ? color : sw.textMuted,
                display: 'flex', alignItems: 'center', gap: '4px',
                opacity: isDone ? 0.6 : 1,
              }}
            >
              {isDone ? '✓ ' : ''}{getLabel(step)}
              {i < 3 && <span style={{ marginLeft: '4px', color: sw.textMuted }}>→</span>}
            </div>
          );
        })}
      </div>

      {/* Current step detail */}
      {!completed && (
        <div style={{
          background: `${stepColor}11`, border: `1px solid ${stepColor}33`,
          borderRadius: '10px', padding: '10px', fontSize: '11px', color: sw.text, lineHeight: '1.5',
        }}>
          <strong style={{ color: stepColor }}>{getLabel(steps[currentStep])}</strong>
          <br />
          {getDesc(steps[currentStep])}
          <br /><br />
          <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>{getDetail(currentStep)}</span>
        </div>
      )}

      {completed && (
        <div style={{
          background: `${sw.emerald}22`, border: `1px solid ${sw.emerald}33`,
          borderRadius: '10px', padding: '10px', fontSize: '12px', color: sw.emerald, textAlign: 'center', fontWeight: '700',
        }}>
          {copy.completedLabel}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {!completed && (
          <button
            onClick={handleNext}
            style={{
              padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
              border: `1px solid ${sw.purple}44`, background: `${sw.purple}22`, color: sw.purple,
              cursor: 'pointer',
            }}
          >
            {copy.nextButton}
          </button>
        )}
        <button
          onClick={handleReset}
          style={{
            padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
            border: `1px solid ${sw.borderSubtle}44`, background: sw.surface, color: sw.textMuted,
            cursor: 'pointer',
          }}
        >
          {copy.resetButton}
        </button>
      </div>

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
