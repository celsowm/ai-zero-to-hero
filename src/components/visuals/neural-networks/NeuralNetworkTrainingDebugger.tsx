import React, { useState, useEffect, useRef } from 'react';
import type { NeuralNetworkTrainingDebuggerVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { createEngine, type EngineState } from '../../../utils/neuralTrainingEngine';
import { LossChart } from './LossChart';
import { TrainingControls } from './TrainingControls';

interface NeuralNetworkTrainingDebuggerProps {
  copy: NeuralNetworkTrainingDebuggerVisualCopy;
}

const fmt = (v: number, digits = 4) => v.toFixed(digits);

/* ════════════════════ SVG Network (colored nodes per section) ════════════════════ */
const NetworkDiagram: React.FC<{
  state: EngineState;
  featureNames: string[];
}> = ({ state, featureNames }) => {
  const fwd = state.forward;
  const inputX = state.currentSample?.inputs ?? [0, 0, 0, 0];
  const h1 = fwd?.h1 ?? 0;
  const h2 = fwd?.h2 ?? 0;
  const yHat = fwd?.yHat ?? 0;
  const z1 = fwd?.z1 ?? 0;
  const z2 = fwd?.z2 ?? 0;
  const z3 = fwd?.z3 ?? 0;

  const inputY = [78, 148, 218, 288];
  const hiddenY = [114, 252];
  const outputY = 183;

  return (
    <svg viewBox="0 0 540 370" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="eg-ih" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="eg-ho" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#66b84a" />
        </linearGradient>
      </defs>

      {/* Edges: input → hidden (cyan→blue) */}
      {inputY.flatMap((y1, i) =>
        hiddenY.map((y2, j) => (
          <path key={`e-ih-${i}${j}`} d={`M142 ${y1} C200 ${y1},250 ${y2},298 ${y2}`} fill="none" stroke="url(#eg-ih)" strokeWidth={2} strokeDasharray="6 6" opacity={0.7} />
        )),
      )}
      {/* Edges: hidden → output (blue→green) */}
      {hiddenY.map((y, i) => (
        <path key={`e-ho-${i}`} d={`M392 ${y} C440 ${y},470 ${outputY},500 ${outputY}`} fill="none" stroke="url(#eg-ho)" strokeWidth={2.8} strokeDasharray="6 6" opacity={0.8} />
      ))}

      {/* ── Input nodes — cyan ── */}
      {inputY.map((y, i) => (
        <g key={`n-in-${i}`}>
          <circle cx="108" cy={y} r="18" fill="rgba(0,229,255,.12)" stroke="#00e5ff" strokeWidth="1.6" />
          <text x="108" y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#00e5ff">x{i + 1}</text>
          <rect x="16" y={y - 14} width="74" height="28" rx="8" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" />
          <text x="24" y={y} fontSize="9" fill="var(--sw-text-dim)">{featureNames[i]}</text>
          <text x="24" y={y + 12} fontSize="11" fontWeight="700" fill="var(--sw-text)">{inputX[i]?.toFixed(2)}</text>
        </g>
      ))}

      {/* ── Hidden nodes — blue ── */}
      {[{ y: hiddenY[0], v: h1, z: z1 }, { y: hiddenY[1], v: h2, z: z2 }].map((n, i) => (
        <g key={`n-hid-${i}`}>
          <circle cx="345" cy={n.y} r="24" fill="rgba(56,189,248,.12)" stroke="#38bdf8" strokeWidth="1.8" />
          <text x="345" y={n.y - 4} textAnchor="middle" fontSize="13" fontWeight="800" fill="#38bdf8">h{i + 1}</text>
          <text x="345" y={n.y + 8} textAnchor="middle" fontSize="9" fill="var(--sw-text-dim)">z={n.z.toFixed(4)}</text>
          <text x="345" y={n.y + 20} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--sw-text)">{n.v.toFixed(4)}</text>
        </g>
      ))}

      {/* ── Output node — green ── */}
      <g>
        <circle cx="540" cy={outputY} r="28" fill="rgba(102,184,74,.12)" stroke="#66b84a" strokeWidth="2" />
        <text x="540" y={outputY - 6} textAnchor="middle" fontSize="13" fontWeight="800" fill="#66b84a">ŷ</text>
        <text x="540" y={outputY + 6} textAnchor="middle" fontSize="9" fill="var(--sw-text-dim)">z3={z3.toFixed(4)}</text>
        <text x="540" y={outputY + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill={yHat >= 0.5 ? '#22c55e' : '#f97316'}>{yHat.toFixed(4)}</text>
      </g>

      {/* Section labels */}
      <text x="108" y="24" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing=".1em" fill="#00e5ff">ENTRADA</text>
      <text x="345" y="24" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing=".1em" fill="#38bdf8">OCULTA</text>
      <text x="540" y="24" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing=".1em" fill="#66b84a">SAÍDA</text>
    </svg>
  );
};

/* ════════════════════ Data table ════════════════════ */
const DataTable: React.FC<{
  state: EngineState;
  featureNames: string[];
}> = ({ state, featureNames }) => {
  const fwd = state.forward;
  const bwd = state.backward;
  const w = state.weights;
  const target = state.currentSample?.target ?? 0;
  const h1 = fwd?.h1 ?? 0;
  const h2 = fwd?.h2 ?? 0;
  const yHat = fwd?.yHat ?? 0;
  const z1 = fwd?.z1 ?? 0;
  const z2 = fwd?.z2 ?? 0;
  const z3 = fwd?.z3 ?? 0;
  const loss = fwd?.loss ?? 0;
  const inputX = state.currentSample?.inputs ?? [0, 0, 0, 0];
  const mse = state.lossHistory.length > 0 ? state.lossHistory[state.lossHistory.length - 1] : null;

  type Row = { l: string; v: string };
  const inputs: Row[] = featureNames.map((f, i) => ({ l: f, v: inputX[i].toFixed(2) }));
  const hidden: Row[] = fwd
    ? [
        { l: 'z1', v: z1.toFixed(4) },
        { l: 'z2', v: z2.toFixed(4) },
        { l: 'h1', v: h1.toFixed(4) },
        { l: 'h2', v: h2.toFixed(4) },
      ]
    : [{ l: '—', v: '—' }, { l: '—', v: '—' }, { l: '—', v: '—' }, { l: '—', v: '—' }];
  const output: Row[] = fwd
    ? [
        { l: 'z3', v: z3.toFixed(4) },
        { l: 'ŷ', v: yHat.toFixed(4) },
        { l: 'classe', v: yHat >= 0.5 ? 'sim' : 'não' },
        { l: 'alvo', v: target.toFixed(2) },
      ]
    : [{ l: '—', v: '—' }, { l: '—', v: '—' }, { l: '—', v: '—' }, { l: '—', v: '—' }];

  const metrics: Row[] = fwd
    ? [
        { l: 'lr', v: '0.2' },
        { l: 'MSE', v: mse !== null ? fmt(mse, 5) : '—' },
        { l: 'w1[0]', v: w.w1[0].toFixed(4) },
        { l: 'w2[0]', v: w.w2[0].toFixed(4) },
        { l: 'v1', v: w.v1.toFixed(4) },
        { l: 'v2', v: w.v2.toFixed(4) },
        { l: 'b1', v: w.b1.toFixed(4) },
        { l: 'b2', v: w.b2.toFixed(4) },
        { l: 'c', v: w.c.toFixed(4) },
        { l: 'loss', v: loss.toFixed(5) },
        ...(bwd ? [{ l: 'd_out', v: bwd.d_out.toFixed(4) }, { l: 'd_h1', v: bwd.d_h1.toFixed(4) }] : []),
      ]
    : [];

  const maxRows = Math.max(inputs.length, hidden.length, output.length);

  const Cell = ({ item, isYhat }: { item: Row; isYhat?: boolean }) => (
    <div style={{ padding: '3px 4px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
      <div style={{ fontSize: 8, color: 'var(--sw-text-dim)' }}>{item.l}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: isYhat ? (parseFloat(item.v) >= 0.5 ? '#22c55e' : '#f97316') : 'var(--sw-text)' }}>
        {item.v}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
      {[
        { label: 'ENTRADA', color: '#00e5ff', items: inputs },
        { label: 'OCULTA', color: '#38bdf8', items: hidden },
        { label: 'SAÍDA', color: '#66b84a', items: output },
      ].map((col) => (
        <div key={col.label} style={{ borderRadius: 8, border: `1px solid ${col.color}22`, overflow: 'hidden', background: 'rgba(255,255,255,.015)' }}>
          <div style={{ padding: '4px 5px', fontSize: 8, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: col.color, background: `${col.color}10`, textAlign: 'center' }}>
            {col.label}
          </div>
          {Array.from({ length: maxRows }, (_, ri) => {
            const item = col.items[ri] ?? { l: '', v: '—' };
            return <Cell key={ri} item={item} isYhat={col.label === 'SAÍDA' && item.l === 'ŷ'} />;
          })}
        </div>
      ))}

      {/* Metrics bar */}
      <div style={{ gridColumn: '1 / -1', borderRadius: 8, border: '1px solid rgba(249,115,22,.15)', overflow: 'hidden', background: 'rgba(255,255,255,.015)' }}>
        <div style={{ padding: '3px 5px', fontSize: 8, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#f97316', background: 'rgba(249,115,22,.08)', textAlign: 'center' }}>
          MÉTRICAS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(metrics.length, 6)}, 1fr)` }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ padding: '3px 4px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,.04)', borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid rgba(255,255,255,.03)' }}>
              <div style={{ fontSize: 7.5, color: 'var(--sw-text-dim)' }}>{m.l}</div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--sw-text)' }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════ Main ════════════════════ */
export const NeuralNetworkTrainingDebugger: React.FC<NeuralNetworkTrainingDebuggerProps> = ({ copy }) => {
  const engineRef = useRef<ReturnType<typeof createEngine> | null>(null);
  const [engineState, setEngineState] = useState<EngineState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const engine = createEngine({
      dataset: copy.dataset.map((d) => ({ inputs: d.inputs, target: d.target })),
      learningRate: copy.learningRate,
      totalEpochs: copy.totalEpochs,
      convergenceThreshold: copy.convergenceThreshold,
      seed: 42,
    });
    engine.runEpochs(0);
    engineRef.current = engine;
    const frame = requestAnimationFrame(() => setEngineState(engine.getState()));
    return () => cancelAnimationFrame(frame);
  }, [copy]);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;
    const loop = () => {
      if (!engineRef.current) return;
      const s = engineRef.current.runEpochs(speed);
      setEngineState(s);
      if (!cancelled && !s.converged && !s.trainingDone && isPlaying) {
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
  }, [isPlaying, speed]);

  const handlePlay = () => {
    if (!engineRef.current || engineState?.converged || engineState?.trainingDone) return;
    setIsPlaying(true);
  };
  const handlePause = () => { setIsPlaying(false); if (animRef.current) cancelAnimationFrame(animRef.current); };
  const handleReset = () => {
    if (!engineRef.current) return;
    setIsPlaying(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    engineRef.current.reset();
    engineRef.current.runEpochs(0);
    setEngineState(engineRef.current.getState());
  };
  const handleSkip = () => {
    if (!engineRef.current) return;
    setIsPlaying(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    engineRef.current.skipToEnd();
    setEngineState(engineRef.current.getState());
  };

  if (!engineState) return null;

  const statusText = engineState.converged ? copy.statusConverged : engineState.trainingDone ? copy.statusDone : isPlaying ? copy.statusTraining : copy.statusPaused;
  const mse = engineState.lossHistory.length > 0 ? engineState.lossHistory[engineState.lossHistory.length - 1] : null;
  const pct = (engineState.epoch / copy.totalEpochs) * 100;

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12, minHeight: 0 }}>
      {/* ── LEFT: Network SVG + tables ── */}
      <PanelCard minHeight={0} gap={6} style={{ height: '100%', padding: 10 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#00e5ff' }}>
              Época {engineState.epoch} / {copy.totalEpochs}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--sw-text)' }}>
              {engineState.converged ? 'Convergiu!' : engineState.trainingDone ? 'Treino completo' : engineState.epoch === 0 ? 'Pronto para treinar' : 'Treinando...'}
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: engineState.converged ? '#22c55e' : 'var(--sw-text)' }}>
            MSE: {mse !== null ? fmt(mse, 5) : '—'}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 3, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,.06)' }}>
          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: engineState.converged ? '#22c55e' : 'linear-gradient(90deg,#00e5ff,#ff2e97)' }} />
        </div>

        {/* SVG — colored nodes per section */}
        <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>
          <NetworkDiagram state={engineState} featureNames={copy.featureNames} />
        </div>

        {/* Compact tables */}
        <DataTable state={engineState} featureNames={copy.featureNames} />
      </PanelCard>

      {/* ── RIGHT: Info + chart + controls ── */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%' }}>
        <div style={{ display: 'grid', gap: 3 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#00e5ff' }}>{copy.archLabel}</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.45, color: 'var(--sw-text-dim)' }}>{copy.subtitle}</div>
        </div>

        {/* Loss chart */}
        <div style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,.06)', padding: '8px 10px', background: 'rgba(255,255,255,.02)' }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 3 }}>{copy.lossLabel}</div>
          <LossChart lossHistory={engineState.lossHistory} totalEpochs={copy.totalEpochs} convergenceThreshold={copy.convergenceThreshold} accent="#00e5ff" />
        </div>

        {/* Controls */}
        <TrainingControls
          isPlaying={isPlaying}
          speed={speed}
          epoch={engineState.epoch}
          totalEpochs={copy.totalEpochs}
          mse={mse}
          converged={engineState.converged}
          trainingDone={engineState.trainingDone}
          statusText={statusText}
          accent="#00e5ff"
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          onSkip={handleSkip}
          onSpeedChange={setSpeed}
          copy={{
            playLabel: copy.playLabel,
            pauseLabel: copy.pauseLabel,
            resetLabel: copy.resetLabel,
            speedLabel: copy.speedLabel,
            epochLabel: copy.epochLabel,
            lossLabel: copy.lossLabel,
          }}
        />
      </PanelCard>
    </div>
  );
};
