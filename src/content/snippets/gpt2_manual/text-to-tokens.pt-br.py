from pytorch_gpt2.data.tokenizer import ByteTokenizer
import torch

tokenizer = ByteTokenizer()
pt_ids = tokenizer.encode("Era uma vez", add_eot=False)
en_ids = tokenizer.encode("Once upon a time", add_eot=False)
max_len = max(len(pt_ids), len(en_ids))
pt_ids += [0] * (max_len - len(pt_ids))
en_ids += [0] * (max_len - len(en_ids))
idx = torch.tensor([pt_ids, en_ids], dtype=torch.long)

print("idx:", idx)
print("shape:", tuple(idx.shape))
