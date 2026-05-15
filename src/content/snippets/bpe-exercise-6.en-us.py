# Full BPE
corpus = 'low lower newer newest'.split()
word_freq = {w: 1 for w in corpus}

# prepare initial vocabulary
vocab = {tuple(w): 0 for w in corpus}

# convert to list of tuples
corpus_tuples = [tuple(w) for w in corpus]

num_merges = 10
for i in range(num_merges):
    # count pairs
    stats = get_stats(corpus_tuples)
    if not stats:
        break
    # find most frequent pair
    best = max(stats, key=stats.get)
    # merge
    corpus_tuples = merge_pair(best, corpus_tuples)
    vocab[best] = i + 1

print(f'Merge {i+1}: {best}')
print(f'Final vocabulary: {len(vocab)} symbols')
for symbol, idx in sorted(vocab.items(), key=lambda x: x[1]):
    if idx > 0:
        print(f'  Merge {idx}: {"".join(symbol)}')