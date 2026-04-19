import React, { useEffect, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { NonlinearRegressionBoundaryVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface NonlinearRegressionBoundaryVisualProps {
  copy: NonlinearRegressionBoundaryVisualCopy;
}

type Sample = {
  x: number;
  y: number;
  label: 0 | 1;
};

type Model = {
  w0: number;
  w1: number;
  w2: number;
};

type Metrics = {
  mse: number;
  accuracy: number;
};

const maxEpochs = 36;
const frameDelayMs = 105;
const learningRate = 0.22;
const datasetSize = 3600;
const renderStride = 4;

const initialModel: Model = {
  w0: 0.18,
  w1: 0.82,
  w2: -0.12,
};

const chartBounds = {
  left: 52,
  right: 588,
  top: 44,
  bottom: 374,
};

const featureBounds = {
  minX: -2.7,
  maxX: 2.7,
  minY: -2.7,
  maxY: 2.7,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const sigmoid = (value: number) => 1 / (1 + Math.exp(-clamp(value, -18, 18)));

const pseudoRandom = (index: number, salt: number) => {
  const raw = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
};

const makeRingPoints = (count: number, classLabel: 0 | 1, radius: number, spread: number, seed: number): Sample[] =>
  Array.from({ length: count }, (_, index) => {
    const baseAngle = (index / count) * Math.PI * 2 + seed;
    const angleNoise = (pseudoRandom(index, seed * 10 + 1) - 0.5) * 0.36;
    const radialNoise = (pseudoRandom(index, seed * 10 + 2) - 0.5) * spread;
    const x = Math.cos(baseAngle + angleNoise) * (radius + radialNoise);
    const y = Math.sin(baseAngle - angleNoise) * (radius + radialNoise);

    return { x, y, label: classLabel };
  });

const dataset: Sample[] = [
  ...makeRingPoints(datasetSize / 2, 1, 0.74, 0.18, 0.21),
  ...makeRingPoints(datasetSize / 2, 0, 1.82, 0.24, 1.13),
];

const renderedSamples = dataset.filter((_, index) => index % renderStride === 0);

const toScreenX = (x: number) => {
  const ratio = (x - featureBounds.minX) / (featureBounds.maxX - featureBounds.minX);
  return chartBounds.left + ratio * (chartBounds.right - chartBounds.left);
};

const toScreenY = (y: number) => {
  const ratio = (y - featureBounds.minY) / (featureBounds.maxY - featureBounds.minY);
  return chartBounds.bottom - ratio * (chartBounds.bottom - chartBounds.top);
};

const predictRaw = (model: Model, sample: Sample) => model.w0 + model.w1 * sample.x + model.w2 * sample.y;

const predictProbability = (model: Model, sample: Sample) => sigmoid(predictRaw(model, sample));

const predictLabel = (model: Model, sample: Sample) => (predictProbability(model, sample) >= 0.5 ? 1 : 0);

const evaluateMetrics = (model: Model): Metrics => {
  let mseSum = 0;
  let correct = 0;

  dataset.forEach(sample => {
    const prediction = predictProbability(model, sample);
    const error = prediction - sample.label;
    mseSum += error * error;
    correct += predictLabel(model, sample) === sample.label ? 1 : 0;
  });

  return {
    mse: mseSum / dataset.length,
    accuracy: (correct / dataset.length) * 100,
  };
};

const trainEpoch = (model: Model): { nextModel: Model; metrics: Metrics } => {
  let gradW0 = 0;
  let gradW1 = 0;
  let gradW2 = 0;
  let mseSum = 0;
  let correct = 0;

  dataset.forEach(sample => {
    const prediction = predictProbability(model, sample);
    const error = prediction - sample.label;
    mseSum += error * error;
    correct += prediction >= 0.5 ? (sample.label === 1 ? 1 : 0) : sample.label === 0 ? 1 : 0;

    const gradientFactor = 2 * error * prediction * (1 - prediction);
    gradW0 += gradientFactor;
    gradW1 += gradientFactor * sample.x;
    gradW2 += gradientFactor * sample.y;
  });

  const n = dataset.length;
  return {
    nextModel: {
      w0: model.w0 - learningRate * (gradW0 / n),
      w1: model.w1 - learningRate * (gradW1 / n),
      w2: model.w2 - learningRate * (gradW2 / n),
    },
    metrics: {
      mse: mseSum / n,
      accuracy: (correct / n) * 100,
    },
  };
};

const trainToCompletion = (startModel: Model) => {
  let model = { ...startModel };
  let metrics = evaluateMetrics(model);

  for (let epoch = 0; epoch < maxEpochs; epoch += 1) {
    const step = trainEpoch(model);
    model = step.nextModel;
    metrics = step.metrics;
  }

  return { model, metrics };
};

const lineIntersections = (model: Model) => {
  const points: Array<{ x: number; y: number }> = [];
  const pushIfVisible = (x: number, y: number) => {
    if (x >= featureBounds.minX - 0.0001 && x <= featureBounds.maxX + 0.0001 && y >= featureBounds.minY - 0.0001 && y <= featureBounds.maxY + 0.0001) {
      points.push({ x, y });
    }
  };

  if (Math.abs(model.w2) > 0.00001) {
    pushIfVisible(featureBounds.minX, (-model.w0 - model.w1 * featureBounds.minX) / model.w2);
    pushIfVisible(featureBounds.maxX, (-model.w0 - model.w1 * featureBounds.maxX) / model.w2);
  }

  if (Math.abs(model.w1) > 0.00001) {
    pushIfVisible((-model.w0 - model.w2 * featureBounds.minY) / model.w1, featureBounds.minY);
    pushIfVisible((-model.w0 - model.w2 * featureBounds.maxY) / model.w1, featureBounds.maxY);
  }

  const uniquePoints = points.filter(
    (point, index) => index === points.findIndex(other => Math.abs(other.x - point.x) < 0.0001 && Math.abs(other.y - point.y) < 0.0001),
  );

  if (uniquePoints.length >= 2) {
    return uniquePoints.slice(0, 2);
  }

  return [
    { x: featureBounds.minX, y: (-model.w0 - model.w1 * featureBounds.minX) / (model.w2 || 1) },
    { x: featureBounds.maxX, y: (-model.w0 - model.w1 * featureBounds.maxX) / (model.w2 || 1) },
  ];
};

const pillStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 11px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.01em',
  color: 'rgba(243, 244, 246, 0.96)',
  background: 'rgba(9, 12, 20, 0.72)',
  border: `1px solid ${accent}66`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 18px rgba(0,0,0,0.15)`,
});

const neutralPillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 11px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  minWidth: 0,
  color: 'rgba(243, 244, 246, 0.96)',
  background: 'rgba(9, 12, 20, 0.72)',
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 18px rgba(0,0,0,0.15)',
};

const metricsStripStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 8,
};

const metricCardStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: 9.5,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
};

const metricValueStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 24,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: 'var(--sw-text)',
};

const metricSubtextStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 10.5,
  lineHeight: 1.35,
  color: 'var(--sw-text-dim)',
};

const codeHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const codeBodyStyle: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  margin: 0,
  padding: 16,
  borderRadius: 16,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  overflow: 'auto',
  whiteSpace: 'pre',
  fontSize: 12.5,
  lineHeight: 1.65,
  color: 'rgba(243, 244, 246, 0.95)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const controlBarStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 10,
};

const legendRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: '1 1 320px',
  minWidth: 0,
};

const buttonBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '11px 12px',
  borderRadius: 12,
  border: '1px solid transparent',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  transition: 'all 180ms ease',
};

const viewportShellStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 340,
  borderRadius: 18,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.08), transparent 24%), radial-gradient(circle at 80% 12%, rgba(255, 46, 151, 0.10), transparent 24%), linear-gradient(180deg, rgba(239, 245, 231, 1), rgba(225, 236, 216, 1))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 42px rgba(0,0,0,0.20)',
};

const formatAccuracy = (value: number) => `${value.toFixed(1)}%`;
const formatMse = (value: number) => value.toFixed(4);

const lineColor = '#ff6b6b';

export const NonlinearRegressionBoundaryVisual: React.FC<NonlinearRegressionBoundaryVisualProps> = ({ copy }) => {
  const modelRef = React.useRef<Model>(initialModel);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>(() => (prefersReducedMotion ? 'done' : 'idle'));
  const [model, setModel] = useState(initialModel);
  const [metrics, setMetrics] = useState<Metrics>(() => evaluateMetrics(initialModel));
  const [epoch, setEpoch] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (phase !== 'running' || prefersReducedMotion) {
      return;
    }

    let timeoutId = 0;
    let cancelled = false;
    let currentModel = { ...modelRef.current };
    let currentEpoch = 0;

    const step = () => {
      if (cancelled) {
        return;
      }

      const result = trainEpoch(currentModel);
      currentModel = result.nextModel;
      currentEpoch += 1;

      modelRef.current = currentModel;
      setModel(currentModel);
      setMetrics(result.metrics);
      setEpoch(currentEpoch);

      if (currentEpoch >= maxEpochs) {
        setPhase('done');
        return;
      }

      timeoutId = window.setTimeout(step, frameDelayMs);
    };

    timeoutId = window.setTimeout(step, frameDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [phase, prefersReducedMotion]);

  const handleStart = () => {
    if (prefersReducedMotion) {
      const finalState = trainToCompletion(initialModel);
      modelRef.current = finalState.model;
      setModel(finalState.model);
      setMetrics(finalState.metrics);
      setEpoch(maxEpochs);
      setPhase('done');
      return;
    }

    modelRef.current = initialModel;
    setModel(initialModel);
    setMetrics(evaluateMetrics(initialModel));
    setEpoch(0);
    setPhase('running');
  };

  const handleRestart = () => {
    modelRef.current = initialModel;
    setModel(initialModel);
    setMetrics(evaluateMetrics(initialModel));
    setEpoch(0);
    setPhase(prefersReducedMotion ? 'done' : 'idle');
  };

  const statusText =
    phase === 'idle' ? copy.statusIdleLabel : phase === 'running' ? copy.statusRunningLabel : copy.statusCompleteLabel;
  const linePoints = lineIntersections(model).map(point => ({
    x: toScreenX(point.x),
    y: toScreenY(point.y),
  }));
  const lineSegment =
    linePoints.length >= 2 ? linePoints : [{ x: chartBounds.left, y: chartBounds.bottom }, { x: chartBounds.right, y: chartBounds.top }];
  const correctCount = Math.round((metrics.accuracy / 100) * dataset.length);
  const wrongCount = dataset.length - correctCount;
  const progressText = `${epoch}/${maxEpochs}`;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--sw-cyan)',
            marginBottom: 10,
          }}
        >
          {copy.eyebrow}
        </div>
      </div>

      <TabsBar ariaLabel={copy.title} items={copy.tabLabels.map(label => ({ label }))} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <PanelCard minHeight={0} gap={10}>
            <div style={metricsStripStyle}>
              <div style={metricCardStyle}>
                <div style={metricLabelStyle}>{copy.accuracyLabel}</div>
                <div style={metricValueStyle}>{formatAccuracy(metrics.accuracy)}</div>
                <div style={metricSubtextStyle}>
                  {correctCount}/{dataset.length} corretos · {wrongCount} errados
                </div>
              </div>

              <div style={metricCardStyle}>
                <div style={metricLabelStyle}>{copy.mseLabel}</div>
                <div style={metricValueStyle} title="Mean Squared Error">
                  {formatMse(metrics.mse)}
                </div>
                <div style={metricSubtextStyle}>erro médio sobre o dataset inteiro</div>
              </div>

              <div style={metricCardStyle}>
                <div style={metricLabelStyle}>{copy.statusLabel}</div>
                <div
                  style={{
                    marginTop: 4,
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: 6,
                    alignItems: 'stretch',
                    minHeight: 34,
                  }}
                >
                  <span style={{ ...neutralPillStyle, justifyContent: 'center', width: '100%' }}>{statusText}</span>
                  <span style={{ ...neutralPillStyle, justifyContent: 'center', width: '100%' }}>{progressText} épocas</span>
                </div>
                <div style={metricSubtextStyle}>a linha atualiza em tempo real</div>
              </div>
            </div>

            <div style={controlBarStyle}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={phase === 'running'}
                  aria-label={copy.startLabel}
                  title={copy.startLabel}
                  style={{
                    ...buttonBaseStyle,
                    width: 44,
                    justifyContent: 'center',
                    color: '#091018',
                    background: 'linear-gradient(135deg, rgba(62, 214, 111, 0.96), rgba(102, 184, 74, 0.94))',
                    boxShadow: '0 14px 32px rgba(62, 214, 111, 0.16)',
                    opacity: phase === 'running' ? 0.72 : 1,
                  }}
                >
                  <Play size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  aria-label={copy.restartLabel}
                  title={copy.restartLabel}
                  style={{
                    ...buttonBaseStyle,
                    width: 44,
                    justifyContent: 'center',
                    color: 'var(--sw-text)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <RotateCcw size={16} />
                </button>
              </div>
              <div style={legendRowStyle}>
                <span style={pillStyle('#4f91ff')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#4f91ff', boxShadow: '0 0 18px rgba(79,145,255,0.5)' }} />
                  {copy.outerClassLabel}
                </span>
                <span style={pillStyle('#66b84a')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#66b84a', boxShadow: '0 0 18px rgba(102,184,74,0.5)' }} />
                  {copy.innerClassLabel}
                </span>
                <span style={pillStyle(lineColor)}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: lineColor, boxShadow: '0 0 18px rgba(255,107,107,0.5)' }} />
                  {copy.lineLabel}
                </span>
                <span style={pillStyle('#ff6b6b')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ff6b6b', boxShadow: '0 0 18px rgba(255,107,107,0.5)' }} />
                  erros vermelhos
                </span>
              </div>
            </div>

            <div style={viewportShellStyle}>
              <svg
                viewBox="0 0 640 420"
                width="100%"
                height="100%"
                role="img"
                aria-label={copy.title}
                style={{ display: 'block', width: '100%', height: '100%' }}
                preserveAspectRatio="none"
              >
              <defs>
                <linearGradient id="nrb-linear-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#e64545" />
                </linearGradient>
                <filter id="nrb-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width="640" height="420" fill="rgba(255,255,255,0.06)" />

              {[64, 124, 184, 244, 304, 364, 424, 484, 544, 604].map(x => (
                <line key={`grid-v-${x}`} x1={x} y1="36" x2={x} y2="384" stroke="rgba(44, 55, 66, 0.09)" strokeWidth="1" />
              ))}
              {[54, 108, 162, 216, 270, 324, 378].map(y => (
                <line key={`grid-h-${y}`} x1="40" y1={y} x2="600" y2={y} stroke="rgba(44, 55, 66, 0.09)" strokeWidth="1" />
              ))}

              <line x1="40" y1={210} x2="600" y2={210} stroke="rgba(34, 42, 49, 0.45)" strokeWidth="2.2" />
              <line x1={320} y1="36" x2={320} y2="384" stroke="rgba(34, 42, 49, 0.45)" strokeWidth="2.2" />

              <line
                x1={lineSegment[0].x}
                y1={lineSegment[0].y}
                x2={lineSegment[1].x}
                y2={lineSegment[1].y}
                stroke="url(#nrb-linear-line)"
                strokeWidth="4.8"
                strokeLinecap="round"
                filter="url(#nrb-glow)"
              />

              {renderedSamples.map((sample, index) => {
                const x = toScreenX(sample.x);
                const y = toScreenY(sample.y);
                const predicted = predictLabel(model, sample);
                const correct = predicted === sample.label;
                const isInner = sample.label === 1;
                const fill = isInner ? '#64b84a' : '#4f8cff';
                const stroke = correct ? (isInner ? '#2f7b28' : '#2854ad') : '#ff6b6b';
                const radius = correct ? (isInner ? 5.0 : 5.4) : 6.1;
                const haloRadius = correct ? radius + 2.8 : radius + 4.2;

                return (
                  <g key={`${sample.label}-${index}`}>
                    <circle cx={x} cy={y} r={haloRadius} fill={correct ? fill : '#ff6b6b'} opacity={correct ? 0.14 : 0.2} />
                    <circle cx={x} cy={y} r={radius} fill={fill} stroke={stroke} strokeWidth={correct ? 1.4 : 2.1} />
                  </g>
                );
              })}
              </svg>
            </div>

            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{copy.lineDescription}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{copy.footer}</div>
          </PanelCard>
        ) : (
          <PanelCard minHeight={0} gap={12}>
            <div style={codeHeaderStyle}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--sw-text)',
                }}
              >
                {copy.codeTitle}
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{copy.codeDescription}</div>
            </div>

            <pre style={codeBodyStyle}>
              <code>{copy.code}</code>
            </pre>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
};
