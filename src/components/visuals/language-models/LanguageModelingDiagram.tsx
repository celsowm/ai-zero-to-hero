import React from 'react';
import type { LanguageModelingDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LanguageModelingDiagramProps {
  copy: LanguageModelingDiagramCopy;
}

export const LanguageModelingDiagram = React.memo(({ copy }: LanguageModelingDiagramProps) => {
  // Parse options like "mat (85%)"
  const parsedOptions = copy.options.map(opt => {
    const match = opt.match(/(.+)\s*\((\d+)%\)/);
    if (match) {
      return { word: match[1], prob: parseInt(match[2], 10) };
    }
    return { word: opt, prob: 0 };
  });

  const topChoice = parsedOptions[0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        padding: '28px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 18% 14%, ${sw.tintActive}4d 0%, transparent 26%),
          radial-gradient(circle at 82% 18%, ${sw.cyan}40 0%, transparent 24%),
          linear-gradient(180deg, #050111 0%, #0a0520 45%, #12071f 100%)
        `,
        border: `1px solid ${sw.borderMedium}`,
        boxShadow: `0 18px 60px rgba(0, 0, 0, 0.45), ${sw.insetHighlight}`,
        color: 'var(--sw-text)',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            `linear-gradient(${sw.pink}14 1px, transparent 1px), linear-gradient(90deg, ${sw.cyan}0f 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          opacity: 0.18,
          maskImage: 'radial-gradient(ellipse at center, black 24%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 24%, transparent 72%)',
          animation: 'lm-grid-drift 18s linear infinite',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '34%',
          background:
            `linear-gradient(180deg, transparent 0%, ${sw.pink}17 42%, ${sw.cyan}1f 100%)`,
          opacity: 0.55,
          transform: 'translateY(10%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--sw-cyan)',
              textShadow: `0 0 12px ${sw.cyan}73`,
            }}
          >
            Next token forecast
          </div>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sw-text-muted)',
            }}
          >
            Synthwave probability panel
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            padding: '22px 22px 20px',
            borderRadius: '20px',
            background:
              `linear-gradient(180deg, ${sw.surface}f5 0%, rgba(11, 11, 18, 0.98) 100%)`,
            border: `1px solid ${sw.borderMediumStrong}`,
            boxShadow:
              `inset 0 0 0 1px ${sw.pink}14, 0 0 0 1px ${sw.cyan}14, 0 14px 34px rgba(0, 0, 0, 0.35)`,
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                `linear-gradient(90deg, ${sw.pink}14, ${sw.cyan}05 36%, transparent 72%)`,
              opacity: 0.65,
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--sw-text-dim)',
              }}
            >
              Input context
            </div>

            <div
              style={{
                position: 'relative',
                padding: '18px 18px 16px',
                borderRadius: '16px',
                background: 'rgba(5, 1, 17, 0.86)',
                border: `1px solid ${sw.tintActive}`,
                boxShadow:
                  `inset 0 0 0 1px ${sw.pink}14, 0 0 24px ${sw.cyan}14`,
                textAlign: 'center',
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 700,
                lineHeight: 1.45,
                color: 'var(--sw-text)',
                textShadow: '0 0 16px rgba(0, 229, 255, 0.08)',
              }}
            >
              {copy.text.split('___').map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '76px',
                        margin: '0 10px',
                        paddingBottom: '2px',
                        borderBottom: '3px solid var(--sw-cyan)',
                        color: 'var(--sw-pink)',
                        textShadow: `0 0 18px ${sw.pink}99`,
                        animation: 'lm-pulse-line 2.6s ease-in-out infinite',
                        transform: 'translateY(-2px)',
                      }}
                    >
                      &nbsp;
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '12px',
          }}
        >
          {parsedOptions.map((opt, i) => {
            const isTop = i === 0;
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  padding: '1px',
                  borderRadius: '16px',
                  background: isTop
                    ? `linear-gradient(90deg, ${sw.pink}, ${sw.cyan})`
                    : `linear-gradient(90deg, ${sw.borderSubtle}, ${sw.tintStrong})`,
                  boxShadow: isTop
                    ? `0 0 24px ${sw.cyan}29, 0 0 24px ${sw.pink}1f`
                    : '0 10px 24px rgba(0, 0, 0, 0.2)',
                  opacity: 1,
                  animation: `lm-slide-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s both`,
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '1px',
                    borderRadius: '15px',
                    background: 'linear-gradient(180deg, rgba(26, 22, 40, 0.96) 0%, rgba(11, 11, 18, 0.98) 100%)',
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${opt.prob}%`,
                    borderRadius: '15px',
                    background: isTop
                      ? `linear-gradient(90deg, ${sw.tintActive}2e 0%, rgba(0, 229, 255, 0.24) 100%)`
                      : `linear-gradient(90deg, ${sw.purple}1f 0%, ${sw.cyan}1f 100%)`,
                    animation: `lm-grow-width 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.45 + i * 0.08}s both`,
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '16px 18px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minWidth: 0,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '999px',
                        flex: '0 0 auto',
                        background: isTop ? 'var(--sw-cyan)' : `${sw.textDim}80`,
                        boxShadow: isTop
                          ? `0 0 16px ${sw.cyan}bf`
                          : `0 0 10px ${sw.textDim}33`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: isTop ? 700 : 600,
                        color: isTop ? 'var(--sw-text)' : `${sw.text}cc`,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {opt.word}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: isTop ? 'var(--sw-pink)' : 'var(--sw-text-dim)',
                      textShadow: isTop ? `0 0 14px ${sw.pink}73` : 'none',
                      flex: '0 0 auto',
                    }}
                  >
                    {opt.prob}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {topChoice ? (
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '14px',
              background:
                `linear-gradient(90deg, ${sw.pink}14 0%, ${sw.cyan}14 100%)`,
              border: `1px solid ${sw.borderMedium}`,
              boxShadow: `inset 0 0 0 1px ${sw.cyan}0d`,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--sw-text-dim)',
              }}
            >
              Highest signal
            </span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--sw-cyan)',
                textShadow: `0 0 12px ${sw.cyan}66`,
              }}
            >
              {topChoice.word} · {topChoice.prob}%
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
});

