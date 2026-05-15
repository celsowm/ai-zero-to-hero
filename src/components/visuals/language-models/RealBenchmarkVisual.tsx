import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { PyTorchPerformanceVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Types ──────────────────────────────────────────────────────────────────────

interface BenchmarkResult {
  label: string;
  timeMs: number;
  color: string;
  icon: string;
  isReal: boolean;
}

// ── WebGPU detection ───────────────────────────────────────────────────────────

function isWebGPUSupported(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { gpu?: GPU };
  return !!nav.gpu;
}

// ── Real benchmark execution ───────────────────────────────────────────────────

const ELEMENT_COUNT = 10_000_000; // 10M elements

async function runJsPureBenchmark(): Promise<number> {
  const a = new Array(ELEMENT_COUNT);
  const b = new Array(ELEMENT_COUNT);
  for (let i = 0; i < ELEMENT_COUNT; i++) {
    a[i] = Math.random();
    b[i] = Math.random();
  }
  const start = performance.now();
  let sum = 0;
  for (let i = 0; i < ELEMENT_COUNT; i++) {
    sum += a[i] * b[i] + 0.5;
  }
  const end = performance.now();
  // Prevent dead-code elimination
  if (Number.isNaN(sum)) console.log('impossible');
  return end - start;
}

async function runJsTypedBenchmark(): Promise<number> {
  const a = new Float32Array(ELEMENT_COUNT);
  const b = new Float32Array(ELEMENT_COUNT);
  for (let i = 0; i < ELEMENT_COUNT; i++) {
    a[i] = Math.random();
    b[i] = Math.random();
  }
  const start = performance.now();
  let sum = 0;
  for (let i = 0; i < ELEMENT_COUNT; i++) {
    sum += a[i] * b[i] + 0.5;
  }
  const end = performance.now();
  if (Number.isNaN(sum)) console.log('impossible');
  return end - start;
}

async function runWebGPUBenchmark(): Promise<number | null> {
  if (!isWebGPUSupported()) return null;

  try {
    const nav = navigator as Navigator & { gpu: GPU };
    const adapter = await nav.gpu.requestAdapter();
    if (!adapter) return null;
    const device = await adapter.requestDevice();

    const size = ELEMENT_COUNT;
    const byteSize = size * 4; // Float32

    // WebGPU globals (available at runtime in supported browsers)
    const _GPUBufferUsage = (globalThis as Record<string, unknown>).GPUBufferUsage as Record<string, number>;
    const _GPUShaderStage = (globalThis as Record<string, unknown>).GPUShaderStage as Record<string, number>;
    const _GPUMapMode = (globalThis as Record<string, unknown>).GPUMapMode as Record<string, number>;

    // Create buffers
    const bufferA = device.createBuffer({ size: byteSize, usage: _GPUBufferUsage.STORAGE | _GPUBufferUsage.COPY_DST });
    const bufferB = device.createBuffer({ size: byteSize, usage: _GPUBufferUsage.STORAGE | _GPUBufferUsage.COPY_DST });
    const bufferResult = device.createBuffer({ size: byteSize, usage: _GPUBufferUsage.STORAGE | _GPUBufferUsage.COPY_SRC });
    const readBuffer = device.createBuffer({ size: byteSize, usage: _GPUBufferUsage.MAP_READ | _GPUBufferUsage.COPY_DST });

    // Fill with data
    const dataA = new Float32Array(size);
    const dataB = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      dataA[i] = Math.random();
      dataB[i] = Math.random();
    }
    device.queue.writeBuffer(bufferA, 0, dataA);
    device.queue.writeBuffer(bufferB, 0, dataB);

    // Shader
    const shaderModule = device.createShaderModule({ code: `
      @group(0) @binding(0) var<storage, read> a: array<f32>;
      @group(0) @binding(1) var<storage, read> b: array<f32>;
      @group(0) @binding(2) var<storage, read_write> result: array<f32>;

      @compute @workgroup_size(256)
      fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let i = global_id.x;
        if (i < arrayLength(&a)) {
          result[i] = a[i] * b[i] + 0.5;
        }
      }
    ` });

    const bindGroupLayout = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: _GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 1, visibility: _GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: _GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });

    const bindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: bufferA } },
        { binding: 1, resource: { buffer: bufferB } },
        { binding: 2, resource: { buffer: bufferResult } },
      ],
    });

    const pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] });
    const pipeline = device.createComputePipeline({ layout: pipelineLayout, compute: { module: shaderModule } });

    // Warmup
    {
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginComputePass();
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.dispatchWorkgroups(Math.ceil(size / 256));
      pass.end();
      encoder.copyBufferToBuffer(bufferResult, 0, readBuffer, 0, byteSize);
      device.queue.submit([encoder.finish()]);
      await readBuffer.mapAsync(_GPUMapMode.READ);
      readBuffer.unmap();
    }

    // Timed run
    const start = performance.now();
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(Math.ceil(size / 256));
    pass.end();
    encoder.copyBufferToBuffer(bufferResult, 0, readBuffer, 0, byteSize);
    device.queue.submit([encoder.finish()]);
    await readBuffer.mapAsync(_GPUMapMode.READ);
    const end = performance.now();
    readBuffer.unmap();

    // Cleanup
    bufferA.destroy();
    bufferB.destroy();
    bufferResult.destroy();
    readBuffer.destroy();
    device.destroy();

    return end - start;
  } catch {
    return null;
  }
}

