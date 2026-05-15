# BPE completo
corpus = 'low lower newer newest'.split()
word_freq = {w: 1 for w in corpus}

# prepara vocab inicial
vocab = {tuple(w): 0 for w in corpus}

# converte para lista de tuplas
corpus_tuples = [tuple(w) for w in corpus]

num_merges = 10
for i in range(num_merges):
    # conta pares
    stats = get_stats(corpus_tuples)
    if not stats:
        break
    # acha par mais frequente
    best = max(stats, key=stats.get)
    # faz merge
    corpus_tuples = merge_pair(best, corpus_tuples)
    vocab[best] = i + 1

print(f'Merge {i+1}: {best}')
print(f'Vocabulario final: {len(vocab)} simbolos')
for symbol, idx in sorted(vocab.items(), key=lambda x: x[1]):
    if idx > 0:
        print(f'  Merge {idx}: {"".join(symbol)}')