import torch
import torch.nn.functional as F
import os
from transformers import GPT2Config

# Constantes oficiais do GPT-2
CONFIG = GPT2Config()
VOCAB_SIZE = CONFIG.vocab_size
N_LAYERS = CONFIG.n_layer
N_HEAD = CONFIG.n_head
N_EMBD = CONFIG.n_embd
HEAD_DIM = N_EMBD // N_HEAD
MAX_POS = CONFIG.max_position_embeddings
INTERMEDIATE_SIZE = CONFIG.n_inner if CONFIG.n_inner else 4 * N_EMBD

WEIGHTS_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "gpt2_weights.pt")
STATE_DICT = torch.load(WEIGHTS_PATH)


def _load_layer_weights(layer_idx, config):
    prefix = f"transformer.h.{layer_idx}."
    layer_state = {k.replace(prefix, ""): v for k, v in STATE_DICT.items() if k.startswith(prefix)}

    embed_dim = config.get("n_embd", CONFIG.n_embd)
    intermediate = config.get("n_inner", CONFIG.n_inner if CONFIG.n_inner else 4 * embed_dim)

    expected_shapes = {
        "attn.c_attn.weight": (embed_dim * 3, embed_dim),
        "attn.c_proj.weight": (embed_dim, embed_dim),
        "mlp.c_fc.weight": (intermediate, embed_dim),
        "mlp.c_proj.weight": (embed_dim, intermediate),
    }

    weights = {}
    for key, value in layer_state.items():
        if key in expected_shapes:
            if value.shape != expected_shapes[key]:
                value = value.T
        weights[key] = value
    return weights
