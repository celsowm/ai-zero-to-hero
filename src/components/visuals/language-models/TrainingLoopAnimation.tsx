import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { TrainingLoopAnimationCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface TrainingLoopAnimationProps {
  copy: TrainingLoopAnimationCopy;
}

type Step = 0 | 1 | 2 | 3 | 4;

const STEPS_COUNT = 5;
const STEP_COLORS = ['#00e5ff', '#a855f7', '#ef4444', '#f59e0b', '#10b981'];

export const TrainingLoopAnimation = React.memo(({ copy }: TrainingLoopAnimationProps) => {
  const [step, setStep] = useState<Step>(0);
  const [playing, setPlaying] = useState(false);
  const [epoch, setEpoch] = useState(1);
  const [lr, setLr] = useState(0.01);
  const [lossHistory, setLossHistory] = useState<number[]>([8.5]);
  const weights = useRef([
    [1.20, -0.45, 0.78, 0.33],
    [-0.90, 1.10, -0.22, 0.56],
    [0.34, 0.67, -1.05, 0.89],
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLoss = lossHistory[lossHistory.length - 1];
  const prevLoss = lossHistory.length > 1 ? lossHistory[lossHistory.length - 2] : currentLoss;

  // Simulate loss decreasing
  useEffect(() => {
    if (step === 4) {
      const drop = 0.82 + Math.random() * 0.13;
      const newLoss = Math.max(0.15, currentLoss * drop);
      setLossHistory(prev => [...prev, parseFloat(newLoss.toFixed(3))]);
      setEpoch(e => e + 1);
    }
  }, [step]);

  // Auto-play
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(s => (s + 1) % STEPS_COUNT as Step);
      }, 2200);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const handleStepClick = useCallback((s: Step) => {
    setStep(s);
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => setPlaying(p => !p), []);

  const reset = useCallback(() => {
    setPlaying(false);
    setStep(0);
    setEpoch(1);
    setLossHistory([8.5]);
  }, []);

  const stepLabels = [copy.forwardLabel, copy.softmaxLabel, copy.lossLabel, copy.backpropLabel, copy.updateLabel];
  const stepDescs = [copy.step0Desc, copy.step1Desc, copy.step2Desc, copy.step3Desc, copy.step4Desc];
  const { inputTokens, vocabOptions, correctIndex } = copy;

  // Loss curve SVG dimensions
  const chartW = 320;
  const chartH = 72;
  const chartPad = { top: 8, right: 8, bottom: 8, left: 32 };
  const plotW = chartW - chartPad.left - chartPad.right;
  const plotH = chartH - chartPad.top - chartPad.bottom;
  const maxLoss = Math.max(...lossHistory, 1);
  const points = lossHistory.map((l, i) => ({
    x: chartPad.left + (lossHistory.length > 1 ? (i / (lossHistory.length - 1)) : 0) * plotW,
    y: chartPad.top + plotH - (l / maxLoss) * plotH,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaD = points.length > 1
    ? `${pathD} L${points[points.length - 1].x.toFixed(1)},${(chartPad.top + plotH).toFixed(1)} L${points[0].x.toFixed(1)},${(chartPad.top + plotH).toFixed(1)} Z`
    : '';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      padding: '16px',
      fontFamily: sw.fontSans,
      color: sw.text,
      overflow: 'hidden',
    }}>

      {/* Header: eyebrow + step pills + epoch HUD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan, whiteSpace: 'nowrap' }}>
          training loop
        </div>

        <div style={{ flex: 1, display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {Array.from({ length: STEPS_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleStepClick(i as Step)}
              style={{
                flex: 1,
                maxWidth: '52px',
                height: '28px',
                borderRadius: '12px',
                border: `1px solid ${step === i ? `${STEP_COLORS[i]}88` : sw.borderSubtle}`,
                background: step === i ? `${STEP_COLORS[i]}22` : sw.tint,
                color: step === i ? STEP_COLORS[i] : sw.textMuted,
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 180ms ease',
                boxShadow: step === i ? `0 0 12px ${STEP_COLORS[i]}44` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Epoch HUD */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px',
          whiteSpace: 'nowrap',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.textMuted }}>
            {copy.epochLabel}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: sw.fontMono, color: sw.cyan }}>
            {epoch}
          </div>
        </div>
      </div>

      {/* Step title + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: STEP_COLORS[step],
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: `${STEP_COLORS[step]}18`,
            border: `1px solid ${STEP_COLORS[step]}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 800,
            color: STEP_COLORS[step],
          }}>
            {step + 1}
          </div>
          {stepLabels[step]}
        </div>
        <div style={{ fontSize: '13.5px', lineHeight: 1.65, color: sw.textDim }}>
          {stepDescs[step]}
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>

        {/* STEP 0: Forward Pass */}
        {step === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {inputTokens.map((t, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  background: sw.tint,
                  borderRadius: '10px',
                  border: `1px solid ${sw.borderMedium}`,
                  fontWeight: 600,
                  fontSize: '15px',
                  color: sw.text,
                }}>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ color: sw.textMuted, fontSize: '18px' }}>↓</div>
            <div style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12), rgba(168, 85, 247, 0.12))',
              borderRadius: '12px',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              fontWeight: 700,
              fontSize: '14px',
              color: '#00e5ff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Attention + MLP
            </div>
            <div style={{ color: sw.textMuted, fontSize: '18px' }}>↓</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {vocabOptions.map((v, i) => {
                const logit = (Math.random() * 4 - 2).toFixed(2);
                return (
                  <div key={i} style={{
                    padding: '8px 12px',
                    background: sw.tint,
                    borderRadius: '10px',
                    border: sw.borderSubtle,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontWeight: 600, color: sw.textDim, fontSize: '12px' }}>{v}</div>
                    <div style={{ color: sw.cyan, fontWeight: 700, fontFamily: sw.fontMono, fontSize: '14px' }}>{logit}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.textMuted }}>
              ← {copy.logitsText}
            </div>
          </div>
        )}

        {/* STEP 1: Softmax */}
        {step === 1 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '90px' }}>
              {vocabOptions.map((v, i) => {
                const probs = i === correctIndex ? 0.35 : 0.15 + Math.random() * 0.15;
                const barH = Math.round(probs * 80);
                const isCorrect = i === correctIndex;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '48px',
                      height: `${barH}px`,
                      background: isCorrect ? 'linear-gradient(180deg, #10b981, rgba(16, 185, 129, 0.3))' : sw.borderSubtle,
                      borderRadius: '6px 6px 0 0',
                      border: `1px solid ${isCorrect ? '#10b98155' : sw.borderMedium}`,
                      borderBottom: 'none',
                      transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                    <div style={{ fontWeight: 600, color: sw.textDim, fontSize: '11px' }}>{v}</div>
                    <div style={{
                      color: isCorrect ? sw.green : sw.textMuted,
                      fontWeight: 700,
                      fontFamily: sw.fontMono,
                      fontSize: '12px',
                    }}>
                      {probs.toFixed(2)}
                    </div>
                    {isCorrect && (
                      <div style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: sw.green, fontWeight: 700 }}>
                        ✓ alvo
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.textMuted }}>
              ← {copy.probsText} (Σ = 1.0)
            </div>
          </div>
        )}

        {/* STEP 2: Loss */}
        {step === 2 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
          }}>
            <div style={{
              background: `${sw.red}14`,
              borderRadius: sw.cardBorderRadiusLg,
              border: `1px solid ${sw.red}4d`,
              padding: '16px 32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.textMuted, marginBottom: '6px' }}>
                Cross-Entropy Loss
              </div>
              <div style={{
                fontSize: '44px',
                fontWeight: 800,
                fontFamily: sw.fontMono,
                color: sw.red,
                textShadow: sw.glowRed,
              }}>
                {currentLoss.toFixed(2)}
              </div>
            </div>
            <div style={{ fontSize: '13px', color: sw.textDim, textAlign: 'center', lineHeight: 1.7 }}>
              Previsto: <span style={{ color: sw.red, fontWeight: 700, fontFamily: sw.fontMono }}>0.35</span>
              {' '}·{' '}
              Ideal: <span style={{ color: sw.green, fontWeight: 700, fontFamily: sw.fontMono }}>1.00</span>
              <br />
              → Surpresa alta → Loss alta!
            </div>
          </div>
        )}

        {/* STEP 3: Backprop */}
        {step === 3 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '8px',
          }}>
            {['W_Q', 'W_K', 'W_V', 'W₁', 'W₂'].map((name, i) => {
              const grad = (Math.random() - 0.5).toFixed(3);
              const isPos = parseFloat(grad) > 0;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                  <div style={{
                    width: '44px',
                    textAlign: 'right',
                    fontWeight: 600,
                    color: sw.textDim,
                    fontFamily: sw.fontMono,
                    fontSize: '11px',
                  }}>
                    {name}
                  </div>
                  <div style={{
                    flex: 1,
                    height: '16px',
                    background: sw.tintStrong,
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${Math.min(Math.abs(parseFloat(grad)) * 120, 100)}%`,
                      height: '100%',
                      background: isPos ? 'rgba(245, 158, 11, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                      borderRadius: '4px',
                      transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>
                  <div style={{
                    color: isPos ? sw.amber : sw.red,
                    fontWeight: 700,
                    fontFamily: sw.fontMono,
                    fontSize: '11px',
                    width: '50px',
                  }}>
                    {grad}
                  </div>
                </div>
              );
            })}
            <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6280', textAlign: 'center', marginTop: '4px' }}>
              ← {copy.gradientText} (∂L/∂W)
            </div>
          </div>
        )}

        {/* STEP 4: Update */}
        {step === 4 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)' }} />
                {copy.weightsUpdated}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b6280',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}>
                LR = {lr.toFixed(4)} · Δloss = {(currentLoss - prevLoss).toFixed(3)}
              </div>
            </div>
            {/* Weight matrix */}
            <div style={{
              background: sw.tint,
              borderRadius: '10px',
              border: sw.borderSubtle,
              padding: '10px 14px',
            }}>
              {weights.current.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: ri < 2 ? '4px' : 0 }}>
                  {row.map((w, wi) => (
                    <div key={wi} style={{
                      padding: '4px 10px',
                      background: sw.tintStrong,
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontFamily: sw.fontMono,
                      fontSize: '12px',
                      color: sw.textDim,
                    }}>
                      {w.toFixed(3)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loss curve chart — always visible at bottom */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6280' }}>
            {copy.lossLabel}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            color: currentLoss < 3 ? '#10b981' : currentLoss < 6 ? '#f59e0b' : '#ef4444',
          }}>
            {currentLoss.toFixed(3)}
          </div>
        </div>
        <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} style={{ display: 'block' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(pct => (
            <line
              key={pct}
              x1={chartPad.left}
              y1={chartPad.top + pct * plotH}
              x2={chartPad.left + plotW}
              y2={chartPad.top + pct * plotH}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          {/* Area fill */}
          {areaD && <path d={areaD} fill="url(#lossGradient)" opacity="0.3" />}
          {/* Line */}
          {pathD && <path d={pathD} fill="none" stroke="url(#lossStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          {/* Current point glow */}
          {points.length > 0 && (() => {
            const last = points[points.length - 1];
            return (
              <>
                <circle cx={last.x} cy={last.y} r="6" fill={currentLoss < 3 ? '#10b981' : currentLoss < 6 ? '#f59e0b' : '#ef4444'} opacity="0.25" />
                <circle cx={last.x} cy={last.y} r="3" fill={currentLoss < 3 ? '#10b981' : currentLoss < 6 ? '#f59e0b' : '#ef4444'} />
              </>
            );
          })()}
          {/* Defs */}
          <defs>
            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="lossStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            border: `1px solid ${playing ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 229, 255, 0.4)'}`,
            background: playing ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 229, 255, 0.12)',
            color: playing ? '#ef4444' : '#00e5ff',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 180ms ease',
            whiteSpace: 'nowrap',
          }}
        >
          {playing ? copy.pauseLabel : copy.playLabel}
        </button>

        {/* Reset */}
        <button
          onClick={reset}
          style={{
            padding: '8px 14px',
            borderRadius: '12px',
            border: sw.borderSubtle,
            background: sw.tintStrong,
            color: sw.textDim,
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 180ms ease',
            whiteSpace: 'nowrap',
          }}
        >
          ↺ Reset
        </button>

        {/* LR slider */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.textMuted }}>
              {copy.lrLabel}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: sw.fontMono,
              color: sw.purple,
            }}>
              {lr.toFixed(4)}
            </span>
          </div>
          <input
            type="range"
            min="-4"
            max="-1"
            step="0.1"
            value={Math.log10(lr)}
            onChange={(e) => setLr(parseFloat(Math.pow(10, parseFloat(e.target.value)).toFixed(4)))}
            style={{ width: '100%', accentColor: '#a855f7', height: '4px' }}
          />
        </div>
      </div>

    </div>
  );
});
