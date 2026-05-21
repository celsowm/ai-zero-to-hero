import React, { useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { BPEStepByStepCopy } from '../../../types/slide';

interface BPEStepByStepProps {
  copy: BPEStepByStepCopy;
}

type Pair = [string, string];
type PairStats = { pair: Pair; count: number };

const INITIAL_CORPUS = [
  ['l', 'o', 'w'],
  ['l', 'o', 'w'],
  ['l', 'o', 'w', 'e', 'r'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w', 'e', 's', 't'],
];

const TOKEN_COLORS = [
  '#00e5ff', '#a855f7', '#ec4899', '#34d399',
  '#f59e0b', '#60a5fa', '#f87171', '#a3e635',
];

function getTokenColor(token: string, allTokens: string[]): string {
  const idx = allTokens.indexOf(token);
  return TOKEN_COLORS[idx % TOKEN_COLORS.length];
}

function getPairStats(corpus: string[][]): PairStats[] {
  const stats: Record<string, number> = {};
  for (const word of corpus) {
    for (let i = 0; i < word.length - 1; i++) {
      const a = word[i]!;
      const b = word[i + 1]!;
      const pairKey = `${a}|${b}`;
      stats[pairKey] = (stats[pairKey] ?? 0) + 1;
    }
  }
  return Object.entries(stats)
    .map(([key, count]) => ({
      pair: key.split('|') as Pair,
      count,
    }))
    .sort((a, b) => b.count - a.count || a.pair[0]!.localeCompare(b.pair[0]!));
}

function mergePair(targetPair: Pair, corpus: string[][]): string[][] {
  return corpus.map((word) => {
    const newWord: string[] = [];
    let i = 0;
    while (i < word.length) {
      const a = word[i]!;
      const b = word[i + 1]!;
      if (i < word.length - 1 && a === targetPair[0] && b === targetPair[1]) {
        newWord.push(a + b);
        i += 2;
      } else {
        newWord.push(a);
        i++;
      }
    }
    return newWord.filter(Boolean);
  }).filter((word) => word.length > 0);
}

export const BPEStepByStep: React.FC<BPEStepByStepProps> = React.memo(({ copy }) => {
  const [corpus, setCorpus] = useState<string[][]>(INITIAL_CORPUS);
  const [rules, setRules] = useState<string[]>([]);
  const [iteration, setIteration] = useState(0);

  const pairStats = useMemo(() => getPairStats(corpus), [corpus]);
  const mostFrequent = pairStats.length > 0 ? pairStats[0] : null;
  const isDone = !mostFrequent || mostFrequent.count < 2 || pairStats.every((p) => p.pair[0]!.length + p.pair[1]!.length > 1 && p.count < 1);

  const vocabSize = useMemo(() => {
    const vocab = new Set<string>();
    for (const word of corpus) {
      for (const token of word) {
        vocab.add(token);
      }
    }
    return vocab.size;
  }, [corpus]);

  const allTokens = useMemo(() => {
    const tokens = new Set<string>();
    for (const word of corpus) {
      for (const token of word) {
        tokens.add(token);
      }
    }
    return Array.from(tokens).sort();
  }, [corpus]);

  const canMerge = !isDone && mostFrequent && mostFrequent.count >= 2 && (mostFrequent.pair[0]!.length > 0 && mostFrequent.pair[1]!.length > 0);

  const handleMerge = () => {
    if (!canMerge || !mostFrequent) return;
    const newCorpus = mergePair(mostFrequent.pair, corpus);
    setCorpus(newCorpus);
    setRules((prev) => [...prev, `${mostFrequent.pair[0]}+${mostFrequent.pair[1]} → ${mostFrequent.pair[0]! + mostFrequent.pair[1]!}`]);
    setIteration((i) => i + 1);
  };

  const handleReset = () => {
    setCorpus(INITIAL_CORPUS);
    setRules([]);
    setIteration(0);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '16px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: sw.fsTitle, fontWeight: 700, color: sw.text }}>
          {copy.title}
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: sw.fsSmall, color: sw.textMuted }}>
          <span>{copy.iterLabel}: <strong style={{ color: sw.cyan }}>{iteration}</strong></span>
          <span>{copy.vocabSizeLabel}: <strong style={{ color: sw.purple }}>{vocabSize}</strong></span>
        </div>
      </div>

      <div
        style={{
          padding: '10px 12px',
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
            marginBottom: '6px',
          }}
        >
          {copy.corpusLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {corpus.map((word, wordIdx) => (
            <div
              key={wordIdx}
              style={{
                display: 'flex',
                gap: '2px',
                padding: '4px 6px',
                background: sw.tintStronger,
                borderRadius: '6px',
                border: `1px solid ${sw.borderSubtle}`,
              }}
            >
              {word.map((symbol, symbolIdx) => (
                <span
                  key={symbolIdx}
                  style={{
                    fontSize: symbol.length > 2 ? '10px' : '12px',
                    fontFamily: sw.fontMono,
                    fontWeight: 600,
                    color: '#000',
                    padding: '2px 5px',
                    background: getTokenColor(symbol, allTokens),
                    borderRadius: '3px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pairStats.length > 0 && (
          <div>
            <div
              style={{
                fontSize: sw.fsEyebrow,
                fontWeight: 600,
                color: sw.textMuted,
                textTransform: 'uppercase',
                letterSpacing: sw.lsEyebrow,
                marginBottom: '6px',
              }}
            >
              {copy.pairsLabel}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3px 12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: sw.fsSmall, fontWeight: 700, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>{copy.pairCol}</span>
              </div>
              <div style={{ fontSize: sw.fsSmall, fontWeight: 700, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                {copy.countCol}
              </div>
              {pairStats.slice(0, 7).map((stat, i) => {
                const isTop = i === 0 && canMerge;
                const pairKey = `${stat.pair[0]}${stat.pair[1]}`;
                return (
                  <React.Fragment key={pairKey + i}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '5px 8px',
                        background: isTop ? `${sw.cyan}15` : 'transparent',
                        borderRadius: '6px',
                        border: isTop ? `1px solid ${sw.cyan}44` : '1px solid transparent',
                        boxShadow: isTop ? `0 0 8px ${sw.cyan}33` : 'none',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: sw.fontMono,
                          fontSize: '12px',
                          fontWeight: 600,
                          color: isTop ? sw.cyan : sw.text,
                        }}
                      >
                        ({stat.pair[0]}, {stat.pair[1]})
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: sw.fontMono,
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isTop ? sw.cyan : sw.textDim,
                        textAlign: 'center',
                      }}
                    >
                      {stat.count}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {rules.length > 0 && (
          <div
            style={{
              padding: '10px 12px',
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
                marginBottom: '6px',
              }}
            >
              {copy.rulesLabel}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {rules.map((rule, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 8px',
                    background: sw.tintStronger,
                    borderRadius: '4px',
                    fontSize: sw.fsSmall,
                    fontFamily: sw.fontMono,
                    color: sw.textDim,
                    border: `1px solid ${sw.borderSubtle}`,
                  }}
                >
                  {rule}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '8px',
          borderTop: `1px solid ${sw.borderSubtle}`,
        }}
      >
        {canMerge ? (
          <>
            <div style={{ fontSize: sw.fsSmall, color: sw.textMuted }}>
              {copy.nextMergeLabel}: <strong style={{ color: sw.cyan }}>({mostFrequent!.pair[0]}, {mostFrequent!.pair[1]})</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '6px 14px',
                  background: sw.tintStronger,
                  color: sw.text,
                  border: `1px solid ${sw.borderSubtle}`,
                  borderRadius: '6px',
                  fontSize: sw.fsSmall,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {copy.resetButton}
              </button>
              <button
                onClick={handleMerge}
                style={{
                  padding: '6px 14px',
                  background: sw.cyan,
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: sw.fsSmall,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: `0 0 12px ${sw.cyan}44`,
                }}
              >
                {copy.mergeButton}
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: sw.fsSmall, color: sw.textMuted }}>
              {copy.doneLabel}
            </div>
            <button
              onClick={handleReset}
              style={{
                padding: '6px 14px',
                background: sw.tintStronger,
                color: sw.text,
                border: `1px solid ${sw.borderSubtle}`,
                borderRadius: '6px',
                fontSize: sw.fsSmall,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copy.resetButton}
            </button>
          </>
        )}
      </div>
    </div>
  );
});
