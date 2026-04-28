import { defineSlide } from './_factory';

export const mlpInsideTransformer = defineSlide({
  id: 'mlp-inside-transformer',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Reflexão isolada (O MLP do Bloco)`,
      body: `Depois da Atenção (que move dados *entre* as palavras), vem a rede neural clássica (MLP) agindo individualmente *dentro* de cada palavra.

1. **Sem comunicação:** durante o MLP, os tokens param de conversar. Cada um é processado de forma completamente isolada.

2. **Momento 'Aha!':** o MLP atua como o cérebro que digere as informações coletadas. Se a atenção disse 'você está no contexto da constituição', o MLP processa isso e conclui 'então eu devo me preparar para palavras formais e legais'.

3. **A engrenagem do conhecimento:** o MLP é onde o Transformer armazena grande parte dos fatos que ele memorizou durante o treinamento.

> A Atenção coleta as pistas; o MLP deduz a conclusão.`,
    },
    'en-us': {
      title: `Isolated reflection (The Block's MLP)`,
      body: `After Attention (which moves data *between* words), comes the classic neural network (MLP) acting individually *inside* each word.

1. **No communication:** during the MLP, tokens stop talking. Each one is processed completely in isolation.

2. **The 'Aha!' moment:** the MLP acts as the brain digesting the collected information. If attention said 'you are in the context of the constitution', the MLP processes this and concludes 'then I should prepare for formal, legal words'.

3. **The gear of knowledge:** the MLP is where the Transformer stores a large chunk of the facts it memorized during training.

> Attention gathers the clues; the MLP deduces the conclusion.`,
    },
  },
  visual: {
    id: 'attention-vs-mlp',
    copy: {
      "pt-br": {
        "attentionPhase": "Fase 1: Troca de informações",
        "mlpPhase": "Fase 2: Processamento individual"
      },
      "en-us": {
        "attentionPhase": "Phase 1: Information exchange",
        "mlpPhase": "Phase 2: Individual processing"
      }
    },
  },
});
