import React, { useState, useEffect } from 'react';
import { sw } from '../../../theme/tokens';
import type { TokenLevelComparisonCopy } from '../../../types/slide';

interface TokenLevelComparisonProps {
  copy: TokenLevelComparisonCopy;
}

const LEVEL_COLORS = {
  word: sw.cyan,
  char: sw.pink,
  subword: sw.purple,
};

export const TokenLevelComparison = React.memo(({ copy }: TokenLevelComparisonProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const levels = [
    { key: 'word', label: copy.wordLevel, example: copy.exampleText.split(/\s+/), pros: copy.wordPros, cons: copy.wordCons, color: LEVEL_COLORS.word },
    { key: 'char', label: copy.charLevel, example: copy.exampleText.split(''), pros: copy.charPros, cons: copy.charCons, color: LEVEL_COLORS.char },
    { key: 'subword', label: copy.subwordLevel, example: ['un', 'believ', 'ably'], pros: copy.subwordPros, cons: copy.subwordCons, color: LEVEL_COLORS.subword },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '24px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: sw.fsEyebrow,
          fontWeight: 600,
          color: sw.textMuted,
          textTransform: 'uppercase',
          letterSpacing: sw.lsEyebrow,
          textAlign: 'center',
        }}
      >
        {copy.exampleText}
      </div>

      {/* Three columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          flex: 1,
        }}
      >
        {levels.map((level, idx) => (
          <div
            key={level.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s`,
            }}
          >
            {/* Level label */}
            <div
              style={{
                textAlign: 'center',
                fontSize: sw.fsSmall,
                fontWeight: 700,
                color: level.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {level.label}
            </div>

            {/* Token cards */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                justifyContent: 'center',
                padding: '8px 0',
                minHeight: '40px',
              }}
            >
              {level.example.map((token, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    background: `${level.color}22`,
                    border: `1px solid ${level.color}44`,
                    borderRadius: '6px',
                    fontSize: sw.fsValue,
                    fontFamily: sw.fontMono,
                    color: sw.text,
                  }}
                >
                  {token}
                </span>
              ))}
            </div>

            {/* Count badge */}
            <div
              style={{
                textAlign: 'center',
                fontSize: sw.fsSmall,
                color: sw.textMuted,
              }}
            >
              {level.example.length} tokens
            </div>

            {/* Pros */}
            <div>
              <div
                style={{
                  fontSize: sw.fsSmall,
                  fontWeight: 600,
                  color: sw.green,
                  marginBottom: '4px',
                }}
              >
                {copy.prosLabel}
              </div>
              {level.pros.map((pro, i) => (
                <div
                  key={`pro-${i}`}
                  style={{
                    fontSize: sw.fsSmall,
                    color: sw.textDim,
                    padding: '2px 0',
                    paddingLeft: '12px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: sw.green,
                    }}
                  >
                    +
                  </span>
                  {pro}
                </div>
              ))}
            </div>

            {/* Cons */}
            <div>
              <div
                style={{
                  fontSize: sw.fsSmall,
                  fontWeight: 600,
                  color: sw.red,
                  marginBottom: '4px',
                }}
              >
                {copy.consLabel}
              </div>
              {level.cons.map((con, i) => (
                <div
                  key={`con-${i}`}
                  style={{
                    fontSize: sw.fsSmall,
                    color: sw.textDim,
                    padding: '2px 0',
                    paddingLeft: '12px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: sw.red,
                    }}
                  >
                    -
                  </span>
                  {con}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
