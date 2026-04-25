# Byte Pair Encoding (BPE) - Implementação completa
# Este algoritmo é o mesmo usado internamente pelo GPT-2

# @region stats-full
def get_stats(corpus):
    """Conta frequência de pares adjacentes no corpus."""
    stats = {}
    for word in corpus:
        for i in range(len(word) - 1):
            # Janela deslizante: pegamos o caractere atual e o próximo
            pair = (word[i], word[i+1])
            # Incrementamos a contagem do par no dicionário
            stats[pair] = stats.get(pair, 0) + 1
    return stats
# @endregion

# @region merge-full
def merge_pair(pair, corpus):
    """Funde um par específico em um novo símbolo."""
    merged = []
    for word in corpus:
        new_word = []
        i = 0
        while i < len(word):
            # Se o par atual no texto corresponde ao par que queremos fundir
            if i < len(word) - 1 and word[i] == pair[0] and word[i+1] == pair[1]:
                # Fundimos os dois símbolos em um só
                new_word.append(word[i] + word[i+1])
                i += 2  # Pulamos dois símbolos, pois foram fundidos
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged
# @endregion

# @region vocab-full
def get_vocab(corpus):
    """Constrói o vocabulário final a partir do corpus."""
    vocab = {}
    for word in corpus:
        token = ''.join(word)
        vocab[token] = vocab.get(token, 0) + 1
    return vocab
# @endregion

# @region usage-setup
# --- Exemplo de uso ---
corpus_text = 'low lower newer newest'.split()
corpus = [tuple(w) for w in corpus_text]
# @endregion

# @region main-loop
# Executa o loop iterativo do BPE
num_merges = 10
vocab = {tuple(w): 0 for w in corpus_text}

for i in range(num_merges):
    # 1. Analisamos o corpus para achar o par mais comum no momento
    stats = get_stats(corpus)
    if not stats: break
    
    # 2. Escolha gananciosa (Greedy): pegamos o par de maior frequência
    best_pair = max(stats, key=stats.get)
    
    # 3. Aplicamos a fusão em todo o corpus
    corpus = merge_pair(best_pair, corpus)
    # 4. Registramos o novo token no nosso vocabulário
    vocab[best_pair] = i + 1
# @endregion

# @region final-output
print(f"Vocabulário final ({len(vocab)} símbolos):")
for symbol, merge_idx in sorted(vocab.items(), key=lambda x: x[1]):
    print(f"  {merge_idx}: {''.join(symbol)}")
# @endregion
