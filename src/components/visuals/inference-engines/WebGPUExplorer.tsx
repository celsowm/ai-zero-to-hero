import React, { useMemo, useState } from 'react';
import type { WebGPUExplorerCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: WebGPUExplorerCopy;
}

type Backend = 'wasm' | 'webgpu';
type ModelSize = 'small' | 'medium' | 'large';
type StepKey = 'js' | 'copy' | 'compute' | 'readback';

const STEP_KEYS: StepKey[] = ['js', 'copy', 'compute', 'readback'];
const STEP_COLORS: Record<StepKey, string> = { js: '#93a4bb', copy: '#16e0ff', compute: '#a855f7', readback: '#ff5da2' };
const MODEL_SIZES: ModelSize[] = ['small', 'medium', 'large'];
const MODEL_SIZES_MB: Record<ModelSize, number> = { small: 50, medium: 200, large: 500 };
const MODEL_SIZES_VRAM: Record<ModelSize, number> = { small: 120, medium: 480, large: 1200 };
const MODEL_SIZES_WASM_SPEED: Record<ModelSize, number> = { small: 18, medium: 8, large: 3 };
const MODEL_SIZES_WEBGPU_SPEED: Record<ModelSize, number> = { small: 55, medium: 28, large: 12 };
const TASKS = ['text-gen', 'sentiment', 'embeddings'];
const TASK_COLORS: Record<string, string> = { 'text-gen': '#06b6d4', sentiment: '#a855f7', embeddings: '#f59e0b' };
const SVG_W = 620;
const SVG_H = 260;
const PAD = { top: 24, right: 20, bottom: 44, left: 50 };

function xC(idx: number, total: number, barW: number) { const chartW = SVG_W - PAD.left - PAD.right; const groupW = chartW / total; return PAD.left + idx * groupW + (groupW - barW * 2 - 4) / 2; }
function yC(v: number, max: number) { const h = SVG_H - PAD.top - PAD.bottom; return SVG_H - PAD.bottom - (v / max) * h; }

const SPEED_DATA: Record<Backend, Record<string, number>> = {
  wasm: { 'text-gen': 8, sentiment: 14, embeddings: 10 },
  webgpu: { 'text-gen': 42, sentiment: 58, embeddings: 35 },
};

