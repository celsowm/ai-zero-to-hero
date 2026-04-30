import { defineSlide } from './_factory';

export const qkvIntuition = defineSlide({
  id: 'qkv-intuition',
  type: 'two-column',
  options: {
    columnRatios: [0.35, 0.65],
  },
  content: {
    'pt-br': {
      title: `A Anatomia da Atenção: Q, K, V`,
      body: `O mecanismo de Atenção não é mágica; é um sistema de recuperação de informação extremamente eficiente.
      
      Cada palavra na sua frase é transformada em três vetores distintos:
      - **Query (Consulta):** O que esta palavra está procurando no contexto?
      - **Key (Chave):** O que esta palavra oferece para as outras?
      - **Value (Valor):** Qual a informação real que esta palavra carrega?
      
      A relação entre esses três vetores define como o conhecimento flui dentro do modelo.`,
    },
    'en-us': {
      title: `The Anatomy of Attention: Q, K, V`,
      body: `The Attention mechanism isn't magic; it's an extremely efficient information retrieval system.
      
      Each word in your sentence is transformed into three distinct vectors:
      - **Query:** What is this word looking for in the context?
      - **Key:** What does this word offer to others?
      - **Value:** What is the actual information this word carries?
      
      The relationship between these three vectors defines how knowledge flows within the model.`,
    },
  },
  visual: {
    id: 'qkv-intuition-explorer',
    copy: {
      "pt-br": {
        "title": "Explorador de Intuição QKV",
        "queryLabel": "Query (Busca)",
        "keyLabel": "Key (Chave)",
        "valueLabel": "Value (Valor)",
        "matchScoreLabel": "Score de Match",
        "resultLabel": "Resultado",
        "tabs": {
          "intuition": {
            "label": "Intuição",
            "title": "A Analogia da Festa",
            "description": "A Query é o que eu procuro. A Key é o que eu sou. O Value é o que eu tenho a dizer.",
            "analogyTitle": "Como funciona?",
            "analogyText": "Imagine que você está em uma festa e quer conversar sobre 'Física'. Sua Query é 'Alguém sabe Física?'. As pessoas na festa têm 'Keys' (etiquetas) dizendo seus interesses. Você bate sua Query com todas as Keys. Quando encontra um match (ex: uma pessoa com Key 'Físico'), você dá atenção a ela e absorve o seu 'Value' (o que ela sabe sobre o assunto)."
          },
          "mechanics": {
            "label": "Matemática",
            "title": "A Mecânica do Cálculo",
            "description": "Como os vetores realmente interagem para gerar os pesos de atenção.",
            "dotProductLabel": "Produto Escalar (Dot Product)",
            "scalingLabel": "Escalonamento (Scaling)"
          },
          "retrieval": {
            "label": "Recuperação",
            "title": "Sistemas de Busca",
            "description": "QKV funciona exatamente como um banco de dados ou um mecanismo de busca.",
            "databaseAnalogyTitle": "Banco de Dados Vetorial",
            "databaseAnalogyText": "No SQL, você faz uma busca exata. No Transformer, a busca é 'Soft'. A Query compara-se com todas as Keys simultaneamente via Similaridade de Cosseno. O resultado é uma média ponderada de todos os Values. Se o match é forte, o Value daquela Key domina o resultado final."
          }
        }
      },
      "en-us": {
        "title": "QKV Intuition Explorer",
        "queryLabel": "Query (Search)",
        "keyLabel": "Key (Index)",
        "valueLabel": "Value (Content)",
        "matchScoreLabel": "Match Score",
        "resultLabel": "Result",
        "tabs": {
          "intuition": {
            "label": "Intuition",
            "title": "The Party Analogy",
            "description": "Query is what I seek. Key is what I am. Value is what I have to say.",
            "analogyTitle": "How it works?",
            "analogyText": "Imagine you're at a party and want to talk about 'Physics'. Your Query is 'Does anyone know Physics?'. People at the party have 'Keys' (tags) showing their interests. You match your Query against all Keys. When you find a match (e.g., someone with Key 'Physicist'), you pay attention to them and absorb their 'Value' (what they know about the subject)."
          },
          "mechanics": {
            "label": "Mechanics",
            "title": "The Calculation",
            "description": "How vectors actually interact to generate attention weights.",
            "dotProductLabel": "Dot Product",
            "scalingLabel": "Scaling"
          },
          "retrieval": {
            "label": "Retrieval",
            "title": "Search Engines",
            "description": "QKV works exactly like a database or a search engine.",
            "databaseAnalogyTitle": "Vector Database",
            "databaseAnalogyText": "In SQL, you do an exact search. In a Transformer, the search is 'Soft'. The Query is compared with all Keys simultaneously via Cosine Similarity. The result is a weighted average of all Values. If the match is strong, that Key's Value dominates the final result."
          }
        }
      }
    },
  },
});
