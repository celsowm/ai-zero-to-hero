import { defineSlide } from './_factory';

export const gpt2BlockAnatomy = defineSlide({
  id: 'gpt2-block-anatomy',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: 'Anatomia do Bloco GPT-2',
      body: `Agora vamos abrir cada bloco do Transformer e entender **cada operação** que acontece dentro dele.

### Por que Conv1D e não Linear?

O GPT-2 usa **Conv1D** (convolução 1D) em vez de camadas **Linear** densas. Na prática, Conv1D com kernel size 1 é equivalente a Linear, mas a implementação original da OpenAI escolheu Conv1D por razões históricas e de eficiência com sequências longas.

- **c_attn**: Um único Conv1D que projeta para Q, K, V simultaneamente (768 → 2304, depois split)
- **c_proj**: Conv1D que projeta a saída da atenção de volta para 768
- **c_fc**: Conv1D que expande 768 → 3072 (MLP intermediário)
- **c_proj (MLP)**: Conv1D que contrai 3072 → 768

### LayerNorm: o estabilizador

O **LayerNorm** normaliza cada vetor de token independentemente, subtraindo a média e dividindo pelo desvio padrão. Isso impede que os valores explodam ou desapareçam ao longo das 12 camadas.

- **ln_1**: Antes da atenção (normaliza input)
- **ln_2**: Antes do MLP (normaliza após residual da atenção)
- **ln_f**: Final, antes do LM Head (última normalização)

### NewGELU: a ativação

O **GELU** (Gaussian Error Linear Unit) é uma ativação mais suave que ReLU:

\`GELU(x) = x · Φ(x)\`

onde Φ(x) é a CDF da distribuição normal. O "New" vem de uma otimização numérica usada na implementação original.

### O ciclo residual

Cada sub-bloco (Atenção e MLP) é envolto por um **residual add**: \`x + sublayer(x)\`. Essa "via expressa" preserva informação original e permite que gradientes fluam sem obstrução durante o backpropagation.`,
      codeExplanations: [],
    },
    'en-us': {
      title: 'GPT-2 Block Anatomy',
      body: `Now let's open each Transformer block and understand **every operation** that happens inside it.

### Why Conv1D and not Linear?

GPT-2 uses **Conv1D** (1D convolution) instead of dense **Linear** layers. In practice, Conv1D with kernel size 1 is equivalent to Linear, but OpenAI's original implementation chose Conv1D for historical reasons and efficiency with long sequences.

- **c_attn**: A single Conv1D that projects to Q, K, V simultaneously (768 → 2304, then split)
- **c_proj**: Conv1D that projects attention output back to 768
- **c_fc**: Conv1D that expands 768 → 3072 (MLP intermediate)
- **c_proj (MLP)**: Conv1D that contracts 3072 → 768

### LayerNorm: the stabilizer

**LayerNorm** normalizes each token vector independently, subtracting the mean and dividing by the standard deviation. This prevents values from exploding or vanishing across the 12 layers.

- **ln_1**: Before attention (normalizes input)
- **ln_2**: Before MLP (normalizes after attention residual)
- **ln_f**: Final, before LM Head (last normalization)

### NewGELU: the activation

**GELU** (Gaussian Error Linear Unit) is a smoother activation than ReLU:

\`GELU(x) = x · Φ(x)\`

where Φ(x) is the normal distribution CDF. The "New" comes from a numerical optimization used in the original implementation.

### The residual cycle

Each sub-block (Attention and MLP) is wrapped by a **residual add**: \`x + sublayer(x)\`. This "highway" preserves original information and allows gradients to flow without obstruction during backpropagation.`,
      codeExplanations: [],
    },
  },
  visual: {
    id: 'gpt2-block-anatomy',
    copy: {
      'pt-br': {
        title: 'GPT2Block — Anatomia Completa',
        subtitle: 'Clique em qualquer operação para ver detalhes',
        legendTitle: 'Operações',
        clickHint: 'Clique em um bloco para ver sua descrição',
        operations: {
          input: 'Input',
          embedding: 'Embedding',
          dropout: 'Dropout',
          layerNorm: 'LayerNorm',
          conv1d: 'Conv1D',
          newGelu: 'NewGELU',
          add: 'Add (Residual)',
          linear: 'Linear',
          output: 'Output',
        },
        descriptions: {
          input: 'Tensor de entrada: [batch_size, sequence_length, d_model]. No GPT-2 small, d_model=768. Cada token vira um vetor de 768 dimensões.',
          embedding: 'Camada de Embedding: dois tipos — wte (Word Token Embedding, mapeia token ID → vetor) e wpe (Word Position Embedding, adiciona informação de posição). Ambos são lookup tables treináveis.',
          dropout: 'Dropout (p=0.1): durante o treinamento, zera aleatoriamente 10% dos neurônios para prevenir overfitting. Na inferência, é desativado. Aplicado após embeddings e dentro de cada sub-bloco.',
          layerNorm: 'Layer Normalization: normaliza cada vetor de token subtraindo a média e dividindo pelo desvio padrão (eps=1e-5). Estabiliza a distribuição ao longo das camadas. ln_1 antes da atenção, ln_2 antes do MLP, ln_f no final.',
          conv1d: 'Convolução 1D com kernel size 1: equivalente a uma camada Linear, mas a implementação original do GPT-2 usa Conv1D. No attention block: c_attn projeta para Q/K/V (768→2304). No MLP: c_fc expande (768→3072), c_proj contrai (3072→768).',
          newGelu: 'GELU (Gaussian Error Linear Unit): GELU(x) = x · Φ(x), onde Φ é a CDF normal. Mais suave que ReLU — permite gradientes negativos suaves. O "New" é uma aproximação numérica usada na implementação da OpenAI.',
          add: 'Residual Add: x + sublayer(x). A "via expressa" do Transformer. Preserva informação original e permite que gradientes fluam sem obstrução durante backpropagation. Essencial para treinar redes profundas (12+ camadas).',
          linear: 'LM Head (Linear): camada final que projeta de 768 dimensões para o tamanho do vocabulário (50257 no GPT-2). Produz logits — scores não-normalizados para cada token do vocabulário.',
          output: 'Softmax: converte logits em probabilidades (soma = 1). Temperatura ajusta a distribuição: temp<1 = mais determinístico, temp>1 = mais aleatório. O token com maior probabilidade é selecionado (ou amostrado).',
        },
        sections: {
          attention: {
            title: 'GPT2Attention',
            description: 'Mecanismo de auto-atentção: projeta input para Q, K, V via Conv1D, calcula scores de atenção com máscara causal, aplica softmax e projeta de volta.',
            layers: [
              { op: 'conv1d', detail: 'c_attn: Q, K, V juntos' },
              { op: 'dropout', detail: 'attn_dropout' },
            ],
          },
          mlp: {
            title: 'GPT2MLP',
            description: 'Feed-forward: expande 4× (768→3072), aplica GELU, contrai de volta (3072→768). Onde a rede faz "deduções" não-lineares.',
            layers: [
              { op: 'conv1d', detail: 'c_fc: 768→3072' },
              { op: 'newgelu', detail: 'GELU activation' },
              { op: 'conv1d', detail: 'c_proj: 3072→768' },
              { op: 'dropout', detail: 'resid_dropout' },
            ],
          },
        },
      },
      'en-us': {
        title: 'GPT2Block — Full Anatomy',
        subtitle: 'Click any operation to see details',
        legendTitle: 'Operations',
        clickHint: 'Click a block to see its description',
        operations: {
          input: 'Input',
          embedding: 'Embedding',
          dropout: 'Dropout',
          layerNorm: 'LayerNorm',
          conv1d: 'Conv1D',
          newGelu: 'NewGELU',
          add: 'Add (Residual)',
          linear: 'Linear',
          output: 'Output',
        },
        descriptions: {
          input: 'Input tensor: [batch_size, sequence_length, d_model]. In GPT-2 small, d_model=768. Each token becomes a 768-dimensional vector.',
          embedding: 'Embedding layer: two types — wte (Word Token Embedding, maps token ID → vector) and wpe (Word Position Embedding, adds position info). Both are trainable lookup tables.',
          dropout: 'Dropout (p=0.1): during training, randomly zeros 10% of neurons to prevent overfitting. Disabled during inference. Applied after embeddings and within each sub-block.',
          layerNorm: 'Layer Normalization: normalizes each token vector by subtracting mean and dividing by standard deviation (eps=1e-5). Stabilizes distribution across layers. ln_1 before attention, ln_2 before MLP, ln_f at the end.',
          conv1d: '1D Convolution with kernel size 1: equivalent to a Linear layer, but GPT-2\'s original implementation uses Conv1D. In attention block: c_attn projects to Q/K/V (768→2304). In MLP: c_fc expands (768→3072), c_proj contracts (3072→768).',
          newGelu: 'GELU (Gaussian Error Linear Unit): GELU(x) = x · Φ(x), where Φ is the normal CDF. Smoother than ReLU — allows smooth negative gradients. The "New" is a numerical approximation used in OpenAI\'s implementation.',
          add: 'Residual Add: x + sublayer(x). The Transformer\'s "highway". Preserves original information and allows gradients to flow without obstruction during backpropagation. Essential for training deep networks (12+ layers).',
          linear: 'LM Head (Linear): final layer that projects from 768 dimensions to vocabulary size (50257 in GPT-2). Produces logits — unnormalized scores for each vocabulary token.',
          output: 'Softmax: converts logits to probabilities (sum = 1). Temperature adjusts distribution: temp<1 = more deterministic, temp>1 = more random. The token with highest probability is selected (or sampled).',
        },
        sections: {
          attention: {
            title: 'GPT2Attention',
            description: 'Self-attention mechanism: projects input to Q, K, V via Conv1D, computes attention scores with causal mask, applies softmax and projects back.',
            layers: [
              { op: 'conv1d', detail: 'c_attn: Q, K, V together' },
              { op: 'dropout', detail: 'attn_dropout' },
            ],
          },
          mlp: {
            title: 'GPT2MLP',
            description: 'Feed-forward: expands 4× (768→3072), applies GELU, contracts back (3072→768). Where the network makes non-linear "deductions".',
            layers: [
              { op: 'conv1d', detail: 'c_fc: 768→3072' },
              { op: 'newgelu', detail: 'GELU activation' },
              { op: 'conv1d', detail: 'c_proj: 3072→768' },
              { op: 'dropout', detail: 'resid_dropout' },
            ],
          },
        },
      },
    },
  },
});
