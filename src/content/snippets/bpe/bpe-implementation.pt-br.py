# Byte Pair Encoding (BPE) - implementacao didatica
# Mostra a evolucao dos merges em cada iteracao

# @region stats-full
def get_stats(corpus):
    stats = {}
    for palavra in corpus:
        for i in range(len(palavra) - 1):
            par = (palavra[i], palavra[i + 1])
            stats[par] = stats.get(par, 0) + 1
    return stats
# @endregion

# @region merge-full
def merge_pair(par, corpus):
    fundido = []
    for palavra in corpus:
        nova = []
        i = 0
        while i < len(palavra):
            if i < len(palavra) - 1 and palavra[i] == par[0] and palavra[i + 1] == par[1]:
                nova.append(palavra[i] + palavra[i + 1])
                i += 2
            else:
                nova.append(palavra[i])
                i += 1
        fundido.append(tuple(nova))
    return fundido
# @endregion

# @region vocab-full
def get_vocab(corpus):
    vocab = {}
    for palavra in corpus:
        token = ''.join(palavra)
        vocab[token] = vocab.get(token, 0) + 1
    return vocab

def formatar_corpus(corpus):
    return [' '.join(palavra) for palavra in corpus]
# @endregion

# @region usage-setup
corpus_text = 'once upon a time there was a tiny tokenizer'.split()
corpus = [tuple(p) for p in corpus_text]
# @endregion

# @region main-loop
num_merges = 8
historico = []

print('=== Estado inicial ===')
print('Corpus:', formatar_corpus(corpus))
print('Vocab inicial:', sorted(get_vocab(corpus).keys()))

for passo in range(1, num_merges + 1):
    stats = get_stats(corpus)
    if not stats:
        break

    melhor_par = max(stats, key=stats.get)
    freq = stats[melhor_par]
    novo_token = ''.join(melhor_par)

    corpus = merge_pair(melhor_par, corpus)
    historico.append((passo, melhor_par, freq, novo_token))

    print(f'\n--- Merge {passo} ---')
    print(f'par escolhido: {melhor_par} (freq={freq})')
    print(f'novo simbolo: {novo_token}')
    print('amostra corpus:', formatar_corpus(corpus)[:4])
# @endregion

# @region final-output
vocab_final = sorted(get_vocab(corpus).items(), key=lambda x: (-x[1], x[0]))
print('\n=== Resumo final ===')
for passo, par, freq, token in historico:
    print(f'{passo:02d}. {par} -> {token} (freq={freq})')

print('\nTop vocab final:')
for token, freq in vocab_final[:12]:
    print(f'  {token}: {freq}')
# @endregion
