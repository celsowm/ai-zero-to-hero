# @region generate-imports
import torch
import torch.nn.functional as F
# from my_gpt import GPT
# @endregion

# @region generate-setup
# Reload our newly trained model
model = GPT(vocab_size=2000, block_size=128, n_layer=4, n_head=4, n_embd=128)
model.load_state_dict(torch.load("my_gpt2_tiny.pt"))
model.eval() # Inference mode (disables training noise)

# @endregion

# @region generate-loop
# Our initial prompt converted to IDs (e.g., "The", "rat", "gn", "awed")
context_ids = [12, 45, 89, 302]
x = torch.tensor([context_ids], dtype=torch.long)

max_new_tokens = 20
temperature = 0.8

print("Generating text...")
for _ in range(max_new_tokens):
    # Crop the context if it passes the limit the network supports
    x_cond = x[:, -128:]

    # 1. Forward the model to get the next token distribution
    logits = model(x_cond)
    # Get only the logit of the last time step of the sequence
    logits = logits[:, -1, :]

    # 2. Apply Temperature and Softmax to become percentages
    probs = F.softmax(logits / temperature, dim=-1)

    # 3. Draw the token based on probability ("rolls the dice")
    next_token = torch.multinomial(probs, num_samples=1)

    # 4. Concatenate the token back into the input and repeat!
    x = torch.cat((x, next_token), dim=1)

# Convert the final IDs back to text (BPE decode)
# final_text = bpe.decode(x[0].tolist())
print(f"Generated ID list: {x[0].tolist()}")
# @endregion