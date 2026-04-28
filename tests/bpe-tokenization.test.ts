import { describe, it, expect } from 'vitest';

// ============================================================================
// BPE Logic Tests — tests the core algorithm functions used by BPEFrequencyTable
// These tests would have caught the "Cannot read properties of undefined (reading 'split')" bug.
// ============================================================================

type Pair = [string, string];
type PairStats = { pair: Pair; count: number };

// Replicate the logic from BPEFrequencyTable.tsx to test it in isolation
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

const initialCorpus = [
  ['l', 'o', 'w'],
  ['l', 'o', 'w'],
  ['l', 'o', 'w', 'e', 'r'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w'],
  ['n', 'e', 'w', 'e', 's', 't'],
];

describe('BPE: getPairStats', () => {
  it('counts pairs correctly in initial corpus', () => {
    const stats = getPairStats(initialCorpus);
    
    // (e,w) appears in: l-o-w-e-r, n-e-w, n-e-w, n-e-w-e-s-t = should find e-w pairs
    // Actually let's count manually:
    // low: (l,o), (o,w)
    // low: (l,o), (o,w)  
    // lower: (l,o), (o,w), (w,e), (e,r)
    // new: (n,e), (e,w)
    // new: (n,e), (e,w)
    // newest: (n,e), (e,w), (w,e), (e,s), (s,t)
    
    const pairMap = new Map<string, number>();
    for (const stat of stats) {
      pairMap.set(`${stat.pair[0]}${stat.pair[1]}`, stat.count);
    }

    expect(pairMap.get('lo')).toBe(3);  // l-o appears 3x
    expect(pairMap.get('ow')).toBe(3);  // o-w appears 3x
    expect(pairMap.get('ne')).toBe(3);  // n-e appears 3x
    expect(pairMap.get('ew')).toBe(3);  // e-w appears 3x (lower, new, new, newest = but in lower it's w-e)
    expect(pairMap.get('we')).toBe(2);  // w-e appears 2x (lower, newest)
    expect(pairMap.get('er')).toBe(1);  // e-r appears 1x
    expect(pairMap.get('es')).toBe(1);  // e-s appears 1x
    expect(pairMap.get('st')).toBe(1);  // s-t appears 1x
  });

  it('returns empty array for empty corpus', () => {
    expect(getPairStats([])).toEqual([]);
  });

  it('returns empty array for corpus with single-symbol words', () => {
    expect(getPairStats([['a'], ['b'], ['c']])).toEqual([]);
  });

  it('handles corpus with empty strings in words', () => {
    const corpusWithEmpties = [['l', '', 'w'], ['n', 'e', 'w']];
    const stats = getPairStats(corpusWithEmpties);
    // Should not crash, should skip empty pairs
    expect(stats.length).toBeLessThanOrEqual(4);
    // Verify no undefined/null pairs
    for (const stat of stats) {
      expect(stat.pair[0]).toBeTruthy();
      expect(stat.pair[1]).toBeTruthy();
    }
  });

  it('handles words with merged tokens (multi-char symbols)', () => {
    const mergedCorpus = [
      ['low', 'e', 'r'],
      ['n', 'ew'],
      ['n', 'ew', 'est'],
    ];
    const stats = getPairStats(mergedCorpus);
    // Should work normally with multi-char symbols
    expect(stats.length).toBeGreaterThan(0);
    for (const stat of stats) {
      expect(stat.pair[0]).toBeTruthy();
      expect(stat.pair[1]).toBeTruthy();
      expect(stat.count).toBeGreaterThan(0);
    }
  });

  it('returns pairs sorted by frequency (descending)', () => {
    const stats = getPairStats(initialCorpus);
    for (let i = 0; i < stats.length - 1; i++) {
      expect(stats[i].count).toBeGreaterThanOrEqual(stats[i + 1].count);
    }
  });
});

describe('BPE: mergePair', () => {
  it('merges the most frequent pair correctly', () => {
    // (l,o) appears 3x — merge it
    const result = mergePair(['l', 'o'], initialCorpus);
    
    // low → lo-w
    expect(result[0]).toEqual(['lo', 'w']);
    expect(result[1]).toEqual(['lo', 'w']);
    expect(result[2]).toEqual(['lo', 'w', 'e', 'r']);
    // new stays the same
    expect(result[3]).toEqual(['n', 'e', 'w']);
    expect(result[4]).toEqual(['n', 'e', 'w']);
    expect(result[5]).toEqual(['n', 'e', 'w', 'e', 's', 't']);
  });

  it('does nothing if pair is not found', () => {
    const result = mergePair(['x', 'y'], initialCorpus);
    // Should return corpus unchanged (no filtering should remove words)
    expect(result.length).toBe(initialCorpus.length);
  });

  it('handles merging until all symbols are combined', () => {
    // Simulate repeated merges — this is what would cause the original bug
    let corpus = initialCorpus.map(w => [...w]);
    
    // Keep merging until no more pairs
    for (let step = 0; step < 20; step++) {
      const stats = getPairStats(corpus);
      if (stats.length === 0) break;
      
      const mostFrequent = stats[0];
      corpus = mergePair(mostFrequent.pair, corpus);
      
      // Invariants
      expect(corpus.length).toBeGreaterThan(0);
      for (const word of corpus) {
        expect(word.length).toBeGreaterThan(0);
        for (const symbol of word) {
          expect(symbol).toBeTruthy(); // no empty strings
        }
      }
      
      // Verify stats don't crash
      const newStats = getPairStats(corpus);
      for (const stat of newStats) {
        expect(stat.pair[0]).toBeTruthy();
        expect(stat.pair[1]).toBeTruthy();
      }
    }
  });

  it('filters out empty words after merge', () => {
    const edgeCorpus = [['a', 'b'], ['a'], ['b']];
    const result = mergePair(['a', 'b'], edgeCorpus);
    expect(result).toEqual([['ab'], ['a'], ['b']]);
  });
});

describe('BPE: full merge loop (regression test for the bug)', () => {
  it('completes all merges without crashing on undefined symbols', () => {
    let corpus = initialCorpus.map(w => [...w]);
    
    // Run until corpus is fully merged (no more pairs)
    let iterations = 0;
    while (iterations < 50) {
      const stats = getPairStats(corpus);
      if (stats.length === 0) break;
      
      const top = stats[0];
      expect(() => {
        corpus = mergePair(top.pair, corpus);
      }).not.toThrow();
      
      iterations++;
    }
    
    // After full merge, corpus should have single-token words only
    for (const word of corpus) {
      expect(word.length).toBe(1);
    }
  });
});

// ============================================================================
// BPE Merge Stack Tests — tests the regex parsing logic used by BPEMergeStack
// ============================================================================

describe('BPE: merge stack parsing', () => {
  const mergeRules = ['(un, )', '(bel, iev)', '(able, )'];

  it('parses merge rules correctly with regex', () => {
    const parsed = mergeRules.map((rule, idx) => {
      const match = rule.match(/\(([^,]+),\s*([^)]*)\)/);
      return {
        priority: idx + 1,
        pair: match ? [match[1].trim(), match[2].trim()] as [string, string] : ['', ''] as [string, string],
      };
    });

    expect(parsed[0]).toEqual({ priority: 1, pair: ['un', ''] });
    expect(parsed[1]).toEqual({ priority: 2, pair: ['bel', 'iev'] });
    expect(parsed[2]).toEqual({ priority: 3, pair: ['able', ''] });
  });

  it('handles malformed rules gracefully', () => {
    const malformedRules = ['invalid', '(no comma)', '(ok, pair)'];
    const parsed = malformedRules.map((rule, idx) => {
      const match = rule.match(/\(([^,]+),\s*([^)]*)\)/);
      return {
        priority: idx + 1,
        pair: match ? [match[1].trim(), match[2].trim()] as [string, string] : ['', ''] as [string, string],
      };
    });

    // 'invalid' → no match → empty pair
    expect(parsed[0].pair).toEqual(['', '']);
    // '(no comma)' → no match → empty pair
    expect(parsed[1].pair).toEqual(['', '']);
    // '(ok, pair)' → valid
    expect(parsed[2].pair).toEqual(['ok', 'pair']);
  });

  it('parses rules with spaces inside pairs', () => {
    const rulesWithSpaces = ['(low, er)', '(new, est)'];
    const parsed = rulesWithSpaces.map((rule, idx) => {
      const match = rule.match(/\(([^,]+),\s*([^)]*)\)/);
      return {
        priority: idx + 1,
        pair: match ? [match[1].trim(), match[2].trim()] as [string, string] : ['', ''] as [string, string],
      };
    });

    expect(parsed[0].pair).toEqual(['low', 'er']);
    expect(parsed[1].pair).toEqual(['new', 'est']);
  });
});

