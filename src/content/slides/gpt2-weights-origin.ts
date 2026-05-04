import { defineSlide } from './_factory';

export const gpt2WeightsOrigin = defineSlide({
  id: 'gpt2-weights-origin',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.5,
      0.5
    ]
  },
  content: {
    'pt-br': {
      title: `De onde vêm os pesos do GPT-2?`,
      body: `Os snippets que veremos a seguir fazem \`torch.load("gpt2_weights.pt")\`. Mas **de onde vem esse arquivo**?

1. **A OpenAI treinou o GPT-2 em 2019** e disponibilizou os pesos no HuggingFace Hub. O modelo "gpt2" (small) tem **124M parâmetros** → ~500MB em disco.

2. **Os pesos estão no formato .safetensors** — um padrão seguro e rápido criado pela HuggingFace. Cada tensor tem nome como \`transformer.h.0.attn.c_attn.weight\` que indica: camada (0), módulo (attn), tensor (weight).

3. **Para usar com PyTorch puro**, convertemos com \`from_pretrained("gpt2")\` → \`model.save_pretrained()\` → \`torch.save(state_dict)\`. O arquivo \`.pt\` é um dicionário Python com todos os tensores.

4. **O que cada tensor faz:** \`.wte\` e \`.wpe\` são os token/position embeddings, \`.h.{n}.attn.*\` são os pesos de atenção da camada n, \`.h.{n}.mlp.*\` são os pesos do MLP, \`.ln_f\` é a normalização final, e \`.lm_head\` projete de volta para o vocabulário.

> Nos próximos slides, usamos os pesos reais do GPT-2 para montar cada camada **manualmente** — entendendo o que cada matriz faz.`,
    },
    'en-us': {
      title: `Where do GPT-2 weights come from?`,
      body: `The upcoming snippets do \`torch.load("gpt2_weights.pt")\`. But **where does this file come from**?

1. **OpenAI trained GPT-2 in 2019** and released the weights on HuggingFace Hub. The "gpt2" (small) model has **124M parameters** → ~500MB on disk.

2. **Weights are in .safetensors format** — a safe and fast standard created by HuggingFace. Each tensor has a name like \`transformer.h.0.attn.c_attn.weight\` indicating: layer (0), module (attn), tensor (weight).

3. **To use with pure PyTorch**, we convert with \`from_pretrained("gpt2")\` → \`model.save_pretrained()\` → \`torch.save(state_dict)\`. The \`.pt\` file is a Python dict with all tensors.

4. **What each tensor does:** \`.wte\` and \`.wpe\` are token/position embeddings, \`.h.{n}.attn.*\` are attention weights for layer n, \`.h.{n}.mlp.*\` are MLP weights, \`.ln_f\` is final normalization, and \`.lm_head\` projects back to vocabulary.

> In the next slides, we use real GPT-2 weights to build each layer **manually** — understanding what each matrix does.`,
    },
  },
  visual: {
    id: 'weights-tree-visual',
    copy: {
      "pt-br": {
        "tabs": [
          { "label": "Estrutura" },
          { "label": "Código" }
        ],
        "treePanel": {
          "title": "Estrutura do state_dict"
        },
        "codePanel": {
          "title": "Baixar e converter pesos do GPT-2",
          "description": "Código completo para baixar o modelo do HuggingFace Hub e salvar os pesos em .pt e .safetensors.",
          "code": `# 1. Instalar dependências
# pip install transformers torch safetensors

from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from safetensors.torch import save_file
import os

# 2. Baixar modelo e tokenizer do HuggingFace Hub
MODEL_NAME = "gpt2"
print(f"Baixando {MODEL_NAME} do HuggingFace Hub...")
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)
model.eval()

# 3. Inspect — ver os shapes de cada tensor
print(f"Total de parâmetros: {model.num_parameters():,}")
print("State dict keys:")
for k, v in model.state_dict().items():
    print(f"  {k:50s} {tuple(v.shape)}")

# 4. Salvar em formato PyTorch (.pt)
OUTPUT_PT = "gpt2_weights.pt"
torch.save(model.state_dict(), OUTPUT_PT)
print(f"Salvo {OUTPUT_PT} ({os.path.getsize(OUTPUT_PT) / 1e6:.0f}MB)")

# 5. (Opcional) Salvar em .safetensors — mais seguro e rápido
OUTPUT_SF = "gpt2_weights.safetensors"
save_file(model.state_dict(), OUTPUT_SF)
print(f"Salvo {OUTPUT_SF} ({os.path.getsize(OUTPUT_SF) / 1e6:.0f}MB)")

# 6. Verificar — carregar de volta
loaded = torch.load(OUTPUT_PT, weights_only=True)
assert loaded.keys() == model.state_dict().keys()
print("Verificado: pesos carregados com sucesso!")`,
          "codeExplanations": [
            { "lineRange": [1, 2], "content": "Instalamos as dependências: transformers (modelo), torch (PyTorch) e safetensors (formato seguro)." },
            { "lineRange": [4, 6], "content": "Importamos o modelo GPT-2, o tokenizer e a função para salvar em .safetensors." },
            { "lineRange": [9, 13], "content": "Baixamos o modelo e tokenizer do HuggingFace Hub automaticamente. .eval() desativa dropout." },
            { "lineRange": [16, 19], "content": "Inspecionamos o state_dict — cada chave é um tensor com nome que indica a camada e o módulo." },
            { "lineRange": [22, 24], "content": "Salvamos todos os pesos em um arquivo .pt (formato nativo do PyTorch)." },
            { "lineRange": [27, 29], "content": "Formato .safetensors é mais seguro (sem eval) e mais rápido para carregar." },
            { "lineRange": [32, 34], "content": "Verificamos que os pesos carregados batem com o original — integridade confirmada." },
          ],
        },
      },
      "en-us": {
        "tabs": [
          { "label": "Structure" },
          { "label": "Code" }
        ],
        "treePanel": {
          "title": "state_dict structure"
        },
        "codePanel": {
          "title": "Download and convert GPT-2 weights",
          "description": "Full code to download model from HuggingFace Hub and save weights as .pt and .safetensors.",
          "code": `# 1. Install dependencies
# pip install transformers torch safetensors

from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from safetensors.torch import save_file
import os

# 2. Download model and tokenizer from HuggingFace Hub
MODEL_NAME = "gpt2"
print(f"Downloading {MODEL_NAME} from HuggingFace Hub...")
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)
model.eval()

# 3. Inspect — see shapes of each tensor
print(f"Total parameters: {model.num_parameters():,}")
print("State dict keys:")
for k, v in model.state_dict().items():
    print(f"  {k:50s} {tuple(v.shape)}")

# 4. Save as PyTorch format (.pt)
OUTPUT_PT = "gpt2_weights.pt"
torch.save(model.state_dict(), OUTPUT_PT)
print(f"Saved {OUTPUT_PT} ({os.path.getsize(OUTPUT_PT) / 1e6:.0f}MB)")

# 5. (Optional) Save as .safetensors — safer and faster
OUTPUT_SF = "gpt2_weights.safetensors"
save_file(model.state_dict(), OUTPUT_SF)
print(f"Saved {OUTPUT_SF} ({os.path.getsize(OUTPUT_SF) / 1e6:.0f}MB)")

# 6. Verify — load back
loaded = torch.load(OUTPUT_PT, weights_only=True)
assert loaded.keys() == model.state_dict().keys()
print("Verified: weights loaded successfully!")`,
          "codeExplanations": [
            { "lineRange": [1, 2], "content": "Install dependencies: transformers (model), torch (PyTorch), and safetensors (safe format)." },
            { "lineRange": [4, 6], "content": "Import the GPT-2 model, tokenizer, and the safetensors save function." },
            { "lineRange": [9, 13], "content": "Download model and tokenizer from HuggingFace Hub automatically. .eval() disables dropout." },
            { "lineRange": [16, 19], "content": "Inspect the state_dict — each key is a tensor with a name indicating layer and module." },
            { "lineRange": [22, 24], "content": "Save all weights as a .pt file (native PyTorch format)." },
            { "lineRange": [27, 29], "content": ".safetensors format is safer (no eval) and faster to load." },
            { "lineRange": [32, 34], "content": "Verify loaded weights match the original — integrity confirmed." },
          ],
        },
      },
    },
  },
});
