import React, { useMemo, useState, useCallback } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface LlamaCppQuantExplorerCopy {
  title: string;
  subtitle: string;
  modelLabel: string;
  formatLabel: string;
  vramTitle: string;
  vramFormula: string;
  qualityTitle: string;
  qualitySubtitle: string;
  speedTitle: string;
  speedSubtitle: string;
  stepperTitle: string;
  stepFocusLabel: string;
  step1Label: string;
  step1Body: string;
  step2Label: string;
  step2Body: string;
  step3Label: string;
  step3Body: string;
  step4Label: string;
  step4Body: string;
  paramsLabel: string;
  fileSizeLabel: string;
  kvCacheLabel: string;
  totalVramLabel: string;
  bppLabel: string;
  speedLabel: string;
  tokUnit: string;
  qualityLabel: string;
  fp16Reference: string;
  cpuSimdLabel: string;
  metalLabel: string;
  cudaLabel: string;
}

interface Props {
  copy: LlamaCppQuantExplorerCopy;
}

// ── Model definitions ──────────────────────────────────────────────────────

const MODELS = [
  { id: 'llama3-8b',   name: 'Llama-3 8B',   params: 8e9,  layers: 32, hiddenDim: 4096 },
  { id: 'mixtral-8x7b', name: 'Mixtral 8×7B', params: 46.7e9, layers: 32, hiddenDim: 4096 },
  { id: 'llama3-70b',  name: 'Llama-3 70B',  params: 70e9, layers: 80, hiddenDim: 8192 },
];

// GGUF formats: bits per weight, quality relative to FP16, file size factor
const GGUF_FORMATS = [
  { id: 'Q4_0',    bpp: 4.0,  quality: 0.88, color: '#ff5da2', desc: '4-bit, mais agressivo' },
  { id: 'Q5_K_M',  bpp: 5.5,  quality: 0.93, color: '#a855f7', desc: '5-bit K-médio, balanceado' },
  { id: 'Q8_0',    bpp: 8.5,  quality: 0.98, color: '#06b6d4', desc: '8-bit, quase FP16' },
  { id: 'FP16',    bpp: 16.0, quality: 1.00, color: '#10b981', desc: 'Meia precisão, referência' },
  { id: 'FP32',    bpp: 32.0, quality: 1.00, color: '#f59e0b', desc: 'Precisão completa' },
];

// Speed estimates in tok/s per billion params for different backends
const SPEED_PER_BILLION = {
  avx2:  0.35,  // CPU AVX2
  avx512: 0.55, // CPU AVX-512
  metal:  2.5,  // Apple Silicon
  cuda:   4.0,  // NVIDIA GPU (partial offload)
};

// KV cache: 2 × num_layers × hidden_dim × seq_len × dtype_size
// For quantized: dtype_size ≈ 2 bytes (FP16 for KV cache)
function calcKvCache(hiddenDim: number, numLayers: number, seqLen = 4096): number {
  const dtypeSize = 2; // FP16 for KV cache
  return 2 * numLayers * hiddenDim * seqLen * dtypeSize;
}

function bytesToGb(bytes: number): number {
  return bytes / (1024 * 1024 * 1024);
}

function fmt(v: number, d = 1): string {
  return v.toFixed(d);
}

type StepKey = 'load' | 'dequant' | 'simd' | 'sample';
const STEP_KEYS: StepKey[] = ['load', 'dequant', 'simd', 'sample'];
const STEP_COLORS: Record<StepKey, string> = {
  load: '#93a4bb',
  dequant: '#16e0ff',
  simd: '#a855f7',
  sample: '#ff5da2',
};

// ── SVG helpers ────────────────────────────────────────────────────────────

const SVG_W = 500;
const SVG_H = 200;
const PAD = { top: 20, right: 20, bottom: 30, left: 50 };

function yC(v: number, max: number): number {
  const h = SVG_H - PAD.top - PAD.bottom;
  return SVG_H - PAD.bottom - (v / max) * h;
}

// ── Component ──────────────────────────────────────────────────────────────

