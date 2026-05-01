import React, { useState, useCallback, useRef, useEffect } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

export interface WebLLMSimulatorCopy {
  title: string; subtitle: string; modelLabel: string; quantLabel: string;
  vramLabel: string; promptLabel: string; generateLabel: string;
  tokenizerTitle: string; tokenizerDesc: string; inferenceTitle: string;
  inferenceDesc: string; outputTitle: string; outputDesc: string;
  stepperTitle: string; stepFocusLabel: string;
  step1Label: string; step1Body: string; step2Label: string; step2Body: string;
  step3Label: string; step3Body: string; step4Label: string; step4Body: string;
  loadingLabel: string; tokenLabel: string; tokUnit: string;
  vramUsedLabel: string; speedLabel: string;
  fitsLabel: string; noFitsLabel: string; q4Label: string; q8Label: string;
}

interface Props { copy: WebLLMSimulatorCopy; }

const MODELS = [
  { id: 'phi3', name: 'Phi-3', params: 3.8, layers: 32, hiddenDim: 3072 },
  { id: 'llama3', name: 'Llama-3', params: 8, layers: 32, hiddenDim: 4096 },
  { id: 'mistral', name: 'Mistral', params: 7, layers: 32, hiddenDim: 4096 },
];
const QUANTS = { q4: { bpp: 0.5 }, q8: { bpp: 1.0 } };
const BROWSER_VRAM_LIMIT = 8;
const KV_DTYPE_SIZE = 2, SEQ_LEN = 2048, LAYER_OVERHEAD = 0.08, OVERHEAD_BASE = 0.5;
const SAMPLE_TOKENS = ['Ola', ',', ' como', ' posso', ' ajudar', '?', ' Estou', ' aqui', ' para', ' ajudar', ' voce', '.', ' Vamos', ' comecar', '!'];

type StepKey = 'load' | 'tokenize' | 'generate' | 'output';
const STEP_KEYS: StepKey[] = ['load', 'tokenize', 'generate', 'output'];
const STEP_COLORS: Record<StepKey, string> = { load: '#06b6d4', tokenize: '#a855f7', generate: '#ff2e97', output: '#10b981' };
const fmt = (v: number, d = 1) => v.toFixed(d);

