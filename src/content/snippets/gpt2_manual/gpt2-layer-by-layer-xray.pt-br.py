# Raio-X camada por camada do GPT-2:
# mesmo shape, mesmo token-alvo, representação contextual diferente.

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
    """Mostra os tokens BPE reais que o GPT-2 recebeu."""
    bpe_tokens = tokenizer.convert_ids_to_tokens(input_ids[0])
    decoded = [tokenizer.decode([tok_id]) for tok_id in input_ids[0]]

    print("\nTokens reais:")
    print("pos | token BPE     | decode")
    print("----+---------------+----------")

    for pos, (bpe, text) in enumerate(zip(bpe_tokens, decoded)):
        print(f"{pos:>3} | {bpe:>13} | {text!r}")

    return decoded


def target_position(decoded_tokens, target):
    """Acha 'people' mesmo quando o espaço faz parte do token: ' people'."""
    for pos, text in enumerate(decoded_tokens):
        if text.strip() == target:
            return pos

    raise ValueError(f"{target!r} não encontrado em {decoded_tokens!r}")


def top_next_tokens(logits, k=5):
    """Converte logits da última posição em top-k próximos tokens."""
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
    """Roda GPT-2 preservando hidden states e atenções de todos os blocos."""
    inputs = tokenizer(phrase, return_tensors="pt")

    with torch.no_grad():
        outputs = model(
            **inputs,
            output_hidden_states=True,
            output_attentions=True,
        )

    decoded = decode_tokens(inputs["input_ids"])
    pos = target_position(decoded, TARGET)

    print(f"\nFrase: {phrase!r}")
    print(f"Token-alvo: {decoded[pos]!r} na posição {pos}")
    print(f"Shape depois dos blocos: {tuple(outputs.hidden_states[-1].shape)}")

    return {"inputs": inputs, "outputs": outputs, "tokens": decoded, "pos": pos}


runs = {phrase: run_phrase(phrase) for phrase in PHRASES}


print("\n" + "=" * 78)
print("1) SHAPE FIXO, VETOR DE 'people' MUDANDO CAMADA A CAMADA")
print("=" * 78)

run_a = runs[PHRASES[0]]
run_b = runs[PHRASES[1]]

hidden_a = run_a["outputs"].hidden_states
hidden_b = run_b["outputs"].hidden_states
pos_a = run_a["pos"]
pos_b = run_b["pos"]
base_a = hidden_a[0][0, pos_a, :]
base_b = hidden_b[0][0, pos_b, :]

print("\ncamada   | shape       | cos(A,B) | cos(A,embed) | cos(B,embed)")
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
print("2) ATENÇÃO MÉDIA: PARA ONDE O TOKEN 'people' OLHA?")
print("=" * 78)

for phrase, run in runs.items():
    print(f"\nFrase: {phrase!r}")
    header = "bloco".ljust(10) + "".join(f"{tok!r:>12}" for tok in run["tokens"])
    print(header)
    print("-" * len(header))

    for block_idx, attention in enumerate(run["outputs"].attentions):
        avg_attention = attention[0].mean(dim=0)
        row = avg_attention[run["pos"], :]
        values = "".join(f"{value.item():>12.2f}" for value in row)
        print(f"block {block_idx:02d}".ljust(10) + values)


print("\n" + "=" * 78)
print("3) LOGITS: O PRÓXIMO TOKEN MUDA QUANDO O VETOR MUDA")
print("=" * 78)

for phrase, run in runs.items():
    outputs = run["outputs"]
    embed_state = outputs.hidden_states[0]

    # Sonda didática: aplica ln_f + lm_head no embedding inicial.
    # Isso não é um GPT-2 de zero camadas, mas mostra o embedding sem contexto.
    embed_logits = model.lm_head(model.transformer.ln_f(embed_state))
    final_logits = outputs.logits

    print(f"\nFrase: {phrase!r}")
    print_top("Top-5 antes dos blocos:", top_next_tokens(embed_logits[0, -1, :]))
    print_top("Top-5 depois dos 12 blocos:", top_next_tokens(final_logits[0, -1, :]))
