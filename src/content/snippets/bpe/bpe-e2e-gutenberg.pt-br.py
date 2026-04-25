# @region bpe-funcs
# BPE E2E: Tokenizando um livro real em português
# Corpus: Dom Casmurro (Machado de Assis) + Os Lusíadas (Camões)

# --- Funções BPE (mesmas do slide anterior) ---

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
            if i < len(word) - 1 and word[i] == pair[0] and word[i+1] == pair[1]:
                new_word.append(word[i] + word[i+1])
                i += 2
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged
# @endregion

# @region bpe-load
# --- Carregar corpus real ---

# Texto de exemplo: trechos de Dom Casmurro + Os Lusíadas
corpus_text = """
Dom Casmurro

Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu.

Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos.

A viagem era curta, e os versos pode ser que não fossem inteiramente maus.

Os Lusíadas

As armas e os barões assinalados,
Que da ocidental praia Lusitana,
Por mares nunca de antes navegados,
Passaram ainda além da Taprobana,
Em perigos e guerras esforçados,
Que mais do que prometia a força humana,
E entre gente remota edificaram
Novo Reino, que tanto sublimaram.
""".strip()

# Preprocessar: converter para minúsculas, remover pontuação, split em palavras
import re
clean_text = re.sub(r'[^\w\s]', '', corpus_text.lower())
words = clean_text.split()

# Converter cada palavra em tupla de caracteres
corpus = [tuple(w) for w in words]

print(f"Corpus carregado:")
print(f"  Palavras: {len(words)}")
print(f"  Caracteres: {len(' '.join(words))}")
print(f"  Vocabulário inicial (caracteres únicos): {len(set(''.join(words)))}")
# @endregion

# @region bpe-run
# --- Executar BPE ---

num_merges = 30
vocab = {tuple(w): 0 for w in words}

print(f"Executando {num_merges} merges BPE...")
print()

for i in range(num_merges):
    stats = get_stats(corpus)
    
    if not stats:
        break
    
    best_pair = max(stats, key=stats.get)
    best_freq = stats[best_pair]
    
    corpus = merge_pair(best_pair, corpus)
    vocab[best_pair] = i + 1
    
    # Mostrar merges interessantes (frequência >= 3)
    if best_freq >= 3:
        merged_token = ''.join(best_pair)
        print(f"  Merge {i+1}: {best_pair[0]}+{best_pair[1]} → '{merged_token}' (freq: {best_freq})")
# @endregion

# @region bpe-results
print()
print(f"Vocabulário final:")
print(f"  Símbolos base (caracteres): {len(set(''.join(words)))}")
print(f"  Tokens aprendidos (merges): {sum(1 for v in vocab.values() if v > 0)}")
print(f"  Total: {len(vocab)}")
print()

# Mostrar tokens mais interessantes
print("Tokens aprendidos mais frequentes:")
learned = [(k, v) for k, v in vocab.items() if v > 0]
learned.sort(key=lambda x: len(''.join(x[0])), reverse=True)
for token, merge_idx in learned[:15]:
    print(f"  Merge {merge_idx:2d}: {''.join(token)}")

print()
print("Agora tokenize uma palavra nova:")
test_word = "navegavam"
test_chars = tuple(test_word)
print(f"  '{test_word}' → {list(test_chars)}")
# @endregion
