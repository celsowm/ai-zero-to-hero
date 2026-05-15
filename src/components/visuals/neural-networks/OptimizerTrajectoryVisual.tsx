import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { OptimizerTrajectoryVisualCopy } from '../../../types/slide/neural-networks';
import { sw } from '../../../theme/tokens';

// ── Types ──────────────────────────────────────────────────────────────────────

type OptimizerType = 'sgd' | 'momentum' | 'adam';

interface Point {
  x: number;
  y: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const VIEW_W = 400;
const VIEW_H = 300;
const OFFSET_X = VIEW_W / 2;
const OFFSET_Y = VIEW_H / 2;
const SCALE = 60; // scale from math units to pixels

// Loss function: f(x, y) = 0.1 * x^2 + 2 * y^2 (a shallow ravine)
const lossFn = (x: number, y: number) => 0.1 * x * x + 2 * y * y;
const gradFn = (x: number, y: number) => ({
  dx: 0.2 * x,
  dy: 4 * y
});

// Initial point for simulation
const INITIAL_X = -2.5;
const INITIAL_Y = 2.0;

// ── Optimizer Logic ────────────────────────────────────────────────────────────

function getNextPoint(
  type: OptimizerType,
  current: Point,
  state: {
    v: Point; // velocity for momentum
    m: Point; // first moment for adam
    s: Point; // second moment for adam
    t: number; // timestep for adam
  },
  params: {
    lr: number;
    beta1: number;
    beta2: number;
    epsilon: number;
  }
) {
  const { dx, dy } = gradFn(current.x, current.y);
  let nextX = current.x;
  let nextY = current.y;

  const newState = { ...state };

  if (type === 'sgd') {
    nextX = current.x - params.lr * dx;
    nextY = current.y - params.lr * dy;
  } else if (type === 'momentum') {
    newState.v.x = params.beta1 * state.v.x + dx;
    newState.v.y = params.beta1 * state.v.y + dy;
    nextX = current.x - params.lr * newState.v.x;
    nextY = current.y - params.lr * newState.v.y;
  } else if (type === 'adam') {
    newState.t += 1;
    // Update biased first moment estimate
    newState.m.x = params.beta1 * state.m.x + (1 - params.beta1) * dx;
    newState.m.y = params.beta1 * state.m.y + (1 - params.beta1) * dy;
    // Update biased second raw moment estimate
    newState.s.x = params.beta2 * state.s.x + (1 - params.beta2) * dx * dx;
    newState.s.y = params.beta2 * state.s.y + (1 - params.beta2) * dy * dy;
    
    // Compute bias-corrected first moment estimate
    const mHatX = newState.m.x / (1 - Math.pow(params.beta1, newState.t));
    const mHatY = newState.m.y / (1 - Math.pow(params.beta1, newState.t));
    // Compute bias-corrected second raw moment estimate
    const sHatX = newState.s.x / (1 - Math.pow(params.beta2, newState.t));
    const sHatY = newState.s.y / (1 - Math.pow(params.beta2, newState.t));
    
    // Update parameters
    nextX = current.x - (params.lr * mHatX) / (Math.sqrt(sHatX) + params.epsilon);
    nextY = current.y - (params.lr * mHatY) / (Math.sqrt(sHatY) + params.epsilon);
  }

  return { next: { x: nextX, y: nextY }, state: newState };
}

// ── Components ─────────────────────────────────────────────────────────────────

export const OptimizerTrajectoryVisual: React.FC<{ copy: OptimizerTrajectoryVisualCopy }> = ({ copy }) => {
  const [optimizer, setOptimizer] = useState<OptimizerType>('sgd');
  const [isRunning, setIsRunning] = useState(false);
  const [trajectory, setTrajectory] = useState<Point[]>([{ x: INITIAL_X, y: INITIAL_Y }]);
  const [currentLoss, setCurrentLoss] = useState(lossFn(INITIAL_X, INITIAL_Y));

  const stateRef = useRef({
    v: { x: 0, y: 0 },
    m: { x: 0, y: 0 },
    s: { x: 0, y: 0 },
    t: 0
  });

  const timerRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTrajectory([{ x: INITIAL_X, y: INITIAL_Y }]);
    setCurrentLoss(lossFn(INITIAL_X, INITIAL_Y));
    stateRef.current = {
      v: { x: 0, y: 0 },
      m: { x: 0, y: 0 },
      s: { x: 0, y: 0 },
      t: 0
    };
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
  }, []);

  const step = useCallback(() => {
    setTrajectory(prev => {
      const current = prev[prev.length - 1];
      // Hyperparameters tuned for visual clarity in this specific landscape
      const params = {
        lr: optimizer === 'adam' ? 0.1 : (optimizer === 'momentum' ? 0.05 : 0.1),
        beta1: 0.9,
        beta2: 0.999,
        epsilon: 1e-8
      };

      const { next, state } = getNextPoint(optimizer, current, stateRef.current, params);
      stateRef.current = state;
      
      const newLoss = lossFn(next.x, next.y);
      setCurrentLoss(newLoss);

      // Stop if converged or out of bounds
      if (prev.length > 200 || Math.abs(next.x) > 5 || Math.abs(next.y) > 5) {
        setIsRunning(false);
        return prev;
      }

      return [...prev, next];
    });
  }, [optimizer]);

  useEffect(() => {
    if (isRunning) {
      const loop = () => {
        step();
        timerRef.current = requestAnimationFrame(loop);
      };
      timerRef.current = requestAnimationFrame(loop);
    } else {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    }
    return () => { if (timerRef.current) cancelAnimationFrame(timerRef.current); };
  }, [isRunning, step]);

  // Generate contour lines
  const contours = useMemo(() => {
    const lines = [];
    const levels = [0.2, 0.5, 1, 2, 4, 7];
    for (const l of levels) {
      // f(x,y) = 0.1x^2 + 2y^2 = l => Ellipse equation: x^2 / (l/0.1) + y^2 / (l/2) = 1
      const rx = Math.sqrt(l / 0.1) * SCALE;
      const ry = Math.sqrt(l / 2) * SCALE;
      lines.push({ rx, ry });
    }
    return lines;
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: sw.surface,
      borderRadius: '16px',
      border: `1px solid ${sw.borderSubtle}`,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${sw.borderSubtle}` }}>
        <h4 style={{ margin: 0, color: sw.text, fontSize: '14px', fontWeight: 700 }}>{copy.title}</h4>
        <p style={{ margin: '4px 0 0 0', color: sw.textMuted, fontSize: '12px' }}>{copy.description}</p>
      </div>

      {/* Simulation Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
        <svg width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} style={{ display: 'block' }}>
          {/* Grid lines (optional, kept simple) */}
          <line x1={0} y1={OFFSET_Y} x2={VIEW_W} y2={OFFSET_Y} stroke={sw.borderSubtle} strokeWidth={1} strokeDasharray="4 4" />
          <line x1={OFFSET_X} y1={0} x2={OFFSET_X} y2={VIEW_H} stroke={sw.borderSubtle} strokeWidth={1} strokeDasharray="4 4" />

          {/* Contours */}
          {contours.map((c, i) => (
            <ellipse
              key={i}
              cx={OFFSET_X}
              cy={OFFSET_Y}
              rx={c.rx}
              ry={c.ry}
              fill="none"
              stroke={sw.borderSubtle}
              strokeWidth={1}
              opacity={0.5}
            />
          ))}

          {/* Trajectory */}
          <polyline
            points={trajectory.map(p => `${OFFSET_X + p.x * SCALE},${OFFSET_Y - p.y * SCALE}`).join(' ')}
            fill="none"
            stroke={optimizer === 'adam' ? sw.cyan : (optimizer === 'momentum' ? sw.pink : sw.textMuted)}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current Position Dot */}
          {trajectory.length > 0 && (
            <circle
              cx={OFFSET_X + trajectory[trajectory.length - 1].x * SCALE}
              cy={OFFSET_Y - trajectory[trajectory.length - 1].y * SCALE}
              r={5}
              fill={optimizer === 'adam' ? sw.cyan : (optimizer === 'momentum' ? sw.pink : sw.text)}
              style={{ filter: `drop-shadow(0 0 8px ${optimizer === 'adam' ? sw.cyan : (optimizer === 'momentum' ? sw.pink : sw.text)})` }}
            />
          )}

          {/* Labels for Axis (simple) */}
          <text x={VIEW_W - 20} y={OFFSET_Y - 5} fill={sw.textMuted} fontSize="10" textAnchor="end">w1</text>
          <text x={OFFSET_X + 5} y={20} fill={sw.textMuted} fontSize="10">w2</text>
        </svg>

        {/* Metrics Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          padding: '8px 12px',
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          pointerEvents: 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <span style={{ fontSize: '10px', color: sw.textMuted }}>{copy.lossLabel}</span>
            <span style={{ fontSize: '10px', color: sw.cyan, fontFamily: 'monospace', fontWeight: 700 }}>{currentLoss.toFixed(4)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <span style={{ fontSize: '10px', color: sw.textMuted }}>{copy.iterationLabel}</span>
            <span style={{ fontSize: '10px', color: sw.text, fontFamily: 'monospace' }}>{trajectory.length - 1}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '16px', background: sw.surfaceLight, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['sgd', 'momentum', 'adam'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setOptimizer(opt);
                reset();
              }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: `1px solid ${optimizer === opt ? (opt === 'adam' ? sw.cyan : (opt === 'momentum' ? sw.pink : sw.text)) : sw.borderSubtle}`,
                background: optimizer === opt ? (opt === 'adam' ? `${sw.cyan}15` : (opt === 'momentum' ? `${sw.pink}15` : `${sw.text}15`)) : 'transparent',
                color: optimizer === opt ? (opt === 'adam' ? sw.cyan : (opt === 'momentum' ? sw.pink : sw.text)) : sw.textMuted,
                transition: 'all 0.2s',
              }}
            >
              {copy[`${opt}Label` as keyof OptimizerTrajectoryVisualCopy] as string}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: isRunning ? sw.pink : sw.cyan,
              color: '#000',
              boxShadow: `0 4px 12px ${isRunning ? sw.pink : sw.cyan}44`,
            }}
          >
            {isRunning ? 'Pause' : copy.startLabel}
          </button>
          <button
            onClick={reset}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: `1px solid ${sw.borderSubtle}`,
              background: 'transparent',
              color: sw.text,
            }}
          >
            {copy.resetLabel}
          </button>
          
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: sw.cyan, fontWeight: 700, textTransform: 'uppercase' }}>{copy.insightTitle}</div>
            <div style={{ fontSize: '11px', color: sw.text, maxWidth: '200px', lineHeight: '1.3' }}>
              {copy.insights[optimizer]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
