import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { TrainingLoopAnimationCopy } from '../../../types/slide';

interface TrainingLoopAnimationProps {
  copy: TrainingLoopAnimationCopy;
}

type Step = 0 | 1 | 2 | 3 | 4;

const STEPS_COUNT = 5;

export const TrainingLoopAnimation = React.memo(({ copy }: TrainingLoopAnimationProps) => {
  const [step, setStep] = useState<Step>(0);
  const [playing, setPlaying] = useState(false);
  const [epoch, setEpoch] = useState(1);
  const [lr, setLr] = useState(0.01);
  const [loss, setLoss] = useState(8.5);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const weights = useRef([
    [1.20, -0.45, 0.78, 0.33],
    [-0.90, 1.10, -0.22, 0.56],
    [0.34, 0.67, -1.05, 0.89],
  ]);

  const prevWeights = useRef(weights.current.map(r => [...r]));

  const stepColors = ['#3b82f6', '#a855f7', '#ef4444', '#f59e0b', '#10b981'];
  const stepLabels = [
    copy.forwardLabel,
    copy.softmaxLabel,
    copy.lossLabel,
    copy.backpropLabel,
    copy.updateLabel,
  ];
  const stepDescs = [
    copy.step0Desc,
    copy.step1Desc,
    copy.step2Desc,
    copy.step3Desc,
    copy.step4Desc,
  ];

  // Simulate loss decreasing over epochs
  useEffect(() => {
    if (step === 4) {
      // After update step, drop loss and increment epoch
      const newLoss = Math.max(0.5, loss * (0.85 + Math.random() * 0.1));
      setLoss(parseFloat(newLoss.toFixed(2)));
      setEpoch(e => e + 1);
    }
  }, [step]);

  // Auto-play
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(s => {
          const next = (s + 1) % STEPS_COUNT as Step;
          if (next === 0) setEpoch(e => e + 1);
          return next;
        });
      }, 2000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const handleStepClick = useCallback((s: Step) => {
    setStep(s);
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying(p => !p);
  }, []);

  // Compute weight changes for display
  const displayWeights = weights.current;
  if (step === 4) {
    // Simulate weight update
    const gradient = (Math.random() - 0.5) * lr * 2;
    weights.current = weights.current.map(row =>
      row.map(w => parseFloat((w - gradient).toFixed(3)))
    );
  }

  // Network nodes for forward pass visualization
  const inputTokens = ['O', 'gato', 'senta'];
  const vocabOptions = ['sentou', 'comeu', 'dormiu', 'correu'];

  return (
    <div style={{
      width: '100%',
      padding: '28px',
      background: '#0f172a',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
      fontSize: '14px',
    }}>

      {/* Step indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
        {Array.from({ length: STEPS_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleStepClick(i as Step)}
            style={{
              flex: 1,
              height: '36px',
              borderRadius: '10px',
              border: 'none',
              background: step >= i ? stepColors[i] : '#1e293b',
              color: '#fff',
              fontWeight: '700',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: step === i ? `0 0 16px ${stepColors[i]}88` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: step >= i ? 1 : 0.5,
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Main visualization area */}
      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        border: `2px solid ${stepColors[step]}44`,
        padding: '20px',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.3s',
      }}>

        {/* Step label */}
        <div style={{
          fontSize: '16px',
          fontWeight: '700',
          color: stepColors[step],
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: stepColors[step],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '800',
          }}>
            {step + 1}
          </div>
          {stepLabels[step]}
        </div>

        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
          {stepDescs[step]}
        </div>

        {/* STEP 0: Forward Pass */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Input tokens */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {inputTokens.map((t, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  background: '#334155',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  color: '#e2e8f0',
                }}>
                  {t}
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '20px' }}>↓</div>

            {/* MLP / Attention Box */}
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d1b4e 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '16px',
              color: '#fff',
              border: '1px solid #4338ca',
            }}>
              Attention + MLP
            </div>

            {/* Arrow down */}
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '20px' }}>↓</div>

            {/* Logits */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {vocabOptions.map((v, i) => {
                const logit = (Math.random() * 4 - 2).toFixed(2);
                return (
                  <div key={i} style={{
                    padding: '6px 12px',
                    background: '#334155',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '12px',
                  }}>
                    <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '13px' }}>{v}</div>
                    <div style={{ color: '#3b82f6', fontWeight: '700', fontSize: '14px' }}>{logit}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
              ← {copy.logitsText}
            </div>
          </div>
        )}

        {/* STEP 1: Softmax */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {vocabOptions.map((v, i) => {
                // Simulate one token being correct (index 0 = "sentou")
                const probs = i === 0 ? 0.35 : 0.15 + Math.random() * 0.15;
                const barWidth = Math.round(probs * 100);
                const isCorrect = i === 0;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    width: '70px',
                  }}>
                    <div style={{
                      width: `${barWidth}%`,
                      maxWidth: '60px',
                      height: `${barWidth}px`,
                      background: isCorrect ? '#10b981' : '#64748b',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.5s',
                    }} />
                    <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '11px' }}>{v}</div>
                    <div style={{ color: isCorrect ? '#10b981' : '#94a3b8', fontWeight: '700', fontSize: '13px' }}>
                      {probs.toFixed(2)}
                    </div>
                    {isCorrect && (
                      <div style={{ fontSize: '10px', color: '#10b981', fontWeight: '700' }}>✓ alvo</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
              ← {copy.probsText} (soma = 1.0)
            </div>
          </div>
        )}

        {/* STEP 2: Loss */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{
              background: '#0f172a',
              borderRadius: '12px',
              padding: '20px 32px',
              textAlign: 'center',
              border: '2px solid #ef4444',
            }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                Cross-Entropy Loss
              </div>
              <div style={{
                fontSize: '42px',
                fontWeight: '800',
                color: '#ef4444',
              }}>
                {loss.toFixed(2)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                (quanto menor, melhor)
              </div>
            </div>
            <div style={{
              fontSize: '13px',
              color: '#94a3b8',
              textAlign: 'center',
              lineHeight: '1.5',
            }}>
              Prob. prevista para "sentou": <span style={{ color: '#ef4444', fontWeight: '700' }}>0.35</span>
              <br />
              Prob. ideal (one-hot): <span style={{ color: '#10b981', fontWeight: '700' }}>1.00</span>
              <br />
              → Surpresa alta → loss alta!
            </div>
          </div>
        )}

        {/* STEP 3: Backprop */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Gradient flow visualization */}
            <div style={{
              background: '#0f172a',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {['Attention W_Q', 'Attention W_K', 'Attention W_V', 'MLP W₁', 'MLP W₂'].map((name, i) => {
                const grad = (Math.random() - 0.5).toFixed(3);
                const isPositive = parseFloat(grad) > 0;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '13px',
                  }}>
                    <div style={{
                      width: '100px',
                      textAlign: 'right',
                      color: '#e2e8f0',
                      fontWeight: '600',
                      fontSize: '12px',
                    }}>
                      {name}
                    </div>
                    <div style={{
                      flex: 1,
                      height: '20px',
                      background: '#1e293b',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <div style={{
                        width: `${Math.abs(parseFloat(grad)) * 100}%`,
                        height: '100%',
                        background: isPositive ? '#f59e0b' : '#ef4444',
                        transition: 'width 0.5s',
                        borderRadius: '4px',
                      }} />
                    </div>
                    <div style={{
                      color: isPositive ? '#f59e0b' : '#ef4444',
                      fontWeight: '700',
                      fontSize: '12px',
                      width: '55px',
                    }}>
                      {grad}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
              ← {copy.gradientText} (∂L/∂W)
            </div>
          </div>
        )}

        {/* STEP 4: Update */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ textAlign: 'center', color: '#10b981', fontWeight: '700', fontSize: '15px' }}>
              ✓ {copy.weightsUpdated}
            </div>

            {/* Weight matrix display */}
            <div style={{
              background: '#0f172a',
              borderRadius: '10px',
              padding: '14px',
            }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', textAlign: 'center' }}>
                Pesos da camada (exemplo)
              </div>
              {displayWeights.map((row, ri) => (
                <div key={ri} style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '6px',
                }}>
                  {row.map((w, wi) => {
                    const prev = prevWeights.current[ri]?.[wi] ?? w;
                    const changed = w !== prev;
                    return (
                      <div key={wi} style={{
                        padding: '6px 10px',
                        background: changed ? '#064e3b' : '#1e293b',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '13px',
                        color: changed ? '#34d399' : '#e2e8f0',
                        transition: 'all 0.5s',
                        minWidth: '50px',
                        textAlign: 'center',
                      }}>
                        {w.toFixed(3)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Loss drop animation */}
            <div style={{
              background: '#064e3b',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center',
              border: '1px solid #10b981',
            }}>
              <span style={{ color: '#34d399', fontWeight: '700' }}>
                {copy.lossDropped} → {loss.toFixed(2)}
              </span>
            </div>

            {/* Epoch counter */}
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
              {copy.epochLabel}: {epoch} | {copy.lossLabel}: {loss.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Controls: Play/Pause + Learning Rate */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            background: playing ? '#ef4444' : '#10b981',
            color: '#fff',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {playing ? copy.pauseLabel : copy.playLabel}
        </button>

        {/* LR Slider */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
            <span>{copy.lrLabel}</span>
            <span>{lr.toFixed(4)}</span>
          </div>
          <input
            type="range"
            min="-4"
            max="-1"
            step="0.1"
            value={Math.log10(lr)}
            onChange={(e) => {
              const val = Math.pow(10, parseFloat(e.target.value));
              setLr(parseFloat(val.toFixed(4)));
            }}
            style={{
              width: '100%',
              accentColor: '#f59e0b',
            }}
          />
        </div>
      </div>

    </div>
  );
});
