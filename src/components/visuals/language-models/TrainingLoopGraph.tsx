import React, { useState } from 'react';
import type { TrainingLoopGraphCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';
import { PytorchGenerationStepper } from './PytorchGenerationStepper';

interface TrainingLoopGraphProps {
  copy: TrainingLoopGraphCopy;
}

const NODE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b', sw.text];

export const TrainingLoopGraph = React.memo(({ copy }: TrainingLoopGraphProps) => {
  const [step, setStep] = useState(0);
  const { nodes, edges } = copy.graphPanel;
  const activeNode = nodes[step] ?? nodes[0];
  const accent = NODE_COLORS[step % NODE_COLORS.length];
  const progress = nodes.length > 1 ? (step + 1) / nodes.length : 1;

  const nodePos = (idx: number) => {
    const xStart = 60;
    const xGap = 130;
    return {
      cx: xStart + idx * xGap,
      cy: 80,
      w: 110,
      h: 56,
    };
  };

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      codeTabFooter={copy.generation ? <PytorchGenerationStepper copy={copy.generation} /> : undefined}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.graphPanel.title}</div>
            {copy.graphPanel.subtitle && (
              <div style={{ marginTop: 2, fontSize: 12, lineHeight: 1.5, color: sw.textDim }}>{copy.graphPanel.subtitle}</div>
            )}
          </div>

          <svg viewBox="0 0 800 240" style={{ width: '100%', height: 240, display: 'block' }}>
            <defs>
              <marker id="tlArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M 0 0 L 7 3.5 L 0 7 Z" fill={sw.textMuted} />
              </marker>
              <marker id="tlArrowActive" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M 0 0 L 7 3.5 L 0 7 Z" fill={accent} />
              </marker>
              <marker id="tlLoopArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M 0 0 L 7 3.5 L 0 7 Z" fill={sw.pink} />
              </marker>
            </defs>

            {edges.map((edge, i) => {
              const fromIdx = nodes.findIndex(n => n.id === edge.from);
              const toIdx = nodes.findIndex(n => n.id === edge.to);
              if (fromIdx < 0 || toIdx < 0) return null;
              const from = nodePos(fromIdx);
              const to = nodePos(toIdx);
              const isLoop = fromIdx > toIdx;
              const isActive = fromIdx <= step && toIdx <= step;

              if (isLoop) {
                const loopFromY = from.cy + from.h / 2 + 2;
                const loopToY = to.cy + to.h / 2 + 2;
                const loopMidY = 210;
                const pathD = `M ${from.cx + from.w / 2 - 8} ${loopFromY} ` +
                  `L ${from.cx + from.w / 2 - 8} ${loopMidY} ` +
                  `L ${to.cx - to.w / 2 + 8} ${loopMidY} ` +
                  `L ${to.cx - to.w / 2 + 8} ${loopToY}`;
                const loopMidX = (from.cx + to.cx) / 2;
                return (
                  <g key={`edge-${i}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={sw.pink}
                      strokeWidth={1.8}
                      strokeDasharray="5,3"
                      markerEnd="url(#tlLoopArrow)"
                    />
                    <text
                      x={loopMidX}
                      y={loopMidY - 4}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="800"
                      fill={sw.pink}
                    >
                      {copy.graphPanel.loopLabel}
                    </text>
                  </g>
                );
              }

              const x1 = from.cx + from.w / 2;
              const x2 = to.cx - to.w / 2;
              return (
                <line
                  key={`edge-${i}`}
                  x1={x1} y1={from.cy}
                  x2={x2} y2={to.cy}
                  stroke={isActive ? accent : sw.textMuted}
                  strokeWidth={isActive ? 1.8 : 1.2}
                  markerEnd={isActive ? 'url(#tlArrowActive)' : 'url(#tlArrow)'}
                />
              );
            })}

            {nodes.map((node, idx) => {
              const { cx, cy, w, h } = nodePos(idx);
              const nodeColor = NODE_COLORS[idx % NODE_COLORS.length];
              const isActive = idx === step;
              const isDone = idx < step;
              const fill = isActive
                ? `${nodeColor}30`
                : isDone
                ? `${nodeColor}18`
                : sw.surface;
              const stroke = isActive ? nodeColor : isDone ? `${nodeColor}88` : sw.borderSubtle;
              return (
                <g
                  key={node.id}
                  onClick={() => setStep(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={cx - w / 2} y={cy - h / 2}
                    rx={8} ry={8}
                    width={w} height={h}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isActive ? 2 : 1.2}
                  />
                  <text
                    x={cx} y={cy - 4}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill={isActive ? nodeColor : isDone ? nodeColor : sw.text}
                  >
                    {idx + 1}. {node.label.length > 16 ? node.label.slice(0, 15) + '…' : node.label}
                  </text>
                  {node.shape && (
                    <text
                      x={cx} y={cy + 14}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="monospace"
                      fill={sw.textDim}
                    >
                      {node.shape}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 10,
                border: `1px solid ${sw.borderSubtle}`,
                background: step === 0 ? 'rgba(255,255,255,0.025)' : sw.surface,
                color: step === 0 ? sw.textMuted : sw.text,
                cursor: step === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {copy.graphPanel.prevLabel}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 999, background: sw.surfaceLight, overflow: 'hidden' }}>
                <div style={{ width: `${Math.max(5, progress * 100)}%`, height: '100%', background: `linear-gradient(90deg, ${sw.cyan}, ${sw.pink})`, transition: 'width 220ms ease' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, fontFamily: sw.fontMono, color: accent, whiteSpace: 'nowrap' }}>
                {copy.graphPanel.stepLabel} {String(step + 1).padStart(2, '0')} / {String(nodes.length).padStart(2, '0')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(s => Math.min(nodes.length - 1, s + 1))}
              disabled={step >= nodes.length - 1}
              style={{
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 10,
                border: `1px solid ${step >= nodes.length - 1 ? sw.borderSubtle : `${accent}55`}`,
                background: step >= nodes.length - 1 ? 'rgba(255,255,255,0.025)' : `linear-gradient(135deg, ${accent}20, rgba(255,255,255,0.04))`,
                color: step >= nodes.length - 1 ? sw.textMuted : sw.text,
                cursor: step >= nodes.length - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              {copy.graphPanel.nextLabel}
            </button>
          </div>

          <div
            style={{
              border: `1px solid ${accent}33`,
              borderRadius: 14,
              background: `linear-gradient(180deg, ${accent}10, rgba(255,255,255,0.01))`,
              padding: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {copy.graphPanel.title}
                </div>
                <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700, color: sw.text }}>
                  {activeNode.label}
                </div>
              </div>
              <div style={{
                padding: '4px 10px',
                borderRadius: 8,
                border: `1px solid ${accent}44`,
                background: `${accent}14`,
                fontFamily: sw.fontMono,
                fontSize: 11,
                fontWeight: 700,
                color: accent,
              }}>
                L{activeNode.lineRange[0]}{activeNode.lineRange[0] !== activeNode.lineRange[1] ? `–L${activeNode.lineRange[1]}` : ''}
              </div>
            </div>

            {activeNode.shape && (
              <div style={{
                marginTop: 10,
                padding: '6px 10px',
                borderRadius: 8,
                border: `1px solid ${accent}33`,
                background: `${accent}10`,
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 700,
                color: accent,
                display: 'inline-block',
              }}>
                {activeNode.shape}
              </div>
            )}

            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: sw.text }}>
              {activeNode.body}
            </div>

            <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
              <strong style={{ color: sw.pink }}>Risco:</strong> {activeNode.risk}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: sw.surface, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.purple }}>
                {copy.graphPanel.bridgeTitle}
              </div>
              <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.6, color: sw.text }}>
                {copy.graphPanel.bridgeBody}
              </div>
            </div>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
                {copy.graphPanel.failureTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.graphPanel.failureModes.map(item => (
                  <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 10, alignItems: 'start' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {copy.graphPanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.graphPanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
