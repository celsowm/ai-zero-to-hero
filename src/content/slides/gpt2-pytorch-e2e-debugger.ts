import { defineSlide } from './_factory';

export const gpt2PytorchE2eDebugger = defineSlide({
  id: 'gpt2-pytorch-e2e-debugger',
  type: 'custom',
  content: {
    'pt-br': { title: `GPT-2 em ação: Debugger da Inferência`, body: `` },
    'en-us': { title: `GPT-2 in action: Inference Debugger`, body: `` },
  },
  visual: {
    id: 'gpt2-pytorch-e2e-debugger',
    copy: {
      "pt-br": {
        "title": "Debugger da Inferência GPT-2",
        "subtitle": "Acompanhe passo a passo como o texto vira logits e o próximo token é previsto — sem pipeline(), sem mágica.",
        "promptLabel": "Prompt de entrada",
        "defaultPrompt": "We the people of",
        "stepButton": "Step",
        "playButton": "Play",
        "pauseButton": "Pause",
        "resetButton": "Reset",
        "speedSample": "1×",
        "speedFast": "3×",
        "stages": {
          "tokenEmbedding": "Token Embedding (wte)",
          "positionEmbedding": "Position Embedding (wpe)",
          "blockPrefix": "Bloco Transformer",
          "finalNorm": "LayerNorm Final (ln_f)",
          "lmHead": "LM Head (768 → 50257)",
          "softmax": "Softmax → Probabilidades",
          "nextToken": "Próximo Token"
        },
        "labels": {
          "logitsLabel": "Logits brutos",
          "probsLabel": "Probabilidades",
          "tokenIdLabel": "ID",
          "tokenTextLabel": "Token",
          "attentionLabel": "Pesos de atenção",
          "hiddenStateLabel": "Hidden state",
          "stageInfo": "Fase",
          "phaseTitle": "Fase atual",
          "archLabel": "GPT-2",
          "codeTitle": "Código Python",
          "inputTokensLabel": "Tokens de entrada",
          "currentTensorLabel": "Tensor atual",
          "topTokensLabel": "Top Tokens",
          "tensorShapesLabel": "Shapes dos tensores",
          "wteLabel": "wte (token)",
          "wpeLabel": "wpe (posição)",
          "cAttnLabel": "c_attn (QKV)",
          "cFcLabel": "c_fc (MLP)",
          "lmHeadLabel": "lm_head",
          "speedLabel": "Velocidade"
        },
        "architecture": {
          "nEmbd": 768,
          "nHead": 12,
          "nLayer": 12,
          "vocabSize": 50257,
          "seqLen": 4,
          "label": "12L×768D×12H"
        },
        "codeHighlightRanges": {
          "embedding": [1, 36],
          "attention": [38, 72],
          "mlp": [74, 95],
          "residual": [97, 122],
          "finalNorm": [124, 151],
          "lmHead": [153, 164],
          "generation": [166, 180]
        },
        "pythonSource": {
          "snippetId": "gpt2_pytorch/gpt2-e2e-debugger",
          "language": "python"
        },
        "phaseExplanations": {
          "embedding": "Cada token ID (964, 372, 6616, 286) é mapeado para um vetor de 768 dimensões pela tabela wte. A posição (0, 1, 2, 3) é somada via wpe. O resultado [1, 4, 768] carrega tanto o significado quanto a ordem de cada token. Sem posição, 'of the people' seria idêntico a 'people the of'.",
          "attention": "O c_attn projeta o hidden state [1, 4, 768] em Q, K, V (2304 dimensões, depois split em 12 heads × 64). O scaled dot-product (Q @ K.T / √64) calcula atenção entre todos os pares de tokens. O `masked_fill` coloca `-inf` nas posições futuras antes do softmax, zerando essas probabilidades. Os pesos [12, 4, 4] mostram quanto cada token 'olhou' para os outros.",
          "mlp": "Depois da atenção, o MLP expande de 768 para 3072 (4×), aplica GELU e contrai de volta para 768. É a etapa de raciocínio não-linear: a atenção trouxe contexto, o MLP deduz padrões e relações. Pense como 'ler e entender' vs 'buscar referências'.",
          "residual": "O input original é somado com a saída da atenção e depois com a saída do MLP. Cada '+' preserva informação que poderia se perder ao longo das 12 camadas. É a 'via expressa' que permite gradientes fluírem e tokens manterem sua identidade original.",
          "finalNorm": "Após os 12 blocos, o hidden state [1, 4, 768] passa pelo LayerNorm final (ln_f). Isso estabiliza a distribuição dos vetores — essencial antes de projetar para o vocabulário. Sem normalização, logits extremos dominariam o softmax.",
          "lmHead": "A matriz lm_head [768, 50257] projeta cada vetor de 768 dimensões de volta para o espaço do vocabulário. Cada posição gera 50257 logits — scores brutos não normalizados. No GPT-2 original, esta matriz compartilha pesos com wte (weight tying): é a mesma tabela usada ao contrário.",
          "softmax": "O softmax transforma os 50257 logits do último token em probabilidades. Tokens com logits altos ganham %, mas a temperatura controla: baixa = determinístico, alta = criativo. Aqui vemos os top-5 tokens e suas probabilidades relativas.",
          "nextToken": "O multinomial 'rola os dados' sobre as probabilidades do softmax. O token sorteado é anexado ao input e todo o processo recomeça. Este loop auto-regressivo é exatamente como o ChatGPT gera texto token por token na sua tela."
        },
        "tooltips": {
          "embedding": "Token Embedding: mapeia token ID para vetor denso de 768 dimensões.",
          "attention": "Multi-Head Attention: cada head foca em diferentes relações contextuais.",
          "mlp": "MLP: expansão 4× + GELU para raciocínio não-linear.",
          "residual": "Residual Connection: preserva informação através das camadas."
        }
      },
      "en-us": {
        "title": "GPT-2 Inference Debugger",
        "subtitle": "Follow step by step how text becomes logits and the next token is predicted — no pipeline(), no magic.",
        "promptLabel": "Input prompt",
        "defaultPrompt": "We the people of",
        "stepButton": "Step",
        "playButton": "Play",
        "pauseButton": "Pause",
        "resetButton": "Reset",
        "speedSample": "1×",
        "speedFast": "3×",
        "stages": {
          "tokenEmbedding": "Token Embedding (wte)",
          "positionEmbedding": "Position Embedding (wpe)",
          "blockPrefix": "Transformer Block",
          "finalNorm": "Final LayerNorm (ln_f)",
          "lmHead": "LM Head (768 → 50257)",
          "softmax": "Softmax → Probabilities",
          "nextToken": "Next Token"
        },
        "labels": {
          "logitsLabel": "Raw logits",
          "probsLabel": "Probabilities",
          "tokenIdLabel": "ID",
          "tokenTextLabel": "Token",
          "attentionLabel": "Attention weights",
          "hiddenStateLabel": "Hidden state",
          "stageInfo": "Phase",
          "phaseTitle": "Current phase",
          "archLabel": "GPT-2",
          "codeTitle": "Python code",
          "inputTokensLabel": "Input tokens",
          "currentTensorLabel": "Current tensor",
          "topTokensLabel": "Top Tokens",
          "tensorShapesLabel": "Tensor shapes",
          "wteLabel": "wte (token)",
          "wpeLabel": "wpe (position)",
          "cAttnLabel": "c_attn (QKV)",
          "cFcLabel": "c_fc (MLP)",
          "lmHeadLabel": "lm_head",
          "speedLabel": "Speed"
        },
        "architecture": {
          "nEmbd": 768,
          "nHead": 12,
          "nLayer": 12,
          "vocabSize": 50257,
          "seqLen": 4,
          "label": "12L×768D×12H"
        },
        "codeHighlightRanges": {
          "embedding": [1, 36],
          "attention": [38, 72],
          "mlp": [74, 95],
          "residual": [97, 122],
          "finalNorm": [124, 151],
          "lmHead": [153, 164],
          "generation": [166, 180]
        },
        "pythonSource": {
          "snippetId": "gpt2_pytorch/gpt2-e2e-debugger",
          "language": "python"
        },
        "phaseExplanations": {
          "embedding": "Each token ID (964, 372, 6616, 286) is mapped to a 768-dimensional vector by the wte table. Position (0, 1, 2, 3) is added via wpe. The result [1, 4, 768] carries both meaning and order. Without position, 'of the people' would be identical to 'people the of'.",
          "attention": "c_attn projects the hidden state [1, 4, 768] into Q, K, V (2304 dims, then split into 12 heads × 64). Scaled dot-product (Q @ K.T / √64) computes attention between all token pairs. `masked_fill` places `-inf` on future positions before softmax, zeroing those probabilities. Weights [12, 4, 4] show how much each token 'looked at' others.",
          "mlp": "After attention, the MLP expands from 768 to 3072 (4×), applies GELU, and contracts back to 768. This is the non-linear reasoning stage: attention brought context, MLP deduces patterns and relationships. Think of it as 'reading and understanding' vs 'looking up references'.",
          "residual": "The original input is summed with attention output and then with MLP output. Each '+' preserves information that could be lost across 12 layers. It's the 'highway' that allows gradients to flow and tokens to maintain their original identity.",
          "finalNorm": "After 12 blocks, the hidden state [1, 4, 768] passes through the final LayerNorm (ln_f). This stabilizes vector distribution — essential before projecting to vocabulary. Without normalization, extreme logits would dominate softmax.",
          "lmHead": "The lm_head matrix [768, 50257] projects each 768-dim vector back into vocabulary space. Each position produces 50257 logits — raw unnormalized scores. In the original GPT-2, this matrix shares weights with wte (weight tying): it's the same table used in reverse.",
          "softmax": "Softmax transforms the 50257 logits from the last token into probabilities. Tokens with high logits gain %, but temperature controls it: low = deterministic, high = creative. Here we see the top-5 tokens and their relative probabilities.",
          "nextToken": "Multinomial 'rolls the dice' over softmax probabilities. The sampled token is appended to the input and the whole process restarts. This autoregressive loop is exactly how ChatGPT generates text token by token on your screen."
        },
        "tooltips": {
          "embedding": "Token Embedding: maps token ID to a dense 768-dim vector.",
          "attention": "Multi-Head Attention: each head focuses on different contextual relationships.",
          "mlp": "MLP: 4× expansion + GELU for non-linear reasoning.",
          "residual": "Residual Connection: preserves information across layers."
        }
      }
    },
  },
});
