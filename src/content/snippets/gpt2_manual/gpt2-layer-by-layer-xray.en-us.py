# Layer-by-layer GPT-2 X-ray:
# same shape, same target token, different contextual representation.

import torch
import torch.nn.functional as F
from transformers import GPT2LMHeadModel, GPT2Tokenizer


MODEL_ID = "gpt2"
PHRASES = ("We the people", "Are the people")
TARGET = "people"

torch.set_printoptions(precision=4, sci_mode=False)

tokenizer = GPT2Tokenizer.from_pretrained(MODEL_ID)
model = GPT2LMHeadModel.from_pretrained(MODEL_ID)
model.eval()


def decode_tokens(input_ids):
    """Show the real BPE tokens GPT-2 received."""
    bpe_tokens = tokenizer.convert_ids_to_tokens(input_ids[0])
    decoded = [tokenizer.decode([tok_id]) for tok_id in input_ids[0]]

    print("\nReal tokens:")
    print("pos | BPE token     | decode")
    print("----+---------------+----------")

    for pos, (bpe, text) in enumerate(zip(bpe_tokens, decoded)):
        print(f"{pos:>3} | {bpe:>13} | {text!r}")

    return decoded


def target_position(decoded_tokens, target):
    """Find 'people' even when the space is part of the token: ' people'."""
    for pos, text in enumerate(decoded_tokens):
        if text.strip() == target:
            return pos

    raise ValueError(f"{target!r} not found in {decoded_tokens!r}")


def top_next_tokens(logits, k=5):
    """Convert final-position logits into top-k next tokens."""
    probs = torch.softmax(logits, dim=-1)
    values, ids = probs.topk(k)

    return [
        (tokenizer.decode([tok_id.item()]), prob.item())
        for tok_id, prob in zip(ids, values)
    ]


def print_top(title, items):
    print(f"\n{title}")
    for token, prob in items:
        print(f"  {token!r:>12}  {prob:.4f}")


def run_phrase(phrase):
    """Run GPT-2 while keeping hidden states and attentions for every block."""
    inputs = tokenizer(phrase, return_tensors="pt")

    with torch.no_grad():
        outputs = model(
            **inputs,
            output_hidden_states=True,
            output_attentions=True,
        )

    decoded = decode_tokens(inputs["input_ids"])
    pos = target_position(decoded, TARGET)

    print(f"\nPhrase: {phrase!r}")
    print(f"Target token: {decoded[pos]!r} at position {pos}")
    print(f"Shape after the blocks: {tuple(outputs.hidden_states[-1].shape)}")

    return {"inputs": inputs, "outputs": outputs, "tokens": decoded, "pos": pos}


runs = {phrase: run_phrase(phrase) for phrase in PHRASES}


print("\n" + "=" * 78)
print("1) FIXED SHAPE, 'people' VECTOR CHANGING LAYER BY LAYER")
print("=" * 78)

run_a = runs[PHRASES[0]]
run_b = runs[PHRASES[1]]

hidden_a = run_a["outputs"].hidden_states
hidden_b = run_b["outputs"].hidden_states
pos_a = run_a["pos"]
pos_b = run_b["pos"]
base_a = hidden_a[0][0, pos_a, :]
base_b = hidden_b[0][0, pos_b, :]

print("\nlayer    | shape       | cos(A,B) | cos(A,embed) | cos(B,embed)")
print("---------+-------------+----------+--------------+-------------")

for layer_idx, (ha, hb) in enumerate(zip(hidden_a, hidden_b)):
    label = "embed" if layer_idx == 0 else f"block {layer_idx:02d}"
    vec_a = ha[0, pos_a, :]
    vec_b = hb[0, pos_b, :]

    cos_between = F.cosine_similarity(vec_a, vec_b, dim=0).item()
    cos_a_base = F.cosine_similarity(vec_a, base_a, dim=0).item()
    cos_b_base = F.cosine_similarity(vec_b, base_b, dim=0).item()

    print(
        f"{label:>8} | {tuple(ha.shape)!s:<11} |"
        f" {cos_between:>8.4f} | {cos_a_base:>12.4f} | {cos_b_base:>11.4f}"
    )


print("\n" + "=" * 78)
print("2) AVERAGE ATTENTION: WHERE DOES THE 'people' TOKEN LOOK?")
print("=" * 78)

for phrase, run in runs.items():
    print(f"\nPhrase: {phrase!r}")
    header = "block".ljust(10) + "".join(f"{tok!r:>12}" for tok in run["tokens"])
    print(header)
    print("-" * len(header))

    for block_idx, attention in enumerate(run["outputs"].attentions):
        avg_attention = attention[0].mean(dim=0)
        row = avg_attention[run["pos"], :]
        values = "".join(f"{value.item():>12.2f}" for value in row)
        print(f"block {block_idx:02d}".ljust(10) + values)


print("\n" + "=" * 78)
print("3) LOGITS: THE NEXT TOKEN CHANGES WHEN THE VECTOR CHANGES")
print("=" * 78)

for phrase, run in runs.items():
    outputs = run["outputs"]
    embed_state = outputs.hidden_states[0]

    # Didactic probe: apply ln_f + lm_head to the initial embedding.
    # This is not a zero-layer GPT-2, but shows the embedding without context.
    embed_logits = model.lm_head(model.transformer.ln_f(embed_state))
    final_logits = outputs.logits

    print(f"\nPhrase: {phrase!r}")
    print_top("Top-5 before the blocks:", top_next_tokens(embed_logits[0, -1, :]))
    print_top("Top-5 after 12 blocks:", top_next_tokens(final_logits[0, -1, :]))
