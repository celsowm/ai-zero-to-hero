import React, { useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { TokenGranularitySliderCopy } from '../../../types/slide';

interface TokenGranularitySliderProps {
  copy: TokenGranularitySliderCopy;
}

type GranularityLevel = 0 | 1 | 2; // 0=char, 1=subword, 2=word

const levelLabels: Record<GranularityLevel, keyof TokenGranularitySliderCopy> = {
  0: 'charLevel',
  1: 'subwordLevel',
  2: 'wordLevel',
};

const levelColors: Record<GranularityLevel, string> = {
  0: sw.pink,
  1: sw.purple,
  2: sw.cyan,
};

function tokenize(sentence: string, level: GranularityLevel): string[] {
  switch (level) {
    case 0: // character level
      return sentence.split('');
    case 1: // subword level (simple heuristic: split on common subword boundaries)
      return sentence
        .split(/\s+/)
        .flatMap((word) => {
          if (word.length <= 2) return [word];
          const chunks: string[] = [];
          for (let i = 0; i < word.length; i += 2) {
            chunks.push(word.slice(i, i + 2));
          }
          return chunks;
        })
        .filter(Boolean);
    case 2: // word level
      return sentence.split(/\s+/).filter(Boolean);
  }
}

export const TokenGranularitySlider = React.memo(({ copy }: TokenGranularitySliderProps) => {
  const [level, setLevel] = useState<GranularityLevel>(1);

  const sentence = copy.exampleSentence ?? 'The quick brown fox jumps';
  const tokens = useMemo(() => tokenize(sentence, level), [sentence, level]);

  const activeColor = levelColors[level];
  const tokenCountLabel = copy.tokenCount ?? 'Tokens';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '32px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      {/* Example sentence */}
      <div
        style={{
          fontSize: sw.fsTitleLg,
          fontWeight: 700,
          color: sw.text,
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        "{sentence}"
      </div>

      {/* Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
          {copy.sliderLabel ?? 'Granularity'}
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as GranularityLevel)}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: sw.cyan,
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: sw.fsSmall,
            fontWeight: 500,
          }}
        >
          {([0, 1, 2] as GranularityLevel[]).map((l) => (
            <span
              key={l}
              style={{
                color: l === level ? activeColor : sw.textMuted,
                transition: sw.transitionFast,
                fontWeight: l === level ? 700 : 500,
              }}
            >
              {copy[levelLabels[l]]}
            </span>
          ))}
        </div>
      </div>

      {/* Token display */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
          padding: '16px 0',
          minHeight: '60px',
          alignItems: 'center',
        }}
      >
        {tokens.map((token, i) => (
          <span
            key={`${level}-${i}`}
            style={{
              display: 'inline-block',
              padding: '8px 12px',
              background: sw.tintStronger,
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: '8px',
              fontSize: sw.fsValue,
              fontFamily: sw.fontMono,
              color: sw.text,
              transition: sw.transitionFast,
              animation: 'fadeIn 200ms ease forwards',
            }}
          >
            {token}
          </span>
        ))}
      </div>

      {/* Token count badge */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: sw.tintAccent,
            border: `1px solid ${activeColor}44`,
            borderRadius: '20px',
            transition: sw.transitionFast,
          }}
        >
          <span
            style={{
              fontSize: sw.fsValue,
              fontWeight: 700,
              color: activeColor,
              transition: sw.transitionFast,
            }}
          >
            {tokens.length}
          </span>
          <span
            style={{
              fontSize: sw.fsSmall,
              fontWeight: 500,
              color: sw.textDim,
            }}
          >
            {tokenCountLabel}
          </span>
        </div>
      </div>
    </div>
  );
});
