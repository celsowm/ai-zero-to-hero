import React, { useMemo, useState } from 'react';
import type { TransformersJsPlaygroundCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: TransformersJsPlaygroundCopy;
}

type TaskKey = 'text-generation' | 'sentiment' | 'embeddings' | 'zero-shot';
type StepKey = 'import' | 'load' | 'tokenize' | 'inference' | 'decode';

const TASK_KEYS: TaskKey[] = ['text-generation', 'sentiment', 'embeddings', 'zero-shot'];
const TASK_COLORS: Record<TaskKey, string> = {
  'text-generation': sw.cyan,
  'sentiment': sw.pink,
  'embeddings': sw.purple,
  'zero-shot': sw.green,
};

const STEP_KEYS: StepKey[] = ['import', 'load', 'tokenize', 'inference', 'decode'];
const STEP_COLORS: Record<StepKey, string> = {
  import: '#93a4bb',
  load: sw.cyan,
  tokenize: sw.purple,
  inference: sw.pink,
  decode: sw.green,
};

const MOCK_TOKEN_IDS = [464, 2152, 287, 18492, 318];

const SAMPLE_OUTPUT: Record<TaskKey, string[]> = {
  'text-generation': ['...', ' brilliant', ',', ' transformative', '.', ' ', 'It', ' will'],
  'sentiment': [],
  'embeddings': [],
  'zero-shot': [],
};

function tokenize(input: string): Array<{ token: string; id: number }> {
  const parts = input.trim().split(/\s+/);
  return parts.map((t, i) => ({ token: t, id: MOCK_TOKEN_IDS[i % MOCK_TOKEN_IDS.length] + i * 37 }));
}

function fmtId(id: number): string {
  return String(id).padStart(5, ' ');
}

