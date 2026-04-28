from tokenizers import Tokenizer, models, trainers, pre_tokenizers
from transformers import AutoTokenizer

# Criar um tokenizer BPE do zero
tokenizer = Tokenizer(models.BPE())
tokenizer.pre_tokenizer = pre_tokenizers.ByteLevel(add_prefix_space=True)

# Treinar em um corpus personalizado
corpus_files = ["corpus.txt"]
special_tokens = ["[PAD]", "[UNK]", "[MASK]", "[BOS]", "[EOS]"]

trainer = trainers.BpeTrainer(
    vocab_size=30000,
    min_frequency=2,
    special_tokens=special_tokens,
)

tokenizer.train(corpus_files, trainer)
tokenizer.save("meu-tokenizer.json")

# Usar com transformers
from transformers import PreTrainedTokenizerFast
hf_tokenizer = PreTrainedTokenizerFast(tokenizer_file="meu-tokenizer.json")
print(hf_tokenizer.encode("Olá, mundo!"))
