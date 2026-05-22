# @region generate-imports
import torch
from pytorch_gpt2.data.tokenizer import ByteTokenizer
# @endregion

# @region generate-setup
prompts = ["Era uma vez", "Once upon a time"]
tokenizer = ByteTokenizer()
model.eval()
# @endregion

# @region generate-loop
for prompt in prompts:
    idx = torch.tensor([tokenizer.encode(prompt, add_eot=False)], dtype=torch.long)
    out = idx
    for _ in range(120):
        logits, _ = model(out[:, -model.config.block_size :])
        next_token_logits = logits[:, -1, :]
        topk_vals, topk_idx = torch.topk(next_token_logits, k=20, dim=-1)
        probs = torch.softmax(topk_vals / 0.7, dim=-1)
        sample = torch.multinomial(probs, num_samples=1)
        next_id = topk_idx.gather(-1, sample)
        out = torch.cat((out, next_id), dim=1)
        if next_id.item() == tokenizer.eot_id:
            break
    text = tokenizer.decode(out[0].tolist())
    print(f"\nPROMPT: {prompt}")
    print(text)
# @endregion