export const WebGPUExplorer = React.memo(({ copy }: Props) => {
  const [backend, setBackend] = useState<Backend>('webgpu');
  const [modelSize, setModelSize] = useState<ModelSize>('medium');
  const [activeStep, setActiveStep] = useState<StepKey>('js');

  const maxSpeed = Math.max(...Object.values(SPEED_DATA.wasm), ...Object.values(SPEED_DATA.webgpu));

  const speedMs = MODEL_SIZES_WEBGPU_SPEED[modelSize];
  const vramUsed = MODEL_SIZES_VRAM[modelSize];
  const inferenceTime = Math.round((1000 / speedMs) * 10) / 10;

  const stepValues: Record<StepKey, string> = {
    js: 'JS call',
    copy: `${MODEL_SIZES_MB[modelSize]}MB`,
    compute: 'Shader',
    readback: `${inferenceTime}ms`,
  };

  // Memory flow stage highlight
  const memoryStage = useMemo(() => {
    switch (activeStep) {
      case 'js': return 0;
      case 'copy': return 1;
      case 'compute': return 2;
      case 'readback': return 3;
    }
  }, [activeStep]);

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Backend Toggle ───────────────────────────────────────── */}
        <PanelCard
          padding={14}
          gap={12}
          style={{ background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}` }}
        >
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
            {copy.backendLabel}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['wasm', 'webgpu'] as Backend[]).map((b) => (
              <button
                key={b}
                onClick={() => setBackend(b)}
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: 10,
                  border: backend === b ? `2px solid ${b === 'wasm' ? '#93a4bb' : '#16e0ff'}` : `1px solid ${sw.borderSubtle}`,
                  background: backend === b ? (b === 'wasm' ? 'rgba(147,164,187,0.12)' : 'rgba(22,224,255,0.12)') : sw.tint,
                  color: backend === b ? (b === 'wasm' ? '#93a4bb' : '#16e0ff') : sw.textMuted,
                  cursor: 'pointer', fontSize: 13,
                  fontWeight: backend === b ? 900 : 600, fontFamily: 'monospace', transition: sw.transitionFast,
                }}
              >
                {b === 'wasm' ? copy.wasmLabel : copy.webgpuLabel}
              </button>
            ))}
          </div>
        </PanelCard>

        {/* ── Controls: Speed + Model Size ────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 12 }}>

          {/* Speed Comparison Bar Chart */}
          <PanelCard
            padding={0}
            style={{
              overflow: 'hidden',
              background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint}), radial-gradient(circle at 50% 16%, rgba(22,224,255,0.08), transparent 56%)`,
            }}
          >
            <div style={{ padding: '12px 16px 0' }}>
              <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.speedTitle}
              </span>
              <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{copy.speedSubtitle}</div>
            </div>

            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              {/* Grid */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => (
                <g key={`y-${tick}`}>
                  <line
                    x1={PAD.left} x2={SVG_W - PAD.right}
                    y1={yC(tick * maxSpeed, maxSpeed)} y2={yC(tick * maxSpeed, maxSpeed)}
                    stroke={tick === 0.5 ? sw.tintActive : sw.gridLine}
                    strokeDasharray={tick === 0.5 ? '6 6' : '3 5'}
                  />
                  <text
                    x={PAD.left - 8}
                    y={yC(tick * maxSpeed, maxSpeed) + 4}
                    fill="rgba(255,255,255,0.4)"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {Math.round(tick * maxSpeed)}
                  </text>
                </g>
              ))}

              {/* Bars per task */}
              {TASKS.map((task, ti) => {
                const barW = 28;
                const xWasm = xC(ti, TASKS.length, barW);
                const xWebgpu = xWasm + barW + 4;
                const wasmVal = SPEED_DATA.wasm[task];
                const webgpuVal = SPEED_DATA.webgpu[task];

                return (
                  <g key={task}>
                    {/* WASM bar */}
                    <rect
                      x={xWasm} y={yC(wasmVal, maxSpeed)}
                      width={barW} height={SVG_H - PAD.bottom - yC(wasmVal, maxSpeed)}
                      fill="rgba(147,164,187,0.25)"
                      rx={4}
                      style={{ transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                    <text
                      x={xWasm + barW / 2} y={yC(wasmVal, maxSpeed) - 6}
                      fill="#93a4bb" fontSize="9" fontWeight={700}
                      textAnchor="middle" fontFamily="monospace"
                    >
                      {wasmVal}
                    </text>

                    {/* WebGPU bar */}
                    <rect
                      x={xWebgpu} y={yC(webgpuVal, maxSpeed)}
                      width={barW} height={SVG_H - PAD.bottom - yC(webgpuVal, maxSpeed)}
                      fill={TASK_COLORS[task]}
                      rx={4}
                      style={{
                        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: backend === 'webgpu' ? `drop-shadow(0 0 6px ${TASK_COLORS[task]}60)` : 'none',
                        opacity: backend === 'webgpu' ? 1 : 0.45,
                      }}
                    />
                    <text
                      x={xWebgpu + barW / 2} y={yC(webgpuVal, maxSpeed) - 6}
                      fill={TASK_COLORS[task]} fontSize="9" fontWeight={900}
                      textAnchor="middle" fontFamily="monospace"
                    >
                      {webgpuVal}
                    </text>

                    {/* Label */}
                    <text
                      x={(xWasm + xWebgpu + barW) / 2} y={SVG_H - 10}
                      fill="var(--sw-text-dim)" fontSize="9" fontWeight={600}
                      textAnchor="middle"
                    >
                      {task}
                    </text>
                  </g>
                );
              })}

              {/* Y-axis label */}
              <text
                x={14} y={SVG_H / 2}
                fill="rgba(255,255,255,0.35)" fontSize="8"
                textAnchor="middle"
                transform={`rotate(-90, 14, ${SVG_H / 2})`}
              >
                tok/s
              </text>

              {/* Legend */}
              <g transform={`translate(${SVG_W - 130}, 10)`}>
                <rect x={0} y={0} width={10} height={10} fill="rgba(147,164,187,0.35)" rx={2} />
                <text x={16} y={9} fill="#93a4bb" fontSize="8" fontFamily="monospace">{copy.wasmLabel}</text>
                <rect x={0} y={16} width={10} height={10} fill="#16e0ff" rx={2} opacity="0.7" />
                <text x={16} y={25} fill="#16e0ff" fontSize="8" fontFamily="monospace">{copy.webgpuLabel}</text>
              </g>
            </svg>
          </PanelCard>

          {/* Model Size Selector */}
          <PanelCard
            padding={14}
            gap={10}
            style={{ background: sw.tintStrong }}
          >
            <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.modelSizeTitle}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {MODEL_SIZES.map((size) => {
                const isSelected = modelSize === size;
                const mb = MODEL_SIZES_MB[size];
                const speed = backend === 'webgpu' ? MODEL_SIZES_WEBGPU_SPEED[size] : MODEL_SIZES_WASM_SPEED[size];
                return (
                  <button
                    key={size}
                    onClick={() => setModelSize(size)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: isSelected ? `2px solid #a855f7` : `1px solid ${sw.borderSubtle}`,
                      background: isSelected ? 'rgba(168,85,247,0.12)' : sw.tint,
                      color: isSelected ? '#a855f7' : sw.textMuted,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: isSelected ? 900 : 600,
                      fontFamily: 'monospace',
                      transition: sw.transitionFast,
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{size}</span>
                    <span style={{ fontSize: 11 }}>{mb}MB / {speed} tok/s</span>
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', lineHeight: 1.5, marginTop: 4 }}>
              {copy.modelSizeSubtitle}
            </div>
          </PanelCard>
        </div>

        {/* ── Memory Flow Visualizer ──────────────────────────────── */}
        <PanelCard
          padding={0}
          style={{
            overflow: 'hidden',
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ padding: '12px 16px 0' }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.memoryTitle}
            </span>
            <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{copy.memorySubtitle}</div>
          </div>

          <svg viewBox="0 0 700 140" width="100%" style={{ display: 'block', padding: '8px 0' }}>
            <defs>
              <filter id="webgpu-flow-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="arrow-cyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#16e0ff" />
              </marker>
              <marker id="arrow-purple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
              </marker>
              <marker id="arrow-pink" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#ff5da2" />
              </marker>
            </defs>

            {/* Stage 0: CPU RAM */}
            <rect
              x={10} y={20} width={120} height={100} rx={12}
              fill={memoryStage === 0 ? 'rgba(147,164,187,0.12)' : 'rgba(255,255,255,0.02)'}
              stroke={memoryStage === 0 ? '#93a4bb' : sw.borderSubtle}
              strokeWidth={memoryStage === 0 ? 2 : 1}
              style={{ transition: sw.transitionFast }}
            />
            <text x={70} y={50} fill={memoryStage === 0 ? '#93a4bb' : 'var(--sw-text-dim)'} fontSize="9" fontWeight={memoryStage === 0 ? 900 : 600} textAnchor="middle" fontFamily="monospace">
              {copy.inputLabel}
            </text>
            <text x={70} y={72} fill="var(--sw-text-dim)" fontSize="8" textAnchor="middle">{copy.tokUnit}</text>
            <text x={70} y={100} fill={memoryStage === 0 ? '#93a4bb' : 'rgba(255,255,255,0.3)'} fontSize="11" fontWeight={900} textAnchor="middle" fontFamily="monospace">
              CPU RAM
            </text>

            {/* Arrow 0→1 */}
            <line
              x1={135} y1={70} x2={185} y2={70}
              stroke="#16e0ff" strokeWidth={memoryStage >= 1 ? 2 : 1}
              strokeDasharray={memoryStage === 1 ? 'none' : '4 4'}
              markerEnd="url(#arrow-cyan)"
              opacity={memoryStage >= 1 ? 1 : 0.3}
              filter={memoryStage === 1 ? 'url(#webgpu-flow-glow)' : 'none'}
              style={{ transition: sw.transitionFast }}
            />

            {/* Stage 1: GPU Buffer */}
            <rect
              x={190} y={20} width={120} height={100} rx={12}
              fill={memoryStage === 1 ? 'rgba(22,224,255,0.12)' : 'rgba(255,255,255,0.02)'}
              stroke={memoryStage === 1 ? '#16e0ff' : sw.borderSubtle}
              strokeWidth={memoryStage === 1 ? 2 : 1}
              style={{ transition: sw.transitionFast }}
            />
            <text x={250} y={50} fill={memoryStage === 1 ? '#16e0ff' : 'var(--sw-text-dim)'} fontSize="9" fontWeight={memoryStage === 1 ? 900 : 600} textAnchor="middle" fontFamily="monospace">
              {copy.gpuBufferLabel}
            </text>
            <text x={250} y={72} fill="var(--sw-text-dim)" fontSize="8" textAnchor="middle">{MODEL_SIZES_MB[modelSize]}MB</text>
            <text x={250} y={100} fill={memoryStage === 1 ? '#16e0ff' : 'rgba(255,255,255,0.3)'} fontSize="11" fontWeight={900} textAnchor="middle" fontFamily="monospace">
              VRAM
            </text>

            {/* Arrow 1→2 */}
            <line
              x1={315} y1={70} x2={365} y2={70}
              stroke="#a855f7" strokeWidth={memoryStage >= 2 ? 2 : 1}
              strokeDasharray={memoryStage === 2 ? 'none' : '4 4'}
              markerEnd="url(#arrow-purple)"
              opacity={memoryStage >= 2 ? 1 : 0.3}
              filter={memoryStage === 2 ? 'url(#webgpu-flow-glow)' : 'none'}
              style={{ transition: sw.transitionFast }}
            />

            {/* Stage 2: Compute Shader */}
            <rect
              x={370} y={20} width={140} height={100} rx={12}
              fill={memoryStage === 2 ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.02)'}
              stroke={memoryStage === 2 ? '#a855f7' : sw.borderSubtle}
              strokeWidth={memoryStage === 2 ? 2 : 1}
              style={{ transition: sw.transitionFast }}
            />
            <text x={440} y={50} fill={memoryStage === 2 ? '#a855f7' : 'var(--sw-text-dim)'} fontSize="9" fontWeight={memoryStage === 2 ? 900 : 600} textAnchor="middle" fontFamily="monospace">
              {copy.computeLabel}
            </text>
            <text x={440} y={72} fill="var(--sw-text-dim)" fontSize="8" textAnchor="middle">matmul</text>
            <text x={440} y={100} fill={memoryStage === 2 ? '#a855f7' : 'rgba(255,255,255,0.3)'} fontSize="11" fontWeight={900} textAnchor="middle" fontFamily="monospace">
              GPU ALU
            </text>

            {/* Arrow 2→3 */}
            <line
              x1={515} y1={70} x2={565} y2={70}
              stroke="#ff5da2" strokeWidth={memoryStage >= 3 ? 2 : 1}
              strokeDasharray={memoryStage === 3 ? 'none' : '4 4'}
              markerEnd="url(#arrow-pink)"
              opacity={memoryStage >= 3 ? 1 : 0.3}
              filter={memoryStage === 3 ? 'url(#webgpu-flow-glow)' : 'none'}
              style={{ transition: sw.transitionFast }}
            />

            {/* Stage 3: Output Buffer → CPU */}
            <rect
              x={570} y={20} width={120} height={100} rx={12}
              fill={memoryStage === 3 ? 'rgba(255,93,162,0.12)' : 'rgba(255,255,255,0.02)'}
              stroke={memoryStage === 3 ? '#ff5da2' : sw.borderSubtle}
              strokeWidth={memoryStage === 3 ? 2 : 1}
              style={{ transition: sw.transitionFast }}
            />
            <text x={630} y={50} fill={memoryStage === 3 ? '#ff5da2' : 'var(--sw-text-dim)'} fontSize="9" fontWeight={memoryStage === 3 ? 900 : 600} textAnchor="middle" fontFamily="monospace">
              {copy.outputLabel}
            </text>
            <text x={630} y={72} fill="var(--sw-text-dim)" fontSize="8" textAnchor="middle">tokens</text>
            <text x={630} y={100} fill={memoryStage === 3 ? '#ff5da2' : 'rgba(255,255,255,0.3)'} fontSize="11" fontWeight={900} textAnchor="middle" fontFamily="monospace">
              CPU RAM
            </text>
          </svg>
        </PanelCard>

        {/* ── Performance Readout ─────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <PanelCard padding={14} gap={6} style={{ background: 'rgba(22,224,255,0.06)', border: '1px solid rgba(22,224,255,0.18)' }}>
            <span style={{ fontSize: 9, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.speedMsLabel}
            </span>
            <span style={{ fontSize: 22, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
              {speedMs}
            </span>
            <span style={{ fontSize: 10, color: 'var(--sw-text-dim)' }}>tok/s</span>
          </PanelCard>

          <PanelCard padding={14} gap={6} style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.18)' }}>
            <span style={{ fontSize: 9, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.vramUsedLabel}
            </span>
            <span style={{ fontSize: 22, color: '#a855f7', fontFamily: 'monospace', fontWeight: 900 }}>
              {vramUsed}
            </span>
            <span style={{ fontSize: 10, color: 'var(--sw-text-dim)' }}>MB</span>
          </PanelCard>

          <PanelCard padding={14} gap={6} style={{ background: 'rgba(255,93,162,0.06)', border: '1px solid rgba(255,93,162,0.18)' }}>
            <span style={{ fontSize: 9, color: '#ff5da2', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.memoryTitle}
            </span>
            <span style={{ fontSize: 22, color: '#ff5da2', fontFamily: 'monospace', fontWeight: 900 }}>
              {inferenceTime}
            </span>
            <span style={{ fontSize: 10, color: 'var(--sw-text-dim)' }}>ms/token</span>
          </PanelCard>
        </div>

        {/* ── Stepper ─────────────────────────────────────────────── */}
        <PanelCard
          padding={16}
          gap={10}
          style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 11, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {{ js: copy.step1Label, copy: copy.step2Label, compute: copy.step3Label, readback: copy.step4Label }[activeStep]}
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              const body = { js: copy.step1Body, copy: copy.step2Body, compute: copy.step3Body, readback: copy.step4Body }[step];
              const label = { js: copy.step1Label, copy: copy.step2Label, compute: copy.step3Label, readback: copy.step4Label }[step];

              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  onMouseEnter={() => setActiveStep(step)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: `1px solid ${isActive ? STEP_COLORS[step] : sw.borderSubtle}`,
                    background: isActive ? `${STEP_COLORS[step]}12` : sw.tint,
                    boxShadow: isActive ? `0 0 0 1px ${STEP_COLORS[step]}30, 0 0 12px ${STEP_COLORS[step]}12` : 'none',
                    cursor: 'pointer',
                    transition: sw.transitionFast,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: STEP_COLORS[step], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: 11, color: STEP_COLORS[step], fontFamily: 'monospace', fontWeight: 900 }}>
                      {stepValues[step]}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: sw.text, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{body}</div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});
