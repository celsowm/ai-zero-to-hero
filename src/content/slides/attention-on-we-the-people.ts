import { defineSlide } from './_factory';

export const attentionOnWeThePeople = defineSlide({
  id: 'attention-on-we-the-people',
  type: 'visual-only',
  content: {
    'pt-br': {
      title: `Atenção Dinâmica`,
      body: `Veja como cada palavra (Query) busca contexto nas outras (Keys).
      
      Clique nos tokens para ver como o 'significado' de uma palavra muda conforme ela absorve informações do contexto ao redor.`,
    },
    'en-us': {
      title: `Dynamic Attention`,
      body: `See how each word (Query) searches for context in the others (Keys).
      
      Click on tokens to see how the 'meaning' of a word shifts as it absorbs information from the surrounding context.`,
    },
  },
  visual: {
    id: 'attention-weight-explorer',
    copy: {
      "pt-br": {
        "title": "Explorador de Pesos de Atenção",
        "subtitle": "Analisando 'We the people' para prever o próximo token",
        "clickHint": "Clique em um token para ver sua 'Query' em ação",
        "queryLabel": "Token que pergunta (Query)",
        "keyLabel": "Heatmap de Atenção (Q × K)",
        "attentionWeightLabel": "Distribuição de Atenção",
        "contextMeaningLabel": "Evolução do Vetor de Contexto",
        "beforeLabel": "Significado Base",
        "afterLabel": "Significado Contextual",
        "sentenceTokens": ["We", "the", "people", "..."],
        "attentionMatrix": [
          [0.9, 0.05, 0.05, 0],
          [0.2, 0.7, 0.1, 0],
          [0.6, 0.1, 0.3, 0],
          [0.1, 0.1, 0.1, 0.7]
        ],
        "meaningBefore": [
          "Pronome 'Nós'",
          "Artigo definido",
          "Pessoas genéricas",
          "Ponto final/Pausa"
        ],
        "meaningAfter": [
          "Autores da Constituição",
          "O artigo que foca no povo",
          "Cidadãos americanos soberanos",
          "Fim do preâmbulo"
        ],
        "insightTitle": "Insights:",
        "insights": [
          "Softmax garante soma 100%",
          "Atenção é focada no passado",
          "Contexto muda o vetor final"
        ]
      },
      "en-us": {
        "title": "Attention Weight Explorer",
        "subtitle": "Analyzing 'We the people' to predict the next token",
        "clickHint": "Click a token to see its 'Query' in action",
        "queryLabel": "Asking Token (Query)",
        "keyLabel": "Attention Heatmap (Q × K)",
        "attentionWeightLabel": "Attention Distribution",
        "contextMeaningLabel": "Context Vector Evolution",
        "beforeLabel": "Base Meaning",
        "afterLabel": "Contextual Meaning",
        "sentenceTokens": ["We", "the", "people", "..."],
        "attentionMatrix": [
          [0.9, 0.05, 0.05, 0],
          [0.2, 0.7, 0.1, 0],
          [0.6, 0.1, 0.3, 0],
          [0.1, 0.1, 0.1, 0.7]
        ],
        "meaningBefore": [
          "Pronoun 'We'",
          "Definite article",
          "Generic people",
          "End/Pause"
        ],
        "meaningAfter": [
          "Constitution authors",
          "Article focusing on people",
          "American sovereign citizens",
          "End of preamble"
        ],
        "insightTitle": "Insights:",
        "insights": [
          "Softmax ensures 100% sum",
          "Attention is past-focused",
          "Context shifts the final vector"
        ]
      }
    },
  },
});
