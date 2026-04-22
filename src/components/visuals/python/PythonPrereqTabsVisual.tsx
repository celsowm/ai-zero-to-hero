import React, { useMemo, useState } from 'react';
import type {
  PythonPrereqDataGraphCopy,
  PythonPrereqFunctionGraphCopy,
  PythonPrereqLoopGraphCopy,
  PythonPrereqTabsVisualCopy,
} from '../../../types/slide';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { TabsBar } from '../TabsBar';

interface PythonPrereqTabsVisualProps {
  copy: PythonPrereqTabsVisualCopy;
}

const chartCardStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const controlsStyle: React.CSSProperties = {
  display: 'grid',
  gap: 10,
  padding: 12,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const metricRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 8,
};

const metricCardStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  minWidth: 0,
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
};

const metricValueStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 18,
  fontWeight: 700,
  color: 'var(--sw-text)',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createScale = (min: number, max: number, outMin: number, outMax: number) => {
  if (Math.abs(max - min) < 0.0000001) {
    return () => (outMin + outMax) / 2;
  }
  return (value: number) => outMin + ((value - min) / (max - min)) * (outMax - outMin);
};

const DataGraphPanel: React.FC<{ graph: PythonPrereqDataGraphCopy; footer: string }> = ({ graph, footer }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = graph.dataset[selectedIndex] ?? graph.dataset[0];

  const xValues = graph.dataset.map(point => point.height);
  const yValues = graph.dataset.map(point => point.weight);

  const xMin = Math.min(...xValues) - 3;
  const xMax = Math.max(...xValues) + 3;
  const yMin = Math.min(...yValues) - 3;
  const yMax = Math.max(...yValues) + 3;

  const mapX = createScale(xMin, xMax, 70, 490);
  const mapY = createScale(yMin, yMax, 220, 32);

  const polylinePoints = [...graph.dataset]
    .sort((a, b) => a.height - b.height)
    .map(point => `${mapX(point.height)},${mapY(point.weight)}`)
    .join(' ');

  return (
    <PanelCard minHeight={0} gap={12}>
      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{graph.title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{graph.description}</div>

      <div style={controlsStyle}>
        <label style={{ fontSize: 12.5, color: 'var(--sw-text)' }}>
          {graph.highlightLabel}: <strong style={{ color: 'var(--sw-cyan)' }}>{selected.label}</strong>
        </label>
        <input
          type="range"
          min={0}
          max={graph.dataset.length - 1}
          step={1}
          value={selectedIndex}
          onChange={(event) => setSelectedIndex(clamp(Number(event.target.value), 0, graph.dataset.length - 1))}
        />
      </div>

      <div style={chartCardStyle}>
        <svg viewBox="0 0 560 260" width="100%" height="auto" role="img" aria-label={graph.title} style={{ display: 'block' }}>
          {[32, 64, 96, 128, 160, 192, 224].map(y => (
            <line key={`grid-y-${y}`} x1="70" y1={y} x2="490" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {[90, 140, 190, 240, 290, 340, 390, 440].map(x => (
            <line key={`grid-x-${x}`} x1={x} y1="32" x2={x} y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}

          <line x1="70" y1="220" x2="490" y2="220" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <line x1="70" y1="220" x2="70" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

          <polyline
            points={polylinePoints}
            fill="none"
            stroke="rgba(0,229,255,0.45)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {graph.dataset.map((point, index) => {
            const selectedPoint = index === selectedIndex;
            return (
              <g key={point.label}>
                <circle cx={mapX(point.height)} cy={mapY(point.weight)} r={selectedPoint ? 9 : 6} fill={`${point.accent}33`} />
                <circle
                  cx={mapX(point.height)}
                  cy={mapY(point.weight)}
                  r={selectedPoint ? 6.5 : 4.5}
                  fill={point.accent}
                  stroke={selectedPoint ? '#ffffff' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPoint ? 1.8 : 1}
                />
                <text
                  x={mapX(point.height)}
                  y={mapY(point.weight) - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fill={selectedPoint ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.72)'}
                >
                  {point.label}
                </text>
              </g>
            );
          })}

          <text x="280" y="248" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.xLabel}
          </text>
          <text x="22" y="126" transform="rotate(-90 22 126)" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.yLabel}
          </text>
        </svg>
      </div>

      <div style={metricRowStyle}>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.detailLabels.height}</div>
          <div style={metricValueStyle}>{selected.height}</div>
        </div>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.detailLabels.age}</div>
          <div style={metricValueStyle}>{selected.age}</div>
        </div>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.detailLabels.weight}</div>
          <div style={metricValueStyle}>{selected.weight.toFixed(1)}</div>
        </div>
      </div>

      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{footer}</div>
    </PanelCard>
  );
};

