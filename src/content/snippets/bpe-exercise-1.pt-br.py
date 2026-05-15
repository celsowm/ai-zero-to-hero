def get_stats(corpus):
    stats = {}
    for word in corpus:
        for i in range(len(word) - 1):
            # complete: conte o par (word[i], word[i+1])
            pair = 
            stats[pair] = stats.get(pair, 0) + 
    return stats

# teste
corpus = [('l','o','w'), ('l','o','w','e','r')]
print(get_stats(corpus))