// ── Progress Bar ───────────────────────────────────────────────────────────────

function BenchmarkBarReal({
  label, value, max, color, icon, timeStr, isReal,
}: {
  label: string; value: number; max: number; color: string; icon: string; timeStr: string; isReal: boolean;
}) {
  const logMax = Math.log10(max + 1);
  const logVal = Math.log10(value + 1);
  const logPct = logMax > 0 ? Math.min(100, (logVal / logMax) * 100) : 0;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '4px' }}>
        <span style={{ color, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{icon}</span> {label}
          {isReal && (
            <span style={{
              fontSize: '9px', padding: '2px 6px', borderRadius: '4px',
              background: `${sw.emerald}22`, color: sw.emerald, fontWeight: '700',
            }}>
              REAL
            </span>
          )}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: sw.text, fontWeight: '600' }}>{timeStr}</span>
      </div>
      <div style={{ height: '8px', background: sw.void, borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${logPct}%`,
            background: color,
            borderRadius: '4px',
            transition: 'width 0.4s ease',
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

interface RealBenchmarkVisualProps {
  copy: PyTorchPerformanceVisualCopy;
}

export const RealBenchmarkVisual = React.memo(({ copy }: RealBenchmarkVisualProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const hasWebGPU = isWebGPUSupported();
  const animRef = useRef<number>(0);

  useEffect(() => {
    const ref = animRef.current;
    return () => cancelAnimationFrame(ref);
  }, []);

  const runBenchmark = useCallback(async () => {
    setIsRunning(true);
    setResults(null);

    // Run JS benchmarks synchronously
    const jsPureTime = await runJsPureBenchmark();
    const jsTypedTime = await runJsTypedBenchmark();
    const gpuTime = await runWebGPUBenchmark();

    const res: BenchmarkResult[] = [
      { label: copy.jsPureLabel, timeMs: jsPureTime, color: sw.pink, icon: '🐍', isReal: true },
      { label: copy.jsTypedLabel, timeMs: jsTypedTime, color: sw.amber, icon: '📊', isReal: true },
    ];

    if (gpuTime !== null) {
      res.push({ label: copy.webgpuLabel, timeMs: gpuTime, color: sw.emerald, icon: '⚡', isReal: true });
    } else {
      // Fallback simulated WebGPU
      res.push({ label: copy.webgpuLabel, timeMs: jsTypedTime / 8, color: sw.emerald, icon: '⚡', isReal: false });
    }

    setResults(res);
    setIsRunning(false);
  }, [copy]);

  const maxTime = results ? Math.max(...results.map(r => r.timeMs)) : 1;

  function formatTime(ms: number): string {
    if (ms < 0.001) return `${(ms * 1e6).toFixed(0)} ns`;
    if (ms < 1) return `${(ms * 1e3).toFixed(1)} μs`;
    if (ms < 1000) return `${ms.toFixed(1)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  }

  const speedup = results && results.length >= 3 && results[2].isReal
    ? results[0].timeMs / results[2].timeMs
    : null;

  return (
    <div style={{
      background: sw.surface,
      borderRadius: '12px',
      padding: '16px',
      border: `1px solid ${sw.borderSubtle}`,
    }}>
      {/* Title */}
      <div style={{
        fontSize: '14px', fontWeight: '700', color: sw.text, marginBottom: '12px', textAlign: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      }}>
        <span>🔬</span> {copy.realBenchmarkTitle}
        {hasWebGPU && (
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
            background: `${sw.emerald}22`, color: sw.emerald, fontWeight: '700',
          }}>
            {copy.webgpuSupported}
          </span>
        )}
        {!hasWebGPU && (
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
            background: `${sw.amber}22`, color: sw.amber, fontWeight: '700',
          }}>
            {copy.webgpuNotSupported}
          </span>
        )}
      </div>

      {/* Operation info */}
      <div style={{
        fontSize: '11px', color: sw.textMuted, textAlign: 'center', marginBottom: '14px',
        fontFamily: 'monospace', fontWeight: '500',
      }}>
        {copy.operationLabel}: result[i] = a[i] × b[i] + 0.5 | {copy.elementsLabel}: {ELEMENT_COUNT.toLocaleString()}
      </div>

      {/* Run button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
        <button
          onClick={runBenchmark}
          disabled={isRunning}
          style={{
            padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
            border: `1px solid ${hasWebGPU ? sw.emerald : sw.amber}44`,
            background: isRunning ? sw.surface : `${hasWebGPU ? sw.emerald : sw.amber}22`,
            color: hasWebGPU ? sw.emerald : sw.amber,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
        >
          {isRunning ? `${copy.runningReal}...` : `▶ ${copy.runRealBenchmark}`}
        </button>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {results && results.map(r => (
          <BenchmarkBarReal
            key={r.label}
            label={r.label}
            value={r.timeMs}
            max={maxTime}
            color={r.color}
            icon={r.icon}
            timeStr={formatTime(r.timeMs)}
            isReal={r.isReal}
          />
        ))}
      </div>

      {/* Warning for simulated */}
      {!hasWebGPU && results && (
        <div style={{
          fontSize: '10px', color: sw.amber, textAlign: 'center', marginTop: '10px',
          fontStyle: 'italic', fontWeight: '500',
        }}>
          ⚠️ {copy.simulatedWarning}
        </div>
      )}

      {/* Speedup insight */}
      {speedup !== null && speedup > 1 && (
        <div style={{
          background: `${sw.emerald}08`,
          border: `1px solid ${sw.emerald}22`,
          borderRadius: '10px',
          padding: '12px',
          marginTop: '12px',
          fontSize: '12px',
          color: sw.text,
          lineHeight: '1.5',
        }}>
          <strong style={{ color: sw.emerald }}>{copy.realResultTitle}</strong>{' '}
          JS puro: {formatTime(results![0].timeMs)} vs WebGPU: {formatTime(results![2].timeMs)}.
          <div style={{ marginTop: '4px', fontWeight: '600', color: sw.emerald }}>
            {copy.speedupLabel}: ~{speedup >= 100 ? `${(speedup / 100).toFixed(1)}×` : `${speedup.toFixed(1)}×`}
          </div>
        </div>
      )}
    </div>
  );
});

