# @region embedding
import torch
import torch.nn.functional as F
import os
from transformers import GPT2Config, GPT2Tokenizer

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
    embed_dim = config.get("n_embd", N_EMBD)
    intermediate = config.get("n_inner", INTERMEDIATE_SIZE)
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
# @endregion

# @region attention
class GPT2Attention(torch.nn.Module):
    def __init__(self, config, layer_idx=None):
        super().__init__()
        embed_dim = config["n_embd"]
        self.num_heads = config["n_head"]
        self.head_dim = embed_dim // self.num_heads
        self.split_size = embed_dim
        self.scaling = self.head_dim ** -0.5
        self.c_attn = torch.nn.Linear(embed_dim, embed_dim * 3)
        self.c_proj = torch.nn.Linear(embed_dim, embed_dim)
        self.resid_dropout = torch.nn.Dropout(0.1)
        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.c_attn.weight.copy_(w["attn.c_attn.weight"])
                self.c_attn.bias.copy_(w["attn.c_attn.bias"])
                self.c_proj.weight.copy_(w["attn.c_proj.weight"])
                self.c_proj.bias.copy_(w["attn.c_proj.bias"])

    def forward(self, hidden_states, attention_mask=None):
        qkv = self.c_attn(hidden_states)
        query, key, value = qkv.split(self.split_size, dim=-1)
        query = query.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)
        key = key.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)
        value = value.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)
        attn_weights = (query @ key.transpose(-2, -1)) * self.scaling
        if attention_mask is not None:
            attn_weights = attn_weights.masked_fill(attention_mask, float("-inf"))
        attn_weights = F.softmax(attn_weights, dim=-1)
        attn_output = attn_weights @ value
        attn_output = attn_output.transpose(1, 2).contiguous()
        attn_output = attn_output.reshape(*attn_output.shape[:-2], -1)
        attn_output = self.c_proj(attn_output)
        attn_output = self.resid_dropout(attn_output)
        return attn_output, attn_weights
# @endregion

# @region mlp
class GPT2MLP(torch.nn.Module):
    def __init__(self, config, layer_idx=None):
        super().__init__()
        embed_dim = config["n_embd"]
        self.c_fc = torch.nn.Linear(embed_dim, INTERMEDIATE_SIZE)
        self.c_proj = torch.nn.Linear(INTERMEDIATE_SIZE, embed_dim)
        self.act = F.gelu
        self.dropout = torch.nn.Dropout(0.1)
        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.c_fc.weight.copy_(w["mlp.c_fc.weight"])
                self.c_fc.bias.copy_(w["mlp.c_fc.bias"])
                self.c_proj.weight.copy_(w["mlp.c_proj.weight"])
                self.c_proj.bias.copy_(w["mlp.c_proj.bias"])

    def forward(self, hidden_states):
        hidden_states = self.c_fc(hidden_states)
        hidden_states = self.act(hidden_states)
        hidden_states = self.c_proj(hidden_states)
        hidden_states = self.dropout(hidden_states)
        return hidden_states
# @endregion

# @region residual
class GPT2Block(torch.nn.Module):
    def __init__(self, layer_idx, config):
        super().__init__()
        hidden_size = config["n_embd"]
        self.ln_1 = torch.nn.LayerNorm(hidden_size, eps=1e-5)
        self.attn = GPT2Attention(config, layer_idx=layer_idx)
        self.ln_2 = torch.nn.LayerNorm(hidden_size, eps=1e-5)
        self.mlp = GPT2MLP(config, layer_idx=layer_idx)
        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.ln_1.weight.copy_(w["ln_1.weight"])
                self.ln_1.bias.copy_(w["ln_1.bias"])
                self.ln_2.weight.copy_(w["ln_2.weight"])
                self.ln_2.bias.copy_(w["ln_2.bias"])

    def forward(self, hidden_states, attention_mask=None):
        residual = hidden_states
        hidden_states = self.ln_1(hidden_states)
        attn_output, _ = self.attn(hidden_states, attention_mask)
        hidden_states = residual + attn_output
        residual = hidden_states
        hidden_states = self.ln_2(hidden_states)
        feed_forward_hidden_states = self.mlp(hidden_states)
        hidden_states = residual + feed_forward_hidden_states
        return hidden_states
# @endregion

# @region finalNorm
class GPT2Model(torch.nn.Module):
    def __init__(self, config):
        super().__init__()
        self.wte = torch.nn.Embedding(VOCAB_SIZE, N_EMBD)
        self.wpe = torch.nn.Embedding(MAX_POS, N_EMBD)
        self.drop = torch.nn.Dropout(0.1)
        self.h = torch.nn.ModuleList([GPT2Block(i, config) for i in range(N_LAYERS)])
        self.ln_f = torch.nn.LayerNorm(N_EMBD, eps=1e-5)
        with torch.no_grad():
            self.wte.weight.copy_(STATE_DICT["transformer.wte.weight"])
            self.wpe.weight.copy_(STATE_DICT["transformer.wpe.weight"])
            self.ln_f.weight.copy_(STATE_DICT["transformer.ln_f.weight"])
            self.ln_f.bias.copy_(STATE_DICT["transformer.ln_f.bias"])

    def forward(self, input_ids, attention_mask=None):
        token_embeds = self.wte(input_ids)
        position_ids = torch.arange(input_ids.size(1), dtype=torch.long, device=input_ids.device).unsqueeze(0)
        position_embeds = self.wpe(position_ids)
        hidden_states = token_embeds + position_embeds
        hidden_states = self.drop(hidden_states)
        causal_mask = torch.triu(
            torch.ones(input_ids.size(1), input_ids.size(1), device=input_ids.device),
            diagonal=1
        ).bool().unsqueeze(0).unsqueeze(0)
        for block in self.h:
            hidden_states = block(hidden_states, causal_mask)
        hidden_states = self.ln_f(hidden_states)
        return hidden_states
# @endregion

# @region lmHead
class GPT2LMHeadModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.transformer = GPT2Model({"n_embd": N_EMBD, "n_head": N_HEAD})
        self.lm_head = torch.nn.Linear(N_EMBD, VOCAB_SIZE, bias=False)
        with torch.no_grad():
            self.lm_head.weight.copy_(STATE_DICT["lm_head.weight"])

    def forward(self, input_ids):
        hidden_states = self.transformer(input_ids)
        logits = self.lm_head(hidden_states)
        return logits
# @endregion

# @region generation
if __name__ == "__main__":
    model = GPT2LMHeadModel()
    model.eval()
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    prompt = "We the people of"
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    for _ in range(20):
        with torch.no_grad():
            logits = model(input_ids)
            probs = F.softmax(logits[0, -1, :] / 0.8, dim=-1)
            next_token = torch.multinomial(probs, num_samples=1).item()
        input_ids = torch.cat([input_ids, torch.tensor([[next_token]])], dim=-1)
        if next_token == tokenizer.eos_token_id:
            break
    print(tokenizer.decode(input_ids[0]))
# @endregion
