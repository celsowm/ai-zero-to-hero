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
  const svgW = 320;
  const svgH = 240; 
  const colX = [60, 260]; 

  const layout = [
    { id: 'input', x: colX[0], y: 15 },
    { id: 'w1', x: colX[0], y: 55 },
    { id: 'matmul1', x: colX[1], y: 40 },
    { id: 'relu', x: colX[0], y: 100 },
    { id: 'w2', x: colX[0], y: 145 },
    { id: 'matmul2', x: colX[1], y: 125 },
    { id: 'output', x: colX[0], y: 190 },
    { id: 'loss', x: colX[1], y: 190 },
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px' }}>
            {/* Autograd Graph */}
            <div style={{
              background: sw.void,
              borderRadius: '12px',
              padding: '16px',
              border: `1px solid ${sw.borderSubtle}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: sw.text }}>{copy.autogradTitle}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setStep('forward')}
                    style={{
                      padding: '5px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '700',
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
                      padding: '5px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '700',
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
                      x1={p1.x + 20} y1={p1.y + 10}
                      x2={p2.x + 20} y2={p2.y + 10}
                      stroke={isActive ? activeColor : sw.borderSubtle}
                      strokeWidth={isActive ? 3 : 1.2}
                      opacity={isActive ? 1 : 0.3}
                      style={{ transition: 'stroke 0.3s, opacity 0.3s, stroke-width 0.3s' }}
                    />
                  );
                })}

                {/* Nodes */}
                {layout.map(n => (
                  <g key={n.id}>
                    <rect
                      x={n.x} y={n.y} width={45} height={20} rx={4}
                      fill={sw.surface} stroke={sw.borderSubtle} strokeWidth={1.5}
                    />
                    <text
                      x={n.x + 22.5} y={n.y + 14} textAnchor="middle"
                      fontSize={11} fill={sw.text} fontFamily="monospace" fontWeight="700"
                    >
                      {n.id === 'relu' ? 'ReLU' : n.id}
                    </text>
                  </g>
                ))}
              </svg>

              <div style={{ fontSize: '12px', color: sw.textMuted, marginTop: '12px', textAlign: 'center', fontWeight: '600' }}>
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