export const LlamaCppQuantExplorer = React.memo(({ copy }: Props) => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [seqLen, setSeqLen] = useState(4096);
  const [activeStep, setActiveStep] = useState<StepKey>('dequant');

  const model = MODELS[selectedModel];
  const format = GGUF_FORMATS[selectedFormat];

  // REAL computation: VRAM breakdown
  const vram = useMemo(() => {
    const paramBytes = model.params * format.bpp;
    const paramGb = bytesToGb(paramBytes);

    const kvBytes = calcKvCache(model.hiddenDim, model.layers, seqLen);
    const kvGb = bytesToGb(kvBytes);

    const totalGb = paramGb + kvGb;
    const fileSizeGb = paramGb * 1.02; // slight overhead

    return { paramGb, kvGb, totalGb, fileSizeGb };
  }, [seqLen, model, format.bpp]);

  // Speed estimates for different backends
  const speeds = useMemo(() => {
    const paramsB = model.params / 1e9;
    return {
      avx2: SPEED_PER_BILLION.avx2 / paramsB,
      avx512: SPEED_PER_BILLION.avx512 / paramsB,
      metal: SPEED_PER_BILLION.metal / paramsB,
      cuda: SPEED_PER_BILLION.cuda / paramsB,
    };
  }, [model.params]);

  // Quality vs size data for scatter plot
  const qualityPoints = useMemo(() => {
    return GGUF_FORMATS.map((f) => {
      const paramBytes = model.params * f.bpp;
      const sizeGb = bytesToGb(paramBytes);
      return { ...f, sizeGb };
    });
  }, [model.params]);

  const maxSpeed = Math.max(...Object.values(speeds));
  const maxQualitySize = Math.max(...qualityPoints.map((p) => p.sizeGb));

  const stepValues: Record<StepKey, string> = {
    load: `${fmt(vram.fileSizeGb, 0)} GB`,
    dequant: `${format.bpp} → FP16`,
    simd: 'AVX2/NEON',
    sample: `${model.layers} camadas`,
  };

  const handleModelSelect = useCallback((idx: number) => {
    setSelectedModel(idx);
    setActiveStep('dequant');
  }, []);

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={12} style={{ background: sw.tintStrong }}>
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
            {copy.modelLabel}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {MODELS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => handleModelSelect(idx)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: selectedModel === idx ? '2px solid #06b6d4' : `1px solid ${sw.borderSubtle}`,
                  background: selectedModel === idx ? '#06b6d418' : sw.tint,
                  color: selectedModel === idx ? '#06b6d4' : sw.textMuted,
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: selectedModel === idx ? 800 : 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
              {copy.formatLabel}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {GGUF_FORMATS.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(idx)}
                  style={{
                    flex: 1,
                    padding: '7px 6px',
                    borderRadius: 6,
                    border: selectedFormat === idx ? `2px solid ${f.color}` : `1px solid ${sw.borderSubtle}`,
                    background: selectedFormat === idx ? `${f.color}18` : sw.tint,
                    color: selectedFormat === idx ? f.color : sw.textMuted,
                    cursor: 'pointer',
                    fontSize: 10,
                    fontWeight: selectedFormat === idx ? 800 : 600,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{f.id}</div>
                  <div style={{ fontSize: 8, opacity: 0.7 }}>{f.bpp}b</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.kvCacheLabel} (seq len)
              </span>
              <span style={{ fontSize: 12, color: '#a855f7', fontFamily: 'monospace', fontWeight: 900 }}>
                {seqLen}
              </span>
            </div>
            <input
              type="range"
              min="512"
              max="16384"
              step="512"
              value={seqLen}
              onChange={(e) => setSeqLen(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7' }}
            />
          </div>
        </PanelCard>

        {/* ── VRAM Readout ─────────────────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
            border: `1px solid ${sw.borderSubtle}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.vramTitle}
            </span>
            <code style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
              {copy.vramFormula}
            </code>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <Readout label={copy.paramsLabel} value={`${fmt(vram.paramGb)} GB`} color="#06b6d4" />
            <Readout label={copy.kvCacheLabel} value={`${fmt(vram.kvGb, 2)} GB`} color="#a855f7" />
            <Readout label={copy.totalVramLabel} value={`${fmt(vram.totalGb)} GB`} color="#ff5da2" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
            <Readout label={copy.fileSizeLabel} value={`${fmt(vram.fileSizeGb)} GB`} color="#66b84a" />
            <Readout label={copy.bppLabel} value={`${format.bpp} bits`} color={format.color} />
          </div>
        </PanelCard>

        {/* ── Speed Chart ──────────────────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.speedTitle}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { key: 'avx2', label: `CPU ${copy.cpuSimdLabel}`, value: speeds.avx2, color: '#93a4bb' },
              { key: 'avx512', label: `CPU AVX-512`, value: speeds.avx512, color: '#16e0ff' },
              { key: 'metal', label: `Apple ${copy.metalLabel}`, value: speeds.metal, color: '#f59e0b' },
              { key: 'cuda', label: `GPU ${copy.cudaLabel}`, value: speeds.cuda, color: '#10b981' },
            ].map((item) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 80, fontSize: 10, color: item.color, fontWeight: 700 }}>
                  {item.label}
                </span>
                <div style={{ flex: 1, height: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(item.value / maxSpeed) * 100}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}66)`,
                      borderRadius: 4,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
                <span style={{ width: 50, fontSize: 11, color: sw.text, fontFamily: 'monospace', fontWeight: 900, textAlign: 'right' }}>
                  {fmt(item.value, 0)} {copy.tokUnit}
                </span>
              </div>
            ))}
          </div>
        </PanelCard>

        {/* ── Quality vs Size Scatter Plot ─────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.qualityTitle}
            </span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              {copy.fp16Reference}
            </span>
          </div>
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
            {/* Grid */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((t) => (
              <g key={`y-${t}`}>
                <line
                  x1={PAD.left} x2={SVG_W - PAD.right}
                  y1={yC(t, 1)} y2={yC(t, 1)}
                  stroke={sw.borderSubtle} strokeDasharray="3 5"
                />
                <text x={PAD.left - 4} y={yC(t, 1) + 3} fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="end" fontFamily="monospace">
                  {(t * 100).toFixed(0)}%
                </text>
              </g>
            ))}

            {/* X axis labels */}
            <text x={SVG_W / 2} y={SVG_H - 4} fill="rgba(255,255,255,0.35)" fontSize="9" textAnchor="middle">
              {copy.fileSizeLabel} (GB)
            </text>

            {/* Points */}
            {qualityPoints.map((p, i) => {
              const xPct = p.sizeGb / maxQualitySize;
              const x = PAD.left + xPct * (SVG_W - PAD.left - PAD.right);
              const y = yC(p.quality, 1);
              const isSelected = i === selectedFormat;

              return (
                <g key={p.id}>
                  <circle
                    cx={x} cy={y}
                    r={isSelected ? 10 : 7}
                    fill={`${p.color}${isSelected ? '40' : '20'}`}
                    stroke={p.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    style={{ transition: 'r 0.2s ease' }}
                  />
                  <text
                    x={x} y={y - 14}
                    fill={p.color}
                    fontSize={isSelected ? 11 : 10}
                    fontWeight={isSelected ? 900 : 700}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {p.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </PanelCard>

        {/* ── Stepper ──────────────────────────────────────────────── */}
        <PanelCard
          padding={14}
          gap={10}
          style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 11, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {{ load: copy.step1Label, dequant: copy.step2Label, simd: copy.step3Label, sample: copy.step4Label }[activeStep]}
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              const body = { load: copy.step1Body, dequant: copy.step2Body, simd: copy.step3Body, sample: copy.step4Body }[step];
              const label = { load: copy.step1Label, dequant: copy.step2Label, simd: copy.step3Label, sample: copy.step4Label }[step];

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

// ── Readout sub-component ──────────────────────────────────────────────────

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.25)', border: `1px solid ${color}25` }}>
    <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
    <div style={{ fontSize: 16, color, fontFamily: 'monospace', fontWeight: 900 }}>{value}</div>
  </div>
);
