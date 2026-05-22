# @region train-imports
import math
import torch
from tqdm import trange
from pytorch_gpt2.config import ModelConfig
from pytorch_gpt2.data.tokenizer import ByteTokenizer
from pytorch_gpt2.model.gpt import GPT
# @endregion

# @region train-setup
tokenizer = ByteTokenizer()
data = torch.tensor(tokenizer.encode(("Once upon a time there was a story.\n" * 40).strip(), add_eot=True), dtype=torch.long)

config = ModelConfig(vocab_size=tokenizer.vocab_size, block_size=96, n_layer=4, n_head=4, n_embd=128, dropout=0.0, bias=True, tie_weights=True)
model = GPT(config)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-3, weight_decay=0.01)
# @endregion

# @region train-loop
for step in trange(200, desc="training", unit="step"):
    starts = torch.randint(0, data.numel() - config.block_size - 1, (16,))
    x = torch.stack([data[i : i + config.block_size] for i in starts])
    y = torch.stack([data[i + 1 : i + config.block_size + 1] for i in starts])
    _, loss = model(x, y)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()
    if step % 25 == 0:
        lf = float(loss.detach())
        print(f"step={step} loss={lf:.3f} ppl={math.exp(min(lf, 20)):.2f}")
# @endregion
