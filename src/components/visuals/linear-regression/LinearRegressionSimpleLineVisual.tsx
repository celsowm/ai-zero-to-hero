import React, { useState, useEffect } from 'react';
import { PanelCard } from '../PanelCard';
import { Calendar } from 'lucide-react';

interface LinearRegressionSimpleLineVisualProps {
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    xLabel: string;
    yLabel: string;
    lineLabel: string;
    ageLabel: string;
    footer: string;
    coefficients: {
      beta0: number;
      beta1: number;
      beta2: number;
    };
    dataset: Array<{
      height: number;
      age: number;
      realWeight: number;
      accent: string;
      label: string;
    }>;
  };
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 12,
};

const badgeStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 10px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--sw-text)',
  background: `${accent}18`,
  border: `1px solid ${accent}35`,
});

export const LinearRegressionSimpleLineVisual = React.memo(({ copy }: LinearRegressionSimpleLineVisualProps) => {
  const [age, setAge] = useState(28);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 0.02;
        if (current >= 1) {
          setProgress(1);
          clearInterval(interval);
        } else {
          setProgress(current);
        }
      }, 20);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const { beta0, beta1, beta2 } = copy.coefficients;

  // Chart coordinates mapping
  // X: 160-180 -> 70-450
  // Y: 40-80 -> 236-32
  const mapX = (height: number) => 70 + ((height - 155) / (185 - 155)) * (450 - 70);
  const mapY = (weight: number) => 236 - ((weight - 40) / (85 - 40)) * (236 - 32);

  const predict = (h: number, a: number) => beta0 + beta1 * h + beta2 * a;

  const hStart = 155;
  const hEnd = 185;
  const yStart = predict(hStart, age);
  const yEnd = predict(hEnd, age);

  const x1 = mapX(hStart);
  const y1 = mapY(yStart);
  const x2 = mapX(hEnd);
  const y2 = mapY(yEnd);

  // Animated line end point
  const x2Anim = x1 + (x2 - x1) * progress;
  const y2Anim = y1 + (y2 - y1) * progress;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PanelCard>
        <div style={eyebrowStyle}>{copy.eyebrow}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--sw-text)', marginBottom: 8 }}>{copy.title}</div>
        <p style={{ margin: '0 0 20px 0', fontSize: 14, lineHeight: 1.7, color: 'var(--sw-text-dim)' }}>{copy.description}</p>

        <div style={{ display: 'grid', gap: 20 }}>
          <div
            style={{
              padding: 20,
              borderRadius: 18,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={16} color="var(--sw-pink)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sw-text)' }}>{copy.ageLabel}: {age} anos</span>
              </div>
              <div style={badgeStyle('#fbbf24')}>
                ŷ = {beta0} + {beta1}h + {beta2}({age})
              </div>
            </div>
            <input
              type="range"
              min="18"
              max="45"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                appearance: 'none',
                background: 'rgba(255,255,255,0.1)',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--sw-text-muted)' }}>
              <span>18 anos</span>
              <span>45 anos</span>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              borderRadius: 18,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: 16,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <svg viewBox="0 0 520 300" style={{ display: 'block', width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#ff2e97" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[70, 133, 196, 259, 322, 385, 448].map(x => (
                <line key={x} x1={x} y1="32" x2={x} y2="236" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}
              {[40, 89, 138, 187, 236].map(y => (
                <line key={y} x1="70" y1={y} x2="470" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}

              {/* Axes */}
              <line x1="70" y1="236" x2="470" y2="236" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="70" y1="236" x2="70" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

              {/* Regression Line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2Anim}
                y2={y2Anim}
                stroke="url(#line-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={0.8}
              />

              {/* Data Points */}
              {copy.dataset.map(point => {
                const px = mapX(point.height);
                const py = mapY(point.realWeight);
                const isSelected = Math.abs(point.age - age) < 2;

                return (
                  <g key={point.label} style={{ transition: 'all 0.3s ease' }}>
                    <circle 
                      cx={px} 
                      cy={py} 
                      r={isSelected ? 8 : 4} 
                      fill={point.accent} 
                      opacity={isSelected ? 1 : 0.2}
                      style={{ filter: isSelected ? `drop-shadow(0 0 8px ${point.accent})` : 'none' }}
                    />
                    {isSelected && (
                      <text
                        x={px}
                        y={py - 12}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="var(--sw-text)"
                      >
                        {point.height}cm / {point.realWeight}kg
                      </text>
                    )}
                  </g>
                );
              })}

              <text x="270" y="275" textAnchor="middle" fontSize="12" fill="var(--sw-text-muted)" fontWeight="600">{copy.xLabel}</text>
              <text x="25" y="135" transform="rotate(-90 25 135)" textAnchor="middle" fontSize="12" fill="var(--sw-text-muted)" fontWeight="600">{copy.yLabel}</text>
            </svg>
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: 12.5,
            lineHeight: 1.6,
            color: 'var(--sw-text-muted)',
          }}
        >
          {copy.footer}
        </div>
      </PanelCard>
    </div>
  );
});
