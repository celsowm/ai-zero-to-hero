import React, { useState } from 'react';
import type { PyTorchPerformanceVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { RealBenchmarkVisual } from './RealBenchmarkVisual';

export const PyTorchAutogradVisual = React.memo(({ copy }: { copy: PyTorchPerformanceVisualCopy }) => {
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
  const svgH = 260;
  const colX = [60, 220]; // left, right columns

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{
        background: sw.surface,
        borderRadius: '12px',
        padding: '12px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: sw.text }}>{copy.autogradTitle}</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setStep('forward')}
              style={{
                padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '700',
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
                padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '700',
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
                x1={p1.x + 18} y1={p1.y + 8}
                x2={p2.x + 18} y2={p2.y + 8}
                stroke={isActive ? activeColor : sw.borderSubtle}
                strokeWidth={isActive ? 2 : 1}
                opacity={isActive ? 0.8 : 0.3}
                style={{ transition: 'stroke 0.3s, opacity 0.3s' }}
              />
            );
          })}

          {/* Nodes */}
          {layout.map(n => (
            <g key={n.id}>
              <rect
                x={n.x} y={n.y} width={40} height={16} rx={4}
                fill={sw.void} stroke={sw.borderSubtle} strokeWidth={1}
              />
              <text
                x={n.x + 20} y={n.y + 11} textAnchor="middle"
                fontSize={8} fill={sw.text} fontFamily="monospace"
              >
                {n.id === 'relu' ? 'ReLU' : n.id}
              </text>
            </g>
          ))}
        </svg>

        <div style={{ fontSize: '9px', color: sw.textMuted, marginTop: '6px', textAlign: 'center' }}>
          {step === 'forward' ? copy.dynamicGraphLabel : copy.staticGraphLabel}
        </div>
      </div>

      <RealBenchmarkVisual copy={copy} />
    </div>
  );
});