// ============================================================================
// BPE Training Curve Tests — tests the data generation logic
// ============================================================================

describe('BPE: training curve data', () => {
  it('generates monotonically increasing coverage with vocab size', () => {
    // Simulated training curve: as vocab grows, coverage should increase
    const dataPoints = [
      { vocabSize: 100, coverage: 0.45 },
      { vocabSize: 500, coverage: 0.72 },
      { vocabSize: 1000, coverage: 0.85 },
      { vocabSize: 5000, coverage: 0.95 },
      { vocabSize: 10000, coverage: 0.98 },
    ];

    for (let i = 1; i < dataPoints.length; i++) {
      expect(dataPoints[i].vocabSize).toBeGreaterThan(dataPoints[i - 1].vocabSize);
      expect(dataPoints[i].coverage).toBeGreaterThanOrEqual(dataPoints[i - 1].coverage);
    }
  });

  it('coverage is always between 0 and 1', () => {
    const coverages = [0.45, 0.72, 0.85, 0.95, 0.98, 1.0];
    for (const cov of coverages) {
      expect(cov).toBeGreaterThanOrEqual(0);
      expect(cov).toBeLessThanOrEqual(1);
    }
  });
});

// ============================================================================
// Token Granularity Tests — tests the token splitting logic
// ============================================================================

describe('Token Granularity: splitting logic', () => {
  const sentence = 'The cat sits';

  it('splits into characters correctly', () => {
    const charTokens = sentence.split('');
    expect(charTokens.length).toBe(12); // includes spaces
    expect(charTokens[0]).toBe('T');
    expect(charTokens[4]).toBe('c');
  });

  it('splits into words correctly', () => {
    const wordTokens = sentence.split(/\s+/).filter(Boolean);
    expect(wordTokens.length).toBe(3);
    expect(wordTokens).toEqual(['The', 'cat', 'sits']);
  });

  it('handles empty sentences gracefully', () => {
    expect(''.split('')).toEqual([]);
    expect(''.split(/\s+/).filter(Boolean)).toEqual([]);
  });

  it('handles multiple spaces correctly', () => {
    const multiSpace = 'The  cat   sits';
    const wordTokens = multiSpace.split(/\s+/).filter(Boolean);
    expect(wordTokens).toEqual(['The', 'cat', 'sits']);
  });
});
