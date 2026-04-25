# Byte Pair Encoding (BPE) - Full implementation
# This algorithm is the same one used internally by GPT-2

# @region stats-full
def get_stats(corpus):
    """Counts frequency of adjacent pairs in the corpus."""
    stats = {}
    for word in corpus:
        for i in range(len(word) - 1):
            # Sliding window: we take the current character and the next one
            pair = (word[i], word[i+1])
            # Increment the pair count in the dictionary
            stats[pair] = stats.get(pair, 0) + 1
    return stats
# @endregion

# @region merge-full
def merge_pair(pair, corpus):
    """Merges a specific pair into a new symbol."""
    merged = []
    for word in corpus:
        new_word = []
        i = 0
        while i < len(word):
            # If the current pair in the text matches the pair we want to merge
            if i < len(word) - 1 and word[i] == pair[0] and word[i+1] == pair[1]:
                # Merge the two symbols into one
                new_word.append(word[i] + word[i+1])
                i += 2  # Skip two symbols since they were merged
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged
# @endregion

# @region vocab-full
def get_vocab(corpus):
    """Builds the final vocabulary from the corpus."""
    vocab = {}
    for word in corpus:
        token = ''.join(word)
        vocab[token] = vocab.get(token, 0) + 1
    return vocab
# @endregion

# @region usage-setup
# --- Usage Example ---
corpus_text = 'low lower newer newest'.split()
corpus = [tuple(w) for w in corpus_text]
# @endregion

# @region main-loop
# Run the iterative BPE loop
num_merges = 10
vocab = {tuple(w): 0 for w in corpus_text}

for i in range(num_merges):
    # 1. Analyze the corpus to find the most common pair at the moment
    stats = get_stats(corpus)
    if not stats: break
    
    # 2. Greedy choice: pick the pair with the highest frequency
    best_pair = max(stats, key=stats.get)
    
    # 3. Apply the merge across the entire corpus
    corpus = merge_pair(best_pair, corpus)
    # 4. Register the new token in our vocabulary
    vocab[best_pair] = i + 1
# @endregion

# @region final-output
print(f"Final vocabulary ({len(vocab)} symbols):")
for symbol, merge_idx in sorted(vocab.items(), key=lambda x: x[1]):
    print(f"  {merge_idx}: {''.join(symbol)}")
# @endregion