export const WebLLMSimulator = React.memo(({ copy }: Props) => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [quantKey, setQuantKey] = useState<'q4' | 'q8'>('q4');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState<StepKey>('load');
  const [tokensGenerated, setTokensGenerated] = useState(0);
  const [tokPerSec, setTokPerSec] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const model = MODELS[selectedModel];
  const quant = QUANTS[quantKey];

  const memory = React.useMemo(() => {
    const weightsGb = model.params * quant.bpp;
    const kvGb = model.layers * 2 * model.hiddenDim * SEQ_LEN * KV_DTYPE_SIZE / 1e9;
    const overheadGb = model.layers * LAYER_OVERHEAD + OVERHEAD_BASE;
    return { weightsGb, kvGb, overheadGb, totalGb: weightsGb + kvGb + overheadGb, fits: weightsGb + kvGb + overheadGb <= BROWSER_VRAM_LIMIT };
  }, [model, quant]);

  const startGeneration = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    setOutput(''); setTokensGenerated(0); setTokPerSec(0); setIsGenerating(true); setActiveStep('load');
    setTimeout(() => {
      setActiveStep('tokenize');
      setTimeout(() => {
        setActiveStep('generate');
        let idx = 0, count = 0;
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
          if (idx >= SAMPLE_TOKENS.length || count >= 30) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsGenerating(false); setActiveStep('output');
            const elapsed = (Date.now() - startTime) / 1000;
            setTokPerSec(count / elapsed); setTokensGenerated(count); return;
          }
          setOutput((prev) => prev + SAMPLE_TOKENS[idx]);
          idx = (idx + 1) % SAMPLE_TOKENS.length; count++; setTokensGenerated(count);
          const elapsed = (Date.now() - startTime) / 1000;
          if (elapsed > 0) setTokPerSec(count / elapsed);
        }, 120 + Math.random() * 80);
      }, 600);
    }, 800);
  }, [prompt, isGenerating]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [output]);

  const kvPct = Math.min((memory.kvGb / BROWSER_VRAM_LIMIT) * 100, 100);
  const wPct = Math.min((memory.weightsGb / BROWSER_VRAM_LIMIT) * 100, 100);
  const totalPct = Math.min((memory.totalGb / BROWSER_VRAM_LIMIT) * 100, 100);
  const stepLabels = [copy.step1Label, copy.step2Label, copy.step3Label, copy.step4Label];
  const stepBodies = [copy.step1Body, copy.step2Body, copy.step3Body, copy.step4Body];

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* Header */}
        <PanelCard padding={14} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: sw.cyan }}>{copy.title}</span>
            <span style={{ fontSize: 9, color: sw.textMuted }}>{copy.subtitle}</span>
          </div>
        </PanelCard>

        {/* Model + Quant */}
        <PanelCard padding={14} gap={12} style={{ background: sw.tintStrong }}>
          <ModelSelector label={copy.modelLabel} models={MODELS} selected={selectedModel} onSelect={setSelectedModel} color={sw.cyan} />
          <QuantSelector label={copy.quantLabel} q4Label={copy.q4Label} q8Label={copy.q8Label} selected={quantKey} onSelect={setQuantKey} />
        </PanelCard>

        {/* VRAM Calculator */}
        <PanelCard padding={12} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: sw.pink, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{copy.vramLabel}</span>
            <span style={{ fontSize: 10, fontWeight: 900, fontFamily: sw.fontMono, color: memory.fits ? sw.green : sw.red, padding: '2px 8px', borderRadius: 4, background: memory.fits ? '#10b98115' : '#ef444415', border: `1px solid ${memory.fits ? sw.green : sw.red}33` }}>
              {memory.fits ? copy.fitsLabel : copy.noFitsLabel}
            </span>
          </div>
          <div style={{ fontSize: 9, color: sw.textDim, marginBottom: 8 }}>
            {model.name} ({model.params}B) -- {quantKey === 'q4' ? copy.q4Label : copy.q8Label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <MemoryBar label={copy.modelLabel} pct={wPct} value={memory.weightsGb} color={sw.cyan} />
            <MemoryBar label="KV Cache" pct={kvPct} value={memory.kvGb} color={sw.purple} />
            <MemoryBar label="Overhead" pct={Math.max(0, totalPct - wPct - kvPct)} value={memory.overheadGb} color={sw.textMuted} />
          </div>
          <div style={{ marginTop: 8, padding: '4px 8px', borderRadius: 4, background: sw.tintStronger, textAlign: 'center' }}>
            <span style={{ fontSize: 12, fontFamily: sw.fontMono, fontWeight: 900, color: memory.fits ? sw.green : sw.red }}>{fmt(memory.totalGb)} / {BROWSER_VRAM_LIMIT} GB</span>
          </div>
        </PanelCard>

        {/* Prompt + Generate */}
        <PanelCard padding={14} gap={10} style={{ background: sw.tintStrong }}>
          <span style={{ fontSize: 10, color: sw.cyan, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{copy.promptLabel}</span>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating} rows={3} style={textareaStyle(isGenerating)} />
          <button onClick={startGeneration} disabled={isGenerating || !prompt.trim()} style={generateBtnStyle(isGenerating)}>
            {isGenerating ? copy.loadingLabel : copy.generateLabel}
          </button>
        </PanelCard>

        {/* Output */}
        <PanelCard padding={12} style={{ background: sw.tintStrong, minHeight: 100 }}>
          <div style={{ fontSize: 10, color: sw.green, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>{copy.outputTitle}</div>
          <div ref={outputRef} style={outputStyle}>
            {output}{isGenerating && <span style={cursorStyle} />}
            {!output && !isGenerating && <span style={{ color: sw.textMuted, fontStyle: 'italic' }}>{copy.outputDesc}</span>}
          </div>
        </PanelCard>

        {/* Performance Monitor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <PerfReadout label={copy.speedLabel} value={`${tokPerSec.toFixed(1)} ${copy.tokUnit}`} color={tokPerSec > 10 ? sw.green : tokPerSec > 5 ? sw.yellow : sw.pink} />
          <PerfReadout label={copy.tokenLabel} value={`${tokensGenerated}`} color={sw.cyan} />
          <PerfReadout label={copy.vramUsedLabel} value={`${fmt(memory.totalGb)} GB`} color={sw.purple} />
        </div>

        {/* KV Cache Visualization */}
        <PanelCard padding={12} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: sw.purple, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>KV Cache</span>
            <span style={{ fontSize: 9, color: sw.textDim, fontFamily: sw.fontMono }}>{tokensGenerated} tokens</span>
          </div>
          {/* Weights segment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 60, fontSize: 8, color: sw.cyan, fontWeight: 700 }}>Weights</span>
            <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${wPct}%`, height: '100%', background: sw.cyan, borderRadius: 3, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ width: 44, fontSize: 8, color: sw.cyan, fontFamily: sw.fontMono, fontWeight: 700, textAlign: 'right' }}>{fmt(memory.weightsGb, 2)} GB</span>
          </div>
          {/* KV segment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ width: 60, fontSize: 8, color: sw.purple, fontWeight: 700 }}>KV</span>
            <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${kvPct}%`, height: '100%', background: sw.purple, borderRadius: 3, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ width: 44, fontSize: 8, color: sw.purple, fontFamily: sw.fontMono, fontWeight: 700, textAlign: 'right' }}>{fmt(memory.kvGb, 2)} GB</span>
          </div>
          {/* Total bar */}
          <div style={{ height: 24, background: sw.tint, borderRadius: 6, border: `1px solid ${sw.borderSubtle}`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: `${totalPct}%`, height: '100%', background: `linear-gradient(90deg, ${sw.cyan}40, ${sw.purple}60)`, borderRadius: 6, transition: 'width 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
              {totalPct > 15 && <span style={{ fontSize: 9, color: sw.text, fontWeight: 800, fontFamily: sw.fontMono }}>{fmt(memory.totalGb, 1)} GB</span>}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 8, color: sw.textMuted }}>
            <span>0 GB</span><span>{BROWSER_VRAM_LIMIT} GB (WebGPU limit)</span>
          </div>
        </PanelCard>

        {/* Stepper */}
        <PanelCard padding={14} gap={10} style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: sw.green, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{copy.stepperTitle}</span>
            <span style={{ fontSize: 11, color: sw.textDim }}>{copy.stepFocusLabel}: <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>{stepLabels[STEP_KEYS.indexOf(activeStep)]}</span></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              return (
                <button key={step} onClick={() => setActiveStep(step)} style={{
                  textAlign: 'left', padding: '10px 10px', borderRadius: 10,
                  border: `1px solid ${isActive ? STEP_COLORS[step] : sw.borderSubtle}`,
                  background: isActive ? `${STEP_COLORS[step]}12` : sw.tint,
                  boxShadow: isActive ? `0 0 0 1px ${STEP_COLORS[step]}30, 0 0 10px ${STEP_COLORS[step]}10` : 'none',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}>
                  <div style={{ fontSize: 9, color: STEP_COLORS[step], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>{idx + 1}</div>
                  <div style={{ fontSize: 10.5, color: sw.text, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>{stepLabels[idx]}</div>
                  <div style={{ fontSize: 10, color: sw.textMuted, lineHeight: 1.5 }}>{stepBodies[idx]}</div>
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

const ModelSelector: React.FC<{ label: string; models: typeof MODELS; selected: number; onSelect: (i: number) => void; color: string }> = ({ label, models, selected, onSelect, color }) => (
  <div>
    <span style={{ fontSize: 10, color, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</span>
    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      {models.map((m, idx) => (
        <button key={m.id} onClick={() => onSelect(idx)} style={{
          flex: 1, padding: '7px 8px', borderRadius: 6,
          border: selected === idx ? `2px solid ${color}` : `1px solid ${sw.borderSubtle}`,
          background: selected === idx ? `${color}18` : sw.tint,
          color: selected === idx ? color : sw.textMuted, cursor: 'pointer',
          fontSize: 11, fontWeight: selected === idx ? 800 : 600, fontFamily: sw.fontMono,
        }}>{m.name} ({m.params}B)</button>
      ))}
    </div>
  </div>
);

const QuantSelector: React.FC<{ label: string; q4Label: string; q8Label: string; selected: 'q4' | 'q8'; onSelect: (k: 'q4' | 'q8') => void }> = ({ label, q4Label, q8Label, selected, onSelect }) => (
  <div>
    <span style={{ fontSize: 10, color: sw.purple, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</span>
    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      {(['q4', 'q8'] as const).map((q) => (
        <button key={q} onClick={() => onSelect(q)} style={{
          flex: 1, padding: '7px 8px', borderRadius: 6,
          border: selected === q ? `2px solid ${sw.purple}` : `1px solid ${sw.borderSubtle}`,
          background: selected === q ? '#a855f718' : sw.tint,
          color: selected === q ? sw.purple : sw.textMuted, cursor: 'pointer',
          fontSize: 11, fontWeight: 800, fontFamily: sw.fontMono,
        }}>{q === 'q4' ? q4Label : q8Label}</button>
      ))}
    </div>
  </div>
);

const MemoryBar: React.FC<{ label: string; pct: number; value: number; color: string }> = ({ label, pct, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ width: 60, fontSize: 9, color, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ width: `${Math.max(0, Math.min(pct, 100))}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.3s ease' }} />
    </div>
    <span style={{ width: 44, fontSize: 9, color, fontFamily: sw.fontMono, fontWeight: 700, textAlign: 'right' }}>{fmt(value, 2)}</span>
  </div>
);

const PerfReadout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '8px 10px', borderRadius: 8, background: sw.tintStrong, border: `1px solid ${color}25`, textAlign: 'center' }}>
    <div style={{ fontSize: 8, color: sw.textMuted, textTransform: 'uppercase', fontWeight: 900, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 16, color, fontFamily: sw.fontMono, fontWeight: 900 }}>{value}</div>
  </div>
);

const textareaStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${sw.borderSubtle}`,
  background: sw.tint, color: sw.text, fontSize: 12, fontFamily: sw.fontMono,
  resize: 'vertical', outline: 'none', boxSizing: 'border-box', opacity: disabled ? 0.6 : 1,
});

const generateBtnStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '10px 20px', borderRadius: 8, border: `1px solid ${sw.pink}44`,
  background: disabled ? sw.tint : '#ff2e9720', color: disabled ? sw.textMuted : sw.pink,
  cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 900,
  letterSpacing: '.08em', textTransform: 'uppercase', transition: sw.transitionFast,
});

const outputStyle: React.CSSProperties = {
  padding: '10px 12px', borderRadius: 6, background: sw.tint, border: `1px solid ${sw.borderSubtle}`,
  minHeight: 60, maxHeight: 140, overflowY: 'auto', fontSize: 12, fontFamily: sw.fontMono,
  color: sw.text, lineHeight: 1.6,
};

const cursorStyle: React.CSSProperties = {
  display: 'inline-block', width: 2, height: '1em', background: sw.pink, marginLeft: 1,
  animation: 'blink 1s step-end infinite',
};
