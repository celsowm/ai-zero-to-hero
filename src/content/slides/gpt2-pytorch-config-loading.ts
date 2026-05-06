import { defineSlide } from './_factory';

export const gpt2PytorchConfigLoading = defineSlide({
  id: 'gpt2-pytorch-config-loading',
  type: 'two-column',
  options: {
    "columnRatios": [0.42, 0.58]
  },
  content: {
    'pt-br': {
      title: `GPT-2 por dentro: Configuração e Pesos`,
      body: `Até aqui vimos o raio-X do GPT-2. Agora vamos **implementar** — sem a abstração \`pipeline()\` do HuggingFace, sem \`AutoModelForCausalLM\`. PyTorch puro.

### As constantes que definem o modelo

O GPT-2 é definido por números: tamanho do vocabulário, número de camadas, heads de atenção, dimensão dos embeddings. Esses números vêm da configuração oficial e determinam **todo** o comportamento da rede.

### Carregando pesos reais

O \`torch.load\` traz os pesos treinados direto do checkpoint oficial do GPT-2. Não é inicialização aleatória — é o cérebro que já aprendeu a prever o próximo token com bilhões de exemplos. A função \*_load_layer_weights\* extrai os pesos de cada camada e faz o transpose quando necessário (porque o GPT-2 usa \`Conv1D\` internamente, mas nós usamos \`Linear\`).

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-config-loading
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "As constantes do GPT-2: 50257 tokens, 12 camadas, 12 heads, 768 dimensões. Esses números são a 'anatomia' do modelo." },
        { "lineRange": [15, 40], "content": "Carregamento dos pesos reais do HuggingFace. A função extrai pesos por camada e faz transpose quando necessário (Conv1D → Linear)." }
      ],
    },
    'en-us': {
      title: `GPT-2 internals: Config and Weights`,
      body: `So far we've seen the X-ray of GPT-2. Now let's **implement** it — no HuggingFace \`pipeline()\` abstraction, no \`AutoModelForCausalLM\`. Pure PyTorch.

### The constants that define the model

GPT-2 is defined by numbers: vocabulary size, number of layers, attention heads, embedding dimensions. These numbers come from the official config and determine **all** of the network's behavior.

### Loading real weights

\`torch.load\` brings trained weights directly from the official GPT-2 checkpoint. This is not random initialization — it's a brain that has already learned to predict the next token from billions of examples. The \*_load_layer_weights\* function extracts weights per layer and transposes when needed (because GPT-2 uses \`Conv1D\` internally, but we use \`Linear\`).

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-config-loading
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "GPT-2 constants: 50257 tokens, 12 layers, 12 heads, 768 dimensions. These numbers are the 'anatomy' of the model." },
        { "lineRange": [15, 40], "content": "Loading real HuggingFace weights. The function extracts weights per layer and transposes when needed (Conv1D → Linear)." }
      ],
    },
  },
});
