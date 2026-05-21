import React, { useMemo, useState } from 'react';
import type { PytorchAnimatedCodeWalkthroughCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface AutogradCodeWalkthroughProps {
  copy: PytorchAnimatedCodeWalkthroughCopy;
}

interface GraphNode {
  id: string;
  label: string;
  value?: string;
  x: number;
  y: number;
}

const NODES: GraphNode[] = [
  { id: 'logits', label: 'logits', value: '[2.0, 0.5, -1.0]', x: 80, y: 140 },
  { id: 'softmax', label: 'softmax', value: '[0.785, 0.175, 0.039]', x: 240, y: 140 },
  { id: 'celoss', label: 'CE loss', value: '-ln(0.785)', x: 400, y: 140 },
  { id: 'backward', label: 'backward()', value: 'chain rule', x: 560, y: 140 },
  { id: 'grad', label: '.grad', value: '[-0.215, 0.175, 0.039]', x: 720, y: 140 },
];

// Brighter blue for better readability against the dark background
const forwardBlue = '#4fc3f7';


const EDGES: Array<{ from: number; to: number }> = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
];

const AutogradGraph: React.FC<{ activeStep: number; mode: 'forward' | 'backward' }> = ({ activeStep, mode }) => {
  const isForward = mode === 'forward';
  const arrowColor = isForward ? forwardBlue : sw.pink;

  const activeNodeIds = useMemo(() => {
    switch (activeStep) {
      case 0: return ['logits'];
      case 1: return ['logits', 'softmax', 'celoss'];
      case 2: return ['celoss', 'backward'];
      case 3: return ['backward', 'grad'];
      default: return [];
    }
  }, [activeStep]);

  return (
    <svg viewBox="0 0 820 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
          <polygon points="0 0, 12 4, 0 8" fill={arrowColor} />
        </marker>
        <style>{`
          @keyframes dash-forward { to { stroke-dashoffset: -20; } }
          @keyframes dash-backward { to { stroke-dashoffset: 20; } }
          .edge-line { stroke: ${arrowColor}; stroke-width: 2.5; stroke-dasharray: 8, 6; fill: none; marker-end: url(#arrowhead); }
          .edge-forward { animation: dash-forward 1.2s linear infinite; }
          .edge-backward { animation: dash-backward 1.2s linear infinite; }
        `}</style>
      </defs>

      {EDGES.map((edge, idx) => {
        const fromNode = NODES[edge.from];
        const toNode = NODES[edge.to];
        const isActive = activeNodeIds.includes(fromNode.id) && activeNodeIds.includes(toNode.id);
        return (
          <line
            key={idx}
            className={`edge-line ${isForward ? 'edge-forward' : 'edge-backward'}`}
            x1={fromNode.x + 44}
            y1={fromNode.y}
            x2={toNode.x - 50}
            y2={toNode.y}
            style={{ opacity: isActive ? 1 : 0.3 }}
          />
        );
      })}

      {NODES.map((node) => {
        const isActive = activeNodeIds.includes(node.id);
        const fillColor = isActive
          ? node.id === 'grad' || (node.id === 'backward' && !isForward)
            ? sw.pink
            : forwardBlue
          : sw.void;
        const strokeColor = isActive ? fillColor : sw.borderSubtle;
        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={42} fill={fillColor} stroke={strokeColor} strokeWidth={2.5} style={{ opacity: isActive ? 1 : 0.4 }} />
            <text x={node.x} y={node.y - 5} textAnchor="middle" fill={sw.text} fontSize={14} fontWeight={700} fontFamily={sw.fontMono}>
              {node.label}
            </text>
            {isActive && node.value && (
              <text x={node.x} y={node.y + 16} textAnchor="middle" fill={sw.text} fontSize={11} fontFamily={sw.fontMono}>
                {node.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const AutogradCodeWalkthrough: React.FC<AutogradCodeWalkthroughProps> = ({ copy }) => {
  const [activeStep, setActiveStep] = useState(0);
  const walkthroughPanel = copy.walkthroughPanel;
  const steps = walkthroughPanel.steps;
  const step = steps[activeStep] ?? steps[0];

  const mode: 'forward' | 'backward' = activeStep <= 1 ? 'forward' : 'backward';
  const accentColor = mode === 'forward' ? sw.cyan : sw.pink;

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{walkthroughPanel.title}</div>
            {walkthroughPanel.subtitle && (
              <div style={{ marginTop: 2, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{walkthroughPanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 8 }}>
            {steps.map((s, idx) => {
              const isActive = idx === activeStep;
              const color = idx <= 1 ? sw.cyan : sw.pink;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    padding: '10px 8px',
                    borderRadius: 10,
                    border: `1.5px solid ${isActive ? color : sw.borderSubtle}`,
                    background: isActive ? `${color}22` : 'transparent',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: sw.fontMono,
                    color: isActive ? color : sw.textDim,
                  }}
                >
                  <span style={{ fontSize: 10, opacity: 0.7 }}>{String(idx + 1).padStart(2, '0')}</span>
                  {s.label}
                </button>
              );
            })}
          </div>

          <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: sw.surface, padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: `1px solid ${sw.cyan}`, color: sw.cyan, background: `${sw.cyan}15`, fontFamily: sw.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                forward
              </span>
              <span style={{ fontSize: 11, color: sw.textMuted }}>autograd trace</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: `1px solid ${sw.pink}`, color: sw.pink, background: `${sw.pink}15`, fontFamily: sw.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                backward
              </span>
            </div>
            <AutogradGraph activeStep={activeStep} mode={mode} />
          </div>

          <div style={{ border: `1.5px solid ${accentColor}44`, borderRadius: 14, padding: 16, background: `linear-gradient(180deg, ${accentColor}10, transparent)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', fontFamily: sw.fontMono, textTransform: 'uppercase', color: accentColor, marginBottom: 2 }}>
                  Step {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: sw.text }}>{step.label}</div>
              </div>
              {step.shape && (
                <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 8, border: `1px solid ${accentColor}55`, background: `${accentColor}18`, fontFamily: sw.fontMono, whiteSpace: 'nowrap', color: accentColor }}>
                  {step.shape}
                </div>
              )}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: sw.text, margin: '8px 0 0' }}>{step.body}</p>
            {step.risk && (
              <div style={{ fontSize: 13, lineHeight: 1.55, color: sw.textDim, marginTop: 12, padding: '10px 12px', borderRadius: 8, background: `${sw.pink}0c`, border: `1px solid ${sw.pink}25` }}>
                {step.risk}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink, marginBottom: 8 }}>
                {walkthroughPanel.failureTitle}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {walkthroughPanel.failureModes.map((f, idx) => (
                  <li key={idx} style={{ fontSize: 13, lineHeight: 1.5, color: sw.text, paddingLeft: 12 }}>
                    <strong style={{ color: sw.text }}>{f.label}:</strong>{' '}
                    <span style={{ color: sw.textDim }}>{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: `1px solid ${sw.cyan}33`, borderRadius: 12, background: `${sw.cyan}08`, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.cyan, marginBottom: 8 }}>
                {walkthroughPanel.mentalModelTitle}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {walkthroughPanel.mentalModel.map((m, idx) => (
                  <li key={idx} style={{ fontSize: 13, lineHeight: 1.5, color: sw.text, paddingLeft: 12 }}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {walkthroughPanel.footer && (
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textMuted, fontStyle: 'italic', borderTop: `1px solid ${sw.borderSubtle}`, paddingTop: 12 }}>
              {walkthroughPanel.footer}
            </div>
          )}
        </div>
      }
    />
  );
};

export default AutogradCodeWalkthrough;
