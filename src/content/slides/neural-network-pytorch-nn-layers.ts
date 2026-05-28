import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'De camadas isoladas para uma classe PyTorch legível',
      body: `Aqui montamos um modelo de linguagem pequeno, organizado em camadas.

A classe \`TinyStackedLM\` representa um mini language model.

Ela tem três partes principais:

**1. Embedding dos tokens**

\`\`\`text
self.wte = nn.Embedding(vocab_size, n_embd)
\`\`\`

Essa camada transforma cada ID de token em um vetor de tamanho \`n_embd\`.

No exemplo:

\`\`\`text
vocab_size = 32
n_embd = 16
\`\`\`

Ou seja, temos 32 tokens possíveis no vocabulário, e cada token vira um vetor de 16 dimensões.

A entrada é:

\`\`\`text
idx.shape = (2, 3)
\`\`\`

Depois do embedding, internamente temos:

\`\`\`text
x.shape = (2, 3, 16)
\`\`\`

**2. Blocos empilhados**

\`\`\`text
self.blocks = nn.ModuleList([...])
\`\`\`

Aqui criamos várias camadas que processam a representação dos tokens.

No exemplo:

\`\`\`text
num_layers = 2
\`\`\`

Então o modelo passa os vetores por 2 blocos.

Cada bloco tem:

\`\`\`text
LayerNorm(n_embd)
Linear(n_embd, n_embd)
\`\`\`

A \`LayerNorm\` normaliza a representação interna, ajudando a estabilizar o treinamento.

A \`Linear(n_embd, n_embd)\` transforma cada vetor, mantendo a mesma largura:

\`\`\`text
(2, 3, 16) → (2, 3, 16)
\`\`\`

Ou seja, os blocos refinam os vetores, mas não mudam o formato.

**3. Cabeça de linguagem**

\`\`\`text
self.lm_head = nn.Linear(n_embd, vocab_size)
\`\`\`

No final, a \`lm_head\` transforma cada vetor interno em scores sobre o vocabulário.

Ela faz:

\`\`\`text
vetor de 16 dimensões → 32 scores
\`\`\`

Por isso a saída final é:

\`\`\`text
logits.shape = (2, 3, 32)
\`\`\`

Para cada exemplo do lote e para cada posição da sequência, o modelo produz uma pontuação para cada token possível do vocabulário.

**Resumo do fluxo:**

\`\`\`text
idx
→ embedding
→ blocos empilhados
→ lm_head
→ logits
\`\`\`

Em formatos:

\`\`\`text
(2, 3)
→ (2, 3, 16)
→ (2, 3, 16)
→ (2, 3, 32)
\`\`\`

> Esse modelo ainda é bem simples: ele empilha camadas, mas não tem atenção nem contexto causal real. Serve para mostrar a estrutura geral: tokens viram vetores, os vetores passam por camadas, e no final viram scores para prever tokens.`,
    },
    'en-us': {
      title: 'From isolated layers to a readable PyTorch class',
      body: `Here we build a small language model, organized in layers.

The \`TinyStackedLM\` class represents a mini language model.

It has three main parts:

**1. Token embedding**

\`\`\`text
self.wte = nn.Embedding(vocab_size, n_embd)
\`\`\`

This layer transforms each token ID into a vector of size \`n_embd\`.

In the example:

\`\`\`text
vocab_size = 32
n_embd = 16
\`\`\`

That means we have 32 possible tokens in the vocabulary, and each token becomes a 16-dimensional vector.

The input is:

\`\`\`text
idx.shape = (2, 3)
\`\`\`

After embedding, internally we have:

\`\`\`text
x.shape = (2, 3, 16)
\`\`\`

**2. Stacked blocks**

\`\`\`text
self.blocks = nn.ModuleList([...])
\`\`\`

Here we create several layers that process the token representations.

In the example:

\`\`\`text
num_layers = 2
\`\`\`

So the model passes vectors through 2 blocks.

Each block has:

\`\`\`text
LayerNorm(n_embd)
Linear(n_embd, n_embd)
\`\`\`

\`LayerNorm\` normalizes the internal representation, helping stabilize training.

\`Linear(n_embd, n_embd)\` transforms each vector while keeping the same width:

\`\`\`text
(2, 3, 16) → (2, 3, 16)
\`\`\`

In other words, the blocks refine the vectors but do not change the shape.

**3. Language head**

\`\`\`text
self.lm_head = nn.Linear(n_embd, vocab_size)
\`\`\`

At the end, \`lm_head\` transforms each internal vector into scores over the vocabulary.

It does:

\`\`\`text
16-dimensional vector → 32 scores
\`\`\`

So the final output is:

\`\`\`text
logits.shape = (2, 3, 32)
\`\`\`

For each example in the batch and each position in the sequence, the model produces a score for every possible token in the vocabulary.

**Flow summary:**

\`\`\`text
idx
→ embedding
→ stacked blocks
→ lm_head
→ logits
\`\`\`

In shapes:

\`\`\`text
(2, 3)
→ (2, 3, 16)
→ (2, 3, 16)
→ (2, 3, 32)
\`\`\`

> This model is still very simple: it stacks layers, but has no attention or real causal context. It serves to show the general structure: tokens become vectors, vectors pass through layers, and at the end they become scores for predicting tokens.`,
    },
  },
  visual: {
    id: 'pytorch-architecture-blueprint',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Classe mínima, mas executável',
          description: 'O snippet registra submódulos em `__init__`, percorre blocos no `forward` e fecha com logits no mesmo fluxo.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importamos `torch` e `nn` porque agora o exemplo não é só estrutural: ele define a classe e executa um forward real.' },
            { lineRange: [4, 15], content: '`TinyStackedLM` herda de `nn.Module`. O `super().__init__()` registra corretamente os submódulos, e o `__init__` declara três partes do modelo: entrada (`wte`), corpo repetido (`blocks`) e saída (`lm_head`).' },
            { lineRange: [7, 12], content: '`ModuleList` explicita profundidade. Cada bloco é um `Sequential` curto com `LayerNorm` e `Linear`, repetido `num_layers` vezes.' },
            { lineRange: [17, 21], content: 'O `forward` deixa o fluxo visível: IDs entram na embedding, o tensor percorre os blocos preservando o shape `(B,T,C)`, e só no fim a cabeça projeta para `(B,T,V)`.' },
            { lineRange: [21, 25], content: 'Criamos um modelo concreto, passamos um tensor de IDs inteiros e rodamos `logits = model(idx)`. Isso fecha o exemplo ponta a ponta.' },
            { lineRange: [27, 28], content: 'Os prints servem como checklist rápido de debug: a entrada continua `(B,T)` e a saída vira logits sobre o vocabulário.' },
          ],
        },
        architecturePreview: {
          title: 'Fluxo exato do snippet',
          layers: [
            { name: 'wte (Embedding)', shape: '(B,T) -> (B,T,C)', role: 'IDs -> vetores' },
            { name: 'block 1', shape: '(B,T,C) -> (B,T,C)', role: 'LayerNorm + Linear' },
            { name: 'block 2', shape: '(B,T,C) -> (B,T,C)', role: 'LayerNorm + Linear' },
            { name: 'lm_head (Linear)', shape: '(B,T,C) -> (B,T,V)', role: 'logits por token' },
          ],
        },
        blueprintPanel: {
          title: 'Como ler a classe sem se perder',
          subtitle: 'A ordem útil é acompanhar o contrato da classe e o caminho do tensor.',
          stages: [
            { label: '1. __init__', title: 'A classe registra as peças do modelo', shape: 'wte + blocks + lm_head', body: 'O primeiro passo não é rodar nada. É ver quais submódulos existem e qual papel estrutural cada um ocupa.', reading: 'Leia `__init__` como inventário: entrada, corpo repetido e saída.' },
            { label: '2. Embedding', title: '`wte` cria hidden states', shape: '(B,T) -> (B,T,C)', body: 'Os IDs inteiros entram na embedding e viram vetores densos. A partir daqui, o tensor já está no espaço de representação contínua.', reading: 'Se o problema acontecer cedo, cheque dtype inteiro e a transição para `(B,T,C)`.' },
            { label: '3. ModuleList', title: '`blocks` repetem a transformação central', shape: '(B,T,C) -> (B,T,C)', body: 'O loop no `forward` deixa explícito que a mesma estrutura de bloco é aplicada várias vezes sem trocar o contrato de shape.', reading: 'Profundidade em PyTorch costuma aparecer assim: uma lista de blocos percorrida em ordem.' },
            { label: '4. lm_head', title: 'A cabeça final projeta para logits', shape: '(B,T,C) -> (B,T,V)', body: 'Depois do corpo interno, a projeção final troca largura de representação por largura de vocabulário. É aqui que a arquitetura passa de hidden state para decisão.', reading: 'Quando aparecer `lm_head`, pergunte sempre: qual dimensão entra e qual espaço semântico sai?' },
            { label: '5. Debug', title: 'Leitura de shape para localizar quebra', shape: 'idx -> hidden -> logits', body: 'Se o forward falha, siga o caminho do tensor: entrada inteira, hidden state após embedding, hidden state após blocos, logits finais.', reading: 'Debug bom aqui é fluxo, não adivinhação: descubra em qual etapa o contrato deixou de bater.' },
          ],
          invariantsTitle: 'Invariantes da classe',
          invariants: [
            '`__init__` registra as peças; `forward` descreve o caminho do tensor.',
            '`ModuleList` expressa profundidade sem esconder repetição.',
            '`lm_head` fecha o contrato em logits por posição.',
          ],
          diagnosticsTitle: 'Diagnóstico rápido de leitura',
          diagnostics: [
            'Quebrou antes do forward? geralmente falta registro correto em `__init__`.',
            'Quebrou no meio? inspecione um bloco e confirme se ele preserva `(B,T,C)`.',
            'Quebrou no fim? cheque a projeção `C -> V` do `lm_head`.',
          ],
          footer: 'A regra útil aqui é: primeiro leia a classe, depois leia a matemática fina.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }],
        codePanel: {
          title: 'Minimal class, but executable',
          description: 'The snippet registers submodules in `__init__`, walks through blocks in `forward`, and closes with logits in one visible flow.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'We import `torch` and `nn` because the example is no longer just structural: it defines the class and executes a real forward pass.' },
            { lineRange: [4, 15], content: '`TinyStackedLM` subclasses `nn.Module`. `super().__init__()` properly registers child modules, and `__init__` declares the three model regions: input (`wte`), repeated body (`blocks`), and output (`lm_head`).' },
            { lineRange: [7, 12], content: '`ModuleList` makes depth explicit. Each block is a short `Sequential` with `LayerNorm` and `Linear`, repeated `num_layers` times.' },
            { lineRange: [17, 21], content: '`forward` makes the flow legible: token IDs enter embedding, the tensor crosses repeated blocks while preserving `(B,T,C)`, and only then the head projects to `(B,T,V)`.' },
            { lineRange: [21, 25], content: 'We instantiate a concrete model, pass integer token IDs, and run `logits = model(idx)`. This closes the example end to end.' },
            { lineRange: [27, 28], content: 'The prints act as a quick debug checklist: input remains `(B,T)` and output becomes vocabulary logits.' },
          ],
        },
        architecturePreview: {
          title: 'Exact flow from the snippet',
          layers: [
            { name: 'wte (Embedding)', shape: '(B,T) -> (B,T,C)', role: 'IDs -> vectors' },
            { name: 'block 1', shape: '(B,T,C) -> (B,T,C)', role: 'LayerNorm + Linear' },
            { name: 'block 2', shape: '(B,T,C) -> (B,T,C)', role: 'LayerNorm + Linear' },
            { name: 'lm_head (Linear)', shape: '(B,T,C) -> (B,T,V)', role: 'per-token logits' },
          ],
        },
        blueprintPanel: {
          title: 'How to read the class without drifting',
          subtitle: 'The useful order is to follow the class contract and the tensor path.',
          stages: [
            { label: '1. __init__', title: 'The class registers model parts', shape: 'wte + blocks + lm_head', body: 'The first step is not running code. It is seeing which submodules exist and which structural role each one plays.', reading: 'Read `__init__` as inventory: input, repeated body, and output.' },
            { label: '2. Embedding', title: '`wte` creates hidden states', shape: '(B,T) -> (B,T,C)', body: 'Integer IDs enter the embedding and become dense vectors. From this point onward, the tensor is in continuous representation space.', reading: 'If failure happens early, check integer dtype and the transition into `(B,T,C)`.' },
            { label: '3. ModuleList', title: '`blocks` repeat the core transformation', shape: '(B,T,C) -> (B,T,C)', body: 'The loop in `forward` makes repetition explicit: the same block structure is applied multiple times without changing the core shape contract.', reading: 'Depth in PyTorch often looks like this: an ordered list of blocks walked one by one.' },
            { label: '4. lm_head', title: 'The final head projects into logits', shape: '(B,T,C) -> (B,T,V)', body: 'After the internal body, the last projection swaps representation width for vocabulary width. This is where architecture moves from hidden state to decision.', reading: 'Whenever you see `lm_head`, ask which dimension goes in and which semantic space comes out.' },
            { label: '5. Debug', title: 'Shape reading locates the break', shape: 'idx -> hidden -> logits', body: 'If forward fails, trace the tensor path: integer input, hidden state after embedding, hidden state after blocks, final logits.', reading: 'Good debugging here is flow-based, not guess-based: find the stage where the contract stopped matching.' },
          ],
          invariantsTitle: 'Class invariants',
          invariants: [
            '`__init__` registers parts; `forward` describes the tensor path.',
            '`ModuleList` expresses depth without hiding repetition.',
            '`lm_head` closes the contract as per-position logits.',
          ],
          diagnosticsTitle: 'Fast reading diagnosis',
          diagnostics: [
            'Breaks before forward? usually incorrect registration in `__init__`.',
            'Breaks in the middle? inspect one block and confirm it preserves `(B,T,C)`.',
            'Breaks at the end? check the `C -> V` projection at `lm_head`.',
          ],
          footer: 'Useful rule: read the class first, then read the finer math.',
        },
      },
    },
  },
});
