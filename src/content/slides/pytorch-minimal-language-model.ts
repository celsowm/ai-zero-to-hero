import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Mini LM end-to-end em PyTorch',
      body: `Este slide fecha o primeiro ciclo completo de language modeling: **texto -> tokens -> batch -> modelo -> loss -> treino -> geração**.

Não é mais só uma classe solta. O exemplo mostra a menor versão executável do contrato que vimos nos slides anteriores.

Fluxo didático:

1. **Corpus mínimo**: uma frase curta vira lista de tokens, vocabulário e IDs inteiros.
2. **Batch supervisionado**: o mesmo tensor \`idx\` gera \`x = idx[:, :-1]\` e \`y = idx[:, 1:]\`.
3. **Modelo**: \`Embedding\` transforma IDs em vetores; \`lm_head\` transforma vetores em logits sobre o vocabulário.
4. **Loss**: os logits \`(B,T,V)\` são achatados para a cross-entropy comparar cada posição com o próximo token correto.
5. **Treino**: \`zero_grad -> backward -> step\` reduz a surpresa média nos exemplos vistos.
6. **Geração**: com um prefixo, o modelo usa os logits da última posição, escolhe o próximo token e anexa ao contexto.

O ponto principal não é qualidade do texto gerado. É enxergar, numa peça só, todas as engrenagens que depois reaparecem em GPTs maiores.

Limite honesto: este é um **bigram LM didático**. Ele não tem atenção, não lê contexto longo de verdade e não é arquitetura de produção. Ele serve para provar o pipeline antes de complicar o corpo interno.`,
    },
    'en-us': {
      title: 'An end-to-end mini LM in PyTorch',
      body: `This slide closes the first complete language-modeling cycle: **text -> tokens -> batch -> model -> loss -> training -> generation**.

It is no longer just an isolated class. The example shows the smallest executable version of the contract we built in previous slides.

Teaching flow:

1. **Tiny corpus**: a short sentence becomes tokens, a vocabulary, and integer IDs.
2. **Supervised batch**: the same \`idx\` tensor creates \`x = idx[:, :-1]\` and \`y = idx[:, 1:]\`.
3. **Model**: \`Embedding\` maps IDs to vectors; \`lm_head\` maps vectors to vocabulary logits.
4. **Loss**: logits \`(B,T,V)\` are flattened so cross-entropy can compare every position with the correct next token.
5. **Training**: \`zero_grad -> backward -> step\` reduces average surprise over the examples seen.
6. **Generation**: given a prefix, the model uses the last-position logits, picks the next token, and appends it to the context.

The main point is not generation quality. It is seeing, in one piece, all the gears that later reappear inside larger GPT-style models.

Honest limit: this is a **teaching bigram LM**. It has no attention, no real long-context reading, and it is not a production architecture. It proves the pipeline before we make the internal body more complex.`,
    },
  },
  visual: {
    id: 'pytorch-architecture-blueprint',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Fluxo' }],
        codePanel: {
          title: 'Um LM mínimo, mas executável de ponta a ponta',
          description: 'O código cria dados, monta x/y, calcula logits e loss, treina por alguns passos e usa o mesmo modelo para gerar novos tokens.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: '`torch` fornece o motor de tensores e a classe base `nn.Module`; `nn` contém as definições de camadas (`Embedding`, `Linear`); `F.cross_entropy` combina log-softmax e negative-log-likelihood em uma única chamada numericamente estável — ela espera logits crus, não probabilidades, e um vetor alvo plano de índices de classe.' },
            { lineRange: [5, 5], content: '`torch.manual_seed(0)` fixa duas fontes de aleatoriedade: (1) a inicialização dos pesos de `Embedding` e `Linear` (que usam amostragem uniforme/Kaiming por padrão) e (2) o `torch.multinomial` dentro de `generate`. Sem a semente, cada execução começaria de um ponto diferente do espaço de parâmetros, impossibilitando comparar `loss_before` com `loss_after` de forma justa.' },
            { lineRange: [7, 11], content: 'O corpus tem 7 tokens únicos (`"AI"`, `"I"`, `"like"`, `"pytorch"`, `"."`) — `vocab_size=7`. O `sorted(set(...))` no código pt cria `["IA", "de", "eu", "gosto", "pytorch", "."]`. Cada token vira um ID inteiro de 0 a 6. Os dicionários `stoi`/`itos` implementam o contrato de tokenização mínimo necessário para o ciclo fechar. Na prática, vocabulários reais têm dezenas de milhares de tokens e usam BPE/WordPiece.' },
            { lineRange: [13, 15], content: '`idx` tem shape `(1, 7)` — batch=1, time=7 tokens. O slicing `[:, :-1]` produz `x` com shape `(1, 6)`, e `[:, 1:]` produz `y` também `(1, 6)`. A relação é: para cada posição `t` em x, o target correto é a posição `t+1` de y. Isso gera exatamente 6 pares (contexto, próximo token) a partir de 7 tokens de entrada — o último token nunca aparece em x (não há target para ele), e o primeiro nunca aparece em y (ele não é previsto por ninguém).' },
            { lineRange: [17, 21], content: 'A classe estende `nn.Module` e declara exatamente duas camadas: `wte` (`Embedding`: `vocab_size=7 → n_embd=8`) converte cada ID em um vetor denso aprendível; `lm_head` (`Linear`: `n_embd=8 → vocab_size=7`) projeta cada vetor de volta para um placar sobre todo o vocabulário. Não há camadas ocultas, normalização ou atenção — a informação de um token nunca flui para outro. Essa ausência de comunicação entre posições é a **definição do bigram LM**: cada token só "vê" a si mesmo.' },
            { lineRange: [23, 25], content: 'O `forward` recebe `idx` com shape `(B, T)`. `self.wte(idx)` faz um lookup nas linhas da matriz de embedding, devolvendo `(B, T, C)` onde `C=8`. `self.lm_head(token_vectors)` aplica uma transformação linear sem bias, gerando `(B, T, V)` com `V=7`. Cada fatia `logits[b, t, :]` contém 7 valores reais — um score para cada token do vocabulário. Como a transformação é token-a-token (sem misturar a dimensão temporal), dois tokens iguais em posições diferentes produzem logits idênticos. Essa independência é a limitação arquitetural central do modelo.' },
            { lineRange: [27, 31], content: 'Quando `targets` não é `None`, extraímos `B, T, V = logits.shape` e remodelamos `logits` para `(B*T, V)` e `targets` para `(B*T,)`. Com `B=1, T=6`, temos 6 exemplos de classificação, cada um com 7 classes possíveis. O `F.cross_entropy` aplica softmax internamente sobre a dimensão V, calcula o log da probabilidade do token correto e tira a média negativa — produzindo um único escalar. Esse achatamento é necessário porque a assinatura da cross-entropy do PyTorch exige `(N, C)` para logits e `(N,)` para targets.' },
            { lineRange: [33, 41], content: '`generate` é decorada com `@torch.no_grad()` para evitar que o autograd construa grafo durante a inferência — economiza memória e acelera. Em cada iteração, `self(idx)` computa logits `(B, T_curr, V)`. Apenas a última posição temporal é usada: `logits[:, -1, :]` → `(B, V)`. `F.softmax` converte esses logits em probabilidades que somam 1. `torch.multinomial` amostra um ID proporcional a essas probabilidades (não o argmax). O ID amostrado é concatenado a idx com `torch.cat` na dimensão 1, alongando o contexto. Após `max_new_tokens` iterações, o tensor final tem shape `(B, T_inicial + max_new_tokens)`.' },
            { lineRange: [43, 44], content: '`TinyBigramLM(vocab_size=7, n_embd=8)` cria uma rede com aproximadamente 7×8 + 8×7 = 112 parâmetros. `AdamW(model.parameters(), lr=0.1)` usa uma taxa de aprendizado alta porque (1) o problema é trivial — 6 exemplos de treino, (2) overfitting é desejável (memorizar as transições do corpus), e (3) a baixa dimensionalidade do espaço permite convergência rápida sem oscilação.' },
            { lineRange: [46, 51], content: '`loss_before` é calculada antes do loop como referência — começa alta (~2.0) porque os pesos ainda estão aleatórios. Dentro do loop de 80 steps: (1) `model(x, y)` computa logits e loss; (2) `optimizer.zero_grad(set_to_none=True)` zera os gradientes (mais eficiente que `zero_grad()` pois libera memória); (3) `loss.backward()` propaga o gradiente da loss até todos os parâmetros; (4) `optimizer.step()` atualiza cada parâmetro na direção oposta ao gradiente. O mesmo batch de 6 exemplos é reusado a cada passo — é overfitting deliberado, não generalização.' },
            { lineRange: [53, 59], content: '`loss_after` é calculada com os pesos atualizados. A queda (ex.: de ~2.0 para ~0.1) confirma que o gradiente reduziu a surpresa do modelo nos exemplos de treino. O prompt `[[stoi["eu"]]]` tem shape `(1, 1)` — apenas o token inicial. `model.generate(prompt, max_new_tokens=6)` itera 6 vezes, produzindo shape final `(1, 7)`. A saída impressa traduz IDs de volta para tokens com `itos`, revelando se o modelo aprendeu as transições do corpus. A diferença entre `loss_before` e `loss_after` é a evidência concreta de que o ciclo completo — forward, cross-entropy, backward, step — está funcionando.' },
          ],
        },
        blueprintPanel: {
          title: 'Pipeline completo em uma peça',
          subtitle: 'A utilidade deste mini-modelo não é ser poderoso; é tornar visível o ciclo inteiro antes de entrarmos em atenção e blocos GPT.',
          stages: [
            { label: 'Dados', title: 'Texto vira supervisão', shape: 'texto -> tokens -> ids -> x/y', body: 'O exemplo começa do texto e monta `x` e `y`. Isso evita a sensação de que o modelo aparece no vácuo.', reading: '`x` é o contexto visível; `y` é o próximo token correto em cada posição.' },
            { label: 'Forward', title: 'IDs viram placares de vocabulário', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: '`Embedding` cria vetores por token e `lm_head` cria um placar para cada token possível do vocabulário.', reading: 'Cada posição temporal vira um problema de classificação entre `V` tokens.' },
            { label: 'Loss', title: 'O erro vira um escalar treinável', shape: '(B*T,V) vs (B*T)', body: 'A cross-entropy precisa enxergar uma lista de exemplos. Por isso achatamos batch e tempo antes de comparar logits com targets.', reading: 'É o mesmo papel estrutural do MSE antes: produzir um número para `backward()`.' },
            { label: 'Treino', title: 'Pesos mudam por gradiente', shape: 'loss -> backward -> step', body: 'O loop mostra a perda antes e depois. Se a loss cai, o mini-LM aprendeu melhor as transições do corpus minúsculo.', reading: 'Aqui fica concreto que LM ainda é aprendizado supervisionado por erro.' },
            { label: 'Geração', title: 'Treinar e gerar usam o mesmo modelo', shape: 'prefixo -> último logit -> próximo token', body: 'Na geração não existe target nem loss. O modelo prevê o próximo token, anexa ao contexto e repete.', reading: 'Essa é a ponte direta para o próximo bloco: treino paralelo, geração iterativa.' },
          ],
          invariantsTitle: 'O que este exemplo garante',
          invariants: [
            'O código roda de ponta a ponta sem depender de dataset externo.',
            'A mesma classe cobre treino e geração.',
            'A queda de loss confirma que o loop de otimização está funcionando.',
          ],
          diagnosticsTitle: 'O que ele ainda não ensina',
          diagnostics: [
            'Não há atenção para combinar informação entre posições distantes.',
            'O modelo é essencialmente local/bigram, então a geração é limitada.',
            'Não há batching real de dataset, validação, checkpoint ou arquitetura profunda.',
          ],
          footer: 'Depois disso, crescer o modelo significa trocar o corpo interno; o contrato externo continua reconhecível.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Flow' }],
        codePanel: {
          title: 'A minimal LM that actually runs end to end',
          description: 'The code creates data, builds x/y, computes logits and loss, trains for a few steps, and uses the same model to generate tokens.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: '`torch` provides the tensor engine and `nn.Module` base class; `nn` holds layer definitions (`Embedding`, `Linear`); `F.cross_entropy` combines log-softmax and negative-log-likelihood into a single numerically stable call — it expects raw logits, not probabilities, and a flat target vector of class indices.' },
            { lineRange: [5, 5], content: '`torch.manual_seed(0)` controls two sources of randomness: (1) weight initialization of `Embedding` and `Linear` (which use uniform/Kaiming sampling by default) and (2) `torch.multinomial` inside `generate`. Without the seed, each run would start from a different point in parameter space, making it impossible to fairly compare `loss_before` with `loss_after`.' },
            { lineRange: [7, 11], content: 'The corpus has 7 unique tokens (`"AI"`, `"I"`, `"like"`, `"pytorch"`, `"."`) — `vocab_size=7`. `sorted(set(...))` creates a deterministic but arbitrary ordering. Each token becomes an integer ID from 0 to 6. The `stoi`/`itos` dicts implement the minimum tokenization contract needed for the cycle to close. In practice, real vocabularies have tens of thousands of tokens and use BPE/WordPiece.' },
            { lineRange: [13, 15], content: '`idx` has shape `(1, 7)` — batch=1, time=7 tokens. Slicing `[:, :-1]` produces `x` with shape `(1, 6)`, and `[:, 1:]` produces `y` also `(1, 6)`. The relationship: for each position `t` in x, the correct target is position `t+1` in y. This yields exactly 6 pairs (context, next token) from 7 input tokens — the last token never appears in x (no target for it), and the first token never appears in y (nobody predicts it).' },
            { lineRange: [17, 21], content: 'The class extends `nn.Module` and declares exactly two layers: `wte` (`Embedding`: `vocab_size=7 → n_embd=8`) converts each ID into a learnable dense vector; `lm_head` (`Linear`: `n_embd=8 → vocab_size=7`) projects each vector back to a score over the whole vocabulary. There are no hidden layers, normalization, or attention — information from one token never flows to another. This absence of cross-position communication is the **bigram LM definition**: each token only "sees" itself.' },
            { lineRange: [23, 25], content: '`forward` receives `idx` with shape `(B, T)`. `self.wte(idx)` looks up rows in the embedding matrix, returning `(B, T, C)` where `C=8`. `self.lm_head(token_vectors)` applies a bias-free linear transformation, producing `(B, T, V)` with `V=7`. Each slice `logits[b, t, :]` holds 7 real values — one score per vocabulary token. Because the transformation is token-wise (no mixing across the time dimension), identical tokens at different positions produce identical logits. This independence is the model\'s central architectural limitation.' },
            { lineRange: [27, 31], content: 'When `targets` is not `None`, we unpack `B, T, V = logits.shape` and reshape `logits` to `(B*T, V)` and `targets` to `(B*T,)`. With `B=1, T=6`, we get 6 classification examples, each with 7 possible classes. `F.cross_entropy` applies softmax internally over dimension V, computes the log-probability of the correct token, and averages the negative values — producing a single scalar. This flattening is necessary because PyTorch\'s cross-entropy signature requires `(N, C)` for logits and `(N,)` for targets.' },
            { lineRange: [33, 41], content: '`generate` is decorated with `@torch.no_grad()` to prevent autograd from building a graph during inference — saving memory and speeding execution. Each iteration calls `self(idx)`, computing logits `(B, T_curr, V)`. Only the last time position is used: `logits[:, -1, :]` → `(B, V)`. `F.softmax` converts these logits into probabilities that sum to 1. `torch.multinomial` samples an ID proportional to those probabilities (not argmax). The sampled ID is concatenated to idx with `torch.cat` along dimension 1, extending the context. After `max_new_tokens` iterations, the final tensor has shape `(B, T_initial + max_new_tokens)`.' },
            { lineRange: [43, 44], content: '`TinyBigramLM(vocab_size=7, n_embd=8)` creates a network with roughly 7×8 + 8×7 = 112 parameters. `AdamW(model.parameters(), lr=0.1)` uses a high learning rate because (1) the problem is trivial — 6 training examples, (2) overfitting is desirable (memorizing corpus transitions), and (3) the low-dimensional space allows fast convergence without oscillation.' },
            { lineRange: [46, 51], content: '`loss_before` is computed before the loop as a baseline — it starts high (~2.0) because weights are still random. Inside the 80-step loop: (1) `model(x, y)` computes logits and loss; (2) `optimizer.zero_grad(set_to_none=True)` zeros gradients (more efficient than `zero_grad()` since it frees memory); (3) `loss.backward()` propagates the loss gradient to all parameters; (4) `optimizer.step()` updates each parameter opposite to its gradient. The same batch of 6 examples is reused every step — this is deliberate overfitting, not generalization.' },
            { lineRange: [53, 59], content: '`loss_after` is computed with the updated weights. The drop (e.g., from ~2.0 to ~0.1) confirms that gradients have reduced the model\'s surprise on the training examples. The prompt `[[stoi["I"]]]` has shape `(1, 1)` — just the starting token. `model.generate(prompt, max_new_tokens=6)` iterates 6 times, producing a final shape of `(1, 7)`. The printed output translates IDs back to tokens via `itos`, revealing whether the model learned the corpus transitions. The difference between `loss_before` and `loss_after` is the **concrete evidence** that the full cycle — forward, cross-entropy, backward, step — is working.' },
          ],
        },
        blueprintPanel: {
          title: 'The whole pipeline in one piece',
          subtitle: 'The purpose of this mini-model is not power; it is making the full cycle visible before we introduce attention and GPT blocks.',
          stages: [
            { label: 'Data', title: 'Text becomes supervision', shape: 'text -> tokens -> ids -> x/y', body: 'The example starts from text and builds `x` and `y`. That prevents the model from feeling disconnected from the data.', reading: '`x` is the visible context; `y` is the correct next token at each position.' },
            { label: 'Forward', title: 'IDs become vocabulary scores', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: '`Embedding` creates vectors per token and `lm_head` creates one score board over all vocabulary tokens.', reading: 'Each time position becomes a classification problem over `V` tokens.' },
            { label: 'Loss', title: 'Error becomes one trainable scalar', shape: '(B*T,V) vs (B*T)', body: 'Cross-entropy expects a list of examples. That is why we flatten batch and time before comparing logits with targets.', reading: 'It plays the same structural role MSE played earlier: produce a number for `backward()`.' },
            { label: 'Training', title: 'Weights change by gradient', shape: 'loss -> backward -> step', body: 'The loop shows loss before and after. If loss drops, the mini-LM has learned the tiny corpus transitions better.', reading: 'This makes concrete that LM is still supervised learning from error.' },
            { label: 'Generation', title: 'Training and generation use the same model', shape: 'prefix -> last logit -> next token', body: 'During generation there is no target and no loss. The model predicts the next token, appends it, and repeats.', reading: 'This is the direct bridge to the next block: parallel training, iterative generation.' },
          ],
          invariantsTitle: 'What this example guarantees',
          invariants: [
            'The code runs end to end without an external dataset.',
            'The same class covers training and generation.',
            'The loss drop confirms that the optimization loop works.',
          ],
          diagnosticsTitle: 'What it still does not teach',
          diagnostics: [
            'No attention to combine information across distant positions.',
            'The model is essentially local/bigram, so generation is limited.',
            'No real dataset batching, validation, checkpointing, or deep architecture.',
          ],
          footer: 'After this, growing the model means replacing the internal body; the outer contract stays recognizable.',
        },
      },
    },
  },
});
