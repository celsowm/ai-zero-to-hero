import React, { useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { BPEFrequencyTableCopy } from '../../../types/slide';

interface BPEFrequencyTableProps {
  copy: BPEFrequencyTableCopy;
}

type Pair = [string, string];
type PairStats = { pair: Pair; count: number };

const initialCorpus = [
  ['l', 'o', 'w'],
  ['l', 'o', 'w'],
  ['l', 'o', 'w', 'e', 'r'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w', 'e', 's', 't'],
];

function getPairStats(corpus: string[][]): PairStats[] {
  const stats: Record<string, number> = {};
  for (const word of corpus) {
    for (let i = 0; i < word.length - 1; i++) {
      const a = word[i];
      const b = word[i + 1];
      if (!a || !b) continue;
      const pairKey = `${a}|${b}`;
      stats[pairKey] = (stats[pairKey] || 0) + 1;
    }
  }
  return Object.entries(stats)
    .map(([key, count]) => ({
      pair: key.split('|') as Pair,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

function mergePair(targetPair: Pair, corpus: string[][]): string[][] {
  return corpus.map((word) => {
    const newWord: string[] = [];
    let i = 0;
    while (i < word.length) {
      const a = word[i];
      const b = word[i + 1];
      if (
        i < word.length - 1 &&
        a === targetPair[0] &&
        b === targetPair[1]
      ) {
        newWord.push(a + b);
        i += 2;
      } else {
        newWord.push(a);
        i++;
      }
    }
    return newWord.filter(Boolean);
  }).filter(word => word.length > 0);
}

export const BPEFrequencyTable = React.memo(({ copy }: BPEFrequencyTableProps) => {
  const [corpus, setCorpus] = useState<string[][]>(initialCorpus);
  const [mergeCount, setMergeCount] = useState(0);

  const pairStats = useMemo(() => getPairStats(corpus), [corpus]);
  const mostFrequent = pairStats.length > 0 ? pairStats[0] : null;

  const vocabulary = useMemo(() => {
    const vocab: Record<string, number> = {};
    for (const word of corpus) {
      const token = word.join('');
      vocab[token] = (vocab[token] || 0) + 1;
    }
    return vocab;
  }, [corpus]);

  const handleMerge = () => {
    if (!mostFrequent) return;
    const newCorpus = mergePair(mostFrequent.pair, corpus);
    setCorpus(newCorpus);
    setMergeCount((c) => c + 1);
  };

  const handleReset = () => {
    setCorpus(initialCorpus);
    setMergeCount(0);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '20px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: sw.fsTitle,
          fontWeight: 700,
          color: sw.text,
          textAlign: 'center',
        }}
      >
        {copy.title}
      </div>

      {/* Corpus display */}
      <div
        style={{
          padding: '12px',
          background: sw.tint,
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 600,
            color: sw.textMuted,
            textTransform: 'uppercase',
            letterSpacing: sw.lsEyebrow,
            marginBottom: '8px',
          }}
        >
          {copy.corpusLabel}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {corpus.map((word, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '2px',
                padding: '4px 8px',
                background: sw.tintStronger,
                borderRadius: '6px',
                border: `1px solid ${sw.borderSubtle}`,
              }}
            >
              {word.map((symbol, j) => (
                <span
                  key={j}
                  style={{
                    fontSize: sw.fsValue,
                    fontFamily: sw.fontMono,
                    color: sw.text,
                    padding: '2px 4px',
                    background: sw.tintAccent,
                    borderRadius: '3px',
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Frequency table */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: '4px 12px',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: sw.fsSmall,
              fontWeight: 700,
              color: sw.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {copy.pairLabel}
          </div>
          <div
            style={{
              fontSize: sw.fsSmall,
              fontWeight: 700,
              color: sw.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {copy.freqLabel}
          </div>
          <div />

          {/* Rows */}
          {pairStats.slice(0, 8).map((stat, i) => {
            const isMostFrequent = i === 0 && mostFrequent;
            const pairKey = `${stat.pair[0]}${stat.pair[1]}`;
            return (
              <React.Fragment key={pairKey}>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    padding: '6px 8px',
                    background: isMostFrequent ? `${sw.cyan}15` : 'transparent',
                    borderRadius: '6px',
                    border: isMostFrequent
                      ? `1px solid ${sw.cyan}44`
                      : `1px solid transparent`,
                    boxShadow: isMostFrequent ? `0 0 8px ${sw.cyan}33` : 'none',
                    transition: sw.transitionFast,
                  }}
                >
                  <span
                    style={{
                      fontFamily: sw.fontMono,
                      fontSize: sw.fsValue,
                      fontWeight: 600,
                      color: isMostFrequent ? sw.cyan : sw.text,
                    }}
                  >
                    {stat.pair[0]}{stat.pair[1]}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: sw.fontMono,
                    fontSize: sw.fsValue,
                    fontWeight: 700,
                    color: isMostFrequent ? sw.cyan : sw.textDim,
                    textAlign: 'center',
                  }}
                >
                  {stat.count}
                </div>
                <div>
                  {isMostFrequent && (
                    <button
                      onClick={handleMerge}
                      style={{
                        padding: '4px 12px',
                        background: sw.cyan,
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: sw.fsSmall,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: `0 0 12px ${sw.cyan}44`,
                        transition: sw.transitionFast,
                      }}
                    >
                      {copy.mergeLabel}
                    </button>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '8px',
          borderTop: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            fontSize: sw.fsSmall,
            color: sw.textMuted,
          }}
        >
          {copy.nextMergeLabel}: {mergeCount + 1}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '6px 16px',
              background: sw.tintStronger,
              color: sw.text,
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: '6px',
              fontSize: sw.fsSmall,
              fontWeight: 600,
              cursor: 'pointer',
              transition: sw.transitionFast,
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Vocabulary */}
      <div
        style={{
          padding: '12px',
          background: sw.tint,
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 600,
            color: sw.textMuted,
            textTransform: 'uppercase',
            letterSpacing: sw.lsEyebrow,
            marginBottom: '8px',
          }}
        >
          {copy.vocabularyLabel} ({Object.keys(vocabulary).length})
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {Object.entries(vocabulary).map(([token]) => (
            <span
              key={token}
              style={{
                padding: '2px 6px',
                background: sw.tintStronger,
                borderRadius: '4px',
                fontSize: sw.fsSmall,
                fontFamily: sw.fontMono,
                color: sw.textDim,
              }}
            >
              {token}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
