import { defineSlide } from './_factory';

export const neuralNetworkToLanguageModeling = defineSlide({
  id: 'neural-network-to-language-modeling',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `A ponte: classificação vira próximo token`,
      body: `Antes de montar um language model inteiro, precisamos trocar o formato mental do problema.

Até aqui, uma rede neural podia receber uma linha de atributos e prever uma classe: fraude/não fraude, gato/cachorro, aprovado/reprovado.

Language modeling é a mesma estrutura de aprendizado supervisionado, mas aplicada a uma pergunta repetida em texto:

\`\`\`txt
dado o contexto visível, qual token vem depois?
\`\`\`

O que muda:

1. **Entrada:** sai a linha tabular; entram IDs de tokens em sequência.
2. **Saída:** sai uma única classe pequena; entra uma distribuição sobre o vocabulário inteiro.
3. **Alvo:** sai um rótulo manual; entra o próprio texto deslocado uma posição.
4. **Treino:** continua igual no núcleo: previsão, erro, \`backward()\`, ajuste de pesos.

Essa ponte importa porque o próximo código não é uma arquitetura mágica. É uma rede neural comum sendo forçada a resolver milhares de pequenas classificações de próximo token.`,
    },
    'en-us': {
      title: `The bridge: classification becomes next-token prediction`,
      body: `Before building a full language model, we need to change the mental shape of the problem.

So far, a neural network could receive one row of features and predict a class: fraud/not fraud, cat/dog, approved/rejected.

Language modeling is the same supervised-learning structure, applied to one repeated text question:

\`\`\`txt
given the visible context, which token comes next?
\`\`\`

What changes:

1. **Input:** tabular rows are replaced by token IDs in sequence.
2. **Output:** one small class is replaced by a distribution over the whole vocabulary.
3. **Target:** a manual label is replaced by the same text shifted one position.
4. **Training:** the core stays the same: prediction, error, \`backward()\`, weight update.

This bridge matters because the next code is not a magical architecture. It is a standard neural network forced to solve thousands of tiny next-token classifications.`,
    },
  },
  visual: {
    id: 'neural-network-to-language-modeling-comparator',
    copy: {
      "pt-br": {
        "eyebrowLabel": "Comparação direta",
        "title": "A mesma lógica, outro formato de supervisão",
        "intro": "A ponte não é histórica; é operacional. O modelo continua aprendendo por erro, mas cada posição do texto vira um exemplo de classificação.",
        "leftTitle": "Rede neural comum",
        "leftSubtitle": "Uma amostra vira uma previsão.",
        "rightTitle": "Modelagem de linguagem",
        "rightSubtitle": "Cada posição do texto vira uma previsão.",
        "rows": [
          {
          "label": "Entrada",
          "leftValue": "Uma linha de features",
          "rightValue": "IDs de tokens em sequência"
        },
          {
          "label": "Saída",
          "leftValue": "Distribuição sobre classes",
          "rightValue": "Distribuição sobre o vocabulário"
        },
          {
          "label": "Alvo",
          "leftValue": "Rótulo correto da amostra",
          "rightValue": "Mesmo texto deslocado"
        },
          {
          "label": "Treino",
          "leftValue": "Ajuste de pesos por erro",
          "rightValue": "Mesmo princípio, muitas posições"
        }
        ],
        "coreLabel": "Ideia central",
        "coreValue": "Próximo token = classificação supervisionada",
        "footer": "A arquitetura fica mais interessante depois. Primeiro, o contrato de aprendizado precisa ficar claro."
      },
      "en-us": {
        "eyebrowLabel": "Direct comparison",
        "title": "Same logic, different supervision format",
        "intro": "The bridge is not historical; it is operational. The model still learns from error, but each text position becomes one classification example.",
        "leftTitle": "Standard neural network",
        "leftSubtitle": "One sample becomes one prediction.",
        "rightTitle": "Language modeling",
        "rightSubtitle": "Each text position becomes one prediction.",
        "rows": [
          {
          "label": "Input",
          "leftValue": "One feature row",
          "rightValue": "Token IDs in sequence"
        },
          {
          "label": "Output",
          "leftValue": "Distribution over classes",
          "rightValue": "Distribution over vocabulary"
        },
          {
          "label": "Target",
          "leftValue": "Correct label for the sample",
          "rightValue": "Same text shifted"
        },
          {
          "label": "Training",
          "leftValue": "Weight updates from error",
          "rightValue": "Same principle, many positions"
        }
        ],
        "coreLabel": "Core idea",
        "coreValue": "Next token = supervised classification",
        "footer": "The architecture gets more interesting later. First, the learning contract must be clear."
      }
    },
  },
});
