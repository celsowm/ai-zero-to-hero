import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import hljs from 'highlight.js';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import { createTrainingDebugger, type SampleSnapshot, type TrainingDebuggerState } from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';

interface Props { copy: NeuralNetworkStepDebuggerVisualCopy }

const fmt = (v: number, d = 4) => v.toFixed(d);

/* ═══════════════════ Code with hljs ═══════════════════ */

const HighlightedCode: React.FC<{
  code: string; activeRange: [number, number] | null;
}> = ({ code, activeRange }) => {
  const lines = useMemo(() => hljs.highlight(code, { language: 'python' }).value.split('\n'), [code]);
  return (
    <div style={{ borderRadius: 8, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'auto', flex: 1, minHeight: 0 }}>
      {lines.map((html, i) => {
        const ln = i + 1;
        const active = activeRange && ln >= activeRange[0] && ln <= activeRange[1];
        const dim = activeRange && !active;
        return (
          <div key={i} style={{ display: 'flex', padding: '0 6px', background: active ? 'rgba(56,189,248,0.12)' : 'transparent', borderLeft: active ? '2px solid #38bdf8' : '2px solid transparent', opacity: dim ? 0.3 : 1, transition: 'all 120ms', fontSize: 10, lineHeight: 1.55, fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
            <span style={{ color: 'rgba(255,255,255,0.15)', minWidth: 18, textAlign: 'right', userSelect: 'none', marginRight: 6 }}>{ln}</span>
            <span className="hljs" style={{ background: 'transparent', whiteSpace: 'pre' }} dangerouslySetInnerHTML={{ __html: html || ' ' }} />
          </div>
        );
      })}
    </div>
  );
};

/* ═══════════════════ SVG Graph ═══════════════════ */

const NetworkGraph: React.FC<{ snap: SampleSnapshot; copy: NeuralNetworkStepDebuggerVisualCopy }> = ({ snap, copy }) => {
  const x = snap.sample.inputs, w = snap.weightsAfter;
  const iY = [48, 98, 148, 198], hY = [80, 168], oY = 124;

  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%" style={{ display: 'block' }}>
      <defs><style>{`@keyframes fl{from{stroke-dashoffset:0}to{stroke-dashoffset:-18}}`}</style></defs>

      {/* edges input→hidden */}
      {iY.flatMap((y1, i) => hY.map((y2, j) => {
        const wv = j === 0 ? w.w1[i] : w.w2[i];
        return <path key={`ih${i}${j}`} d={`M80 ${y1} C120 ${y1},148 ${y2},180 ${y2}`} fill="none"
          stroke="#38bdf8" strokeWidth={Math.max(0.6, Math.min(3, Math.abs(wv) * 6))}
          strokeDasharray="4 4" opacity={0.5} style={{ animation: 'fl 1.3s linear infinite' }} />;
      }))}
      {/* edges hidden→output */}
      {hY.map((y, i) => {
        const wv = i === 0 ? w.v1 : w.v2;
        return <path key={`ho${i}`} d={`M240 ${y} C268 ${y},284 ${oY},310 ${oY}`} fill="none"
          stroke="#66b84a" strokeWidth={Math.max(0.8, Math.min(3.5, Math.abs(wv) * 5))}
          strokeDasharray="4 4" opacity={0.5} style={{ animation: 'fl 1.1s linear infinite' }} />;
      })}

      {/* Input nodes */}
      {iY.map((y, i) => (
        <g key={`in${i}`}>
          <circle cx="58" cy={y} r="14" fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth={1} />
          <text x="58" y={y + 1} textAnchor="middle" fontSize="8" fontWeight="800" fill="#00e5ff">x{i + 1}</text>
          <text x="58" y={y + 11} textAnchor="middle" fontSize="6" fill="var(--sw-text-dim)">{fmt(x[i], 2)}</text>
          <text x="10" y={y + 3} fontSize="6.5" fill="var(--sw-text-dim)">{copy.featureNames[i]}</text>
        </g>
      ))}

      {/* Hidden nodes */}
      {[
        { y: hY[0], l: 'h1', h: snap.h1, z: snap.z1 },
        { y: hY[1], l: 'h2', h: snap.h2, z: snap.z2 },
      ].map(n => (
        <g key={n.l}>
          <circle cx="210" cy={n.y} r="18" fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth={1.2} />
          <text x="210" y={n.y - 3} textAnchor="middle" fontSize="9" fontWeight="800" fill="#38bdf8">{n.l}</text>
          <text x="210" y={n.y + 7} textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--sw-text)">{fmt(n.h)}</text>
          <text x="210" y={n.y + 16} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">z={fmt(n.z)}</text>
        </g>
      ))}

      {/* Output node */}
      <g>
        <circle cx="332" cy={oY} r="22" fill="rgba(102,184,74,0.08)" stroke="#66b84a" strokeWidth={1.5} />
        <text x="332" y={oY - 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#66b84a">ŷ</text>
        <text x="332" y={oY + 6} textAnchor="middle" fontSize="8" fontWeight="700" fill={snap.yHat >= 0.5 ? '#22c55e' : '#f97316'}>{fmt(snap.yHat)}</text>
        <text x="332" y={oY + 16} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">z3={fmt(snap.z3)}</text>
      </g>

      {/* Loss + target */}
      <rect x="290" y={oY + 30} width="84" height="16" rx="5" fill="rgba(249,115,22,0.06)" stroke="#f97316" strokeWidth={0.6} />
      <text x="332" y={oY + 41} textAnchor="middle" fontSize="7" fontWeight="700" fill="#f97316">loss={fmt(snap.loss, 5)}</text>
      <text x="332" y="232" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)">target={fmt(snap.sample.target, 1)}</text>

      {/* Labels */}
      <text x="58" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#00e5ff">{copy.labels.inputLayer}</text>
      <text x="210" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#38bdf8">{copy.labels.hiddenLayer}</text>
      <text x="332" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#66b84a">{copy.labels.outputLayer}</text>
    </svg>
  );
};

