# Byte Pair Encoding (BPE) - didactic implementation
# Shows merge evolution at each iteration

# @region stats-full
def get_stats(corpus):
    stats = {}
    for word in corpus:
        for i in range(len(word) - 1):
            pair = (word[i], word[i + 1])
            stats[pair] = stats.get(pair, 0) + 1
    return stats
# @endregion

# @region merge-full
def merge_pair(pair, corpus):
    merged = []
    for word in corpus:
        new_word = []
        i = 0
        while i < len(word):
            if i < len(word) - 1 and word[i] == pair[0] and word[i + 1] == pair[1]:
                new_word.append(word[i] + word[i + 1])
                i += 2
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged
# @endregion

# @region vocab-full
def get_vocab(corpus):
    vocab = {}
    for word in corpus:
        token = ''.join(word)
        vocab[token] = vocab.get(token, 0) + 1
    return vocab

def format_corpus(corpus):
    return [' '.join(word) for word in corpus]
# @endregion

# @region usage-setup
corpus_text = 'once upon a time there was a tiny tokenizer'.split()
corpus = [tuple(w) for w in corpus_text]
# @endregion

# @region main-loop
num_merges = 8
history = []

print('=== Initial state ===')
print('Corpus:', format_corpus(corpus))
print('Initial vocab:', sorted(get_vocab(corpus).keys()))

for step in range(1, num_merges + 1):
    stats = get_stats(corpus)
    if not stats:
        break

    best_pair = max(stats, key=stats.get)
    freq = stats[best_pair]
    new_token = ''.join(best_pair)

    corpus = merge_pair(best_pair, corpus)
    history.append((step, best_pair, freq, new_token))

    print(f'\n--- Merge {step} ---')
    print(f'chosen pair: {best_pair} (freq={freq})')
    print(f'new symbol: {new_token}')
    print('corpus sample:', format_corpus(corpus)[:4])
# @endregion

# @region final-output
final_vocab = sorted(get_vocab(corpus).items(), key=lambda x: (-x[1], x[0]))
print('\n=== Final summary ===')
for step, pair, freq, token in history:
    print(f'{step:02d}. {pair} -> {token} (freq={freq})')

print('\nTop final vocab:')
for token, freq in final_vocab[:12]:
    print(f'  {token}: {freq}')
# @endregion
