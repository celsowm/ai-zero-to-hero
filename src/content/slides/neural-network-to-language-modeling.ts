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
      title: `Da rede neural comum para modelagem de linguagem`,
      body: `Agora não estamos abandonando a ideia anterior. Estamos reaproveitando a mesma lógica de previsão, só que em outro domínio.

1. **Antes:** a rede recebia atributos tabulares e respondia \`sim/não\` ou uma probabilidade.

2. **Agora:** a rede recebe uma sequência de palavras ou tokens e responde qual continuação parece mais provável.

3. **O ponto de virada:** mudam a entrada e a saída, mas a mecânica de aprender com exemplos continua a mesma.

> O modelo de linguagem é uma rede neural aplicada a texto para prever o próximo token.`,
    },
    'en-us': {
      title: `From a standard neural network to language modeling`,
      body: `We are not abandoning the previous idea now. We are reusing the same prediction logic, just in a different domain.

1. **Before:** the network received tabular features and answered with \`yes/no\` or a probability.

2. **Now:** the network receives a sequence of words or tokens and answers which continuation seems most likely.

3. **The turning point:** the input and output change, but the learning loop stays the same.

> A language model is a neural network applied to text to predict the next token.`,
    },
  },
  visual: {
    id: 'neural-network-to-language-modeling-comparator',
    copy: {
      "pt-br": {
        "eyebrowLabel": "Comparação direta",
        "title": "A mesma rede, um novo tipo de previsão",
        "intro": "A estrutura de treino continua reconhecível. O que muda é o formato do que entra e do que sai.",
        "leftTitle": "Rede neural comum",
        "leftSubtitle": "Pensa em linhas de dados com uma resposta fixa.",
        "rightTitle": "Modelagem de linguagem",
        "rightSubtitle": "Pensa em contexto textual e próxima continuação.",
        "rows": [
          {
          "label": "Entrada",
          "leftValue": "Atributos tabulares",
          "rightValue": "Tokens + contexto"
        },
          {
          "label": "Saída",
          "leftValue": "Sim / não ou probabilidade",
          "rightValue": "Distribuição do próximo token"
        },
          {
          "label": "Alvo",
          "leftValue": "Rótulo correto da amostra",
          "rightValue": "Próxima palavra real"
        },
          {
          "label": "Treino",
          "leftValue": "Ajuste de pesos por erro",
          "rightValue": "Mesmo princípio, novo domínio"
        }
        ],
        "coreLabel": "Ideia central",
        "coreValue": "Mesma lógica de aprendizado",
        "footer": "Só o domínio muda. A máquina continua comparando previsão com alvo e ajustando pesos."
      },
      "en-us": {
        "eyebrowLabel": "Direct comparison",
        "title": "Same network, new kind of prediction",
        "intro": "The training structure still feels familiar. What changes is the shape of the input and the output.",
        "leftTitle": "Standard neural network",
        "leftSubtitle": "Think tabular rows with a fixed answer.",
        "rightTitle": "Language modeling",
        "rightSubtitle": "Think text context and the next continuation.",
        "rows": [
          {
          "label": "Input",
          "leftValue": "Tabular features",
          "rightValue": "Tokens + context"
        },
          {
          "label": "Output",
          "leftValue": "Yes / no or probability",
          "rightValue": "Next-token distribution"
        },
          {
          "label": "Target",
          "leftValue": "Correct label for the sample",
          "rightValue": "Real next word"
        },
          {
          "label": "Training",
          "leftValue": "Weight updates from error",
          "rightValue": "Same principle, new domain"
        }
        ],
        "coreLabel": "Core idea",
        "coreValue": "Same learning logic",
        "footer": "Only the domain changes. The machine still compares prediction with target and adjusts weights."
      }
    },
  },
});