/* ═══════════════════ Mini Loss Chart ═══════════════════ */

const MiniLossChart: React.FC<{ history: number[]; total: number; threshold: number }> = ({ history, total, threshold }) => {
  if (history.length < 2) return null;
  const w = 200, h = 50, pad = { t: 4, r: 4, b: 10, l: 28 };
  const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
  const maxL = Math.max(...history, 0.3), minL = 0;
  const pts = history.map((l, i) => ({ x: pad.l + (i / Math.max(total - 1, 1)) * cw, y: pad.t + (1 - (l - minL) / (maxL - minL || 1)) * ch }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const thY = pad.t + (1 - (threshold - minL) / (maxL - minL || 1)) * ch;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      {thY > pad.t && thY < pad.t + ch && <line x1={pad.l} y1={thY} x2={pad.l + cw} y2={thY} stroke="#22c55e" strokeWidth={0.6} strokeDasharray="3 2" opacity={0.4} />}
      <path d={d} fill="none" stroke="#00e5ff" strokeWidth={1.2} strokeLinejoin="round" />
      {pts.length > 0 && <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={2} fill="#00e5ff" />}
      <text x={pad.l + cw / 2} y={h - 1} textAnchor="middle" fontSize="6" fill="var(--sw-text-dim)">epochs</text>
    </svg>
  );
};

/* ═══════════════════ Computation Details ═══════════════════ */

const ComputationPanel: React.FC<{ snap: SampleSnapshot }> = ({ snap }) => {
  const wb = snap.weightsBefore;
  const sections = [
    { title: 'Forward', color: '#38bdf8', rows: [
      { l: 'z1=Σ(w1·x)+b1', v: fmt(snap.z1) }, { l: 'h1=relu(z1)', v: fmt(snap.h1) },
      { l: 'z2=Σ(w2·x)+b2', v: fmt(snap.z2) }, { l: 'h2=relu(z2)', v: fmt(snap.h2) },
      { l: `z3=Σ(v·h)+c`, v: fmt(snap.z3) },
      { l: 'ŷ=σ(z3)', v: fmt(snap.yHat) },
    ]},
    { title: 'Loss', color: '#f97316', rows: [
      { l: `(ŷ−y)²`, v: fmt(snap.loss, 6) },
    ]},
    { title: 'Backprop', color: '#ff2e97', rows: [
      { l: 'd_out=ŷ−y', v: fmt(snap.d_out) },
      { l: 'd_z3=d_out·ŷ(1−ŷ)', v: fmt(snap.d_z3) },
      { l: 'd_z1', v: fmt(snap.d_z1) }, { l: 'd_z2', v: fmt(snap.d_z2) },
    ]},
    { title: 'Update', color: '#a78bfa', rows: [
      ...snap.grad_w1.slice(0, 2).map((_, i) => ({ l: `w1[${i}]`, v: `${fmt(wb.w1[i])}→${fmt(snap.weightsAfter.w1[i])}` })),
      { l: 'v1', v: `${fmt(wb.v1)}→${fmt(snap.weightsAfter.v1)}` },
      { l: 'v2', v: `${fmt(wb.v2)}→${fmt(snap.weightsAfter.v2)}` },
    ]},
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}>
      {sections.map(sec => (
        <div key={sec.title} style={{ padding: '6px 8px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: sec.color, borderBottom: `1px solid ${sec.color}33`, paddingBottom: 4, marginBottom: 2 }}>{sec.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sec.rows.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", padding: '2px 0' }}>
                <span style={{ color: 'var(--sw-text-dim)', fontSize: 9 }}>{r.l}</span>
                <span style={{ color: 'var(--sw-text)', fontWeight: 700 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════ Dataset Table ═══════════════════ */

const DatasetTable: React.FC<{ snap: SampleSnapshot; copy: NeuralNetworkStepDebuggerVisualCopy }> = ({ snap, copy }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {copy.dataset.map((d, i) => {
      const active = i === snap.sampleIndex;
      return (
        <div key={i} style={{
          display: 'flex', gap: 4, alignItems: 'center', fontSize: 8.5, fontFamily: 'monospace',
          padding: '2px 4px', borderRadius: 5,
          background: active ? 'rgba(0,229,255,0.08)' : 'transparent',
          border: active ? '1px solid rgba(0,229,255,0.25)' : '1px solid transparent',
        }}>
          <span style={{ fontWeight: 700, color: active ? '#00e5ff' : 'var(--sw-text-dim)', minWidth: 14 }}>{i + 1}</span>
          <span style={{ color: 'var(--sw-text-dim)', flex: 1 }}>[{d.inputs.map(v => v.toFixed(2)).join(', ')}]</span>
          <span style={{ fontWeight: 700, color: d.target === 1 ? '#22c55e' : '#f97316', minWidth: 14 }}>{d.target}</span>
        </div>
      );
    })}
  </div>
);

/* ═══════════════════ MAIN ═══════════════════ */

export const NeuralNetworkStepDebugger: React.FC<Props> = ({ copy }) => {
  const engineRef = useRef<ReturnType<typeof createTrainingDebugger> | null>(null);
  const [snap, setSnap] = useState<SampleSnapshot | null>(null);
  const [engineState, setEngineState] = useState<TrainingDebuggerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'sample' | 'epoch' | 'fast'>('sample');
  const animRef = useRef<number | null>(null);

  // Init engine
  useEffect(() => {
    const engine = createTrainingDebugger({
      dataset: copy.dataset.map(d => ({ inputs: d.inputs, target: d.target })),
      learningRate: copy.learningRate,
      initialWeights: copy.initialWeights,
      totalEpochs: copy.totalEpochs,
      convergenceThreshold: copy.convergenceThreshold,
    });
    engineRef.current = engine;
    // Process first sample to have initial data
    const snaps = engine.stepSamples(1);
    const frame = requestAnimationFrame(() => {
      setSnap(snaps[0] ?? null);
      setEngineState(engine.getState());
    });

    return () => cancelAnimationFrame(frame);
  }, [copy]);

  const stepOnce = useCallback(() => {
    if (!engineRef.current) return;
    const s = engineRef.current.getState();
    if (s.converged || s.done) { setIsPlaying(false); return; }

    if (speed === 'fast') {
      engineRef.current.skipEpochs(50);
      const snaps = engineRef.current.stepSamples(1);
      if (snaps.length > 0) setSnap(snaps[snaps.length - 1]);
    } else if (speed === 'epoch') {
      const snaps = engineRef.current.stepEpochs(1);
      if (snaps.length > 0) setSnap(snaps[snaps.length - 1]);
    } else {
      const snaps = engineRef.current.stepSamples(1);
      if (snaps.length > 0) setSnap(snaps[0]);
    }
    setEngineState(engineRef.current.getState());
  }, [speed]);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;
    const loop = () => {
      stepOnce();
      const s = engineRef.current?.getState();
      if (!cancelled && s && !s.converged && !s.done) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        setIsPlaying(false);
      }
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, stepOnce]);

  const handlePlay = () => { if (engineState && !engineState.converged && !engineState.done) setIsPlaying(true); };
  const handlePause = () => { setIsPlaying(false); if (animRef.current) cancelAnimationFrame(animRef.current); };
  const handleStep = () => { if (!isPlaying) stepOnce(); };
  const handleReset = () => {
    setIsPlaying(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (engineRef.current) {
      engineRef.current.reset();
      const snaps = engineRef.current.stepSamples(1);
      setSnap(snaps[0] ?? null);
      setEngineState(engineRef.current.getState());
    }
  };

  const tl = copy.trainingLabels;
  const ep = engineState?.epoch ?? 0;
  const mse = engineState && engineState.lossHistory.length > 0 ? engineState.lossHistory[engineState.lossHistory.length - 1] : null;

  // Determine which code range to highlight
  const codeRange = copy.codeHighlightRanges['forward-h1']; // default: show forward section active

  // Compute current accuracy from engine state
  const accuracy = useMemo(() => {
    if (!engineState) return 0;
    const w = engineState.weights;
    let correct = 0;
    for (const s of copy.dataset) {
      const z1 = w.w1.reduce((a, wi, i) => a + wi * s.inputs[i], 0) + w.b1;
      const z2 = w.w2.reduce((a, wi, i) => a + wi * s.inputs[i], 0) + w.b2;
      const h1 = Math.max(0, z1), h2 = Math.max(0, z2);
      const z3 = w.v1 * h1 + w.v2 * h2 + w.c;
      const yHat = 1 / (1 + Math.exp(-z3));
      if ((yHat >= 0.5 ? 1 : 0) === s.target) correct++;
    }
    return correct / copy.dataset.length;
  }, [engineState, copy.dataset]);

  if (!snap || !engineState) return null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 0.8fr', gap: 14, minHeight: 0 }}>

      {/* ── COL 1: Graph + Dataset + Controls ── */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', color: '#00e5ff', textTransform: 'uppercase' }}>
            {tl.archLabel}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>
            {tl.epochLabel} <span style={{ color: 'var(--sw-text)' }}>{ep}/{copy.totalEpochs}</span>
          </div>
        </div>

        {/* SVG Graph */}
        <div style={{ flex: 1.2, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <NetworkGraph snap={snap} copy={copy} />
        </div>

        {/* Dataset table */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 6, border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 8, fontWeight: 800, color: 'var(--sw-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.05em' }}>Dados de Treino</div>
          <DatasetTable snap={snap} copy={copy} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 4 }}>
          <button type="button" onClick={handleStep} disabled={isPlaying || engineState.converged || engineState.done}
            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--sw-text)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            Step
          </button>
          <button type="button" onClick={isPlaying ? handlePause : handlePlay} disabled={engineState.converged || engineState.done}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #00e5ff66', background: isPlaying ? '#00e5ff33' : '#00e5ff15', color: '#00e5ff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button type="button" onClick={handleReset}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'var(--sw-text)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            ↺
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 2 }}>
            {(['sample', 'epoch', 'fast'] as const).map(s => (
              <button key={s} type="button" onClick={() => setSpeed(s)}
                style={{ padding: '4px 8px', borderRadius: 6, border: `1px solid ${speed === s ? '#00e5ff66' : 'rgba(255,255,255,0.06)'}`, background: speed === s ? '#00e5ff20' : 'transparent', color: speed === s ? '#00e5ff' : 'var(--sw-text-dim)', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>
                {s === 'sample' ? '1×' : s === 'epoch' ? '6×' : '300×'}
              </button>
            ))}
          </div>
        </div>
      </PanelCard>

      {/* ── COL 2: Computations + Code ── */}
      <PanelCard minHeight={0} gap={12} style={{ height: '100%', padding: 14 }}>
        {/* Sample badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#00e5ff' }}>
              Amostra {snap.sampleIndex + 1}/{copy.dataset.length}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,229,255,0.3)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>Target: {snap.sample.target}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: snap.loss < 0.1 ? '#22c55e' : '#f97316' }}>
            Loss: {fmt(snap.loss, 4)}
          </span>
        </div>

        {/* Computation details */}
        <ComputationPanel snap={snap} />

        {/* Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '38%', minHeight: 120 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />
            {copy.labels.codeTitle}
          </div>
          <HighlightedCode code={copy.pythonCode} activeRange={codeRange} />
        </div>
      </PanelCard>

      {/* ── COL 3: Training metrics ── */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        {/* Epoch progress */}
        <div style={{ padding: '2px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', marginBottom: 4 }}>
            <span>{tl.epochLabel}</span>
            <span style={{ color: 'var(--sw-text)' }}>{ep}/{copy.totalEpochs}</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ height: '100%', width: `${(ep / copy.totalEpochs) * 100}%`, borderRadius: 999, background: engineState.converged ? '#22c55e' : 'linear-gradient(90deg, #00e5ff, #38bdf8)', transition: 'width 150ms' }} />
          </div>
        </div>

        {/* MSE & Accuracy Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ padding: '8px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{tl.mseLabel}</div>
            <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: engineState.converged ? '#22c55e' : '#00e5ff' }}>
              {mse !== null ? (mse < 0.001 ? mse.toFixed(5) : mse.toFixed(4)) : '—'}
            </div>
          </div>
          <div style={{ padding: '8px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{tl.accuracyLabel}</div>
            <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: accuracy === 1 ? '#22c55e' : 'var(--sw-text)' }}>
              {`${(accuracy * 100).toFixed(0)}%`}
            </div>
          </div>
        </div>

        {/* Loss chart */}
        <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)', padding: '6px 4px', flex: 1, minHeight: 60 }}>
          <div style={{ fontSize: 7, fontWeight: 800, color: 'var(--sw-text-muted)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase' }}>Histórico de Loss</div>
          <MiniLossChart history={engineState.lossHistory} total={copy.totalEpochs} threshold={copy.convergenceThreshold} />
        </div>

        {/* Converged badge */}
        {engineState.converged && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 900, color: '#22c55e', padding: '6px 0', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', boxShadow: '0 0 15px rgba(34,197,94,0.1)' }}>
            ✓ {tl.convergenceLabel}
          </div>
        )}

        {/* Prediction section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
          <div style={{ padding: '8px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#66b84a', marginBottom: 4 }}>Predição Final (ŷ)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'monospace', color: snap.yHat >= 0.5 ? '#22c55e' : '#f97316' }}>{fmt(snap.yHat)}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text)' }}>Classe {snap.yHat >= 0.5 ? '1' : '0'}</div>
                <div style={{ fontSize: 8, color: 'var(--sw-text-dim)' }}>Alvo: {snap.sample.target}</div>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>
    </div>
  );
};
