import { defineSlide } from './_factory';

export const buildGpt2Model = defineSlide({
  id: 'build-gpt2-model',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
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

Quando essas peças empilham, temos uma miniatura da exata mesma arquitetura rodando nos servidores da OpenAI.

---

\`\`\`python
snippet:build_gpt2/build-gpt2-model
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      33
    ],
    "content": "A Atenção. Note a separação entre Query, Key e Value. O truque `is_causal=True` no PyTorch mascara automaticamente a matriz superior, evitando que um token espreite o que vem a seguir."
  },
    {
    "lineRange": [
      37,
      55
    ],
    "content": "O Bloco. É aqui que entra a rodovia residual `x = x + ...`. Sem essa soma boba, arquiteturas profundas sofreriam de 'Desaparecimento do Gradiente'."
  },
    {
    "lineRange": [
      59,
      85
    ],
    "content": "O chassi principal. Juntamos Posicionamento (`wpe`) + Identidade (`wte`), passamos pelo funil de blocos e finalmente transformamos num vetor do tamanho do nosso Vocabulário (`lm_head`)."
  }
  ],
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

When these pieces stack up, we have a miniature of the exact same architecture running on OpenAI's servers.

---

\`\`\`python
snippet:build_gpt2/build-gpt2-model
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      33
    ],
    "content": "Attention. Note the split between Query, Key, and Value. The `is_causal=True` trick in PyTorch automatically masks the upper matrix, preventing a token from peeking at what comes next."
  },
    {
    "lineRange": [
      37,
      55
    ],
    "content": "The Block. This is where the residual highway `x = x + ...` comes in. Without this silly sum, deep architectures would suffer from 'Vanishing Gradients'."
  },
    {
    "lineRange": [
      59,
      85
    ],
    "content": "The main chassis. We join Positioning (`wpe`) + Identity (`wte`), pass through the funnel of blocks, and finally transform into a vector the size of our Vocabulary (`lm_head`)."
  }
  ],
    },
  },
});
