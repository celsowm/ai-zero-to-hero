import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Mini language model em PyTorch',
      body: `Este e o menor modelo que ja cumpre o contrato completo de LM.

Componentes minimos:
- \`Embedding\`: IDs -> vetores.
- \`lm_head\`: vetores -> logits de vocabulario.
- \`forward(idx, targets)\`: caminho unico para treino e inferencia.
- \`cross_entropy\`: criterio de erro quando ha target.

Leitura importante:
- sem \`targets\`: usamos para inferencia.
- com \`targets\`: devolve loss para treino.

Se essa classe estiver clara, os modelos grandes sao "a mesma classe, so com corpo interno maior".

Limites deste modelo didatico:
- nao tem atencao
- nao tem contexto longo sofisticado
- nao representa uma arquitetura de producao`,
    },
    'en-us': {
      title: 'A minimal PyTorch language model',
      body: `This is the smallest model that still satisfies the full LM contract.

Minimum components:
- \`Embedding\`: IDs -> vectors.
- \`lm_head\`: vectors -> vocabulary logits.
- \`forward(idx, targets)\`: single path for training and inference.
- \`cross_entropy\`: error criterion when targets exist.

Critical reading:
- without \`targets\`: inference mode.
- with \`targets\`: returns loss for training.

Once this class is clear, larger models are "the same contract with a larger internal body".

Limits of this teaching model:
- no attention
- no sophisticated long-context handling
- not a production architecture`,
    },
  },
  visual: {
    id: 'pytorch-architecture-blueprint',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Contrato' }],
        codePanel: {
          title: 'Classe minima de LM',
          description: 'Implementacao enxuta que ja suporta inferencia e treino com a mesma assinatura.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Imports minimos e declaracao de classe com contrato de LM.' },
            { lineRange: [6, 10], content: 'Estado da classe: embedding de entrada e cabeca final de logits.' },
            { lineRange: [11, 14], content: 'Forward retorna logits sempre e loss opcional quando targets existem.' },
          ],
        },
        blueprintPanel: {
          title: 'Contrato e limites',
          subtitle: 'A utilidade deste mini-modelo é cristalizar o contrato inteiro de um LM antes da arquitetura crescer.',
          stages: [
            { label: 'Entrada', title: '`idx` é a porta obrigatória', shape: '(B,T)', body: 'Toda execução começa com IDs inteiros. Sem isso, o modelo nem entra no domínio de linguagem.', reading: 'O primeiro contrato do LM é aceitar contexto tokenizado, não texto cru.' },
            { label: 'Corpo mínimo', title: '`Embedding` + `lm_head` já fecham o ciclo', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: 'Mesmo sem atenção, o modelo já transforma IDs em vetores e vetores em logits. Isso basta para ter previsão e loss.', reading: 'O corpo é pequeno, mas a assinatura já é a de um language model de verdade.' },
            { label: 'Saída dupla', title: 'A mesma classe serve treino e inferência', shape: 'logits + loss?', body: 'Sem `targets`, ela devolve só logits. Com `targets`, devolve logits e loss para backward. É o mesmo contrato operacional com dois usos.', reading: 'O segredo aqui não é tamanho; é unificar os dois modos na mesma interface.' },
          ],
          invariantsTitle: 'O que este mini-LM já prova',
          invariants: [
            'Há entrada tokenizada, representação interna e logits.',
            'A assinatura do forward já cobre treino e inferência.',
            'A loss aparece só quando `targets` existem.',
          ],
          diagnosticsTitle: 'O que ainda falta para virar GPT',
          diagnostics: [
            'Não há atenção para trocar informação entre posições.',
            'Não há tratamento sofisticado de posição e contexto longo.',
            'Não há corpo profundo com blocos repetidos e normalização robusta.',
          ],
          footer: 'Esse contrato reaparece em GPTs maiores com o mesmo principio.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Contract' }],
        codePanel: {
          title: 'Minimal LM class',
          description: 'Lean implementation that already supports inference and training under one signature.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Minimal imports and class declaration with LM contract.' },
            { lineRange: [6, 10], content: 'Class state: input embedding plus final logits head.' },
            { lineRange: [11, 14], content: 'Forward always returns logits and optional loss when targets exist.' },
          ],
        },
        blueprintPanel: {
          title: 'Contract and limits',
          subtitle: 'The point of this mini-model is to crystallize the full LM contract before architecture grows.',
          stages: [
            { label: 'Input', title: '`idx` is the mandatory entry point', shape: '(B,T)', body: 'Every execution starts from integer token IDs. Without that, the model never even enters the language domain.', reading: 'The first LM contract is tokenized context, not raw text.' },
            { label: 'Minimal body', title: '`Embedding` + `lm_head` already close the loop', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: 'Even without attention, the model already maps IDs to vectors and vectors to logits. That is enough for prediction and loss.', reading: 'The body is tiny, but the signature is already that of a real language model.' },
            { label: 'Dual output', title: 'The same class serves training and inference', shape: 'logits + loss?', body: 'Without `targets`, it returns logits only. With `targets`, it returns logits plus loss for backward. Same operational contract, two uses.', reading: 'The key is not size; it is unifying both modes behind one interface.' },
          ],
          invariantsTitle: 'What this mini-LM already proves',
          invariants: [
            'There is tokenized input, internal representation, and logits.',
            'The forward signature already covers training and inference.',
            'Loss appears only when `targets` exist.',
          ],
          diagnosticsTitle: 'What is still missing for GPT',
          diagnostics: [
            'No attention to exchange information across positions.',
            'No sophisticated positional or long-context handling.',
            'No deep repeated block stack with stronger normalization.',
          ],
          footer: 'The same contract reappears in larger GPT variants.',
        },
      },
    },
  },
});
