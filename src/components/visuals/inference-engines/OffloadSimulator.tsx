import React, { useMemo, useState, useCallback } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface OffloadSimulatorCopy {
  title: string;
  subtitle: string;
  modelLabel: string;
  gpuVramLabel: string;
  cpuRamLabel: string;
  nGpuLayersLabel: string;
  diskOffloadLabel: string;
  gpuMemoryTitle: string;
  cpuMemoryTitle: string;
  weightsLabel: string;
  kvCacheLabel: string;
  overheadLabel: string;
  swapLabel: string;
  layerDistTitle: string;
  gpuLayerLabel: string;
  cpuLayerLabel: string;
  diskLayerLabel: string;
  perfTitle: string;
  tokUnit: string;
  slowLabel: string;
  mediumLabel: string;
  fastLabel: string;
  stepperTitle: string;
  stepFocusLabel: string;
  step1Label: string;
  step1Body: string;
  step2Label: string;
  step2Body: string;
  step3Label: string;
  step3Body: string;
  totalParamsLabel: string;
  bppLabel: string;
  warningTitle: string;
  warningGpuUnderutilized: string;
  warningCpuBottleneck: string;
  warningBalanced: string;
  warningImpossible: string;
  gpuSpeedLabel: string;
  cpuSpeedLabel: string;
  estimatedSpeedLabel: string;
  onLabel: string;
  offLabel: string;
}

interface Props {
  copy: OffloadSimulatorCopy;
}

// ── Model definitions ──────────────────────────────────────────────────────

const OFFLOAD_MODELS = [
  { id: '7b',    name: '7B',    params: 7e9,   layers: 32, hiddenDim: 4096, bytesPerParam: 4.5 }, // Q4_0
  { id: '13b',   name: '13B',   params: 13e9,  layers: 40, hiddenDim: 5120, bytesPerParam: 4.5 },
  { id: '30b',   name: '30B',   params: 30e9,  layers: 60, hiddenDim: 6656, bytesPerParam: 4.5 },
  { id: '70b',   name: '70B',   params: 70e9,  layers: 80, hiddenDim: 8192, bytesPerParam: 4.5 },
  { id: '671b',  name: '671B',  params: 671e9, layers: 61, hiddenDim: 7168, bytesPerParam: 4.5 },
];

const BYTES_PER_PARAM_GPU = 0.5; // Partial offload = FP16 weights in GPU
const BYTES_PER_PARAM_CPU = 4.5; // Q4_0 in CPU RAM
const KV_DTYPE_SIZE = 2; // FP16
const SEQ_LEN = 4096;
const LAYER_OVERHEAD_GPU = 0.15; // GB per layer for activations
const OVERHEAD_BASE = 1.0; // GB base overhead

// Speed per layer in ms
const SPEED_GPU_PER_LAYER = 0.05; // ms
const SPEED_CPU_PER_LAYER = 0.5;  // ms (10x slower)

function fmt(v: number, d = 1): string {
  return v.toFixed(d);
}

type StepKey = 'gpu' | 'transfer' | 'cpu';
const STEP_KEYS: StepKey[] = ['gpu', 'transfer', 'cpu'];
const STEP_COLORS: Record<StepKey, string> = {
  gpu: '#06b6d4',
  transfer: '#a855f7',
  cpu: '#10b981',
};

// ── Component ──────────────────────────────────────────────────────────────

