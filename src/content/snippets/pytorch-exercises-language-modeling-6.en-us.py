# Exercise 2: logits shape
def logits_shape(batch_size, seq_len, vocab_size):
    return (batch_size, seq_len, vocab_size)

print(logits_shape(2, 4, 1000))
