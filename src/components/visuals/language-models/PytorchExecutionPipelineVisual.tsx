import React, { useState } from 'react';
import type { PytorchExecutionPipelineCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';
import { PytorchGenerationStepper } from './PytorchGenerationStepper';

interface PytorchExecutionPipelineVisualProps {
  copy: PytorchExecutionPipelineCopy;
}

const STEP_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

export const PytorchExecutionPipelineVisual = React.memo(({ copy }: PytorchExecutionPipelineVisualProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [weight, setWeight] = useState(0);
  const [target, setTarget] = useState(2);
  const [learningRate, setLearningRate] = useState(0.1);
  const steps = copy.pipelinePanel.steps;
  const step = steps[activeStep] ?? steps[0];
  const progress = steps.length > 1 ? activeStep / (steps.length - 1) : 1;
  const gradient = 2 * (weight - target);
  const stepSize = learningRate * gradient;
  const updatedWeight = weight - stepSize;
  const lossBefore = (weight - target) ** 2;
  const lossAfter = (updatedWeight - target) ** 2;

  const interactivePanel = copy.interactivePanel ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.interactivePanel.title}</div>
        {copy.interactivePanel.subtitle && (
          <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.interactivePanel.subtitle}</div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: sw.text }}>{copy.interactivePanel.weightLabel}: <span style={{ color: sw.cyan, fontFamily: sw.fontMono }}>{weight.toFixed(2)}</span></span>
          <input type="range" min={-2} max={4} step={0.05} value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: sw.text }}>{copy.interactivePanel.targetLabel}: <span style={{ color: sw.purple, fontFamily: sw.fontMono }}>{target.toFixed(2)}</span></span>
          <input type="range" min={-2} max={4} step={0.05} value={target} onChange={(e) => setTarget(Number(e.target.value))} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: sw.text }}>{copy.interactivePanel.learningRateLabel}: <span style={{ color: sw.pink, fontFamily: sw.fontMono }}>{learningRate.toFixed(3)}</span></span>
          <input type="range" min={0.01} max={0.5} step={0.01} value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} />
        </label>
      </div>

      <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: sw.surface, padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ fontSize: 12, color: sw.text }}>{copy.interactivePanel.gradientLabel}: <strong style={{ color: sw.cyan, fontFamily: sw.fontMono }}>{gradient.toFixed(4)}</strong></div>
        <div style={{ fontSize: 12, color: sw.text }}>{copy.interactivePanel.stepSizeLabel}: <strong style={{ color: sw.pink, fontFamily: sw.fontMono }}>{stepSize.toFixed(4)}</strong></div>
        <div style={{ fontSize: 12, color: sw.text }}>{copy.interactivePanel.updatedWeightLabel}: <strong style={{ color: sw.green, fontFamily: sw.fontMono }}>{updatedWeight.toFixed(4)}</strong></div>
        <div style={{ fontSize: 12, color: sw.text }}>{copy.interactivePanel.lossBeforeLabel}: <strong style={{ color: sw.purple, fontFamily: sw.fontMono }}>{lossBefore.toFixed(6)}</strong></div>
        <div style={{ fontSize: 12, color: sw.text }}>{copy.interactivePanel.lossAfterLabel}: <strong style={{ color: lossAfter <= lossBefore ? sw.green : sw.pink, fontFamily: sw.fontMono }}>{lossAfter.toFixed(6)}</strong></div>
      </div>

      <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{copy.interactivePanel.interpretationTitle}</div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {copy.interactivePanel.interpretationBullets.map((item) => (
            <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  ) : undefined;

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      codeTabFooter={copy.generation ? <PytorchGenerationStepper copy={copy.generation} /> : undefined}
      extraPanel={interactivePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.pipelinePanel.title}</div>
            {copy.pipelinePanel.subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.pipelinePanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`, gap: 8 }}>
            {steps.map((item, index) => {
              const accent = STEP_COLORS[index % STEP_COLORS.length];
              const isActive = index === activeStep;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveStep(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 12,
                    background: isActive ? `${accent}18` : sw.surface,
                    padding: '10px 8px',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.25,
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div style={{ height: 8, borderRadius: 999, background: sw.surfaceLight, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(5, progress * 100)}%`, height: '100%', background: `linear-gradient(90deg, ${STEP_COLORS[0]}, ${STEP_COLORS[2]})`, transition: 'width 220ms ease' }} />
          </div>

          <div
            style={{
              border: `1px solid ${STEP_COLORS[activeStep % STEP_COLORS.length]}33`,
              borderRadius: 18,
              background: `linear-gradient(180deg, ${STEP_COLORS[activeStep % STEP_COLORS.length]}10, rgba(255,255,255,0.01))`,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: STEP_COLORS[activeStep % STEP_COLORS.length], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {copy.pipelinePanel.title}
                </div>
                <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: sw.text }}>{step.title ?? step.label}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: STEP_COLORS[activeStep % STEP_COLORS.length], fontFamily: sw.fontMono }}>
                {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </div>
            </div>

            {step.shape && (
              <div style={{
                marginTop: 12,
                padding: '8px 10px',
                borderRadius: 10,
                border: `1px solid ${STEP_COLORS[activeStep % STEP_COLORS.length]}44`,
                background: `${STEP_COLORS[activeStep % STEP_COLORS.length]}14`,
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 700,
                color: STEP_COLORS[activeStep % STEP_COLORS.length],
                display: 'inline-flex',
              }}>
                {step.shape}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: sw.text }}>
              {step.body}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6, color: sw.textMuted }}>
              <strong style={{ color: sw.pink }}>Risco:</strong> {step.risk}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
                {copy.pipelinePanel.failureTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.failureModes.map(item => (
                  <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'start' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.pipelinePanel.mentalModelTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.mentalModel.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          {copy.pipelinePanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.pipelinePanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
