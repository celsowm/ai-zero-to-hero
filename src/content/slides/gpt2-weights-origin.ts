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
        "treeTitle": "Estrutura do state_dict",
        "totalParams": "124M parâmetros",
        "totalSize": "~500MB",
        "clickToExplore": "Clique para explorar",
      },
      "en-us": {
        "treeTitle": "state_dict structure",
        "totalParams": "124M parameters",
        "totalSize": "~500MB",
        "clickToExplore": "Click to explore",
      }
    },
  },
});
