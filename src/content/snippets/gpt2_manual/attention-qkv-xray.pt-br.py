# Raio-X de Q/K/V em uma head real do GPT-2.
# Q e K escolhem pesos; V é o conteúdo que entra na soma.

import math
import torch
import torch.nn.functional as F
from transformers import GPT2LMHeadModel, GPT2Tokenizer


MODEL_ID = "gpt2"
PHRASES = ("We the people", "Are the people")
TARGET = "people"
BLOCK_ID = 0
HEAD_ID = 0
BLOCKS_TO_COMPARE = (0, 1, 2, 5, 8, 11)

torch.set_printoptions(precision=4, sci_mode=False)


def load_gpt2():
    """Força atenção eager quando a versão do Transformers aceita essa opção."""
    tokenizer = GPT2Tokenizer.from_pretrained(MODEL_ID)

    try:
        model = GPT2LMHeadModel.from_pretrained(
            MODEL_ID,
            attn_implementation="eager",
        )
    except TypeError:
        model = GPT2LMHeadModel.from_pretrained(MODEL_ID)

    return tokenizer, model.eval()


tokenizer, model = load_gpt2()


def token_texts(input_ids):
    """Decodifica os ids para ver os tokens reais, incluindo espaços."""
    return [tokenizer.decode([tok_id]) for tok_id in input_ids[0]]


def find_target_position(tokens, target):
    """Acha 'people' mesmo quando o token real é ' people'."""
    for pos, text in enumerate(tokens):
        if text.strip() == target:
            return pos

    raise ValueError(f"{target!r} não encontrado em {tokens!r}")


def split_heads(tensor, n_head):
    """Converte [B, T, C] em [B, H, T, D]."""
    batch, seq_len, width = tensor.shape
    head_dim = width // n_head
    return tensor.view(batch, seq_len, n_head, head_dim).permute(0, 2, 1, 3)


def extract_qkv(hidden_states, block_id):
    """Aplica ln_1 + c_attn para reconstruir Q/K/V do bloco escolhido."""
    block = model.transformer.h[block_id]
    x_norm = block.ln_1(hidden_states[block_id])
    qkv = block.attn.c_attn(x_norm)

    width = model.config.n_embd
    n_head = model.config.n_head
    q, k, v = qkv.split(width, dim=-1)

    return split_heads(q, n_head), split_heads(k, n_head), split_heads(v, n_head)


def causal_attention(q, k, v):
    """Calcula scores, softmax causal e soma ponderada de V."""
    head_dim = q.size(-1)
    seq_len = q.size(-2)

    scores = (q @ k.transpose(-1, -2)) / math.sqrt(head_dim)
    causal_mask = torch.tril(torch.ones(seq_len, seq_len, dtype=torch.bool, device=q.device))
    scores = scores.masked_fill(~causal_mask, float("-inf"))

    weights = torch.softmax(scores, dim=-1)
    context = weights @ v

    return scores, weights, context


def preview(vector, n=6):
    return "[" + ", ".join(f"{value:+.3f}" for value in vector[:n].tolist()) + ", ...]"


def run_phrase(phrase):
    inputs = tokenizer(phrase, return_tensors="pt")

    with torch.no_grad():
        outputs = model(
            **inputs,
            output_hidden_states=True,
            output_attentions=True,
        )

    tokens = token_texts(inputs["input_ids"])
    target_pos = find_target_position(tokens, TARGET)

    print(f"\nFrase: {phrase!r}")
    print(f"Tokens: {tokens}")
    print(f"Token-alvo: {tokens[target_pos]!r} na posição {target_pos}")

    return {"outputs": outputs, "tokens": tokens, "target_pos": target_pos}


runs = {phrase: run_phrase(phrase) for phrase in PHRASES}


print("\n" + "=" * 78)
print(f"Q·K -> softmax -> soma ponderada de V  (bloco {BLOCK_ID}, head {HEAD_ID})")
print("=" * 78)

for phrase, run in runs.items():
    outputs = run["outputs"]
    tokens = run["tokens"]
    target_pos = run["target_pos"]

    q, k, v = extract_qkv(outputs.hidden_states, BLOCK_ID)
    scores, weights, context = causal_attention(q, k, v)

    print(f"\nFrase: {phrase!r}")
    print(f"Shapes: Q={tuple(q.shape)}  K={tuple(k.shape)}  V={tuple(v.shape)}")
    print(f"Q_i do token {tokens[target_pos]!r}: {preview(q[0, HEAD_ID, target_pos])}")

    print(f"\n  {'j':>3} | {'token':>10} | {'Q·K/raiz(d)':>12} | {'peso':>8} | {'||V_j||':>9}")
    print("  " + "-" * 58)
    for j in range(target_pos + 1):
        score = scores[0, HEAD_ID, target_pos, j].item()
        weight = weights[0, HEAD_ID, target_pos, j].item()
        value_norm = v[0, HEAD_ID, j].norm().item()
        print(f"  {j:>3} | {tokens[j]!r:>10} | {score:>12.4f} | {weight:>8.4f} | {value_norm:>9.4f}")

    terms = " + ".join(
        f"{weights[0, HEAD_ID, target_pos, j].item():.3f}*V[{j}]"
        for j in range(target_pos + 1)
    )
    print(f"\nsaída_head[{target_pos}] = {terms}")
    print(f"                  ~= {preview(context[0, HEAD_ID, target_pos])}")


print("\n" + "=" * 78)
print("Checagem contra outputs.attentions do Hugging Face")
print("=" * 78)

for phrase, run in runs.items():
    outputs = run["outputs"]
    q, k, v = extract_qkv(outputs.hidden_states, BLOCK_ID)
    _, manual_weights, _ = causal_attention(q, k, v)

    diff = (manual_weights - outputs.attentions[BLOCK_ID]).abs().max().item()
    status = "OK" if diff < 1e-5 else "DIVERGE"
    print(f"{phrase!r}: max diff = {diff:.2e}  [{status}]")


print("\n" + "=" * 78)
print(f"Cossenos de Q/K/V do token {TARGET!r} entre as duas frases")
print("=" * 78)

run_a = runs[PHRASES[0]]
run_b = runs[PHRASES[1]]


def cosine(a, b):
    return F.cosine_similarity(a.reshape(-1), b.reshape(-1), dim=0).item()


print(f"{'bloco':>5} | {'cos(Q)':>8} | {'cos(K)':>8} | {'cos(V)':>8}")
print("-" * 40)

for block_id in BLOCKS_TO_COMPARE:
    qa, ka, va = extract_qkv(run_a["outputs"].hidden_states, block_id)
    qb, kb, vb = extract_qkv(run_b["outputs"].hidden_states, block_id)

    pos_a = run_a["target_pos"]
    pos_b = run_b["target_pos"]

    print(
        f"{block_id:>5} | "
        f"{cosine(qa[0, :, pos_a], qb[0, :, pos_b]):>8.4f} | "
        f"{cosine(ka[0, :, pos_a], kb[0, :, pos_b]):>8.4f} | "
        f"{cosine(va[0, :, pos_a], vb[0, :, pos_b]):>8.4f}"
    )


print("""
Resumo:
  score(i,j) = Q_i * K_j / sqrt(head_dim), com j <= i
  peso(i,j)  = softmax_j(score(i,j))
  saída_i    = soma_j peso(i,j) * V_j

Q e K escolhem os pesos.
V é o conteúdo misturado na saída da head.
""")
