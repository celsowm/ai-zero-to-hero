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

const NetworkGraph: React.FC<{ 
  snap: SampleSnapshot; 
  copy: NeuralNetworkStepDebuggerVisualCopy; 
  activePhase: 'init' | 'forward' | 'backprop' | 'update';
  onHover: (text: string | null) => void;
}> = ({ snap, copy, activePhase, onHover }) => {
  const x = snap.sample.inputs, w = snap.weightsAfter;
  const iY = [48, 98, 148, 198], hY = [80, 168], oY = 124;

  const isFwd = activePhase === 'forward';
  const isBwd = activePhase === 'backprop';
  const isUpd = activePhase === 'update';

  const t = copy.tooltips;

  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="ah_fwd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="ah_bwd" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#ff2e97" />
        </marker>
        <style>{`
          @keyframes fl_fwd { from { stroke-dashoffset: 20 } to { stroke-dashoffset: 0 } }
          @keyframes fl_bwd { from { stroke-dashoffset: 0 } to { stroke-dashoffset: 20 } }
          @keyframes pulse { 0% { stroke-opacity: 0.4; } 50% { stroke-opacity: 1; stroke-width: 3.5; } 100% { stroke-opacity: 0.4; } }
          .g-item { cursor: help; pointer-events: all; }
        `}</style>
      </defs>

      {/* Layer Labels */}
      <text x="58" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isFwd ? '#00e5ff' : 'var(--sw-text-dim)'} style={{ transition: 'all 300ms' }}>{copy.labels.inputLayer}</text>
      <text x="210" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isFwd || isBwd ? '#38bdf8' : 'var(--sw-text-dim)'} style={{ transition: 'all 300ms' }}>{copy.labels.hiddenLayer}</text>
      <text x="332" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isFwd || isBwd ? '#66b84a' : 'var(--sw-text-dim)'} style={{ transition: 'all 300ms' }}>{copy.labels.outputLayer}</text>

      {/* Edges input→hidden */}
      {iY.flatMap((y1, i) => hY.map((y2, j) => {
        const wv = j === 0 ? w.w1[i] : w.w2[i];
        const color = isBwd ? '#ff2e97' : '#38bdf8';
        const midX = 130, midY = y1 + (y2 - y1) * 0.45;
        return (
          <g key={`ih${i}${j}`} className="g-item" onMouseEnter={() => onHover(t.weight)} onMouseLeave={() => onHover(null)}>
            <path d={`M80 ${y1} C120 ${y1},148 ${y2},180 ${y2}`} fill="none"
              stroke={color} strokeWidth={Math.max(0.6, Math.min(3, Math.abs(wv) * 6))}
              strokeDasharray="4 4" opacity={isUpd ? 1 : 0.4}
              markerEnd={isFwd ? "url(#ah_fwd)" : "none"}
              markerStart={isBwd ? "url(#ah_bwd)" : "none"}
              style={{
                animation: isFwd ? 'fl_fwd 1.2s linear infinite' : isBwd ? 'fl_bwd 1.2s linear infinite' : isUpd ? 'pulse 1s ease-in-out infinite' : 'none',
                transition: 'stroke 300ms'
              }} />
            <g transform={`translate(${midX}, ${midY})`}>
              <rect x="-8" y="-4.5" width="16" height="7" rx="2" fill="rgba(0,0,0,0.6)" />
              <text textAnchor="middle" fontSize="5" fontWeight="700" fill={wv >= 0 ? '#38bdf8' : '#f43f5e'}>{fmt(wv, 2)}</text>
            </g>
          </g>
        );
      }))}

      {/* Edges hidden→output */}
      {hY.map((y, i) => {
        const wv = i === 0 ? w.v1 : w.v2;
        const color = isBwd ? '#ff2e97' : '#66b84a';
        const midX = 275, midY = y + (oY - y) * 0.5;
        return (
          <g key={`ho${i}`} className="g-item" onMouseEnter={() => onHover(t.weight)} onMouseLeave={() => onHover(null)}>
            <path d={`M240 ${y} C268 ${y},284 ${oY},310 ${oY}`} fill="none"
              stroke={color} strokeWidth={Math.max(0.8, Math.min(3.5, Math.abs(wv) * 5))}
              strokeDasharray="4 4" opacity={isUpd ? 1 : 0.4}
              markerEnd={isFwd ? "url(#ah_fwd)" : "none"}
              markerStart={isBwd ? "url(#ah_bwd)" : "none"}
              style={{
                animation: isFwd ? 'fl_fwd 1s linear infinite' : isBwd ? 'fl_bwd 1s linear infinite' : isUpd ? 'pulse 0.8s ease-in-out infinite' : 'none',
                transition: 'stroke 300ms'
              }} />
             <g transform={`translate(${midX}, ${midY})`}>
              <rect x="-8" y="-4.5" width="16" height="7" rx="2" fill="rgba(0,0,0,0.6)" />
              <text textAnchor="middle" fontSize="5" fontWeight="700" fill={wv >= 0 ? '#66b84a' : '#f43f5e'}>{fmt(wv, 2)}</text>
            </g>
          </g>
        );
      })}

      {/* Input nodes */}
      {iY.map((y, i) => (
        <g key={`in${i}`} className="g-item" opacity={isFwd ? 1 : 0.6} style={{ transition: 'all 300ms' }} onMouseEnter={() => onHover(t.input)} onMouseLeave={() => onHover(null)}>
          <circle cx="58" cy={y} r="14" fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth={isFwd ? 1.5 : 0.8} />
          <text x="58" y={y + 1} textAnchor="middle" fontSize="8" fontWeight="900" fill="#00e5ff">x{i + 1}</text>
          <text x="58" y={y + 11} textAnchor="middle" fontSize="6" fill="var(--sw-text-dim)">{fmt(x[i], 2)}</text>
          <text x="10" y={y + 3} fontSize="6.5" fill="var(--sw-text-dim)">{copy.featureNames[i]}</text>
        </g>
      ))}

      {/* Hidden nodes */}
      {[
        { y: hY[0], l: 'h1', h: snap.h1, z: snap.z1 },
        { y: hY[1], l: 'h2', h: snap.h2, z: snap.z2 },
      ].map(n => (
        <g key={n.l} className="g-item" opacity={isFwd || isBwd ? 1 : 0.6} style={{ transition: 'all 300ms' }} onMouseEnter={() => onHover(t.hidden)} onMouseLeave={() => onHover(null)}>
          <circle cx="210" cy={n.y} r={isBwd ? 20 : 18} fill="rgba(56,189,248,0.08)" stroke={isBwd ? '#ff2e97' : '#38bdf8'} strokeWidth={isFwd || isBwd ? 1.5 : 0.8} />
          <text x="210" y={n.y - 3} textAnchor="middle" fontSize="9" fontWeight="900" fill={isBwd ? '#ff2e97' : '#38bdf8'}>{n.l}</text>
          <text x="210" y={n.y + 7} textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--sw-text)">{fmt(n.h)}</text>
          <text x="210" y={n.y + 16} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">z={fmt(n.z)}</text>
        </g>
      ))}

      {/* Output node */}
      <g className="g-item" opacity={isFwd || isBwd ? 1 : 0.6} style={{ transition: 'all 300ms' }} onMouseEnter={() => onHover(t.output)} onMouseLeave={() => onHover(null)}>
        <circle cx="332" cy={oY} r={isBwd ? 24 : 22} fill="rgba(102,184,74,0.08)" stroke={isBwd ? '#ff2e97' : '#66b84a'} strokeWidth={isFwd || isBwd ? 2 : 1} />
        <text x="332" y={oY - 5} textAnchor="middle" fontSize="10" fontWeight="900" fill={isBwd ? '#ff2e97' : '#66b84a'}>ŷ</text>
        <text x="332" y={oY + 6} textAnchor="middle" fontSize="8" fontWeight="700" fill={snap.yHat >= 0.5 ? '#22c55e' : '#f97316'}>{fmt(snap.yHat)}</text>
        <text x="332" y={oY + 16} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">z3={fmt(snap.z3)}</text>
      </g>

      {/* Phase Label in SVG */}
      <g transform="translate(10, 225)">
        <rect width="100" height="12" rx="4" fill="rgba(0,0,0,0.3)" />
        <text x="5" y="9" fontSize="7" fontWeight="900" letterSpacing=".05em" fill={isFwd ? '#00e5ff' : isBwd ? '#ff2e97' : '#a78bfa'}>
          {activePhase.toUpperCase()} {isFwd ? 'PASS' : isBwd ? 'PROP' : 'WEIGHTS'}
        </text>
      </g>

      {/* Target Bottom */}
      <text x="332" y="232" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)">target={fmt(snap.sample.target, 1)}</text>
    </svg>
  );
};

