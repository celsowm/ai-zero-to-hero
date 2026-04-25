# Byte Pair Encoding (BPE) - Implementação completa
# Este algoritmo é o mesmo usado internamente pelo GPT-2

def get_stats(corpus):
    """Conta frequência de pares adjacentes no corpus."""
    stats = {}
    for word in corpus:
        for i in range(len(word) - 1):
            pair = (word[i], word[i+1])
            stats[pair] = stats.get(pair, 0) + 1
    return stats


def merge_pair(pair, corpus):
    """Funde um par específico em um novo símbolo."""
    merged = []
    for word in corpus:
        new_word = []
        i = 0
        while i < len(word):
            # Se o par corresponde, funde os dois símbolos
            if i < len(word) - 1 and word[i] == pair[0] and word[i+1] == pair[1]:
                new_word.append(word[i] + word[i+1])
                i += 2  # Avança 2 posições
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged


def get_vocab(corpus):
    """Constrói o vocabulário final a partir do corpus."""
    vocab = {}
    for word in corpus:
        token = ''.join(word)
        vocab[token] = vocab.get(token, 0) + 1
    return vocab


# --- Exemplo de uso ---

# Corpus inicial (cada palavra é uma tupla de caracteres)
corpus_text = 'low lower newer newest'.split()
corpus = [tuple(w) for w in corpus_text]

print(f"Corpus inicial: {corpus_text}")
print(f"Vocabulário inicial: {set(corpus_text)}")
print()

# Executa 10 merges BPE
num_merges = 10
vocab = {tuple(w): 0 for w in corpus_text}  # vocabulário base (caracteres)

for i in range(num_merges):
    # 1. Conta frequência de pares
    stats = get_stats(corpus)
    
    if not stats:
        print("Sem mais pares para fundir.")
        break
    
    # 2. Encontra o par mais frequente
    best_pair = max(stats, key=stats.get)
    best_freq = stats[best_pair]
    
    print(f"Merge {i+1}: fundir {best_pair} (frequência: {best_freq})")
    
    # 3. Funde o par no corpus
    corpus = merge_pair(best_pair, corpus)
    
    # 4. Adiciona ao vocabulário
    vocab[best_pair] = i + 1

print()
print(f"Vocabulário final ({len(vocab)} símbolos):")
for symbol, merge_idx in sorted(vocab.items(), key=lambda x: x[1]):
    if merge_idx == 0:
        print(f"  Base: {''.join(symbol)}")
    else:
        print(f"  Merge {merge_idx}: {''.join(symbol)}")

print()
print(f"Corpus após {num_merges} merges:")
for word in corpus:
    print(f"  {' '.join(word)}")