export const TransformersJsPlayground = React.memo(({ copy }: Props) => {
  const [task, setTask] = useState<TaskKey>('text-generation');
  const [input, setInput] = useState('The future of AI is');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState<StepKey>('import');
  const [genIndex, setGenIndex] = useState(0);
  const [sentScores, setSentScores] = useState({ positive: 0, negative: 0 });
  const [embeddings, setEmbeddings] = useState<Array<{ x: number; y: number; label: string }>>([]);
  const [zsScores, setZsScores] = useState<Array<{ label: string; value: number }>>([]);
  const [speedMs, setSpeedMs] = useState(0);

  const tokens = useMemo(() => tokenize(input), [input]);

  const runtime = useMemo(() => {
    if (typeof navigator !== 'undefined' && navigator.gpu) {
      return 'WebGPU';
    }
    return 'WASM';
  }, []);

  const run = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setActiveStep('import');
    setGenIndex(0);
    setSentScores({ positive: 0, negative: 0 });
    setEmbeddings([]);
    setZsScores([]);

    const steps: StepKey[] = ['import', 'load', 'tokenize', 'inference', 'decode'];
    let idx = 0;

    const tick = () => {
      if (idx >= steps.length) {
        setRunning(false);
        setProgress(100);
        setSpeedMs(Math.round(40 + Math.random() * 30));
        return;
      }
      setActiveStep(steps[idx]);
      setProgress(((idx + 1) / steps.length) * 100);

      if (steps[idx] === 'decode') {
        if (task === 'text-generation') {
          let g = 0;
          const items = SAMPLE_OUTPUT['text-generation'];
          const iv = setInterval(() => {
            g++;
            setGenIndex(g);
            if (g >= items.length) clearInterval(iv);
          }, 350);
        } else if (task === 'sentiment') {
          const pos = 0.72 + Math.random() * 0.2;
          setSentScores({ positive: pos, negative: 1 - pos });
        } else if (task === 'embeddings') {
          const pts = tokenize(input).map((t) => ({
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            label: t.token,
          }));
          setEmbeddings(pts);
        } else if (task === 'zero-shot') {
          const labels = [copy.taskLabel, 'technology', 'science'];
          let remaining = 1;
          const raw = labels.map((_, i) => {
            const v = Math.random() * remaining;
            remaining -= v;
            return { label: labels[i], value: v > 0 ? v : 0 };
          });
          const total = raw.reduce((s: number, r: { value: number }) => s + r.value, 0);
          setZsScores(
            raw.map((r: { label: string; value: number }, i: number) => ({ label: labels[i], value: r.value / total }))
          );
        }
      }

      idx++;
      setTimeout(tick, 500);
    };
    setTimeout(tick, 300);
  };

  const taskColor = TASK_COLORS[task];

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* Task selector */}
        <PanelCard minHeight={0} padding={14} gap={10} style={{ background: sw.tintStrong }}>
          <span style={{ fontSize: 10, color: sw.textDim, textTransform: 'uppercase', letterSpacing: '.12em' }}>
            {copy.taskLabel}
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TASK_KEYS.map((tk) => (
              <button
                key={tk}
                type="button"
                onClick={() => setTask(tk)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 10,
                  border: `1px solid ${tk === task ? taskColor : sw.borderSubtle}`,
                  background: tk === task ? `${taskColor}16` : sw.tint,
                  color: tk === task ? taskColor : sw.textDim,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: sw.fontMono,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tk}
              </button>
            ))}
          </div>
        </PanelCard>

        {/* Input + Run */}
        <PanelCard minHeight={0} padding={14} gap={10}>
          <label style={{ fontSize: 10, color: sw.textDim, textTransform: 'uppercase', letterSpacing: '.12em' }}>
            {copy.inputLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            style={{
              width: '100%',
              background: sw.tintStrong,
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 10,
              color: sw.text,
              fontFamily: sw.fontMono,
              fontSize: 13,
              padding: '10px 12px',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            onClick={run}
            disabled={running}
            style={{
              alignSelf: 'flex-start',
              padding: '8px 24px',
              borderRadius: 10,
              border: `1px solid ${running ? sw.borderSubtle : taskColor}`,
              background: running ? sw.tint : `${taskColor}18`,
              color: running ? sw.textMuted : taskColor,
              fontSize: 13,
              fontWeight: 800,
              cursor: running ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {running ? `${Math.round(progress)}%` : copy.runLabel}
          </button>
        </PanelCard>

        {/* Pipeline panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 14, minHeight: 0, flex: 1 }}>

          {/* Tokenizer */}
          <PanelCard
            minHeight={0}
            padding={16}
            gap={10}
            style={{
              background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
            }}
          >
            <span style={{ fontSize: 10, color: sw.purple, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.tokenizerTitle}
            </span>
            <span style={{ fontSize: 11, color: sw.textDim, lineHeight: 1.5 }}>{copy.tokenizerDesc}</span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {tokens.map((t, i) => (
                <div
                  key={`${t.token}-${i}`}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: `${sw.purple}10`,
                    border: `1px solid ${sw.purple}33`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <span style={{ fontSize: 12, color: sw.text, fontFamily: sw.fontMono, fontWeight: 700 }}>{t.token}</span>
                  <span style={{ fontSize: 10, color: sw.purple, fontFamily: sw.fontMono }}>{fmtId(t.id)}</span>
                </div>
              ))}
            </div>

            <span style={{ fontSize: 10, color: sw.textMuted }}>{copy.tokensLabel}: {tokens.length}</span>

            {/* Model panel */}
            <div style={{ marginTop: 6, padding: '12px 14px', borderRadius: 12, background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}` }}>
              <span style={{ fontSize: 10, color: taskColor, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.modelTitle}
              </span>
              <span style={{ fontSize: 11, color: sw.textDim, lineHeight: 1.5, display: 'block', marginTop: 4 }}>
                {copy.modelDesc}
              </span>

              {/* Progress bar */}
              <div style={{ marginTop: 10, height: 6, background: sw.tint, borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${sw.cyan}, ${taskColor})`,
                    transition: 'width 0.4s ease',
                    borderRadius: 3,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10, color: sw.textDim, fontFamily: sw.fontMono }}>
                  {runtime}
                </span>
                <span style={{ fontSize: 10, color: sw.textMuted, fontFamily: sw.fontMono }}>
                  {progress > 0 ? `${Math.round(progress)}%` : ''}
                </span>
              </div>
            </div>

            {/* Speed info */}
            {progress >= 100 && (
              <div style={{ padding: '8px 12px', borderRadius: 10, background: `${sw.green}10`, border: `1px solid ${sw.green}22` }}>
                <span style={{ fontSize: 10, color: sw.green, fontWeight: 800, fontFamily: sw.fontMono }}>
                  ~{speedMs} {copy.msUnit}
                </span>
                <span style={{ fontSize: 10, color: sw.textDim, marginLeft: 8 }}>
                  {copy.speedLabel}
                </span>
              </div>
            )}
          </PanelCard>

          {/* Output */}
          <PanelCard
            minHeight={0}
            padding={16}
            gap={10}
            style={{
              background: `linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))`,
            }}
          >
            <span style={{ fontSize: 10, color: taskColor, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.outputTitle}
            </span>
            <span style={{ fontSize: 11, color: sw.textDim, lineHeight: 1.5 }}>{copy.outputDesc}</span>

            {task === 'text-generation' && (
              <div style={{ marginTop: 8, padding: '12px 14px', borderRadius: 10, background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}` }}>
                <span style={{ fontSize: 13, color: sw.text, fontFamily: sw.fontMono, lineHeight: 1.7 }}>
                  {input}
                  {SAMPLE_OUTPUT['text-generation']
                    .slice(0, genIndex)
                    .map((t, i) => (
                      <span key={i} style={{ color: sw.cyan, fontWeight: 700 }}>{t}</span>
                    ))}
                  <span style={{ color: sw.cyan, animation: 'blink 1s step-end infinite' }}>▊</span>
                </span>
              </div>
            )}

            {task === 'sentiment' && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Bar label={copy.positiveLabel} value={sentScores.positive} color={sw.green} />
                <Bar label={copy.negativeLabel} value={sentScores.negative} color={sw.red} />
              </div>
            )}

            {task === 'embeddings' && (
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 10, color: sw.textMuted, marginBottom: 4, display: 'block' }}>
                  {copy.embeddingTitle}
                </span>
                <svg viewBox="0 0 300 200" width="100%" height="160" style={{ display: 'block' }}>
                  {embeddings.map((pt, i) => (
                    <g key={i}>
                      <circle cx={150 + pt.x * 120} cy={100 + pt.y * 80} r={6} fill={`${taskColor}88`} stroke={taskColor} strokeWidth={1.5} />
                      <text x={150 + pt.x * 120 + 10} y={100 + pt.y * 80 + 4} fill={sw.textDim} fontSize={10} fontFamily={sw.fontMono}>
                        {pt.label}
                      </text>
                    </g>
                  ))}
                  <line x1={150} x2={150} y1={10} y2={190} stroke={sw.borderSubtle} strokeDasharray="4 6" />
                  <line x1={10} x2={290} y1={100} y2={100} stroke={sw.borderSubtle} strokeDasharray="4 6" />
                </svg>
              </div>
            )}

            {task === 'zero-shot' && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {zsScores.map((s, i) => (
                  <Bar key={i} label={s.label} value={s.value} color={taskColor} />
                ))}
              </div>
            )}

            {progress < 100 && !running && (
              <div style={{ marginTop: 12, padding: '20px 14px', borderRadius: 10, border: `1px dashed ${sw.borderMedium}`, textAlign: 'center' }}>
                <span style={{ fontSize: 12, color: sw.textMuted }}>{copy.outputDesc}</span>
              </div>
            )}
          </PanelCard>
        </div>

        {/* Stepper */}
        <PanelCard
          minHeight={0}
          padding={16}
          gap={10}
          style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 10, color: sw.cyan, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 12, color: sw.textDim }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {activeStep === 'import' && copy.step1Label}
                {activeStep === 'load' && copy.step2Label}
                {activeStep === 'tokenize' && copy.step3Label}
                {activeStep === 'inference' && copy.step4Label}
                {activeStep === 'decode' && copy.step5Label}
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8 }}>
            {STEP_KEYS.map((sk, index) => {
              const isActive = sk === activeStep;
              const isDone = STEP_KEYS.indexOf(sk) < STEP_KEYS.indexOf(activeStep);
              return (
                <button
                  key={sk}
                  type="button"
                  onClick={() => !running && setActiveStep(sk)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 10px 8px',
                    borderRadius: 12,
                    border: `1px solid ${isActive ? STEP_COLORS[sk] : isDone ? `${STEP_COLORS[sk]}44` : sw.borderSubtle}`,
                    background: isActive ? `${STEP_COLORS[sk]}14` : isDone ? `${STEP_COLORS[sk]}08` : sw.tint,
                    opacity: isDone || isActive ? 1 : 0.55,
                    cursor: running ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: STEP_COLORS[sk], fontWeight: 900 }}>{index + 1}</span>
                    {isDone && <span style={{ fontSize: 10, color: sw.green }}>&#10003;</span>}
                  </div>
                  <div style={{ fontSize: 11, color: STEP_COLORS[sk], fontWeight: 800, lineHeight: 1.3, marginBottom: 4 }}>
                    {sk === 'import' && copy.step1Label}
                    {sk === 'load' && copy.step2Label}
                    {sk === 'tokenize' && copy.step3Label}
                    {sk === 'inference' && copy.step4Label}
                    {sk === 'decode' && copy.step5Label}
                  </div>
                  <div style={{ fontSize: 10.5, color: sw.textDim, lineHeight: 1.4 }}>
                    {sk === 'import' && copy.step1Body}
                    {sk === 'load' && copy.step2Body}
                    {sk === 'tokenize' && copy.step3Body}
                    {sk === 'inference' && copy.step4Body}
                    {sk === 'decode' && copy.step5Body}
                  </div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

const Bar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: 11, color: sw.textDim, fontWeight: 700 }}>{label}</span>
      <span style={{ fontSize: 11, color, fontFamily: sw.fontMono, fontWeight: 800 }}>
        {value > 0 ? `${(value * 100).toFixed(1)}%` : '—'}
      </span>
    </div>
    <div style={{ height: 8, background: sw.tint, borderRadius: 4, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${value * 100}%`,
          background: color,
          transition: 'width 0.6s ease',
          borderRadius: 4,
        }}
      />
    </div>
  </div>
);