/* ═══════════════════ Mini Loss Chart ═══════════════════ */

const MiniLossChart: React.FC<{ history: number[]; total: number; threshold: number }> = ({ history, total, threshold }) => {
  if (history.length < 2) return null;
  const w = 200, h = 60, pad = { t: 6, r: 4, b: 12, l: 28 };
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

const ComputationPanel: React.FC<{ snap: SampleSnapshot; activePhase: 'init' | 'forward' | 'backprop' | 'update' }> = ({ snap, activePhase }) => {
  const wb = snap.weightsBefore;
  const sections = [
    { id: 'forward', title: 'Forward', color: '#38bdf8', rows: [
      { l: 'z1=Σ(w1·x)+b1', v: fmt(snap.z1) }, { l: 'h1=relu(z1)', v: fmt(snap.h1) },
      { l: 'z2=Σ(w2·x)+b2', v: fmt(snap.z2) }, { l: 'h2=relu(z2)', v: fmt(snap.h2) },
      { l: `z3=Σ(v·h)+c`, v: fmt(snap.z3) },
      { l: 'ŷ=σ(z3)', v: fmt(snap.yHat) },
    ]},
    { id: 'forward', title: 'Loss', color: '#f97316', rows: [
      { l: `(ŷ−y)²`, v: fmt(snap.loss, 6) },
    ]},
    { id: 'backprop', title: 'Backprop', color: '#ff2e97', rows: [
      { l: 'd_out=ŷ−y', v: fmt(snap.d_out) },
      { l: 'd_z3=d_out·ŷ(1−ŷ)', v: fmt(snap.d_z3) },
      { l: 'd_z1', v: fmt(snap.d_z1) }, { l: 'd_z2', v: fmt(snap.d_z2) },
    ]},
    { id: 'update', title: 'Update', color: '#a78bfa', rows: [
      ...snap.grad_w1.slice(0, 2).map((_, i) => ({ l: `w1[${i}]`, v: `${fmt(wb.w1[i])}→${fmt(snap.weightsAfter.w1[i])}` })),
      { l: 'v1', v: `${fmt(wb.v1)}→${fmt(snap.weightsAfter.v1)}` },
      { l: 'v2', v: `${fmt(wb.v2)}→${fmt(snap.weightsAfter.v2)}` },
    ]},
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, minHeight: 0, overflowY: 'auto', padding: '4px 6px 4px 4px', alignContent: 'start' }}>
      {sections.map(sec => (
        <div key={sec.title} style={{
          padding: '8px 10px', borderRadius: 12,
          background: activePhase === sec.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${activePhase === sec.id ? sec.color : 'rgba(255,255,255,0.06)'}`,
          boxShadow: activePhase === sec.id ? `0 0 0 1px ${sec.color}, 0 0 15px ${sec.color}22` : 'none',
          display: 'flex', flexDirection: 'column', gap: 4,
          transition: 'all 250ms ease',
          zIndex: activePhase === sec.id ? 1 : 0,
        }}>
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

/* ═══════════════════ MAIN ═══════════════════ */

export const NeuralNetworkStepDebugger: React.FC<Props> = ({ copy }) => {
  const engineRef = useRef<ReturnType<typeof createTrainingDebugger> | null>(null);
  const [snap, setSnap] = useState<SampleSnapshot | null>(null);
  const [engineState, setEngineState] = useState<TrainingDebuggerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'sample' | 'epoch' | 'fast'>('sample');
  const [phase, setPhase] = useState<'init' | 'forward' | 'backprop' | 'update'>('init');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const engine = createTrainingDebugger({
      dataset: copy.dataset.map(d => ({ inputs: d.inputs, target: d.target })),
      learningRate: copy.learningRate,
      initialWeights: copy.initialWeights,
      totalEpochs: copy.totalEpochs,
      convergenceThreshold: copy.convergenceThreshold,
    });
    engineRef.current = engine;
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
    let lastTime = 0;
    const loop = (time: number) => {
      const dt = time - lastTime;
      const delay = speed === 'fast' ? 16 : speed === 'epoch' ? 100 : 400;
      if (dt > delay) {
        lastTime = time;
        setPhase(p => {
          if (speed === 'fast') { stepOnce(); return 'update'; }
          if (p === 'init') return 'forward';
          if (p === 'forward') return 'backprop';
          if (p === 'backprop') return 'update';
          stepOnce();
          return 'forward';
        });
      }
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
  }, [isPlaying, speed, stepOnce]);

  const handlePlay = () => { if (engineState && !engineState.converged && !engineState.done) setIsPlaying(true); };
  const handlePause = () => { setIsPlaying(false); if (animRef.current) cancelAnimationFrame(animRef.current); };
  const handleStep = () => {
    if (isPlaying) return;
    if (phase === 'init') setPhase('forward');
    else if (phase === 'forward') setPhase('backprop');
    else if (phase === 'backprop') setPhase('update');
    else {
      stepOnce();
      setPhase('forward');
    }
  };
  const handleReset = () => {
    setIsPlaying(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (engineRef.current) {
      engineRef.current.reset();
      const snaps = engineRef.current.stepSamples(1);
      setSnap(snaps[0] ?? null);
      setEngineState(engineRef.current.getState());
      setPhase('init');
    }
  };

  const tl = copy.trainingLabels;
  const ep = engineState?.epoch ?? 0;
  const mse = engineState && engineState.lossHistory.length > 0 ? engineState.lossHistory[engineState.lossHistory.length - 1] : null;
  const codeRange = copy.codeHighlightRanges[phase];
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
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 0.6fr', gap: 14, minHeight: 0, position: 'relative' }}>
      
      {/* Custom Tooltip */}
      {activeTooltip && (
        <div style={{
          position: 'absolute', top: 20, left: 20, zIndex: 100,
          padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          maxWidth: 240, pointerEvents: 'none', animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ fontSize: 11, color: 'var(--sw-text)', lineHeight: 1.4, fontWeight: 500 }}>
            {activeTooltip}
          </div>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* COL 1 */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.04em', color: '#00e5ff', textTransform: 'uppercase' }}>{tl.archLabel}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>{tl.epochLabel} <span style={{ color: 'var(--sw-text)' }}>{ep}/{copy.totalEpochs}</span></div>
        </div>
        <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <NetworkGraph snap={snap} copy={copy} activePhase={phase} onHover={setActiveTooltip} />
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 4 }}>
          <button type="button" onClick={handleStep} disabled={isPlaying || engineState.converged || engineState.done} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--sw-text)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Step</button>
          <button type="button" onClick={isPlaying ? handlePause : handlePlay} disabled={engineState.converged || engineState.done} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #00e5ff66', background: isPlaying ? '#00e5ff33' : '#00e5ff15', color: '#00e5ff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{isPlaying ? '⏸' : '▶'}</button>
          <button type="button" onClick={handleReset} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'var(--sw-text)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>↺</button>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 2 }}>
            {(['sample', 'epoch', 'fast'] as const).map(s => (
              <button key={s} type="button" onClick={() => setSpeed(s)} style={{ padding: '4px 8px', borderRadius: 6, border: `1px solid ${speed === s ? '#00e5ff66' : 'rgba(255,255,255,0.06)'}`, background: speed === s ? '#00e5ff20' : 'transparent', color: speed === s ? '#00e5ff' : 'var(--sw-text-dim)', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>{s === 'sample' ? '1×' : s === 'epoch' ? '6×' : '300×'}</button>
            ))}
          </div>
        </div>
      </PanelCard>
      <PanelCard minHeight={0} gap={12} style={{ height: '100%', padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: '#00e5ff' }}>Amostra {snap.sampleIndex + 1}/{copy.dataset.length}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,229,255,0.3)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{phase}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: snap.loss < 0.1 ? '#22c55e' : '#f97316' }}>Loss: {fmt(snap.loss, 4)}</span>
        </div>
        <ComputationPanel snap={snap} activePhase={phase} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 120 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />{copy.labels.codeTitle}
          </div>
          <HighlightedCode code={copy.pythonCode} activeRange={codeRange} />
        </div>
      </PanelCard>
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <div style={{ padding: '2px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', marginBottom: 4 }}>
            <span>{tl.epochLabel}</span><span style={{ color: 'var(--sw-text)' }}>{ep}/{copy.totalEpochs}</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ height: '100%', width: `${(ep / copy.totalEpochs) * 100}%`, borderRadius: 999, background: engineState.converged ? '#22c55e' : 'linear-gradient(90deg, #00e5ff, #38bdf8)', transition: 'width 150ms' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ padding: '8px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{tl.mseLabel}</div>
            <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: engineState.converged ? '#22c55e' : '#00e5ff' }}>{mse !== null ? (mse < 0.001 ? mse.toFixed(5) : mse.toFixed(4)) : '—'}</div>
          </div>
          <div style={{ padding: '8px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{tl.accuracyLabel}</div>
            <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: accuracy === 1 ? '#22c55e' : 'var(--sw-text)' }}>{`${(accuracy * 100).toFixed(0)}%`}</div>
          </div>
        </div>
        <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)', padding: '6px 4px', minHeight: 70 }}>
          <div style={{ fontSize: 7, fontWeight: 800, color: 'var(--sw-text-muted)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase' }}>Histórico de Loss</div>
          <MiniLossChart history={engineState.lossHistory} total={copy.totalEpochs} threshold={copy.convergenceThreshold} />
        </div>
        {engineState.converged && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 900, color: '#22c55e', padding: '6px 0', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', boxShadow: '0 0 15px rgba(34,197,94,0.1)' }}>✓ {tl.convergenceLabel}</div>
        )}
        <div style={{ marginTop: 6, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'init' ? '#94a3b8' : phase === 'forward' ? '#38bdf8' : phase === 'backprop' ? '#ff2e97' : '#a78bfa' }} />
            <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--sw-text-dim)' }}>Entenda o Passo</div>
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--sw-text)', fontWeight: 500, fontStyle: 'italic' }}>{copy.phaseExplanations[phase]}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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
