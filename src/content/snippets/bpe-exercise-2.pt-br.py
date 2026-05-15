def merge_pair(pair, corpus):
    merged = []
    for word in corpus:
        new_word = []
        i = 0
        while i < len(word):
            # complete: se o par corresponde, funde
            if i < len(word) - 1 and word[i] == pair[0] and word[i+1] == pair[1]:
                new_word.append(
                i += 
            else:
                new_word.append(word[i])
                i += 1
        merged.append(tuple(new_word))
    return merged

# teste
corpus = [('l','o','w'), ('l','o','w','e','r')]
print(merge_pair(('o','w'), corpus))