import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { PyTorchPerformanceVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Types ──────────────────────────────────────────────────────────────────────

type ModelSize = 1e4 | 1e5 | 1e6 | 1e7 | 1e8;

interface BenchmarkResult {
  label: string;
  timeMs: number;
  color: string;
  icon: string;
}

// ── Benchmark simulation ───────────────────────────────────────────────────────

function simulateBenchmark(params: ModelSize): BenchmarkResult[] {
  const opsPerParam = 6; 
  const totalOps = params * opsPerParam;

  const pythonTime = (totalOps / 1e6) * 1000;
  const numpyTime = (totalOps / 1e9) * 1000;
  const pytorchCpuTime = (totalOps / 5e9) * 1000;
  const pytorchGpuTime = (totalOps / 5e11) * 1000;

  return [
    { label: 'python', timeMs: pythonTime, color: sw.pink, icon: '🐍' },
    { label: 'numpy', timeMs: numpyTime, color: sw.amber, icon: '🔢' },
    { label: 'pytorch_cpu', timeMs: pytorchCpuTime, color: sw.cyan, icon: '🔥' },
    { label: 'pytorch_gpu', timeMs: pytorchGpuTime, color: sw.emerald, icon: '⚡' },
  ];
}

function formatTime(ms: number): string {
  if (ms < 0.001) return `${(ms * 1e6).toFixed(0)} ns`;
  if (ms < 1) return `${(ms * 1e3).toFixed(1)} μs`;
  if (ms < 1000) return `${ms.toFixed(1)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

function formatParams(p: ModelSize): string {
  if (p >= 1e6) return `${(p / 1e6).toFixed(0)}M`;
  if (p >= 1e3) return `${(p / 1e3).toFixed(0)}K`;
  return p.toString();
}

// ── Progress Bar ───────────────────────────────────────────────────────────────

function BenchmarkBar({
  label, value, max, color, icon, timeStr,
}: {
  label: string; value: number; max: number; color: string; icon: string; timeStr: string;
}) {
  const logMax = Math.log10(max + 1);
  const logVal = Math.log10(value + 1);
  const logPct = logMax > 0 ? Math.min(100, (logVal / logMax) * 100) : 0;

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
        <span style={{ color, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{icon}</span> {label}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: sw.text }}>{timeStr}</span>
      </div>
      <div style={{ height: '6px', background: sw.void, borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${logPct}%`,
            background: color,
            borderRadius: '3px',
            transition: 'width 0.4s ease',
            boxShadow: `0 0 6px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

interface PyTorchPerformanceVisualProps {
  copy: PyTorchPerformanceVisualCopy;
}

export const PyTorchPerformanceVisual = React.memo(({ copy }: PyTorchPerformanceVisualProps) => {
  const [modelSize, setModelSize] = useState<ModelSize>(1e6);
  const [isRunning, setIsRunning] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const animRef = useRef<number>(0);

  const isPtBr = copy.beforeLabel.includes('Trad');

  const results = useMemo(() => simulateBenchmark(modelSize), [modelSize]);
  const maxTime = Math.max(...results.map(r => r.timeMs));

  const startBenchmark = useCallback(() => {
    setIsRunning(true);
    setAnimProgress(0);
    const duration = 1500;
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

  const modelSizes: ModelSize[] = [1e4, 1e5, 1e6, 1e7, 1e8];

  const labelMap: Record<string, string> = {
    python: isPtBr ? copy.pythonPureLabel : copy.pythonPureLabel,
    numpy: isPtBr ? copy.numpyLabel : copy.numpyLabel,
    pytorch_cpu: isPtBr ? copy.pytorchCpuLabel : copy.pytorchCpuLabel,
    pytorch_gpu: isPtBr ? copy.pytorchGpuLabel : copy.pytorchGpuLabel,
  };

  const iconMap: Record<string, string> = {
    python: '🐍', numpy: '🔢', pytorch_cpu: '🔥', pytorch_gpu: '⚡',
  };

  const speedup = results[0].timeMs / results[3].timeMs;
  const speedupStr = speedup >= 1e6 ? `${(speedup / 1e6).toFixed(0)}M×` : speedup >= 1e3 ? `${(speedup / 1e3).toFixed(0)}K×` : `${speedup.toFixed(0)}×`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* ── Before / After comparison ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{
          padding: '12px',
          background: 'rgba(239, 68, 68, 0.04)',
          borderRadius: '12px',
          border: `1px solid rgba(239, 68, 68, 0.2)`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: sw.pink, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>❌</span> {copy.beforeLabel}
          </div>
          {[copy.pain1, copy.pain2, copy.pain3, copy.pain4].map((pain, i) => (
            <div key={i} style={{
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '6px',
              marginBottom: i < 3 ? '6px' : 0,
              fontSize: '10px',
              color: sw.textDim,
              borderLeft: `2px solid ${sw.pink}44`,
              lineHeight: '1.3',
            }}>
              {pain}
            </div>
          ))}
        </div>

        <div style={{
          padding: '12px',
          background: 'rgba(16, 185, 129, 0.04)',
          borderRadius: '12px',
          border: `1px solid rgba(16, 185, 129, 0.2)`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: sw.emerald, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>✅</span> {copy.afterLabel}
          </div>
          {[copy.solution1, copy.solution2, copy.solution3, copy.solution4].map((sol, i) => (
            <div key={i} style={{
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '6px',
              marginBottom: i < 3 ? '6px' : 0,
              fontSize: '10px',
              color: sw.textDim,
              borderLeft: '2px solid rgba(16, 185, 129, 0.44)',
              lineHeight: '1.3',
            }}>
              {sol}
            </div>
          ))}
        </div>
      </div>

      {/* ── Benchmark Section ── */}
      <div style={{
        background: sw.surface,
        borderRadius: '12px',
        padding: '12px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: sw.text, marginBottom: '8px', textAlign: 'center' }}>
          {copy.benchmarkTitle}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
            <span style={{ color: sw.textMuted, fontWeight: '600' }}>{copy.modelSizeLabel}</span>
            <span style={{ color: sw.cyan, fontFamily: 'monospace', fontSize: '10px' }}>{formatParams(modelSize)}</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {modelSizes.map(s => (
              <button
                key={s}
                onClick={() => setModelSize(s)}
                disabled={isRunning}
                style={{
                  flex: 1, padding: '4px 0', borderRadius: '6px', fontSize: '10px', fontWeight: '700',
                  border: `1px solid ${modelSize === s ? sw.cyan : sw.borderSubtle}`,
                  background: modelSize === s ? `${sw.cyan}22` : 'transparent',
                  color: modelSize === s ? sw.cyan : sw.textMuted,
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  opacity: isRunning ? 0.5 : 1,
                }}
              >
                {formatParams(s)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <button
            onClick={startBenchmark}
            disabled={isRunning}
            style={{
              padding: '5px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
              border: `1px solid ${sw.cyan}44`,
              background: isRunning ? sw.surface : `${sw.cyan}22`,
              color: isRunning ? sw.textMuted : sw.cyan,
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.6 : 1,
            }}
          >
            {isRunning ? `${copy.running}...` : `▶ ${copy.runBenchmark}`}
          </button>
        </div>

        {results.map(r => (
          <BenchmarkBar
            key={r.label}
            label={labelMap[r.label]}
            value={r.timeMs * (1 - animProgress * 0.99)}
            max={maxTime}
            color={r.color}
            icon={iconMap[r.label]}
            timeStr={formatTime(r.timeMs * (1 - animProgress * 0.99))}
          />
        ))}
      </div>

      {/* ── Insight Callout ── */}
      <div style={{
        background: `${sw.cyan}08`,
        border: `1px solid ${sw.cyan}22`,
        borderRadius: '10px',
        padding: '10px 12px',
        fontSize: '11px',
        color: sw.text,
        lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.cyan }}>{copy.insightTitle}</strong>{' '}
        {isPtBr
          ? `Para um modelo de ${formatParams(modelSize)} parâmetros: Python puro levaria ${formatTime(results[0].timeMs)} vs PyTorch GPU em ${formatTime(results[3].timeMs)}. Speedup de ~${speedupStr}. A diferença não é só hardware — é o dispatcher C++ + fused kernels + autograd eliminando overhead.`
          : `For a ${formatParams(modelSize)} param model: pure Python would take ${formatTime(results[0].timeMs)} vs PyTorch GPU at ${formatTime(results[3].timeMs)}. Speedup of ~${speedupStr}. The difference isn't just hardware — it's the C++ dispatcher + fused kernels + autograd eliminating overhead.`}
      </div>
    </div>
  );
});