const FunctionsGraphPanel: React.FC<{ graph: PythonPrereqFunctionGraphCopy; footer: string }> = ({ graph, footer }) => {
  const [height, setHeight] = useState(graph.initialHeight);
  const [age, setAge] = useState(graph.initialAge);

  const prediction = graph.coefficients.beta0 + graph.coefficients.beta1 * height + graph.coefficients.beta2 * age;

  const linePoints = useMemo(() => {
    const [hMin, hMax] = graph.heightRange;
    const steps = 16;
    const points = Array.from({ length: steps + 1 }, (_, index) => {
      const h = hMin + ((hMax - hMin) * index) / steps;
      const y = graph.coefficients.beta0 + graph.coefficients.beta1 * h + graph.coefficients.beta2 * age;
      return { height: h, predicted: y };
    });

    return points;
  }, [age, graph.coefficients.beta0, graph.coefficients.beta1, graph.coefficients.beta2, graph.heightRange]);

  const yMin = Math.min(...linePoints.map(point => point.predicted)) - 3;
  const yMax = Math.max(...linePoints.map(point => point.predicted)) + 3;

  const mapX = createScale(graph.heightRange[0], graph.heightRange[1], 70, 490);
  const mapY = createScale(yMin, yMax, 220, 32);
  const polylinePoints = linePoints.map(point => `${mapX(point.height)},${mapY(point.predicted)}`).join(' ');

  return (
    <PanelCard minHeight={0} gap={12}>
      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{graph.title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{graph.description}</div>

      <div style={controlsStyle}>
        <label style={{ fontSize: 12.5, color: 'var(--sw-text)' }}>
          {graph.heightLabel}: <strong style={{ color: 'var(--sw-cyan)' }}>{height.toFixed(0)}</strong>
        </label>
        <input
          type="range"
          min={graph.heightRange[0]}
          max={graph.heightRange[1]}
          step={1}
          value={height}
          onChange={(event) => setHeight(clamp(Number(event.target.value), graph.heightRange[0], graph.heightRange[1]))}
        />

        <label style={{ fontSize: 12.5, color: 'var(--sw-text)' }}>
          {graph.ageLabel}: <strong style={{ color: 'var(--sw-cyan)' }}>{age.toFixed(0)}</strong>
        </label>
        <input
          type="range"
          min={graph.ageRange[0]}
          max={graph.ageRange[1]}
          step={1}
          value={age}
          onChange={(event) => setAge(clamp(Number(event.target.value), graph.ageRange[0], graph.ageRange[1]))}
        />
      </div>

      <div style={chartCardStyle}>
        <svg viewBox="0 0 560 260" width="100%" height="auto" role="img" aria-label={graph.title} style={{ display: 'block' }}>
          {[32, 64, 96, 128, 160, 192, 224].map(y => (
            <line key={`grid-y-${y}`} x1="70" y1={y} x2="490" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {[90, 140, 190, 240, 290, 340, 390, 440].map(x => (
            <line key={`grid-x-${x}`} x1={x} y1="32" x2={x} y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}

          <line x1="70" y1="220" x2="490" y2="220" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <line x1="70" y1="220" x2="70" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

          <polyline
            points={polylinePoints}
            fill="none"
            stroke="url(#python-function-line)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="python-function-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#ff2e97" />
            </linearGradient>
          </defs>

          <circle cx={mapX(height)} cy={mapY(prediction)} r={8.5} fill="rgba(255,255,255,0.2)" />
          <circle cx={mapX(height)} cy={mapY(prediction)} r={6} fill="#ff2e97" stroke="white" strokeWidth="1.4" />

          <text x={mapX(height)} y={mapY(prediction) - 14} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.94)">
            {prediction.toFixed(2)}
          </text>

          <text x="280" y="248" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.xLabel}
          </text>
          <text x="22" y="126" transform="rotate(-90 22 126)" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.yLabel}
          </text>
        </svg>
      </div>

      <div style={metricRowStyle}>
        <div style={{ ...metricCardStyle, gridColumn: 'span 1' }}>
          <div style={metricLabelStyle}>{graph.predictionLabel}</div>
          <div style={metricValueStyle}>{prediction.toFixed(2)}</div>
        </div>
        <div style={{ ...metricCardStyle, gridColumn: 'span 2' }}>
          <div style={metricLabelStyle}>{graph.formulaLabel}</div>
          <div style={{ ...metricValueStyle, fontSize: 14.5 }}>
            {`ŷ = ${graph.coefficients.beta0.toFixed(1)} + ${graph.coefficients.beta1.toFixed(1)} * h + ${graph.coefficients.beta2.toFixed(1)} * a`}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{footer}</div>
    </PanelCard>
  );
};

const LoopsGraphPanel: React.FC<{ graph: PythonPrereqLoopGraphCopy; footer: string }> = ({ graph, footer }) => {
  const [step, setStep] = useState(1);

  const errors = graph.dataset.map(sample => {
    const predicted = graph.coefficients.beta0 + graph.coefficients.beta1 * sample.height + graph.coefficients.beta2 * sample.age;
    return predicted - sample.realWeight;
  });

  const processed = errors.slice(0, step);
  const totalError = processed.reduce((sum, value) => sum + value, 0);
  const averageError = processed.length > 0 ? totalError / processed.length : 0;
  const maxAbsError = Math.max(0.4, ...errors.map(value => Math.abs(value)));

  const mapX = createScale(0, graph.dataset.length - 1, 110, 450);
  const mapY = createScale(-maxAbsError, maxAbsError, 210, 40);
  const baselineY = mapY(0);

  return (
    <PanelCard minHeight={0} gap={12}>
      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{graph.title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{graph.description}</div>

      <div style={controlsStyle}>
        <label style={{ fontSize: 12.5, color: 'var(--sw-text)' }}>
          {graph.stepLabel}: <strong style={{ color: 'var(--sw-cyan)' }}>{step}</strong>
        </label>
        <input
          type="range"
          min={1}
          max={graph.dataset.length}
          step={1}
          value={step}
          onChange={(event) => setStep(clamp(Number(event.target.value), 1, graph.dataset.length))}
        />
      </div>

      <div style={chartCardStyle}>
        <svg viewBox="0 0 560 260" width="100%" height="auto" role="img" aria-label={graph.title} style={{ display: 'block' }}>
          {[40, 74, 108, 142, 176, 210].map(y => (
            <line key={`grid-y-${y}`} x1="70" y1={y} x2="490" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          <line x1="70" y1={baselineY} x2="490" y2={baselineY} stroke="rgba(255,255,255,0.38)" strokeWidth="2" />
          <line x1="70" y1="32" x2="70" y2="220" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

          {graph.dataset.map((sample, index) => {
            const error = errors[index];
            const x = mapX(index);
            const y = mapY(error);
            const processedSample = index < step;
            const barTop = Math.min(baselineY, y);
            const barHeight = Math.max(4, Math.abs(baselineY - y));
            const color = processedSample ? (error >= 0 ? '#f97316' : '#22d3ee') : 'rgba(148,163,184,0.45)';

            return (
              <g key={sample.label}>
                <rect x={x - 26} y={barTop} width={52} height={barHeight} rx={8} fill={color} opacity={processedSample ? 0.9 : 0.38} />
                <text x={x} y={235} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.74)">
                  {sample.label}
                </text>
                <text x={x} y={error >= 0 ? barTop - 6 : barTop + barHeight + 14} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.92)">
                  {error.toFixed(2)}
                </text>
              </g>
            );
          })}

          <text x="280" y="248" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.xLabel}
          </text>
          <text x="24" y="128" transform="rotate(-90 24 128)" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.76)">
            {graph.yLabel}
          </text>
        </svg>
      </div>

      <div style={metricRowStyle}>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.processedLabel}</div>
          <div style={metricValueStyle}>{`${step}/${graph.dataset.length}`}</div>
        </div>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.totalErrorLabel}</div>
          <div style={metricValueStyle}>{totalError.toFixed(2)}</div>
        </div>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>{graph.averageErrorLabel}</div>
          <div style={metricValueStyle}>{averageError.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{footer}</div>
    </PanelCard>
  );
};

const GraphPanel: React.FC<{ copy: PythonPrereqTabsVisualCopy }> = ({ copy }) => {
  if (copy.graphPanel.type === 'data') {
    return <DataGraphPanel graph={copy.graphPanel} footer={copy.footer} />;
  }

  if (copy.graphPanel.type === 'functions') {
    return <FunctionsGraphPanel graph={copy.graphPanel} footer={copy.footer} />;
  }

  return <LoopsGraphPanel graph={copy.graphPanel} footer={copy.footer} />;
};

const CodePanel: React.FC<{ copy: PythonPrereqTabsVisualCopy }> = ({ copy }) => (
  <PanelCard minHeight={0} gap={12}>
    <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.codePanel.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{copy.codePanel.description}</div>
    <div style={{ ...chartCardStyle, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <CodeBlock
        code={copy.codePanel.code}
        language="python"
        explanations={copy.codePanel.codeExplanations}
        sourceRef={copy.codePanel.source}
      />
    </div>
    <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{copy.footer}</div>
  </PanelCard>
);

export const PythonPrereqTabsVisual: React.FC<PythonPrereqTabsVisualProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar ariaLabel={copy.codePanel.title} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <TabbedPanelSurface>{activeTab === 0 ? <CodePanel copy={copy} /> : <GraphPanel copy={copy} />}</TabbedPanelSurface>
    </div>
  );
};