export const OffloadSimulator = React.memo(({ copy }: Props) => {
  const [selectedModel, setSelectedModel] = useState(3); // 70B default
  const [gpuVram, setGpuVram] = useState(24);
  const [cpuRam, setCpuRam] = useState(64);
  const [nGpuLayers, setNGpuLayers] = useState(30);
  const [diskOffload, setDiskOffload] = useState(false);
  const [activeStep, setActiveStep] = useState<StepKey>('gpu');

  const model = OFFLOAD_MODELS[selectedModel];

  // REAL memory computation
  const memory = useMemo(() => {
    const totalLayers = model.layers;

    // GPU memory: weights on GPU + KV cache + overhead
    const gpuWeightsGb = nGpuLayers * (model.params / totalLayers) * BYTES_PER_PARAM_GPU / 1e9;
    const gpuKvGb = nGpuLayers * 2 * model.hiddenDim * SEQ_LEN * KV_DTYPE_SIZE / 1e9;
    const gpuOverheadGb = nGpuLayers * LAYER_OVERHEAD_GPU;
    const gpuTotalGb = gpuWeightsGb + gpuKvGb + gpuOverheadGb + OVERHEAD_BASE;

    // CPU memory: remaining weights + KV cache + optional swap
    const cpuLayers = totalLayers - nGpuLayers;
    const cpuWeightsGb = cpuLayers * (model.params / totalLayers) * BYTES_PER_PARAM_CPU / 1e9;
    const cpuKvGb = cpuLayers * 2 * model.hiddenDim * SEQ_LEN * KV_DTYPE_SIZE / 1e9;
    const cpuOverheadGb = OVERHEAD_BASE * 0.5;
    const cpuTotalGb = cpuWeightsGb + cpuKvGb + cpuOverheadGb;

    const totalRequiredGb = gpuTotalGb + cpuTotalGb;
    const totalAvailableGb = gpuVram + cpuRam;

    const gpuFits = gpuTotalGb <= gpuVram;
    const cpuFits = cpuTotalGb <= cpuRam;
    const bothFit = gpuFits && cpuFits;
    const needSwap = !bothFit && diskOffload;

    // Estimated speed
    const gpuTimeMs = nGpuLayers * SPEED_GPU_PER_LAYER;
    const cpuTimeMs = cpuLayers * SPEED_CPU_PER_LAYER;
    const totalMs = gpuTimeMs + cpuTimeMs;
    const tokPerSec = totalMs > 0 ? 1000 / totalMs : 0;

    // Warnings
    const gpuPct = nGpuLayers / totalLayers;
    const cpuPct = cpuLayers / totalLayers;
    let warning = '';
    let warningColor = '#66b84a';

    if (!needSwap && !bothFit) {
      warning = copy.warningImpossible;
      warningColor = '#ff5da2';
    } else if (gpuPct < 0.2 && bothFit) {
      warning = copy.warningGpuUnderutilized;
      warningColor = '#f59e0b';
    } else if (cpuPct > 0.8 && bothFit) {
      warning = copy.warningCpuBottleneck;
      warningColor = '#f59e0b';
    } else {
      warning = copy.warningBalanced;
      warningColor = '#66b84a';
    }

    return {
      gpuWeightsGb, gpuKvGb, gpuOverheadGb, gpuTotalGb,
      cpuWeightsGb, cpuKvGb, cpuOverheadGb, cpuTotalGb,
      totalRequiredGb, totalAvailableGb,
      gpuFits, cpuFits, bothFit, needSwap,
      tokPerSec,
      gpuPct, cpuPct,
      warning, warningColor,
      totalLayers, cpuLayers,
    };
  }, [selectedModel, gpuVram, cpuRam, nGpuLayers, diskOffload, model, copy]);

  const handleModelSelect = useCallback((idx: number) => {
    setSelectedModel(idx);
    setActiveStep('gpu');
  }, []);

  const stepValues: Record<StepKey, string> = {
    gpu: `${nGpuLayers} camadas`,
    transfer: 'PCIe 4.0',
    cpu: `${memory.cpuLayers} camadas`,
  };

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={12} style={{ background: sw.tintStrong }}>
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
            {copy.modelLabel}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {OFFLOAD_MODELS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => handleModelSelect(idx)}
                style={{
                  flex: 1,
                  padding: '7px 8px',
                  borderRadius: 6,
                  border: selectedModel === idx ? '2px solid #06b6d4' : `1px solid ${sw.borderSubtle}`,
                  background: selectedModel === idx ? '#06b6d418' : sw.tint,
                  color: selectedModel === idx ? '#06b6d4' : sw.textMuted,
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: selectedModel === idx ? 800 : 600,
                  fontFamily: 'monospace',
                }}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* GPU VRAM */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.gpuVramLabel}
              </span>
              <span style={{ fontSize: 12, color: '#06b6d4', fontFamily: 'monospace', fontWeight: 900 }}>
                {gpuVram} GB
              </span>
            </div>
            <input
              type="range" min="6" max="80" step="2" value={gpuVram}
              onChange={(e) => setGpuVram(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#06b6d4' }}
            />
          </div>

          {/* CPU RAM */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#10b981', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.cpuRamLabel}
              </span>
              <span style={{ fontSize: 12, color: '#10b981', fontFamily: 'monospace', fontWeight: 900 }}>
                {cpuRam} GB
              </span>
            </div>
            <input
              type="range" min="8" max="256" step="8" value={cpuRam}
              onChange={(e) => setCpuRam(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#10b981' }}
            />
          </div>

          {/* n_gpu_layers */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.nGpuLayersLabel}
              </span>
              <span style={{ fontSize: 12, color: '#a855f7', fontFamily: 'monospace', fontWeight: 900 }}>
                {nGpuLayers} / {memory.totalLayers}
              </span>
            </div>
            <input
              type="range" min="0" max={memory.totalLayers} step="1" value={nGpuLayers}
              onChange={(e) => setNGpuLayers(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7' }}
            />
          </div>

          {/* Disk offload toggle */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.diskOffloadLabel}
            </span>
            <button
              onClick={() => setDiskOffload(!diskOffload)}
              style={{
                padding: '5px 14px',
                borderRadius: 6,
                border: `1px solid ${diskOffload ? '#f59e0b' : sw.borderSubtle}`,
                background: diskOffload ? '#f59e0b20' : sw.tint,
                color: diskOffload ? '#f59e0b' : sw.textMuted,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {diskOffload ? copy.onLabel : copy.offLabel}
            </button>
          </div>
        </PanelCard>

        {/* ── GPU + CPU Memory Bars ────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* GPU */}
          <PanelCard padding={12} style={{ background: sw.tintStrong }}>
            <div style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              {copy.gpuMemoryTitle}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Bar label={copy.weightsLabel} value={memory.gpuWeightsGb} max={gpuVram} color="#06b6d4" />
              <Bar label={copy.kvCacheLabel} value={memory.gpuKvGb} max={gpuVram} color="#a855f7" />
              <Bar label={copy.overheadLabel} value={memory.gpuOverheadGb} max={gpuVram} color="#6b7280" />
            </div>
            <div style={{ marginTop: 8, padding: '4px 8px', borderRadius: 4, background: memory.gpuFits ? '#66b84a15' : '#ff5da215', textAlign: 'center' }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 900, color: memory.gpuFits ? '#66b84a' : '#ff5da2' }}>
                {fmt(memory.gpuTotalGb)} / {gpuVram} GB {memory.gpuFits ? '✓' : '✗ OOM'}
              </span>
            </div>
          </PanelCard>

          {/* CPU */}
          <PanelCard padding={12} style={{ background: sw.tintStrong }}>
            <div style={{ fontSize: 10, color: '#10b981', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              {copy.cpuMemoryTitle}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Bar label={copy.weightsLabel} value={memory.cpuWeightsGb} max={cpuRam} color="#10b981" />
              <Bar label={copy.kvCacheLabel} value={memory.cpuKvGb} max={cpuRam} color="#f59e0b" />
              {memory.needSwap && <Bar label={copy.swapLabel} value={Math.max(0, memory.cpuTotalGb - cpuRam)} max={cpuRam} color="#ff5da2" />}
            </div>
            <div style={{ marginTop: 8, padding: '4px 8px', borderRadius: 4, background: memory.cpuFits ? '#66b84a15' : (memory.needSwap ? '#f59e0b15' : '#ff5da215'), textAlign: 'center' }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 900, color: memory.cpuFits ? '#66b84a' : (memory.needSwap ? '#f59e0b' : '#ff5da2') }}>
                {fmt(memory.cpuTotalGb)} / {cpuRam} GB {memory.cpuFits ? '✓' : (memory.needSwap ? '→ swap' : '✗ OOM')}
              </span>
            </div>
          </PanelCard>
        </div>

        {/* ── Layer Distribution Diagram ───────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            {copy.layerDistTitle}
          </div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {Array(memory.totalLayers).fill(0).map((_, i) => {
              const isGpu = i < nGpuLayers;
              const color = isGpu ? '#06b6d4' : (memory.needSwap ? '#f59e0b' : '#10b981');
              return (
                <div
                  key={i}
                  style={{
                    width: `calc(${100 / memory.totalLayers}% - 2px)`,
                    height: 28,
                    background: `${color}30`,
                    border: `1px solid ${color}60`,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    color,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {i}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 9, color: 'var(--sw-text-dim)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#06b6d430', border: '1px solid #06b6d460', borderRadius: 2 }} />
              {copy.gpuLayerLabel}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#10b98130', border: '1px solid #10b98160', borderRadius: 2 }} />
              {copy.cpuLayerLabel}
            </span>
            {memory.needSwap && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, background: '#f59e0b30', border: '1px solid #f59e0b60', borderRadius: 2 }} />
                {copy.diskLayerLabel}
              </span>
            )}
          </div>
        </PanelCard>

        {/* ── Performance Estimator ────────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ fontSize: 10, color: '#ff5da2', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            {copy.perfTitle}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <Readout label={copy.gpuSpeedLabel} value={`${(1000 / (nGpuLayers * SPEED_GPU_PER_LAYER)).toFixed(0)} ${copy.tokUnit}`} color="#06b6d4" />
            <Readout label={copy.cpuSpeedLabel} value={`${(1000 / (memory.cpuLayers * SPEED_CPU_PER_LAYER)).toFixed(0)} ${copy.tokUnit}`} color="#10b981" />
            <Readout label={copy.estimatedSpeedLabel} value={`${memory.tokPerSec.toFixed(1)} ${copy.tokUnit}`} color="#ff5da2" />
          </div>
          {/* Speed bar */}
          <div style={{ height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 10, overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min((memory.tokPerSec / 30) * 100, 100)}%`,
                height: '100%',
                background: memory.tokPerSec > 15
                  ? 'linear-gradient(90deg, #10b981, #66b84a)'
                  : memory.tokPerSec > 5
                    ? 'linear-gradient(90deg, #f59e0b, #10b981)'
                    : 'linear-gradient(90deg, #ff5da2, #f59e0b)',
                borderRadius: 10,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--sw-text-dim)', marginTop: 4 }}>
            <span>{copy.slowLabel}</span>
            <span>{copy.mediumLabel}</span>
            <span>{copy.fastLabel}</span>
          </div>
        </PanelCard>

        {/* ── Warning ──────────────────────────────────────────────── */}
        <PanelCard
          padding={10}
          style={{
            background: `${memory.warningColor}12`,
            border: `1px solid ${memory.warningColor}30`,
          }}
        >
          <div style={{ fontSize: 10, color: memory.warningColor, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>
            ⚡ {copy.warningTitle}
          </div>
          <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>
            {memory.warning}
          </div>
        </PanelCard>

        {/* ── Stepper ──────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={10} style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 11, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {{ gpu: copy.step1Label, transfer: copy.step2Label, cpu: copy.step3Label }[activeStep]}
              </span>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              const body = { gpu: copy.step1Body, transfer: copy.step2Body, cpu: copy.step3Body }[step];
              const label = { gpu: copy.step1Label, transfer: copy.step2Label, cpu: copy.step3Label }[step];

              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  onMouseEnter={() => setActiveStep(step)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 10px',
                    borderRadius: 10,
                    border: `1px solid ${isActive ? STEP_COLORS[step] : sw.borderSubtle}`,
                    background: isActive ? `${STEP_COLORS[step]}12` : sw.tint,
                    boxShadow: isActive ? `0 0 0 1px ${STEP_COLORS[step]}30, 0 0 10px ${STEP_COLORS[step]}10` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: STEP_COLORS[step], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: 11, color: STEP_COLORS[step], fontFamily: 'monospace', fontWeight: 900 }}>
                      {stepValues[step]}
                    </span>
                  </div>
                  <div style={{ fontSize: 10.5, color: sw.text, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{body}</div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

// ── Sub-components ─────────────────────────────────────────────────────────

const Bar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ width: 50, fontSize: 8, color, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.3s ease' }} />
    </div>
    <span style={{ width: 40, fontSize: 9, color, fontFamily: 'monospace', fontWeight: 700, textAlign: 'right' }}>{fmt(value, 1)}</span>
  </div>
);

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '6px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.25)', border: `1px solid ${color}25`, textAlign: 'center' }}>
    <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: 14, color, fontFamily: 'monospace', fontWeight: 900 }}>{value}</div>
  </div>
);
