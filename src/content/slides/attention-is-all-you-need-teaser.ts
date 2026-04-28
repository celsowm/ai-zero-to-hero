import { defineSlide } from './_factory';

export const attentionIsAllYouNeedTeaser = defineSlide({
  id: 'attention-is-all-you-need-teaser',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.44,
      0.56
    ]
  },
  content: {
    'pt-br': {
      title: `Attention is all you need`,
      body: `Em **2017**, o paper **"Attention Is All You Need"** (https://arxiv.org/abs/1706.03762) troca o paradigma de sequência recorrente por atenção vetorizada e abre o caminho para o regime de escala dos LLMs.

1. **Limite estrutural das RNNs/LSTMs:** o estado oculto é atualizado token a token (\`h_t = f(h_{t-1}, x_t)\`). Isso força dependência temporal estrita no treino, reduz ocupação de GPU e alonga o caminho de gradiente em contextos longos.

2. **Atenção como atalho de contexto:** no Transformer, cada token projeta três vetores, \`Q\`, \`K\` e \`V\`. O modelo mede a compatibilidade entre \`Q\` e \`K\` com produto interno escalado, aplica \`softmax(QK^T / sqrt(d_k))\` e usa esses pesos para combinar os \`V\` relevantes. Em vez de comprimir tudo em um único estado recorrente, ele distribui contexto diretamente entre posições úteis.

3. **Paralelismo e custo computacional:** a autoatenção tem custo quadrático no comprimento da sequência (\`O(n^2)\`), mas é altamente paralelizável em hardware matricial. Na prática, isso venceu a recorrência serial para treino em larga escala e tornou viável aumentar largura, profundidade e dados de forma coordenada.

4. **Efeito no ecossistema:** encoder-only (BERT), decoder-only (GPT) e encoder-decoder (T5) derivam dessa base. O ganho não foi só acurácia; foi **taxa de treino por unidade de hardware**, que virou variável central de progresso.

5. **Contexto histórico correto:** os autores estavam majoritariamente ligados a [Google Brain](https://research.google/teams-and-labs/google-brain/) e instituições acadêmicas. [Google DeepMind](https://deepmind.google/) é fase organizacional posterior (integração consolidada a partir de **2023**).

> Resumo técnico: o paper substituiu memória recorrente por roteamento de contexto via atenção e transformou o limite dominante de engenharia em um problema escalável por paralelismo.`,
    },
    'en-us': {
      title: `Attention is all you need`,
      body: `In **2017**, **"Attention Is All You Need"** (https://arxiv.org/abs/1706.03762) replaced recurrent sequence processing with vectorized attention and enabled the scaling regime behind modern LLMs.

1. **Structural limit of RNNs/LSTMs:** hidden state updates are strictly serial (\`h_t = f(h_{t-1}, x_t)\`). That imposes temporal dependency during training, underutilizes GPUs, and lengthens gradient paths on long contexts.

2. **Attention as a context shortcut:** in the Transformer, each token projects three vectors, \`Q\`, \`K\`, and \`V\`. The model measures compatibility between \`Q\` and \`K\` with scaled dot-product attention, applies \`softmax(QK^T / sqrt(d_k))\`, and uses those weights to combine the relevant \`V\` vectors. Instead of compressing everything into a single recurrent state, it distributes context directly across useful positions.

3. **Parallelism vs computational cost:** self-attention is quadratic in sequence length (\`O(n^2)\`), but highly parallel on matrix hardware. In practice this beat recurrent serialism for large-scale training and made coordinated scaling of width, depth, and data feasible.

4. **Ecosystem impact:** encoder-only (BERT), decoder-only (GPT), and encoder-decoder (T5) all build on this foundation. The key gain was not only quality, but **training throughput per hardware unit**, which became the core progress variable.

5. **Accurate historical framing:** authors were mostly linked to [Google Brain](https://research.google/teams-and-labs/google-brain/) and academia. [Google DeepMind](https://deepmind.google/) is a later organizational phase (integration consolidated from **2023** onward).

> Technical summary: the paper replaced recurrent memory flow with attention-based context routing and turned the dominant engineering limit into a parallelizable scaling problem.`,
    },
  },
  visual: {
    id: 'transformer-overview-teaser',
    copy: {
      "pt-br": {
        "interactiveTitle": "Encoder-Decoder Interativo (Tradução)",
        "interactiveHint": "Clique no passo de decodificação para ver os tokens saindo progressivamente.",
        "decodingStepLabel": "Passo de decodificação",
        "sourceLabel": "Origem (PT-BR)",
        "targetLabel": "Destino (EN-US)",
        "memoryLabel": "Memória do encoder",
        "outputLabel": "Saída",
        "inputLabel": "Entrada",
        "previousOutputsLabel": "Saídas anteriores",
        "embeddingsLabel": "Embeddings",
        "positionLabel": "Embeddings + posição",
        "encoderLabel": "ENCODERS",
        "decoderLabel": "DECODERS",
        "linearLabel": "Linear + Softmax",
        "keyLabel": "Kencoder",
        "valueLabel": "Vencoder",
        "keyHintLabel": "onde buscar",
        "valueHintLabel": "o que recuperar",
        "nextTokenLabel": "Próximo token",
        "step1Title": "Passo 1 - Entrada contextualizada",
        "step1Description": "Os tokens de entrada recebem embeddings semânticos e sinal de posição. Isso define ordem e conteúdo antes de qualquer atenção entre palavras.",
        "step2Title": "Passo 2 - Encoder cria memória",
        "step2Description": "O stack de encoders transforma a frase inteira em representações contextualizadas. Cada posição passa a carregar informação sobre as outras posições da sentença.",
        "step3Title": "Passo 3 - Chaves e valores",
        "step3Description": "A saída do encoder vira banco de memória para o decoder: K indica onde buscar e V contém o conteúdo recuperável para cada posição relevante.",
        "step4Title": "Passo 4 - Decoder consulta contexto",
        "step4Description": "Com os tokens já gerados até aqui, o decoder usa atenção mascarada + cross-attention (sobre K/V do encoder) para calcular o próximo estado oculto.",
        "step5Title": "Passo 5 - Projeção para vocabulário",
        "step5Description": "O vetor do decoder passa pela camada Linear + Softmax, gerando distribuição de probabilidade sobre todo o vocabulário para escolher o próximo token.",
        "step6Title": "Passo 6 - Feedback auto-regressivo",
        "step6Description": "O token escolhido é anexado às saídas anteriores e realimentado no decoder no próximo passo de tempo, repetindo o loop até completar a tradução.",
        "sourceSentence": "eu sou um estudante",
        "targetSentence": "i am a student"
      },
      "en-us": {
        "interactiveTitle": "Interactive Encoder-Decoder (Translation)",
        "interactiveHint": "Click each decoding step to reveal the generated target tokens.",
        "decodingStepLabel": "Decoding time step",
        "sourceLabel": "Source (EN-US)",
        "targetLabel": "Target (FR)",
        "memoryLabel": "Encoder memory",
        "outputLabel": "Output",
        "inputLabel": "Input",
        "previousOutputsLabel": "Previous outputs",
        "embeddingsLabel": "Embeddings",
        "positionLabel": "Embeddings + position",
        "encoderLabel": "ENCODERS",
        "decoderLabel": "DECODERS",
        "linearLabel": "Linear + Softmax",
        "keyLabel": "Kencoder",
        "valueLabel": "Vencoder",
        "keyHintLabel": "where to look",
        "valueHintLabel": "what to retrieve",
        "nextTokenLabel": "Next token",
        "step1Title": "Step 1 - Contextualized input",
        "step1Description": "Input tokens receive semantic embeddings plus positional signal, so the model preserves both meaning and order before attention mixing.",
        "step2Title": "Step 2 - Encoder builds memory",
        "step2Description": "Encoder layers transform the full source sentence into contextual representations where each position already encodes relations to other positions.",
        "step3Title": "Step 3 - Keys and values",
        "step3Description": "Encoder outputs become decoder memory: K defines where to attend, and V carries the content that can be fetched from each relevant source token.",
        "step4Title": "Step 4 - Decoder attends",
        "step4Description": "Using previously generated tokens, the decoder applies masked self-attention and cross-attention over encoder K/V to compute the next hidden state.",
        "step5Title": "Step 5 - Vocabulary projection",
        "step5Description": "The decoder state is projected through Linear + Softmax, producing a probability distribution over the vocabulary for next-token selection.",
        "step6Title": "Step 6 - Autoregressive feedback",
        "step6Description": "The selected token is appended to previous outputs and fed back into the next decoding step, repeating until the translated sentence is complete.",
        "sourceSentence": "i am a studant",
        "targetSentence": "je suis un etudiant"
      }
    },
  },
});
