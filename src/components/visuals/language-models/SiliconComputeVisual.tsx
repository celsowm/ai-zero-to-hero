import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { SiliconComputeVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Types ──────────────────────────────────────────────────────────────────────

type ComputeMode = 'cpu-st' | 'cpu-mt' | 'gpu' | 'tensor-cores';

interface ComputeResult {
  mode: ComputeMode;
  label: string;
  timeMs: number;
  gflops: number;
  bottleneck: string;
  cores: number;
  bandwidthGBps: number;
  color: string;
  icon: string;
}

// ── Compute simulation ─────────────────────────────────────────────────────────

function simulateCompute(elements: number, mode: ComputeMode): ComputeResult {
  // Realistic benchmarks (approximate)
  const opsPerElement = 2; // multiply + add
  const totalOps = elements * opsPerElement;

  switch (mode) {
    case 'cpu-st': {
      // Single-threaded CPU: ~4 GHz, ~1 FLOP/cycle (SIMD helps but conservative)
      const cores = 1;
      const flopsPerSec = 4e9 * 1;
      const timeSec = totalOps / flopsPerSec;
      return {
        mode: 'cpu-st',
        label: 'CPU (1 thread)',
        timeMs: timeSec * 1000,
        gflops: totalOps / (timeSec * 1e9),
        bottleneck: 'Single-core limit',
        cores,
        bandwidthGBps: 50,
        color: '#94a3b8',
        icon: '🖥️',
      };
    }
    case 'cpu-mt': {
      const cores = 8;
      const flopsPerSec = 4e9 * 1 * cores * 0.7; // 70% efficiency
      const timeSec = totalOps / flopsPerSec;
      return {
        mode: 'cpu-mt',
        label: 'CPU (8 threads)',
        timeMs: timeSec * 1000,
        gflops: totalOps / (timeSec * 1e9),
        bottleneck: 'Memory bandwidth',
        cores,
        bandwidthGBps: 50,
        color: '#6366f1',
        icon: '🖥️',
      };
    }
    case 'gpu': {
      const cores = 10240; // RTX 4090
      const flopsPerSec = 1.5e9 * 2 * cores * 0.85; // 1.5 GHz, FP32 FMA, 85% eff
      const timeSec = totalOps / flopsPerSec;
      // Add PCIe transfer overhead for small tensors
      const transferTime = (elements * 4) / (32e9); // PCIe 4.0 x16 ~32 GB/s
      return {
        mode: 'gpu',
        label: 'GPU (CUDA)',
        timeMs: (timeSec + transferTime) * 1000,
        gflops: totalOps / ((timeSec + transferTime) * 1e9),
        bottleneck: elements < 1e5 ? 'PCIe transfer' : 'Compute bound',
        cores,
        bandwidthGBps: 1008, // GDDR6X
        color: '#10b981',
        icon: '🎮',
      };
    }
    case 'tensor-cores': {
      const cores = 512; // Tensor cores (each does 4x4x4)
      const flopsPerSec = 1.5e9 * 8 * cores * 0.9; // 8 ops per cycle (FP16 tensor core)
      const timeSec = totalOps / flopsPerSec;
      const transferTime = (elements * 2) / (32e9); // FP16 = 2 bytes
      return {
        mode: 'tensor-cores',
        label: 'GPU (Tensor Cores)',
        timeMs: (timeSec + transferTime) * 1000,
        gflops: totalOps / ((timeSec + transferTime) * 1e9),
        bottleneck: elements < 1e5 ? 'PCIe transfer' : 'Compute bound',
        cores,
        bandwidthGBps: 1008,
        color: '#00e5ff',
        icon: '⚡',
      };
    }
  }
}

// ── CPU Core animation ─────────────────────────────────────────────────────────

function CpuCores({ count, active, speed }: { count: number; active: number; speed: number }) {
  const cols = Math.min(count, 8);
  const cellSize = Math.min(36, 280 / cols);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: '3px' }}>
        {Array.from({ length: count }, (_, i) => {
          const isActive = i < active;
          return (
            <div
              key={i}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: '4px',
                background: isActive ? sw.cyan : sw.surface,
                border: `1px solid ${isActive ? sw.cyan : sw.borderSubtle}`,
                opacity: isActive ? 0.4 + speed * 0.6 : 0.3,
                transition: 'background 0.2s, opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: isActive ? '#fff' : sw.textMuted,
                fontWeight: '600',
              }}
            >
              {isActive ? '●' : '○'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── GPU Grid animation ─────────────────────────────────────────────────────────

function seededRandom(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function GpuGrid({ total, active }: { total: number; active: number }) {
  const cols = 16;
  const cellSize = 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: '1px' }}>
        {Array.from({ length: Math.min(total, 256) }, (_, i) => {
          const isActive = i < active;
          const flicker = 0.5 + seededRandom(i) * 0.5;
          return (
            <div
              key={i}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: '2px',
                background: isActive ? sw.emerald : sw.void,
                border: `1px solid ${isActive ? sw.emerald + '66' : sw.borderSubtle}`,
                opacity: isActive ? flicker : 0.2,
                transition: 'background 0.15s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Progress bar ───────────────────────────────────────────────────────────────

function ProgressBar({
  label, value, max, color, timeStr, icon,
}: {
  label: string; value: number; max: number; color: string; timeStr: string; icon: string;
}) {
  const logMax = Math.log10(max + 1);
  const logVal = Math.log10(value + 1);
  const logPct = logMax > 0 ? Math.min(100, (logVal / logMax) * 100) : 0;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
        <span style={{ color, fontWeight: '700' }}>
          {icon} {label}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: sw.text }}>
          {timeStr}
        </span>
      </div>
      <div style={{ height: '8px', background: sw.void, borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${logPct}%`,
            background: color,
            borderRadius: '4px',
            transition: 'width 0.3s ease',
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface SiliconComputeVisualProps {
  copy: SiliconComputeVisualCopy;
}

export const SiliconComputeVisual = React.memo(({ copy }: SiliconComputeVisualProps) => {
  const [tensorSize, setTensorSize] = useState(6); // 10^6 = 1M elements
  const [animProgress, setAnimProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const animRef = useRef<number>(0);
  const isPtBr = true; // Will be set from context if needed

  const elements = Math.pow(10, tensorSize);

  const results = useMemo(() => {
    return [
      simulateCompute(elements, 'cpu-st'),
      simulateCompute(elements, 'cpu-mt'),
      simulateCompute(elements, 'gpu'),
      simulateCompute(elements, 'tensor-cores'),
    ];
  }, [elements]);

  const maxTime = Math.max(...results.map(r => r.timeMs));

  // Animation
  const startAnimation = useCallback(() => {
    setIsRunning(true);
    setAnimProgress(0);
    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / duration);
      setAnimProgress(pct);
      if (pct < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setIsRunning(false);
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const formatTime = (ms: number): string => {
    if (ms < 0.001) return `${(ms * 1e6).toFixed(0)} ns`;
    if (ms < 1) return `${(ms * 1e3).toFixed(1)} μs`;
    if (ms < 1000) return `${ms.toFixed(2)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  };

  const tensorSizeLabel = elements >= 1e9 ? `${(elements / 1e9).toFixed(0)}B`
    : elements >= 1e6 ? `${(elements / 1e6).toFixed(0)}M`
      : elements >= 1e3 ? `${(elements / 1e3).toFixed(0)}K`
        : elements.toString();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tensor size slider */}
      <div style={{
        background: sw.surface,
        borderRadius: '12px',
        padding: '12px 16px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
          <span style={{ color: sw.text, fontWeight: '600' }}>
            {copy.tensorSizeLabel}: {tensorSizeLabel} elementos
          </span>
          <span style={{ color: sw.cyan, fontFamily: 'monospace', fontSize: '11px' }}>
            10^{tensorSize}
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={9}
          step={0.5}
          value={tensorSize}
          onChange={e => setTensorSize(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: sw.cyan }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: sw.textMuted, marginTop: '2px' }}>
          <span>100</span>
          <span>1K</span>
          <span>1M</span>
          <span>100M</span>
          <span>1B</span>
        </div>
      </div>

      {/* Run animation button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={startAnimation}
          disabled={isRunning}
          style={{
            padding: '6px 20px',
            borderRadius: '8px',
            border: `1px solid ${sw.cyan}44`,
            background: isRunning ? sw.surface : `${sw.cyan}22`,
            color: sw.cyan,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          {isRunning ? `${copy.running}...` : `▶ ${copy.compare}`}
        </button>
      </div>

      {/* Speed comparison bars */}
      <div style={{
        background: sw.void,
        borderRadius: '12px',
        padding: '14px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: sw.text, marginBottom: '12px' }}>
          {copy.speedComparison}
        </div>
        {results.map(r => (
          <ProgressBar
            key={r.mode}
            label={r.label}
            value={r.timeMs}
            max={maxTime}
            color={r.color}
            timeStr={formatTime(r.timeMs)}
            icon={r.icon}
          />
        ))}
      </div>

      {/* Architecture comparison */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        {/* CPU */}
        <div style={{
          background: sw.surface,
          borderRadius: '12px',
          padding: '12px',
          border: `1px solid ${sw.borderSubtle}`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: sw.textMuted, marginBottom: '6px', fontWeight: '600' }}>
            🖥️ CPU
          </div>
          <CpuCores count={8} active={isRunning ? Math.ceil(8 * animProgress) : 8} speed={isRunning ? animProgress : 0} />
          <div style={{ marginTop: '8px', fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
            {copy.cpuDesc}
          </div>
        </div>

        {/* GPU */}
        <div style={{
          background: sw.surface,
          borderRadius: '12px',
          padding: '12px',
          border: `1px solid ${sw.emerald}44`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: sw.emerald, marginBottom: '6px', fontWeight: '600' }}>
            🎮 GPU (CUDA)
          </div>
          <GpuGrid total={256} active={isRunning ? Math.floor(256 * animProgress) : 256} />
          <div style={{ marginTop: '8px', fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
            {copy.gpuDesc}
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
      }}>
        {[
          { label: copy.vramLabel, value: '1,008 GB/s', sub: 'GDDR6X', color: sw.cyan },
          { label: copy.ramLabel, value: '50 GB/s', sub: 'DDR5', color: sw.textMuted },
          { label: copy.pcieLabel, value: '32 GB/s', sub: 'PCIe 4.0 x16', color: sw.amber },
        ].map(m => (
          <div key={m.label} style={{
            background: sw.surface,
            borderRadius: '10px',
            padding: '10px',
            textAlign: 'center',
            border: `1px solid ${sw.borderSubtle}`,
          }}>
            <div style={{ fontSize: '10px', color: sw.textMuted, marginBottom: '2px' }}>{m.label}</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: m.color, fontFamily: 'monospace' }}>{m.value}</div>
            <div style={{ fontSize: '9px', color: sw.textMuted }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Insight callout */}
      <div style={{
        background: `${sw.cyan}11`,
        border: `1px solid ${sw.cyan}33`,
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '12px',
        color: sw.text,
        lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.cyan }}>{copy.insightTitle}</strong>{' '}
        {(() => {
          const ratio = results[0].timeMs / results[2].timeMs;
          const speedup = ratio >= 1000 ? `${(ratio / 1000).toFixed(0)}mil` : `${ratio.toFixed(0)}x`;
          const speedupEn = ratio >= 1000 ? `${(ratio / 1000).toFixed(0)}K` : `${ratio.toFixed(0)}x`;
          return isPtBr
            ? `Para ${tensorSizeLabel} elementos: a GPU termina em ${formatTime(results[2].timeMs)} vs CPU single-thread em ${formatTime(results[0].timeMs)}. Isso é ${speedup} mais rápido.`
            : `For ${tensorSizeLabel} elements: GPU finishes in ${formatTime(results[2].timeMs)} vs single-thread CPU in ${formatTime(results[0].timeMs)}. That's ${speedupEn} faster.`;
        })()}
      </div>
    </div>
  );
});
