import { defineSlide } from './_factory';

export const buildGpt2Model = defineSlide({
  id: 'build-gpt2-model',
  type: 'two-column',
  options: {
    "columnRatios": [0.45, 0.55]
  },
  content: {
    'pt-br': {
      title: `Passo 2: Montando a Máquina`,
      body: `Agora, vamos unir todas as teorias matemáticas sobre Transformers que estudamos em código real, montando as peças de LEGO.

### O Código Genético de um GPT

Nossa implementação pura precisa de:
1. **Atenção Causal**: Impede o vazamento do futuro (\`is_causal=True\`).
2. **A Via Expressa (Residual)**: Permite que os gradientes fluam intactos de cima para baixo.
3. **MLP**: A rede neural tradicional que memoriza fatos.
4. **Embeddings**: Onde cada token ganha seu significado inicial mais a sua posição (índice).

Quando essas peças empilham, temos uma miniatura da exata mesma arquitetura rodando nos servidores da OpenAI.`,
    },
    'en-us': {
      title: `Step 2: Assembling the Machine`,
      body: `Now, let's combine all the mathematical theories about Transformers we studied into real code, assembling the LEGO pieces.

### A GPT's Genetic Code

Our pure implementation needs:
1. **Causal Attention**: Prevents future leakage (\`is_causal=True\`).
2. **The Residual Highway**: Allows gradients to flow intact from top to bottom.
3. **MLP**: The traditional neural network that memorizes facts.
4. **Embeddings**: Where each token gets its initial meaning plus its position (index).

When these pieces stack up, we have a miniature of the exact same architecture running on OpenAI's servers.`,
    },
  },
  visual: {
    id: 'build-gpt2-model',
    copy: {
      "pt-br": {
        "tabs": [
          { "label": "Código" },
          { "label": "Arquitetura" }
        ],
        "codePanel": {
          "title": "Implementação GPT-2 em PyTorch",
          "description": "Código completo do modelo GPT-2 com atenção causal, MLP e embedding.",
          "source": {
            "snippetId": "build_gpt2/build-gpt2-model",
            "language": "python"
          }
        },
        "diagramPanel": {
          "attentionLabel": "Atenção Multi-Head",
          "mlpLabel": "MLP (Feed-Forward)",
          "residualLabel": "Residual Stream",
          "blockLabel": "Bloco do Transformer",
          "inputLabel": "Input Tokens",
          "outputLabel": "Output Logits",
          "blocksLabel": "× N blocos",
          "embedLabel": "Embeddings",
          "normLabel": "LayerNorm"
        }
      },
      "en-us": {
        "tabs": [
          { "label": "Code" },
          { "label": "Architecture" }
        ],
        "codePanel": {
          "title": "GPT-2 Implementation in PyTorch",
          "description": "Complete GPT-2 model code with causal attention, MLP, and embedding.",
          "source": {
            "snippetId": "build_gpt2/build-gpt2-model",
            "language": "python"
          }
        },
        "diagramPanel": {
          "attentionLabel": "Multi-Head Attention",
          "mlpLabel": "MLP (Feed-Forward)",
          "residualLabel": "Residual Stream",
          "blockLabel": "Transformer Block",
          "inputLabel": "Input Tokens",
          "outputLabel": "Output Logits",
          "blocksLabel": "× N blocks",
          "embedLabel": "Embeddings",
          "normLabel": "LayerNorm"
        }
      }
    },
  },
});
