import React, { useState } from 'react';
import { Activity, ArrowRight, FunctionSquare, Scale, UserRound } from 'lucide-react';
import type { LinearRegressionTabsCopy } from '../../../types/slide';

interface LinearRegressionTabsVisualProps {
  copy: LinearRegressionTabsCopy;
}

const iconSize = 16;

const tabButtonStyle = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: '12px 14px',
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.01em',
  color: active ? '#091018' : 'var(--sw-text-dim)',
  background: active
    ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.95), rgba(168, 85, 247, 0.92))'
    : 'rgba(255, 255, 255, 0.04)',
  boxShadow: active ? '0 12px 30px rgba(0, 229, 255, 0.12)' : 'none',
  transition: 'all 180ms ease',
});

const cardStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 18,
  padding: 20,
  background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.92), rgba(14, 13, 24, 0.94))',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.24)',
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 12,
};

const FormulaPanel: React.FC<{ copy: LinearRegressionTabsCopy['formulaPanel'] }> = ({ copy }) => (
  <div style={cardStyle}>
    <div style={eyebrowStyle}>{copy.eyebrow}</div>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '16px 18px',
        borderRadius: 16,
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        marginBottom: 16,
      }}
    >
      <FunctionSquare size={18} color="var(--sw-yellow)" />
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--sw-text)',
          lineHeight: 1.25,
          wordBreak: 'break-word',
        }}
      >
        {copy.formula}
      </div>
    </div>

    <p
      style={{
        margin: '0 0 18px 0',
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--sw-text-dim)',
      }}
    >
      {copy.description}
    </p>

    <div style={{ display: 'grid', gap: 10 }}>
      {copy.points.map(point => (
        <div
          key={point.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 12px',
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: point.accent,
              flexShrink: 0,
              boxShadow: `0 0 18px ${point.accent}55`,
            }}
          />
          <span style={{ fontSize: 13.5, color: 'var(--sw-text)', lineHeight: 1.5 }}>{point.label}</span>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        fontSize: 12.5,
        color: 'var(--sw-text-muted)',
      }}
    >
      {copy.footer}
    </div>
  </div>
);

const GraphPanel: React.FC<{ copy: LinearRegressionTabsCopy['graphPanel'] }> = ({ copy }) => (
  <div style={cardStyle}>
    <div style={eyebrowStyle}>{copy.eyebrow}</div>

    <div
      style={{
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--sw-text)',
        marginBottom: 8,
      }}
    >
      {copy.title}
    </div>

    <p
      style={{
        margin: '0 0 18px 0',
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--sw-text-dim)',
      }}
    >
      {copy.description}
    </p>

    <div
      style={{
        display: 'grid',
        gap: 14,
        padding: 16,
        borderRadius: 16,
        background:
          'radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 46, 151, 0.10), transparent 35%), rgba(255,255,255,0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {copy.chart ? (
        <div
          style={{
            width: '100%',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: 12,
          }}
        >
          <svg
            viewBox="0 0 520 300"
            width="100%"
            height="auto"
            role="img"
            aria-label={copy.chart.lineLabel}
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="lr-line-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#ff2e97" />
              </linearGradient>
              <linearGradient id="lr-chart-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.015)" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="520" height="300" rx="12" fill="url(#lr-chart-bg)" />

            {[70, 120, 170, 220, 270, 320, 370, 420, 470].map(x => (
              <line key={x} x1={x} y1="32" x2={x} y2="236" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {[40, 80, 120, 160, 200].map(y => (
              <line key={y} x1="70" y1={y} x2="470" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            <line x1="70" y1="236" x2="470" y2="236" stroke="rgba(255,255,255,0.35)" strokeWidth="2.2" />
            <line x1="70" y1="236" x2="70" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="2.2" />

            <line
              x1={copy.chart.lineStart.x}
              y1={copy.chart.lineStart.y}
              x2={copy.chart.lineEnd.x}
              y2={copy.chart.lineEnd.y}
              stroke="url(#lr-line-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {copy.chart.residuals?.map(residual => {
              const topY = Math.min(residual.yReal, residual.yPred);
              const height = Math.abs(residual.yReal - residual.yPred);
              return (
                <g key={residual.label}>
                  <line
                    x1={residual.x}
                    y1={residual.yPred}
                    x2={residual.x}
                    y2={residual.yReal}
                    stroke={residual.accent}
                    strokeWidth="2.4"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                  <circle cx={residual.x} cy={residual.yPred} r="5" fill="rgba(232,228,240,0.95)" stroke={residual.accent} strokeWidth="2" />
                  <circle cx={residual.x} cy={residual.yReal} r="5.5" fill={residual.accent} />
                  <text
                    x={residual.x + 12}
                    y={topY + height / 2 + 4}
                    fontSize="12"
                    fontFamily="Space Grotesk, Inter, sans-serif"
                    fill="rgba(232,228,240,0.85)"
                  >
                    {residual.label}
                  </text>
                </g>
              );
            })}

            {copy.chart.points.map(point => (
              <g key={point.label}>
                <circle cx={point.x} cy={point.y} r="7.5" fill="rgba(0,0,0,0.20)" />
                <circle cx={point.x} cy={point.y} r="5.5" fill={point.accent} />
                <text
                  x={point.x}
                  y={point.y + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="Space Grotesk, Inter, sans-serif"
                  fill="rgba(232,228,240,0.86)"
                >
                  {point.label}
                </text>
              </g>
            ))}

            <text x="500" y="58" textAnchor="end" fontSize="12" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.75)">
              {copy.chart.lineLabel}
            </text>
            <text x="270" y="284" textAnchor="middle" fontSize="12.5" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.75)">
              {copy.chart.xLabel}
            </text>
            <text x="22" y="140" transform="rotate(-90 22 140)" textAnchor="middle" fontSize="12.5" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.75)">
              {copy.chart.yLabel}
            </text>
          </svg>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 10 }}>
            {copy.inputNodes.map((node, index) => {
              const Icon = index === 0 ? UserRound : Activity;
              return (
                <div
                  key={node.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      flex: 1,
                      minWidth: 0,
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${node.accent}22`,
                        color: node.accent,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={iconSize} />
                    </span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--sw-text)' }}>{node.label}</span>
                  </div>

                  <ArrowRight size={16} color="var(--sw-text-muted)" />
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(255, 46, 151, 0.12), rgba(168, 85, 247, 0.12))',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${copy.outputNode.accent}22`,
                color: copy.outputNode.accent,
                flexShrink: 0,
              }}
            >
              <Scale size={18} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sw-text-muted)' }}>
                {copy.outputLabel}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sw-text)' }}>{copy.outputNode.label}</div>
            </div>
          </div>
        </>
      )}
    </div>

    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        fontSize: 12.5,
        color: 'var(--sw-text-muted)',
      }}
    >
      {copy.footer}
    </div>
  </div>
);

export const LinearRegressionTabsVisual: React.FC<LinearRegressionTabsVisualProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const safeIndex = activeTab === 1 ? 1 : 0;

  return (
    <div style={{ width: '100%', display: 'grid', gap: 16 }}>
      <div
        role="tablist"
        aria-label="Linear regression views"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 10,
          padding: 8,
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {copy.tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={safeIndex === index}
            onClick={() => setActiveTab(index)}
            style={tabButtonStyle(safeIndex === index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {safeIndex === 0 ? <FormulaPanel copy={copy.formulaPanel} /> : <GraphPanel copy={copy.graphPanel} />}
    </div>
  );
};
