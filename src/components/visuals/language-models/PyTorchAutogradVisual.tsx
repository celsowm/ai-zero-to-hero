import React, { useState } from 'react';
import type { PyTorchPerformanceVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { RealBenchmarkVisual } from './RealBenchmarkVisual';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

export const PyTorchAutogradVisual = React.memo(({ copy }: { copy: PyTorchPerformanceVisualCopy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState<'forward' | 'backward'>('forward');

  const forwardEdges = [
    ['input', 'matmul1'], ['w1', 'matmul1'],
    ['matmul1', 'relu'],
    ['relu', 'matmul2'], ['w2', 'matmul2'],
    ['matmul2', 'output'],
    ['output', 'loss'],
  ];

  const nodePositions: Record<string, { x: number; y: number }> = {};
  const svgW = 280;
  const svgH = 220; // Reduced height to fit everything better
  const colX = [60, 220]; 

  const layout = [
    { id: 'input', x: colX[0], y: 15 },
    { id: 'w1', x: colX[0], y: 50 },
    { id: 'matmul1', x: colX[1], y: 35 },
    { id: 'relu', x: colX[0], y: 90 },
    { id: 'w2', x: colX[0], y: 130 },
    { id: 'matmul2', x: colX[1], y: 110 },
    { id: 'output', x: colX[0], y: 170 },
    { id: 'loss', x: colX[1], y: 170 },
  ];

  layout.forEach(n => { nodePositions[n.id] = { x: n.x, y: n.y }; });

  const activeEdges = step === 'forward' ? forwardEdges : forwardEdges.map(([a, b]) => [b, a] as [string, string]);
  const activeColor = step === 'forward' ? sw.cyan : sw.pink;

  const pythonLikeCode = `def forward(a, b):
    # Sequential approach (Slow)
    result = []
    for i in range(len(a)):
        val = a[i] * b[i] + 0.5
        result.append(val)
    return result`;

  const webGpuCode = `@compute @workgroup_size(256)
fn main(@builtin(global_id) id: vec3<u32>) {
    let i = id.x;
    // Parallel approach (PyTorch-like)
    if (i < arrayLength(&a)) {
        result[i] = a[i] * b[i] + 0.5;
    }
}`;

  const tabs = copy.tabs || [{ label: 'Demo' }, { label: 'Code' }];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar
        items={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        ariaLabel="Autograd and Benchmark views"
      />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
            {/* Autograd Graph */}
            <div style={{
              background: sw.void,
              borderRadius: '12px',
              padding: '16px',
              border: `1px solid ${sw.borderSubtle}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: sw.text }}>{copy.autogradTitle}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setStep('forward')}
                    style={{
                      padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
                      border: `1px solid ${step === 'forward' ? sw.cyan : sw.borderSubtle}`,
                      background: step === 'forward' ? `${sw.cyan}22` : 'transparent',
                      color: step === 'forward' ? sw.cyan : sw.textMuted,
                      cursor: 'pointer',
                    }}
                  >
                    {copy.forwardLabel}
                  </button>
                  <button
                    onClick={() => setStep('backward')}
                    style={{
                      padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
                      border: `1px solid ${step === 'backward' ? sw.pink : sw.borderSubtle}`,
                      background: step === 'backward' ? `${sw.pink}22` : 'transparent',
                      color: step === 'backward' ? sw.pink : sw.textMuted,
                      cursor: 'pointer',
                    }}
                  >
                    {copy.backwardLabel}
                  </button>
                </div>
              </div>

              <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: 'block' }}>
                {/* Edges */}
                {forwardEdges.map(([from, to], i) => {
                  const p1 = nodePositions[from];
                  const p2 = nodePositions[to];
                  if (!p1 || !p2) return null;
                  const isActive = step === 'forward' 
                    ? activeEdges.some(([a, b]) => a === from && b === to)
                    : activeEdges.some(([a, b]) => a === to && b === from);
                  
                  return (
                    <line
                      key={`f-${i}`}
                      x1={p1.x + 20} y1={p1.y + 8}
                      x2={p2.x + 20} y2={p2.y + 8}
                      stroke={isActive ? activeColor : sw.borderSubtle}
                      strokeWidth={isActive ? 2.5 : 1}
                      opacity={isActive ? 1 : 0.3}
                      style={{ transition: 'stroke 0.3s, opacity 0.3s, stroke-width 0.3s' }}
                    />
                  );
                })}

                {/* Nodes */}
                {layout.map(n => (
                  <g key={n.id}>
                    <rect
                      x={n.x} y={n.y} width={40} height={16} rx={4}
                      fill={sw.surface} stroke={sw.borderSubtle} strokeWidth={1}
                    />
                    <text
                      x={n.x + 20} y={n.y + 11} textAnchor="middle"
                      fontSize={9} fill={sw.text} fontFamily="monospace" fontWeight="600"
                    >
                      {n.id === 'relu' ? 'ReLU' : n.id}
                    </text>
                  </g>
                ))}
              </svg>

              <div style={{ fontSize: '11px', color: sw.textMuted, marginTop: '8px', textAlign: 'center', fontWeight: '500' }}>
                {step === 'forward' ? copy.dynamicGraphLabel : copy.staticGraphLabel}
              </div>
            </div>

            <RealBenchmarkVisual copy={copy} />
          </div>
        ) : (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: sw.pink, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {copy.pythonLikeTitle}
              </div>
              <CodeBlock code={pythonLikeCode} language="python" />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: sw.cyan, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {copy.webgpuShaderTitle}
              </div>
              <CodeBlock code={webGpuCode} language="rust" />
            </div>
          </div>
        )}
      </TabbedPanelSurface>
    </div>
  );
});
